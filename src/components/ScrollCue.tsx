"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * The triple-chevron "keep scrolling" mark, lifted out of Hero so every
 * section can carry one.
 *
 * Three strokes at descending opacity read as motion on their own; a slow
 * staggered pulse travelling downward reinforces the direction without
 * relying on the word "Scroll". Purely decorative — `aria-hidden`, no link.
 * Screen readers get nothing from it that the page order doesn't already
 * say, and a control that scrolls the page for you is a different feature
 * from a hint that the page continues.
 *
 * Colour comes from `currentColor`, not a baked-in `stroke="white"`. The
 * hero is a dark video and everything below it is a light background, so
 * the same mark has to render white once and near-black four times; `tone`
 * picks which, rather than each caller re-deriving it.
 *
 * The pulse is scoped to this component's own <svg>. That matters now that
 * five of these exist on one page: a `.scroll-chevron` selector rooted at
 * the document would have one instance's tween driving all fifteen paths,
 * with every section's chevrons pulsing in lockstep off whichever instance
 * mounted last.
 */
export default function ScrollCue({
  tone = "dark",
  className = "",
}: {
  /** "light" for the dark hero video, "dark" for the light sections below. */
  tone?: "light" | "dark";
  /** Position overrides. Defaults to the bottom inline-END corner —
      logical, not physical, so it sits bottom-right in English and German and
      mirrors to bottom-left in Arabic, like everything else on this page.
      Sections with something already in that corner (HowItWorks' progress
      rail) move it up rather than restyle it. */
  className?: string;
}) {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      // Each chevron dims and brightens in turn, top to bottom — a wave
      // travelling downward. Each path's resting opacity is read back off
      // its own attribute so the three keep their relative weighting
      // instead of all pulsing to one shared value.
      gsap.to(".scroll-chevron", {
        opacity: (i, t: Element) => Number(t.getAttribute("opacity")) * 0.25,
        duration: 0.6,
        stagger: { each: 0.15, repeat: -1, yoyo: true },
        ease: "sine.inOut",
      });
    },
    { scope: root },
  );

  return (
    <svg
      ref={root}
      className={`scroll-cue pointer-events-none absolute bottom-6 end-6 h-8 w-5 lg:end-10 ${
        tone === "light" ? "text-white" : "text-fg"
      } ${className}`}
      viewBox="0 0 20 32"
      fill="none"
      aria-hidden="true"
    >
      {[
        { d: "M2 2l8 8 8-8", o: "1" },
        { d: "M2 12l8 8 8-8", o: "0.6" },
        { d: "M2 22l8 8 8-8", o: "0.3" },
      ].map((c) => (
        <path
          key={c.d}
          className="scroll-chevron"
          d={c.d}
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={c.o}
        />
      ))}
    </svg>
  );
}
