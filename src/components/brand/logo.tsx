import Image from "next/image";
import { cn } from "@/lib/utils";
import iconSrc from "@/assets/brand/uniscience-icon.png";
import logoLightSrc from "@/assets/brand/uniscience-logo-light.png";
import logoDarkSrc from "@/assets/brand/uniscience-logo-dark.png";

/**
 * Full Uniscience lockup (mark + wordmark + tagline).
 * `light` = white type for dark backgrounds, `dark` = original navy type for light ones.
 */
export function Logo({
  variant = "light",
  className,
  priority,
}: {
  variant?: "light" | "dark";
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={variant === "light" ? logoLightSrc : logoDarkSrc}
      alt="Uniscience, Unified Science Technology"
      priority={priority}
      sizes="(min-width: 1024px) 400px, 240px"
      className={cn("h-9 w-auto select-none", className)}
    />
  );
}

/** The "US" ribbon mark on its own. */
export function LogoMark({
  className,
  sizes = "64px",
  priority,
}: {
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={iconSrc}
      alt=""
      aria-hidden
      priority={priority}
      sizes={sizes}
      className={cn("size-8 select-none", className)}
    />
  );
}
