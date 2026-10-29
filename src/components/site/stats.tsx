"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";
import { Reveal } from "@/components/motion/reveal";

const STATS = [
  { value: 250, suffix: "+", label: "Products shipped" },
  { value: 98, suffix: "%", label: "Client retention" },
  { value: 40, suffix: "M", label: "End users served" },
  { value: 12, suffix: "", label: "Countries, one team" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix]);

  return (
    <span ref={ref}>
      0{suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] md:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 0.08}
            className="relative flex flex-col items-center gap-1 border-white/10 px-4 py-10 text-center not-last:border-r max-md:nth-[2]:border-r-0 max-md:nth-[-n+2]:border-b"
          >
            <span className="text-gradient font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
              <Counter to={stat.value} suffix={stat.suffix} />
            </span>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
