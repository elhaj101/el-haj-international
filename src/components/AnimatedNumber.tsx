"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Counts to a new value instead of snapping to it.
 *
 * One tween per instance, reused and overwritten — creating a fresh tween on
 * every `input` event while someone drags a slider makes them fight each other
 * and the digits stutter.
 */
export default function AnimatedNumber({
  value,
  format,
  className,
}: {
  value: number;
  format: (n: number) => string;
  className?: string;
}) {
  const el = useRef<HTMLSpanElement>(null);
  const state = useRef({ v: value });
  const tween = useRef<gsap.core.Tween | null>(null);
  // Keep the latest formatter without restarting the tween when it changes.
  // Assigned in a dep-less effect, not during render — a ref write during
  // render is only safe if React never discards the render it happened in,
  // which concurrent features don't guarantee.
  const fmt = useRef(format);
  useEffect(() => {
    fmt.current = format;
  });

  useEffect(() => {
    if (!el.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      state.current.v = value;
      el.current.textContent = fmt.current(value);
      return;
    }

    tween.current?.kill();
    tween.current = gsap.to(state.current, {
      v: value,
      duration: 0.5,
      ease: "power2.out",
      overwrite: true,
      onUpdate: () => {
        if (el.current) el.current.textContent = fmt.current(state.current.v);
      },
    });
  }, [value]);

  useEffect(
    () => () => {
      tween.current?.kill();
    },
    [],
  );

  // Rendered with the real value so the static export and the no-JS view are
  // both correct before any tween runs.
  //
  // Two spans, not one: the visible one is the GSAP-tweened counter and is
  // `aria-hidden`, because a live region on it would announce every
  // intermediate frame of a 0.5s count-up — rapid nonsense to a screen
  // reader, not a price. The sr-only sibling is plain React output with no
  // tween of its own, so it only ever holds `format(value)` — one update
  // per actual change, debounced to the settled number for free by simply
  // not being animated. This is the calculator's only dynamic output, so
  // leaving it unannounced was the more consequential gap of the two.
  return (
    <>
      <span ref={el} className={className} aria-hidden="true">
        {format(value)}
      </span>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {format(value)}
      </span>
    </>
  );
}
