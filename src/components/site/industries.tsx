"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { TraceSection } from "@/components/site/trace";
import { Figure } from "@/components/site/figure";
import { SectionLabel } from "@/components/site/section-label";
import microscopeResearch from "@/assets/photos/microscope-research.jpg";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const INDUSTRIES = [
  "Life Sciences",
  "Biotechnology",
  "Pharmaceuticals",
  "Healthcare & MedTech",
  "Genomics",
  "Climate & Energy",
  "Materials Science",
  "Agritech & Food",
  "Aerospace",
  "Advanced Manufacturing",
  "Fintech & Quant Research",
  "Universities & Research Labs",
];

/* x-position of the trace in this section, as % of content width (desktop) */
const LINE_X = 56;

function Row({ label, index }: { label: string; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const lit = useInView(ref, { margin: "-40% 0px -50% 0px" });
  const passed = useInView(ref, { margin: "0px 0px -50% 0px" });

  return (
    <li ref={ref} className="relative flex h-20 items-center">
      <span
        className={cn(
          "font-mono text-[0.95rem] transition-colors duration-500 lg:w-[56%] lg:pr-10 lg:text-right",
          lit ? "text-foreground" : passed ? "text-mono" : "text-dim",
        )}
      >
        {label}
      </span>
      <span
        aria-hidden
        className={cn(
          "absolute top-1/2 left-[-26px] size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] bg-ink transition-all duration-500 lg:left-[56%]",
          passed
            ? "border-signal shadow-[0_0_12px_rgba(76,242,119,0.8)]"
            : "border-white/30",
          lit && "scale-125 bg-signal",
        )}
      />
      <span
        className={cn(
          "ml-auto font-mono text-sm tabular-nums transition-colors duration-500 lg:absolute lg:left-[calc(56%+28px)] lg:ml-0",
          lit ? "text-signal" : "text-dim",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </li>
  );
}

export function Industries() {
  return (
    <TraceSection id="industries" from={50} to={LINE_X} jog={50} innerClassName="py-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease }}
        className="lg:w-[42%]"
      >
        <SectionLabel index={4} label="Industries" />
        <h2 className="display mt-6 text-[clamp(2.75rem,5vw,4.5rem)]">
          <span className="text-dim">Industries</span>
          <br />
          <span className="text-brand-green">we serve</span>
        </h2>
        <p className="mt-8 max-w-md font-mono text-sm leading-relaxed text-mono">
          Twelve domains, one method. Wherever complex data meets demanding users,
          our teams already speak the language.
        </p>
      </motion.div>

      <div className="relative mt-20 lg:mt-28">
        <ol>
          {INDUSTRIES.map((label, i) => (
            <Row key={label} label={label} index={i} />
          ))}
        </ol>
        <div className="absolute inset-y-0 right-0 hidden w-[30%] lg:block">
          <Figure
            src={microscopeResearch}
            alt="Researcher looking through a microscope with culture dishes in the background"
            index={3}
            caption="Domain expertise in every squad"
            aspect="aspect-[3/4]"
            sizes="30vw"
            className="sticky top-32"
          />
        </div>
      </div>
    </TraceSection>
  );
}
