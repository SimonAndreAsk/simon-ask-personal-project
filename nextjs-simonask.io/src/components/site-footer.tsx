import { contactEmail, contactMailto } from "@/lib/contact";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/60">
      <div className="mx-auto max-w-2xl px-6 py-10 sm:px-8">
        <p className="text-sm text-muted">
          © {year} Simon Ask. Digital analytics and what I&apos;m learning.
        </p>
        <p className="mt-3 text-sm text-muted">
          <a
            href={contactMailto}
            className="transition-colors hover:text-foreground"
          >
            Say hello → {contactEmail}
          </a>
        </p>
      </div>
    </footer>
  );
}
