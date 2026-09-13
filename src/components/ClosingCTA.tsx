"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { whatsappLink } from "@/lib/pricing";
import { asset } from "@/lib/asset";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { arrowFor, type Locale } from "@/lib/i18n/locales";

/**
 * The one place the page stops being deliberately broad. Everywhere above, the
 * copy addresses both audiences at once; at the point of conversion that
 * vagueness turns into a weak ask. So the visitor self-selects here — the same
 * fork the sign-up wizard makes — and lands in the right conversation.
 *
 * Framed as customer service and consultation, not a sales ask: both buttons
 * open the same free WhatsApp conversation as before, just labelled by who's
 * asking ("Personal parcels" / "Business inquiry") rather than what to do
 * ("Ship with us" / "Trade with us") — matching the section's own point,
 * that this is a no-obligation question, not a commitment.
 */
export default function ClosingCTA({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.closingCTA;
  const arrow = arrowFor(locale);
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger, SplitText);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".cta-item", { opacity: 1, y: 0 });
        return;
      }

      // Guards against React 19 Strict Mode's dev-only double-invoke of this
      // callback (mount, cleanup, mount again). useGSAP's revert only catches
      // things created synchronously; everything here runs inside an async
      // .then(), so the first, throwaway invocation would otherwise leave a
      // second live SplitText + ScrollTrigger stacked on the same elements —
      // measured (see Hero.tsx's fuller comment) to run and finish *before*
      // React calls its cleanup, so a plain flag checked only at the top of
      // the callback doesn't reliably stop it. Wrapping the async work in its
      // own gsap.context() and reverting *that* on cleanup works regardless
      // of ordering: it tears down whatever a stale invocation built, after
      // the fact, instead of racing to prevent it before the fact.
      let asyncCtx: gsap.Context | undefined;

      document.fonts.ready.then(() => {
        if (!root.current) return;

        asyncCtx = gsap.context(() => {
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
        }, root);
      });

      return () => {
        asyncCtx?.revert();
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden px-6 pb-24 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="relative overflow-hidden rounded-3xl bg-bg-alt">
          <div className="cta-photo absolute inset-0">
            <Image
              src={asset("/closing-port.webp")}
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
            <p className="eyebrow cta-item">{t.eyebrow}</p>
            <h2 className="cta-h2 display mt-5 max-w-[13ch] text-[clamp(2.1rem,7vw,4.75rem)]">
              {t.headline}
            </h2>
            <p className="cta-item measure mt-6 text-base text-muted lg:text-lg">
              {t.subtitle}
            </p>

            <div className="cta-item mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a
                href={whatsappLink(t.personalParcelsMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between gap-6 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.03]"
              >
                {t.personalParcelsLabel}
                <span className="transition-transform duration-200 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  {arrow}
                </span>
              </a>
              <a
                href={whatsappLink(t.businessInquiryMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between gap-6 rounded-full border border-fg/20 px-7 py-4 text-sm font-semibold transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                {t.businessInquiryLabel}
                <span className="transition-transform duration-200 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  {arrow}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
