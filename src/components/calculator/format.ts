/** Shared, locale-aware number formatting for both calculators. */

import { NUMBER_LOCALE, type Locale } from "@/lib/i18n/locales";

export const eur = (n: number, locale: Locale = "en") =>
  new Intl.NumberFormat(NUMBER_LOCALE[locale], {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

/**
 * 26.5% and 46.5% need a decimal; 5% and 15% should not show one — same
 * rule as the original hand-rolled version, now via Intl.NumberFormat so
 * the decimal separator and spacing follow each locale's own convention
 * (German inserts a space before the sign and uses a comma decimal: "26,5 %").
 */
export const pct = (n: number, locale: Locale = "en") =>
  new Intl.NumberFormat(NUMBER_LOCALE[locale], {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(n);

/**
 * A plain number with a fixed decimal count, decimal separator following
 * the locale (German: comma). Used for figures that carry a currency name
 * as a literal word in a sentence template (e.g. "USD 3.00/kg") rather than
 * a symbol from eur() — the word's position relative to the number differs
 * per language, so it lives in each locale's own sentence template, not
 * here.
 */
export const num = (n: number, decimals: number, locale: Locale = "en") =>
  new Intl.NumberFormat(NUMBER_LOCALE[locale], {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
