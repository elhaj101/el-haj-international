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
 * Source: FIDI Lebanon guide, April 2022.
 */
export const DEEMED_VALUATION_USD_PER_KG = 3.0;

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


/** USD → EUR. Freight is priced in EUR; Lebanese duty is assessed in USD. */
export const USD_TO_EUR = 0.92;

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

export interface BoxSize {
  id: string;
  label: string;
  /** Outer dimensions in cm — the source of both `dims` and the 3D model. */
  w: number;
  h: number;
  d: number;
  volumeM3: number;
  /** PLACEHOLDER — flat price for this box, whatever it weighs. */
  priceEur: number;
  note?: string;
}

/**
 * `w × d × h` is how the flyer prints them (length, width, height), so
 * height is the third number, not the second. The 3D model reads these
 * fields directly — nothing parses the display string.
 */
export const BOX_SIZES: BoxSize[] = [
  { id: "M", label: "M", w: 40, d: 30, h: 30, volumeM3: 0.036, priceEur: 40 },
  { id: "L", label: "L", w: 60, d: 38, h: 38, volumeM3: 0.0866, priceEur: 60 },
  { id: "XXL", label: "XXL", w: 75, d: 42, h: 41, volumeM3: 0.1291, priceEur: 75 },
];

/** "60 × 38 × 38 cm", built from the real numbers so the two can't drift. */
export const boxDims = (b: BoxSize) => `${b.w} × ${b.d} × ${b.h} cm`;

export const getBoxSize = (id: string) =>
  BOX_SIZES.find((b) => b.id === id) ?? BOX_SIZES[1];

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
   * Which box. Prices the parcel in "boxes" mode; in "perkg" mode it is
   * only the reference size for the "that weight fills about N boxes"
   * comparison, and does not affect the price.
   */
  boxId?: string;
  /** "boxes" mode. */
  numBoxes?: number;
  /** "perkg" mode. */
  weightKg?: number;
  /** Id from CARGO_CATEGORIES — sets the duty rate. */
  categoryId?: string;
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
 * Extrapolation to flag: the deemed-valuation method is documented for
 * used household goods (see DEEMED_VALUATION_USD_PER_KG). Applying it to
 * the other categories' rates is our own simplification for a
 * consumer-facing estimate, not something the FIDI guide states. The UI
 * says so. VAT is deliberately not stacked on here — the deemed-value
 * treatment in the source is duty + security fee.
 */
function personalDuty(weightKg: number, categoryId?: string) {
  const category = getCategory(categoryId ?? "used-household");
  const deemedEur = weightKg * DEEMED_VALUATION_USD_PER_KG * USD_TO_EUR;
  const dutyEur = round(deemedEur * (category.duty + SECURITY_FEE_RATE));

  const dutyBasis =
    category.duty === 0
      ? `${category.label} come in duty free — this is the ` +
        `${(SECURITY_FEE_RATE * 100).toFixed(0)}% security fee only, on a deemed ` +
        `value of USD ${DEEMED_VALUATION_USD_PER_KG.toFixed(2)}/kg for ~${weightKg} kg.`
      : `~${weightKg} kg at a deemed value of USD ` +
        `${DEEMED_VALUATION_USD_PER_KG.toFixed(2)}/kg, charged at ` +
        `${(category.duty * 100).toFixed(1).replace(/\.0$/, "")}% for ` +
        `${category.label.toLowerCase()} plus a ` +
        `${(SECURITY_FEE_RATE * 100).toFixed(0)}% security fee.`;

  return { dutyEur, dutyBasis };
}

export function calculatePersonalQuote(
  input: PersonalQuoteInput,
): PersonalQuote {
  if (input.mode === "boxes") {
    const box = getBoxSize(input.boxId ?? "L");
    const numBoxes = Math.max(1, Math.round(input.numBoxes || 1));
    const shippingEur = round(numBoxes * box.priceEur);

    // Weight is implied from the box size, at a typical fill.
    const weightKg = typicalBoxKg(box) * numBoxes;
    const { dutyEur, dutyBasis } = personalDuty(weightKg, input.categoryId);

    // What the same parcel would cost per kilo.
    const alternativeEur = round(weightKg * PERSONAL_PER_KG_EUR);

    return {
      shippingEur,
      weightKg,
      dutyEur,
      totalEur: round(shippingEur + dutyEur),
      basis:
        (numBoxes === 1
          ? `One ${box.label} box at a flat €${box.priceEur}.`
          : `${numBoxes} × ${box.label} boxes at a flat €${box.priceEur} each.`) +
        ` The price is the same whatever it weighs.`,
      dutyBasis,
      alternativeEur,
      alternativeLabel:
        `A normally packed ${box.label} box holds about ${typicalBoxKg(box)} kg, ` +
        `so ${numBoxes === 1 ? "this" : "these"} would be roughly ${weightKg} kg ` +
        `— €${alternativeEur.toFixed(0)} at €${PERSONAL_PER_KG_EUR.toFixed(2)}/kg.`,
    };
  }

  const weightKg = Math.max(0, input.weightKg || 0);
  const shippingEur = round(weightKg * PERSONAL_PER_KG_EUR);
  const { dutyEur, dutyBasis } = personalDuty(weightKg, input.categoryId);

  // The cheapest whole number of boxes that would hold this weight.
  const box = getBoxSize(input.boxId ?? "L");
  const perBoxKg = typicalBoxKg(box);
  const boxesNeeded = perBoxKg > 0 ? Math.ceil(weightKg / perBoxKg) : 0;
  const alternativeEur = boxesNeeded > 0 ? round(boxesNeeded * box.priceEur) : null;

  return {
    shippingEur,
    weightKg,
    dutyEur,
    totalEur: round(shippingEur + dutyEur),
    basis: `${weightKg} kg at a flat €${PERSONAL_PER_KG_EUR.toFixed(2)} per kilo.`,
    dutyBasis,
    alternativeEur,
    alternativeLabel:
      alternativeEur === null
        ? ""
        : `That weight normally fills about ${boxesNeeded} ${box.label} ` +
          `box${boxesNeeded === 1 ? "" : "es"} — €${alternativeEur.toFixed(0)} at the flat box price.`,
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
  name: string;
  /** Shown under the big country name. */
  gateway: string;
}

/*
 * Flag artwork is deliberately NOT a field here. It used to be a Unicode emoji
 * string, which Chrome on Windows renders as the literal letters "LB". The
 * artwork now lives in `components/Flag.tsx`, keyed by the `id` above.
 */

export const DESTINATIONS: Destination[] = [
  {
    id: "LB",
    name: "Lebanon",
    gateway: "Port of Beirut",
  },
];

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
  label: string;
  blurb: string;
  basis: "weight" | "value";
  /** Customs duty rate. VAT and the security fee are added on top. */
  duty: number;
  /** Caveat surfaced when this category is selected, if any. */
  caveat?: string;
}

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
  {
    id: "used-household",
    label: "Used household goods",
    blurb: "Furniture, kitchenware, personal effects",
    basis: "weight",
    duty: USED_HOUSEHOLD_DUTY_RATE,
    caveat:
      "Carries a 3-year no-resale undertaking in Lebanon. Not suitable for anyone restocking a shop.",
  },
  {
    id: "used-clothing",
    label: "Used clothing",
    blurb: "Worn garments and textiles (HS 6309.00)",
    basis: "value",
    duty: 0.05,
    caveat:
      "This line carries an \"EC\" government control we could not fully identify — confirm with a broker before shipping at volume.",
  },
  {
    id: "used-appliances",
    label: "Appliances (used)",
    blurb: "Duty free with the correct documents",
    basis: "value",
    duty: 0,
    caveat:
      "FIDI's own prohibited-items list contradicts this row for battery and domestic appliances. Needs a direct answer from a broker.",
  },
  {
    id: "computers",
    label: "Computers & laptops",
    blurb: "Duty free — VAT and security fee only",
    basis: "value",
    duty: 0,
  },
  {
    id: "apparel",
    label: "Clothing & apparel (new)",
    blurb: "New garments",
    basis: "value",
    duty: 0.05,
  },
  {
    id: "phones",
    label: "Mobile phones",
    blurb: "Handsets and tablets",
    basis: "value",
    duty: 0.05,
  },
  {
    id: "watches",
    label: "Watches",
    blurb: "Wristwatches and clocks",
    basis: "value",
    duty: 0.05,
  },
  {
    id: "shoes",
    label: "Shoes",
    blurb: "Footwear, new",
    basis: "value",
    duty: 0.1,
    caveat:
      "A floor of 7,500 LL per pair applies, which can exceed the percentage duty on cheap footwear.",
  },
  {
    id: "bags",
    label: "Handbags & luggage",
    blurb: "Bags and cases",
    basis: "value",
    duty: 0.1,
    caveat: "A floor of 4,500 LL per piece applies.",
  },
  {
    id: "appliances-new",
    label: "Appliances (new)",
    blurb: "White goods and small appliances",
    basis: "value",
    duty: 0.15,
  },
  {
    id: "perfume",
    label: "Perfume",
    blurb: "Perfumes and toilet waters",
    basis: "value",
    duty: 0.15,
  },
  {
    id: "cosmetics",
    label: "Cosmetics & makeup",
    blurb: "A common diaspora request from German drugstores",
    basis: "value",
    duty: 0.15,
  },
  {
    id: "linens",
    label: "Linens & towels",
    blurb: "Bedsheets, towels, household textiles",
    basis: "value",
    duty: 0.15,
    caveat: "A floor of 3,375 LL applies.",
  },
  {
    id: "furniture-new",
    label: "Furniture (new)",
    blurb: "New furniture and household articles",
    basis: "value",
    duty: 0.3,
  },
  {
    id: "commercial",
    label: "Commercial stock",
    blurb: "Goods imported to be resold",
    basis: "value",
    duty: 0.465,
    caveat:
      "Declared commercially. Requires a legalised commercial invoice and a certificate of origin, which personal-effects shipments do not.",
  },
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

export function calculateQuote(input: QuoteInput): QuoteBreakdown {
  const weight = Math.max(0, input.weightKg || 0);
  const chargeableKg = Math.max(weight, MIN_CHARGEABLE_KG);
  const minimumApplied = weight > 0 && weight < MIN_CHARGEABLE_KG;

  const freightEur = chargeableKg * FREIGHT_EUR_PER_KG;
  const clearanceEur = CLEARANCE_FEE_EUR;
  const category = getCategory(input.categoryId);

  let dutyEur: number;
  let dutyBasis: string;

  if (category.basis === "weight") {
    // Weight is the tax base, not declared value.
    const deemedEur =
      chargeableKg * DEEMED_VALUATION_USD_PER_KG * USD_TO_EUR;
    dutyEur = deemedEur * (category.duty + SECURITY_FEE_RATE);
    dutyBasis =
      `Assessed on a deemed value of USD ${DEEMED_VALUATION_USD_PER_KG.toFixed(2)}/kg ` +
      `(${chargeableKg} kg), at ${(category.duty * 100).toFixed(1)}% duty ` +
      `+ ${(SECURITY_FEE_RATE * 100).toFixed(0)}% security fee. What the goods are ` +
      `actually worth does not change this figure.`;
  } else {
    const value = Math.max(0, input.declaredValueEur || 0);
    dutyEur = value * (category.duty + LEBANON_VAT_RATE + SECURITY_FEE_RATE);
    dutyBasis =
      `Assessed on declared value (€${value.toFixed(0)}) at ` +
      `${(category.duty * 100).toFixed(0)}% duty + ` +
      `${(LEBANON_VAT_RATE * 100).toFixed(0)}% VAT + ` +
      `${(SECURITY_FEE_RATE * 100).toFixed(0)}% security fee for ` +
      `${category.label.toLowerCase()}.`;
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
