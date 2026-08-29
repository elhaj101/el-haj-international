"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { whatsappLink } from "@/lib/pricing";
import { asset } from "@/lib/asset";

/**
 * Full-bleed video hero — the ship fills the viewport at every size, phone
 * included. An earlier version made this an inset still image beside the
 * headline; on a phone that collapsed to a small picture under some text and
 * lost the whole point of the shot. This is a video of the same shot, muted
 * and looped as a background layer, not a piece of content someone presses
 * play on.
 */
export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger, SplitText);
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // A looping video is exactly the "non-essential motion" reduced-motion
      // exists to suppress. Never autoplay it — leave the poster frame showing,
      // which reads as an ordinary static photo. The <video> ships
      // preload="none" for the same visitors, so their browser never fetches
      // the ~4MB file at all; only flip it to "auto" right before playing.
      if (!reduce && videoRef.current) {
        videoRef.current.preload = "auto";
        videoRef.current.load();
        videoRef.current.play().catch(() => {});
      }

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

        // Each chevron dims and brightens in turn, top to bottom — a wave
        // travelling downward, not a static icon.
        gsap.to(".scroll-chevron", {
          opacity: (i, t) => Number(t.getAttribute("opacity")) * 0.25,
          duration: 0.6,
          stagger: { each: 0.15, repeat: -1, yoyo: true },
          ease: "sine.inOut",
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
        {/* Muted decorative loop, not content — no controls, no audio track,
            aria-hidden. The poster is this video's own first frame, so there
            is no visible swap when playback starts. Composition is a portrait
            drone shot (720x1280) with the ship sitting a little above centre;
            object-cover's default 50% 50% keeps it in frame on a phone but
            drifts toward open water on a wide desktop crop, so the focal
            point is set explicitly. */}
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          // Default off — flipped to "auto" in the effect above, and only
          // when motion is not reduced. Reduced-motion visitors never fetch
          // this file at all.
          preload="none"
          aria-hidden="true"
          poster={asset("/hero-ship-poster.jpg")}
          className="h-full w-full object-cover"
          style={{ objectPosition: "50% 37%" }}
        >
          <source src={asset("/hero-ship.mp4")} type="video/mp4" />
        </video>
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
            Consolidated container shipping and trading between{" "}
            <strong className="font-semibold text-white">Europe</strong> and{" "}
            <strong className="font-semibold text-white">the Middle East</strong>.
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

      {/* Triple chevron, white with a graduated transparency fade rather than
          the word "Scroll" + a line. The three strokes read as motion on
          their own; a slow staggered pulse (skipped under reduced motion)
          reinforces the downward direction without relying on text. */}
      <svg
        className="scroll-cue hero-fade absolute bottom-6 right-6 hidden h-8 w-5 sm:block lg:right-10"
        viewBox="0 0 20 32"
        fill="none"
        aria-hidden="true"
      >
        <path
          className="scroll-chevron"
          d="M2 2l8 8 8-8"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="1"
        />
        <path
          className="scroll-chevron"
          d="M2 12l8 8 8-8"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />
        <path
          className="scroll-chevron"
          d="M2 22l8 8 8-8"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.3"
        />
      </svg>
    </section>
  );
}
