import type { Metadata } from "next";
import { Barlow_Condensed, Cairo, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

/**
 * The TRUE root layout — the only place `<html>`/`<body>` can be declared,
 * since `src/app/[locale]/layout.tsx` is a *nested* layout and Next forbids
 * a nested layout from redeclaring them. It shares this shell with two very
 * different kinds of route:
 *
 *   - `app/[locale]/**`      — the real, localized site.
 *   - `app/page.tsx` and its `calculator`/`signup` siblings — thin static
 *     redirects to `/en/...` (see those files), for anyone who reaches an
 *     unprefixed URL (an old bookmark, a link typed by hand). This site
 *     wasn't previously localized, so no *existing* deployed link needs
 *     preserving — the redirect exists for robustness going forward, not
 *     because something depends on it today.
 *
 * Because this layout is shared by both, it can't know the visitor's locale
 * at build time — `<html lang>` and `dir` are corrected client-side, per
 * locale, by a tiny effect in `[locale]/layout.tsx` once the real route
 * mounts. The static HTML briefly says `lang="en"` even on `/ar/...` until
 * that runs; every other GSAP-driven reveal on this site already depends on
 * JS the same way (see globals.css's `.js-ready` pattern), and the site
 * carries `robots: {index:false}` regardless, so this isn't a new class of
 * gap. `<title>`/`<meta description>` don't have this problem — Next's
 * Metadata API resolves those per-locale at build time via `[locale]/
 * layout.tsx`'s own `generateMetadata`, correct from the first byte.
 *
 * Fonts: Barlow Condensed (the display face, matching the logo's condensed
 * wordmark) and Inter ship Latin glyphs only — no Arabic coverage at all.
 * Cairo is loaded alongside them for Arabic pages; both its display and body
 * roles are one family here (weight difference does the same job Barlow/
 * Inter split across two families), since it's the closest weight range
 * (200-1000) to Barlow's own heavy 600-800 usage among Arabic-supporting
 * Google Fonts. Which pair of variables actually renders per locale is
 * decided in globals.css via `html[dir="rtl"]` selectors, not here — every
 * variable from both families is simply made available as a CSS custom
 * property; `[locale]/layout.tsx` doesn't need to choose between them.
 */
const displayLatin = Barlow_Condensed({
  variable: "--font-display-latin",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const bodyLatin = Inter({
  variable: "--font-body-latin",
  subsets: ["latin"],
});

const arabic = Cairo({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "El Haj International — Shipping & Trading",
  description:
    "Shipping and trading between Europe and the Middle East. Consolidated container freight and sourcing.",
  // The business is not registered or licensed yet and the site carries no
  // Impressum. Keep it out of search results until both are sorted.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // `lang`/`dir` are rewritten during HTML parsing by the inline script in
    // SetHtmlLangDir, before React ever sees this element — so the `lang="en"`
    // below is a build-time placeholder that is already stale by hydration.
    // suppressHydrationWarning tells React to keep the DOM's value instead of
    // treating the difference as a hydration error (which it recovers from by
    // client-rendering the boundary, undoing the correction).
    <html
      lang="en"
      suppressHydrationWarning
      className={`${displayLatin.variable} ${bodyLatin.variable} ${arabic.variable} antialiased`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
