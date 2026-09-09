"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CalendarDays, MapPin, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface HeroSectionProps {
  introFinished?: boolean;
}

export function HeroSection({ introFinished = true }: HeroSectionProps) {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reproducción inteligente del video de fondo sincronizada con la intro
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!introFinished || (mounted && reduceMotion) || videoPaused) {
      video.pause();
    } else {
      void video.play().catch(() => setVideoPaused(true));
    }
  }, [introFinished, reduceMotion, videoPaused, mounted]);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("all", () => {
        gsap.fromTo(
          ".hero-image-wrap",
          { scale: 1 },
          {
            scale: 1.045,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="inicio"
      className="relative isolate flex min-h-[100dvh] overflow-hidden bg-[#080d24] text-white"
    >
      {/* VIDEO / IMAGEN DE FONDO DEL HERO */}
      <div className="hero-image-wrap absolute inset-0 -z-30 origin-center">
        <Image
          className="hero-image absolute inset-0 h-full w-full object-cover object-[68%_center]"
          src="/images/hero/hero-banner.png"
          alt="Cerros multicolores y predio de ExpoJuy"
          fill
          priority
          sizes="100vw"
        />

        <video
          ref={videoRef}
          src={introFinished ? "/video/Best%20of%20HANNOVER%20MESSE%202026.mp4" : undefined}
          poster="/images/hero/hero-banner.png"
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[68%_center]"
        />
      </div>

      <div className="hero-shade absolute inset-0 -z-20 pointer-events-none" />
      <div className="hero-vignette absolute inset-0 -z-10 pointer-events-none" />

      {/* BOTÓN DE CONTROL REPRODUCIR / PAUSAR VIDEO DE FONDO */}
      {mounted && !reduceMotion && introFinished && (
        <button
          type="button"
          onClick={() => setVideoPaused((paused) => !paused)}
          aria-label={videoPaused ? "Reproducir video de fondo" : "Pausar video de fondo"}
          title={videoPaused ? "Reproducir video de fondo" : "Pausar video de fondo"}
          className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center border border-white/40 bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white shadow-lg cursor-pointer rounded-xs"
        >
          {videoPaused ? (
            <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          ) : (
            <Pause className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          )}
        </button>
      )}

      <div className="hero-content mx-auto flex w-full max-w-[1480px] flex-col justify-end px-5 pb-9 pt-32 sm:px-8 sm:pb-12 lg:px-12 lg:pb-14">
        <div className="max-w-[820px]">
          <p className="mb-7 text-xs font-semibold uppercase tracking-[0.24em] text-white/85">
            Jujuy, Argentina · Encuentro multisectorial 2026
          </p>
          <h1 className="max-w-[780px] text-[clamp(3.45rem,7.1vw,7.35rem)] font-semibold leading-[0.86] tracking-[-0.065em]">
            El futuro
            <br />
            se encuentra
            <br />
            <span className="text-[#f4c64c]">en Jujuy.</span>
          </h1>
          <p className="mt-7 max-w-[580px] text-base leading-relaxed text-white/88 sm:text-lg">
            Industria, innovación, cultura y oportunidades. Un lugar para conectar,
            crear y crecer.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-md bg-[#6b20df] px-6 text-base font-semibold text-white shadow-[0_12px_34px_rgba(66,9,158,.35)] hover:bg-[#5917c2]"
            >
              <a href="#sobre">
                Conocé ExpoJuy
                <ArrowRight aria-hidden className="size-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-md border-white/50 bg-black/10 px-6 text-base text-white backdrop-blur-sm hover:bg-white hover:text-[#0b123b]"
            >
              <a href="#expositores">Ver expositores</a>
            </Button>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/25 pt-5 text-sm text-white/82">
          <span className="inline-flex items-center gap-2">
            <CalendarDays aria-hidden className="size-4 text-[#19b9ca]" />
            2026 · Fecha por anunciar
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin aria-hidden className="size-4 text-[#f4c64c]" />
            Jujuy, Argentina
          </span>
        </div>
      </div>
    </section>
  );
}
