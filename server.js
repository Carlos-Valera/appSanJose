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
    const systemInstruction = `Eres el TUTOR PERSONAL SOCR\xC1TICO de la asignatura "${subjectTitle}" para un alumno de 2\xBA de Educaci\xF3n Secundaria Obligatoria (ESO) del instituto p\xFAblico IES San Jos\xE9 en Cuenca, Castilla-La Mancha (Espa\xF1a).

MARCO CURRICULAR Y LEGAL:
- Te riges por el curr\xEDculo oficial LOMLOE de Castilla-La Mancha (Decreto 82/2022 de 12 de julio).
- Nivel de comprensi\xF3n: Alumno de 13 a 14 a\xF1os.
- Contexto: IES San Jos\xE9 de Cuenca (s\xE9 cercano a la realidad escolar de Cuenca cuando surjan ejemplos).

REGLA DE ORO INQUEBRANTABLE (M\xC9TODO SOCR\xC1TICO):
1. TIENES TOTALMENTE PROHIBIDO resolverle los deberes directamente al alumno o darle el resultado num\xE9rico/sint\xE1ctico final.
2. NUNCA redactes trabajos, comentarios de texto ni respuestas de examen por \xE9l.
3. Tu objetivo pedag\xF3gico es guiar su pensamiento mediante preguntas orientadoras, pistas graduales y desglose de pasos.
4. Si el alumno te copia un ejercicio, preg\xFAntale qu\xE9 datos reconoce, qu\xE9 f\xF3rmula o concepto cree que debe aplicar, o ind\xEDcale el primer paso sin resolverlo.
5. Felicita sus aciertos intermedios con entusiasmo educativo y corrige con delicadeza los errores conceptuales.

FORMATO DE TU RESPUESTA:
Debes responder en formato JSON estrictamente v\xE1lido con los siguientes campos:
{
  "explanation": "Tu mensaje pedag\xF3gico socr\xE1tico en espa\xF1ol para el alumno, claro, motivador y explicando el concepto clave sin resolver el ejercicio.",
  "keyConcept": "Nombre breve del concepto curricular clave (ej: 'Teorema de Pit\xE1goras', 'Complemento Directo', 'Factores de conversi\xF3n', 'Past Continuous')",
  "hints": [
    "Pista 1: Qu\xE9 concepto o f\xF3rmula inicial debes recordar",
    "Pista 2: C\xF3mo dar el primer paso o plantear el c\xE1lculo",
    "Pista 3: C\xF3mo verificar si vas por buen camino"
  ],
  "reflectionQuestion": "Una pregunta directa y reflexiva para que el alumno te responda con su propio razonamiento."
}`;
    if (!apiKey) {
      res.json({
        explanation: `\xA1Hola! Como tutor socr\xE1tico de ${subjectTitle} en el IES San Jos\xE9, quiero ayudarte a entenderlo paso a paso por ti mismo. Analicemos juntos tu duda: \xBFcu\xE1les son los datos o palabras clave que identificas en este ejercicio?`,
        keyConcept: topicName || "Razonamiento Curricular 2\xBA ESO",
        hints: [
          "Identifica qu\xE9 te est\xE1 pidiendo exactamente el enunciado.",
          "Recuerda las reglas y conceptos que hab\xE9is visto esta semana en clase.",
          "Plantea tu primera hip\xF3tesis o c\xE1lculo y comp\xE1rtela conmigo para revisarla juntos."
        ],
        reflectionQuestion: "\xBFCu\xE1l crees que ser\xEDa el primer paso para empezar a resolverlo?"
      });
      return;
    }
    const promptText = `Tema actual: ${topicName || "General 2\xBA ESO"}
Pregunta/Duda del alumno: ${message}`;
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
      parsedData = {
        explanation: responseText,
        keyConcept: topicName || "Concepto 2\xBA ESO",
        hints: [
          "Revisa qu\xE9 datos tienes y qu\xE9 f\xF3rmula se aplica.",
          "Haz un primer intento por pasos.",
          "Comprueba que las unidades y signos sean coherentes."
        ],
        reflectionQuestion: "\xBFQu\xE9 parte te parece la m\xE1s retadora?"
      };
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
      res.json({
        question: `[2\xBA ESO ${subjectTitle}] \xBFCu\xE1l de las siguientes afirmaciones sobre "${topicName}" es correcta seg\xFAn el temario de Castilla-La Mancha?`,
        options: [
          "Opci\xF3n A: La regla b\xE1sica se cumple en todos los casos estudiados.",
          "Opci\xF3n B: Es un concepto exclusivo de cursos superiores.",
          "Opci\xF3n C: Solo se aplica a problemas te\xF3ricos sin aplicaci\xF3n pr\xE1ctica.",
          "Opci\xF3n D: Requiere memorizaci\xF3n sin necesidad de comprensi\xF3n."
        ],
        correctIndex: 0,
        explanation: `En 2\xBA de ESO para ${subjectTitle}, comprender los fundamentos de ${topicName} permite resolver problemas de la vida cotidiana y avanzar con solidez.`,
        hints: [
          "Piensa en la definici\xF3n explicada en tu libro de texto.",
          "Descarta las opciones que contradicen el m\xE9todo razonado.",
          "F\xEDjate en las palabras clave del enunciado."
        ]
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
