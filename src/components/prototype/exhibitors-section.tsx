"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Search } from "lucide-react";
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
    image: "/images/evento/hall-banner.jpg",
    copy: "Producción, infraestructura y servicios que hacen crecer la región.",
    accent: "#25C0D4",
  },
  {
    sector: "Minería",
    slug: "mineria",
    image: "/images/evento/sector_mineria.png",
    copy: "Proyectos, proveedores y conocimiento para una actividad estratégica.",
    accent: "#820CD0",
  },
  {
    sector: "Agroindustria",
    slug: "agroindustria",
    image: "/images/evento/11-Bv-B7Fmn.jpg",
    copy: "Origen, producción y nuevas cadenas de valor de Jujuy.",
    accent: "#BB8CFF",
  },
  {
    sector: "Tecnología",
    slug: "tecnologia",
    image: "/images/evento/evento_conferencia.png",
    copy: "Soluciones y talento que conectan ideas con oportunidades.",
    accent: "#774FF0",
  },
  {
    sector: "Turismo y cultura",
    slug: "turismo",
    image: "/images/evento/gastronomia.jpg",
    copy: "Experiencias, identidad y propuestas que proyectan el territorio.",
    accent: "#25C0D4",
  },
];

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
      if (list) list.scrollLeft = 0;
      // Observe the actual viewport, including the horizontal mobile carousel.
      // Do not pre-hide offscreen cards: a missed trigger must never erase content.
      const enter = contextSafe((entries: IntersectionObserverEntry[]) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        visible.forEach((entry, index) => {
          const card = entry.target.hasAttribute("data-exhibitor-card");
          gsap.fromTo(entry.target,
            { y: card ? -72 : 20, opacity: 0.3 },
            {
              y: 0, opacity: 1, duration: card ? 0.7 : 0.5,
              delay: card ? index * 0.08 : 0,
              ease: "power3.out",
              clearProps: "transform,opacity,visibility",
            });
          observer.unobserve(entry.target);
        });
      });
      const observer = new IntersectionObserver(enter, { threshold: 0.05 });
      root.querySelectorAll("[data-exhibitor-card]").forEach((card) => observer.observe(card));
      return () => observer.disconnect();
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
              <Search
                aria-hidden
                className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-[#6a718f]"
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
            <article
              data-exhibitor-card
              key={item.slug}
              className="group relative min-h-[500px] w-[78vw] max-w-[330px] shrink-0 snap-center overflow-hidden rounded-lg border border-[#dde0eb] bg-white lg:min-h-[530px] lg:w-auto"
            >
              <div className="h-1.5 w-full" style={{ backgroundColor: item.accent }} />
              <div className="relative h-[56%] min-h-[280px] overflow-hidden bg-[#e8eaf1]">
                <Image
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
                  src={item.image}
                  alt={`Imagen representativa del sector ${item.sector}`}
                  fill
                  sizes="(max-width: 1024px) 78vw, 20vw"
                />
              </div>
              <div className="p-5">
                <p
                  className="inline-flex rounded-full px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.1em]"
                  style={{ backgroundColor: `${item.accent}22`, color: item.accent }}
                >
                  {item.sector}
                </p>
                <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.035em]">
                  Directorio en preparación
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#656b8b]">{item.copy}</p>
              </div>
            </article>
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
            <ArrowRight aria-hidden className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
