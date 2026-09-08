import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ExpositoresPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Navbar />

      <section className="flex-1 min-h-[75vh] bg-purple-950/70 border-y-2 border-purple-500/40 flex flex-col items-center justify-center p-8 text-center gap-6">
        <div className="flex items-center gap-3 px-8 py-4 bg-purple-900/60 border border-purple-400/30 shadow-lg">
          <span className="w-4 h-4 rounded-full bg-purple-400 animate-pulse"></span>
          <h1 className="text-xl md:text-3xl font-bold tracking-wider uppercase text-purple-200">
            Subpágina: Directorio y Catálogo de Expositores
          </h1>
        </div>

        <Link
          href="/"
          className="px-8 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm uppercase tracking-wider transition-colors shadow-md rounded-none"
        >
          ← Volver al Inicio
        </Link>
      </section>

      <Footer />
    </main>
  );
}
