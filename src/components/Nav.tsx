"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { Wordmark } from "./Logo";

const LINKS = [
  { label: "How it works", href: "#how" },
  { label: "What we move", href: "#cargo" },
  { label: "Calculator", href: "/calculator" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // In-page anchors must go through Lenis or they hard-jump past the smooth scroll.
  const jump = (e: React.MouseEvent, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    lenis?.scrollTo(href, { offset: -80 });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-bg/85 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" aria-label="El Haj International — home">
          <Wordmark compact />
        </Link>

        <div className="flex items-center gap-6 lg:gap-8">
          <ul className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={(e) => jump(e, l.href)}
                  className="text-sm text-muted transition-colors duration-200 hover:text-fg"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/signup"
            className="rounded-full border border-fg/15 px-4 py-2 text-sm font-medium transition-all duration-200 hover:border-accent hover:text-accent"
          >
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
}
