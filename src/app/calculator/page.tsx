"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Wordmark } from "@/components/Logo";
import AnimatedNumber from "@/components/AnimatedNumber";
import Flag from "@/components/Flag";
import {
  BAND_COLORS,
  CARGO_CATEGORIES,
  COST_COLORS,
  CUSTOMS_DATA_AS_OF,
  DESTINATIONS,
  LEBANON_VAT_RATE,
  MIN_CHARGEABLE_KG,
  SECURITY_FEE_RATE,
  bandFor,
  calculateQuote,
  getCategory,
  whatsappLink,
} from "@/lib/pricing";

const eur = (n: number) =>
  new Intl.NumberFormat("en-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

/** 26.5% and 46.5% need a decimal; 5% and 15% should not show one. */
const pct = (n: number) =>
  `${Number.isInteger(n * 100) ? (n * 100).toFixed(0) : (n * 100).toFixed(1)}%`;

export default function CalculatorPage() {
  const [destinationId, setDestinationId] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<string>("used-household");
  const [weight, setWeight] = useState(60);
  const [value, setValue] = useState(500);

  const destination = DESTINATIONS.find((d) => d.id === destinationId) ?? null;
  const category = getCategory(categoryId);
  const byValue = category.basis === "value";

  const quote = useMemo(
    () => calculateQuote({ weightKg: weight, categoryId, declaredValueEur: value }),
    [weight, categoryId, value],
  );

  const segments = [
    { key: "Freight", amount: quote.freightEur, color: COST_COLORS.freight },
    { key: "Clearance", amount: quote.clearanceEur, color: COST_COLORS.clearance },
    { key: "Duty", amount: quote.dutyEur, color: COST_COLORS.duty },
  ];
  const totalForBar = segments.reduce((a, s) => a + s.amount, 0) || 1;

  const waMessage =
    `Hi, I used the calculator on your site. ` +
    `${destination?.name ?? "Lebanon"}, ${category.label.toLowerCase()}, ~${weight} kg` +
    `${byValue ? `, declared ${eur(value)}` : ""}. ` +
    `Estimated ${eur(quote.rangeLowEur)}–${eur(quote.rangeHighEur)}. Can you confirm?`;

  /* ---------------- Destination chooser ---------------- */
  if (!destination) {
    return (
      <div className="min-h-svh">
        <Header />
        <main className="mx-auto max-w-[1100px] px-6 py-16 lg:px-10 lg:py-24">
          <p className="eyebrow">Shipping estimate</p>
          <h1 className="display mt-4 text-[clamp(2.2rem,7vw,3.75rem)]">
            Where is it going?
          </h1>
          <p className="measure mt-4 text-muted">
            Every country taxes imports differently, so the estimate starts with
            the destination.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {DESTINATIONS.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDestinationId(d.id)}
                className="group flex items-center gap-5 rounded-2xl border border-line p-6 text-left transition-all duration-200 hover:border-fg/30 hover:shadow-lg"
              >
                <Flag
                  id={d.id}
                  name={d.name}
                  className="w-[4.5rem] transition-transform duration-200 group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <span>
                  <span className="display block text-3xl">{d.name}</span>
                  <span className="mt-1 block text-sm text-muted">
                    via {d.gateway}
                  </span>
                  <span className="mt-3 block text-sm text-accent">
                    Start estimate →
                  </span>
                </span>
              </button>
            ))}
          </div>

          <p className="mt-8 max-w-[62ch] text-sm text-muted">
            Lebanon is the only destination here for now — it is the only
            corridor we have full customs data for. Adding a country means
            researching its duty tables properly, not just adding it to a list.
          </p>
        </main>
      </div>
    );
  }

  /* ---------------- Calculator ---------------- */
  return (
    <div className="min-h-svh pb-36 lg:pb-0">
      <Header />

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
                name={destination.name}
                priority
                className="w-20 lg:w-28"
              />
              <div>
                <p className="eyebrow">Shipping to</p>
                <h1 className="display mt-1 text-[clamp(2.5rem,9vw,6rem)] leading-[0.9]">
                  {destination.name}
                </h1>
                <p className="mt-2 text-sm text-muted">
                  via {destination.gateway}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setDestinationId(null)}
              className="rounded-full border border-fg/20 px-5 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              Change
            </button>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1100px] px-6 py-10 lg:px-10 lg:py-14">
        {/* ---- How it works: first, not last. The two rules below decide
               which inputs even apply, so reading them after the sliders is
               backwards. ---- */}
        <section className="rounded-2xl border border-line bg-bg-alt p-6 lg:p-8">
          <h2 className="display text-lg lg:text-xl">
            Read this first — two rules decide your cost
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="rounded-xl bg-bg p-5">
              <span
                className="inline-block rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white"
                style={{ background: BAND_COLORS[4] }}
              >
                Used goods
              </span>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Taxed <strong className="text-fg">by weight</strong>. Customs
                applies a deemed value per kilo, so what the contents are
                actually worth changes nothing. Declared value is ignored.
              </p>
            </div>
            <div className="rounded-xl bg-bg p-5">
              <span
                className="inline-block rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white"
                style={{ background: BAND_COLORS[1] }}
              >
                New goods
              </span>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Taxed <strong className="text-fg">by value</strong>, at a rate
                set by the commodity — laptops come in duty free, perfume and
                cosmetics are among the heaviest.
              </p>
            </div>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-muted">
            Freight is charged on weight in both cases, and clearance is a flat
            fee per consignment. This is an estimate, not a quote — rates here
            date from {CUSTOMS_DATA_AS_OF} and need re-confirmation. Final duty
            is assessed by Lebanese customs, not by us, and we are not taking
            bookings yet.
          </p>
        </section>

        {/* ---- Category ---- */}
        <h2 className="display mt-14 text-[clamp(1.4rem,3.5vw,2rem)]">
          What are you sending?
        </h2>
        <p className="measure mt-2 text-sm text-muted">
          Lebanese customs charges a different rate for every commodity. Pick the
          closest match — the percentage shown is its duty rate.
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CARGO_CATEGORIES.map((c) => {
            const on = c.id === categoryId;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategoryId(c.id)}
                aria-pressed={on}
                className={`relative overflow-hidden rounded-xl border p-5 pl-6 text-left transition-all duration-200 ${
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
                <span className="flex items-baseline justify-between gap-3">
                  <span className="display text-lg leading-tight">{c.label}</span>
                  <span
                    className="shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums text-white"
                    style={{ background: BAND_COLORS[bandFor(c.duty)] }}
                  >
                    {pct(c.duty)}
                  </span>
                </span>
                <span className="mt-1.5 block text-xs leading-relaxed text-muted">
                  {c.blurb}
                </span>
                <span className="mt-3 block text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                  {c.basis === "weight" ? "Taxed by weight" : "Taxed by value"}
                </span>
              </button>
            );
          })}
        </div>

        {category.caveat && (
          <p className="mt-5 rounded-xl border border-accent/40 bg-accent/5 p-4 text-xs leading-relaxed">
            <strong>{category.label}:</strong> {category.caveat}
          </p>
        )}

        {/* ---- Inputs + result ---- */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="space-y-9">
            {/* Weight always applies — it drives freight in every case, and
                duty as well when the category is weight-based. */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <label htmlFor="weight" className="text-sm font-semibold">
                  Weight
                  <span className="ml-2 font-normal tabular-nums text-muted">
                    {weight} kg
                  </span>
                </label>
                <Drives
                  parts={byValue ? ["Freight"] : ["Freight", "Duty"]}
                />
              </div>
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

            {/* Declared value is shown either way, but disabled when the
                category is taxed by weight — hiding it would leave people
                wondering where it went; greying it out says why. */}
            <div className={byValue ? "" : "opacity-55"}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <label htmlFor="value" className="text-sm font-semibold">
                  Declared value
                  <span className="ml-2 font-normal tabular-nums text-muted">
                    {byValue ? eur(value) : "—"}
                  </span>
                </label>
                {byValue ? (
                  <Drives parts={["Duty"]} />
                ) : (
                  <span className="rounded-full border border-line px-2.5 py-1 text-[0.65rem] uppercase tracking-wider text-muted">
                    Not used
                  </span>
                )}
              </div>
              <input
                id="value"
                type="range"
                min={50}
                max={10000}
                step={50}
                value={value}
                disabled={!byValue}
                aria-describedby={byValue ? undefined : "value-disabled"}
                onChange={(e) => setValue(Number(e.target.value))}
                className="mt-4 w-full accent-[var(--accent)] disabled:cursor-not-allowed"
              />
              {byValue ? (
                <p className="mt-3 text-xs text-muted">
                  Duty on {category.label.toLowerCase()} follows what the goods
                  are worth, at {pct(category.duty)} plus{" "}
                  {pct(LEBANON_VAT_RATE)} VAT and {pct(SECURITY_FEE_RATE)}{" "}
                  security fee.
                </p>
              ) : (
                <p id="value-disabled" className="mt-3 text-xs text-muted">
                  Switched off because{" "}
                  <strong className="text-fg">
                    {category.label.toLowerCase()}
                  </strong>{" "}
                  are assessed on a deemed value per kilo. Changing this figure
                  could not change the duty, so it does not apply here.
                </p>
              )}
            </div>

            <div className="lg:hidden">
              <Result quote={quote} segments={segments} totalForBar={totalForBar} />
            </div>
          </div>

          <aside className="hidden h-fit lg:sticky lg:top-10 lg:block">
            <Result quote={quote} segments={segments} totalForBar={totalForBar} />
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
      </main>

      {/* Sticky mobile summary — the figure must stay on screen while the
          sliders are being dragged. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 px-5 py-3.5 backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-[0.65rem] uppercase tracking-[0.18em] text-muted">
              {destination.name} · {weight} kg
            </p>
            <p className="display truncate text-2xl leading-tight tabular-nums">
              <AnimatedNumber value={quote.rangeLowEur} format={eur} />
              <span className="text-muted"> – </span>
              <AnimatedNumber value={quote.rangeHighEur} format={eur} />
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
    </div>
  );
}

/** Which line items an input actually moves, colour-keyed to the cost bar. */
function Drives({ parts }: { parts: ("Freight" | "Duty")[] }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="text-[0.65rem] uppercase tracking-wider text-muted">
        Sets
      </span>
      {parts.map((p) => (
        <span
          key={p}
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[0.65rem] font-medium"
        >
          <span
            aria-hidden
            className="h-2 w-2 rounded-full"
            style={{
              background:
                p === "Freight" ? COST_COLORS.freight : COST_COLORS.duty,
            }}
          />
          {p}
        </span>
      ))}
    </span>
  );
}

function Header() {
  return (
    <header className="border-b border-line px-6 py-4 lg:px-10">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between">
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
  );
}

function Result({
  quote,
  segments,
  totalForBar,
}: {
  quote: ReturnType<typeof calculateQuote>;
  segments: { key: string; amount: number; color: string }[];
  totalForBar: number;
}) {
  return (
    <div className="rounded-2xl border border-line bg-bg-alt p-7 lg:p-8">
      <p className="eyebrow">Estimated total</p>
      <p className="display mt-3 text-[clamp(2rem,5vw,3rem)] leading-none tabular-nums">
        <AnimatedNumber value={quote.rangeLowEur} format={eur} />
        <span className="text-muted"> – </span>
        <AnimatedNumber value={quote.rangeHighEur} format={eur} />
      </p>

      {/* Stacked cost bar. Every segment is direct-labelled below, so identity
          never rests on colour alone. 2px surface gaps separate the fills. */}
      <div
        className="mt-7 flex h-3 w-full overflow-hidden rounded-full"
        role="img"
        aria-label={segments.map((s) => `${s.key} ${eur(s.amount)}`).join(", ")}
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
              {s.key === "Freight" && (
                <span className="text-xs">({quote.chargeableKg} kg)</span>
              )}
            </dt>
            <dd className="tabular-nums">{eur(s.amount)}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 border-t border-line pt-5 text-xs leading-relaxed text-muted">
        {quote.dutyBasis}
      </p>
    </div>
  );
}
