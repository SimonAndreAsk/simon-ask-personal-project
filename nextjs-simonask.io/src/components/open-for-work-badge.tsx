import { ArrowRight } from "lucide-react";

import { SiteIcon } from "@/components/site-icon";
import { contactEmail, contactMailto } from "@/lib/contact";

export function OpenForWorkBadge() {
  return (
    <a
      href={contactMailto}
      title={`Email ${contactEmail}`}
      aria-label={`Contact me at ${contactEmail} — open for work`}
      className="group inline-flex cursor-pointer items-center gap-2.5 rounded-md border border-border/80 bg-surface/40 px-3 py-1.5 text-sm text-foreground transition-[color,border-color] hover:border-open-green/40 hover:bg-surface/60 hover:text-open-green active:scale-[0.99]"
    >
      <span className="open-for-work-dot size-2 shrink-0 rounded-full bg-open-green" />
      Open for work
      <SiteIcon
        icon={ArrowRight}
        className="text-muted transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-open-green"
      />
    </a>
  );
}
