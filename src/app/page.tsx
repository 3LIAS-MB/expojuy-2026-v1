import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <div className="flex flex-col items-center justify-center p-16 text-center">
        <h1 className="text-4xl font-bold mb-4">ExpoJuy 2026</h1>
        <p className="text-gray-600 text-lg">Conectando Países - Creando Oportunidades</p>
      </div>
    </main>
  );
}
