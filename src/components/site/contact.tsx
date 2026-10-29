"use client";

import Image from "next/image";
import { motion } from "motion/react";
import serverRacks from "@/assets/photos/server-racks.jpg";
import { ArrowUpRight, Mail } from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { TraceSection } from "@/components/site/trace";
import { SectionLabel } from "@/components/site/section-label";

const ease = [0.22, 1, 0.36, 1] as const;

export function Contact() {
  return (
    <TraceSection
      id="contact"
      from={10}
      to={50}
      jog={20}
      slope={0.45}
      end={150}
      drawOffset={["start 55%", "end 85%"]}
      className="overflow-hidden"
      background={
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Image
            src={serverRacks}
            alt=""
            fill
            placeholder="blur"
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/40 to-ink" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--color-ink)_80%)]" />
        </div>
      }
      innerClassName="pt-[22rem] pb-[150px] lg:pt-[24rem]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-[520px] w-[900px] -translate-x-1/2 translate-y-1/2 rounded-full bg-signal/[0.12] blur-[130px]"
      />

      <div className="relative flex flex-col gap-12 pb-32 lg:flex-row lg:gap-0">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease }}
          className="display text-[clamp(3rem,6vw,5.5rem)] lg:w-[45%] lg:text-right"
        >
          <span className="text-dim">Ready to run</span>
          <br />
          <span className="text-dim">your next</span>
          <br />
          <span className="text-gradient">experiment?</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="flex flex-col justify-end gap-8 lg:ml-auto lg:w-[45%]"
        >
          <SectionLabel index={8} label="Contact" />
          <p className="max-w-md font-mono text-sm leading-relaxed text-foreground/80">
            Tell us about your challenge. In a free 30-minute session our principal
            engineers will map out an approach, timeline and budget — no strings attached.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="signal" size="xl" asChild>
              <a href="mailto:hello@uniscience.io?subject=New%20project">
                Start a project <ArrowUpRight />
              </a>
            </Button>
            <Button variant="signal-outline" size="xl" asChild>
              <a href="mailto:hello@uniscience.io?subject=Book%20a%20call">Book a call</a>
            </Button>
          </div>
          <a
            href="mailto:hello@uniscience.io"
            className="flex w-max items-center gap-3 font-mono text-sm text-mono transition-colors hover:text-signal"
          >
            <Mail className="size-4" /> hello@uniscience.io
          </a>
        </motion.div>
      </div>

      {/* End of the trace: the target */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 0.8, ease }}
        className="absolute top-[calc(100%-150px)] left-[-26px] flex flex-col items-start gap-3 lg:left-1/2 lg:-translate-x-1/2 lg:items-center"
      >
        <span className="relative flex size-16 items-center justify-center">
          <motion.span
            className="absolute inset-0 rounded-full border border-signal/60"
            animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
          <LogoMark className="size-14 drop-shadow-[0_0_16px_rgba(76,242,119,0.55)]" sizes="56px" />
        </span>
        <span className="font-mono text-sm whitespace-nowrap text-signal">v1.0 · Shipped</span>
      </motion.div>
    </TraceSection>
  );
}
