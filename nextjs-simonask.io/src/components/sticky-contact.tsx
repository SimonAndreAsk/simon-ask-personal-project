"use client";

import { useEffect, useState } from "react";

import { contactMailto } from "@/lib/contact";

export function StickyContact() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 280);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={contactMailto}
      className={`fixed bottom-6 right-6 z-50 rounded-lg border border-border bg-surface/50 px-3.5 py-2 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm transition-[opacity,colors] hover:border-border hover:bg-surface/80 hover:text-open-green sm:bottom-8 sm:right-8 ${
        visible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
      aria-label="Contact Simon by email"
    >
      Say hi
    </a>
  );
}
