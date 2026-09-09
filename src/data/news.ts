export type NewsCategory =
  | 'Comercio & B2B'
  | 'Minería & Litio'
  | 'Energías Renovables'
  | 'Agroindustria'
  | 'Cultura & Festivales';

export interface NewsAuthor {
  name: string;
  role: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  paragraphs: string[];
  category: NewsCategory;
  date: string;
  publishedAt: string;
  readTime: string;
  image: string;
  featured?: boolean;
  tags: string[];
  author: NewsAuthor;
  highlightQuote?: {
    quote: string;
    author: string;
  };
}

export const NEWS_CATEGORIES: ('Todos' | NewsCategory)[] = [
  'Todos',
  'Comercio & B2B',
  'Minería & Litio',
  'Energías Renovables',
  'Agroindustria',
  'Cultura & Festivales',
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'noticia-1',
    slug: 'delegaciones-corredor-bioceanico-confirmadas',
    title: 'Confirmaron la participación de 6 delegaciones internacionales del Corredor Bioceánico',
    summary:
      'Comitivas diplomáticas y comerciales de Brasil, Chile, Paraguay y Bolivia formarán parte de las mesas de intercambio y las rondas B2B matutinas en Ciudad Cultural.',
    paragraphs: [
      'La Cámara de Comercio Exterior de Jujuy oficializó el cronograma de delegaciones extranjeras que arribarán a San Salvador de Jujuy para la 17° edición de ExpoJuy 2026. Con el Corredor Bioceánico de Capricornio como eje neurálgico, más de 80 empresas transnacionales buscarán cerrar acuerdos directos con el entramado productivo del NOA.',
      'El segmento matutino (09:00 a 14:00 hs) albergará Rondas de Negocios Inteligentes con matchmaking algorítmico, donde los sectores logísticos de los puertos de Iquique, Antofagasta y Santos coordinarán enlaces operativos con la Zona Franca de Perico.',
      'Esta articulación consolida a Jujuy como el nodo geográfico y logístico indispensable para el transporte multimodal y el comercio transcontinental hacia el mercado asiático.',
    ],
    category: 'Comercio & B2B',
    date: '1 de Septiembre, 2026',
    publishedAt: '2026-09-01',
    readTime: '4 min de lectura',
    image: '/images/evento/evento_conferencia.png',
    featured: true,
    tags: ['Corredor Bioceánico', 'B2B', 'Zona Franca', 'Rondas de Negocios'],
    author: {
      name: 'Prensa CCEJ',
      role: 'Cámara de Comercio Exterior de Jujuy',
    },
    highlightQuote: {
      quote:
        'ExpoJuy no es solo una feria de exhibición; es la plataforma operativa donde se cierran contratos que impactan en toda la región de Capricornio.',
      author: 'Comisión Directiva CCEJ',
    },
  },
  {
    id: 'noticia-2',
    slug: 'litio-jujuy-industrializacion-valor-agregado',
    title: 'El complejo litífero jujeño presentará nuevas metas de industrialización local',
    summary:
      'JEMSE y las firmas radicadas en los salares de la Puna darán a conocer convenios para la producción local de celdas y baterías de almacenamiento sustentable.',
    paragraphs: [
      'El Pabellón Cubierto 1 de Ciudad Cultural concentrará una muestra inédita sobre el presente y futuro del Triángulo del Litio. Empresas operadoras junto a JEMSE expondrán el impacto socioeconómico y las innovaciones de extracción sustentable con circuito cerrado de agua.',
      'Uno de los hitos de esta edición será la presentación de la segunda fase de radicación de fábricas de componentes de litio en territorio provincial, orientadas tanto al transporte eléctrico como a sistemas solares de gran escala.',
      'Durante las jornadas técnicas se llevarán a cabo disertaciones sobre valor agregado en origen, formación de ingenieros locales y el rol estratégico de las comunidades originarias en el desarrollo minero responsable.',
    ],
    category: 'Minería & Litio',
    date: '28 de Agosto, 2026',
    publishedAt: '2026-08-28',
    readTime: '3 min de lectura',
    image: '/images/evento/sector_mineria.png',
    tags: ['Litio', 'JEMSE', 'Puna', 'Baterías', 'Sustentabilidad'],
    author: {
      name: 'Dirección de Minería',
      role: 'Ministerio de Producción de Jujuy',
    },
  },
  {
    id: 'noticia-3',
    slug: 'parque-solar-cauchari-hidrogeno-verde-paneles',
    title: 'Cauchari 4 y 5: se presentará la hoja de ruta para la ampliación solar a 500 MW',
    summary:
      'Especialistas en transición energética analizarán el impacto del mayor complejo fotovoltaico de altura y los primeros pilotos provinciales de hidrógeno verde.',
    paragraphs: [
      'En el marco del pilar de Energías Renovables, autoridades provinciales y referentes energéticos mundiales debatirán sobre la evolución del Parque Solar Cauchari, ubicado a más de 4.000 metros de altura en el departamento Susques.',
      'El proyecto contempla la inyección de 200 MW adicionales a la red troncal nacional, sumando innovación en sistemas de almacenamiento BESS (baterías a gran escala) y la apertura hacia proyectos de generación de hidrógeno verde para descarbonizar la industria minera.',
      'Los visitantes podrán experimentar en un stand inmersivo un recorrido virtual 360° por la planta solar y conocer los avances en electrificación rural aislada.',
    ],
    category: 'Energías Renovables',
    date: '24 de Agosto, 2026',
    publishedAt: '2026-08-24',
    readTime: '5 min de lectura',
    image: '/images/evento/hall-banner.jpg',
    tags: ['Cauchari', 'Solar', 'Transición Energética', 'Hidrógeno Verde'],
    author: {
      name: 'Secretaría de Energía',
      role: 'Gobierno de Jujuy',
    },
  },
  {
    id: 'noticia-4',
    slug: 'formato-4-dias-dinamica-dual-cero-papel',
    title: 'ExpoJuy 2026 revoluciona su formato: 4 jornadas intensivas y credencialización 100% digital QR',
    summary:
      'La reingeniería ferial optimiza costos logísticos y garantiza una experiencia Cero Papel mediante pases QR accesibles sin conexión a internet.',
    paragraphs: [
      'Para esta 17° edición, el comité ferial condensó el evento en cuatro jornadas completas (del 9 al 12 de Octubre de 2026), articuladas bajo el Switcher de Dinámica Dual: mañanas exclusivas para el ecosistema B2B y tardes/noches abiertas a la comunidad y las familias.',
      'Siguiendo estrictas metas de sustentabilidad, se abolió el uso de entradas de papel. A través del portal web oficial, expositores, periodistas y público general generan su credencial criptográfica en código QR, la cual queda guardada en el dispositivo móvil y funciona sin necesidad de señal 4G en los accesos de Ciudad Cultural.',
      'La medida supone un ahorro de más de 4 toneladas de papel y agiliza los ingresos a menos de 3 segundos por persona.',
    ],
    category: 'Comercio & B2B',
    date: '20 de Agosto, 2026',
    publishedAt: '2026-08-20',
    readTime: '3 min de lectura',
    image: '/images/evento/ciudad_cultural.png',
    tags: ['Cero Papel', 'QR Digital', 'Dinámica Dual', 'Sustentabilidad'],
    author: {
      name: 'Comité Organizador',
      role: 'ExpoJuy 2026',
    },
  },
  {
    id: 'noticia-5',
    slug: 'bioeconomia-canonera-vinos-de-altura-agroindustria',
    title: 'Agroindustria y bioenergía: el potencial de la caña, el tabaco y los vinos de extrema altura',
    summary:
      'Grandes complejos agropecuarios del Ramal y pequeños vitivinicultores de la Quebrada de Humahuaca compartirán espacio para mostrar la diversidad productiva de Jujuy.',
    paragraphs: [
      'La matriz productiva jujeña despliega todo su potencial en el Pabellón 2 y en los sectores descubiertos. Con empresas líderes como Ledesma exponiendo sus avances en bioetanol, bioplásticos y papel natural sustentable, la agroindustria refuerza su protagonismo económico.',
      'En paralelo, las bodegas de la Quebrada de Humahuaca —cuyos viñedos superan los 2.500 y 3.300 msnm— ofrecerán degustaciones guiadas y catas técnicas destacando el valor de los vinos con denominación de origen y reconocimiento en certámenes internacionales.',
      'Se sumarán rondas específicas para exportación de legumbres, cítricos y derivados de fibra de camélidos (llama y vicuña).',
    ],
    category: 'Agroindustria',
    date: '15 de Agosto, 2026',
    publishedAt: '2026-08-15',
    readTime: '4 min de lectura',
    image: '/images/evento/11-Bv-B7Fmn.jpg',
    tags: ['Bioetanol', 'Vinos de Altura', 'Agroindustria', 'Economías Regionales'],
    author: {
      name: 'Redacción ExpoJuy',
      role: 'Prensa Agropecuaria',
    },
  },
  {
    id: 'noticia-6',
    slug: 'festival-cultural-patio-gastronomico-artistas',
    title: 'Anunciaron la grilla artística nocturna y el Patio Gastronómico Sabores Andinos',
    summary:
      'Más de 25 agrupaciones folclóricas, solistas y ballets jujeños animarán el escenario central cada noche a partir de las 19:00 hs.',
    paragraphs: [
      'Al caer la tarde, Ciudad Cultural se transforma en un festival abierto a toda la familia. La Cámara de Comercio Exterior y la Secretaría de Cultura presentaron el cartel artístico oficial para las 4 noches feriales.',
      'El patio gastronómico contará con 30 puestos curados con platos tradicionales andinos: empanadas de carne cortada a cuchillo, cazuelas de llama, tamales de humita fresca y cervecerías artesanales jujeñas con infusiones de hierbas puneñas.',
      'El cierre de cada jornada incluirá un espectáculo de mapping lumínico y música en vivo que festeja la identidad y el orgullo de Jujuy.',
    ],
    category: 'Cultura & Festivales',
    date: '10 de Agosto, 2026',
    publishedAt: '2026-08-10',
    readTime: '3 min de lectura',
    image: '/images/evento/gastronomia.jpg',
    tags: ['Festival', 'Gastronomía Andina', 'Cultura', 'Shows en Vivo'],
    author: {
      name: 'Secretaría de Cultura',
      role: 'Gobierno de Jujuy',
    },
  },
  {
    id: 'noticia-7',
    slug: 'ecosistema-tech-startups-software-jujuy',
    title: 'Economía del conocimiento: startups jujeñas exhibirán desarrollos en IA y agro-tech',
    summary:
      'El polo tecnológico provincial reunirá a 20 emprendimientos digitales con soluciones aplicadas al agro, la minería y el comercio exterior.',
    paragraphs: [
      'El espacio de innovación en Ciudad Cultural pondrá el foco en el talento joven de la provincia. Desarrolladores y fundadores presentarán sensores IoT para monitoreo de cultivos en altura y algoritmos de optimización de rutas para el transporte minero.',
      'Además, se realizarán clínicas de vinculación con aceleradoras y fondos de capital de riesgo para escalar productos concebidos en Jujuy hacia el mercado global.',
    ],
    category: 'Comercio & B2B',
    date: '5 de Agosto, 2026',
    publishedAt: '2026-08-05',
    readTime: '3 min de lectura',
    image: '/images/evento/4c13475b-322b-4097-a0d0.jpg',
    tags: ['Tecnología', 'Startups', 'IA', 'AgroTech'],
    author: {
      name: 'Polo Tecnológico Jujuy',
      role: 'Dirección de Innovación',
    },
  },
  {
    id: 'noticia-8',
    slug: 'acreditacion-periodistas-medios-sala-prensa',
    title: 'Abrió el registro de acreditaciones de prensa para cobertura nacional e internacional',
    summary:
      'Periodistas y reporteros gráficos ya pueden tramitar su pase digital con acceso prioritario al auditorio y conferencias exclusivas.',
    paragraphs: [
      'Los equipos de comunicación dispondrán de una sala de prensa totalmente equipada con conectividad de alta velocidad, streaming oficial y gacetillas con embargo coordinadas por la Cámara de Comercio Exterior.',
      'El trámite se realiza en línea a través de la sección de Acreditación con emisión inmediata de credencial con código QR.',
    ],
    category: 'Comercio & B2B',
    date: '1 de Agosto, 2026',
    publishedAt: '2026-08-01',
    readTime: '2 min de lectura',
    image: '/images/evento/about-us.jpg',
    tags: ['Prensa', 'Acreditaciones', 'Medios', 'Ciudad Cultural'],
    author: {
      name: 'Departamento de Prensa',
      role: 'CCEJ',
    },
  },
];

