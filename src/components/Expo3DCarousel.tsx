"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CAROUSEL_SLIDES, type CarouselSlide } from "@/data/carousel-slides";

gsap.registerPlugin(ScrollTrigger);

export function Expo3DCarousel() {
  const containerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  
  // Animation state stored in refs to avoid React re-renders in RAF loop
  const targetProgress = useRef<number>(0);
  const smoothProgress = useRef<number>(0);
  const rawVelocity = useRef<number>(0);
  const smoothVelocity = useRef<number>(0);
  const lastScrollY = useRef<number>(0);
  const prefersReducedMotion = useRef<boolean>(false);
  const isMobileRef = useRef<boolean>(false);
  const animationFrameId = useRef<number | null>(null);

  // Current active slide index for UI display
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  useEffect(() => {
    // Check reduced motion preference
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Check screen size
    const updateSize = () => {
      isMobileRef.current = window.innerWidth < 768;
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    lastScrollY.current = window.scrollY;

    const container = containerRef.current;
    if (!container) return;

    // ScrollTrigger to drive carouselProgress from 0 to 1 over the 380vh scroll height
    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: false, // We handle smooth interpolation directly in RAF for fluid wave physics
      onUpdate: (self) => {
        targetProgress.current = self.progress;

        // Calculate frame scroll velocity
        const currentY = window.scrollY;
        const deltaY = currentY - lastScrollY.current;
        lastScrollY.current = currentY;

        // Combine ScrollTrigger velocity and raw delta for maximum responsiveness
        const triggerVel = self.getVelocity ? self.getVelocity() * 0.04 : 0;
        const vel = Math.abs(triggerVel) > Math.abs(deltaY) ? triggerVel : deltaY;
        rawVelocity.current = Math.max(-80, Math.min(80, vel));
      },
    });

    // Initial Entrance Animation with GSAP (Staggered 3D fly-in)
    const validCards = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (validCards.length > 0) {
      gsap.fromTo(
        validCards,
        {
          opacity: 0,
          scale: 0.85,
          z: -500,
        },
        {
          opacity: 1,
          scale: 1,
          z: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            once: true,
          },
        }
      );
    }

    // High-performance 60-120fps Animation Loop with Velocity-Linked Wave Physics
    let lastActiveIdx = -1;

    const renderLoop = () => {
      const isMobile = isMobileRef.current;
      const isReduced = prefersReducedMotion.current;

      // 1. Smooth velocity decay (returns smoothly to 0 when user stops scrolling)
      smoothVelocity.current += (rawVelocity.current - smoothVelocity.current) * 0.08;
      rawVelocity.current *= 0.88;
      if (Math.abs(rawVelocity.current) < 0.04) {
        rawVelocity.current = 0;
      }
      if (Math.abs(smoothVelocity.current) < 0.01) {
        smoothVelocity.current = 0;
      }

      // 2. Smooth carousel progress interpolation (lerp for fluid inertia)
      smoothProgress.current += (targetProgress.current - smoothProgress.current) * 0.082;

      // 3. Update current active slide index
      const totalSlides = CAROUSEL_SLIDES.length;
      const computedIndex = Math.min(
        totalSlides - 1,
        Math.max(0, Math.round(smoothProgress.current * (totalSlides - 1)))
      );
      if (computedIndex !== lastActiveIdx) {
        lastActiveIdx = computedIndex;
        setActiveSlideIndex(computedIndex);
      }

      // 4. Update each 3D card position along the trajectory with velocity wave
      const spread = isMobile ? 1.75 : 2.35;
      const widthMultiplier = isMobile ? 320 : 540;

      CAROUSEL_SLIDES.forEach((slide: CarouselSlide, i: number) => {
        const cardEl = cardRefs.current[i];
        if (!cardEl) return;

        // Normalized relative position: 0 when this card is at the center stage
        const normalizedIndex = i / (totalSlides - 1);
        const rel = (normalizedIndex - smoothProgress.current) * spread;

        // Base 3D spatial curve coordinates
        const x = rel * widthMultiplier;
        const y = Math.sin(rel * 1.4) * (isMobile ? 30 : 65) + slide.baseY * (isMobile ? 1.8 : 3.2);
        
        // Depth (translateZ): Peak foreground near center, stepping back into depth
        const baseZ = (260 - Math.pow(rel, 2) * (isMobile ? 180 : 320) + slide.baseZ * 0.35) * (isMobile ? 0.65 : 1.0);

        // Velocity-Linked Wave calculation
        let waveY = 0;
        let waveRotX = 0;
        let waveRotY = 0;
        let waveRotZ = 0;
        let waveZ = 0;

        if (!isReduced) {
          const wavePhase = i * 0.84 + smoothProgress.current * 5.2;
          const clampedVel = Math.max(-55, Math.min(55, smoothVelocity.current));
          const wave = Math.sin(wavePhase) * clampedVel;

          waveY = wave * 0.48;
          waveRotZ = wave * 0.036;
          waveRotY = wave * 0.026;
          waveRotX = -wave * 0.020;
          waveZ = Math.cos(wavePhase) * wave * 1.1;
        }

        const finalX = x;
        const finalY = y + waveY;
        const finalZ = baseZ + waveZ;

        // 3D Rotations with wave influence
        const finalRotX = (slide.baseRotX * (isMobile ? 0.4 : 1.0)) + waveRotX;
        const finalRotY = (slide.baseRotY * (isMobile ? 0.4 : 1.0)) + waveRotY;
        const finalRotZ = (slide.baseRotZ * (isMobile ? 0.4 : 1.0)) + waveRotZ;

        // Scale: larger in foreground, smaller as it recedes
        const scale = Math.max(0.48, Math.min(1.15, 1.02 - Math.abs(rel) * 0.20)) * (isMobile ? 0.82 : 1.0);

        // Opacity: fade out smoothly when exiting the active stage
        const opacity = Math.max(0, Math.min(1, 1.25 - Math.abs(rel) * 0.60));

        // Dynamic z-index: closer cards to camera naturally overlap cards further back
        const zIndex = Math.round(finalZ + 2000);

        // Direct DOM update without triggering React re-renders
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
      st.kill();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="sectores-3d"
      className="relative h-[380vh] bg-[#050711] text-white select-none overflow-clip"
      aria-label="Galería Tridimensional de Sectores Productivos"
    >
      {/* STICKY CAMERA VIEWPORT (Fijo a 100vh mientras se recorren los 380vh con scroll) */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-14"
      >
        {/* Subtle Background Radial Atmosphere */}
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(130,12,208,0.12),rgba(5,7,17,0.95))]" 
        />

        {/* TOP ROW: Large Editorial Typography & Negative Space (Inspired by Reference) */}
        <div className="relative z-20 flex items-start justify-between w-full max-w-[1480px] mx-auto pointer-events-none">
          {/* Big Editorial Headline */}
          <div className="flex flex-col items-start max-w-xl">
            <div className="flex items-center gap-3 mb-2.5">
              <span className="h-[2px] w-6 bg-[#820CD0]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#25C0D4]">
                SECTORES PRODUCTIVOS (06)
              </span>
            </div>
            <h2 className="text-[clamp(2.5rem,5.2vw,5.6rem)] font-extrabold leading-[0.88] tracking-[-0.065em] text-white">
              JUJUY <br />
              <span className="text-white/35 font-light">PRODUCTIVO</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm font-normal tracking-wide text-white/60 max-w-sm leading-relaxed hidden sm:block">
              Galería espacial interactiva. La velocidad del scroll modula la onda 3D de cada sector.
            </p>
          </div>

          {/* Active Sector Counter (Monospace Editorial Tag) */}
          <div className="flex flex-col items-end text-right">
            <div className="font-mono text-2xl sm:text-3xl font-extrabold tracking-tight text-[#25C0D4]">
              {CAROUSEL_SLIDES[activeSlideIndex]?.number || "01"}
              <span className="text-white/30 text-base sm:text-lg font-light"> / 06</span>
            </div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mt-1">
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
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${slide.widthClass} cursor-grab will-change-transform pointer-events-auto`}
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
              >
                {/* FLOATING EDITORIAL CARD (No generic rounded, max 3px border radius, pure photography) */}
                <div className="relative group overflow-hidden rounded-[3px] border border-white/20 bg-[#080c1e] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)] transition-colors duration-300 hover:border-white/50">
                  
                  {/* Aspect Ratio Box with Editorial Image */}
                  <div className={`relative ${slide.aspectRatio} w-full overflow-hidden bg-black`}>
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      sizes="(max-width: 768px) 300px, (max-width: 1200px) 400px, 440px"
                      priority={index < 3}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Subtle Vignette on Edges */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                    {/* Monospace Floating Index (Top-Left of Image) */}
                    <div className="absolute top-3 left-3 z-10 font-mono text-[11px] font-extrabold tracking-widest text-white/90 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-[2px] border border-white/10">
                      {slide.number}
                    </div>

                    {/* Bottom Metadata inside Card */}
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10 flex flex-col justify-end">
                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#25C0D4] mb-1">
                        {slide.category}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-snug">
                        {slide.title}
                      </h3>
                      <p className="mt-1 text-[11px] sm:text-xs text-white/70 leading-relaxed line-clamp-2">
                        {slide.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM ROW: Navigation cues & micro details */}
        <div className="relative z-20 flex items-end justify-between w-full max-w-[1480px] mx-auto pointer-events-none">
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
            EXPOJUY 2026 · CIUDAD CULTURAL
          </div>

          {/* Scroll Cue (Inspired by "SCROLL TO SURF") */}
          <div className="flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-white/80">
            <span>SCROLL TO EXPLORE</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
