"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/**
 * Kept to categories, not rules. The used-vs-new distinction and packing
 * requirements are private-shipping specifics that would leave a business
 * visitor reading rules that don't apply to them — those belong in the sign-up
 * flow, not on the marketing page.
 */
const CARGO = [
  { label: "Household goods", note: "Furniture, kitchenware, linens" },
  { label: "Clothing & textiles", note: "New and used, packed by item" },
  { label: "Electronics", note: "Phones, laptops, small devices" },
  { label: "Appliances", note: "White goods and small appliances" },
  { label: "Foodstuffs", note: "Shelf-stable, dated goods" },
  { label: "Commercial stock", note: "Business cargo and sourcing" },
];

export default function WhatWeMove() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger, SplitText);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".cargo-card", { opacity: 1, y: 0, clearProps: "transform" });
        return;
      }

      document.fonts.ready.then(() => {
        const split = new SplitText(".cargo-h2", {
          type: "lines",
          linesClass: "line",
          mask: "lines",
        });
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: root.current, start: "top 78%" },
        });

        // Rows sweep in from alternating sides rather than all fading up the
        // same way — cheap variety that stops the grid feeling templated.
        gsap.utils.toArray<HTMLElement>(".cargo-card").forEach((card, i) => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 92%" },
          });
          gsap.set(card, { x: i % 2 === 0 ? -40 : 40, y: 30 });
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="cargo" ref={root} className="px-6 py-24 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1400px]">
        <p className="eyebrow">What we move</p>
        <h2 className="cargo-h2 display mt-5 max-w-[14ch] text-[clamp(2.1rem,7vw,4.25rem)]">
          If it fits in a container, it travels
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {CARGO.map((c) => (
            <div
              key={c.label}
              data-reveal
              className="cargo-card group bg-bg p-8 transition-colors duration-200 hover:bg-bg-alt lg:p-10"
            >
              <h3 className="display text-2xl transition-colors duration-200 group-hover:text-accent">
                {c.label}
              </h3>
              <p className="mt-3 text-sm text-muted">{c.note}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-[60ch] text-sm text-muted">
          Restrictions apply to some categories, and customs treats new and used
          goods differently. We tell you which applies to your shipment before
          you commit to anything.
        </p>
      </div>
    </section>
  );
}
