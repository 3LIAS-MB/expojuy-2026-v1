export default function Navbar() {
  return (
    <header id="navbar" className="sticky top-0 z-50 w-full h-20 bg-slate-900/90 backdrop-blur border-b-2 border-slate-700 flex items-center justify-center px-4">
      <nav aria-label="Barra de navegación principal" className="flex items-center gap-3">
        <span className="w-3.5 h-3.5 rounded-full bg-slate-400"></span>
        <span className="text-sm md:text-base font-bold tracking-wider uppercase text-slate-200">
          Navbar
        </span>
      </nav>
    </header>
  );
}
