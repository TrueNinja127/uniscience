"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type HTMLMotionProps } from "motion/react";

/**
 * Scroll-linked 3D reveal: content rises out of a plane tilted away from the
 * viewer and settles flat as it reaches the middle of the screen. `depth`
 * controls how far back it starts; higher values feel more dramatic.
 */
export function Depth({
  children,
  depth = 1,
  style,
  ...props
}: HTMLMotionProps<"div"> & { depth?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 45%"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.35 });

  const rotateX = useTransform(p, [0, 1], [28 * depth, 0]);
  const y = useTransform(p, [0, 1], [90 * depth, 0]);
  const z = useTransform(p, [0, 1], [-220 * depth, 0]);
  const opacity = useTransform(p, [0, 0.55], [0, 1]);

  return (
    <div ref={ref} className="[perspective:1200px]">
      <motion.div
        style={{ rotateX, y, z, opacity, transformOrigin: "50% 100%", ...style }}
        className="will-change-transform"
        {...props}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Moves its children at a different speed to the page: a simple depth layer. */
export function Parallax({
  children,
  speed = 0.2,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `${-speed * 100}%`]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
