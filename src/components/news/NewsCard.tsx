'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { NewsArticle } from '@/data/news';

interface NewsCardProps {
  article: NewsArticle;
  onReadMore: (article: NewsArticle) => void;
}

export function NewsCard({ article, onReadMore }: NewsCardProps) {
  return (
    <article
      onClick={() => onReadMore(article)}
      className="group cursor-pointer flex min-w-0 flex-col p-3 sm:p-4 md:p-4 lg:p-5 border-b border-[#a9b0c1] md:[&:nth-child(odd)]:border-r lg:[&:nth-child(3n+1)]:border-r lg:[&:nth-child(3n+2)]:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-last-child(-n+3)]:border-b-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#6424dc]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#e5e8f0]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
          sizes="(max-width: 767px) calc(100vw - 3.5rem), (max-width: 1023px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <div className="mb-3 border-b border-dashed border-[#aeb5c5] pb-3">
          <p className="mb-2 text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6424dc]">
            {article.category}
          </p>
          <h3 className="font-bold text-[#0b123b] text-[1.6rem] sm:text-[1.75rem] leading-[1.02] tracking-[-0.045em] group-hover:text-[#6424dc] transition-colors text-balance">
          {article.title}
          </h3>
        </div>

        <p className="text-[0.94rem] leading-[1.38] text-[#454c64] line-clamp-3">
          {article.summary}
        </p>

        <div className="mt-auto flex items-end gap-3 pt-5">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-[#0b123b]">{article.author.name}</p>
            <time dateTime={article.publishedAt} className="mt-0.5 block text-xs text-[#646a85]">
              {article.date}
            </time>
          </div>
          <span className="grid h-10 w-10 shrink-0 place-items-center bg-[#6424dc] text-white transition-colors group-hover:bg-[#0b123b]" aria-hidden="true">
            <ArrowUpRight className="h-5 w-5" strokeWidth={1.8} />
          </span>
        </div>
      </div>
    </article>
  );
}
