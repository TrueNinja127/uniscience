import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";

export type LegalSection = {
  id: string;
  title: string;
  body: React.ReactNode;
};

/** Shared layout for legal documents: hero, sticky contents rail, readable article. */
export function LegalPage({
  title,
  summary,
  updated,
  sections,
}: {
  title: string;
  summary: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <Header />
      <main className="relative flex-1 overflow-x-clip">
        {/* Ambient light, echoing the home page */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[520px] overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-signal/[0.08] blur-[130px]" />
          <div className="absolute -top-20 right-[10%] h-[320px] w-[420px] rounded-full bg-brand-sky/[0.08] blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pt-36 pb-24 sm:px-8 lg:pt-44">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pr-4 pl-2 text-sm text-foreground/75 transition-colors hover:border-signal/40 hover:text-foreground"
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-white/[0.06]">
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            </span>
            Back to home
          </Link>

          <header className="mt-10 max-w-3xl">
            <p className="eyebrow text-signal">Legal</p>
            <h1 className="display mt-4 text-[clamp(2.6rem,6vw,4.75rem)]">{title}</h1>
            <p className="mt-6 text-lg leading-relaxed font-light text-foreground/75">{summary}</p>
            <p className="mt-6 inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-mono">
              Last updated: {updated}
            </p>
          </header>

          <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-[260px_1fr] lg:gap-16">
            {/* Contents */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <nav
                aria-label="On this page"
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md"
              >
                <p className="eyebrow text-mono">On this page</p>
                <ol className="mt-4 space-y-1">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="flex gap-3 rounded-xl px-2 py-1.5 text-sm text-foreground/70 transition-colors hover:bg-white/[0.04] hover:text-foreground"
                      >
                        <span className="text-signal/80 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            {/* Document */}
            <article className="max-w-3xl">
              {sections.map((s, i) => (
                <section
                  key={s.id}
                  id={s.id}
                  className="scroll-mt-28 border-t border-white/[0.08] py-10 first:border-t-0 first:pt-0"
                >
                  <h2 className="flex items-baseline gap-4 text-2xl font-normal tracking-tight sm:text-[1.75rem]">
                    <span className="text-base text-signal tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </h2>
                  <div className="legal-prose mt-5">{s.body}</div>
                </section>
              ))}

              <div className="mt-6 flex flex-col gap-5 rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-signal/[0.08] via-white/[0.02] to-brand-sky/[0.06] p-7 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-lg font-medium">Questions about this document?</p>
                  <p className="mt-1 text-[0.95rem] text-mono">We are happy to help. Just get in touch.</p>
                </div>
                <a
                  href="mailto:info@uniscience.io"
                  className="inline-flex h-11 items-center gap-2 self-start rounded-full bg-brand-gradient px-6 text-sm font-medium text-ink transition-[filter,box-shadow] hover:shadow-[0_8px_32px_-6px] hover:shadow-signal/60 hover:brightness-110 sm:self-auto"
                >
                  <Mail className="size-4" /> info@uniscience.io
                </a>
              </div>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
