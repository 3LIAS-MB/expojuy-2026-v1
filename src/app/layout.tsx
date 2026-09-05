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
      <body className={`${inter.variable} ${jakarta.variable} antialiased bg-white text-slate-900`}>
        {children}
      </body>
    </html>
  );
}
