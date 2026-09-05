"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export function HeroBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Progress binding for Scroll Zoom Hero effect matching Motion.dev
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform values for background image zoom, blur, and content parallax
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.8, 0.3]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-black overflow-hidden select-none border-b border-gray-900"
    >
      <div className="w-full flex flex-row items-stretch h-[320px] sm:h-[360px] md:h-[400px]">
        
        {/* 1. FAR LEFT SCREEN EDGE: Vertical Decorative Strip */}
        <div className="flex-shrink-0 relative z-20 w-[75px] sm:w-[95px] md:w-[115px] h-full bg-black border-r border-gray-900/60 overflow-hidden">
          <Image
            src="/images/vertical.png"
            alt="Decoración Vertical"
            fill
            priority
            className="object-cover object-top"
          />
        </div>

        {/* 2. CENTER: Solid Black Text Container with White Dot Pattern */}
        <div className="flex-1 bg-black white-dot-pattern pl-16 sm:pl-28 md:pl-[220px] lg:pl-[300px] xl:pl-[380px] pr-6 py-8 flex flex-col justify-center items-start text-left z-10 min-w-0">
          
          <motion.div
            style={{ y: textY }}
            className="max-w-md xl:max-w-lg flex flex-col items-start text-left"
          >
            {/* Yellow Subtitle Tag */}
            <span className="text-[#F8BF00] font-extrabold text-sm sm:text-base tracking-widest uppercase mb-2">
              EXPOJUY 2026
            </span>

            {/* Main Title with bold emphasis matching Singapore EXPO */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-normal text-white leading-[1.14] tracking-tight mb-3">
              <strong className="font-extrabold block">El Mayor Centro de Exposiciones</strong>
              <span>e Industria de Jujuy</span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-gray-200 text-sm sm:text-base font-normal mb-6">
              Planificá tu participación en ExpoJuy
            </p>

            {/* VER MÁS Button (Singapore EXPO Dual-Tone Blue/Purple Button Style) */}
            <Link
              href="/plan-your-event"
              className="group inline-flex items-center gap-2.5 bg-[#2b00ff] hover:bg-[#1e00ca] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 py-3 rounded-xs shadow-lg transition-all duration-200"
            >
              {/* SVG Right Chevron Arrow */}
              <svg
                aria-hidden="true"
                className="w-3.5 h-3.5 fill-current text-white transition-transform group-hover:translate-x-1"
                viewBox="0 0 1000 1000"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M696 533C708 521 713 504 713 487 713 471 708 454 696 446L400 146C388 133 375 125 354 125 338 125 325 129 313 142 300 154 292 171 292 187 292 204 296 221 308 233L563 492 304 771C292 783 288 800 288 817 288 833 296 850 308 863 321 871 338 875 354 875 371 875 388 867 400 854L696 533Z" />
              </svg>
              <span>VER MÁS</span>
            </Link>
          </motion.div>

        </div>

        {/* 3. FAR RIGHT: High Quality Venue Image with Motion.dev Scroll Zoom Effect */}
        <div className="relative flex-1 h-full w-1/2 overflow-hidden z-0 bg-black">
          <motion.div
            style={{ scale: imageScale, opacity: imageOpacity }}
            className="w-full h-full relative origin-center transition-transform ease-out"
          >
            <Image
              src="/images/expo-hero-banner.png"
              alt="Predio ExpoJuy"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </motion.div>
          {/* Subtle Gradient Transition between black text area and image */}
          <div className="absolute inset-y-0 left-0 w-24 sm:w-32 bg-gradient-to-r from-black via-black/70 to-transparent pointer-events-none z-10" />
        </div>

      </div>
    </section>
  );
}
