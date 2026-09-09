"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Menu, X } from "lucide-react";
import ExpoJuyLogo from "@/components/ExpoJuyLogo";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface SiteHeaderProps {
  showDockedLogo?: boolean;
  onReplayIntro?: () => void;
}

export function SiteHeader({ onReplayIntro }: SiteHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(() => {
    const header = headerRef.current;
    if (!header) return;

    const setLight = () => {
      gsap.to(header, {
        backgroundColor: "rgba(247, 248, 252, 0.94)",
        borderColor: "rgba(11, 18, 59, 0.11)",
        color: "#0b123b",
        backdropFilter: "blur(18px)",
        duration: 0.25,
        overwrite: "auto",
      });
      header.dataset.theme = "light";
    };

    const setDark = () => {
      gsap.to(header, {
        backgroundColor: "rgba(5, 8, 24, 0)",
        borderColor: "rgba(255, 255, 255, 0)",
        color: "#ffffff",
        backdropFilter: "blur(0px)",
        duration: 0.25,
        overwrite: "auto",
      });
      header.dataset.theme = "dark";
    };

    const trigger = ScrollTrigger.create({
      trigger: "#sobre",
      start: "top 72px",
      onEnter: setLight,
      onLeaveBack: setDark,
    });

    const about = document.querySelector<HTMLElement>("#sobre");
    if (about && window.scrollY >= about.offsetTop - 72) setLight();

    return () => trigger.kill();
  }, []);

  return (
    <header
      ref={headerRef}
      data-theme="dark"
      className="site-header group fixed inset-x-0 top-0 z-50 h-[var(--header-height)] border-b border-transparent text-white transition-colors"
    >
      <div className="mx-auto flex h-full max-w-[1480px] items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* LOGO DE MARCA DOCKED CON ID DE DESTINO PARA LA INTRO */}
        <div className="flex items-center gap-3">
          <a
            href="#inicio"
            id="navbar-logo-target"
            aria-label="Ir al inicio"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="relative h-10 w-7 sm:h-11 sm:w-8">
              <ExpoJuyLogo className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-105" />
            </div>
            <span className="brand-wordmark text-[1.05rem] font-bold tracking-[-0.04em] leading-none">
              EXPOJUY
              <span className="ml-1.5 align-top text-[0.58em] font-semibold tracking-[0.04em]">
                2026
              </span>
            </span>
          </a>

          {/* BOTÓN SUTIL PARA REPETIR LA INTRO */}
          {onReplayIntro && (
            <button
              type="button"
              onClick={onReplayIntro}
              title="Ver animación de entrada de marca"
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-current/70 hover:text-current border border-current/20 hover:border-current/50 rounded-sm transition-all cursor-pointer"
            >
              <span>↺ Intro</span>
            </button>
          )}
        </div>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegación principal">
          <a className="text-sm font-semibold hover:opacity-70 transition-opacity" href="#sobre">
            Sobre ExpoJuy
          </a>
          <a className="text-sm font-semibold hover:opacity-70 transition-opacity" href="#expositores">
            Expositores
          </a>
          <Button
            asChild
            className="h-10 rounded-md bg-[#6b20df] px-5 text-white shadow-[0_8px_24px_rgba(80,15,175,.25)] hover:bg-[#5917c2]"
          >
            <a href="#expositores">
              Quiero participar
              <ArrowUpRight aria-hidden className="size-4" />
            </a>
          </Button>
        </nav>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-md border border-current/25 lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
        </button>
      </div>

      {open && (
        <nav
          className="mx-3 grid gap-2 rounded-lg border border-[#dfe3ef] bg-[#f7f8fc] p-3 text-[#0b123b] shadow-xl lg:hidden"
          aria-label="Navegación móvil"
        >
          <a className="rounded-md px-4 py-3 font-semibold" href="#sobre" onClick={() => setOpen(false)}>
            Sobre ExpoJuy
          </a>
          <a
            className="rounded-md px-4 py-3 font-semibold"
            href="#expositores"
            onClick={() => setOpen(false)}
          >
            Expositores
          </a>
          <Button asChild className="mt-1 h-11 rounded-md bg-[#6424dc] text-white">
            <a href="#expositores" onClick={() => setOpen(false)}>
              Quiero participar
              <ArrowUpRight aria-hidden className="size-4" />
            </a>
          </Button>

          {onReplayIntro && (
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onReplayIntro();
              }}
              className="mt-2 text-center text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-black py-2 border-t border-neutral-200"
            >
              ↺ Ver animación de entrada
            </button>
          )}
        </nav>
      )}
    </header>
  );
}
