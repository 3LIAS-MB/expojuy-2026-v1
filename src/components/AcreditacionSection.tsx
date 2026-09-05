'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Leaf, Download, CheckCircle2 } from 'lucide-react';

export default function AcreditacionSection() {
  const [name, setName] = useState('Martín Gutiérrez');
  const [email, setEmail] = useState('martin@empresa.com');
  const [passType, setPassType] = useState('Empresa / Ronda B2B');
  const [isGenerated, setIsGenerated] = useState(false);

  const qrPayload = `EXPOJUY2026|TITULAR:${name}|EMAIL:${email}|TIPO:${passType}|ID:${name.replace(/\s+/g, '-').toUpperCase()}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerated(true);
    alert(`¡Pase Digital emitido con éxito para ${name}! Podés descargarlo o presentarlo en tu celular en el ingreso.`);
  };

  return (
    <section id="acreditacion" className="min-h-screen flex flex-col justify-center py-20 relative">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16">
        
        <div className="glass-card rounded-3xl p-8 lg:p-12 border border-brand-aqua/30 shadow-glow-aqua relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-violet/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Formulario */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-aqua/10 border border-brand-aqua/30 text-brand-aqua text-xs font-semibold uppercase tracking-wider mb-3">
                <Leaf className="w-3.5 h-3.5" />
                Sustentabilidad · Cero Papel
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mb-4">
                Acreditación & <span className="gradient-text">Pase Digital QR</span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                En concordancia con los ejes de sustentabilidad de ExpoJuy 2026, eliminamos las credenciales impresas. Obtené tu pase en segundos y llevalo en tu celular.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre Completo *</label>
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Lic. Martín Gutiérrez" 
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-dark/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-aqua"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Correo Electrónico *</label>
                    <input 
                      type="email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="martin@empresa.com" 
                      className="w-full px-4 py-2.5 rounded-xl bg-brand-dark/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-aqua"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Tipo de Pase *</label>
                    <select 
                      value={passType}
                      onChange={(e) => setPassType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-brand-dark/80 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-aqua"
                    >
                      <option value="Empresa / Ronda B2B">Corporativo · Ronda B2B</option>
                      <option value="Visitante General">Público General</option>
                      <option value="Estudiante / Académico">Estudiante / Universitario</option>
                      <option value="Prensa Acreditada">Prensa & Medios</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3.5 rounded-xl font-heading font-bold text-white bg-gradient-to-r from-brand-violet to-brand-aqua shadow-glow-aqua hover:opacity-95 transition-all mt-2"
                >
                  Generar Mi Pase Digital QR
                </button>
              </form>
            </div>

            {/* Credencial Digital Interactiva */}
            <div className="flex justify-center">
              <div className="w-full max-w-sm rounded-2xl bg-gradient-to-b from-brand-card to-brand-surface border border-white/15 p-6 text-center shadow-2xl relative">
                
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-aqua">Pase Oficial Digital</span>
                  <span className="text-[10px] font-mono text-slate-400">EXPOJUY-2026</span>
                </div>

                {/* Código QR SVG React */}
                <div className="bg-white p-3.5 rounded-xl inline-block mx-auto mb-4 shadow-md">
                  <QRCodeSVG 
                    value={qrPayload}
                    size={150}
                    bgColor="#FFFFFF"
                    fgColor="#070D1E"
                    level="H"
                  />
                </div>

                <h4 className="text-lg font-bold font-heading text-white">{name || 'Visitante Oficial'}</h4>
                <p className="text-xs font-semibold text-brand-aqua mt-0.5">{passType}</p>
                
                <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 text-[11px] text-slate-400">
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-slate-500">Acceso</span>
                    <span className="text-slate-200 font-medium">9 al 12 Octubre</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-slate-500">Sede</span>
                    <span className="text-slate-200 font-medium">Ciudad Cultural</span>
                  </div>
                </div>

                <button 
                  onClick={() => alert('Credencial guardada en tu dispositivo')}
                  className="mt-5 w-full py-2 rounded-lg glass-card text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-800 transition-all border border-white/10 flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Descargar en Wallet / Imagen
                </button>

                {isGenerated && (
                  <p className="mt-2 text-[10px] text-emerald-400 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Credencial confirmada
                  </p>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
