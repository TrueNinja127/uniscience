"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * A photo presented like a lab figure: wipes in when it enters the viewport,
 * drifts with a gentle parallax, and carries corner brackets + a FIG caption.
 */
export function Figure({
  src,
  alt,
  index,
  caption,
  className,
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 45vw, 100vw",
  tone = "dark",
  priority,
}: {
  src: StaticImageData;
  alt: string;
  index?: number;
  caption?: string;
  className?: string;
  aspect?: string;
  sizes?: string;
  tone?: "dark" | "light";
  priority?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const bracket = tone === "dark" ? "border-signal" : "border-[#139a3a]";

  return (
    <figure ref={ref} className={cn("relative", className)}>
      <motion.div
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        whileInView={{ clipPath: "inset(0 0 0% 0)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.2, ease }}
        className={cn("relative overflow-hidden", aspect)}
      >
        <motion.div style={{ y }} className="absolute -inset-y-[10%] inset-x-0">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            placeholder="blur"
            priority={priority}
            className="object-cover"
          />
        </motion.div>
        {tone === "dark" && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        )}
      </motion.div>

      {/* Corner brackets */}
      <span aria-hidden className={cn("absolute -top-2 -left-2 size-5 border-t border-l", bracket)} />
      <span aria-hidden className={cn("absolute -right-2 -bottom-2 size-5 border-r border-b", bracket)} />

      {caption && (
        <figcaption
          className={cn(
            "mt-4 flex gap-3 font-mono text-[0.7rem] tracking-[0.12em] uppercase",
            tone === "dark" ? "text-mono" : "text-ink/55",
          )}
        >
          {index !== undefined && (
            <span className={tone === "dark" ? "text-signal" : "text-[#139a3a]"}>
              Fig. {String(index).padStart(2, "0")}
            </span>
          )}
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
