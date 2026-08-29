"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContainerMark } from "./Logo";

/**
 * Deliberately abstract steps. The literal shipping sequence (drop-off →
 * consolidate → customs → delivery) only describes the forwarding side and
 * reads as irrelevant to a business sourcing goods. Home stays broad; the real
 * audience fork happens at sign-up.
 *
 * The track scrolls horizontally at EVERY breakpoint. It used to be desktop-
 * only, which meant a phone got four static stacked paragraphs — the flattest
 * possible reading of the page.
 */
const STEPS = [
  {
    n: "01",
    title: "Tell us what you need",
    body: "A pallet of household goods to Beirut, or a product you want sourced and supplied. One message is enough to start.",
  },
  {
    n: "02",
    title: "We plan the route",
    body: "We consolidate your cargo into a container alongside other shipments, or connect you to the right supplier and terms.",
  },
  {
    n: "03",
    title: "We handle the complexity",
    body: "Documentation, customs clearance through a licensed local broker, and every duty and fee calculated up front — not sprung on arrival.",
  },
  {
    n: "04",
    title: "It arrives",
    body: "Delivered to the door of the person who is waiting for it, with the paperwork already settled.",
  },
];

export default function HowItWorks() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      // Under reduced motion the CSS in globals.css stacks the track, because
      // the horizontal layout is only readable *because* of the translate —
      // that transform is layout-critical, not decorative. So: no JS here.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const track = root.current?.querySelector<HTMLElement>(".h-track");
      if (!track) return;
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + distance(),
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        })
        .to(track, { x: () => -distance(), ease: "none" }, 0)
        .to(
          ".rail-marker",
          { xPercent: 100 * (STEPS.length - 1), ease: "none" },
          0,
        )
        .to(
          ".rail-fill",
          // Stop where the marker stops, not at the full rail width.
          { scaleX: (STEPS.length - 1) / STEPS.length, ease: "none" },
          0,
        );
    },
    { scope: root },
  );

  return (
    <section id="how" ref={root} className="relative h-svh overflow-hidden">
      <div className="how-eyebrow absolute inset-x-0 top-0 z-10 mx-auto max-w-[1400px] px-6 pt-24 lg:px-10 lg:pt-28">
        <p className="eyebrow">How it works</p>
      </div>

      <div className="flex h-full items-center">
        <div className="h-track flex">
          {STEPS.map((s) => (
            <article
              key={s.n}
              className="step-panel flex w-[86vw] shrink-0 flex-col justify-center px-6 sm:w-[68vw] sm:px-[6vw] lg:w-[52vw]"
            >
              <span className="display block text-[clamp(3.5rem,14vw,7rem)] text-line">
                {s.n}
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
          <div className="rail-fill absolute inset-0 origin-left scale-x-0 bg-accent" />
          <div
            className="rail-marker absolute -top-3 left-0 text-accent"
            style={{ width: `${100 / STEPS.length}%` }}
          >
            <ContainerMark className="h-6 w-6" strokeWidth={8} />
          </div>
        </div>
      </div>
    </section>
  );
}
