"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ContainerMark } from "./Logo";

/**
 * Short branded entrance. Deliberately under a second and a half — a preloader
 * that makes people wait is worse than none.
 *
 * Two safety nets, both of which matter more than the animation itself:
 *
 * 1. The overlay is `opacity: 0` in CSS until `.js-ready` is set, so if
 *    scripts fail it never appears and cannot trap the page behind it.
 * 2. GSAP is driven by requestAnimationFrame, which fires ZERO frames while a
 *    tab is backgrounded. Phones background tabs constantly — tap a link, get
 *    a notification, come back. Without a timer-based escape the timeline
 *    never completes, the overlay never lifts, and `body.overflow: hidden`
 *    leaves the page frozen. setTimeout still fires when rAF does not, so the
 *    dismissal is driven by a timer and the animation is only decoration.
 */
const HOLD_MS = 1500;

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      const finish = () => {
        document.body.style.overflow = "";
        if (el) el.style.display = "none";
      };

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // Nothing to show someone who isn't looking, and nothing to animate on a
      // tab that will not paint. Skip straight to the page.
      if (reduce || document.hidden) {
        finish();
        return;
      }

      document.body.style.overflow = "hidden";

      // The guarantee. Fires whether or not a single frame is ever rendered.
      const failsafe = window.setTimeout(finish, HOLD_MS + 1400);

      const counter = { v: 0 };
      const tl = gsap
        .timeline({
          onComplete: () => {
            window.clearTimeout(failsafe);
            finish();
          },
        })
        .to(counter, {
          v: 100,
          duration: 1,
          ease: "power2.inOut",
          onUpdate: () => {
            const c = el?.querySelector(".pl-count");
            if (c) c.textContent = String(Math.round(counter.v));
          },
        })
        .to(".pl-mark", { scale: 1.15, opacity: 0, duration: 0.4 }, "-=0.2")
        .to(el, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "-=0.15");

      return () => {
        window.clearTimeout(failsafe);
        tl.kill();
        document.body.style.overflow = "";
      };
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="preloader fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
      aria-hidden="true"
    >
      <ContainerMark className="pl-mark h-14 w-[76px]" priority />
      <p className="display mt-6 text-5xl tabular-nums">
        <span className="pl-count">0</span>
        <span className="text-accent">%</span>
      </p>
    </div>
  );
}
