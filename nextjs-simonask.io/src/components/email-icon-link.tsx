import { Mail } from "lucide-react";

import { SiteIcon, iconLinkClass } from "@/components/site-icon";
import { contactEmail, contactMailto } from "@/lib/contact";

export function EmailIconLink() {
  return (
    <a
      href={contactMailto}
      className={iconLinkClass}
      aria-label={`Email ${contactEmail}`}
    >
      <SiteIcon icon={Mail} />
    </a>
  );
}
