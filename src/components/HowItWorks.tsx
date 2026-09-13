"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { useLenis } from "lenis/react";
import { ContainerMark } from "./Logo";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { motionSignFor, type Locale } from "@/lib/i18n/locales";
import ScrollCue from "@/components/ScrollCue";

/**
 * Three short marketing steps: use the calculator, send the order, wait for
 * the driver. Deliberately terse — one line of benefit each, no narration.
 *
 * Two earlier versions are worth knowing about, because both were replaced
 * for reasons that still apply. The first was four abstract steps (tell us
 * what you need → we plan the route → we handle the complexity → it
 * arrives), vague so neither audience read it as "not for me". The second
 * walked through the site's own UI click by click, including a "Create an
 * account" step. That second version is now factually wrong, not just
 * long: customers don't need an account to ship — the path is calculator →
 * inquiry → delivery, and the copy says exactly that.
 *
 * The track scrolls horizontally at EVERY breakpoint. It used to be desktop-
 * only, which meant a phone got three (formerly four) static stacked
 * paragraphs — the flattest possible reading of the page.
 *
 * THE SCROLL-JACK RUNS ONCE PER PAGE LOAD. Pinning the viewport for 3.4
 * screens is a fair trade the first time, when it's the mechanism that
 * reveals the steps. It is not a fair trade on the way back up, or on every
 * later pass — at that point the visitor knows what's here and the pin is
 * just 3060px of scrolling they can't skip. So once they've been through it
 * and moved on, the section detaches: the pin and its spacer are removed and
 * it becomes an ordinary one-screen section. Reviewing the steps after that
 * is done by dragging the container mark along the rail, which is why that
 * mark turns into a real slider rather than staying a read-only indicator.
 *
 * Steps come from dict.howItWorks.steps; the "01/02/03" numbering is
 * computed from array position rather than stored per-locale, since it's
 * plain Western digits everywhere on this site (including Arabic — see
 * locales.ts's NUMBER_LOCALE comment on why Lebanese commercial numerals
 * stay Latin), not language-dependent content.
 */
export default function HowItWorks({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const STEPS = dict.howItWorks.steps;
  const rtl = motionSignFor(locale) === -1;
  const root = useRef<HTMLDivElement>(null);

  // Flips once the scroll-jack has been retired, which is what turns the
  // container mark into a focusable slider. Kept in React state (rather than
  // set as attributes from the GSAP code) so the accessible role, the tab
  // stop and the cursor all arrive together with the behaviour.
  const [zipper, setZipper] = useState(false);

  // Lenis owns the scroll position, so removing 3060px of document height
  // has to be announced to it or it will fight the correction. Captured in
  // an effect rather than read during render — it is null on the first pass,
  // and this component must not rebuild its timeline when it arrives.
  const lenis = useLenis();
  const lenisRef = useRef<ReturnType<typeof useLenis> | null>(null);
  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger, Draggable);
      // +1 left-to-right, -1 right-to-left. The flex track itself is already
      // mirrored by the browser under `dir="rtl"` — measured at 1440px, the
      // three panels sit at x = 691 / -58 / -806 instead of 0 / 749 / 1498,
      // i.e. panels two and three are off-screen to the LEFT. Sliding the
      // track the LTR way (x: -806) therefore pushed them further out of
      // view and the section played as three blank screens.
      const sign = motionSignFor(locale);
      // Under reduced motion the CSS in globals.css stacks the track, because
      // the horizontal layout is only readable *because* of the translate —
      // that transform is layout-critical, not decorative. So: no JS here,
      // and no zipper either: there is nothing to scrub, the steps are
      // already all on screen.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const scope = root.current;
      const track = scope?.querySelector<HTMLElement>(".h-track");
      const rail = scope?.querySelector<HTMLElement>(".rail");
      const fill = scope?.querySelector<HTMLElement>(".rail-fill");
      const marker = scope?.querySelector<HTMLElement>(".rail-marker");
      if (!scope || !track || !rail || !fill || !marker) return;

      // How far the track itself must slide to reveal the final panel — tied
      // to the panels' real pixel width, because the last panel's outer edge
      // has to land exactly flush with the viewport's.
      const travelDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);
      // The rail fill stops where the marker stops, not at the full width.
      const FILL_END = (STEPS.length - 1) / STEPS.length;
      const originX = rtl ? "right center" : "left center";

      gsap.set(fill, { transformOrigin: originX });

      // ---------------------------------------------------------------
      // Phase one: the scroll-jacked reveal.
      // ---------------------------------------------------------------

      // Three phases, not one continuous slide. This used to be a single
      // ease:"none" tween spanning the *entire* scroll range: the very first
      // pixel of scroll already dragged panel one away, and the section
      // unpinned on the exact same pixel that finally settled the last panel
      // into place — zero dwell time at either end, no matter how long the
      // overall range was made. (A previous fix just lengthened that same
      // single tween, which slowed the *middle* transition but left both
      // edges exactly as instantaneous as before — the panels people
      // actually complained about.) A hold before the slide starts, and
      // another after it finishes, are what actually give the first and
      // last panel real, static reading time.
      //
      // These are timeline-duration units, not seconds — scrub ignores real
      // time and maps scroll fraction 0..1 straight onto timeline progress
      // 0..1, so only the *ratio* between HOLD and TRAVEL matters.
      const HOLD = 0.7;
      const TRAVEL = Math.max(1, STEPS.length - 1) * 1.0;
      const TOTAL = HOLD + TRAVEL + HOLD;

      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: scope,
            start: "top top",
            // Sized in viewport-heights, like Statement.tsx's own pinned
            // sweep ("+=200%") — independent of panel width/count, so this
            // won't silently break again if a step is added or removed.
            end: () => "+=" + TOTAL * window.innerHeight,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        })
        // Nothing is scheduled at time 0 — the gap from 0 to HOLD is itself
        // the opening hold, panel one sitting still while the visitor scrolls
        // through it.
        .to(
          track,
          { x: () => -sign * travelDistance(), duration: TRAVEL, ease: "none" },
          HOLD,
        )
        .to(
          marker,
          {
            // Travels away from its own start edge, which `start-0` has
            // already placed on the correct side of the rail.
            xPercent: sign * 100 * (STEPS.length - 1),
            duration: TRAVEL,
            ease: "none",
          },
          HOLD,
        )
        .to(fill, { scaleX: FILL_END, duration: TRAVEL, ease: "none" }, HOLD)
        // The closing hold. Without this, the timeline's own duration would
        // just be HOLD + TRAVEL (wherever the last real tween ends) and
        // scrub would stretch that across the *entire* configured scroll
        // range anyway, silently erasing the trailing pause TOTAL was meant
        // to reserve. An empty tween forces the timeline to actually be as
        // long as TOTAL, so the last HOLD unit of scroll genuinely does
        // nothing — the last panel sits fully settled and readable right up
        // until the section releases.
        .to({}, { duration: HOLD });

      const st = tl.scrollTrigger!;

      // ---------------------------------------------------------------
      // Phase two: retire the scroll-jack, hand control to the rail.
      // ---------------------------------------------------------------

      // Progress here is 0..1 across the whole gallery, matching the
      // timeline's own TRAVEL segment: 0 is the first panel, 1 the last.
      const setTrackX = gsap.quickSetter(track, "x", "px");
      const setFill = gsap.quickSetter(fill, "scaleX");
      const setMarkerX = gsap.quickSetter(marker, "x", "px");
      const maxX = () => Math.max(1, rail.clientWidth - marker.offsetWidth);

      const paint = (p: number) => {
        setTrackX(-sign * p * travelDistance());
        setFill(p * FILL_END);
        setMarkerX(sign * p * maxX());
        marker.setAttribute(
          "aria-valuenow",
          String(Math.round(p * (STEPS.length - 1)) + 1),
        );
      };

      let detached = false;
      // Assigned below; detach() runs later than this and needs to arm it.
      let dragger: Draggable | null = null;

      const detach = () => {
        if (detached) return;
        detached = true;

        const yBefore = window.scrollY;
        const hBefore = document.documentElement.scrollHeight;

        // kill(true) reverts the pin AND the animation — ScrollTrigger.js
        // calls animation.revert() on the way out, which snaps the track
        // back to x:0. So the finished state has to be re-applied by hand
        // afterwards, or the section resets to step one the moment it
        // detaches.
        st.kill(true);

        // The marker was driven by xPercent during the scroll; the slider
        // drives it in pixels. The two coincide exactly at the end — the
        // marker is 1/n of the rail wide, so its (n-1)-widths of xPercent
        // travel is (n-1)/n of the rail, which is exactly maxX — so this
        // swap is lossless rather than an approximation.
        gsap.set(marker, { xPercent: 0 });
        gsap.set(fill, { transformOrigin: originX });
        paint(1);

        // Removing the pin spacer takes ~3060px of height out of the
        // document, all of it above the current scroll position, so every
        // pixel of content below would jump up by that much. Subtracting
        // the same delta keeps the viewport on the content it was already
        // showing. resize() first: Lenis caches the scroll limit from the
        // old height and would clamp a scrollTo that it still thinks is out
        // of bounds.
        const delta = hBefore - document.documentElement.scrollHeight;
        if (delta > 0) {
          const l = lenisRef.current;
          if (l) {
            l.resize();
            l.scrollTo(yBefore - delta, { immediate: true, force: true });
          } else {
            window.scrollTo(0, yBefore - delta);
          }
        }
        ScrollTrigger.refresh();
        // Only now — before this the mark is a read-only progress indicator,
        // and a live Draggable would be fighting the scrub for control of
        // the same element's transform.
        dragger?.enable();
        setZipper(true);
      };

      // Deliberately NOT on the trigger's own onLeave. That fires mid-
      // gesture, with Lenis still resolving momentum against a target
      // computed for the old document height, which makes the height swap
      // visible as a yank. Waiting until the section is half a screen behind
      // lets the gesture settle, and puts any residual error off-screen.
      ScrollTrigger.create({
        start: () => st.end + window.innerHeight * 0.5,
        end: "+=1",
        once: true,
        onEnter: detach,
      });

      // ---------------------------------------------------------------
      // The zipper itself.
      // ---------------------------------------------------------------

      // Panels sit at even fractions: with three steps, 0 / 0.5 / 1. Landing
      // between two of them would leave both half-readable, so a release
      // settles on the nearest.
      const snapP = (p: number) =>
        Math.round(p * (STEPS.length - 1)) / (STEPS.length - 1);

      const currentP = () =>
        gsap.utils.clamp(
          0,
          1,
          (sign * Number(gsap.getProperty(marker, "x"))) / maxX(),
        );

      const glideTo = (p: number) => {
        const proxy = { p: currentP() };
        gsap.to(proxy, {
          p: gsap.utils.clamp(0, 1, p),
          duration: 0.5,
          ease: "power3.out",
          overwrite: true,
          onUpdate: () => paint(proxy.p),
        });
      };

      const [drag] = Draggable.create(marker, {
        type: "x",
        // Explicit numbers rather than `bounds: rail` — the marker is taller
        // than the 1px rail it runs along, and element bounds would try to
        // contain it vertically too.
        bounds: rtl
          ? { minX: -maxX(), maxX: 0 }
          : { minX: 0, maxX: maxX() },
        cursor: "grab",
        activeCursor: "grabbing",
        allowNativeTouchScrolling: false,
        onPress() {
          // Bounds are read once at create time; the viewport may have been
          // resized since.
          this.applyBounds(
            rtl ? { minX: -maxX(), maxX: 0 } : { minX: 0, maxX: maxX() },
          );
        },
        onDrag() {
          paint(gsap.utils.clamp(0, 1, (sign * this.x) / maxX()));
        },
        onRelease() {
          glideTo(snapP(gsap.utils.clamp(0, 1, (sign * this.x) / maxX())));
        },
      });
      drag.disable();
      dragger = drag;

      // Clicking anywhere along the rail jumps to that step — the same
      // affordance a scrubbed progress bar gives, and much easier to hit
      // than the mark itself on a phone.
      const onRailDown = (e: PointerEvent) => {
        if (!detached || marker.contains(e.target as Node)) return;
        const r = rail.getBoundingClientRect();
        const along = rtl ? r.right - e.clientX : e.clientX - r.left;
        glideTo(snapP(gsap.utils.clamp(0, 1, along / r.width)));
      };
      // Arrow keys step one panel at a time; Home/End jump to the ends.
      const onKey = (e: KeyboardEvent) => {
        if (!detached) return;
        const unit = 1 / (STEPS.length - 1);
        const now = snapP(currentP());
        const map: Record<string, number> = {
          ArrowRight: now + (rtl ? -unit : unit),
          ArrowLeft: now + (rtl ? unit : -unit),
          ArrowUp: now + unit,
          ArrowDown: now - unit,
          Home: 0,
          End: 1,
        };
        if (!(e.key in map)) return;
        e.preventDefault();
        glideTo(gsap.utils.clamp(0, 1, map[e.key]));
      };

      rail.addEventListener("pointerdown", onRailDown);
      marker.addEventListener("keydown", onKey);

      const onResize = () => detached && paint(currentP());
      window.addEventListener("resize", onResize);

      return () => {
        rail.removeEventListener("pointerdown", onRailDown);
        marker.removeEventListener("keydown", onKey);
        window.removeEventListener("resize", onResize);
        drag.kill();
      };
    },
    { scope: root },
  );

  return (
    <section id="how" ref={root} className="relative h-svh overflow-hidden">
      <div className="how-eyebrow absolute inset-x-0 top-0 z-10 mx-auto max-w-[1400px] px-6 pt-24 lg:px-10 lg:pt-28">
        <p className="eyebrow">{dict.howItWorks.eyebrow}</p>
      </div>

      <div className="flex h-full items-center">
        <div className="h-track flex">
          {STEPS.map((s, i) => (
            <article
              key={s.title}
              className="step-panel flex w-[86vw] shrink-0 flex-col justify-center px-6 sm:w-[68vw] sm:px-[6vw] lg:w-[52vw]"
            >
              <span className="display block text-[clamp(3.5rem,14vw,7rem)] text-line">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display mt-2 text-[clamp(1.9rem,6.5vw,3.25rem)]">
                {s.title}
              </h3>
              <p className="measure mt-5 text-base leading-relaxed text-muted lg:text-lg">
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="rail-wrap absolute inset-x-0 bottom-12 z-10 mx-auto max-w-[1400px] px-6 lg:bottom-16 lg:px-10">
        {/* Taller hit area than the 1px hairline it draws, so the rail is
            tappable on a phone once it becomes a control. */}
        <div className="rail relative h-px w-full bg-line before:absolute before:inset-x-0 before:-top-4 before:h-9 before:content-['']">
          {/* origin is set from JS too, since GSAP inlines transform-origin
              when it takes over the element; this class is what holds under
              reduced motion, where none of that JS runs. */}
          <div
            className={`rail-fill absolute inset-0 scale-x-0 bg-accent ${
              rtl ? "origin-right" : "origin-left"
            }`}
          />
          <div
            className={`rail-marker absolute -top-3 start-0 text-accent ${
              zipper
                ? "cursor-grab touch-none rounded-sm outline-offset-4 focus-visible:outline-2 focus-visible:outline-accent"
                : ""
            }`}
            style={{ width: `${100 / STEPS.length}%` }}
            {...(zipper
              ? {
                  role: "slider" as const,
                  tabIndex: 0,
                  "aria-label": dict.howItWorks.scrubberLabel,
                  "aria-orientation": "horizontal" as const,
                  "aria-valuemin": 1,
                  "aria-valuemax": STEPS.length,
                  "aria-valuenow": STEPS.length,
                }
              : { "aria-hidden": true })}
          >
            <ContainerMark className="h-6 w-[33px]" />
          </div>
        </div>
      </div>

      {/* Lifted clear of the progress rail, which already occupies the
          bottom of this section at bottom-12/bottom-16. At the default
          bottom-6 the cue's 32px of height would cross the rail line. */}
      <ScrollCue className="!bottom-24 lg:!bottom-28" />
    </section>
  );
}
