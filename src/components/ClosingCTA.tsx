"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { whatsappLink } from "@/lib/pricing";
import { asset } from "@/lib/asset";

/**
 * The one place the page stops being deliberately broad. Everywhere above, the
 * copy addresses both audiences at once; at the point of conversion that
 * vagueness turns into a weak ask. So the visitor self-selects here — the same
 * fork the sign-up wizard makes — and lands in the right conversation.
 */
export default function ClosingCTA() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger, SplitText);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".cta-item", { opacity: 1, y: 0 });
        return;
      }

      document.fonts.ready.then(() => {
        const split = new SplitText(".cta-h2", {
          type: "lines",
          linesClass: "line",
          mask: "lines",
        });

        gsap
          .timeline({
            scrollTrigger: { trigger: root.current, start: "top 72%" },
          })
          .from(split.lines, {
            yPercent: 110,
            duration: 1,
            stagger: 0.1,
            ease: "power4.out",
          })
          .from(
            ".cta-item",
            { y: 30, opacity: 0, duration: 0.85, stagger: 0.1 },
            "-=0.6",
          );

        // Photo drifts behind the panel. Small range — big parallax reads cheap.
        gsap.fromTo(
          ".cta-photo",
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden px-6 pb-24 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="relative overflow-hidden rounded-3xl bg-bg-alt">
          <div className="cta-photo absolute inset-0">
            <Image
              src={asset("/closing-port.jpg")}
              alt=""
              fill
              unoptimized
              sizes="100vw"
              className="scale-125 object-cover"
            />
          </div>
          {/* Light scrim, not a dark overlay — the page stays bright below the
              hero. Stronger at the top on narrow screens, where the copy sits
              over the busiest part of the photograph. */}
          <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/90 to-bg/40 sm:bg-gradient-to-r sm:from-bg sm:via-bg/85 sm:to-bg/25" />

          <div className="relative px-7 py-20 lg:px-16 lg:py-32">
            <p className="eyebrow cta-item">Get started</p>
            <h2 className="cta-h2 display mt-5 max-w-[13ch] text-[clamp(2.1rem,7vw,4.75rem)]">
              Tell us what you need moved
            </h2>
            <p className="cta-item measure mt-6 text-base text-muted lg:text-lg">
              No forms and no account needed to ask. Message us and we will tell
              you what it costs and what is involved.
            </p>

            <div className="cta-item mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a
                href={whatsappLink(
                  "Hi, I'd like to ship something from Europe to the Middle East.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between gap-6 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.03]"
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
                className="group inline-flex items-center justify-between gap-6 rounded-full border border-fg/20 px-7 py-4 text-sm font-semibold transition-colors duration-200 hover:border-accent hover:text-accent"
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
