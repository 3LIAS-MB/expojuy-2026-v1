export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Inicio"
      className="w-full min-h-[75vh] bg-indigo-950/70 border-b-2 border-indigo-500/40 flex flex-col items-center justify-center p-8 transition-colors"
    >
      <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-indigo-900/60 border border-indigo-400/30 shadow-lg">
        <span className="w-4 h-4 rounded-full bg-indigo-400 animate-pulse"></span>
        <span className="text-lg md:text-2xl font-bold tracking-wide uppercase text-indigo-200">
          Hero / Inicio
        </span>
      </div>
    </section>
  );
}
