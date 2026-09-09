"use client";

import Link from "next/link";
import { 
  Mail, 
  MapPin, 
  Phone,
  Globe
} from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0c] text-white select-none border-t border-gray-900 overflow-hidden relative">
      
      {/* Decorative Top Line with Gradient Accent */}
      <div className="w-full h-1 bg-gradient-to-r from-[#2b00ff] via-[#F8BF00] to-[#2b00ff]" />

      {/* Main Footer Container */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 pt-16 pb-12">
        
        {/* TOP SECTION: Branding & Contact Info Card */}
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

          {/* Official Contact Info Card */}
          <div className="lg:col-span-7 bg-gradient-to-br from-gray-900/90 via-gray-900/40 to-black border border-gray-800/90 rounded-xs p-6 sm:p-8 flex flex-col justify-center relative overflow-hidden shadow-2xl">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#2b00ff]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col space-y-5">
              <div className="flex items-center gap-2 text-[#F8BF00] font-extrabold text-xs tracking-widest uppercase">
                <Phone className="w-4 h-4" />
                <span>Contacto Directo & Consultas</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white">
                Comunicate con la Organización
              </h3>

              <p className="text-gray-300 text-xs sm:text-sm">
                Atención a expositores, acreditaciones de prensa y consultas generales de la Cámara de Comercio Exterior de Jujuy.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Teléfono 1 */}
                <a
                  href="tel:+543884233539"
                  className="flex items-center gap-3 bg-black/70 hover:bg-gray-900 border border-gray-800 hover:border-[#2b00ff] p-3.5 rounded-xs transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-xs bg-[#2b00ff]/20 flex items-center justify-center text-[#F8BF00] group-hover:bg-[#2b00ff] group-hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Teléfono Oficina</span>
                    <span className="text-xs sm:text-sm font-bold text-white group-hover:text-[#F8BF00] transition-colors">+54 388 4233539</span>
                  </div>
                </a>

                {/* Teléfono 2 */}
                <a
                  href="tel:+543884212955"
                  className="flex items-center gap-3 bg-black/70 hover:bg-gray-900 border border-gray-800 hover:border-[#2b00ff] p-3.5 rounded-xs transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-xs bg-[#2b00ff]/20 flex items-center justify-center text-[#F8BF00] group-hover:bg-[#2b00ff] group-hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Teléfono Alternativo</span>
                    <span className="text-xs sm:text-sm font-bold text-white group-hover:text-[#F8BF00] transition-colors">+54 388 4212955</span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:expojuy2.0@gmail.com"
                  className="sm:col-span-2 flex items-center gap-3 bg-black/70 hover:bg-gray-900 border border-gray-800 hover:border-[#2b00ff] p-3.5 rounded-xs transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-xs bg-[#2b00ff]/20 flex items-center justify-center text-[#F8BF00] group-hover:bg-[#2b00ff] group-hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Correo Electrónico Oficial</span>
                    <span className="text-xs sm:text-sm font-bold text-white group-hover:text-[#F8BF00] transition-colors">expojuy2.0@gmail.com</span>
                  </div>
                </a>
              </div>
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
            <span className="font-semibold text-gray-300 mr-2">Redes Oficiales:</span>
            
            {/* Instagram */}
            <a 
              href="https://www.instagram.com/expojuy/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram Oficial de ExpoJuy" 
              title="Instagram @expojuy"
              className="w-9 h-9 rounded-full bg-gray-900/90 border border-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 hover:border-transparent transition-all duration-300 shadow-md hover:scale-110"
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
              className="w-9 h-9 rounded-full bg-gray-900/90 border border-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#1877F2] hover:border-transparent transition-all duration-300 shadow-md hover:scale-110"
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
              className="w-9 h-9 rounded-full bg-gray-900/90 border border-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#2b00ff] hover:border-transparent transition-all duration-300 shadow-md hover:scale-110"
            >
              <Globe className="w-4 h-4" />
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
