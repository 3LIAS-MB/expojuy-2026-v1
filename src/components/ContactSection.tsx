'use client';

import { useState } from 'react';
import { Mail, Send, CheckCircle2, Phone, MapPin } from 'lucide-react';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    alert('Mensaje enviado. El equipo de la Cámara de Comercio Exterior se contactará a la brevedad.');
  };

  return (
    <section id="contacto" className="min-h-screen flex flex-col justify-center py-20 relative border-t border-white/5">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16">
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-aqua/10 border border-brand-aqua/30 text-brand-aqua text-xs font-semibold uppercase tracking-wider mb-3">
              <Mail className="w-3.5 h-3.5" />
              Atención Directa
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mb-4">
              Contacto & <span className="gradient-text">Registro de Interés</span>
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-8">
              ¿Tenés dudas sobre contratación de stands, acreditación de prensa, rondas B2B o patrocinio institucional? Envianos tu consulta y nuestro equipo te responderá en menos de 24 horas.
            </p>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-center gap-3 glass-card p-3 rounded-xl border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-brand-aqua/15 flex items-center justify-center text-brand-aqua">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white">Sede Institucional</strong>
                  <span>Alvear 550, San Salvador de Jujuy, Argentina</span>
                </div>
              </div>

              <div className="flex items-center gap-3 glass-card p-3 rounded-xl border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-brand-violet/15 flex items-center justify-center text-brand-lavender">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white">Teléfono de Contacto</strong>
                  <span>+54 (388) 423-5500 · Lun a Vie de 08:00 a 16:00 hs</span>
                </div>
              </div>

              <div className="flex items-center gap-3 glass-card p-3 rounded-xl border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white">Correo Oficial</strong>
                  <span>contacto@expojuy.camcomexjujuy.com.ar</span>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de Contacto */}
          <div className="glass-card rounded-3xl p-8 border border-white/10 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre y Apellido *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Tu nombre completo"
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-dark/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-aqua"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Empresa u Organización</label>
                  <input 
                    type="text" 
                    placeholder="Nombre de tu empresa"
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-dark/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-aqua"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Correo Electrónico *</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="email@empresa.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-dark/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-aqua"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Motivo de Contacto *</label>
                  <select 
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-dark/80 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-aqua"
                  >
                    <option value="stand">Contratación de Stands</option>
                    <option value="b2b">Rondas de Negocios B2B</option>
                    <option value="sponsor">Patrocinio y Sponsors</option>
                    <option value="prensa">Acreditación de Prensa</option>
                    <option value="general">Consulta General</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Mensaje *</label>
                <textarea 
                  rows={4} 
                  required 
                  placeholder="Detallá tu consulta o requerimiento comercial..."
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-dark/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-aqua"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full py-3.5 rounded-xl font-heading font-bold text-white bg-gradient-to-r from-brand-violet to-brand-aqua shadow-glow-aqua hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Enviar Mensaje
              </button>

              {submitted && (
                <p className="text-xs text-emerald-400 text-center flex items-center justify-center gap-1.5 pt-2">
                  <CheckCircle2 className="w-4 h-4" /> ¡Mensaje enviado con éxito!
                </p>
              )}
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
