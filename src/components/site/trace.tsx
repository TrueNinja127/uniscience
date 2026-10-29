"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { cn } from "@/lib/utils";

/*
 * The "signal trace" is one continuous line that runs the length of the page.
 * Each <TraceSection> draws its own segment: it enters at `from` (% of the
 * content width), jogs diagonally, and leaves at `to`. Neighbouring sections
 * share an x-position so the segments join seamlessly. The segment draws
 * itself as the section scrolls past the middle of the viewport.
 */

type Point = [number, number];
type ScrollEdge = `${"start" | "end"} ${number}%`;

function roundedPath(points: Point[], radius: number) {
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i - 1];
    const [cx, cy] = points[i];
    const [nx, ny] = points[i + 1];
    const inLen = Math.hypot(cx - px, cy - py);
    const outLen = Math.hypot(nx - cx, ny - cy);
    const r = Math.min(radius, inLen / 2, outLen / 2);
    const ax = cx - ((cx - px) / inLen) * r;
    const ay = cy - ((cy - py) / inLen) * r;
    const bx = cx + ((nx - cx) / outLen) * r;
    const by = cy + ((ny - cy) / outLen) * r;
    d += ` L ${ax} ${ay} Q ${cx} ${cy} ${bx} ${by}`;
  }
  const last = points[points.length - 1];
  return d + ` L ${last[0]} ${last[1]}`;
}

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

/** On small screens the trace becomes a straight rail down the left gutter. */
export const MOBILE_RAIL_X = 6;

export function TraceSection({
  id,
  from,
  to = from,
  jog = 96,
  slope = 1.2,
  end,
  drawOffset = ["start 55%", "end 55%"],
  tone = "dark",
  className,
  innerClassName,
  background,
  children,
}: {
  id?: string;
  /** Entry x as % of content width */
  from: number;
  /** Exit x as % of content width */
  to?: number;
  /** Distance (px) from the top where the diagonal jog starts */
  jog?: number;
  /** Vertical px per horizontal px of the diagonal */
  slope?: number;
  /** Stop the line this many px above the bottom (for an end marker) */
  end?: number;
  /** Scroll range over which the segment draws (see motion's useScroll offset) */
  drawOffset?: [ScrollEdge, ScrollEdge];
  tone?: "dark" | "light";
  className?: string;
  innerClassName?: string;
  /** Full-bleed layer rendered behind the section content */
  background?: React.ReactNode;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const desktop = useIsDesktop();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Measure the padding box: the SVG spans it, not just the content box.
    const ro = new ResizeObserver(() => {
      setSize({ w: el.offsetWidth, h: el.offsetHeight });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: drawOffset,
  });

  // Glowing "head" that rides the front of the drawn line.
  const headX = useMotionValue(-100);
  const headY = useMotionValue(-100);
  const headOpacity = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const path = pathRef.current;
    if (!path) return;
    const pt = path.getPointAtLength(path.getTotalLength() * p);
    headX.set(pt.x);
    headY.set(pt.y);
    headOpacity.set(p > 0.002 && p < 0.998 ? 1 : 0);
  });

  const { w, h } = size;
  let d = "";
  if (w > 0 && h > 0) {
    const x0 = desktop ? (from / 100) * w : MOBILE_RAIL_X;
    const x1 = desktop ? (to / 100) * w : MOBILE_RAIL_X;
    const bottom = end ? h - end : h;
    if (Math.abs(x1 - x0) < 1) {
      d = `M ${x0} 0 L ${x1} ${bottom}`;
    } else {
      const dy = Math.max(70, Math.abs(x1 - x0) * slope);
      d = roundedPath(
        [
          [x0, 0],
          [x0, jog],
          [x1, jog + dy],
          [x1, bottom],
        ],
        18,
      );
    }
  }

  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-20",
        tone === "light" ? "bg-[#f3f5f2] text-ink" : "",
        className,
      )}
    >
      {background}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div ref={ref} className={cn("relative pl-8 lg:pl-0", innerClassName)}>
          {d && (
            <svg
              aria-hidden
              width={w}
              height={h}
              viewBox={`0 0 ${w} ${h}`}
              className="pointer-events-none absolute inset-0 overflow-visible"
            >
              <path
                d={d}
                fill="none"
                stroke={tone === "light" ? "rgb(5 8 6 / 0.12)" : "rgb(255 255 255 / 0.1)"}
                strokeWidth={1}
                strokeDasharray="3 5"
              />
              <g className="glow-signal">
                <motion.path
                  ref={pathRef}
                  d={d}
                  fill="none"
                  stroke="var(--color-signal)"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  style={{ pathLength: scrollYProgress }}
                />
                <motion.circle
                  r={3.5}
                  fill="#eafff0"
                  cx={headX}
                  cy={headY}
                  style={{ opacity: headOpacity }}
                />
              </g>
            </svg>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
