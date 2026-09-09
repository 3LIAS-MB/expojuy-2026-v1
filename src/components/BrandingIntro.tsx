'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useAnimationControls, useMotionValue, useReducedMotion } from 'framer-motion';
import ExpoJuyLogo from './ExpoJuyLogo';

interface BrandingIntroProps {
  isPlaying: boolean;
  onAnimationComplete: () => void;
}

export default function BrandingIntro({ isPlaying, onAnimationComplete }: BrandingIntroProps) {
  const logo = useAnimationControls();
  const curtain = useAnimationControls();
  const trail = useAnimationControls();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const logoRef = useRef<HTMLDivElement>(null);
  const path = useMotionValue('');
  const reduceMotion = useReducedMotion();

  const [assembleKey, setAssembleKey] = useState(0);
  const [wordmarkVisible, setWordmarkVisible] = useState(false);
  const [isDissolving, setIsDissolving] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    let cancelled = false;
    let flight: ReturnType<typeof animate> | undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    async function play() {
      x.set(0);
      y.set(0);
      path.set('');
      curtain.set({ opacity: 1 });
      trail.set({ opacity: 0 });
      setWordmarkVisible(false);
      setIsDissolving(false);
      setAssembleKey((prev) => prev + 1);

      logo.set({ opacity: 1, scale: reduceMotion ? 1 : 0.95 });

      // Fase 1: Armado de las 4 piezas en el centro
      await new Promise((r) => setTimeout(r, reduceMotion ? 150 : 750));
      if (cancelled) return;

      // Fase 2: Impacto/Glow de ensamble y revelación del texto institucional
      setWordmarkVisible(true);
      await logo.start({
        scale: reduceMotion ? 1 : [0.95, 1.04, 1],
        transition: { duration: reduceMotion ? 0.2 : 0.45, ease: 'easeOut' },
      });
      if (cancelled) return;

      // Pausa breve para contemplar el isologotipo ensamblado
      await new Promise((r) => setTimeout(r, reduceMotion ? 250 : 450));
      if (cancelled) return;

      // Ocultar texto inferior antes del despegue
      setWordmarkVisible(false);

      // Fase 3: Medición y vuelo curvo hacia el header
      const source = logoRef.current?.getBoundingClientRect();
      await logo.start({
        scale: reduceMotion ? 1 : 0.5,
        transition: { delay: reduceMotion ? 0 : 0.08, duration: reduceMotion ? 0 : 0.5, ease: [0.65, 0, 0.35, 1] },
      });
      if (cancelled) return;

      const targetEl =
        document.querySelector('#navbar-logo-target svg') ||
        document.querySelector('#navbar-logo-target');
      const target = targetEl?.getBoundingClientRect();

      if (source && target && target.width > 0 && !reduceMotion) {
        const sx = source.left + source.width / 2;
        const sy = source.top + source.height / 2;
        const tx = target.left + target.width / 2;
        const ty = target.top + target.height / 2;
        const dx = tx - sx;
        const dy = ty - sy;
        const cx = dx * 0.12;
        const cy = dy * 0.85;

        trail.set({ opacity: 0.85 });
        const finalScale = Math.min(target.width / source.width, target.height / source.height);

        flight = animate(0, 1, {
          duration: 1.2,
          ease: [0.65, 0, 0.25, 1],
          onUpdate: (p) => {
            x.set(2 * (1 - p) * p * cx + p * p * dx);
            y.set(2 * (1 - p) * p * cy + p * p * dy);
            path.set(`M ${sx} ${sy} Q ${sx + p * cx} ${sy + p * cy} ${sx + x.get()} ${sy + y.get()}`);
          },
        });

        await Promise.all([
          flight,
          logo.start({ scale: finalScale, transition: { duration: 1.2, ease: [0.65, 0, 0.25, 1] } }),
        ]);
      } else {
        await logo.start({ opacity: 0, transition: { duration: 0.15 } });
      }

      if (cancelled) return;

      // Fase 4: SUAVIZADO CINEMÁTICO (DISSOLVE / CROSSFADE)
      // Liberamos el overflow para interacción inmediata y activamos modo disolución
      document.body.style.overflow = previousOverflow;
      setIsDissolving(true);

      // Desvanecimiento suave y gradual del telón, logo y estela
      await Promise.all([
        logo.start({ opacity: 0, transition: { duration: 0.45, ease: 'easeOut' } }),
        trail.start({ opacity: 0, transition: { duration: 0.45, ease: 'easeOut' } }),
        curtain.start({
          opacity: 0,
          transition: { duration: reduceMotion ? 0.3 : 0.85, ease: [0.22, 1, 0.36, 1] },
        }),
      ]);

      if (!cancelled) onAnimationComplete();
    }

    void play();

    return () => {
      cancelled = true;
      flight?.stop();
      logo.stop();
      curtain.stop();
      trail.stop();
      document.body.style.overflow = previousOverflow;
    };
  }, [isPlaying, onAnimationComplete, reduceMotion, logo, curtain, trail, x, y, path]);

  const handleSkip = async () => {
    setIsDissolving(true);
    await curtain.start({ opacity: 0, transition: { duration: 0.4, ease: 'easeOut' } });
    onAnimationComplete();
  };

  if (!isPlaying) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden transition-opacity duration-300 ${
        isDissolving ? 'pointer-events-none' : ''
      }`}
      aria-label="Presentación de marca ExpoJuy 2026"
    >
      {/* Telón oscuro que se disuelve gradualmente hacia la web */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={curtain}
        className="absolute inset-0 bg-[#05080d]"
      />

      {/* Estela luminosa curva SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="intro-trail" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#a5b4fc" stopOpacity="0.85" />
            <stop offset="0.5" stopColor="#25c0d4" stopOpacity="0.4" />
            <stop offset="1" stopColor="#774ff0" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={path}
          fill="none"
          stroke="url(#intro-trail)"
          strokeWidth="1.75"
          initial={{ opacity: 0 }}
          animate={trail}
        />
      </svg>

      {/* Contenedor central del logo y armado de piezas */}
      <div className="relative flex flex-col items-center justify-center">
        <motion.div
          ref={logoRef}
          style={{ x, y }}
          animate={logo}
          className="relative h-[min(48svh,390px)] aspect-[688/959] will-change-transform"
        >
          <ExpoJuyLogo
            key={assembleKey}
            assemble={!reduceMotion}
            className="w-full h-full drop-shadow-[0_0_28px_rgba(119,79,240,0.3)]"
          />
        </motion.div>

        {/* Tipografía que aparece cuando las piezas se ensamblan */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: wordmarkVisible ? 1 : 0, y: wordmarkVisible ? 0 : 8 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="absolute -bottom-16 flex flex-col items-center pointer-events-none select-none text-center"
        >
          <span className="text-xl sm:text-2xl font-bold tracking-[0.22em] text-white">
            EXPOJUY<span className="text-[#BB8CFF] ml-2">2026</span>
          </span>
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-neutral-400 mt-1">
            Jujuy · Argentina
          </span>
        </motion.div>
      </div>

      {/* Botón para saltar intro */}
      {!isDissolving && (
        <button
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
