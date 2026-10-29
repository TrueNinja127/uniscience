"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUp } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Oversized wordmark: an outlined "UNISCIENCE" that fills with the brand
 * gradient from the bottom up as the footer scrolls into view.
 */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const fill = useTransform(scrollYProgress, [0.1, 1], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);
  const letters = "UNISCIENCE".split("");

  return (
    <div ref={ref} aria-hidden className="relative mx-auto max-w-7xl overflow-hidden px-5 select-none sm:px-8">
      <div className="relative">
        {/* Outline layer */}
        <p className="display flex justify-between text-[17.5vw] leading-[0.8] font-normal text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.12)] xl:text-[15.5rem]">
          {letters.map((l, i) => (
            <motion.span
              key={i}
              initial={{ y: "40%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.05, ease }}
            >
              {l}
            </motion.span>
          ))}
        </p>
        {/* Gradient fill layer, revealed with scroll */}
        <motion.p
          style={{ clipPath: fill }}
          className="display text-gradient absolute inset-0 flex justify-between text-[17.5vw] leading-[0.8] font-normal opacity-90 xl:text-[15.5rem]"
        >
          {letters.map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </motion.p>
      </div>
    </div>
  );
}

export function BackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.18em] text-mono uppercase transition-colors hover:text-signal"
    >
      Back to top
      <span className="flex size-9 items-center justify-center border border-white/15 transition-all group-hover:border-signal group-hover:shadow-[0_0_18px_-4px] group-hover:shadow-signal">
        <ArrowUp className="size-4 transition-transform group-hover:-translate-y-0.5" />
      </span>
    </button>
  );
}
