"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { whatsappLink } from "@/lib/pricing";
import { asset } from "@/lib/asset";
import Flag from "@/components/Flag";
import RichText from "@/components/RichText";
import ScrollCue from "@/components/ScrollCue";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { arrowFor, motionSignFor, type Locale } from "@/lib/i18n/locales";

/**
 * Full-bleed video hero — the ship fills the viewport at every size, phone
 * included. An earlier version made this an inset still image beside the
 * headline; on a phone that collapsed to a small picture under some text and
 * lost the whole point of the shot. This is a video of the same shot, muted
 * and looped as a background layer, not a piece of content someone presses
 * play on.
 */
export default function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.hero;
  const arrow = arrowFor(locale);
  const rtl = motionSignFor(locale) === -1;
  // Which edge of the flag is its "mast" — the edge touching the word it
  // follows. The headline's third line is a flex row, so the browser already
  // mirrors it under RTL and the flag lands to the LEFT of لبنان rather than
  // the right of "Lebanon". Unfurling from the far edge would have it peel
  // away from the word instead of out of it.
  const flagOrigin = rtl ? "right center" : "left center";
  const root = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
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
        gsap.set(".hero-flag", { opacity: 1, scale: 1, rotate: 0 });
        return;
      }

      // React 19's Strict Mode runs this whole callback twice on every dev
      // mount (mount, cleanup, mount again) to surface missing cleanup.
      // useGSAP's own revert only catches GSAP objects created *synchronously*
      // during that call — everything below is built inside an async
      // .then(), after the context's synchronous capture window has closed.
      // Measured with logging: the first invocation's `.then()` callback
      // actually runs and finishes building its timeline *before* React gets
      // around to calling its cleanup — so a plain "cancelled" flag checked
      // only at the top of the callback loses that race and still lets a
      // stale timeline get built. Both invocations end up animating the same
      // class selectors, and the second one bakes in the first one's
      // already-applied "from" values as its own natural resting state — the
      // whole hero freezes at its opening frame forever.
      //
      // The reliable fix doesn't depend on winning that race: wrap the async
      // work in its own gsap.context() and revert *that* on cleanup,
      // whichever order the callback and cleanup happen to run in. A reverted
      // context kills every tween/timeline/ScrollTrigger created inside it,
      // so a stale invocation's animations are torn down after the fact
      // instead of needing to be prevented before the fact. Production builds
      // only mount once, so this path never fires there.
      let asyncCtx: gsap.Context | undefined;

      document.fonts.ready.then(() => {
        if (!root.current) return;

        asyncCtx = gsap.context(() => {
          gsap
            .timeline({ delay: 1.5 }) // let the preloader clear first
            .from(".hero-media", {
              scale: 1.18,
              duration: 2.2,
              ease: "power2.out",
            })
            .from(
              ".hero-line-inner",
              {
                yPercent: 115,
                duration: 1.2,
                stagger: 0.1,
                ease: "power4.out",
              },
              0.15,
            )
            .from(
              ".hero-fade",
              { y: 26, opacity: 0, duration: 0.9, stagger: 0.1 },
              0.6,
            )
            // The flag unfurls in from the mast side once the headline has
            // landed, rather than just fading up with the rest of hero-fade —
            // it's the one element on the page allowed a literal reference to
            // motion, so it gets its own beat.
            .from(
              ".hero-flag",
              {
                scaleX: 0,
                opacity: 0,
                rotate: -8 * motionSignFor(locale),
                transformOrigin: flagOrigin,
                duration: 0.7,
                ease: "back.out(1.6)",
              },
              1.0,
            )
            // A slow, continuous ripple — cloth in a light wind, not a
            // cartoon flap. Loops indefinitely like the scroll chevron below;
            // both are the page's only two idle animations, so they share
            // its restrained, sine.inOut pacing rather than a snappier
            // default ease.
            //
            // It has to start *after* the unfurl, not alongside it. Created
            // up front instead, it began at t=0 while the unfurl was still
            // 2.5s away — and since .from() applies its start state
            // immediately, the ripple captured rotate:-8 as its origin and
            // animated away from it. Both tweens then wrote
            // rotate/transformOrigin on the same element every frame and
            // fought over the resting angle.
            //
            // Both the angle and the shear are mirrored under RTL along with
            // the origin: with the mast on the right, an unmirrored positive
            // rotation drops the flag's free end instead of lifting it, so
            // the cloth would ripple the opposite way to the LTR version
            // rather than being its mirror image.
            .call(() => {
              gsap.to(".hero-flag", {
                rotate: 2.5 * motionSignFor(locale),
                skewY: 2 * motionSignFor(locale),
                duration: 1.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                transformOrigin: flagOrigin,
              });
            });

          // Scrubbed parallax: the photo drifts and the copy lifts away as
          // the page moves past, so the hero hands off rather than just
          // scrolling out. Runs at every breakpoint — this is the signature
          // moment on a phone too, not a desktop-only flourish.
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

        }, root);
      });

      return () => {
        asyncCtx?.revert();
      };
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
          poster={asset("/hero-ship-poster.webp")}
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
          {/* Three explicit lines rather than SplitText's automatic
              line-detection: SplitText rebuilds this element's DOM by
              measuring and re-wrapping text, and every other place it's used
              in this codebase (ClosingCTA, Statement, CalculatorPromo) targets
              plain text only. The third line embeds the Flag component
              (an <img> plus wrapper markup), which that DOM rewrite doesn't
              handle — it silently dropped the flag. Manual `.line-mask`
              wrappers give the identical slide-up reveal (the class already
              existed in globals.css for this) without SplitText touching
              content that isn't plain text. */}
          <h1 className="hero-h1 display text-[clamp(2.9rem,10.5vw,9rem)] text-white">
            <span className="line-mask">
              <span className="hero-line-inner block">{t.headlineLine1}</span>
            </span>
            <span className="line-mask">
              <span className="hero-line-inner block">{t.headlineLine2}</span>
            </span>
            <span className="line-mask">
              <span className="hero-line-inner flex items-center gap-3">
                {t.headlineLine3Lead} {t.destinationName}
                <Flag
                  id="LB"
                  name={t.destinationName}
                  className={`hero-flag w-[0.85em] ${rtl ? "origin-right" : "origin-left"}`}
                />
              </span>
            </span>
          </h1>
          <p
            // Opts this paragraph into RotatingWord's height reservation: the
            // cycling country name can rewrap the sentence onto another line,
            // and this column is bottom-anchored, so without it the headline
            // above lifts every time a long name comes round.
            data-rotating-host
            className="hero-fade measure mt-6 text-base leading-relaxed text-white/75 lg:text-lg"
          >
            <RichText segments={t.subtitle} strongClassName="font-semibold text-white" />
          </p>
          <div className="hero-fade mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href={whatsappLink(t.chatWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.03]"
            >
              {t.chatWithUs}
              <span className="transition-transform duration-200 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                {arrow}
              </span>
            </a>
            <Link
              href={`/${locale}/calculator`}
              className="rounded-full border border-white/35 px-7 py-3.5 text-sm font-medium text-white transition-colors duration-200 hover:border-white"
            >
              {t.estimateShipment}
            </Link>
          </div>
        </div>
      </div>

      {/* White here, near-black in every section below — this is the only
          one sitting on the dark video. `hero-fade` lets it arrive with the
          rest of the copy instead of being present from the first frame. */}
      <ScrollCue tone="light" className="hero-fade" />
    </section>
  );
}
