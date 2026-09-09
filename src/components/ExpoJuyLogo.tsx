'use client';

interface ExpoJuyLogoProps {
  className?: string;
  assemble?: boolean;
}

const U_PATH_D =
  "M 0 595 H 688 V 613 C 688 930, 437 959, 344 959 C 251 959, 0 930, 0 613 V 595 Z M 203 595 H 485 C 485 766, 377 779, 344 779 C 311 779, 203 766, 203 595 Z";

export default function ExpoJuyLogo({ className = 'w-10 h-14' }: ExpoJuyLogoProps) {
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
      <rect
        data-piece="cyan"
        x="2"
        y="0"
        width="338"
        height="203"
        fill="#25C0D4"
      />

      {/* Forma central izquierda: Violeta intenso */}
      <rect
        data-piece="violet"
        x="2"
        y="300"
        width="338"
        height="202"
        fill="#820CD0"
      />

      {/* Forma vertical derecha: Púrpura */}
      <rect
        data-piece="purple"
        x="485"
        y="0"
        width="203"
        height="502"
        fill="#774FF0"
      />

      {/* U inferior: Lila */}
      <path
        data-piece="u-path"
        fill="#BB8CFF"
        fillRule="evenodd"
        d={U_PATH_D}
      />
    </svg>
  );
}
