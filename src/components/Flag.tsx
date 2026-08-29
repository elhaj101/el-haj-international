import Image from "next/image";
import { asset } from "@/lib/asset";

/**
 * Destination flag, as artwork rather than a Unicode emoji.
 *
 * The previous version rendered `🇱🇧` inside a circular badge. Two problems,
 * one of them a correctness bug:
 *
 * 1. Emoji flags are a *font* feature. Chrome on Windows ships no flag glyphs,
 *    so the regional-indicator pair falls back to the literal letters "LB".
 *    The headline of this page silently degraded to two letters for a large
 *    share of visitors — and never on the Macs and iPhones we check it on.
 * 2. A circle crops a 3:2 flag. Lebanon's cedar sits dead centre in the white
 *    band and the round mask cut its lower branches off.
 *
 * So: the real 3:2 flag, rounded and edged like a physical card. Artwork is
 * Wikimedia Commons' `Flag_of_Lebanon.svg` verbatim (2880x1920, red #d31624,
 * green #008c3e) — the cedar is the part nobody draws correctly freehand, so it
 * is lifted, not redrawn. Same rule as the logo in `Logo.tsx`.
 *
 * Licensing: public domain twice over — copyright expired in Lebanon under Law
 * No. 75 of 1999, and public domain in the US via the CIA World Factbook.
 * Lebanese law still requires the author be credited, so the designer
 * (Henri Pharaon, 1943) is named in a comment at the top of the SVG. Keep that
 * comment if the file is ever re-exported or minified.
 *
 * Adding a destination means adding its artwork to `FLAGS` under the same id
 * as `Destination.id`. A missing entry renders nothing rather than falling
 * back to something wrong.
 */
const FLAGS: Record<string, string> = {
  LB: "/flag-lb.svg",
};

export default function Flag({
  id,
  name,
  className = "",
  priority = false,
}: {
  /** Matches `Destination.id`. */
  id: string;
  /** Country name — used for the alt text. */
  name: string;
  /** Sizing lives with the caller; width and 3:2 aspect are set here. */
  className?: string;
  /** Set on the destination banner: it is the page headline, and the default
      lazy load makes it pop in a beat after the country name is already
      there. Same reasoning as `priority` on the preloader mark. */
  priority?: boolean;
}) {
  const src = FLAGS[id];
  if (!src) return null;

  return (
    /* The hairline matters more than it looks: half this flag is white on a
       warm off-white page, so without an edge it reads as a torn shape rather
       than a flag. Inset ring, so the rounded corners stay clean. */
    <span
      /* Radius in percent, not pixels, and split x/y to stay circular on a 3:2
         box — so the corner reads identically whether the caller renders this
         at 72px in a picker card or 112px in the page headline. */
      style={{ borderRadius: "5% / 7.5%" }}
      className={`relative block aspect-[3/2] shrink-0 overflow-hidden shadow-[0_1px_2px_rgba(17,17,17,0.14),0_8px_20px_-10px_rgba(17,17,17,0.35)] ${className}`}
    >
      <Image
        src={asset(src)}
        alt={`Flag of ${name}`}
        fill
        unoptimized
        priority={priority}
        sizes="128px"
        className="object-cover"
      />
      <span
        aria-hidden
        style={{ borderRadius: "inherit" }}
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-fg/15"
      />
    </span>
  );
}
