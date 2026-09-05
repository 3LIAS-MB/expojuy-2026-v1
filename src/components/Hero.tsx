'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Ticket, Clock, Zap, Sun, Leaf, Truck, Cpu, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

const PILARES_SLIDES = [
  {
    id: 'litio',
    number: '01',
    label: 'LITIO',
    pilarTitle: 'MINERÍA ESTRATÉGICA & LITIO',
    subtitle: 'Triángulo del Litio · JEMSE · Valor Agregado en Origen',
    desc: 'Desarrollo minero de vanguardia con los más altos estándares sustentables. Jujuy se posiciona como el hub industrial clave en la extracción de litio y producción de valor agregado.',
    company: 'JEMSE & Operadores Mineros de la Puna',
    colorClass: 'text-pilar-litio',
    bgBadge: 'bg-pilar-litio/15 text-pilar-litio border-pilar-litio/40',
    icon: Zap,
    image: '/images/llama.jpg',
  },
  {
    id: 'solar',
    number: '02',
    label: 'SOLAR',
    pilarTitle: 'ENERGÍA SOLAR & TRANSICIÓN ENERGÉTICA',
    subtitle: 'Parque Solar Cauchari · 4.000 msnm · 300+ MW Limpios',
    desc: 'La planta fotovoltaica a mayor altitud de Sudamérica inyecta energía limpia a la red interconectada nacional, liderando el cambio hacia un futuro 100% renovable.',
    company: 'Cauchari Solar Park & Energía Verde',
    colorClass: 'text-pilar-solar',
    bgBadge: 'bg-pilar-solar/15 text-pilar-solar border-pilar-solar/40',
    icon: Sun,
    image: '/images/llama.jpg',
  },
  {
    id: 'agro',
    number: '03',
    label: 'AGRO',
    pilarTitle: 'AGROINDUSTRIA & BIOENERGÍA',
    subtitle: 'Complejo Agroindustrial Ledesma · Biomasa · Frutas · Azúcar',
    desc: 'Transformación agrícola de escala global: bioetanol, papel para el mundo elaborado con caña de azúcar y generación de energía a partir de biomasa.',
    company: 'Complejo Agroindustrial Ledesma & Economías Regionales',
    colorClass: 'text-pilar-agro',
    bgBadge: 'bg-pilar-agro/15 text-pilar-agro border-pilar-agro/40',
    icon: Leaf,
    image: '/images/llama.jpg',
  },
  {
    id: 'logistica',
    number: '04',
    label: 'LOGÍSTICA',
    pilarTitle: 'EJE LOGÍSTICO & INTEGRACIÓN REGIONAL',
    subtitle: 'Zona Franca Perico · ZICOVER · Corredor Bioceánico',
    desc: 'Ubicación geoestratégica clave sobre el Corredor Bioceánico de Capricornio, conectando los puertos del Atlántico y del Pacífico para potenciar las exportaciones del NOA.',
    company: 'Zona Franca Perico & ZICOVER',
    colorClass: 'text-pilar-logistica',
    bgBadge: 'bg-pilar-logistica/15 text-pilar-logistica border-pilar-logistica/40',
    icon: Truck,
    image: '/images/llama.jpg',
  },
  {
    id: 'tech',
    number: '05',
    label: 'TECH',
    pilarTitle: 'ECONOMÍA DEL CONOCIMIENTO & TECNOLOGÍA',
    subtitle: 'Talent Hub · Startups · ClusteAR Jujuy',
    desc: 'Formación de talento joven en tecnologías emergentes, exportación de servicios de software y ecosistema emprendedor tech.',
    company: 'ClusteAR Jujuy & Polos Tecnológicos',
    colorClass: 'text-pilar-tech',
    bgBadge: 'bg-pilar-tech/15 text-pilar-tech border-pilar-tech/40',
    icon: Cpu,
    image: '/images/llama.jpg',
  },
];

export default function Hero() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  // Cuenta regresiva
  useEffect(() => {
    const target = new Date('2026-10-09T09:00:00-03:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft({
          days: String(d).padStart(2, '0'),
          hours: String(h).padStart(2, '0'),
          minutes: String(m).padStart(2, '0'),
          seconds: String(s).padStart(2, '0'),
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-slide cada 6 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % PILARES_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const slide = PILARES_SLIDES[currentSlideIndex];

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % PILARES_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? PILARES_SLIDES.length - 1 : prev - 1));
  };

  return (
    <section id="inicio" className="relative h-screen min-h-[720px] flex flex-col justify-between pt-28 pb-6 overflow-hidden">
      {/* Flechas de Navegación fijadas a los bordes laterales del viewport / monitor */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-6 lg:left-10 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full bg-brand-dark/90 backdrop-blur-md border border-white/20 text-white hover:bg-brand-violet hover:border-brand-violet hover:scale-110 transition-all shadow-2xl"
        aria-label="Pilar anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full bg-brand-dark/90 backdrop-blur-md border border-white/20 text-white hover:bg-brand-violet hover:border-brand-violet hover:scale-110 transition-all shadow-2xl"
        aria-label="Siguiente pilar"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Contenedor Principal del Hero Slider con aire suficiente */}
      <div className="max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-20 w-full relative z-10 my-auto">

        {/* Slide Activo - Altura y distribución estable para evitar saltos bruscos */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center py-2">

          {/* Columna Izquierda: Información del Pilar con min-height estático y animación suave */}
          <div key={slide.id} className="lg:col-span-7 text-center lg:text-left animate-fade-in flex flex-col justify-center min-h-[420px] sm:min-h-[440px]">

            {/* Header Tag Institucional Sin Bordes */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-4 font-heading text-xs sm:text-sm tracking-widest uppercase">
              <span className="w-2.5 h-2.5 bg-brand-aqua inline-block shrink-0"></span>
              <span className="text-brand-aqua font-bold">9 AL 12 DE OCTUBRE, 2026</span>
              <span className="text-slate-600">—</span>
              <span className="text-slate-300">CIUDAD CULTURAL · JUJUY</span>
              <span className="text-slate-600">—</span>
              <span className="text-brand-lavender font-semibold">17° EDICIÓN</span>
            </div>

            {/* Título Principal Institucional + Título del Pilar (Contenedor con altura reservada) */}
            <div className="mb-4 space-y-1.5 min-h-[100px] sm:min-h-[116px] flex flex-col justify-center">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight font-heading leading-tight text-white">
                EXPO<span className="gradient-text">JUY</span> <span className="text-slate-400 font-light text-3xl sm:text-5xl">2026</span>
              </h1>
              <h2 className={`text-lg sm:text-2xl lg:text-3xl font-extrabold font-heading tracking-wide uppercase ${slide.colorClass}`}>
                {slide.pilarTitle}
              </h2>
            </div>

            {/* Subtítulo (Altura Reservada) */}
            <div className="min-h-[28px] flex items-center justify-center lg:justify-start mb-3">
              <p className="text-xs sm:text-sm font-heading font-semibold tracking-widest text-slate-300 uppercase leading-relaxed">
                {slide.subtitle}
              </p>
            </div>

            {/* Descripción (Altura Reservada de 3 líneas) */}
            <div className="min-h-[72px] sm:min-h-[64px] flex items-center justify-center lg:justify-start mb-6">
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
                {slide.desc}
              </p>
            </div>

            {/* Tag de la Empresa / Entidad del Pilar */}
            <div className="min-h-[42px] flex items-center justify-center lg:justify-start mb-6">
              <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-heading font-semibold text-slate-200 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                <CheckCircle2 className={`w-4 h-4 ${slide.colorClass}`} />
                <span>{slide.company}</span>
              </div>
            </div>

            {/* Botones de Acción (CTAs Rectangulares) */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
              <a
                href="#acreditacion"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-sm font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-brand-violet hover:bg-violet-700 hover:shadow-glow-violet transition-all"
              >
                <Ticket className="w-4.5 h-4.5" />
                Comprar Entradas
              </a>
              <a
                href="#agenda"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-sm font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-300 hover:text-brand-aqua transition-all group"
              >
                <span>Ver Programa</span>

              </a>
            </div>
          </div>

          {/* Columna Derecha: Tarjeta Vertical de la Llama estilo Foto/Poster */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative transform -rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="relative w-[230px] sm:w-[260px] lg:w-[280px] h-[390px] sm:h-[450px] lg:h-[480px] rounded-md overflow-hidden border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <Image 
                  src="/images/llama.jpg" 
                  alt="Mascota Oficial ExpoJuy 2026" 
                  fill 
                  sizes="(max-width: 768px) 230px, 280px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Navegación Inferior de los 5 Pilares (01 LITIO · 02 SOLAR · 03 AGRO · 04 LOGÍSTICA · 05 TECH) al borde inferior */}
      <div className="max-w-[1920px] mx-auto px-6 w-full relative z-10 pb-2">
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-white/10">
          {PILARES_SLIDES.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-heading transition-all ${currentSlideIndex === idx
                  ? `${item.bgBadge} border shadow-xl scale-105 font-bold`
                  : 'text-slate-400 hover:text-white glass-card border-transparent font-medium'
                }`}
            >
              <span className="text-xs font-heading opacity-75">{item.number}</span>
              <span className="text-xs tracking-wider uppercase">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
