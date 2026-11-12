import { Mail, MapPin, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Company email, phone and postal address, as a semantic <address> block. */
export function CompanyContact({ className }: { className?: string }) {
  const { address } = SITE;
  const rows = [
    { icon: Mail, label: SITE.email, href: `mailto:${SITE.email}` },
    { icon: Phone, label: SITE.phone, href: SITE.phoneHref },
  ];

  return (
    <address className={cn("grid gap-3 text-[0.95rem] not-italic text-mono", className)}>
      {rows.map(({ icon: Icon, label, href }) => (
        <a key={href} href={href} className="group flex w-max items-center gap-3 transition-colors hover:text-foreground">
          <Icon className="size-4 shrink-0 text-signal" />
          {label}
        </a>
      ))}
      <p className="flex items-start gap-3">
        <MapPin className="mt-1 size-4 shrink-0 text-signal" />
        <span>
          {address.street}
          <br />
          {address.city}, {address.region} {address.postalCode}, USA
        </span>
      </p>
    </address>
  );
}
