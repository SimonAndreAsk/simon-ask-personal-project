import { Mail, Phone } from "lucide-react";

import { LinkedinIcon, SiteIcon } from "@/components/site-icon";
import {
  contactEmail,
  contactMailto,
  contactPhone,
  contactPhoneHref,
  linkedinProfileUrl,
} from "@/lib/contact";

const linkClass =
  "inline-flex items-start gap-2 text-sm text-muted transition-colors hover:text-foreground";

export function ContactQuickLinks() {
  return (
    <nav className="flex flex-col gap-2.5 border-t border-border/40 pt-4" aria-label="Other ways to reach me">
      <a href={contactMailto} className={linkClass}>
        <SiteIcon icon={Mail} className="mt-0.5 shrink-0" />
        <span className="whitespace-nowrap leading-snug">{contactEmail}</span>
      </a>
      <a href={contactPhoneHref} className={`${linkClass} tabular-nums`}>
        <SiteIcon icon={Phone} className="mt-0.5 shrink-0" />
        <span className="leading-snug">{contactPhone}</span>
      </a>
      <a
        href={linkedinProfileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        <LinkedinIcon className="mt-0.5 shrink-0" />
        <span className="leading-snug">LinkedIn</span>
      </a>
    </nav>
  );
}
