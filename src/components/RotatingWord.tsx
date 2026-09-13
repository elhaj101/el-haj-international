"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * One word inside a sentence that cycles through alternatives — here, the
 * hero's "Europe" becoming each country the route actually starts from.
 *
 * Each word gets its own colour. The palette is tuned for the hero's dark
 * video backdrop (the copy around it is white/75), so it's bright and a
 * little desaturated; a flag-accurate palette would put navy and black on
 * near-black.
 *
 * Two details that aren't obvious:
 *
 * The width is tweened along with the swap. Without it, rotating between
 * "Italy" and "the Netherlands" shoves the rest of the sentence sideways
 * every two seconds, which reads as the layout breaking rather than as an
 * effect. Each candidate is measured once in a hidden ruler so the tween has
 * a real target and the measuring never causes a visible reflow.
 *
 * The clipping box is stretched vertically by padding that is cancelled with
 * an equal negative margin. The word slides up and out, so the wrapper needs
 * `overflow: hidden` — but a box exactly one line tall cuts the descenders
 * off Arabic (ج، ي) and from Latin letters like the "g" in "Belgien". The
 * padding/margin pair grows the clip region without moving anything.
 *
 * Under reduced motion this renders the resting word, coloured, and never
 * cycles — text that rewrites itself every two seconds forever is exactly
 * the kind of persistent motion that setting exists to suppress.
 */

/** Bright enough to hold up against the hero video at `font-semibold`. */
const COLORS = [
  "#ffffff", // index 0 — the resting word keeps the surrounding copy's colour
  "#f5a623", // amber (the site accent)
  "#4fc3f7", // sky
  "#81c784", // green
  "#ff8a80", // coral
  "#ce93d8", // violet
  "#ffd54f", // yellow
  "#4dd0e1", // cyan
  "#f48fb1", // pink
  "#a5d6a7", // mint
  "#90caf9", // blue
];

export default function RotatingWord({
  words,
  className = "",
  /** Seconds before the first swap. Long enough for the hero's own reveal to
      finish, so the first colour change doesn't happen underneath a
      paragraph that is still fading in. */
  startDelay = 3.2,
  /** Seconds each word is held. */
  interval = 2,
}: {
  words: string[];
  className?: string;
  startDelay?: number;
  interval?: number;
}) {
  const root = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      const label = el?.querySelector<HTMLElement>(".rw-label");
      if (!el || !label || words.length < 2) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const measure = () => {
        const ruler = document.createElement("span");
        const cs = getComputedStyle(label);
        ruler.style.cssText = `position:absolute;visibility:hidden;white-space:nowrap;pointer-events:none;font:${cs.font};letter-spacing:${cs.letterSpacing}`;
        document.body.appendChild(ruler);
        const out = words.map((w) => {
          ruler.textContent = w;
          return ruler.getBoundingClientRect().width;
        });
        ruler.remove();
        return out;
      };

      /**
       * Reserve the containing paragraph's worst-case height.
       *
       * The width tween keeps the *word* from shoving its neighbours
       * sideways, but it can't stop a longer word from pushing the sentence
       * onto an extra line. In the hero that is the expensive case: the copy
       * block is `flex-col justify-end`, anchored to the bottom, so one extra
       * line of subtitle lifts the <h1> above it — the headline visibly jumps
       * every time a long country name comes round.
       *
       * So the paragraph is measured once with each candidate in place and
       * pinned to the tallest result. Nothing above it can move after that,
       * whatever is showing. Measured rather than hardcoded because the
       * answer differs per locale and per viewport: German compounds wrap
       * differently from English, Arabic differently again, and "the
       * Netherlands" is three lines on a phone where "Italy" is two. A fixed
       * line-count would have to be right for all of those at once.
       *
       * Opt-in via `data-rotating-host` on the paragraph, so this only ever
       * touches an element that asked for it — RichText renders these inside
       * calculator copy too, where reserving space would be wrong.
       */
      const reserveHost = () => {
        const host = el.closest<HTMLElement>("[data-rotating-host]");
        if (!host) return;
        const restoreText = label.textContent;
        const restoreWidth = el.style.width;
        host.style.minHeight = "";
        el.style.width = "auto";
        let tallest = 0;
        for (const w of words) {
          label.textContent = w;
          tallest = Math.max(tallest, host.getBoundingClientRect().height);
        }
        label.textContent = restoreText;
        el.style.width = restoreWidth;
        host.style.minHeight = `${Math.ceil(tallest)}px`;
      };

      let widths = measure();
      let i = 0;
      gsap.set(el, { width: widths[0] });
      reserveHost();

      // A self-scheduling step rather than one repeating timeline: each swap
      // has to animate to the *next* word's measured width, and a timeline
      // built once would bake in whichever width was current at build time.
      //
      // Both handles are tracked so the cleanup below can kill them. Only
      // objects created synchronously inside this callback are captured by
      // useGSAP's context — these are created later, from a callback, so
      // they would otherwise keep running after the component unmounts
      // (which happens on every language switch).
      let tick: gsap.core.Tween | null = null;
      let swap: gsap.core.Timeline | null = null;

      const step = () => {
        const next = (i + 1) % words.length;
        swap = gsap
          .timeline({ onComplete: () => schedule(interval) })
          .to(label, {
            yPercent: -110,
            opacity: 0,
            duration: 0.32,
            ease: "power2.in",
          })
          .add(() => {
            i = next;
            label.textContent = words[i];
            label.style.color = COLORS[i % COLORS.length];
          })
          .to(el, { width: widths[next], duration: 0.34, ease: "power2.inOut" })
          .fromTo(
            label,
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.36, ease: "power3.out" },
            "<",
          );
      };

      const schedule = (delay: number) => {
        tick = gsap.delayedCall(delay, step);
      };

      // Only the FIRST wait is startDelay — every wait after it is `interval`,
      // the time each word is actually held.
      schedule(startDelay);

      // The measurements are font-dependent, and the hero's own gate is
      // document.fonts.ready — so a first pass taken before the webfont lands
      // would size every word to the fallback's metrics.
      document.fonts.ready.then(() => {
        widths = measure();
        gsap.set(el, { width: widths[i] });
        reserveHost();
      });

      const onResize = () => {
        widths = measure();
        gsap.set(el, { width: widths[i] });
        reserveHost();
      };
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
        tick?.kill();
        swap?.kill();
      };
    },
    { scope: root, dependencies: [words], revertOnUpdate: true },
  );

  return (
    <span
      ref={root}
      className={`relative inline-block overflow-hidden whitespace-nowrap py-[0.3em] my-[-0.3em] ${className}`}
      style={{ color: COLORS[0] }}
    >
      <span className="rw-label inline-block">{words[0]}</span>
    </span>
  );
}
