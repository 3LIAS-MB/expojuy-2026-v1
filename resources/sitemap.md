# Arquitectura de Información y Sitemap — ExpoJuy 2026

Este documento define la estructura de navegación, jerarquía y contenido pantalla por pantalla para el diseño conceptual y prototipado del sitio web oficial de **ExpoJuy 2026**, cumpliendo con las consignas técnicas y secciones requeridas por la organización.

---

## 1. Estructura Jerárquica Global

```text
[Header / Barra de Navegación Principal]
 ├── 1.0 Inicio (Home)
 ├── 2.0 El Evento (Sobre ExpoJuy 2026)
 ├── 3.0 Expositores (Directorio y Catálogo)
 ├── 4.0 Agenda (Cronograma de Actividades)
 ├── 5.0 Mapa del Predio (Plano Interactivo)
 ├── 6.0 Noticias y Prensa
 └── [CTA Principal] Entradas / Acreditaciones

[Secciones Complementarias y Enlaces de Footer]
 ├── 7.0 Sponsors / Patrocinadores
 ├── 8.0 Preguntas Frecuentes (FAQ)
 ├── 9.0 Contacto y Cómo Llegar
 └── 10.0 Portal del Expositor (Espacio de vinculación / servicios)
```

---

## 2. Desglose Detallado Pantalla por Pantalla

### 1.0 Inicio (Home)

- **Hero Section:**
  - Título principal y lema institucional (_Innovación · Talento · Desarrollo_).
  - Fechas del evento, sede y accesos directos principales (_Comprar Entradas_ y _Ver Mapa del Predio_).
- **Cifras de impacto:**
  - Contadores dinámicos: cantidad de expositores confirmados, metros cuadrados de predio y sectores productivos presentes.
- **Ejes temáticos:**
  - Tarjetas interactivas con los sectores clave: Minería sustentable, Agroindustria, Energías renovables, Economía del Conocimiento y Comercio Exterior.
- **Destacados de Agenda:**
  - Carrusel o lista con las conferencias magistrales, rondas y espectáculos destacados del día.
- **Buscador rápido de Expositores:**
  - Barra de búsqueda directa para consultar empresas por nombre o rubro sin salir de la página principal.
- **Preview del Plano:**
  - Vista previa esquemática del predio con botón de llamada a la acción para abrir el mapa interactivo.
- **Sección de Novedades:**
  - Últimas 3 noticias o comunicados institucionales.
- **Tira de Sponsors:**
  - Carrusel de logotipos de patrocinadores y entidades organizadoras.

---

### 2.0 El Evento (Sobre ExpoJuy 2026)

- **2.1 Presentación institucional:**
  - Misión, visión e impacto socioeconómico en el Norte Argentino.
- **2.2 Ejes estratégicos:**
  - Enfoque en la innovación tecnológica, el desarrollo productivo y la vinculación empresarial.
- **2.3 Autoridades y organizadores:**
  - Información sobre la Cámara de Comercio Exterior de Jujuy y entidades asociadas.
- **2.4 Información de sede y accesibilidad:**
  - Ubicación física, accesibilidad motriz, puntos de primeros auxilios y servicios generales en el predio.

---

### 3.0 Expositores (Módulo de Vinculación Comercial)

- **3.1 Directorio general de stands:**
  - Barra de búsqueda predictiva.
  - Filtro por rubro/sector productivo (Minería, Agroindustria, Software, Construcción, etc.).
  - Filtro por sector o pabellón dentro del predio.
  - Vista en cuadrícula o lista (tarjetas con logo, rubro y número de stand).
- **3.2 Ficha de detalle del expositor (Modal o Página):**
  - Perfil institucional de la empresa y descripción de actividades.
  - Catálogo de productos y servicios.
  - Botón directo para geolocalizar el stand dentro del _Mapa del Predio_.
  - Canales de contacto directo (sitio web, WhatsApp comercial, correo, LinkedIn).
  - Formulario para solicitud de reunión o vinculación comercial.

---

### 4.0 Agenda de Actividades

- **4.1 Cronograma interactivo:**
  - Filtro por día del evento.
  - Filtro por tipología de evento (Conferencias, Talleres prácticos, Rondas de negocios, Espectáculos).
  - Tarjetas de actividad con hora de inicio/fin, disertante, temática y auditorio/sala asignada.
- **4.2 Integración funcional:**
  - Botón _"Agregar a mi calendario"_ compatible con Google Calendar, Apple Calendar y Outlook (.ics).
  - Indicador de estado o cupos disponibles (para talleres con inscripción previa).

---

### 5.0 Mapa del Predio

- **5.1 Visor interactivo:**
  - Mapa vectorial escalable (SVG interactivo o canvas).
  - División visual por pabellones, áreas exteriores, auditorios, patio gastronómico, sanitarios y salidas de emergencia.
  - Marcadores interactivos en cada stand con acceso directo a la ficha del expositor.
  - Controles de zoom, paneo y botón para centrar la vista.
- **5.2 Descargas:**
  - Botón para descargar el plano oficial en formato PDF de alta resolución.

---

### 6.0 Noticias y Sala de Prensa

- **6.1 Novedades:**
  - Grilla de artículos, entrevistas a expositores y anuncios de conferencias.
- **6.2 Sala de Prensa / Prensa Kit:**
  - Gacetillas de prensa descargables.
  - Banco de imágenes institucionales en alta calidad y logotipos oficiales para medios acreditados.

---

### 7.0 Entradas y Acreditaciones (Flujo Transaccional)

- **Tipologías de acceso:**
  - Entrada General (Visitante individual / Grupo familiar).
  - Acreditación Profesional / Rondas de Negocios.
  - Acreditación de Prensa y Medios.
  - Registro de Delegaciones escolares o universitarias.
- **Flujo de reserva / adquisición:**
  - Formulario de datos personales.
  - Pasarela de pago o confirmación de acreditación con emisión de credencial con código QR descargable.

---

### 8.0 Soporte, Preguntas Frecuentes y Contacto

- **8.1 Preguntas Frecuentes (FAQ):**
  - Acordeón expandible agrupado por categorías: Ingreso y Entradas, Transporte y Estacionamiento, Servicios en el Predio y Normas de Convivencia.
- **8.2 Formulario de contacto:**
  - Campos segmentados según el motivo de consulta: Información general, Soporte a expositores, Prensa o Propuestas de patrocinio.
- **8.3 Cómo llegar:**
  - Mapa embebido (Google Maps / OpenStreetMap).
  - Rutas de acceso vehicular y líneas de transporte público disponibles.

---

## 3. Anatomía del Footer (Pie de Página)

- **Columna 1 — Identidad Institucional:**
  - Isologotipo oficial ExpoJuy 2026 y Cámara de Comercio Exterior de Jujuy.
  - Breve descripción del evento y rol institucional.
- **Columna 2 — Accesos Rápidos:**
  - Enlaces directos a Inicio, Expositores, Agenda, Plano del Predio y Entradas.
- **Columna 3 — Participación y Negocios:**
  - Reserva de stands, Rondas de negocios, Prensa y Sponsors.
- **Columna 4 — Atención y Canales:**
  - Canales de contacto directo (correo, teléfono).
  - Iconos accesibles de redes sociales oficiales con etiquetas aria-label.
- **Fila Inferior — Legales y Estándares:**
  - Aviso de copyright © 2026 ExpoJuy.
  - Políticas de Privacidad y Términos y Condiciones.
  - Declaración de conformidad con pautas de accesibilidad web (WCAG 2.1 AA).
