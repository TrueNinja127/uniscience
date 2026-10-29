import { useId } from "react";
import { cn } from "@/lib/utils";

/** The Uniscience "US" ribbon mark, redrawn as a crisp vector. */
export function LogoMark({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg
      viewBox="-10 -10 260 282"
      fill="none"
      aria-hidden="true"
      className={cn("h-8 w-auto", className)}
    >
      <defs>
        <linearGradient
          id={id}
          x1="20"
          y1="250"
          x2="230"
          y2="10"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#0B4FE0" />
          <stop offset="0.38" stopColor="#0EA5E9" />
          <stop offset="0.66" stopColor="#14B8A6" />
          <stop offset="1" stopColor="#3FCF5C" />
        </linearGradient>
      </defs>
      <path
        d="M28 0V140C28 200 65 232 113 232C165 232 206 200 206 160C206 135 185 125 160 112L120 92C95 79 92 70 92 58C92 40 108 28 140 28H228"
        stroke={`url(#${id})`}
        strokeWidth="52"
      />
    </svg>
  );
}

export function Logo({
  className,
  showTagline = false,
}: {
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-8" />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-xl font-bold tracking-tight">
          uniscience
        </span>
        {showTagline && (
          <span className="mt-1 text-[0.62rem] font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Unified Science Technology
          </span>
        )}
      </span>
    </span>
  );
}
