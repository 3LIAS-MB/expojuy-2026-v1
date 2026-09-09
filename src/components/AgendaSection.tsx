'use client';

import { useState } from 'react';
import { CalendarDays } from 'lucide-react';

interface EventItem {
  time: string;
  badge: string;
  badgeType: 'morning' | 'evening' | 'show';
  location: string;
  title: string;
  desc: string;
}

const AGENDA_BY_DAY: Record<number, { title: string; subtitle: string; events: EventItem[] }> = {
  1: {
    title: "Viernes 9 Oct",
    subtitle: "Día 1 · Inauguración & Rondas B2B",
    events: [
      {
        time: "09:30 hs",
        badge: "☀️ Mañana B2B",
        badgeType: "morning",
        location: "Sala de Conferencias 1",
        title: "Acto Oficial de Apertura & Conferencia Inaugural",
        desc: "Presencia de autoridades de la Cámara de Comercio Exterior, Gobierno de Jujuy y delegaciones diplomáticas del Corredor Bioceánico."
      },
      {
        time: "11:00 hs",
        badge: "☀️ Ronda B2B",
        badgeType: "morning",
        location: "Espacio Rondas de Negocios",
        title: "Primera Sesión de Matchmaking Comercial Internacional",
        desc: "Mesas de trabajo bilaterales de 20 minutos con empresas de Chile, Bolivia, Paraguay y Brasil."
      },
      {
        time: "17:00 hs",
        badge: "🌙 Tarde Ferial",
        badgeType: "evening",
        location: "Predio Completo",
        title: "Apertura al Público Masivo & Recorrido de Stands",
        desc: "Demostraciones en vivo de maquinaria agrícola, robots educativos y exposición en todos los pabellones."
      },
      {
        time: "20:30 hs",
        badge: "🌙 Show en Vivo",
        badgeType: "show",
        location: "Escenario Central",
        title: "Gran Espectáculo Folklórico Jujeño & Sinfónica",
        desc: "Cierre artístico del primer día con música andina, ensamble instrumental y patio gastronómico activo."
      }
    ]
  },
  2: {
    title: "Sábado 10 Oct",
    subtitle: "Día 2 · Minería Sustentable & Energía Solar",
    events: [
      {
        time: "10:00 hs",
        badge: "☀️ Mañana B2B",
        badgeType: "morning",
        location: "Auditorio Litio",
        title: "Foro Internacional de Minería y Proveedores Locales",
        desc: "Desafíos de la cadena de valor del litio y estándares ESG en la Puna Argentina."
      },
      {
        time: "12:00 hs",
        badge: "☀️ Ronda B2B",
        badgeType: "morning",
        location: "Espacio Rondas",
        title: "Ronda de Vinculación Proveedores Mineros & Operadoras",
        desc: "Encuentros individuales para compras industriales y contratos de servicios de transporte."
      },
      {
        time: "19:30 hs",
        badge: "🌙 Show en Vivo",
        badgeType: "show",
        location: "Escenario Central",
        title: "Noche de Rock y Música Contemporánea del NOA",
        desc: "Bandas emergentes y bandas consagradas de la provincia de Jujuy."
      }
    ]
  },
  3: {
    title: "Domingo 11 Oct",
    subtitle: "Día 3 · Agroindustria, Vinos & Familia",
    events: [
      {
        time: "11:30 hs",
        badge: "☀️ Conferencia",
        badgeType: "morning",
        location: "Auditorio Valles",
        title: "Panel: El Potencial Exportador de los Vinos de Extrema Altura",
        desc: "Cata guiada y análisis de mercados internacionales para bodegas de la Quebrada."
      },
      {
        time: "16:00 hs",
        badge: "🌙 Tarde Ferial",
        badgeType: "evening",
        location: "Patio Gastronómico",
        title: "Masterclass de Cocina Andina con Productos Jujeños",
        desc: "Chefs invitados y demostraciones en vivo de maridajes autóctonos."
      },
      {
        time: "20:00 hs",
        badge: "🌙 Show en Vivo",
        badgeType: "show",
        location: "Escenario Central",
        title: "Festival de Danzas Tradicionales y Carnaval de la Puna",
        desc: "Desfile de comparsas, sikuris y copleros tradicionales."
      }
    ]
  },
  4: {
    title: "Lunes 12 Oct",
    subtitle: "Día 4 · Conclusiones, Premiación & Clausura",
    events: [
      {
        time: "10:30 hs",
        badge: "☀️ Mañana B2B",
        badgeType: "morning",
        location: "Auditorio Principal",
        title: "Presentación del Balance de Negocios del Corredor Bioceánico",
        desc: "Estimación del volumen de acuerdos comerciales concretados durante las rondas."
      },
      {
        time: "18:00 hs",
        badge: "🌙 Clausura",
        badgeType: "evening",
        location: "Escenario Central",
        title: "Entrega de Premios a los Mejores Stands e Innovación",
        desc: "Reconocimiento a la creatividad, sustentabilidad y calidad de diseño ferial."
      }
    ]
  }
};

export default function AgendaSection() {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const currentAgenda = AGENDA_BY_DAY[selectedDay];

  return (
    <section id="agenda" className="min-h-screen flex flex-col justify-center py-20 relative">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-violet/20 border border-brand-violet/30 text-brand-lavender text-xs font-semibold uppercase tracking-wider mb-3">
            <CalendarDays className="w-3.5 h-3.5 text-brand-aqua" />
            Cronograma Oficial
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mb-4">
            Agenda de las <span className="gradient-text">4 Jornadas Intensivas</span>
          </h2>
          <p className="text-slate-400 text-sm">
            Filtrá por día y por momento de la jornada (Sesiones Matutinas B2B vs Actividades Vespertinas Generales).
          </p>
        </div>

        {/* Botones de Días */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10">
          {[1, 2, 3, 4].map((day) => {
            const data = AGENDA_BY_DAY[day];
            const isActive = selectedDay === day;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`p-3.5 rounded-xl glass-card text-center transition-all ${
                  isActive 
                    ? 'border-brand-aqua/50 bg-brand-surface' 
                    : 'border-white/5 hover:border-white/20'
                }`}
              >
                <span className={`block text-xs font-bold uppercase tracking-wider ${isActive ? 'text-brand-aqua' : 'text-slate-400'}`}>
                  {data.title}
                </span>
                <span className={`block text-sm font-extrabold font-heading mt-0.5 ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {data.subtitle.split('·')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto space-y-4">
          {currentAgenda.events.map((ev, index) => {
            const isMorning = ev.badgeType === 'morning';
            const isShow = ev.badgeType === 'show';
            const borderColor = isMorning 
              ? 'border-l-brand-aqua' 
              : isShow 
              ? 'border-l-amber-400' 
              : 'border-l-brand-lavender';

            const badgeBg = isMorning 
              ? 'bg-brand-aqua/20 text-brand-aqua' 
              : isShow 
              ? 'bg-amber-400/20 text-amber-400' 
              : 'bg-brand-lavender/20 text-brand-lavender';

            return (
              <div 
                key={index}
                className={`glass-card rounded-2xl p-5 border-l-4 ${borderColor} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 text-center py-2 px-1 rounded-lg bg-white/5 text-slate-200 font-mono font-bold text-xs shrink-0">
                    {ev.time}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${badgeBg}`}>
                        {ev.badge}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{ev.location}</span>
                    </div>
                    <h4 className="text-base font-bold font-heading text-white">{ev.title}</h4>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                      {ev.desc}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => alert(`Actividad agendada: ${ev.title}`)}
                  className="sm:shrink-0 text-xs px-4 py-2 rounded-lg glass-card text-brand-aqua hover:bg-brand-aqua/10 border border-brand-aqua/30 transition-all font-semibold"
                >
                  Agendar
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
