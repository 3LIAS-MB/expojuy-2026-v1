import { AboutExperience } from "@/components/prototype/about-experience";
import { ExhibitorsSection } from "@/components/prototype/exhibitors-section";
import { HeroSection } from "@/components/prototype/hero-section";
import { SiteHeader } from "@/components/prototype/site-header";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Ir al contenido
      </a>
      <SiteHeader />
      <main id="contenido">
        <HeroSection />
        <AboutExperience />
        <ExhibitorsSection />
      </main>
    </>
  );
}
