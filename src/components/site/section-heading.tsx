import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" ? "mx-auto items-center text-center" : "items-start",
        className,
      )}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
        <span className="size-1.5 rounded-full bg-brand-gradient" />
        {eyebrow}
      </span>
      <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-base text-pretty text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
