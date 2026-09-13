"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { motionSignFor, type Locale } from "@/lib/i18n/locales";

/**
 * A continuously moving strip. Two jobs: it breaks up a page that would
 * otherwise be four near-identical full-width stacks, and it puts motion on
 * screen that does not depend on the visitor scrolling at all.
 *
 * Scroll velocity nudges its speed, so it feels connected to the page rather
 * than bolted on.
 */
export default function Marquee({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const WORDS = dict.marquee.words;
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // The content is rendered twice, so travelling exactly one copy's width
      // loops seamlessly.
      //
      // Which way it travels is not a style choice — it's the only direction
      // that keeps the strip full. `w-max` inside the overflow-hidden frame
      // anchors the content at the frame's start edge, so under RTL it hangs
      // off to the LEFT (measured at 1440px: the inner spans -3353 to 1440
      // rather than 0 to 4106). Moving it further left, as the LTR sign does,
      // walks it away from the visible frame and leaves a widening blank gap
      // at the right — so the sign has to follow the anchor.
      const tween = gsap.to(".marquee-inner", {
        xPercent: -50 * motionSignFor(locale),
        repeat: -1,
        duration: 24,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        // A `repeat: -1` strip keeps animating off-screen otherwise, costing
        // frames on sections where nothing about it is visible.
        onToggle: ({ isActive }) => (isActive ? tween.play() : tween.pause()),
        onUpdate: (self) => {
          // Scrubbing fast speeds the strip up and flips it with direction.
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 900, 4);
          tween.timeScale(self.direction * boost);
        },
      });
      // Starts paused; the trigger plays it the moment the strip is in view.
      tween.pause();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="overflow-hidden border-y border-line bg-bg py-6 lg:py-8"
      aria-hidden="true"
    >
      <div className="marquee-inner flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {WORDS.map((w) => (
              <span
                key={w}
                className="display flex items-center gap-8 whitespace-nowrap px-8 text-[clamp(1.5rem,4vw,2.75rem)] text-fg/85"
              >
                {w}
                <span className="text-accent">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
