'use client';

import { ChevronDown } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "¿En qué fechas y horarios se realizará ExpoJuy 2026?",
    a: "Del viernes 9 al lunes 12 de octubre de 2026 en Ciudad Cultural (Alto Padilla). Los segmentos se dividen en Mañanas B2B (09:00 a 14:00 hs) y Tardes Masivas / Recreativas (16:00 a 23:00 hs)."
  },
  {
    q: "¿Cómo funciona el pase digital QR y qué costo tiene?",
    a: "El pase se genera de forma 100% digital desde este sitio web en el módulo de Acreditación. Completás tus datos, obtenés tu código QR en pantalla y lo mostrás desde el celular en el ingreso."
  },
  {
    q: "¿Cómo inscribo a mi empresa en las Rondas de Negocios B2B?",
    a: "Seleccionás la opción 'Corporativo · Ronda B2B' en la sección de Acreditaciones. Recibirás un enlace exclusivo para cargar el perfil de oferta y demanda en el software de matchmaking algorítmico."
  },
  {
    q: "¿Hay estacionamiento y transporte público hasta el predio?",
    a: "Sí, Ciudad Cultural cuenta con playas de estacionamiento controladas para más de 1.200 vehículos y líneas urbanas especiales de colectivos con parada directa en el predio ferial."
  }
];

export default function FaqSection() {
  return (
    <section id="faqs" className="py-20 relative bg-brand-surface/20 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold font-heading text-white mb-3">
            Preguntas <span className="gradient-text">Frecuentes</span>
          </h2>
          <p className="text-slate-400 text-sm">
            Respuestas rápidas para visitantes, empresas expositoras y medios.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <details 
              key={idx}
              className="glass-card rounded-xl p-4 border border-white/5 group cursor-pointer"
            >
              <summary className="flex items-center justify-between text-sm font-bold text-white list-none">
                <span>{faq.q}</span>
                <ChevronDown className="w-4 h-4 text-brand-aqua transition-transform group-open:rotate-180" />
              </summary>
              <p className="text-slate-400 text-xs mt-3 leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
}
