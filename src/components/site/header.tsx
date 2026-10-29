"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
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
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled && !open ? "bg-ink/95 backdrop-blur-md" : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
          <Link href="/" aria-label="Uniscience home" onClick={() => setOpen(false)}>
            <Logo priority className="h-8 sm:h-9" />
          </Link>
          <div className="flex items-center gap-6">
            <Button variant="signal" size="lg" asChild className="hidden h-9 px-5 sm:inline-flex">
              <a href="#contact">Start a project</a>
            </Button>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="group flex items-center gap-3 text-lg tracking-[0.08em] uppercase"
            >
              <span className="relative block h-3 w-6">
                <span
                  className={cn(
                    "absolute left-0 h-px w-full bg-current transition-all duration-300",
                    open ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-px bg-current transition-all duration-300",
                    open ? "top-1.5 w-full -rotate-45" : "top-3 w-2/3 group-hover:w-full",
                  )}
                />
              </span>
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink"
          >
            <div className="pointer-events-none absolute -right-40 -bottom-40 size-[560px] rounded-full bg-signal/10 blur-[120px]" />
            <div className="mx-auto grid min-h-full max-w-7xl gap-12 px-5 pt-28 pb-12 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
              <ol className="flex flex-col">
                {LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease }}
                    className="border-b border-white/10"
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-5 py-3 sm:py-4"
                    >
                      <span className="font-mono text-xs text-signal">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="display text-4xl text-dim transition-colors group-hover:text-foreground sm:text-6xl">
                        {link.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ol>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col justify-end gap-8 font-mono text-sm text-mono"
              >
                <LogoMark className="size-20" sizes="80px" />
                <div className="space-y-1">
                  <p className="text-xs tracking-widest text-signal uppercase">New projects</p>
                  <a href="mailto:hello@uniscience.io" className="text-lg text-foreground hover:text-signal">
                    hello@uniscience.io
                  </a>
                </div>
                <p className="max-w-xs">
                  Unified Science Technology — AI, data and cloud platforms engineered with scientific rigor.
                </p>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
