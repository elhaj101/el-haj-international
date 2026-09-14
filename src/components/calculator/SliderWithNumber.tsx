"use client";

import { useState } from "react";

/**
 * A range input paired with a plain number input, kept in sync both ways.
 *
 * The slider's `step` is a dragging granularity, not a business rule — nothing
 * downstream requires the value to land on a multiple of it. On the business
 * calculator's weight/value sliders that granularity is ~2px per step on a
 * typical layout width, too fine to hit by dragging; the number input is the
 * fix; it accepts any integer in range, not just multiples of `step`.
 *
 * `draft` is null whenever the field isn't being edited, so the displayed
 * text just tracks `value` directly on every render — no state to keep in
 * sync with a changing prop, so there's nothing to reset in an effect.
 * While typing, `draft` holds the in-progress text so a partial number
 * ("2" on the way to "237") isn't clamped mid-keystroke.
 */
export default function SliderWithNumber({
  id,
  labelId,
  describedById,
  min,
  max,
  step,
  value,
  onChange,
  disabled,
}: {
  id: string;
  /** id of the associated <label>, for the number input's aria-labelledby. */
  labelId: string;
  /** id of an element explaining why this is disabled, applied to both inputs. */
  describedById?: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (n: number) => void;
  disabled?: boolean;
}) {
  const [draft, setDraft] = useState<string | null>(null);

  const commit = (raw: string) => {
    const n = Math.round(Number(raw));
    setDraft(null);
    if (Number.isNaN(n)) return;
    const clamped = Math.min(max, Math.max(min, n));
    if (clamped !== value) onChange(clamped);
  };

  return (
    <div className="mt-4 flex items-center gap-4">
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        aria-describedby={describedById}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--accent)] disabled:cursor-not-allowed"
      />
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={draft ?? String(value)}
        disabled={disabled}
        aria-labelledby={labelId}
        aria-describedby={describedById}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={(e) => commit(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit((e.target as HTMLInputElement).value);
        }}
        className="w-[4.5rem] shrink-0 rounded-lg border border-line bg-bg px-2 py-1.5 text-end text-sm tabular-nums disabled:cursor-not-allowed disabled:opacity-55"
      />
    </div>
  );
}
