"use client";

import { useMemo, useState } from "react";
import AnimatedNumber from "@/components/AnimatedNumber";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { arrowFor, type Locale } from "@/lib/i18n/locales";
import {
  BOX_SIZES,
  CARGO_CATEGORIES,
  CUSTOMS_DATA_AS_OF,
  LOWEST_DUTY_CATEGORY,
  MAX_PERSONAL_BOXES,
  PERSONAL_PER_KG_EUR,
  SMALLEST_BOX_SIZE,
  boxDims,
  calculatePersonalQuote,
  typicalBoxKg,
  whatsappLink,
  type PersonalMode,
} from "@/lib/pricing";
import BoxModel from "./BoxModel";
import { eur } from "./format";
import SliderWithNumber from "./SliderWithNumber";

/**
 * Personal parcels — someone sending boxes to family, not importing stock.
 *
 * Flat pricing, and deliberately nothing else: pick a box size and a count,
 * or give a weight. No commodity table, no declared value, no duty
 * breakdown. A person sending three boxes of clothes cannot answer "what
 * is the HS code and deemed value of your consignment", and should not be
 * asked to. That complexity lives on the business tab, where it is real.
 *
 * Note also there is no estimate *range* here. A flat box price that
 * arrives as "€53–€67" is not a flat box price; the number shown is the
 * number charged.
 */
export default function PersonalCalculator({
  destinationName,
  dict,
  locale,
}: {
  destinationName: string;
  dict: Dictionary;
  locale: Locale;
}) {
  const t = dict.personalCalculator;
  const arrow = arrowFor(locale);
  // Defaults are deliberately the cheapest possible parcel — smallest box,
  // one of it, lowest-duty category — so the first price a visitor sees is
  // the floor, not a guess at their actual shipment. See SMALLEST_BOX_SIZE
  // and LOWEST_DUTY_CATEGORY in pricing.ts.
  const [mode, setMode] = useState<PersonalMode>("boxes");
  const [boxCounts, setBoxCounts] = useState<Record<string, number>>({
    [SMALLEST_BOX_SIZE.id]: 1,
  });
  const [weight, setWeight] = useState(5);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([
    LOWEST_DUTY_CATEGORY.id,
  ]);
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);

  const byBoxes = mode === "boxes";

  // One line per size that actually has a count, in BOX_SIZES order — a
  // mixed cart is just these summed, each size keeping its own flat price
  // (see calculatePersonalQuote's "boxes" branch, which derives the same
  // lines independently from boxCounts).
  const boxLines = useMemo(
    () =>
      BOX_SIZES.map((box) => ({ box, count: boxCounts[box.id] ?? 0 })).filter(
        (l) => l.count > 0,
      ),
    [boxCounts],
  );
  const totalBoxCount = boxLines.reduce((sum, l) => sum + l.count, 0);

  const setCount = (boxId: string, count: number) =>
    setBoxCounts((counts) => ({ ...counts, [boxId]: count }));

  const selectedCategories = useMemo(
    () => CARGO_CATEGORIES.filter((c) => selectedCategoryIds.includes(c.id)),
    [selectedCategoryIds],
  );
  // Nothing here splits the parcel's weight per item, so a mixed selection
  // can't be assessed item-by-item — the highest rate among what's picked
  // stands in for the whole parcel. Conservative, and it reuses the exact
  // same per-category math as a single pick; see personalDuty() in
  // pricing.ts for the undefined-selection fallback.
  const effectiveCategoryId = useMemo(
    () =>
      selectedCategories.length > 0
        ? selectedCategories.reduce((max, c) => (c.duty > max.duty ? c : max))
            .id
        : undefined,
    [selectedCategories],
  );

  const quote = useMemo(
    () =>
      calculatePersonalQuote(
        {
          mode,
          boxCounts,
          weightKg: weight,
          categoryId: effectiveCategoryId,
        },
        dict,
        locale,
      ),
    [mode, boxCounts, weight, effectiveCategoryId, dict, locale],
  );

  const summary = byBoxes
    ? boxLines.length === 1
      ? boxLines[0].count === 1
        ? t.summaryOneBox(boxLines[0].box.label)
        : t.summaryManyBoxes(boxLines[0].count, boxLines[0].box.label)
      : t.summaryMixedBoxes(
          boxLines.map((l) => `${l.count} × ${l.box.label}`).join(", "),
        )
    : t.summaryWeight(weight);

  const contentsLabel =
    selectedCategories.length > 0
      ? selectedCategories.map((c) => dict.cargoCategories[c.id].label).join(", ")
      : t.contentsNotSpecified;

  const waMessage = t.whatsappMessage({
    destination: destinationName,
    summary,
    categoryLabel: contentsLabel,
    shipping: eur(quote.shippingEur, locale),
    duty: eur(quote.dutyEur, locale),
  });

  return (
    <>
      <main className="mx-auto max-w-[1100px] px-6 py-10 lg:px-10 lg:py-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="space-y-9">
            {/* ---- Mode: box or kilo. The whole personal model is this
                   one choice, so it leads. ---- */}
            <div>
              <h2 className="display text-[clamp(1.4rem,3.5vw,2rem)]">
                {t.howToPay}
              </h2>
              <p className="measure mt-2 text-sm text-muted">{t.howToPayBody}</p>
              <div className="mt-6 flex gap-2">
                <button
                  type="button"
                  onClick={() => setMode("boxes")}
                  aria-pressed={byBoxes}
                  className={`flex-1 rounded-xl border px-4 py-3.5 text-sm font-semibold transition-colors ${
                    byBoxes
                      ? "border-fg/30 bg-bg-alt"
                      : "border-line text-muted hover:border-fg/25"
                  }`}
                >
                  {t.byTheBox}
                </button>
                <button
                  type="button"
                  onClick={() => setMode("perkg")}
                  aria-pressed={!byBoxes}
                  className={`flex-1 rounded-xl border px-4 py-3.5 text-sm font-semibold transition-colors ${
                    !byBoxes
                      ? "border-fg/30 bg-bg-alt"
                      : "border-line text-muted hover:border-fg/25"
                  }`}
                >
                  {t.byTheKilo(eur(PERSONAL_PER_KG_EUR, locale))}
                </button>
              </div>
            </div>

            {byBoxes ? (
              <>
                {/* ---- Box size and how many — one combined choice. Each
                       size keeps its own flat price, so this is a quantity
                       per size (a small cart, not a single pick) rather
                       than "choose one size, then a count" — mixing e.g.
                       2×M with 1×XXL is a real, common shipment. ---- */}
                <div>
                  <label id="box-sizes-label" className="text-sm font-semibold">
                    {t.boxSize}
                  </label>
                  <div className="mt-4 space-y-2">
                    {BOX_SIZES.map((b) => {
                      const count = boxCounts[b.id] ?? 0;
                      return (
                        <div
                          key={b.id}
                          className={`flex items-center gap-4 rounded-xl border p-3 sm:p-4 ${
                            count > 0
                              ? "border-fg/30 bg-bg-alt shadow-sm"
                              : "border-line"
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <span className="flex flex-wrap items-baseline gap-x-2">
                              <span className="display text-xl">{b.label}</span>
                              <span className="text-sm font-semibold tabular-nums">
                                {eur(b.priceEur, locale)}
                              </span>
                            </span>
                            <span className="mt-1 hidden text-[0.7rem] leading-snug text-muted sm:block">
                              {boxDims(b)} · {t.holdsAbout(typicalBoxKg(b))}
                            </span>
                          </div>
                          <QuantityStepper
                            label={b.label}
                            count={count}
                            onChange={(n) => setCount(b.id, n)}
                            canIncrement={totalBoxCount < MAX_PERSONAL_BOXES}
                            canDecrement={
                              count > 0 && !(count === 1 && totalBoxCount === 1)
                            }
                            decrementLabel={t.decrementBoxLabel(b.label)}
                            incrementLabel={t.incrementBoxLabel(b.label)}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <p className="mt-3 text-xs text-muted">
                    {t.sendingMoreThan(MAX_PERSONAL_BOXES)}
                  </p>
                </div>

                {/* ---- The boxes themselves, to scale, one per size in the
                       cart — proportioned correctly against each other, so
                       "2×M or 1×L?" is answerable by looking rather than
                       comparing centimetres. ---- */}
                {boxLines.length > 0 && (
                  <div className="rounded-2xl border border-line bg-bg-alt px-4 py-5">
                    <div className="flex flex-wrap justify-center gap-6">
                      {boxLines.map((l) => (
                        <div key={l.box.id} className="w-28">
                          <BoxModel
                            box={l.box}
                            ariaLabel={t.scaleModelLabel(
                              l.box.label,
                              l.box.w,
                              l.box.d,
                              l.box.h,
                            )}
                          />
                          <p className="mt-2 text-center text-xs text-muted">
                            <span className="font-semibold text-fg">
                              {l.count} × {l.box.label}
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-center text-xs text-muted">
                      {t.drawnToScale}
                    </p>
                  </div>
                )}
              </>
            ) : (
              /* ---- Weight ---- */
              <div>
                <label id="weight-label" htmlFor="weight" className="text-sm font-semibold">
                  {t.totalWeight}
                  <span className="ms-2 font-normal tabular-nums text-muted">
                    {t.kgUnit(weight)}
                  </span>
                </label>
                <SliderWithNumber
                  id="weight"
                  labelId="weight-label"
                  min={5}
                  max={300}
                  step={5}
                  value={weight}
                  onChange={setWeight}
                />
                <div className="mt-2 flex justify-between text-xs text-muted">
                  <span>{t.kgUnit(5)}</span>
                  <span>{t.kgUnit(300)}</span>
                </div>
                <p className="mt-3 text-xs text-muted">
                  {t.chargedOnActualWeight(eur(PERSONAL_PER_KG_EUR, locale))}
                </p>
              </div>
            )}

            {/* ---- What's in it. Sets the duty rate only — never the
                   shipping price, which stays flat. No declared value is
                   asked for, because customs assesses personal effects on
                   a deemed value per kilo, and the weight is already
                   known from the boxes or the slider above.

                   Multi-select, cart-style: pick as many items as actually
                   apply rather than one "category" that has to stand in for
                   the whole box. No duty percentage is shown anywhere here
                   — a personal sender shouldn't have to weigh customs rates
                   against each other to answer "what's inside", any more
                   than the box-vs-kilo choice above asks about HS codes.
                   The rate still applies underneath (see effectiveCategoryId
                   above); it's just not part of this decision. Collapsed by
                   default since fifteen items is a lot to scan before ever
                   reaching the result below. ---- */}
            <div>
              <label className="text-sm font-semibold">{t.whatsInIt}</label>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {t.whatsInItBody}
              </p>

              {selectedCategories.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {selectedCategories.map((c) => {
                    const strings = dict.cargoCategories[c.id];
                    return (
                      <li key={c.id}>
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedCategoryIds((ids) =>
                              ids.filter((id) => id !== c.id),
                            )
                          }
                          aria-label={t.removeItem(strings.label)}
                          className="flex items-center gap-1.5 rounded-full border border-line bg-bg-alt py-1.5 ps-3 pe-2.5 text-xs font-medium transition-colors hover:border-fg/25"
                        >
                          {strings.label}
                          <span aria-hidden className="text-muted">
                            ×
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}

              <button
                type="button"
                aria-expanded={categoriesExpanded}
                aria-controls="whats-in-it-list"
                onClick={() => setCategoriesExpanded((v) => !v)}
                className="mt-4 text-sm font-semibold text-accent underline-offset-4 hover:underline"
              >
                {categoriesExpanded
                  ? t.doneChoosing
                  : selectedCategories.length > 0
                    ? t.itemsChosenEdit(selectedCategories.length)
                    : t.chooseWhatsInside}
              </button>

              {categoriesExpanded && (
                <fieldset id="whats-in-it-list" className="mt-4 grid grid-cols-2 gap-2">
                  <legend className="sr-only">{t.whatsInIt}</legend>
                  {CARGO_CATEGORIES.map((c) => {
                    const on = selectedCategoryIds.includes(c.id);
                    const strings = dict.cargoCategories[c.id];
                    return (
                      <label
                        key={c.id}
                        className={`flex cursor-pointer items-start gap-2.5 rounded-xl border p-3 text-start transition-colors sm:p-4 ${
                          on
                            ? "border-fg/30 bg-bg-alt shadow-sm"
                            : "border-line hover:border-fg/25"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={on}
                          onChange={() =>
                            setSelectedCategoryIds((ids) =>
                              on
                                ? ids.filter((id) => id !== c.id)
                                : [...ids, c.id],
                            )
                          }
                          className="mt-0.5 shrink-0 accent-[var(--accent)]"
                        />
                        <span className="text-sm font-semibold leading-tight">
                          {strings.label}
                        </span>
                      </label>
                    );
                  })}
                </fieldset>
              )}

              {selectedCategories.some((c) => dict.cargoCategories[c.id].caveat) && (
                <div className="mt-4 space-y-2">
                  {selectedCategories
                    .filter((c) => dict.cargoCategories[c.id].caveat)
                    .map((c) => {
                      const strings = dict.cargoCategories[c.id];
                      return (
                        <p
                          key={c.id}
                          className="rounded-xl border border-accent/40 bg-accent/5 p-4 text-xs leading-relaxed"
                        >
                          <strong>{strings.label}:</strong> {strings.caveat}
                        </p>
                      );
                    })}
                </div>
              )}
            </div>

            <div className="lg:hidden">
              <PersonalResult quote={quote} summary={summary} t={t} locale={locale} />
            </div>
          </div>

          <aside className="hidden h-fit lg:sticky lg:top-10 lg:block">
            <PersonalResult quote={quote} summary={summary} t={t} locale={locale} />
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

        <p className="measure mt-12 text-xs leading-relaxed text-muted">
          {t.footnote(destinationName, CUSTOMS_DATA_AS_OF)}
        </p>
      </main>

      {/* Sticky mobile summary — the price must stay on screen while the
          slider is being dragged. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 px-5 py-3.5 backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-[0.65rem] uppercase tracking-[0.18em] text-muted">
              {destinationName} · {summary}
            </p>
            <p className="display truncate text-2xl leading-tight tabular-nums">
              <AnimatedNumber value={quote.totalEur} format={(n) => eur(n, locale)} />
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

function PersonalResult({
  quote,
  summary,
  t,
  locale,
}: {
  quote: ReturnType<typeof calculatePersonalQuote>;
  summary: string;
  t: Dictionary["personalCalculator"];
  locale: Locale;
}) {
  return (
    <div className="rounded-2xl border border-line bg-bg-alt p-7 lg:p-8">
      <p className="eyebrow">{summary}</p>
      <p className="display mt-3 text-[clamp(2.5rem,7vw,4rem)] leading-none tabular-nums">
        <AnimatedNumber value={quote.totalEur} format={(n) => eur(n, locale)} />
      </p>
      <p className="mt-2 text-xs text-muted">{t.estimatedAllIn}</p>

      {/* The split matters more than the total: one half is our price and
          is fixed, the other is a foreign government's charge that we
          neither set nor collect. Running them together as one number
          would imply we control both. */}
      <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted">{t.shippingYouPayUs}</dt>
          <dd className="font-semibold tabular-nums">{eur(quote.shippingEur, locale)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted">{t.dutyMayCharge}</dt>
          <dd className="font-semibold tabular-nums">{eur(quote.dutyEur, locale)}</dd>
        </div>
      </dl>

      <p className="mt-5 text-sm leading-relaxed text-muted">{quote.basis}</p>
      <p className="mt-3 text-xs leading-relaxed text-muted">
        {quote.dutyBasis} {t.customsFinalAssessment}
      </p>

      {/* The one genuinely useful thing this calculator can tell someone:
          whether the other pricing mode would have been cheaper. Flat box
          pricing is weight-independent, per-kilo rewards light packing —
          so which wins depends entirely on what they are sending. */}
      {/* Compared against shipping, not the all-in total: duty is the same
          either way, so folding it in would dilute the difference the
          choice actually makes. */}
      {quote.alternativeEur !== null && (
        <div className="mt-6 border-t border-line pt-5">
          <p className="text-xs leading-relaxed text-muted">
            {quote.alternativeLabel}
          </p>
          <p className="mt-2.5 text-xs font-semibold">
            {quote.alternativeEur > quote.shippingEur ? (
              <span className="text-accent">
                {t.cheaperByAmount(eur(quote.alternativeEur - quote.shippingEur, locale))}
              </span>
            ) : quote.alternativeEur < quote.shippingEur ? (
              <span>{t.otherOptionSaves(eur(quote.shippingEur - quote.alternativeEur, locale))}</span>
            ) : (
              <span className="text-muted">{t.bothOptionsSame}</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}

/** A plain "− N +" quantity control — precise by construction (each tap is
    exactly one box), unlike a slider, and the ranges here are small enough
    that dragging was never the right interaction to begin with. */
function QuantityStepper({
  label,
  count,
  onChange,
  canIncrement,
  canDecrement,
  decrementLabel,
  incrementLabel,
}: {
  label: string;
  count: number;
  onChange: (n: number) => void;
  canIncrement: boolean;
  canDecrement: boolean;
  decrementLabel: string;
  incrementLabel: string;
}) {
  return (
    <div className="flex shrink-0 items-center gap-1" role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(count - 1)}
        disabled={!canDecrement}
        aria-label={decrementLabel}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-lg leading-none transition-colors hover:border-fg/25 disabled:cursor-not-allowed disabled:opacity-40"
      >
        −
      </button>
      <span className="w-6 text-center text-sm font-semibold tabular-nums">{count}</span>
      <button
        type="button"
        onClick={() => onChange(count + 1)}
        disabled={!canIncrement}
        aria-label={incrementLabel}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-lg leading-none transition-colors hover:border-fg/25 disabled:cursor-not-allowed disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}
