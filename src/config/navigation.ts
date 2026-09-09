import { NavItem } from "@/types/navigation";

export const navigationConfig: NavItem[] = [
  {
    label: "Descubrir ExpoJuy",
    href: "#",
    subItems: [
      { label: "Sobre ExpoJuy", href: "/about-us" },
      { label: "Impacto Sostenible", href: "/our-sustainable-impact" },
      { label: "Prensa y Noticias", href: "/media-library" },
      { label: "Testimonios", href: "/client-stories" },
    ],
  },
  {
    label: "Exponer en ExpoJuy",
    href: "#",
    subItems: [
      { label: "Información Expositores", href: "/plan-your-event" },
      {
        label: "Sectores y Pabellones",
        href: "#",
        children: [
          { label: "Pabellones Industriales", href: "/venue-spaces/exhibition-halls" },
          { label: "Salas y Foros B2B", href: "/venue-spaces/meeting-rooms" },
          { label: "Escenarios y Espectáculos", href: "/venue-spaces/concert-venues" },
        ],
      },
      { label: "Gastronomía Regional", href: "/event-catering" },
      { label: "Stands y Servicios", href: "/event-packages" },
      {
        label: "Ronda de Negocios",
        href: "/expo-advantage-program",
        children: [
          { label: "Hoteles y Alojamiento", href: "/expo-advantage-program/hotel-partners" },
        ],
      },
      { label: "Plano del Predio", href: "/virtual-tour" },
    ],
  },
  {
    label: "Agenda y Eventos",
    href: "#",
    subItems: [
      { label: "Programa de Charlas", href: "/events-at-expo" },
      { label: "Patio Gastronómico", href: "/feast-and-play#feast" },
      { label: "Networking y Cultura", href: "/feast-and-play#play" },
    ],
  },
  {
    label: "Contacto",
    href: "/contact-us",
    subItems: [
      { label: "Contactarse", href: "/contact-us" },
      { label: "Cómo Llegar", href: "/getting-here" },
      { label: "Atención al Visitante", href: "/lost-and-found" },
    ],
  },
];
