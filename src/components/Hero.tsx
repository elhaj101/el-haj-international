"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { whatsappLink } from "@/lib/pricing";
import { asset } from "@/lib/asset";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(SplitText);
      const mm = gsap.matchMedia();

      // Hero animates on LOAD, never on scroll — the user hasn't scrolled yet.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        document.fonts.ready.then(() => {
          const split = new SplitText(".hero-h1", {
            type: "lines",
            linesClass: "line",
            mask: "lines",
          });

          const tl = gsap.timeline();
          tl.from(split.lines, {
            yPercent: 115,
            duration: 1.1,
            stagger: 0.09,
            ease: "power4.out",
          })
            .from(
              ".hero-fade",
              { y: 22, opacity: 0, duration: 0.85, stagger: 0.09 },
              "-=0.65",
            )
            .from(
              ".hero-photo",
              { scale: 1.06, opacity: 0, duration: 1.4, ease: "power2.out" },
              0,
            );
        });
      });

      // Reduced motion: everything already at rest, nothing to do.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".hero-fade, .hero-photo", { opacity: 1, y: 0, clearProps: "all" });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden px-6 pb-10 pt-28 lg:px-10 lg:pb-14"
    >
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 lg:grid-cols-12">
        {/* Headline block */}
        <div className="lg:col-span-7">
          <p className="eyebrow hero-fade mb-6">
            Hamburg <span className="text-accent">·</span> Europe to the Middle East
          </p>
          <h1 className="hero-h1 display text-[clamp(2.75rem,8.5vw,7rem)]">
            We move what
            <br />
            matters to you
          </h1>
          <p className="hero-fade measure mt-7 text-base leading-relaxed text-muted lg:text-lg">
            Consolidated container shipping and trading between Europe and the
            Middle East. Family goods, business cargo, and sourcing — handled
            end to end, with the customs side priced in from the start.
          </p>
          <div className="hero-fade mt-9 flex flex-wrap items-center gap-4">
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
              className="text-sm font-medium underline decoration-line underline-offset-4 transition-colors duration-200 hover:decoration-accent"
            >
              Estimate a shipment
            </Link>
          </div>
        </div>

        {/* Photo panel — the sea/ship shot. Kept as an inset panel rather than a
            dark full-bleed overlay so the page stays light throughout. */}
        <div className="hero-photo relative lg:col-span-5">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-bg-alt lg:aspect-[3/4]">
            <Image
              src={asset("/hero-ship.jpg")}
              alt="A container ship at sea"
              fill
              priority
              unoptimized
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <p className="hero-fade mt-10 text-xs tracking-[0.2em] text-muted uppercase">
        Scroll
      </p>
    </section>
  );
}
