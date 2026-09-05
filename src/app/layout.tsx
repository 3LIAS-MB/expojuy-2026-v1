import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ExpoJuy 2026 | 17° Edición • Conectando Países - Creando Oportunidades",
  description: "Sitio Web Oficial de la 17° Edición de la Exposición Multisectorial del NOA. 9 al 12 de Octubre de 2026, Ciudad Cultural, San Salvador de Jujuy.",
  keywords: ["ExpoJuy", "ExpoJuy 2026", "Jujuy", "Litio", "Energía Solar", "Agroindustria", "Corredor Bioceánico", "Economía del Conocimiento"],
  openGraph: {
    title: "ExpoJuy 2026 | 17° Edición",
    description: "Conectando países - creando oportunidades. 9 al 12 de Octubre de 2026, Ciudad Cultural.",
    url: "https://expojuy.com.ar",
    siteName: "ExpoJuy 2026",
    images: [
      {
        url: "/images/expojuy26_horizontal.jpg",
        width: 1200,
        height: 630,
        alt: "ExpoJuy 2026",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${jakarta.variable} antialiased selection:bg-brand-aqua selection:text-brand-dark relative bg-[#070D1E] overflow-x-hidden`}>
        {/* Lienzo Continuo de Luces y Gradientes Recorriendo Todo el Scroll (Hero Limpio) */}
        <div className="absolute inset-x-0 top-0 h-full pointer-events-none overflow-hidden z-0">
          {/* Luces a partir de las secciones inferiores (post-Hero) */}
          <div className="absolute top-[1200px] right-[5%] w-[850px] h-[650px] bg-gradient-to-b from-brand-violet/25 via-pilar-litio/20 to-pilar-solar/20 rounded-full blur-[150px]"></div>
          <div className="absolute top-[2200px] left-[5%] w-[800px] h-[600px] bg-gradient-to-r from-pilar-solar/20 via-brand-violet/25 to-brand-aqua/20 rounded-full blur-[150px]"></div>

          {/* Section 3: Agenda & Plano del Predio - Verde Agro & Naranja Logística */}
          <div className="absolute top-[3100px] right-[10%] w-[850px] h-[650px] bg-gradient-to-b from-pilar-agro/20 via-brand-violet/25 to-pilar-logistica/20 rounded-full blur-[150px]"></div>
          <div className="absolute top-[3900px] left-[10%] w-[800px] h-[600px] bg-gradient-to-r from-brand-violet/30 via-purple-900/25 to-brand-aqua/20 rounded-full blur-[140px]"></div>

          {/* Section 4: Acreditación, Noticias & Contacto - Púrpura & Violeta */}
          <div className="absolute top-[4800px] right-[5%] w-[900px] h-[650px] bg-gradient-to-b from-brand-violet/30 via-purple-950/35 to-brand-aqua/20 rounded-full blur-[160px]"></div>
          <div className="absolute top-[5600px] left-1/2 -translate-x-1/2 w-[1000px] h-[650px] bg-gradient-to-t from-purple-950/40 via-brand-violet/30 to-transparent rounded-full blur-[160px]"></div>
        </div>

        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
