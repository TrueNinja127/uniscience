"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { LogoMark } from "@/components/brand/logo";
import { TraceSection } from "@/components/site/trace";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const LEFT = [
  ["Automated analysis of", "lab instrument data"],
  ["Protein & molecule", "property prediction"],
  ["Clinical trial", "data pipelines"],
  ["Real-time sensor", "anomaly detection"],
  ["Research knowledge-base", "copilots"],
  ["Simulation workflows", "on cloud GPUs"],
];

const RIGHT = [
  ["Genomics variant calling", "at scale"],
  ["Demand & yield", "forecasting models"],
  ["Digital twins for", "manufacturing lines"],
  ["Regulatory documents", "generated from templates"],
  ["Image-based quality", "inspection"],
  ["Field-data apps", "for researchers"],
];

function Item({ lines, align }: { lines: string[]; align: "left" | "right" }) {
  const ref = useRef<HTMLLIElement>(null);
  const lit = useInView(ref, { margin: "-35% 0px -35% 0px" });
  return (
    <li
      ref={ref}
      className={cn(
        "text-[clamp(1.4rem,2.2vw,2rem)] leading-[1.25] font-light transition-colors duration-700",
        align === "right" && "lg:text-right",
        lit ? "text-foreground" : "text-white/20",
      )}
    >
      {lines[0]}
      <br />
      {lines[1]}
    </li>
  );
}

function StartOrb() {
  return (
    <motion.a
      href="#contact"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="group relative mt-20 flex size-60 items-center justify-center rounded-full sm:size-64"
    >
      {/* Rotating sweep ring */}
      <motion.span
        aria-hidden
        className="absolute -inset-3 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgb(76_242_119/0.9)_60deg,transparent_120deg)] opacity-70 blur-[2px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />
      <span aria-hidden className="absolute -inset-2 rounded-full bg-ink" />
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-[linear-gradient(180deg,#4cf277_0%,#14b8a6_55%,#0ea5e9_100%)] shadow-[0_0_60px_-6px] shadow-signal/60 transition-shadow group-hover:shadow-[0_0_90px_-4px]"
      />
      <span className="relative text-center text-ink uppercase">
        <span className="block text-xs tracking-[0.2em]">Click to</span>
        <span className="mt-1 block text-[1.7rem] leading-[1.05]">
          Start your
          <br />
          project
        </span>
      </span>
    </motion.a>
  );
}

export function Solutions() {
  return (
    <TraceSection id="solutions" from={54} to={50} jog={40} innerClassName="py-28 lg:py-36">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease }}
        className="max-w-xl lg:w-[44%]"
      >
        <div className="flex items-center gap-6">
          <LogoMark className="size-16 sm:size-20" sizes="80px" />
          <h2 className="display text-[clamp(2.75rem,5vw,4.5rem)] text-dim">
            What we
            <br />
            solve
          </h2>
        </div>
        <p className="mt-10 font-mono text-sm leading-relaxed text-foreground/80">
          We start with a specific scientific or operational problem and engineer
          software that solves it — measurably, and in production.
        </p>
      </motion.div>

      <div className="mt-24 flex flex-col gap-12 lg:mt-32 lg:flex-row lg:gap-0">
        <ul className="space-y-12 lg:w-[44%] lg:pt-8">
          {LEFT.map((l) => (
            <Item key={l[0]} lines={l} align="right" />
          ))}
        </ul>
        <div className="lg:ml-auto lg:w-[44%]">
          <ul className="space-y-12">
            {RIGHT.map((l) => (
              <Item key={l[0]} lines={l} align="left" />
            ))}
          </ul>
          <StartOrb />
        </div>
      </div>
    </TraceSection>
  );
}
