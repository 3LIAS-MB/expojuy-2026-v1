import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function MapaPredioPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Navbar />

      <section className="flex-1 min-h-[75vh] bg-cyan-950/70 border-y-2 border-cyan-500/40 flex flex-col items-center justify-center p-8 text-center gap-6">
        <div className="flex items-center gap-3 px-8 py-4 bg-cyan-900/60 border border-cyan-400/30 shadow-lg">
          <span className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse"></span>
          <h1 className="text-xl md:text-3xl font-bold tracking-wider uppercase text-cyan-200">
            Subpágina: Mapa Interactivo del Predio
          </h1>
        </div>

        <Link
          href="/"
          className="px-8 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-sm uppercase tracking-wider transition-colors shadow-md rounded-none"
        >
          ← Volver al Inicio
        </Link>
      </section>

      <Footer />
    </main>
  );
}
