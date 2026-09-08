import Image from 'next/image';

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Inicio"
      className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden"
    >
      {/* 1. Imagen aérea de fondo con overlay para contraste */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-expojuy.webp"
          alt="Predio ferial ExpoJuy"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Capa de oscurecimiento suave para que resalte el logo flotante sin marco */}
        <div className="absolute inset-0 bg-slate-950/60" />
        <div className="absolute inset-0 bg-radial from-transparent via-slate-950/40 to-slate-950/80" />
      </div>

      {/* 2. Logo flotante sin cuadro contenedor */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-16 max-w-4xl w-full text-center">
        <Image
          src="/images/expojuy26_white.png"
          alt="ExpoJuy 2026 - Conectando Países, Creando Oportunidades"
          width={680}
          height={480}
          priority
          className="w-full max-w-[320px] sm:max-w-[480px] md:max-w-[620px] h-auto object-contain drop-shadow-[0_12px_36px_rgba(0,0,0,0.95)]"
        />
      </div>
    </section>
  );
}
