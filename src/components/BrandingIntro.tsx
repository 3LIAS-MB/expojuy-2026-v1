'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ExpoJuyLogo from './ExpoJuyLogo';

interface BrandingIntroProps {
  isPlaying: boolean;
  onAnimationComplete: () => void;
}

export default function BrandingIntro({ isPlaying, onAnimationComplete }: BrandingIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const trailPathRef = useRef<SVGPathElement>(null);
  const skipBtnRef = useRef<HTMLButtonElement>(null);

  const [isDissolving, setIsDissolving] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!isPlaying) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const container = containerRef.current;
    const curtain = curtainRef.current;
    const logo = logoRef.current;
    const wordmark = wordmarkRef.current;
    const trailPath = trailPathRef.current;
    const skipBtn = skipBtnRef.current;

    if (!container || !curtain || !logo || !wordmark || !trailPath) return;

    // Reset initial states
    setIsDissolving(false);
    gsap.set(curtain, { opacity: 1 });
    gsap.set(trailPath, { opacity: 0, attr: { d: '' } });
    gsap.set(wordmark, { opacity: 0, y: 14 });
    gsap.set(logo, { opacity: 1, scale: 0.95, x: 0, y: 0, transformOrigin: 'center center' });
    if (skipBtn) gsap.set(skipBtn, { opacity: 1 });

    // Target the individual SVG pieces inside the logo
    const pieceCyan = logo.querySelector('[data-piece="cyan"]');
    const pieceViolet = logo.querySelector('[data-piece="violet"]');
    const piecePurple = logo.querySelector('[data-piece="purple"]');
    const pieceU = logo.querySelector('[data-piece="u-path"]');

    if (pieceCyan) gsap.set(pieceCyan, { x: -300, y: -180, opacity: 0 });
    if (pieceViolet) gsap.set(pieceViolet, { x: -300, y: 90, opacity: 0 });
    if (piecePurple) gsap.set(piecePurple, { x: 300, y: -120, opacity: 0 });
    if (pieceU) gsap.set(pieceU, { y: 280, opacity: 0 });

    const tl = gsap.timeline();
    timelineRef.current = tl;

    // =========================================================================
    // FASE 1: Ensamble cinemático de las 4 piezas en el centro
    // =========================================================================
    tl.addLabel('assemble', 0.2);

    if (pieceCyan) {
      tl.to(
        pieceCyan,
        { x: 0, y: 0, opacity: 1, duration: 0.75, ease: 'power3.out' },
        'assemble',
      );
    }
    if (pieceViolet) {
      tl.to(
        pieceViolet,
        { x: 0, y: 0, opacity: 1, duration: 0.75, ease: 'power3.out' },
        'assemble+=0.08',
      );
    }
    if (piecePurple) {
      tl.to(
        piecePurple,
        { x: 0, y: 0, opacity: 1, duration: 0.75, ease: 'power3.out' },
        'assemble+=0.14',
      );
    }
    if (pieceU) {
      tl.to(
        pieceU,
        { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out' },
        'assemble+=0.22',
      );
    }

    // =========================================================================
    // FASE 2: Pulso de ensamble e impacto + Revelación del Wordmark
    // =========================================================================
    tl.to(logo, { scale: 1.05, duration: 0.2, ease: 'power2.out' }, '-=0.15');
    tl.to(logo, { scale: 1.0, duration: 0.25, ease: 'power2.inOut' });

    tl.to(
      wordmark,
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
      '<',
    );

    // =========================================================================
    // FASE 3: Contemplación breve y ocultamiento de texto previo al despegue
    // =========================================================================
    tl.to({}, { duration: 0.5 }); // Pausa de contemplación de marca
    tl.to(wordmark, { opacity: 0, y: -10, duration: 0.25, ease: 'power2.in' });

    // =========================================================================
    // FASE 4: Vuelo curvo Bézier hacia el logo del Navbar
    // =========================================================================
    let sx = 0, sy = 0, tx = 0, ty = 0, dx = 0, dy = 0, cx = 0, cy = 0, finalScale = 0.2;

    tl.add(() => {
      const source = logo.getBoundingClientRect();
      const targetEl =
        document.querySelector('#navbar-logo-target svg') ||
        document.querySelector('#navbar-logo-target');
      const target = targetEl?.getBoundingClientRect();

      if (source && target && target.width > 0) {
        sx = source.left + source.width / 2;
        sy = source.top + source.height / 2;
        tx = target.left + target.width / 2;
        ty = target.top + target.height / 2;
        dx = tx - sx;
        dy = ty - sy;
        // Curvatura de control Bézier para un arco fluido y elegante
        cx = dx * 0.14;
        cy = dy * 0.88;
        finalScale = Math.min(target.width / source.width, target.height / source.height);
        gsap.set(trailPath, { opacity: 0.85 });
      }
    });

    const flightProgress = { p: 0 };
    tl.to(flightProgress, {
      p: 1,
      duration: 1.25,
      ease: 'power3.inOut',
      onUpdate: () => {
        const p = flightProgress.p;
        // Ecuación cuadrática Bézier: B(p) = 2*(1-p)*p*C + p^2*D
        const currX = 2 * (1 - p) * p * cx + p * p * dx;
        const currY = 2 * (1 - p) * p * cy + p * p * dy;
        const currScale = gsap.utils.interpolate(1, finalScale, p);

        logo.style.transform = `translate3d(${currX}px, ${currY}px, 0) scale(${currScale})`;

        if (trailPath) {
          const headX = sx + currX;
          const headY = sy + currY;
          const ctrlX = sx + p * cx;
          const ctrlY = sy + p * cy;
          trailPath.setAttribute('d', `M ${sx} ${sy} Q ${ctrlX} ${ctrlY} ${headX} ${headY}`);
        }
      },
    });

    // =========================================================================
    // FASE 5: Docking, liberación de scroll y disolución cinemática del telón
    // =========================================================================
    tl.add(() => {
      document.body.style.overflow = previousOverflow;
      setIsDissolving(true);
    }, '-=0.15');

    tl.to(trailPath, { opacity: 0, duration: 0.35, ease: 'power2.out' }, '-=0.15');
    tl.to(logo, { opacity: 0, duration: 0.35, ease: 'power2.out' }, '<');
    if (skipBtn) {
      tl.to(skipBtn, { opacity: 0, duration: 0.2 }, '<');
    }

    tl.to(
      curtain,
      {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => {
          onAnimationComplete();
        },
      },
      '<',
    );

    return () => {
      tl.kill();
      document.body.style.overflow = previousOverflow;
    };
  }, [isPlaying, onAnimationComplete]);

  const handleSkip = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    document.body.style.overflow = '';
    setIsDissolving(true);

    if (curtainRef.current) {
      gsap.to(curtainRef.current, {
        opacity: 0,
        duration: 0.35,
        ease: 'power2.out',
        onComplete: () => {
          onAnimationComplete();
        },
      });
    } else {
      onAnimationComplete();
    }
  };

  if (!isPlaying) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden transition-opacity duration-300 ${
        isDissolving ? 'pointer-events-none' : ''
      }`}
      aria-label="Presentación de marca ExpoJuy 2026"
    >
      {/* Telón oscuro cinemático */}
      <div
        ref={curtainRef}
        className="absolute inset-0 bg-[#05080d]"
      />

      {/* Estela luminosa curva SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="intro-trail" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#25c0d4" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#774ff0" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          ref={trailPathRef}
          d=""
          fill="none"
          stroke="url(#intro-trail)"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ opacity: 0 }}
        />
      </svg>

      {/* Contenedor central del logo y armado de piezas */}
      <div className="relative flex flex-col items-center justify-center">
        <div
          ref={logoRef}
          className="relative h-[min(48svh,390px)] aspect-[688/959] will-change-transform"
          style={{ transformOrigin: 'center center' }}
        >
          <ExpoJuyLogo
            assemble
            className="w-full h-full drop-shadow-[0_0_28px_rgba(119,79,240,0.35)]"
          />
        </div>

        {/* Tipografía que aparece cuando las piezas se ensamblan */}
        <div
          ref={wordmarkRef}
          className="absolute -bottom-16 flex flex-col items-center pointer-events-none select-none text-center"
          style={{ opacity: 0, transform: 'translateY(14px)' }}
        >
          <span className="text-xl sm:text-2xl font-bold tracking-[0.22em] text-white">
            EXPOJUY<span className="text-[#BB8CFF] ml-2">2026</span>
          </span>
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-neutral-400 mt-1">
            Jujuy · Argentina
          </span>
        </div>
      </div>

      {/* Botón para saltar intro */}
      {!isDissolving && (
        <button
          ref={skipBtnRef}
          type="button"
          onClick={handleSkip}
          className="absolute bottom-6 sm:bottom-8 z-[10000] px-4 py-2 text-[11px] font-mono uppercase tracking-widest text-neutral-300 hover:text-white border border-neutral-700 hover:border-neutral-400 bg-black/70 backdrop-blur-md transition-all rounded-xs focus:outline-none cursor-pointer"
        >
          Saltar intro →
        </button>
      )}
    </div>
  );
}
