"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  id: string;
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    id: "1",
    q: "¿En qué fechas y horarios se realizará ExpoJuy 2026?",
    a: "Del viernes 9 al lunes 12 de octubre de 2026 en el Predio Ferial Ciudad Cultural (San Salvador de Jujuy). Las mañanas están dedicadas a las rondas B2B (09:00 a 14:00 hs) y las tardes al público general (16:00 a 23:00 hs)."
  },
  {
    id: "2",
    q: "¿Cómo reservo un stand para mi empresa o PyME?",
    a: "Podés comunicarte directamente con la Cámara de Comercio Exterior de Jujuy al +54 388 4233539 / +54 388 4212955 o escribir a expojuy2.0@gmail.com para solicitar planos y metros cuadrados disponibles."
  },
  {
    id: "3",
    q: "¿Cómo funcionan las Rondas de Negocios B2B?",
    a: "Las rondas conectan oferta y demanda entre empresas locales e internacionales (ZICOSUR, Chile, Bolivia, Brasil, Paraguay). Al acreditarte, accedés a la agenda de reuniones presenciales cara a cara."
  },
  {
    id: "4",
    q: "¿Cómo obtengo mi entrada o pase de acceso?",
    a: "La acreditación es 100% digital a través de este portal. Al registrarte generás tu código QR que presentás desde el celular en los molinetes de ingreso al predio."
  },
  {
    id: "5",
    q: "¿El predio cuenta con estacionamiento y transporte público?",
    a: "Sí, Ciudad Cultural dispone de playas de estacionamiento controladas para más de 1.200 vehículos y líneas de colectivos urbanos con parada directa en el acceso principal."
  }
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("1");

  const toggle = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-[#070914] text-white border-t border-white/10 relative">
      <div className="max-w-[900px] mx-auto px-6 sm:px-8">
        
        {/* Minimalist Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Preguntas <span className="text-[#F8BF00]">Frecuentes</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Respuestas a las dudas más comunes sobre la exposición, acreditaciones y participación.
          </p>
        </div>

        {/* Clean Accordions */}
        <div className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-lg transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-white/[0.04] border-[#2b00ff]/60"
                    : "bg-white/[0.01] border-white/10 hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-white leading-snug">
                    {faq.q}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? "bg-[#2b00ff] text-white rotate-180" : "bg-white/5 text-gray-400"
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-gray-300 leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
