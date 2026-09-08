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

const worlds = [
  {
    title: "Industria",
    copy: "Producción que transforma territorios.",
    image: "/images/evento/hall-banner.jpg",
    icon: Boxes,
    accent: "#6424dc",
  },
  {
    title: "Innovación",
    copy: "Ideas que impulsan el mañana.",
    image: "/images/evento/evento_conferencia.png",
    icon: Lightbulb,
    accent: "#19b9ca",
  },
  {
    title: "Cultura",
    copy: "Nuestra identidad nos proyecta al mundo.",
    image: "/images/evento/11-Bv-B7Fmn.jpg",
    icon: MapPinned,
    accent: "#7f08d5",
  },
  {
    title: "Negocios",
    copy: "Conexiones que generan valor real.",
    image: "/images/evento/expo.png",
    icon: UsersRound,
    accent: "#6424dc",
  },
];

export function AboutExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (progressRef.current) {
                gsap.set(progressRef.current, {
                  scaleX: Math.max(0.02, self.progress),
                });
              }
              if (counterRef.current) {
                counterRef.current.textContent = String(
                  Math.min(4, Math.floor(self.progress * 4) + 1),
                ).padStart(2, "0");
              }
            },
          },
        });

        triggerRef.current = tween.scrollTrigger ?? null;
        return () => {
          triggerRef.current = null;
        };
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  const moveOnePanel = (direction: -1 | 1) => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const segment = (trigger.end - trigger.start) / 3;
    const target = gsap.utils.clamp(
      trigger.start,
      trigger.end,
      window.scrollY + segment * direction,
    );
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className="relative overflow-hidden bg-[#f7f8fc] text-[#0b123b]"
    >
      <div ref={trackRef} className="about-track">
        <article
          data-about-panel
          className="about-panel relative isolate flex items-center overflow-hidden border-r border-[#dfe3ef] px-5 pb-28 pt-32 sm:px-8 lg:px-12"
        >
          <div
            aria-hidden
            className="absolute -bottom-[28%] -left-[14%] -z-20 h-[62%] w-[78%] rounded-[50%] bg-[#eef0fb]"
          />
          <div
            aria-hidden
            className="absolute bottom-0 right-[4%] -z-10 h-[31%] w-[8%] bg-[#ac7ff0]"
          />

          <div className="mx-auto grid w-full max-w-[1480px] gap-10 md:grid-cols-[minmax(0,760px)_1fr] md:items-center">
            <div>
              <div className="chapter-marker">
                <span>01</span>
                <i />
              </div>
              <p className="eyebrow mt-8">Nuestra esencia</p>
              <h2 className="mt-6 max-w-[760px] text-[clamp(4rem,8.3vw,8.4rem)] font-semibold leading-[0.78] tracking-[-0.075em]">
                Sobre
                <br />
                <span className="text-[#6424dc]">ExpoJuy</span>
                <br />
                <span className="text-[#7f08d5]">2026</span>
              </h2>
              <p className="mt-8 max-w-[530px] text-lg leading-relaxed text-[#424a70]">
                Un encuentro multisectorial que conecta industria, innovación,
                cultura y oportunidades en Jujuy.
              </p>
              <a
                href="#expositores"
                className="mt-9 inline-flex items-center gap-3 text-sm font-semibold text-[#6424dc]"
              >
                <span className="grid size-11 place-items-center rounded-full border border-[#6424dc]">
                  <Play aria-hidden className="ml-0.5 size-4" />
                </span>
                Conocé más sobre ExpoJuy
              </a>
            </div>
          </div>
        </article>

        <article
          data-about-panel
          className="about-panel relative flex items-center overflow-hidden border-r border-[#dfe3ef] px-5 pb-28 pt-32 sm:px-8 lg:px-12"
        >
          <div
            aria-hidden
            className="absolute bottom-0 right-[3%] h-[20%] w-[7%] bg-[#19b9ca]"
          />
          <div className="mx-auto w-full max-w-[1480px]">
            <div className="chapter-marker">
              <span>02</span>
              <i />
            </div>
            <p className="eyebrow mt-8">Un territorio, infinitas posibilidades</p>

            <div className="mt-7 grid items-center gap-8 md:grid-cols-[1fr_0.5fr]">
              <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden">
                <span className="landscape-u" aria-hidden="true">
                  U
                </span>
              </div>
              <div className="relative z-10 max-w-[310px]">
                <h2 className="text-[clamp(2.1rem,4vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.055em]">
                  Jujuy es energía que impulsa, conecta y transforma.
                </h2>
                <p className="mt-7 text-base leading-relaxed text-[#596080]">
                  Un territorio estratégico donde las ideas se convierten en
                  proyectos y los proyectos en futuro.
                </p>
              </div>
            </div>
          </div>
        </article>

        <article
          data-about-panel
          className="about-panel flex items-center overflow-hidden border-r border-[#dfe3ef] px-5 pb-28 pt-32 sm:px-8 lg:px-12"
        >
          <div className="mx-auto w-full max-w-[1480px]">
            <div className="chapter-marker">
              <span>03</span>
              <i />
            </div>
            <p className="eyebrow mt-8">Cuatro mundos, una misma visión</p>
            <h2 className="sr-only">Sectores que conectan el territorio</h2>

            <div className="sector-mosaic mt-7 grid grid-cols-2 overflow-hidden border border-[#dfe3ef] bg-white">
              {worlds.map(({ title, copy, image, icon: Icon, accent }, index) => (
                <article
                  key={title}
                  className="grid min-h-[260px] grid-cols-2 border-[#dfe3ef] odd:border-r [&:nth-child(-n+2)]:border-b"
                >
                  <div className={index % 3 === 0 ? "order-2 relative" : "relative"}>
                    <Image
                      className="absolute inset-0 h-full w-full object-cover"
                      src={image}
                      alt=""
                      fill
                      sizes="25vw"
                    />
                  </div>
                  <div className={index % 3 === 0 ? "order-1 flex flex-col justify-center p-6" : "flex flex-col justify-center p-6"}>
                    <span
                      className="grid size-9 place-items-center rounded-md text-white"
                      style={{ backgroundColor: accent }}
                    >
                      <Icon aria-hidden className="size-4" />
                    </span>
                    <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">
                      {title}
                    </h3>
                    <p className="mt-2 max-w-[180px] text-sm leading-relaxed text-[#626987]">
                      {copy}
                    </p>
                    <ArrowRight aria-hidden className="mt-5 size-4 text-[#6424dc]" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </article>

        <article
          data-about-panel
          className="about-panel relative isolate flex items-center overflow-hidden px-5 pb-28 pt-32 sm:px-8 lg:px-12"
        >
          <div aria-hidden className="absolute -right-[15%] top-[8%] -z-20 opacity-20">
            <span className="landscape-u final-landscape-u">U</span>
          </div>
          <div
            aria-hidden
            className="absolute right-[5%] top-[25%] -z-10 h-[46%] w-[8%] bg-[#ac7ff0]"
          />
          <div
            aria-hidden
            className="absolute -right-[2%] top-[8%] -z-10 h-[54%] w-[8%] bg-[#19b9ca]"
          />

          <div className="mx-auto w-full max-w-[1480px]">
            <div className="chapter-marker">
              <span>04</span>
              <i />
            </div>
            <p className="eyebrow mt-8">El encuentro</p>
            <div className="mt-7 max-w-[770px]">
              <h2 className="text-[clamp(4rem,7.4vw,8rem)] font-semibold leading-[0.84] tracking-[-0.075em]">
                El futuro
                <br />
                se encuentra
                <br />
                <span className="text-[#6424dc]">en Jujuy.</span>
              </h2>
              <p className="mt-8 max-w-[560px] text-lg leading-relaxed text-[#424a70]">
                Industria, innovación, cultura y oportunidades. Un mismo lugar para
                ir más allá.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-md bg-[#6424dc] px-7 text-white hover:bg-[#531bbd]"
                >
                  <a href="#expositores">
                    Ver expositores
                    <ArrowRight aria-hidden className="size-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-md border-[#6424dc] bg-white px-7 text-[#6424dc]"
                >
                  <a href="#expositores">Conocer los sectores</a>
                </Button>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="about-progress-shell absolute inset-x-0 bottom-0 z-20 hidden h-20 items-center border-t border-[#dfe3ef] bg-[#f7f8fc]/95 px-8 backdrop-blur-md md:flex lg:px-12">
        <button
          type="button"
          onClick={() => moveOnePanel(-1)}
          className="grid size-11 shrink-0 place-items-center rounded-full border border-[#bfc5d8] text-[#5e6685] hover:border-[#6424dc] hover:text-[#6424dc]"
          aria-label="Panel anterior"
        >
          <ChevronLeft aria-hidden className="size-5" />
        </button>
        <p className="ml-5 shrink-0 text-sm text-[#646b89]">
          Scroll horizontal para descubrir más
        </p>
        <div className="mx-8 h-px flex-1 overflow-hidden bg-[#d7dbe8]">
          <span
            ref={progressRef}
            className="block h-full origin-left scale-x-[0.02] bg-[#6424dc]"
          />
        </div>
        <p className="mr-6 text-xs font-semibold tracking-[0.16em] text-[#747b98]">
          <span ref={counterRef} className="text-[#6424dc]">
            01
          </span>
          <span aria-hidden> / 04</span>
        </p>
        <button
          type="button"
          onClick={() => moveOnePanel(1)}
          className="grid size-11 shrink-0 place-items-center rounded-full border border-[#bfc5d8] text-[#5e6685] hover:border-[#6424dc] hover:text-[#6424dc]"
          aria-label="Panel siguiente"
        >
          <ChevronRight aria-hidden className="size-5" />
        </button>
      </div>
    </section>
  );
}
