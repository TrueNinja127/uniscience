import {
  Atom,
  Dna,
  FlaskConical,
  Hexagon,
  Microscope,
  Orbit,
  Rocket,
  Telescope,
} from "lucide-react";

// Placeholder client names — swap for real customer logos.
const CLIENTS = [
  { name: "Helix Labs", icon: Dna },
  { name: "Quanta", icon: Atom },
  { name: "Orbitly", icon: Orbit },
  { name: "Novagen", icon: FlaskConical },
  { name: "Lumen Bio", icon: Microscope },
  { name: "Polaris", icon: Telescope },
  { name: "Hexa Cloud", icon: Hexagon },
  { name: "Ascend", icon: Rocket },
];

export function LogoCloud() {
  return (
    <section className="relative py-12">
      <p className="text-center text-sm text-muted-foreground">
        Powering research labs, scale-ups and enterprises
      </p>
      <div
        className="mask-fade-x group mt-8 flex overflow-hidden [--marquee-duration:36s]"
      >
        <div className="flex shrink-0 animate-marquee items-center gap-14 pr-14 group-hover:[animation-play-state:paused]">
          {[...CLIENTS, ...CLIENTS].map(({ name, icon: Icon }, i) => (
            <div
              key={i}
              aria-hidden={i >= CLIENTS.length}
              className="flex shrink-0 items-center gap-2 text-white/40 transition-colors hover:text-white/80"
            >
              <Icon className="size-6" />
              <span className="font-heading text-xl font-semibold tracking-tight">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
