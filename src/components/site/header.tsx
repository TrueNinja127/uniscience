"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Logo, LogoMark } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const LINKS = [
  { href: "#approach", label: "Approach" },
  { href: "#services", label: "What we build" },
  { href: "#solutions", label: "Solutions" },
  { href: "#industries", label: "Industries" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  // Freeze page scrolling behind the open menu.
  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lenis]);

  const pathname = usePathname();
  const router = useRouter();
  const onHome = pathname === "/";

  const go = (href: string) => {
    setOpen(false);
    if (!onHome) {
      router.push(`/${href}`);
      return;
    }
    // Wait for the menu to release scrolling, then glide to the section.
    requestAnimationFrame(() => lenis?.scrollTo(href, { offset: -80 }));
  };

  const floating = scrolled && !open;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease }}
          className={cn(
            "mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full border px-3 pl-5 transition-all duration-500 sm:pl-6",
            floating
              ? "border-white/10 bg-ink/70 shadow-[0_12px_40px_-12px_rgb(0_0_0/0.8)] backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <Link href="/" aria-label="Uniscience home" onClick={() => setOpen(false)}>
            <Logo priority className="h-8 sm:h-9" />
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="signal" size="lg" asChild className="hidden h-10 rounded-full px-5 sm:inline-flex">
              <a href={onHome ? "#contact" : "/#contact"}>
                Start a project <ArrowRight />
              </a>
            </Button>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="group flex h-10 items-center gap-3 px-2 text-sm font-medium text-foreground/85 transition-colors hover:text-foreground"
            >
              <span className="relative block h-2.5 w-5">
                <span
                  className={cn(
                    "absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-all duration-300",
                    open ? "top-[4px] rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-[1.5px] rounded-full bg-current transition-all duration-300",
                    open ? "top-[4px] w-full -rotate-45" : "top-[9px] w-3/5 group-hover:w-full",
                  )}
                />
              </span>
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 4rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 4rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 4rem) 2.5rem)" }}
            transition={{ duration: 0.8, ease }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink"
            data-lenis-prevent
          >
            <div className="pointer-events-none absolute -right-40 -bottom-40 size-[620px] rounded-full bg-signal/10 blur-[130px]" />
            <div className="pointer-events-none absolute -top-40 -left-40 size-[480px] rounded-full bg-brand-sky/10 blur-[130px]" />
            <div className="mx-auto grid min-h-full max-w-7xl gap-12 px-5 pt-28 pb-12 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:pt-32">
              <ol className="flex flex-col">
                {LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 40, rotateX: -40 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.2 + i * 0.05, duration: 0.7, ease }}
                    className="border-b border-white/10 [perspective:800px]"
                  >
                    <a
                      href={onHome ? link.href : `/${link.href}`}
                      onClick={(e) => {
                        e.preventDefault();
                        go(link.href);
                      }}
                      className="group flex items-center justify-between gap-5 py-3 sm:py-4"
                    >
                      <span className="flex items-baseline gap-5">
                        <span className="text-xs text-signal tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                        <span className="display text-4xl text-foreground/50 transition-colors duration-300 group-hover:text-foreground sm:text-6xl">
                          {link.label}
                        </span>
                      </span>
                      <ArrowUpRight className="size-6 -translate-x-2 text-signal opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                    </a>
                  </motion.li>
                ))}
              </ol>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7, ease }}
                className="flex flex-col justify-end gap-8 text-sm text-mono"
              >
                <LogoMark className="size-20" sizes="80px" />
                <div className="space-y-1">
                  <p className="eyebrow text-signal">New projects</p>
                  <a href="mailto:info@uniscience.io" className="text-xl text-foreground hover:text-signal">
                    info@uniscience.io
                  </a>
                </div>
                <p className="max-w-xs leading-relaxed">
                  Unified Science Technology. AI, data and cloud platforms engineered with scientific rigor.
                </p>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
