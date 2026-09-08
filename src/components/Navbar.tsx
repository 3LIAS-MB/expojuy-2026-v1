'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Inicio', href: '#hero' },
    { name: 'El Evento', href: '#el-evento' },
    { name: 'Expositores', href: '#expositores' },
    { name: 'Agenda', href: '#agenda' },
    { name: 'Mapa del Predio', href: '#mapa-predio' },
    { name: 'Noticias', href: '#noticias' },
  ];

  return (
    <header id="navbar" className="w-full px-6 py-4 relative z-50">
      <div className="flex items-center justify-between">
        
        {/* 1. Logotipo a la izquierda */}
        <Link href="#hero" className="flex items-center">
          <Image
            src="/images/expojuy26_isologotipo.png"
            alt="Logo ExpoJuy 2026"
            width={40}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* 2. Navegación en escritorio */}
        <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {links.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:opacity-80">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 3. CTA en escritorio */}
        <div className="hidden lg:block">
          <Link href="#entradas" className="hover:opacity-80 font-medium">
            Entradas / Acreditaciones
          </Link>
        </div>

        {/* 4. Botón Hamburguesa para móvil */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          className="lg:hidden p-2 text-white hover:opacity-80 focus:outline-none"
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>

      </div>

      {/* Menú desplegable móvil */}
      {isOpen && (
        <nav
          aria-label="Navegación móvil"
          className="lg:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-4"
        >
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-1 hover:opacity-80 text-base"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-2 border-t border-white/10">
            <Link
              href="#entradas"
              onClick={() => setIsOpen(false)}
              className="block py-2 font-semibold hover:opacity-80"
            >
              Entradas / Acreditaciones
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
