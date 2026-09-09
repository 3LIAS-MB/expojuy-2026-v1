"use client";

import { useCallback, useState } from "react";
import BrandingIntro from "@/components/BrandingIntro";
import { AboutExperience } from "@/components/prototype/about-experience";
import { ExhibitorsSection } from "@/components/prototype/exhibitors-section";
import { HeroSection } from "@/components/prototype/hero-section";
import { SiteHeader } from "@/components/prototype/site-header";

export default function Home() {
  const [isPlayingIntro, setIsPlayingIntro] = useState(true);
  const [introFinished, setIntroFinished] = useState(false);

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
      {/* ANIMACIÓN CINEMÁTICA DE ENTRADA DE MARCA (BRANDING INTRO) */}
      <BrandingIntro
        isPlaying={isPlayingIntro}
        onAnimationComplete={handleIntroComplete}
      />

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
        <ExhibitorsSection />
      </main>
    </>
  );
}
