"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Mail, 
  MapPin, 
  Phone,
  Globe,
  ArrowUpRight
} from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#070914] text-white border-t border-white/10 overflow-hidden relative">
      {/* Decorative Top Accent Line */}
      <div className="w-full h-1 bg-gradient-to-r from-[#2b00ff] via-[#F8BF00] to-[#2b00ff]" />

      {/* Main Container */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 pt-14 pb-10">
        
        {/* TOP ROW: Brand + Contact Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 shrink-0">
                <Image
                  src="/images/logo/expojuy26_isologotipo.png"
                  alt="ExpoJuy 2026 Isologotipo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tight text-white leading-none">
                  EXPOJUY <span className="text-[#F8BF00]">2026</span>
                </span>
                <span className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase mt-0.5">
                  SAN SALVADOR DE JUJUY
                </span>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              Muestra Multisectorial del NOA y punto de encuentro estratégico para la producción, el comercio exterior, la innovación y el turismo.
            </p>

            <div className="flex items-center gap-2 text-xs text-gray-400">
              <MapPin className="w-4 h-4 text-[#F8BF00] shrink-0" />
              <span>Predio Ferial Ciudad Cultural, San Salvador de Jujuy</span>
            </div>
          </div>

          {/* Contact Box (7 cols) - Balanced & Compact */}
          <div className="lg:col-span-7 bg-white/[0.03] border border-white/10 rounded-lg p-5 sm:p-6 flex flex-col justify-center space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#F8BF00] font-extrabold text-xs tracking-wider uppercase">
                <Phone className="w-4 h-4" />
                <span>Organización & Consultas</span>
              </div>
              <span className="text-[11px] text-gray-400 font-medium hidden sm:inline">
                Cámara de Comercio Exterior de Jujuy
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {/* Teléfono 1 */}
              <a
                href="tel:+543884233539"
                className="flex items-center gap-2.5 bg-black/40 hover:bg-[#2b00ff]/20 border border-white/10 hover:border-[#2b00ff] p-3 rounded transition-all group"
              >
                <Phone className="w-4 h-4 text-[#F8BF00] group-hover:scale-110 transition-transform shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Tel. Oficina</span>
                  <span className="text-xs font-bold text-white group-hover:text-[#F8BF00] transition-colors truncate">+54 388 4233539</span>
                </div>
              </a>

              {/* Teléfono 2 */}
              <a
                href="tel:+543884212955"
                className="flex items-center gap-2.5 bg-black/40 hover:bg-[#2b00ff]/20 border border-white/10 hover:border-[#2b00ff] p-3 rounded transition-all group"
              >
                <Phone className="w-4 h-4 text-[#F8BF00] group-hover:scale-110 transition-transform shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Tel. Alternativo</span>
                  <span className="text-xs font-bold text-white group-hover:text-[#F8BF00] transition-colors truncate">+54 388 4212955</span>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:expojuy2.0@gmail.com"
                className="flex items-center gap-2.5 bg-black/40 hover:bg-[#2b00ff]/20 border border-white/10 hover:border-[#2b00ff] p-3 rounded transition-all group"
              >
                <Mail className="w-4 h-4 text-[#2b00ff] group-hover:scale-110 transition-transform shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Email Oficial</span>
                  <span className="text-xs font-bold text-white group-hover:text-[#F8BF00] transition-colors truncate">expojuy2.0@gmail.com</span>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* MIDDLE ROW: Useful Navigation Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-10 border-b border-white/10 text-left">
          
          {/* Col 1: Exposición */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-extrabold text-xs text-[#F8BF00] uppercase tracking-wider">
              Exposición
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">
                  Inicio del Sitio
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">
                  Sobre ExpoJuy 2026
                </a>
              </li>
              <li>
                <a href="#expositores" className="hover:text-white transition-colors">
                  Directorio de Expositores
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Preguntas Frecuentes (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Ejes Estratégicos */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-extrabold text-xs text-[#F8BF00] uppercase tracking-wider">
              Sectores
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">
                  Industria & Minería
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">
                  Innovación & Tecnología
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">
                  Corredor Bioceánico
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Participación */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-extrabold text-xs text-[#F8BF00] uppercase tracking-wider">
              Participación
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <a href="#expositores" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  Reserva de Stands
                  <ArrowUpRight className="w-3 h-3 text-[#F8BF00]" />
                </a>
              </li>
              <li>
                <a href="mailto:expojuy2.0@gmail.com" className="hover:text-white transition-colors">
                  Acreditaciones de Prensa
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Institucional */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-extrabold text-xs text-[#F8BF00] uppercase tracking-wider">
              Institucional
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <a href="https://expojuy.com.ar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  Cámara de Comercio Exterior
                  <ArrowUpRight className="w-3 h-3 text-gray-400" />
                </a>
              </li>
              <li>
                <a href="https://expojuy.com.ar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Portal Oficial expojuy.com.ar
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM ROW: Social Links & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-gray-400">
          
          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-300 mr-1">Redes Oficiales:</span>
            
            {/* Instagram */}
            <a 
              href="https://www.instagram.com/expojuy/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram Oficial de ExpoJuy" 
              title="Instagram @expojuy"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 hover:border-transparent transition-all shadow-md hover:scale-105"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a 
              href="https://www.facebook.com/expojuy?locale=es_LA" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook Oficial de ExpoJuy" 
              title="Facebook @expojuy"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#1877F2] hover:border-transparent transition-all shadow-md hover:scale-105"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.592 9 4.415V8z"/>
              </svg>
            </a>

            {/* Website Oficial */}
            <a 
              href="https://expojuy.com.ar" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Sitio Web Oficial ExpoJuy" 
              title="www.expojuy.com.ar"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#2b00ff] hover:border-transparent transition-all shadow-md hover:scale-105"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>

          <p className="text-center sm:text-right">
            &copy; {new Date().getFullYear()} EXPOJUY &bull; Cámara de Comercio Exterior de Jujuy. Todos los derechos reservados.
          </p>

        </div>

      </div>
    </footer>
  );
}
