import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SetHtmlLangDir from "@/components/SetHtmlLangDir";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { DEFAULT_LOCALE, LOCALES, dirFor, isLocale } from "@/lib/i18n/locales";

/**
 * Nested layout, not the app's true root (see app/layout.tsx's own comment)
 * — but the only layout that knows the current locale, since `locale` is a
 * segment of ITS OWN route tree. Every real page on the site lives under
 * here; the unprefixed `app/page.tsx`/`calculator`/`signup` siblings are
 * redirect-only and never reach this layout.
 */

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const dict = getDictionary(locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    // The business is not registered or licensed yet and the site carries
    // no Impressum. Keep it out of search results until both are sorted —
    // same posture as the true root, restated here since Metadata doesn't
    // merge `robots` from an ancestor layout the way `title` does.
    robots: { index: false, follow: false },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  return (
    <>
      <SetHtmlLangDir locale={raw} dir={dirFor(raw)} />
      {children}
    </>
  );
}
