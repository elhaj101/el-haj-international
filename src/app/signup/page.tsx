import Link from "next/link";
import { Wordmark } from "@/components/Logo";

/**
 * Placeholder, on purpose. The wizard is designed (see the project note) but
 * explicitly not built: accounts and booking are gated on the business being
 * licensed, and Ali asked to settle layout before anything is implemented.
 * This page exists so the nav link resolves and so the two-path structure can
 * be reviewed without any auth, database, or document handling behind it.
 */
const PATHS = [
  {
    title: "Private",
    tag: "Shipping",
    body: "For sending personal or household goods to family.",
    steps: [
      "Your details",
      "Who is receiving it",
      "ID document",
      "Confirm",
    ],
  },
  {
    title: "Business",
    tag: "Trading",
    body: "For companies sourcing products and placing trade orders.",
    steps: [
      "Company details",
      "Verification",
      "What you are looking for",
      "Product requirements",
    ],
  },
];

export default function SignupPage() {
  return (
    <div className="min-h-svh">
      <header className="border-b border-line px-6 py-4 lg:px-10">
        <div className="mx-auto flex max-w-[1000px] items-center justify-between">
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

      <main className="mx-auto max-w-[1000px] px-6 py-20 lg:px-10">
        <p className="eyebrow">Accounts</p>
        <h1 className="display mt-4 text-[clamp(2rem,5vw,3.5rem)]">
          Not open yet
        </h1>
        <p className="measure mt-4 text-muted">
          Accounts open once we are licensed to take bookings. Here is how
          signing up will work — two routes, because shipping a box to family
          and sourcing stock for a business need entirely different things from
          you.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {PATHS.map((p) => (
            <section
              key={p.title}
              className="rounded-2xl border border-line p-8"
            >
              <p className="eyebrow">{p.tag}</p>
              <h2 className="display mt-3 text-3xl">{p.title}</h2>
              <p className="mt-3 text-sm text-muted">{p.body}</p>
              <ol className="mt-7 space-y-3">
                {p.steps.map((s, i) => (
                  <li key={s} className="flex items-center gap-4 text-sm">
                    <span className="display w-6 shrink-0 text-line">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-muted">{s}</span>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <p className="mt-12 text-sm text-muted">
          Need something moved before then?{" "}
          <Link href="/" className="text-fg underline underline-offset-4">
            Message us from the home page
          </Link>{" "}
          — we are answering enquiries already.
        </p>
      </main>
    </div>
  );
}
