"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContainerMark } from "./Logo";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { motionSignFor, type Locale } from "@/lib/i18n/locales";

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

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      // +1 left-to-right, -1 right-to-left. The flex track itself is already
      // mirrored by the browser under `dir="rtl"` — measured at 1440px, the
      // three panels sit at x = 691 / -58 / -806 instead of 0 / 749 / 1498,
      // i.e. panels two and three are off-screen to the LEFT. Sliding the
      // track the LTR way (x: -806) therefore pushed them further out of
      // view and the section played as three blank screens.
      const sign = motionSignFor(locale);
      // Under reduced motion the CSS in globals.css stacks the track, because
      // the horizontal layout is only readable *because* of the translate —
      // that transform is layout-critical, not decorative. So: no JS here.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const track = root.current?.querySelector<HTMLElement>(".h-track");
      if (!track) return;
      // How far the track itself must slide left to reveal the final panel —
      // tied to the panels' real pixel width, because the last panel's right
      // edge has to land exactly flush with the viewport's right edge.
      const travelDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

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

      // The rail fills from whichever end the reader starts at. This is a
      // transform-origin, so it can't be left to a logical CSS property —
      // set here rather than via a class because GSAP writes
      // `transform-origin` inline when it takes over an element's transform,
      // and an inline style beats any class.
      gsap.set(".rail-fill", {
        transformOrigin: rtl ? "right center" : "left center",
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
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
          ".rail-marker",
          {
            // Travels away from its own start edge, which `start-0` has
            // already placed on the correct side of the rail.
            xPercent: sign * 100 * (STEPS.length - 1),
            duration: TRAVEL,
            ease: "none",
          },
          HOLD,
        )
        .to(
          ".rail-fill",
          // Stop where the marker stops, not at the full rail width.
          {
            scaleX: (STEPS.length - 1) / STEPS.length,
            duration: TRAVEL,
            ease: "none",
          },
          HOLD,
        )
        // The closing hold. Without this, the timeline's own duration would
        // just be HOLD + TRAVEL (wherever the last real tween ends) and
        // scrub would stretch that across the *entire* configured scroll
        // range anyway, silently erasing the trailing pause TOTAL was meant
        // to reserve. An empty tween forces the timeline to actually be as
        // long as TOTAL, so the last HOLD unit of scroll genuinely does
        // nothing — the last panel sits fully settled and readable right up
        // until the section releases.
        .to({}, { duration: HOLD });
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

      <div className="rail-wrap absolute inset-x-0 bottom-12 mx-auto max-w-[1400px] px-6 lg:bottom-16 lg:px-10">
        <div className="relative h-px w-full bg-line">
          {/* origin set from JS above too, for when GSAP inlines it; this
              class is what holds under reduced motion, where no JS runs. */}
          <div
            className={`rail-fill absolute inset-0 scale-x-0 bg-accent ${
              rtl ? "origin-right" : "origin-left"
            }`}
          />
          <div
            className="rail-marker absolute -top-3 start-0 text-accent"
            style={{ width: `${100 / STEPS.length}%` }}
          >
            <ContainerMark className="h-6 w-[33px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
