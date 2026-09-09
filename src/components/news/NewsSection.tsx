'use client';

import { useMemo, useState } from 'react';
import { Newspaper, Search, X, Filter, Mail, ArrowUpRight, Sparkles } from 'lucide-react';
import { NEWS_ARTICLES, NEWS_CATEGORIES, type NewsArticle, type NewsCategory } from '@/data/news';
import { NewsCard } from './NewsCard';
import { NewsModal } from './NewsModal';

interface NewsSectionProps {
  id?: string;
  className?: string;
}

export function NewsSection({ id = 'noticias', className = '' }: NewsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'Todos' | NewsCategory>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Filtrado reactivo en tiempo real
  const filteredArticles = useMemo(() => {
    return NEWS_ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === 'Todos' || article.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Separar noticia destacada cuando se ve la vista general sin búsqueda activa
  const isDefaultView = selectedCategory === 'Todos' && !searchQuery.trim();
  const featuredArticle = isDefaultView
    ? filteredArticles.find((a) => a.featured) || filteredArticles[0]
    : null;

  const regularArticles = isDefaultView
    ? filteredArticles.filter((a) => a.id !== featuredArticle?.id)
    : filteredArticles;

  return (
    <section
      id={id}
      className={`relative isolate py-20 lg:py-28 bg-[#f7f8fc] text-[#0b123b] overflow-hidden ${className}`}
    >
      {/* DECORACIÓN SUTIL DE FONDO */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-[#6424dc]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-[#19b9ca]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CABECERA INSTITUCIONAL */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6424dc]/10 text-[#6424dc] text-xs font-bold uppercase tracking-wider mb-3">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Prensa & Novedades Oficiales</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0b123b]">
              Actualidad <span className="text-[#6424dc]">ExpoJuy 2026</span>
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#646a85] max-w-2xl leading-relaxed">
              Seguí los anuncios de la Cámara de Comercio Exterior, convenios con el Corredor
              Bioceánico, novedades mineras y la agenda ferial en Ciudad Cultural.
            </p>
          </div>

          {/* INDICADOR RESUMEN */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[#646a85] bg-white px-4 py-2 rounded-xl border border-[#dfe3ef] shadow-sm shrink-0 self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#19b9ca] animate-pulse" />
            <span>{filteredArticles.length} noticias disponibles</span>
          </div>
        </div>

        {/* BARRA DE BÚSQUEDA Y FILTROS POR CATEGORÍA */}
        <div className="mb-10 space-y-4">
          {/* Búsqueda reactiva */}
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#646a85]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por palabra clave, litio, B2B, solar..."
              aria-label="Buscar noticias"
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-[#dfe3ef] text-sm text-[#0b123b] placeholder-[#646a85] focus:outline-none focus:ring-2 focus:ring-[#6424dc] focus:border-transparent transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Limpiar búsqueda"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-[#646a85] hover:text-[#0b123b]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filtros tipo pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 exhibitor-scroll">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#646a85] mr-2 shrink-0">
              <Filter className="w-3.5 h-3.5" />
              <span>Categorías:</span>
            </div>
            {NEWS_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#6424dc] text-white shadow-md shadow-[#6424dc]/20'
                      : 'bg-white text-[#4e5574] hover:bg-[#eef0f8] border border-[#dfe3ef]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* CONTENIDO DE NOTICIAS */}
        {filteredArticles.length === 0 ? (
          /* ESTADO VACÍO CUANDO NO HAY COINCIDENCIAS */
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-[#dfe3ef]">
            <Newspaper className="w-12 h-12 mx-auto text-[#646a85] opacity-50 mb-3" />
            <h3 className="text-lg font-bold text-[#0b123b]">No se encontraron artículos</h3>
            <p className="text-sm text-[#646a85] mt-1 max-w-sm mx-auto">
              No hay publicaciones que coincidan con &ldquo;{searchQuery}&rdquo; en la categoría
              seleccionada.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Todos');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-[#6424dc] text-white text-xs font-bold hover:bg-[#7f08d5] transition-colors"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* NOTICIA DESTACADA PRINCIPAL (solo cuando no hay filtros activos) */}
            {featuredArticle && (
              <div>
                <NewsCard
                  article={featuredArticle}
                  onReadMore={(article) => setSelectedArticle(article)}
                  featured
                />
              </div>
            )}

            {/* GRILLA DE NOTICIAS SECUNDARIAS */}
            {regularArticles.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularArticles.map((article) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    onReadMore={(art) => setSelectedArticle(art)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* BANNER INFORMATIVO PARA PRENSA & COMUNICADORES */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0b123b] via-[#1a1744] to-[#0b123b] text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 shadow-lg">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#19b9ca]">
              <Sparkles className="w-3.5 h-3.5" />
              Sala de Prensa Oficial
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              ¿Sos periodista o pertenecés a un medio de comunicación?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Accedé al centro de recursos multimedia con logos vectoriales oficiales en alta resolución,
              gacetillas de prensa diarias y acreditaciones con pase libre a conferencias.
            </p>
          </div>

          <a
            href="mailto:prensa@expojuy2026.com.ar"
            className="px-5 py-3 rounded-xl bg-[#6424dc] hover:bg-[#7f08d5] text-white text-xs sm:text-sm font-bold shadow-md transition-all shrink-0 inline-flex items-center gap-2 group"
          >
            <Mail className="w-4 h-4" />
            <span>Contacto Prensa</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
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
