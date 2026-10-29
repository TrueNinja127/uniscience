"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

/** Card with a soft brand-colored glow that tracks the cursor, plus a lit border. */
export function SpotlightCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, rgba(14,165,233,0.14), transparent 65%)`;
  const border = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, rgba(63,207,92,0.55), transparent 70%)`;

  return (
    <div
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
      }}
      onPointerLeave={() => {
        x.set(-500);
        y.set(-500);
      }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-px",
        className,
      )}
    >
      {/* Lit border */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: border }}
      />
      <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-[#0d1524]">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glow }}
        />
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  );
}
