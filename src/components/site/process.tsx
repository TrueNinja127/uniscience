"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "motion/react";
import { Logo } from "@/components/brand/logo";
import { TraceSection } from "@/components/site/trace";
import { Figure } from "@/components/site/figure";
import { SectionLabel } from "@/components/site/section-label";
import { ProcessDeck } from "@/components/site/process-deck";
import cleanroom from "@/assets/photos/cleanroom.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

// Placeholder figures: replace with real company numbers.
const STATS = [
  { value: 250, suffix: "+", label: "Products shipped" },
  { value: 98, suffix: "%", label: "Client retention" },
  { value: 40, suffix: "M", label: "End users served" },
  { value: 12, suffix: "", label: "Countries" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;
    const c = animate(0, to, {
      duration: 2,
      ease,
      onUpdate: (v) => (node.textContent = `${Math.round(v)}${suffix}`),
    });
    return () => c.stop();
  }, [inView, to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

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

      <dl className="mt-24 grid grid-cols-2 gap-y-12 lg:mt-8 lg:ml-[16%] lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col-reverse lg:pl-8">
            <dt className="eyebrow mt-3 text-mono">
              {s.label}
            </dt>
            <dd className="display text-gradient text-6xl font-light sm:text-7xl">
              <Counter to={s.value} suffix={s.suffix} />
            </dd>
          </div>
        ))}
      </dl>

      <Figure
        src={cleanroom}
        alt="Technician in a clean-room suit operating laboratory automation equipment"
        index={4}
        caption="Validated in real labs, not just in staging"
        aspect="aspect-[16/9] lg:aspect-[21/9]"
        sizes="(min-width: 1024px) 80vw, 100vw"
        className="mt-28 lg:ml-[16%]"
      />
    </TraceSection>
  );
}
