import Link from "next/link";
import { Wordmark } from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-14 lg:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <Wordmark />
          <p className="mt-5 max-w-[38ch] text-sm text-muted">
            Consolidated container shipping and trading between Europe and the
            Middle East. Based in Hamburg, Germany.
          </p>
        </div>

        <nav className="flex gap-14 text-sm">
          <ul className="space-y-3">
            <li>
              <Link
                href="/calculator"
                className="text-muted transition-colors hover:text-fg"
              >
                Calculator
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="text-muted transition-colors hover:text-fg"
              >
                Sign up
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Stated plainly rather than buried: the company is not trading yet. */}
      <div className="mx-auto mt-14 max-w-[1400px] border-t border-line pt-6">
        <p className="text-xs text-muted">
          Site in development. El Haj International is not yet registered as a
          licensed freight forwarder — quotes shown are indicative and no
          bookings are being taken.
        </p>
      </div>
    </footer>
  );
}
