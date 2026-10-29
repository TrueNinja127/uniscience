"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { LogoMark } from "@/components/brand/logo";
import { TraceSection } from "@/components/site/trace";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const SERVICES = [
  {
    name: "AI & Machine Learning",
    body: "Custom models for prediction, vision and optimisation — trained on your data, evaluated against your scientific baselines and deployed with full MLOps.",
    tags: ["PyTorch", "MLOps", "Evaluation"],
  },
  {
    name: "LLM Agents & Copilots",
    body: "Research assistants and workflow agents grounded in your literature, protocols and data, with citations, guardrails and human review built in.",
    tags: ["RAG", "Agents", "Guardrails"],
  },
  {
    name: "Scientific Computing & HPC",
    body: "Simulation, bioinformatics and numerical workloads modernised for cloud GPUs and clusters — typically 10× faster and far cheaper to run.",
    tags: ["CUDA", "Slurm", "Rust"],
  },
  {
    name: "Data Platforms & Pipelines",
    body: "Lakehouses, ELT and real-time streams that turn instrument output and operational data into analysis-ready, governed datasets.",
    tags: ["Lakehouse", "Kafka", "dbt"],
  },
  {
    name: "Cloud & DevOps",
    body: "Multi-region infrastructure-as-code on AWS, Azure and GCP with zero-downtime delivery, cost controls and 24/7 observability.",
    tags: ["Kubernetes", "Terraform", "FinOps"],
  },
  {
    name: "Web & Mobile Products",
    body: "Fast, accessible applications that make complex science feel simple — from internal lab tools to customer-facing platforms.",
    tags: ["Next.js", "React Native", "Design systems"],
  },
  {
    name: "Lab & Device Integration",
    body: "Connect instruments, sensors, LIMS and ELNs into one data fabric with secure edge gateways and automated capture.",
    tags: ["IoT", "LIMS", "Edge"],
  },
  {
    name: "Security & Compliance",
    body: "SOC 2, HIPAA, GxP and GDPR-ready architectures, with security reviewed at every pull request and audit trails by design.",
    tags: ["SOC 2", "GxP", "HIPAA"],
  },
];

function ServiceItem({
  index,
  name,
  body,
  active,
  onActive,
}: {
  index: number;
  name: string;
  body: string;
  active: boolean;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inCenter = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inCenter) onActive(index);
  }, [inCenter, index, onActive]);

  return (
    <li ref={ref}>
      <button
        onClick={() => onActive(index)}
        className={cn(
          "w-full py-4 text-left text-[clamp(1.6rem,2.6vw,2.4rem)] leading-tight font-light transition-colors duration-500 lg:text-right",
          active ? "text-foreground" : "text-dim hover:text-foreground/70",
        )}
      >
        <span className={cn("transition-colors duration-500", active && "text-gradient")}>
          {name}
        </span>
      </button>
      {/* Mobile: details expand inline instead of the sticky side panel */}
      <AnimatePresence initial={false}>
        {active && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden font-mono text-sm leading-relaxed text-mono lg:hidden"
          >
            <span className="block pb-4">{body}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </li>
  );
}

export function Services() {
  const [active, setActive] = useState(0);
  const s = SERVICES[active];

  return (
    <TraceSection id="services" from={47.5} to={54} jog={60} innerClassName="py-28 lg:py-36">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease }}
        className="flex items-center gap-6 lg:w-[46%]"
      >
        <LogoMark className="size-16 sm:size-20" sizes="80px" />
        <h2 className="display text-[clamp(2.75rem,5vw,4.5rem)] text-dim">
          What we
          <br />
          build
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-col gap-12 lg:mt-32 lg:flex-row">
        <ol className="lg:w-[50%] lg:pr-10">
          {SERVICES.map((svc, i) => (
            <ServiceItem
              key={svc.name}
              index={i}
              name={svc.name}
              body={svc.body}
              active={i === active}
              onActive={setActive}
            />
          ))}
        </ol>

        <div className="hidden lg:ml-auto lg:block lg:w-[38%]">
          <div className="sticky top-[38vh] min-h-64">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease }}
              >
                <p className="font-mono text-xs tracking-[0.2em] text-signal">
                  {String(active + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-3xl font-light text-brand-green">{s.name}</h3>
                <p className="mt-5 font-mono text-sm leading-relaxed text-mono">{s.body}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li
                      key={t}
                      className="border border-white/10 px-2.5 py-1 font-mono text-[0.7rem] text-foreground/70"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </TraceSection>
  );
}
