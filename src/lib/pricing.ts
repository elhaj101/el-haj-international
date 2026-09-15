/* ===================================================================
   PRICING + CUSTOMS CONSTANTS — single source of truth
   ===================================================================

   Every number the calculator shows comes from this file. Two very
   different kinds of number live here, and they must not be confused:

   (A) CUSTOMS FACTS — researched from primary sources, cited below.
       These are not ours to choose. They go stale; each carries a
       date and a re-confirmation flag.

   (B) OUR COMMERCIAL RATES — freight markup, clearance fee, minimums.
       *** THESE ARE PLACEHOLDERS. Ali has not set real prices yet. ***
       They must be replaced with real numbers before this page is
       shown to a paying customer.

   Sources for (A):
     - FIDI Import Customs Guide — Lebanon, dated 5 April 2022.
       Deemed valuation, duty bands, security fee.
     - Lebanese Customs Law, Decree 4461/2000 (customs.gov.lb).
     - customs.gov.lb "Duties & Taxes on Special Commodities", read
       2026-08-28. Site labels its own output "approximate and rounded
       ... no official character".

   KNOWN STALENESS: the FIDI figures are four years old, in a country
   whose currency and customs practice have moved violently since.
   Re-confirm with a Lebanese broker before any of this touches a real
   quote. Tracked in the vault at
   4-Resources/lebanon-customs-container-consolidation-2026-08-29.md
   =================================================================== */

import { eur, num, pct } from "@/components/calculator/format";
import { GERMANY_COUNTRY_ID } from "./euCountries";
import type { Dictionary } from "./i18n/dictionary";
import type { Locale } from "./i18n/locales";

/** Everything in (A) was last verified on this date. Surfaced in the UI. */
export const CUSTOMS_DATA_AS_OF = "April 2022 (FIDI) / August 2026 (customs.gov.lb)";

/* -------------------------------------------------------------------
   (A) CUSTOMS FACTS
   ------------------------------------------------------------------- */

/**
 * Used household goods are NOT assessed on declared value. Lebanese
 * customs applies a deemed valuation per kilo, so weight is the tax
 * base and what the goods are actually worth is largely irrelevant.
 * This is the single most important number in the whole model.
 * Quoted directly in EUR, not converted from USD — Ali confirmed
 * 2026-09-14 that Lebanese customs prices uninvoiced goods at a flat
 * 3 EUR/kg, correcting the earlier (wrong) USD-denominated assumption.
 * Source: FIDI Lebanon guide, April 2022.
 */
export const DEEMED_VALUATION_EUR_PER_KG = 3.0;

/**
 * Rate assumed for a personal parcel whose contents haven't been told to
 * us — the multi-select "what's in it" list can be left empty. Lebanese
 * customs will still assess *something* on arrival, so this is a modest
 * placeholder (the same duty band as low-rate items like phones or
 * apparel) rather than either 0% or the highest band, applied on top of
 * the same deemed valuation as every named category. Ali set this rate
 * 2026-09-14.
 */
export const UNSPECIFIED_CONTENTS_DUTY_RATE = 0.05;

/**
 * Duty + taxes on used household / removal goods, plus the separate 3%
 * security fee. NB: the customs.gov.lb calculator omits the security
 * fee entirely, which is why it is added explicitly here.
 * Source: FIDI Lebanon guide, April 2022.
 */
export const USED_HOUSEHOLD_DUTY_RATE = 0.265;
export const SECURITY_FEE_RATE = 0.03;

/**
 * Commercial shipments — scoped to *new* furniture / new household
 * articles. The 26.5 → 46.5 gap is NOT a clean personal-vs-commercial
 * spread; used-vs-new is doing most of that work. Do not model it as
 * a 20-point classification arbitrage.
 */
export const COMMERCIAL_DUTY_RATE = 0.465;

/** Lebanon's standard VAT rate, charged on CIF value (not stacked on duty). */
export const LEBANON_VAT_RATE = 0.11;

/* -------------------------------------------------------------------
   (B) OUR COMMERCIAL RATES  —  ⚠️ ALL PLACEHOLDERS ⚠️
   Replace before quoting anyone. Structure is from the vault's pricing
   model: [marked-up per-kg freight] + [marked-up flat per-consignee
   clearance fee, with a minimum].
   ------------------------------------------------------------------- */

/** PLACEHOLDER — retail per-kg sea groupage rate, Germany → Lebanon. */
export const FREIGHT_EUR_PER_KG = 2.2;

/**
 * PLACEHOLDER — flat clearance + documentation fee per consignee.
 * Per-declaration costs (broker fee, stamp duty, handling,
 * deconsolidation) do not scale with weight, so they are billed flat
 * and marked up. This is where a large share of the margin lives.
 */
export const CLEARANCE_FEE_EUR = 65;

/**
 * PLACEHOLDER — minimum chargeable weight. Standard groupage mechanism:
 * stops a small shipment being priced below its real share of the
 * container's fixed cost.
 */
export const MIN_CHARGEABLE_KG = 30;

/**
 * Estimates are shown as a range, never a single hard number.
 * Business shipments only — a flat box price is not an estimate, so the
 * personal path below deliberately does not use this.
 */
export const ESTIMATE_SPREAD = 0.12;

/* -------------------------------------------------------------------
   (C) PERSONAL PARCEL PRICING  —  ⚠️ ALL PLACEHOLDERS ⚠️

   A completely different product from the business path above. A person
   sending three boxes to family does not want a duty table; they want
   one number. So this is flat: pick a box size and a count, or give a
   weight and pay a flat rate per kilo — whichever suits the parcel.

   *** THE FOUR PRICES BELOW ARE BENCHMARKS, NOT OUR RATES. ***
   The box sizes and the per-kg rate are prevailing market figures on
   this corridor, used to get the shape of the model right. All four
   must be replaced with our own before this page quotes a real
   customer. Nothing here has been through a costing exercise.

   Deliberately NOT modelled here: container cost, packing efficiency,
   cost per box, profit and margin. This file ships to a public page, so
   unit economics do not belong in it — that analysis lives in internal
   tooling, kept out of this repository.
   ------------------------------------------------------------------- */

/** Money is rounded to the cent everywhere in this file. */
const round = (n: number) => Math.round(n * 100) / 100;

/** Which of the two calculators the visitor is looking at. */
export type ShipmentProfile = "personal" | "business";

/** Personal parcels price one of two ways, customer's choice. */
export type PersonalMode = "boxes" | "perkg";

/**
 * `pickup` — Berlin/Brandenburg, we collect it, no DHL leg at all.
 * `domestic-dhl` — rest of Germany, customer ships to us via DHL Paket.
 * `eu-dhl` — rest of the EU, customer ships to us via DHL Paket International.
 * Derived from the country dropdown plus, for Germany, the state dropdown
 * (both real `<select>` lists sourced from EU_COUNTRIES in
 * euCountries.ts — no free text, no matching) — see `deriveShippingZone`.
 */
export type ShippingZone = "pickup" | "domestic-dhl" | "eu-dhl";

const BERLIN_BRANDENBURG_STATES = new Set(["Berlin", "Brandenburg"]);

export const isBerlinBrandenburgState = (state: string) =>
  BERLIN_BRANDENBURG_STATES.has(state);

export function deriveShippingZone(
  countryId: string,
  state: string,
): ShippingZone {
  if (countryId !== GERMANY_COUNTRY_ID) return "eu-dhl";
  return isBerlinBrandenburgState(state) ? "pickup" : "domestic-dhl";
}

export interface BoxSize {
  id: string;
  label: string;
  /** Outer dimensions in cm — the source of both `dims` and the 3D model. */
  w: number;
  h: number;
  d: number;
  volumeM3: number;
  /**
   * PLACEHOLDER (pickup) + REAL (the other two) — three prices, one per
   * `ShippingZone`, not one flat price. `pickup` is still an invented
   * benchmark like the old single `priceEur` was. `domestic-dhl` and
   * `eu-dhl` are that same pickup price plus Deutsche Post/DHL's real
   * published Paket rate for this box's weight (pulled 2026-09-15, price
   * sheet effective 01.01.2026) — full cost pass-through, no markup and no
   * discount, so switching zones changes what we charge but not what we
   * keep. `null` means the box cannot travel that way at all: DHL's
   * weight caps (31.5 kg domestic, 30 kg international) are both below
   * XXL's own ~41 kg typical capacity, so XXL only exists in `pickup`.
   * `pickup` itself is never null — every box size is collectable in
   * person, which is what keeps SMALLEST_BOX_SIZE's ranking below valid
   * without an extra null check.
   */
  pricesByZone: {
    pickup: number;
    "domestic-dhl": number | null;
    "eu-dhl": number | null;
  };
  note?: string;
}

/**
 * `w × d × h` is how the flyer prints them (length, width, height), so
 * height is the third number, not the second. The 3D model reads these
 * fields directly — nothing parses the display string.
 */
export const BOX_SIZES: BoxSize[] = [
  {
    id: "M",
    label: "M",
    w: 40,
    d: 30,
    h: 30,
    volumeM3: 0.036,
    pricesByZone: { pickup: 40, "domestic-dhl": 58.99, "eu-dhl": 71.49 },
  },
  {
    id: "L",
    label: "L",
    w: 60,
    d: 38,
    h: 38,
    volumeM3: 0.0866,
    pricesByZone: { pickup: 60, "domestic-dhl": 83.99, "eu-dhl": 108.49 },
  },
  {
    id: "XXL",
    label: "XXL",
    w: 75,
    d: 42,
    h: 41,
    volumeM3: 0.1291,
    pricesByZone: { pickup: 75, "domestic-dhl": null, "eu-dhl": null },
  },
];

/** "60 × 38 × 38 cm", built from the real numbers so the two can't drift. */
export const boxDims = (b: BoxSize) => `${b.w} × ${b.d} × ${b.h} cm`;

export const getBoxSize = (id: string) =>
  BOX_SIZES.find((b) => b.id === id) ?? BOX_SIZES[1];

/** This box's price in a given zone, or null if it can't ship that way. */
export const priceForZone = (box: BoxSize, zone: ShippingZone) =>
  box.pricesByZone[zone];

export const isBoxOfferedInZone = (box: BoxSize, zone: ShippingZone) =>
  priceForZone(box, zone) !== null;

/**
 * Cheapest box — computed, not hand-picked, so it can't drift from
 * BOX_SIZES if a price changes. Both calculators default to this rather
 * than a "typical" size, so the first number a visitor sees is the floor,
 * not a guess at their actual shipment. Ranked on the `pickup` price: M is
 * cheapest in every zone, so this ordering holds regardless of zone.
 */
export const SMALLEST_BOX_SIZE = BOX_SIZES.reduce((min, b) =>
  b.pricesByZone.pickup < min.pricesByZone.pickup ? b : min,
);

/** PLACEHOLDER — flat per-kilo price, the alternative to a box price. */
export const PERSONAL_PER_KG_EUR = 2.5;

/** Most people send a handful of boxes, not a pallet. */
export const MAX_PERSONAL_BOXES = 15;

/**
 * Typical packed density of a mixed household box, kg per m³. A physical
 * rule of thumb, not a rate: it exists only to answer "roughly what does
 * a box this size hold?", which is what makes the box-vs-per-kg
 * comparison below possible. Not a user-facing control — a customer
 * should not have to estimate their own packing density to get a price.
 */
export const TYPICAL_DENSITY_KG_PER_M3 = 320;

/** Roughly what a box of this size holds, in kg, when normally packed. */
export const typicalBoxKg = (box: BoxSize) =>
  Math.round(box.volumeM3 * TYPICAL_DENSITY_KG_PER_M3);

export interface PersonalQuoteInput {
  mode: PersonalMode;
  /**
   * "boxes" mode — count per BOX_SIZES id, e.g. `{ M: 2, XXL: 1 }`. Sizes
   * absent or at 0 aren't part of the parcel. Each size keeps its own flat
   * price; nothing here averages or blends across sizes.
   */
  boxCounts?: Record<string, number>;
  /** "perkg" mode. */
  weightKg?: number;
  /** Id from CARGO_CATEGORIES — sets the duty rate. */
  categoryId?: string;
  /** Decides which of a box's three prices applies — see ShippingZone. */
  zone: ShippingZone;
}

export interface PersonalQuote {
  /** What the customer pays us. Flat and exact — never a range. */
  shippingEur: number;
  /** The parcel's weight, actual or implied. The duty base. */
  weightKg: number;
  /** What Lebanese customs may assess on arrival. NOT paid to us. */
  dutyEur: number;
  /** shippingEur + dutyEur — the realistic all-in figure. */
  totalEur: number;
  /** One-line plain-English statement of how the shipping price was reached. */
  basis: string;
  /** Same, for the duty figure. */
  dutyBasis: string;
  /**
   * What the same parcel would cost on the other pricing mode, so the
   * customer can see which suits them. Shipping only — duty does not
   * change with how the shipping is priced. Null when there is nothing
   * meaningful to compare (e.g. a zero-weight input).
   */
  alternativeEur: number | null;
  alternativeLabel: string;
}

/**
 * Duty on a personal parcel, from weight alone.
 *
 * Lebanese customs assesses personal effects on a *deemed* value per kilo
 * rather than on what the sender says the contents are worth — which is
 * exactly why this path needs no declared-value input. The category only
 * supplies the rate; the weight supplies the base.
 *
 * `categoryId` undefined means the sender hasn't told us what's inside
 * (the "what are you sending" list lets that be left empty) — that is
 * NOT the same as picking a named category, so it does not fall back to
 * one. It gets its own rate and its own sentence instead, both honest
 * about being a placeholder rather than an item-specific figure.
 *
 * Extrapolation to flag: the deemed-valuation method is documented for
 * used household goods (see DEEMED_VALUATION_EUR_PER_KG). Applying it to
 * the other categories' rates is our own simplification for a
 * consumer-facing estimate, not something the FIDI guide states. The UI
 * says so. VAT is deliberately not stacked on here — the deemed-value
 * treatment in the source is duty + security fee.
 */
function personalDuty(
  weightKg: number,
  categoryId: string | undefined,
  dict: Dictionary,
  locale: Locale,
) {
  const t = dict.pricingSentences;
  const deemedEur = weightKg * DEEMED_VALUATION_EUR_PER_KG;

  if (categoryId === undefined) {
    const dutyEur = round(
      deemedEur * (UNSPECIFIED_CONTENTS_DUTY_RATE + SECURITY_FEE_RATE),
    );
    return {
      dutyEur,
      dutyBasis: t.personalDutyUnspecified({
        securityFeePct: pct(SECURITY_FEE_RATE, locale),
        deemedEurPerKg: num(DEEMED_VALUATION_EUR_PER_KG, 2, locale),
        weightKg,
        unspecifiedDutyPct: pct(UNSPECIFIED_CONTENTS_DUTY_RATE, locale),
      }),
    };
  }

  const category = getCategory(categoryId);
  const categoryLabel = dict.cargoCategories[category.id]?.label ?? category.id;
  const dutyEur = round(deemedEur * (category.duty + SECURITY_FEE_RATE));

  const dutyBasis =
    category.duty === 0
      ? t.personalDutyFree({
          categoryLabel,
          securityFeePct: pct(SECURITY_FEE_RATE, locale),
          deemedEurPerKg: num(DEEMED_VALUATION_EUR_PER_KG, 2, locale),
          weightKg,
        })
      : t.personalDutyCharged({
          weightKg,
          deemedEurPerKg: num(DEEMED_VALUATION_EUR_PER_KG, 2, locale),
          dutyPct: pct(category.duty, locale),
          categoryLabel,
          securityFeePct: pct(SECURITY_FEE_RATE, locale),
        });

  return { dutyEur, dutyBasis };
}

export function calculatePersonalQuote(
  input: PersonalQuoteInput,
  dict: Dictionary,
  locale: Locale,
): PersonalQuote {
  const t = dict.pricingSentences;

  if (input.mode === "boxes") {
    const counts = input.boxCounts ?? {};
    // Each size keeps its own flat price (zone-dependent — see
    // priceForZone) and typical weight — a mixed parcel is just those
    // lines summed, not a blended "average box". `?? 0` only guards a box
    // whose zone stopped offering it a moment ago, before the calculator's
    // own reset effect clears its count.
    const lines = BOX_SIZES.map((box) => ({
      box,
      count: Math.max(0, Math.round(counts[box.id] ?? 0)),
    })).filter((l) => l.count > 0);

    const shippingEur = round(
      lines.reduce(
        (sum, l) => sum + l.count * (priceForZone(l.box, input.zone) ?? 0),
        0,
      ),
    );
    const weightKg = lines.reduce(
      (sum, l) => sum + l.count * typicalBoxKg(l.box),
      0,
    );
    const totalBoxes = lines.reduce((sum, l) => sum + l.count, 0);

    const { dutyEur, dutyBasis } = personalDuty(
      weightKg,
      input.categoryId,
      dict,
      locale,
    );

    // What the same parcel would cost per kilo.
    const alternativeEur = round(weightKg * PERSONAL_PER_KG_EUR);

    // A single size (the common case, including the empty-cart default)
    // keeps the specific "N × size at €X each" phrasing; more than one
    // size falls back to a plain breakdown — box *labels* (M/L/XXL) are
    // size codes, not words needing per-locale plural agreement, so
    // joining them needs no localization beyond the sentence around them.
    const only = lines.length === 1 ? lines[0] : null;
    const basis = only
      ? only.count === 1
        ? t.personalBasisOneBox({
            boxLabel: only.box.label,
            priceEur: eur(priceForZone(only.box, input.zone) ?? 0, locale),
          })
        : t.personalBasisManyBoxes({
            numBoxes: only.count,
            boxLabel: only.box.label,
            priceEur: eur(priceForZone(only.box, input.zone) ?? 0, locale),
          })
      : t.personalBasisMixedSizes({
          breakdown: lines.map((l) => `${l.count} × ${l.box.label}`).join(", "),
        });

    const alternativeLabel = only
      ? t.personalAlternativeFromBoxes({
          boxLabel: only.box.label,
          typicalKg: typicalBoxKg(only.box),
          numBoxes: only.count,
          weightKg,
          altEur: eur(alternativeEur, locale),
          perKgEur: eur(PERSONAL_PER_KG_EUR, locale),
        })
      : t.personalAlternativeFromMixedBoxes({
          totalBoxes,
          weightKg,
          altEur: eur(alternativeEur, locale),
          perKgEur: eur(PERSONAL_PER_KG_EUR, locale),
        });

    return {
      shippingEur,
      weightKg,
      dutyEur,
      totalEur: round(shippingEur + dutyEur),
      basis,
      dutyBasis,
      alternativeEur,
      alternativeLabel,
    };
  }

  const weightKg = Math.max(0, input.weightKg || 0);
  const shippingEur = round(weightKg * PERSONAL_PER_KG_EUR);
  const { dutyEur, dutyBasis } = personalDuty(
    weightKg,
    input.categoryId,
    dict,
    locale,
  );

  // The cheapest whole number of boxes that would hold this weight. Always
  // phrased against the smallest box — there's no single "selected size"
  // once boxes mode allows a mix, and the comparison is illustrative
  // either way, not something the price depends on.
  const box = SMALLEST_BOX_SIZE;
  const perBoxKg = typicalBoxKg(box);
  const boxesNeeded = perBoxKg > 0 ? Math.ceil(weightKg / perBoxKg) : 0;
  const alternativeEur =
    boxesNeeded > 0
      ? round(boxesNeeded * (priceForZone(box, input.zone) ?? 0))
      : null;

  return {
    shippingEur,
    weightKg,
    dutyEur,
    totalEur: round(shippingEur + dutyEur),
    basis: t.personalBasisPerKg({
      weightKg,
      perKgEur: eur(PERSONAL_PER_KG_EUR, locale),
    }),
    dutyBasis,
    alternativeEur,
    alternativeLabel:
      alternativeEur === null
        ? ""
        : t.personalAlternativeFromWeight({
            boxesNeeded,
            boxLabel: box.label,
            altEur: eur(alternativeEur, locale),
          }),
  };
}

/* -------------------------------------------------------------------
   BUSINESS CALCULATION
   ------------------------------------------------------------------- */

/* -------------------------------------------------------------------
   DESTINATIONS

   Only Lebanon ships today, because Lebanon is the only corridor we have
   researched customs data for. Adding a destination means adding its duty
   table and deemed-valuation rules — not just another option in a list.
   ------------------------------------------------------------------- */

export interface Destination {
  id: string;
}

/*
 * Flag artwork is deliberately NOT a field here. It used to be a Unicode emoji
 * string, which Chrome on Windows renders as the literal letters "LB". The
 * artwork now lives in `components/Flag.tsx`, keyed by the `id` above.
 *
 * Display name and gateway are deliberately not here either, for the same
 * reason CargoCategory's label/blurb/caveat moved out — each locale's
 * dictionary carries its own `destinations[id]`.
 */

export const DESTINATIONS: Destination[] = [{ id: "LB" }];

/* -------------------------------------------------------------------
   CARGO CATEGORIES

   Lebanese customs charges a different rate per commodity, and — more
   importantly — uses a different *basis* depending on whether the goods are
   used or new:

   - `weight`  used household goods are assessed on a deemed value per kilo,
               so declared value is bypassed entirely.
   - `value`   new goods are assessed on declared value at the category's own
               duty rate, plus VAT and the security fee.

   `band` (0-4) orders the categories by duty rate and drives the ordinal
   colour ramp in the UI — it is a presentation index, not a tax figure.
   ------------------------------------------------------------------- */

export interface CargoCategory {
  id: string;
  basis: "weight" | "value";
  /** Customs duty rate. VAT and the security fee are added on top. */
  duty: number;
}

/**
 * Display strings (label, blurb, caveat) deliberately do NOT live on
 * CargoCategory — this file is the numeric single source of truth, kept
 * 100% language-independent. Each locale's dictionary carries its own
 * `cargoCategories[id]`; look those up instead of reading a field here.
 */

/**
 * Every rate below is sourced — from customs.gov.lb's own commodity tool
 * (read 2026-08-28) or the FIDI Lebanon guide. None are estimated.
 *
 * Categories we know exist but deliberately do NOT list, because we have no
 * rate for them and guessing one on a public page would be inventing customs
 * data: books and dictionaries (HS 49019900), children's illustrated books
 * (49030000), jewellery (71131110 / 71131190), sports equipment (95069900),
 * and recorded media / video games (85234900). Add them once a broker or the
 * customs tariff schedule confirms the rates.
 */
export const CARGO_CATEGORIES: CargoCategory[] = [
  { id: "used-household", basis: "weight", duty: USED_HOUSEHOLD_DUTY_RATE },
  { id: "used-clothing", basis: "value", duty: 0.05 },
  { id: "used-appliances", basis: "value", duty: 0 },
  { id: "computers", basis: "value", duty: 0 },
  { id: "apparel", basis: "value", duty: 0.05 },
  { id: "phones", basis: "value", duty: 0.05 },
  { id: "watches", basis: "value", duty: 0.05 },
  { id: "shoes", basis: "value", duty: 0.1 },
  { id: "bags", basis: "value", duty: 0.1 },
  { id: "appliances-new", basis: "value", duty: 0.15 },
  { id: "perfume", basis: "value", duty: 0.15 },
  { id: "cosmetics", basis: "value", duty: 0.15 },
  { id: "linens", basis: "value", duty: 0.15 },
  { id: "furniture-new", basis: "value", duty: 0.3 },
  { id: "commercial", basis: "value", duty: 0.465 },
];

/**
 * Colour band from the duty rate — computed, not hand-assigned, so a new
 * category can never be given a band that contradicts its own rate.
 * Five buckets to match the five validated ramp steps.
 */
export const bandFor = (duty: number): 0 | 1 | 2 | 3 | 4 =>
  duty === 0 ? 0 : duty <= 0.05 ? 1 : duty <= 0.1 ? 2 : duty <= 0.15 ? 3 : 4;

export const getCategory = (id: string) =>
  CARGO_CATEGORIES.find((c) => c.id === id) ?? CARGO_CATEGORIES[0];

/**
 * Lowest duty rate in the table — computed, not hand-picked, for the same
 * reason as SMALLEST_BOX_SIZE. Both calculators default to this category
 * rather than an arbitrary one, so the first duty figure shown is the
 * floor. Note this is 0% *customs duty* specifically — a value-basis
 * category still carries VAT + the security fee on top (see
 * calculateQuote()), so "0% duty" is not the same as "free" on the
 * business side.
 */
export const LOWEST_DUTY_CATEGORY = CARGO_CATEGORIES.reduce((min, c) =>
  c.duty < min.duty ? c : min,
);

/**
 * Ordinal ramp for the duty bands, light -> dark as the rate climbs. One hue,
 * monotone lightness; validated against the calculator surface (#f2efea).
 */
export const BAND_COLORS = [
  "#6da7ec",
  "#3987e5",
  "#256abf",
  "#184f95",
  "#0d366b",
] as const;

/** Cost-component colours for the breakdown bar. Validated all-pairs. */
export const COST_COLORS = {
  freight: "#2a78d6",
  clearance: "#eb6834",
  duty: "#1baf7a",
} as const;

export type ShipmentKind = "used" | "new";

export interface QuoteInput {
  weightKg: number;
  /** Id from CARGO_CATEGORIES. Its `basis` decides how duty is assessed. */
  categoryId: string;
  /** Only used by value-basis categories — declared value of the goods, EUR. */
  declaredValueEur?: number;
}

export interface QuoteBreakdown {
  chargeableKg: number;
  minimumApplied: boolean;
  freightEur: number;
  clearanceEur: number;
  dutyEur: number;
  /** How the duty figure was arrived at — shown to the user verbatim. */
  dutyBasis: string;
  totalEur: number;
  rangeLowEur: number;
  rangeHighEur: number;
}

export function calculateQuote(
  input: QuoteInput,
  dict: Dictionary,
  locale: Locale,
): QuoteBreakdown {
  const weight = Math.max(0, input.weightKg || 0);
  const chargeableKg = Math.max(weight, MIN_CHARGEABLE_KG);
  const minimumApplied = weight > 0 && weight < MIN_CHARGEABLE_KG;

  const freightEur = chargeableKg * FREIGHT_EUR_PER_KG;
  const clearanceEur = CLEARANCE_FEE_EUR;
  const category = getCategory(input.categoryId);
  const t = dict.pricingSentences;

  let dutyEur: number;
  let dutyBasis: string;

  if (category.basis === "weight") {
    // Weight is the tax base, not declared value.
    const deemedEur = chargeableKg * DEEMED_VALUATION_EUR_PER_KG;
    dutyEur = deemedEur * (category.duty + SECURITY_FEE_RATE);
    dutyBasis = t.businessDutyByWeight({
      deemedEurPerKg: num(DEEMED_VALUATION_EUR_PER_KG, 2, locale),
      chargeableKg,
      dutyPct: pct(category.duty, locale),
      securityFeePct: pct(SECURITY_FEE_RATE, locale),
    });
  } else {
    const value = Math.max(0, input.declaredValueEur || 0);
    dutyEur = value * (category.duty + LEBANON_VAT_RATE + SECURITY_FEE_RATE);
    const categoryLabel = dict.cargoCategories[category.id]?.label ?? category.id;
    dutyBasis = t.businessDutyByValue({
      valueEur: eur(value, locale),
      dutyPct: pct(category.duty, locale),
      vatPct: pct(LEBANON_VAT_RATE, locale),
      securityFeePct: pct(SECURITY_FEE_RATE, locale),
      categoryLabel,
    });
  }

  const totalEur = freightEur + clearanceEur + dutyEur;

  return {
    chargeableKg,
    minimumApplied,
    freightEur: round(freightEur),
    clearanceEur: round(clearanceEur),
    dutyEur: round(dutyEur),
    dutyBasis,
    totalEur: round(totalEur),
    rangeLowEur: Math.round(totalEur * (1 - ESTIMATE_SPREAD)),
    rangeHighEur: Math.round(totalEur * (1 + ESTIMATE_SPREAD)),
  };
}

/* -------------------------------------------------------------------
   CONTACT
   ------------------------------------------------------------------- */

/** Ali's WhatsApp number, already in use for the CallMeBot pipe. */
export const WHATSAPP_NUMBER = "491637256840";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
