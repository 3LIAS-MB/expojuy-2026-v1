'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Leaf, Download, CheckCircle2, QrCode } from 'lucide-react';

export default function AcreditacionSection() {
  const [name, setName] = useState('Martín Gutiérrez');
  const [email, setEmail] = useState('martin@empresa.com');
  const [passType, setPassType] = useState('Empresa / Ronda B2B');
  const [isGenerated, setIsGenerated] = useState(false);

  const qrPayload = `EXPOJUY2026|TITULAR:${name}|EMAIL:${email}|TIPO:${passType}|ID:${name.replace(/\s+/g, '-').toUpperCase()}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerated(true);
    alert(`¡Pase Digital emitido con éxito para ${name}! Podés descargarlo o presentarlo en tu celular al ingresar.`);
  };

  return (
    <section id="acreditacion" className="py-20 bg-white border-t border-[#dfe3ef] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
        
        <div className="bg-[#f7f8fc] rounded-3xl p-8 lg:p-12 border border-[#dfe3ef] shadow-sm relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#820cd0]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Formulario */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25c0d4]/10 border border-[#25c0d4]/30 text-[#0e8897] text-xs font-bold uppercase tracking-wider">
                <Leaf className="w-4 h-4 text-[#25c0d4]" />
                <span>Sustentabilidad · Cero Papel</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0b123b]">
                Acreditación & <span className="text-[#820cd0]">Pase Digital QR</span>
              </h2>

              <p className="text-[#676370] text-sm leading-relaxed">
                En concordancia con los ejes de sustentabilidad de ExpoJuy 2026, eliminamos las credenciales impresas. Generá tu pase oficial en segundos y llevalo en tu dispositivo móvil.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-[#0b123b] mb-1">Nombre Completo *</label>
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Lic. Martín Gutiérrez" 
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#dfe3ef] text-[#0b123b] placeholder-gray-400 text-sm focus:outline-none focus:border-[#820cd0] focus:ring-2 focus:ring-[#820cd0]/20 shadow-sm transition-all"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0b123b] mb-1">Correo Electrónico *</label>
                    <input 
                      type="email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="martin@empresa.com" 
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#dfe3ef] text-[#0b123b] placeholder-gray-400 text-sm focus:outline-none focus:border-[#820cd0] focus:ring-2 focus:ring-[#820cd0]/20 shadow-sm transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0b123b] mb-1">Tipo de Pase *</label>
                    <select 
                      value={passType}
                      onChange={(e) => setPassType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#dfe3ef] text-[#0b123b] text-sm focus:outline-none focus:border-[#820cd0] focus:ring-2 focus:ring-[#820cd0]/20 shadow-sm transition-all"
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
                  className="w-full py-3.5 rounded-xl font-bold text-white bg-[#820cd0] hover:bg-[#6c0aa7] shadow-md hover:shadow-lg transition-all cursor-pointer mt-2 flex items-center justify-center gap-2"
                >
                  <QrCode className="w-4 h-4 text-[#25c0d4]" />
                  <span>Generar Mi Pase Digital QR</span>
                </button>
              </form>
            </div>

            {/* Credencial Digital Interactiva */}
            <div className="flex justify-center">
              <div className="w-full max-w-sm rounded-2xl bg-white border border-[#dfe3ef] p-6 text-center shadow-xl relative overflow-hidden">
                
                <div className="w-full h-1.5 bg-gradient-to-r from-[#820cd0] via-[#25c0d4] to-[#774ff0] absolute top-0 left-0" />

                <div className="flex items-center justify-between pb-3 border-b border-[#dfe3ef] mb-4 mt-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#820cd0]">Pase Oficial Digital</span>
                  <span className="text-[10px] font-mono text-[#676370] font-bold">EXPOJUY-2026</span>
                </div>

                {/* Código QR SVG React */}
                <div className="bg-white p-3.5 rounded-xl border border-[#dfe3ef] inline-block mx-auto mb-4 shadow-sm">
                  <QRCodeSVG 
                    value={qrPayload}
                    size={150}
                    bgColor="#FFFFFF"
                    fgColor="#0b123b"
                    level="H"
                  />
                </div>

                <h4 className="text-lg font-black text-[#0b123b]">{name || 'Visitante Oficial'}</h4>
                <p className="text-xs font-bold text-[#25c0d4] mt-0.5">{passType}</p>
                
                <div className="mt-4 pt-3 border-t border-[#dfe3ef] grid grid-cols-2 text-[11px] text-[#676370]">
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-[#676370] font-bold">Acceso</span>
                    <span className="text-[#0b123b] font-bold">9 al 12 Octubre</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-[#676370] font-bold">Sede</span>
                    <span className="text-[#0b123b] font-bold">Ciudad Cultural</span>
                  </div>
                </div>

                <button 
                  onClick={() => alert('Credencial guardada en tu dispositivo')}
                  className="mt-5 w-full py-2.5 rounded-xl bg-[#f4f1f9] hover:bg-[#820cd0] text-[#820cd0] hover:text-white transition-all border border-[#ded8e8] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Credencial</span>
                </button>

                {isGenerated && (
                  <p className="mt-3 text-[11px] text-emerald-600 font-bold flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Credencial confirmada
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
