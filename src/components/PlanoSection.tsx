import Link from 'next/link';

export default function PlanoSection() {
  return (
    <section
      id="mapa-predio"
      aria-label="Mapa del Predio"
      className="w-full min-h-[55vh] bg-cyan-950/70 border-b-2 border-cyan-500/40 flex flex-col items-center justify-center p-8 text-center gap-6"
    >
      <div className="flex items-center gap-3 px-6 py-3 rounded-none bg-cyan-900/60 border border-cyan-400/30 shadow-lg">
        <span className="w-4 h-4 rounded-full bg-cyan-400"></span>
        <span className="text-lg md:text-2xl font-bold tracking-wide uppercase text-cyan-200">
          Mapa Interactivo del Predio
        </span>
      </div>

      <Link
        href="/mapa-predio"
        className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm uppercase tracking-wider transition-colors shadow-md rounded-none"
      >
        Abrir Plano Interactivo a Pantalla Completa →
      </Link>
    </section>
  );
}
