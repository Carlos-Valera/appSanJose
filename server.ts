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

    let subjectRule = '';
    let fallbackData = {
      explanation: `¡Hola! Como tutor socrático de ${subjectTitle} en el IES San José de Cuenca, estoy aquí para guiarte paso a paso. Analicemos juntos tu duda: ¿cuál es el concepto esencial que identificas en este ejercicio?`,
      keyConcept: topicName || 'Razonamiento Curricular 2º ESO',
      hints: [
        'Vuelve a leer el enunciado con calma e identifica qué te están pidiendo exactamente.',
        'Recuerda las reglas y conceptos trabajados esta semana en clase.',
        'Plantea tu primera hipótesis o intento y lo revisamos juntos.'
      ],
      reflectionQuestion: '¿Cuál crees que sería el primer paso lógico para empezar a abordarlo?'
    };

    if (subjectId === 'ingles') {
      subjectRule = 'Eres Ms. Davies, profesora y tutora socrática de Inglés para 2º ESO. NUNCA menciones "calcular", "fórmulas", "incógnitas" ni operaciones matemáticas. Es una clase de LENGUA EXTRANJERA: INGLÉS. Orienta sobre tiempos verbales (Past Simple, Present Continuous, Irregulars), vocabulario, comparativos, preposiciones y pronunciación.';
      fallbackData = {
        explanation: 'Hello! I\'m Ms. Davies, your English tutor for 2º ESO. Let\'s work through this step by step: what verb structure, tense, or vocabulary word are you practicing in this exercise?',
        keyConcept: 'Gramática y Vocabulario de Inglés (2º ESO)',
        hints: [
          'Hint 1: Identify the main subject and the verb of the sentence.',
          'Hint 2: Look for time adverbs (yesterday, now, always, every day) to choose the right tense.',
          'Hint 3: In English sentences, remember word order: Subject + Verb + Complements (S-V-O).'
        ],
        reflectionQuestion: 'Who is the subject of your sentence, and what action is taking place?'
      };
    } else if (subjectId === 'lengua') {
      subjectRule = 'Eres D. Santiago, tutor de Lengua Castellana y Literatura para 2º ESO. Orienta sobre sintaxis (Sujeto, CD, CI, CC), morfología, ortografía y literatura sin usar términos de cálculo.';
    } else if (subjectId === 'geografia-historia') {
      subjectRule = 'Eres Dña. Carmen, tutora de Geografía e Historia para 2º ESO. Orienta sobre historia medieval (Al-Ándalus, Reconquista, Alfonso VIII, Cuenca, feudalismo, románico/gótico) y geografía urbana.';
    } else if (subjectId === 'fisica-quimica') {
      subjectRule = 'Eres D. Roberto, tutor de Física y Química de 2º ESO. Orienta sobre el método científico, Sistema Internacional, densidad, estados de la materia y átomos.';
    } else {
      subjectRule = 'Eres Dña. Elena, tutora de Matemáticas de 2º ESO. Orienta sobre números enteros, álgebra, fracciones y geometría.';
    }

    const systemInstruction = `Eres el TUTOR PERSONAL SOCRÁTICO de "${subjectTitle}" para un estudiante de 2º ESO del IES San José en Cuenca (Castilla-La Mancha).
Currículo: LOMLOE Decreto 82/2022 de Castilla-La Mancha para alumnos de 13-14 años.
${subjectRule}

REGLA DE ORO (MÉTODO SOCRÁTICO):
1. PROHIBIDO resolverle los deberes directamente al alumno o darle la respuesta final.
2. Tu objetivo pedagógico es guiar su pensamiento mediante preguntas orientadoras y pistas graduales.
3. Adapta el vocabulario a 2º de la ESO.
4. Responde SIEMPRE en formato JSON con la siguiente estructura:
{
  "explanation": "Tu orientación pedagógica socrática clara, motivadora y sin dar la solución directa.",
  "keyConcept": "Nombre breve del concepto curricular clave",
  "hints": ["Pista 1 útil", "Pista 2 progresiva", "Pista 3 para verificar"],
  "reflectionQuestion": "Pregunta reflexiva directa para que el alumno razone y responda."
}`;

    if (!apiKey) {
      res.json(fallbackData);
      return;
    }

    const recentHistory = Array.isArray(conversationHistory)
      ? conversationHistory.slice(-4).map((h: any) => `${h.role === 'user' ? 'Alumno' : 'Tutor'}: ${h.content}`).join('\n')
      : '';

    const promptText = `Tema del bloque: ${topicName || 'Temario 2º ESO'}\nHistorial reciente:\n${recentHistory}\n\nNueva consulta del alumno: ${message}`;

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
      parsedData = fallbackData;
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
      res.status(503).json({
        error: 'GEMINI_API_KEY no configurada en el servidor',
        message: 'Usa el motor de retos dinámicos del cliente'
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
