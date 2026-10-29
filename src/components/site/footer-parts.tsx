"use client";

import { useLenis } from "lenis/react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const lenis = useLenis();
  return (
    <button
      onClick={() => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0 }))}
      aria-label="Back to top"
      className="group flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-foreground/70 transition-all hover:border-signal/60 hover:text-signal"
    >
      <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
