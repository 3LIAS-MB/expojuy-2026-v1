import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Inicio"
      className="relative w-full min-h-[calc(100svh-5rem)] flex flex-col items-center justify-between overflow-hidden pt-6 pb-6 sm:pb-8 px-4"
    >
      {/* 1. Imagen aérea de fondo con gradientes de oscurecimiento suave */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-expojuy.webp"
          alt="Predio ferial ExpoJuy"
          fill
          priority
          className="object-cover object-center scale-105 transition-transform duration-1000"
        />
        {/* Capa de contraste y viñeta radial */}
        <div className="absolute inset-0 bg-slate-950/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070D1E] via-slate-950/30 to-[#070D1E]/80" />
      </div>

      {/* 2. Contenido central del Hero */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl w-full text-center my-auto pt-2 sm:pt-4">
        
        {/* Logo flotante sin marco */}
        <div className="mb-4 sm:mb-6 w-full flex justify-center">
          <Image
            src="/images/expojuy26_white.png"
            alt="ExpoJuy 2026 - Conectando Países, Creando Oportunidades"
            width={640}
            height={440}
            priority
            className="w-full max-w-[290px] sm:max-w-[440px] md:max-w-[560px] h-auto object-contain drop-shadow-[0_16px_36px_rgba(0,0,0,0.95)]"
          />
        </div>

        {/* Coordenadas clave: Fecha y Lugar */}
        <div className="mb-6 sm:mb-8 px-2">
          <p className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2.5 text-xs sm:text-sm md:text-base font-bold tracking-widest uppercase text-slate-200 drop-shadow-md">
            <span>CIUDAD CULTURAL · SAN SALVADOR DE JUJUY</span>
            <span className="hidden sm:inline text-slate-400 font-normal">·</span>
            <span className="text-cyan-400 font-extrabold tracking-widest">9 AL 12 DE OCTUBRE, 2026</span>
          </p>
        </div>

        {/* Botones cuadrados y simples estilo Confab */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
          {/* Botón 1: Primario hacia /entradas */}
          <Link
            href="/entradas"
            className="w-full sm:w-auto px-8 py-3.5 rounded-none font-bold text-sm md:text-base uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-md text-center"
          >
            Comprar Entradas
          </Link>

          {/* Botón 2: Secundario hacia /mapa-predio */}
          <Link
            href="/mapa-predio"
            className="w-full sm:w-auto px-8 py-3.5 rounded-none font-bold text-sm md:text-base uppercase tracking-wider text-white bg-slate-900/80 hover:bg-slate-800 border-2 border-white/40 hover:border-white transition-colors text-center"
          >
            Ver Mapa del Predio
          </Link>
        </div>

      </div>

      {/* 3. Indicador de scroll inferior hacia la primera sección del Home */}
      <Link
        href="#el-evento"
        className="relative z-10 mt-auto pt-4 flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors group cursor-pointer"
        aria-label="Desplazarse a la siguiente sección"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold opacity-75 group-hover:opacity-100 group-hover:text-cyan-300 transition-colors">
          Explorar
        </span>
        <ChevronDown className="w-5 h-5 animate-bounce text-cyan-400" />
      </Link>
    </section>
  );
}
