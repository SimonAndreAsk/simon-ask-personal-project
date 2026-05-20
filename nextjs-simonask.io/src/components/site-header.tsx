import Link from "next/link";

import { EmailIconLink } from "@/components/email-icon-link";
import { GithubIconLink } from "@/components/github-icon-link";
import { SectionLink } from "@/components/section-link";
import { SITE_SECTIONS, sectionHref } from "@/lib/sections";

const navLinkClass = "transition-colors hover:text-foreground";

const navItems = [
  { id: SITE_SECTIONS.experience, label: "Experience" },
  { id: SITE_SECTIONS.education, label: "Education" },
  { id: SITE_SECTIONS.projects, label: "Projects" },
  { id: SITE_SECTIONS.writing, label: "Writing" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between px-6 py-5 sm:px-8">
        <Link
          href="/"
          className="font-display text-lg tracking-tight text-foreground transition-opacity hover:opacity-70"
        >
          Simon Ask
        </Link>
        <div className="flex items-center gap-6 sm:gap-8">
          <nav className="flex flex-wrap items-center justify-end gap-x-5 gap-y-1 text-sm text-muted">
            {navItems.map(({ id, label }) => (
              <SectionLink key={id} href={sectionHref(id)} className={navLinkClass}>
                {label}
              </SectionLink>
            ))}
          </nav>
          <div className="flex items-center gap-0.5 border-l border-border/40 pl-6 sm:pl-7">
            <EmailIconLink />
            <GithubIconLink />
          </div>
        </div>
      </div>
    </header>
  );
}
