export interface NavChildItem {
  label: string;
  href: string;
}

export interface NavSubItem {
  label: string;
  href: string;
  children?: NavChildItem[];
}

export interface NavItem {
  label: string;
  href?: string;
  subItems?: NavSubItem[];
}

export const navigationConfig: NavItem[] = [
  {
    label: "Descubrir ExpoJuy",
    href: "/descubrir",
    subItems: [
      { label: "Sobre la Expo", href: "/descubrir/sobre-la-expo" },
      { label: "Edición 2026", href: "/descubrir/edicion-2026" },
      { label: "Pilares Estratégicos", href: "/descubrir/pilares" },
      { label: "Autoridades & Comité", href: "/descubrir/autoridades" },
    ],
  },
  {
    label: "Exponer en ExpoJuy",
    href: "/exponer",
    subItems: [
      { label: "Reservar Stand", href: "/exponer/reservar-stand" },
      { label: "Beneficios de Exponer", href: "/exponer/beneficios" },
      { label: "Reglamento General", href: "/exponer/reglamento" },
      { label: "Plano del Predio", href: "/exponer/plano" },
    ],
  },
  {
    label: "Agenda y Eventos",
    href: "/agenda",
    subItems: [
      { label: "Cronograma de Actividades", href: "/agenda/cronograma" },
      { label: "Rondas de Negocios (B2B)", href: "/agenda/rondas-de-negocios" },
      { label: "Foros y Conferencias", href: "/agenda/conferencias" },
      { label: "Festivales y Shows", href: "/agenda/festivales" },
    ],
  },
  {
    label: "Contacto",
    href: "/contacto",
    subItems: [
      { label: "Preguntas Frecuentes", href: "/contacto/faq" },
      { label: "Cómo Llegar", href: "/contacto/ubicacion" },
      { label: "Prensa y Acreditaciones", href: "/contacto/prensa" },
    ],
  },
];
