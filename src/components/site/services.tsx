"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { SectionLabel } from "@/components/site/section-label";
import { TraceSection } from "@/components/site/trace";
import { cn } from "@/lib/utils";
import Image from "next/image";
import devTeam from "@/assets/photos/dev-team.jpg";
import serverRacks from "@/assets/photos/server-racks.jpg";
import labMicroscopy from "@/assets/photos/lab-microscopy.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

const SERVICES = [
  {
    name: "AI & Machine Learning",
    body: "Custom models for prediction, vision and optimisation. Trained on your data, evaluated against your scientific baselines and deployed with full MLOps.",
    tags: ["PyTorch", "MLOps", "Evaluation"],
    photo: devTeam,
  },
  {
    name: "LLM Agents & Copilots",
    body: "Research assistants and workflow agents grounded in your literature, protocols and data, with citations, guardrails and human review built in.",
    tags: ["RAG", "Agents", "Guardrails"],
    photo: devTeam,
  },
  {
    name: "Scientific Computing & HPC",
    body: "Simulation, bioinformatics and numerical workloads modernised for cloud GPUs and clusters, typically 10× faster and far cheaper to run.",
    tags: ["CUDA", "Slurm", "Rust"],
    photo: serverRacks,
  },
  {
    name: "Data Platforms & Pipelines",
    body: "Lakehouses, ELT and real-time streams that turn instrument output and operational data into analysis-ready, governed datasets.",
    tags: ["Lakehouse", "Kafka", "dbt"],
    photo: serverRacks,
  },
  {
    name: "Cloud & DevOps",
    body: "Multi-region infrastructure-as-code on AWS, Azure and GCP with zero-downtime delivery, cost controls and 24/7 observability.",
    tags: ["Kubernetes", "Terraform", "FinOps"],
    photo: serverRacks,
  },
  {
    name: "Web & Mobile Products",
    body: "Fast, accessible applications that make complex science feel simple, from internal lab tools to customer-facing platforms.",
    tags: ["Next.js", "React Native", "Design systems"],
    photo: devTeam,
  },
  {
    name: "Lab & Device Integration",
    body: "Connect instruments, sensors, LIMS and ELNs into one data fabric with secure edge gateways and automated capture.",
    tags: ["IoT", "LIMS", "Edge"],
    photo: labMicroscopy,
  },
  {
    name: "Security & Compliance",
    body: "SOC 2, HIPAA, GxP and GDPR-ready architectures, with security reviewed at every pull request and audit trails by design.",
    tags: ["SOC 2", "GxP", "HIPAA"],
    photo: serverRacks,
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
            className="overflow-hidden text-[0.95rem] leading-relaxed text-mono lg:hidden"
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
    <TraceSection id="services" from={47.5} to={54} jog={60} innerClassName="py-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 70, rotateX: 26, transformPerspective: 1200 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease }}
        className="flex flex-col gap-10 lg:flex-row lg:items-end"
      >
        <div className="lg:w-[44%]">
          <SectionLabel index={2} label="Capabilities" />
          <h2 className="display mt-6 text-[clamp(2.4rem,4.4vw,4rem)]">
            <span className="text-dim">What we</span>
            <br />
            build
          </h2>
        </div>
        <p className="max-w-md text-[0.95rem] leading-relaxed text-mono lg:ml-auto lg:w-[38%]">
          Eight disciplines under one roof. Every squad combines domain scientists,
          ML engineers and product designers, so nothing gets lost in translation.
        </p>
      </motion.div>

      <div className="mt-16 flex flex-col gap-12 lg:mt-24 lg:flex-row">
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
          <div className="sticky top-[18vh] min-h-64">
            <div className="relative mb-8 aspect-[16/10] overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={s.photo.src}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease }}
                  className="absolute inset-0"
                >
                  <Image
                    src={s.photo}
                    alt=""
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 38vw, 0px"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease }}
              >
                <p className="text-xs tracking-[0.2em] text-signal">
                  {String(active + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-3xl font-light text-brand-green">{s.name}</h3>
                <p className="mt-5 text-[0.95rem] leading-relaxed text-mono">{s.body}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-foreground/75"
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
