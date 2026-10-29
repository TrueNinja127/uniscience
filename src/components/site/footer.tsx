import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { BackToTop } from "@/components/site/footer-parts";

const COLUMNS = [
  {
    title: "Capabilities",
    links: [
      ["AI & Machine Learning", "/#services"],
      ["LLM Agents & Copilots", "/#services"],
      ["Scientific Computing", "/#services"],
      ["Data Platforms", "/#services"],
      ["Cloud & DevOps", "/#services"],
    ],
  },
  {
    title: "Industries",
    links: [
      ["Life Sciences", "/#industries"],
      ["Pharmaceuticals", "/#industries"],
      ["Climate & Energy", "/#industries"],
      ["Materials Science", "/#industries"],
      ["Manufacturing", "/#industries"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Approach", "/#approach"],
      ["Process", "/#process"],
      ["Client stories", "/#testimonials"],
      ["Careers", "mailto:info@uniscience.io?subject=Careers"],
      ["Contact", "/#contact"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Uniscience Fusion", "/#services"],
      ["Use cases", "/#solutions"],
      ["Security", "/#services"],
      ["FAQ", "/#faq"],
    ],
  },
];

const SOCIALS = [
  {
    label: "LinkedIn",
    d: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z",
  },
  {
    label: "GitHub",
    d: "M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3",
  },
  {
    label: "X",
    d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "YouTube",
    d: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z",
  },
];

async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/[0.08] bg-ink">
      {/* A single, quiet light source keeps the footer from feeling flat */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 left-1/2 h-72 w-[min(1100px,100%)] -translate-x-1/2 rounded-full bg-signal/[0.07] blur-[110px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 py-16 lg:grid-cols-[1.25fr_2.75fr] lg:gap-20 lg:py-20">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Logo className="h-10 self-start" />
            <p className="max-w-xs text-[0.95rem] leading-relaxed text-mono">
              AI, data and cloud platforms for research-driven organisations,
              engineered with scientific rigor.
            </p>
            <a
              href="mailto:info@uniscience.io"
              className="w-max text-[0.95rem] text-foreground underline decoration-white/20 underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
            >
              info@uniscience.io
            </a>
            <ul className="mt-2 flex gap-2">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href="#"
                    aria-label={s.label}
                    className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-foreground/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-signal/50 hover:text-signal"
                  >
                    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                      <path d={s.d} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="text-sm font-medium text-foreground">{col.title}</h3>
                <ul className="mt-5 space-y-3.5">
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="text-sm text-mono transition-colors duration-200 hover:text-foreground"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-5 border-t border-white/[0.08] py-6 text-sm text-mono md:flex-row md:items-center md:justify-between">
          <p>
            © <CopyrightYear /> Uniscience · Unified Science Technology
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              ["Privacy policy", "/privacy"],
              ["Terms of service", "/terms"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="transition-colors hover:text-foreground">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-2 text-xs text-foreground/80">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-signal" />
              </span>
              All systems operational
            </span>
            <BackToTop />
          </div>
        </div>

        <p className="pb-8 text-xs leading-relaxed text-dim">
          Photography via{" "}
          <a href="https://unsplash.com" className="underline-offset-2 hover:underline">
            Unsplash
          </a>
          : Abu Saeid, Chidera Faustina Okeke, Compagnons,{" "}
          <a href="https://www.domaintechnik.at/" className="underline-offset-2 hover:underline">
            Domaintechnik
          </a>
          , Toon Lambrechts, Bermix Studio, National Cancer Institute, CDC.
        </p>
      </div>
    </footer>
  );
}
