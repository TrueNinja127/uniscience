import { Star } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";

// Placeholder testimonials — replace with real client quotes.
const TESTIMONIALS = [
  {
    quote:
      "Uniscience took our research models from Jupyter notebooks to a production platform in 10 weeks. Our scientists finally have tools that keep up with them.",
    name: "Dr. Amara Okafor",
    role: "Head of Computational Biology, Helix Labs",
  },
  {
    quote:
      "The rare team that speaks both science and software fluently. They challenged our assumptions and the product is better for it.",
    name: "Lukas Brenner",
    role: "CTO, Quanta",
  },
  {
    quote:
      "We cut infrastructure costs by 38% while tripling throughput. The Fusion platform paid for itself in the first quarter.",
    name: "Priya Raman",
    role: "VP Engineering, Orbitly",
  },
  {
    quote:
      "Weekly demos, honest estimates, zero surprises. Working with Uniscience feels like an extension of our own team.",
    name: "Marcus Lee",
    role: "Product Director, Novagen",
  },
  {
    quote:
      "Their design team turned a complex lab workflow into something our users describe as 'delightful'. That never happens in our industry.",
    name: "Sofia Martins",
    role: "COO, Lumen Bio",
  },
  {
    quote:
      "Security and compliance were handled from day one. We passed our SOC 2 audit without a single finding on the new platform.",
    name: "Daniel Kim",
    role: "CISO, Polaris",
  },
];

const AVATAR_COLORS = ["#0B4FE0", "#0EA5E9", "#14B8A6", "#3FCF5C"];

function TestimonialCard({ t, index }: { t: (typeof TESTIMONIALS)[number]; index: number }) {
  const initials = t.name.replace("Dr. ", "").split(" ").map((p) => p[0]).join("");
  return (
    <figure className="w-[340px] shrink-0 rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:w-[400px]">
      <div className="flex gap-0.5 text-brand-green">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-4 fill-current" />
        ))}
      </div>
      <blockquote className="mt-4 text-sm leading-relaxed text-foreground/90 sm:text-[0.95rem]">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span
          className="flex size-10 items-center justify-center rounded-full text-xs font-semibold text-white"
          style={{ background: AVATAR_COLORS[index % AVATAR_COLORS.length] }}
        >
          {initials}
        </span>
        <div>
          <p className="text-sm font-medium">{t.name}</p>
          <p className="text-xs text-muted-foreground">{t.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

function Row({ items, reverse }: { items: typeof TESTIMONIALS; reverse?: boolean }) {
  return (
    <div className="group flex overflow-hidden [--marquee-duration:60s]">
      <div
        className={
          "flex shrink-0 gap-4 pr-4 group-hover:[animation-play-state:paused] " +
          (reverse ? "animate-marquee-reverse" : "animate-marquee")
        }
      >
        {/* Four copies so one half of the loop is always wider than the viewport */}
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <div key={i} aria-hidden={i >= items.length}>
            <TestimonialCard t={t} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Client stories"
          title={
            <>
              Loved by teams who <span className="text-gradient">push boundaries</span>
            </>
          }
          description="From seed-stage startups to Fortune 500 R&D groups, our partners measure success in shipped outcomes."
        />
      </div>
      <div className="mask-fade-x mt-16 flex flex-col gap-4">
        <Row items={TESTIMONIALS.slice(0, 3)} />
        <Row items={TESTIMONIALS.slice(3)} reverse />
      </div>
    </section>
  );
}
