import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react';
import { NewsSection } from '@/components/news/NewsSection';

export const metadata: Metadata = {
  title: 'Noticias & Sala de Prensa | ExpoJuy 2026',
  description:
    'Comunicados oficiales, novedades y cobertura de la 17° Edición Multisectorial de ExpoJuy 2026 en Ciudad Cultural, San Salvador de Jujuy.',
};

export default function NoticiasPage() {
  return (
    <div className="min-h-screen bg-[#f7f8fc] flex flex-col justify-between">
      {/* BARRA SUPERIOR AISLADA */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#dfe3ef] px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#0b123b] hover:text-[#6424dc] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la Home</span>
        </Link>

        <div className="flex items-center gap-2 text-xs bg-[#eef0f8] px-3 py-1.5 rounded-full text-[#646a85] font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-[#19b9ca]" />
          <span className="hidden sm:inline">Módulo modular de noticias</span>
          <span className="text-[#6424dc] font-bold">ExpoJuy 2026</span>
        </div>
      </header>

      {/* SECCIÓN PRINCIPAL DE NOTICIAS */}
      <main>
        <NewsSection />
      </main>

      {/* PIE DE PÁGINA SIMPLE PARA LA VISTA AISLADA */}
      <footer className="py-6 border-t border-[#dfe3ef] bg-white text-center text-xs text-[#646a85]">
        <p>
          ExpoJuy 2026 — Cámara de Comercio Exterior de Jujuy &bull; 9 al 12 de Octubre en Ciudad Cultural.
        </p>
      </footer>
    </div>
  );
}
