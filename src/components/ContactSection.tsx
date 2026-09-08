export default function ContactSection() {
  return (
    <section
      id="contacto"
      aria-label="Contacto y Cómo Llegar"
      className="w-full min-h-[55vh] bg-sky-950/70 border-b-2 border-sky-500/40 flex flex-col items-center justify-center p-8 transition-colors"
    >
      <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-sky-900/60 border border-sky-400/30 shadow-lg">
        <span className="w-4 h-4 rounded-full bg-sky-400"></span>
        <span className="text-lg md:text-2xl font-bold tracking-wide uppercase text-sky-200">
          Contacto y Cómo Llegar
        </span>
      </div>
    </section>
  );
}
