"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { whatsappLink } from "@/lib/pricing";
import { asset } from "@/lib/asset";

/**
 * The one place the page stops being deliberately broad. Everywhere above,
 * the copy addresses both audiences at once; at the point of conversion that
 * vagueness turns into a weak ask. So the visitor self-selects here — the same
 * fork the sign-up wizard makes — and lands in the right conversation.
 */
export default function ClosingCTA() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".cta-item", {
          y: 34,
          opacity: 0,
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
        // Slow drift on the photo for depth. Small range — big parallax reads cheap.
        gsap.to(".cta-photo", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden px-6 pb-28 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="relative overflow-hidden rounded-3xl bg-bg-alt">
          <div className="cta-photo absolute inset-0 opacity-90">
            <Image
              src={asset("/closing-port.jpg")}
              alt=""
              fill
              unoptimized
              className="scale-110 object-cover"
            />
          </div>
          {/* Light scrim, not a dark overlay — the page stays bright. */}
          <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-bg/25" />

          <div className="relative px-8 py-24 lg:px-16 lg:py-32">
            <p className="eyebrow cta-item">Get started</p>
            <h2 className="cta-item display mt-5 max-w-[13ch] text-[clamp(2.25rem,6vw,4.75rem)]">
              Tell us what you need moved
            </h2>
            <p className="cta-item measure mt-6 text-base text-muted lg:text-lg">
              No forms and no account needed to ask. Message us and we will tell
              you what it costs and what is involved.
            </p>

            <div className="cta-item mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={whatsappLink(
                  "Hi, I'd like to ship something from Europe to the Middle East.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between gap-6 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.03] sm:justify-start"
              >
                Ship with us
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href={whatsappLink(
                  "Hi, I'm a business looking to source and trade products. Can we talk?",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between gap-6 rounded-full border border-fg/20 px-7 py-4 text-sm font-semibold transition-colors duration-200 hover:border-accent hover:text-accent sm:justify-start"
              >
                Trade with us
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
