import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize shared server-side Google GenAI client
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// In-memory cloud sync mirror for multi-device sync
let cloudSyncState: {
  timestamp: string;
  data: any;
} | null = null;

// Subject names map for prompts
const SUBJECT_NAMES: Record<string, string> = {
  matematicas: 'Matemáticas (4h/sem)',
  lengua: 'Lengua Castellana y Literatura (4h/sem)',
  'geografia-historia': 'Geografía e Historia (3h/sem)',
  'fisica-quimica': 'Física y Química (3h/sem)',
  ingles: 'Lengua Extranjera: Inglés (4h/sem)'
};

// 1. Socratic Chat Endpoint
app.post('/api/tutor/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const { subjectId, message, conversationHistory = [], topicName } = req.body;

    const subjectTitle = SUBJECT_NAMES[subjectId] || subjectId;

    const systemInstruction = `Eres el TUTOR PERSONAL SOCRÁTICO de la asignatura "${subjectTitle}" para un alumno de 2º de Educación Secundaria Obligatoria (ESO) del instituto público IES San José en Cuenca, Castilla-La Mancha (España).

MARCO CURRICULAR Y LEGAL:
- Te riges por el currículo oficial LOMLOE de Castilla-La Mancha (Decreto 82/2022 de 12 de julio).
- Nivel de comprensión: Alumno de 13 a 14 años.
- Contexto: IES San José de Cuenca (sé cercano a la realidad escolar de Cuenca cuando surjan ejemplos).

REGLA DE ORO INQUEBRANTABLE (MÉTODO SOCRÁTICO):
1. TIENES TOTALMENTE PROHIBIDO resolverle los deberes directamente al alumno o darle el resultado numérico/sintáctico final.
2. NUNCA redactes trabajos, comentarios de texto ni respuestas de examen por él.
3. Tu objetivo pedagógico es guiar su pensamiento mediante preguntas orientadoras, pistas graduales y desglose de pasos.
4. Si el alumno te copia un ejercicio, pregúntale qué datos reconoce, qué fórmula o concepto cree que debe aplicar, o indícale el primer paso sin resolverlo.
5. Felicita sus aciertos intermedios con entusiasmo educativo y corrige con delicadeza los errores conceptuales.

FORMATO DE TU RESPUESTA:
Debes responder en formato JSON estrictamente válido con los siguientes campos:
{
  "explanation": "Tu mensaje pedagógico socrático en español para el alumno, claro, motivador y explicando el concepto clave sin resolver el ejercicio.",
  "keyConcept": "Nombre breve del concepto curricular clave (ej: 'Teorema de Pitágoras', 'Complemento Directo', 'Factores de conversión', 'Past Continuous')",
  "hints": [
    "Pista 1: Qué concepto o fórmula inicial debes recordar",
    "Pista 2: Cómo dar el primer paso o plantear el cálculo",
    "Pista 3: Cómo verificar si vas por buen camino"
  ],
  "reflectionQuestion": "Una pregunta directa y reflexiva para que el alumno te responda con su propio razonamiento."
}`;

    if (!apiKey) {
      // Fallback socratic response if API key is temporarily absent
      res.json({
        explanation: `¡Hola! Como tutor socrático de ${subjectTitle} en el IES San José, quiero ayudarte a entenderlo paso a paso por ti mismo. Analicemos juntos tu duda: ¿cuáles son los datos o palabras clave que identificas en este ejercicio?`,
        keyConcept: topicName || 'Razonamiento Curricular 2º ESO',
        hints: [
          'Identifica qué te está pidiendo exactamente el enunciado.',
          'Recuerda las reglas y conceptos que habéis visto esta semana en clase.',
          'Plantea tu primera hipótesis o cálculo y compártela conmigo para revisarla juntos.'
        ],
        reflectionQuestion: '¿Cuál crees que sería el primer paso para empezar a resolverlo?'
      });
      return;
    }

    // Format chat history into contents
    const promptText = `Tema actual: ${topicName || 'General 2º ESO'}\nPregunta/Duda del alumno: ${message}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
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
          required: ['explanation', 'keyConcept', 'hints', 'reflectionQuestion']
        }
      }
    });

    const responseText = response.text || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      parsedData = {
        explanation: responseText,
        keyConcept: topicName || 'Concepto 2º ESO',
        hints: [
          'Revisa qué datos tienes y qué fórmula se aplica.',
          'Haz un primer intento por pasos.',
          'Comprueba que las unidades y signos sean coherentes.'
        ],
        reflectionQuestion: '¿Qué parte te parece la más retadora?'
      };
    }

    res.json(parsedData);
  } catch (error: any) {
    console.error('Error in /api/tutor/chat:', error);
    res.status(500).json({
      error: 'Error en la respuesta del tutor',
      details: error.message || String(error)
    });
  }
});

// 2. Challenge / Quiz Generator Endpoint
app.post('/api/tutor/challenge', async (req: Request, res: Response): Promise<void> => {
  try {
    const { subjectId, topicName = 'General', difficulty = 'medio' } = req.body;
    const subjectTitle = SUBJECT_NAMES[subjectId] || subjectId;

    if (!apiKey) {
      res.json({
        question: `[2º ESO ${subjectTitle}] ¿Cuál de las siguientes afirmaciones sobre "${topicName}" es correcta según el temario de Castilla-La Mancha?`,
        options: [
          'Opción A: La regla básica se cumple en todos los casos estudiados.',
          'Opción B: Es un concepto exclusivo de cursos superiores.',
          'Opción C: Solo se aplica a problemas teóricos sin aplicación práctica.',
          'Opción D: Requiere memorización sin necesidad de comprensión.'
        ],
        correctIndex: 0,
        explanation: `En 2º de ESO para ${subjectTitle}, comprender los fundamentos de ${topicName} permite resolver problemas de la vida cotidiana y avanzar con solidez.`,
        hints: [
          'Piensa en la definición explicada en tu libro de texto.',
          'Descarta las opciones que contradicen el método razonado.',
          'Fíjate en las palabras clave del enunciado.'
        ]
      });
      return;
    }

    const systemInstruction = `Eres un profesor creador de exámenes de 2º de ESO del IES San José de Cuenca (Castilla-La Mancha) para la asignatura ${subjectTitle}.
Genera UN reto interactivo tipo test de 4 opciones sobre el tema "${topicName}", nivel de dificultad "${difficulty}", conforme al currículo oficial LOMLOE Decreto 82/2022 de Castilla-La Mancha.
El reto debe ser didáctico, riguroso pero adecuado para un estudiante de 13-14 años.
Devuelve el JSON con la pregunta, 4 opciones (exactamente una correcta), índice de la opción correcta (0 a 3), explicación pedagógica del porqué y 3 pistas socráticas graduales.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Genera 1 reto formativo sobre ${topicName}`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
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
          required: ['question', 'options', 'correctIndex', 'explanation', 'hints']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/tutor/challenge:', error);
    res.status(500).json({
      error: 'Error al generar el reto formativo',
      details: error.message || String(error)
    });
  }
});

// 3. Real-time Multi-Device Cloud Sync Endpoints
app.post('/api/sync', (req: Request, res: Response) => {
  try {
    const { payload } = req.body;
    cloudSyncState = {
      timestamp: new Date().toISOString(),
      data: payload
    };
    res.json({
      success: true,
      timestamp: cloudSyncState.timestamp,
      message: 'Sincronizado correctamente en la nube'
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/sync', (_req: Request, res: Response) => {
  res.json({
    hasData: !!cloudSyncState,
    timestamp: cloudSyncState?.timestamp || null,
    data: cloudSyncState?.data || null
  });
});

// Production vs Development Serving
const distDir = path.resolve(__dirname, 'dist');
const indexHtml = path.resolve(distDir, 'index.html');
const isProduction = process.env.NODE_ENV === 'production' || fs.existsSync(indexHtml);

if (isProduction) {
  app.use(express.static(distDir));
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(indexHtml);
  });
} else {
  // Vite Dev Server middleware mode (only in local development without dist/)
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(port, '0.0.0.0', () => {
  console.log(`TutorSanJose server running on http://0.0.0.0:${port}`);
});
