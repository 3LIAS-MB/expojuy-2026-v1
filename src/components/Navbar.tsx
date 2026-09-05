'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, QrCode, Clock } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const target = new Date('2026-10-09T09:00:00-03:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft({
          days: String(d).padStart(2, '0'),
          hours: String(h).padStart(2, '0'),
          minutes: String(m).padStart(2, '0'),
          seconds: String(s).padStart(2, '0'),
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* Logo Oficial Transparente PNG */}
          <a href="#inicio" className="flex items-center gap-3 group">
            <div className="relative h-12 w-48 transition-transform group-hover:scale-105">
              <Image
                src="/images/expojuy26_horizontal.png"
                alt="ExpoJuy 2026"
                fill
                className="object-contain"
                priority
              />
            </div>
          </a>

          {/* Menú Desktop */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300 font-heading">
            <a href="#inicio" className="hover:text-brand-aqua transition-colors">Inicio</a>
            <a href="#dinamica-dual" className="hover:text-brand-aqua transition-colors flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-aqua animate-pulse"></span>
              Dinámica Dual
            </a>
            <a href="#pilares" className="hover:text-brand-aqua transition-colors">5 Pilares</a>
            <a href="#expositores" className="hover:text-brand-aqua transition-colors">Expositores</a>
            <a href="#agenda" className="hover:text-brand-aqua transition-colors">Agenda</a>
            <a href="#plano" className="hover:text-brand-aqua transition-colors">Plano</a>
            <a href="#noticias" className="hover:text-brand-aqua transition-colors">Noticias</a>
            <a href="#contacto" className="hover:text-brand-aqua transition-colors">Contacto</a>
          </nav>

          {/* CTA Header */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#acreditacion"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold bg-gradient-to-r from-brand-violet to-brand-aqua text-white shadow-glow-aqua hover:opacity-95 transition-all transform hover:-translate-y-0.5 font-heading"
            >
              <QrCode className="w-4 h-4" />
              <span>Pase Digital QR</span>
            </a>
          </div>

          {/* Botón Móvil */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 focus:outline-none"
              aria-label="Abrir menú"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Solapa / Cortina de Cuenta Regresiva Colgando a la Derecha del Navbar */}
      <div className="absolute top-full right-4 sm:right-8 lg:right-16 z-40 pointer-events-auto">
        <div className="glass-card px-4 sm:px-5 py-1.5 rounded-b-xl border-t-0 border border-brand-aqua/30 shadow-glow-aqua flex items-center gap-2.5 text-xs font-heading font-bold text-white backdrop-blur-xl">

          <div className="flex items-center gap-1 font-mono text-brand-aqua text-xs sm:text-sm">
            <span>{timeLeft.days}<span className="text-[10px] text-slate-400 font-sans">d</span></span>
            <span className="text-slate-600">:</span>
            <span>{timeLeft.hours}<span className="text-[10px] text-slate-400 font-sans">h</span></span>
            <span className="text-slate-600">:</span>
            <span>{timeLeft.minutes}<span className="text-[10px] text-slate-400 font-sans">m</span></span>
            <span className="text-slate-600">:</span>
            <span className="text-white">{timeLeft.seconds}<span className="text-[10px] text-slate-400 font-sans">s</span></span>
          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {isOpen && (
        <div className="lg:hidden border-t border-white/10 bg-brand-dark/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
          <a href="#inicio" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-brand-aqua hover:bg-slate-800/40">Inicio</a>
          <a href="#dinamica-dual" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-brand-aqua hover:bg-slate-800/40">⚡ Dinámica Dual (Mañana vs Tarde)</a>
          <a href="#pilares" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-brand-aqua hover:bg-slate-800/40">5 Pilares Productivos</a>
          <a href="#expositores" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-brand-aqua hover:bg-slate-800/40">Directorio Expositores</a>
          <a href="#agenda" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-brand-aqua hover:bg-slate-800/40">Agenda 4 Días</a>
          <a href="#plano" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-brand-aqua hover:bg-slate-800/40">Plano del Predio</a>
          <a href="#noticias" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-brand-aqua hover:bg-slate-800/40">Noticias & Novedades</a>
          <a href="#contacto" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-brand-aqua hover:bg-slate-800/40">Contacto General</a>
          <a href="#acreditacion" onClick={() => setIsOpen(false)} className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl text-center font-bold bg-gradient-to-r from-brand-violet to-brand-aqua text-white shadow-glow-aqua">
            <QrCode className="w-5 h-5" />
            Obtener Acreditación QR
          </a>
        </div>
      )}
    </header>
  );
}
