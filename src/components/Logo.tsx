/**
 * Line-art shipping container with a crane hook — redrawn as SVG from the
 * locked Canva mark ("Geometric Logo with Shipping Container and Crane Hook",
 * canva.com/design/DAHTnrq7zdQ) so it stays sharp at any size and can be
 * recoloured. Keep the two in sync if the Canva file changes.
 */
export function ContainerMark({
  className = "",
  strokeWidth = 6,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      {/* crane hook */}
      <path d="M60 4v14" />
      <path d="M52 18h16" />
      <path d="M60 18v10c0 6-8 6-8 0" />
      {/* container body */}
      <rect x="14" y="40" width="92" height="58" />
      {/* top and bottom rails */}
      <path d="M14 50h92M14 88h92" />
      {/* corrugation */}
      <path d="M34 50v38M48 50v38M62 50v38M76 50v38M90 50v38" />
      {/* corner castings */}
      <path d="M14 40h10M96 40h10M14 98h10M96 98h10" />
    </svg>
  );
}

/** Full horizontal lockup: mark + wordmark + tracked subtext. */
export function Wordmark({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <ContainerMark className={compact ? "h-7 w-7" : "h-10 w-10"} />
      <span className="flex flex-col leading-none">
        <span
          className="display text-fg"
          style={{ fontSize: compact ? "1.05rem" : "1.35rem" }}
        >
          El Haj International
        </span>
        {!compact && (
          <span
            className="eyebrow mt-1"
            style={{ fontSize: "0.6rem", letterSpacing: "0.3em" }}
          >
            Shipping <span className="text-accent">·</span> Trading
          </span>
        )}
      </span>
    </span>
  );
}
