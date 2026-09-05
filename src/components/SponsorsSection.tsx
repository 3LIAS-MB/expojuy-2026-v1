export default function SponsorsSection() {
  const sponsors = [
    "Gobierno de la Provincia de Jujuy",
    "Cámara de Comercio Exterior",
    "ClusteAR Jujuy",
    "Corredor Bioceánico Capricornio"
  ];

  return (
    <section id="sponsors" className="py-16 border-t border-white/5">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16 text-center">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-8">
          Sponsors Oficiales & Alianzas Institucionales
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 opacity-85">
          {sponsors.map((sp, idx) => (
            <div 
              key={idx}
              className="glass-card px-6 py-3 rounded-xl border border-white/10 text-slate-300 font-heading font-bold text-sm hover:text-brand-aqua hover:border-brand-aqua/40 transition-all"
            >
              {sp}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
