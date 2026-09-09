'use client';

import { useState } from 'react';
import { CalendarDays, Clock, MapPin, CheckCircle } from 'lucide-react';

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
  const [agendados, setAgendados] = useState<string[]>([]);
  const currentAgenda = AGENDA_BY_DAY[selectedDay];

  const handleToggleAgendar = (title: string) => {
    if (agendados.includes(title)) {
      setAgendados(agendados.filter((t) => t !== title));
    } else {
      setAgendados([...agendados, title]);
    }
  };

  return (
    <section id="agenda" className="py-20 bg-[#f7f8fc] border-t border-[#dfe3ef] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
        
        {/* Cabecera de la sección */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#820cd0]/10 border border-[#820cd0]/20 text-[#820cd0] text-xs font-bold uppercase tracking-wider">
            <CalendarDays className="w-4 h-4 text-[#25c0d4]" />
            <span>Cronograma Oficial</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0b123b]">
            Agenda de las <span className="text-[#820cd0]">4 Jornadas Intensivas</span>
          </h2>
          <p className="text-sm text-[#676370] leading-relaxed">
            Filtrá por día y descubrí las conferencias B2B matutinas, rondas comerciales y festivales artísticos nocturnos.
          </p>
        </div>

        {/* Pestañas de Días (Selector) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10">
          {[1, 2, 3, 4].map((day) => {
            const data = AGENDA_BY_DAY[day];
            const isActive = selectedDay === day;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`p-4 rounded-xl text-center transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'bg-[#820cd0] text-white shadow-lg shadow-[#820cd0]/25 scale-[1.02]' 
                    : 'bg-white border border-[#dfe3ef] text-[#3c3c3c] hover:border-[#820cd0] hover:bg-white/80 shadow-sm'
                }`}
              >
                <span className={`block text-[11px] font-extrabold uppercase tracking-wider ${isActive ? 'text-[#25c0d4]' : 'text-[#676370]'}`}>
                  {data.title}
                </span>
                <span className={`block text-xs sm:text-sm font-extrabold mt-1 truncate ${isActive ? 'text-white' : 'text-[#0b123b]'}`}>
                  {data.subtitle.split('·')[1] || data.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Lista de Eventos por día */}
        <div className="max-w-4xl mx-auto space-y-4">
          {currentAgenda.events.map((ev, index) => {
            const isMorning = ev.badgeType === 'morning';
            const isShow = ev.badgeType === 'show';
            const isAgendado = agendados.includes(ev.title);

            const borderLeftColor = isMorning 
              ? 'border-l-[#25c0d4]' 
              : isShow 
              ? 'border-l-[#f4c64c]' 
              : 'border-l-[#820cd0]';

            const badgeStyle = isMorning 
              ? 'bg-[#25c0d4]/10 text-[#0e8897] border-[#25c0d4]/30' 
              : isShow 
              ? 'bg-amber-50 text-amber-700 border-amber-200' 
              : 'bg-[#820cd0]/10 text-[#820cd0] border-[#820cd0]/20';

            return (
              <div 
                key={index}
                className={`bg-white rounded-2xl p-5 sm:p-6 border border-[#dfe3ef] border-l-4 ${borderLeftColor} shadow-sm hover:shadow-md hover:border-[#820cd0]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-20 text-center py-2.5 px-2 rounded-xl bg-[#f4f1f9] border border-[#ded8e8] text-[#820cd0] font-bold text-xs shrink-0 flex items-center justify-center gap-1">
                    <Clock className="w-3.5 h-3.5 shrink-0 text-[#25c0d4]" />
                    <span>{ev.time}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${badgeStyle}`}>
                        {ev.badge}
                      </span>
                      <span className="text-xs text-[#676370] font-semibold flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#820cd0]" />
                        {ev.location}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-[#0b123b]">
                      {ev.title}
                    </h4>

                    <p className="text-[#676370] text-xs leading-relaxed max-w-2xl">
                      {ev.desc}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => handleToggleAgendar(ev.title)}
                  className={`sm:shrink-0 text-xs px-4 py-2.5 rounded-xl font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                    isAgendado 
                      ? 'bg-emerald-500 text-white shadow-sm' 
                      : 'bg-[#820cd0] hover:bg-[#6c0aa7] text-white shadow-sm hover:shadow-md'
                  }`}
                >
                  {isAgendado ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Agendado</span>
                    </>
                  ) : (
                    <span>+ Agendar</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
