"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WORDS = [
  "Sea freight",
  "Consolidation",
  "Customs clearance",
  "Door to door",
  "Sourcing",
  "Groupage",
];

/**
 * A continuously moving strip. Two jobs: it breaks up a page that would
 * otherwise be four near-identical full-width stacks, and it puts motion on
 * screen that does not depend on the visitor scrolling at all.
 *
 * Scroll velocity nudges its speed, so it feels connected to the page rather
 * than bolted on.
 */
export default function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // The content is rendered twice, so travelling exactly one copy's width
      // loops seamlessly.
      const tween = gsap.to(".marquee-inner", {
        xPercent: -50,
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
