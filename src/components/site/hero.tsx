"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroVisual } from "@/components/site/hero-visual";

const ease = [0.22, 1, 0.36, 1] as const;

const HEADLINE = ["Where", "science", "becomes"];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Cursor-follow spotlight
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mx}px ${my}px, rgba(20,184,166,0.12), transparent 70%)`;

  // Product preview tilts flat as you scroll into it
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.4], [22, 0]), {
    stiffness: 120,
    damping: 24,
  });
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.92, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.9]);

  return (
    <section
      ref={sectionRef}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - rect.left);
        my.set(e.clientY - rect.top);
      }}
      className="relative isolate overflow-hidden pt-36 pb-24 sm:pt-44"
    >
      {/* Background layers */}
      <div className="bg-grid mask-radial absolute inset-0 -z-10" />
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: spotlight }}
      />
      <motion.div
        aria-hidden
        className="absolute -top-40 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-brand-blue/30 blur-[120px]"
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute top-40 -right-40 -z-10 h-[420px] w-[420px] rounded-full bg-brand-green/20 blur-[110px]"
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute top-72 -left-40 -z-10 h-[380px] w-[380px] rounded-full bg-brand-teal/20 blur-[110px]"
        animate={{ x: [0, 50, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 text-center sm:px-6">
        <motion.a
          href="#platform"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="group relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1 pr-3 pl-1 text-xs text-muted-foreground backdrop-blur transition-colors hover:border-white/20 hover:text-foreground sm:text-sm"
        >
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-gradient px-2 py-0.5 text-[0.7rem] font-semibold text-white">
            <Sparkles className="size-3" /> New
          </span>
          Uniscience Fusion — our AI platform is live
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </motion.a>

        <h1 className="mt-8 max-w-4xl font-heading text-[2.6rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl md:text-7xl">
          {HEADLINE.map((word, i) => (
            <motion.span
              key={word}
              className="inline-block"
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease }}
            >
              {word}&nbsp;
            </motion.span>
          ))}
          <motion.span
            className="text-gradient inline-block"
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
          >
            software.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease }}
          className="mt-6 max-w-2xl text-base text-pretty text-muted-foreground sm:text-lg"
        >
          Uniscience is a product engineering studio that unifies AI, cloud
          and data into platforms built with scientific precision. From
          first prototype to global scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button variant="brand" size="xl" asChild>
            <a href="#contact">
              Start your project <ArrowRight />
            </a>
          </Button>
          <Button variant="glass" size="xl" asChild>
            <a href="#process">
              <PlayCircle /> See how we work
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-8 flex items-center gap-3 text-sm text-muted-foreground"
        >
          <div className="flex -space-x-2">
            {["#0B4FE0", "#0EA5E9", "#14B8A6", "#3FCF5C"].map((c, i) => (
              <span
                key={c}
                className="flex size-7 items-center justify-center rounded-full border-2 border-background text-[0.65rem] font-semibold text-white"
                style={{ background: c }}
              >
                {["AK", "MJ", "SL", "RT"][i]}
              </span>
            ))}
          </div>
          <span>
            Trusted by <span className="text-foreground">120+</span> product
            teams worldwide
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.85, ease }}
          className="relative mt-20 w-full [perspective:1400px]"
        >
          <motion.div
            aria-hidden
            style={{ opacity: glowOpacity }}
            className="absolute inset-x-10 -top-10 bottom-0 -z-10 rounded-[2rem] bg-brand-gradient blur-[90px]"
          />
          <motion.div style={{ rotateX, scale, transformOrigin: "50% 0%" }}>
            <HeroVisual />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
