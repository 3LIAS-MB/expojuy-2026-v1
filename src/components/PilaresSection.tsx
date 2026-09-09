import Link from 'next/link';
import { Zap, Sun, Leaf, Truck, Cpu, ArrowUpRight } from 'lucide-react';

const PILARES = [
  {
    id: 'litio',
    name: 'LITIO',
    subtitle: 'Minería Sustentable',
    metric: 'Hub Estratégico',
    icon: Zap,
    border: 'border-cyan-400/50 hover:border-cyan-300',
    bg: 'bg-cyan-950/40 hover:bg-cyan-900/40',
    iconBg: 'bg-cyan-400 text-slate-950',
    textColor: 'text-cyan-400',
  },
  {
    id: 'solar',
    name: 'SOLAR',
    subtitle: 'Energía Limpia',
    metric: '300+ MW Cauchari',
    icon: Sun,
    border: 'border-amber-400/50 hover:border-amber-300',
    bg: 'bg-amber-950/40 hover:bg-amber-900/40',
    iconBg: 'bg-amber-400 text-slate-950',
    textColor: 'text-amber-400',
  },
  {
    id: 'agro',
    name: 'AGRO',
    subtitle: 'Bioenergía & Alimentos',
    metric: 'Complejo Ledesma',
    icon: Leaf,
    border: 'border-emerald-400/50 hover:border-emerald-300',
    bg: 'bg-emerald-950/40 hover:bg-emerald-900/40',
    iconBg: 'bg-emerald-400 text-slate-950',
    textColor: 'text-emerald-400',
  },
  {
    id: 'logistica',
    name: 'LOGÍSTICA',
    subtitle: 'Corredor Bioceánico',
    metric: 'Zona Franca Perico',
    icon: Truck,
    border: 'border-orange-400/50 hover:border-orange-300',
    bg: 'bg-orange-950/40 hover:bg-orange-900/40',
    iconBg: 'bg-orange-400 text-slate-950',
    textColor: 'text-orange-400',
  },
  {
    id: 'tech',
    name: 'TECH',
    subtitle: 'Industria 4.0 & Software',
    metric: 'Polo Científico',
    icon: Cpu,
    border: 'border-purple-400/50 hover:border-purple-300',
    bg: 'bg-purple-950/40 hover:bg-purple-900/40',
    iconBg: 'bg-purple-400 text-slate-950',
    textColor: 'text-purple-400',
  },
];

export default function PilaresSection() {
  return (
    <section
      id="ejes-tematicos"
      aria-label="Ejes estratégicos"
      className="w-full bg-[#070D1E] py-10 sm:py-14 px-4 sm:px-6 lg:px-8 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Cabecera compacta y directa */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-cyan-400 mb-1">
              Matriz Productiva
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
              Ejes Estratégicos de Jujuy
            </h2>
          </div>
          <Link
            href="/el-evento"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
          >
            <span>Ver más detalles</span>
            <ArrowUpRight className="w-4 h-4 text-cyan-400" />
          </Link>
        </div>

        {/* 5 Tarjetas Gráficas, Coloridas y Compactas (en una sola fila en escritorio, scroll táctil o cuadrícula limpia en móvil) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {PILARES.map((pilar) => {
            const IconComponent = pilar.icon;
            return (
              <Link
                key={pilar.id}
                href="/el-evento"
                className={`group p-5 rounded-none border-2 ${pilar.border} ${pilar.bg} transition-all duration-200 flex flex-col justify-between min-h-[160px] sm:min-h-[190px] shadow-lg hover:-translate-y-1`}
              >
                {/* Ícono gráfico con fondo de color sólido */}
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-none ${pilar.iconBg} flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-transform`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </div>

                {/* Título y etiqueta de impacto */}
                <div className="mt-4">
                  <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-white">
                    {pilar.name}
                  </h3>
                  <p className={`text-[11px] font-bold uppercase tracking-wide mt-0.5 ${pilar.textColor}`}>
                    {pilar.subtitle}
                  </p>
                  <span className="text-[10px] font-mono text-slate-400 block mt-2 pt-2 border-t border-white/10 uppercase">
                    {pilar.metric}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
