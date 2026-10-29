import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";

const FAQS = [
  {
    q: "What kinds of companies do you work with?",
    a: "We partner with research-driven startups, scale-ups and enterprise R&D teams — especially in life sciences, climate, energy, fintech and deep tech — wherever complex data meets demanding users.",
  },
  {
    q: "How quickly can we get started?",
    a: "Most engagements kick off within two weeks. Discovery takes 1–2 weeks, and you'll see a working prototype by the end of the first month.",
  },
  {
    q: "Do you offer fixed-price or time-and-materials engagements?",
    a: "Both. Discovery and prototypes are usually fixed-scope; ongoing product development runs on dedicated squads with transparent monthly budgets.",
  },
  {
    q: "Who owns the code and IP?",
    a: "You do — 100%. All source code, models, designs and documentation are transferred to you, with no lock-in to our platform or people.",
  },
  {
    q: "Can you work alongside our in-house engineers?",
    a: "Absolutely. We often embed with internal teams, pair on architecture and leave behind the practices, tooling and docs your team needs to own the product.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading
          align="left"
          eyebrow="FAQ"
          title={
            <>
              Questions, <span className="text-gradient">answered</span>
            </>
          }
          description="Can't find what you're looking for? Reach out — a real engineer will reply within one business day."
        />
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-white/10">
                <AccordionTrigger className="py-5 text-left font-heading text-base hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
