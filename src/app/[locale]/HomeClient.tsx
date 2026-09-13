"use client";

import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Marquee from "@/components/Marquee";
import HowItWorks from "@/components/HowItWorks";
import CalculatorPromo from "@/components/CalculatorPromo";
import ClosingCTA from "@/components/ClosingCTA";
import Footer from "@/components/Footer";
import { getDictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/locales";

/**
 * The dictionary is computed here, client-side, rather than in the Server
 * Component route file one level up — `Dictionary` carries functions (the
 * pricing-sentence builders in particular), and React Server Components
 * cannot pass a function as a prop across the server/client boundary
 * ("Functions cannot be passed directly to Client Components"). Every
 * section below is already "use client" (GSAP, refs, state), so nothing is
 * lost by computing the dictionary here instead: `getDictionary` is a pure,
 * synchronous lookup over plain in-memory data, safe to call from client
 * code, and the route file only needs to hand this component the plain,
 * serializable `locale` string.
 */
export default function HomeClient({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <>
      <Preloader dict={dict} />
      <Nav dict={dict} locale={locale} />
      <main>
        <Hero dict={dict} locale={locale} />
        {/* Every one of these runs a hand-written GSAP motion along the
            horizontal axis, and GSAP's x/xPercent are physical pixels — they
            do not mirror themselves the way the CSS layout around them does.
            So each needs the locale, not just the dictionary, to know which
            way "forward" points. See motionSignFor() in lib/i18n/locales.ts. */}
        <Statement dict={dict} locale={locale} />
        <Marquee dict={dict} locale={locale} />
        <HowItWorks dict={dict} locale={locale} />
        <CalculatorPromo dict={dict} locale={locale} />
        <ClosingCTA dict={dict} locale={locale} />
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
