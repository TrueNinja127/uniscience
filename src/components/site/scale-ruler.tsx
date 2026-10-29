"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";

/**
 * A measuring scale pinned to the right edge. Its readout counts the visitor
 * from v0.00 (idea) to v1.00 (shipped) as they scroll the page.
 */
export function ScaleRuler() {
  const { scrollYProgress } = useScroll();
  const top = useTransform(scrollYProgress, [0, 1], ["6%", "94%"]);
  const [label, setLabel] = useState("v0.00");

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setLabel(`v${Math.min(1, p).toFixed(2)}`);
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 right-0 z-30 hidden h-svh w-6 lg:block"
    >
      <div className="ruler-ticks absolute inset-0" />
      <motion.div
        style={{ top }}
        className="absolute right-0 flex -translate-y-1/2 items-center"
      >
        <span className="rounded-sm border border-white/10 bg-[#141a16] px-2 py-0.5 font-mono text-[0.68rem] text-signal tabular-nums">
          {label}
        </span>
        <span className="h-px w-6 bg-signal glow-signal" />
      </motion.div>
    </div>
  );
}
