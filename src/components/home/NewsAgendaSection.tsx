"use client";

import Image from "next/image";
import Link from "next/link";

export function NewsAgendaSection() {
  return (
    <section className="relative w-full bg-[#EBEBEB] tilted-grid-pattern text-slate-900 py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Header Heading */}
        <div className="mb-8 sm:mb-10 text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-900 tracking-tight mb-3">
            <span className="text-[#5E009D] font-bold">Novedades y Agenda</span> @ EXPOJUY 2026
          </h2>
          <p className="text-[#6D6D6D] text-sm sm:text-base lg:text-lg max-w-4xl font-normal leading-relaxed">
            Desde ferias industriales y rondas de negocios hasta conferencias y exposiciones, aquí se impulsa el desarrollo productivo del Norte Argentino.
          </p>
        </div>

        {/* 2 Feature Cards Grid (stretch items to align baseline) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* CARD 1: Eventos y Conferencias */}
          <div className="flex flex-col h-full justify-between group cursor-pointer">
            <div>
              {/* Image Container with rounded top-left corner */}
              <div className="relative w-full h-[250px] sm:h-[300px] lg:h-[340px] overflow-hidden rounded-tl-[80px] sm:rounded-tl-[100px] mb-5 bg-black/5 shadow-xs">
                <Image
                  src="/images/evento.jpg"
                  alt="Eventos y Conferencias EXPOJUY"
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Bottom text and arrow button row (aligned height) */}
            <div className="flex flex-row items-end justify-between gap-4 pt-1 min-h-[95px] sm:min-h-[105px]">
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 tracking-tight">
                  Eventos y Conferencias
                </h3>
                <p className="text-[#666666] text-xs sm:text-sm lg:text-base font-normal leading-snug">
                  ¡Sé parte del mayor encuentro productivo de la región!
                </p>
                <p className="text-[#666666] text-xs sm:text-sm lg:text-base font-normal leading-snug">
                  Explorá el programa oficial de actividades y foros.
                </p>
              </div>

              {/* arr-blue Action Arrow Button */}
              <Link
                href="/actividades"
                aria-label="Ver Eventos y Conferencias"
                className="flex-shrink-0 mb-1"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#2b00ff] hover:bg-[#1e00ca] transition-colors duration-200 flex items-center justify-center rounded-xs shadow-md">
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 fill-current text-[#F8BF00]"
                    viewBox="0 0 1000 1000"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M696 533C708 521 713 504 713 487 713 471 708 454 696 446L400 146C388 133 375 125 354 125 338 125 325 129 313 142 300 154 292 171 292 187 292 204 296 221 308 233L563 492 304 771C292 783 288 800 288 817 288 833 296 850 308 863 321 871 338 875 354 875 371 875 388 867 400 854L696 533Z" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>

          {/* CARD 2: Gastronomía y Networking */}
          <div className="flex flex-col h-full justify-between group cursor-pointer">
            <div>
              {/* Image Container with rounded top-left corner */}
              <div className="relative w-full h-[250px] sm:h-[300px] lg:h-[340px] overflow-hidden rounded-tl-[80px] sm:rounded-tl-[100px] mb-5 bg-black/5 shadow-xs">
                <Image
                  src="/images/gastronomia-networking.png"
                  alt="Gastronomía y Networking EXPOJUY"
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Bottom text and arrow button row (aligned height) */}
            <div className="flex flex-row items-end justify-between gap-4 pt-1 min-h-[95px] sm:min-h-[105px]">
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 tracking-tight">
                  Gastronomía y Networking
                </h3>
                <p className="text-[#666666] text-xs sm:text-sm lg:text-base font-normal leading-relaxed">
                  Disfrutá del patio gastronómico regional y los espacios de networking empresarial.
                </p>
              </div>

              {/* arr-blue Action Arrow Button */}
              <Link
                href="/gastronomia-networking"
                aria-label="Ver Gastronomía y Networking"
                className="flex-shrink-0 mb-1"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#2b00ff] hover:bg-[#1e00ca] transition-colors duration-200 flex items-center justify-center rounded-xs shadow-md">
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 fill-current text-[#F8BF00]"
                    viewBox="0 0 1000 1000"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M696 533C708 521 713 504 713 487 713 471 708 454 696 446L400 146C388 133 375 125 354 125 338 125 325 129 313 142 300 154 292 171 292 187 292 204 296 221 308 233L563 492 304 771C292 783 288 800 288 817 288 833 296 850 308 863 321 871 338 875 354 875 371 875 388 867 400 854L696 533Z" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
