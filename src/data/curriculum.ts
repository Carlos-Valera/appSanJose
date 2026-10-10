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
  // ================= GEOGRAFÍA E HISTORIA =================
  {
    id: 'ch-gh-1-1',
    subjectId: 'geografia-historia',
    topicId: 'gh-1',
    topicName: 'La Caída del Imperio Romano, Bizancio y el Islam',
    question: '¿Qué gran emperador bizantino del siglo VI mandó construir la basílica de Santa Sofía en Constantinopla y recopiló el Derecho Romano?',
    options: ['Justiniano I', 'Constantino el Grande', 'Carlomagno', 'Teodosio I'],
    correctIndex: 0,
    explanation: 'Justiniano I (527-565) llevó al Imperio Bizantino a su máximo apogeo político y cultural, recopiló el "Corpus Iuris Civilis" y ordenó levantar Santa Sofía.',
    difficulty: 'facil',
    hints: [
      'Gobernó en el siglo VI junto a su esposa Teodora.',
      'Su nombre empieza por J.',
      'Su código de leyes sigue siendo la base del Derecho civil occidental.'
    ]
  },
  {
    id: 'ch-gh-1-2',
    subjectId: 'geografia-historia',
    topicId: 'gh-1',
    topicName: 'La Caída del Imperio Romano, Bizancio y el Islam',
    question: '¿En qué año tuvo lugar la Hégira (la huida de Mahoma de La Meca a Medina), hecho que marca el inicio del calendario musulmán?',
    options: ['Año 622 d.C.', 'Año 476 d.C.', 'Año 711 d.C.', 'Año 800 d.C.'],
    correctIndex: 0,
    explanation: 'La Hégira ocurrió en el año 622 d.C., fecha oficial a partir de la cual se computan los años en el calendario islámico.',
    difficulty: 'medio',
    hints: [
      'Sucedió en el siglo VII d.C.',
      'Fue casi un siglo antes de que los musulmanes entraran en Hispania (711).',
      'El número termina en dos dosis de dos: 622.'
    ]
  },
  {
    id: 'ch-gh-2-1',
    subjectId: 'geografia-historia',
    topicId: 'gh-2',
    topicName: 'Al-Ándalus y la Historia Medieval de la Península',
    question: '¿Quién proclamó el Califato de Córdoba en el año 929, independizándose totalmente del poder religioso de Bagdad?',
    options: ['Abderramán III', 'Abderramán I', 'Al-Hakam II', 'Almanzor'],
    correctIndex: 0,
    explanation: 'Abderramán III asumió el título de Califa en 929, concentrando tanto el poder político como el religioso e iniciando la etapa de mayor esplendor de Al-Ándalus.',
    difficulty: 'medio',
    hints: [
      'Fue el tercer monarca con ese nombre en Córdoba.',
      'Fundó la deslumbrante ciudad palatina de Medina Azahara.',
      'Lleva el numeral romano III.'
    ]
  },
  {
    id: 'ch-gh-2-2',
    subjectId: 'geografia-historia',
    topicId: 'gh-2',
    topicName: 'Al-Ándalus y la Historia Medieval de la Península',
    question: 'Tras la crisis y desaparición del Califato de Córdoba en 1031, ¿en qué entidades políticas se fragmentó el territorio andalusí?',
    options: ['Reinos de Taifas', 'Marcas carolingias', 'Señoríos visigodos', 'Condados flamencos'],
    correctIndex: 0,
    explanation: 'En 1031 el califato se desintegró en más de treinta pequeños estados independientes y rivales llamados Reinos de Taifas (como Toledo, Zaragoza o Sevilla).',
    difficulty: 'facil',
    hints: [
      'Es una palabra árabe que significa facción o bando.',
      'Eran reinos que a menudo pagaban parias (tributos) a los reyes cristianos para evitar ataques.',
      'Comienza por la letra T: Taifas.'
    ]
  },
  {
    id: 'ch-gh-3-1',
    subjectId: 'geografia-historia',
    topicId: 'gh-3',
    topicName: 'Los Reinos Cristianos y la Reconquista (Castilla y Cuenca)',
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
    id: 'ch-gh-3-2',
    subjectId: 'geografia-historia',
    topicId: 'gh-3',
    topicName: 'Los Reinos Cristianos y la Reconquista (Castilla y Cuenca)',
    question: '¿En qué histórica batalla del año 1212 se unieron los reinos de Castilla, Navarra y Aragón para derrotar al ejército almohade?',
    options: ['Batalla de Las Navas de Tolosa', 'Batalla de Covadonga', 'Batalla de Alarcos', 'Batalla de Guadalete'],
    correctIndex: 0,
    explanation: 'La batalla de Las Navas de Tolosa (1212), librada en Sierra Morena, supuso un punto de inflexión definitivo que abrió Andalucía a la reconquista cristiana.',
    difficulty: 'medio',
    hints: [
      'Tuvo lugar en el actual norte de la provincia de Jaén.',
      'Fue liderada por el mismo Alfonso VIII que conquistó Cuenca.',
      'Lleva el nombre de "Las Navas de...".'
    ]
  },
  {
    id: 'ch-gh-4-1',
    subjectId: 'geografia-historia',
    topicId: 'gh-4',
    topicName: 'El Feudalismo Europeo y el Arte Románico y Gótico',
    question: 'En la sociedad estamental feudal, ¿cómo se llamaba el pacto solemne de fidelidad militar y protección mutua entre un noble y su señor?',
    options: ['Pacto de vasallaje', 'Tratado de Tordesillas', 'Concordato papal', 'Fuero municipal'],
    correctIndex: 0,
    explanation: 'El pacto de vasallaje se sellaba mediante la ceremonia del homenaje e investidura: el vasallo juraba fidelidad y auxilio militar, y el señor le entregaba un feudo.',
    difficulty: 'facil',
    hints: [
      'Involucra a la figura del "vasallo".',
      'Incluía el homenaje de rodillas y el juramento sobre la Biblia.',
      'Se componía de dos partes: homenaje e investidura.'
    ]
  },
  {
    id: 'ch-gh-4-2',
    subjectId: 'geografia-historia',
    topicId: 'gh-4',
    topicName: 'El Feudalismo Europeo y el Arte Románico y Gótico',
    question: '¿Cuál es el elemento constructivo característico de la arquitectura GÓTICA que permitió abrir grandes ventanales con vidrieras?',
    options: ['El arco apuntado (ojival) y los arbotantes', 'El arco de medio punto y los muros macizos', 'La columna dórica sin capitel', 'La viga de hierro forjado'],
    correctIndex: 0,
    explanation: 'El arco ojival y los arbotantes exteriores desviaban el peso de las bóvedas hacia contrafuertes externos, liberando los muros para instalar vidrieras luminosas.',
    difficulty: 'medio',
    hints: [
      'El arco gótico termina en punta (ojival).',
      'Exteriormente utiliza brazos de piedra llamados arbotantes.',
      'La catedral gótica de Cuenca es uno de los primeros ejemplos castellanos.'
    ]
  },
  {
    id: 'ch-gh-5-1',
    subjectId: 'geografia-historia',
    topicId: 'gh-5',
    topicName: 'El Renacimiento, el Humanismo y los Reyes Católicos',
    question: '¿Qué corriente de pensamiento surgió en el siglo XV situando al ser humano como centro de la razón, el conocimiento y el arte?',
    options: ['Humanismo (Antropocentrismo)', 'Teocentrismo medieval', 'Escolástica clerical', 'Ilustración enciclopedista'],
    correctIndex: 0,
    explanation: 'El Humanismo promovió el antropocentrismo, recuperando los ideales de Grecia y Roma y considerando al ser humano y a la razón como motores del progreso.',
    difficulty: 'facil',
    hints: [
      'Proviene de la raíz latina "humanus" (humano).',
      'Se opone al teocentrismo que ponía a Dios como única explicación de todo.',
      'Destacan figuras como Erasmo de Rotterdam o Nebrija.'
    ]
  },
  {
    id: 'ch-gh-5-2',
    subjectId: 'geografia-historia',
    topicId: 'gh-5',
    topicName: 'El Renacimiento, el Humanismo y los Reyes Católicos',
    question: '¿Qué gran invento atribuido a Johannes Gutenberg hacia 1440 permitió difundir las obras humanistas por toda Europa con rapidez inédita?',
    options: ['La imprenta de tipos móviles', 'El telescopio astronómico', 'La brújula magnética', 'El papiro encuadernado'],
    correctIndex: 0,
    explanation: 'La imprenta de tipos móviles de plomo revolucionó la reproducción de libros, abaratando su coste y extendiendo la alfabetización y las nuevas ideas.',
    difficulty: 'facil',
    hints: [
      'Permitió sustituir a los monjes copistas que escribían libros a mano.',
      'Utilizaba letras metálicas intercambiables con tinta.',
      'La Biblia fue su primera gran obra impresa.'
    ]
  },
  {
    id: 'ch-gh-6-1',
    subjectId: 'geografia-historia',
    topicId: 'gh-6',
    topicName: 'Población y Espacios Urbanos en España y el Mundo',
    question: '¿Qué indicador demográfico mide el número de habitantes por cada kilómetro cuadrado de superficie (hab/km²)?',
    options: ['Densidad de población', 'Tasa bruta de natalidad', 'Saldo migratorio', 'Crecimiento vegetativo'],
    correctIndex: 0,
    explanation: 'La densidad de población indica el grado de concentración humana en un territorio: Densidad = Población total / Superficie (km²). En Cuenca es muy baja por la despoblación serrana.',
    difficulty: 'facil',
    hints: [
      'Relaciona la cantidad de personas con el espacio físico.',
      'Se expresa en habitantes por km².',
      'Proviene del concepto físico de densidad (masa / volumen).'
    ]
  },
  {
    id: 'ch-gh-6-2',
    subjectId: 'geografia-historia',
    topicId: 'gh-6',
    topicName: 'Población y Espacios Urbanos en España y el Mundo',
    question: 'En geografía urbana, ¿cómo se denomina al plano irregular típico de las ciudades de origen medieval como el casco histórico de Cuenca?',
    options: ['Plano irregular o desordenado', 'Plano ortogonal o hipodámico', 'Plano radiocéntrico concéntrico', 'Plano en cuadrícula ensanche'],
    correctIndex: 0,
    explanation: 'El plano irregular no tiene un diseño geométrico planificado: sus calles son estrechas, tortuosas y adaptadas al relieve natural de las hoces y peñascos.',
    difficulty: 'medio',
    hints: [
      'No tiene calles rectas perpendiculares en damero.',
      'Se adaptaba a las murallas defensivas y al relieve abrupto de la montaña.',
      'Su nombre indica que carece de regularidad.'
    ]
  },

  // ================= MATEMÁTICAS =================
  {
    id: 'ch-mat-1',
    subjectId: 'matematicas',
    topicId: 'mat-1',
    topicName: 'Números Enteros y Operaciones Combinadas',
    question: 'En la operación: -4 - 3 · (-2) + 8 : (-4), ¿cuál es el resultado correcto siguiendo la jerarquía de operaciones?',
    options: ['0', '-4', '8', '-10'],
    correctIndex: 0,
    explanation: 'Primero multiplicaciones y divisiones: 3 · (-2) = -6, y 8 : (-4) = -2. La expresión queda: -4 - (-6) + (-2) = -4 + 6 - 2 = 0.',
    difficulty: 'medio',
    hints: [
      'Recuerda la jerarquía: antes de sumar o restar, resuelve multiplicaciones y divisiones.',
      'Fíjate bien en el signo de -(-6): menos por menos es más.',
      'La suma final da exactamente cero.'
    ]
  },
  {
    id: 'ch-mat-2',
    subjectId: 'matematicas',
    topicId: 'mat-2',
    topicName: 'Fracciones y Decimales',
    question: '¿Cuál es el resultado de la suma de fracciones: 2/3 + 3/4 tras reducir a común denominador?',
    options: ['17/12', '5/7', '5/12', '11/12'],
    correctIndex: 0,
    explanation: 'El m.c.m.(3, 4) = 12. Transformamos las fracciones: 2/3 = 8/12 y 3/4 = 9/12. Sumamos numeradores: 8/12 + 9/12 = 17/12.',
    difficulty: 'medio',
    hints: [
      'Halla primero el m.c.m. de los denominadores 3 y 4 (es 12).',
      'Calcula las fracciones equivalentes: 12:3·2 = 8, y 12:4·3 = 9.',
      'Suma 8 + 9 conservando el denominador 12.'
    ]
  },
  {
    id: 'ch-mat-3',
    subjectId: 'matematicas',
    topicId: 'mat-3',
    topicName: 'Potencias, Raíces y Notación Científica',
    question: 'Según las propiedades de las potencias, ¿cuál es el resultado de simplificar (2³)² · 2⁴?',
    options: ['2¹⁰', '2⁹', '2²⁴', '2¹⁴'],
    correctIndex: 0,
    explanation: '(2³)² es una potencia de una potencia, multiplicamos exponentes: 3·2 = 6, dando 2⁶. Luego 2⁶ · 2⁴ tienen igual base: sumamos exponentes 6 + 4 = 10, obteniendo 2¹⁰.',
    difficulty: 'medio',
    hints: [
      'Potencia de una potencia: se multiplican los exponentes (3 · 2 = 6).',
      'Producto de potencias de igual base: se suman los exponentes.',
      '6 + 4 = 10.'
    ]
  },
  {
    id: 'ch-mat-4',
    subjectId: 'matematicas',
    topicId: 'mat-4',
    topicName: 'Proporcionalidad y Porcentajes',
    question: 'Unos pantalones costaban 40 € en una tienda de Cuenca y tienen un descuento del 15%. ¿Cuánto se paga finalmente por ellos?',
    options: ['34 €', '25 €', '36 €', '38 €'],
    correctIndex: 0,
    explanation: 'El 15% de 40 € es (15 · 40) / 100 = 600 / 100 = 6 € de rebaja. El precio final es 40 - 6 = 34 € (o bien 40 · 0,85 = 34 €).',
    difficulty: 'facil',
    hints: [
      'Calcula el 10% de 40 (4 €) y el 5% (2 €), sumando 6 € de rebaja.',
      'Resta la rebaja al precio inicial: 40 - 6.',
      'El resultado es 34 €.'
    ]
  },
  {
    id: 'ch-mat-5',
    subjectId: 'matematicas',
    topicId: 'mat-5',
    topicName: 'Álgebra Básica y Monomios',
    question: '¿Cuál es el resultado de sumar los monomios semejantes: 5x² - 8x² + 2x²?',
    options: ['-x²', '-x', '-1x⁴', 'x²'],
    correctIndex: 0,
    explanation: 'Al ser monomios semejantes (misma parte literal x²), operamos los coeficientes: 5 - 8 + 2 = -1. El resultado es -1x², que se escribe -x².',
    difficulty: 'facil',
    hints: [
      'Comprueba que tienen la misma parte literal: x².',
      'Suma los coeficientes: 5 - 8 = -3; -3 + 2 = -1.',
      'El 1 no se suele escribir: queda -x².'
    ]
  },
  {
    id: 'ch-mat-6',
    subjectId: 'matematicas',
    topicId: 'mat-6',
    topicName: 'Ecuaciones de 1º y 2º Grado',
    question: 'Resuelve la ecuación de primer grado: 3x - 5 = x + 7',
    options: ['x = 6', 'x = 2', 'x = 12', 'x = 3'],
    correctIndex: 0,
    explanation: 'Agrupamos las x en el primer miembro: 3x - x = 7 + 5 -> 2x = 12. Despejamos dividiendo entre 2: x = 12 / 2 = 6.',
    difficulty: 'facil',
    hints: [
      'Pasa la x de la derecha a la izquierda restando: 3x - x = 2x.',
      'Pasa el -5 a la derecha sumando: 7 + 5 = 12.',
      'Divide 12 entre 2.'
    ]
  },
  {
    id: 'ch-mat-7',
    subjectId: 'matematicas',
    topicId: 'mat-7',
    topicName: 'Teorema de Pitágoras y Geometría Plana',
    question: 'Si en un triángulo rectángulo los catetos miden 6 cm y 8 cm, ¿cuánto mide su hipotenusa según el Teorema de Pitágoras?',
    options: ['10 cm', '14 cm', '12 cm', '48 cm'],
    correctIndex: 0,
    explanation: 'h² = 6² + 8² = 36 + 64 = 100. La raíz cuadrada de 100 es 10 cm.',
    difficulty: 'facil',
    hints: [
      'Aplica h² = c₁² + c₂².',
      '6² = 36 y 8² = 64. Su suma es 100.',
      'La raíz de 100 es 10.'
    ]
  },

  // ================= LENGUA CASTELLANA Y LITERATURA =================
  {
    id: 'ch-len-1',
    subjectId: 'lengua',
    topicId: 'len-1',
    topicName: 'Tipologías Textuales: Narración, Descripción y Exposición',
    question: '¿Cómo se llama la figura retórica descriptiva que detalla únicamente los rasgos físicos y la apariencia externa de una persona?',
    options: ['Prosopografía', 'Etopeya', 'Retrato', 'Topografía'],
    correctIndex: 0,
    explanation: 'La prosopografía describe el físico exterior. La etopeya describe el carácter moral o psicológico, y el retrato combina ambos.',
    difficulty: 'medio',
    hints: [
      'Empieza por "Proso-".',
      'Describe la cara, cuerpo, estatura y vestimenta.',
      'No incluye el carácter ni las virtudes morales.'
    ]
  },
  {
    id: 'ch-len-2',
    subjectId: 'lengua',
    topicId: 'len-2',
    topicName: 'Morfología: Clases de Palabras',
    question: 'En la frase: "Aquella chica sonrió tímidamente", ¿qué categoría gramatical tiene la palabra "tímidamente"?',
    options: ['Adverbio de modo', 'Adjetivo calificativo', 'Sustantivo común', 'Pronombre personal'],
    correctIndex: 0,
    explanation: '"Tímidamente" es un adverbio invariable formado con el sufijo -mente que complementa al verbo explicando cómo sonrió (modo).',
    difficulty: 'facil',
    hints: [
      'Responde a la pregunta: ¿cómo sonrió?',
      'Termina en el sufijo adverbial -mente.',
      'No tiene género ni número.'
    ]
  },
  {
    id: 'ch-len-3',
    subjectId: 'lengua',
    topicId: 'len-3',
    topicName: 'Sintaxis: La Oración Simple y sus Complementos',
    question: 'En la oración: "El profesor entregó las notas a los alumnos ayer en Cuenca", ¿qué función sintáctica desempeña "a los alumnos"?',
    options: ['Complemento Indirecto (CI)', 'Complemento Directo (CD)', 'Complemento Circunstancial', 'Atributo'],
    correctIndex: 0,
    explanation: '"A los alumnos" es el Complemento Indirecto porque designa al destinatario de la acción y se sustituye por "les": "El profesor les entregó las notas".',
    difficulty: 'medio',
    hints: [
      'Prueba a sustituirlo por el pronombre "les".',
      'El CD en esta oración es "las notas" ("las entregó").',
      'Los alumnos son los receptores de la acción.'
    ]
  },
  {
    id: 'ch-len-4',
    subjectId: 'lengua',
    topicId: 'len-4',
    topicName: 'Léxico, Ortografía y Semántica',
    question: '¿Por qué la palabra "difícil" lleva tilde según las reglas generales de acentuación del español?',
    options: ['Porque es una palabra llana terminada en consonante que no es n ni s', 'Porque es una palabra aguda terminada en l', 'Porque contiene un diptongo creciente', 'Porque es esdrújula'],
    correctIndex: 0,
    explanation: '"Di-fí-cil" tiene su sílaba tónica en la penúltima posición (llana) y termina en "l" (consonante distinta de -n o -s), por lo que obligatoriamente lleva tilde.',
    difficulty: 'facil',
    hints: [
      'Separa en sílabas: di-fí-cil. La fuerza va en "fí".',
      'Es penúltima sílaba = palabra llana.',
      'Termina en consonante "l", por eso se acentúa.'
    ]
  },
  {
    id: 'ch-len-5',
    subjectId: 'lengua',
    topicId: 'len-5',
    topicName: 'Géneros Literarios y Figuras Retóricas',
    question: '¿Qué figura retórica consiste en atribuir cualidades o acciones humanas a objetos inanimados o animales?',
    options: ['Personificación o Prosopopeya', 'Metáfora', 'Hipérbole', 'Aliteración'],
    correctIndex: 0,
    explanation: 'La personificación o prosopopeya da vida humana a lo inerte, como en: "El viento susurraba entre las rocas de la Ciudad Encantada de Cuenca".',
    difficulty: 'facil',
    hints: [
      'Proviene de dar rasgos de "persona".',
      'Ejemplo: "La luna sonreía en el cielo".',
      'También se le llama prosopopeya.'
    ]
  },

  // ================= FÍSICA Y QUÍMICA =================
  {
    id: 'ch-fq-1',
    subjectId: 'fisica-quimica',
    topicId: 'fq-1',
    topicName: 'El Método Científico y Magnitudes (SI)',
    question: 'En el Sistema Internacional de Unidades (SI), ¿cuál es la unidad oficial para medir la temperatura?',
    options: ['Kelvin (K)', 'Grados Celsius (ºC)', 'Grados Fahrenheit (ºF)', 'Caloría (cal)'],
    correctIndex: 0,
    explanation: 'En el SI la temperatura termodinámica se mide en Kelvin (K). El cero absoluto equivale a 0 K (-273,15 ºC).',
    difficulty: 'facil',
    hints: [
      'No lleva el símbolo de grado (º).',
      'Lleva el nombre de Lord Kelvin.',
      'Su símbolo es K mayúscula.'
    ]
  },
  {
    id: 'ch-fq-2',
    subjectId: 'fisica-quimica',
    topicId: 'fq-2',
    topicName: 'Estados de Agregación y Teoría Cinética',
    question: '¿Cómo se denomina el cambio de estado directo de gas a sólido sin pasar por el estado líquido?',
    options: ['Sublimación inversa o regresiva', 'Vaporización', 'Fusión', 'Condensación'],
    correctIndex: 0,
    explanation: 'El paso directo de gas a sólido se llama sublimación inversa, cristalización o deposición. El paso directo de sólido a gas es sublimación directa.',
    difficulty: 'medio',
    hints: [
      'Es lo contrario a la sublimación directa.',
      'Ocurre cuando el vapor de agua en el aire se transforma directamente en escarcha.',
      'Incluye el término "sublimación inversa".'
    ]
  },
  {
    id: 'ch-fq-3',
    subjectId: 'fisica-quimica',
    topicId: 'fq-3',
    topicName: 'Sustancias Puras, Mezclas y Disoluciones',
    question: 'Si disolvemos 15 g de sal en agua hasta obtener 250 mL de disolución, ¿cuál es la concentración en masa expresada en g/L?',
    options: ['60 g/L', '0,06 g/L', '37,5 g/L', '15 g/L'],
    correctIndex: 0,
    explanation: 'Convertimos 250 mL a litros: 250 mL = 0,25 L. Concentración = masa / volumen = 15 g / 0,25 L = 60 g/L.',
    difficulty: 'medio',
    hints: [
      'Convierte primero el volumen a litros: 250 mL = 0,25 L.',
      'Aplica C = masa de soluto / volumen de disolución.',
      '15 dividido entre 0,25 equivale a 15 multiplicado por 4 = 60.'
    ]
  },
  {
    id: 'ch-fq-4',
    subjectId: 'fisica-quimica',
    topicId: 'fq-4',
    topicName: 'Estructura Atómica y Tabla Periódica',
    question: 'Si un átomo neutro tiene Z = 17 (número atómico) y A = 35 (número másico), ¿cuántos protones, electrones y neutrones tiene?',
    options: ['17 protones, 17 electrones y 18 neutrones', '17 protones, 18 electrones y 35 neutrones', '35 protones, 17 electrones y 18 neutrones', '18 protones, 18 electrones y 17 neutrones'],
    correctIndex: 0,
    explanation: 'Z = 17 indica 17 protones. Al ser neutro, tiene también 17 electrones. Los neutrones son N = A - Z = 35 - 17 = 18 neutrones (se trata del cloro, Cl).',
    difficulty: 'medio',
    hints: [
      'Z es el número de protones (17). En un átomo neutro hay igual número de electrones.',
      'Los neutrones se calculan restando: N = A - Z.',
      '35 - 17 = 18.'
    ]
  },

  // ================= INGLÉS =================
  {
    id: 'ch-ing-1',
    subjectId: 'ingles',
    topicId: 'ing-1',
    topicName: 'Present Simple vs Present Continuous',
    question: 'Choose the correct sentence: "She _______ tennis on Saturdays, but today she _______ her room."',
    options: [
      'plays / is tidying',
      'is playing / tidies',
      'play / tidying',
      'plays / tidies'
    ],
    correctIndex: 0,
    explanation: '"On Saturdays" expresses a habit (Present Simple: plays), while "today" indicates a temporary action happening now (Present Continuous: is tidying).',
    difficulty: 'medio',
    hints: [
      'Habits on regular days use Present Simple with -s for 3rd person singular.',
      '"Today" or "at the moment" triggers Present Continuous.',
      'Formula: plays / is tidying.'
    ]
  },
  {
    id: 'ch-ing-2',
    subjectId: 'ingles',
    topicId: 'ing-2',
    topicName: 'Past Simple vs Past Continuous',
    question: 'Complete the sentence: "While I _______ my homework, my phone _______."',
    options: [
      'was doing / rang',
      'did / was ringing',
      'was doing / was ringing',
      'did / rang'
    ],
    correctIndex: 0,
    explanation: 'We use Past Continuous ("was doing") for the continuous activity, and Past Simple ("rang") for the short interruption.',
    difficulty: 'medio',
    hints: [
      '"While" introduces the continuous background action.',
      'The ringing phone is a sudden completed action.',
      'Use was/were + -ing for the continuous verb.'
    ]
  },
  {
    id: 'ch-ing-5',
    subjectId: 'ingles',
    topicId: 'ing-5',
    topicName: 'Modal Verbs: Can, Could, Must, Should, Have to',
    question: 'Which modal verb expresses strong prohibition (something not allowed)?',
    options: ['Mustn\'t', 'Don\'t have to', 'Shouldn\'t', 'Might not'],
    correctIndex: 0,
    explanation: '"Mustn\'t" expresses strict prohibition (you are forbidden to do it), whereas "don\'t have to" expresses lack of necessity (optional).',
    difficulty: 'facil',
    hints: [
      'Think of school rules or road traffic laws.',
      'Don\'t confuse prohibition with lack of necessity.',
      'Mustn\'t means it is against the rules.'
    ]
  },
  {
    id: 'ch-ing-6',
    subjectId: 'ingles',
    topicId: 'ing-6',
    topicName: 'Comparatives, Superlatives and First Conditional',
    question: 'Complete the First Conditional sentence: "If you _______ hard, you _______ your exams at IES San José."',
    options: [
      'study / will pass',
      'will study / pass',
      'studies / will pass',
      'study / pass'
    ],
    correctIndex: 0,
    explanation: 'First Conditional rule: If + Present Simple (study), will + infinitive (will pass). "Will" is never used in the "if" clause.',
    difficulty: 'medio',
    hints: [
      'Never put "will" directly after "if".',
      'The "if" clause takes Present Simple: study.',
      'The main clause takes will + base form.'
    ]
  }
];

