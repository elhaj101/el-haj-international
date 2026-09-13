import type { RichSegment } from "@/lib/i18n/dictionary";
import RotatingWord from "@/components/RotatingWord";

/**
 * Renders a RichSegment[] — plain text, with `strong` segments as <strong>.
 * See dictionary.ts's own comment on why a handful of sentences need this
 * instead of a plain string: word order around the emphasised phrase isn't
 * guaranteed to survive translation (Hero's "between **Europe** and **the
 * Middle East**", BusinessCalculator's "Taxed **by weight**" / "**by
 * value**"), so each locale supplies its own segments in its own order.
 */
export default function RichText({
  segments,
  strongClassName = "font-semibold",
}: {
  segments: RichSegment[];
  /** Applied only to `strong` segments — callers on a dark background or a
      muted paragraph need different emphasis styling. */
  strongClassName?: string;
}) {
  return (
    <>
      {segments.map((s, i) =>
        s.rotateThrough ? (
          // Still a <strong>: the word is emphasised in the sentence whether
          // or not it happens to be cycling, and it has to stay emphasised
          // for the reader who has reduced motion on and never sees it move.
          <strong key={i} className={strongClassName}>
            <RotatingWord words={[s.text, ...s.rotateThrough]} />
          </strong>
        ) : s.strong ? (
          <strong key={i} className={strongClassName}>
            {s.text}
          </strong>
        ) : (
          <span key={i}>{s.text}</span>
        ),
      )}
    </>
  );
}
