"use client";

import { motion } from "motion/react";
import {
  ArrowUpRight,
  BrainCircuit,
  CloudCog,
  DatabaseZap,
  FlaskConical,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { SpotlightCard } from "@/components/site/spotlight-card";
import { cn } from "@/lib/utils";

function NeuralVisual() {
  const layers = [
    [30, 70, 110],
    [20, 55, 90, 125],
    [40, 75, 110],
    [75],
  ];
  const xs = [30, 130, 230, 320];
  const edges: [number, number, number, number][] = [];
  layers.forEach((layer, li) => {
    if (li === layers.length - 1) return;
    layer.forEach((y1) =>
      layers[li + 1].forEach((y2) => edges.push([xs[li], y1, xs[li + 1], y2])),
    );
  });

  return (
    <svg viewBox="0 0 350 150" className="h-full w-full">
      {edges.map(([x1, y1, x2, y2], i) => (
        <motion.line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="url(#nn-grad)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0.15 }}
          whileInView={{ pathLength: 1, opacity: [0.15, 0.6, 0.15] }}
          viewport={{ once: true }}
          transition={{
            pathLength: { duration: 1, delay: i * 0.02 },
            opacity: { duration: 3, delay: i * 0.08, repeat: Infinity },
          }}
        />
      ))}
      {layers.map((layer, li) =>
        layer.map((y) => (
          <motion.circle
            key={`${li}-${y}`}
            cx={xs[li]}
            cy={y}
            r={li === layers.length - 1 ? 9 : 6}
            fill="#0d1524"
            stroke={li === layers.length - 1 ? "#3FCF5C" : "#0EA5E9"}
            strokeWidth="2"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + li * 0.15, type: "spring" }}
          />
        )),
      )}
      <defs>
        <linearGradient id="nn-grad" x1="0" x2="1">
          <stop offset="0" stopColor="#0EA5E9" />
          <stop offset="1" stopColor="#3FCF5C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function BarsVisual() {
  const bars = [40, 65, 50, 85, 60, 95, 75];
  return (
    <div className="flex h-24 items-end gap-1.5">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t-md bg-gradient-to-t from-brand-blue/40 to-brand-teal"
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  );
}

function RegionsVisual() {
  const regions = ["us-east", "eu-west", "ap-south", "sa-east"];
  return (
    <div className="grid grid-cols-2 gap-2">
      {regions.map((r, i) => (
        <div
          key={r}
          className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-2 font-mono text-[0.7rem] text-muted-foreground"
        >
          <span className="relative flex size-2">
            <span
              className="absolute inline-flex size-full animate-ping rounded-full bg-brand-green opacity-60"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
            <span className="relative inline-flex size-2 rounded-full bg-brand-green" />
          </span>
          {r}
        </div>
      ))}
    </div>
  );
}

const STACK = [
  "Next.js", "React Native", "TypeScript", "Python", "Rust", "Go",
  "Kubernetes", "PyTorch", "Postgres", "Kafka", "Terraform", "Swift",
];

type Service = {
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
  visual?: React.ReactNode;
};

const SERVICES: Service[] = [
  {
    icon: BrainCircuit,
    title: "AI & Machine Learning",
    description:
      "From LLM copilots to custom vision and forecasting models — designed, trained, evaluated and shipped to production with MLOps baked in.",
    className: "md:col-span-2",
    visual: (
      <div className="h-36 sm:h-40">
        <NeuralVisual />
      </div>
    ),
  },
  {
    icon: CloudCog,
    title: "Cloud Platforms",
    description:
      "Resilient, multi-region infrastructure on AWS, Azure and GCP with infrastructure-as-code and zero-downtime delivery.",
    visual: <RegionsVisual />,
  },
  {
    icon: DatabaseZap,
    title: "Data Engineering",
    description:
      "Real-time pipelines, lakehouses and analytics that turn raw signals into decisions.",
    visual: <BarsVisual />,
  },
  {
    icon: FlaskConical,
    title: "Scientific Computing",
    description:
      "HPC, simulation and bioinformatics workloads modernised for the cloud — and made 10× faster.",
    visual: (
      <div className="rounded-lg border border-white/5 bg-black/30 p-3 font-mono text-[0.7rem] leading-relaxed text-muted-foreground">
        <span className="text-brand-sky">simulate</span>(molecule,{" "}
        <span className="text-brand-green">steps</span>=1e6)
        <br />
        <span className="text-white/30">→ 4.2s on 128 GPUs</span>
      </div>
    ),
  },
  {
    icon: ShieldCheck,
    title: "Security & Compliance",
    description:
      "SOC 2, HIPAA and GDPR-ready architectures with security reviewed at every pull request.",
    visual: (
      <div className="flex flex-wrap gap-2">
        {["SOC 2", "HIPAA", "GDPR", "ISO 27001"].map((b) => (
          <span key={b} className="rounded-full border border-brand-green/30 bg-brand-green/10 px-2.5 py-1 text-[0.7rem] text-brand-green">
            {b}
          </span>
        ))}
      </div>
    ),
  },
  {
    icon: Smartphone,
    title: "Product, Web & Mobile",
    description:
      "Beautiful, accessible product experiences — strategy, UX/UI and engineering under one roof, on every screen.",
    className: "md:col-span-3",
    visual: (
      <div className="mask-fade-x flex overflow-hidden [--marquee-duration:30s]">
        <div className="flex shrink-0 animate-marquee gap-2 pr-2">
          {[...STACK, ...STACK].map((t, i) => (
            <span
              key={i}
              aria-hidden={i >= STACK.length}
              className="shrink-0 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    ),
  },
];

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              One partner for the <span className="text-gradient">entire stack</span>
            </>
          }
          description="We combine scientific rigor with product craft. Six disciplines, one unified team that owns outcomes end-to-end."
        />

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08} className={cn(s.className)}>
              <SpotlightCard className="h-full">
                <div className="flex h-full flex-col gap-6 p-6 sm:p-7">
                  <div className="flex items-start justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-brand-blue/30 to-brand-green/20 text-white">
                      <s.icon className="size-5" />
                    </span>
                    <ArrowUpRight className="size-5 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {s.description}
                    </p>
                  </div>
                  {s.visual && <div className="mt-auto">{s.visual}</div>}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
