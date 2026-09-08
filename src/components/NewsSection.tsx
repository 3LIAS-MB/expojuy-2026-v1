export default function NewsSection() {
  return (
    <section
      id="noticias"
      aria-label="Noticias y Sala de Prensa"
      className="w-full min-h-[55vh] bg-rose-950/70 border-b-2 border-rose-500/40 flex flex-col items-center justify-center p-8 transition-colors"
    >
      <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-rose-900/60 border border-rose-400/30 shadow-lg">
        <span className="w-4 h-4 rounded-full bg-rose-400"></span>
        <span className="text-lg md:text-2xl font-bold tracking-wide uppercase text-rose-200">
          Noticias y Sala de Prensa
        </span>
      </div>
    </section>
  );
}
