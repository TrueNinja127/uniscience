"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/** Section marker styled like the logo tagline: a numbered pill and a drawn signal tick. */
export function SectionLabel({
  index,
  label,
  className,
}: {
  index: number;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("eyebrow flex items-center gap-3 text-mono", className)}>
      <span className="flex h-6 min-w-6 items-center justify-center rounded-full border border-signal/40 bg-signal/10 px-2 text-[0.62rem] tracking-[0.08em] text-signal tabular-nums">
        {String(index).padStart(2, "0")}
      </span>
      <motion.span
        aria-hidden
        className="h-px w-10 origin-left bg-gradient-to-r from-signal to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      {label}
    </div>
  );
}
