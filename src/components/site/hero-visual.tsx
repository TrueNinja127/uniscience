"use client";

import { motion } from "motion/react";
import {
  Activity,
  BrainCircuit,
  CheckCircle2,
  Cloud,
  Database,
  LayoutDashboard,
  Settings,
  Zap,
} from "lucide-react";
import { LogoMark } from "@/components/brand/logo";

const ease = [0.22, 1, 0.36, 1] as const;

const CHART_LINE =
  "M0 150 C40 140 60 120 100 118 C140 116 160 132 200 120 C240 108 260 70 300 72 C340 74 360 96 400 84 C440 72 470 40 520 30 C560 22 580 34 600 28";

const KPIS = [
  { label: "Model accuracy", value: "98.7%", delta: "+2.4%" },
  { label: "Inference p95", value: "42ms", delta: "-31%" },
  { label: "Pipelines live", value: "1,284", delta: "+128" },
];

const JOBS = [
  { name: "genomics-embeddings", progress: 92, icon: BrainCircuit },
  { name: "lakehouse-sync", progress: 68, icon: Database },
  { name: "edge-deploy-eu", progress: 41, icon: Cloud },
];

export function HeroVisual() {
  return (
    <div className="relative mx-auto max-w-5xl">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1322]/90 text-left shadow-2xl ring-1 ring-white/5 backdrop-blur-xl">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <div className="mx-auto hidden rounded-md bg-white/5 px-3 py-1 font-mono text-[0.7rem] text-muted-foreground sm:block">
            app.uniscience.io/fusion
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden w-48 shrink-0 flex-col gap-1 border-r border-white/5 p-3 md:flex">
            <div className="mb-3 flex items-center gap-2 px-2 py-1">
              <LogoMark className="h-5" />
              <span className="font-heading text-sm font-semibold">Fusion</span>
            </div>
            {[
              { icon: LayoutDashboard, label: "Overview", active: true },
              { icon: BrainCircuit, label: "Models" },
              { icon: Database, label: "Datasets" },
              { icon: Activity, label: "Monitoring" },
              { icon: Settings, label: "Settings" },
            ].map(({ icon: Icon, label, active }) => (
              <div
                key={label}
                className={
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs " +
                  (active
                    ? "bg-white/[0.07] text-foreground"
                    : "text-muted-foreground")
                }
              >
                <Icon className="size-3.5" />
                {label}
              </div>
            ))}
          </aside>

          {/* Main */}
          <div className="flex-1 space-y-4 p-4 sm:p-5">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {KPIS.map((kpi, i) => (
                <motion.div
                  key={kpi.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + i * 0.1, duration: 0.6, ease }}
                  className="rounded-xl border border-white/5 bg-white/[0.03] p-2.5 sm:p-3"
                >
                  <p className="truncate text-[0.62rem] text-muted-foreground sm:text-xs">
                    {kpi.label}
                  </p>
                  <p className="mt-1 font-heading text-base font-semibold sm:text-xl">
                    {kpi.value}
                  </p>
                  <p className="mt-0.5 text-[0.62rem] text-brand-green sm:text-xs">
                    {kpi.delta}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr]">
              {/* Chart */}
              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium">Throughput · last 30 days</p>
                  <span className="flex items-center gap-1 rounded-full bg-brand-green/10 px-2 py-0.5 text-[0.65rem] text-brand-green">
                    <span className="size-1.5 animate-pulse rounded-full bg-brand-green" />
                    Live
                  </span>
                </div>
                <svg viewBox="0 0 600 170" className="mt-3 h-36 w-full sm:h-44" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="hv-line" x1="0" x2="1">
                      <stop offset="0" stopColor="#0B4FE0" />
                      <stop offset="0.5" stopColor="#14B8A6" />
                      <stop offset="1" stopColor="#3FCF5C" />
                    </linearGradient>
                    <linearGradient id="hv-fill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor="#14B8A6" stopOpacity="0.35" />
                      <stop offset="1" stopColor="#14B8A6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[40, 80, 120].map((y) => (
                    <line key={y} x1="0" x2="600" y1={y} y2={y} stroke="white" strokeOpacity="0.05" />
                  ))}
                  <motion.path
                    d={`${CHART_LINE} L600 170 L0 170 Z`}
                    fill="url(#hv-fill)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                  />
                  <motion.path
                    d={CHART_LINE}
                    fill="none"
                    stroke="url(#hv-line)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.4, duration: 1.8, ease: "easeInOut" }}
                  />
                  <motion.circle
                    cx="520"
                    cy="30"
                    r="5"
                    fill="#3FCF5C"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.4, 1] }}
                    transition={{ delay: 3, duration: 0.5 }}
                  />
                </svg>
              </div>

              {/* Jobs */}
              <div className="hidden rounded-xl border border-white/5 bg-white/[0.03] p-4 sm:block">
                <p className="text-xs font-medium">Running workloads</p>
                <ul className="mt-4 space-y-4">
                  {JOBS.map(({ name, progress, icon: Icon }, i) => (
                    <li key={name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-[0.7rem]">
                        <span className="flex items-center gap-1.5 font-mono text-muted-foreground">
                          <Icon className="size-3" /> {name}
                        </span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          className="h-full rounded-full bg-brand-gradient"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ delay: 1.6 + i * 0.15, duration: 1.4, ease }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating cards */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
        transition={{
          opacity: { delay: 2.2, duration: 0.6 },
          x: { delay: 2.2, duration: 0.6, ease },
          y: { delay: 2.8, duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute top-1/3 -left-6 hidden items-center gap-3 rounded-xl border border-white/10 bg-[#0d1626]/90 p-3 pr-4 text-left shadow-xl backdrop-blur-xl lg:flex"
      >
        <span className="flex size-9 items-center justify-center rounded-lg bg-brand-green/15 text-brand-green">
          <CheckCircle2 className="size-5" />
        </span>
        <div>
          <p className="text-xs font-medium">Deployment succeeded</p>
          <p className="text-[0.7rem] text-muted-foreground">v2.14 · 3 regions</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 2.5, duration: 0.6 },
          x: { delay: 2.5, duration: 0.6, ease },
          y: { delay: 3.1, duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute -right-6 bottom-12 hidden items-center gap-3 rounded-xl border border-white/10 bg-[#0d1626]/90 p-3 pr-4 text-left shadow-xl backdrop-blur-xl lg:flex"
      >
        <span className="flex size-9 items-center justify-center rounded-lg bg-brand-sky/15 text-brand-sky">
          <Zap className="size-5" />
        </span>
        <div>
          <p className="text-xs font-medium">Costs reduced 38%</p>
          <p className="text-[0.7rem] text-muted-foreground">Auto-scaling insight</p>
        </div>
      </motion.div>
    </div>
  );
}
