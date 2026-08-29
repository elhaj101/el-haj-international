"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { asset } from "@/lib/asset";

/**
 * The signature moment: a container is craned across the viewport while the
 * positioning line resolves behind it.
 *
 * Two separate motions on nested elements, deliberately:
 *   .swing-travel — scroll-scrubbed journey across the screen
 *   .swing-idle   — a slow continuous sway, so the container reads as
 *                   suspended from a crane even when the page is still
 * Both run at every breakpoint. A previous version gated the travel behind
 * min-width 768px, which left phones with a static picture.
 *
 * The line is deliberately broad — it has to speak to a family sending boxes
 * and to a business sourcing stock.
 */
export default function Statement() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger, SplitText);
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduce) {
        gsap.set(".swing-travel", { opacity: 1, xPercent: 0, yPercent: 0 });
        return;
      }

      // Idle sway — independent of scroll position, but NOT independent of
      // whether anyone can see it. These are `repeat: -1`, so left alone they
      // animate for the entire session while the visitor reads a section three
      // screens away, taking a slice of every frame budget for nothing. Gated
      // to the section's own viewport window below.
      const idle = [
        gsap.to(".swing-idle", {
          rotate: 2.2,
          duration: 3.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        }),
        gsap.to(".swing-idle", {
          y: 14,
          duration: 2.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        }),
      ];
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: ({ isActive }) =>
          idle.forEach((t) => (isActive ? t.play() : t.pause())),
      });

      const split = new SplitText(".statement-h2", { type: "words" });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=200%",
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        })
        // Craned in from the lower left, across, and away to the upper right.
        .fromTo(
          ".swing-travel",
          { xPercent: -78, yPercent: 34, rotate: -9, scale: 0.86 },
          {
            xPercent: 78,
            yPercent: -26,
            rotate: 7,
            scale: 1.04,
            ease: "none",
            duration: 1,
          },
          0,
        )
        .from(
          split.words,
          { opacity: 0.1, stagger: 0.05, duration: 0.3, ease: "none" },
          0.05,
        );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="statement-section relative flex h-svh items-center overflow-hidden bg-bg-alt px-6 lg:px-10"
    >
      {/* Behind the type so the statement stays readable across the whole
          sweep. Sized in vw so it stays large on a phone — an earlier version
          used vmin and rendered about 240px wide on a handset. */}
      <div className="swing-travel pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div className="swing-idle relative aspect-[1531/975] w-[105vw] max-w-none sm:w-[85vw] lg:w-[62vw]">
          {/* Hand-written <picture>, not next/image. `unoptimized` is forced
              by the static export, and it emits no srcset — so a 390px phone
              was fetching and, more importantly, *decoding* the full
              1531x975 frame.

              File size is not the cost that bites here: a decoded bitmap is
              width x height x 4 bytes whatever the encoding, and this image is
              scrubbed across a pinned section, so it sits in GPU memory the
              whole time it moves. ~6MB of texture became ~2MB on phones —
              exactly the devices least able to spare it. Desktop keeps the
              full frame; at 62vw of a wide viewport 1531px is already the
              minimum that holds up. */}
          <picture>
            <source
              media="(max-width: 640px)"
              srcSet={asset("/container-900.webp")}
            />
            <img
              src={asset("/container.webp")}
              alt=""
              width={1531}
              height={975}
              className="absolute inset-0 h-full w-full object-contain"
            />
          </picture>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        <p className="eyebrow mb-6">What we do</p>
        <h2 className="statement-h2 display max-w-[15ch] text-[clamp(2.4rem,8vw,6rem)] [text-shadow:0_2px_24px_var(--bg-alt)]">
          We ship everything from Europe to the Middle East
        </h2>
      </div>
    </section>
  );
}
