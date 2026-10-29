"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useLenis } from "lenis/react";
import { Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

type Step = {
  title: string;
  phase: string;
  duration: string;
  body: string;
  deliverables: string[];
};

const STEPS: Step[] = [
  {
    title: "Discover",
    phase: "Understand",
    duration: "Weeks 1-2",
    body: "We immerse ourselves in your domain, data and users, then agree the outcomes, risks and target architecture.",
    deliverables: ["Stakeholder and user interviews", "Data audit and feasibility study", "Architecture and delivery roadmap"],
  },
  {
    title: "Experiment",
    phase: "Validate",
    duration: "Weeks 3-5",
    body: "Hypotheses become working prototypes. We prove models and UX against real data before anyone commits budget.",
    deliverables: ["Working prototype on real data", "Model benchmarks against baselines", "Validated user flows"],
  },
  {
    title: "Engineer",
    phase: "Build",
    duration: "Month 2 onward",
    body: "Senior squads ship in two-week increments, with automated testing, CI/CD and a live demo every sprint.",
    deliverables: ["Production-grade codebase", "CI/CD, tests and observability", "Sprint reviews every two weeks"],
  },
  {
    title: "Scale",
    phase: "Grow",
    duration: "Ongoing",
    body: "We launch, observe and optimise, then hand over to your team or keep evolving the product together.",
    deliverables: ["Launch and hypercare", "Performance and cost optimisation", "Handover or continued evolution"],
  },
];

const N = STEPS.length;

/* ---------- Line illustrations, one per step ---------- */

function Art({ index, active }: { index: number; active: boolean }) {
  const draw = {
    initial: { pathLength: 0, opacity: 0.3 },
    animate: active ? { pathLength: 1, opacity: 1 } : { pathLength: 0.35, opacity: 0.35 },
    transition: { duration: 1.4, ease },
  };
  const stroke = `url(#art-grad-${index})`;

  return (
    <svg viewBox="0 0 140 110" className="h-24 w-32 overflow-visible" fill="none" aria-hidden>
      <defs>
        <linearGradient id={`art-grad-${index}`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#0ea5e9" />
          <stop offset="0.55" stopColor="#14b8a6" />
          <stop offset="1" stopColor="#4cf277" />
        </linearGradient>
      </defs>

      {index === 0 && (
        <g>
          {[16, 32, 48].map((r) => (
            <motion.circle key={r} cx="70" cy="55" r={r} stroke={stroke} strokeWidth="1.2" {...draw} />
          ))}
          {/* Radar sweep, rotating around the dish centre */}
          <g
            className={active ? "animate-spin [animation-duration:4s]" : ""}
            style={{ transformBox: "view-box", transformOrigin: "70px 55px" }}
          >
            <line x1="70" y1="55" x2="70" y2="7" stroke="#4cf277" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M70 55 L70 7 A48 48 0 0 1 104 21 Z" fill="#4cf277" fillOpacity="0.12" />
          </g>
          {[
            [92, 34],
            [50, 70],
            [84, 82],
          ].map(([x, y], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              fill="#4cf277"
              animate={{ opacity: active ? [0, 1, 0.3] : 0.2, scale: active ? [0.6, 1.2, 1] : 1 }}
              transition={{ duration: 2, delay: i * 0.5, repeat: active ? Infinity : 0 }}
            />
          ))}
        </g>
      )}

      {index === 1 && (
        <g>
          <motion.path d="M10 95 H132 M10 95 V10" stroke="rgb(255 255 255 / 0.25)" strokeWidth="1" {...draw} />
          <motion.path
            d="M14 78 C34 74 40 52 58 56 C76 60 80 36 98 32 C112 29 118 20 128 16 L128 40 C118 44 112 52 98 56 C80 60 76 78 58 76 C40 74 34 90 14 92 Z"
            fill="#14b8a6"
            fillOpacity="0.12"
            initial={{ opacity: 0 }}
            animate={{ opacity: active ? 1 : 0.3 }}
            transition={{ duration: 1 }}
          />
          <motion.path
            d="M14 85 C34 82 40 64 58 66 C76 68 80 46 98 44 C112 42 118 30 128 28"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            {...draw}
          />
          {[
            [36, 76],
            [58, 66],
            [80, 52],
            [98, 44],
            [118, 33],
          ].map(([x, y], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              fill="#0c110e"
              stroke="#4cf277"
              strokeWidth="1.5"
              animate={{ scale: active ? 1 : 0.6, opacity: active ? 1 : 0.4 }}
              transition={{ delay: active ? 0.4 + i * 0.12 : 0, duration: 0.4 }}
            />
          ))}
        </g>
      )}

      {index === 2 && (
        <g>
          {[0, 1, 2].map((l) => (
            <motion.g
              key={l}
              animate={{ y: active ? 0 : (1 - l) * 6 }}
              transition={{ duration: 0.8, ease, delay: l * 0.1 }}
            >
              <motion.path
                d={`M70 ${22 + l * 26} L120 ${40 + l * 26} L70 ${58 + l * 26} L20 ${40 + l * 26} Z`}
                stroke={stroke}
                strokeWidth="1.4"
                strokeLinejoin="round"
                fill={l === 0 ? "#4cf277" : "transparent"}
                fillOpacity={l === 0 ? 0.08 : 0}
                {...draw}
              />
            </motion.g>
          ))}
          <motion.path
            d="M70 58 V74 M70 84 V100 M20 40 V92 M120 40 V92"
            stroke="rgb(255 255 255 / 0.18)"
            strokeDasharray="2 4"
            {...draw}
          />
        </g>
      )}

      {index === 3 && (
        <g>
          {[22, 36, 52, 70, 92].map((h, i) => (
            <motion.rect
              key={i}
              x={14 + i * 24}
              y={100 - h}
              width="14"
              height={h}
              rx="4"
              fill={stroke}
              opacity={0.85}
              style={{ originY: 1 }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: active ? 1 : 0.35 }}
              transition={{ duration: 0.9, delay: active ? i * 0.08 : 0, ease }}
            />
          ))}
          <motion.path
            d="M12 74 C40 66 64 50 86 30 C96 21 108 14 126 8"
            stroke="#eef3ef"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="1 5"
            {...draw}
          />
          <motion.path d="M116 6 L127 8 L123 18" stroke="#eef3ef" strokeWidth="1.5" strokeLinecap="round" {...draw} />
        </g>
      )}
    </svg>
  );
}

/* ---------- Card face ---------- */

function CardFace({ step, index, active }: { step: Step; index: number; active: boolean }) {
  return (
    <div className="relative h-full rounded-[2rem] bg-[linear-gradient(140deg,rgb(76_242_119/0.5),rgb(255_255_255/0.07)_30%,rgb(255_255_255/0.04)_70%,rgb(14_165_233/0.4))] p-px shadow-[0_50px_100px_-40px_rgb(0_0_0/0.9)]">
      <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(2rem-1px)] bg-[#0b100d] p-7 sm:p-9">
        {/* Atmosphere */}
        <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-signal/[0.09] blur-3xl" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgb(255_255_255/0.07)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-3 -bottom-10 text-[11rem] leading-none font-semibold tracking-tighter text-transparent tabular-nums [-webkit-text-stroke:1px_rgb(255_255_255/0.06)]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative flex items-start justify-between gap-6">
          <div>
            <p className="eyebrow text-signal">
              Step {String(index + 1).padStart(2, "0")} · {step.phase}
            </p>
            <h3 className="mt-4 text-4xl font-light tracking-tight sm:text-[2.6rem]">{step.title}</h3>
          </div>
          <Art index={index} active={active} />
        </div>

        <p className="relative mt-4 max-w-md text-[0.98rem] leading-relaxed text-foreground/70">{step.body}</p>

        <div className="relative mt-auto pt-8">
          <div className="flex items-center justify-between border-t border-white/[0.08] pt-5">
            <p className="eyebrow text-mono">Deliverables</p>
            <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-foreground/75">
              <Clock className="size-3.5 text-signal" />
              {step.duration}
            </span>
          </div>
          <ul className="mt-4 grid gap-2.5">
            {step.deliverables.map((d) => (
              <li key={d} className="flex items-center gap-3 text-sm text-foreground/85">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-signal/12 ring-1 ring-signal/30">
                  <Check className="size-3 text-signal" strokeWidth={2.5} />
                </span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------- 3D deck card ---------- */

function DeckCard({
  step,
  index,
  progress,
  active,
}: {
  step: Step;
  index: number;
  progress: MotionValue<number>;
  active: boolean;
}) {
  // d = how many steps ahead of the current one this card is (0 = front, <0 = already passed).
  const d = useTransform(progress, (p) => index - p * (N - 1));
  const y = useTransform(d, (v) => (v >= 0 ? -v * 34 : -v * 140));
  const z = useTransform(d, (v) => (v >= 0 ? -v * 120 : -v * 90));
  const rotateX = useTransform(d, (v) => (v >= 0 ? v * 4 : v * 28));
  const scale = useTransform(d, (v) => (v >= 0 ? 1 - v * 0.05 : 1));
  const opacity = useTransform(d, (v) => (v >= 0 ? Math.max(0, 1 - Math.max(0, v - 2.2)) : Math.max(0, 1 + v * 1.6)));
  const shade = useTransform(d, (v) => (v > 0 ? Math.min(0.55, v * 0.28) : 0));
  // Explicit stacking (front card above those behind; passed cards fly over everything).
  const zIndex = useTransform(d, (v) => Math.round(100 - v * 10));

  return (
    <motion.div
      style={{ y, z, rotateX, scale, opacity, zIndex, transformPerspective: 1600, transformOrigin: "50% 100%" }}
      className="absolute inset-0 will-change-transform"
    >
      <CardFace step={step} index={index} active={active} />
      <motion.div
        aria-hidden
        style={{ opacity: shade }}
        className="pointer-events-none absolute inset-0 rounded-[2rem] bg-ink"
      />
    </motion.div>
  );
}

/* ---------- Pinned, scroll-driven deck (desktop) ---------- */

function PinnedDeck() {
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const [active, setActive] = useState(0);
  useMotionValueEvent(progress, "change", (p) => setActive(Math.min(N - 1, Math.max(0, Math.round(p * (N - 1))))));

  const fill = useTransform(progress, [0, 1], ["0%", "100%"]);

  // Gentle pointer tilt for the whole deck
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const tiltY = useSpring(useTransform(px, [-0.5, 0.5], [-14, -4]), { stiffness: 120, damping: 20 });
  const tiltX = useSpring(useTransform(py, [-0.5, 0.5], [10, 2]), { stiffness: 120, damping: 20 });

  const jumpTo = (i: number) => {
    const el = ref.current;
    if (!el || !lenis) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    lenis.scrollTo(top + (travel * i) / (N - 1) + 2, { duration: 1.2 });
  };

  return (
    <div ref={ref} className="relative mt-16 hidden h-[340vh] lg:ml-[16%] lg:block">
      <div className="sticky top-0 flex h-svh items-center">
        <div className="grid w-full grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-center gap-14 xl:gap-20">
          {/* Step rail */}
          <div>
            <div className="flex items-end gap-3">
              <div className="relative h-[5.5rem] overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={active}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="display text-gradient block text-[5.5rem] leading-none tabular-nums"
                  >
                    {String(active + 1).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="mb-3 text-lg text-mono tabular-nums">/ {String(N).padStart(2, "0")}</span>
            </div>

            <div className="mt-8 h-px w-full overflow-hidden rounded-full bg-white/10">
              <motion.div style={{ width: fill }} className="h-full bg-brand-gradient" />
            </div>

            <ol className="mt-6 space-y-1">
              {STEPS.map((s, i) => (
                <li key={s.title}>
                  <button
                    onClick={() => jumpTo(i)}
                    className={cn(
                      "group flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left transition-all duration-500",
                      i === active ? "bg-white/[0.05] ring-1 ring-white/10" : "hover:bg-white/[0.025]",
                    )}
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={cn(
                          "flex size-2.5 rounded-full transition-all duration-500",
                          i < active ? "bg-signal/60" : i === active ? "bg-signal shadow-[0_0_14px_rgb(76_242_119/0.9)]" : "bg-white/20",
                        )}
                      />
                      <span
                        className={cn(
                          "text-xl font-light transition-colors duration-500",
                          i === active ? "text-foreground" : "text-foreground/45 group-hover:text-foreground/70",
                        )}
                      >
                        {s.title}
                      </span>
                    </span>
                    <span className={cn("text-sm transition-colors duration-500", i === active ? "text-signal" : "text-mono/70")}>
                      {s.duration}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          {/* 3D deck */}
          <div
            className="[perspective:1800px]"
            onPointerMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              px.set((e.clientX - r.left) / r.width - 0.5);
              py.set((e.clientY - r.top) / r.height - 0.5);
            }}
            onPointerLeave={() => {
              px.set(0);
              py.set(0);
            }}
          >
            <motion.div
              style={{ rotateY: tiltY, rotateX: tiltX }}
              className="relative mx-auto h-[450px] w-full max-w-[560px]"
            >
              {/* Floor glow, far behind the stack */}
              <div
                aria-hidden
                className="absolute inset-x-8 -bottom-10 h-24 rounded-full bg-signal/20 blur-3xl"
              />
              {STEPS.map((s, i) => (
                <DeckCard key={s.title} step={s} index={i} progress={progress} active={i === active} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Stacked cards (mobile / tablet) ---------- */

function StackedCards() {
  return (
    <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:hidden">
      {STEPS.map((s, i) => (
        <motion.li
          key={s.title}
          initial={{ opacity: 0, y: 60, rotateX: 22, transformPerspective: 1200 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease }}
          className="min-h-[440px]"
        >
          <CardFace step={s} index={i} active />
        </motion.li>
      ))}
    </ol>
  );
}

export function ProcessDeck() {
  return (
    <>
      <PinnedDeck />
      <StackedCards />
    </>
  );
}
