"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowRight, FaMagnifyingGlass } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const exhibitors = [
  {
    sector: "Industria",
    slug: "industria",
    name: "Martín Soria",
    role: "Desarrollo industrial",
    image: "/images/expositores/252bb4bd-619c-4ec3-b8ab-db20c9e97c6e.png",
    copy: "Ideas, infraestructura y alianzas para una industria jujeña que crece con visión regional.",
    accent: "#25C0D4",
  },
  {
    sector: "Minería",
    slug: "mineria",
    name: "Santiago Vega",
    role: "Innovación minera",
    image: "/images/expositores/49b45152-99b3-4b4b-94f5-4cf1a81915a7.png",
    copy: "Nuevas capacidades y soluciones responsables para impulsar el valor agregado desde la Puna.",
    accent: "#820CD0",
  },
  {
    sector: "Agroindustria",
    slug: "agroindustria",
    name: "Lucía Álvarez",
    role: "Cadenas de valor",
    image: "/images/expositores/7d515a81-8776-42d7-9eb9-3c62ec903ee5.png",
    copy: "Origen, innovación y nuevas oportunidades para poner el talento productivo de Jujuy en movimiento.",
    accent: "#BB8CFF",
  },
  {
    sector: "Tecnología",
    slug: "tecnologia",
    name: "Nicolás Acuña",
    role: "Tecnología aplicada",
    image: "/images/expositores/94299eab-28f0-43b6-a082-7d6016815126.png",
    copy: "Tecnología aplicada, talento local y conexiones que transforman desafíos en oportunidades concretas.",
    accent: "#774FF0",
  },
  {
    sector: "Turismo y cultura",
    slug: "turismo",
    name: "Camila Ríos",
    role: "Experiencias culturales",
    image: "/images/expositores/bd12f9ae-d944-48dc-9711-5b6638a2e1e5.png",
    copy: "Identidad, hospitalidad y experiencias que invitan a descubrir Jujuy desde nuevas miradas.",
    accent: "#25C0D4",
  },
];

type Exhibitor = (typeof exhibitors)[number];

function ExhibitorCard({ item }: { item: Exhibitor }) {
  return (
    <article
      data-exhibitor-card
      className="group flex min-h-[520px] w-[78vw] max-w-[340px] shrink-0 snap-center flex-col overflow-hidden border border-[#cfd4e4] bg-white lg:w-auto"
    >
      <div data-exhibitor-media className="relative aspect-[3/4] overflow-hidden bg-[#111536]">
        <Image
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none"
          src={item.image}
          alt={`Retrato de ${item.name}, expositor de ${item.sector}`}
          fill
          sizes="(max-width: 1024px) 78vw, 20vw"
          loading="eager"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090b2e]/80 via-[#090b2e]/5 to-transparent" />
        <div
          data-exhibitor-glow
          aria-hidden="true"
          className="pointer-events-none invisible absolute left-0 top-0 h-72 w-72 rounded-full opacity-0 blur-xl mix-blend-screen will-change-transform sm:h-96 sm:w-96"
          style={{
            background:
              "radial-gradient(circle, rgba(189, 114, 255, 0.94) 0%, rgba(139, 43, 255, 0.62) 32%, rgba(112, 22, 207, 0.18) 56%, transparent 74%)",
          }}
        />
        <svg
          data-exhibitor-mark
          aria-hidden="true"
          viewBox="0 0 144 144"
          className="absolute -left-2 -top-2 h-32 w-32 text-white drop-shadow-[0_1px_4px_rgba(9,11,46,0.35)] will-change-transform"
        >
          <defs>
            <path id={`exhibitor-mark-${item.slug}`} d="M72,72 m-51,0 a51,51 0 1,1 102,0 a51,51 0 1,1 -102,0" />
          </defs>
          <text className="fill-current text-[14px] font-bold tracking-[0.16em]">
            <textPath href={`#exhibitor-mark-${item.slug}`} startOffset="4%">EXPOJUY · EXPOJUY ·</textPath>
          </text>
        </svg>
        <div className="absolute inset-x-5 bottom-5 text-white">
          <p className="text-[0.66rem] font-bold uppercase tracking-[0.15em] text-[#bfeff5]">{item.sector}</p>
          <h3 className="mt-2 text-3xl font-semibold leading-[0.95] tracking-[-0.045em]">{item.name}</h3>
        </div>
      </div>
      <div className="flex min-h-[188px] flex-1 flex-col p-5">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em]" style={{ color: item.accent }}>
          {item.role}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#4b5275]">{item.copy}</p>
        <div className="mt-auto flex items-center justify-between border-t border-[#e0e3ed] pt-4 text-xs font-bold uppercase tracking-[0.12em] text-[#0b123b]">
          <span>Conocer perfil</span>
          <FaArrowRight aria-hidden className="size-3.5" style={{ color: item.accent }} />
        </div>
      </div>
    </article>
  );
}

export function ExhibitorsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const [sector, setSector] = useState("todos");
  const [query, setQuery] = useState("");

  const visibleExhibitors = useMemo(() => {
    const cleanQuery = query.trim().toLocaleLowerCase("es");
    return exhibitors.filter((item) => {
      const bySector = sector === "todos" || item.slug === sector;
      const byQuery =
        cleanQuery.length === 0 ||
        `${item.sector} ${item.copy}`.toLocaleLowerCase("es").includes(cleanQuery);
      return bySector && byQuery;
    });
  }, [query, sector]);

  const visibleCount = visibleExhibitors.length;

  useGSAP(
    (_context, contextSafe) => {
      if (!contextSafe) return;
      const root = rootRef.current;
      if (!root) return;
      const list = root.querySelector<HTMLElement>("[data-exhibitor-list]");
      const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-exhibitor-card]"));
      if (list) list.scrollLeft = 0;

      // The portrait, not the full card, owns the signature hover interaction.
      // Keep it in this single GSAP context so filtering cleanly removes every listener.
      const pointerCleanups: Array<() => void> = [];
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!prefersReducedMotion) {
        cards.forEach((card) => {
          const media = card.querySelector<HTMLElement>("[data-exhibitor-media]");
          const glow = card.querySelector<HTMLElement>("[data-exhibitor-glow]");
          const mark = card.querySelector<SVGSVGElement>("[data-exhibitor-mark]");
          if (!media || !glow || !mark) return;

          gsap.set(glow, { autoAlpha: 0, scale: 0.72, xPercent: -50, yPercent: -50 });
          gsap.set(mark, { transformOrigin: "50% 50%" });

          const glowX = gsap.quickTo(glow, "x", { duration: 0.36, ease: "power3.out" });
          const glowY = gsap.quickTo(glow, "y", { duration: 0.36, ease: "power3.out" });
          const spin = gsap.to(mark, {
            rotation: 360,
            duration: 7,
            ease: "none",
            repeat: -1,
            paused: true,
          });

          const positionGlow = (event: PointerEvent) => {
            const bounds = media.getBoundingClientRect();
            glowX(event.clientX - bounds.left);
            glowY(event.clientY - bounds.top);
          };
          const handleEnter = contextSafe((event: PointerEvent) => {
            positionGlow(event);
            gsap.to(glow, {
              autoAlpha: 1,
              scale: 1,
              duration: 0.28,
              ease: "power3.out",
              overwrite: "auto",
            });
            spin.restart();
          });
          const handleMove = contextSafe((event: PointerEvent) => positionGlow(event));
          const handleLeave = contextSafe(() => {
            spin.pause(0);
            gsap.to(glow, {
              autoAlpha: 0,
              scale: 0.72,
              duration: 0.24,
              ease: "power2.out",
              overwrite: "auto",
            });
          });

          media.addEventListener("pointerenter", handleEnter);
          media.addEventListener("pointermove", handleMove);
          media.addEventListener("pointerleave", handleLeave);
          pointerCleanups.push(() => {
            media.removeEventListener("pointerenter", handleEnter);
            media.removeEventListener("pointermove", handleMove);
            media.removeEventListener("pointerleave", handleLeave);
            spin.kill();
          });
        });
      }

      // Observe the actual viewport, including the horizontal mobile carousel.
      // Do not pre-hide offscreen cards: a missed trigger must never erase content.
      const enter = contextSafe((entries: IntersectionObserverEntry[]) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        visible.forEach((entry, index) => {
          const card = entry.target.hasAttribute("data-exhibitor-card");
          gsap.fromTo(entry.target,
            // Keep the card (and its portrait) fully visible while it enters.
            // Fading the whole card made the images look missing during the
            // first frames of the GSAP reveal.
            { y: card ? -72 : 20 },
            {
              y: 0, duration: card ? 0.7 : 0.5,
              delay: card ? index * 0.08 : 0,
              ease: "power3.out",
              clearProps: "transform",
            });
          observer.unobserve(entry.target);
        });
      });
      const observer = new IntersectionObserver(enter, { threshold: 0.05 });
      cards.forEach((card) => observer.observe(card));
      return () => {
        observer.disconnect();
        pointerCleanups.forEach((cleanup) => cleanup());
      };
    },
    { dependencies: [sector, query], revertOnUpdate: true, scope: rootRef },
  );

  const resetFilters = () => {
    setSector("todos");
    setQuery("");
  };

  return (
    <section
      ref={rootRef}
      id="expositores"
      className="relative min-h-[100dvh] overflow-hidden bg-[#f2f3f8] px-5 py-28 text-[#0b123b] sm:px-8 lg:px-12 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute left-0 top-28 h-1 w-20 bg-[#25C0D4] sm:w-32"
      />
      <div className="mx-auto max-w-[1480px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_460px] lg:items-end">
          <div data-exhibitor-heading>
            <p className="eyebrow">ExpoJuy 2026</p>
            <h2 className="mt-5 max-w-[800px] text-[clamp(4rem,7.2vw,7.8rem)] font-semibold leading-[0.82] tracking-[-0.075em]">
              Expositores
              <br />
              <span className="text-[#820CD0]">destacados</span>
            </h2>
            <p className="mt-7 max-w-[620px] text-lg leading-relaxed text-[#4b5275]">
              Conocé empresas, instituciones y proyectos que impulsan la industria,
              la innovación y la cultura en Jujuy.
            </p>
          </div>

          <div data-exhibitor-heading className="grid gap-3 sm:grid-cols-[1fr_190px] lg:grid-cols-1 xl:grid-cols-[1fr_190px]">
            <label className="relative block">
              <span className="sr-only">Buscar expositor</span>
              <FaMagnifyingGlass
                aria-hidden
                className="pointer-events-none absolute left-3.5 top-1/2 z-10 size-3.5 -translate-y-1/2 text-[#6a718f]"
              />
              <Input
                className="h-11 rounded-md border-[#cfd4e4] bg-white pl-10 text-[#0b123b] shadow-none placeholder:text-[#7c829c]"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por sector"
              />
            </label>
            <Select value={sector} onValueChange={setSector}>
              <SelectTrigger
                className="h-11 w-full rounded-md border-[#cfd4e4] bg-white px-3 text-[#0b123b]"
                aria-label="Filtrar por sector"
              >
                <SelectValue placeholder="Todos los sectores" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los sectores</SelectItem>
                {exhibitors.map((item) => (
                  <SelectItem key={item.slug} value={item.slug}>
                    {item.sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <p className="mt-10 text-sm font-semibold text-[#656b8b]" aria-live="polite">
          {visibleCount} {visibleCount === 1 ? "sector visible" : "sectores visibles"}
        </p>

        <div
          data-exhibitor-list
          className="exhibitor-scroll -mx-5 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-7 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0"
        >
          {visibleExhibitors.map((item) => (
            <ExhibitorCard key={item.slug} item={item} />
          ))}
        </div>

        {visibleCount === 0 && (
          <div className="mt-5 rounded-lg border border-dashed border-[#bfc5d8] bg-white p-8">
            <p className="text-lg font-semibold">No encontramos ese sector.</p>
            <Button
              type="button"
              variant="link"
              className="mt-2 h-auto p-0 text-[#820CD0]"
              onClick={resetFilters}
            >
              Restablecer filtros
            </Button>
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-[#d7dae7] pt-7">
          <p className="max-w-[620px] text-sm leading-relaxed text-[#656b8b]">
            El directorio se actualizará cuando se confirme la nómina oficial de
            participantes.
          </p>
          <Button
            type="button"
            disabled
            className="h-12 rounded-md bg-[#820CD0] px-6 text-white"
          >
            Inscripciones próximamente
            <FaArrowRight aria-hidden className="size-3.5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
