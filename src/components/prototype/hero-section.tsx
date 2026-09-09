"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { BrandMark } from "@/components/prototype/brand-mark";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("all", () => {
        if (window.scrollY > 80 || (window.location.hash && window.location.hash !== "#inicio")) {
          gsap.set(".hero-intro", { display: "none" });
          return;
        }
        gsap.set(".hero-intro", { visibility: "visible" });
        gsap.set(".hero-content", { autoAlpha: 0, y: 34 });
        gsap.set(".hero-image", { scale: 1.09 });

        const intro = gsap.timeline({ defaults: { ease: "power3.inOut" } });
        intro
          .from(".intro-logo .logo-piece-a", { x: -150, y: -70, autoAlpha: 0, duration: 0.7 }, 0.1)
          .from(".intro-logo .logo-piece-b", { x: 145, y: -35, autoAlpha: 0, duration: 0.7 }, 0.1)
          .from(".intro-logo .logo-piece-c", { x: -145, y: 55, autoAlpha: 0, duration: 0.7 }, 0.1)
          .from(".intro-logo .logo-piece-d", { y: 150, autoAlpha: 0, duration: 0.8 }, 0.1)
          .from(".intro-logo > span:last-child", { y: 18, autoAlpha: 0, duration: 0.45 }, 0.68)
          .to(".intro-logo", { scale: 1.22, duration: 0.65, ease: "power2.in" }, 1.35)
          .to(".hero-intro", { autoAlpha: 0, duration: 0.7 }, 1.55)
          .to(".hero-image", { scale: 1, duration: 1.15 }, 1.5)
          .to(".hero-content", { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" }, 1.82)
          .set(".hero-intro", { display: "none" });

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
      <div className="hero-image-wrap absolute inset-0 -z-30 origin-center">
        <Image
          className="hero-image absolute inset-0 h-full w-full object-cover object-[68%_center]"
          src="/images/evento/expo-hero-banner.png"
          alt="Serranía multicolor del Hornocal en Jujuy"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className="hero-shade absolute inset-0 -z-20" />
      <div className="hero-vignette absolute inset-0 -z-10" />

      <div aria-hidden="true" className="hero-intro invisible pointer-events-none fixed inset-0 z-[70] grid place-items-center bg-[#f7f8fc] text-[#0b123b]">
        <BrandMark intro />
      </div>

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
