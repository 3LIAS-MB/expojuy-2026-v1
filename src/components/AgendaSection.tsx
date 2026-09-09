'use client';

import { useState } from 'react';
import { Clock, MapPin, Check, Plus } from 'lucide-react';

interface EventItem {
  time: string;
  category: string;
  categoryType: 'b2b' | 'ferial' | 'show';
  location: string;
  title: string;
  desc: string;
}

const AGENDA_DATA: Record<number, { date: string; label: string; highlight: string; events: EventItem[] }> = {
  1: {
    date: "Viernes 9 de Octubre",
    label: "Jornada 01",
    highlight: "Inauguración Oficial & Rondas B2B",
    events: [
      {
        time: "09:30 hs",
        category: "Conferencia Inaugural",
        categoryType: "b2b",
        location: "Auditorio Principal",
        title: "Acto Oficial de Apertura & Conferencia Magistral",
        desc: "Apertura institucional a cargo de autoridades de la Cámara de Comercio Exterior de Jujuy, Gobierno Provincial y delegaciones del Corredor Bioceánico."
      },
      {
        time: "11:00 hs",
        category: "Ronda B2B",
        categoryType: "b2b",
        location: "Centro de Negocios B2B",
        title: "Matchmaking Comercial Internacional",
        desc: "Mesas bilaterales de trabajo de 20 minutos con operadores comerciales e inversores de Chile, Bolivia, Paraguay y Brasil."
      },
      {
        time: "17:00 hs",
        category: "Apertura General",
        categoryType: "ferial",
        location: "Predio Ferial Completo",
        title: "Recorrido de Stands & Exposición Industrial",
        desc: "Apertura de pabellones al público masivo, demostraciones tecnológicas en vivo e intercambios con empresas expositoras."
      },
      {
        time: "20:30 hs",
        category: "Festival Cultural",
        categoryType: "show",
        location: "Escenario Central",
        title: "Gala Artística de Apertura & Ensamble Jujeño",
        desc: "Cierre artístico del primer día con la participación de la Orquesta Sinfónica Provincial y agrupaciones autóctonas."
      }
    ]
  },
  2: {
    date: "Sábado 10 de Octubre",
    label: "Jornada 02",
    highlight: "Minería Sustentable, Litio & Energía",
    events: [
      {
        time: "10:00 hs",
        category: "Foro Técnico",
        categoryType: "b2b",
        location: "Auditorio Litio",
        title: "Foro Internacional: Cadena de Valor del Litio y Estándares ESG",
        desc: "Conferencia sobre desarrollo de proveedores locales, sustentabilidad ambiental y proyecciones de exportación en la Puna."
      },
      {
        time: "12:00 hs",
        category: "Ronda B2B",
        categoryType: "b2b",
        location: "Centro de Negocios B2B",
        title: "Ronda de Negocios: Proveedores Mineros & Operadoras",
        desc: "Encuentros ejecutivos de contratación de servicios de logística, metalmecánica e infraestructura."
      },
      {
        time: "19:30 hs",
        category: "Festival Cultural",
        categoryType: "show",
        location: "Escenario Central",
        title: "Noche de Música Contemporánea del NOA",
        desc: "Presentación de artistas consagrados de la región en el predio ferial."
      }
    ]
  },
  3: {
    date: "Domingo 11 de Octubre",
    label: "Jornada 03",
    highlight: "Turismo, Gastronomía & Cultura",
    events: [
      {
        time: "11:00 hs",
        category: "Gourmet & Orígenes",
        categoryType: "ferial",
        location: "Plaza Gastronómica",
        title: "Masterclass de Cocina Andina & Maridaje",
        desc: "Chefs invitados elaboran platos autóctonos con ingredientes de la Quebrada y Puna."
      },
      {
        time: "16:00 hs",
        category: "Foro Turístico",
        categoryType: "b2b",
        location: "Auditorio Principal",
        title: "Jujuy como Hub Turístico & Conectividad Aérea",
        desc: "Presentación de nuevos circuitos turísticos e inversiones sostenibles."
      },
      {
        time: "21:00 hs",
        category: "Espectáculo Ferial",
        categoryType: "show",
        location: "Escenario Central",
        title: "Gran Noche Popular & Carnaval Jujeño",
        desc: "Desfile de comparsas, música en vivo y celebración cultural inclusiva."
      }
    ]
  },
  4: {
    date: "Lunes 12 de Octubre",
    label: "Jornada 04",
    highlight: "Clausura & Sorteos Institucionales",
    events: [
      {
        time: "10:30 hs",
        category: "Balance Corporativo",
        categoryType: "b2b",
        location: "Sala de Conferencias A",
        title: "Presentación de Resultados de las Rondas B2B",
        desc: "Informe final de acuerdos comerciales e intención de negocios alcanzados."
      },
      {
        time: "17:00 hs",
        category: "Cierre de Stands",
        categoryType: "ferial",
        location: "Pabellones A, B y C",
        title: "Premiación al Mejor Stand ExpoJuy 2026",
        desc: "Reconocimiento a la innovación, sustentabilidad y diseño arquitectónico ferial."
      },
      {
        time: "19:00 hs",
        category: "Acto de Clausura",
        categoryType: "show",
        location: "Escenario Central",
        title: "Sorteo Oficial de Cierre & Cierre Oficial",
        desc: "Palabras finales de las autoridades de la Cámara de Comercio Exterior y sorteos para visitantes."
      }
    ]
  }
};

export default function AgendaSection() {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [bookmarkedEvents, setBookmarkedEvents] = useState<string[]>([]);
  const currentAgenda = AGENDA_DATA[selectedDay];

  const toggleBookmark = (title: string) => {
    setBookmarkedEvents((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <section id="agenda" className="py-16 sm:py-24 bg-white border-t border-[#dfe3ef]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Editorial Section Header */}
        <div className="pb-8 border-b border-[#dfe3ef]">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b123b] tracking-tight">
            Cronograma de Jornadas & Rondas B2B
          </h2>
        </div>

        {/* Corporate Day Selector Tabs with Active Press Feedback */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 py-8">
          {[1, 2, 3, 4].map((day) => {
            const data = AGENDA_DATA[day];
            const isActive = selectedDay === day;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`p-4 rounded-xl text-left border transition-all duration-150 active:scale-[0.98] cursor-pointer flex flex-col justify-between space-y-2.5 ${
                  isActive
                    ? 'bg-[#0b123b] text-white border-[#0b123b] shadow-md'
                    : 'bg-[#f7f8fc] border-[#dfe3ef] text-[#3c3c3c] hover:border-[#820cd0] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider ${isActive ? 'text-[#25c0d4]' : 'text-[#676370]'}`}>
                    {data.label}
                  </span>
                  <span className={`text-[11px] font-mono font-semibold ${isActive ? 'text-gray-300' : 'text-[#820cd0]'}`}>
                    {data.date.split(' de ')[0]}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-extrabold leading-snug line-clamp-1">
                  {data.highlight}
                </span>
              </button>
            );
          })}
        </div>

        {/* Executive Table / Event List */}
        <div className="divide-y divide-[#dfe3ef] border-t border-b border-[#dfe3ef]">
          {currentAgenda.events.map((ev, idx) => {
            const isBookmarked = bookmarkedEvents.includes(ev.title);

            return (
              <div
                key={idx}
                className="py-5 sm:py-6 px-3 sm:px-5 hover:bg-[#f7f8fc] transition-colors duration-150 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-5"
              >
                {/* Event Information */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 flex-1 min-w-0">
                  
                  {/* Time Badge */}
                  <div className="flex items-center gap-2 shrink-0 bg-[#0b123b] text-white px-3 py-1.5 rounded-lg text-xs font-mono font-bold">
                    <Clock className="w-3.5 h-3.5 text-[#25c0d4]" />
                    <span>{ev.time}</span>
                  </div>

                  {/* Body Content */}
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#820cd0]/10 text-[#820cd0] border border-[#820cd0]/20">
                        {ev.category}
                      </span>
                      <span className="text-xs text-[#676370] font-semibold flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#25c0d4]" />
                        {ev.location}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-[#0b123b] leading-tight">
                      {ev.title}
                    </h4>

                    <p className="text-xs text-[#676370] leading-relaxed max-w-3xl">
                      {ev.desc}
                    </p>
                  </div>

                </div>

                {/* Bookmark / Action Button with Press Feedback */}
                <div className="shrink-0 self-start md:self-center">
                  <button
                    onClick={() => toggleBookmark(ev.title)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-150 active:scale-[0.97] cursor-pointer flex items-center gap-1.5 border ${
                      isBookmarked
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'bg-white border-[#0b123b] text-[#0b123b] hover:bg-[#0b123b] hover:text-white'
                    }`}
                  >
                    {isBookmarked ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Agendado</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Agendar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
