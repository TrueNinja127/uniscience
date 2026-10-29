"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowRight, Check, Play } from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
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

function Line({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
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
    <div className="relative mx-auto mt-8 hidden h-28 w-full max-w-7xl shrink-0 [@media(max-height:820px)]:mt-4 [@media(max-height:820px)]:h-24 px-5 sm:px-8 lg:block">
      <svg
        aria-hidden
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        className="absolute inset-x-5 top-0 h-24 w-[calc(100%-2.5rem)] overflow-visible sm:inset-x-8 sm:w-[calc(100%-4rem)]"
      >
        <motion.path
          d="M0 60 H350 C378 60 374 34 402 34 H598 C626 34 622 60 650 60 H1000"
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
          <LogoMark
            className="size-12 drop-shadow-[0_0_18px_rgba(76,242,119,0.45)]"
            sizes="48px"
          />
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
      <div className="eyebrow absolute top-[46px] right-[calc(50%+22px)] text-right text-[0.62rem] leading-snug text-foreground/70">
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
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const p = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.3,
  });

  // As the hero scrolls away, its content tilts back and recedes into depth.
  const rotateX = useTransform(p, [0, 1], [0, 18]);
  const z = useTransform(p, [0, 1], [0, -260]);
  const y = useTransform(p, [0, 1], [0, 120]);
  const opacity = useTransform(p, [0, 0.75], [1, 0]);

  // Cursor parallax: layers shift by depth, so the hero reads as 3D space.
  const mx = useSpring(useMotionValue(0), {
    stiffness: 60,
    damping: 18,
    mass: 0.6,
  });
  const my = useSpring(useMotionValue(0), {
    stiffness: 60,
    damping: 18,
    mass: 0.6,
  });
  const rotateY = useTransform(mx, [-0.5, 0.5], [3.5, -3.5]);
  const contentX = useTransform(mx, [-0.5, 0.5], [-14, 14]);

  return (
    <section
      ref={ref}
      onPointerMove={(e) => {
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative isolate flex min-h-svh flex-col overflow-hidden pt-28 [perspective:1400px] [@media(max-height:820px)]:pt-24"
    >
      <HeroScene progress={p} pointerX={mx} pointerY={my} />

      <motion.div
        style={{
          rotateX,
          rotateY,
          x: contentX,
          z,
          y,
          opacity,
          transformOrigin: "50% 0%",
        }}
        className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-16 will-change-transform sm:px-8 lg:pb-0"
      >
        <h1 className="display max-w-5xl text-[clamp(2.75rem,min(6.6vw,9svh),6rem)]">
          <Line delay={0.15}>Complex science.</Line>
          <Line delay={0.3}>
            Engineered into <span className="text-gradient">software.</span>
          </Line>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease }}
          className="mt-6 max-w-2xl text-lg leading-relaxed font-light text-foreground/80 sm:text-xl"
        >
          AI, data and cloud platforms for research-driven companies. Designed
          by scientists, built by engineers, in one unified team.
        </motion.p>

        <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease }}
            className="flex flex-col items-start gap-8"
          >
            <div className="flex flex-wrap gap-3">
              <Button variant="signal" size="xl" asChild>
                <a href="#contact">
                  Start a project <ArrowRight />
                </a>
              </Button>
              <Button variant="signal-outline" size="xl" asChild>
                <a href="#approach">
                  <Play className="fill-current" /> How we work
                </a>
              </Button>
            </div>
            {/* Placeholder figures: replace with real company numbers. */}
            <dl className="flex gap-10 sm:gap-14 lg:[@media(max-height:820px)]:hidden">
              {[
                ["250+", "Products shipped"],
                ["40M", "End users"],
                ["12", "Countries"],
              ].map(([v, l]) => (
                <div key={l} className="flex flex-col-reverse">
                  <dt className="mt-1 text-sm text-mono">{l}</dt>
                  <dd className="text-3xl font-light tracking-tight text-foreground tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8, ease }}
            className="lg:max-w-sm"
          >
            <p className="text-[0.95rem] leading-relaxed text-foreground/90">
              Turn your research into production software, guided by real scientists.
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-mono [@media(max-height:820px)]:gap-1">
              {[...CHECKLIST, "Scale from pilot to global production"].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + i * 0.08, duration: 0.5, ease }}
                  className="flex items-center gap-3"
                >
                  <Check className="size-3.5 shrink-0 text-signal" strokeWidth={2.5} />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>

      <Surface />
    </section>
  );
}
