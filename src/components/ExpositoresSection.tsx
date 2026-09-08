import Link from 'next/link';

export default function ExpositoresSection() {
  return (
    <section
      id="expositores"
      aria-label="Expositores"
      className="w-full min-h-[55vh] bg-purple-950/70 border-b-2 border-purple-500/40 flex flex-col items-center justify-center p-8 text-center gap-6"
    >
      <div className="flex items-center gap-3 px-6 py-3 rounded-none bg-purple-900/60 border border-purple-400/30 shadow-lg">
        <span className="w-4 h-4 rounded-full bg-purple-400"></span>
        <span className="text-lg md:text-2xl font-bold tracking-wide uppercase text-purple-200">
          Expositores (Directorio y Catálogo)
        </span>
      </div>

      <Link
        href="/expositores"
        className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm uppercase tracking-wider transition-colors shadow-md rounded-none"
      >
        Explorar Catálogo Completo de Expositores →
      </Link>
    </section>
  );
}
