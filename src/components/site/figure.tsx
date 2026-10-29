"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Editorial photograph: the frame opens upward as it enters the viewport while
 * the image settles from a slight zoom, then drifts inside the frame as the
 * page scrolls (parallax depth). No borders, badges or glows; the photo leads.
 */
export function Figure({
  src,
  alt,
  index,
  caption,
  className,
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 45vw, 100vw",
  priority,
}: {
  src: StaticImageData;
  alt: string;
  index?: number;
  caption?: string;
  className?: string;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  // Reveal: driven by how far the figure has entered the viewport.
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start 35%"] });
  const e = useSpring(enter, { stiffness: 90, damping: 26, mass: 0.4 });
  const clipPath = useTransform(e, (v) => `inset(${(1 - v) * 18}% 0% 0% 0% round 1.25rem)`);
  const zoom = useTransform(e, [0, 1], [1.18, 1.04]);

  // Parallax: the photo travels a little slower than its frame.
  const { scrollYProgress: pass } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(pass, [0, 1], ["-6%", "6%"]);

  return (
    <figure ref={ref} className={cn("relative", className)}>
      <motion.div style={{ clipPath }} className={cn("relative overflow-hidden rounded-[1.25rem] bg-white/[0.03]", aspect)}>
        <motion.div style={{ y, scale: zoom }} className="absolute -inset-y-[8%] inset-x-0 will-change-transform">
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
      </motion.div>

      {caption && (
        <figcaption className="mt-4 flex items-baseline justify-between gap-6 border-t border-white/10 pt-3 text-sm text-mono">
          <span>{caption}</span>
          {index !== undefined && (
            <span className="shrink-0 text-xs tracking-[0.18em] text-foreground/40 tabular-nums">
              FIG. {String(index).padStart(2, "0")}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
