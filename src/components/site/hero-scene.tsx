"use client";

import { motion, useScroll, useTransform } from "motion/react";

/*
 * Cinematic backdrop for the hero: a wall of glowing research dashboards seen
 * at an angle, lit in brand green and cyan, with out-of-focus lab lights.
 */

const ease = [0.22, 1, 0.36, 1] as const;

const BOKEH = [
  { x: "8%", y: "18%", s: 90, c: "rgba(76,242,119,0.18)" },
  { x: "22%", y: "62%", s: 60, c: "rgba(14,165,233,0.16)" },
  { x: "38%", y: "12%", s: 40, c: "rgba(255,190,110,0.14)" },
  { x: "14%", y: "40%", s: 26, c: "rgba(255,190,110,0.2)" },
  { x: "30%", y: "30%", s: 18, c: "rgba(76,242,119,0.35)" },
  { x: "4%", y: "72%", s: 34, c: "rgba(76,242,119,0.18)" },
  { x: "44%", y: "48%", s: 14, c: "rgba(255,190,110,0.3)" },
  { x: "18%", y: "8%", s: 22, c: "rgba(20,184,166,0.3)" },
];

function Waveform({ seed, color }: { seed: number; color: string }) {
  const pts = Array.from({ length: 48 }, (_, i) => {
    const y =
      50 +
      Math.sin(i * 0.45 + seed) * 18 +
      Math.sin(i * 1.3 + seed * 2) * 8 -
      i * 0.5;
    return `${(i / 47) * 300},${y}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 300 100" className="h-full w-full" preserveAspectRatio="none">
      <motion.polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.4, delay: 0.6 + seed * 0.2, ease: "easeInOut" }}
      />
    </svg>
  );
}

function Monitor({ className, variant }: { className?: string; variant: 0 | 1 | 2 }) {
  return (
    <div
      className={
        "rounded-md border border-white/10 bg-[#07130d] p-2 shadow-[0_0_80px_-10px] shadow-signal/40 " +
        (className ?? "")
      }
    >
      <div className="h-full rounded-sm border border-signal/20 bg-gradient-to-br from-[#0b2416] to-[#04100a] p-3">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-1.5 w-10 rounded-full bg-signal/70" />
          <span className="h-1.5 w-16 rounded-full bg-white/15" />
          <span className="ml-auto h-1.5 w-6 rounded-full bg-brand-sky/60" />
        </div>
        {variant === 0 && (
          <div className="grid h-[calc(100%-1.25rem)] grid-cols-[1fr_2fr] gap-3">
            <div className="space-y-2">
              {[80, 55, 92, 40, 68, 74].map((v, i) => (
                <div key={i} className="h-2 overflow-hidden rounded-sm bg-white/5">
                  <motion.div
                    className="h-full bg-signal/70"
                    initial={{ width: 0 }}
                    animate={{ width: `${v}%` }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 1.2, ease }}
                  />
                </div>
              ))}
            </div>
            <div className="relative rounded-sm border border-white/5 bg-black/30">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(76_242_119/0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgb(76_242_119/0.08)_1px,transparent_1px)] bg-[size:20px_20px]" />
              <Waveform seed={0} color="#4cf277" />
            </div>
          </div>
        )}
        {variant === 1 && (
          <div className="flex h-[calc(100%-1.25rem)] flex-col gap-3">
            <div className="flex-1 rounded-sm border border-white/5 bg-black/30">
              <Waveform seed={2} color="#0ea5e9" />
            </div>
            <div className="flex h-1/3 items-end gap-1">
              {[30, 52, 44, 70, 62, 88, 76, 94, 66, 80].map((v, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-brand-teal/30 to-signal/80"
                  initial={{ height: 0 }}
                  animate={{ height: `${v}%` }}
                  transition={{ delay: 1 + i * 0.06, duration: 1, ease }}
                />
              ))}
            </div>
          </div>
        )}
        {variant === 2 && (
          <div className="relative flex h-[calc(100%-1.25rem)] items-center justify-center">
            <motion.div
              className="aspect-square h-4/5 rounded-full border-[10px] border-white/5 border-t-signal/80 border-r-brand-sky/70"
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />
            <span className="absolute font-mono text-xl text-signal">98.7%</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function HeroScene() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 140]);
  const opacity = useTransform(scrollY, [0, 700], [1, 0.25]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Ambient light */}
      <div className="absolute -top-40 right-[-10%] h-[700px] w-[900px] rounded-full bg-signal/[0.13] blur-[140px]" />
      <div className="absolute top-1/3 right-[20%] h-[420px] w-[520px] rounded-full bg-brand-sky/[0.12] blur-[120px]" />
      <div className="absolute top-10 left-[10%] h-[300px] w-[400px] rounded-full bg-[#ffb35c]/[0.06] blur-[120px]" />

      {BOKEH.map((b, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full blur-[6px]"
          style={{ left: b.x, top: b.y, width: b.s, height: b.s, background: b.c }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Monitor wall */}
      <motion.div
        style={{ y, opacity }}
        className="absolute top-[9%] right-[-14%] hidden w-[78%] [perspective:1800px] md:block"
      >
        <motion.div
          initial={{ opacity: 0, rotateY: -38, x: 80 }}
          animate={{ opacity: 1, rotateY: -24, x: 0 }}
          transition={{ duration: 1.8, ease }}
          style={{ transformStyle: "preserve-3d", rotateX: 4 }}
          className="grid grid-cols-[1.3fr_1fr] gap-4"
        >
          <Monitor variant={0} className="h-[300px]" />
          <Monitor variant={2} className="h-[300px]" />
          <Monitor variant={1} className="col-span-2 ml-[18%] h-[220px]" />
        </motion.div>
      </motion.div>

      {/* Legibility + film grade */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/10" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,transparent_30%,rgb(5_8_6/0.6)_80%)]" />
    </div>
  );
}
