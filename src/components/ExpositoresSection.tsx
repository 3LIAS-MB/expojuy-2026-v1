'use client';

import { useState, useMemo } from 'react';
import { Building2, Search, MapPin, AlertCircle } from 'lucide-react';

interface Expositor {
  id: string;
  name: string;
  stand: string;
  pilar: 'litio' | 'solar' | 'agro' | 'logistica' | 'tech';
  pilarLabel: string;
  desc: string;
  location: string;
  colorClass: string;
  bgClass: string;
}

const EXPOSITORES_DATA: Expositor[] = [
  {
    id: "1",
    name: "JEMSE & Asociadas",
    stand: "Stand A-12",
    pilar: "litio",
    pilarLabel: "Minería & Litio",
    desc: "Empresa estatal que promueve la exploración, extracción de litio, minerales polimetálicos y desarrollo de valor agregado en territorio jujeño.",
    location: "Pabellón Cubierto 1",
    colorClass: "text-pilar-litio",
    bgClass: "bg-pilar-litio/15"
  },
  {
    id: "2",
    name: "Cauchari Solar Park",
    stand: "Stand B-04",
    pilar: "solar",
    pilarLabel: "Energía Solar",
    desc: "La planta solar a mayor altitud de Sudamérica (4.000 msnm), inyectando energía limpia a la red interconectada nacional.",
    location: "Pabellón Energías",
    colorClass: "text-pilar-solar",
    bgClass: "bg-pilar-solar/15"
  },
  {
    id: "3",
    name: "Complejo Agroindustrial Ledesma",
    stand: "Stand C-01",
    pilar: "agro",
    pilarLabel: "Agroindustria",
    desc: "Líder en producción de azúcar, papel para el mundo a partir de caña, frutas frescas y producción de energías renovables por biomasa.",
    location: "Pabellón Industria",
    colorClass: "text-pilar-agro",
    bgClass: "bg-pilar-agro/15"
  },
  {
    id: "4",
    name: "Zona Franca Perico",
    stand: "Stand D-08",
    pilar: "logistica",
    pilarLabel: "Eje Logístico",
    desc: "Hub industrial y aduanero clave para el comercio internacional y las operaciones en el Corredor Bioceánico de Capricornio.",
    location: "Sector Descubierto",
    colorClass: "text-pilar-logistica",
    bgClass: "bg-pilar-logistica/15"
  },
  {
    id: "5",
    name: "ClusteAR (Empresas TIC)",
    stand: "Stand T-01",
    pilar: "tech",
    pilarLabel: "Tecnología & Software",
    desc: "Red de empresas de desarrollo de software, inteligencia artificial, IoT para la minería y servicios tecnológicos de exportación.",
    location: "Espacio Tech & IA",
    colorClass: "text-pilar-tech",
    bgClass: "bg-pilar-tech/15"
  },
  {
    id: "6",
    name: "Bodegas de la Quebrada",
    stand: "Stand G-15",
    pilar: "agro",
    pilarLabel: "Vinos de Altura",
    desc: "Vinos cultivados a más de 2.500 msnm con identidad andina única, gran concentración polifenólica y reconocimiento internacional.",
    location: "Sector Gastronómico",
    colorClass: "text-pilar-agro",
    bgClass: "bg-pilar-agro/15"
  }
];

export default function ExpositoresSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('todos');

  const filteredExpositores = useMemo(() => {
    return EXPOSITORES_DATA.filter(exp => {
      const matchesPilar = activeFilter === 'todos' || exp.pilar === activeFilter;
      const searchNormalized = searchTerm.toLowerCase().trim();
      const matchesSearch = !searchNormalized || 
        exp.name.toLowerCase().includes(searchNormalized) || 
        exp.desc.toLowerCase().includes(searchNormalized);
      return matchesPilar && matchesSearch;
    });
  }, [searchTerm, activeFilter]);

  return (
    <section id="expositores" className="min-h-screen flex flex-col justify-center py-20 relative bg-brand-surface/30 border-t border-white/5">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-aqua/10 border border-brand-aqua/30 text-brand-aqua text-xs font-semibold uppercase tracking-wider mb-3">
              <Building2 className="w-3.5 h-3.5" />
              Catálogo Comercial 100% Desmaterializado
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              Directorio de <span className="gradient-text">Expositores 2026</span>
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Descubrí las empresas participantes, sus stands asignados y concertá citas de negocios.
            </p>
          </div>

          {/* Buscador */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar empresa o marca..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-card border border-white/10 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-brand-aqua"
            />
          </div>
        </div>

        {/* Filtros por Pilar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-semibold no-scrollbar">
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'litio', label: 'Minería & Litio' },
            { id: 'solar', label: 'Energía Solar' },
            { id: 'agro', label: 'Agroindustria' },
            { id: 'logistica', label: 'Eje Logístico' },
            { id: 'tech', label: 'Tecnología & Software' },
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setActiveFilter(btn.id)}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeFilter === btn.id 
                  ? 'bg-brand-aqua text-brand-dark' 
                  : 'glass-card text-slate-300 hover:text-white'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Grilla */}
        {filteredExpositores.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExpositores.map((exp) => (
              <div 
                key={exp.id}
                className="glass-card rounded-2xl p-6 border border-white/5 hover:border-brand-aqua/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${exp.bgClass} ${exp.colorClass}`}>
                      {exp.pilarLabel}
                    </span>
                    <span className="text-xs font-mono text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded">
                      {exp.stand}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold font-heading text-white mb-2">{exp.name}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    {exp.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-aqua" /> {exp.location}
                  </span>
                  <button 
                    onClick={() => alert(`Iniciando contacto B2B con ${exp.name}`)}
                    className="text-xs font-bold text-brand-aqua hover:underline"
                  >
                    Ver ficha &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400">
            <AlertCircle className="w-10 h-10 mx-auto mb-3 text-slate-500" />
            <p className="text-base font-semibold">No se encontraron expositores con ese criterio de búsqueda.</p>
            <button 
              onClick={() => { setSearchTerm(''); setActiveFilter('todos'); }}
              className="mt-3 text-xs font-bold text-brand-aqua underline"
            >
              Restablecer todos los filtros
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
