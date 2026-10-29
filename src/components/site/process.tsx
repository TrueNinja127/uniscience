"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "motion/react";
import { Logo } from "@/components/brand/logo";
import { TraceSection } from "@/components/site/trace";

const ease = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  {
    phase: "Week 1–2",
    title: "Discover",
    body: "We immerse in your domain, data and users, then define outcomes, risks and the target architecture.",
  },
  {
    phase: "Week 3–5",
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
    body: "We launch, observe and optimise — then hand over, or keep evolving the product with your team.",
  },
];

// Placeholder figures — replace with real company numbers.
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
      tone="light"
      from={56}
      to={10}
      jog={30}
      slope={0.42}
      innerClassName="pt-24 pb-32 lg:pt-28 lg:pb-40"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease }}
        className="lg:ml-[62%]"
      >
        <Logo variant="dark" className="h-10" />
        <h2 className="display mt-10 text-[clamp(2.75rem,5vw,4.5rem)]">
          <span className="text-ink/35">From hypothesis</span>
          <br />
          to production
        </h2>
      </motion.div>

      <ol className="mt-24 grid gap-px bg-ink/10 sm:grid-cols-2 lg:mt-32 lg:ml-[16%] lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <motion.li
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease }}
            className="group bg-[#f3f5f2] p-6 transition-colors hover:bg-white lg:p-8"
          >
            <p className="font-mono text-xs tracking-[0.16em] text-ink/50 uppercase">
              <span className="text-[#139a3a]">{String(i + 1).padStart(2, "0")}</span> · {step.phase}
            </p>
            <h3 className="mt-8 text-3xl font-light">{step.title}</h3>
            <p className="mt-4 font-mono text-[0.82rem] leading-relaxed text-ink/65">{step.body}</p>
            <span className="mt-8 block h-px w-10 bg-ink/20 transition-all duration-500 group-hover:w-full group-hover:bg-[#139a3a]" />
          </motion.li>
        ))}
      </ol>

      <dl className="mt-24 grid grid-cols-2 gap-y-12 lg:ml-[16%] lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col-reverse lg:pl-8">
            <dt className="mt-3 font-mono text-xs tracking-[0.16em] text-ink/55 uppercase">
              {s.label}
            </dt>
            <dd className="display text-6xl font-light sm:text-7xl">
              <Counter to={s.value} suffix={s.suffix} />
            </dd>
          </div>
        ))}
      </dl>
    </TraceSection>
  );
}
