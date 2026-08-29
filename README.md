# El Haj International — website

Marketing site and public shipping calculator for El Haj International
(consolidated container shipping and trading, Europe → Middle East).

**Status: in development.** The business is not yet registered or licensed as a
freight forwarder, so the site takes no bookings, collects no personal data, and
is set to `noindex`. There is no Impressum yet — one is required under TMG §5
before this can be publicly promoted in Germany.

## Stack

- **Next.js 16** (App Router), static export — no server needed
- **Tailwind CSS 4** — design tokens live in `src/app/globals.css`
- **GSAP + ScrollTrigger + SplitText** and **Lenis** — scroll choreography
- Deployed to GitHub Pages by `.github/workflows/deploy.yml`

## Running locally

```bash
npm install
npm run dev     # http://localhost:3000/el-haj-international
```

Note the `/el-haj-international` path — `basePath` is set for GitHub Pages
project hosting. To build for a root-level host instead:

```bash
NEXT_PUBLIC_BASE_PATH="" npm run build
```

## ⚠️ Pricing numbers are placeholders

`src/lib/pricing.ts` is the single source of truth for everything the calculator
shows. It separates two kinds of number, and the distinction matters:

- **Customs facts** — researched from the Lebanese Customs Law (Decree
  4461/2000), customs.gov.lb, and the FIDI Import Customs Guide for Lebanon.
  **The FIDI figures date from April 2022** and need re-confirmation with a
  Lebanese broker before they inform a real quote.
- **Commercial rates** — `FREIGHT_EUR_PER_KG`, `CLEARANCE_FEE_EUR`,
  `MIN_CHARGEABLE_KG`. **These are invented placeholders.** Replace them with
  real numbers before showing the calculator to a paying customer.

## Structure

| Route | What it is |
|---|---|
| `/` | Scroll-driven landing page. Every CTA opens WhatsApp — no forms. |
| `/calculator` | Public estimate tool. No account required, deliberately plain. |
| `/signup` | Placeholder. The two-path wizard is designed but not built. |

## Assets

`public/hero-ship.jpg`, `public/closing-port.jpg` and `public/container.png`
were generated in Canva. The container is cut to transparency and carries the
wordmark in perspective, so it reads as branded fleet livery during the hero
scroll transition.
