/**
 * The three supported locales. English stays the numeric/URL fallback
 * everywhere a value is needed but a locale hasn't been resolved yet.
 *
 * This site is a static export (`output: "export"` in next.config.ts), so
 * Next's built-in `i18n` config doesn't apply — it requires a Node server
 * for locale negotiation/redirects, which a static export doesn't have (see
 * node_modules/next/dist/docs/01-app/02-guides/static-exports.md, "Redirects"
 * under Unsupported Features). Locales are instead real, separate routes
 * under `app/[locale]/`, each fully pre-rendered at build time — no runtime
 * language negotiation happens at all.
 */
export const LOCALES = ["en", "ar", "de"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Right-to-left locales. Currently just Arabic. */
const RTL_LOCALES: readonly Locale[] = ["ar"];

export function dirFor(locale: Locale): "rtl" | "ltr" {
  return RTL_LOCALES.includes(locale) ? "rtl" : "ltr";
}

/**
 * Directional arrow glyph. Every "→" in the English copy that indicates
 * forward motion through a flow (start an estimate, open WhatsApp, continue
 * a step) flips to "←" in Arabic, since forward is visually leftward in RTL.
 */
export function arrowFor(locale: Locale): "→" | "←" {
  return dirFor(locale) === "rtl" ? "←" : "→";
}

/**
 * Sign multiplier for hand-written motion along the inline axis: +1 where
 * "forward" means rightward (LTR), -1 where it means leftward (RTL).
 *
 * CSS solves this for layout — logical properties (`ps-`, `me-`, `start-0`,
 * `text-start`) and Tailwind's `rtl:` variant both mirror themselves off the
 * document's direction. GSAP does not. It writes `transform: translate(...)`
 * in raw pixels or percentages, and those axes are physical: `x: -800` moves
 * an element 800px toward the left of the *screen* no matter which way the
 * document reads. So every scroll-jacked motion on this site — HowItWorks'
 * horizontal step gallery, Statement's craned container, the Marquee strip,
 * the hero flag's unfurl origin — had a left-to-right direction baked into
 * its numbers, and under RTL each one ran backwards: the gallery drove its
 * panels further off-screen instead of revealing them, and the marquee slid
 * away from its own content leaving a blank strip.
 *
 * Multiplying the inline-axis values (x, xPercent, and the rotations that
 * read as "leaning into the direction of travel") by this keeps one set of
 * hand-tuned magnitudes and flips only their direction — rather than
 * duplicating each timeline per direction, which would be two things to keep
 * in step every time the motion is retuned.
 *
 * Cross-axis values (y, yPercent, scale, opacity) are NOT multiplied: RTL
 * mirrors the horizontal axis only, and negating vertical motion would have
 * the container craned in from the wrong height.
 */
export function motionSignFor(locale: Locale): 1 | -1 {
  return dirFor(locale) === "rtl" ? -1 : 1;
}

/** The reverse of arrowFor — for a "Back" control, which points the
    opposite way to forward motion in either direction. */
export function backArrowFor(locale: Locale): "→" | "←" {
  return dirFor(locale) === "rtl" ? "→" : "←";
}

/** Human-readable name of each locale, in its OWN language — used by the
    language toggle, which lists languages the way a reader of each script
    would recognise them, not translated into the current page's language. */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
  de: "Deutsch",
};

/**
 * BCP-47 tag used only for `Intl.NumberFormat` (currency/percentage), not
 * for `<html lang>` — the plain locale code is correct for that.
 *
 * Both verified empirically rather than assumed, since `Intl.NumberFormat`
 * behaviour depends on the engine's ICU data:
 *
 * - `ar-LB` renders Eastern Arabic-Indic numerals (١٬٢٣٤), which is not how
 *   prices are actually written in Lebanon — commercial pricing there uses
 *   Western digits. Plain `ar` happens to default to Western digits on
 *   Node's bundled ICU, but that's exactly the kind of engine-dependent
 *   default not worth relying on; the `-u-nu-latn` extension forces it
 *   explicitly everywhere.
 * - `en-DE` (the tag format.ts already used, for its "€1,234" — symbol
 *   first, comma thousands) turns out to carry the DE region's decimal-comma
 *   convention into *percentages* too: 26.5% would render as "26,5 %". Same
 *   currency output as `en-US`, without that leak, so `en-US` is used here.
 */
export const NUMBER_LOCALE: Record<Locale, string> = {
  en: "en-US",
  ar: "ar-u-nu-latn",
  de: "de-DE",
};
