"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { arrowFor, type Locale } from "@/lib/i18n/locales";

/**
 * Replaces the old cargo-category grid (household goods, electronics,
 * foodstuffs...) with a teaser for the price calculator instead — per
 * direct instruction, not an iteration on the old content. That category
 * list and its customs disclaimer existed only here; they don't appear
 * anywhere else on the site now.
 *
 * Two cards, not a paragraph explaining the calculator: "Personal parcel"
 * and "Business shipment" reuse the exact title/blurb text the calculator
 * page's own destination step uses for the same choice (see the
 * `ProfileTab` component in app/calculator/page.tsx) — same words for the
 * same choice wherever it appears, and the card styling (rounded-2xl,
 * border-line, hover:shadow-lg) is lifted from that page's destination
 * picker too, so this reads as a preview of the real screen rather than a
 * different-looking ad for it. Both cards link to the same /calculator
 * URL — the page doesn't support preselecting a profile via query param,
 * so either card lands on its normal first step (choose a destination).
 */
export default function CalculatorPromo({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const t = dict.calculatorPromo;
  const arrow = arrowFor(locale);
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger, SplitText);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".promo-item, .promo-card", {
          opacity: 1,
          y: 0,
          x: 0,
          clearProps: "transform",
        });
        return;
      }

      // Guards against React 19 Strict Mode's dev-only double-invoke of this
      // callback (mount, cleanup, mount again). See the fuller comment in
      // Hero.tsx for why a plain boolean flag isn't enough and this
      // gsap.context()-wrap-and-revert is the reliable fix.
      let asyncCtx: gsap.Context | undefined;

      document.fonts.ready.then(() => {
        if (!root.current) return;

        asyncCtx = gsap.context(() => {
          const split = new SplitText(".promo-h2", {
            type: "lines",
            linesClass: "line",
            mask: "lines",
          });

          gsap
            .timeline({
              scrollTrigger: { trigger: root.current, start: "top 78%" },
            })
            .from(split.lines, {
              yPercent: 110,
              duration: 1,
              stagger: 0.1,
              ease: "power4.out",
            })
            .from(
              ".promo-item",
              { y: 24, opacity: 0, duration: 0.85, stagger: 0.1 },
              "-=0.6",
            );

          // The two cards meet in the middle rather than both fading up the
          // same way — cheap, deliberate variety for exactly two elements,
          // same idea as the old cargo-card grid's alternating sweep.
          gsap.utils.toArray<HTMLElement>(".promo-card").forEach((card, i) => {
            gsap.set(card, { x: i % 2 === 0 ? -32 : 32, opacity: 0 });
            gsap.to(card, {
              opacity: 1,
              x: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 90%" },
            });
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
    <section id="pricing" ref={root} className="px-6 py-24 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
          <div>
            <p className="eyebrow promo-item">{t.eyebrow}</p>
            <h2 className="promo-h2 display mt-5 max-w-[12ch] text-[clamp(2.1rem,7vw,4.25rem)]">
              {t.headline}
            </h2>
            <p className="promo-item measure mt-6 text-base text-muted lg:text-lg">
              {t.subtitle}
            </p>
            <Link
              href={`/${locale}/calculator`}
              className="promo-item group mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.03]"
            >
              {t.openCalculator}
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                {arrow}
              </span>
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Link
              href={`/${locale}/calculator`}
              className="promo-card group rounded-2xl border border-line p-7 transition-all duration-200 hover:border-fg/30 hover:shadow-lg"
            >
              <p className="eyebrow">{t.personalTag}</p>
              <h3 className="display mt-3 text-2xl transition-colors duration-200 group-hover:text-accent">
                {t.personalTitle}
              </h3>
              <p className="mt-2 text-sm text-muted">{t.personalBlurb}</p>
              <span className="mt-5 inline-block text-sm text-accent">
                {t.startEstimate} {arrow}
              </span>
            </Link>
            <Link
              href={`/${locale}/calculator`}
              className="promo-card group rounded-2xl border border-line p-7 transition-all duration-200 hover:border-fg/30 hover:shadow-lg"
            >
              <p className="eyebrow">{t.businessTag}</p>
              <h3 className="display mt-3 text-2xl transition-colors duration-200 group-hover:text-accent">
                {t.businessTitle}
              </h3>
              <p className="mt-2 text-sm text-muted">{t.businessBlurb}</p>
              <span className="mt-5 inline-block text-sm text-accent">
                {t.startEstimate} {arrow}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
