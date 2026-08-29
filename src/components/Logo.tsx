import Image from "next/image";
import { asset } from "@/lib/asset";

/**
 * The brand mark is the exported artwork from the locked Canva design
 * (canva.com/design/DAHTnrq7zdQ) — not a redraw. An earlier version of this
 * file approximated it as hand-authored SVG, which drifted: it drew a line-art
 * container with a crane hook, where the real mark is a solid container with no
 * hook, and it recoloured the subtext to a single amber where the real mark
 * uses red "SHIPPING" and gold "TRADING".
 *
 * Two variants ship. `light` is the same artwork with the neutral ink remapped
 * to white for use over the dark photographic hero; the red and gold are left
 * untouched so the black-red-gold reading survives.
 *
 * Keep these in sync with the Canva file if the logo ever changes — see
 * scratch script `make_logo.py` in the session notes for how they were cut.
 */

/**
 * Artwork is WebP, resized to what the page actually renders. The PNG exports
 * were 1400x314 and 512x377 and were being drawn at 178x40 and 76x56 — roughly
 * 6x more pixels per axis than any screen could show, decoded on every load.
 * The originals stay in the repo as the masters; re-cut from those, not these.
 * 390KB of logo became 69KB with nothing visibly different.
 */
const LOCKUP_RATIO = 1400 / 314;
const ICON_RATIO = 512 / 377;

/** Container mark on its own — favicons, the preloader, the progress rail. */
export function ContainerMark({
  className = "",
  light = false,
  priority = false,
}: {
  className?: string;
  light?: boolean;
  /** Above the fold (the preloader) — otherwise it lazy-loads and may not
      arrive before the overlay has already lifted. */
  priority?: boolean;
  /** Accepted for API compatibility with the old SVG; the artwork is fixed. */
  strokeWidth?: number;
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      <Image
        src={asset(light ? "/logo-icon-light.webp" : "/logo-icon.webp")}
        alt=""
        fill
        priority={priority}
        unoptimized
        sizes="64px"
        className="object-contain"
      />
    </span>
  );
}

/**
 * Full horizontal lockup. `height` drives the size; width follows the
 * artwork's own aspect ratio so the lockup can never be distorted.
 */
export function Wordmark({
  className = "",
  compact = false,
  light = false,
}: {
  className?: string;
  compact?: boolean;
  light?: boolean;
}) {
  const h = compact ? 26 : 40;
  return (
    <span
      className={`relative inline-block align-middle ${className}`}
      style={{ height: h, width: h * LOCKUP_RATIO }}
    >
      <Image
        src={asset(light ? "/logo-lockup-light.webp" : "/logo-lockup.webp")}
        alt="El Haj International — Shipping · Trading"
        fill
        priority
        unoptimized
        sizes="360px"
        className="object-contain object-left"
      />
    </span>
  );
}

/**
 * Nav variant: both artworks stacked and cross-faded, because swapping `src`
 * on scroll makes the mark flash while the new file decodes.
 */
export function WordmarkSwap({
  light,
  compact = true,
}: {
  light: boolean;
  compact?: boolean;
}) {
  const h = compact ? 26 : 40;
  return (
    <span
      className="relative inline-block align-middle"
      style={{ height: h, width: h * LOCKUP_RATIO }}
    >
      {[false, true].map((isLight) => (
        <Image
          key={String(isLight)}
          src={asset(isLight ? "/logo-lockup-light.webp" : "/logo-lockup.webp")}
          alt={isLight ? "" : "El Haj International — Shipping · Trading"}
          aria-hidden={isLight || undefined}
          fill
          priority
          unoptimized
          sizes="360px"
          className={`object-contain object-left transition-opacity duration-300 ${
            light === isLight ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </span>
  );
}

export { ICON_RATIO, LOCKUP_RATIO };
