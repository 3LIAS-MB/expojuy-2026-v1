"use client";

import Image from "next/image";
import Link from "next/link";

const exhibitorCards = [
  {
    id: 1,
    title: "Información Expositores",
    description: "Más de 10.000 m² de exposición cubierta y descubierta para stands comerciales e industriales.",
    image: "/images/expo.png",
    link: "/informacion-expositores",
  },
  {
    id: 2,
    title: "Stands y Servicios",
    description: "Consultá por opciones de stands, equipamiento técnico y beneficios exclusivos para empresas.",
    image: "/images/event-packages-banner.jpg",
    link: "/stands-servicios",
  },
  {
    id: 3,
    title: "Plano del Predio",
    description: "Explorá el mapa interactivo del predio ferial y la distribución de pabellones.",
    image: "/images/ciudad_cultural.png",
    link: "/plano-predio",
  },
  {
    id: 4,
    title: "Ronda de Negocios",
    description: "Agendá reuniones bilaterales con empresas compradoras e inversores del sector público y privado.",
    image: "/images/expo-advantage-banner.jpg",
    link: "/ronda-negocios",
  },
  {
    id: 5,
    title: "Nuestros Pabellones Industriales",
    description: "Pabellones adaptados para la exhibición comercial, minera e industrial.",
    image: "/images/hall-banner.jpg",
    link: "/pabellones",
  },
  {
    id: 6,
    title: "Salas de Conferencias y Foros B2B",
    description: "Salones acondicionados para Rondas de Negocios, foros y capacitaciones.",
    image: "/images/meeting-room-banner.jpg",
    link: "/salas-conferencias",
  },
];

export function ExhibitorsSection() {
  return (
    <section className="w-full bg-[#FCF7EA] text-slate-900 py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12 text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-900 tracking-tight mb-3">
            <span className="text-[#5E009D] font-bold">Exponé en EXPOJUY 2026</span> @ EXPOJUY 2026
          </h2>
          <p className="text-[#6D6D6D] text-sm sm:text-base lg:text-lg max-w-4xl font-normal leading-relaxed">
            Descubrí las oportunidades de exhibición, posicionamiento e inversión en la feria más importante de la región.
          </p>
        </div>

        {/* 6 Cards Grid (3 columns x 2 rows) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {exhibitorCards.map((card) => (
            <div
              key={card.id}
              className="flex flex-col h-full rounded-tl-[80px] sm:rounded-tl-[100px] overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Image Container with rounded top-left corner */}
              <div className="relative w-full h-[220px] sm:h-[250px] overflow-hidden bg-black/5">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Solid Black Caption Container */}
              <div className="bg-black text-white p-6 flex flex-col justify-between flex-1 min-h-[190px]">
                {/* Title & Top Action Button Row */}
                <div>
                  <div className="flex flex-row items-start justify-between gap-3 mb-3">
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                      {card.title}
                    </h3>
                    <Link
                      href={card.link}
                      aria-label={`Ir a ${card.title}`}
                      className="flex-shrink-0"
                    >
                      <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#2b00ff] hover:bg-[#1e00ca] transition-colors duration-200 flex items-center justify-center rounded-xs">
                        <svg
                          aria-hidden="true"
                          className="w-3.5 h-3.5 fill-current text-[#F8BF00]"
                          viewBox="0 0 1000 1000"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M696 533C708 521 713 504 713 487 713 471 708 454 696 446L400 146C388 133 375 125 354 125 338 125 325 129 313 142 300 154 292 171 292 187 292 204 296 221 308 233L563 492 304 771C292 783 288 800 288 817 288 833 296 850 308 863 321 871 338 875 354 875 371 875 388 867 400 854L696 533Z" />
                        </svg>
                      </div>
                    </Link>
                  </div>

                  {/* Description Paragraph */}
                  <p className="text-gray-300 text-xs sm:text-sm font-normal leading-relaxed mb-5">
                    {card.description}
                  </p>
                </div>

                {/* Bottom VER MÁS Button */}
                <div className="pt-2">
                  <Link
                    href={card.link}
                    className="inline-flex items-center gap-2 bg-[#2b00ff] hover:bg-[#1e00ca] text-white font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xs transition-all duration-200"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-3 h-3 fill-current text-white"
                      viewBox="0 0 1000 1000"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M696 533C708 521 713 504 713 487 713 471 708 454 696 446L400 146C388 133 375 125 354 125 338 125 325 129 313 142 300 154 292 171 292 187 292 204 296 221 308 233L563 492 304 771C292 783 288 800 288 817 288 833 296 850 308 863 321 871 338 875 354 875 371 875 388 867 400 854L696 533Z" />
                    </svg>
                    <span>VER MÁS</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
