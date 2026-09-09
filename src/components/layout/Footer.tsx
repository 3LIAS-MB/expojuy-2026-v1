"use client";

import Link from "next/link";
import { 
  Mail, 
  MapPin, 
  ArrowRight,
  Globe
} from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0c] text-white select-none border-t border-gray-900 overflow-hidden relative">
      
      {/* Decorative Top Line with Gradient Accent */}
      <div className="w-full h-1 bg-gradient-to-r from-[#2b00ff] via-[#F8BF00] to-[#2b00ff]" />

      {/* Main Footer Container */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 pt-16 pb-12">
        
        {/* TOP SECTION: Branding & Newsletter Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-gray-800/80">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 flex flex-col items-start text-left space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-[#2b00ff] flex items-center justify-center font-black text-xl text-white shadow-lg">
                EJ
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tight text-white leading-none">
                  EXPOJUY <span className="text-[#F8BF00]">2026</span>
                </span>
                <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase mt-0.5">
                  SAN SALVADOR DE JUJUY
                </span>
              </div>
            </div>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-md pt-2">
              El evento multisectorial más importante del NOA y la región internacional.
              Punto de encuentro estratégico para la producción, el comercio exterior, la innovación y el turismo.
            </p>

            {/* Quick Contact Chips */}
            <div className="pt-3 flex flex-wrap gap-4 text-xs font-medium text-gray-300">
              <div className="flex items-center gap-2 bg-gray-900/90 border border-gray-800 px-3.5 py-2 rounded-xs">
                <MapPin className="w-4 h-4 text-[#F8BF00]" />
                <span>Predio Ferial Ciudad Cultural, Jujuy</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-900/90 border border-gray-800 px-3.5 py-2 rounded-xs">
                <Globe className="w-4 h-4 text-[#2b00ff]" />
                <span>www.expojuy.com.ar</span>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription Card */}
          <div className="lg:col-span-7 bg-gradient-to-br from-gray-900/90 to-black border border-gray-800/90 rounded-xs p-6 sm:p-8 flex flex-col justify-center relative overflow-hidden shadow-2xl">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#2b00ff]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col space-y-4">
              <div className="flex items-center gap-2 text-[#F8BF00] font-extrabold text-xs tracking-widest uppercase">
                <Mail className="w-4 h-4" />
                <span>Novedades & Agenda Exclusiva</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white">
                Suscribite al Newsletter Oficial de ExpoJuy
              </h3>

              <p className="text-gray-300 text-xs sm:text-sm">
                Recibí las últimas novedades de expositores, acreditaciones de prensa, cronogramas de conferencias y rondas de negocios en tu email.
              </p>

              <form onSubmit={(e) => e.preventDefault()} className="pt-2 flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Tu correo electrónico..."
                  className="flex-1 bg-black/80 border border-gray-800 text-white placeholder-gray-400 px-4 py-3 text-sm rounded-xs focus:outline-none focus:border-[#2b00ff] transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-[#2b00ff] hover:bg-[#1e00ca] text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-xs shadow-md transition-all duration-200 cursor-pointer"
                >
                  <span>SUSCRIBIRME</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* MIDDLE SECTION: 4-Column Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-gray-800/80 text-left">
          
          {/* Col 1: Exposición */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-extrabold text-sm text-[#F8BF00] uppercase tracking-wider">
              Exposición
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Predio Ferial & Plano
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Reserva de Stands 2026
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Catálogo Digital Expositores
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Sectores Productivos & Minería
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Reglamento de Participación
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Negocios & Foro */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-extrabold text-sm text-[#F8BF00] uppercase tracking-wider">
              Negocios & Foros
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Rondas de Negocios Internacionales
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Conferencias & Charlas Técnicas
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Foro de Innovación & Tecnología
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Networking B2B
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Agenda Empresarial
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Visitantes */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-extrabold text-sm text-[#F8BF00] uppercase tracking-wider">
              Visitantes
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Compra de Entradas
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Cómo Llegar & Estacionamiento
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Espectáculos & Shows en Vivo
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Gastronomía & Patio de Foodtrucks
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Hoteles & Turismo en Jujuy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Institucional */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-extrabold text-sm text-[#F8BF00] uppercase tracking-wider">
              Institucional
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Cámara de Comercio Exterior
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Gobierno de la Provincia de Jujuy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Acreditaciones de Prensa
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Centro de Prensa & Media Kit
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Preguntas Frecuentes (FAQ)
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM SECTION: Social Icons, Organizers & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-400">
          
          {/* Social SVG Icons */}
          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-300 mr-2">Seguinos:</span>
            
            {/* Instagram */}
            <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#2b00ff] hover:border-[#2b00ff] transition-all">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#2b00ff] hover:border-[#2b00ff] transition-all">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.592 9 4.415V8z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#2b00ff] hover:border-[#2b00ff] transition-all">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a href="#" aria-label="YouTube" className="w-8 h-8 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#2b00ff] hover:border-[#2b00ff] transition-all">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>

            {/* Twitter / X */}
            <a href="#" aria-label="X (Twitter)" className="w-8 h-8 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#2b00ff] hover:border-[#2b00ff] transition-all">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>

          {/* Copyright & Legal Links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-right">
            <span>
              &copy; {new Date().getFullYear()} EXPOJUY &bull; Cámara de Comercio Exterior de Jujuy. Todos los derechos reservados.
            </span>
            <div className="flex items-center gap-3 text-gray-400">
              <Link href="#" className="hover:text-gray-200 transition-colors">Términos</Link>
              <span>&bull;</span>
              <Link href="#" className="hover:text-gray-200 transition-colors">Privacidad</Link>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
