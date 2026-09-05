import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import DualSwitcher from "@/components/DualSwitcher";
import PilaresSection from "@/components/PilaresSection";
import ExpositoresSection from "@/components/ExpositoresSection";
import AgendaSection from "@/components/AgendaSection";
import PlanoSection from "@/components/PlanoSection";
import AcreditacionSection from "@/components/AcreditacionSection";
import NewsSection from "@/components/NewsSection";
import ContactSection from "@/components/ContactSection";
import InstitutionalSection from "@/components/InstitutionalSection";
import SponsorsSection from "@/components/SponsorsSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent">
      <Navbar />
      <Hero />
      <AboutSection />
      <DualSwitcher />
      <PilaresSection />
      <ExpositoresSection />
      <AgendaSection />
      <PlanoSection />
      <AcreditacionSection />
      <NewsSection />
      <ContactSection />
      <InstitutionalSection />
      <SponsorsSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
