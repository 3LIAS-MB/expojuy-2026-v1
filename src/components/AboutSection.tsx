import Image from 'next/image';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section
      id="el-evento"
      aria-label="Sobre ExpoJuy 2026"
      className="w-full bg-[#13071f] py-12 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-stretch justify-center shadow-2xl overflow-hidden rounded-none">
        
        {/* Columna Izquierda: Fotografía con encuadre superior en móvil para mostrar a la protagonista */}
        <div className="w-full lg:w-[45%] h-64 sm:h-80 lg:h-auto min-h-[250px] lg:min-h-[460px] relative overflow-hidden bg-slate-950">
          <Image
            src="/images/about-feature.webp"
            alt="Identidad y cultura en ExpoJuy"
            fill
            priority
            className="object-cover object-top"
          />
          {/* Tinte degradado inferior sutil en móvil */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#13071f]/80 via-transparent to-transparent lg:hidden" />
        </div>

        {/* Columna Derecha: Tarjeta blanca unificada con texto limpio y botón en 1 línea */}
        <div className="w-full lg:w-[55%] bg-[#F8FAFC] text-slate-800 p-6 sm:p-10 lg:p-14 flex flex-col items-center justify-between text-center">
          
          <div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#230b38] tracking-tight mb-2 sm:mb-3">
              Sobre ExpoJuy
            </h2>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-cyan-600 mb-4 sm:mb-6">
              17° Edición · Ciudad Cultural
            </p>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-lg mx-auto mb-6 sm:mb-8 font-normal">
              La muestra multisectorial líder del Norte Argentino. El punto de encuentro que conecta la minería, la agroindustria, la energía limpia y la tecnología con los mercados internacionales.
            </p>
          </div>

          {/* 3 Cifras de impacto con etiquetas en 1 sola línea */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-lg my-3 sm:my-4 py-3 sm:py-4 border-y border-slate-200">
            <div className="flex flex-col items-center">
              <span className="text-xl sm:text-3xl font-black text-[#230b38] tracking-tight">180+</span>
              <span className="text-[10px] sm:text-xs uppercase font-bold text-slate-500 tracking-wider">Expositores</span>
            </div>

            <div className="flex flex-col items-center border-x border-slate-200 px-2 sm:px-4">
              <span className="text-xl sm:text-3xl font-black text-cyan-600 tracking-tight">15.000</span>
              <span className="text-[10px] sm:text-xs uppercase font-bold text-slate-500 tracking-wider">m² Predio</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-xl sm:text-3xl font-black text-[#230b38] tracking-tight">4 Días</span>
              <span className="text-[10px] sm:text-xs uppercase font-bold text-slate-500 tracking-wider">Negocios</span>
            </div>
          </div>

          {/* Botón en una sola línea horizontal sin quiebres */}
          <div className="pt-3 sm:pt-4 w-full sm:w-auto">
            <Link
              href="/el-evento"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-none font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-[#230b38] hover:bg-[#3d145e] transition-colors shadow-md whitespace-nowrap"
            >
              Conocer Más →
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
