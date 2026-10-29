"use client";

import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { TraceSection } from "@/components/site/trace";

const ease = [0.22, 1, 0.36, 1] as const;

const PRINCIPLES = [
  {
    title: ["Built by scientists,", "for scientists"],
    body: "Our teams pair PhD researchers with senior engineers, so every product is designed by people who understand both the science and the software.",
  },
  {
    title: ["Domain-specific", "intelligence"],
    body: "We encode decades of research practice, regulation and real lab workflows into the models, pipelines and tools we build.",
  },
  {
    title: ["Product-grade", "engineering"],
    body: "Clean architecture, automated testing and observability by default — software that survives contact with real users and real data.",
  },
  {
    title: ["Seamless", "integration"],
    body: "We connect to your instruments, LIMS, ERPs and clouds, extending the systems you rely on instead of replacing them.",
  },
];

export function Approach() {
  return (
    <TraceSection id="approach" from={50} to={47.5} jog={40} innerClassName="py-28 lg:py-40">
      <div className="flex flex-col gap-20 lg:flex-row lg:gap-0">
        <div className="lg:w-[44%]">
          <div className="lg:sticky lg:top-32">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="display text-[clamp(2.75rem,5.6vw,5rem)]"
          >
            {["One hypothesis.", "One team.", "Endless impact."].map((t, i) => (
              <span key={t} className="block overflow-hidden">
                <motion.span
                  className={i === 2 ? "block text-brand-green" : "block text-dim"}
                  variants={{ hidden: { y: "100%" }, show: { y: 0 } }}
                  transition={{ duration: 0.9, delay: i * 0.12, ease }}
                >
                  {t}
                </motion.span>
              </span>
            ))}
          </motion.h2>
            <motion.a
              href="#services"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-14 flex w-max flex-col items-center gap-2 rounded-md border border-signal/70 px-6 py-4 font-mono text-[0.7rem] text-mono transition-colors hover:bg-signal/10 hover:text-foreground"
            >
              <ArrowDown className="size-5 text-signal" />
              Scroll to explore
            </motion.a>
          </div>
        </div>

        <div className="grid gap-x-12 gap-y-16 sm:grid-cols-2 lg:ml-auto lg:w-[48%]">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.body}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.12, ease }}
              className={i % 2 === 1 ? "sm:mt-24" : ""}
            >
              <h3 className="text-[1.7rem] leading-tight font-light text-brand-green">
                {p.title[0]}
                <br />
                {p.title[1]}
              </h3>
              <p className="mt-6 font-mono text-sm leading-relaxed text-mono">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </TraceSection>
  );
}
