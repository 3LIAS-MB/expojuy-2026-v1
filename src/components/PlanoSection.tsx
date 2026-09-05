'use client';

import { useState } from 'react';
import { Map, Navigation } from 'lucide-react';

interface SectorInfo {
  title: string;
  desc: string;
  capacidad: string;
  horario: string;
  servicios: string;
}

const SECTORES: Record<string, SectorInfo> = {
  'b2b': {
    title: "Auditorio & Rondas B2B",
    desc: "Sector exclusivo para empresarios, inversores y delegaciones internacionales. Cuenta con 40 mesas de negociación equipadas con conectividad de alta velocidad y cabinas para videoconferencias.",
    capacidad: "350 personas sentadas",
    horario: "09:00 a 14:00 hs (Exclusivo B2B)",
    servicios: "Traducción simultánea, coffee break, secretaría comercial"
  },
  'litio': {
    title: "Pabellón Litio, Minería & Sol",
    desc: "Espacio de exhibición para las principales productoras de carbonato de litio, parques solares fotovoltaicos y empresas metalmecánicas proveedoras.",
    capacidad: "50 stands de gran porte",
    horario: "09:00 a 23:00 hs continuo",
    servicios: "Demostraciones tecnológicas, simuladores de extracción"
  },
  'agro': {
    title: "Pabellón Agroindustria & Alimentos",
    desc: "Muestra de ingenios azucareros, tabacaleras, cooperativas de legumbres, productores citrícolas y maquinaria agrícola de última generación.",
    capacidad: "45 stands corporativos",
    horario: "09:00 a 23:00 hs continuo",
    servicios: "Degustaciones guiadas, rondas con supermercadistas"
  },
  'artesanos': {
    title: "Carpa de Artesanías de Jujuy",
    desc: "Espacio cultural donde más de 120 artesanos y artesanas de la Puna, Quebrada, Valles y Yungas exponen textiles de vicuña, orfebrería y cerámica.",
    capacidad: "120 puestos individuales",
    horario: "16:00 a 23:00 hs (Segmento vespertino)",
    servicios: "Venta directa al público, cobro con medios digitales"
  },
  'escenario': {
    title: "Escenario Central de Espectáculos",
    desc: "Infraestructura escénica monumental con sonido envolvente y pantallas LED gigantes para el festival artístico nocturno y las ceremonias feriales.",
    capacidad: "Área abierta para 15.000 espectadores",
    horario: "19:00 a 23:30 hs",
    servicios: "Zona para prensa, primeros auxilios, control de seguridad"
  },
  'gastro': {
    title: "Patio Gastronómico & Bodegas",
    desc: "Corredor gastronómico al aire libre con foodtrucks de comida andina, carpas de empanadas jujeñas y degustación de vinos de extrema altura de la Quebrada.",
    capacidad: "2.000 personas en mesas comunes",
    horario: "12:00 a 15:00 hs y 18:00 a 00:00 hs",
    servicios: "Puntos de hidratación, gestión de residuos reciclables"
  }
};

export default function PlanoSection() {
  const [activeSector, setActiveSector] = useState<string>('b2b');
  const info = SECTORES[activeSector];

  return (
    <section id="plano" className="min-h-screen flex flex-col justify-center py-20 relative bg-brand-surface/30 border-t border-white/5">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-aqua/10 border border-brand-aqua/30 text-brand-aqua text-xs font-semibold uppercase tracking-wider mb-3">
            <Map className="w-3.5 h-3.5" />
            Ubicación & Distribución
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mb-4">
            Plano Digital de <span className="gradient-text">Ciudad Cultural</span>
          </h2>
          <p className="text-slate-400 text-sm">
            Explorá los sectores del predio ferial en Alto Padilla. Tocá cada zona para ver su información y servicios.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          
          {/* Mapa Esquemático */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 text-xs font-semibold text-slate-400">
              <span className="flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-brand-aqua" /> Acceso Principal Ruta 9
              </span>
              <span className="text-brand-aqua">Interactivo · Tocá un sector</span>
            </div>

            <div className="relative w-full aspect-[16/9] bg-brand-dark/90 rounded-xl border border-white/10 p-4 flex flex-col justify-between">
              
              {/* Fila Superior */}
              <div className="grid grid-cols-3 gap-3 h-1/3">
                <button 
                  onClick={() => setActiveSector('b2b')}
                  className={`border rounded-lg p-2 text-left transition-all flex flex-col justify-between ${
                    activeSector === 'b2b' 
                      ? 'bg-brand-violet/50 border-brand-aqua shadow-glow-aqua' 
                      : 'bg-brand-violet/25 hover:bg-brand-violet/40 border-brand-violet/40'
                  }`}
                >
                  <span className="text-[11px] font-bold text-brand-lavender">Auditorio & Rondas B2B</span>
                  <span className="text-[9px] text-slate-400">Salas 1, 2 y Conferencias</span>
                </button>

                <button 
                  onClick={() => setActiveSector('litio')}
                  className={`border rounded-lg p-2 text-left transition-all flex flex-col justify-between ${
                    activeSector === 'litio' 
                      ? 'bg-pilar-litio/50 border-brand-aqua shadow-glow-aqua' 
                      : 'bg-pilar-litio/25 hover:bg-pilar-litio/40 border-pilar-litio/40'
                  }`}
                >
                  <span className="text-[11px] font-bold text-pilar-litio">Pabellón Litio & Sol</span>
                  <span className="text-[9px] text-slate-400">Energía e Innovación</span>
                </button>

                <button 
                  onClick={() => setActiveSector('agro')}
                  className={`border rounded-lg p-2 text-left transition-all flex flex-col justify-between ${
                    activeSector === 'agro' 
                      ? 'bg-pilar-agro/50 border-brand-aqua shadow-glow-aqua' 
                      : 'bg-pilar-agro/25 hover:bg-pilar-agro/40 border-pilar-agro/40'
                  }`}
                >
                  <span className="text-[11px] font-bold text-pilar-agro">Pabellón Agro & Industria</span>
                  <span className="text-[9px] text-slate-400">Alimentos y Maquinaria</span>
                </button>
              </div>

              {/* Bulevar Central */}
              <div className="my-2 py-1.5 border-y border-dashed border-white/20 flex items-center justify-between px-4 text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                <span>&larr; Ingreso Sur</span>
                <span className="text-brand-aqua">Bulevar Central de Exposiciones</span>
                <span>Ingreso Norte &rarr;</span>
              </div>

              {/* Fila Inferior */}
              <div className="grid grid-cols-3 gap-3 h-1/3">
                <button 
                  onClick={() => setActiveSector('artesanos')}
                  className={`border rounded-lg p-2 text-left transition-all flex flex-col justify-between ${
                    activeSector === 'artesanos' 
                      ? 'bg-brand-lavender/50 border-brand-aqua shadow-glow-aqua' 
                      : 'bg-brand-lavender/20 hover:bg-brand-lavender/40 border-brand-lavender/30'
                  }`}
                >
                  <span className="text-[11px] font-bold text-brand-lavender">Carpa Artesanías</span>
                  <span className="text-[9px] text-slate-400">120+ Creadores Andinos</span>
                </button>

                <button 
                  onClick={() => setActiveSector('escenario')}
                  className={`border rounded-lg p-2 text-left transition-all flex flex-col justify-between ${
                    activeSector === 'escenario' 
                      ? 'bg-amber-400/50 border-brand-aqua shadow-glow-aqua' 
                      : 'bg-amber-400/25 hover:bg-amber-400/40 border-amber-400/40'
                  }`}
                >
                  <span className="text-[11px] font-bold text-amber-400">Escenario Central</span>
                  <span className="text-[9px] text-slate-400">Shows & Pantallas</span>
                </button>

                <button 
                  onClick={() => setActiveSector('gastro')}
                  className={`border rounded-lg p-2 text-left transition-all flex flex-col justify-between ${
                    activeSector === 'gastro' 
                      ? 'bg-rose-500/50 border-brand-aqua shadow-glow-aqua' 
                      : 'bg-rose-500/25 hover:bg-rose-500/40 border-rose-500/40'
                  }`}
                >
                  <span className="text-[11px] font-bold text-rose-400">Patio Gastronómico</span>
                  <span className="text-[9px] text-slate-400">Foodtrucks & Bodegas</span>
                </button>
              </div>

            </div>
          </div>

          {/* Tarjeta de Detalle del Sector */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between h-full">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-brand-aqua block mb-1">
                Información del Sector
              </span>
              <h3 className="text-2xl font-bold font-heading text-white mb-3">
                {info.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {info.desc}
              </p>
              <div className="space-y-2 text-xs text-slate-400 border-t border-white/10 pt-4">
                <p><strong className="text-white">Capacidad:</strong> {info.capacidad}</p>
                <p><strong className="text-white">Horario:</strong> {info.horario}</p>
                <p><strong className="text-white">Servicios:</strong> {info.servicios}</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5">
              <a href="#agenda" className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-aqua hover:underline">
                Ver actividades en este sector &rarr;
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
