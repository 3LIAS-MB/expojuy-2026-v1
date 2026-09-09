'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import {
  FaArrowUpRightFromSquare,
  FaCalendarDays,
  FaClock,
  FaXmark,
  FaTag,
  FaShareNodes,
  FaBuilding,
  FaQuoteLeft,
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#040819]/80 p-2 sm:p-6 lg:p-8 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[calc(100dvh-1rem)] w-full max-w-5xl flex-col overflow-hidden border border-[#aeb5c5] border-t-4 border-t-[#6424dc] bg-[#f7f8fc] text-[#0b123b] shadow-2xl sm:max-h-[92vh]"
      >
        {/* CABECERA CON BOTONES */}
        <div className="absolute right-3 top-3 z-10 flex items-center gap-2 sm:right-5 sm:top-5">
          <button
            type="button"
            onClick={handleShare}
            aria-label="Compartir noticia"
            className="grid h-9 w-9 place-items-center rounded-full border border-[#dfe3ef] bg-white/95 text-[#0b123b] shadow-sm transition-colors hover:border-[#6424dc] hover:text-[#6424dc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6424dc]"
          >
            <FaShareNodes className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="grid h-9 w-9 place-items-center rounded-full border border-[#dfe3ef] bg-white/95 text-[#0b123b] shadow-sm transition-colors hover:border-[#6424dc] hover:text-[#6424dc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6424dc]"
          >
            <FaXmark className="h-4 w-4" />
          </button>
        </div>

        {/* CONTENIDO DESPLAZABLE */}
        <div className="exhibitor-scroll overflow-y-auto">
          <div className="px-4 pb-8 pt-4 sm:px-7 sm:pb-10 sm:pt-7 lg:px-10">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#e5e8f0]">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040819]/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-2 sm:bottom-4 sm:left-4 sm:right-4">
              <span className="bg-[#6424dc] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wide text-white">
                {article.category}
              </span>
              <span className="flex items-center gap-1.5 bg-[#040819]/80 px-3 py-1 text-[0.68rem] font-semibold text-white">
                <FaClock className="h-3.5 w-3.5 text-[#19b9ca]" />
                {article.readTime}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-b border-[#c9cedc] py-4 text-xs text-[#646a85] sm:py-5">
            <div className="flex items-center gap-2">
              <FaCalendarDays className="h-4 w-4 text-[#6424dc]" />
              <time dateTime={article.publishedAt} className="font-semibold text-[#0b123b]">
                {article.date}
              </time>
            </div>
            <div className="flex items-center gap-1.5">
              <FaBuilding className="h-4 w-4 text-[#19b9ca]" />
              <span>
                Fuente: <strong className="text-[#0b123b]">{article.author.name}</strong> ({article.author.role})
              </span>
            </div>
          </div>

          <div className="mx-auto max-w-4xl pt-6 sm:pt-8">
            <h1
              id="modal-news-title"
              className="text-balance text-[1.8rem] font-bold leading-[1.04] tracking-[-0.045em] text-[#0b123b] sm:text-4xl lg:text-5xl"
            >
              {article.title}
            </h1>
            <p className="mt-5 border-l border-[#6424dc] pl-4 text-base font-medium leading-relaxed text-[#454c64] sm:mt-6 sm:text-lg sm:leading-relaxed">
              {article.summary}
            </p>
          </div>

          {article.highlightQuote && (
            <div className="mx-auto mt-7 flex max-w-4xl gap-4 border-y border-[#d8c7fb] py-5 sm:mt-8 sm:py-6">
              <FaQuoteLeft className="mt-1 h-7 w-7 shrink-0 text-[#6424dc]" />
              <div>
                <blockquote className="text-base font-semibold italic leading-relaxed text-[#0b123b]">
                  &ldquo;{article.highlightQuote.quote}&rdquo;
                </blockquote>
                <p className="text-xs font-bold text-[#6424dc] mt-2 uppercase tracking-wide">
                  — {article.highlightQuote.author}
                </p>
              </div>
            </div>
          )}

          <div className="mx-auto mt-7 max-w-3xl space-y-5 text-[0.97rem] leading-[1.7] text-[#303852] sm:mt-9 sm:text-base">
            {article.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-4xl border-t border-[#c9cedc] pt-5">
            <div className="flex items-center gap-2 flex-wrap">
              <FaTag className="h-4 w-4 text-[#6424dc]" />
              <span className="text-xs font-bold text-[#646a85] uppercase tracking-wider">
                Temas relacionados:
              </span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-[#d6dbe7] px-2.5 py-1 text-xs font-medium text-[#454c64] transition-colors hover:border-[#6424dc] hover:text-[#6424dc]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-[#c9cedc] bg-white px-4 py-3 text-xs text-[#646a85] sm:px-7 sm:py-4">
          <span className="hidden sm:inline">ExpoJuy 2026 — 17° Edición Multisectorial</span>
          <span className="sm:hidden">ExpoJuy 2026</span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 bg-[#6424dc] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#0b123b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6424dc] focus-visible:ring-offset-2"
          >
            Entendido
            <FaArrowUpRightFromSquare className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
