import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const ambit = localFont({
  src: [
    { path: "../../public/fonts/Ambit-Light.otf", weight: "300", style: "normal" },
    { path: "../../public/fonts/Ambit-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Ambit-SemiBold.otf", weight: "600", style: "normal" },
    { path: "../../public/fonts/Ambit-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-ambit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ExpoJuy 2026 | El futuro se encuentra en Jujuy",
  description:
    "Prototipo de ExpoJuy 2026, encuentro multisectorial de industria, innovación, cultura y oportunidades en Jujuy.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={ambit.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
