"use client";

import { useMemo, useState } from "react";
import AnimatedNumber from "@/components/AnimatedNumber";
import RichText from "@/components/RichText";
import SliderWithNumber from "./SliderWithNumber";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { arrowFor, type Locale } from "@/lib/i18n/locales";
import {
  BAND_COLORS,
  CARGO_CATEGORIES,
  COST_COLORS,
  CUSTOMS_DATA_AS_OF,
  LEBANON_VAT_RATE,
  LOWEST_DUTY_CATEGORY,
  MIN_CHARGEABLE_KG,
  SECURITY_FEE_RATE,
  bandFor,
  calculateQuote,
  getCategory,
  whatsappLink,
} from "@/lib/pricing";
import { eur, pct } from "./format";

/**
 * Commercial shipments. Unchanged in substance from the original single
 * calculator: a business importing stock needs the duty table, because
 * the duty is usually larger than the freight and is what decides whether
 * the shipment is worth making at all.
 *
 * The personal path deliberately shows none of this — see
 * PersonalCalculator.tsx for why the two are separate products.
 */
export default function BusinessCalculator({
  destinationName,
  dict,
  locale,
}: {
  destinationName: string;
  dict: Dictionary;
  locale: Locale;
}) {
  const t = dict.businessCalculator;
  const arrow = arrowFor(locale);
  // Defaults are deliberately the cheapest possible shipment — lowest-duty
  // category, minimum weight, minimum declared value — so the first figure
  // shown is the floor. See LOWEST_DUTY_CATEGORY in pricing.ts; note it's
  // 0% *customs duty* specifically — VAT and the security fee still apply
  // on a value-basis category, so this isn't a €0 default.
  const [categoryId, setCategoryId] = useState<string>(LOWEST_DUTY_CATEGORY.id);
  const [weight, setWeight] = useState(5);
  const [value, setValue] = useState(50);

  const category = getCategory(categoryId);
  const categoryStrings = dict.cargoCategories[category.id];
  const byValue = category.basis === "value";

  const quote = useMemo(
    () =>
      calculateQuote(
        { weightKg: weight, categoryId, declaredValueEur: value },
        dict,
        locale,
      ),
    [weight, categoryId, value, dict, locale],
  );

  const segments = [
    { key: t.freight, amount: quote.freightEur, color: COST_COLORS.freight },
    { key: t.clearance, amount: quote.clearanceEur, color: COST_COLORS.clearance },
    { key: t.duty, amount: quote.dutyEur, color: COST_COLORS.duty },
  ];
  const totalForBar = segments.reduce((a, s) => a + s.amount, 0) || 1;

  const waMessage = t.whatsappMessage({
    destination: destinationName,
    categoryLabel: categoryStrings.label,
    weight,
    declaredValue: byValue ? eur(value, locale) : null,
    rangeLow: eur(quote.rangeLowEur, locale),
    rangeHigh: eur(quote.rangeHighEur, locale),
  });

  return (
    <>
      <main className="mx-auto max-w-[1100px] px-6 py-10 lg:px-10 lg:py-14">
        {/* ---- How it works: first, not last. The two rules below decide
               which inputs even apply, so reading them after the sliders is
               backwards. ---- */}
        <section className="rounded-2xl border border-line bg-bg-alt p-6 lg:p-8">
          <h2 className="display text-lg lg:text-xl">{t.readThisFirst}</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="rounded-xl bg-bg p-5">
              <span
                className="inline-block rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white"
                style={{ background: BAND_COLORS[4] }}
              >
                {t.usedGoodsTag}
              </span>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                <RichText segments={t.usedGoodsBody} strongClassName="text-fg" />
              </p>
            </div>
            <div className="rounded-xl bg-bg p-5">
              <span
                className="inline-block rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white"
                style={{ background: BAND_COLORS[1] }}
              >
                {t.newGoodsTag}
              </span>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                <RichText segments={t.newGoodsBody} strongClassName="text-fg" />
              </p>
            </div>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-muted">
            {t.footnote(CUSTOMS_DATA_AS_OF)}
          </p>
        </section>

        {/* ---- Category ---- */}
        <h2 className="display mt-14 text-[clamp(1.4rem,3.5vw,2rem)]">
          {t.whatAreYouSending}
        </h2>
        <p className="measure mt-2 text-sm text-muted">{t.whatAreYouSendingBody}</p>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CARGO_CATEGORIES.map((c) => {
            const on = c.id === categoryId;
            const strings = dict.cargoCategories[c.id];
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategoryId(c.id)}
                aria-pressed={on}
                className={`relative overflow-hidden rounded-xl border p-5 ps-6 text-start transition-all duration-200 ${
                  on
                    ? "border-fg/30 bg-bg-alt shadow-sm"
                    : "border-line hover:border-fg/25"
                }`}
              >
                <span
                  aria-hidden
                  className="absolute inset-y-0 start-0 w-1.5"
                  style={{ background: BAND_COLORS[bandFor(c.duty)] }}
                />
                <span className="flex items-baseline justify-between gap-3">
                  <span className="display text-lg leading-tight">{strings.label}</span>
                  <span
                    className="shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums text-white"
                    style={{ background: BAND_COLORS[bandFor(c.duty)] }}
                  >
                    {pct(c.duty, locale)}
                  </span>
                </span>
                <span className="mt-1.5 block text-xs leading-relaxed text-muted">
                  {strings.blurb}
                </span>
                <span className="mt-3 block text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                  {c.basis === "weight" ? t.taxedByWeight : t.taxedByValue}
                </span>
              </button>
            );
          })}
        </div>

        {categoryStrings.caveat && (
          <p className="mt-5 rounded-xl border border-accent/40 bg-accent/5 p-4 text-xs leading-relaxed">
            <strong>{categoryStrings.label}:</strong> {categoryStrings.caveat}
          </p>
        )}

        {/* ---- Inputs + result ---- */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="space-y-9">
            {/* Weight always applies — it drives freight in every case, and
                duty as well when the category is weight-based. */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <label id="weight-label" htmlFor="weight" className="text-sm font-semibold">
                  {t.weight}
                  <span className="ms-2 font-normal tabular-nums text-muted">
                    {t.kgUnit(weight)}
                  </span>
                </label>
                <Drives
                  parts={byValue ? [t.freight] : [t.freight, t.duty]}
                  sets={t.sets}
                  freightLabel={t.freight}
                />
              </div>
              <SliderWithNumber
                id="weight"
                labelId="weight-label"
                min={5}
                max={1000}
                step={5}
                value={weight}
                onChange={setWeight}
              />
              <div className="mt-2 flex justify-between text-xs text-muted">
                <span>{t.kgUnit(5)}</span>
                <span>{t.kgUnit(1000)}</span>
              </div>
              {quote.minimumApplied && (
                <p className="mt-3 text-xs text-accent">
                  {t.minimumChargeable(MIN_CHARGEABLE_KG)}
                </p>
              )}
            </div>

            {/* Declared value is shown either way, but disabled when the
                category is taxed by weight — hiding it would leave people
                wondering where it went; greying it out says why. */}
            <div className={byValue ? "" : "opacity-55"}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <label id="value-label" htmlFor="value" className="text-sm font-semibold">
                  {t.declaredValue}
                  <span className="ms-2 font-normal tabular-nums text-muted">
                    {byValue ? eur(value, locale) : "—"}
                  </span>
                </label>
                {byValue ? (
                  <Drives parts={[t.duty]} sets={t.sets} freightLabel={t.freight} />
                ) : (
                  <span className="rounded-full border border-line px-2.5 py-1 text-[0.65rem] uppercase tracking-wider text-muted">
                    {t.notUsed}
                  </span>
                )}
              </div>
              <SliderWithNumber
                id="value"
                labelId="value-label"
                describedById={byValue ? undefined : "value-disabled"}
                min={50}
                max={10000}
                step={50}
                value={value}
                onChange={setValue}
                disabled={!byValue}
              />
              {byValue ? (
                <p className="mt-3 text-xs text-muted">
                  {t.dutyFollowsValue(
                    categoryStrings.label,
                    pct(category.duty, locale),
                    pct(LEBANON_VAT_RATE, locale),
                    pct(SECURITY_FEE_RATE, locale),
                  )}
                </p>
              ) : (
                <p id="value-disabled" className="mt-3 text-xs text-muted">
                  {t.switchedOffBecause(categoryStrings.label)}
                </p>
              )}
            </div>

            <div className="lg:hidden">
              <Result quote={quote} segments={segments} totalForBar={totalForBar} t={t} locale={locale} />
            </div>
          </div>

          <aside className="hidden h-fit lg:sticky lg:top-10 lg:block">
            <Result quote={quote} segments={segments} totalForBar={totalForBar} t={t} locale={locale} />
            <a
              href={whatsappLink(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02]"
            >
              {t.checkThisWithUs} {arrow}
            </a>
          </aside>
        </div>
      </main>

      {/* Sticky mobile summary — the figure must stay on screen while the
          sliders are being dragged. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 px-5 py-3.5 backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-[0.65rem] uppercase tracking-[0.18em] text-muted">
              {destinationName} · {t.kgUnit(weight)}
            </p>
            <p className="display truncate text-2xl leading-tight tabular-nums">
              <AnimatedNumber value={quote.rangeLowEur} format={(n) => eur(n, locale)} />
              <span className="text-muted"> – </span>
              <AnimatedNumber value={quote.rangeHighEur} format={(n) => eur(n, locale)} />
            </p>
          </div>
          <a
            href={whatsappLink(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white"
          >
            {t.check}
          </a>
        </div>
      </div>
    </>
  );
}

/** Which line items an input actually moves, colour-keyed to the cost bar. */
function Drives({
  parts,
  sets,
  freightLabel,
}: {
  parts: string[];
  sets: string;
  freightLabel: string;
}) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="text-[0.65rem] uppercase tracking-wider text-muted">{sets}</span>
      {parts.map((p) => (
        <span
          key={p}
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[0.65rem] font-medium"
        >
          <span
            aria-hidden
            className="h-2 w-2 rounded-full"
            style={{
              background: p === freightLabel ? COST_COLORS.freight : COST_COLORS.duty,
            }}
          />
          {p}
        </span>
      ))}
    </span>
  );
}

function Result({
  quote,
  segments,
  totalForBar,
  t,
  locale,
}: {
  quote: ReturnType<typeof calculateQuote>;
  segments: { key: string; amount: number; color: string }[];
  totalForBar: number;
  t: Dictionary["businessCalculator"];
  locale: Locale;
}) {
  return (
    <div className="rounded-2xl border border-line bg-bg-alt p-7 lg:p-8">
      <p className="eyebrow">{t.estimatedTotal}</p>
      <p className="display mt-3 text-[clamp(2rem,5vw,3rem)] leading-none tabular-nums">
        <AnimatedNumber value={quote.rangeLowEur} format={(n) => eur(n, locale)} />
        <span className="text-muted"> – </span>
        <AnimatedNumber value={quote.rangeHighEur} format={(n) => eur(n, locale)} />
      </p>

      {/* Stacked cost bar. Every segment is direct-labelled below, so identity
          never rests on colour alone. 2px surface gaps separate the fills. */}
      <div
        className="mt-7 flex h-3 w-full overflow-hidden rounded-full"
        role="img"
        aria-label={segments.map((s) => `${s.key} ${eur(s.amount, locale)}`).join(", ")}
      >
        {segments.map((s, i) => (
          <span
            key={s.key}
            className="h-full transition-[width] duration-500 ease-out"
            style={{
              width: `${(s.amount / totalForBar) * 100}%`,
              background: s.color,
              marginLeft: i ? 2 : 0,
            }}
          />
        ))}
      </div>

      <dl className="mt-6 space-y-3 text-sm">
        {segments.map((s) => (
          <div key={s.key} className="flex items-center justify-between gap-4">
            <dt className="flex items-center gap-2.5 text-muted">
              <span
                aria-hidden
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: s.color }}
              />
              {s.key}
              {s.key === t.freight && (
                <span className="text-xs">({t.kgUnit(quote.chargeableKg)})</span>
              )}
            </dt>
            <dd className="tabular-nums">{eur(s.amount, locale)}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 border-t border-line pt-5 text-xs leading-relaxed text-muted">
        {quote.dutyBasis}
      </p>
    </div>
  );
}
