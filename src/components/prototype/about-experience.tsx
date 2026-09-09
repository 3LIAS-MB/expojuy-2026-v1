"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Boxes,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  MapPinned,
  Play,
  UsersRound,
} from "lucide-react";
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
  const mountainRef = useRef<HTMLImageElement>(null);
  const stepRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useGSAP(
    (_context, contextSafe) => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const mountain = mountainRef.current;
      if (!section || !track || !contextSafe) return;
      const media = gsap.matchMedia();
      const panels = Array.from(
        track.querySelectorAll<HTMLElement>("[data-about-panel]"),
      );

      media.add({ desktop: "(min-width: 768px)", reduce: "(prefers-reduced-motion: reduce)" }, (context) => {
        if (!context.conditions?.desktop) return;
        const reducedMotion = context.conditions.reduce;
        section.dataset.horizontal = "true";

        const distance = () => (panels.length - 1) * window.innerWidth;
        const updateMountain = (progress: number) => {
          if (!mountain || reducedMotion) return;
          const amount = window.innerWidth >= 1024 ? 42 : 28;
          mountain.style.transform = `translate3d(-50%, ${amount * (1 - 2 * progress)}px, 0) scale(1.1)`;
        };
        updateMountain(0);
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          onUpdate: function () {
            const progress = this.progress();
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
          mountain?.style.removeProperty("transform");
          triggerRef.current = null;
          delete section.dataset.horizontal;
        };
      });

      media.add({ mobile: "(max-width: 767px)", reduce: "(prefers-reduced-motion: reduce)" }, (context) => {
        if (!context.conditions?.mobile) return;
        const reducedMotion = context.conditions.reduce;
        if (mountain && !reducedMotion) {
          gsap.fromTo(
            mountain,
            { y: 12, scale: 1.08 },
            {
              y: -12,
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={mountainRef}
          src="/images/sobreexpojuy26/parallax-effect/1one.png"
          alt=""
          className="about-mountain-layer"
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
            <div className="max-w-3xl">
              <div data-about-reveal className="chapter-marker">
                <span>01</span>
                <i />
              </div>

              <p data-about-reveal className="eyebrow mt-5">
                LA MUESTRA MULTISECTORIAL DEL NORTE
              </p>

              <h2
                data-about-reveal
                className="mt-4 text-[clamp(3.8rem,5.5vw,6.4rem)] font-bold leading-[0.84] tracking-[-0.065em] text-[#0e122b]"
              >
                Sobre
                <br />
                <span className="text-[#820CD0]">ExpoJuy</span>
                <br />
                <span className="text-[#820CD0]">2026</span>
              </h2>

              <p
                data-about-reveal
                className="mt-6 max-w-xl text-base leading-relaxed text-[#4b5275] lg:text-lg"
              >
                En su 17.ª edición, ExpoJuy reúne a empresas, emprendedores,
                instituciones y delegaciones para mostrar el potencial
                productivo de Jujuy y abrir nuevas oportunidades de vinculación.
              </p>

              <a
                href="#expositores"
                data-about-reveal
                className="mt-7 inline-flex items-center gap-3 text-sm font-bold text-[#820CD0] transition-opacity hover:opacity-80"
              >
                <span className="grid size-10 place-items-center rounded-full border border-[#820CD0]">
                  <Play aria-hidden className="ml-0.5 size-3.5 fill-[#820CD0]" />
                </span>
                Descubrí la edición 2026
              </a>
            </div>

            {/* Right side vertical words */}
            <aside
              data-about-reveal
              className="mr-6 hidden flex-col items-start gap-1 self-center justify-self-end text-[0.68rem] font-bold tracking-[0.2em] text-[#555d7e] uppercase md:flex"
            >
              <span>Territorio</span>
              <span>Gente</span>
              <span>Producción</span>
              <span>Futuro</span>
              <div className="mt-3 h-[1.5px] w-8 bg-[#6424dc]" />
            </aside>
          </div>

          {/* Bottom stats row in clean pill/card */}
          <div
            data-about-reveal
            className="relative z-10 w-full max-w-3xl rounded-xl border border-gray-200/80 bg-white/95 px-6 py-4 shadow-sm backdrop-blur-sm"
          >
            <dl className="grid grid-cols-2 gap-4 divide-y divide-gray-200/80 sm:grid-cols-4 sm:divide-y-0 sm:divide-x sm:divide-gray-200/80">
              {eventFacts.map((fact, idx) => (
                <div key={fact.label} className={idx > 0 ? "sm:pl-5" : ""}>
                  <dt className="text-lg font-bold tracking-tight text-[#0e122b] lg:text-2xl">
                    {fact.value}
                  </dt>
                  <dd className="mt-1 text-xs font-semibold text-[#6b7280]">
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
            <div data-about-reveal className="chapter-marker">
              <span>02</span>
              <i />
            </div>

            <p data-about-reveal className="eyebrow mt-5">
              UN TERRITORIO, INFINITAS POSIBILIDADES
            </p>

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

              {/* Text column */}
              <div className="max-w-lg">
                <h2
                  data-about-reveal
                  className="text-[clamp(2.5rem,3.5vw,4.2rem)] font-bold leading-[0.96] tracking-[-0.05em] text-[#0e122b]"
                >
                  Jujuy conecta producción, conocimiento y mercados.
                </h2>
                <p
                  data-about-reveal
                  className="mt-6 text-base leading-relaxed text-[#4b5275]"
                >
                  La Ciudad Cultural alberga una propuesta que vincula
                  emprendimientos locales, empresas, instituciones y visitantes
                  de toda la región.
                </p>
                <p
                  data-about-reveal
                  className="mt-4 border-l-2 border-[#6424dc] pl-4 text-sm leading-relaxed text-[#596080]"
                >
                  El Corredor Bioceánico le da a la feria una escala regional: la
                  producción jujeña dialoga con mercados, alianzas e inversión.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* ===============================================================
            PANEL 03: CUATRO MUNDOS - ALTERNATING 2x4 GRID
            =============================================================== */}
        <article
          data-about-panel
          className="about-panel relative flex h-full flex-col justify-center border-r border-[#e5e7eb] px-6 pt-20 pb-32 sm:px-10 lg:px-16"
        >
          <div className="relative z-10 mx-auto w-full max-w-7xl pb-6">
            <div data-about-reveal className="chapter-marker">
              <span>03</span>
              <i />
            </div>

            <p data-about-reveal className="eyebrow mt-4">
              CUATRO MUNDOS, UNA MISMA VISIÓN
            </p>

            <h2
              data-about-reveal
              className="mt-3 text-[clamp(2.4rem,3.2vw,3.8rem)] font-bold leading-[0.92] tracking-[-0.05em] text-[#0e122b]"
            >
              Una feria para producir, intercambiar y proyectar.
            </h2>

            <p
              data-about-reveal
              className="mt-3 max-w-2xl text-sm leading-relaxed text-[#596080] lg:text-base"
            >
              La programación combina muestra comercial e institucional,
              conferencias, experiencias culturales y espacios para construir
              relaciones de negocio.
            </p>

            {/* 2x4 Alternating Rhythm Grid (Photos & Content Cards) */}
            <div
              data-about-reveal
              className="mt-6 w-full overflow-hidden rounded-lg border border-[#dfe3ef] bg-white shadow-sm"
            >
              <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-4">
                {/* Col 1 Top: Photo 1 */}
                <div className="relative h-36 w-full border-b border-r border-[#dfe3ef] md:h-40">
                  <Image
                    src="/images/evento/hall-banner.jpg"
                    alt="Industria y energía"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Col 2 Top: Card 1 */}
                <div className="flex flex-col justify-center border-b border-[#dfe3ef] bg-white p-4 md:border-r">
                  <span className="grid size-7 place-items-center rounded bg-[#6424dc] text-white">
                    <Boxes className="size-3.5" />
                  </span>
                  <h3 className="mt-2.5 text-base font-bold tracking-tight text-[#0e122b]">
                    Industria y energía
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#626987]">
                    Producción e infraestructura para transformar el territorio.
                  </p>
                  <ArrowRight className="mt-2.5 size-3.5 text-[#6424dc]" />
                </div>

                {/* Col 3 Top: Photo 2 */}
                <div className="relative h-36 w-full border-b border-r border-[#dfe3ef] md:h-40">
                  <Image
                    src="/images/evento/evento_conferencia.png"
                    alt="Innovación aplicada"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Col 4 Top: Card 2 */}
                <div className="flex flex-col justify-center border-b border-[#dfe3ef] bg-white p-4">
                  <span className="grid size-7 place-items-center rounded bg-[#19b9ca] text-white">
                    <Lightbulb className="size-3.5" />
                  </span>
                  <h3 className="mt-2.5 text-base font-bold tracking-tight text-[#0e122b]">
                    Innovación aplicada
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#626987]">
                    Talento y soluciones que impulsan nuevos proyectos.
                  </p>
                  <ArrowRight className="mt-2.5 size-3.5 text-[#19b9ca]" />
                </div>

                {/* Col 1 Bottom: Photo 3 */}
                <div className="relative h-36 w-full border-r border-[#dfe3ef] md:h-40">
                  <Image
                    src="/images/evento/11-Bv-B7Fmn.jpg"
                    alt="Producción e identidad"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Col 2 Bottom: Card 3 */}
                <div className="flex flex-col justify-center border-[#dfe3ef] bg-white p-4 md:border-r">
                  <span className="grid size-7 place-items-center rounded bg-[#7f08d5] text-white">
                    <MapPinned className="size-3.5" />
                  </span>
                  <h3 className="mt-2.5 text-base font-bold tracking-tight text-[#0e122b]">
                    Producción e identidad
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#626987]">
                    Economías regionales, y cultura que proyectan a Jujuy.
                  </p>
                  <ArrowRight className="mt-2.5 size-3.5 text-[#7f08d5]" />
                </div>

                {/* Col 3 Bottom: Photo 4 */}
                <div className="relative h-36 w-full border-r border-[#dfe3ef] md:h-40">
                  <Image
                    src="/images/evento/expo.png"
                    alt="Comercio y alianzas"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Col 4 Bottom: Card 4 */}
                <div className="flex flex-col justify-center bg-white p-4">
                  <span className="grid size-7 place-items-center rounded bg-[#6424dc] text-white">
                    <UsersRound className="size-3.5" />
                  </span>
                  <h3 className="mt-2.5 text-base font-bold tracking-tight text-[#0e122b]">
                    Comercio y alianzas
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#626987]">
                    Rondas, vínculos empresariales y oportunidades hacia nuevos
                    mercados.
                  </p>
                  <ArrowRight className="mt-2.5 size-3.5 text-[#6424dc]" />
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
          {/* Bottom right white text over mountain range */}
          <div className="pointer-events-none absolute right-12 bottom-24 z-10 hidden select-none flex-col items-end text-right text-white drop-shadow-sm xl:flex">
            <span className="text-xs font-bold tracking-[0.2em] uppercase leading-tight">
              JUJUY
            </span>
            <span className="text-xs font-bold tracking-[0.2em] uppercase leading-tight">
              INSPIRA
            </span>
            <span className="text-xs font-bold tracking-[0.2em] uppercase leading-tight">
              CONECTA
            </span>
            <span className="text-xs font-bold tracking-[0.2em] uppercase leading-tight">
              PROYECTA
            </span>
            <div className="mt-2 h-[1.5px] w-14 bg-white" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-7xl">
            <div className="flex items-center justify-between">
              <div data-about-reveal className="chapter-marker">
                <span>04</span>
                <i />
              </div>

              <p className="hidden text-right text-[0.62rem] font-bold tracking-[0.14em] text-[#6b7280] uppercase leading-tight lg:block">
                Más que una feria
                <br />
                Un territorio de oportunidades
              </p>
            </div>

            <p data-about-reveal className="eyebrow mt-5">
              EL ENCUENTRO
            </p>

            <div className="mt-5 grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_auto] lg:gap-16">
              {/* Left Column: Heading, text, and buttons */}
              <div className="max-w-2xl">
                <h2
                  data-about-reveal
                  className="text-[clamp(3.5rem,5.2vw,6.4rem)] font-bold leading-[0.88] tracking-[-0.07em] text-[#0e122b]"
                >
                  El futuro
                  <br />
                  se encuentra
                  <br />
                  <span className="text-[#6424dc]">en Jujuy.</span>
                </h2>

                <p
                  data-about-reveal
                  className="mt-6 max-w-xl text-base leading-relaxed text-[#4b5275] lg:text-lg"
                >
                  Del 9 al 12 de octubre, cuatro jornadas concentran exposición,
                  rondas de negocios, conferencias y actividades culturales para
                  abrir conversaciones que trasciendan el predio.
                </p>

                <p
                  data-about-reveal
                  className="mt-5 text-xs font-bold tracking-[0.12em] text-[#6424dc] uppercase"
                >
                  CORREDOR BIOCEÁNICO · VINCULACIÓN · NUEVOS MERCADOS
                </p>

                <div
                  data-about-reveal
                  className="mt-8 flex flex-wrap items-center gap-4"
                >
                  <Button
                    asChild
                    size="lg"
                    className="h-12 rounded-md bg-[#6424dc] px-7 text-sm font-bold text-white shadow-sm hover:bg-[#521cc0]"
                  >
                    <a
                      href="#expositores"
                      className="inline-flex items-center gap-2"
                    >
                      Ver expositores
                      <ArrowRight aria-hidden className="size-4" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-12 rounded-md border border-gray-300 bg-white px-7 text-sm font-bold text-[#0e122b] hover:border-[#6424dc] hover:text-[#6424dc]"
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
                <div className="z-10 mt-3 self-end text-right">
                  <span className="block font-serif text-2xl italic tracking-tight text-[#0e122b] leading-none">
                    Jujuy
                  </span>
                  <span className="mt-1 block text-[0.55rem] font-bold tracking-[0.18em] text-[#555d7e] uppercase">
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
          <ChevronLeft aria-hidden className="size-5" />
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
          <ChevronRight aria-hidden className="size-5" />
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
