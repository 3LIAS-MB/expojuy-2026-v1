import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import PilaresSection from "@/components/PilaresSection";
import ExpositoresSection from "@/components/ExpositoresSection";
import AgendaSection from "@/components/AgendaSection";
import PlanoSection from "@/components/PlanoSection";
import NewsSection from "@/components/NewsSection";
import AcreditacionSection from "@/components/AcreditacionSection";
import SponsorsSection from "@/components/SponsorsSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 1. Barra de Navegación */}
      <Navbar />

      {/* 2. Inicio / Hero */}
      <Hero />

      {/* 3. El Evento / Sobre ExpoJuy 2026 */}
      <AboutSection />

      {/* 4. Ejes Temáticos y Cifras de Impacto */}
      <PilaresSection />

      {/* 5. Directorio y Catálogo de Expositores */}
      <ExpositoresSection />

      {/* 6. Agenda y Cronograma de Actividades */}
      <AgendaSection />

      {/* 7. Plano / Mapa Interactivo del Predio */}
      <PlanoSection />

      {/* 8. Novedades, Noticias y Sala de Prensa */}
      <NewsSection />

      {/* 9. Entradas y Acreditaciones */}
      <AcreditacionSection />

      {/* 10. Sponsors y Patrocinadores */}
      <SponsorsSection />

      {/* 11. Preguntas Frecuentes (FAQ) */}
      <FaqSection />

      {/* 12. Contacto y Cómo Llegar */}
      <ContactSection />

      {/* 13. Pie de Página */}
      <Footer />
    </main>
  );
}
