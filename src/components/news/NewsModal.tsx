'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { 
  FaCalendarDays, 
  FaClock, 
  FaXmark, 
  FaTag, 
  FaShareNodes, 
  FaBuilding, 
  FaQuoteLeft 
} from 'react-icons/fa6';
import type { NewsArticle } from '@/data/news';

interface NewsModalProps {
  article: NewsArticle | null;
  onClose: () => void;
}

export function NewsModal({ article, onClose }: NewsModalProps) {
  useEffect(() => {
    if (!article) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: window.location.href,
        });
      } catch {
        // Ignorar si el usuario cancela la acción nativa
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-news-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#040819]/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-[#dfe3ef] overflow-hidden text-[#0b123b]"
      >
        {/* CABECERA CON BOTONES */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            aria-label="Compartir noticia"
            className="p-2 rounded-full bg-white/90 hover:bg-white text-[#0b123b] shadow-md border border-[#dfe3ef] hover:text-[#6424dc] transition-colors"
          >
            <FaShareNodes className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="p-2 rounded-full bg-white/90 hover:bg-white text-[#0b123b] shadow-md border border-[#dfe3ef] hover:text-[#c83349] transition-colors"
          >
            <FaXmark className="w-4 h-4" />
          </button>
        </div>

        {/* CONTENIDO DESPLAZABLE */}
        <div className="overflow-y-auto exhibitor-scroll p-6 sm:p-8 space-y-6">
          {/* IMAGEN DE PORTADA */}
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#eef0f8]">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#6424dc] text-white shadow-sm">
                {article.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/60 text-white backdrop-blur-sm flex items-center gap-1.5">
                <FaClock className="w-3 h-3 text-[#19b9ca]" />
                {article.readTime}
              </span>
            </div>
          </div>

          {/* METADATOS Y FECHA */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#646a85] border-b border-[#dfe3ef] pb-4">
            <div className="flex items-center gap-2">
              <FaCalendarDays className="w-3.5 h-3.5 text-[#6424dc]" />
              <time dateTime={article.publishedAt} className="font-semibold text-[#0b123b]">
                {article.date}
              </time>
            </div>
            <div className="flex items-center gap-1.5">
              <FaBuilding className="w-3.5 h-3.5 text-[#19b9ca]" />
              <span>
                Fuente: <strong className="text-[#0b123b]">{article.author.name}</strong> ({article.author.role})
              </span>
            </div>
          </div>

          {/* TÍTULO Y BAJADA */}
          <div>
            <h1
              id="modal-news-title"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0b123b] leading-tight mb-4"
            >
              {article.title}
            </h1>
            <p className="text-base sm:text-lg text-[#3a4161] font-medium leading-relaxed bg-[#f7f8fc] p-4 rounded-xl border-l-4 border-[#6424dc]">
              {article.summary}
            </p>
          </div>

          {/* CITA DESTACADA (SI EXISTE) */}
          {article.highlightQuote && (
            <div className="p-5 rounded-xl bg-gradient-to-r from-[#6424dc]/10 via-[#ac7ff0]/10 to-transparent border border-[#6424dc]/20 flex gap-4 items-start">
              <FaQuoteLeft className="w-6 h-6 text-[#6424dc] shrink-0 mt-1" />
              <div>
                <blockquote className="text-base italic font-semibold text-[#0b123b]">
                  &ldquo;{article.highlightQuote.quote}&rdquo;
                </blockquote>
                <p className="text-xs font-bold text-[#6424dc] mt-2 uppercase tracking-wide">
                  — {article.highlightQuote.author}
                </p>
              </div>
            </div>
          )}

          {/* CUERPO DEL ARTÍCULO */}
          <div className="space-y-4 text-sm sm:text-base text-[#3a4161] leading-relaxed">
            {article.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* ETIQUETAS / TAGS */}
          <div className="pt-4 border-t border-[#dfe3ef]">
            <div className="flex items-center gap-2 flex-wrap">
              <FaTag className="w-3.5 h-3.5 text-[#6424dc]" />
              <span className="text-xs font-bold text-[#646a85] uppercase tracking-wider">
                Temas relacionados:
              </span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#eef0f8] text-[#0b123b] hover:bg-[#dfe3ef] transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* PIE DEL MODAL */}
        <div className="px-6 py-4 bg-[#f7f8fc] border-t border-[#dfe3ef] flex items-center justify-between text-xs text-[#646a85]">
          <span>ExpoJuy 2026 — 17° Edición Multisectorial</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#6424dc] hover:bg-[#7f08d5] text-white font-semibold transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
