import Image from 'next/image';
import { Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-dark pt-14 pb-8 text-xs text-slate-400">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16">
        
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="relative h-11 w-44 rounded bg-white/95 px-2 py-1 mb-4 shadow">
              <Image 
                src="/images/expojuy26_horizontal.jpg" 
                alt="ExpoJuy 2026" 
                fill 
                className="object-contain p-1"
              />
            </div>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed mb-4">
              Sitio Web Oficial de la 17° Edición de la Exposición Multisectorial del NOA. Organizada por la Cámara de Comercio Exterior de Jujuy.
            </p>
            <p className="text-brand-aqua text-[11px] font-semibold">
              “Conectando países — creando oportunidades”
            </p>
          </div>

          <div>
            <h5 className="text-white font-bold font-heading mb-3 uppercase tracking-wider text-[11px]">Navegación</h5>
            <ul className="space-y-2">
              <li><a href="#dinamica-dual" className="hover:text-brand-aqua transition-colors">Dinámica Dual</a></li>
              <li><a href="#pilares" className="hover:text-brand-aqua transition-colors">Matriz Productiva</a></li>
              <li><a href="#expositores" className="hover:text-brand-aqua transition-colors">Directorio de Expositores</a></li>
              <li><a href="#agenda" className="hover:text-brand-aqua transition-colors">Agenda de Actividades</a></li>
              <li><a href="#plano" className="hover:text-brand-aqua transition-colors">Plano del Predio</a></li>
              <li><a href="#noticias" className="hover:text-brand-aqua transition-colors">Noticias</a></li>
              <li><a href="#contacto" className="hover:text-brand-aqua transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold font-heading mb-3 uppercase tracking-wider text-[11px]">Canales Oficiales</h5>
            <div className="flex items-center gap-3 mb-4">
              <a href="#" className="w-8 h-8 rounded-lg glass-card flex items-center justify-center text-slate-300 hover:text-brand-aqua border border-white/10" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg glass-card flex items-center justify-center text-slate-300 hover:text-brand-aqua border border-white/10" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg glass-card flex items-center justify-center text-slate-300 hover:text-brand-aqua border border-white/10" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg glass-card flex items-center justify-center text-slate-300 hover:text-brand-aqua border border-white/10" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[11px] text-slate-500">
              San Salvador de Jujuy, República Argentina.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© 2026 Cámara de Comercio Exterior de Jujuy. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            <span>Desafío Digital ExpoJuy 2026</span>
            <span>•</span>
            <span className="text-brand-aqua">Innovación · Talento · Desarrollo</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
