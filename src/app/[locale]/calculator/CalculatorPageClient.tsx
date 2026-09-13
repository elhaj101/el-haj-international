"use client";

import Link from "next/link";
import { useState } from "react";
import { Wordmark } from "@/components/Logo";
import Flag from "@/components/Flag";
import BusinessCalculator from "@/components/calculator/BusinessCalculator";
import PersonalCalculator from "@/components/calculator/PersonalCalculator";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { arrowFor, type Locale } from "@/lib/i18n/locales";
import { DESTINATIONS, type ShipmentProfile } from "@/lib/pricing";

/**
 * Two steps, in this order:
 *
 *   1. Where is it going?  — every country taxes imports differently, so
 *      nothing can be priced before this is known.
 *   2. Who is sending it?  — a person sending boxes to family and a
 *      business importing stock are different products with different
 *      pricing, not one calculator with a checkbox. See the two
 *      components for what each actually models.
 *
 * Computes its own dictionary from `locale` rather than receiving one —
 * see HomeClient.tsx's comment on why (Dictionary carries functions, which
 * can't cross the Server-to-Client Component prop boundary).
 */
export default function CalculatorPageClient({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.calculatorPage;
  const arrow = arrowFor(locale);
  const [destinationId, setDestinationId] = useState<string | null>(null);
  const [profile, setProfile] = useState<ShipmentProfile>("personal");

  const destination = DESTINATIONS.find((d) => d.id === destinationId) ?? null;
  const destinationStrings = destination ? dict.destinations[destination.id] : null;

  /* ---------------- Step 1 · Destination chooser ---------------- */
  if (!destination || !destinationStrings) {
    return (
      <div className="min-h-svh">
        <Header dict={dict} locale={locale} />
        <main className="mx-auto max-w-[1100px] px-6 py-16 lg:px-10 lg:py-24">
          <p className="eyebrow">{t.shippingEstimateEyebrow}</p>
          <h1 className="display mt-4 text-[clamp(2.2rem,7vw,3.75rem)]">
            {t.whereHeadline}
          </h1>
          <p className="measure mt-4 text-muted">{t.whereBody}</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {DESTINATIONS.map((d) => {
              const strings = dict.destinations[d.id];
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDestinationId(d.id)}
                  className="group flex items-center gap-5 rounded-2xl border border-line p-6 text-left transition-all duration-200 hover:border-fg/30 hover:shadow-lg"
                >
                  <Flag
                    id={d.id}
                    name={strings.name}
                    className="w-[4.5rem] transition-transform duration-200 group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <span>
                    <span className="display block text-3xl">{strings.name}</span>
                    <span className="mt-1 block text-sm text-muted">
                      {strings.gateway}
                    </span>
                    <span className="mt-3 block text-sm text-accent">
                      {t.startEstimate} {arrow}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-8 max-w-[62ch] text-sm text-muted">
            {t.onlyDestinationNotice}
          </p>
        </main>
      </div>
    );
  }

  /* ---------------- Step 2 · The country's page ---------------- */
  return (
    <div className="min-h-svh pb-36 lg:pb-0">
      <Header dict={dict} locale={locale} />

      {/* Destination banner. A two-colour gradient wash plus a tricolour
          stripe used to sit here, built from an approximated flag palette
          (plain red/green for Lebanon, which isn't even the real flag) — busy
          and, per feedback, confusing rather than clarifying. The flag itself,
          drawn correctly and at a size worth looking at, does that job on its
          own; see `Flag.tsx` for why it is artwork and not an emoji. */}
      <section className="border-b border-line bg-bg-alt">
        <div className="mx-auto max-w-[1100px] px-6 py-10 lg:px-10 lg:py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-center gap-5">
              <Flag
                id={destination.id}
                name={destinationStrings.name}
                priority
                className="w-20 lg:w-28"
              />
              <div>
                <p className="eyebrow">{t.shippingToEyebrow}</p>
                <h1 className="display mt-1 text-[clamp(2.5rem,9vw,6rem)] leading-[0.9]">
                  {destinationStrings.name}
                </h1>
                <p className="mt-2 text-sm text-muted">{destinationStrings.gateway}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setDestinationId(null)}
              className="rounded-full border border-fg/20 px-5 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              {t.change}
            </button>
          </div>

          {/* Profile switch. Sits inside the banner rather than in the page
              body because it swaps the entire calculator underneath — it is
              navigation, not an input. */}
          <div
            role="tablist"
            aria-label={t.profileTabsLabel}
            className="mt-9 flex flex-wrap gap-2"
          >
            <ProfileTab
              on={profile === "personal"}
              onClick={() => setProfile("personal")}
              title={t.personalTitle}
              blurb={t.personalBlurb}
            />
            <ProfileTab
              on={profile === "business"}
              onClick={() => setProfile("business")}
              title={t.businessTitle}
              blurb={t.businessBlurb}
            />
          </div>
        </div>
      </section>

      {profile === "personal" ? (
        <PersonalCalculator
          destinationName={destinationStrings.name}
          dict={dict}
          locale={locale}
        />
      ) : (
        <BusinessCalculator
          destinationName={destinationStrings.name}
          dict={dict}
          locale={locale}
        />
      )}
    </div>
  );
}

function ProfileTab({
  on,
  onClick,
  title,
  blurb,
}: {
  on: boolean;
  onClick: () => void;
  title: string;
  blurb: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={on}
      onClick={onClick}
      className={`flex-1 rounded-xl border px-5 py-4 text-left transition-all duration-200 sm:flex-none sm:min-w-[16rem] ${
        on
          ? "border-fg/30 bg-bg shadow-sm"
          : "border-line text-muted hover:border-fg/25"
      }`}
    >
      <span className="display block text-lg leading-tight">{title}</span>
      <span className="mt-1 block text-xs leading-snug text-muted">{blurb}</span>
    </button>
  );
}

function Header({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <header className="border-b border-line px-6 py-4 lg:px-10">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between">
        <Link href={`/${locale}`} aria-label="El Haj International">
          <Wordmark compact />
        </Link>
        <Link
          href={`/${locale}`}
          className="text-sm text-muted transition-colors hover:text-fg"
        >
          {dict.calculatorPage.backToHome}
        </Link>
      </div>
    </header>
  );
}
