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
  title: "ExpoJuy 2026 | Sitio Oficial",
  description: "Sitio Web Oficial de la 17° Edición de la Exposición Multisectorial del NOA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jakarta.variable} antialiased selection:bg-brand-aqua selection:text-brand-dark min-h-screen bg-[#070D1E] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
