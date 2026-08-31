"use client";

import Link from "next/link";
import { useState } from "react";
import { Wordmark } from "@/components/Logo";
import Flag from "@/components/Flag";
import BusinessCalculator from "@/components/calculator/BusinessCalculator";
import PersonalCalculator from "@/components/calculator/PersonalCalculator";
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
 */
export default function CalculatorPage() {
  const [destinationId, setDestinationId] = useState<string | null>(null);
  const [profile, setProfile] = useState<ShipmentProfile>("personal");

  const destination = DESTINATIONS.find((d) => d.id === destinationId) ?? null;

  /* ---------------- Step 1 · Destination chooser ---------------- */
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

  /* ---------------- Step 2 · The country's page ---------------- */
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

          {/* Profile switch. Sits inside the banner rather than in the page
              body because it swaps the entire calculator underneath — it is
              navigation, not an input. */}
          <div
            role="tablist"
            aria-label="What kind of shipment"
            className="mt-9 flex flex-wrap gap-2"
          >
            <ProfileTab
              on={profile === "personal"}
              onClick={() => setProfile("personal")}
              title="Personal parcel"
              blurb="Boxes to family — one flat price"
            />
            <ProfileTab
              on={profile === "business"}
              onClick={() => setProfile("business")}
              title="Business shipment"
              blurb="Commercial stock — freight, clearance and duty"
            />
          </div>
        </div>
      </section>

      {profile === "personal" ? (
        <PersonalCalculator destinationName={destination.name} />
      ) : (
        <BusinessCalculator destinationName={destination.name} />
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
