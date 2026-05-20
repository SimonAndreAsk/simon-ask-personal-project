import { type SanityDocument } from "next-sanity";

import type { ProfileEntry } from "@/lib/profile";
import { urlFor } from "@/sanity/image";

const LOGO_SIZE = 48;

function experienceLogo(
  doc: SanityDocument,
): ProfileEntry["logo"] | undefined {
  const alt =
    typeof doc.logoAlt === "string" && doc.logoAlt.trim()
      ? doc.logoAlt.trim()
      : undefined;

  if (!alt) return undefined;

  const image = doc.logoImage;
  if (!image || !urlFor(image)) {
    return { alt };
  }

  const src =
    urlFor(image)
      ?.width(LOGO_SIZE * 2)
      .height(LOGO_SIZE * 2)
      .fit("crop")
      .auto("format")
      .quality(85)
      .url() ?? undefined;

  return { alt, src };
}

export function experienceEntriesFromSanity(
  docs: SanityDocument[],
): ProfileEntry[] {
  return docs.map((doc) => {
    const title = typeof doc.title === "string" ? doc.title : "Experience";
    const subtitle =
      typeof doc.subtitle === "string" ? doc.subtitle : undefined;
    const period = typeof doc.period === "string" ? doc.period : undefined;
    const href = typeof doc.href === "string" ? doc.href : undefined;
    const logo = experienceLogo(doc);
    const details = Array.isArray(doc.details)
      ? doc.details.filter(
          (item): item is string =>
            typeof item === "string" && item.trim().length > 0,
        )
      : undefined;

    return {
      title,
      subtitle,
      period,
      href,
      logo,
      details: details?.length ? details : undefined,
    };
  });
}
