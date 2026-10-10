import express from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT) || 3e3;
app.use(express.json({ limit: "10mb" }));
const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build"
    }
  }
});
let cloudSyncState = null;
const SUBJECT_NAMES = {
  matematicas: "Matem\xE1ticas (4h/sem)",
  lengua: "Lengua Castellana y Literatura (4h/sem)",
  "geografia-historia": "Geograf\xEDa e Historia (3h/sem)",
  "fisica-quimica": "F\xEDsica y Qu\xEDmica (3h/sem)",
  ingles: "Lengua Extranjera: Ingl\xE9s (4h/sem)"
};
app.post("/api/tutor/chat", async (req, res) => {
  try {
    const { subjectId, message, conversationHistory = [], topicName } = req.body;
    const subjectTitle = SUBJECT_NAMES[subjectId] || subjectId;
    let subjectRule = "";
    let fallbackData = {
      explanation: `\xA1Hola! Como tutor socr\xE1tico de ${subjectTitle} en el IES San Jos\xE9 de Cuenca, estoy aqu\xED para guiarte paso a paso. Analicemos juntos tu duda: \xBFcu\xE1l es el concepto esencial que identificas en este ejercicio?`,
      keyConcept: topicName || "Razonamiento Curricular 2\xBA ESO",
      hints: [
        "Vuelve a leer el enunciado con calma e identifica qu\xE9 te est\xE1n pidiendo exactamente.",
        "Recuerda las reglas y conceptos trabajados esta semana en clase.",
        "Plantea tu primera hip\xF3tesis o intento y lo revisamos juntos."
      ],
      reflectionQuestion: "\xBFCu\xE1l crees que ser\xEDa el primer paso l\xF3gico para empezar a abordarlo?"
    };
    if (subjectId === "ingles") {
      subjectRule = 'Eres Ms. Davies, profesora y tutora socr\xE1tica de Ingl\xE9s para 2\xBA ESO. NUNCA menciones "calcular", "f\xF3rmulas", "inc\xF3gnitas" ni operaciones matem\xE1ticas. Es una clase de LENGUA EXTRANJERA: INGL\xC9S. Orienta sobre tiempos verbales (Past Simple, Present Continuous, Irregulars), vocabulario, comparativos, preposiciones y pronunciaci\xF3n.';
      fallbackData = {
        explanation: "Hello! I'm Ms. Davies, your English tutor for 2\xBA ESO. Let's work through this step by step: what verb structure, tense, or vocabulary word are you practicing in this exercise?",
        keyConcept: "Gram\xE1tica y Vocabulario de Ingl\xE9s (2\xBA ESO)",
        hints: [
          "Hint 1: Identify the main subject and the verb of the sentence.",
          "Hint 2: Look for time adverbs (yesterday, now, always, every day) to choose the right tense.",
          "Hint 3: In English sentences, remember word order: Subject + Verb + Complements (S-V-O)."
        ],
        reflectionQuestion: "Who is the subject of your sentence, and what action is taking place?"
      };
    } else if (subjectId === "lengua") {
      subjectRule = "Eres D. Santiago, tutor de Lengua Castellana y Literatura para 2\xBA ESO. Orienta sobre sintaxis (Sujeto, CD, CI, CC), morfolog\xEDa, ortograf\xEDa y literatura sin usar t\xE9rminos de c\xE1lculo.";
    } else if (subjectId === "geografia-historia") {
      subjectRule = "Eres D\xF1a. Carmen, tutora de Geograf\xEDa e Historia para 2\xBA ESO. Orienta sobre historia medieval (Al-\xC1ndalus, Reconquista, Alfonso VIII, Cuenca, feudalismo, rom\xE1nico/g\xF3tico) y geograf\xEDa urbana.";
    } else if (subjectId === "fisica-quimica") {
      subjectRule = "Eres D. Roberto, tutor de F\xEDsica y Qu\xEDmica de 2\xBA ESO. Orienta sobre el m\xE9todo cient\xEDfico, Sistema Internacional, densidad, estados de la materia y \xE1tomos.";
    } else {
      subjectRule = "Eres D\xF1a. Elena, tutora de Matem\xE1ticas de 2\xBA ESO. Orienta sobre n\xFAmeros enteros, \xE1lgebra, fracciones y geometr\xEDa.";
    }
    const systemInstruction = `Eres el TUTOR PERSONAL SOCR\xC1TICO de "${subjectTitle}" para un estudiante de 2\xBA ESO del IES San Jos\xE9 en Cuenca (Castilla-La Mancha).
Curr\xEDculo: LOMLOE Decreto 82/2022 de Castilla-La Mancha para alumnos de 13-14 a\xF1os.
${subjectRule}

REGLA DE ORO (M\xC9TODO SOCR\xC1TICO):
1. PROHIBIDO resolverle los deberes directamente al alumno o darle la respuesta final.
2. Tu objetivo pedag\xF3gico es guiar su pensamiento mediante preguntas orientadoras y pistas graduales.
3. Adapta el vocabulario a 2\xBA de la ESO.
4. Responde SIEMPRE en formato JSON con la siguiente estructura:
{
  "explanation": "Tu orientaci\xF3n pedag\xF3gica socr\xE1tica clara, motivadora y sin dar la soluci\xF3n directa.",
  "keyConcept": "Nombre breve del concepto curricular clave",
  "hints": ["Pista 1 \xFAtil", "Pista 2 progresiva", "Pista 3 para verificar"],
  "reflectionQuestion": "Pregunta reflexiva directa para que el alumno razone y responda."
}`;
    if (!apiKey) {
      res.json(fallbackData);
      return;
    }
    const recentHistory = Array.isArray(conversationHistory) ? conversationHistory.slice(-4).map((h) => `${h.role === "user" ? "Alumno" : "Tutor"}: ${h.content}`).join("\n") : "";
    const promptText = `Tema del bloque: ${topicName || "Temario 2\xBA ESO"}
Historial reciente:
${recentHistory}

Nueva consulta del alumno: ${message}`;
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            explanation: { type: Type.STRING },
            keyConcept: { type: Type.STRING },
            hints: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            reflectionQuestion: { type: Type.STRING }
          },
          required: ["explanation", "keyConcept", "hints", "reflectionQuestion"]
        }
      }
    });
    const responseText = response.text || "{}";
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      parsedData = fallbackData;
    }
    res.json(parsedData);
  } catch (error) {
    console.error("Error in /api/tutor/chat:", error);
    res.status(500).json({
      error: "Error en la respuesta del tutor",
      details: error.message || String(error)
    });
  }
});
app.post("/api/tutor/challenge", async (req, res) => {
  try {
    const { subjectId, topicName = "General", difficulty = "medio" } = req.body;
    const subjectTitle = SUBJECT_NAMES[subjectId] || subjectId;
    if (!apiKey) {
      res.status(503).json({
        error: "GEMINI_API_KEY no configurada en el servidor",
        message: "Usa el motor de retos din\xE1micos del cliente"
      });
      return;
    }
    const systemInstruction = `Eres un profesor creador de ex\xE1menes de 2\xBA de ESO del IES San Jos\xE9 de Cuenca (Castilla-La Mancha) para la asignatura ${subjectTitle}.
Genera UN reto interactivo tipo test de 4 opciones sobre el tema "${topicName}", nivel de dificultad "${difficulty}", conforme al curr\xEDculo oficial LOMLOE Decreto 82/2022 de Castilla-La Mancha.
El reto debe ser did\xE1ctico, riguroso pero adecuado para un estudiante de 13-14 a\xF1os.
Devuelve el JSON con la pregunta, 4 opciones (exactamente una correcta), \xEDndice de la opci\xF3n correcta (0 a 3), explicaci\xF3n pedag\xF3gica del porqu\xE9 y 3 pistas socr\xE1ticas graduales.`;
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `Genera 1 reto formativo sobre ${topicName}`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            correctIndex: { type: Type.INTEGER },
            explanation: { type: Type.STRING },
            hints: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["question", "options", "correctIndex", "explanation", "hints"]
        }
      }
    });
    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error) {
    console.error("Error in /api/tutor/challenge:", error);
    res.status(500).json({
      error: "Error al generar el reto formativo",
      details: error.message || String(error)
    });
  }
});
app.post("/api/sync", (req, res) => {
  try {
    const { payload } = req.body;
    cloudSyncState = {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      data: payload
    };
    res.json({
      success: true,
      timestamp: cloudSyncState.timestamp,
      message: "Sincronizado correctamente en la nube"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/api/sync", (_req, res) => {
  res.json({
    hasData: !!cloudSyncState,
    timestamp: cloudSyncState?.timestamp || null,
    data: cloudSyncState?.data || null
  });
});
const distDir = path.resolve(__dirname, "dist");
const indexHtml = path.resolve(distDir, "index.html");
const isProduction = process.env.NODE_ENV === "production" || fs.existsSync(indexHtml);
if (isProduction) {
  app.use(express.static(distDir));
  app.get("*", (_req, res) => {
    res.sendFile(indexHtml);
  });
} else {
  const { createServer: createViteServer } = await import("vite");
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa"
  });
  app.use(vite.middlewares);
}
app.listen(port, "0.0.0.0", () => {
  console.log(`TutorSanJose server running on http://0.0.0.0:${port}`);
});
