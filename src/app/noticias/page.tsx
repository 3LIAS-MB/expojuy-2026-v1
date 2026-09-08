import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function NoticiasPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Navbar />

      <section className="flex-1 min-h-[75vh] bg-rose-950/70 border-y-2 border-rose-500/40 flex flex-col items-center justify-center p-8 text-center gap-6">
        <div className="flex items-center gap-3 px-8 py-4 bg-rose-900/60 border border-rose-400/30 shadow-lg">
          <span className="w-4 h-4 rounded-full bg-rose-400 animate-pulse"></span>
          <h1 className="text-xl md:text-3xl font-bold tracking-wider uppercase text-rose-200">
            Subpágina: Noticias y Sala de Prensa
          </h1>
        </div>

        <Link
          href="/"
          className="px-8 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm uppercase tracking-wider transition-colors shadow-md rounded-none"
        >
          ← Volver al Inicio
        </Link>
      </section>

      <Footer />
    </main>
  );
}
