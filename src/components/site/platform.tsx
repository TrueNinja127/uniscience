"use client";

import { motion } from "motion/react";
import {
  Boxes,
  BrainCircuit,
  Check,
  Cloud,
  Cpu,
  Database,
  GitBranch,
  Lock,
  Workflow,
} from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";

const RINGS = [
  { radius: 120, duration: 30, icons: [BrainCircuit, Database, Cloud] },
  { radius: 200, duration: 45, icons: [Cpu, GitBranch, Lock, Workflow, Boxes] },
];

function Orbit() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      <div className="absolute inset-0 rounded-full bg-brand-gradient opacity-20 blur-[90px]" />
      {RINGS.map((ring, ri) => {
        const size = ring.radius * 2;
        return (
          <motion.div
            key={ri}
            className="absolute top-1/2 left-1/2 rounded-full border border-dashed border-white/10"
            style={{
              width: `${(size / 460) * 100}%`,
              height: `${(size / 460) * 100}%`,
              x: "-50%",
              y: "-50%",
            }}
            animate={{ rotate: ri % 2 ? -360 : 360 }}
            transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
          >
            {ring.icons.map((Icon, i) => {
              const angle = (i / ring.icons.length) * Math.PI * 2;
              return (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${50 + 50 * Math.cos(angle)}%`,
                    top: `${50 + 50 * Math.sin(angle)}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.div
                    animate={{ rotate: ri % 2 ? 360 : -360 }}
                    transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
                    className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-[#0e1828] text-brand-sky shadow-lg sm:size-12"
                  >
                    <Icon className="size-5" />
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        );
      })}

      <div className="absolute top-1/2 left-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl border border-white/10 bg-[#0e1828] shadow-[0_0_80px_-10px] shadow-brand-teal/60 sm:size-28">
        <motion.div
          className="absolute inset-0 rounded-3xl border border-brand-teal/40"
          animate={{ scale: [1, 1.35], opacity: [0.8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />
        <LogoMark className="h-12 sm:h-14" />
      </div>
    </div>
  );
}

const POINTS = [
  "Unified data layer across labs, devices and clouds",
  "Model registry, evaluation and one-click deployment",
  "Observability with lineage, drift and cost insights",
  "Enterprise SSO, audit trails and fine-grained access",
];

export function Platform() {
  return (
    <section id="platform" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Uniscience Fusion"
            title={
              <>
                Every system, <span className="text-gradient">unified</span> in
                one platform
              </>
            }
            description="Fusion is the accelerator behind every Uniscience engagement — a battle-tested core that connects your data, models and infrastructure so teams ship in weeks, not quarters."
          />
          <ul className="mt-8 space-y-3">
            {POINTS.map((p, i) => (
              <Reveal key={p} delay={0.1 + i * 0.08}>
                <li className="flex items-start gap-3 text-sm sm:text-base">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-gradient">
                    <Check className="size-3 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-muted-foreground">{p}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal delay={0.15}>
          <Orbit />
        </Reveal>
      </div>
    </section>
  );
}
