"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

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
    <section id="faq" className="py-20 sm:py-24 bg-[#f8f9fc] text-[#0e122b] border-t border-[#dfe3ef] relative">
      <div className="max-w-[900px] mx-auto px-6 sm:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#f4edff] border border-[#d8b4fe]/60 mb-3.5 text-[11px] font-mono font-bold tracking-widest text-[#820CD0] uppercase">
            Guía & Consultas
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0e122b]">
            Preguntas <span className="text-[#820CD0]">Frecuentes</span>
          </h2>
          <p className="mt-3 text-[#4b5275] text-sm sm:text-base leading-relaxed">
            Respuestas a las dudas más comunes sobre la exposición, acreditaciones y participación.
          </p>
        </div>

        {/* Clean Accordions with Smooth Transition & Editorial Numbering */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-xl transition-all duration-300 overflow-hidden bg-white ${
                  isOpen
                    ? "border-[#820CD0] shadow-md shadow-[#820CD0]/10 ring-1 ring-[#820CD0]/20"
                    : "border-[#dfe3ef] hover:border-[#ac7ff0]/60 shadow-xs"
                }`}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4.5 text-left focus:outline-none cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`font-mono text-xs font-bold transition-colors ${isOpen ? "text-[#820CD0]" : "text-[#8a91a8]"}`}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base font-bold text-[#0e122b] leading-snug group-hover:text-[#820CD0] transition-colors">
                      {faq.q}
                    </span>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen ? "bg-[#820CD0] text-white rotate-180" : "bg-[#f4edff]/70 text-[#820CD0] group-hover:bg-[#f4edff]"
                  }`}>
                    <FaChevronDown className="w-3 h-3" />
                  </div>
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out overflow-hidden ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5 pt-2 text-sm text-[#374151] leading-relaxed border-t border-[#f0f2f8] sm:pl-12">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
