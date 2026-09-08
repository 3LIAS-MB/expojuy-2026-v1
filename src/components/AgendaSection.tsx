export default function AgendaSection() {
  return (
    <section
      id="agenda"
      aria-label="Agenda de Actividades"
      className="w-full min-h-[55vh] bg-amber-950/70 border-b-2 border-amber-500/40 flex flex-col items-center justify-center p-8 transition-colors"
    >
      <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-amber-900/60 border border-amber-400/30 shadow-lg">
        <span className="w-4 h-4 rounded-full bg-amber-400"></span>
        <span className="text-lg md:text-2xl font-bold tracking-wide uppercase text-amber-200">
          Agenda de Actividades
        </span>
      </div>
    </section>
  );
}
