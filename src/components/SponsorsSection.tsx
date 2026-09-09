"use client";

import Image from "next/image";

const SPONSOR_LOGOS = [
  { id: "s1", src: "/images/logo_sponsors/1-DqeJkg9W.webp", alt: "EXAR" },
  { id: "s2", src: "/images/logo_sponsors/2-BIEp5tms.webp", alt: "Compañía de Seguros de Jujuy" },
  { id: "s3", src: "/images/logo_sponsors/3-DZG25MF5.webp", alt: "Cannava Sociedad del Estado" },
  { id: "s4", src: "/images/logo_sponsors/4-BhWZMpSy.webp", alt: "KeLimpio" },
];

const GOBIERNO_LOGOS = [
  { id: "g1", src: "/images/logos_gobierno/1-eVB6Y33o.webp", alt: "Secretaría de Turismo, Ambiente y Deportes" },
  { id: "g2", src: "/images/logos_gobierno/2-_DJwGfw4.webp", alt: "Gobierno de Jujuy" },
  { id: "g3", src: "/images/logos_gobierno/3-Bvxgh0dh.webp", alt: "CFI" },
  { id: "g4", src: "/images/logos_gobierno/5-po3hVP4a.webp", alt: "Municipalidad de San Salvador de Jujuy" },
  { id: "g5", src: "/images/logos_gobierno/6-BXeXyAx6.webp", alt: "Cámara Argentina de Comercio y Servicios" },
];

export default function SponsorsSection() {
  const marqueeSponsors = [...SPONSOR_LOGOS, ...SPONSOR_LOGOS, ...SPONSOR_LOGOS, ...SPONSOR_LOGOS];
  const marqueeGobierno = [...GOBIERNO_LOGOS, ...GOBIERNO_LOGOS, ...GOBIERNO_LOGOS, ...GOBIERNO_LOGOS];

  return (
    <section id="sponsors" className="py-16 bg-[#f7f8fc] border-t border-[#dfe3ef] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 text-center">
        
        <p className="text-xs uppercase tracking-widest text-[#646a85] font-extrabold mb-8">
          Sponsors Oficiales & Alianzas Institucionales
        </p>

        {/* Marquee Row 1 */}
        <div className="relative w-full overflow-hidden py-3 mb-6 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-[#f7f8fc] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-[#f7f8fc] after:to-transparent">
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

        {/* Marquee Row 2 (Reverse) */}
        <div className="relative w-full overflow-hidden py-3 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-[#f7f8fc] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-[#f7f8fc] after:to-transparent">
          <div className="flex w-max animate-marquee-reverse gap-6 hover:[animation-play-state:paused]">
            {marqueeGobierno.map((item, index) => (
              <div
                key={`gob-${item.id}-${index}`}
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
    </section>
  );
}
