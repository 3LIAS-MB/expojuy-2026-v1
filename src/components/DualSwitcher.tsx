'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Sun, Moon, Handshake, Presentation, TrendingUp, Sparkles, Utensils, ShoppingBag, CheckCircle, Clock, Users, Music, MapPin, Heart } from 'lucide-react';

export default function DualSwitcher() {
  const [segment, setSegment] = useState<'morning' | 'evening'>('morning');
  const sectionRef = useRef<HTMLDivElement>(null);
  const [peekProgress, setPeekProgress] = useState(0);

  // Sincronización del scroll para asomar la llama paulatinamente
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // La llama comienza a subir cuando la sección entra en el viewport inferior
      const totalDist = windowHeight * 0.75;
      const distFromBottom = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, distFromBottom / totalDist));
      setPeekProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Desplazamiento vertical calculado: cuando progress=0 está oculta (+110px), al scroll sube (-150px sobre la card)
  const translateYPx = (1 - peekProgress) * 260 - 150;

  return (
    <section ref={sectionRef} id="dinamica-dual" className="min-h-screen flex flex-col justify-center pt-24 pb-16 relative bg-brand-surface/40 border-y border-white/5 overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16">
        
        {/* Título de la sección sin badge superior */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mb-4">
            La Dinámica Dual: <span className="text-brand-aqua">2 Experiencias en 1 Día</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Para maximizar la eficiencia y reducir costos operativos, ExpoJuy condensa su edición en 4 jornadas continuas estructuradas en dos segmentos diarios diferenciados.
          </p>
        </div>

        {/* Switcher Interactivo sin avatar central */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl glass-card border border-white/10 shadow-lg relative z-10 px-3 sm:px-4">
            <button
              onClick={() => setSegment('morning')}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                segment === 'morning' ? 'badge-dual-active' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-400" />
              <span>☀️ Mañanas B2B (09:00 - 14:00)</span>
            </button>
            <button
              onClick={() => setSegment('evening')}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                segment === 'evening' ? 'badge-dual-active' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Moon className="w-4 h-4 text-brand-lavender" />
              <span>🌙 Tardes y Noches (16:00 - 23:00)</span>
            </button>
          </div>
        </div>

        {/* Contenido Mañanas B2B o Noche (3 Columnas con Llama Asomándose en la 3° Card) */}
        {segment === 'morning' ? (
          <div className="grid md:grid-cols-3 gap-6 transition-all duration-300 relative">
            
            {/* Card 1 */}
            <div className="glass-card rounded-2xl p-6 border-l-4 border-l-brand-aqua hover:shadow-glow-aqua transition-all relative z-10">
              <div className="w-12 h-12 rounded-xl bg-brand-aqua/10 flex items-center justify-center text-brand-aqua mb-4">
                <Handshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-white mb-2">Rondas de Negocios Inteligentes</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Emparejamiento comercial algorítmico (*matchmaking*) entre empresas compradoras internacionales, mineras, agroindustrias y proveedores locales del NOA.
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-aqua">
                <CheckCircle className="w-4 h-4" /> Acceso con Credencial Corporativa
              </span>
            </div>

            {/* Card 2 */}
            <div className="glass-card rounded-2xl p-6 border-l-4 border-l-brand-violet hover:shadow-glow-violet transition-all relative z-10">
              <div className="w-12 h-12 rounded-xl bg-brand-violet/10 flex items-center justify-center text-brand-lavender mb-4">
                <Presentation className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-white mb-2">Conferencias Técnico-Científicas</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Paneles de alto nivel sobre transición energética, minería sustentable, bioeconomía y el impacto geoestratégico del Corredor Bioceánico.
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-lavender">
                <Clock className="w-4 h-4" /> Auditorio Principal · 10:00 a 13:30 hs
              </span>
            </div>

            {/* Card 3 con Llama Curiosa Asomándose por Detrás al Scrollear */}
            <div className="relative">
              {/* Llama recortada asomándose progresivamente más arriba del borde superior de la 3° Card */}
              <div 
                className="absolute top-0 right-4 sm:right-6 w-36 sm:w-48 h-64 pointer-events-none z-0 transition-transform ease-out duration-75"
                style={{
                  transform: `translateY(${translateYPx}px)`,
                  opacity: peekProgress > 0.05 ? 1 : 0,
                }}
              >
                <Image
                  src="/images/llama-Photoroom.png"
                  alt="Mascota ExpoJuy asomándose"
                  fill
                  sizes="150px"
                  className="object-contain drop-shadow-[0_10px_25px_rgba(0,191,216,0.35)]"
                  priority
                />
              </div>

              <div className="glass-card rounded-2xl p-6 border-l-4 border-l-emerald-400 hover:shadow-glow-aqua transition-all relative z-10 bg-[#0E172F]/90 backdrop-blur-md">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-heading text-white mb-2">Vinculación y Financiamiento</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Encuentro con entidades bancarias, fondos de capital emprendedor y agencias de comercio exterior para potenciar exportaciones jujeñas.
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <Users className="w-4 h-4" /> Sala de Negocios ClusteAR
                </span>
              </div>
            </div>

          </div>
        ) : (
          /* Contenido Tardes y Noches */
          <div className="grid md:grid-cols-3 gap-6 transition-all duration-300 relative">
            <div className="glass-card rounded-2xl p-6 border-l-4 border-l-amber-400 hover:shadow-glow-violet transition-all relative z-10">
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400 mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-white mb-2">Festival Cultural & Shows en Vivo</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Escenario central con artistas jujeños, danzas tradicionales, música contemporánea y espectáculos lumínicos para toda la familia.
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                <Music className="w-4 h-4" /> Escenario Central · 19:00 a 23:00 hs
              </span>
            </div>

            <div className="glass-card rounded-2xl p-6 border-l-4 border-l-rose-400 hover:shadow-glow-violet transition-all relative z-10">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400 mb-4">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-white mb-2">Patio Gastronómico & Vinos de Altura</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Degustación de cocina andina, maridaje con bodegas de la Quebrada de Humahuaca, food trucks y cerveza artesanal regional.
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400">
                <MapPin className="w-4 h-4" /> Sector Gastronómico Descubierto
              </span>
            </div>

            {/* Card 3 con Llama Curiosa también en Vista Nocturna */}
            <div className="relative">
              {/* Llama recortada asomándose en vista nocturna */}
              <div 
                className="absolute top-0 right-4 sm:right-6 w-36 sm:w-48 h-64 pointer-events-none z-0 transition-transform ease-out duration-75"
                style={{
                  transform: `translateY(${translateYPx}px)`,
                  opacity: peekProgress > 0.05 ? 1 : 0,
                }}
              >
                <Image
                  src="/images/llama-Photoroom.png"
                  alt="Mascota ExpoJuy asomándose"
                  fill
                  sizes="150px"
                  className="object-contain drop-shadow-[0_10px_25px_rgba(0,191,216,0.35)]"
                  priority
                />
              </div>

              <div className="glass-card rounded-2xl p-6 border-l-4 border-l-brand-lavender hover:shadow-glow-violet transition-all relative z-10 bg-[#0E172F]/90 backdrop-blur-md">
                <div className="w-12 h-12 rounded-xl bg-brand-lavender/10 flex items-center justify-center text-brand-lavender mb-4">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-heading text-white mb-2">Paseo de Artesanos y Emprendedores</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Más de 120 stands de artesanías auténticas, textiles de vicuña y llama, cerámica puneña y productos autóctonos con sello de origen.
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-lavender">
                  <Heart className="w-4 h-4" /> Abierto a todo el público
                </span>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
