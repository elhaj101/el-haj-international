import Link from "next/link";
import { Wordmark } from "./Logo";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locales";

export default function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.footer;
  return (
    <footer className="border-t border-line px-6 py-14 lg:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <Wordmark />
          <p className="mt-5 max-w-[38ch] text-sm text-muted">{t.tagline}</p>
        </div>

        <nav className="flex gap-14 text-sm">
          <ul className="space-y-3">
            <li>
              <Link
                href={`/${locale}/calculator`}
                className="text-muted transition-colors hover:text-fg"
              >
                {t.calculator}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/signup`}
                className="text-muted transition-colors hover:text-fg"
              >
                {t.signUp}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Stated plainly rather than buried: the company is not trading yet. */}
      <div className="mx-auto mt-14 max-w-[1400px] border-t border-line pt-6">
        <p className="text-xs text-muted">{t.devNotice}</p>
      </div>
    </footer>
  );
}
