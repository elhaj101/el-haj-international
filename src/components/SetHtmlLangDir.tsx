"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n/locales";

/**
 * Corrects the TRUE root layout's static `<html lang="en">` to the real
 * locale, and sets `dir`, once this route mounts. Needed because
 * `app/layout.tsx` (the only layout allowed to declare `<html>`) sits
 * *above* `app/[locale]/layout.tsx` in the tree and has no way to know
 * which locale matched — see the comment at the top of app/layout.tsx for
 * why, and why that's an acceptable, disclosed gap for pre-hydration/no-JS
 * visitors on a site that already leans on JS for every scroll reveal and
 * carries `robots: {index:false}`.
 *
 * Renders nothing; the effect is the entire component.
 */
export default function SetHtmlLangDir({
  locale,
  dir,
}: {
  locale: Locale;
  dir: "ltr" | "rtl";
}) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  return null;
}
