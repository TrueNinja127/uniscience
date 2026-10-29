"use client";

import { motion } from "motion/react";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/brand/logo";
import { Reveal } from "@/components/motion/reveal";

export function Cta() {
  return (
    <section id="contact" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/10">
        <div className="absolute inset-0 bg-brand-gradient opacity-90" />
        <div className="bg-grid absolute inset-0 opacity-40 mix-blend-overlay" />
        <motion.div
          aria-hidden
          className="absolute -top-24 -right-24 opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <LogoMark className="h-[420px] [&_path]:stroke-white" />
        </motion.div>

        <div className="relative flex flex-col items-start gap-8 px-6 py-14 sm:px-12 sm:py-20 md:max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
            Let&apos;s turn your science into software people love.
          </h2>
          <p className="text-base text-white/85 sm:text-lg">
            Tell us about your challenge. In a free 30-minute session our
            principal engineers will map out an approach, timeline and budget.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="xl"
              asChild
              className="bg-white text-brand-ink shadow-xl hover:bg-white/90"
            >
              <a href="mailto:hello@uniscience.io">
                Start a project <ArrowRight />
              </a>
            </Button>
            <Button
              size="xl"
              variant="outline"
              asChild
              className="border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white"
            >
              <a href="mailto:hello@uniscience.io?subject=Book%20a%20call">
                <CalendarDays /> Book a call
              </a>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
