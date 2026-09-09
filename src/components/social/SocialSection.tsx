"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, QrCode, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { SOCIAL_PLATFORMS, type SocialPlatform } from "@/data/social";

// Custom SVG Icons
function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.49 0-2.95-.4-4.22-1.15l-.3-.18-3.13.82.83-3.05-.2-.31a8.216 8.216 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c.01 4.54-3.69 8.24-8.22 8.24zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.07-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43s-.56-1.35-.77-1.85c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.12-.23-.19-.48-.31z"/>
    </svg>
  );
}

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function FacebookIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.592 9 4.415V8z"/>
    </svg>
  );
}

function TikTokIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.86-4.49v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.86-.09z"/>
    </svg>
  );
}

export function SocialSection() {
  const [selectedQr, setSelectedQr] = useState<SocialPlatform | null>(null);

  // Bloquear el scroll del body mientras el modal esté abierto (Scroll Lock)
  useEffect(() => {
    if (selectedQr) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedQr]);

  // Cerrar modal al presionar la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedQr(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getIcon = (id: string, className?: string) => {
    switch (id) {
      case "whatsapp":
        return <WhatsAppIcon className={className} />;
      case "instagram":
        return <InstagramIcon className={className} />;
      case "facebook":
        return <FacebookIcon className={className} />;
      case "tiktok":
        return <TikTokIcon className={className} />;
      default:
        return null;
    }
  };

  return (
    <section
      id="redes"
      className="py-16 sm:py-20 bg-[#f8f9fd] text-[#0b123b] border-t border-[#dfe3ef] relative"
    >
      <div className="max-w-[1100px] mx-auto px-6 sm:px-8">
        
        {/* Encabezado limpio y centrado */}
        <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
          <div className="inline-flex items-center justify-center gap-2 mb-1">
            <span className="w-6 h-[2px] bg-[#6424dc]" />
            <span className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-[#6424dc]">
              Canales Oficiales
            </span>
            <span className="w-6 h-[2px] bg-[#6424dc]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0b123b]">
            Seguinos en <span className="text-[#6424dc]">Redes Sociales</span>
          </h2>
          <p className="text-[#646a85] text-sm sm:text-base leading-relaxed">
            Conectá con la comunidad de ExpoJuy 2026 o escaneá con tu celular.
          </p>
        </div>

        {/* 4 Canales sin cuadros de fondo */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {SOCIAL_PLATFORMS.map((platform, idx) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Logo oficial a color con micro-interacción */}
              <div 
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl shadow-sm text-white flex items-center justify-center mb-3 transition-all duration-200 group-hover:scale-105 group-hover:shadow-md ${platform.brandBg}`}
              >
                {getIcon(platform.id, "w-7 h-7 sm:w-8 sm:h-8")}
              </div>

              {/* Nombre y usuario */}
              <h3 className="font-bold text-base sm:text-lg text-[#0b123b] leading-tight group-hover:text-[#6424dc] transition-colors">
                {platform.name}
              </h3>
              
              <span className="text-xs text-[#646a85] font-medium mt-0.5 truncate max-w-full">
                {platform.handle}
              </span>

              {/* Cápsula unificada (Split Button): Acción principal + Acceso a QR */}
              <div className="inline-flex items-center rounded-full bg-white border border-[#dfe3ef] hover:border-[#6424dc]/60 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden mt-3.5 group/btn">
                {/* Lado izquierdo: Enlace directo */}
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Abrir ${platform.name} de ExpoJuy`}
                  className="inline-flex items-center gap-1.5 py-1.5 sm:py-2 pl-3 sm:pl-4 pr-2 text-xs font-semibold text-[#0b123b] group-hover/btn:text-[#6424dc] hover:bg-[#f8f9fd] transition-colors cursor-pointer"
                >
                  <span>{platform.actionText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#646a85] group-hover/btn:text-[#6424dc] transition-colors" />
                </a>

                {/* Divisor vertical sutil */}
                <span className="w-[1px] h-3.5 bg-[#dfe3ef]" />

                {/* Lado derecho: Botón para desplegar el QR */}
                <button
                  type="button"
                  onClick={() => setSelectedQr(platform)}
                  aria-label={`Ver código QR de ${platform.name}`}
                  title={`Ver código QR de ${platform.name}`}
                  className="p-1.5 sm:py-2 sm:px-2.5 text-[#646a85] hover:text-[#6424dc] hover:bg-[#f8f9fd] transition-colors cursor-pointer flex items-center justify-center"
                >
                  <QrCode className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* MODAL EMERGENTE DEL CÓDIGO QR CON SCROLL LOCK Y ARIA */}
      <AnimatePresence>
        {selectedQr && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="qr-modal-title"
          >
            {/* Fondo translúcido */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedQr(null)}
              className="absolute inset-0 bg-[#0b123b]/60 backdrop-blur-sm"
            />

            {/* Tarjeta del modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
              className="relative w-full max-w-sm bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/50 flex flex-col items-center text-center z-10"
            >
              {/* Botón de cierre */}
              <button
                type="button"
                onClick={() => setSelectedQr(null)}
                aria-label="Cerrar modal"
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Logo y título */}
              <div 
                className={`w-12 h-12 rounded-2xl shadow-sm text-white flex items-center justify-center mb-2.5 ${selectedQr.brandBg}`}
              >
                {getIcon(selectedQr.id, "w-6 h-6")}
              </div>

              <h4 id="qr-modal-title" className="font-bold text-lg text-[#0b123b]">
                {selectedQr.name}
              </h4>
              <span className="text-xs text-[#646a85] font-medium">
                {selectedQr.handle}
              </span>

              {/* QR en alta resolución */}
              <div className="my-5 p-3.5 rounded-2xl bg-[#f8f9fd] border border-[#dfe3ef] flex items-center justify-center shadow-inner">
                {selectedQr.qrImage ? (
                  <div className="relative w-[170px] h-[170px] rounded-xl overflow-hidden">
                    <Image
                      src={selectedQr.qrImage}
                      alt={`Código QR ${selectedQr.name}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="relative bg-white p-3 rounded-xl shadow-sm flex items-center justify-center">
                    <QRCodeSVG
                      value={selectedQr.qrUrl}
                      size={160}
                      level="H"
                      fgColor="#0b123b"
                      bgColor="#ffffff"
                    />
                    <div 
                      className="absolute w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center p-1 border border-gray-100"
                      style={{ color: selectedQr.color }}
                    >
                      {getIcon(selectedQr.id, "w-4 h-4")}
                    </div>
                  </div>
                )}
              </div>

              <p className="text-xs text-[#646a85] leading-relaxed">
                Escaneá con la cámara de tu celular para abrir directamente el canal oficial.
              </p>

              {/* Enlace alternativo con color de marca oficial */}
              <a
                href={selectedQr.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#6424dc] hover:bg-[#521cb5] shadow-sm transition-colors cursor-pointer"
              >
                <span className="text-white">Abrir enlace directo</span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-white" />
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
