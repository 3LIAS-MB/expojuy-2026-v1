"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X, ArrowRight, Tag } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const popularSearches = [
    "Pabellón Minero",
    "Acreditaciones B2B",
    "Patio Gastronómico",
    "Programa de Charlas",
    "Cómo llegar",
    "Plano del predio",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 transform transition-all animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="relative flex items-center border-b border-gray-100 px-4 py-3 sm:px-6">
          <Search className="w-5 h-5 text-amber-500 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar eventos, pabellones, expositores, agendas..."
            className="w-full text-base sm:text-lg text-gray-800 placeholder-gray-400 bg-transparent outline-none py-1"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 mr-1 text-gray-400 hover:text-gray-600 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors ml-1"
            title="Cerrar (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results / Popular Searches */}
        <div className="p-4 sm:p-6 bg-gray-50/50 max-h-[70vh] overflow-y-auto">
          {!query ? (
            <div>
              <div className="flex items-center text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                <Tag className="w-3.5 h-3.5 mr-1.5" />
                Búsquedas Frecuentes
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 bg-white text-xs sm:text-sm font-medium text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-full border border-gray-200/80 shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <span>{term}</span>
                    <ArrowRight className="w-3 h-3 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-4 text-center text-gray-500 text-sm">
              Presiona Enter para buscar <span className="font-semibold text-emerald-700">&quot;{query}&quot;</span> en el portal de ExpoJuy
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-100/80 px-4 py-2.5 text-xs text-gray-400 flex items-center justify-between border-t border-gray-100">
          <span>Presiona <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-200 font-mono shadow-2xs">ESC</kbd> para salir</span>
          <span className="font-semibold text-emerald-600">EXPO JUJUY 2026</span>
        </div>
      </div>
    </div>
  );
}
