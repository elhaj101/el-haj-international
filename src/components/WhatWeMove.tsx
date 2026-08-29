"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Kept to categories, not rules. The used-vs-new distinction and packing
 * requirements are private-shipping specifics that would leave a business
 * visitor reading rules that don't apply to them — those belong in the
 * sign-up flow, not on the marketing page.
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
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".cargo-head", {
          y: 30,
          opacity: 0,
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        });
        // Batched so a long grid stays cheap to animate.
        ScrollTrigger.batch(".cargo-card", {
          start: "top 90%",
          onEnter: (batch) =>
            gsap.to(batch, {
              y: 0,
              opacity: 1,
              stagger: 0.07,
              duration: 0.8,
              overwrite: true,
            }),
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      id="cargo"
      ref={root}
      className="px-6 py-28 lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="cargo-head">
          <p className="eyebrow">What we move</p>
          <h2 className="display mt-5 max-w-[14ch] text-[clamp(2rem,5.5vw,4.25rem)]">
            If it fits in a container, it travels
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {CARGO.map((c) => (
            <div
              key={c.label}
              data-reveal
              className="cargo-card group translate-y-8 bg-bg p-8 transition-colors duration-200 hover:bg-bg-alt lg:p-10"
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
