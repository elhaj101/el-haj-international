"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BASE_PATH } from "@/lib/asset";
import { DEFAULT_LOCALE } from "@/lib/i18n/locales";

/**
 * Static export can't use next/navigation's `redirect()` — "Redirects" is
 * explicitly listed under Unsupported Features for `output: "export"` (see
 * node_modules/next/dist/docs/01-app/02-guides/static-exports.md). This
 * hand-builds the same job two ways at once:
 *
 * - `router.replace()` fires on mount for anyone with JS, instantly.
 * - The `<meta httpEquiv="refresh">` below is plain JSX, not something
 *   Next's Metadata API produces — React 19 hoists a `<title>`/`<meta>`/
 *   `<link>` rendered anywhere in the tree (including a Client Component
 *   like this one) into the real `<head>`. Client Components are still
 *   prerendered to static HTML during `next build` even in a static export
 *   (see that same doc, "Client Components" under Supported Features), so
 *   this tag reaches the actual output file and works with JS off too —
 *   the message and link below are its visible fallback for that instant
 *   before the refresh fires, not the primary mechanism.
 *
 * `router.replace()` is basePath-aware automatically (it's Next's own
 * router); the meta tag and the plain fallback link are raw HTML, so they
 * need `BASE_PATH` added by hand the same way `asset()` does for images —
 * this is an internal route, not a `public/` file, so `asset()` itself
 * isn't the right helper, but the constant it wraps is.
 *
 * These three unprefixed routes (`/`, `/calculator`, `/signup`) predate
 * localization; nothing about this site was previously indexed or linked
 * externally (`robots: {index:false}` throughout), so there's no existing
 * traffic this redirect needs to preserve — it exists for robustness going
 * forward (an old bookmark, a link typed by hand), not to fix something
 * that depends on it today.
 */
export default function RedirectToLocale({ suffix = "" }: { suffix?: string }) {
  const router = useRouter();
  const target = `/${DEFAULT_LOCALE}${suffix}/`;

  useEffect(() => {
    router.replace(target);
  }, [router, target]);

  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${BASE_PATH}${target}`} />
      <p style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
        Taking you to the English site… if nothing happens,{" "}
        <a href={`${BASE_PATH}${target}`}>continue</a>.
      </p>
    </>
  );
}
