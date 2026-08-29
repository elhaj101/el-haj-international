"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContainerMark } from "./Logo";

/**
 * Deliberately abstract steps. The literal shipping sequence (drop-off →
 * consolidate → customs → delivery) only describes the private/forwarding
 * side and reads as irrelevant to a business sourcing goods. Home stays broad;
 * the real fork happens at sign-up.
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
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const track = root.current?.querySelector<HTMLElement>(".h-track");
          if (!track) return;

          const distance = () => track.scrollWidth - window.innerWidth;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: () => "+=" + distance(),
              scrub: 1,
              pin: true,
              invalidateOnRefresh: true,
            },
          });

          tl.to(track, { x: () => -distance(), ease: "none" }, 0)
            // The mark travels the progress rail in step with the panels —
            // same "an object moves as you scroll" device as the hero bridge.
            .to(".rail-marker", { xPercent: 100 * (STEPS.length - 1), ease: "none" }, 0)
            .to(
              ".rail-fill",
              // Stop where the marker stops, not at the full width.
              { scaleX: (STEPS.length - 1) / STEPS.length, ease: "none" },
              0,
            );
        },
      );

      // Mobile: panels stack and simply reveal.
      mm.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.from(".step-panel", {
            y: 40,
            opacity: 0,
            stagger: 0.12,
            scrollTrigger: { trigger: root.current, start: "top 75%" },
          });
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      id="how"
      ref={root}
      className="relative overflow-hidden py-24 md:h-svh md:py-0"
    >
      <div className="how-eyebrow mx-auto max-w-[1400px] px-6 md:absolute md:inset-x-0 md:top-0 md:z-10 md:px-10 md:pt-28">
        <p className="eyebrow">How it works</p>
      </div>

      <div className="md:flex md:h-full md:items-center">
        <div className="h-track flex flex-col gap-14 px-6 md:flex-row md:gap-0 md:px-0">
          {STEPS.map((s) => (
            <article
              key={s.n}
              className="step-panel md:flex md:w-[68vw] md:shrink-0 md:flex-col md:justify-center md:px-[6vw] lg:w-[52vw]"
            >
              <span className="display block text-[clamp(3.5rem,9vw,7rem)] text-line">
                {s.n}
              </span>
              <h3 className="display mt-2 text-[clamp(1.75rem,4vw,3.25rem)]">
                {s.title}
              </h3>
              <p className="measure mt-5 text-base leading-relaxed text-muted lg:text-lg">
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Progress rail — desktop only, mirrors the horizontal travel. */}
      <div className="rail-wrap mx-auto hidden max-w-[1400px] px-10 md:absolute md:inset-x-0 md:bottom-16 md:block">
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
