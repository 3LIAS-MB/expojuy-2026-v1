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

  // Foco al abrir
  useEffect(() => {
    if (isOpen) {
      setShowTooltip(false);
      setTimeout(() => inputRef.current?.focus(), 200);
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
    <aside aria-label="Asistente Virtual Llamita" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[999] font-sans">
      {/* TOOLTIP ELEGANTE Y SUTIL */}
      {!isOpen && showTooltip && (
        <div className="absolute bottom-[72px] right-0 w-60 p-3 bg-[#0d1124]/95 backdrop-blur-md border border-white/12 rounded-xl shadow-xl text-white text-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-semibold text-[#19b9ca] flex items-center gap-1.5 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Llamita Asistente
            </span>
            <button
              type="button"
              onClick={() => setShowTooltip(false)}
              aria-label="Cerrar sugerencia"
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <FaXmark className="w-3 h-3" />
            </button>
          </div>
          <p className="text-gray-300 text-[11px] leading-snug">
            ¿Tenés dudas sobre ExpoJuy 2026? Hacé clic acá para consultar 🦙
          </p>
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#0d1124] border-r border-b border-white/12 rotate-45" />
        </div>
      )}

      {/* BOTÓN FLOTANTE DISCRETO */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Abrir asistente virtual Llamita"
          className="group relative w-14 h-14 sm:w-[60px] sm:h-[60px] rounded-full p-0.5 bg-[#0e122b] border border-white/20 hover:border-[#820CD0]/60 shadow-lg shadow-black/40 hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center"
        >
          {/* Avatar pixel art limpio */}
          <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-radial from-white/10 to-transparent">
            <Image
              src="/bot/bot.png"
              alt="Llamita Asistente ExpoJuy 2026"
              width={50}
              height={50}
              priority
              className="object-contain"
            />
          </div>

          {/* Indicador de estado en línea sobrio */}
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#0e122b] rounded-full" />
        </button>
      )}

      {/* VENTANA DE CHAT LIMPIA */}
      {isOpen && (
        <div className="w-[92vw] max-w-[370px] sm:max-w-[390px] h-[520px] max-h-[82vh] bg-[#0c1022]/95 backdrop-blur-xl border border-white/12 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* LÍNEA DE ACENTO SUPERIOR FINA */}
          <div className="w-full h-1 bg-gradient-to-r from-[#820CD0] via-[#19b9ca] to-[#820CD0]" />

          {/* HEADER DEL CHAT */}
          <div className="px-4 py-3 bg-white/[0.03] border-b border-white/8 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-full bg-[#151930] border border-white/15 overflow-hidden flex items-center justify-center shrink-0">
                <Image
                  src="/bot/bot.png"
                  alt="Llamita"
                  width={34}
                  height={34}
                  className="object-contain"
                />
              </div>

              <div>
                <h3 className="font-bold text-white text-sm leading-tight">
                  Llamita
                </h3>
                <p className="text-[11px] text-gray-400 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  Asistente ExpoJuy 2026
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearChat}
                title="Reiniciar chat"
                aria-label="Reiniciar conversación"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <FaRotateRight className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Cerrar chat"
                aria-label="Cerrar ventana de chat"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <FaXmark className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ÁREA DE MENSAJES */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs sm:text-[13px] scrollbar-thin scrollbar-thumb-white/10">
            {messages.map((msg) => {
              const isBot = msg.role === "assistant";
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${
                    isBot ? "justify-start" : "justify-end"
                  }`}
                >
                  {isBot && (
                    <div className="w-6 h-6 rounded-full bg-[#151930] border border-white/10 overflow-hidden shrink-0 flex items-center justify-center mb-0.5">
                      <Image
                        src="/bot/bot.png"
                        alt="Llamita"
                        width={22}
                        height={22}
                        className="object-contain"
                      />
                    </div>
                  )}

                  <div
                    className={`max-w-[84%] rounded-xl px-3.5 py-2 leading-relaxed ${
                      isBot
                        ? "bg-[#141830] text-gray-200 border border-white/8 rounded-bl-xs"
                        : "bg-[#820CD0] text-white rounded-br-xs font-normal"
                    }`}
                  >
                    {isBot ? renderFormattedText(msg.content) : msg.content}
                    <div
                      className={`text-[9px] mt-1 text-right font-mono ${
                        isBot ? "text-gray-500" : "text-purple-200"
                      }`}
                    >
                      {msg.time}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* INDICADOR DE ESCRITURA SUTIL */}
            {loading && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#151930] border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
                  <Image
                    src="/bot/bot.png"
                    alt="Llamita"
                    width={22}
                    height={22}
                    className="object-contain"
                  />
                </div>
                <div className="bg-[#141830] border border-white/8 rounded-xl rounded-bl-xs px-3 py-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* CHIPS DE PREGUNTAS FRECUENTES RÁPIDAS */}
          <div className="px-3 py-2 bg-black/20 border-t border-white/6 overflow-x-auto scrollbar-none flex items-center gap-1.5">
            {QUICK_PROMPTS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(item.query)}
                  disabled={loading}
                  className="shrink-0 px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-[11px] text-gray-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Icon className="w-2.5 h-2.5 text-[#19b9ca]" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* BARRA DE ENTRADA */}
          <div className="p-2.5 bg-white/[0.02] border-t border-white/8 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              placeholder="Escribí tu consulta sobre la expo..."
              className="flex-1 bg-[#13172c] border border-white/10 focus:border-[#820CD0]/70 rounded-xl px-3 py-2 text-xs sm:text-[13px] text-white placeholder:text-gray-500 focus:outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || loading}
              aria-label="Enviar mensaje"
              className="w-8 h-8 rounded-xl bg-[#820CD0] hover:bg-[#720ab8] disabled:opacity-30 transition-all flex items-center justify-center text-white shrink-0 cursor-pointer shadow-xs disabled:cursor-not-allowed"
            >
              <FaPaperPlane className="w-3 h-3" />
            </button>
          </div>

          {/* FOOTER DISCRETO */}
          <div className="px-3 py-1 bg-[#090c1a] text-center border-t border-white/5">
            <p className="text-[10px] text-gray-500">
              ExpoJuy 2026 • Predio Ferial Ciudad Cultural
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
