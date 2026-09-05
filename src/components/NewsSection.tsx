'use client';

import { Newspaper, Calendar, ArrowRight } from 'lucide-react';

interface NewsItem {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
}

const NEWS_DATA: NewsItem[] = [
  {
    id: "1",
    category: "Comercio Exterior",
    date: "1 de Septiembre, 2026",
    title: "Confirmaron la participación de 6 delegaciones internacionales del Corredor Bioceánico",
    excerpt: "Empresarios y diplomáticos de Chile, Brasil, Paraguay y Bolivia asistirán a las rondas B2B matutinas en Ciudad Cultural."
  },
  {
    id: "2",
    category: "Minería & Litio",
    date: "28 de Agosto, 2026",
    title: "El complejo litífero jujeño presentará nuevas metas de industrialización local en ExpoJuy",
    excerpt: "Mesas de trabajo público-privadas expondrán proyectos de baterías, remediación ambiental y proveedores de la Puna."
  },
  {
    id: "3",
    category: "Gestión Ferial",
    date: "20 de Agosto, 2026",
    title: "La 17° edición implementa el modelo de 4 días intensivos con desmaterialización 100% digital",
    excerpt: "Autoridades de la Cámara de Comercio Exterior destacaron la reducción de costos logísticos y el acceso con código QR."
  }
];

export default function NewsSection() {
  return (
    <section id="noticias" className="min-h-screen flex flex-col justify-center py-20 relative bg-brand-surface/30 border-t border-white/5">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-aqua/10 border border-brand-aqua/30 text-brand-aqua text-xs font-semibold uppercase tracking-wider mb-3">
              <Newspaper className="w-3.5 h-3.5" />
              Prensa & Comunicados
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              Noticias & <span className="gradient-text">Novedades Oficiales</span>
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Seguí los anuncios, convenios y coberturas de la Cámara de Comercio Exterior antes y durante el evento.
            </p>
          </div>

          <button 
            onClick={() => alert('Próximamente centro de prensa completo')}
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-aqua hover:underline"
          >
            Ver todos los comunicados &rarr;
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {NEWS_DATA.map((news) => (
            <article 
              key={news.id}
              className="glass-card rounded-2xl p-6 border border-white/5 hover:border-brand-aqua/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-violet/20 text-brand-lavender font-bold text-[11px]">
                    {news.category}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Calendar className="w-3 h-3 text-brand-aqua" />
                    {news.date}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-heading text-white mb-2 group-hover:text-brand-aqua transition-colors leading-snug">
                  {news.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  {news.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-brand-aqua">
                <span>Leer artículo completo</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
