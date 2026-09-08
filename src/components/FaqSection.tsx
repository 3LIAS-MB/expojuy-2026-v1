export default function FaqSection() {
  return (
    <section
      id="faq"
      aria-label="Preguntas Frecuentes"
      className="w-full min-h-[50vh] bg-orange-950/70 border-b-2 border-orange-500/40 flex flex-col items-center justify-center p-8 transition-colors"
    >
      <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-orange-900/60 border border-orange-400/30 shadow-lg">
        <span className="w-4 h-4 rounded-full bg-orange-400"></span>
        <span className="text-lg md:text-2xl font-bold tracking-wide uppercase text-orange-200">
          Preguntas Frecuentes (FAQ)
        </span>
      </div>
    </section>
  );
}
