'use client';

import Image from 'next/image';
import { Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';
import type { NewsArticle } from '@/data/news';

interface NewsCardProps {
  article: NewsArticle;
  onReadMore: (article: NewsArticle) => void;
  featured?: boolean;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Comercio & B2B': { bg: 'bg-[#6424dc]/10', text: 'text-[#6424dc]', border: 'border-[#6424dc]/30' },
  'Minería & Litio': { bg: 'bg-[#7f08d5]/10', text: 'text-[#7f08d5]', border: 'border-[#7f08d5]/30' },
  'Energías Renovables': { bg: 'bg-[#19b9ca]/10', text: 'text-[#0c8a99]', border: 'border-[#19b9ca]/30' },
  'Agroindustria': { bg: 'bg-[#f4c64c]/15', text: 'text-[#9c6a08]', border: 'border-[#f4c64c]/40' },
  'Cultura & Festivales': { bg: 'bg-[#e66f45]/10', text: 'text-[#c6491a]', border: 'border-[#e66f45]/30' },
};

export function NewsCard({ article, onReadMore, featured = false }: NewsCardProps) {
  const catStyle = CATEGORY_COLORS[article.category] || {
    bg: 'bg-[#eef0f8]',
    text: 'text-[#6424dc]',
    border: 'border-[#dfe3ef]',
  };

  if (featured) {
    return (
      <article
        onClick={() => onReadMore(article)}
        className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white border border-[#dfe3ef] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col lg:flex-row focus-within:ring-2 focus-within:ring-[#6424dc]"
      >
        {/* IMAGEN DESTACADA */}
        <div className="relative aspect-[16/10] lg:aspect-auto lg:w-1/2 min-h-[260px] overflow-hidden bg-[#eef0f8]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
          <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#6424dc] text-white shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            Noticia Principal
          </div>
        </div>

        {/* CONTENIDO DESTACADO */}
        <div className="p-6 sm:p-8 lg:w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}
              >
                {article.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#646a85]">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readTime}</span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#0b123b] group-hover:text-[#6424dc] transition-colors leading-snug mb-3">
              {article.title}
            </h3>

            <p className="text-sm text-[#4e5574] leading-relaxed line-clamp-3 mb-6">
              {article.summary}
            </p>
          </div>

          <div className="pt-4 border-t border-[#dfe3ef] flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-[#646a85] font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#6424dc]" />
              <time dateTime={article.publishedAt}>{article.date}</time>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onReadMore(article);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6424dc] group-hover:text-[#7f08d5] transition-colors"
            >
              <span>Leer comunicado</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      onClick={() => onReadMore(article)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white border border-[#dfe3ef] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between focus-within:ring-2 focus-within:ring-[#6424dc]"
    >
      <div>
        {/* IMAGEN DE CARD ESTÁNDAR */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#eef0f8]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold border backdrop-blur-md bg-white/90 ${catStyle.text} ${catStyle.border} shadow-sm`}
            >
              {article.category}
            </span>
          </div>
        </div>

        {/* CUERPO DE LA CARD */}
        <div className="p-5">
          <div className="flex items-center justify-between text-xs text-[#646a85] mb-2.5">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#6424dc]" />
              <time dateTime={article.publishedAt}>{article.date}</time>
            </div>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-[#0b123b] group-hover:text-[#6424dc] transition-colors line-clamp-2 leading-snug mb-2">
            {article.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#4e5574] leading-relaxed line-clamp-2">
            {article.summary}
          </p>
        </div>
      </div>

      {/* PIE DE CARD */}
      <div className="px-5 pb-5 pt-2 border-t border-[#dfe3ef]/60 flex items-center justify-between text-xs font-semibold text-[#6424dc]">
        <span>Leer completo</span>
        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </article>
  );
}
