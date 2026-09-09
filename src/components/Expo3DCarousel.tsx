"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CAROUSEL_SLIDES } from "@/data/carousel-slides";

const wrap = (value: number, size: number) => ((value % size) + size) % size;

export function Expo3DCarousel() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const cards = useRef<Array<HTMLElement | null>>([]);
  const drive = useRef<(delta: number) => void>(() => {});
  const drag = useRef<{ id: number; x: number } | null>(null);
  const [active, setActive] = useState(0);

  // Jump to specific slide
  const jumpToSlide = useCallback((index: number) => {
    drive.current(index - active);
  }, [active]);

  useEffect(() => {
    const element = stage.current;
    const section = root.current;
    if (!element || !section) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = element.clientWidth;
    let target = 0;
    let position = 0;
    let speed = 0;
    let frame = 0;
    let lastTime = 0;
    let visible = false;
    let previousIndex = 0;
    const total = CAROUSEL_SLIDES.length;
    const waves = CAROUSEL_SLIDES.map(() => ({ y: 0, velocity: 0 }));

    const paint = (time: number) => {
      frame = 0;
      const dt = Math.min((time - (lastTime || time - 16.67)) / 1000, 0.032);
      lastTime = time;
      const oldPosition = position;
      position = media.matches ? target : position + (target - position) * (1 - Math.exp(-9 * dt));
      speed = (position - oldPosition) / Math.max(dt, 0.001);
      const index = wrap(Math.round(position), total);
      if (index !== previousIndex) {
        previousIndex = index;
        setActive(index);
      }
      let unsettled = Math.abs(target - position) > 0.001;
      const mobile = width < 480;

      CAROUSEL_SLIDES.forEach((_, i) => {
        const card = cards.current[i];
        if (!card) return;
        const relative = wrap(i - position + total / 2, total) - total / 2;
        const absRel = Math.abs(relative);

        // Wave physics only on active nearby cards
        const wave = waves[i];
        const goal = media.matches
          ? 0
          : Math.max(-40, Math.min(40, speed * (mobile ? 10 : 18))) * Math.sin(relative * 0.85 + 0.6);
        wave.velocity += ((goal - wave.y) * 80 - wave.velocity * 16) * dt;
        wave.y += wave.velocity * dt;
        unsettled ||= Math.abs(wave.y) > 0.1 || Math.abs(wave.velocity) > 0.1;

        // ONLY 3 CARDS VISIBLE ON THE SIDE: (-1, 0, +1)
        if (absRel > 1.45) {
          card.style.opacity = "0";
          card.style.visibility = "hidden";
          card.style.pointerEvents = "none";
          return;
        }

        // 3D positioning for the 3 cards in side perspective
        const xOffset = mobile ? 80 : 115;
        const x = relative * xOffset;
        const y = -relative * (mobile ? 6 : 10) + wave.y;
        const z = 30 - absRel * (mobile ? 65 : 85);
        const rotY = -relative * (mobile ? 14 : 18);
        const rotZ = media.matches ? 0 : wave.y * 0.02;
        const scale = Math.max(0.8, 1 - absRel * 0.14);
        const opacity = Math.max(0, Math.min(1, 1.15 - absRel * 0.38));
        const zIndex = Math.round(100 - absRel * 30);

        card.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`;
        card.style.opacity = `${opacity}`;
        card.style.visibility = "visible";
        card.style.pointerEvents = "auto";
        card.style.zIndex = String(zIndex);
      });

      if (visible && unsettled) frame = requestAnimationFrame(paint);
      else lastTime = 0;
    };

    const wake = () => {
      if (!frame && visible) frame = requestAnimationFrame(paint);
    };

    drive.current = (delta) => {
      target += delta;
      wake();
    };

    const wheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 15 && Math.abs(event.deltaX) < 15) return;
      event.preventDefault();
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      target += Math.max(-1.5, Math.min(1.5, delta / 300));
      wake();
    };

    const resize = new ResizeObserver(() => {
      width = element.clientWidth;
      wake();
    });
    resize.observe(element);

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) wake();
      },
      { threshold: 0.05 }
    );
    observer.observe(section);

    element.addEventListener("wheel", wheel, { passive: false });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      element.removeEventListener("wheel", wheel);
      drive.current = () => {};
    };
  }, []);

  return (
    <div
      ref={root}
      id="sectores-3d"
      className="relative z-10 w-full max-w-7xl mx-auto py-4"
      aria-label="Sectores productivos de Jujuy"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-8 lg:gap-14">
        {/* Left Side: Placa Editorial Alabastro */}
        <div className="about-editorial-plaque relative max-w-xl p-7 sm:p-10">
          <div className="flex items-center justify-between border-b border-[#e5e9f4] pb-4 mb-5">
            <div className="flex items-center gap-3">
              <span className="about-editorial-tag">EXP · 03</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4b5275]">
                Cuatro Mundos, Una Misma Visión
              </span>
            </div>
            <span className="font-mono text-xs font-bold text-[#820CD0]">
              {CAROUSEL_SLIDES[active].number} / 06
            </span>
          </div>

          <h2 className="text-[clamp(2rem,3.2vw,3.4rem)] font-extrabold leading-[0.96] tracking-[-0.04em] text-[#0e122b]">
            Una feria para producir,{" "}
            <span className="text-[#820CD0]">intercambiar</span>{" "}
            <span className="font-light text-[#25C0D4]">y proyectar.</span>
          </h2>

          <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-[#1a2038]">
            La programación combina muestra comercial e institucional, conferencias de alto nivel y espacios para construir relaciones de negocio duraderas.
          </p>

          {/* Ficha dinámica del sector activo */}
          <div className="mt-5 rounded-xl border border-[#dfe3ef] bg-white/90 p-4 shadow-xs transition-all duration-300">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#820CD0]">
                {CAROUSEL_SLIDES[active].category}
              </span>
              <span className="size-2 rounded-full bg-[#25C0D4]" />
            </div>
            <h3 className="text-base font-bold text-[#0e122b]">
              {CAROUSEL_SLIDES[active].title}
            </h3>
            <p className="mt-1 text-xs text-[#4b5275] leading-relaxed">
              {CAROUSEL_SLIDES[active].subtitle}
            </p>
          </div>

          {/* Controles de navegación */}
          <div className="mt-6 flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Sector anterior"
                onClick={() => drive.current(-1)}
                className="size-9 rounded-full border border-[#dfe3ef] bg-white text-[#0e122b] hover:bg-[#820CD0] hover:text-white hover:border-[#820CD0] transition-colors grid place-items-center cursor-pointer shadow-xs"
              >
                <ArrowLeft size={16} />
              </button>

              <div className="flex items-center gap-1 px-1">
                {CAROUSEL_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => jumpToSlide(idx)}
                    className={`font-mono text-[10px] font-bold px-2 py-1 rounded-[4px] transition-all cursor-pointer ${
                      active === idx
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
                aria-label="Sector siguiente"
                onClick={() => drive.current(1)}
                className="size-9 rounded-full border border-[#dfe3ef] bg-white text-[#0e122b] hover:bg-[#820CD0] hover:text-white hover:border-[#820CD0] transition-colors grid place-items-center cursor-pointer shadow-xs"
              >
                <ArrowRight size={16} />
              </button>
            </div>

            <span className="hidden sm:block font-mono text-[10px] font-bold uppercase tracking-wider text-[#6a7294]">
              Deslizá para explorar ↔
            </span>
          </div>
        </div>

        {/* Right Side ("En un costado"): Escenario 3D con 3 tarjetas */}
        <div className="relative flex items-center justify-center w-full">
          <div
            ref={stage}
            tabIndex={0}
            role="region"
            aria-label="Galería 3D interactiva de 3 sectores. Usá las flechas o arrastrá."
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                e.preventDefault();
                drive.current(e.key === "ArrowRight" ? 1 : -1);
              }
            }}
            onPointerDown={(e) => {
              if (e.button !== 0) return;
              drag.current = { id: e.pointerId, x: e.clientX };
              e.currentTarget.setPointerCapture(e.pointerId);
            }}
            onPointerMove={(e) => {
              if (!drag.current || drag.current.id !== e.pointerId) return;
              drive.current((drag.current.x - e.clientX) / 180);
              drag.current.x = e.clientX;
            }}
            onPointerUp={(e) => {
              drag.current = null;
              try {
                e.currentTarget.releasePointerCapture(e.pointerId);
              } catch {}
            }}
            onPointerCancel={() => {
              drag.current = null;
            }}
            className="relative h-[340px] sm:h-[390px] lg:h-[420px] w-full max-w-[420px] flex items-center justify-center overflow-visible select-none touch-pan-y cursor-grab active:cursor-grabbing outline-none"
            style={{
              perspective: "1100px",
              perspectiveOrigin: "50% 50%",
            }}
          >
            <div
              className="relative w-full h-full flex items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              {CAROUSEL_SLIDES.map((slide, index) => (
                <div
                  key={slide.id}
                  ref={(node) => {
                    cards.current[index] = node;
                  }}
                  onClick={() => {
                    if (index !== active) {
                      drive.current(index > active ? 1 : -1);
                    }
                  }}
                  className="absolute w-[200px] sm:w-[225px] h-[270px] sm:h-[305px] will-change-transform cursor-pointer transition-shadow duration-300"
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div className="relative w-full h-full overflow-hidden rounded-xl border border-[#dfe3ef] bg-white shadow-[0_20px_40px_-10px_rgba(14,18,43,0.16)] group hover:border-[#820CD0] transition-colors">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      sizes="(max-width: 640px) 200px, 240px"
                      draggable={false}
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />

                    {/* Gradient overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e122b]/90 via-[#0e122b]/20 to-transparent pointer-events-none" />

                    {/* Monospace Badge */}
                    <div className="absolute top-3 left-3 z-10 font-mono text-[10px] font-extrabold tracking-wider text-[#820CD0] bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-[4px] border border-[#e5e9f4] shadow-xs">
                      {slide.number}
                    </div>

                    {/* Bottom label */}
                    <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 z-10 text-left pointer-events-none">
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#25C0D4] block mb-0.5">
                        {slide.category}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                        {slide.title}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
