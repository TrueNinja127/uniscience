import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { LogoCloud } from "@/components/site/logo-cloud";
import { Stats } from "@/components/site/stats";
import { Services } from "@/components/site/services";
import { Platform } from "@/components/site/platform";
import { Process } from "@/components/site/process";
import { Testimonials } from "@/components/site/testimonials";
import { Faq } from "@/components/site/faq";
import { Cta } from "@/components/site/cta";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-x-clip">
        <Hero />
        <LogoCloud />
        <Stats />
        <Services />
        <Platform />
        <Process />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
