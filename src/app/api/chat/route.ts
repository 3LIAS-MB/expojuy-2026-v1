import { NextRequest, NextResponse } from "next/server";

const EXPOJUY_SYSTEM_PROMPT = `
Eres "Llamita", la asistente virtual y mascota oficial de ExpoJuy 2026.
Tienes la imagen de una simpática llamita andina con un headset azul.
Tu personalidad es amable, concisa, servicial y conoces todos los datos clave de la feria.

REGLAS ESTRICTAS DE IDENTIDAD Y ESTILO:
1. NUNCA menciones que eres Gemini, ni que eres un modelo de Google, ni detalles sobre inteligencia artificial, algoritmos o modelos de lenguaje. Si te preguntan quién eres, responde simplemente: "Soy Llamita, la asistente virtual oficial de ExpoJuy 2026 🦙".
2. RESPUESTAS CONCISAS Y DIRECTAS: Da respuestas breves, claras y bien estructuradas (máximo 2 a 3 párrafos o puntos clave). No des textos eternos ni información redundante a menos que te pidan más detalles.
3. Responde con calidez y buena onda. Si te saludan informalmente ("como estas bro", "hola che"), responde con esa misma naturalidad y simpatía.

INFORMACIÓN CLAVE DE EXPOJUY 2026:
- Edición: 17.ª edición.
- Fechas: Del viernes 9 al lunes 12 de octubre de 2026 (fin de semana largo).
- Lugar: Predio Ferial Ciudad Cultural, San Salvador de Jujuy.
- Horarios:
  * Mañanas (09:00 a 14:00 hs): Rondas de Negocios B2B internacionales e intercambio empresarial.
  * Tardes/Noches (16:00 a 23:00 hs): Público general, familias, stands, festival y shows en vivo desde las 19:00 hs.
- 4 Sectores:
  1. Industria & Energía (minería sustentable, litio, celdas y baterías de JEMSE, Parque Solar Cauchari).
  2. Innovación Aplicada (Polo Tecnológico Jujuy, startups, software y agro-tech).
  3. Producción e Identidad (complejo de caña Ledesma, tabaco, vinos de extrema altura de la Quebrada a 2.500-3.300 msnm, camélidos).
  4. Comercio y Alianzas (integración logística por el Corredor Bioceánico hacia puertos del Pacífico y Atlántico).
- Acreditación y Entradas: 100% digital "Cero Papel". Credencial con código QR generada en la web; funciona offline en los molinetes.
- Patio Gastronómico "Sabores Andinos": 30 puestos con comida regional (empanadas cortadas a cuchillo, cazuela de llama, humitas, tamales, cervezas artesanales y vinos de altura).
- Estacionamiento: Más de 1.200 vehículos vigilados en Ciudad Cultural. Colectivos urbanos con parada directa.
- Contratación de Stands: Cámara de Comercio Exterior de Jujuy (CCEJ) al +54 388 4233539 / +54 388 4212955 o expojuy2.0@gmail.com / camaradecomercioexterior@gmail.com (Belgrano 860, 2° Piso, San Salvador de Jujuy).
`;

// Asistente conversacional de contingencia de alta precisión si la API de Gemini tiene cuota agotada
function getConversationalFallback(message: string): string {
  const q = message.toLowerCase().trim();

  // 1. Saludos informales / "¿cómo estás bro?"
  if (
    q.includes("como estas") ||
    q.includes("cómo estás") ||
    q.includes("como andas") ||
    q.includes("cómo andas") ||
    q.includes("que onda") ||
    q.includes("qué onda") ||
    q.includes("todo bien") ||
    q.includes("que tal") ||
    q.includes("qué tal")
  ) {
    return "¡Qué onda bro! Todo de diez por acá 🦙😎✨ Con los auriculares bien puestos y a full preparando todo para la **ExpoJuy 2026**.\n\n¿Vos cómo venís? ¿Tenés pensado visitar el predio en Ciudad Cultural o te interesa participar con tu empresa/stand?";
  }

  // 2. Saludos simples
  if (q === "hola" || q === "buenas" || q === "buen dia" || q === "buenos dias" || q === "buenas tardes" || q === "buenas noches" || q.startsWith("hola ")) {
    return "¡Hola! 👋 Qué lindo tenerte por acá. Soy **Llamita**, la inteligencia artificial de **ExpoJuy 2026** 🦙✨.\n\nPreguntame lo que quieras sobre la feria: qué es, cuándo se hace, cómo sacar tu pase QR digital, cómo llegar o qué comidas ricas va a haber en el patio gastronómico.";
  }

  // 3. "¿Qué es la ExpoJuy?"
  if (
    q.includes("que es la expojuy") ||
    q.includes("qué es la expojuy") ||
    q.includes("de que se trata") ||
    q.includes("de qué se trata") ||
    q.includes("que es expojuy") ||
    q.includes("qué es expojuy") ||
    q.includes("definicion")
  ) {
    return "¡Te cuento con orgullo! 🦙🏔️ **ExpoJuy** es la **Muestra Multisectorial más importante del Norte Grande Argentino y del Cono Sur**, organizada por la Cámara de Comercio Exterior de Jujuy.\n\nEn esta **17.ª edición (2026)** reúne en un solo lugar:\n\n• 🏭 **Industria & Energía:** Proyectos de litio, baterías sustentables y energía solar de Cauchari.\n• 💡 **Innovación & Startups:** Más de 20 empresas de software, IA y agro-tech del Polo Tecnológico Jujuy.\n• 🍇 **Producción Regional:** Vinos de extrema altura de la Quebrada, bioetanol de caña, tabaco y camélidos.\n• 🤝 **Comercio Internacional:** Rondas B2B con delegaciones de Brasil, Chile, Bolivia y Paraguay a través del Corredor Bioceánico.\n• 🎶 **Fiesta y Cultura:** Patio gastronómico andino, shows folclóricos nocturnos y mapping.\n\nEs el punto de encuentro donde Jujuy le muestra al país y al mundo todo su potencial.";
  }

  // 4. Fechas y días
  if (q.includes("fecha") || q.includes("cuándo") || q.includes("cuando") || q.includes("dia") || q.includes("días") || q.includes("calendario")) {
    return "📅 **Fechas de ExpoJuy 2026:**\n\nSe realizará del **viernes 9 al lunes 12 de octubre de 2026** (aprovechando el fin de semana largo de octubre) en el Predio Ferial **Ciudad Cultural** de San Salvador de Jujuy.\n\n¡Serán 4 días a pura innovación, negocios y cultura!";
  }

  // 5. Horarios
  if (q.includes("horario") || q.includes("hora") || q.includes("a que hora") || q.includes("a qué hora") || q.includes("abierto") || q.includes("cierre") || q.includes("abre")) {
    return "⏰ **Horarios con Dinámica Dual:**\n\n• 💼 **Mañanas B2B (09:00 a 14:00 hs):** Exclusivo para empresarios, inversores y delegaciones internacionales en rondas de negocios.\n• 👨‍👩‍👧‍👦 **Tardes y Noches (16:00 a 23:00 hs):** Entrada abierta a familias, jóvenes y público en general. Stands comerciales, patio gastronómico y espectáculos en vivo desde las 19:00 hs.";
  }

  // 6. Entradas / Pase QR / Precios
  if (q.includes("entrada") || q.includes("ticket") || q.includes("pase") || q.includes("qr") || q.includes("precio") || q.includes("costo") || q.includes("gratis") || q.includes("acredit")) {
    return "🎫 **Acreditaciones y Entradas 100% Digitales:**\n\nExpoJuy 2026 implementa la iniciativa ecológica **Cero Papel** 🍃:\n\n1. Te acreditás a través de esta web oficial.\n2. Se genera tu credencial con un **código QR criptográfico** único.\n3. La guardás en tu teléfono y la presentás directo en los molinetes de Ciudad Cultural.\n\n⚡ *Dato clave:* El código QR funciona en los accesos incluso sin conexión 4G o sin señal de internet.";
  }

  // 7. Ubicación / Cómo llegar
  if (q.includes("donde") || q.includes("dónde") || q.includes("llegar") || q.includes("ubicacion") || q.includes("ubicación") || q.includes("lugar") || q.includes("predio") || q.includes("mapa")) {
    return "📍 **Lugar del evento:**\n\nLa cita es en el **Predio Ferial Ciudad Cultural** (Alto Padilla, San Salvador de Jujuy, Argentina).\n\n🚗 **Estacionamiento:** Más de 1.200 vehículos con control y vigilancia.\n🚌 **Transporte público:** Varias líneas de colectivos urbanos tienen parada en la entrada principal.\n🗺️ Podés consultar el mapa interactivo y la vista 3D en la sección 'Ubicación' de nuestra web.";
  }

  // 8. Stands / Participación de empresas
  if (q.includes("stand") || q.includes("expositor") || q.includes("empresa") || q.includes("participar") || q.includes("vender") || q.includes("alquilar") || q.includes("contratar")) {
    return "💼 **Reserva y Venta de Stands:**\n\nLa comercialización de espacios en los más de 18.000 m² de la feria está a cargo de la **Cámara de Comercio Exterior de Jujuy**:\n\n• 📞 **Teléfonos:** +54 388 4233539 / +54 388 4212955\n• ✉️ **Emails:** camaradecomercioexterior@gmail.com / expojuy2.0@gmail.com\n• 🏢 **Atención presencial:** Belgrano 860, 2° Piso, San Salvador de Jujuy.\n\n¡Comunicate con ellos para solicitar planos de ubicación y metros cuadrados disponibles!";
  }

  // 9. Comida / Gastronomía
  if (q.includes("comida") || q.includes("comer") || q.includes("gastronom") || q.includes("patio") || q.includes("empanada") || q.includes("tomar") || q.includes("cerveza") || q.includes("vino")) {
    return "🥟🍷 **Patio Gastronómico Sabores Andinos:**\n\n¡Va a ser una locura de rico! Habrá 30 puestos curados con gastronomía jujeña:\n\n• Auténticas empanadas jujeñas cortadas a cuchillo y al horno de barro.\n• Cazuelas de llama y cordero de la Puna.\n• Humitas en chala y tamales tradicionales.\n• Degustación de vinos de extrema altura de la Quebrada de Humahuaca (2.500 a 3.300 msnm).\n• Cervecerías artesanales jujeñas con infusiones de muña-muña y rica-rica.";
  }

  // 10. Quién eres / Identidad del bot
  if (q.includes("quien sos") || q.includes("quién eres") || q.includes("como te llamas") || q.includes("cómo te llamas") || q.includes("tu nombre")) {
    return "¡Soy **Llamita**! 🦙🎧 La mascota inteligente y guía virtual de **ExpoJuy 2026**.\n\nMe diseñaron como una llamita jujeña con auriculares cyberpunk para simbolizar la unión entre nuestras raíces andinas y la tecnología del futuro. ¡Estoy para responder cualquier duda que tengas sobre la expo!";
  }

  // 11. Música, espectáculos, artistas
  if (q.includes("musica") || q.includes("música") || q.includes("artista") || q.includes("show") || q.includes("festival") || q.includes("recital") || q.includes("folclore") || q.includes("folklore")) {
    return "🎶 **Festival y Shows en Vivo:**\n\nCada noche a partir de las 19:00 hs, el escenario principal de Ciudad Cultural se llenará de música y tradición con más de 25 agrupaciones folclóricas, ballets y solistas jujeños.\n\nAdemás, habrá un espectáculo nocturno de **mapping lumínico** sobre la arquitectura del predio para cerrar cada jornada.";
  }

  // 12. Rondas de negocios / B2B / Corredor Bioceánico
  if (q.includes("b2b") || q.includes("negocio") || q.includes("ronda") || q.includes("bioceanico") || q.includes("bioceánico") || q.includes("export") || q.includes("import")) {
    return "🤝 **Rondas de Negocios B2B Internacionales:**\n\nSe desarrollan todas las mañanas de 09:00 a 14:00 hs con matchmaking algorítmico.\n\nParticipan más de 80 firmas internacionales de Brasil, Chile, Bolivia y Paraguay, junto a operadores de los puertos del Pacífico (Iquique, Antofagasta) y el Atlántico (Santos), articulando con la Zona Franca de Perico y el Corredor Bioceánico de Capricornio.";
  }

  // 13. Litio / Energía / Minería
  if (q.includes("litio") || q.includes("mineria") || q.includes("minería") || q.includes("solar") || q.includes("cauchari") || q.includes("energia") || q.includes("energía")) {
    return "⚡🔋 **Litio y Energías Renovables en ExpoJuy:**\n\nJujuy es protagonista mundial de la transición energética:\n\n• **Litio:** JEMSE y empresas operadoras presentarán proyectos para la fabricación local de celdas y baterías de almacenamiento sustentable.\n• **Parque Solar Cauchari:** Se exhibirá la hoja de ruta para ampliar la planta a 500 MW e incorporar producción piloto de hidrógeno verde.\n• Podrás recorrer un stand inmersivo con experiencia virtual 360° de las plantas en la Puna.";
  }

  // 14. Respuesta por defecto inteligente
  return `¡Hola! Con respecto a tu consulta: "${message}" 🦙✨\n\nExpoJuy 2026 se realizará del **9 al 12 de octubre de 2026** en **Ciudad Cultural**, San Salvador de Jujuy, con sus 4 mundos de Industria & Litio, Innovación Tech, Producción Regional y Negocios Internacionales.\n\nPodés preguntarme sobre cómo llegar, cómo sacar tu pase QR gratuito, los stands comerciales o el patio gastronómico andino. ¡Decime y te oriento!`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body.messages || [];

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided" },
        { status: 400 }
      );
    }

    const lastUserMessage = [...messages]
      .reverse()
      .find((m: { role: string; content: string }) => m.role === "user")?.content || "";

    const apiKey = process.env.GEMINI_API_KEY || "";

    // Modelos de Gemini ordenados por compatibilidad y disponibilidad gratuita
    const modelsToTry = [
      "gemini-3.5-flash",
      "gemini-3-flash-preview",
      "gemini-3.1-flash-lite-preview",
      "gemini-3.6-flash",
      "gemini-flash-latest",
      "gemini-pro-latest",
    ];

    let geminiSuccess = false;
    let replyText = "";
    let lastGeminiError = "";

    if (apiKey) {
      for (const model of modelsToTry) {
        try {
          const contents = [
            {
              role: "user",
              parts: [
                {
                  text: `${EXPOJUY_SYSTEM_PROMPT}\n\nEl usuario te pregunta: "${lastUserMessage}". Responde como Llamita:`,
                },
              ],
            },
          ];

          const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

          const res = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents }),
          });

          const data = await res.json();

          if (res.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
            replyText = data.candidates[0].content.parts[0].text;
            geminiSuccess = true;
            console.log(`[Gemini API] Success with ${model}`);
            break;
          } else {
            lastGeminiError = data.error?.message || `Status ${res.status}`;
            console.warn(`[Gemini API] ${model} warning:`, lastGeminiError);
          }
        } catch (callErr: any) {
          lastGeminiError = callErr.message;
          console.warn(`[Gemini API] ${model} network error:`, callErr.message);
        }
      }
    }

    // Si Gemini respondió correctamente desde la nube
    if (geminiSuccess && replyText) {
      return NextResponse.json({
        reply: replyText,
        source: "gemini-cloud",
      });
    }

    // Si la API de Google devolvió cuota agotada o error, usamos el motor conversacional contextual
    console.log("[Chat API] Using conversational fallback due to:", lastGeminiError);
    const conversationalReply = getConversationalFallback(lastUserMessage);

    return NextResponse.json({
      reply: conversationalReply,
      source: "expojuy-assistant",
      geminiNotice: lastGeminiError.includes("prepayment credits")
        ? "Google AI Studio: prepayment credits are depleted"
        : undefined,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply:
          "¡Hola! Soy Llamita 🦙 Podés consultar todas las dudas llamando a la Cámara de Comercio Exterior al +54 388 4233539 o por email a expojuy2.0@gmail.com.",
        source: "error-fallback",
      },
      { status: 200 }
    );
  }
}
