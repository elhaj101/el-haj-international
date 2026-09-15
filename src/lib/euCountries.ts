/**
 * The EU's 27 member states, for the personal calculator's "where are you
 * shipping from" country field. A real dropdown, not free text — see
 * PersonalCalculator.tsx — so this list is the whole set of choices, not
 * just a matcher for typed spellings.
 *
 * Display names are looked up per-locale from
 * `dictionary.personalCalculator.euCountryNames[id]`, keyed by the `id`
 * here, the same split every other reference list in this codebase uses
 * (see CARGO_CATEGORIES / DESTINATIONS in pricing.ts) — this file stays
 * 100% language-independent.
 *
 * Only Germany's id is ever read by the pricing model (see
 * deriveShippingZone in pricing.ts) — every other country prices as the
 * same `eu-dhl` zone regardless of which one it is, so this list exists
 * for the dropdown's completeness, not because the other 26 ids drive any
 * calculation.
 */
export interface EuCountry {
  id: string;
}

export const EU_COUNTRIES: EuCountry[] = [
  { id: "AT" },
  { id: "BE" },
  { id: "BG" },
  { id: "HR" },
  { id: "CY" },
  { id: "CZ" },
  { id: "DK" },
  { id: "EE" },
  { id: "FI" },
  { id: "FR" },
  { id: "DE" },
  { id: "GR" },
  { id: "HU" },
  { id: "IE" },
  { id: "IT" },
  { id: "LV" },
  { id: "LT" },
  { id: "LU" },
  { id: "MT" },
  { id: "NL" },
  { id: "PL" },
  { id: "PT" },
  { id: "RO" },
  { id: "SK" },
  { id: "SI" },
  { id: "ES" },
  { id: "SE" },
];

export const GERMANY_COUNTRY_ID = "DE";
