"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

import { scrollToSection } from "@/lib/scroll-to-section";

/** Smooth scroll to URL hash after landing on the home page. */
export function ScrollToHash() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (pathname !== "/") return;

    const id = window.location.hash.replace(/^#/, "");
    if (!id) return;

    // Browser snaps to the hash on load; reset then animate on the next frame.
    if (window.scrollY > 0) {
      window.scrollTo(0, 0);
    }
    const frame = requestAnimationFrame(() => scrollToSection(id));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;

    function onHashChange() {
      const id = window.location.hash.replace(/^#/, "");
      if (id) scrollToSection(id);
    }

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname]);

  return null;
}
