'use client';

import Image from 'next/image';
import { ArrowRight, Award, Globe2, Building2 } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="sobre-nosotros" className="relative w-full min-h-screen flex flex-col justify-center bg-[#070D1E] py-12 lg:py-20 overflow-hidden">
      {/* Contenedor a 100% ancho de pantalla edge-to-edge */}
      <div className="w-full px-0 sm:px-4 lg:px-8 max-w-[1920px] mx-auto">
        <div className="relative grid lg:grid-cols-12 rounded-none sm:rounded-2xl overflow-hidden shadow-2xl bg-[#6D28D9]">
          
          {/* Columna Izquierda: Fotografía de la ExpoJuy + Mosaico de Bloques Pixelados */}
          <div className="lg:col-span-6 relative min-h-[380px] sm:min-h-[450px] lg:min-h-[560px] overflow-hidden bg-slate-900">
            {/* Imagen Fotográfica Oficial de ExpoJuy */}
            <Image
              src="/images/4c13475b-322b-4097-a0d0.jpg"
              alt="Autoridades y Organización ExpoJuy 2026"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
              priority
            />

            {/* Overlay Gradiente Suave para Integración */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none"></div>

            {/* Mosaico Pixelado / Stepped Grid Overlay (Patrón de bloques sólidos que conectan con la columna derecha) */}
            <div className="hidden sm:grid absolute inset-0 grid-cols-6 grid-rows-6 pointer-events-none">
              {/* Fila 1 */}
              <div className="col-start-4 row-start-1 bg-[#6D28D9]"></div>
              <div className="col-start-5 row-start-1 bg-[#6D28D9]"></div>
              <div className="col-start-6 row-start-1 bg-[#6D28D9]"></div>

              {/* Fila 2 */}
              <div className="col-start-5 row-start-2 bg-[#6D28D9]"></div>
              <div className="col-start-6 row-start-2 bg-[#6D28D9]"></div>

              {/* Fila 3 */}
              <div className="col-start-3 row-start-3 bg-[#6D28D9]"></div>
              <div className="col-start-4 row-start-3 bg-[#6D28D9]"></div>
              <div className="col-start-6 row-start-3 bg-[#6D28D9]"></div>

              {/* Fila 4 */}
              <div className="col-start-2 row-start-4 bg-[#6D28D9]"></div>
              <div className="col-start-3 row-start-4 bg-[#6D28D9]"></div>
              <div className="col-start-6 row-start-4 bg-[#6D28D9]"></div>

              {/* Fila 5 */}
              <div className="col-start-4 row-start-5 bg-[#6D28D9]"></div>
              <div className="col-start-5 row-start-5 bg-[#6D28D9]"></div>
              <div className="col-start-6 row-start-5 bg-[#6D28D9]"></div>

              {/* Fila 6 */}
              <div className="col-start-6 row-start-6 bg-[#6D28D9]"></div>
            </div>
          </div>

          {/* Columna Derecha: Bloque de Texto e Información Institucional en Morado Intenso */}
          <div className="lg:col-span-6 bg-[#6D28D9] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative z-10">
            
            {/* Tag Superior */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-amber-400 text-slate-950 font-heading font-extrabold text-xs uppercase tracking-widest self-start mb-6 shadow-md">
              <Award className="w-3.5 h-3.5" />
              <span>17° Edición · Más de 30 Años de Historia</span>
            </div>

            {/* Título Principal */}
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight leading-tight mb-6 text-white">
              ¡Impulsando el Desarrollo y la Innovación!
            </h2>

            {/* Párrafos Descriptivos */}
            <div className="space-y-4 text-purple-100 text-sm sm:text-base leading-relaxed font-sans font-medium mb-8">
              <p>
                Durante más de tres décadas, ExpoJuy se ha consolidado como el evento multisectorial más trascendente del Noroeste Argentino. Un punto de convergencia donde la producción, la tecnología y la cultura de la provincia se proyectan al mundo.
              </p>
              <p>
                Un espacio vibrante de integración regional que une al sector público y privado, visibilizando las oportunidades estratégicas en Litio, Energía Solar, Agroindustria, Logística y Economía del Conocimiento.
              </p>
              <p className="hidden sm:block">
                Conectamos países, fortalecemos el Corredor Bioceánico y creamos alianzas comerciales duraderas para impulsar el futuro de Jujuy.
              </p>
            </div>

            {/* Indicadores Clave en Grid de 3 */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-purple-400/30 mb-8">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white">30+</div>
                <div className="text-xs text-purple-200 uppercase font-heading tracking-wider mt-1">Años de Historia</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white">100%</div>
                <div className="text-xs text-purple-200 uppercase font-heading tracking-wider mt-1">Potencial Jujeño</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white">ZICOVER</div>
                <div className="text-xs text-purple-200 uppercase font-heading tracking-wider mt-1">Integración Global</div>
              </div>
            </div>

            {/* Botón CTA Blanco Rectangular */}
            <div>
              <a
                href="#agenda"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-950 font-heading font-bold text-xs sm:text-sm uppercase tracking-wider rounded-sm hover:bg-slate-100 hover:shadow-2xl transition-all group"
              >
                <span>Explorar Nuestra Historia</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-slate-900" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
