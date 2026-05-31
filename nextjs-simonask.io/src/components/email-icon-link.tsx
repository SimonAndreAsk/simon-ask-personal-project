"use client";

import { Mail } from "lucide-react";

import { SiteIcon, iconLinkClass } from "@/components/site-icon";
import { contactEmail, contactMailto } from "@/lib/contact";
import { type ContactClickLocation, pushContactClick } from "@/lib/datalayer";

type EmailIconLinkProps = {
  buttonLocation: Extract<ContactClickLocation, "header_email" | "footer_email">;
};

export function EmailIconLink({ buttonLocation }: EmailIconLinkProps) {
  return (
    <a
      href={contactMailto}
      className={iconLinkClass}
      aria-label={`Email ${contactEmail}`}
      onClick={() => pushContactClick(buttonLocation)}
    >
      <SiteIcon icon={Mail} />
    </a>
  );
}
