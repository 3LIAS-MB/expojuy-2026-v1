"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// Dynamically import LeafletMap client-side only (no SSR window undefined errors)
const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-slate-600">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-[#2b00ff] border-t-[#5E009D] rounded-full animate-spin" />
        <span className="text-xs sm:text-sm font-bold tracking-wider text-slate-600">Cargando Mapa de EXPOJUY...</span>
      </div>
    </div>
  ),
});

export function LocationMapSection() {
  const [mapTileMode, setMapTileMode] = useState<"google" | "dark" | "satellite">("google");

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.15, once: false });

  // SCROLL ZOOM ANIMATION BINDINGS
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // Smooth scroll scale zoom: 0.88 -> 1.0
  const mapScale = useTransform(scrollYProgress, [0, 1], [0.88, 1.0]);
  // Border radius transition: 24px -> 8px
  const mapBorderRadius = useTransform(scrollYProgress, [0, 1], ["24px", "8px"]);
  // Opacity fade: 0.5 -> 1.0
  const mapOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 1.0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#EBEBEB] tilted-grid-pattern text-slate-900 py-16 sm:py-20 lg:py-24 overflow-hidden select-none"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Section Header matching site design system */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 sm:mb-10 text-left flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-900 tracking-tight mb-3">
              <span className="text-[#5E009D] font-bold">Ubicación del Predio</span> @ EXPOJUY 2026
            </h2>
            <p className="text-[#6D6D6D] text-sm sm:text-base lg:text-lg max-w-3xl font-normal leading-relaxed">
              Descubrí la ubicación estratégica del predio ferial en la Ciudad Cultural de San Salvador de Jujuy.
            </p>
          </div>

          {/* Minimalist Map Mode Selector */}
          <div className="flex items-center gap-2 bg-white p-1 rounded-md border border-gray-300 shadow-xs flex-shrink-0 self-start md:self-auto">
            <button
              onClick={() => setMapTileMode("google")}
              className={`px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider rounded-xs transition-all duration-200 ${
                mapTileMode === "google"
                  ? "bg-[#2b00ff] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-gray-100"
              }`}
            >
              Google Maps
            </button>
            <button
              onClick={() => setMapTileMode("dark")}
              className={`px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider rounded-xs transition-all duration-200 ${
                mapTileMode === "dark"
                  ? "bg-[#5E009D] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-gray-100"
              }`}
            >
              Modo Oscuro
            </button>
            <button
              onClick={() => setMapTileMode("satellite")}
              className={`px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider rounded-xs transition-all duration-200 ${
                mapTileMode === "satellite"
                  ? "bg-[#2b00ff] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-gray-100"
              }`}
            >
              Satélite
            </button>
          </div>
        </motion.div>

        {/* MAP CONTAINER WITH SCROLL ZOOM EFFECT */}
        <motion.div
          style={{
            scale: mapScale,
            borderRadius: mapBorderRadius,
            opacity: mapOpacity,
          }}
          className="relative w-full h-[460px] sm:h-[520px] lg:h-[580px] shadow-lg overflow-hidden border border-gray-300 transition-all duration-300"
        >
          {/* Leaflet Map Client Component */}
          <LeafletMap mapTileMode={mapTileMode} />

          {/* Minimalist Location Info Pill */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-sm border border-gray-200 shadow-xl max-w-xs text-left">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#5E009D]" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#5E009D]">
                EXPOJUY 2026
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
              ExpoJuy 2026 - Ciudad Cultural
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mb-4 leading-snug">
              Alto Padilla, San Salvador de Jujuy
            </p>
            <a
              href="https://www.google.com/maps?q=-24.1673,-65.3134"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#2b00ff] hover:bg-[#1e00ca] text-white font-extrabold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xs transition-colors duration-200 shadow-xs"
            >
              <svg className="w-3.5 h-3.5 fill-current text-[#F8BF00]" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span>CÓMO LLEGAR</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
