/** Shared number formatting for both calculators. */

export const eur = (n: number) =>
  new Intl.NumberFormat("en-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

/** 26.5% and 46.5% need a decimal; 5% and 15% should not show one. */
export const pct = (n: number) =>
  `${Number.isInteger(n * 100) ? (n * 100).toFixed(0) : (n * 100).toFixed(1)}%`;
