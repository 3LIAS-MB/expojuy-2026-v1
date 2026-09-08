import Link from 'next/link';

export default function NewsSection() {
  return (
    <section
      id="noticias"
      aria-label="Noticias y Sala de Prensa"
      className="w-full min-h-[55vh] bg-rose-950/70 border-b-2 border-rose-500/40 flex flex-col items-center justify-center p-8 text-center gap-6"
    >
      <div className="flex items-center gap-3 px-6 py-3 rounded-none bg-rose-900/60 border border-rose-400/30 shadow-lg">
        <span className="w-4 h-4 rounded-full bg-rose-400"></span>
        <span className="text-lg md:text-2xl font-bold tracking-wide uppercase text-rose-200">
          Noticias y Sala de Prensa
        </span>
      </div>

      <Link
        href="/noticias"
        className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm uppercase tracking-wider transition-colors shadow-md rounded-none"
      >
        Ver Todas las Noticias y Comunicados →
      </Link>
    </section>
  );
}
