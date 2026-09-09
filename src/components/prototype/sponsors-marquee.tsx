"use client";

import Image from "next/image";

const images = [
  { src: "/images/logo_sponsors/1-DqeJkg9W.webp", alt: "EXAR" },
  { src: "/images/logo_sponsors/2-BIEp5tms.webp", alt: "Compañía de Seguros de Jujuy" },
  { src: "/images/logo_sponsors/3-DZG25MF5.webp", alt: "Cannava Sociedad del Estado" },
  { src: "/images/logo_sponsors/4-BhWZMpSy.webp", alt: "KeLimpio" },
];

const supporters = [
  { src: "/images/logos_gobierno/1-eVB6Y33o.webp", alt: "Secretaría de Turismo, Ambiente y Deportes" },
  { src: "/images/logos_gobierno/2-_DJwGfw4.webp", alt: "Gobierno de Jujuy" },
  { src: "/images/logos_gobierno/3-Bvxgh0dh.webp", alt: "CFI" },
  { src: "/images/logos_gobierno/5-po3hVP4a.webp", alt: "Municipalidad de San Salvador de Jujuy" },
  { src: "/images/logos_gobierno/6-BXeXyAx6.webp", alt: "Cámara Argentina de Comercio y Servicios" },
];

export function SponsorsMarquee() {
  return (
    <section className="expo-sponsors" aria-labelledby="sponsors-title">
      <div className="expo-sponsors-heading">
        <div>
          <h2 id="sponsors-title">Sponsors</h2>
        </div>
      </div>
      <div id="sponsors-marquee" className="expo-sponsors-viewport" tabIndex={0} aria-label="Logos de sponsors">
        <div className="expo-sponsors-track">
          {[0, 1].map((copy) => (
            <div className="expo-sponsors-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {images.map((image) => (
                <figure className="expo-sponsors-frame" key={image.src}>
                  <Image src={image.src} alt={copy === 0 ? image.alt : ""} fill sizes="(max-width: 640px) 130px, 180px" draggable={false} />
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="expo-supporters" aria-labelledby="supporters-title">
        <h2 id="supporters-title">Nos acompañan</h2>
        <div className="expo-supporters-logos">
          {supporters.map((supporter) => (
            <div className="expo-supporters-logo" key={supporter.src}>
              <Image src={supporter.src} alt={supporter.alt} fill sizes="(max-width: 640px) 42vw, 180px" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
