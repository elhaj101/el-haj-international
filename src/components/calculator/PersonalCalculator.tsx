"use client";

import { useMemo, useState } from "react";
import AnimatedNumber from "@/components/AnimatedNumber";
import {
  BAND_COLORS,
  BOX_SIZES,
  CARGO_CATEGORIES,
  CUSTOMS_DATA_AS_OF,
  MAX_PERSONAL_BOXES,
  PERSONAL_PER_KG_EUR,
  bandFor,
  boxDims,
  calculatePersonalQuote,
  getBoxSize,
  getCategory,
  typicalBoxKg,
  whatsappLink,
  type PersonalMode,
} from "@/lib/pricing";
import BoxModel from "./BoxModel";
import { eur, pct } from "./format";

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
}: {
  destinationName: string;
}) {
  const [mode, setMode] = useState<PersonalMode>("boxes");
  const [boxId, setBoxId] = useState("L");
  const [numBoxes, setNumBoxes] = useState(3);
  const [weight, setWeight] = useState(30);
  const [categoryId, setCategoryId] = useState("used-household");

  const box = getBoxSize(boxId);
  const category = getCategory(categoryId);
  const byBoxes = mode === "boxes";

  const quote = useMemo(
    () =>
      calculatePersonalQuote({
        mode,
        boxId,
        numBoxes,
        weightKg: weight,
        categoryId,
      }),
    [mode, boxId, numBoxes, weight, categoryId],
  );

  const summary = byBoxes
    ? `${numBoxes} × ${box.label} box${numBoxes === 1 ? "" : "es"}`
    : `${weight} kg`;

  const waMessage =
    `Hi, I used the calculator on your site. ` +
    `Personal parcel to ${destinationName}, ${summary}, ` +
    `${category.label.toLowerCase()}. Shipping ${eur(quote.shippingEur)}, ` +
    `estimated duty ${eur(quote.dutyEur)}. Can you confirm?`;

  return (
    <>
      <main className="mx-auto max-w-[1100px] px-6 py-10 lg:px-10 lg:py-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="space-y-9">
            {/* ---- Mode: box or kilo. The whole personal model is this
                   one choice, so it leads. ---- */}
            <div>
              <h2 className="display text-[clamp(1.4rem,3.5vw,2rem)]">
                How do you want to pay?
              </h2>
              <p className="measure mt-2 text-sm text-muted">
                A flat price per box whatever it weighs, or a flat price per
                kilo. Pick whichever suits what you are sending — the estimate
                below shows what the other one would cost.
              </p>
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
                  By the box
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
                  By the kilo · €{PERSONAL_PER_KG_EUR.toFixed(2)}/kg
                </button>
              </div>
            </div>

            {byBoxes ? (
              <>
                {/* ---- Box size ---- */}
                <div>
                  <label className="text-sm font-semibold">Box size</label>
                  {/* Three across at every width. On phones the dimensions
                      and capacity are hidden here rather than squeezed into
                      an 85px column — the model directly below states both
                      for whichever box is selected. */}
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {BOX_SIZES.map((b) => {
                      const on = b.id === boxId;
                      return (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setBoxId(b.id)}
                          aria-pressed={on}
                          className={`rounded-xl border p-3 text-left transition-colors sm:p-4 ${
                            on
                              ? "border-fg/30 bg-bg-alt shadow-sm"
                              : "border-line hover:border-fg/25"
                          }`}
                        >
                          <span className="flex flex-wrap items-baseline justify-between gap-x-2">
                            <span className="display text-xl">{b.label}</span>
                            <span className="text-sm font-semibold tabular-nums">
                              {eur(b.priceEur)}
                            </span>
                          </span>
                          <span className="mt-1.5 hidden text-[0.7rem] leading-snug text-muted sm:block">
                            {boxDims(b)}
                          </span>
                          <span className="mt-1 hidden text-[0.7rem] leading-snug text-muted sm:block">
                            holds ~{typicalBoxKg(b)} kg
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ---- The box itself, to scale. Sits directly under the
                       size buttons so the change is visible at the moment
                       it is made. ---- */}
                <div className="rounded-2xl border border-line bg-bg-alt px-4 py-5">
                  <BoxModel box={box} />
                  <p className="mt-3 text-center text-xs text-muted">
                    <span className="font-semibold text-fg">
                      {box.label} · {boxDims(box)} · holds ~{typicalBoxKg(box)}{" "}
                      kg
                    </span>
                    <span className="mt-0.5 block">
                      drawn to scale — the three sizes are shown in real
                      proportion to each other
                    </span>
                  </p>
                </div>

                {/* ---- How many ---- */}
                <div>
                  <label htmlFor="numBoxes" className="text-sm font-semibold">
                    How many boxes
                    <span className="ml-2 font-normal tabular-nums text-muted">
                      {numBoxes}
                    </span>
                  </label>
                  <input
                    id="numBoxes"
                    type="range"
                    min={1}
                    max={MAX_PERSONAL_BOXES}
                    step={1}
                    value={numBoxes}
                    onChange={(e) => setNumBoxes(Number(e.target.value))}
                    className="mt-4 w-full accent-[var(--accent)]"
                  />
                  <div className="mt-2 flex justify-between text-xs text-muted">
                    <span>1 box</span>
                    <span>{MAX_PERSONAL_BOXES} boxes</span>
                  </div>
                  <p className="mt-3 text-xs text-muted">
                    Sending more than {MAX_PERSONAL_BOXES}? Message us — at that
                    size it is worth pricing properly rather than by the box.
                  </p>
                </div>
              </>
            ) : (
              /* ---- Weight ---- */
              <div>
                <label htmlFor="weight" className="text-sm font-semibold">
                  Total weight
                  <span className="ml-2 font-normal tabular-nums text-muted">
                    {weight} kg
                  </span>
                </label>
                <input
                  id="weight"
                  type="range"
                  min={5}
                  max={300}
                  step={5}
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="mt-4 w-full accent-[var(--accent)]"
                />
                <div className="mt-2 flex justify-between text-xs text-muted">
                  <span>5 kg</span>
                  <span>300 kg</span>
                </div>
                <p className="mt-3 text-xs text-muted">
                  Charged on actual weight at a flat €
                  {PERSONAL_PER_KG_EUR.toFixed(2)} per kilo, whatever the boxes
                  are.
                </p>
              </div>
            )}

            {/* ---- What's in it. Sets the duty rate only — never the
                   shipping price, which stays flat. No declared value is
                   asked for, because customs assesses personal effects on
                   a deemed value per kilo, and the weight is already
                   known from the boxes or the slider above. ---- */}
            <div>
              <label className="text-sm font-semibold">What is in it?</label>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                This does not change the shipping price. It sets the rate
                Lebanese customs may charge on arrival — the percentage on each
                card.
              </p>
              {/* Two-up even on the narrowest phone: fifteen full-width
                  cards is a scroll, and each card is only a name and a
                  rate. */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                {CARGO_CATEGORIES.map((c) => {
                  const on = c.id === categoryId;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCategoryId(c.id)}
                      aria-pressed={on}
                      className={`relative overflow-hidden rounded-xl border py-3 pl-4 pr-2.5 text-left transition-all duration-200 sm:pl-5 sm:pr-3 ${
                        on
                          ? "border-fg/30 bg-bg-alt shadow-sm"
                          : "border-line hover:border-fg/25"
                      }`}
                    >
                      <span
                        aria-hidden
                        className="absolute inset-y-0 left-0 w-1.5"
                        style={{ background: BAND_COLORS[bandFor(c.duty)] }}
                      />
                      {/* min-w-0 lets the name shrink and wrap; flex-wrap
                          drops the rate onto its own line rather than
                          pushing it under the card's overflow clip. Without
                          both, "46.5%" renders as "46" on a 320px screen. */}
                      <span className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
                        <span className="min-w-0 text-sm font-semibold leading-tight">
                          {c.label}
                        </span>
                        <span
                          className="shrink-0 rounded-full px-2 py-0.5 text-[0.7rem] font-semibold tabular-nums text-white"
                          style={{ background: BAND_COLORS[bandFor(c.duty)] }}
                        >
                          {pct(c.duty)}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
              {category.caveat && (
                <p className="mt-4 rounded-xl border border-accent/40 bg-accent/5 p-4 text-xs leading-relaxed">
                  <strong>{category.label}:</strong> {category.caveat}
                </p>
              )}
            </div>

            <div className="lg:hidden">
              <PersonalResult quote={quote} summary={summary} />
            </div>
          </div>

          <aside className="hidden h-fit lg:sticky lg:top-10 lg:block">
            <PersonalResult quote={quote} summary={summary} />
            <a
              href={whatsappLink(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02]"
            >
              Check this with us →
            </a>
          </aside>
        </div>

        <p className="measure mt-12 text-xs leading-relaxed text-muted">
          The shipping price covers what we handle — Berlin to{" "}
          {destinationName}, on our own consolidated container. The duty figure
          is separate: it is charged by Lebanese customs on arrival, not by us,
          and we have estimated it from the parcel&apos;s weight at the deemed
          value customs applies to personal effects. Customs rates here date
          from {CUSTOMS_DATA_AS_OF} and need re-confirmation, and customs make
          the final assessment on the day. This is an estimate, not a quote, and
          we are not taking bookings yet.
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
              <AnimatedNumber value={quote.totalEur} format={eur} />
            </p>
          </div>
          <a
            href={whatsappLink(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white"
          >
            Check
          </a>
        </div>
      </div>
    </>
  );
}

function PersonalResult({
  quote,
  summary,
}: {
  quote: ReturnType<typeof calculatePersonalQuote>;
  summary: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-bg-alt p-7 lg:p-8">
      <p className="eyebrow">{summary}</p>
      <p className="display mt-3 text-[clamp(2.5rem,7vw,4rem)] leading-none tabular-nums">
        <AnimatedNumber value={quote.totalEur} format={eur} />
      </p>
      <p className="mt-2 text-xs text-muted">estimated all-in</p>

      {/* The split matters more than the total: one half is our price and
          is fixed, the other is a foreign government's charge that we
          neither set nor collect. Running them together as one number
          would imply we control both. */}
      <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted">Shipping — you pay us</dt>
          <dd className="font-semibold tabular-nums">{eur(quote.shippingEur)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted">
            Duty — customs may charge on arrival
          </dt>
          <dd className="font-semibold tabular-nums">{eur(quote.dutyEur)}</dd>
        </div>
      </dl>

      <p className="mt-5 text-sm leading-relaxed text-muted">{quote.basis}</p>
      <p className="mt-3 text-xs leading-relaxed text-muted">
        {quote.dutyBasis} Customs make the final assessment, not us.
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
                This is the cheaper way to ship it, by{" "}
                {eur(quote.alternativeEur - quote.shippingEur)}.
              </span>
            ) : quote.alternativeEur < quote.shippingEur ? (
              <span>
                The other option would save you about{" "}
                {eur(quote.shippingEur - quote.alternativeEur)} — worth a look.
              </span>
            ) : (
              <span className="text-muted">
                Both options come out about the same here.
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
