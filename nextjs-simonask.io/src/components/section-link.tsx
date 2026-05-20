"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

import { parseSectionHash, scrollToSection } from "@/lib/scroll-to-section";

type SectionLinkProps = ComponentProps<typeof Link>;

/** Reset <button> so it matches link styling from className. */
const sectionButtonClass =
  "inline cursor-pointer border-0 bg-transparent p-0 font-inherit text-inherit";

/** Hash links use JS smooth scroll; same-page uses <button> so Next.js cannot intercept. */
export function SectionLink({
  href,
  onClick,
  prefetch: _prefetch,
  replace: _replace,
  scroll: _scroll,
  ...props
}: SectionLinkProps) {
  const pathname = usePathname();
  const hrefString = typeof href === "string" ? href : (href.pathname ?? "");
  const { path, id } = parseSectionHash(hrefString);
  const isHashLink = id !== null;
  const targetsHome = path === "/" || path === "";
  const onHome = pathname === "/" && targetsHome;
  const useSectionButton = isHashLink && onHome;

  function scrollToHashSection() {
    if (!id) return;
    scrollToSection(id);
    window.history.pushState(null, "", `/#${id}`);
  }

  function handleButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event as unknown as React.MouseEvent<HTMLAnchorElement>);
    if (event.defaultPrevented) return;
    scrollToHashSection();
  }

  function handleLinkClick(event: React.MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented || !id || !onHome) return;
    event.preventDefault();
    scrollToHashSection();
  }

  if (useSectionButton) {
    const { className, children, ...buttonProps } = props;
    return (
      <button
        type="button"
        className={className ? `${sectionButtonClass} ${className}` : sectionButtonClass}
        onClick={handleButtonClick}
        {...buttonProps}
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      href={href}
      scroll={isHashLink && targetsHome ? false : undefined}
      onClick={handleLinkClick}
      {...props}
    />
  );
}
