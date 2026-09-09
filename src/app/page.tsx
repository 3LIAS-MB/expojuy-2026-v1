"use client";

import { useCallback, useEffect, useState } from "react";
import BrandingIntro from "@/components/BrandingIntro";
import { AboutExperience } from "@/components/prototype/about-experience";
import { ExhibitorsSection } from "@/components/prototype/exhibitors-section";
import { HeroSection } from "@/components/prototype/hero-section";
import { SiteHeader } from "@/components/prototype/site-header";
import { SponsorsMarquee } from "@/components/prototype/sponsors-marquee";
import { NewsSection } from "@/components/news/NewsSection";
import { LocationSection } from "@/components/prototype/location-section";

import FaqSection from "@/components/FaqSection";
import { SocialSection } from "@/components/social/SocialSection";
import { Expo3DCarousel } from "@/components/Expo3DCarousel";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isPlayingIntro, setIsPlayingIntro] = useState(true);
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setIsPlayingIntro(false);
    setIntroFinished(true);
  }, []);

  const handleReplayIntro = useCallback(() => {
    setIntroFinished(false);
    setIsPlayingIntro(true);
  }, []);

  return (
    <>
      {/* ANIMACIÓN CINEMÁTICA DE ENTRADA (MONTADA EN CLIENTE PARA EVITAR ERRORES DE HIDRATACIÓN) */}
      {mounted && (
        <BrandingIntro
          isPlaying={isPlayingIntro}
          onAnimationComplete={handleIntroComplete}
        />
      )}

      <a className="skip-link" href="#contenido">
        Ir al contenido
      </a>

      {/* HEADER CON DOCKING DE LOGO VECTORIAL Y BOTÓN REPETIR */}
      <SiteHeader
        showDockedLogo={introFinished}
        onReplayIntro={handleReplayIntro}
      />

      <main id="contenido">
        <HeroSection introFinished={introFinished} />
        <AboutExperience />
        <Expo3DCarousel />
        <SponsorsMarquee />
        <ExhibitorsSection />
        <NewsSection />
        <LocationSection />
        <FaqSection />
        <SocialSection />
      </main>

      <Footer />
    </>
  );
}
