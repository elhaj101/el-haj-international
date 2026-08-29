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
  const fmt = useRef(format);
  fmt.current = format;

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
  return (
    <span ref={el} className={className}>
      {format(value)}
    </span>
  );
}
