"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { WordmarkSwap } from "./Logo";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { LOCALES, LOCALE_NAMES, dirFor, type Locale } from "@/lib/i18n/locales";

export default function Nav({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [solid, setSolid] = useState(false);
  const lenis = useLenis();
  const pathname = usePathname();

  const LINKS = [
    { label: dict.nav.howItWorks, href: "#how" },
    { label: dict.nav.pricing, href: "#pricing" },
    { label: dict.nav.calculator, href: `/${locale}/calculator` },
  ];

  // The hero is a full-bleed photograph, so the bar starts light-on-dark and
  // inverts once the page scrolls onto the light background beneath it.
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jump = (e: React.MouseEvent, href: string) => {
    if (!href.startsWith("#")) return;
    // Only take over the click if Lenis is actually available. Calling
    // preventDefault() first and *then* finding no Lenis would leave the link
    // doing nothing at all.
    if (!lenis) return;
    e.preventDefault();
    lenis.scrollTo(href, { offset: -70 });
  };

  // Swaps the *current* route to the same route under a different locale
  // prefix — e.g. /ar/calculator/ while on /en/calculator/ switches to
  // /de/calculator/, not back to the German homepage. `pathname` from
  // next/navigation already excludes basePath, so no manual prefixing is
  // needed here (Next's own <Link> adds basePath when rendering the href).
  const pathForLocale = (target: Locale) => {
    const segments = (pathname ?? "/").split("/").filter(Boolean);
    if (segments[0] && (LOCALES as readonly string[]).includes(segments[0])) {
      segments[0] = target;
    } else {
      segments.unshift(target);
    }
    return "/" + segments.join("/");
  };

  return (
    <>
      {/* Dark scrim, kept separate from the header's own (compact) box so it
          can fade out over real distance instead of the header's own ~70px
          height — that short a run made the gradient's end read as a hard
          edge cut against the video. Taller, darker, more stops, no border. */}
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-x-0 top-0 z-40 h-56 bg-gradient-to-b from-black/70 via-black/35 via-40% to-transparent transition-opacity duration-500 lg:h-72 ${
          solid ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* No backdrop-blur here, deliberately. A fixed, full-width blur is
          recomposited on every scrolled frame — one of the most expensive
          things a scrolling page can ask a phone GPU for — and it sat behind
          an almost-opaque background, so it bought close to nothing visually.
          Traded for bg-bg/95: same look, none of the per-frame cost. */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          solid
            ? "border-b border-line bg-bg/95 text-fg"
            : "text-white"
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10">
          <Link href={`/${locale}`} aria-label="El Haj International — home">
            <WordmarkSwap light={!solid} />
          </Link>

          <div className="flex items-center gap-5 lg:gap-8">
            <ul className="hidden items-center gap-7 md:flex">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={(e) => jump(e, l.href)}
                    className={`text-sm transition-opacity duration-200 hover:opacity-60 ${
                      solid ? "text-muted" : "text-white/80"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <LanguageToggle
              locale={locale}
              pathForLocale={pathForLocale}
              solid={solid}
              label={dict.nav.languageSwitcher}
            />

            <Link
              href={`/${locale}/signup`}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 hover:border-accent hover:text-accent ${
                solid ? "border-fg/15" : "border-white/40"
              }`}
            >
              {dict.nav.signUp}
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}

/** Short button label per locale — the dropdown itself spells each language
    out in full (via LOCALE_NAMES), so the closed button only needs enough
    to identify the current one at a glance. */
const LOCALE_CODES: Record<Locale, string> = { en: "EN", ar: "AR", de: "DE" };

/**
 * One button, not three standing links — a dropdown menu that opens on
 * click and closes on an outside click, Escape, or picking a language.
 */
function LanguageToggle({
  locale,
  pathForLocale,
  solid,
  label,
}: {
  locale: Locale;
  pathForLocale: (target: Locale) => string;
  solid: boolean;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // The menu hangs from whichever edge is this button's own "start" —
  // the near edge in a left-to-right nav, the far one once the whole bar
  // mirrors under RTL — so it never spills toward the middle of the header.
  const menuSide = dirFor(locale) === "rtl" ? "end-0" : "start-0";

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
          solid
            ? "border-fg/15 text-muted hover:border-fg/30 hover:text-fg"
            : "border-white/40 text-white/80 hover:border-white hover:text-white"
        }`}
      >
        <GlobeIcon className="h-4 w-4" />
        {LOCALE_CODES[locale]}
        <ChevronIcon className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          aria-label={label}
          className={`absolute top-full ${menuSide} z-10 mt-2 min-w-[9rem] overflow-hidden rounded-2xl border border-line bg-bg py-1.5 text-fg shadow-lg`}
        >
          {/* Plain links, not an ARIA `menu`/`menuitem` widget — that role
              implies arrow-key navigation between items, Home/End, and a
              roving tabindex, none of which this implements. Tab already
              moves through these in order and Enter/Space activates them,
              which is real, correct keyboard support; claiming the `menu`
              role without the behaviour it promises would be worse than not
              claiming it. */}
          {LOCALES.map((l) =>
            l === locale ? (
              <span
                key={l}
                aria-current="true"
                className="block px-4 py-2 text-sm font-semibold text-accent"
              >
                {LOCALE_NAMES[l]}
              </span>
            ) : (
              <Link
                key={l}
                href={pathForLocale(l)}
                hrefLang={l}
                onClick={() => setOpen(false)}
                className="block px-4 py-2 text-sm text-fg transition-colors duration-150 hover:bg-bg-alt"
              >
                {LOCALE_NAMES[l]}
              </Link>
            ),
          )}
        </div>
      )}
    </div>
  );
}

function GlobeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="10" cy="10" rx="3.3" ry="7.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.7 10h14.6M3.6 6h12.8M3.6 14h12.8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 8" fill="none" aria-hidden="true" className={className}>
      <path
        d="M1.5 1.5l4.5 4.5 4.5-4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
