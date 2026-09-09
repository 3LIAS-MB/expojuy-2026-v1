"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  FaXmark,
  FaPaperPlane,
  FaRotateRight,
  FaCalendarDays,
  FaLocationDot,
  FaQrcode,
  FaStore,
  FaUtensils,
  FaHandshake
} from "react-icons/fa6";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
}

const QUICK_PROMPTS = [
  { label: "📅 Fechas y Horarios", icon: FaCalendarDays, query: "¿Cuáles son las fechas y horarios de ExpoJuy 2026?" },
  { label: "📍 ¿Cómo llegar?", icon: FaLocationDot, query: "¿Dónde queda y cómo llego a Ciudad Cultural?" },
  { label: "🎟️ Pase QR digital", icon: FaQrcode, query: "¿Cómo obtengo mi entrada o pase digital con código QR?" },
  { label: "💼 Reservar Stand", icon: FaStore, query: "¿Cómo puedo contratar un stand para mi empresa en ExpoJuy?" },
  { label: "🥟 Patio Gastronómico", icon: FaUtensils, query: "¿Qué opciones de comidas habrá en el patio gastronómico?" },
  { label: "🤝 Rondas B2B", icon: FaHandshake, query: "¿Cómo funcionan las rondas de negocios internacionales?" },
];

export function ExpoBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content:
        "¡Hola! 👋 Soy **Llamita**, la asistente virtual de **ExpoJuy 2026** 🦙\n\n¿En qué te puedo ayudar hoy? Podés preguntarme sobre fechas, acreditaciones digitales QR, stands o cómo llegar a Ciudad Cultural.",
      time: "Ahora",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll suave
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, loading]);

  // Foco y bloqueo de scroll en móvil al abrir
  useEffect(() => {
    if (isOpen) {
      setShowTooltip(false);
      setTimeout(() => inputRef.current?.focus(), 200);

      const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
      const originalOverflow = document.body.style.overflow;
      if (isMobile) {
        document.body.style.overflow = "hidden";
      }

      const handleKeyDownEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      };

      window.addEventListener("keydown", handleKeyDownEsc);

      return () => {
        window.removeEventListener("keydown", handleKeyDownEsc);
        if (isMobile) {
          document.body.style.overflow = originalOverflow;
        }
      };
    }
  }, [isOpen]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      time: getCurrentTime(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      const botReply =
        data.reply ||
        "¡Hola! Para consultas especiales podés comunicarte con la Cámara de Comercio Exterior de Jujuy al +54 388 4233539 🦙";

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content: botReply,
          time: getCurrentTime(),
        },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content:
            "Ocurrió una pequeña interrupción de red. Podés consultar a expojuy2.0@gmail.com o llamar al +54 388 4233539.",
          time: getCurrentTime(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        content:
          "Conversación reiniciada 🦙 ¿Qué otra consulta tenés sobre ExpoJuy 2026?",
        time: getCurrentTime(),
      },
    ]);
  };

  // Renderizador limpio de texto (soporte simple de negritas y viñetas)
  const renderFormattedText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedLine = parts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={pIdx} className="font-semibold text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (line.startsWith("• ") || line.startsWith("- ") || line.startsWith("* ")) {
        return (
          <div key={idx} className="flex items-start gap-2 my-0.5 ml-0.5">
            <span className="text-[#19b9ca] select-none leading-relaxed">•</span>
            <span className="leading-relaxed">{formattedLine}</span>
          </div>
        );
      }

      return (
        <p key={idx} className={line.trim() === "" ? "h-1.5" : "my-0.5 leading-relaxed"}>
          {formattedLine}
        </p>
      );
    });
  };

  return (
    <>
      {/* BOTÓN FLOTANTE Y TOOLTIP (SOLO CUANDO EL CHAT ESTÁ CERRADO) */}
      {!isOpen && (
        <aside
          aria-label="Asistente Virtual Llamita"
          className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-[999] font-sans"
        >
          {showTooltip && (
            <div className="absolute bottom-[72px] right-0 w-[270px] max-w-[calc(100vw-2.5rem)] p-3.5 bg-[#0e1329]/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl text-white text-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-bold text-[#25C0D4] flex items-center gap-1.5 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Llamita Asistente IA
                </span>
                <button
                  type="button"
                  onClick={() => setShowTooltip(false)}
                  aria-label="Cerrar sugerencia"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer p-1 rounded-md hover:bg-white/10"
                >
                  <FaXmark className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-gray-200 text-xs leading-relaxed">
                ¡Hola! ¿Tenés dudas sobre ExpoJuy 2026? Hacé clic acá para consultar en vivo 🦙
              </p>
              <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#0e1329] border-r border-b border-white/20 rotate-45" />
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir asistente virtual Llamita"
            className="group relative w-15 h-15 sm:w-16 sm:h-16 rounded-full p-1 bg-gradient-to-tr from-[#820CD0] via-[#1a1e3d] to-[#25C0D4] border-2 border-white/30 hover:border-white/60 shadow-[0_8px_28px_rgba(130,12,208,0.45)] hover:shadow-[0_12px_36px_rgba(37,192,212,0.5)] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center touch-manipulation"
          >
            {/* Contenedor del avatar con zoom al rostro para visibilidad óptima */}
            <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-[#0d1127]">
              <Image
                src="/bot/bot.png"
                alt="Llamita Asistente ExpoJuy 2026"
                width={70}
                height={70}
                priority
                className="object-cover scale-140 translate-y-1 transition-transform duration-200 group-hover:scale-150"
              />
            </div>
            <span className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-emerald-400 border-2 border-[#0d1127] rounded-full shadow-sm" />
          </button>
        </aside>
      )}

      {/* VENTANA DE CHAT ACTIVA: PANTALLA COMPLETA NATIVA EN MÓVIL, FLOTANTE EN DESKTOP */}
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex flex-col justify-end sm:justify-end sm:items-end sm:p-6 bg-black/80 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none sm:pointer-events-none font-sans animate-in fade-in duration-150">
          {/* Fondo para cerrar al hacer clic afuera en desktop o zona superior móvil */}
          <div
            className="absolute inset-0 sm:hidden h-10 top-0 cursor-pointer"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Caja del Chat: Full-height en mobile para máxima visibilidad, card flotante en desktop */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Chat con Llamita Asistente Virtual"
            className="relative w-full sm:w-[420px] h-[92dvh] sm:h-[610px] sm:max-h-[85vh] bg-[#0a0e24] border-t sm:border border-white/20 rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden sm:pointer-events-auto animate-in slide-in-from-bottom duration-200 sm:zoom-in-95"
          >
            {/* Tirador táctil visual para móvil */}
            <div className="w-12 h-1.5 bg-white/25 hover:bg-white/40 rounded-full mx-auto my-2 shrink-0 sm:hidden cursor-pointer" onClick={() => setIsOpen(false)} />

            {/* Línea de acento superior de marca */}
            <div className="w-full h-1 bg-gradient-to-r from-[#820CD0] via-[#25C0D4] to-[#BB8CFF] shrink-0" />

            {/* HEADER DEL CHAT */}
            <div className="px-4 py-3 sm:py-3.5 bg-[#0e132e] border-b border-white/12 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full bg-[#161c3c] border-2 border-[#25C0D4]/40 overflow-hidden flex items-center justify-center shrink-0 shadow-md">
                  <Image
                    src="/bot/bot.png"
                    alt="Llamita"
                    width={56}
                    height={56}
                    priority
                    className="object-cover scale-145 translate-y-1"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[#0e132e]" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-base sm:text-[15px] leading-tight tracking-wide">
                      Llamita
                    </h3>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#25C0D4]/25 text-[#25C0D4] border border-[#25C0D4]/40">
                      IA
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 flex items-center gap-1.5 mt-0.5 font-medium">
                    Asistente Oficial ExpoJuy 2026
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 sm:gap-1.5">
                <button
                  type="button"
                  onClick={handleClearChat}
                  title="Reiniciar chat"
                  aria-label="Reiniciar conversación"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
                >
                  <FaRotateRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Cerrar chat"
                  aria-label="Cerrar ventana de chat"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
                >
                  <FaXmark className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* ÁREA DE MENSAJES CON ALTO CONTRASTE Y TIPOGRAFÍA CLARA */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-[14px] sm:text-[13.5px] scrollbar-thin scrollbar-thumb-white/15 overscroll-contain bg-gradient-to-b from-[#0a0e24] to-[#070a1a]">
              {messages.map((msg) => {
                const isBot = msg.role === "assistant";
                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2.5 ${
                      isBot ? "justify-start" : "justify-end"
                    }`}
                  >
                    {isBot && (
                      <div className="w-8 h-8 rounded-full bg-[#161c3c] border border-white/20 overflow-hidden shrink-0 flex items-center justify-center mb-0.5 shadow-sm">
                        <Image
                          src="/bot/bot.png"
                          alt="Llamita"
                          width={40}
                          height={40}
                          className="object-cover scale-145 translate-y-0.5"
                        />
                      </div>
                    )}

                    <div
                      className={`max-w-[88%] sm:max-w-[82%] rounded-2xl px-4 py-3 leading-relaxed shadow-md ${
                        isBot
                          ? "bg-[#151b38] text-white border border-white/15 rounded-bl-xs"
                          : "bg-gradient-to-r from-[#820CD0] to-[#9c1ff0] text-white rounded-br-xs font-medium shadow-purple-950/50"
                      }`}
                    >
                      {isBot ? renderFormattedText(msg.content) : msg.content}
                      <div
                        className={`text-[10px] mt-1.5 text-right font-mono ${
                          isBot ? "text-gray-400" : "text-purple-200"
                        }`}
                      >
                        {msg.time}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* INDICADOR DE ESCRITURA */}
              {loading && (
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#161c3c] border border-white/20 overflow-hidden shrink-0 flex items-center justify-center shadow-sm">
                    <Image
                      src="/bot/bot.png"
                      alt="Llamita"
                      width={40}
                      height={40}
                      className="object-cover scale-145 translate-y-0.5"
                    />
                  </div>
                  <div className="bg-[#151b38] border border-white/15 rounded-2xl rounded-bl-xs px-4 py-3 flex items-center gap-2 shadow-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#25C0D4] animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#25C0D4] animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#25C0D4] animate-bounce" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* CHIPS DE PREGUNTAS FRECUENTES RÁPIDAS */}
            <div className="px-3.5 py-2.5 bg-[#080b1e] border-t border-white/10 shrink-0">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
                {QUICK_PROMPTS.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(item.query)}
                      disabled={loading}
                      className="shrink-0 px-3.5 py-2 rounded-full bg-[#141936] hover:bg-[#1f2652] active:scale-95 border border-white/18 hover:border-[#25C0D4]/50 text-xs text-gray-100 hover:text-white font-medium transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50 touch-manipulation shadow-xs"
                    >
                      <Icon className="w-3.5 h-3.5 text-[#25C0D4]" />
                      <span className="whitespace-nowrap">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* BARRA DE ENTRADA RESPONSIVA Y CÓMODA */}
            <div className="p-3.5 bg-[#090d22] border-t border-white/12 shrink-0 pb-[calc(0.85rem+env(safe-area-inset-bottom,0px))]">
              <div className="flex items-center gap-2.5">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                  placeholder="Escribí tu consulta sobre ExpoJuy 2026..."
                  className="flex-1 bg-[#131836] border border-white/18 focus:border-[#25C0D4] focus:ring-2 focus:ring-[#25C0D4]/30 rounded-xl px-4 py-3 text-base sm:text-[14px] text-white placeholder:text-gray-400 focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || loading}
                  aria-label="Enviar mensaje"
                  className="w-12 h-12 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r from-[#820CD0] to-[#25C0D4] hover:opacity-90 active:scale-95 disabled:opacity-30 transition-all flex items-center justify-center text-white shrink-0 cursor-pointer shadow-lg disabled:cursor-not-allowed"
                >
                  <FaPaperPlane className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>
            </div>

            {/* FOOTER DISCRETO */}
            <div className="px-3 py-1 bg-[#050714] text-center border-t border-white/5 hidden sm:block">
              <p className="text-[10px] text-gray-400 font-medium">
                ExpoJuy 2026 • Predio Ferial Ciudad Cultural
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
