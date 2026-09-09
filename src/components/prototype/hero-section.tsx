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

      <div className="hero-content mx-auto my-auto flex w-full max-w-[1480px] flex-col justify-center px-5 pt-24 pb-10 sm:px-8 sm:pt-28 sm:pb-12 lg:px-12 lg:pt-32 lg:pb-14 -translate-y-4 sm:-translate-y-8 lg:-translate-y-12">
        <div className="max-w-[820px]">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-white/85">
            17.ª edición · 09 al 12 de octubre · Ciudad Cultural
          </p>
          <h1 className="max-w-[780px] text-[clamp(3.45rem,7.1vw,7.35rem)] font-semibold leading-[0.86] tracking-[-0.065em]">
            El futuro
            <br />
            se encuentra
            <br />
            <span className="text-[#25C0D4]">en Jujuy.</span>
          </h1>
          <p className="mt-5 flex max-w-[650px] items-center gap-3 text-sm font-bold uppercase tracking-[0.06em] text-white sm:text-base">
            <span aria-hidden className="h-px w-8 shrink-0 bg-[#25C0D4]" />
            Conectando países <span className="text-[#BB8CFF]">—</span> creando oportunidades
          </p>
          <p className="mt-5 max-w-[580px] text-base leading-relaxed text-white/88 sm:text-lg">
            Industria, innovación, cultura y oportunidades. Un lugar para conectar,
            crear y crecer.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-md bg-[#820CD0] px-6 text-base font-semibold text-white shadow-[0_12px_34px_rgba(130,12,208,.35)] hover:bg-[#6c0aa9]"
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
              className="h-12 rounded-md border-white/50 bg-black/10 px-6 text-base text-white backdrop-blur-sm hover:bg-white hover:text-[#0b123b]"
            >
              <a href="#expositores">Ver expositores</a>
            </Button>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/25 pt-5 text-sm text-white/82">
          <span className="inline-flex items-center gap-2">
            <FaCalendarDays aria-hidden className="size-3.5 text-[#25C0D4]" />
            09 al 12 de octubre · 2026
          </span>
          <span className="inline-flex items-center gap-2">
            <FaLocationDot aria-hidden className="size-3.5 text-[#BB8CFF]" />
            Ciudad Cultural · Jujuy
          </span>
        </div>
      </div>
    </section>
  );
}
