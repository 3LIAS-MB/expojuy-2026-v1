import Link from 'next/link';

export default function AboutSection() {
  return (
    <section
      id="el-evento"
      aria-label="El Evento - Sobre ExpoJuy 2026"
      className="w-full min-h-[55vh] bg-blue-950/70 border-b-2 border-blue-500/40 flex flex-col items-center justify-center p-8 text-center gap-6"
    >
      <div className="flex items-center gap-3 px-6 py-3 rounded-none bg-blue-900/60 border border-blue-400/30 shadow-lg">
        <span className="w-4 h-4 rounded-full bg-blue-400"></span>
        <span className="text-lg md:text-2xl font-bold tracking-wide uppercase text-blue-200">
          Sobre ExpoJuy (El Evento)
        </span>
      </div>

      <Link
        href="/el-evento"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm uppercase tracking-wider transition-colors shadow-md rounded-none"
      >
        Ver Página Completa de El Evento →
      </Link>
    </section>
  );
}
