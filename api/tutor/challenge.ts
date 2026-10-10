import { GoogleGenAI, Type } from '@google/genai';

const SUBJECT_NAMES: Record<string, string> = {
  matematicas: 'Matemáticas (4h/sem)',
  lengua: 'Lengua Castellana y Literatura (4h/sem)',
  'geografia-historia': 'Geografía e Historia (3h/sem)',
  'fisica-quimica': 'Física y Química (3h/sem)',
  ingles: 'Lengua Extranjera: Inglés (4h/sem)'
};

export default async function handler(req: any, res: any) {
  // Set CORS headers
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
  const { subjectId, topicName = 'General', difficulty = 'medio' } = req.body || {};
  const subjectTitle = SUBJECT_NAMES[subjectId] || subjectId || '2º ESO';

  if (!apiKey) {
    return res.status(503).json({
      error: 'GEMINI_API_KEY no configurada en el entorno del servidor',
      message: 'Usa el motor curricular dinámico del cliente o configura la variable GEMINI_API_KEY en Vercel'
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: { 'User-Agent': 'aistudio-build-vercel' }
      }
    });

    const systemInstruction = `Eres un profesor de secundaria creador de retos de 2º de ESO del IES San José de Cuenca (Castilla-La Mancha) para la asignatura ${subjectTitle}.
Genera UN reto interactivo tipo test de 4 opciones sobre el tema "${topicName}", nivel "${difficulty}", conforme al currículo oficial LOMLOE Decreto 82/2022 de Castilla-La Mancha.
El reto debe ser riguroso, motivador y adecuado para 13-14 años.
Devuelve JSON estricto con:
question (string),
options (array de 4 strings),
correctIndex (número de 0 a 3),
explanation (string con la explicación detallada),
hints (array de 3 strings con pistas socráticas graduales).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Genera 1 reto formativo tipo test para ${topicName}`,
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
    return res.status(200).json(parsed);
  } catch (error: any) {
    console.error('Error generating challenge on Vercel handler:', error);
    return res.status(200).json({
      question: `En ${subjectTitle}, respecto a "${topicName}", ¿cuál es el procedimiento fundamental según el currículo de 2º ESO?`,
      options: [
        'Comprender la definición conceptual y aplicar la fórmula o regla correspondiente de forma justificada.',
        'Aplicar fórmulas sin entender el significado de sus variables ni sus unidades.',
        'Memorizar problemas específicos sin aprender el principio general.',
        'Sustituir números al azar hasta encontrar una coincidencia.'
      ],
      correctIndex: 0,
      explanation: `El currículo de 2º de ESO en Castilla-La Mancha enfatiza la resolución razonada de problemas sobre ${topicName}.`,
      hints: [
        'Recuerda los pasos enseñados en clase.',
        'La opción A sintetiza el método competencial.',
        'Razona la relación entre concepto y aplicación.'
      ]
    });
  }
}
