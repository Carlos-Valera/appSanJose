import { Subject, Challenge } from '../types';

export const SUBJECTS: Subject[] = [
  {
    id: 'matematicas',
    name: 'Matemáticas',
    shortName: 'Mates',
    hoursPerWeek: 4,
    color: '#2563EB',
    accentClass: 'text-blue-600 dark:text-blue-400 border-blue-500 bg-blue-50 dark:bg-blue-950/40',
    bgLightClass: 'bg-blue-50 dark:bg-blue-950/30',
    darkAccentClass: 'dark:border-blue-800 dark:text-blue-300',
    iconName: 'Calculator',
    description: 'Sentido numérico, álgebra, proporcionalidad, geometría plana y del espacio, y estadística descriptiva.',
    tutorName: 'Prof. Pitágoras (Mates)',
    tutorRole: 'Tutor Socrático de Matemáticas 2º ESO',
    tutorAvatar: '📐',
    topics: [
      {
        id: 'mat-1',
        block: 'Sentido Numérico',
        name: 'Números Enteros y Operaciones Combinadas',
        description: 'Jerarquía de operaciones, uso de paréntesis y regla de los signos.',
        keyConcepts: ['Regla de signos', 'Jerarquía de operaciones', 'Valor absoluto', 'Propiedad distributiva']
      },
      {
        id: 'mat-2',
        block: 'Sentido Numérico',
        name: 'Fracciones y Decimales',
        description: 'Fracciones equivalentes, reducción a común denominador (mcm), operaciones y problemas reales.',
        keyConcepts: ['Mínimo común múltiplo', 'Fracción irreducible', 'Fracción generatriz', 'Porcentajes como fracción']
      },
      {
        id: 'mat-3',
        block: 'Sentido Numérico',
        name: 'Potencias, Raíces y Notación Científica',
        description: 'Propiedades de las potencias con misma base o exponente, raíces cuadradas exactas y enteras.',
        keyConcepts: ['Producto de potencias de igual base', 'Potencia de una potencia', 'Raíz cuadrada', 'Cuadrados perfectos']
      },
      {
        id: 'mat-4',
        block: 'Sentido Numérico',
        name: 'Proporcionalidad y Porcentajes',
        description: 'Magnitudes directa e inversamente proporcionales, regla de tres, aumentos y descuentos porcentuales.',
        keyConcepts: ['Constante de proporcionalidad', 'Regla de tres directa', 'Regla de tres inversa', 'Descuentos y recargos']
      },
      {
        id: 'mat-5',
        block: 'Sentido Algebraico',
        name: 'Álgebra Básica y Monomios',
        description: 'Lenguaje algebraico, grado, coeficiente, parte literal y operaciones con monomios.',
        keyConcepts: ['Traducción al lenguaje algebraico', 'Monomios semejantes', 'Suma y producto de monomios', 'Valor numérico']
      },
      {
        id: 'mat-6',
        block: 'Sentido Algebraico',
        name: 'Ecuaciones de 1º y 2º Grado',
        description: 'Resolución de ecuaciones lineales con denominadores y problemas verbales asociados.',
        keyConcepts: ['Transposición de términos', 'Eliminación de denominadores', 'Planteamiento de problemas', 'Comprobación de soluciones']
      },
      {
        id: 'mat-7',
        block: 'Sentido Espacial',
        name: 'Teorema de Pitágoras y Geometría Plana',
        description: 'Aplicación del Teorema de Pitágoras en triángulos, polígonos regulares y cálculo de perímetros y áreas.',
        keyConcepts: ['Hipotenusa y catetos', 'Triángulo rectángulo', 'Apotema', 'Área de figuras compuestas']
      },
      {
        id: 'mat-8',
        block: 'Sentido Espacial',
        name: 'Cuerpos Geométricos y Volúmenes',
        description: 'Prismas, pirámides, cilindros, conos y esferas: áreas laterales, totales y cálculo de volumen.',
        keyConcepts: ['Poliedros y cuerpos de revolución', 'Área lateral y total', 'Volumen de prismas y cilindros', 'Unidades de capacidad (litros)']
      },
      {
        id: 'mat-9',
        block: 'Sentido Estocástico',
        name: 'Estadística y Probabilidad Básica',
        description: 'Tablas de frecuencias, media aritmética, mediana, moda y regla de Laplace para sucesos equiprobables.',
        keyConcepts: ['Frecuencia absoluta y relativa', 'Media aritmética', 'Mediana y Moda', 'Regla de Laplace']
      }
    ]
  },
  {
    id: 'lengua',
    name: 'Lengua Castellana y Literatura',
    shortName: 'Lengua',
    hoursPerWeek: 4,
    color: '#D97706',
    accentClass: 'text-amber-600 dark:text-amber-400 border-amber-500 bg-amber-50 dark:bg-amber-950/40',
    bgLightClass: 'bg-amber-50 dark:bg-amber-950/30',
    darkAccentClass: 'dark:border-amber-800 dark:text-amber-300',
    iconName: 'BookOpen',
    description: 'Comunicación y tipología textual, gramática y sintaxis de la oración simple, léxico y educación literaria.',
    tutorName: 'Prof. Cervantes (Lengua)',
    tutorRole: 'Tutor Socrático de Lengua y Literatura 2º ESO',
    tutorAvatar: '📖',
    topics: [
      {
        id: 'len-1',
        block: 'Comunicación',
        name: 'Tipologías Textuales: Narración, Descripción y Exposición',
        description: 'Estructura de textos narrativos, tipos de descripción objetiva/subjetiva y textos expositivos de divulgación.',
        keyConcepts: ['Estructura narrativa (planteamiento, nudo, desenlace)', 'Prosopografía y etopeya', 'Conectores discursivos', 'Intención comunicativa']
      },
      {
        id: 'len-2',
        block: 'Reflexión sobre la Lengua',
        name: 'Morfología: Clases de Palabras',
        description: 'Sustantivos, adjetivos, determinantes, pronombres, verbos, adverbios, preposiciones y conjunciones.',
        keyConcepts: ['Lexemas y morfemas', 'Palabras variables e invariables', 'Tiempos y modos verbales', 'Perífrasis verbales elementales']
      },
      {
        id: 'len-3',
        block: 'Reflexión sobre la Lengua',
        name: 'Sintaxis: La Oración Simple y sus Complementos',
        description: 'Sujeto léxico y omitido, predicado nominal y verbal, CD, CI, Complementos Circunstanciales, Atributo y CPred.',
        keyConcepts: ['Sintagma Nominal Sujeto', 'Sintagma Verbal Predicado', 'Pronominalización de CD y CI (lo/la/le)', 'Atributo en verbos copulativos']
      },
      {
        id: 'len-4',
        block: 'Reflexión sobre la Lengua',
        name: 'Léxico, Ortografía y Semántica',
        description: 'Sinonimia, antonimia, polisemia, homonimia, campos semánticos y reglas de acentuación (agudas, llanas, esdrújulas, diptongos e hiatos).',
        keyConcepts: ['Campo léxico y semántico', 'Diptongo e hiato', 'Tilde diacrítica', 'Prefijos y sufijos de derivación']
      },
      {
        id: 'len-5',
        block: 'Educación Literaria',
        name: 'Géneros Literarios y Figuras Retóricas',
        description: 'Lírica, narrativa y teatro. Cómputo silábico, rima asonante/consonante y recursos expresivos (metáfora, hipérbole, personificación).',
        keyConcepts: ['Métrica y rima', 'Metáfora y comparación', 'Personificación e hipérbole', 'Estructura dramática (acotaciones, diálogo)']
      }
    ]
  },
  {
    id: 'geografia-historia',
    name: 'Geografía e Historia',
    shortName: 'Geo e Hist',
    hoursPerWeek: 3,
    color: '#059669',
    accentClass: 'text-emerald-600 dark:text-emerald-400 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40',
    bgLightClass: 'bg-emerald-50 dark:bg-emerald-950/30',
    darkAccentClass: 'dark:border-emerald-800 dark:text-emerald-300',
    iconName: 'Globe',
    description: 'La Edad Media, el feudalismo, Al-Ándalus y la Reconquista (con foco en Castilla y Cuenca), el Renacimiento y Geografía humana.',
    tutorName: 'Prof. Heródoto (Historia)',
    tutorRole: 'Tutor Socrático de Geografía e Historia 2º ESO',
    tutorAvatar: '🏰',
    topics: [
      {
        id: 'gh-1',
        block: 'Historia Medieval',
        name: 'La Caída del Imperio Romano, Bizancio y el Islam',
        description: 'Fragmentación del mundo mediterráneo, características del Imperio Bizantino y origen y expansión del Islam.',
        keyConcepts: ['Justiniano y Santa Sofía', 'Cinco pilares del Islam', 'Califatos y expansión', 'Sociedad islámica medieval']
      },
      {
        id: 'gh-2',
        block: 'Historia Medieval',
        name: 'Al-Ándalus y la Historia Medieval de la Península',
        description: 'Evolución política (emirato, califato de Córdoba, taifas), economía andalusí y legado cultural en España.',
        keyConcepts: ['Abderramán III y el Califato', 'Mezquita de Córdoba y Alhambra', 'Reinos de Taifas', 'Regadío y agricultura andalusí']
      },
      {
        id: 'gh-3',
        block: 'Historia Medieval',
        name: 'Los Reinos Cristianos y la Reconquista (Castilla y Cuenca)',
        description: 'Formación de los reinos peninsulares, proceso de reconquista y repoblación, y conquista de Cuenca en 1177 por Alfonso VIII.',
        keyConcepts: ['Alfonso VIII y la toma de Cuenca (1177)', 'Fuero de Cuenca', 'Órdenes Militares', 'Camino de Santiago']
      },
      {
        id: 'gh-4',
        block: 'Historia Medieval',
        name: 'El Feudalismo Europeo y el Arte Románico y Gótico',
        description: 'La sociedad estamental (nobles, clérigos y campesinos), el feudo, las cruzadas y comparación artística entre Románico y Gótico.',
        keyConcepts: ['Pacto de vasallaje', 'Sociedad estamental', 'Arco de medio punto vs ojival', 'Catedral gótica y vidrieras']
      },
      {
        id: 'gh-5',
        block: 'Edad Moderna',
        name: 'El Renacimiento, el Humanismo y los Reyes Católicos',
        description: 'Nacimiento del Estado moderno, era de los descubrimientos marítimos (1492), antropocentrismo y unión dinástica castellano-aragonesa.',
        keyConcepts: ['Humanismo y antropocentrismo', '1492: Descubrimiento de América', 'Unión dinástica de Isabel y Fernando', 'Imprenta de Gutenberg']
      },
      {
        id: 'gh-6',
        block: 'Geografía Humana',
        name: 'Población y Espacios Urbanos en España y el Mundo',
        description: 'Dinámicas demográficas (tasas de natalidad, mortalidad y crecimiento natural), pirámides de población y la España vaciada.',
        keyConcepts: ['Crecimiento vegetativo', 'Pirámide de población', 'Éxodo rural y reto demográfico', 'Desarrollo urbano sostenible']
      }
    ]
  },
  {
    id: 'fisica-quimica',
    name: 'Física y Química',
    shortName: 'Física y Quím',
    hoursPerWeek: 3,
    color: '#6366F1',
    accentClass: 'text-indigo-600 dark:text-indigo-400 border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40',
    bgLightClass: 'bg-indigo-50 dark:bg-indigo-950/30',
    darkAccentClass: 'dark:border-indigo-800 dark:text-indigo-300',
    iconName: 'FlaskConical',
    description: 'El método científico, la materia y sus estados, mezclas y disoluciones, estructura atómica, fuerzas, movimiento y energía.',
    tutorName: 'Prof. Curie (Física y Química)',
    tutorRole: 'Tutor Socrático de Física y Química 2º ESO',
    tutorAvatar: '⚗️',
    topics: [
      {
        id: 'fq-1',
        block: 'La Actividad Científica',
        name: 'El Método Científico y Magnitudes (SI)',
        description: 'Etapas del método científico, magnitudes fundamentales y derivadas, Sistema Internacional y factores de conversión.',
        keyConcepts: ['Hipótesis y experimentación', 'Sistema Internacional (m, kg, s)', 'Factores de conversión', 'Sensibilidad y error de medida']
      },
      {
        id: 'fq-2',
        block: 'La Materia',
        name: 'Estados de Agregación y Teoría Cinética',
        description: 'Sólido, líquido y gas; cambios de estado (fusión, vaporización, sublimación) y comportamiento de las partículas según la teoría cinético-molecular.',
        keyConcepts: ['Teoría cinético-molecular', 'Temperatura y agitación térmica', 'Cambios de estado', 'Curvas de calentamiento']
      },
      {
        id: 'fq-3',
        block: 'La Materia',
        name: 'Sustancias Puras, Mezclas y Disoluciones',
        description: 'Diferencia entre mezcla homogénea y heterogénea, soluto y disolvente, cálculo de concentración en masa (g/L) y métodos de separación.',
        keyConcepts: ['Sustancia pura vs mezcla', 'Soluto y disolvente', 'Concentración en g/L (% en masa)', 'Filtración, decantación y destilación']
      },
      {
        id: 'fq-4',
        block: 'Estructura Atómica',
        name: 'El Átomo y la Tabla Periódica Básica',
        description: 'Estructura atómica (protones, neutrones y electrones), número atómico (Z) y número másico (A), e introducción a elementos químicos cotidianos.',
        keyConcepts: ['Partículas subatómicas', 'Número atómico Z y másico A', 'Isótopos', 'Grupos y periodos de la Tabla Periódica']
      },
      {
        id: 'fq-5',
        block: 'Cinemática y Dinámica',
        name: 'Movimiento, Velocidad y Fuerzas Cotidianas',
        description: 'Concepto de trayectoria, posición y desplazamiento; cálculo de velocidad media ($v = d/t$); concepto de fuerza, gravedad y rozamiento.',
        keyConcepts: ['Velocidad media en m/s y km/h', 'Fuerza como vector (Newton)', 'Ley de Gravitación y Peso vs Masa', 'Fuerza de rozamiento']
      },
      {
        id: 'fq-6',
        block: 'Energía',
        name: 'Energía, Trabajo, Calor y Temperatura',
        description: 'Formas de energía (cinética, potencial, térmica, química), principio de conservación, diferencia entre calor y temperatura y fuentes renovables.',
        keyConcepts: ['Conservación de la energía', 'Energía cinética y potencial', 'Calor como transferencia de energía', 'Fuentes renovables vs no renovables']
      }
    ]
  },
  {
    id: 'ingles',
    name: 'Lengua Extranjera: Inglés',
    shortName: 'Inglés',
    hoursPerWeek: 4,
    color: '#0891B2',
    accentClass: 'text-cyan-600 dark:text-cyan-400 border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40',
    bgLightClass: 'bg-cyan-50 dark:bg-cyan-950/30',
    darkAccentClass: 'dark:border-cyan-800 dark:text-cyan-300',
    iconName: 'Languages',
    description: 'Grammar and verb tenses (Present, Past, Future), modal verbs, reading comprehension, writing short compositions and oral interaction.',
    tutorName: 'Prof. Shakespeare (Inglés)',
    tutorRole: 'Tutor Socrático de Inglés 2º ESO',
    tutorAvatar: '🇬🇧',
    topics: [
      {
        id: 'ing-1',
        block: 'Grammar & Usage',
        name: 'Present Simple vs Present Continuous',
        description: 'Routines and habits vs actions happening right now, adverbs of frequency, and stative verbs (like, know, want).',
        keyConcepts: ['Adverbs of frequency (always, often)', 'Time expressions (now, at the moment)', 'Third person -s rule', 'Spelling rules (-ing)']
      },
      {
        id: 'ing-2',
        block: 'Grammar & Usage',
        name: 'Past Simple (Regular & Irregular) vs Past Continuous',
        description: 'Narrating past events, irregular verb forms, and combining past tenses with "when" and "while".',
        keyConcepts: ['Regular verbs with -ed', 'Common irregular verbs (went, saw, took)', 'Past continuous (was/were + -ing)', 'Interrupted actions (when/while)']
      },
      {
        id: 'ing-3',
        block: 'Grammar & Usage',
        name: 'Present Perfect Simple with Just, Already, Yet',
        description: 'Connecting past experiences to the present, forming sentences with have/has + past participle.',
        keyConcepts: ['Have/Has + past participle', 'Ever and never for life experiences', 'Just, already and yet', 'Been vs gone']
      },
      {
        id: 'ing-4',
        block: 'Grammar & Usage',
        name: 'Future Forms: Will vs Be Going To',
        description: 'Spontaneous decisions and predictions without evidence (will) vs future plans and intentions (be going to).',
        keyConcepts: ['Will for sudden decisions & offers', 'Be going to for intentions and plans', 'Predictions based on present evidence', 'Time clauses']
      },
      {
        id: 'ing-5',
        block: 'Grammar & Usage',
        name: 'Modal Verbs: Can, Could, Must, Should, Have to',
        description: 'Expressing ability, permission, obligation, prohibition, and giving advice.',
        keyConcepts: ['Ability (can/could)', 'Advice (should/shouldn\'t)', 'Obligation (must/have to)', 'Prohibition (mustn\'t vs don\'t have to)']
      },
      {
        id: 'ing-6',
        block: 'Grammar & Usage',
        name: 'Comparatives, Superlatives and First Conditional',
        description: 'Comparing qualities with short and long adjectives, and "if + present simple, will + base form" conditional structure.',
        keyConcepts: ['-er than / more ... than', 'the -est / the most ...', 'Irregular forms (good-better-best, bad-worse-worst)', 'First conditional structure']
      }
    ]
  }
];

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'ch-mat-1',
    subjectId: 'matematicas',
    topicId: 'mat-1',
    topicName: 'Números Enteros y Operaciones Combinadas',
    question: 'En la operación: -4 - 3 · (-2) + 8 : (-4), ¿cuál es el resultado correcto siguiendo la jerarquía de operaciones?',
    options: ['0', '-4', '8', '-10'],
    correctIndex: 0,
    explanation: 'Primero resolvemos las multiplicaciones y divisiones: 3 · (-2) = -6, y 8 : (-4) = -2. La expresión queda: -4 - (-6) + (-2) = -4 + 6 - 2 = 0.',
    difficulty: 'medio',
    hints: [
      'Recuerda la jerarquía: antes de sumar o restar, debes resolver las multiplicaciones y divisiones.',
      'Fíjate bien en el signo de -3 · (-2): menos por menos es más.',
      'Reescribe la expresión con los resultados intermedios antes de calcular la suma final.'
    ]
  },
  {
    id: 'ch-mat-2',
    subjectId: 'matematicas',
    topicId: 'mat-6',
    topicName: 'Ecuaciones de 1º Grado',
    question: 'Si en un triángulo rectángulo los catetos miden 6 cm y 8 cm, ¿cuánto mide su hipotenusa según el Teorema de Pitágoras?',
    options: ['14 cm', '10 cm', '12 cm', '48 cm'],
    correctIndex: 1,
    explanation: 'Por el Teorema de Pitágoras: a² = b² + c² = 6² + 8² = 36 + 64 = 100. La hipotenusa es la raíz cuadrada de 100, que es 10 cm.',
    difficulty: 'facil',
    hints: [
      'Aplica la fórmula: Hipotenusa al cuadrado = Cateto 1 al cuadrado + Cateto 2 al cuadrado.',
      'Calcula primero 6² y 8² por separado.',
      'Suma los dos valores y halla la raíz cuadrada del resultado.'
    ]
  },
  {
    id: 'ch-len-1',
    subjectId: 'lengua',
    topicId: 'len-3',
    topicName: 'Sintaxis: La Oración Simple',
    question: 'En la oración: "El profesor entregó las notas a los alumnos ayer en Cuenca", ¿qué función sintáctica desempeña "a los alumnos"?',
    options: ['Complemento Directo (CD)', 'Complemento Indirecto (CI)', 'Complemento Circunstancial de Lugar', 'Atributo'],
    correctIndex: 1,
    explanation: '"A los alumnos" es el Complemento Indirecto (CI) porque designa a los destinatarios de la acción y se puede sustituir por el pronombre "les": "El profesor les entregó las notas".',
    difficulty: 'medio',
    hints: [
      'Prueba a sustituir el sintagma por un pronombre átono (lo, la, los, las o le, les).',
      'El Complemento Directo en esta oración es "las notas" ("las entregó"). ¿Quién recibe la acción?',
      'Si se sustituye por "les", la función es Complemento Indirecto.'
    ]
  },
  {
    id: 'ch-fq-1',
    subjectId: 'fisica-quimica',
    topicId: 'fq-3',
    topicName: 'Sustancias Puras, Mezclas y Disoluciones',
    question: 'Si disolvemos 15 g de sal en agua hasta obtener 250 mL de disolución, ¿cuál es la concentración en masa de la disolución expresada en g/L?',
    options: ['60 g/L', '0,06 g/L', '37,5 g/L', '15 g/L'],
    correctIndex: 0,
    explanation: 'Primero convertimos el volumen a litros: 250 mL = 0,25 L. Luego aplicamos la fórmula: Concentración = masa soluto / volumen = 15 g / 0,25 L = 60 g/L.',
    difficulty: 'medio',
    hints: [
      'Fíjate en las unidades: la concentración te la piden en g/L pero el volumen está en mililitros.',
      'Convierte 250 mL a litros dividiendo entre 1000.',
      'Divide la masa de sal (15 g) entre los litros de disolución (0,25 L).'
    ]
  },
  {
    id: 'ch-gh-1',
    subjectId: 'geografia-historia',
    topicId: 'gh-3',
    topicName: 'Los Reinos Cristianos y la Reconquista',
    question: '¿Qué rey castellano conquistó la ciudad de Cuenca en el año 1177 tras un asedio de nueve meses y le otorgó su célebre Fuero?',
    options: ['Alfonso VIII de Castilla', 'Fernando III el Santo', 'Alfonso X el Sabio', 'Sancho III'],
    correctIndex: 0,
    explanation: 'Fue Alfonso VIII de Castilla quien conquistó Cuenca el 21 de septiembre de 1177 (día de San Mateo) tras vencer a las tropas almohades, concediéndole el prestigioso Fuero de Cuenca.',
    difficulty: 'facil',
    hints: [
      'Este acontecimiento se conmemora en Cuenca con las tradicionales fiestas de San Mateo en septiembre.',
      'Fue el mismo monarca que más tarde lideró a las tropas cristianas en la histórica batalla de Las Navas de Tolosa (1212).',
      'Su nombre es Alfonso y su numeral romano es el VIII.'
    ]
  },
  {
    id: 'ch-ing-1',
    subjectId: 'ingles',
    topicId: 'ing-2',
    topicName: 'Past Simple vs Past Continuous',
    question: 'Choose the correct sentence to complete the idea: "While I _______ my English homework, my phone _______."',
    options: [
      'was doing / rang',
      'did / was ringing',
      'was doing / was ringing',
      'did / rang'
    ],
    correctIndex: 0,
    explanation: 'We use the Past Continuous ("was doing") for the longer continuous action in progress, and the Past Simple ("rang") for the short action that interrupted it with "while".',
    difficulty: 'medio',
    hints: [
      'Look at the word "While" — it usually introduces an action that was already taking place over time.',
      'Think about which action was continuous and which single action interrupted it suddenly.',
      'Use Past Continuous (was/were + -ing) for the longer activity, and Past Simple for the sudden interruption.'
    ]
  }
];
