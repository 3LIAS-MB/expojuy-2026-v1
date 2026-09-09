'use client';

import Image from 'next/image';
import type { NewsArticle } from '@/data/news';

interface NewsCardProps {
  article: NewsArticle;
  onReadMore: (article: NewsArticle) => void;
}

export function NewsCard({ article, onReadMore }: NewsCardProps) {
  return (
    <article
      onClick={() => onReadMore(article)}
      className="group cursor-pointer flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6424dc] rounded-xl h-full"
    >
      {/* IMAGEN: Curvatura rounded-xl + zoom suave al hover */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#eef0f8] mb-3.5 border border-[#dfe3ef]/70 shadow-xs">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* METADATO SUPERIOR SUTIL */}
      <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase text-[#6424dc] mb-1.5">
        <span>{article.category}</span>
      </div>

      {/* TÍTULO EDITORIAL Y FECHA CON BASE ALINEADA EN DESKTOP */}
      <div className="flex-1 flex flex-col justify-between">
        <h3 className="font-bold text-[#0b123b] text-[15px] sm:text-[16px] leading-[1.35] group-hover:text-[#6424dc] transition-colors mb-3 line-clamp-3 md:min-h-[3.9rem]">
          {article.title}
        </h3>

        {/* FECHA DISCRETA */}
        <time
          dateTime={article.publishedAt}
          className="text-[12px] sm:text-[13px] text-[#646a85] font-normal"
        >
          {article.date}
        </time>
      </div>
    </article>
  );
}
