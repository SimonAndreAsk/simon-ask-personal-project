import Image from "next/image";

import { ContactForm } from "@/components/contact-form";
import { contactEmail, contactMailto } from "@/lib/contact";

export function GetInTouchSection() {
  return (
    <section className="mt-20 sm:mt-24">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
        <figure className="mx-auto shrink-0 sm:mx-0">
          <Image
            src="/simon-portrait.png"
            alt="Portrait of Simon Ask"
            width={112}
            height={112}
            className="h-24 w-24 sm:h-28 sm:w-28"
            sizes="(min-width: 640px) 7rem, 6rem"
            priority={false}
          />
        </figure>

        <div className="min-w-0 flex-1">
          <h2
            id="get-in-touch"
            className="page-section-title font-display text-2xl tracking-tight text-foreground"
          >
            Get in touch
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
            If you want to talk analytics, tooling, or a role, send a note — I
            read everything and reply when I can.
          </p>
          <ContactForm />
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted">
            If the form doesn&apos;t work, email me at{" "}
            <a
              href={contactMailto}
              className="text-foreground underline decoration-border underline-offset-2 transition-colors hover:text-open-green"
            >
              {contactEmail}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
