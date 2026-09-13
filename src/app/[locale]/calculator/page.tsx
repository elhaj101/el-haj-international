import CalculatorPageClient from "./CalculatorPageClient";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n/locales";

export default async function CalculatorRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : DEFAULT_LOCALE;

  return <CalculatorPageClient locale={locale} />;
}
