"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { CAROUSEL_SLIDES, type CarouselSlide } from "@/data/carousel-slides";

export function Expo3DCarousel() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Physics & animation states in refs (no React re-renders in RAF loop)
  const targetProgress = useRef<number>(0);
  const smoothProgress = useRef<number>(0);
  const manualOffset = useRef<number>(0);
  const rawVelocity = useRef<number>(0);
  const smoothVelocity = useRef<number>(0);
  const lastScrollY = useRef<number>(0);
  const prefersReducedMotion = useRef<boolean>(false);
  const isMobileRef = useRef<boolean>(false);
  const animationFrameId = useRef<number | null>(null);

  // Drag interaction state
  const isDragging = useRef<boolean>(false);
  const dragStartX = useRef<number>(0);
  const lastPointerX = useRef<number>(0);

  // Active slide index for typography display
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  // Jump to specific slide
  const jumpToSlide = useCallback((index: number) => {
    const total = CAROUSEL_SLIDES.length;
    manualOffset.current = index / (total - 1);
    rawVelocity.current = 25; // Trigger small elastic wave on manual jump
  }, []);

  const nextSlide = useCallback(() => {
    const total = CAROUSEL_SLIDES.length;
    const nextIdx = Math.min(total - 1, activeSlideIndex + 1);
    jumpToSlide(nextIdx);
  }, [activeSlideIndex, jumpToSlide]);

  const prevSlide = useCallback(() => {
    const prevIdx = Math.max(0, activeSlideIndex - 1);
    jumpToSlide(prevIdx);
  }, [activeSlideIndex, jumpToSlide]);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updateSize = () => {
      isMobileRef.current = window.innerWidth < 768;
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    lastScrollY.current = window.scrollY;

    // Initial 3D entrance animation with GSAP
    const validCards = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (validCards.length > 0) {
      gsap.fromTo(
        validCards,
        {
          opacity: 0,
          scale: 0.85,
          z: -450,
        },
        {
          opacity: 1,
          scale: 1,
          z: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.15,
        }
      );
    }

    let lastActiveIdx = -1;

    // High-performance 60-120 FPS render loop
    const renderLoop = () => {
      const isMobile = isMobileRef.current;
      const isReduced = prefersReducedMotion.current;

      // 1. Calculate Scroll Velocity from window scroll
      const currentScrollY = window.scrollY;
      const scrollDeltaY = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;

      // If user scrolls the page vertically, inject into velocity
      if (Math.abs(scrollDeltaY) > 0.1) {
        rawVelocity.current = Math.max(-65, Math.min(65, scrollDeltaY * 1.5));
      }

      // 2. Smooth velocity decay (returns elastically to 0 when user stops scrolling/dragging)
      smoothVelocity.current += (rawVelocity.current - smoothVelocity.current) * 0.08;
      rawVelocity.current *= 0.88;
      if (Math.abs(rawVelocity.current) < 0.03) rawVelocity.current = 0;
      if (Math.abs(smoothVelocity.current) < 0.01) smoothVelocity.current = 0;

      // 3. Calculate panel position in viewport to automatically drive progress on scroll
      if (rootRef.current) {
        const rect = rootRef.current.getBoundingClientRect();
        if (isMobile) {
          // On mobile, progress as panel enters and traverses vertical viewport
          const vProgress = (window.innerHeight - rect.top) / (rect.height + window.innerHeight);
          targetProgress.current = gsap.utils.clamp(0, 1, vProgress);
        } else {
          // On desktop, progress as panel traverses horizontal screen
          const hProgress = (window.innerWidth - rect.left) / (2 * window.innerWidth);
          targetProgress.current = gsap.utils.clamp(0, 1, hProgress);
        }
      }

      // 4. Smooth carousel progress (combine scroll progress and manual drag offset)
      const combinedTarget = gsap.utils.clamp(0, 1, targetProgress.current + manualOffset.current);
      smoothProgress.current += (combinedTarget - smoothProgress.current) * 0.085;

      // 5. Update active slide index
      const totalSlides = CAROUSEL_SLIDES.length;
      const computedIndex = Math.min(
        totalSlides - 1,
        Math.max(0, Math.round(smoothProgress.current * (totalSlides - 1)))
      );
      if (computedIndex !== lastActiveIdx) {
        lastActiveIdx = computedIndex;
        setActiveSlideIndex(computedIndex);
      }

      // 6. Update 3D cards with spatial coordinates & velocity wave
      const spread = isMobile ? 1.7 : 2.3;
      const widthMultiplier = isMobile ? 320 : 520;

      CAROUSEL_SLIDES.forEach((slide: CarouselSlide, i: number) => {
        const cardEl = cardRefs.current[i];
        if (!cardEl) return;

        // Relative distance from center of attention (rel = 0 is centered in foreground)
        const normalizedIndex = i / (totalSlides - 1);
        const rel = (normalizedIndex - smoothProgress.current) * spread;

        // Base 3D spatial curve coordinates
        const x = rel * widthMultiplier;
        const y = Math.sin(rel * 1.35) * (isMobile ? 25 : 55) + slide.baseY * (isMobile ? 1.6 : 3.0);
        
        // Depth trajectory: parabolic peak near center (translateZ: +280px), stepping back into depth
        const baseZ = (260 - Math.pow(rel, 2) * (isMobile ? 160 : 300) + slide.baseZ * 0.35) * (isMobile ? 0.65 : 1.0);

        // Velocity-Linked Wave Calculation
        let waveY = 0;
        let waveRotX = 0;
        let waveRotY = 0;
        let waveRotZ = 0;
        let waveZ = 0;

        if (!isReduced) {
          const wavePhase = i * 0.84 + smoothProgress.current * 5.2;
          const clampedVel = Math.max(-50, Math.min(50, smoothVelocity.current));
          const wave = Math.sin(wavePhase) * clampedVel;

          waveY = wave * 0.44;
          waveRotZ = wave * 0.034;
          waveRotY = wave * 0.024;
          waveRotX = -wave * 0.018;
          waveZ = Math.cos(wavePhase) * wave * 1.1;
        }

        const finalX = x;
        const finalY = y + waveY;
        const finalZ = baseZ + waveZ;

        // Rotations with wave influence
        const finalRotX = (slide.baseRotX * (isMobile ? 0.4 : 1.0)) + waveRotX;
        const finalRotY = (slide.baseRotY * (isMobile ? 0.4 : 1.0)) + waveRotY;
        const finalRotZ = (slide.baseRotZ * (isMobile ? 0.4 : 1.0)) + waveRotZ;

        // Scale: larger in foreground, smaller as it recedes into the background
        const scale = Math.max(0.52, Math.min(1.15, 1.02 - Math.abs(rel) * 0.18)) * (isMobile ? 0.82 : 1.0);

        // Opacity: fade out smoothly when exiting the active stage
        const opacity = Math.max(0, Math.min(1, 1.25 - Math.abs(rel) * 0.58));

        // Dynamic z-index: closer cards naturally overlap cards behind them
        const zIndex = Math.round(finalZ + 2000);

        cardEl.style.transform = `translate3d(${finalX}px, ${finalY}px, ${finalZ}px) rotateX(${finalRotX}deg) rotateY(${finalRotY}deg) rotateZ(${finalRotZ}deg) scale(${scale})`;
        cardEl.style.opacity = `${opacity}`;
        cardEl.style.zIndex = `${zIndex}`;
        cardEl.style.visibility = opacity > 0.01 ? "visible" : "hidden";
      });

      animationFrameId.current = requestAnimationFrame(renderLoop);
    };

    animationFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("resize", updateSize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Pointer Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    lastPointerX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastPointerX.current;
    lastPointerX.current = e.clientX;

    // Modulate manual offset
    manualOffset.current = gsap.utils.clamp(
      -0.8,
      0.8,
      manualOffset.current - deltaX * 0.0018
    );

    // Feed drag velocity directly into wave physics!
    rawVelocity.current = Math.max(-60, Math.min(60, -deltaX * 1.8));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignorar si el puntero ya se liberó
    }
  };

  return (
    <div
      ref={rootRef}
      id="sectores-3d"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative h-full w-full overflow-hidden flex flex-col justify-between px-6 pt-16 pb-20 sm:px-10 lg:px-16 select-none touch-pan-y cursor-grab active:cursor-grabbing"
      aria-label="Galería Tridimensional de Sectores Productivos"
    >
      {/* TOP ROW: Large Editorial Headline & Counter */}
      <div className="relative z-30 flex items-start justify-between w-full max-w-7xl mx-auto pointer-events-none">
        {/* Curatorial Header inside alabaster plaque */}
        <div className="about-editorial-plaque relative max-w-2xl p-6 sm:p-8 pointer-events-auto">
          <div className="flex items-center gap-3 border-b border-[#e5e9f4] pb-3 mb-3">
            <span className="about-editorial-tag">
              EXP · 03
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4b5275]">
              Cuatro Mundos, Una Misma Visión
            </span>
          </div>

          <h2 className="text-[clamp(1.7rem,3.2vw,2.8rem)] font-extrabold leading-[0.95] tracking-[-0.05em] text-[#0e122b]">
            Una feria para producir,{" "}
            <span className="text-[#820CD0]">intercambiar</span>{" "}
            <span className="font-light text-[#25C0D4]">y proyectar.</span>
          </h2>
          
          <p className="mt-2.5 text-xs sm:text-sm font-medium tracking-wide text-[#1a2038] max-w-xl leading-relaxed hidden sm:block">
            Muestra comercial e institucional, conferencias de alto nivel y espacios de vinculación regional y global.
          </p>
        </div>

        {/* Live Slide Counter Plaque */}
        <div className="about-editorial-plaque hidden sm:flex flex-col items-end text-right px-6 py-4 pointer-events-auto">
          <div className="font-mono text-2xl sm:text-3xl font-extrabold tracking-tight text-[#820CD0]">
            {CAROUSEL_SLIDES[activeSlideIndex]?.number || "01"}
            <span className="text-[#6a7294] text-base sm:text-lg font-light"> / 06</span>
          </div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#4b5275] mt-1">
            {CAROUSEL_SLIDES[activeSlideIndex]?.category || "SECTOR"}
          </span>
        </div>
      </div>

      {/* 3D PERSPECTIVE SCENARIO */}
      <div
        ref={stageRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {CAROUSEL_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${slide.widthClass} will-change-transform pointer-events-auto`}
              style={{
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
            >
              {/* Floating Editorial Photo Card */}
              <div className="relative group overflow-hidden rounded-[8px] border border-[#dfe3ef] bg-white shadow-[0_24px_48px_-12px_rgba(14,18,43,0.20),0_8px_20px_-6px_rgba(14,18,43,0.10)] transition-all duration-300 hover:border-[#820CD0] hover:shadow-[0_28px_56px_-12px_rgba(130,12,208,0.28)]">
                <div className={`relative ${slide.aspectRatio} w-full overflow-hidden bg-[#e5e9f4]`}>
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="(max-width: 768px) 300px, (max-width: 1200px) 400px, 440px"
                    priority={index < 3}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* High contrast gradient at the bottom so text is razor-sharp */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e122b]/95 via-[#0e122b]/35 to-transparent pointer-events-none" />

                  {/* Monospace Floating Index Tag */}
                  <div className="absolute top-3 left-3 z-10 font-mono text-[11px] font-extrabold tracking-widest text-[#820CD0] bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-[4px] border border-[#e5e9f4] shadow-xs">
                    {slide.number}
                  </div>

                  {/* Editorial Card Bottom Details */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10 flex flex-col justify-end text-left">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#25C0D4] mb-1">
                      {slide.category}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-snug">
                      {slide.title}
                    </h3>
                    <p className="mt-1 text-[11px] sm:text-xs text-white/80 leading-relaxed line-clamp-2">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM ROW: Navigation Controls & Cues */}
      <div className="relative z-30 flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Step dots & arrows */}
        <div className="about-editorial-plaque flex items-center gap-2 px-3 py-2 pointer-events-auto">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Sector anterior"
            className="size-8 rounded-full border border-[#dfe3ef] bg-white text-[#0e122b] hover:bg-[#820CD0] hover:text-white transition-colors grid place-items-center cursor-pointer shadow-xs"
          >
            <FaChevronLeft className="size-3" />
          </button>

          <div className="flex items-center gap-1 px-1">
            {CAROUSEL_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => jumpToSlide(idx)}
                className={`font-mono text-[10px] font-bold px-2.5 py-1 rounded-[4px] transition-all cursor-pointer ${
                  activeSlideIndex === idx
                    ? "bg-[#820CD0] text-white shadow-xs"
                    : "text-[#4b5275] hover:text-[#0e122b] hover:bg-[#f1f4fb]"
                }`}
              >
                {slide.number}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Sector siguiente"
            className="size-8 rounded-full border border-[#dfe3ef] bg-white text-[#0e122b] hover:bg-[#820CD0] hover:text-white transition-colors grid place-items-center cursor-pointer shadow-xs"
          >
            <FaChevronRight className="size-3" />
          </button>
        </div>

        {/* Scroll / Drag Cue */}
        <div className="about-editorial-plaque pointer-events-none hidden sm:flex items-center gap-2.5 px-4 py-2 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#4b5275]">
          <span className="text-[#820CD0]">3D SPATIAL</span>
          <span>·</span>
          <span>ARRASTRAR / SCROLL</span>
          <span className="text-[#25C0D4]">↔</span>
        </div>
      </div>
    </div>
  );
}
