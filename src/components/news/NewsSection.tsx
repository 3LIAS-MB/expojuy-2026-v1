'use client';

import { useMemo, useState } from 'react';
import { NEWS_ARTICLES, NEWS_CATEGORIES, type NewsArticle, type NewsCategory } from '@/data/news';
import { NewsCard } from './NewsCard';
import { NewsModal } from './NewsModal';

interface NewsSectionProps {
  id?: string;
  className?: string;
}

export function NewsSection({ id = 'noticias', className = '' }: NewsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'Todos' | NewsCategory>('Todos');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'Todos') return NEWS_ARTICLES;
    return NEWS_ARTICLES.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      id={id}
      className={`py-16 sm:py-20 lg:py-24 bg-[#f7f8fc] text-[#0b123b] border-t border-[#dfe3ef] ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12 border-b border-[#c9cedc]">
          <div className="pb-5 sm:pb-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.035em] text-[#0b123b]">
              Actualidad <span className="text-[#6424dc]">ExpoJuy 2026</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#646a85] max-w-xl">
              Novedades institucionales, acuerdos del Corredor Bioceánico y cobertura ferial.
            </p>
          </div>

          {/* FILTROS MINIMALISTAS CON LÍNEA ACTIVA ANCLADA (-mb-[1px]) */}
          <nav
            aria-label="Categorías de noticias"
            className="flex items-center gap-5 sm:gap-7 overflow-x-auto text-xs sm:text-sm font-medium shrink-0 exhibitor-scroll -mb-[1px] pt-1"
          >
            {NEWS_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap transition-colors cursor-pointer pb-3 text-sm border-b-2 ${
                    isActive
                      ? 'text-[#6424dc] font-bold border-[#6424dc]'
                      : 'text-[#646a85] hover:text-[#0b123b] border-transparent'
                  }`}
                >
                  {cat === 'Todos' ? 'Todas' : cat}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[#66708a] bg-[#f7f8fc]">
          {filteredArticles.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              onReadMore={(item) => setSelectedArticle(item)}
            />
          ))}
        </div>
      </div>

      {/* MODAL DE LECTURA COMPLETA */}
      <NewsModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </section>
  );
}
