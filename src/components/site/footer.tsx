import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { BackToTop, FooterWordmark } from "@/components/site/footer-parts";

const CONTACTS = [
  { label: "New projects", value: "hello@uniscience.io" },
  { label: "Careers", value: "careers@uniscience.io" },
  { label: "Press & partnerships", value: "press@uniscience.io" },
];

const COLUMNS = [
  {
    title: "Capabilities",
    links: [
      ["AI & Machine Learning", "#services"],
      ["LLM Agents & Copilots", "#services"],
      ["Scientific Computing", "#services"],
      ["Data Platforms", "#services"],
      ["Cloud & DevOps", "#services"],
    ],
  },
  {
    title: "Industries",
    links: [
      ["Life Sciences", "#industries"],
      ["Pharmaceuticals", "#industries"],
      ["Climate & Energy", "#industries"],
      ["Materials Science", "#industries"],
      ["Advanced Manufacturing", "#industries"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Approach", "#approach"],
      ["Process", "#process"],
      ["Client stories", "#testimonials"],
      ["Careers", "mailto:careers@uniscience.io"],
      ["Contact", "#contact"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Uniscience Fusion", "#services"],
      ["Case studies", "#solutions"],
      ["Security", "#services"],
      ["FAQ", "#faq"],
    ],
  },
];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "#",
    d: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z",
  },
  {
    label: "GitHub",
    href: "#",
    d: "M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3",
  },
  {
    label: "X",
    href: "#",
    d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "YouTube",
    href: "#",
    d: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z",
  },
];

async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink">
      {/* Backdrop: faint measurement grid + signal glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-60 left-1/2 h-[480px] w-[1000px] -translate-x-1/2 rounded-full bg-signal/10 blur-[140px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Statement + contacts */}
        <div className="grid gap-14 py-20 lg:grid-cols-[1.25fr_1fr] lg:gap-20 lg:py-28">
          <div>
            <p className="font-mono text-[0.7rem] tracking-[0.22em] text-signal uppercase">
              Unified Science Technology
            </p>
            <h2 className="display mt-6 text-[clamp(2.6rem,5.5vw,5rem)]">
              Engineering the
              <br />
              future of <span className="text-gradient">science.</span>
            </h2>
            <p className="mt-8 max-w-md font-mono text-sm leading-relaxed text-mono">
              We help research-driven organisations turn breakthroughs into
              software that scales — responsibly, securely and fast.
            </p>
          </div>

          <ul className="self-end border-t border-white/10">
            {CONTACTS.map((c) => (
              <li key={c.label} className="border-b border-white/10">
                <a
                  href={`mailto:${c.value}`}
                  className="group flex items-center justify-between gap-6 py-6"
                >
                  <span>
                    <span className="block font-mono text-[0.65rem] tracking-[0.2em] text-mono uppercase">
                      {c.label}
                    </span>
                    <span className="mt-1.5 block text-xl font-light transition-colors group-hover:text-signal sm:text-2xl">
                      {c.value}
                    </span>
                  </span>
                  <span className="flex size-11 shrink-0 items-center justify-center border border-white/15 transition-all duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-ink">
                    <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div className="grid gap-12 border-t border-white/10 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div className="flex flex-col gap-6">
            <Logo className="h-10 self-start" />
            <p className="max-w-xs font-mono text-xs leading-relaxed text-mono">
              AI, data and cloud platforms engineered with scientific rigor.
            </p>
            <ul className="flex gap-2">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="flex size-10 items-center justify-center border border-white/10 text-foreground/60 transition-all hover:border-signal hover:text-signal hover:shadow-[0_0_18px_-6px] hover:shadow-signal"
                  >
                    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                      <path d={s.d} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {COLUMNS.map((col, ci) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.2em] text-mono uppercase">
                <span className="text-signal">{String(ci + 1).padStart(2, "0")}</span>
                {col.title}
              </h3>
              <ul className="mt-6 space-y-3">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="group relative inline-flex items-center gap-2 text-[1.05rem] font-light text-foreground/70 transition-colors hover:text-foreground"
                    >
                      <span className="h-px w-0 bg-signal transition-all duration-300 group-hover:w-3" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Status bar */}
        <div className="flex flex-col gap-6 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[0.68rem] tracking-[0.14em] text-mono uppercase">
            <span className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-signal" />
              </span>
              All systems operational
            </span>
            <span>Remote-first · 12 countries</span>
            <span>Built for science · Designed for scale</span>
          </div>
          <BackToTop />
        </div>
      </div>

      <FooterWordmark />

      {/* Legal */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 font-mono text-[0.65rem] text-dim sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © <CopyrightYear /> Uniscience — Unified Science Technology. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {["Privacy", "Terms", "Cookies", "Accessibility"].map((l) => (
              <li key={l}>
                <a href="#" className="transition-colors hover:text-foreground">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mx-auto max-w-7xl px-5 pb-6 font-mono text-[0.6rem] leading-relaxed text-dim/70 sm:px-8">
          Photography via{" "}
          <a href="https://unsplash.com" className="underline-offset-2 hover:underline">
            Unsplash
          </a>{" "}
          — Abu Saeid, Chidera Faustina Okeke, Compagnons,{" "}
          <a href="https://www.domaintechnik.at/" className="underline-offset-2 hover:underline">
            Domaintechnik
          </a>
          , Toon Lambrechts, Bermix Studio, National Cancer Institute, CDC.
        </p>
      </div>
    </footer>
  );
}
