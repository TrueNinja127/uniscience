import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TraceSection } from "@/components/site/trace";
import { SectionLabel } from "@/components/site/section-label";

const FAQS = [
  {
    q: "What kinds of companies do you work with?",
    a: "Research-driven startups, scale-ups and enterprise R&D groups in life sciences, climate, materials, manufacturing and finance: wherever complex data meets demanding users.",
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
    a: "You do, 100%. Source code, models, designs and documentation are transferred to you, with no lock-in to our tooling or people.",
  },
  {
    q: "Can you work alongside our in-house team?",
    a: "Yes. We regularly embed with internal teams, pair on architecture, and leave behind the practices and documentation your team needs to own the product.",
  },
];

export function Faq() {
  return (
    <TraceSection id="faq" from={10} innerClassName="py-24 lg:py-32">
      <div className="lg:ml-[16%]">
        <SectionLabel index={6} label="FAQ" />
        <h2 className="display mt-6 text-[clamp(2.4rem,4.4vw,4rem)]">
          <span className="text-dim">Questions,</span>
          <br />
          <span className="text-brand-green">answered</span>
        </h2>
        <Accordion type="single" collapsible defaultValue="item-0" className="mt-12">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`item-${i}`}
              className="mb-3 rounded-[1.5rem] border border-white/10 bg-white/[0.02] px-6 transition-colors duration-300 not-last:border-b data-[state=open]:border-signal/30 data-[state=open]:bg-white/[0.045]"
            >
              <AccordionTrigger className="items-center gap-6 py-5 text-left text-lg font-light hover:no-underline sm:text-xl [&>svg]:text-signal">
                <span className="flex items-baseline gap-5">
                  <span className="text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
                  {f.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pl-10 text-[0.95rem] leading-relaxed text-mono">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </TraceSection>
  );
}
