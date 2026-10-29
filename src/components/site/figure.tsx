"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * A photo presented in 3D: it swings up from a tilted plane as it scrolls into
 * view, the image drifts inside its frame (parallax), and it leans toward the
 * cursor on hover with a moving specular highlight.
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

  // Scroll-driven 3D: tilted back while below the fold, flat at centre, tipping forward as it leaves.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const scrollRotateX = useTransform(smooth, [0, 0.45, 1], [22, 0, -10]);
  const scale = useTransform(smooth, [0, 0.45, 1], [0.86, 1, 0.96]);
  const imageY = useTransform(smooth, [0, 1], ["-10%", "10%"]);
  const opacity = useTransform(smooth, [0, 0.2], [0, 1]);

  // Pointer tilt
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const tiltX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), { stiffness: 160, damping: 18 });
  const tiltY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), { stiffness: 160, damping: 18 });
  const rotateX = useTransform(() => scrollRotateX.get() + tiltX.get());
  const glareX = useTransform(px, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(py, [-0.5, 0.5], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgb(255 255 255 / 0.16), transparent 55%)`;

  return (
    <figure ref={ref} className={cn("relative [perspective:1400px]", className)}>
      <motion.div
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width - 0.5);
          py.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => {
          px.set(0);
          py.set(0);
        }}
        style={{ rotateX, rotateY: tiltY, scale, opacity, transformStyle: "preserve-3d" }}
        className="group relative will-change-transform"
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)]",
            aspect,
          )}
        >
          <motion.div style={{ y: imageY }} className="absolute -inset-y-[12%] inset-x-0">
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              placeholder="blur"
              priority={priority}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <motion.div
            aria-hidden
            style={{ background: glare }}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
          {index !== undefined && (
            <span className="eyebrow absolute top-4 left-4 rounded-full border border-white/15 bg-ink/50 px-3 py-1 text-[0.62rem] text-foreground/85 backdrop-blur-md">
              Fig. {String(index).padStart(2, "0")}
            </span>
          )}
        </div>
        {/* Soft brand glow cast beneath the card, sitting deeper in 3D space */}
        <div
          aria-hidden
          className="absolute inset-x-[10%] -bottom-6 -z-10 h-16 rounded-full bg-signal/20 blur-3xl [transform:translateZ(-60px)]"
        />
      </motion.div>

      {caption && (
        <figcaption className="mt-5 flex items-center gap-3 text-sm text-mono">
          <span className="h-px w-6 bg-signal" />
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
