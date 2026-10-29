"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/** Editorial section marker: "02 / Capabilities" with a drawn signal tick. */
export function SectionLabel({
  index,
  label,
  tone = "dark",
  className,
}: {
  index: number;
  label: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const accent = tone === "dark" ? "text-signal" : "text-[#139a3a]";
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.22em] uppercase",
        tone === "dark" ? "text-mono" : "text-ink/55",
        className,
      )}
    >
      <span className={accent}>{String(index).padStart(2, "0")}</span>
      <motion.span
        aria-hidden
        className={cn("h-px w-10 origin-left", tone === "dark" ? "bg-signal" : "bg-[#139a3a]")}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      {label}
    </div>
  );
}
