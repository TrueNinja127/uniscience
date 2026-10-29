"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import heroPhoto from "@/assets/photos/hero-engineer.jpg";

/*
 * Cinematic backdrop for the hero: an engineer at a wall of monitors, graded
 * into the brand palette, with slow camera drift and soft lab lights.
 */

const BOKEH = [
  { x: "52%", y: "16%", s: 70, c: "rgba(76,242,119,0.16)" },
  { x: "62%", y: "64%", s: 50, c: "rgba(14,165,233,0.16)" },
  { x: "40%", y: "10%", s: 30, c: "rgba(255,190,110,0.18)" },
  { x: "46%", y: "44%", s: 18, c: "rgba(76,242,119,0.3)" },
  { x: "70%", y: "30%", s: 14, c: "rgba(255,190,110,0.25)" },
];

export function HeroScene() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 160]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Photo: right-weighted on desktop, full-bleed behind text on mobile */}
      <motion.div
        style={{ y }}
        className="absolute inset-y-0 right-0 w-full lg:w-[72%]"
      >
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1.04, opacity: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={heroPhoto}
            alt=""
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) 72vw, 100vw"
            className="object-cover object-[70%_center] brightness-[1.75] contrast-[1.08] saturate-[1.15]"
          />
        </motion.div>
      </motion.div>

      {/* Brand light spilling from the screens */}
      <div className="absolute -top-40 right-[-5%] h-[700px] w-[800px] rounded-full bg-signal/[0.12] mix-blend-screen blur-[140px]" />
      <div className="absolute top-1/3 right-[25%] h-[420px] w-[520px] rounded-full bg-brand-sky/[0.12] mix-blend-screen blur-[120px]" />

      {BOKEH.map((b, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full blur-[6px] mix-blend-screen"
          style={{ left: b.x, top: b.y, width: b.s, height: b.s, background: b.c }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Scan line sweeping the monitors */}
      <motion.div
        className="absolute inset-x-[30%] h-24 bg-gradient-to-b from-transparent via-signal/[0.07] to-transparent"
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
      />

      {/* Legibility + film grade */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/0 max-lg:via-ink/70 max-lg:to-ink/50" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/80 to-transparent" />
    </div>
  );
}
