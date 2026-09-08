export default function AboutSection() {
  return (
    <section
      id="el-evento"
      aria-label="El Evento - Sobre ExpoJuy 2026"
      className="w-full min-h-[55vh] bg-blue-950/70 border-b-2 border-blue-500/40 flex flex-col items-center justify-center p-8 transition-colors"
    >
      <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-blue-900/60 border border-blue-400/30 shadow-lg">
        <span className="w-4 h-4 rounded-full bg-blue-400"></span>
        <span className="text-lg md:text-2xl font-bold tracking-wide uppercase text-blue-200">
          Sobre ExpoJuy (El Evento)
        </span>
      </div>
    </section>
  );
}
