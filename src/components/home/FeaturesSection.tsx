"use client";

import Image from "next/image";
import Link from "next/link";

const features = [
  {
    id: 1,
    icon: "/images/Magic-Tiles.svg",
    title: "Pabellones cubiertos para minería, tecnología, agroindustria e innovación comercial",
    alt: "Pabellones e Innovación",
  },
  {
    id: 2,
    icon: "/images/Bold-1.png",
    title: "Salas de auditorio y salones B2B para Rondas Internacionales de Negocios",
    alt: "Rondas B2B y Auditorio",
  },
  {
    id: 3,
    icon: "/images/Screenshot-2025-10-21-070744.png",
    title: "Espacio preparado para más de 100.000 visitantes y 200+ empresas expositoras",
    alt: "Gran Capacidad de Expositores",
  },
  {
    id: 4,
    icon: "/images/Magic-Tiles-3.svg",
    title: "Recorrido fluido entre áreas de stands bajo techo y parcelas al aire libre para maquinaria pesada",
    alt: "Recorrido Fluido",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative w-full bg-[#EBEBEB] tilted-grid-pattern text-slate-900 py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-900 leading-[1.15] tracking-tight mb-4 text-left">
          <span className="text-[#5E009D] font-bold">El Encuentro Empresarial</span>, Minero, Industrial e Innovador de Jujuy
        </h2>

        {/* Text Paragraphs */}
        <div className="space-y-3 mb-14 text-left">
          <p className="text-[#555555] text-sm sm:text-base lg:text-lg font-normal leading-relaxed max-w-5xl">
            EXPOJUY 2026 es el evento multisectorial referente de la provincia de Jujuy y la región del NOA. Punto de Encuentro para la Innovación, Sostenibilidad, Tecnología y Producción Regional.
          </p>
          <p className="text-[#555555] text-sm sm:text-base lg:text-lg font-normal leading-relaxed max-w-5xl">
            Ubicada estratégicamente en la Ciudad Cultural de San Salvador de Jujuy, conectada con las principales rutas nacionales e internacionales, EXPOJUY 2026 ofrece instalaciones y servicios de primer nivel para brindar experiencias de negocios e innovación memorables.
          </p>
        </div>

        {/* 4 Black Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 pt-8 mb-10">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-black text-white p-6 sm:p-8 min-h-[280px] sm:min-h-[310px] flex flex-col items-center justify-between text-center relative pt-12 rounded-xs shadow-lg group hover:translate-y-[-4px] transition-transform duration-300"
            >
              {/* Overlapping Top Icon */}
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-20 h-20 sm:w-22 sm:h-22 flex items-center justify-center pointer-events-none drop-shadow-md">
                <Image
                  src={feature.icon}
                  alt={feature.alt}
                  width={88}
                  height={88}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Card Description */}
              <div className="my-auto pt-6">
                <p className="text-white font-bold text-sm sm:text-base leading-snug tracking-tight">
                  {feature.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CONOCER MÁS Button at bottom right */}
        <div className="flex justify-end w-full">
          <Link
            href="/sobre-nosotros"
            className="group inline-flex items-center gap-2.5 bg-[#2b00ff] hover:bg-[#1e00ca] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 py-3 rounded-xs shadow-md transition-all duration-200"
          >
            {/* Right Chevron SVG */}
            <svg
              aria-hidden="true"
              className="w-3.5 h-3.5 fill-current text-white transition-transform group-hover:translate-x-1"
              viewBox="0 0 1000 1000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M696 533C708 521 713 504 713 487 713 471 708 454 696 446L400 146C388 133 375 125 354 125 338 125 325 129 313 142 300 154 292 171 292 187 292 204 296 221 308 233L563 492 304 771C292 783 288 800 288 817 288 833 296 850 308 863 321 871 338 875 354 875 371 875 388 867 400 854L696 533Z" />
            </svg>
            <span>CONOCER MÁS</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
