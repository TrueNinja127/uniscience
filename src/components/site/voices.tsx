"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TraceSection } from "@/components/site/trace";
import { SectionLabel } from "@/components/site/section-label";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

// Placeholder testimonials — replace with real client quotes.
const QUOTES = [
  {
    quote:
      "Uniscience took our research models from notebooks to a production platform in ten weeks. Our scientists finally have tools that keep up with them.",
    name: "Dr. Amara Okafor",
    role: "Head of Computational Biology, Helix Labs",
  },
  {
    quote:
      "The rare team that speaks both science and software fluently. They challenged our assumptions — and the product is better for it.",
    name: "Lukas Brenner",
    role: "CTO, Quanta Materials",
  },
  {
    quote:
      "We cut compute costs by 38% while tripling throughput. Weekly demos, honest estimates, zero surprises.",
    name: "Priya Raman",
    role: "VP Engineering, Orbitly",
  },
];

const FAQS = [
  {
    q: "What kinds of companies do you work with?",
    a: "Research-driven startups, scale-ups and enterprise R&D groups — in life sciences, climate, materials, manufacturing and finance — wherever complex data meets demanding users.",
  },
  {
    q: "How quickly can we get started?",
    a: "Most engagements kick off within two weeks. Discovery takes one to two weeks, and you will see a working prototype within the first month.",
  },
  {
    q: "Fixed price or time and materials?",
    a: "Both. Discovery and prototypes are usually fixed scope; ongoing product development runs on dedicated squads with transparent monthly budgets.",
  },
  {
    q: "Who owns the code and IP?",
    a: "You do — 100%. Source code, models, designs and documentation are transferred to you, with no lock-in to our tooling or people.",
  },
  {
    q: "Can you work alongside our in-house team?",
    a: "Yes. We regularly embed with internal teams, pair on architecture, and leave behind the practices and documentation your team needs to own the product.",
  },
];

const DURATION = 7000;

function Testimonials() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setIndex((i) => (i + 1) % QUOTES.length), DURATION);
    return () => clearTimeout(t);
  }, [index]);
  const q = QUOTES[index];

  return (
    <div>
      <SectionLabel index={6} label="Client stories" />
      <div className="relative mt-10 min-h-[22rem] sm:min-h-[19rem]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.6, ease }}
          >
            <blockquote className="max-w-4xl text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.15] font-light">
              <span className="text-signal">“</span>
              {q.quote}
              <span className="text-signal">”</span>
            </blockquote>
            <figcaption className="mt-8 font-mono text-sm">
              <span className="text-foreground">{q.name}</span>
              <span className="text-mono"> — {q.role}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="mt-8 flex gap-3" role="tablist" aria-label="Choose testimonial">
        {QUOTES.map((item, i) => (
          <button
            key={item.name}
            role="tab"
            aria-selected={i === index}
            aria-label={`Testimonial ${i + 1}`}
            onClick={() => setIndex(i)}
            className="group flex w-24 flex-col gap-2 text-left"
          >
            <span className={cn("font-mono text-xs", i === index ? "text-signal" : "text-dim")}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="relative h-px w-full overflow-hidden bg-white/15">
              {i === index && (
                <motion.span
                  className="absolute inset-y-0 left-0 bg-signal"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: DURATION / 1000, ease: "linear" }}
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Faq() {
  return (
    <div id="faq" className="scroll-mt-28">
      <SectionLabel index={7} label="FAQ" />
      <h2 className="display mt-6 text-[clamp(2.75rem,5vw,4.5rem)]">
        <span className="text-dim">Questions,</span>
        <br />
        <span className="text-brand-green">answered</span>
      </h2>
      <Accordion type="single" collapsible defaultValue="item-0" className="mt-12">
        {FAQS.map((f, i) => (
          <AccordionItem key={f.q} value={`item-${i}`} className="border-white/10">
            <AccordionTrigger className="items-center gap-6 py-6 text-left text-xl font-light hover:no-underline sm:text-2xl [&>svg]:text-signal">
              <span className="flex items-baseline gap-5">
                <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
                {f.q}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pl-10 font-mono text-sm leading-relaxed text-mono">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export function Voices() {
  return (
    <TraceSection id="testimonials" from={10} innerClassName="py-24 lg:py-32">
      <div className="space-y-36 lg:ml-[16%]">
        <Testimonials />
        <Faq />
      </div>
    </TraceSection>
  );
}
