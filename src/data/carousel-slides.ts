export interface CarouselSlide {
  id: string;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  image: string;
  aspectRatio: string;
  widthClass: string;
  baseX: number;       // Posición X en porcentaje de viewport (-60 a 60)
  baseY: number;       // Desfase vertical Y en porcentaje (-25 a 25)
  baseZ: number;       // Profundidad espacial Z en píxeles (-800 a 400)
  baseRotX: number;    // Inclinación 3D en grados
  baseRotY: number;    // Rotación yaw 3D
  baseRotZ: number;    // Rotación roll 3D
}

export const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: "litio",
    number: "01",
    category: "TRANSICIÓN ENERGÉTICA",
    title: "Minería & Litio",
    subtitle: "Salar de Olaroz y Salinas Grandes: corazón del triángulo del litio en el Cono Sur.",
    image: "/images/sectores/litio_salar.jpg",
    aspectRatio: "aspect-[4/5]",
    widthClass: "w-[260px] sm:w-[320px] md:w-[360px] lg:w-[400px]",
    baseX: -36,
    baseY: 14,
    baseZ: 320,
    baseRotX: 5,
    baseRotY: 12,
    baseRotZ: -3,
  },
  {
    id: "solar",
    number: "02",
    category: "PARQUE CAUCHARI 300 MW",
    title: "Energía Solar & Limpia",
    subtitle: "La mayor planta fotovoltaica a más de 4.000 msnm que abastece la red nacional.",
    image: "/images/sectores/cauchari_solar.jpg",
    aspectRatio: "aspect-[3/4]",
    widthClass: "w-[250px] sm:w-[300px] md:w-[340px] lg:w-[380px]",
    baseX: -14,
    baseY: -12,
    baseZ: 140,
    baseRotX: -3,
    baseRotY: 6,
    baseRotZ: 2,
  },
  {
    id: "industria",
    number: "03",
    category: "COMPLEJO PRODUCTIVO",
    title: "Industria & Infraestructura",
    subtitle: "Parques industriales, metalmecánica y logística para transformar el NOA.",
    image: "/images/evento/hall-banner.jpg",
    aspectRatio: "aspect-[4/3]",
    widthClass: "w-[280px] sm:w-[340px] md:w-[380px] lg:w-[440px]",
    baseX: 8,
    baseY: 10,
    baseZ: -80,
    baseRotX: 2,
    baseRotY: -5,
    baseRotZ: -1,
  },
  {
    id: "tech",
    number: "04",
    category: "ECONOMÍA DEL CONOCIMIENTO",
    title: "Innovación Aplicada",
    subtitle: "Biotecnología, software e investigación aplicada al desarrollo territorial.",
    image: "/images/evento/evento_conferencia.png",
    aspectRatio: "aspect-[3/4]",
    widthClass: "w-[250px] sm:w-[310px] md:w-[350px] lg:w-[390px]",
    baseX: 30,
    baseY: -15,
    baseZ: -280,
    baseRotX: -4,
    baseRotY: -11,
    baseRotZ: 3,
  },
  {
    id: "agro",
    number: "05",
    category: "CADENAS DE VALOR",
    title: "Agroindustria & Valles",
    subtitle: "Producción tabacalera, cañera, legumbres y frutos andinos de exportación.",
    image: "/images/evento/11-Bv-B7Fmn.jpg",
    aspectRatio: "aspect-[4/5]",
    widthClass: "w-[260px] sm:w-[310px] md:w-[350px] lg:w-[390px]",
    baseX: 52,
    baseY: 12,
    baseZ: -480,
    baseRotX: 4,
    baseRotY: -15,
    baseRotZ: -2,
  },
  {
    id: "comercio",
    number: "06",
    category: "INTEGRACIÓN REGIONAL",
    title: "Corredor Bioceánico",
    subtitle: "Eje geopolítico clave de vinculación comercial entre el Atlántico y el Pacífico.",
    image: "/images/evento/expo.png",
    aspectRatio: "aspect-[4/3]",
    widthClass: "w-[280px] sm:w-[340px] md:w-[380px] lg:w-[440px]",
    baseX: 72,
    baseY: -9,
    baseZ: -680,
    baseRotX: -2,
    baseRotY: -18,
    baseRotZ: 2,
  },
];
