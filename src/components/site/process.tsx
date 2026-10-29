"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Compass, FlaskConical, Hammer, Rocket } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";

const STEPS = [
  {
    icon: Compass,
    phase: "Week 1–2",
    title: "Discover",
    description:
      "We immerse in your domain, data and users — then define the outcomes, risks and architecture that matter.",
  },
  {
    icon: FlaskConical,
    phase: "Week 3–4",
    title: "Experiment",
    description:
      "Hypotheses become working prototypes. We validate models, UX and feasibility with real data before committing.",
  },
  {
    icon: Hammer,
    phase: "Month 2+",
    title: "Engineer",
    description:
      "Senior squads build in two-week increments with CI/CD, automated tests and demos you can click every sprint.",
  },
  {
    icon: Rocket,
    phase: "Ongoing",
    title: "Scale",
    description:
      "We launch, observe and optimise — then hand over or keep evolving the product alongside your team.",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="process" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="How we work"
          title={
            <>
              A scientific method for <span className="text-gradient">building software</span>
            </>
          }
          description="Transparent, evidence-driven and fast. You always know what we're building, why, and what's next."
        />

        <div ref={ref} className="relative mt-16">
          {/* Track + progress */}
          <div className="absolute top-2 bottom-2 left-6 w-px bg-white/10 sm:left-1/2" />
          <motion.div
            style={{ scaleY }}
            className="absolute top-2 bottom-2 left-6 w-px origin-top bg-gradient-to-b from-brand-sky via-brand-teal to-brand-green sm:left-1/2"
          />

          <ol className="relative space-y-10 sm:space-y-14">
          {STEPS.map((step, i) => {
            const right = i % 2 === 1;
            return (
              <li
                key={step.title}
                className="relative grid grid-cols-[3rem_1fr] gap-4 sm:grid-cols-[1fr_3rem_1fr] sm:gap-8"
              >
                <div className="relative z-10 flex justify-center sm:col-start-2 sm:row-start-1">
                  <span className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-[#0e1828] text-brand-teal shadow-[0_0_30px_-8px] shadow-brand-teal/60">
                    <step.icon className="size-5" />
                  </span>
                </div>
                <Reveal
                  y={16}
                  className={
                    "rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:row-start-1 sm:p-6 " +
                    (right ? "sm:col-start-3" : "sm:col-start-1 sm:text-right")
                  }
                >
                  <span className="font-mono text-xs tracking-wider text-brand-sky uppercase">
                    {String(i + 1).padStart(2, "0")} · {step.phase}
                  </span>
                  <h3 className="mt-2 font-heading text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </Reveal>
              </li>
            );
          })}
          </ol>
        </div>
      </div>
    </section>
  );
}
