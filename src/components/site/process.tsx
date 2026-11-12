"use client";

import { motion } from "motion/react";
import { Logo } from "@/components/brand/logo";
import { TraceSection } from "@/components/site/trace";
import { Figure } from "@/components/site/figure";
import { SectionLabel } from "@/components/site/section-label";
import { ProcessDeck } from "@/components/site/process-deck";
import cleanroom from "@/assets/photos/cleanroom.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

export function Process() {
  return (
    <TraceSection
      id="process"
      tone="gray"
      from={56}
      to={10}
      jog={30}
      slope={0.42}
      innerClassName="pt-24 pb-32 lg:pt-28 lg:pb-40"
    >
      <motion.div
        initial={{ opacity: 0, y: 70, rotateX: 26, transformPerspective: 1200 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease }}
        className="lg:ml-[62%]"
      >
        <Logo className="h-10" />
        <SectionLabel index={5} label="Process" className="mt-12" />
        <h2 className="display mt-6 text-[clamp(2.4rem,4.4vw,4rem)]">
          <span className="text-dim">From hypothesis</span>
          <br />
          to <span className="text-gradient">production</span>
        </h2>
        <p className="mt-8 max-w-sm text-[0.95rem] leading-relaxed text-mono">
          A scientific method for building software: transparent, evidence-driven,
          and fast. You always know what we are building and why.
        </p>
      </motion.div>

      <ProcessDeck />

      <Figure
        src={cleanroom}
        alt="Technician in a clean-room suit operating laboratory automation equipment"
        index={4}
        caption="Validated in real labs, not just in staging"
        aspect="aspect-[16/9] lg:aspect-[21/9]"
        sizes="(min-width: 1024px) 80vw, 100vw"
        className="mt-16 lg:mt-8 lg:ml-[16%]"
      />
    </TraceSection>
  );
}
