"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

import { parseSectionHash, scrollToSection } from "@/lib/scroll-to-section";

type SectionLinkProps = ComponentProps<typeof Link>;

/** Hash links use smooth window scroll; Next.js default hash jump is disabled. */
export function SectionLink({ href, onClick, ...props }: SectionLinkProps) {
  const pathname = usePathname();
  const hrefString = typeof href === "string" ? href : (href.pathname ?? "");
  const { path, id } = parseSectionHash(hrefString);
  const isHashLink = id !== null;
  const targetsHome = path === "/" || path === "";

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented || !id) return;

    const onHome = pathname === "/" && targetsHome;
    if (!onHome) return;

    event.preventDefault();
    scrollToSection(id);
    const nextUrl = hrefString.includes("#") ? hrefString : `/#${id}`;
    window.history.pushState(null, "", nextUrl);
  }

  return (
    <Link
      href={href}
      scroll={isHashLink && targetsHome ? false : undefined}
      onClick={handleClick}
      {...props}
    />
  );
}
