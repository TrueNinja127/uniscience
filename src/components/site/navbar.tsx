"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowRight, Menu } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#platform", label: "Platform" },
  { href: "#process", label: "Process" },
  { href: "#testimonials", label: "Clients" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-2xl border px-4 py-2.5 transition-all duration-500 sm:px-5",
          scrolled
            ? "border-white/10 bg-background/70 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Link href="/" aria-label="Uniscience home">
          <Logo />
        </Link>

        <ul
          className="hidden items-center gap-1 md:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="relative">
              <a
                href={link.href}
                onMouseEnter={() => setHovered(link.href)}
                className="relative z-10 block px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
              {hovered === link.href && (
                <motion.span
                  layoutId="nav-hover"
                  className="absolute inset-0 rounded-lg bg-white/[0.06]"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="lg" asChild>
            <a href="#contact">Sign in</a>
          </Button>
          <Button variant="brand" size="lg" asChild>
            <a href="#contact">
              Start a project <ArrowRight data-icon="inline-end" />
            </a>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="glass"
              size="icon-lg"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="border-white/10 bg-background/95 backdrop-blur-xl">
            <SheetTitle className="px-6 pt-6">
              <Logo showTagline />
            </SheetTitle>
            <ul className="flex flex-col gap-1 px-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <SheetClose asChild>
                    <a
                      href={link.href}
                      className="block rounded-lg px-3 py-3 text-base text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                </li>
              ))}
            </ul>
            <div className="mt-auto p-6">
              <SheetClose asChild>
                <Button variant="brand" size="xl" className="w-full" asChild>
                  <a href="#contact">
                    Start a project <ArrowRight />
                  </a>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  );
}
