"use client";

import { motion } from "motion/react";
import { ArrowDown, Check, Play } from "lucide-react";
import { Logo, LogoMark } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { HeroScene } from "@/components/site/hero-scene";

const ease = [0.22, 1, 0.36, 1] as const;

const CHECKLIST = [
  "Prototype AI models on your own data",
  "Build scalable data & cloud platforms",
  "Ship web and mobile products",
  "Validate every release with domain experts",
  "Integrate with existing lab & business systems",
];

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** The horizon the trace starts from: a line with a raised platform and the mark on top. */
function Surface() {
  return (
    <div className="relative mx-auto mt-16 hidden h-36 max-w-7xl px-5 sm:px-8 lg:block">
      <svg
        aria-hidden
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        className="absolute inset-x-5 top-0 h-24 w-[calc(100%-2.5rem)] overflow-visible sm:inset-x-8 sm:w-[calc(100%-4rem)]"
      >
        <motion.path
          d="M0 60 H370 L392 34 H608 L630 60 H1000"
          fill="none"
          stroke="rgb(255 255 255 / 0.55)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, delay: 0.9, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute top-[31px] left-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8, ease }}
        >
          <LogoMark className="size-12 drop-shadow-[0_0_18px_rgba(76,242,119,0.45)]" sizes="48px" />
        </motion.div>
      </div>
      {/* First drop of the trace, from the platform into the page */}
      <motion.div
        className="glow-signal absolute top-[33px] left-1/2 w-[1.5px] -translate-x-1/2 origin-top bg-signal"
        style={{ height: "calc(100% - 33px)" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 2.2, duration: 0.8, ease: "easeIn" }}
      />
      <div className="absolute top-[46px] right-[calc(50%+22px)] text-right font-mono text-[0.68rem] leading-tight tracking-[0.18em] uppercase">
        Start
        <br />
        experiment
      </div>
      <motion.div
        className="absolute top-[44px] left-[calc(50%+26px)] text-mono"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="size-5" strokeWidth={1.25} />
      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 sm:pt-40">
      <HeroScene />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <h1 className="display max-w-4xl text-[clamp(2.9rem,7.6vw,6.6rem)] normal-case">
          <Line delay={0.15}>Complex science.</Line>
          <Line delay={0.3}>
            Engineered into <span className="text-gradient">software.</span>
          </Line>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease }}
          className="mt-6 max-w-2xl text-xl leading-snug text-foreground/85 sm:text-2xl"
        >
          AI, data and cloud platforms for research-driven companies — designed by
          scientists, built by engineers, in one unified team.
        </motion.p>

        <div className="mt-14 grid items-end gap-12 lg:mt-20 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease }}
            className="flex flex-col items-start gap-8"
          >
            <Logo priority className="h-14 sm:h-[4.5rem]" />
            <div className="flex flex-wrap gap-3">
              <Button variant="signal" size="xl" asChild>
                <a href="#contact">Start</a>
              </Button>
              <Button variant="signal-outline" size="xl" asChild>
                <a href="#approach">
                  <Play className="fill-current" /> How we work
                </a>
              </Button>
            </div>
          </motion.div>

          <div className="font-mono lg:justify-self-end">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="flex gap-4 text-base leading-relaxed tracking-[0.06em] uppercase sm:text-lg"
            >
              <Play className="mt-1.5 size-4 shrink-0 fill-signal text-signal" />
              <span className="max-w-md">
                Turn your research into production software, guided by real scientists
              </span>
            </motion.p>
            <ul className="mt-6 space-y-2.5 pl-8 text-[0.82rem] text-foreground/80">
              {CHECKLIST.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + i * 0.12, duration: 0.5, ease }}
                  className="flex items-center gap-3"
                >
                  <Check className="size-4 shrink-0 text-signal" />
                  {item}
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + CHECKLIST.length * 0.12, duration: 0.5, ease }}
                className="flex items-center gap-3 font-bold text-foreground"
              >
                <Check className="size-4 shrink-0 text-signal" />
                Scale from pilot to global production
              </motion.li>
            </ul>
          </div>
        </div>
      </div>

      <Surface />
    </section>
  );
}
