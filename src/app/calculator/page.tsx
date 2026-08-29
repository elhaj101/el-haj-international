"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Wordmark } from "@/components/Logo";
import {
  CUSTOMS_DATA_AS_OF,
  MIN_CHARGEABLE_KG,
  NEW_GOODS_CATEGORIES,
  calculateQuote,
  whatsappLink,
  type NewGoodsCategoryId,
  type ShipmentKind,
} from "@/lib/pricing";

const eur = (n: number) =>
  new Intl.NumberFormat("en-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

export default function CalculatorPage() {
  const [weight, setWeight] = useState(60);
  const [kind, setKind] = useState<ShipmentKind>("used");
  const [category, setCategory] = useState<NewGoodsCategoryId>("apparel");
  const [value, setValue] = useState(500);

  const quote = useMemo(
    () =>
      calculateQuote({
        weightKg: weight,
        kind,
        declaredValueEur: value,
        categoryId: category,
      }),
    [weight, kind, value, category],
  );

  const waMessage =
    `Hi, I used the calculator on your site. ` +
    `Shipment: ~${weight} kg of ${kind === "used" ? "used household goods" : "new goods"}` +
    `, estimated ${eur(quote.rangeLowEur)}–${eur(quote.rangeHighEur)}. ` +
    `Can you confirm?`;

  return (
    <div className="min-h-svh">
      {/* Deliberately plain header — this is a tool people bounce to and from,
          not a branded destination. */}
      <header className="border-b border-line px-6 py-4 lg:px-10">
        <div className="mx-auto flex max-w-[1000px] items-center justify-between">
          <Link href="/" aria-label="El Haj International — home">
            <Wordmark compact />
          </Link>
          <Link
            href="/"
            className="text-sm text-muted transition-colors hover:text-fg"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1000px] px-6 py-14 lg:px-10">
        <p className="eyebrow">Shipping estimate</p>
        <h1 className="display mt-4 text-[clamp(2rem,5vw,3.5rem)]">
          What will it cost?
        </h1>
        <p className="measure mt-4 text-muted">
          A rough estimate for a consignment from Europe to Lebanon. No account
          needed, and nothing is sent to us unless you choose to message.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          {/* ---- Inputs ---- */}
          <div className="space-y-9">
            <fieldset>
              <legend className="text-sm font-semibold">
                What are you sending?
              </legend>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {(
                  [
                    { id: "used", label: "Used household goods" },
                    { id: "new", label: "New goods" },
                  ] as const
                ).map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setKind(o.id)}
                    aria-pressed={kind === o.id}
                    className={`rounded-xl border p-4 text-left text-sm transition-colors duration-200 ${
                      kind === o.id
                        ? "border-accent bg-accent/5 text-fg"
                        : "border-line text-muted hover:border-fg/25"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted">
                Customs treats these completely differently — used goods are
                taxed by weight, new goods by value.
              </p>
            </fieldset>

            <div>
              <label htmlFor="weight" className="text-sm font-semibold">
                Weight
                <span className="ml-2 font-normal text-muted">
                  {weight} kg
                </span>
              </label>
              <input
                id="weight"
                type="range"
                min={5}
                max={1000}
                step={5}
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="mt-4 w-full accent-[var(--accent)]"
              />
              <div className="mt-2 flex justify-between text-xs text-muted">
                <span>5 kg</span>
                <span>1000 kg</span>
              </div>
              {quote.minimumApplied && (
                <p className="mt-3 text-xs text-accent">
                  Minimum chargeable weight is {MIN_CHARGEABLE_KG} kg, so this is
                  priced as {MIN_CHARGEABLE_KG} kg.
                </p>
              )}
            </div>

            {kind === "new" && (
              <>
                <div>
                  <label htmlFor="category" className="text-sm font-semibold">
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value as NewGoodsCategoryId)
                    }
                    className="mt-3 w-full rounded-xl border border-line bg-bg p-3.5 text-sm"
                  >
                    {NEW_GOODS_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label} — {(c.duty * 100).toFixed(0)}% duty
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="value" className="text-sm font-semibold">
                    Declared value
                    <span className="ml-2 font-normal text-muted">
                      {eur(value)}
                    </span>
                  </label>
                  <input
                    id="value"
                    type="range"
                    min={50}
                    max={10000}
                    step={50}
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    className="mt-4 w-full accent-[var(--accent)]"
                  />
                </div>
              </>
            )}
          </div>

          {/* ---- Result ---- */}
          <aside className="h-fit rounded-2xl border border-line bg-bg-alt p-8 lg:sticky lg:top-10">
            <p className="eyebrow">Estimated total</p>
            <p className="display mt-3 text-[clamp(2rem,5vw,3rem)] leading-none">
              {eur(quote.rangeLowEur)}
              <span className="text-muted"> – </span>
              {eur(quote.rangeHighEur)}
            </p>

            <dl className="mt-8 space-y-3 border-t border-line pt-6 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">
                  Freight ({quote.chargeableKg} kg)
                </dt>
                <dd>{eur(quote.freightEur)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Clearance & documentation</dt>
                <dd>{eur(quote.clearanceEur)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Estimated customs duty</dt>
                <dd>{eur(quote.dutyEur)}</dd>
              </div>
            </dl>

            <p className="mt-6 border-t border-line pt-5 text-xs leading-relaxed text-muted">
              {quote.dutyBasis}
            </p>

            <a
              href={whatsappLink(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02]"
            >
              Check this with us →
            </a>
          </aside>
        </div>

        {/* Honest about what this is. The underlying figures are four years old
            and the business is not licensed yet — say so rather than imply a
            binding quote. */}
        <section className="mt-16 rounded-2xl border border-line p-8">
          <h2 className="display text-xl">How this is calculated</h2>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
            <li>
              <strong className="text-fg">Used goods are taxed by weight.</strong>{" "}
              Lebanese customs values used household goods at a deemed rate per
              kilo rather than what you say they are worth, so a heavy box of
              old clothes and a light box of good ones are taxed the same.
            </li>
            <li>
              <strong className="text-fg">
                Clearance is a flat fee per consignment.
              </strong>{" "}
              Broker, stamp duty, handling and deconsolidation do not scale with
              weight, which is why small shipments have a minimum.
            </li>
            <li>
              <strong className="text-fg">This is an estimate, not a quote.</strong>{" "}
              Customs rates in use here date from {CUSTOMS_DATA_AS_OF} and need
              re-confirmation. Final duty is assessed by Lebanese customs, not by
              us. We are not taking bookings yet.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
