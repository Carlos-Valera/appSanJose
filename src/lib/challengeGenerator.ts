import { Challenge, SubjectId } from '../types';

// Large dynamic pool of curricular questions for 2º ESO LOMLOE (Castilla-La Mancha)
export const CURRICULUM_CHALLENGE_BANK: Record<SubjectId, Challenge[]> = {
  'geografia-historia': [
    {
      id: 'gh-bank-1',
      subjectId: 'geografia-historia',
      topicId: 'gh-1',
      topicName: 'La Caída del Imperio Romano, Bizancio y el Islam',
      question: '¿Qué gran emperador bizantino recopiló el Derecho Romano en el "Corpus Iuris Civilis" y mandó construir la majestuosa basílica de Santa Sofía en Constantinopla?',
      options: ['Justiniano I', 'Constantino el Grande', 'Teodosio I', 'Heraclio'],
      correctIndex: 0,
      explanation: 'El emperador Justiniano I (siglo VI) llevó al Imperio Bizantino a su máximo esplendor territorial y legislativo con el Corpus Iuris Civilis y la basílica de Santa Sofía.',
      difficulty: 'facil',
      hints: [
        'Gobernó en el siglo VI junto a su influyente esposa, la emperatriz Teodora.',
        'Intentó recuperar los territorios del antiguo Imperio Romano de Occidente.',
        'Su nombre empieza por Just-.'
      ]
    },
    {
      id: 'gh-bank-2',
      subjectId: 'geografia-historia',
      topicId: 'gh-1',
      topicName: 'La Caída del Imperio Romano, Bizancio y el Islam',
      question: '¿En qué año tuvo lugar la Hégira (huida del profeta Mahoma desde La Meca a Medina), acontecimiento que marca el inicio del calendario musulmán?',
      options: ['622 d.C.', '711 d.C.', '476 d.C.', '800 d.C.'],
      correctIndex: 0,
      explanation: 'La Hégira ocurrió en el año 622 d.C., momento fundacional en que la comunidad islámica se organiza en Medina y comienza el cómputo del calendario musulmán.',
      difficulty: 'medio',
      hints: [
        'Es a principios del siglo VII.',
        'No lo confundas con el 711 (llegada musulmana a la Península Ibérica).',
        'El año termina en 22.'
      ]
    },
    {
      id: 'gh-bank-3',
      subjectId: 'geografia-historia',
      topicId: 'gh-2',
      topicName: 'Al-Ándalus y la Historia Medieval de la Península',
      question: '¿Qué líder omeya proclamó el Califato de Córdoba en el año 929, asumiendo tanto el poder político como el liderazgo religioso supremo?',
      options: ['Abderramán III', 'Abderramán I', 'Al-Hakam II', 'Almanzor'],
      correctIndex: 0,
      explanation: 'Abderramán III se autoproclamó califa en el 929 para independizarse del califato fatimí del norte de África y consolidar el periodo de mayor esplendor de Al-Ándalus.',
      difficulty: 'medio',
      hints: [
        'Fue el primer califa de Córdoba (los anteriores gobernantes eran emires).',
        'Mandó construir la lujosa ciudad palatina de Medina Azahara.',
        'Lleva el numeral III.'
      ]
    },
    {
      id: 'gh-bank-4',
      subjectId: 'geografia-historia',
      topicId: 'gh-2',
      topicName: 'Al-Ándalus y la Historia Medieval de la Península',
      question: 'Tras la disgregación del Califato de Córdoba en 1031, Al-Ándalus quedó dividida en numerosos pequeños reinos independientes conocidos como:',
      options: ['Reinos de Taifas', 'Marcas hispánicas', 'Emiratos dependientes', 'Señoríos feudales'],
      correctIndex: 0,
      explanation: 'Las Taifas fueron pequeños reinos fragmentados militarmente débiles que debieron pagar tributos (parias) a los reyes cristianos para evitar ser conquistados.',
      difficulty: 'facil',
      hints: [
        'La palabra en árabe significa "bandería" o "facción".',
        'Eran reinos pequeños como los de Toledo, Zaragoza, Sevilla o Badajoz.',
        'Empieza por la letra T.'
      ]
    },
    {
      id: 'gh-bank-5',
      subjectId: 'geografia-historia',
      topicId: 'gh-3',
      topicName: 'Los Reinos Cristianos y la Reconquista (Castilla y Cuenca)',
      question: '¿Qué célebre código de leyes medievales otorgó Alfonso VIII a la ciudad de Cuenca tras su conquista en 1177, que sirvió de modelo para muchas otras villas de Castilla?',
      options: ['El Fuero de Cuenca', 'Las Siete Partidas', 'La Carta Puebla de Toledo', 'El Ordenamiento de Alcalá'],
      correctIndex: 0,
      explanation: 'El Fuero de Cuenca (1177) fue uno de los textos jurídicos de frontera más prestigiosos e imitados de la Edad Media castellana, otorgando privilegios y libertades para atraer repobladores.',
      difficulty: 'facil',
      hints: [
        'Lleva el propio nombre de la ciudad conquistada.',
        'Es un "Fuero" municipal otorgado a los vecinos repobladores.',
        'Se conserva en el archivo municipal de Cuenca.'
      ]
    },
    {
      id: 'gh-bank-6',
      subjectId: 'geografia-historia',
      topicId: 'gh-3',
      topicName: 'Los Reinos Cristianos y la Reconquista (Castilla y Cuenca)',
      question: '¿Qué trascendental batalla tuvo lugar en el año 1212 en Sierra Morena, en la que una coalición de reyes cristianos liderada por Alfonso VIII derrotó decisivamente a los almohades?',
      options: ['Batalla de Las Navas de Tolosa', 'Batalla de Alarcos', 'Batalla de Covadonga', 'Batalla de Simancas'],
      correctIndex: 0,
      explanation: 'La victoria de Las Navas de Tolosa (1212) abrió las puertas del valle del Guadalquivir a los reinos cristianos y supuso el declive irreversible del poder almohade en la Península.',
      difficulty: 'medio',
      hints: [
        'Tuvo lugar en el paso montañoso de Despeñaperros.',
        'Vengó la anterior derrota castellana de Alarcos (1195).',
        'Las Navas de...'
      ]
    },
    {
      id: 'gh-bank-7',
      subjectId: 'geografia-historia',
      topicId: 'gh-4',
      topicName: 'El Feudalismo Europeo y el Arte Románico y Gótico',
      question: 'En la arquitectura medieval, ¿cuál de los siguientes elementos es característico del estilo Gótico y lo diferencia del Románico?',
      options: [
        'Arco apuntado (ojival) y grandes vidrieras luminosas',
        'Muros muy gruesos con pequeñas ventanas abocinadas',
        'Arco de medio punto y bóveda de cañón pesada',
        'Ausencia de contrafuertes y arbotantes exteriores'
      ],
      correctIndex: 0,
      explanation: 'El estilo Gótico (siglos XII-XV) se caracteriza por elevar la altura de las catedrales gracias al arco apuntado, la bóveda de crucería y los arbotantes, abriendo grandes muros de vidrieras policromadas.',
      difficulty: 'facil',
      hints: [
        'El Gótico buscaba la luz divina y la gran altura vertical.',
        'El arco románico era redondo (medio punto); el gótico termina en punta.',
        'Fíjate en las opciones que mencionan luz y arcos apuntados.'
      ]
    },
    {
      id: 'gh-bank-8',
      subjectId: 'geografia-historia',
      topicId: 'gh-5',
      topicName: 'El Renacimiento, el Humanismo y los Reyes Católicos',
      question: 'El año 1492 es clave en la Historia Moderna de España por tres acontecimientos fundamentales. ¿Cuál de estos NO ocurrió en 1492?',
      options: [
        'La publicación de la Constitución de Cádiz',
        'La rendición de Granada y fin del reino nazarí',
        'La llegada de Cristóbal Colón a América',
        'La expulsión de los judíos de los reinos hispánicos'
      ],
      correctIndex: 0,
      explanation: 'La Constitución de Cádiz ("La Pepa") fue promulgada mucho más tarde, en 1812. En 1492 se conquistó Granada, zarpó Colón a América y se decretó la expulsión judía.',
      difficulty: 'facil',
      hints: [
        'La opción incorrecta pertenece al siglo XIX contemporáneo.',
        'Granada y América fueron sin duda en 1492.',
        'Busca la opción que habla de una constitución moderna.'
      ]
    },
    {
      id: 'gh-bank-9',
      subjectId: 'geografia-historia',
      topicId: 'gh-6',
      topicName: 'Población y Espacios Urbanos en España y el Mundo',
      question: '¿Cómo se calcula el Crecimiento Natural o Vegetativo de una población en demografía?',
      options: [
        'Número de Nacimientos menos Número de Defunciones',
        'Número de Inmigrantes menos Número de Emigrantes',
        'Población Total multiplicada por la Tasa de Fecundidad',
        'Densidad de población dividida entre la superficie en km²'
      ],
      correctIndex: 0,
      explanation: 'El Crecimiento Natural mide la diferencia entre los nacidos vivos y las personas fallecidas en un lugar durante un periodo determinado (Nacimientos - Defunciones).',
      difficulty: 'medio',
      hints: [
        'La palabra "natural" se refiere a los procesos biológicos (nacer y morir).',
        'No incluye los movimientos migratorios (que forman el saldo migratorio).',
        'Resta nacimientos y defunciones.'
      ]
    }
  ],
  'matematicas': [
    {
      id: 'mat-bank-1',
      subjectId: 'matematicas',
      topicId: 'mat-1',
      topicName: 'Números Enteros y Operaciones Combinadas',
      question: '¿Cuál es el resultado de la operación con enteros: 5 - 2 · [(-3) + 7 : (-7)]?',
      options: ['13', '-3', '5', '9'],
      correctIndex: 0,
      explanation: 'Resolvemos primero dentro del corchete: 7 : (-7) = -1. Corchete: -3 + (-1) = -4. Luego: 5 - 2 · (-4) = 5 - (-8) = 5 + 8 = 13.',
      difficulty: 'medio',
      hints: [
        'Empieza por las operaciones del interior del corchete.',
        '7 dividido entre -7 da -1.',
        'Multiplica -2 por el resultado del corchete respetando los signos.'
      ]
    },
    {
      id: 'mat-bank-2',
      subjectId: 'matematicas',
      topicId: 'mat-2',
      topicName: 'Fracciones y Decimales',
      question: 'Al simplificar la fracción 84 / 126 dividiendo numerador y denominador entre su máximo común divisor, ¿qué fracción irreducible se obtiene?',
      options: ['2 / 3', '4 / 6', '3 / 4', '7 / 9'],
      correctIndex: 0,
      explanation: 'El MCD de 84 y 126 es 42. Dividiendo: 84 : 42 = 2, y 126 : 42 = 3. La fracción irreducible es 2/3.',
      difficulty: 'facil',
      hints: [
        'Puedes dividir sucesivamente entre factores primos comunes (2, 3, 7).',
        '84 : 2 = 42; 126 : 2 = 63. Ahora divide entre 3...',
        'Al final te quedará una fracción con numerador 2.'
      ]
    },
    {
      id: 'mat-bank-3',
      subjectId: 'matematicas',
      topicId: 'mat-3',
      topicName: 'Potencias, Raíces y Notación Científica',
      question: 'Aplicando las propiedades de las potencias, ¿cuál es el valor simplificado de (2³ · 2⁴) : 2⁵?',
      options: ['4 (es decir, 2²)', '8 (es decir, 2³)', '2 (es decir, 2¹)', '16 (es decir, 2⁴)'],
      correctIndex: 0,
      explanation: 'En el producto de potencias con misma base se suman exponentes: 2³ · 2⁴ = 2⁷. En la división se restan: 2⁷ : 2⁵ = 2² = 4.',
      difficulty: 'facil',
      hints: [
        'Misma base en producto: suma exponentes (3 + 4).',
        'Misma base en división: resta exponentes (7 - 5).',
        'Calcula 2 elevado al cuadrado.'
      ]
    },
    {
      id: 'mat-bank-4',
      subjectId: 'matematicas',
      topicId: 'mat-4',
      topicName: 'Proporcionalidad y Porcentajes',
      question: 'Un abrigo cuesta 80 € en una tienda de Cuenca. Si le aplican un descuento del 15% por rebajas, ¿cuánto pagaremos finalmente por él?',
      options: ['68 €', '65 €', '70 €', '72 €'],
      correctIndex: 0,
      explanation: 'Calculamos el 15% de 80: (15 · 80) / 100 = 12 € de descuento. Precio final = 80 - 12 = 68 € (o multiplicando 80 · 0,85 = 68 €).',
      difficulty: 'facil',
      hints: [
        'Calcula primero el 10% (8 €) y la mitad de eso para el 5% (4 €).',
        'Suma 8 + 4 = 12 € de descuento.',
        'Resta el descuento al precio original de 80 €.'
      ]
    },
    {
      id: 'mat-bank-5',
      subjectId: 'matematicas',
      topicId: 'mat-5',
      topicName: 'Álgebra Básica y Monomios',
      question: '¿Cuál es el grado y el coeficiente principal del monomio: -7x²y³?',
      options: ['Grado 5 y coeficiente -7', 'Grado 2 y coeficiente 7', 'Grado 6 y coeficiente -7', 'Grado 3 y coeficiente -7'],
      correctIndex: 0,
      explanation: 'El coeficiente es la parte numérica (-7). El grado de un monomio es la suma de los exponentes de sus variables: 2 + 3 = 5.',
      difficulty: 'medio',
      hints: [
        'El coeficiente es el número que multiplica a las letras con su signo.',
        'El grado de un monomio con varias letras se halla sumando los exponentes.',
        'Suma 2 + 3 para el grado.'
      ]
    },
    {
      id: 'mat-bank-6',
      subjectId: 'matematicas',
      topicId: 'mat-6',
      topicName: 'Ecuaciones de 1º y 2º Grado',
      question: 'Resuelve la ecuación lineal: 3(x - 2) + 4 = 2x + 5. ¿Cuál es el valor de x?',
      options: ['x = 7', 'x = 3', 'x = 5', 'x = -1'],
      correctIndex: 0,
      explanation: 'Quitamos paréntesis: 3x - 6 + 4 = 2x + 5 -> 3x - 2 = 2x + 5. Pasamos términos con x a la izquierda: 3x - 2x = 5 + 2 -> x = 7.',
      difficulty: 'medio',
      hints: [
        'Aplica la propiedad distributiva: 3 · x y 3 · (-2).',
        'Agrupa términos numéricos en el miembro izquierdo.',
        'Despeja x pasando 2x restando y los números al otro lado.'
      ]
    },
    {
      id: 'mat-bank-7',
      subjectId: 'matematicas',
      topicId: 'mat-8',
      topicName: 'Cuerpos Geométricos y Volúmenes',
      question: '¿Cuál es el volumen de un prisma recto de base cuadrada si el lado de la base mide 4 cm y su altura mide 10 cm?',
      options: ['160 cm³', '40 cm³', '80 cm³', '320 cm³'],
      correctIndex: 0,
      explanation: 'El área de la base cuadrada es lado² = 4² = 16 cm². El volumen de un prisma es V = Área base · altura = 16 cm² · 10 cm = 160 cm³.',
      difficulty: 'medio',
      hints: [
        'Halla primero el área de la base: 4 cm por 4 cm.',
        'Multiplica esa área por la altura del prisma (10 cm).',
        '16 multiplicado por 10.'
      ]
    }
  ],
  'lengua': [
    {
      id: 'len-bank-1',
      subjectId: 'lengua',
      topicId: 'len-2',
      topicName: 'Morfología: Clases de Palabras',
      question: 'En la frase: "Aquellos chicos llegaron demasiado tarde", ¿qué categoría gramatical tiene la palabra "demasiado"?',
      options: ['Adverbio de cantidad', 'Determinante indefinido', 'Adjetivo calificativo', 'Pronombre'],
      correctIndex: 0,
      explanation: '"Demasiado" modifica al adverbio "tarde", por lo que es una palabra invariable con función de adverbio de cantidad (no concuerda en género ni número).',
      difficulty: 'medio',
      hints: [
        'Fíjate en si la palabra puede cambiar de género o número (¿puedes decir "demasiados tarde"? No).',
        'Al ser invariable y modificar a otro adverbio ("tarde"), es un adverbio.',
        'Indica cantidad o grado.'
      ]
    },
    {
      id: 'len-bank-2',
      subjectId: 'lengua',
      topicId: 'len-3',
      topicName: 'Sintaxis: La Oración Simple y sus Complementos',
      question: 'En la oración: "Marina parece muy cansada hoy", ¿qué función sintáctica realiza "muy cansada"?',
      options: ['Atributo', 'Complemento Directo', 'Complemento Predicativo', 'Complemento Circunstancial de Modo'],
      correctIndex: 0,
      explanation: 'El verbo "parece" es copulativo (ser, estar, parecer). El sintagma adjetival "muy cansada" expresa una cualidad del sujeto y es sustituible por "lo": "Marina lo parece". Por tanto, es Atributo.',
      difficulty: 'facil',
      hints: [
        'Fíjate en el verbo: ¿es un verbo copulativo (ser, estar, parecer)?',
        'Prueba a sustituirlo por el pronombre neutro "lo".',
        'Los complementos con verbos copulativos son Atributos.'
      ]
    },
    {
      id: 'len-bank-3',
      subjectId: 'lengua',
      topicId: 'len-3',
      topicName: 'Sintaxis: La Oración Simple y sus Complementos',
      question: '¿En cuál de las siguientes oraciones el pronombre "la" funciona como Complemento Directo (CD)?',
      options: [
        'Ayer la vi en la Plaza Mayor de Cuenca',
        'La dije que viniera pronto a clase',
        'A María la gusta mucho la lectura',
        'La dio un abrazo a su abuela'
      ],
      correctIndex: 0,
      explanation: 'En "Ayer la vi", "la" sustituye a una persona femenina objeto directo ("vi a Carmen" -> "la vi"). Las otras opciones contienen casos incorrectos de laísmo (usar "la" por "le" de CI).',
      difficulty: 'medio',
      hints: [
        'Cuidado con el laísmo común en Castilla: el CD femenino correcto es "la", pero el CI debe ser "le".',
        'En "Ayer la vi", el verbo "ver" exige CD (ver a alguien).',
        'Las otras opciones son laísmos incorrectos.'
      ]
    },
    {
      id: 'len-bank-4',
      subjectId: 'lengua',
      topicId: 'len-4',
      topicName: 'Léxico, Ortografía y Semántica',
      question: '¿Por qué la palabra "fácilmente" lleva tilde según las reglas ortográficas de la RAE para palabras compuestas?',
      options: [
        'Porque los adverbios en -mente conservan la tilde del adjetivo base ("fácil")',
        'Porque es una palabra esdrújula terminada en vocal',
        'Porque lleva tilde diacrítica obligatoria',
        'Porque forma un hiato entre vocal abierta y cerrada'
      ],
      correctIndex: 0,
      explanation: 'Los adverbios formados con el sufijo -mente mantienen la tilde si el adjetivo del que proceden ya la llevaba de forma independiente ("fácil" es llana terminada en L, por lo que lleva tilde).',
      difficulty: 'medio',
      hints: [
        'Piensa en cómo se acentúa el adjetivo original sin el -mente: "¿fácil lleva tilde?"',
        'Los adverbios en -mente tienen una regla especial de acentuación doble.',
        'Mantienen la tilde del adjetivo original.'
      ]
    },
    {
      id: 'len-bank-5',
      subjectId: 'lengua',
      topicId: 'len-5',
      topicName: 'Géneros Literarios y Figuras Retóricas',
      question: '¿Qué figura retórica consiste en atribuir cualidades o acciones humanas a seres inanimados o animales (por ejemplo: "El viento aullaba en la noche de Cuenca")?',
      options: ['Personificación (o prosopopeya)', 'Metáfora', 'Hipérbole', 'Aliteración'],
      correctIndex: 0,
      explanation: 'La personificación o prosopopeya consiste en atribuir propiedades humanas (hablar, llorar, aullar) a objetos inanimados, conceptos o elementos naturales.',
      difficulty: 'facil',
      hints: [
        'La palabra contiene la raíz de "persona".',
        'Convierte algo sin vida en un ser que actúa como persona.',
        'Personific...'
      ]
    }
  ],
  'fisica-quimica': [
    {
      id: 'fq-bank-1',
      subjectId: 'fisica-quimica',
      topicId: 'fq-1',
      topicName: 'El Método Científico y Magnitudes (SI)',
      question: '¿Cuáles son las unidades fundamentales para la longitud, la masa y el tiempo en el Sistema Internacional (SI)?',
      options: ['Metro (m), Kilogramo (kg) y Segundo (s)', 'Centímetro (cm), Gramo (g) y Segundo (s)', 'Kilómetro (km), Tonelada (t) y Hora (h)', 'Metro (m), Gramo (g) y Minuto (min)'],
      correctIndex: 0,
      explanation: 'En el SI las unidades base son: metro (m) para la longitud, kilogramo (kg) para la masa y segundo (s) para el tiempo.',
      difficulty: 'facil',
      hints: [
        'Cuidado: la unidad de masa no es el gramo, sino el kilogramo.',
        'La unidad de tiempo es el segundo, no el minuto ni la hora.',
        'Metro, kilogramo y segundo (MKS).'
      ]
    },
    {
      id: 'fq-bank-2',
      subjectId: 'fisica-quimica',
      topicId: 'fq-2',
      topicName: 'Estados de Agregación y Teoría Cinética',
      question: '¿Cómo se denomina el cambio directo del estado sólido al estado gaseoso sin pasar previamente por el estado líquido?',
      options: ['Sublimación', 'Vaporización', 'Fusión', 'Condensación'],
      correctIndex: 0,
      explanation: 'La sublimación es el paso directo de sólido a gas sin fundirse en líquido (ejemplo clásico: el yodo sólido o la naftalina al calentarse).',
      difficulty: 'medio',
      hints: [
        'No pasa por el estado líquido.',
        'Ocurre por ejemplo con el hielo seco (CO2 sólido).',
        'Empieza por Sub-.'
      ]
    },
    {
      id: 'fq-bank-3',
      subjectId: 'fisica-quimica',
      topicId: 'fq-4',
      topicName: 'El Átomo y la Tabla Periódica Básica',
      question: 'Si un átomo neutro tiene un número atómico Z = 11 y un número másico A = 23, ¿cuántos neutrones tiene en su núcleo?',
      options: ['12 neutrones', '11 neutrones', '23 neutrones', '34 neutrones'],
      correctIndex: 0,
      explanation: 'El número de neutrones se calcula restando el número másico menos el número atómico: Neutrones = A - Z = 23 - 11 = 12 neutrones.',
      difficulty: 'facil',
      hints: [
        'Recuerda la fórmula: A (másico) = protones (Z) + neutrones.',
        'Despeja: Neutrones = A - Z.',
        'Resta 23 menos 11.'
      ]
    },
    {
      id: 'fq-bank-4',
      subjectId: 'fisica-quimica',
      topicId: 'fq-5',
      topicName: 'Movimiento, Velocidad y Fuerzas Cotidianas',
      question: 'Un autobús viaja a una velocidad constante de 72 km/h por la carretera de Cuenca. ¿A cuántos metros por segundo (m/s) equivale dicha velocidad?',
      options: ['20 m/s', '72 m/s', '25,9 m/s', '15 m/s'],
      correctIndex: 0,
      explanation: 'Para pasar de km/h a m/s dividimos entre 3,6 (o multiplicamos por 1000 m y dividimos entre 3600 s): 72 : 3,6 = 20 m/s.',
      difficulty: 'medio',
      hints: [
        'El factor de conversión directo entre km/h y m/s es dividir entre 3,6.',
        '72 dividido entre 3,6 da un número redondo.',
        'Calcula: 72 / 3,6.'
      ]
    },
    {
      id: 'fq-bank-5',
      subjectId: 'fisica-quimica',
      topicId: 'fq-6',
      topicName: 'Energía, Trabajo, Calor y Temperatura',
      question: '¿Qué principio fundamental de la física establece que "la energía ni se crea ni se destruye, solo se transforma"?',
      options: ['Principio de Conservación de la Energía', 'Ley de la Gravitación Universal', 'Tercera Ley de Newton', 'Principio de Arquímedes'],
      correctIndex: 0,
      explanation: 'El Principio de Conservación de la Energía indica que la cantidad total de energía en un sistema aislado permanece invariable con el tiempo, transformándose entre distintas formas.',
      difficulty: 'facil',
      hints: [
        'Habla de conservar la cantidad de energía.',
        'Es uno de los principios más universales de la ciencia.',
        'Principio de Conservación...'
      ]
    }
  ],
  'ingles': [
    {
      id: 'ing-bank-1',
      subjectId: 'ingles',
      topicId: 'ing-1',
      topicName: 'Present Simple vs Present Continuous',
      question: 'Complete the sentence with the correct verb form: "Listen! The baby _______ in the bedroom right now."',
      options: ['is crying', 'cries', 'cry', 'are crying'],
      correctIndex: 0,
      explanation: 'We use the Present Continuous ("is crying") because "Listen!" and "right now" show that the action is happening at the exact moment of speaking.',
      difficulty: 'facil',
      hints: [
        'Look at the clue "right now" — it means at this moment.',
        'The subject is "The baby" (singular third person: he/she).',
        'Use is + verb-ing.'
      ]
    },
    {
      id: 'ing-bank-2',
      subjectId: 'ingles',
      topicId: 'ing-3',
      topicName: 'Present Perfect Simple with Just, Already, Yet',
      question: 'Choose the correct word to finish the sentence: "I haven\'t finished my homework _______."',
      options: ['yet', 'already', 'just', 'ever'],
      correctIndex: 0,
      explanation: 'We use "yet" at the end of negative sentences and questions in the Present Perfect to indicate that an expected action hasn\'t happened up to now.',
      difficulty: 'medio',
      hints: [
        'Notice that the sentence is negative ("haven\'t finished").',
        'It is at the very end of the clause.',
        'We use "yet" with negative sentences and questions.'
      ]
    },
    {
      id: 'ing-bank-3',
      subjectId: 'ingles',
      topicId: 'ing-4',
      topicName: 'Future Forms: Will vs Be Going To',
      question: 'Which sentence correctly expresses a planned intention made before speaking?',
      options: [
        'I am going to visit my grandparents in Cuenca this weekend.',
        'I will visit my grandparents right this second.',
        'I am visit my grandparents soon.',
        'I will to visit my grandparents next week.'
      ],
      correctIndex: 0,
      explanation: 'We use "be going to" for intentions and plans already decided before the moment of speaking.',
      difficulty: 'medio',
      hints: [
        'Look for the structure: am/is/are going to + base verb.',
        'It is a pre-planned decision for the weekend.',
        'Option A uses "am going to visit".'
      ]
    },
    {
      id: 'ing-bank-4',
      subjectId: 'ingles',
      topicId: 'ing-5',
      topicName: 'Modal Verbs: Can, Could, Must, Should, Have to',
      question: 'Which modal verb expresses strong obligation from rules or authority (e.g. at school)?',
      options: ['must', 'might', 'could', 'should'],
      correctIndex: 0,
      explanation: '"Must" (and "have to") express obligation, necessity, or school rules ("You must arrive on time").',
      difficulty: 'facil',
      hints: [
        'It means duty or strict rule (obligación).',
        'Should is for advice, but for rules we use...',
        'Must.'
      ]
    },
    {
      id: 'ing-bank-5',
      subjectId: 'ingles',
      topicId: 'ing-6',
      topicName: 'Comparatives, Superlatives and First Conditional',
      question: 'Complete the First Conditional sentence: "If it _______ tomorrow, we _______ to the park."',
      options: [
        'rains / won\'t go',
        'will rain / don\'t go',
        'rained / wouldn\'t go',
        'rain / won\'t to go'
      ],
      correctIndex: 0,
      explanation: 'The First Conditional pattern is: If + Present Simple (it rains), will / won\'t + base verb (we won\'t go).',
      difficulty: 'medio',
      hints: [
        'In the "if" clause, use Present Simple (remember third person -s with "it").',
        'In the main clause, use will or won\'t + verb.',
        'If it rains, we won\'t go.'
      ]
    }
  ]
};

// Function to generate a dynamic challenge on the client if backend API is not available
export function generateLocalChallenge(subjectId: SubjectId, topicName?: string): Challenge {
  const pool = CURRICULUM_CHALLENGE_BANK[subjectId] || [];
  
  // Try to find one matching the topic or pick a random one
  let candidates = pool;
  if (topicName && topicName.trim()) {
    const matching = pool.filter(c => c.topicName.toLowerCase().includes(topicName.toLowerCase()));
    if (matching.length > 0) candidates = matching;
  }
  
  const picked = candidates[Math.floor(Math.random() * candidates.length)] || pool[0];
  
  // Clone with a unique timestamp ID so it appears as freshly generated
  return {
    ...picked,
    id: `ch-gen-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  };
}
