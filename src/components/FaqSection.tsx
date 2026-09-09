"use client";

import { useState, useMemo } from "react";
import { 
  ChevronDown, 
  Search, 
  HelpCircle, 
  Building2, 
  Briefcase, 
  Ticket, 
  Calendar,
  MessageCircle,
  Mail,
  Phone,
  Sparkles
} from "lucide-react";

interface FaqItem {
  id: string;
  category: "general" | "expositores" | "b2b" | "visitantes";
  q: string;
  a: string;
  highlight?: string;
}

const FAQ_CATEGORIES = [
  { id: "all", label: "Todas las Preguntas", icon: HelpCircle },
  { id: "general", label: "General & Sede", icon: Calendar },
  { id: "expositores", label: "Expositores & Stands", icon: Building2 },
  { id: "b2b", label: "Rondas de Negocios B2B", icon: Briefcase },
  { id: "visitantes", label: "Visitantes & Entradas", icon: Ticket },
];

const FAQS: FaqItem[] = [
  {
    id: "1",
    category: "general",
    q: "¿En qué fechas y horarios se realizará ExpoJuy 2026?",
    a: "La 17° Edición se llevará a cabo del viernes 9 al lunes 12 de octubre de 2026 en el Predio Ferial Ciudad Cultural (Alto Padilla, San Salvador de Jujuy). La programación contempla jornadas matutinas para encuentros B2B (09:00 a 14:00 hs) y tardes abiertas al público general con muestra multisectorial, espectáculos y gastronomía (16:00 a 23:00 hs).",
    highlight: "9 al 12 de Octubre 2026"
  },
  {
    id: "2",
    category: "general",
    q: "¿Cómo llegar al Predio Ferial Ciudad Cultural y hay estacionamiento?",
    a: "El predio cuenta con acceso sobre Av. Bolivia en Alto Padilla. Durante los días de la muestra se habilitarán líneas especiales de transporte público urbano con parada directa en el acceso principal, además de playas de estacionamiento custodiadas para más de 1.200 vehículos.",
  },
  {
    id: "3",
    category: "expositores",
    q: "¿Cómo puede mi empresa o PyME reservar un stand en ExpoJuy 2026?",
    a: "Podés solicitar la reserva enviando un correo a expojuy2.0@gmail.com o comunicándote a los teléfonos +54 388 4233539 / +54 388 4212955. El equipo comercial de la Cámara de Comercio Exterior de Jujuy te asesorará sobre los planos de pabellones, metros cuadrados disponibles y facilidades de pago.",
    highlight: "Atención directa Cámara de Comercio Exterior"
  },
  {
    id: "4",
    category: "expositores",
    q: "¿Qué servicios y equipamiento incluyen los stands modulares?",
    a: "Los espacios incluyen cenefa identificatoria con el nombre de la firma, instalación eléctrica monofásica con tomacorrientes, iluminación LED focal, conexión a internet Wi-Fi de alta velocidad para expositores y seguridad 24 hs en todo el perímetro del predio.",
  },
  {
    id: "5",
    category: "b2b",
    q: "¿Cómo funcionan las Rondas de Negocios Internacionales B2B?",
    a: "Las rondas concentran a compradores de la región del ZICOSUR, Chile, Bolivia, Brasil y Paraguay. Al acreditarte en la modalidad Corporativa/B2B, accedés a la plataforma de matchmaking digital donde podés agendar reuniones presenciales cara a cara según tu oferta y demanda productiva.",
    highlight: "Matchmaking Algorítmico Internacional"
  },
  {
    id: "6",
    category: "b2b",
    q: "¿Tienen costo de participación las rondas para empresas registradas?",
    a: "Para las empresas expositoras el acceso a la agenda B2B está incluido en su acreditación oficial. Para participantes externos o delegaciones compradoras, podés consultar el arancel de inscripción con la Secretaría de Comercio Exterior.",
  },
  {
    id: "7",
    category: "visitantes",
    q: "¿Cómo se obtiene la acreditación o entrada para visitantes?",
    a: "El pase digital se genera directamente desde este sitio web oficial. Completás el formulario de acreditación, recibís un código QR único en tu dispositivo y lo presentás en los molinetes de acceso sin necesidad de imprimir.",
    highlight: "Pase Digital 100% QR"
  },
  {
    id: "8",
    category: "visitantes",
    q: "¿Qué actividades culturales y gastronómicas encontrarán los visitantes?",
    a: "La Expo ofrece una experiencia integral con patio gastronómico regional de foodtrucks, escenarios en vivo con artistas jujeños, paseos de artesanos y espacios tecnológicos e interactivos para toda la familia.",
  }
];

export default function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ "1": true });

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesSearch = 
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.a.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="faq" className="py-20 bg-[#050818] text-white border-t border-white/10 relative overflow-hidden">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#2b00ff]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#F8BF00]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2b00ff]/20 border border-[#2b00ff]/40 text-[#F8BF00] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Centro de Ayuda & Respuestas</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            Preguntas <span className="text-[#F8BF00]">Frecuentes</span>
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Todo lo que necesitás saber sobre la 17° Edición de la Exposición Multisectorial del NOA: acreditaciones, stands, rondas de negocios y visitas al predio.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por palabra clave (ej: entradas, stands, horarios)..."
              className="w-full bg-black/60 border border-white/15 text-white placeholder-gray-400 pl-11 pr-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-[#F8BF00] transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-bold text-gray-400 hover:text-white"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {FAQ_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#2b00ff] text-white shadow-lg shadow-[#2b00ff]/30 scale-105"
                    : "bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#F8BF00]" : "text-gray-400"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = !!openItems[faq.id];
              return (
                <div
                  key={faq.id}
                  className={`border rounded-xl transition-all duration-200 ${
                    isOpen 
                      ? "bg-white/[0.05] border-[#2b00ff]/50 shadow-xl" 
                      : "bg-black/40 border-white/10 hover:border-white/20"
                  }`}
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full flex items-start justify-between gap-4 p-5 text-left focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1">
                      {faq.highlight && (
                        <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-[#F8BF00] bg-[#F8BF00]/10 px-2 py-0.5 rounded border border-[#F8BF00]/20 mb-1">
                          {faq.highlight}
                        </span>
                      )}
                      <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                        {faq.q}
                      </h3>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "bg-[#2b00ff] text-white rotate-180" : "bg-white/10 text-gray-400"
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-gray-300 leading-relaxed border-t border-white/5 mt-1">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white/[0.02] rounded-xl border border-white/10">
              <HelpCircle className="w-12 h-12 text-gray-500 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-white">No encontramos preguntas que coincidan</h4>
              <p className="text-xs text-gray-400 max-w-md mx-auto mt-1">
                Probá buscando con otros términos o comunicate directamente con la organización.
              </p>
            </div>
          )}
        </div>

        {/* Contact Support Banner */}
        <div className="mt-14 max-w-4xl mx-auto bg-gradient-to-r from-gray-900 via-black to-gray-900 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-[#2b00ff]/20 border border-[#2b00ff]/40 flex items-center justify-center text-[#F8BF00] shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">¿Tenés alguna consulta específica?</h4>
              <p className="text-xs sm:text-sm text-gray-400">
                Contactate con el equipo de la Cámara de Comercio Exterior de Jujuy.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="mailto:expojuy2.0@gmail.com"
              className="inline-flex items-center gap-2 bg-[#2b00ff] hover:bg-[#1e00ca] text-white font-extrabold text-xs uppercase tracking-wider px-5 py-3 rounded-lg shadow-md transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Enviar Mail</span>
            </a>
            <a
              href="tel:+543884233539"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs uppercase tracking-wider px-5 py-3 rounded-lg border border-white/10 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#F8BF00]" />
              <span>Llamar</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
