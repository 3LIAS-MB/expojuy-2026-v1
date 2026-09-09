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
      {/* Subtle Top Accent Line with Brand Gradient */}
      <div className="w-full h-1 bg-gradient-to-r from-[#6424dc] via-[#19b9ca] to-[#7f08d5]" />

      {/* Main Container */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 pt-14 pb-10">
        
        {/* TOP ROW: ExpoJuy Brand Info & Cámara de Comercio Exterior Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: ExpoJuy Brand Info (5 cols) */}
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
                  EXPOJUY <span className="text-[#19b9ca]">2026</span>
                </span>
                <span className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase mt-1">
                  SAN SALVADOR DE JUJUY
                </span>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              Muestra Multisectorial del NOA y punto de encuentro estratégico para la producción, el comercio exterior, la innovación y el turismo.
            </p>

            <div className="flex items-start gap-2.5 text-xs text-gray-400 pt-1">
              <MapPin className="w-4 h-4 text-[#19b9ca] shrink-0 mt-0.5" />
              <span>Predio Ferial Ciudad Cultural, San Salvador de Jujuy, Argentina</span>
            </div>
          </div>

          {/* Col 2: Cámara de Comercio Exterior de Jujuy (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
            
            {/* Header con Logo oficial de la Cámara */}
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-28 shrink-0 bg-white/10 rounded p-1.5 flex items-center justify-center">
                <Image
                  src="/images/brand/logo-camcomext.png"
                  alt="Cámara de Comercio Exterior de Jujuy Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#6424dc]">
                  Organización Oficial
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                  CÁMARA DE COMERCIO EXTERIOR DE JUJUY
                </h3>
              </div>
            </div>

            {/* Datos de contacto de la Cámara */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-1 text-xs">
              
              {/* Sede / Dirección */}
              <div className="flex flex-col space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#19b9ca]" />
                  Sede Central
                </span>
                <span className="text-gray-200 font-medium">
                  Belgrano 860 - 2° Piso
                </span>
                <span className="text-gray-400 text-[11px]">
                  San Salvador de Jujuy
                </span>
              </div>

              {/* Teléfonos */}
              <div className="flex flex-col space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#19b9ca]" />
                  Teléfonos de Contacto
                </span>
                <div className="flex flex-col space-y-0.5">
                  <a href="tel:+543884233539" className="text-white hover:text-[#19b9ca] font-semibold transition-colors">
                    388 4233539
                  </a>
                  <a href="tel:+543884212955" className="text-white hover:text-[#19b9ca] font-semibold transition-colors">
                    388 4212955
                  </a>
                </div>
              </div>

              {/* Email & Web */}
              <div className="flex flex-col space-y-1 sm:col-span-2 lg:col-span-1">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#6424dc]" />
                  Contacto & Web
                </span>
                <a 
                  href="mailto:camaradecomercioexterior@gmail.com" 
                  className="text-white hover:text-[#6424dc] font-medium transition-colors truncate"
                  title="camaradecomercioexterior@gmail.com"
                >
                  camaradecomercioexterior@gmail.com
                </a>
                <a 
                  href="https://www.camcomexjujuy.com.ar" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#19b9ca] hover:underline font-semibold flex items-center gap-1 pt-0.5"
                >
                  www.camcomexjujuy.com.ar
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

            </div>

          </div>

        </div>

        {/* MIDDLE ROW: Navigation Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-10 border-b border-white/10 text-left">
          
          {/* Col 1: Exposición */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-extrabold text-xs text-gray-400 uppercase tracking-wider">
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
            </ul>
          </div>

          {/* Col 2: Sectores */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-extrabold text-xs text-gray-400 uppercase tracking-wider">
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
            <h4 className="font-extrabold text-xs text-gray-400 uppercase tracking-wider">
              Participación
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <a href="#expositores" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  Reserva de Stands
                  <ArrowUpRight className="w-3 h-3 text-[#19b9ca]" />
                </a>
              </li>
              <li>
                <a href="mailto:camaradecomercioexterior@gmail.com" className="hover:text-white transition-colors">
                  Acreditaciones de Prensa
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Institucional */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-extrabold text-xs text-gray-400 uppercase tracking-wider">
              Institucional
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <a href="https://www.camcomexjujuy.com.ar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1">
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
              href="https://www.camcomexjujuy.com.ar" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Sitio Web Oficial Cámara de Comercio Exterior" 
              title="www.camcomexjujuy.com.ar"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#6424dc] hover:border-transparent transition-all shadow-md hover:scale-105"
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
