"use client";

import Image from "next/image";
import Link from "next/link";

const recentNewsItems = [
  {
    id: 1,
    category: "Servicios Basados en Conocimiento",
    date: "2 Sep 2026",
    title: "Jujuy impulsa la Economía del Conocimiento y el Parque Tecnológico",
    excerpt: "La Provincia promueve incentivos para empresas de software, biotecnología y servicios tecnológicos en el Parque Industrial...",
    link: "/noticias/economia-del-conocimiento",
  },
  {
    id: 2,
    category: "Minería & Sostenibilidad",
    date: "1 Sep 2026",
    title: "Proyectos de Litio presentan sus estándares de desarrollo sostenible",
    excerpt: "Empresas mineras en el Salar de Olaroz y Cauchari comparten sus innovaciones de producción ambientalmente responsable y huella neutra...",
    link: "/noticias/proyectos-de-litio-sostenible",
  },
  {
    id: 3,
    category: "Integración Bioceánica",
    date: "30 Ago 2026",
    title: "ZICOVER: Cumbres de integración comercial y logística internacional",
    excerpt: "Representantes del Corredor Bioceánico debatirán sobre infraestructura, transporte y comercio transfronterizo en la región...",
    link: "/noticias/zicover-cumbre-bioceanica",
  },
];

export function RecentNewsSection() {
  return (
    <section className="w-full bg-white text-slate-900 py-16 sm:py-20 border-t-2 border-b-2 border-[#5E009D] my-8">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Asymmetric 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT COLUMN: Recent News List (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Left Heading with Golden Yellow underline */}
            <div className="mb-6">
              <h2 className="inline-block text-3xl sm:text-[34px] font-extrabold text-[#5E009D] tracking-tight border-b-3 border-[#F8BF00] pb-1.5">
                Noticias Recientes
              </h2>
            </div>

            {/* List of 3 Recent News Items */}
            <div className="flex flex-col space-y-6">
              {recentNewsItems.map((item) => (
                <div key={item.id} className="flex flex-col group cursor-pointer">
                  {/* Topline Category & Date */}
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider mb-1.5">
                    <span className="text-[#5E009D]">{item.category}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 font-medium">{item.date}</span>
                  </div>

                  {/* News Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug group-hover:text-[#5E009D] transition-colors duration-200 mb-1.5">
                    <Link href={item.link}>{item.title}</Link>
                  </h3>

                  {/* News Excerpt */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {item.excerpt}
                  </p>

                  {/* Divider line */}
                  <div className="border-b border-slate-200" />
                </div>
              ))}
            </div>

            {/* "Todas las Noticias" Two-Tone Button with Yellow Arrow */}
            <div className="pt-2">
              <Link
                href="/noticias"
                className="group inline-flex items-center justify-center gap-2.5 bg-[#2b00ff] hover:bg-[#1e00ca] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded-xs shadow-md transition-all duration-200"
              >
                <span>Todas las Noticias</span>
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 fill-current text-[#F8BF00] transition-transform group-hover:translate-x-1"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm-28.9 143.6l-22.6 22.6c-4.7 4.7-4.7 12.3 0 17l65.4 65.4-65.4 65.4c-4.7 4.7-4.7 12.3 0 17l22.6 22.6c4.7 4.7 12.3 4.7 17 0l96.5-96.5c4.7-4.7 4.7-12.3 0-17l-96.5-96.5c-4.7-4.7-12.3-4.7-17 0z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Featured Main News Card (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col group cursor-pointer">
            {/* Featured Article Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-slate-900 leading-[1.18] tracking-tight mb-5 group-hover:text-[#5E009D] transition-colors duration-200">
              <Link href="/noticias/foro-norte-grande">
                Foro de Integración Regional del Norte Grande en EXPOJUY 2026
              </Link>
            </h2>

            {/* Featured Main Image with curved top-left corner */}
            <div className="relative w-full h-[280px] sm:h-[360px] lg:h-[400px] overflow-hidden rounded-tl-[80px] sm:rounded-tl-[100px] mb-5 bg-slate-100 shadow-sm">
              <Image
                src="/images/sector_tics.png"
                alt="Foro de Integración Regional del Norte Grande"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Category and Date Topline */}
            <div className="flex items-center gap-3 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">
              <span className="text-[#5E009D]">Transformación Industrial</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 font-medium">18 Aug 2026</span>
            </div>

            {/* Featured Excerpt Paragraph */}
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-4">
              Las diez provincias del Norte Grande se reúnen en San Salvador de Jujuy para fortalecer las cadenas de valor industrial, comercial y tecnológica de la región.
            </p>

            {/* Divider line */}
            <div className="border-b border-slate-200" />
          </div>

        </div>
      </div>
    </section>
  );
}
