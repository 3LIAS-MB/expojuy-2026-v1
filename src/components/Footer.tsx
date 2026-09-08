export default function Footer() {
  return (
    <footer
      id="footer"
      aria-label="Pie de página institucional"
      className="w-full min-h-[30vh] bg-zinc-950 border-t-2 border-zinc-700 flex flex-col items-center justify-center p-8 transition-colors"
    >
      <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-zinc-900 border border-zinc-700 shadow-lg">
        <span className="w-4 h-4 rounded-full bg-zinc-400"></span>
        <span className="text-lg md:text-2xl font-bold tracking-wide uppercase text-zinc-300">
          Footer / Pie de Página
        </span>
      </div>
    </footer>
  );
}
