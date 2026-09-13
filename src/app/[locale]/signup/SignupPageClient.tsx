"use client";

/* ===================================================================
   Sign-up wizard.

   ⚠️ NOTHING IS TRANSMITTED OR STORED. There is no backend — the site is a
   static export on GitHub Pages, so there is nowhere to POST to. That is also
   the correct posture for now: the business has no privacy policy, no
   Impressum and no data-processing agreement, and the private path collects a
   third party's ID number. Putting that anywhere would be worse than not
   collecting it.

   Consequences that are deliberate, not oversights:
   - The final step renders a summary the user copies and sends themselves.
   - The WhatsApp link carries only non-identifying context. Personal fields
     must never go in a `?text=` query string — URLs leak into browser history
     and any intermediary that sees them.
   - The ID document is chosen and previewed locally but never uploaded, and
     the step says so plainly. A mandatory picker that silently discards the
     file would leave people believing they had submitted it.

   To make this a real account system: add a backend (Supabase or similar),
   publish a privacy policy and Impressum, then swap the final step's copy/
   WhatsApp handoff for a submit.

   Localization: field labels/hints/step titles come entirely from
   dict.signup.privateSteps/businessSteps, matched by `id` against this
   file's own FieldType map (a field's *type* — text vs email vs file — is
   structural, not language-dependent, so it stays here rather than being
   duplicated in every dictionary).
   =================================================================== */

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Wordmark } from "@/components/Logo";
import type { SignupStep } from "@/lib/i18n/dictionary";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { arrowFor, backArrowFor, type Locale } from "@/lib/i18n/locales";
import { whatsappLink } from "@/lib/pricing";

type FieldType = "text" | "email" | "tel" | "textarea" | "file";

/** Field id -> input type and any structural (non-text) flags. Purely
    structural — every piece of visible text for a field comes from the
    dictionary's own step/field `label`, matched by id. */
const FIELD_META: Record<string, { type?: FieldType; optional?: boolean }> = {
  senderName: {},
  senderEmail: { type: "email" },
  senderPhone: { type: "tel" },
  senderAddress: {},
  senderCity: {},
  consigneeName: {},
  consigneeId: {},
  consigneePhone: { type: "tel" },
  consigneeAddress: {},
  consigneeCity: {},
  idDocument: { type: "file" },
  companyName: {},
  contactPerson: {},
  companyRole: { optional: true },
  companyEmail: { type: "email" },
  companyPhone: { type: "tel" },
  verification: {},
  product: {},
  quantity: {},
  preferences: { type: "textarea", optional: true },
  shelfLife: { optional: true },
  notes: { type: "textarea", optional: true },
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

/** Computes its own dictionary from `locale` rather than receiving one —
    see HomeClient.tsx's comment on why (Dictionary carries functions,
    which can't cross the Server-to-Client Component prop boundary). */
export default function SignupPageClient({ locale }: { locale: Locale }) {
  // Wrapped in useMemo purely so React Compiler has an explicit boundary to
  // reason about: getDictionary() already returns the same cached object
  // reference for a given locale (it's a plain lookup into a fixed map, not
  // a fresh allocation), but the compiler can't infer that through a bare
  // function call and otherwise flags the useMemo below as unable to prove
  // `t` is stable across renders.
  const dict = useMemo(() => getDictionary(locale), [locale]);
  const t = dict.signup;
  const arrow = arrowFor(locale);
  const backArrow = backArrowFor(locale);
  const [kind, setKind] = useState<"private" | "business" | null>(null);
  const [step, setStep] = useState(0); // 0 = choose type
  const [data, setData] = useState<Record<string, string>>({});
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  const steps: SignupStep[] = kind === "business" ? t.businessSteps : t.privateSteps;
  const total = steps.length + 2; // type choice + steps + review
  const isReview = kind !== null && step === steps.length + 1;
  const current = kind !== null && step > 0 && !isReview ? steps[step - 1] : null;

  // Re-animate the panel whenever the visible step changes.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        panel.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      );
    },
    { dependencies: [step, kind], scope: panel },
  );

  const set = (id: string, v: string) => {
    setData((d) => ({ ...d, [id]: v }));
    setErrors((e) => (e[id] ? { ...e, [id]: "" } : e));
  };

  const onFile = (f: File | null) => {
    setFile(f);
    setErrors((e) => ({ ...e, idDocument: "" }));
    if (filePreview) URL.revokeObjectURL(filePreview);
    setFilePreview(f && f.type.startsWith("image/") ? URL.createObjectURL(f) : null);
  };

  /**
   * A multi-step wizard has no single form submit, so the browser's own
   * `required` handling never fires. Gating "Next" is manual.
   */
  const validate = () => {
    if (!current) return true;
    const next: Record<string, string> = {};
    for (const f of current.fields) {
      const meta = FIELD_META[f.id] ?? {};
      if (meta.optional) continue;
      if (meta.type === "file") {
        if (!file) next[f.id] = t.validation.chooseFileError;
        continue;
      }
      const v = (data[f.id] ?? "").trim();
      if (!v) next[f.id] = t.validation.required;
      else if (meta.type === "email" && !isEmail(v))
        next[f.id] = t.validation.invalidEmail;
      else if (meta.type === "tel" && v.replace(/\D/g, "").length < 6)
        next[f.id] = t.validation.invalidPhone;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const summary = useMemo(() => {
    if (!kind) return "";
    const lines = [
      kind === "business" ? t.summaryHeaderBusiness : t.summaryHeaderPrivate,
      "",
    ];
    for (const s of steps) {
      lines.push(s.title.toUpperCase());
      for (const f of s.fields) {
        const meta = FIELD_META[f.id] ?? {};
        if (meta.type === "file") {
          lines.push(`  ${f.label}: ${file ? file.name : "—"}`);
        } else {
          const v = (data[f.id] ?? "").trim();
          if (v) lines.push(`  ${f.label}: ${v}`);
        }
      }
      lines.push("");
    }
    return lines.join("\n").trim();
  }, [kind, steps, data, file, t]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setErrors({ copy: t.copyFailed });
    }
  };

  const progress = kind === null ? 0 : (step + 1) / total;

  return (
    <div className="min-h-svh">
      <header className="border-b border-line px-6 py-4 lg:px-10">
        <div className="mx-auto flex max-w-[820px] items-center justify-between">
          <Link href={`/${locale}`} aria-label="El Haj International">
            <Wordmark compact />
          </Link>
          <Link
            href={`/${locale}`}
            className="text-sm text-muted transition-colors hover:text-fg"
          >
            {t.backToHome}
          </Link>
        </div>
      </header>

      {/* Progress rail */}
      <div className="h-px w-full bg-line">
        <div
          className="h-px bg-accent transition-[width] duration-500 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <main className="mx-auto max-w-[820px] px-6 py-12 lg:px-10 lg:py-16">
        <div ref={panel}>
          {/* ---------- Step 0: which kind of account ---------- */}
          {kind === null && (
            <>
              <p className="eyebrow">{t.createAccountEyebrow}</p>
              <h1 className="display mt-4 text-[clamp(2rem,6.5vw,3.25rem)]">
                {t.whatSigningUpFor}
              </h1>
              <p className="measure mt-4 text-muted">{t.whatSigningUpForBody}</p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {(
                  [
                    {
                      id: "private",
                      tag: t.privateTag,
                      title: t.privateTitle,
                      body: t.privateBody,
                    },
                    {
                      id: "business",
                      tag: t.businessTag,
                      title: t.businessTitle,
                      body: t.businessBody,
                    },
                  ] as const
                ).map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => {
                      setKind(o.id);
                      setStep(1);
                    }}
                    className="group rounded-2xl border border-line p-7 text-start transition-colors duration-200 hover:border-accent"
                  >
                    <p className="eyebrow">{o.tag}</p>
                    <h2 className="display mt-3 text-2xl transition-colors duration-200 group-hover:text-accent">
                      {o.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted">{o.body}</p>
                    <span className="mt-6 inline-block text-sm text-accent">
                      {t.start} {arrow}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ---------- Field steps ---------- */}
          {current && (
            <>
              <p className="eyebrow">{t.stepOf(step, steps.length)}</p>
              <h1 className="display mt-4 text-[clamp(1.8rem,5.5vw,2.75rem)]">
                {current.title}
              </h1>
              {current.blurb && (
                <p className="measure mt-3 text-sm text-muted">{current.blurb}</p>
              )}

              <div className="mt-9 space-y-6">
                {current.fields.map((f) => {
                  const meta = FIELD_META[f.id] ?? {};
                  return (
                    <div key={f.id}>
                      <label htmlFor={f.id} className="block text-sm font-semibold">
                        {f.label}
                        {meta.optional && (
                          <span className="ms-2 font-normal text-muted">
                            {t.optional}
                          </span>
                        )}
                      </label>

                      {meta.type === "file" ? (
                        <div className="mt-3">
                          <input
                            id={f.id}
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={(e) => onFile(e.target.files?.[0] ?? null)}
                            className="block w-full text-sm text-muted file:me-4 file:rounded-full file:border-0 file:bg-fg file:px-5 file:py-2.5 file:text-sm file:font-semibold file:text-bg hover:file:opacity-85"
                          />
                          {file && (
                            <div className="mt-4 flex items-center gap-4 rounded-xl border border-line bg-bg-alt p-4">
                              {filePreview ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={filePreview}
                                  alt=""
                                  className="h-16 w-16 rounded-lg object-cover"
                                />
                              ) : (
                                <span className="display flex h-16 w-16 items-center justify-center rounded-lg bg-line text-xs">
                                  PDF
                                </span>
                              )}
                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium">
                                  {file.name}
                                </p>
                                <p className="text-xs text-muted">
                                  {(file.size / 1024).toFixed(0)} KB
                                </p>
                              </div>
                            </div>
                          )}
                          <p className="mt-3 text-xs leading-relaxed text-accent">
                            {t.notUploadedNotice}
                          </p>
                        </div>
                      ) : meta.type === "textarea" ? (
                        <textarea
                          id={f.id}
                          rows={4}
                          value={data[f.id] ?? ""}
                          onChange={(e) => set(f.id, e.target.value)}
                          className="mt-3 w-full rounded-xl border border-line bg-bg p-3.5 text-sm"
                        />
                      ) : (
                        <input
                          id={f.id}
                          type={meta.type ?? "text"}
                          value={data[f.id] ?? ""}
                          onChange={(e) => set(f.id, e.target.value)}
                          className="mt-3 w-full rounded-xl border border-line bg-bg p-3.5 text-sm"
                        />
                      )}

                      {f.hint && !errors[f.id] && (
                        <p className="mt-2 text-xs text-muted">{f.hint}</p>
                      )}
                      {errors[f.id] && (
                        <p role="alert" className="mt-2 text-xs text-[#b3261e]">
                          {errors[f.id]}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* ---------- Review ---------- */}
          {isReview && (
            <>
              <p className="eyebrow">{t.lastStep}</p>
              <h1 className="display mt-4 text-[clamp(1.8rem,5.5vw,2.75rem)]">
                {t.checkAndSend}
              </h1>
              <p className="measure mt-3 text-sm text-muted">
                {t.checkAndSendBody(kind === "private")}
              </p>

              <pre className="mt-8 max-h-80 overflow-auto rounded-2xl border border-line bg-bg-alt p-6 text-xs leading-relaxed whitespace-pre-wrap">
                {summary}
              </pre>
              {errors.copy && (
                <p role="alert" className="mt-2 text-xs text-[#b3261e]">
                  {errors.copy}
                </p>
              )}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={copy}
                  className="rounded-full border border-fg/20 px-7 py-3.5 text-sm font-semibold transition-colors duration-200 hover:border-accent hover:text-accent"
                >
                  {copied ? t.copied : t.copySummary}
                </button>
                <a
                  href={whatsappLink(
                    kind === "business"
                      ? t.businessWhatsappMessage
                      : t.privateWhatsappMessage,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-accent px-7 py-3.5 text-center text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02]"
                >
                  {t.openWhatsapp} {arrow}
                </a>
              </div>
            </>
          )}

          {/* ---------- Navigation ---------- */}
          {kind !== null && (
            <div className="mt-12 flex items-center justify-between border-t border-line pt-6">
              <button
                type="button"
                onClick={() => {
                  setErrors({});
                  if (step === 1) {
                    setKind(null);
                    setStep(0);
                  } else setStep((s) => s - 1);
                }}
                // Padded to a ~44px touch target; as bare text it was 20px
                // tall. `-ms-2` (margin-inline-start), not `-ml-2` — a
                // physical left margin would sit on the wrong side once
                // this button mirrors to the flex row's other end under RTL.
                className="-ms-2 rounded-full px-3 py-3 text-sm text-muted transition-colors hover:text-fg"
              >
                {backArrow} {t.back}
              </button>

              {!isReview && (
                <button
                  type="button"
                  onClick={() => {
                    if (validate()) setStep((s) => s + 1);
                  }}
                  className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.03]"
                >
                  {step === steps.length ? t.review : t.next} {arrow}
                </button>
              )}
            </div>
          )}
        </div>

        <p className="mt-10 text-xs leading-relaxed text-muted">{t.footerNotice}</p>
      </main>
    </div>
  );
}
