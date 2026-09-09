'use client';

import { motion } from 'framer-motion';

interface ExpoJuyLogoProps {
  className?: string;
  assemble?: boolean;
}

export default function ExpoJuyLogo({ className = 'w-10 h-14', assemble = false }: ExpoJuyLogoProps) {
  if (!assemble) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 688 959"
        fill="none"
        role="img"
        aria-label="Isologotipo ExpoJuy 2026"
        className={className}
      >
        {/* Forma superior izquierda: Cian/Turquesa */}
        <rect x="2" y="0" width="338" height="203" fill="#25C0D4" />

        {/* Forma central izquierda: Violeta intenso */}
        <rect x="2" y="300" width="338" height="202" fill="#820CD0" />

        {/* Forma vertical derecha: Púrpura */}
        <rect x="485" y="0" width="203" height="502" fill="#774FF0" />

        {/* U inferior: Lila */}
        <path
          fill="#BB8CFF"
          fillRule="evenodd"
          d="
            M 0 595
            H 688
            V 613
            C 688 930, 437 959, 344 959
            C 251 959, 0 930, 0 613
            V 595
            Z

            M 203 595
            H 485
            C 485 766, 377 779, 344 779
            C 311 779, 203 766, 203 595
            Z
          "
        />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 688 959"
      fill="none"
      role="img"
      aria-label="Isologotipo ExpoJuy 2026"
      className={className}
    >
      {/* Forma superior izquierda: Cian/Turquesa - Entra desde arriba a la izquierda */}
      <motion.rect
        x="2"
        y="0"
        width="338"
        height="203"
        fill="#25C0D4"
        initial={{ x: -300, y: -180, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Forma central izquierda: Violeta intenso - Entra desde la izquierda */}
      <motion.rect
        x="2"
        y="300"
        width="338"
        height="202"
        fill="#820CD0"
        initial={{ x: -300, y: 90, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Forma vertical derecha: Púrpura - Entra desde arriba a la derecha */}
      <motion.rect
        x="485"
        y="0"
        width="203"
        height="502"
        fill="#774FF0"
        initial={{ x: 300, y: -120, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.75, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* U inferior: Lila - Entra desde abajo */}
      <motion.path
        fill="#BB8CFF"
        fillRule="evenodd"
        d="
          M 0 595
          H 688
          V 613
          C 688 930, 437 959, 344 959
          C 251 959, 0 930, 0 613
          V 595
          Z

          M 203 595
          H 485
          C 485 766, 377 779, 344 779
          C 311 779, 203 766, 203 595
          Z
        "
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}
