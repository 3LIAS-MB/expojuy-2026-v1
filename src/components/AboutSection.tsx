import Image from 'next/image';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section
      id="el-evento"
      aria-label="Sobre ExpoJuy 2026"
      className="w-full bg-[#13071f] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-stretch justify-center gap-6 lg:gap-8">
        
        {/* Columna Izquierda: Fotografía vertical de gran impacto y presencia */}
        <div className="w-full lg:w-[42%] min-h-[320px] sm:min-h-[400px] lg:min-h-[480px] relative overflow-hidden shadow-2xl">
          <Image
            src="/images/about-feature.webp"
            alt="Identidad y cultura en ExpoJuy"
            fill
            priority
            className="object-cover object-top"
          />
          {/* Tinte violeta artístico emulando la referencia */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#13071f]/80 via-transparent to-transparent" />
        </div>

        {/* Columna Derecha: Tarjeta blanca limpia, concisa y con métricas */}
        <div className="w-full lg:w-[58%] bg-[#F8FAFC] text-slate-800 p-8 sm:p-12 flex flex-col items-center justify-between text-center shadow-2xl">
          
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#230b38] tracking-tight mb-3">
              Sobre ExpoJuy
            </h2>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-cyan-600 mb-6">
              17° Edición · Ciudad Cultural
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg mx-auto mb-8 font-normal">
              La muestra multisectorial líder del Norte Argentino. El punto de encuentro que conecta la minería, la agroindustria, la energía limpia y la tecnología con los mercados internacionales.
            </p>
          </div>

          {/* 3 Cifras de impacto que reemplazan el texto denso */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-lg my-4 py-4 border-y border-slate-200">
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-black text-[#230b38] tracking-tight">180+</span>
              <span className="text-[10px] sm:text-xs uppercase font-bold text-slate-500 tracking-wider">Expositores</span>
            </div>

            <div className="flex flex-col items-center border-x border-slate-200 px-2 sm:px-4">
              <span className="text-2xl sm:text-3xl font-black text-cyan-600 tracking-tight">15.000</span>
              <span className="text-[10px] sm:text-xs uppercase font-bold text-slate-500 tracking-wider">m² de Predio</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-black text-[#230b38] tracking-tight">4 Días</span>
              <span className="text-[10px] sm:text-xs uppercase font-bold text-slate-500 tracking-wider">de Negocios</span>
            </div>
          </div>

          {/* Botón rectangular sólido */}
          <div className="pt-4">
            <Link
              href="/el-evento"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-none font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-[#230b38] hover:bg-[#3d145e] transition-colors shadow-md"
            >
              Conocer Más Sobre el Evento →
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
