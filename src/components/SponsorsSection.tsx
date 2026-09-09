"use client";

import Image from "next/image";

const SPONSOR_LOGOS = [
  { id: "s1", src: "/images/logo_sponsors/1-DqeJkg9W.webp", alt: "EXAR" },
  { id: "s2", src: "/images/logo_sponsors/2-BIEp5tms.webp", alt: "Compañía de Seguros de Jujuy" },
  { id: "s3", src: "/images/logo_sponsors/3-DZG25MF5.webp", alt: "Cannava Sociedad del Estado" },
  { id: "s4", src: "/images/logo_sponsors/4-BhWZMpSy.webp", alt: "KeLimpio" },
];

const ALIANZAS_LOGOS = [
  { id: "g1", src: "/images/logos_gobierno/1-eVB6Y33o.webp", alt: "Secretaría de Turismo, Ambiente y Deportes" },
  { id: "g2", src: "/images/logos_gobierno/2-_DJwGfw4.webp", alt: "Gobierno de Jujuy" },
  { id: "g3", src: "/images/logos_gobierno/3-Bvxgh0dh.webp", alt: "CFI" },
  { id: "g4", src: "/images/logos_gobierno/5-po3hVP4a.webp", alt: "Municipalidad de San Salvador de Jujuy" },
  { id: "g5", src: "/images/logos_gobierno/6-BXeXyAx6.webp", alt: "Cámara Argentina de Comercio y Servicios" },
];

export default function SponsorsSection() {
  const marqueeSponsors = [...SPONSOR_LOGOS, ...SPONSOR_LOGOS, ...SPONSOR_LOGOS, ...SPONSOR_LOGOS];
  const marqueeAlianzas = [...ALIANZAS_LOGOS, ...ALIANZAS_LOGOS, ...ALIANZAS_LOGOS, ...ALIANZAS_LOGOS];

  return (
    <section id="sponsors" className="py-16 bg-[#f7f8fc] border-t border-[#dfe3ef] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 text-center space-y-12">
        
        {/* BLOQUE 1: SPONSORS OFICIALES */}
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#0b123b]">
            Sponsors Oficiales
          </h2>
          <p className="text-xs sm:text-sm text-[#646a85] max-w-xl mx-auto">
            Empresas referentes que apoyan el desarrollo productivo e industrial de la región en ExpoJuy 2026.
          </p>

          {/* Marquee Row 1 */}
          <div className="relative w-full overflow-hidden py-4 pt-5 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-[#f7f8fc] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-[#f7f8fc] after:to-transparent">
            <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
              {marqueeSponsors.map((item, index) => (
                <div
                  key={`sp-${item.id}-${index}`}
                  className="flex h-20 w-44 sm:w-52 items-center justify-center rounded-xl bg-white border border-[#dfe3ef] px-5 py-3 shadow-sm hover:shadow-md hover:border-[#6424dc]/40 transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative h-12 w-full opacity-80 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105">
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

        {/* SEPARADOR SUTIL */}
        <div className="w-24 h-px bg-[#dfe3ef] mx-auto" />

        {/* BLOQUE 2: ALIANZAS INSTITUCIONALES */}
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#0b123b]">
            Alianzas e Instituciones
          </h2>
          <p className="text-xs sm:text-sm text-[#646a85] max-w-xl mx-auto">
            Organismos públicos y entidades que respaldan la integración regional e internacional.
          </p>

          {/* Marquee Row 2 (Reverse) */}
          <div className="relative w-full overflow-hidden py-4 pt-5 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-[#f7f8fc] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-[#f7f8fc] after:to-transparent">
            <div className="flex w-max animate-marquee-reverse gap-6 hover:[animation-play-state:paused]">
              {marqueeAlianzas.map((item, index) => (
                <div
                  key={`ali-${item.id}-${index}`}
                  className="flex h-20 w-44 sm:w-52 items-center justify-center rounded-xl bg-white border border-[#dfe3ef] px-5 py-3 shadow-sm hover:shadow-md hover:border-[#6424dc]/40 transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative h-12 w-full opacity-80 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105">
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

      </div>
    </section>
  );
}
