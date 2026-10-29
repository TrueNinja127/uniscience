"use client";

import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { TraceSection } from "@/components/site/trace";
import { Figure } from "@/components/site/figure";
import { SectionLabel } from "@/components/site/section-label";
import labTeam from "@/assets/photos/lab-team.jpg";

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
    body: "Clean architecture, automated testing and observability by default: software that survives contact with real users and real data.",
  },
  {
    title: ["Seamless", "integration"],
    body: "We connect to your instruments, LIMS, ERPs and clouds, extending the systems you rely on instead of replacing them.",
  },
];

export function Approach() {
  return (
    <TraceSection id="approach" from={50} to={47.5} jog={40} innerClassName="py-24 lg:py-32">
      <div className="flex flex-col gap-20 lg:flex-row lg:gap-0">
        <div className="lg:w-[44%]">
          <div className="lg:sticky lg:top-32">
          <SectionLabel index={1} label="Approach" />
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="display mt-6 text-[clamp(2.5rem,4.8vw,4.4rem)]"
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
              className="group mt-12 inline-flex w-max items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] py-2 pr-5 pl-2 text-sm text-foreground/80 backdrop-blur-md transition-colors hover:border-signal/50 hover:text-foreground"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-signal/15"><ArrowDown className="size-4 text-signal transition-transform group-hover:translate-y-0.5" /></span>
              Scroll to explore
            </motion.a>
          </div>
        </div>

        <div className="lg:ml-auto lg:w-[48%]">
        <Figure
          src={labTeam}
          alt="Two scientists in lab coats working at computers in a research laboratory"
          index={1}
          caption="Research and engineering at one bench"
          aspect="aspect-[16/10]"
          className="mb-20"
        />
        <div className="grid gap-x-12 gap-y-16 sm:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.body}
              initial={{ opacity: 0, y: 70, rotateX: 26, transformPerspective: 1200 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.12, ease }}
              className={i % 2 === 1 ? "sm:mt-24" : ""}
            >
              <h3 className="text-[1.7rem] leading-tight font-light text-brand-green">
                {p.title[0]}
                <br />
                {p.title[1]}
              </h3>
              <p className="mt-6 text-[0.95rem] leading-relaxed text-mono">{p.body}</p>
            </motion.div>
          ))}
        </div>
        </div>
      </div>
    </TraceSection>
  );
}
