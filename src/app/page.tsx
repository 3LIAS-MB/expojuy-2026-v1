import { HeroBanner } from "@/components/home/HeroBanner";
import { NewsAgendaSection } from "@/components/home/NewsAgendaSection";
import { CountdownSection } from "@/components/home/CountdownSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { SponsorsSection } from "@/components/home/SponsorsSection";
import { ExhibitorsSection } from "@/components/home/ExhibitorsSection";
import { RecentNewsSection } from "@/components/home/RecentNewsSection";
import { LocationMapSection } from "@/components/home/LocationMapSection";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-105px)] bg-white">
      {/* Hero Banner Section matching Singapore EXPO */}
      <HeroBanner />
      
      {/* News & Agenda Section */}
      <NewsAgendaSection />
      
      {/* Sponsors & Partners Marquee Grid Section */}
      <SponsorsSection />
      
      {/* 4 Black Cards Features Section matching Singapore EXPO */}
      <FeaturesSection />
      
      {/* 6 Cards Exhibitors Grid Section matching Singapore EXPO Host Your Event */}
      <ExhibitorsSection />
      
      {/* Asymmetric NewsHub Section matching Singapore EXPO */}
      <RecentNewsSection />

      {/* FIFA 2026 Style Live Countdown Timer Section with Dynamic Scroll Reveal */}
      <CountdownSection />

      {/* Event Map Scroll Zoom Section (Google Maps & Dark FIFA Mode) */}
      <LocationMapSection />
    </div>
  );
}
