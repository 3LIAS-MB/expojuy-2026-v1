"use client";

import Image from "next/image";
import { ArrowUpRight, Award, Building, Sparkles } from "lucide-react";

const SPONSOR_LOGOS = [
  { id: "s1", src: "/images/logo_sponsors/1-DqeJkg9W.webp", alt: "Sponsor Oficial 1" },
  { id: "s2", src: "/images/logo_sponsors/2-BIEp5tms.webp", alt: "Sponsor Oficial 2" },
  { id: "s3", src: "/images/logo_sponsors/3-DZG25MF5.webp", alt: "Sponsor Oficial 3" },
  { id: "s4", src: "/images/logo_sponsors/4-BhWZMpSy.webp", alt: "Sponsor Oficial 4" },
];

const GOBIERNO_LOGOS = [
  { id: "g1", src: "/images/logos_gobierno/1-eVB6Y33o.webp", alt: "Gobierno de Jujuy" },
  { id: "g2", src: "/images/logos_gobierno/2-_DJwGfw4.webp", alt: "Institución Aliada 2" },
  { id: "g3", src: "/images/logos_gobierno/3-Bvxgh0dh.webp", alt: "Institución Aliada 3" },
  { id: "g4", src: "/images/logos_gobierno/5-po3hVP4a.webp", alt: "Institución Aliada 5" },
  { id: "g5", src: "/images/logos_gobierno/6-BXeXyAx6.webp", alt: "Institución Aliada 6" },
];

export default function SponsorsSection() {
  // Multiply arrays for smooth infinite scroll marquee loop
  const marqueeSponsors = [...SPONSOR_LOGOS, ...SPONSOR_LOGOS, ...SPONSOR_LOGOS, ...SPONSOR_LOGOS];
  const marqueeGobierno = [...GOBIERNO_LOGOS, ...GOBIERNO_LOGOS, ...GOBIERNO_LOGOS, ...GOBIERNO_LOGOS];

  return (
    <section id="sponsors" className="py-20 bg-[#f7f8fc] text-[#0b123b] border-t border-[#dfe3ef] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6424dc]/10 border border-[#6424dc]/20 text-[#6424dc] text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Respaldo & Alianzas Estratégicas</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0b123b]">
            Organizaciones y Empresas <br className="hidden sm:inline" />
            <span className="text-[#6424dc]">que impulsan ExpoJuy 2026</span>
          </h2>

          <p className="text-[#646a85] text-sm sm:text-base leading-relaxed">
            Un esfuerzo público-privado que conecta la producción de Jujuy con el mundo y fortalece el desarrollo del NOA.
          </p>
        </div>

        {/* MARQUEE CAROUSEL 1: Sponsors Oficiales */}
        <div className="space-y-4 mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#646a85]">
            <Sparkles className="w-3.5 h-3.5 text-[#F8BF00]" />
            <span>Sponsors Oficiales</span>
          </div>

          {/* Marquee Slider Row 1 */}
          <div className="relative w-full overflow-hidden py-4 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-24 before:bg-gradient-to-r before:from-[#f7f8fc] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-24 after:bg-gradient-to-l after:from-[#f7f8fc] after:to-transparent">
            <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
              {marqueeSponsors.map((item, index) => (
                <div
                  key={`sp-${item.id}-${index}`}
                  className="flex h-24 w-48 sm:w-56 items-center justify-center rounded-xl bg-white border border-[#dfe3ef] px-6 py-4 shadow-sm hover:shadow-md hover:border-[#6424dc]/50 transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative h-14 w-full opacity-80 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MARQUEE CAROUSEL 2: Respaldo Institucional & Gobierno */}
        <div className="space-y-4 mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#646a85]">
            <Building className="w-3.5 h-3.5 text-[#6424dc]" />
            <span>Respaldo Institucional & Aliados</span>
          </div>

          {/* Marquee Slider Row 2 (Reverse direction) */}
          <div className="relative w-full overflow-hidden py-4 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-24 before:bg-gradient-to-r before:from-[#f7f8fc] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-24 after:bg-gradient-to-l after:from-[#f7f8fc] after:to-transparent">
            <div className="flex w-max animate-marquee-reverse gap-6 hover:[animation-play-state:paused]">
              {marqueeGobierno.map((item, index) => (
                <div
                  key={`gob-${item.id}-${index}`}
                  className="flex h-24 w-48 sm:w-56 items-center justify-center rounded-xl bg-white border border-[#dfe3ef] px-6 py-4 shadow-sm hover:shadow-md hover:border-[#6424dc]/50 transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative h-14 w-full opacity-80 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA BANNER: Sumar a la Expo */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#0b123b] via-[#151c4a] to-[#0b123b] text-white rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#6424dc]/25 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 text-left relative z-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#F8BF00] bg-[#F8BF00]/10 px-2.5 py-1 rounded border border-[#F8BF00]/20">
              Oportunidad Comercial
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white pt-1">
              ¿Querés posicionar tu marca en ExpoJuy 2026?
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm max-w-xl">
              Sumate como Sponsor Oficial o reservá tu stand en el predio ferial. Consultá los paquetes de auspicio disponibles con la Cámara de Comercio Exterior.
            </p>
          </div>

          <a
            href="mailto:expojuy2.0@gmail.com?subject=Consulta%20Sponsorship%20ExpoJuy%202026"
            className="inline-flex items-center justify-center gap-2 bg-[#6424dc] hover:bg-[#521ab9] text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg transition-all hover:scale-105 shrink-0 relative z-10"
          >
            <span>Quiero ser Sponsor</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
