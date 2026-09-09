"use client";

import { useEffect, useState } from "react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
        <div className="flex items-center px-6 py-4 border-b border-gray-100">
          <svg
            className="w-5 h-5 text-[#F8BF00] mr-3"
            fill="currentColor"
            viewBox="0 0 512 512"
          >
            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar en ExpoJuy 2026..."
            className="w-full text-lg text-gray-900 bg-transparent focus:outline-none placeholder-gray-400 font-sans"
            autoFocus
          />
          <button
            onClick={onClose}
            className="ml-4 p-1 text-gray-400 hover:text-gray-600 transition-colors text-sm font-semibold uppercase tracking-wider"
          >
            Esc
          </button>
        </div>

        <div className="p-6 bg-gray-50 max-h-80 overflow-y-auto">
          {query.trim() === "" ? (
            <div className="text-center text-gray-400 py-6 text-sm">
              Escribe para buscar información sobre stands, expositores, agenda y más.
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-white rounded-lg shadow-sm hover:shadow transition-shadow border border-gray-100 cursor-pointer">
                <p className="font-semibold text-[#5E009D] text-sm">Edición 2026 - Conectando Países</p>
                <p className="text-xs text-gray-500 mt-1">Conoce más sobre la 17° edición de la Exposición Multisectorial del NOA.</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm hover:shadow transition-shadow border border-gray-100 cursor-pointer">
                <p className="font-semibold text-[#5E009D] text-sm">Acreditaciones y Entradas</p>
                <p className="text-xs text-gray-500 mt-1">Información sobre venta de entradas y registros para expositores.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
