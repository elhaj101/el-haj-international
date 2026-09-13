import type { Dictionary } from "./dictionary";
import type { Locale } from "./locales";
import en from "./dictionaries/en";
import ar from "./dictionaries/ar";
import de from "./dictionaries/de";

const dictionaries: Record<Locale, Dictionary> = { en, ar, de };

/**
 * Every route is a fully static export — there is no per-request locale
 * negotiation, so this can be a plain synchronous lookup rather than the
 * async `import()`-per-locale pattern the Next.js i18n guide shows (that
 * pattern exists to keep unused-locale dictionaries out of a server's
 * memory across requests; a static build has no such concern, and all
 * three dictionaries here are plain text, small enough that bundling them
 * together costs nothing worth optimising for).
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
