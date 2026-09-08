import Link from 'next/link';

export default function ContactSection() {
  return (
    <section
      id="contacto"
      aria-label="Contacto y Cómo Llegar"
      className="w-full min-h-[55vh] bg-sky-950/70 border-b-2 border-sky-500/40 flex flex-col items-center justify-center p-8 text-center gap-6"
    >
      <div className="flex items-center gap-3 px-6 py-3 rounded-none bg-sky-900/60 border border-sky-400/30 shadow-lg">
        <span className="w-4 h-4 rounded-full bg-sky-400"></span>
        <span className="text-lg md:text-2xl font-bold tracking-wide uppercase text-sky-200">
          Contacto y Cómo Llegar
        </span>
      </div>

      <Link
        href="/contacto"
        className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm uppercase tracking-wider transition-colors shadow-md rounded-none"
      >
        Ver Mapa de Accesos y Canales de Contacto →
      </Link>
    </section>
  );
}
