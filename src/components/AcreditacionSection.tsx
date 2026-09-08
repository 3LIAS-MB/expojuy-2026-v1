export default function AcreditacionSection() {
  return (
    <section
      id="entradas"
      aria-label="Entradas y Acreditaciones"
      className="w-full min-h-[55vh] bg-violet-950/70 border-b-2 border-violet-500/40 flex flex-col items-center justify-center p-8 transition-colors"
    >
      <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-violet-900/60 border border-violet-400/30 shadow-lg">
        <span className="w-4 h-4 rounded-full bg-violet-400"></span>
        <span className="text-lg md:text-2xl font-bold tracking-wide uppercase text-violet-200">
          Entradas y Acreditaciones
        </span>
      </div>
    </section>
  );
}
