export default function SponsorsSection() {
  return (
    <section
      id="sponsors"
      aria-label="Sponsors y Patrocinadores"
      className="w-full min-h-[40vh] bg-teal-950/70 border-b-2 border-teal-500/40 flex flex-col items-center justify-center p-8 transition-colors"
    >
      <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-teal-900/60 border border-teal-400/30 shadow-lg">
        <span className="w-4 h-4 rounded-full bg-teal-400"></span>
        <span className="text-lg md:text-2xl font-bold tracking-wide uppercase text-teal-200">
          Sponsors y Patrocinadores
        </span>
      </div>
    </section>
  );
}
