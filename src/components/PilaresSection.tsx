export default function PilaresSection() {
  return (
    <section
      id="ejes-tematicos"
      aria-label="Ejes temáticos y cifras de impacto"
      className="w-full min-h-[55vh] bg-emerald-950/70 border-b-2 border-emerald-500/40 flex flex-col items-center justify-center p-8 transition-colors"
    >
      <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-emerald-900/60 border border-emerald-400/30 shadow-lg">
        <span className="w-4 h-4 rounded-full bg-emerald-400"></span>
        <span className="text-lg md:text-2xl font-bold tracking-wide uppercase text-emerald-200">
          Ejes Temáticos & Cifras de Impacto
        </span>
      </div>
    </section>
  );
}
