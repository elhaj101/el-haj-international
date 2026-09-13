"use client";

import { useLayoutEffect } from "react";
import InlineScript from "@/components/InlineScript";
import type { Locale } from "@/lib/i18n/locales";

/**
 * Sets `<html lang>`/`<html dir>` to the route's real locale, correcting the
 * TRUE root layout's static `lang="en"` (see app/layout.tsx for why that
 * layout can't know the locale).
 *
 * This has to happen BEFORE the first paint, not after hydration, and the
 * difference is not cosmetic. Measured on the built site at /ar/, with the
 * previous `useEffect` version:
 *
 *     0.0ms  dir=(empty)  document-start
 *    15.9ms  dir=(empty)  DOMContentLoaded        font="Barlow Condensed"
 *    30.0ms  dir=(empty)  document.fonts.ready    font="Barlow Condensed"
 *    62.7ms  dir=(empty)  window load             font="Barlow Condensed"
 *   115.9ms  dir=rtl      <- the effect finally ran
 *
 * Everything that matters keys off `dir`: globals.css swaps the font stack
 * to Cairo on `html[dir="rtl"]`, resets the letter-spacing that breaks
 * Arabic ligatures, loosens `.display` leading and shrinks `.hero-h1`; every
 * logical Tailwind utility (`ps-`, `me-`, `start-0`, `text-start`) and every
 * `rtl:` variant resolves through `:dir()`/`[dir]`. For the first ~116ms none
 * of that applied: an Arabic page laid out left-to-right in Barlow
 * Condensed, a font with no Arabic glyphs at all.
 *
 * Worse than the flash, it poisoned measurements taken in that window.
 * Hero.tsx gates its whole timeline on `document.fonts.ready` — which
 * resolved at 30ms having never requested Cairo, because nothing on the page
 * was using it yet. The hero then built its line-mask reveal against Latin
 * metrics, and Cairo (taller glyphs, looser leading) swapped in underneath
 * it afterwards.
 *
 * Three mechanisms, because no single one covers every way this route is
 * entered:
 *
 *  1. The inline script — a hard navigation (direct visit, refresh, the
 *     deployed link). Runs during HTML parsing, before the first paint.
 *     `locale` and `dir` are literals here, known at build time, so it does
 *     no URL parsing and cannot disagree with the route.
 *  2. Nav's language toggle sets both attributes in its click handler, so a
 *     soft navigation between locales is correct before React renders the
 *     new route. Needed because a script inserted by a DOM update never
 *     executes, and because React runs child layout effects BEFORE a
 *     parent's — every GSAP effect in the tree below would otherwise run
 *     ahead of this component's.
 *  3. This layout effect — the backstop for everything else (browser
 *     back/forward between locales, and React's dev-mode Strict Mode
 *     remount, which resets `<html>` to just the attributes its own JSX
 *     declares and so wipes what the script set). `useLayoutEffect`, not
 *     `useEffect`: it at least runs before paint rather than after it.
 *
 * All three write the same two literal values, so they can't drift apart.
 */
export default function SetHtmlLangDir({
  locale,
  dir,
}: {
  locale: Locale;
  dir: "ltr" | "rtl";
}) {
  useLayoutEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  return (
    <InlineScript
      html={`(function(){try{var e=document.documentElement;e.lang=${JSON.stringify(
        locale,
      )};e.dir=${JSON.stringify(dir)}}catch(_){}})()`}
    />
  );
}
