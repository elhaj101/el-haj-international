"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Wordmark } from "@/components/Logo";
import { whatsappLink } from "@/lib/pricing";

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
   =================================================================== */

type FieldType = "text" | "email" | "tel" | "textarea" | "file";

interface Field {
  id: string;
  label: string;
  type?: FieldType;
  hint?: string;
  optional?: boolean;
  placeholder?: string;
}

interface Step {
  title: string;
  blurb?: string;
  fields: Field[];
}

const PRIVATE_STEPS: Step[] = [
  {
    title: "Your details",
    blurb: "The person sending the shipment.",
    fields: [
      { id: "senderName", label: "Full name" },
      { id: "senderEmail", label: "Email", type: "email" },
      { id: "senderPhone", label: "Phone / WhatsApp", type: "tel" },
      { id: "senderAddress", label: "Street and number" },
      { id: "senderCity", label: "City and postcode" },
    ],
  },
  {
    title: "Who is receiving it",
    blurb:
      "Customs treats each recipient as the importer of their own consignment, so this has to be the actual person taking delivery.",
    fields: [
      { id: "consigneeName", label: "Recipient's full name" },
      {
        id: "consigneeId",
        label: "Recipient's ID number",
        hint: "Required by Lebanese customs for the declaration.",
      },
      { id: "consigneePhone", label: "Recipient's phone", type: "tel" },
      { id: "consigneeAddress", label: "Delivery address" },
      { id: "consigneeCity", label: "City / region" },
    ],
  },
  {
    title: "Identity document",
    blurb: "A passport or ID card page for the sender.",
    fields: [
      {
        id: "idDocument",
        label: "Choose a file",
        type: "file",
        hint: "JPG, PNG or PDF.",
      },
    ],
  },
];

const BUSINESS_STEPS: Step[] = [
  {
    title: "Company details",
    fields: [
      { id: "companyName", label: "Company name" },
      { id: "contactPerson", label: "Contact person" },
      { id: "companyRole", label: "Role", optional: true },
      { id: "companyEmail", label: "Email", type: "email" },
      { id: "companyPhone", label: "Phone / WhatsApp", type: "tel" },
    ],
  },
  {
    title: "Verification",
    blurb:
      "Any one of these is enough — we just need to see that the business is real.",
    fields: [
      {
        id: "verification",
        label: "Website, company email domain, or VAT / trade register number",
        placeholder: "elhaj-example.de  ·  DE123456789  ·  HRB 12345",
        hint: "One is enough. You do not need to provide all three.",
      },
    ],
  },
  {
    title: "What you are looking for",
    blurb: "The more specific you are, the faster we can quote.",
    fields: [
      { id: "product", label: "Product or commodity" },
      { id: "quantity", label: "Quantity or order volume" },
      {
        id: "preferences",
        label: "Quality and packaging preferences",
        type: "textarea",
        optional: true,
      },
      {
        id: "shelfLife",
        label: "Best-before / shelf-life requirements",
        optional: true,
        hint: "Leave blank if it does not apply.",
      },
      {
        id: "notes",
        label: "Anything else",
        type: "textarea",
        optional: true,
      },
    ],
  },
];

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export default function SignupPage() {
  const [kind, setKind] = useState<"private" | "business" | null>(null);
  const [step, setStep] = useState(0); // 0 = choose type
  const [data, setData] = useState<Record<string, string>>({});
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  const steps = kind === "business" ? BUSINESS_STEPS : PRIVATE_STEPS;
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
      if (f.optional) continue;
      if (f.type === "file") {
        if (!file) next[f.id] = "Please choose a file.";
        continue;
      }
      const v = (data[f.id] ?? "").trim();
      if (!v) next[f.id] = "Required.";
      else if (f.type === "email" && !isEmail(v))
        next[f.id] = "That does not look like an email address.";
      else if (f.type === "tel" && v.replace(/\D/g, "").length < 6)
        next[f.id] = "That does not look like a phone number.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const summary = useMemo(() => {
    if (!kind) return "";
    const lines = [
      `EL HAJ INTERNATIONAL — ${kind === "business" ? "BUSINESS / TRADING" : "PRIVATE / SHIPPING"} SIGN-UP`,
      "",
    ];
    for (const s of steps) {
      lines.push(s.title.toUpperCase());
      for (const f of s.fields) {
        if (f.type === "file") {
          lines.push(`  ${f.label}: ${file ? file.name : "—"}`);
        } else {
          const v = (data[f.id] ?? "").trim();
          if (v) lines.push(`  ${f.label}: ${v}`);
        }
      }
      lines.push("");
    }
    return lines.join("\n").trim();
  }, [kind, steps, data, file]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setErrors({ copy: "Could not copy — select the text and copy manually." });
    }
  };

  const progress = kind === null ? 0 : (step + 1) / total;

  return (
    <div className="min-h-svh">
      <header className="border-b border-line px-6 py-4 lg:px-10">
        <div className="mx-auto flex max-w-[820px] items-center justify-between">
          <Link href="/" aria-label="El Haj International — home">
            <Wordmark compact />
          </Link>
          <Link
            href="/"
            className="text-sm text-muted transition-colors hover:text-fg"
          >
            ← Back to home
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
              <p className="eyebrow">Create an account</p>
              <h1 className="display mt-4 text-[clamp(2rem,6.5vw,3.25rem)]">
                What are you signing up for?
              </h1>
              <p className="measure mt-4 text-muted">
                Sending a shipment and sourcing products need completely
                different things from you, so the two routes ask different
                questions.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {(
                  [
                    {
                      id: "private",
                      tag: "Shipping",
                      title: "Private",
                      body: "Sending personal or household goods to family.",
                    },
                    {
                      id: "business",
                      tag: "Trading",
                      title: "Business",
                      body: "Sourcing products or placing a trade order.",
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
                    className="group rounded-2xl border border-line p-7 text-left transition-colors duration-200 hover:border-accent"
                  >
                    <p className="eyebrow">{o.tag}</p>
                    <h2 className="display mt-3 text-2xl transition-colors duration-200 group-hover:text-accent">
                      {o.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted">{o.body}</p>
                    <span className="mt-6 inline-block text-sm text-accent">
                      Start →
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ---------- Field steps ---------- */}
          {current && (
            <>
              <p className="eyebrow">
                Step {step} of {steps.length}
              </p>
              <h1 className="display mt-4 text-[clamp(1.8rem,5.5vw,2.75rem)]">
                {current.title}
              </h1>
              {current.blurb && (
                <p className="measure mt-3 text-sm text-muted">{current.blurb}</p>
              )}

              <div className="mt-9 space-y-6">
                {current.fields.map((f) => (
                  <div key={f.id}>
                    <label
                      htmlFor={f.id}
                      className="block text-sm font-semibold"
                    >
                      {f.label}
                      {f.optional && (
                        <span className="ml-2 font-normal text-muted">
                          optional
                        </span>
                      )}
                    </label>

                    {f.type === "file" ? (
                      <div className="mt-3">
                        <input
                          id={f.id}
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
                          className="block w-full text-sm text-muted file:mr-4 file:rounded-full file:border-0 file:bg-fg file:px-5 file:py-2.5 file:text-sm file:font-semibold file:text-bg hover:file:opacity-85"
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
                          This document is <strong>not uploaded</strong>. We have
                          no account system yet, so nothing leaves your device —
                          you will send it in the chat at the last step.
                        </p>
                      </div>
                    ) : f.type === "textarea" ? (
                      <textarea
                        id={f.id}
                        rows={4}
                        value={data[f.id] ?? ""}
                        placeholder={f.placeholder}
                        onChange={(e) => set(f.id, e.target.value)}
                        className="mt-3 w-full rounded-xl border border-line bg-bg p-3.5 text-sm"
                      />
                    ) : (
                      <input
                        id={f.id}
                        type={f.type ?? "text"}
                        value={data[f.id] ?? ""}
                        placeholder={f.placeholder}
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
                ))}
              </div>
            </>
          )}

          {/* ---------- Review ---------- */}
          {isReview && (
            <>
              <p className="eyebrow">Last step</p>
              <h1 className="display mt-4 text-[clamp(1.8rem,5.5vw,2.75rem)]">
                Check and send
              </h1>
              <p className="measure mt-3 text-sm text-muted">
                Copy the summary below and send it to us on WhatsApp
                {kind === "private" && ", along with your ID document"}. We reply
                with what it costs and what happens next.
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
                  {copied ? "Copied ✓" : "Copy summary"}
                </button>
                <a
                  href={whatsappLink(
                    kind === "business"
                      ? "Hi, I've filled in the business sign-up form on your site. Sending my details now."
                      : "Hi, I've filled in the sign-up form on your site. Sending my details now.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-accent px-7 py-3.5 text-center text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02]"
                >
                  Open WhatsApp →
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
                // Padded to a ~44px touch target; as bare text it was 20px tall.
                className="-ml-2 rounded-full px-3 py-3 text-sm text-muted transition-colors hover:text-fg"
              >
                ← Back
              </button>

              {!isReview && (
                <button
                  type="button"
                  onClick={() => {
                    if (validate()) setStep((s) => s + 1);
                  }}
                  className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.03]"
                >
                  {step === steps.length ? "Review" : "Next"} →
                </button>
              )}
            </div>
          )}
        </div>

        <p className="mt-10 text-xs leading-relaxed text-muted">
          Nothing you type here is stored or sent anywhere until you choose to
          message us. El Haj International is not yet a licensed freight
          forwarder and is not taking bookings — this sign-up starts a
          conversation, it does not open an account.
        </p>
      </main>
    </div>
  );
}
