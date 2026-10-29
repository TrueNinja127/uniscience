import { Header } from "@/components/site/header";
import { ScaleRuler } from "@/components/site/scale-ruler";
import { SceneBackdrop } from "@/components/three/scene-backdrop";
import { Hero } from "@/components/site/hero";
import { Approach } from "@/components/site/approach";
import { Services } from "@/components/site/services";
import { Solutions } from "@/components/site/solutions";
import { Industries } from "@/components/site/industries";
import { Process } from "@/components/site/process";
import { Voices } from "@/components/site/voices";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <Header />
      <SceneBackdrop />
      <ScaleRuler />
      {/* Fine film grain for photographic depth */}
      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[45] opacity-[0.05] mix-blend-overlay" />
      <main className="relative z-10 flex-1 overflow-x-clip">
        <Hero />
        <Approach />
        <Services />
        <Solutions />
        <Industries />
        <Process />
        <Voices />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
