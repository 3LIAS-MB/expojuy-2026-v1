import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ElEventoPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Navbar />

      <section className="flex-1 min-h-[75vh] bg-blue-950/70 border-y-2 border-blue-500/40 flex flex-col items-center justify-center p-8 text-center gap-6">
        <div className="flex items-center gap-3 px-8 py-4 bg-blue-900/60 border border-blue-400/30 shadow-lg">
          <span className="w-4 h-4 rounded-full bg-blue-400 animate-pulse"></span>
          <h1 className="text-xl md:text-3xl font-bold tracking-wider uppercase text-blue-200">
            Subpágina: El Evento (Sobre ExpoJuy 2026)
          </h1>
        </div>

        <Link
          href="/"
          className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm uppercase tracking-wider transition-colors shadow-md rounded-none"
        >
          ← Volver al Inicio
        </Link>
      </section>

      <Footer />
    </main>
  );
}
