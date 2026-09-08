import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function EntradasPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Navbar />

      <section className="flex-1 min-h-[75vh] bg-teal-950/70 border-y-2 border-teal-500/40 flex flex-col items-center justify-center p-8 text-center gap-6">
        <div className="flex items-center gap-3 px-8 py-4 bg-teal-900/60 border border-teal-400/30 shadow-lg">
          <span className="w-4 h-4 rounded-full bg-teal-400 animate-pulse"></span>
          <h1 className="text-xl md:text-3xl font-bold tracking-wider uppercase text-teal-200">
            Subpágina: Entradas y Acreditaciones
          </h1>
        </div>

        <Link
          href="/"
          className="px-8 py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm uppercase tracking-wider transition-colors shadow-md rounded-none"
        >
          ← Volver al Inicio
        </Link>
      </section>

      <Footer />
    </main>
  );
}
