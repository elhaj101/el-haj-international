/**
 * A `<script>` that runs synchronously while the browser parses the HTML —
 * before the first paint, and long before React hydrates.
 *
 * The `type` swap is the documented way to render one of these without
 * tripping React's development warning about `<script>` in JSX: on the
 * server it is real JavaScript, on the client it is inert `text/plain` (a
 * script inserted by a DOM update never executes anyway, so nothing is lost
 * — whatever the script did has to be done another way on client-side
 * navigations). `suppressHydrationWarning` covers that deliberate mismatch.
 *
 * See Next's own guide: node_modules/next/dist/docs/01-app/02-guides/
 * preventing-flash-before-hydration.md
 */
export default function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
