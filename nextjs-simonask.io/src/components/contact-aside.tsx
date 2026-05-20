import Image from "next/image";

import { ContactQuickLinks } from "@/components/contact-quick-links";

export function ContactAside() {
  return (
    <aside className="flex w-48 shrink-0 flex-col gap-4">
      <figure className="overflow-hidden rounded-lg">
        <Image
          src="/simon-portrait.png"
          alt="Portrait of Simon Ask"
          width={80}
          height={80}
          className="h-20 w-20 rounded-lg"
          sizes="5rem"
        />
      </figure>

      <ContactQuickLinks />
    </aside>
  );
}
