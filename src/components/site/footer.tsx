import { Logo } from "@/components/brand/logo";

const COLUMNS = [
  {
    title: "Services",
    links: ["AI & Machine Learning", "LLM Agents", "Data Platforms", "Scientific Computing"],
  },
  { title: "Company", links: ["About", "Careers", "Case studies", "Journal"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
];

async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.6fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-6">
          <Logo className="h-10 self-start" />
          <p className="max-w-xs font-mono text-xs leading-relaxed text-mono">
            AI, data and cloud platforms engineered with scientific rigor.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="font-mono text-xs tracking-[0.18em] text-signal uppercase">{col.title}</h3>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-lg font-light text-foreground/70 transition-colors hover:text-foreground">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 font-mono text-[0.7rem] text-dim sm:flex-row sm:justify-between sm:px-8">
          <p>
            © <CopyrightYear /> Uniscience · Unified Science Technology
          </p>
          <p className="flex items-center gap-2">
            <span className="size-1.5 animate-pulse rounded-full bg-signal" />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}
