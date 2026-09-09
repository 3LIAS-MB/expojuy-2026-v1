"use client";

import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaIndustry,
  FaLightbulb,
  FaMountainSun,
  FaHandshake,
  FaPlay,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const eventFacts = [
  { value: "17.ª", label: "edición" },
  { value: "9—12", label: "octubre 2026" },
  { value: "18.000", label: "m² previstos" },
  { value: "Ciudad Cultural", label: "San Salvador de Jujuy" },
];

const sectorsData = [
  {
    id: "01",
    number: "01",
    title: "Industria y energía",
    copy: "Producción, minería e infraestructura transformadora.",
    tag: "SECTOR 01",
    category: "Minería & Energía",
    color: "#25C0D4",
    icon: FaIndustry,
    image: "/images/evento/hall-banner.jpg",
  },
  {
    id: "02",
    number: "02",
    title: "Innovación aplicada",
    copy: "Talento, tecnología y soluciones que impulsan proyectos.",
    tag: "SECTOR 02",
    category: "Tecnología & Startups",
    color: "#820CD0",
    icon: FaLightbulb,
    image: "/images/evento/evento_conferencia.png",
  },
  {
    id: "03",
    number: "03",
    title: "Producción e identidad",
    copy: "Economías regionales, agro y cultura con valor local.",
    tag: "SECTOR 03",
    category: "Economías Regionales",
    color: "#ac7ff0",
    icon: FaMountainSun,
    image: "/images/evento/11-Bv-B7Fmn.jpg",
  },
  {
    id: "04",
    number: "04",
    title: "Comercio y alianzas",
    copy: "Rondas de negocios y vinculación internacional.",
    tag: "SECTOR 04",
    category: "Corredor Bioceánico",
    color: "#6424dc",
    icon: FaHandshake,
    image: "/images/evento/expo.png",
  },
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

  // Estados y referencias para el Carrusel Circular de 4 Mundos
  const [activeSector, setActiveSector] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Array<HTMLButtonElement | null>>([]);
  const showcaseImgRef = useRef<HTMLDivElement>(null);
  const showcaseTextRef = useRef<HTMLDivElement>(null);
  const currentAngleRef = useRef(0);

  const goToSector = useCallback((targetIndex: number) => {
    const nextIndex = ((targetIndex % 4) + 4) % 4;
    setActiveSector(nextIndex);

    // Rotación por camino más corto (shortest-path angle)
    const desiredModAngle = -nextIndex * 90;
    const currentAngle = currentAngleRef.current;
    let delta = (desiredModAngle - (currentAngle % 360)) % 360;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    const newTargetAngle = currentAngle + delta;
    currentAngleRef.current = newTargetAngle;

    // Animar rotación de la rueda orbital con GSAP
    if (wheelRef.current) {
      gsap.to(wheelRef.current, {
        rotation: newTargetAngle,
        duration: 0.75,
        ease: "power3.out",
        overwrite: "auto",
      });
    }

    // Contra-rotar cada nodo individualmente para mantener íconos y textos 100% derechos
    nodesRef.current.forEach((node) => {
      if (node) {
        gsap.to(node, {
          rotation: -newTargetAngle,
          duration: 0.75,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
    });

    // Animar la imagen del sector activo
    if (showcaseImgRef.current) {
      gsap.fromTo(
        showcaseImgRef.current,
        { opacity: 0.35, scale: 1.07 },
        { opacity: 1, scale: 1, duration: 0.55, ease: "power2.out" }
      );
    }

    // Animar textos con stagger sutil
    if (showcaseTextRef.current) {
      gsap.fromTo(
        showcaseTextRef.current.children,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: "power2.out" }
      );
    }
  }, []);

  // Avance automático cada 5.5s si no está pausado por el usuario
  useEffect(() => {
    if (carouselPaused) return;
    const timer = setInterval(() => {
      goToSector(activeSector + 1);
    }, 5500);
    return () => clearInterval(timer);
  }, [activeSector, carouselPaused, goToSector]);

  useGSAP(
    (_context, contextSafe) => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track || !contextSafe) return;
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
          const enter = contextSafe(() => {
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
                  onEnter: enter,
                }
              : {
                  trigger: panel,
                  containerAnimation: tween,
                  start: "left 75%",
                  once: true,
                  onEnter: enter,
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

        const enter = contextSafe((entries: IntersectionObserverEntry[]) => {
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
        const observer = new IntersectionObserver(enter, { threshold: 0.08 });
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
          <div className="relative z-10 grid w-full max-w-7xl grid-cols-1 items-start gap-8 md:grid-cols-[1fr_auto]">
            {/* Main Editorial Plaque */}
            <div className="about-editorial-plaque relative max-w-2xl p-8 sm:p-11">
              {/* Curatorial Header */}
              <div data-about-reveal className="flex items-center justify-between border-b border-[#e5e9f4] pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="about-editorial-tag">
                    EXP · 01
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4b5275]">
                    La Muestra Multisectorial del Norte
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#25C0D4]" />
                  <span className="font-mono text-[10px] font-bold text-[#6a7294] uppercase tracking-wider">
                    Jujuy 2026
                  </span>
                </div>
              </div>

              <h2
                data-about-reveal
                className="text-[clamp(3.2rem,4.8vw,5.2rem)] font-extrabold leading-[0.88] tracking-[-0.065em] text-[#0e122b]"
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
                <span className="grid size-10 place-items-center rounded-full bg-[#f4edff] border border-[#d8b4fe]/80 transition-transform group-hover:scale-110 shadow-sm">
                  <FaPlay aria-hidden className="ml-0.5 size-3.5 fill-[#820CD0]" />
                </span>
                <span>Descubrí la edición 2026</span>
                <FaArrowRight aria-hidden className="size-3 text-[#820CD0] transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Right side vertical words */}
            <aside
              data-about-reveal
              className="about-editorial-plaque mr-6 hidden flex-col items-start gap-2.5 self-center justify-self-end px-5 py-6 text-[0.72rem] font-bold tracking-[0.24em] text-[#0e122b] uppercase md:flex"
            >
              <span className="text-[#820CD0]">Territorio</span>
              <span>Gente</span>
              <span>Producción</span>
              <span className="text-[#25C0D4]">Futuro</span>
              <div className="mt-2 h-[2px] w-8 bg-gradient-to-r from-[#820CD0] to-[#25C0D4]" />
            </aside>
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
                {/* Curatorial Header */}
                <div data-about-reveal className="flex items-center justify-between border-b border-[#e5e9f4] pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="about-editorial-tag">
                      EXP · 02
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4b5275]">
                      Un Territorio, Infinitas Posibilidades
                    </span>
                  </div>
                </div>

                <h2
                  data-about-reveal
                  className="text-[clamp(2.3rem,3.2vw,3.8rem)] font-extrabold leading-[0.96] tracking-[-0.05em] text-[#0e122b]"
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
                  className="mt-6 rounded-xl border-l-[3px] border-[#820CD0] bg-[#f8f5ff] p-4.5"
                >
                  <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#820CD0] mb-1.5">
                    Eje Estratégico
                  </span>
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
            PANEL 03: CUATRO MUNDOS - CARRUSEL CIRCULAR CON GSAP
            =============================================================== */}
        <article
          data-about-panel
          className="about-panel relative flex h-full flex-col justify-center border-r border-[#e5e7eb] px-6 pt-16 pb-28 sm:px-10 lg:px-16"
        >
          <div className="relative z-10 mx-auto w-full max-w-7xl pb-4">
            {/* Curatorial Header Plaque */}
            <div className="about-editorial-plaque relative max-w-3xl p-6 sm:p-8 mb-5">
              <div data-about-reveal className="flex items-center justify-between border-b border-[#e5e9f4] pb-3 mb-4">
                <div className="flex items-center gap-3">
                  <span className="about-editorial-tag">
                    EXP · 03
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4b5275]">
                    Cuatro Mundos, Una Misma Visión
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#820CD0] animate-pulse" />
                  <span className="font-mono text-[10px] font-bold text-[#6a7294] uppercase tracking-wider">
                    Carrusel Circular
                  </span>
                </div>
              </div>

              <h2
                data-about-reveal
                className="text-[clamp(2rem,2.8vw,3.3rem)] font-extrabold leading-[0.92] tracking-[-0.055em] text-[#0e122b]"
              >
                Una feria para producir, intercambiar y proyectar.
              </h2>

              <p
                data-about-reveal
                className="mt-3 text-sm sm:text-base leading-relaxed text-[#1a2038]"
              >
                La programación combina muestra comercial e institucional,
                conferencias de alto nivel, experiencias culturales y rondas de vinculación duradera.
              </p>
            </div>

            {/* Carrusel Circular Interactivo con GSAP */}
            <div 
              data-about-reveal 
              className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_auto] xl:gap-10"
              onMouseEnter={() => setCarouselPaused(true)}
              onMouseLeave={() => setCarouselPaused(false)}
            >
              {/* Tarjeta Destacada del Sector Activo */}
              <div className="about-editorial-plaque relative overflow-hidden p-6 sm:p-7">
                <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] md:grid-cols-[250px_1fr] items-center gap-6">
                  
                  {/* Foto con zoom/fade GSAP */}
                  <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-xl overflow-hidden shadow-sm border border-[#dfe3ef] bg-gray-100">
                    <div ref={showcaseImgRef} className="relative size-full">
                      <Image
                        src={sectorsData[activeSector].image}
                        alt={sectorsData[activeSector].title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 250px"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e122b]/65 via-transparent to-transparent" />
                      
                      <div className="absolute bottom-3 left-3">
                        <span 
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase text-white shadow-sm"
                          style={{ backgroundColor: sectorsData[activeSector].color }}
                        >
                          {(() => {
                            const IconComponent = sectorsData[activeSector].icon;
                            return <IconComponent className="size-3" />;
                          })()}
                          {sectorsData[activeSector].tag}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Textos del Sector Activo (Animados con GSAP) */}
                  <div ref={showcaseTextRef} className="flex flex-col justify-between space-y-3.5">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span 
                          className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase"
                          style={{ color: sectorsData[activeSector].color }}
                        >
                          {sectorsData[activeSector].category}
                        </span>
                        <span className="font-mono text-xs font-extrabold text-[#820CD0]/60">
                          {sectorsData[activeSector].number} / 04
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0e122b] leading-tight">
                        {sectorsData[activeSector].title}
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-[#374151] leading-relaxed">
                        {sectorsData[activeSector].copy}
                      </p>
                    </div>

                    {/* Controles del Carrusel: Prev, Dots interactivos, Next */}
                    <div className="pt-3.5 border-t border-[#dfe3ef] flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => goToSector(activeSector - 1)}
                          className="grid size-9 place-items-center rounded-full border border-gray-300 bg-white text-gray-700 hover:border-[#820CD0] hover:text-[#820CD0] shadow-xs transition-colors cursor-pointer"
                          aria-label="Sector anterior"
                        >
                          <FaChevronLeft className="size-3" />
                        </button>

                        <div className="flex items-center gap-1.5 px-1.5">
                          {sectorsData.map((item, idx) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => goToSector(idx)}
                              aria-label={`Ver ${item.title}`}
                              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                idx === activeSector
                                  ? "w-6 bg-[#820CD0]"
                                  : "w-2 bg-gray-300 hover:bg-gray-400"
                              }`}
                            />
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => goToSector(activeSector + 1)}
                          className="grid size-9 place-items-center rounded-full border border-gray-300 bg-white text-gray-700 hover:border-[#820CD0] hover:text-[#820CD0] shadow-xs transition-colors cursor-pointer"
                          aria-label="Sector siguiente"
                        >
                          <FaChevronRight className="size-3" />
                        </button>
                      </div>

                      <a
                        href="#expositores"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#820CD0] hover:text-[#6709a3] transition-colors group"
                      >
                        <span>Ver expositores</span>
                        <FaArrowRight className="size-2.5 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>

                  </div>

                </div>
              </div>

              {/* Rueda Orbital Circular con GSAP Rotation */}
              <div className="relative mx-auto flex items-center justify-center py-2">
                <div className="relative size-[280px] sm:size-[320px] flex items-center justify-center">
                  
                  {/* Órbita Blueprint SVG */}
                  <svg className="absolute inset-0 size-full pointer-events-none -rotate-90">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="120"
                      fill="none"
                      stroke="#dbe0ee"
                      strokeWidth="1.5"
                      strokeDasharray="4 6"
                    />
                    <circle
                      cx="50%"
                      cy="50%"
                      r="120"
                      fill="none"
                      stroke={sectorsData[activeSector].color}
                      strokeWidth="3"
                      strokeDasharray="60 700"
                      strokeDashoffset="30"
                      className="transition-all duration-700"
                    />
                  </svg>

                  {/* Aguja indicadora focal en la parte superior (12 en punto) */}
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center">
                    <span 
                      className="size-2 rounded-full shadow-md animate-ping"
                      style={{ backgroundColor: sectorsData[activeSector].color }}
                    />
                  </div>

                  {/* Rueda giratoria animada con GSAP */}
                  <div 
                    ref={wheelRef}
                    className="relative size-full rounded-full"
                    style={{ willChange: "transform" }}
                  >
                    {sectorsData.map((sector, index) => {
                      const isActive = index === activeSector;
                      const angleRad = ((index * 90 - 90) * Math.PI) / 180;
                      const radius = 120;
                      const posX = Math.cos(angleRad) * radius;
                      const posY = Math.sin(angleRad) * radius;
                      const IconComp = sector.icon;

                      return (
                        <button
                          key={sector.id}
                          ref={(el) => {
                            nodesRef.current[index] = el;
                          }}
                          type="button"
                          onClick={() => goToSector(index)}
                          aria-label={`Sector ${sector.number}: ${sector.title}`}
                          aria-current={isActive}
                          style={{
                            left: `calc(50% + ${posX}px)`,
                            top: `calc(50% + ${posY}px)`,
                            willChange: "transform",
                          }}
                          className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer select-none rounded-full p-1 transition-shadow duration-300 ${
                            isActive
                              ? "z-20 scale-110 shadow-[0_8px_20px_rgba(130,12,208,0.25)]"
                              : "z-10 hover:scale-105 shadow-xs"
                          }`}
                        >
                          <div 
                            className={`flex size-[52px] sm:size-[60px] flex-col items-center justify-center rounded-full border-2 transition-all duration-300 ${
                              isActive
                                ? "bg-white shadow-md"
                                : "bg-white/95 hover:bg-white border-[#dbe0ee]"
                            }`}
                            style={{
                              borderColor: isActive ? sector.color : undefined,
                            }}
                          >
                            <IconComp 
                              className="size-4 transition-transform group-hover:scale-110"
                              style={{ color: sector.color }}
                            />
                            <span className="mt-0.5 font-mono text-[9px] sm:text-[10px] font-extrabold tracking-wider text-[#0e122b]">
                              {sector.number}
                            </span>
                          </div>

                          {/* Tooltip con nombre de sector al hover */}
                          <div className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#0e122b] px-2 py-0.5 text-[8px] font-bold text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                            {sector.title}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Núcleo central / Hub con monograma */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 sm:size-24 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-[#dfe3ef] flex flex-col items-center justify-center text-center p-1.5 pointer-events-none z-10">
                    <span className="text-[8px] font-mono font-bold tracking-[0.18em] text-[#820CD0] uppercase">
                      CUATRO
                    </span>
                    <span className="font-extrabold text-[11px] sm:text-xs text-[#0e122b] tracking-tight leading-none mt-0.5">
                      MUNDOS
                    </span>
                    <div 
                      className="mt-1 h-0.5 w-5 rounded-full transition-colors duration-500"
                      style={{ backgroundColor: sectorsData[activeSector].color }}
                    />
                    <span className="mt-0.5 text-[7px] font-mono text-[#6a7294] uppercase tracking-wider">
                      JUJUY 26
                    </span>
                  </div>

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
          {/* Bottom right watermark over mountain range */}
          <div className="about-editorial-plaque pointer-events-none absolute right-12 bottom-24 z-10 hidden select-none flex-col items-end rounded-xl px-4 py-2.5 text-right xl:flex">
            <span className="text-xs font-bold tracking-[0.2em] text-[#0e122b] uppercase leading-tight">
              JUJUY
            </span>
            <span className="text-[0.68rem] font-bold tracking-[0.2em] text-[#475069] uppercase leading-tight">
              INSPIRA · CONECTA · PROYECTA
            </span>
            <div className="mt-2 h-[1.5px] w-14 bg-[#6424dc]" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-7xl">
            <div className="flex items-center justify-end">
              <p className="hidden text-right text-xs font-bold tracking-wider text-[#2e3650] uppercase leading-tight lg:block">
                Más que una feria
                <br />
                Un territorio de oportunidades
              </p>
            </div>

            <div className="mt-5 grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_auto] lg:gap-16">
              {/* Left Column: Heading, text, and buttons */}
              <div className="about-editorial-plaque relative max-w-2xl p-8 sm:p-11">
                {/* Curatorial Header */}
                <div data-about-reveal className="flex items-center justify-between border-b border-[#e5e9f4] pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="about-editorial-tag">
                      EXP · 04
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4b5275]">
                      El Encuentro
                    </span>
                  </div>
                </div>

                <h2
                  data-about-reveal
                  className="text-[clamp(3.2rem,4.6vw,5.2rem)] font-extrabold leading-[0.88] tracking-[-0.07em] text-[#0e122b]"
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

                <div data-about-reveal className="mt-6">
                  <span className="inline-flex items-center rounded-md border border-[#d6c7fb] bg-[#f8f5ff] px-3.5 py-1.5 text-xs font-bold tracking-wider text-[#820CD0] uppercase">
                    CORREDOR BIOCEÁNICO · VINCULACIÓN · NUEVOS MERCADOS
                  </span>
                </div>

                <div
                  data-about-reveal
                  className="mt-8 flex flex-wrap items-center gap-4"
                >
                  <Button
                    asChild
                    size="lg"
                    className="h-12 rounded-lg bg-[#820CD0] px-7 text-sm font-bold text-white shadow-[0_10px_25px_rgba(130,12,208,0.25)] hover:bg-[#6c0aa9]"
                  >
                    <a
                      href="#expositores"
                      className="inline-flex items-center gap-2.5"
                    >
                      Ver expositores
                      <FaArrowRight aria-hidden className="size-3" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-12 rounded-lg border border-gray-300 bg-white/90 px-7 text-sm font-bold text-[#0e122b] hover:border-[#820CD0] hover:text-[#820CD0]"
                  >
                    <a href="#expositores">Conocer los sectores</a>
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
          Scroll horizontal para descubrir más
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
          {Array.from({ length: 4 }, (_, index) => (
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
              aria-label={`Ir al panel ${index + 1}`}
            >
              {String(index + 1).padStart(2, "0")}
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
