"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { whatsappLink } from "@/lib/pricing";
import { asset } from "@/lib/asset";

/**
 * Full-bleed photographic hero — the ship fills the viewport at every size,
 * phone included. An earlier version made this an inset panel beside the
 * headline; on a phone that collapsed to a small picture under some text and
 * lost the whole point of the shot.
 */
export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger, SplitText);
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduce) {
        gsap.set(".hero-fade, .hero-h1", { opacity: 1, y: 0 });
        return;
      }

      document.fonts.ready.then(() => {
        const split = new SplitText(".hero-h1", {
          type: "lines",
          linesClass: "line",
          mask: "lines",
        });

        gsap
          .timeline({ delay: 1.5 }) // let the preloader clear first
          .from(".hero-media", {
            scale: 1.18,
            duration: 2.2,
            ease: "power2.out",
          })
          .from(
            split.lines,
            { yPercent: 115, duration: 1.2, stagger: 0.1, ease: "power4.out" },
            0.15,
          )
          .from(
            ".hero-fade",
            { y: 26, opacity: 0, duration: 0.9, stagger: 0.1 },
            0.6,
          );

        // Scrubbed parallax: the photo drifts and the copy lifts away as the
        // page moves past, so the hero hands off rather than just scrolling
        // out. Runs at every breakpoint — this is the signature moment on a
        // phone too, not a desktop-only flourish.
        gsap.to(".hero-media", {
          yPercent: 18,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(".hero-copy", {
          yPercent: -28,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "75% top",
            scrub: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative h-svh w-full overflow-hidden bg-[#0d1720]"
    >
      <div className="hero-media absolute inset-0">
        <Image
          src={asset("/hero-ship.jpg")}
          alt="A container ship at sea"
          fill
          priority
          unoptimized
          sizes="100vw"
          // Source is a tall drone portrait (1440x2912) with the ship sitting
          // about a quarter of the way down. On a wide desktop crop,
          // object-center would land on open water and miss the ship entirely
          // — bias the focal point to where the subject actually is.
          className="object-cover"
          style={{ objectPosition: "50% 24%" }}
        />
      </div>

      {/* Scrim weighted to the bottom, where the type sits, so the photograph
          still reads as the hero rather than a darkened backdrop. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/30" />

      <div className="hero-copy relative flex h-full flex-col justify-end px-6 pb-16 lg:px-10 lg:pb-20">
        <div className="mx-auto w-full max-w-[1400px]">
          <p className="eyebrow hero-fade mb-5 !text-white/70">
            Hamburg <span className="text-accent">·</span> Europe to the Middle
            East
          </p>
          <h1 className="hero-h1 display text-[clamp(2.9rem,10.5vw,9rem)] text-white">
            We move what
            <br />
            matters to you
          </h1>
          <p className="hero-fade measure mt-6 text-base leading-relaxed text-white/75 lg:text-lg">
            Consolidated container shipping and trading between Europe and the
            Middle East.
          </p>
          <div className="hero-fade mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href={whatsappLink(
                "Hi, I found El Haj International and I'd like to ask about shipping.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.03]"
            >
              Chat with us
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>
            <Link
              href="/calculator"
              className="rounded-full border border-white/35 px-7 py-3.5 text-sm font-medium text-white transition-colors duration-200 hover:border-white"
            >
              Estimate a shipment
            </Link>
          </div>
        </div>
      </div>

      <div className="hero-fade absolute bottom-6 right-6 hidden items-center gap-3 text-[0.65rem] tracking-[0.25em] text-white/60 uppercase sm:flex lg:right-10">
        Scroll
        <span className="block h-8 w-px bg-white/40" />
      </div>
    </section>
  );
}
