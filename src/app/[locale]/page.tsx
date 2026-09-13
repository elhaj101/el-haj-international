import HomeClient from "./HomeClient";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n/locales";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : DEFAULT_LOCALE;

  return <HomeClient locale={locale} />;
}
