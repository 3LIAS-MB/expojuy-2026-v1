import Image from 'next/image';
import { Award } from 'lucide-react';

export default function InstitutionalSection() {
  return (
    <section id="sobre-expojuy" className="min-h-screen flex flex-col justify-center py-20 relative bg-brand-surface/40 border-t border-white/5">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16">
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-violet/20 border border-brand-violet/30 text-brand-lavender text-xs font-semibold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5 text-brand-aqua" />
              Trayectoria y Liderazgo Regional
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mb-6">
              17 Ediciones Construyendo el <span className="gradient-text">Futuro del NOA</span>
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              La <strong>ExpoJuy</strong> es la muestra multisectorial más trascendente del Noroeste Argentino. Desde su primera edición, organizada por la <strong>Cámara de Comercio Exterior de Jujuy</strong>, ha sido la vidriera principal de la producción, el comercio y el trabajo jujeño ante el país y el mundo.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Para 2026, junto al <strong>Ministerio de Desarrollo Económico y Producción</strong> y la <strong>Cámara de Empresas TICs (ClusteAR)</strong>, la feria evoluciona hacia una plataforma hiperconectada que combina la riqueza mineral y agropecuaria tradicional con la innovación de la economía del conocimiento.
            </p>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="glass-card rounded-xl p-3 border border-white/5">
                <span className="block text-2xl font-extrabold font-heading text-brand-aqua">180+</span>
                <span className="text-[11px] text-slate-400 font-medium">Expositores</span>
              </div>
              <div className="glass-card rounded-xl p-3 border border-white/5">
                <span className="block text-2xl font-extrabold font-heading text-brand-lavender">4 Días</span>
                <span className="text-[11px] text-slate-400 font-medium">Intensivos</span>
              </div>
              <div className="glass-card rounded-xl p-3 border border-white/5">
                <span className="block text-2xl font-extrabold font-heading text-white">6 Países</span>
                <span className="text-[11px] text-slate-400 font-medium">Del Corredor</span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-8 border border-white/10 relative text-center">
            <div className="relative h-36 w-48 mx-auto rounded-xl bg-white/95 p-3 shadow-xl mb-6">
              <Image 
                src="/images/expojuy26.jpg" 
                alt="ExpoJuy 2026 Logo Emblema" 
                fill
                className="object-contain p-2"
              />
            </div>
            <h3 className="text-xl font-bold font-heading text-white mb-2">Cámara de Comercio Exterior de Jujuy</h3>
            <p className="text-slate-400 text-xs max-w-md mx-auto leading-relaxed mb-6">
              Institución rectora del certamen y garante de la vinculación comercial del sector privado provincial con los mercados de América Latina, Asia y Europa.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs font-semibold text-brand-aqua">
              <span>• San Salvador de Jujuy</span>
              <span>• Edición 2026</span>
              <span>• Conectividad Global</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
