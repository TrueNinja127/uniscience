"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "motion/react";
import { Logo } from "@/components/brand/logo";
import { TraceSection } from "@/components/site/trace";
import { Figure } from "@/components/site/figure";
import { SectionLabel } from "@/components/site/section-label";
import cleanroom from "@/assets/photos/cleanroom.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  {
    phase: "Week 1-2",
    title: "Discover",
    body: "We immerse in your domain, data and users, then define outcomes, risks and the target architecture.",
  },
  {
    phase: "Week 3-5",
    title: "Experiment",
    body: "Hypotheses become working prototypes. We validate models and UX with real data before committing.",
  },
  {
    phase: "Month 2+",
    title: "Engineer",
    body: "Senior squads ship in two-week increments with CI/CD, automated tests and a demo every sprint.",
  },
  {
    phase: "Ongoing",
    title: "Scale",
    body: "We launch, observe and optimise, then hand over, or keep evolving the product with your team.",
  },
];

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

      <ol className="mt-24 grid gap-4 [perspective:1400px] sm:grid-cols-2 lg:mt-32 lg:ml-[16%] lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <motion.li
            key={step.title}
            initial={{ opacity: 0, y: 80, rotateX: 40 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.1, delay: i * 0.12, ease }}
            whileHover={{ y: -8 }}
            style={{ transformOrigin: "50% 100%" }}
            className="group rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-6 transition-[background-color,border-color,box-shadow] duration-500 hover:border-signal/30 hover:bg-white/[0.05] hover:shadow-[0_30px_60px_-30px_rgb(76_242_119/0.35)] lg:p-7"
          >
            <div className="flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-full border border-signal/30 bg-signal/10 text-sm text-signal tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-mono">
                {step.phase}
              </span>
            </div>
            <h3 className="mt-10 text-3xl font-light transition-colors group-hover:text-brand-green">
              {step.title}
            </h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-mono">{step.body}</p>
          </motion.li>
        ))}
      </ol>

      <dl className="mt-24 grid grid-cols-2 gap-y-12 lg:ml-[16%] lg:grid-cols-4">
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
