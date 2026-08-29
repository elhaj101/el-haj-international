"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { WordmarkSwap } from "./Logo";

const LINKS = [
  { label: "How it works", href: "#how" },
  { label: "What we move", href: "#cargo" },
  { label: "Calculator", href: "/calculator" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const lenis = useLenis();

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
          <Link href="/" aria-label="El Haj International — home">
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
            <Link
              href="/signup"
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 hover:border-accent hover:text-accent ${
                solid ? "border-fg/15" : "border-white/40"
              }`}
            >
              Sign up
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}
