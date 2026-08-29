"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { asset } from "@/lib/asset";

/**
 * The hero → "how it works" bridge. A container swings across the viewport on
 * scroll, carrying the eye down the page, while the deliberately broad
 * positioning line resolves behind it. Deliberately vague: it has to read as
 * relevant to a family sending boxes and to a business sourcing stock.
 */
export default function Statement() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger, SplitText);
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const split = new SplitText(".statement-h2", {
            type: "words",
            wordsClass: "word",
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=180%",
              scrub: 1,
              pin: true,
            },
          });

          // The container is lifted, swung across, and set down.
          tl.fromTo(
            ".swinging-container",
            { xPercent: -60, yPercent: -25, rotate: -7, opacity: 0 },
            { opacity: 1, duration: 0.1 },
            0,
          )
            .to(
              ".swinging-container",
              {
                xPercent: 60,
                yPercent: 30,
                rotate: 5,
                ease: "none",
                duration: 1,
              },
              0,
            )
            .from(
              split.words,
              { opacity: 0.12, stagger: 0.06, duration: 0.35, ease: "none" },
              0.05,
            );
        },
      );

      // Mobile: no pin (pinned sections are the first thing to break on small
      // screens). Straight fade-in instead.
      mm.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.from(".statement-h2", {
            opacity: 0,
            y: 30,
            scrollTrigger: { trigger: root.current, start: "top 75%" },
          });
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-svh items-center overflow-hidden bg-bg-alt px-6 lg:px-10"
    >
      {/* The travelling container. Sits behind the type so the statement stays
          readable at every point in the swing. */}
      <div className="swinging-container pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div className="relative h-[38vmin] w-[62vmin] opacity-90">
          <Image
            src={asset("/container.png")}
            alt=""
            fill
            unoptimized
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        <p className="eyebrow mb-8">What we do</p>
        <h2 className="statement-h2 display max-w-[16ch] text-[clamp(2.25rem,7vw,5.5rem)]">
          We ship everything from Europe to the Middle East
        </h2>
      </div>
    </section>
  );
}
