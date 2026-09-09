"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CAROUSEL_SLIDES } from "@/data/carousel-slides";

const planes = [...CAROUSEL_SLIDES, ...CAROUSEL_SLIDES];
const wrap = (value: number, size: number) => ((value % size) + size) % size;

export function Expo3DCarousel() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const cards = useRef<Array<HTMLElement | null>>([]);
  const drive = useRef<(delta: number) => void>(() => {});
  const drag = useRef<{ id: number; x: number } | null>(null);
  const [active, setActive] = useState(0);

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
    let previousScroll = window.scrollY;
    const waves = planes.map(() => ({ y: 0, velocity: 0 }));

    const paint = (time: number) => {
      frame = 0;
      const dt = Math.min((time - (lastTime || time - 16.67)) / 1000, 0.032);
      lastTime = time;
      const oldPosition = position;
      position = media.matches ? target : position + (target - position) * (1 - Math.exp(-9 * dt));
      speed = (position - oldPosition) / Math.max(dt, 0.001);
      const index = wrap(Math.round(position), CAROUSEL_SLIDES.length);
      if (index !== previousIndex) { previousIndex = index; setActive(index); }
      let unsettled = Math.abs(target - position) > 0.001;
      const mobile = width < 650;
      cards.current.forEach((card, i) => {
        if (!card) return;
        const relative = wrap(i - position + planes.length / 2, planes.length) - planes.length / 2;
        const wave = waves[i];
        const goal = media.matches ? 0 : Math.max(-90, Math.min(90, speed * (mobile ? 8 : 14))) * Math.sin(relative * 0.65 + 0.8);
        wave.velocity += ((goal - wave.y) * 100 - wave.velocity * 18) * dt;
        wave.y += wave.velocity * dt;
        unsettled ||= Math.abs(wave.y) > 0.1 || Math.abs(wave.velocity) > 0.1;
        const x = relative * (mobile ? 140 : 225);
        const y = -relative * (mobile ? 28 : 45) + wave.y;
        const z = -relative * (mobile ? 25 : 50);
        card.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(-20deg) rotateX(2deg) rotateZ(${media.matches ? 0 : wave.y * 0.015}deg)`;
        
        const absRel = Math.abs(relative);
        const isVisible = absRel < 2.2;
        card.style.visibility = isVisible ? "visible" : "hidden";
        if (isVisible) {
          const opacity = absRel <= 1.0 ? 1 : Math.max(0, 1 - (absRel - 1.0) / 1.15);
          card.style.opacity = opacity.toFixed(3);
        } else {
          card.style.opacity = "0";
        }
        card.style.zIndex = String(Math.round(20 - relative * 2));
      });
      if (visible && unsettled) frame = requestAnimationFrame(paint);
      else lastTime = 0;
    };
    const wake = () => { if (!frame && visible) frame = requestAnimationFrame(paint); };
    drive.current = (delta) => { target += delta; wake(); };
    const wheel = (event: WheelEvent) => {
      // Vertical scrolling keeps the page moving; horizontal or Shift+wheel explores the loop.
      if (event.ctrlKey || (!event.shiftKey && Math.abs(event.deltaY) >= Math.abs(event.deltaX))) return;
      event.preventDefault();
      const units = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? element.clientHeight : 1;
      target += (Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY) * units / 380;
      wake();
    };
    const scroll = () => {
      const delta = window.scrollY - previousScroll;
      previousScroll = window.scrollY;
      if (visible && !media.matches) { target += delta / 700; wake(); }
    };
    const resize = new ResizeObserver(() => { width = element.clientWidth; wake(); });
    resize.observe(element);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) wake(); }, { threshold: 0.05 });
    observer.observe(section);
    const change = () => { waves.forEach(w => { w.y = 0; w.velocity = 0; }); wake(); };
    media.addEventListener("change", change);
    element.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("scroll", scroll, { passive: true });

    // Initial positioning
    paint(performance.now());

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect(); resize.disconnect();
      element.removeEventListener("wheel", wheel);
      window.removeEventListener("scroll", scroll);
      media.removeEventListener("change", change);
      drive.current = () => {};
    };
  }, []);

  return (
    <div ref={root} id="sectores-3d" className="expo-planes" aria-label="Sectores productivos de Jujuy">
      <header className="expo-planes-heading"><h2>Jujuy produce.<br /><span>El mundo conecta.</span></h2><p>Industria, energía, conocimiento y territorio.</p></header>
      <div ref={stage} className="expo-planes-stage" tabIndex={0} role="group" aria-label="Galería 3D. Usá las flechas del teclado o arrastrá para recorrer los sectores."
        onKeyDown={(event) => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); drive.current(event.key === "ArrowRight" ? 1 : -1); } }}
        onPointerDown={(event) => { if (event.button !== 0) return; drag.current = { id: event.pointerId, x: event.clientX }; event.currentTarget.setPointerCapture(event.pointerId); }}
        onPointerMove={(event) => { if (!drag.current || drag.current.id !== event.pointerId) return; drive.current((drag.current.x - event.clientX) / 240); drag.current.x = event.clientX; }}
        onPointerUp={(event) => { drag.current = null; if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}
        onPointerCancel={() => { drag.current = null; }} onLostPointerCapture={() => { drag.current = null; }}>
        <div className="expo-planes-space">
          {planes.map((slide, index) => (
            <figure key={`${slide.id}-${index}`} ref={(node) => { cards.current[index] = node; }} className="expo-plane" aria-hidden={index >= CAROUSEL_SLIDES.length ? true : undefined}>
              <span className="expo-plane-number">{slide.number}</span>
              <Image src={slide.image} alt={index < CAROUSEL_SLIDES.length ? slide.title : ""} fill sizes="(max-width: 650px) 240px, 340px" draggable={false} />
            </figure>
          ))}
        </div>
      </div>
      <footer className="expo-planes-footer">
        <div className="expo-planes-caption"><span>{CAROUSEL_SLIDES[active].number} / 06</span><h3>{CAROUSEL_SLIDES[active].title}</h3><p>{CAROUSEL_SLIDES[active].subtitle}</p></div>
        <div className="expo-planes-controls"><p>Scroll o arrastrá para explorar</p><button type="button" aria-label="Sector anterior" onClick={() => drive.current(-1)}><ArrowLeft size={20} /></button><button type="button" aria-label="Sector siguiente" onClick={() => drive.current(1)}><ArrowRight size={20} /></button></div>
      </footer>
    </div>
  );
}
