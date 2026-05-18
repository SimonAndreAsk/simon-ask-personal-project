import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { contactMailto } from "@/lib/contact";

export function SiteHeader() {
  return (
    <header className="border-b border-border/60">
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between px-6 py-6 sm:px-8">
        <Link
          href="/"
          className="font-display text-lg tracking-tight text-foreground transition-opacity hover:opacity-70"
        >
          Simon Ask
        </Link>
        <nav className="flex items-center gap-1 text-sm text-muted">
          <Link href="/#articles" className="px-2 transition-colors hover:text-foreground">
            Articles
          </Link>
          <a
            href={contactMailto}
            className="px-2 transition-colors hover:text-foreground"
          >
            Contact
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
