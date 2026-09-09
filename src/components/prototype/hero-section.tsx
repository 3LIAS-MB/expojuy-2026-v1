"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowRight, FaCalendarDays, FaLocationDot, FaPause, FaPlay } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface HeroSectionProps {
  introFinished?: boolean;
}

export function HeroSection({ introFinished = true }: HeroSectionProps) {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPaused, setVideoPaused] = useState(false);

  // Reproducción inteligente del video de fondo sincronizada con la intro
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!introFinished || videoPaused) {
      video.pause();
    } else {
      void video.play().catch(() => setVideoPaused(true));
    }
  }, [introFinished, videoPaused]);

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
      <svg
        aria-hidden="true"
        className="expo-connection-field pointer-events-none absolute inset-y-0 right-0 z-0 h-full w-[48%] min-w-[34rem]"
        viewBox="0 0 680 900"
        fill="none"
        preserveAspectRatio="none"
      >
        <g stroke="#25C0D4" strokeWidth="1.25" opacity="0.65">
          <path d="M680 70H512L438 144H286L224 206" />
          <path d="M680 184H566L484 266H344L266 344H154" />
          <path d="M680 372H534L462 444H332L264 512" />
          <path d="M680 580H554L486 648H388L306 730H178" />
        </g>
        <g fill="#BB8CFF">
          <rect x="502" y="62" width="18" height="18" rx="2" />
          <rect x="428" y="135" width="18" height="18" rx="2" />
          <rect x="474" y="257" width="18" height="18" rx="2" />
          <rect x="452" y="435" width="18" height="18" rx="2" />
          <rect x="476" y="639" width="18" height="18" rx="2" />
        </g>
        <g fill="#25C0D4">
          <circle cx="224" cy="206" r="5" />
          <circle cx="154" cy="344" r="5" />
          <circle cx="264" cy="512" r="5" />
          <circle cx="178" cy="730" r="5" />
        </g>
      </svg>

      {/* BOTÓN DE CONTROL REPRODUCIR / PAUSAR VIDEO DE FONDO */}
      {introFinished && (
        <button
          type="button"
          onClick={() => setVideoPaused((paused) => !paused)}
          aria-label={videoPaused ? "Reproducir video de fondo" : "Pausar video de fondo"}
          title={videoPaused ? "Reproducir video de fondo" : "Pausar video de fondo"}
          className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center border border-white/40 bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white shadow-lg cursor-pointer rounded-xs"
        >
          {videoPaused ? (
            <FaPlay className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          ) : (
            <FaPause className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          )}
        </button>
      )}

      <div className="hero-content mx-auto my-auto flex w-full max-w-[1480px] flex-col justify-center px-4 pt-20 pb-12 sm:px-8 sm:pt-28 sm:pb-14 lg:px-12 lg:pt-32 lg:pb-16 translate-y-0 sm:-translate-y-6 lg:-translate-y-10">
        <div className="max-w-[820px]">
          <p className="mb-3 sm:mb-4 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.20em] sm:tracking-[0.24em] text-[#25C0D4]">
            Muestra Multisectorial del NOA · Argentina
          </p>
          <h1 className="max-w-[780px] text-[clamp(2.35rem,8.5vw,7.35rem)] font-semibold leading-[0.88] tracking-[-0.06em]">
            El futuro
            <br />
            se encuentra
            <br />
            <span className="text-[#25C0D4]">en Jujuy.</span>
          </h1>
          <p className="mt-4 sm:mt-5 flex max-w-[650px] items-center gap-2.5 sm:gap-3 text-xs sm:text-base font-bold uppercase tracking-[0.05em] sm:tracking-[0.06em] text-white">
            <span aria-hidden className="h-px w-5 sm:w-8 shrink-0 bg-[#25C0D4]" />
            <span>Conectando países <span className="text-[#BB8CFF]">—</span> creando oportunidades</span>
          </p>

          {/* BADGE INSTITUCIONAL OFICIAL (17° Edición · Fechas · 2026 · Cámara de Comercio Exterior) - Rectangular & Responsivo */}
          <div className="mt-5 mb-5 sm:mt-6 sm:mb-6 w-full max-w-[640px] rounded-none border border-white/20 bg-gradient-to-r from-black/85 via-[#070e24]/90 to-black/85 p-2 xs:p-2.5 sm:p-4 backdrop-blur-md shadow-[0_12px_36px_rgba(0,0,0,0.55)]">
            <div className="grid grid-cols-12 items-center divide-x divide-white/20">
              {/* 17° Edición */}
              <div className="col-span-3 flex flex-col items-center justify-center text-center px-1 sm:px-2">
                <span className="text-2xl xs:text-3xl sm:text-4xl font-black tracking-tight text-white leading-none">
                  17°
                </span>
                <span className="text-[9px] xs:text-[10px] sm:text-xs font-semibold text-white/90 tracking-wide mt-1 uppercase">
                  Edición
                </span>
              </div>

              {/* 09 al 12 OCTUBRE + CIUDAD CULTURAL */}
              <div className="col-span-4 flex flex-col items-center justify-center text-center px-1 sm:px-3">
                <div className="bg-[#00c2de] text-white px-2 py-1 sm:px-3.5 sm:py-1.5 rounded-none shadow-sm flex flex-col items-center justify-center w-full max-w-[130px]">
                  <span className="text-[10px] xs:text-xs sm:text-sm font-bold tracking-tight text-white leading-tight">
                    09 al 12
                  </span>
                  <span className="text-[10px] xs:text-xs sm:text-sm font-black tracking-wider text-white leading-tight uppercase">
                    OCTUBRE
                  </span>
                </div>
                <span className="text-[8px] xs:text-[9px] sm:text-[11px] font-bold tracking-[0.10em] sm:tracking-[0.16em] text-[#BB8CFF] mt-1 sm:mt-1.5 uppercase leading-none whitespace-nowrap">
                  CIUDAD CULTURAL
                </span>
              </div>

              {/* 20 / 26 + Línea púrpura */}
              <div className="col-span-2 flex flex-col items-center justify-center text-center px-1 sm:px-2">
                <div className="flex flex-col items-center justify-center leading-none">
                  <span
                    className="text-xl xs:text-2xl sm:text-3xl font-light tracking-tight text-transparent leading-none"
                    style={{ WebkitTextStroke: "1.25px #ffffff" }}
                  >
                    20
                  </span>
                  <span className="text-xl xs:text-2xl sm:text-3xl font-black tracking-tight text-white leading-none">
                    26
                  </span>
                </div>
                <div className="w-full max-w-[32px] sm:max-w-[42px] h-0.5 sm:h-[2.5px] bg-[#BB8CFF] mt-1 sm:mt-1.5 rounded-none" />
              </div>

              {/* Logo Cámara de Comercio Exterior de Jujuy */}
              <div className="col-span-3 flex flex-col items-center justify-center text-center px-1 sm:px-2">
                <div className="relative h-10 w-12 xs:h-12 xs:w-14 sm:h-14 sm:w-16">
                  <Image
                    src="/images/brand/logo_camcomext_white.png"
                    alt="Cámara de Comercio Exterior de Jujuy"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          <p className="max-w-[580px] text-sm sm:text-base leading-relaxed text-white/88 sm:text-lg">
            Industria, innovación, cultura y oportunidades. Un lugar para conectar,
            crear y crecer.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 w-auto rounded-md bg-[#820CD0] px-6 text-base font-semibold text-white shadow-[0_12px_34px_rgba(130,12,208,.35)] hover:bg-[#6c0aa9]"
            >
              <a href="#sobre" className="inline-flex items-center gap-2">
                Conocé ExpoJuy
                <FaArrowRight aria-hidden className="size-3.5" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 w-auto rounded-md border-white/50 bg-black/10 px-6 text-base text-white backdrop-blur-sm hover:bg-white hover:text-[#0b123b]"
            >
              <a href="#expositores">Ver expositores</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
