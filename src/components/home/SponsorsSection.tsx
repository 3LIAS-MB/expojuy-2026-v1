"use client";

import Image from "next/image";

const sponsors = [
  { id: 1, name: "Sponsor 1", src: "/images/sponsors/1-DqeJkg9W.webp" },
  { id: 2, name: "Sponsor 2", src: "/images/sponsors/2-BIEp5tms.webp" },
  { id: 3, name: "Sponsor 3", src: "/images/sponsors/3-DZG25MF5.webp" },
  { id: 4, name: "Sponsor 4", src: "/images/sponsors/4-BhWZMpSy.webp" },
  { id: 5, name: "ExpoJuy 2026", src: "/images/LOGO.png" },
];

const acompanan = [
  { id: 1, name: "Acompañante 1", src: "/images/acompanan/1-eVB6Y33o.webp" },
  { id: 2, name: "Acompañante 2", src: "/images/acompanan/2-_DJwGfw4.webp" },
  { id: 3, name: "Acompañante 3", src: "/images/acompanan/3-Bvxgh0dh.webp" },
  { id: 4, name: "Acompañante 4", src: "/images/acompanan/5-po3hVP4a.webp" },
  { id: 5, name: "Acompañante 5", src: "/images/acompanan/6-BXeXyAx6.webp" },
];

// Duplicate items multiple times for smooth infinite seamless marquee scrolling
const duplicatedSponsors = [...sponsors, ...sponsors, ...sponsors, ...sponsors];
const duplicatedAcompanan = [...acompanan, ...acompanan, ...acompanan, ...acompanan];

export function SponsorsSection() {
  return (
    <section className="w-full bg-white text-slate-900 overflow-hidden py-4 my-3">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* 1. SPONSORS BLOCK */}
        <div className="text-center w-full mb-6">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-slate-900 tracking-tight mb-3">
            Nuestros Sponsors
          </h3>

          {/* Marquee Wrapper with thin 1px border and edge fade mask */}
          <div className="relative w-full overflow-hidden bg-white border-y border-slate-200 mt-2 [mask-image:linear-gradient(to_right,transparent_0%,black_6%,black_94%,transparent_100%)]">
            <div className="animate-marquee-track">
              {duplicatedSponsors.map((item, index) => (
                <div
                  key={`sponsor-${item.id}-${index}`}
                  className="bg-white border-r border-slate-200 min-w-[200px] sm:min-w-[230px] h-[105px] sm:h-[115px] flex items-center justify-center px-5 py-3 transition-all duration-300 hover:bg-slate-50 cursor-pointer group"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={item.src}
                      alt={item.name}
                      width={200}
                      height={90}
                      className="max-h-[85px] sm:max-h-[95px] max-w-[190px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-106"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. LOS QUE NOS ACOMPAÑAN BLOCK */}
        <div className="text-center w-full mt-6">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-slate-900 tracking-tight mb-3">
            Los Que Nos Acompañan
          </h3>

          {/* Reverse Marquee Wrapper with thin 1px border and edge fade mask */}
          <div className="relative w-full overflow-hidden bg-white border-y border-slate-200 mt-2 [mask-image:linear-gradient(to_right,transparent_0%,black_6%,black_94%,transparent_100%)]">
            <div className="animate-marquee-track-reverse">
              {duplicatedAcompanan.map((item, index) => (
                <div
                  key={`acompanan-${item.id}-${index}`}
                  className="bg-white border-r border-slate-200 min-w-[200px] sm:min-w-[230px] h-[105px] sm:h-[115px] flex items-center justify-center px-5 py-3 transition-all duration-300 hover:bg-slate-50 cursor-pointer group"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={item.src}
                      alt={item.name}
                      width={200}
                      height={90}
                      className="max-h-[85px] sm:max-h-[95px] max-w-[190px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-106"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
