import Link from 'next/link';

export default function AgendaSection() {
  return (
    <section
      id="agenda"
      aria-label="Agenda de Actividades"
      className="w-full min-h-[55vh] bg-amber-950/70 border-b-2 border-amber-500/40 flex flex-col items-center justify-center p-8 text-center gap-6"
    >
      <div className="flex items-center gap-3 px-6 py-3 rounded-none bg-amber-900/60 border border-amber-400/30 shadow-lg">
        <span className="w-4 h-4 rounded-full bg-amber-400"></span>
        <span className="text-lg md:text-2xl font-bold tracking-wide uppercase text-amber-200">
          Agenda de Actividades
        </span>
      </div>

      <Link
        href="/agenda"
        className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm uppercase tracking-wider transition-colors shadow-md rounded-none"
      >
        Ver Cronograma Completo Día por Día →
      </Link>
    </section>
  );
}
