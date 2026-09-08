'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Ticket } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Bloquear el scroll del fondo cuando el menú móvil está abierto a pantalla completa
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const links = [
    { name: 'INICIO', href: '#hero' },
    { name: 'EL EVENTO', href: '#el-evento' },
    { name: 'EXPOSITORES', href: '#expositores' },
    { name: 'AGENDA', href: '#agenda' },
    { name: 'MAPA DEL PREDIO', href: '#mapa-predio' },
    { name: 'NOTICIAS', href: '#noticias' },
  ];

  return (
    <>
      <header
        id="navbar"
        className="sticky top-0 z-40 w-full h-20 bg-slate-950/85 backdrop-blur-md border-b border-white/10 transition-all duration-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          
          {/* 1. Logotipo a la izquierda */}
          <Link
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Ir al inicio de ExpoJuy 2026"
          >
            <Image
              src="/images/expojuy26_isologotipo.png"
              alt="Logo ExpoJuy 2026"
              width={44}
              height={44}
              className="h-10 w-auto object-contain transition-transform duration-150 group-hover:scale-105"
              priority
            />
          </Link>

          {/* 2. Navegación en escritorio */}
          <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-1 xl:gap-2">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-xs xl:text-sm font-bold tracking-wider uppercase text-slate-200 hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* 3. CTA cuadrado en escritorio */}
          <div className="hidden lg:flex items-center">
            <Link
              href="#entradas"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-none font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-sm"
            >
              <Ticket className="w-4 h-4" />
              <span>Entradas / Acreditaciones</span>
            </Link>
          </div>

          {/* 4. Botón Hamburguesa para móvil */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir menú"
            className="lg:hidden p-2 text-slate-200 hover:text-white focus:outline-none"
          >
            <Menu className="w-7 h-7" />
          </button>

        </div>
      </header>

      {/* Menú Móvil Fullscreen (Pantalla Completa) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-slate-950 flex flex-col justify-between animate-fade-in">
          
          {/* Barra superior dentro del menú móvil */}
          <div className="h-20 px-4 sm:px-6 flex items-center justify-between border-b border-white/10">
            <Link
              href="#hero"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3"
            >
              <Image
                src="/images/expojuy26_isologotipo.png"
                alt="Logo ExpoJuy 2026"
                width={44}
                height={44}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>
            
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar menú"
              className="p-2 text-slate-200 hover:text-white focus:outline-none"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Enlaces centrados y limpios */}
          <nav aria-label="Navegación móvil a pantalla completa" className="px-6 py-8 flex flex-col justify-center my-auto space-y-1">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-3.5 text-lg sm:text-xl font-bold tracking-widest uppercase text-slate-200 hover:text-cyan-400 border-b border-white/5 transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-slate-600 text-sm">→</span>
              </Link>
            ))}
          </nav>

          {/* Pie del menú móvil con CTA */}
          <div className="px-6 pb-10 pt-4 border-t border-white/10 flex flex-col gap-4">
            <Link
              href="#entradas"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2.5 w-full py-4 rounded-none font-bold text-sm uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-lg"
            >
              <Ticket className="w-4 h-4" />
              <span>Entradas / Acreditaciones</span>
            </Link>

            <p className="text-center text-[11px] uppercase tracking-widest text-slate-500 font-semibold">
              ExpoJuy 2026 · 17° Edición
            </p>
          </div>

        </div>
      )}
    </>
  );
}
