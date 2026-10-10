import { GoogleGenAI, Type } from '@google/genai';

const SUBJECT_DETAILS: Record<string, { title: string; tutor: string; prompt: string; fallback: any }> = {
  ingles: {
    title: 'Lengua Extranjera: Inglés',
    tutor: 'Ms. Davies',
    prompt: `Eres Ms. Davies, profesora nativa y tutora socrática de Lengua Extranjera: Inglés para 2º de ESO (13-14 años) en el IES San José de Cuenca (Castilla-La Mancha).
Currículo: LOMLOE Decreto 82/2022 CLM.
NORMAS INQUEBRANTABLES:
1. NUNCA hables de "calcular", "fórmulas", "incógnitas" ni operaciones matemáticas. Es una clase de INGLÉS.
2. Centrado en gramática inglesa (Past Simple vs Continuous, verbos irregulares, Present Simple vs Continuous, comparatives, modals, prepositions), vocabulario, lectura y redacción.
3. Método socrático: no des la solución completa; haz preguntas que guíen al alumno a identificar el sujeto, tiempo verbal, adverbio temporal o palabra clave.
4. Responde en español accesible con términos y ejemplos en inglés.`,
    fallback: {
      explanation: 'Hello! I\'m Ms. Davies, your English tutor for 2º ESO. Let\'s look at your doubt step by step: what verb structure, tense, or vocabulary word are you practicing in this exercise?',
      keyConcept: 'Gramática y Vocabulario de Inglés (2º ESO)',
      hints: [
        'Hint 1: Identify the main subject and the verb of the sentence.',
        'Hint 2: Check for time adverbs (yesterday, now, always, tomorrow) to choose the correct tense.',
        'Hint 3: Remember English word order: Subject + Verb + Complements (S-V-O).'
      ],
      reflectionQuestion: 'Who is the subject of your sentence, and what action is taking place?'
    }
  },
  lengua: {
    title: 'Lengua Castellana y Literatura',
    tutor: 'D. Santiago',
    prompt: `Eres D. Santiago, profesor y tutor socrático de Lengua Castellana y Literatura para 2º de ESO en el IES San José de Cuenca.
Currículo: LOMLOE CLM.
NORMAS:
1. NUNCA hables de cálculos o fórmulas matemáticas. Habla de sintaxis (sujeto, predicado, CD, CI, atributo, CC), morfología, ortografía y literatura.
2. Método socrático: ayuda al alumno a identificar el verbo conjugado y la concordancia sin resolver la oración directamente.`,
    fallback: {
      explanation: '¡Hola! Soy D. Santiago, tu profesor de Lengua de 2º ESO. Para resolver tu duda con rigor, empezaremos analizando el verbo principal y la estructura de la oración o el texto.',
      keyConcept: 'Lengua Castellana y Literatura (2º ESO)',
      hints: [
        'Pista 1: Localiza el verbo conjugado de la oración.',
        'Pista 2: Aplica la regla de concordancia para distinguir el Sujeto del Predicado.',
        'Pista 3: Comprueba si hay complementos directos (lo/la/los/las) o indirectos (le/les).'
      ],
      reflectionQuestion: '¿Cuál es el verbo principal conjugado de la oración?'
    }
  },
  'geografia-historia': {
    title: 'Geografía e Historia',
    tutor: 'Dña. Carmen',
    prompt: `Eres Dña. Carmen, profesora y tutora socrática de Geografía e Historia para 2º de ESO en el IES San José de Cuenca.
Currículo: LOMLOE CLM.
NORMAS:
1. Centrado en la historia medieval (Reconquista, Al-Ándalus, Cuenca medieval, Fuero de Cuenca, feudalismo, arte románico y gótico) y geografía urbana/demográfica.
2. Guía mediante causas, consecuencias, cronología y patrimonio histórico local sin terminología de cálculos.`,
    fallback: {
      explanation: '¡Hola! Soy Dña. Carmen, tu tutora de Geografía e Historia para 2º ESO. En nuestra materia analizamos los motivos y consecuencias de los acontecimientos históricos y su huella en el territorio.',
      keyConcept: 'Geografía e Historia (2º ESO LOMLOE)',
      hints: [
        'Pista 1: Sitúa el hecho o periodo en su siglo o época concreta.',
        'Pista 2: Identifica las causas políticas, sociales o económicas que lo motivaron.',
        'Pista 3: Relaciona los conceptos con los saberes trabajados en clase (Al-Ándalus, Reconquista o Feudalismo).'
      ],
      reflectionQuestion: '¿En qué contexto histórico o espacial se sitúa este tema?'
    }
  },
  'fisica-quimica': {
    title: 'Física y Química',
    tutor: 'D. Roberto',
    prompt: `Eres D. Roberto, profesor y tutor socrático de Física y Química para 2º de ESO en el IES San José de Cuenca.
Currículo: LOMLOE CLM.
Centrado en el método científico, magnitudes del Sistema Internacional (SI), cambios físicos vs químicos, densidad y estados de la materia.`,
    fallback: {
      explanation: '¡Hola! Soy D. Roberto, tu tutor de Física y Química de 2º ESO. Apliquemos el método científico paso a paso: ¿cuáles son las magnitudes o sustancias que aparecen?',
      keyConcept: 'Física y Química (2º ESO LOMLOE)',
      hints: [
        'Pista 1: Identifica las magnitudes que tienes y sus unidades en el Sistema Internacional (SI).',
        'Pista 2: Si necesitas cambiar unidades, aplica factores de conversión.',
        'Pista 3: Distingue si se trata de un cambio físico o una reacción química.'
      ],
      reflectionQuestion: '¿Qué magnitudes físicas o sustancias intervienen en este ejercicio?'
    }
  },
  matematicas: {
    title: 'Matemáticas',
    tutor: 'Dña. Elena',
    prompt: `Eres Dña. Elena, profesora y tutora socrática de Matemáticas para 2º de ESO en el IES San José de Cuenca.
Currículo: LOMLOE CLM.
Centrado en números enteros, fracciones, álgebra (ecuaciones de 1er grado), proporcionalidad y geometría.`,
    fallback: {
      explanation: '¡Hola! Soy Dña. Elena, tu tutora de Matemáticas de 2º ESO. Vamos a descomponer el problema en pasos ordenados: ¿cuál es la primera operación prioritaria según la jerarquía matemática?',
      keyConcept: 'Matemáticas (2º ESO LOMLOE)',
      hints: [
        'Pista 1: Respeta la jerarquía: primero paréntesis, luego multiplicaciones/divisiones, y al final sumas/restas.',
        'Pista 2: Recuerda la regla de los signos en productos y divisiones.',
        'Pista 3: Escribe tu primer paso para verificarlo juntos.'
      ],
      reflectionQuestion: '¿Qué operación tiene prioridad en este paso del ejercicio?'
    }
  }
};

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';
  const { subjectId = 'matematicas', message = '', conversationHistory = [], topicName = '' } = req.body || {};
  const config = SUBJECT_DETAILS[subjectId] || SUBJECT_DETAILS['matematicas'];

  if (!apiKey) {
    return res.status(200).json(config.fallback);
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: { 'User-Agent': 'aistudio-build-vercel' }
      }
    });

    const systemInstruction = `${config.prompt}
REGLA INQUEBRANTABLE (MÉTODO SOCRÁTICO):
1. PROHIBIDO resolverle los deberes o darle las soluciones finales directamente.
2. Orienta su razonamiento con preguntas guía y pistas escalonadas adaptadas a ${config.title}.
3. Formato JSON estricto con campos:
- explanation: string breve (2-3 frases socráticas adaptadas a la asignatura)
- keyConcept: string breve del concepto clave curricular
- hints: array de 3 strings con pistas útiles
- reflectionQuestion: string con una pregunta orientadora para que el alumno razone`;

    const recentHistory = Array.isArray(conversationHistory)
      ? conversationHistory.slice(-4).map((h: any) => `${h.role === 'user' ? 'Alumno' : config.tutor}: ${h.content}`).join('\n')
      : '';

    const promptText = `Tema del bloque: ${topicName || 'Temario 2º ESO'}\nHistorial reciente:\n${recentHistory}\n\nConsulta actual del alumno: ${message}`;

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

    const parsed = JSON.parse(response.text || '{}');
    if (parsed && parsed.explanation) {
      return res.status(200).json(parsed);
    }
    return res.status(200).json(config.fallback);
  } catch (error: any) {
    console.error('Error in Vercel chat handler:', error);
    return res.status(200).json(config.fallback);
  }
}
