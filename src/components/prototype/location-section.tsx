"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Box, Map, MapPin, Navigation } from "lucide-react";

const googleMaps = "https://www.google.com/maps/@-24.1828865,-65.3294615,18z";
const map3d = "https://demo.f4map.com/#lat=-24.1826364&lon=-65.3299970&zoom=19&camera.theta=42.995&camera.phi=-31.799";
const referenceImage = "/images/evento/mapa-ciudad-cultural-referencia.png";
const views = [
  { id: "google", label: "Google Maps", icon: MapPin },
  { id: "3d", label: "Vista 3D", icon: Box },
  { id: "reference", label: "Plano", icon: Map },
] as const;
type View = (typeof views)[number]["id"];

export function LocationSection() {
  const [view, setView] = useState<View>("google");
  const externalUrl = view === "reference" ? referenceImage : view === "google" ? googleMaps : map3d;

  return (
    <section id="ubicacion" className="expo-location" aria-labelledby="location-title">
      <div className="expo-location-layout">
        <div className="expo-location-info">
          <div><h2 id="location-title">Ciudad Cultural<span>.</span></h2><p>San Salvador de Jujuy, Argentina</p></div>


          <a className="expo-location-directions" href="https://www.google.com/maps/dir/?api=1&destination=-24.1828865,-65.3294615" target="_blank" rel="noopener noreferrer">
            <Navigation size={18} aria-hidden="true" /> Cómo llegar <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="expo-location-map" data-view={view}>
          <div className="expo-location-toolbar">
            <div className="expo-location-switch" role="group" aria-label="Vista del mapa">
              {views.map(({ id, label, icon: Icon }) => (
                <button key={id} type="button" aria-pressed={view === id} aria-controls="location-view" onClick={() => setView(id)}>
                  <Icon size={16} aria-hidden="true" />{label}
                </button>
              ))}
            </div>
            <a className="expo-location-expand" href={externalUrl} target="_blank" rel="noopener noreferrer" aria-label="Abrir vista del mapa en una nueva pestaña"><ArrowUpRight size={20} aria-hidden="true" /></a>
          </div>
          <div id="location-view" className="expo-location-view">
            {view === "reference" ? (
              <a className="expo-location-reference" href={referenceImage} target="_blank" rel="noopener noreferrer" aria-label="Ampliar plano de referencia de Ciudad Cultural">
                <Image src={referenceImage} alt="Plano de Ciudad Cultural: operativo de tránsito del Carnaval de Los Tekis, del 13 al 16 de febrero de 2026, con accesos y paradas de transporte de ese evento." fill sizes="(max-width: 900px) 100vw, 760px" />
              </a>
            ) : (
              <iframe key={view} title={view === "google" ? "Ciudad Cultural en Google Maps" : "Ciudad Cultural en 3D con F4map"} src={view === "google" ? "https://maps.google.com/maps?q=-24.1828865,-65.3294615&z=18&output=embed" : map3d} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
            )}
          </div>
          {view === "reference" && (<p className="expo-location-caption">Plano de referencia del Carnaval de Los Tekis 2026. Los accesos y cortes indicados no corresponden al operativo de ExpoJuy.</p>)}
        </div>
      </div>
    </section>
  );
}
