"use client";

import { useEffect } from "react";
import L from "leaflet";

interface LeafletMapProps {
  mapTileMode: "google" | "dark" | "satellite";
}

export default function LeafletMap({ mapTileMode }: LeafletMapProps) {
  useEffect(() => {
    // Fix default marker icon paths in Leaflet bundlers
    delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

    const map = L.map("expojuy-map", {
      center: [-24.1673, -65.3134],
      zoom: 15,
      zoomControl: true,
      scrollWheelZoom: false,
    });

    let tileUrl = "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}";
    let attribution = '&copy; <a href="https://maps.google.com">Google Maps</a>';

    if (mapTileMode === "dark") {
      tileUrl = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
      attribution = '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap';
    } else if (mapTileMode === "satellite") {
      tileUrl = "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}";
      attribution = '&copy; <a href="https://maps.google.com">Google Maps Satellite</a>';
    }

    L.tileLayer(tileUrl, {
      maxZoom: 19,
      attribution,
      subdomains: mapTileMode === "dark" ? ["a", "b", "c", "d"] : [],
    }).addTo(map);

    // Custom Glowing EXPOJUY Pin Icon
    const customIcon = L.divIcon({
      className: "custom-map-pin",
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 44px; height: 44px;">
          <div style="position: absolute; width: 44px; height: 44px; background-color: #2b00ff; opacity: 0.4; border-radius: 50%; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: relative; width: 36px; height: 36px; background-color: #5E009D; border: 3px solid #F8BF00; border-radius: 50%; box-shadow: 0 10px 25px rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; color: white;">
            <svg style="width: 20px; height: 20px; fill: #F8BF00;" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 22],
    });

    const marker = L.marker([-24.1673, -65.3134], { icon: customIcon }).addTo(map);

    const popupContent = `
      <div style="font-family: system-ui, -apple-system, sans-serif; padding: 6px; min-width: 220px;">
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
          <span style="background-color: #5E009D; color: #F8BF00; font-size: 10px; font-weight: 900; padding: 2px 6px; border-radius: 2px; text-transform: uppercase;">EXPOJUY 2026</span>
        </div>
        <h4 style="font-weight: 800; color: #0f172a; margin: 0 0 4px 0; font-size: 15px; line-height: 1.2;">ExpoJuy 2026 - Ciudad Cultural</h4>
        <p style="color: #475569; margin: 0 0 10px 0; font-size: 12px; line-height: 1.4;">Predio ferial en Alto Padilla, San Salvador de Jujuy</p>
        <a href="https://www.google.com/maps?q=-24.1673,-65.3134" target="_blank" rel="noopener noreferrer" style="display: inline-flex; items-center: center; gap: 4px; background-color: #2b00ff; color: white; padding: 6px 12px; font-weight: 800; font-size: 11px; text-transform: uppercase; text-decoration: none; border-radius: 2px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
          <span>ABRIR EN GOOGLE MAPS</span>
        </a>
      </div>
    `;

    marker.bindPopup(popupContent).openPopup();

    return () => {
      map.remove();
    };
  }, [mapTileMode]);

  return <div id="expojuy-map" className="w-full h-full min-h-[480px] sm:min-h-[560px] lg:min-h-[640px] rounded-lg overflow-hidden shadow-2xl border border-slate-200 z-0" />;
}
