"use client";

import { useEffect, useState, useRef } from "react";

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

// Static pixel checkerboard border — top edge (purple blocks cut into white)
function PixelBorderTop() {
  return (
    <div className="w-full overflow-hidden leading-[0] pointer-events-none select-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="w-full h-[80px] sm:h-[110px] lg:h-[140px]"
      >
        {/* The background of the svg is transparent (white page shows through) */}
        {/* We paint purple (#5E009D) blocks that "cut down" from the top — row 1 upper blocks */}
        {/* Row 1: top blocks (tall) */}
        <rect x="0"   y="0" width="100" height="48" fill="#5E009D"/>
        <rect x="150" y="0" width="90"  height="32" fill="#5E009D"/>
        <rect x="280" y="0" width="110" height="48" fill="#5E009D"/>
        <rect x="430" y="0" width="80"  height="40" fill="#5E009D"/>
        <rect x="550" y="0" width="100" height="56" fill="#5E009D"/>
        <rect x="690" y="0" width="90"  height="32" fill="#5E009D"/>
        <rect x="820" y="0" width="70"  height="48" fill="#5E009D"/>
        <rect x="930" y="0" width="110" height="40" fill="#5E009D"/>
        <rect x="1080" y="0" width="90" height="56" fill="#5E009D"/>

        {/* Row 2: lower staggered blocks (connecting to purple fill at bottom) */}
        <rect x="0"   y="48" width="100" height="32" fill="#5E009D"/>
        <rect x="100" y="32" width="50"  height="48" fill="#5E009D"/>
        <rect x="240" y="32" width="40"  height="48" fill="#5E009D"/>
        <rect x="390" y="40" width="40"  height="40" fill="#5E009D"/>
        <rect x="510" y="56" width="40"  height="24" fill="#5E009D"/>
        <rect x="650" y="32" width="40"  height="48" fill="#5E009D"/>
        <rect x="740" y="48" width="80"  height="32" fill="#5E009D"/>
        <rect x="890" y="40" width="40"  height="40" fill="#5E009D"/>
        <rect x="1040" y="56" width="40" height="24" fill="#5E009D"/>
        <rect x="1170" y="32" width="30" height="48" fill="#5E009D"/>

        {/* Full bottom strip — so the section color connects */}
        <rect x="0" y="64" width="1200" height="16" fill="#5E009D"/>
      </svg>
    </div>
  );
}

// Static pixel checkerboard border — bottom edge (purple blocks cut into white below)
function PixelBorderBottom() {
  return (
    <div className="w-full overflow-hidden leading-[0] pointer-events-none select-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="w-full h-[80px] sm:h-[110px] lg:h-[140px]"
      >
        {/* Full top strip — connects from section color */}
        <rect x="0" y="0" width="1200" height="16" fill="#5E009D"/>

        {/* Row 1: upper checkerboard offset from center */}
        <rect x="0"   y="16" width="80"  height="32" fill="#5E009D"/>
        <rect x="120" y="16" width="100" height="40" fill="#5E009D"/>
        <rect x="260" y="16" width="70"  height="32" fill="#5E009D"/>
        <rect x="380" y="16" width="90"  height="48" fill="#5E009D"/>
        <rect x="520" y="16" width="80"  height="32" fill="#5E009D"/>
        <rect x="640" y="16" width="110" height="40" fill="#5E009D"/>
        <rect x="790" y="16" width="80"  height="32" fill="#5E009D"/>
        <rect x="910" y="16" width="100" height="48" fill="#5E009D"/>
        <rect x="1060" y="16" width="80" height="32" fill="#5E009D"/>

        {/* Row 2: lower staggered blocks */}
        <rect x="0"   y="48" width="80"  height="32" fill="#5E009D"/>
        <rect x="80"  y="32" width="40"  height="48" fill="#5E009D"/>
        <rect x="200" y="48" width="60"  height="32" fill="#5E009D"/>
        <rect x="330" y="56" width="50"  height="24" fill="#5E009D"/>
        <rect x="470" y="48" width="50"  height="32" fill="#5E009D"/>
        <rect x="600" y="56" width="40"  height="24" fill="#5E009D"/>
        <rect x="750" y="48" width="40"  height="32" fill="#5E009D"/>
        <rect x="870" y="56" width="40"  height="24" fill="#5E009D"/>
        <rect x="1010" y="48" width="50" height="32" fill="#5E009D"/>
        <rect x="1140" y="56" width="60" height="24" fill="#5E009D"/>
      </svg>
    </div>
  );
}

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This legacy section gates time-dependent output until hydration is complete.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const targetDate = new Date("2026-10-09T09:00:00").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: days.toString().padStart(2, "0"),
          hours: hours.toString().padStart(2, "0"),
          minutes: minutes.toString().padStart(2, "0"),
          seconds: seconds.toString().padStart(2, "0"),
        });
      } else {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div id="cuenta-regresiva" ref={sectionRef} className="w-full relative flex flex-col items-center">
      {/* TOP STATIC PIXEL BORDER */}
      <PixelBorderTop />

      {/* SOLID PURPLE MAIN CONTAINER */}
      <section className="relative w-full bg-[#5E009D] text-white py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10 text-center">

          {/* Section Header */}
          <div className="mb-8 sm:mb-12">
            <span className="inline-block text-[#F8BF00] font-extrabold text-xs sm:text-sm tracking-[0.2em] uppercase mb-2">
              CUENTA REGRESIVA OFICIAL
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              EXPOJUY 2026 COMIENZA EN
            </h2>
          </div>

          {/* Timer Display */}
          <div className="flex flex-row items-baseline justify-center gap-3 sm:gap-6 md:gap-10 my-4 sm:my-6">
            {/* Days */}
            <div className="flex flex-col items-center">
              <span className="font-timer text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-widest text-white leading-none">
                {mounted ? timeLeft.days : "00"}
              </span>
              <span className="text-xs sm:text-sm lg:text-base font-semibold text-white/80 uppercase tracking-wider mt-3">
                Días / Days
              </span>
            </div>
            <div className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#F8BF00] self-start mt-[-4px]">:</div>

            {/* Hours */}
            <div className="flex flex-col items-center">
              <span className="font-timer text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-widest text-white leading-none">
                {mounted ? timeLeft.hours : "00"}
              </span>
              <span className="text-xs sm:text-sm lg:text-base font-semibold text-white/80 uppercase tracking-wider mt-3">
                Horas / Hours
              </span>
            </div>
            <div className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#F8BF00] self-start mt-[-4px]">:</div>

            {/* Minutes */}
            <div className="flex flex-col items-center">
              <span className="font-timer text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-widest text-white leading-none">
                {mounted ? timeLeft.minutes : "00"}
              </span>
              <span className="text-xs sm:text-sm lg:text-base font-semibold text-white/80 uppercase tracking-wider mt-3">
                Minutos / Minutes
              </span>
            </div>
            <div className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#F8BF00] self-start mt-[-4px]">:</div>

            {/* Seconds */}
            <div className="flex flex-col items-center">
              <span className="font-timer text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-widest text-white leading-none">
                {mounted ? timeLeft.seconds : "00"}
              </span>
              <span className="text-xs sm:text-sm lg:text-base font-semibold text-white/80 uppercase tracking-wider mt-3">
                Segundos / Seconds
              </span>
            </div>
          </div>

          {/* Sub-info line */}
          <div className="pt-6 sm:pt-8 border-t border-white/20 max-w-4xl mx-auto mt-8">
            <p className="text-xs sm:text-sm font-semibold tracking-widest text-white/90 uppercase">
              SAN SALVADOR DE JUJUY &bull; 9 AL 18 DE OCTUBRE DE 2026
            </p>
          </div>

        </div>
      </section>

      {/* BOTTOM STATIC PIXEL BORDER */}
      <PixelBorderBottom />
    </div>
  );
}
