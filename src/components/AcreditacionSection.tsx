'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Check, QrCode, ShieldCheck } from 'lucide-react';

export default function AcreditacionSection() {
  const [name, setName] = useState('Martín Gutiérrez');
  const [email, setEmail] = useState('martin@empresa.com');
  const [passType, setPassType] = useState('Empresa / Ronda B2B');
  const [isGenerated, setIsGenerated] = useState(false);

  const qrPayload = `EXPOJUY2026|TITULAR:${name}|EMAIL:${email}|TIPO:${passType}|ID:${name.replace(/\s+/g, '-').toUpperCase()}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerated(true);
  };

  return (
    <section id="acreditacion" className="py-20 bg-[#f7f8fc] border-t border-[#dfe3ef]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Container Principal Estilo Corporativo */}
        <div className="bg-white border border-[#dfe3ef] rounded-2xl p-8 sm:p-12 shadow-sm">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Columna Izquierda: Formulario de Registro (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#820cd0]">
                  <ShieldCheck className="w-4 h-4 text-[#25c0d4]" />
                  <span>05 &bull; Registro & Acreditaciones</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b123b] tracking-tight">
                  Acreditación Oficial & Pase Digital QR
                </h2>
                <p className="text-sm text-[#676370] leading-relaxed">
                  Sistema de acreditación directa para participantes corporativos, delegaciones comerciales y visitantes generales. Emití tu credencial digital para ingreso ágil en los predios feriales.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-[#0b123b] mb-1.5 uppercase tracking-wider">
                    Nombre Completo / Razón Social *
                  </label>
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Lic. Martín Gutiérrez" 
                    className="w-full px-4 py-3 rounded-xl bg-[#f7f8fc] border border-[#dfe3ef] text-[#0b123b] placeholder-gray-400 text-sm focus:outline-none focus:bg-white focus:border-[#0b123b] transition-all font-medium"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0b123b] mb-1.5 uppercase tracking-wider">
                      Correo Electrónico Corporativo *
                    </label>
                    <input 
                      type="email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="martin@empresa.com" 
                      className="w-full px-4 py-3 rounded-xl bg-[#f7f8fc] border border-[#dfe3ef] text-[#0b123b] placeholder-gray-400 text-sm focus:outline-none focus:bg-white focus:border-[#0b123b] transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0b123b] mb-1.5 uppercase tracking-wider">
                      Categoría de Acceso *
                    </label>
                    <select 
                      value={passType}
                      onChange={(e) => setPassType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#f7f8fc] border border-[#dfe3ef] text-[#0b123b] text-sm focus:outline-none focus:bg-white focus:border-[#0b123b] transition-all font-semibold"
                    >
                      <option value="Empresa / Ronda B2B">Corporativo · Rondas B2B</option>
                      <option value="Visitante General">Público General</option>
                      <option value="Estudiante / Académico">Estudiante / Universitario</option>
                      <option value="Prensa Acreditada">Prensa & Medios Oficiales</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-white bg-[#0b123b] hover:bg-[#820cd0] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <QrCode className="w-4 h-4 text-[#25c0d4]" />
                  <span>Generar Credencial Digital</span>
                </button>
              </form>

            </div>

            {/* Columna Derecha: Vista Previa de Credencial (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-2xl bg-white border border-[#dfe3ef] p-6 text-center shadow-lg relative overflow-hidden">
                
                {/* Brand Line Accent */}
                <div className="w-full h-1.5 bg-gradient-to-r from-[#6424dc] via-[#19b9ca] to-[#7f08d5] absolute top-0 left-0" />

                <div className="flex items-center justify-between pb-3 border-b border-[#dfe3ef] mb-4 mt-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#820cd0]">
                    Pase Oficial ExpoJuy
                  </span>
                  <span className="text-[10px] font-mono text-[#676370] font-bold">
                    EJ-2026
                  </span>
                </div>

                {/* Código QR SVG */}
                <div className="bg-white p-4 rounded-xl border border-[#dfe3ef] inline-block mx-auto mb-4 shadow-sm">
                  <QRCodeSVG 
                    value={qrPayload}
                    size={140}
                    bgColor="#FFFFFF"
                    fgColor="#0b123b"
                    level="H"
                  />
                </div>

                <h4 className="text-lg font-black text-[#0b123b] leading-tight">
                  {name || 'Titular Acreditado'}
                </h4>
                <p className="text-xs font-bold text-[#820cd0] mt-1">
                  {passType}
                </p>

                <div className="mt-5 pt-3 border-t border-[#dfe3ef] grid grid-cols-2 text-[11px] text-[#676370]">
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider font-bold text-[#676370]">Vigencia</span>
                    <span className="text-[#0b123b] font-bold">9 - 12 Octubre</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider font-bold text-[#676370]">Predio</span>
                    <span className="text-[#0b123b] font-bold">Ciudad Cultural</span>
                  </div>
                </div>

                <button 
                  onClick={() => alert('Credencial descargada')}
                  className="mt-5 w-full py-2.5 rounded-xl bg-[#f7f8fc] hover:bg-[#0b123b] text-[#0b123b] hover:text-white transition-all border border-[#dfe3ef] text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Credencial</span>
                </button>

                {isGenerated && (
                  <p className="mt-3 text-[11px] text-emerald-600 font-bold flex items-center justify-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Acreditación confirmada
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
