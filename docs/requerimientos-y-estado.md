# EXPOJUY 2026 — MATRIZ UNIFICADA DE REQUERIMIENTOS Y ESTADO

Este documento unifica con exactitud los textos provistos por la organización para el **Desafío Digital ExpoJuy 2026**, organizados en:
1. **Requeridas (Secciones mínimas obligatorias y alcance funcional base)**
2. **Sugeridas (Funcionalidades orientativas del pliego)**
3. **Agregadas por el equipo (Valor diferencial que no estaba en la lista textual)**

---

## 1. Requeridas (Secciones Mínimas & Alcance Funcional Base)

Estas corresponden a las secciones obligatorias del pliego unificadas con el alcance funcional exigido:

| # | Requerimiento Oficial | Componente en Next.js | Estado Actual | Detalle |
| :-: | :--- | :--- | :-: | :--- |
| **1** | **Inicio / Inicio institucional** | `<Hero />` | ✅ **Listo** | Hero de alto impacto, lema oficial *"Conectando países - creando oportunidades"* y cuenta regresiva. |
| **2** | **Sobre ExpoJuy 2026 / Información general de ExpoJuy** | `<InstitutionalSection />` | ✅ **Listo** | Historia de las 17 ediciones, Cámara de Comercio Exterior, Ministerio de Producción y ClusteAR. |
| **3** | **Expositores** | `<ExpositoresSection />` | ✅ **Listo** | Directorio y catálogo de empresas participantes con stands asignados. |
| **4** | **Agenda de actividades** | `<AgendaSection />` | ✅ **Listo** | Cronograma de las 4 jornadas intensivas (9 al 12 de Octubre) segmentado. |
| **5** | **Noticias / Panel de novedades** | `<NewsSection />` | ✅ **Listo** | Módulo de comunicados de prensa oficiales, fechas y categorías. |
| **6** | **Plano o mapa del predio / Mapa interactivo** | `<PlanoSection />` | ✅ **Listo** | Representación interactiva de Ciudad Cultural (Alto Padilla) con información por sector. |
| **7** | **Compra o gestión de entradas** | `<AcreditacionSection />` | ✅ **Listo** | Módulo de pase digital que emite credencial con código QR en tiempo real. |
| **8** | **Contacto / Formularios de contacto** | `<ContactSection />` | ✅ **Listo** | Formulario parametrizado por motivo (stands, B2B, prensa, consultas) y datos de contacto. |
| **9** | **Sponsors / Espacios para patrocinadores** | `<SponsorsSection />` | ✅ **Listo** | Grilla jerárquica de patrocinadores y alianzas institucionales. |
| **10** | **Preguntas frecuentes (FAQs)** | `<FaqSection />` | ✅ **Listo** | Acordeón desplegable para horarios, accesos, transporte y servicios. |
| **11** | **Redes sociales / Integración con redes sociales** | `<Footer />` | ✅ **Listo** | Enlaces oficiales a Instagram, Facebook, YouTube y LinkedIn. |
| **12** | **Diseño responsive** | Todo el proyecto | ✅ **Listo** | Enfoque Mobile-First verificado; interfaz fluida en celulares, tablets y desktop. |
| **13** | **Accesibilidad** | Todo el proyecto | ✅ **Listo** | Contraste de paleta validado bajo directrices WCAG y navegación semántica. |

---

## 2. Sugeridas (Funcionalidades Orientativas del Pliego)

Funcionalidades propuestas por las bases que suman valor técnico y experiencia de usuario:

| Funcionalidad Sugerida | Estado | Cómo se implementó en Next.js |
| :--- | :---: | :--- |
| **Buscador de expositores** | ✅ **Listo** | Búsqueda reactiva en tiempo real por texto/marca dentro de `<ExpositoresSection />`. |
| **Filtro por rubros** | ✅ **Listo** | Botones de filtrado instantáneo según la matriz productiva provincial. |
| **Agenda interactiva** | ✅ **Listo** | Selector dinámico por jornada (Día 1 al 4) y diferenciación horaria. |
| **Mapa del predio interactivo** | ✅ **Listo** | Clic en cada sector del predio para desplegar capacidad, horarios y servicios. |
| **Formulario de contacto parametrizado** | ✅ **Listo** | Menú desplegable para tipificar la consulta comercial o institucional. |
| **Compra o gestión de entradas digital (QR)** | ✅ **Listo** | Generación algorítmica de código QR único por visitante sin papel. |
| **Espacios para patrocinadores** | ✅ **Listo** | Módulo visual institucional en `<SponsorsSection />`. |
| **Integración con redes sociales** | ✅ **Listo** | Botones y metadatos OpenGraph configurados en `layout.tsx`. |
| **Panel para futuras actualizaciones (CMS)** | ⏳ **Roadmap** | Preparado para conectarse con Supabase o CMS headless en la etapa de 15 días. |

---

## 3. Añadidas por el Equipo (Valor Agregado no explícito en la lista)

Estas características fueron concebidas por nosotros analizando la letra chica del pliego (PRD Sección 4) para **destacar la propuesta ante el jurado**:

1. ⚡ **El Switcher de Dinámica Dual (`<DualSwitcher />`):**
   * *Origen:* PRD Sección 4 ("Compactación a 4 días con mañanas B2B y tardes/noches masivas").
   * *Qué hace:* Un botón interactivo que alterna entre la experiencia corporativa matutina y la experiencia ferial nocturna.
2. 🏛️ **Los 5 Pilares de la Matriz Productiva de Jujuy (`<PilaresSection />`):**
   * *Origen:* PRD Sección 4.5.
   * *Qué hace:* Módulo visual dedicado a *Minería Estratégica (Litio), Energía Solar (Cauchari), Agroindustria, Eje Logístico y Economía del Conocimiento*.
3. ⏱️ **Cuenta Regresiva Oficial en Vivo (Countdown):**
   * *Origen:* PRD Sección 5.1.
   * *Qué hace:* Contador en tiempo real hacia la apertura del 9 de octubre de 2026.
4. 📱 **Generador Activo de Código QR en Pantalla (Cero Papel):**
   * *Qué hace:* En lugar de un formulario estático que solo envía un correo, el sitio genera la credencial digital con QR en vivo en el navegador para guardarla en el celular.
5. 📴 **Modo Offline PWA (Recomendado para la Memoria Descriptiva):**
   * *Qué hace:* Permite navegar el mapa y ver el pase QR sin internet cuando las antenas 4G colapsan en el predio.
6. 📅 **Sincronización con Calendarios (Google / Apple .ics):**
   * *Qué hace:* Botón para agendar actividades en el celular con un toque.
