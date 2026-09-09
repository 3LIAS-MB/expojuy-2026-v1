"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaHandshake,
  FaIndustry,
  FaLightbulb,
  FaMountainSun,
} from "react-icons/fa6";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const eventFacts = [
  { value: "17.ª", label: "edición" },
  { value: "9—12", label: "octubre 2026" },
  { value: "18.000", label: "m² previstos" },
  { value: "Ciudad Cultural", label: "San Salvador de Jujuy" },
];

export function AboutExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const mountainFrontRef = useRef<HTMLImageElement>(null);
  const mountainMidRef = useRef<HTMLImageElement>(null);
  const mountainBackRef = useRef<HTMLImageElement>(null);
  const stepRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;
      const media = gsap.matchMedia();
      const panels = Array.from(
        track.querySelectorAll<HTMLElement>("[data-about-panel]"),
      );

      media.add({ desktop: "(min-width: 768px)" }, (context) => {
        if (!context.conditions?.desktop) return;
        section.dataset.horizontal = "true";

        const distance = () => (panels.length - 1) * window.innerWidth;
        const updateMountain = (progress: number) => {
          const isLg = window.innerWidth >= 1024;

          // Capa 3: Cerro 03 (el cerro más lejano al fondo - mayor desplazamiento parallax notorio)
          if (mountainBackRef.current) {
            const shiftX = (0.5 - progress) * (isLg ? 480 : 280);
            const shiftY = Math.sin(progress * Math.PI) * (isLg ? -28 : -16);
            mountainBackRef.current.style.transform = `translate3d(calc(-50% + ${shiftX}px), ${shiftY}px, 0) scale(1.20)`;
          }

          // Capa 2: Cerro 02 (capa intermedia)
          if (mountainMidRef.current) {
            const shiftX = (0.5 - progress) * (isLg ? 240 : 140);
            const shiftY = Math.sin(progress * Math.PI) * (isLg ? -14 : -8);
            mountainMidRef.current.style.transform = `translate3d(calc(-50% + ${shiftX}px), ${shiftY}px, 0) scale(1.14)`;
          }

          // Capa 1: Cerro 01 (parte más baja o cercana en primer plano)
          if (mountainFrontRef.current) {
            const shiftX = (0.5 - progress) * (isLg ? 80 : 45);
            const shiftY = (1 - 2 * progress) * 4;
            mountainFrontRef.current.style.transform = `translate3d(calc(-50% + ${shiftX}px), ${shiftY}px, 0) scale(1.08)`;
          }
        };
        updateMountain(0);
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          onUpdate: function () {
            const progress = this.progress();
            updateMountain(progress);
            const activeIndex = Math.min(
              panels.length - 1,
              Math.floor(progress * panels.length),
            );
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${Math.max(0.04, progress)})`;
            }
            if (counterRef.current) {
              counterRef.current.textContent = String(activeIndex + 1).padStart(
                2,
                "0",
              );
            }
            stepRefs.current.forEach((step, index) => {
              if (!step) return;
              const isActive = index === activeIndex;
              step.dataset.active = String(isActive);
              step.setAttribute("aria-current", String(isActive));
            });
          },
          scrollTrigger: {
            id: "about-horizontal",
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.45,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => updateMountain(self.progress),
            onRefresh: (self) => updateMountain(self.progress),
          },
        });
        triggerRef.current = tween.scrollTrigger ?? null;

        panels.forEach((panel, index) => {
          const enter = context.add(`revealPanel${index}`, () => {
            gsap.fromTo(
              panel.querySelectorAll("[data-about-reveal]"),
              { y: 22, opacity: 0.1 },
              {
                y: 0,
                opacity: 1,
                duration: 0.55,
                stagger: 0.05,
                ease: "power2.out",
                clearProps: "transform,opacity",
              },
            );
          });

          ScrollTrigger.create(
            index === 0
              ? {
                  trigger: section,
                  start: "top 80%",
                  once: true,
                  onEnter: () => enter(),
                }
              : {
                  trigger: panel,
                  containerAnimation: tween,
                  start: "left 75%",
                  once: true,
                  onEnter: () => enter(),
                },
          );
        });

        return () => {
          mountainBackRef.current?.style.removeProperty("transform");
          mountainMidRef.current?.style.removeProperty("transform");
          mountainFrontRef.current?.style.removeProperty("transform");
          triggerRef.current = null;
          delete section.dataset.horizontal;
        };
      });

      media.add({ mobile: "(max-width: 767px)" }, (context) => {
        if (!context.conditions?.mobile) return;
        const back = mountainBackRef.current;
        const mid = mountainMidRef.current;
        const front = mountainFrontRef.current;

        if (back) {
          gsap.fromTo(
            back,
            { x: 90, y: 40, scale: 1.22 },
            {
              x: -90,
              y: -40,
              scale: 1.22,
              ease: "none",
              force3D: true,
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        }

        if (mid) {
          gsap.fromTo(
            mid,
            { x: 45, y: 20, scale: 1.15 },
            {
              x: -45,
              y: -20,
              scale: 1.15,
              ease: "none",
              force3D: true,
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        }

        if (front) {
          gsap.fromTo(
            front,
            { x: 18, y: 8, scale: 1.08 },
            {
              x: -18,
              y: -8,
              scale: 1.08,
              ease: "none",
              force3D: true,
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        }

        const enter = context.add("revealMobile", (entries: IntersectionObserverEntry[]) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            gsap.fromTo(
              entry.target,
              { y: 16, opacity: 0.3 },
              {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
                clearProps: "transform,opacity",
              },
            );
            observer.unobserve(entry.target);
          });
        });
        const observer = new IntersectionObserver((entries) => enter(entries), { threshold: 0.08 });
        section
          .querySelectorAll("[data-about-reveal]")
          .forEach((element) => observer.observe(element));
        return () => observer.disconnect();
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  const moveOnePanel = (direction: -1 | 1) => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const segment = (trigger.end - trigger.start) / 3;
    const currentStep = Math.round((window.scrollY - trigger.start) / segment);
    const targetStep = gsap.utils.clamp(0, 3, currentStep + direction);
    const target = trigger.start + targetStep * segment;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  const scrollToPanel = (index: number) => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const segment = (trigger.end - trigger.start) / 3;
    const target = trigger.start + index * segment;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className="relative overflow-hidden bg-white text-[#0e122b]"
    >
      <div aria-hidden className="about-mountain-parallax pointer-events-none select-none">
        {/* Capa 3: Cerro 03 (el cerro más lejano en el fondo - mayor desplazamiento parallax) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={mountainBackRef}
          src="/images/cerro/cerro_03.png"
          alt=""
          className="about-mountain-layer about-mountain-layer--back"
        />

        {/* Capa 2: Cerro 02 (el cerro del medio) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={mountainMidRef}
          src="/images/cerro/cerro_02.png"
          alt=""
          className="about-mountain-layer about-mountain-layer--mid"
        />

        {/* Capa 1: Cerro 01 (la parte más baja o cercana en primer plano) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={mountainFrontRef}
          src="/images/cerro/cerro_01.png"
          alt=""
          className="about-mountain-layer about-mountain-layer--front"
        />
      </div>
      <div ref={trackRef} className="about-track relative z-10">
        {/* ===============================================================
            PANEL 01: INTRO & GENERAL STATS
            =============================================================== */}
        <article
          data-about-panel
          className="about-panel relative flex h-full flex-col justify-between border-r border-[#e5e7eb] px-6 pt-24 pb-28 sm:px-10 lg:px-16"
        >
          <div className="relative z-10 grid w-full max-w-3xl grid-cols-1 items-start">
            {/* Main Editorial Plaque */}
            <div className="about-editorial-plaque relative max-w-2xl p-8 sm:p-11">
              <h2
                data-about-reveal
                aria-label="Sobre ExpoJuy 2026"
                className="text-[clamp(3.2rem,4.8vw,5.2rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-[#0e122b]"
              >
                Sobre{" "}
                <span className="text-[#820CD0]">
                  ExpoJuy
                </span>{" "}
                <span className="font-light text-[#25C0D4]">2026</span>
              </h2>

              <p
                data-about-reveal
                className="mt-6 max-w-xl text-base leading-relaxed text-[#1a2038] lg:text-lg"
              >
                En su 17.ª edición, ExpoJuy reúne a empresas, emprendedores,
                instituciones y delegaciones para mostrar el potencial
                productivo de Jujuy y abrir nuevas oportunidades de vinculación regional y global.
              </p>

              <a
                href="#expositores"
                data-about-reveal
                className="mt-8 inline-flex items-center gap-3.5 text-sm font-bold text-[#820CD0] transition-colors hover:text-[#6709a3] group"
              >

                <span>Conocé los expositores</span>
                <FaArrowRight aria-hidden className="size-3 text-[#820CD0] transition-transform group-hover:translate-x-1" />
              </a>
            </div>

          </div>

          {/* Bottom stats row in clean architectural plaque */}
          <div
            data-about-reveal
            className="about-editorial-plaque relative z-10 w-full max-w-3xl px-8 py-5"
          >
            <dl className="grid grid-cols-2 gap-6 divide-y divide-gray-200/80 sm:grid-cols-4 sm:divide-y-0 sm:divide-x sm:divide-gray-200/80">
              {eventFacts.map((fact, idx) => (
                <div key={fact.label} className={idx > 0 ? "sm:pl-6" : ""}>
                  <dt className="text-xl font-extrabold tracking-tight text-[#0e122b] lg:text-2xl font-mono">
                    {fact.value}
                  </dt>
                  <dd className="mt-1 text-[11px] font-bold uppercase tracking-wider text-[#475069]">
                    {fact.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </article>

        {/* ===============================================================
            PANEL 02: TERRITORIO - BIG "J" JUJUY
            =============================================================== */}
        <article
          data-about-panel
          className="about-panel relative flex h-full flex-col justify-center border-r border-[#e5e7eb] px-6 pt-20 pb-36 sm:px-10 lg:px-16"
        >
          <div className="relative z-10 mx-auto w-full max-w-7xl pb-12 lg:pb-16">
            <div className="mt-6 grid grid-cols-1 items-center gap-10 md:grid-cols-[auto_1fr] lg:gap-16">
              {/* Graphic: Big J with the color accent blocks */}
              <div className="relative flex items-center justify-center">
                {/* Left lavender rectangle */}
                <div
                  aria-hidden
                  className="absolute -left-3 bottom-12 h-24 w-12 bg-[#ac7ff0] select-none"
                />

                {/* Big letter J */}
                <div className="relative z-10 h-[360px] w-[270px] lg:h-[430px] lg:w-[320px]">
                  <Image
                    src="/images/sobreexpojuy26/ac0ce3e5-8bdc-4bc7-8d96-3f2c356793a1.png"
                    alt="Jujuy"
                  fill
                  priority
                  sizes="(max-width: 1023px) 270px, 320px"
                  className="object-contain"
                  />
                </div>

                {/* Right cyan rectangle */}
                <div
                  aria-hidden
                  className="absolute -right-3 bottom-6 h-28 w-16 bg-[#19b9ca] select-none"
                />
              </div>

              {/* Text column with solid editorial plaque */}
              <div className="about-editorial-plaque relative max-w-xl p-8 sm:p-10">
  <h2
                  data-about-reveal
                  className="text-[clamp(2.3rem,3.2vw,3.8rem)] font-extrabold leading-[0.96] tracking-[-0.035em] text-[#0e122b]"
                >
                  Jujuy conecta producción, conocimiento y mercados.
                </h2>
                <p
                  data-about-reveal
                  className="mt-6 text-base leading-relaxed text-[#1a2038]"
                >
                  La Ciudad Cultural alberga una propuesta integral que vincula
                  emprendimientos locales, empresas consolidadas, instituciones y delegaciones
                  de toda la región del NOA y el Cono Sur.
                </p>

                {/* Callout Estratégico Corredor Bioceánico */}
                <div
                  data-about-reveal
                  className="about-territory-note"
                >

                  <p className="text-sm font-medium leading-relaxed text-[#111827]">
                    El Corredor Bioceánico le da a la feria una escala regional: la
                    producción jujeña dialoga con mercados, alianzas e inversión internacional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* ===============================================================
            PANEL 03: CUATRO MUNDOS - EDITORIAL SECTOR GRID
            =============================================================== */}
        <article
          data-about-panel
          className="about-panel relative flex h-full flex-col justify-center border-r border-[#e5e7eb] px-6 pt-20 pb-32 sm:px-10 lg:px-16"
        >
          <div className="relative z-10 mx-auto w-full max-w-7xl pb-6">
            <div className="about-editorial-plaque relative max-w-3xl p-8 sm:p-10">
              <div data-about-reveal className="mb-6 flex items-center justify-between border-b border-[#e5e9f4] pb-4">
                <span className="about-editorial-tag">EXP · 03</span>
              </div>

              <h2
                data-about-reveal
                className="text-[clamp(2.4rem,3.4vw,3.8rem)] font-extrabold leading-[0.92] tracking-[-0.05em] text-[#0e122b]"
              >
                Cuatro Mundos,{" "}
                <span className="text-[#820CD0]">Una Misma Visión</span>
              </h2>
            </div>

            <div
              data-about-reveal
              className="mt-6 w-full overflow-hidden rounded-xl border border-white/35 bg-white/55 backdrop-blur-md"
            >
              <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-4">
                <div className="relative h-36 w-full border-b border-r border-white/35 md:h-40">
                  <Image
                    src="/images/evento/hall-banner.jpg"
                    alt="Industria y energía"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center border-b border-white/35 bg-white/68 p-5 backdrop-blur-sm transition-colors hover:bg-white/78 md:border-r">
                  <div className="flex items-center justify-between">
                    <span className="grid size-8 place-items-center rounded-lg bg-[#6424dc] text-white shadow-sm">
                      <FaIndustry className="size-3.5" />
                    </span>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#820CD0]">SECTOR 01</span>
                  </div>
                  <h3 className="mt-3 text-base font-bold tracking-tight text-[#0e122b]">Industria y energía</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#374151]">Producción e infraestructura para transformar el territorio.</p>
                  <FaArrowRight className="mt-3 size-3 text-[#6424dc]" />
                </div>

                <div className="relative h-36 w-full border-b border-r border-white/35 md:h-40">
                  <Image
                    src="/images/evento/evento_conferencia.png"
                    alt="Innovación aplicada"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center border-b border-white/35 bg-white/68 p-5 backdrop-blur-sm transition-colors hover:bg-white/78">
                  <div className="flex items-center justify-between">
                    <span className="grid size-8 place-items-center rounded-lg bg-[#0b7c8a] text-white shadow-sm">
                      <FaLightbulb className="size-3.5" />
                    </span>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#0b7c8a]">SECTOR 02</span>
                  </div>
                  <h3 className="mt-3 text-base font-bold tracking-tight text-[#0e122b]">Innovación aplicada</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#374151]">Talento y soluciones que impulsan nuevos proyectos.</p>
                  <FaArrowRight className="mt-3 size-3 text-[#0b7c8a]" />
                </div>

                <div className="relative h-36 w-full border-r border-white/35 md:h-40">
                  <Image
                    src="/images/evento/11-Bv-B7Fmn.jpg"
                    alt="Producción e identidad"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center border-white/35 bg-white/68 p-5 backdrop-blur-sm transition-colors hover:bg-white/78 md:border-r">
                  <div className="flex items-center justify-between">
                    <span className="grid size-8 place-items-center rounded-lg bg-[#7f08d5] text-white shadow-sm">
                      <FaMountainSun className="size-3.5" />
                    </span>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#7f08d5]">SECTOR 03</span>
                  </div>
                  <h3 className="mt-3 text-base font-bold tracking-tight text-[#0e122b]">Producción e identidad</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#374151]">Economías regionales y cultura que proyectan a Jujuy.</p>
                  <FaArrowRight className="mt-3 size-3 text-[#7f08d5]" />
                </div>

                <div className="relative h-36 w-full border-r border-white/35 md:h-40">
                  <Image
                    src="/images/evento/expo.png"
                    alt="Comercio y alianzas"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center bg-white/68 p-5 backdrop-blur-sm transition-colors hover:bg-white/78">
                  <div className="flex items-center justify-between">
                    <span className="grid size-8 place-items-center rounded-lg bg-[#6424dc] text-white shadow-sm">
                      <FaHandshake className="size-3.5" />
                    </span>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#6424dc]">SECTOR 04</span>
                  </div>
                  <h3 className="mt-3 text-base font-bold tracking-tight text-[#0e122b]">Comercio y alianzas</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#374151]">Rondas, vínculos empresariales y oportunidades hacia nuevos mercados.</p>
                  <FaArrowRight className="mt-3 size-3 text-[#6424dc]" />
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* ===============================================================
            PANEL 04: EL ENCUENTRO - CACTUS PHOTO & CALL TO ACTION
            =============================================================== */}
        <article
          data-about-panel
          className="about-panel relative flex h-full flex-col justify-center px-6 pt-24 pb-28 sm:px-10 lg:px-16"
        >


          <div className="relative z-10 mx-auto w-full max-w-7xl">


            <div className="mt-5 grid grid-cols-1 items-center gap-10 md:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              {/* Left Column: Heading, text, and buttons */}
              <div className="about-editorial-plaque relative max-w-2xl p-8 sm:p-11">
  <h2
                  data-about-reveal
                  className="text-[clamp(3.2rem,4.6vw,5.2rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-[#0e122b]"
                >
                  El futuro
                  <br />
                  se encuentra
                  <br />
                  <span className="text-[#820CD0]">en Jujuy.</span>
                </h2>

                <p
                  data-about-reveal
                  className="mt-6 max-w-xl text-base leading-relaxed text-[#1a2038] lg:text-lg"
                >
                  Del 9 al 12 de octubre, cuatro jornadas concentran exposición,
                  rondas de negocios internacionales, conferencias y actividades culturales para
                  abrir conversaciones que trasciendan el predio.
                </p>



                <div
                  data-about-reveal
                  className="mt-8 flex flex-wrap items-center gap-4"
                >
                  <Button
                    asChild
                    size="lg"
                    className="h-12 rounded-lg bg-[#820CD0] px-7 text-sm font-bold !text-white text-white shadow-[0_10px_25px_rgba(130,12,208,0.35)] hover:bg-[#6c0aa9] transition-all cursor-pointer"
                  >
                    <a
                      href="#expositores"
                      className="inline-flex items-center gap-2.5 !text-white text-white font-bold"
                      style={{ color: "#ffffff" }}
                    >
                      <span className="!text-white text-white font-bold" style={{ color: "#ffffff" }}>
                        Ver expositores
                      </span>
                      <FaArrowRight aria-hidden className="size-3 !text-white text-white" style={{ color: "#ffffff" }} />
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-12 rounded-lg border-2 border-[#0e122b]/25 bg-white px-7 text-sm font-bold text-[#0e122b] hover:border-[#820CD0] hover:text-[#820CD0] hover:bg-gray-50 transition-all shadow-xs cursor-pointer"
                  >
                    <a href="#ubicacion" className="inline-flex items-center gap-2.5 text-[#0e122b] font-bold">
                      Cómo llegar
                    </a>
                  </Button>
                </div>
              </div>

              {/* Right Column: Decorative rectangles, Cactus photo & script logo */}
              <div className="relative flex flex-col items-center justify-center">
                {/* Background decorative colored blocks */}
                <div
                  aria-hidden
                  className="absolute -top-4 right-3 h-40 w-24 bg-[#ac7ff0] select-none"
                />
                <div
                  aria-hidden
                  className="absolute top-6 -right-5 h-44 w-24 bg-[#19b9ca] select-none"
                />

                {/* Cactus & mountain photo */}
                <div className="relative z-10 h-[340px] w-[210px] overflow-hidden shadow-md lg:h-[380px] lg:w-[230px]">
                  <Image
                    src="/images/sobreexpojuy26/49a5da07-0f71-4f50-9df2-9811def7dae2.png"
                    alt="Cactus y cerros de Jujuy"
                  fill
                  priority
                  sizes="(max-width: 1023px) 210px, 230px"
                  className="object-cover"
                  />
                </div>

                {/* Jujuy signature underneath */}
                <div className="about-glass-card z-10 mt-3 self-end rounded-lg px-3.5 py-1.5 text-right">
                  <span className="block font-serif text-2xl italic tracking-tight text-[#0e122b] leading-none">
                    Jujuy
                  </span>
                  <span className="mt-1 block text-[0.62rem] font-bold tracking-[0.18em] text-[#374151] uppercase">
                    Donde las ideas crecen
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* ===============================================================
          BOTTOM PROGRESS DOCK BAR (FIXED AT THE BOTTOM OF THE SECTION)
          =============================================================== */}
      <div className="about-progress-shell absolute inset-x-0 bottom-0 z-20 hidden h-20 items-center border-t border-[#e5e7eb] bg-white/95 px-8 backdrop-blur-md md:flex lg:px-12">
        <p className="hidden shrink-0 text-[0.65rem] font-bold tracking-[0.12em] text-[#6b7280] xl:block">
          EXPOJUY 2026
        </p>

        <button
          type="button"
          onClick={() => moveOnePanel(-1)}
          className="grid size-11 shrink-0 place-items-center rounded-full border border-gray-300 text-gray-700 transition-colors hover:border-[#6424dc] hover:text-[#6424dc] xl:ml-8"
          aria-label="Panel anterior"
        >
          <FaChevronLeft aria-hidden className="size-4" />
        </button>

        <p className="ml-5 shrink-0 text-sm font-medium text-gray-600">
          Explorá la Expo
        </p>

        <div className="mx-8 h-px flex-1 overflow-hidden bg-gray-200">
          <span
            ref={progressRef}
            className="block h-full origin-left scale-x-[0.04] bg-[#6424dc] transition-transform duration-100"
          />
        </div>

        <div
          className="about-progress-steps mr-8"
          aria-label="Progreso de la sección"
        >
          {["La Expo", "Territorio", "Sectores", "El encuentro"].map((label, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollToPanel(index)}
              ref={(element) => {
                stepRefs.current[index] = element;
              }}
              data-active={index === 0}
              aria-current={index === 0}
              className="about-step-node"
              aria-label={`Ver ${label}`}
            >
              {label}
            </button>
          ))}
        </div>

        <p className="mr-6 text-xs font-bold tracking-[0.16em] text-gray-500">
          <span ref={counterRef} className="text-[#6424dc]">
            01
          </span>
          <span aria-hidden> / 04</span>
        </p>

        <button
          type="button"
          onClick={() => moveOnePanel(1)}
          className="grid size-11 shrink-0 place-items-center rounded-full border border-gray-300 text-gray-700 transition-colors hover:border-[#6424dc] hover:text-[#6424dc]"
          aria-label="Panel siguiente"
        >
          <FaChevronRight aria-hidden className="size-4" />
        </button>

        <p className="ml-8 hidden border-l border-gray-200 pl-8 text-[0.62rem] font-bold leading-tight tracking-[0.1em] text-gray-500 uppercase xl:block">
          CIUDAD CULTURAL
          <br />
          SAN SALVADOR DE JUJUY
        </p>
      </div>
    </section>
  );
}
