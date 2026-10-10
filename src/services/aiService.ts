import { Challenge, ChatMessage, SubjectId } from '../types';
import { SUBJECTS } from '../data/curriculum';
import { storage } from '../lib/storage';

// Dynamic Curricular Challenge Generator for 2º ESO LOMLOE (Castilla-La Mancha)
// Used when server endpoint is unavailable (e.g. static hosting on Vercel) or as instant intelligent generator
interface CurricularQuestionTemplate {
  subjectId: SubjectId;
  topicId: string;
  topicName: string;
  generator: () => {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    hints: string[];
  };
}

const TEMPLATE_GENERATORS: CurricularQuestionTemplate[] = [
  // --- GEOGRAFÍA E HISTORIA ---
  {
    subjectId: 'geografia-historia',
    topicId: 'gh-1',
    topicName: 'La Caída del Imperio Romano, Bizancio y el Islam',
    generator: () => {
      const items = [
        {
          q: '¿En qué año se produjo la Hégira, acontecimiento fundacional del calendario musulmán que marca la huida de Mahoma de La Meca a Medina?',
          opts: ['En el año 622 d.C.', 'En el año 476 d.C.', 'En el año 711 d.C.', 'En el año 800 d.C.'],
          c: 0,
          exp: 'La Hégira tuvo lugar en el año 622 d.C., cuando el profeta Mahoma huyó de La Meca a Medina. Es el año cero del calendario islámico.',
          hints: ['Es en el siglo VII d.C.', 'Ocurrió casi un siglo antes de la llegada de los musulmanes a la Península Ibérica en 711.', 'El número de año capicúa parcial es 622.']
        },
        {
          q: '¿Qué gran emperador bizantino del siglo VI mandó construir la imponente basílica de Santa Sofía y recopiló el Derecho romano en el "Corpus Iuris Civilis"?',
          opts: ['Justiniano I', 'Constantino el Grande', 'Carlomagno', 'Teodosio I'],
          c: 0,
          exp: 'Justiniano I (527-565) lideró el mayor esplendor del Imperio Bizantino, reconquistó partes del Mediterráneo y mandó erigir Santa Sofía de Constantinopla.',
          hints: ['Su nombre empieza por J y reinó en el siglo VI en Constantinopla.', 'Estaba casado con la influyente emperatriz Teodora.', 'Es célebre por su código de leyes civiles romanas.']
        },
        {
          q: '¿Cuál de los siguientes NO es uno de los cinco pilares fundamentales del Islam?',
          opts: ['La peregrinación obligatoria a Roma', 'La profesión de fe (Shahada)', 'La oración cinco veces al día (Salat)', 'El ayuno en el mes de Ramadán (Sawm)'],
          c: 0,
          exp: 'Los cinco pilares del Islam son la profesión de fe, la oración diaria, la limosna (Zakat), el ayuno en Ramadán y la peregrinación a La Meca (no a Roma).',
          hints: ['Roma es el centro del cristianismo católico, no del Islam.', 'La ciudad sagrada musulmana hacia la que se peregrina es La Meca.', 'Revisa las ciudades sagradas del mundo islámico medieval.']
        }
      ];
      const selected = items[Math.floor(Math.random() * items.length)];
      return {
        question: selected.q,
        options: selected.opts,
        correctIndex: selected.c,
        explanation: selected.exp,
        hints: selected.hints
      };
    }
  },
  {
    subjectId: 'geografia-historia',
    topicId: 'gh-2',
    topicName: 'Al-Ándalus y la Historia Medieval de la Península',
    generator: () => {
      const items = [
        {
          q: '¿Quién se proclamó primer Califa de Córdoba en el año 929, rompiendo toda dependencia religiosa con Bagdad y llevando a Al-Ándalus a su época dorada?',
          opts: ['Abderramán III', 'Abderramán I', 'Al-Hakam II', 'Almanzor'],
          c: 0,
          exp: 'Abderramán III se autoproclamó califa en 929, fundando el Califato de Córdoba y asumiendo el poder político y espiritual absoluto en Al-Ándalus.',
          hints: ['El primer emir independiente fue Abderramán I (756), pero el Califato lo fundó su descendiente.', 'Tiene el numeral romano III.', 'Mandó construir la lujosa ciudad palatina de Medina Azahara.']
        },
        {
          q: 'Tras la disolución y fragmentación del Califato de Córdoba en 1031, ¿en qué entidades políticas independientes quedó dividido el territorio andalusí?',
          opts: ['En Reinos de Taifas', 'En marcas hispánicas carolingias', 'En provincias visigodas', 'En baronías feudales'],
          c: 0,
          exp: 'En 1031 el Califato colapsó y se dividió en más de una treintena de pequeños reinos independientes llamados Taifas (como Toledo, Sevilla, Zaragoza o Badajoz).',
          hints: ['La palabra de origen árabe significa "bandería" o "facción".', 'Eran reinos más débiles militarmente que pagaban parias a los reyes cristianos.', 'Empieza por la letra T.']
        },
        {
          q: '¿Qué gran innovación agraria introdujeron los musulmanes en la Península Ibérica que transformó radicalmente la vega de los ríos?',
          opts: ['Sistemas avanzados de regadío con acequias, norias y aljibes', 'El arado normando de vertedera pesada', 'El barbecho trienal con caballos de tiro', 'El cultivo exclusivo de patatas y tomates'],
          c: 0,
          exp: 'Los andalusíes perfeccionaron la hidráulica agrícola con acequias, norias y canales, introduciendo cultivos como cítricos, arroz, azafrán, algodón y caña de azúcar.',
          hints: ['Piensa en el uso del agua y en palabras de origen árabe que empiezan por "al-" o "a-".', 'La patata y el tomate no llegaron hasta después de 1492 desde América.', 'Tiene relación directa con la captación y distribución del agua de los ríos.']
        }
      ];
      const selected = items[Math.floor(Math.random() * items.length)];
      return {
        question: selected.q,
        options: selected.opts,
        correctIndex: selected.c,
        explanation: selected.exp,
        hints: selected.hints
      };
    }
  },
  {
    subjectId: 'geografia-historia',
    topicId: 'gh-3',
    topicName: 'Los Reinos Cristianos y la Reconquista (Castilla y Cuenca)',
    generator: () => {
      const items = [
        {
          q: '¿En qué decisiva batalla de 1212 una coalición de reyes cristianos liderada por Alfonso VIII de Castilla derrotó definitivamente al imperio almohade?',
          opts: ['Batalla de Las Navas de Tolosa', 'Batalla de Covadonga', 'Batalla de Alarcos', 'Batalla de Simancas'],
          c: 0,
          exp: 'La Batalla de Las Navas de Tolosa (Jaén, 1212) abrió las puertas de Andalucía a los reinos cristianos y supuso el declive irreversible del poder almohade.',
          hints: ['Tuvo lugar en el paso de Despeñaperros en Sierra Morena.', 'Participaron los reyes de Castilla, Navarra y Aragón.', 'El nombre hace referencia a "Las Navas de..." en Jaén.']
        },
        {
          q: '¿Por qué tuvo tanta importancia histórica el "Fuero de Cuenca", otorgado por Alfonso VIII a finales del siglo XII?',
          opts: ['Porque sirvió de modelo jurídico para repoblar numerosas ciudades de Castilla y el sur peninsular', 'Porque prohibía el comercio con otros reinos', 'Porque declaraba a Cuenca capital imperial de Hispania', 'Porque eliminaba todas las murallas de la ciudad'],
          c: 0,
          exp: 'El Fuero de Cuenca regulaba la convivencia, garantizaba libertades vecinales y privilegios fiscales para atraer repobladores, y se convirtió en la matriz jurídica de toda una familia de fueros medievales.',
          hints: ['El fuero era un documento de leyes y privilegios para atraer pobladores a una frontera peligrosa.', 'Muchas ciudades manchegas y andaluzas copiaron sus leyes.', 'Representa la base del derecho municipal castellano.']
        },
        {
          q: '¿Qué órdenes militares tuvieron un papel clave en la defensa y repoblación de las tierras manchegas y serranas de Cuenca durante los siglos XII y XIII?',
          opts: ['Órdenes de Santiago, Calatrava y Alcántara', 'Caballeros Teutónicos y Templarios de Escocia', 'Los jesuitas y franciscanos', 'La Santa Hermandad de Toledo'],
          c: 0,
          exp: 'Las Órdenes Militares hispanas (Santiago —con sede en Uclés, Cuenca—, Calatrava y San Juan) recibieron extensas encomiendas en La Mancha para defender y organizar el territorio.',
          hints: ['Recuerda que el monasterio de Uclés en la provincia de Cuenca fue la sede principal de una de ellas.', 'Combinaban la vocación religiosa con la caballería guerrera.', 'Santiago y Calatrava son dos de las más destacadas.']
        }
      ];
      const selected = items[Math.floor(Math.random() * items.length)];
      return {
        question: selected.q,
        options: selected.opts,
        correctIndex: selected.c,
        explanation: selected.exp,
        hints: selected.hints
      };
    }
  },
  {
    subjectId: 'geografia-historia',
    topicId: 'gh-4',
    topicName: 'El Feudalismo Europeo y el Arte Románico y Gótico',
    generator: () => {
      const items = [
        {
          q: 'En la sociedad estamental feudal de la Edad Media, ¿cuáles eran los tres estamentos u órdenes según la doctrina medieval?',
          opts: ['Bellatores (nobles), Oratores (clero) y Laboratores (campesinos)', 'Patricios, plebeyos y esclavos', 'Burgueses, proletarios y terratenientes', 'Reyes, mercaderes y artesanos'],
          c: 0,
          exp: 'La sociedad medieval se dividía en tres órdenes: los que luchan (nobleza/bellatores), los que rezan (clero/oratores) y los que trabajan (campesinado/laboratores). Los dos primeros eran privilegiados.',
          hints: ['Piensa en las tres funciones: defender, rezar y trabajar la tierra.', 'Los términos latinos comienzan por Bell-, Orat- y Labor-.', 'No existía la burguesía industrial en el siglo X.']
        },
        {
          q: '¿Cuál es la principal diferencia arquitectónica entre el estilo Románico (siglos XI-XII) y el Gótico (siglos XII-XV)?',
          opts: ['El Románico usa arcos de medio punto y muros gruesos; el Gótico usa arcos apuntados, arbotantes y grandes vidrieras', 'El Románico construía rascacielos de hierro y el Gótico de madera', 'El Gótico carece totalmente de luz y el Románico es muy luminoso', 'El Románico se originó en Francia y el Gótico en Egipto'],
          c: 0,
          exp: 'El Románico es macizo, con arco de medio punto, bóveda de cañón y poca luz. El Gótico distribuye el peso con arbotantes y arcos ojivales, permitiendo muros altos con hermosas vidrieras luminosas.',
          hints: ['Fíjate en la forma del arco: semicircular en el románico vs terminado en punta (ojival) en el gótico.', 'El gótico busca elevarse hacia Dios mediante luz y altura.', 'Cuenca tiene su catedral con la primera cabecera gótica de Castilla.']
        }
      ];
      const selected = items[Math.floor(Math.random() * items.length)];
      return {
        question: selected.q,
        options: selected.opts,
        correctIndex: selected.c,
        explanation: selected.exp,
        hints: selected.hints
      };
    }
  },
  {
    subjectId: 'geografia-historia',
    topicId: 'gh-5',
    topicName: 'El Renacimiento, el Humanismo y los Reyes Católicos',
    generator: () => {
      const items = [
        {
          q: '¿Qué gran cambio filosófico caracteriza al Humanismo renacentista frente al pensamiento medieval?',
          opts: ['El paso del Teocentrismo medieval al Antropocentrismo humanista', 'El abandono de la razón en favor de la superstición', 'La prohibición de la lectura de autores clásicos griegos y romanos', 'El rechazo al arte y a la imprenta'],
          c: 0,
          exp: 'El Humanismo sitúa al ser humano en el centro de la reflexión y de la creación artística e intelectual (Antropocentrismo), rescatando los modelos de la Antigüedad clásica Grecolatina.',
          hints: ['"Antropo" significa hombre/humano en griego.', 'En la Edad Media Dios era el centro absoluto de todo (Teocentrismo).', 'Piensa en obras de Leonardo da Vinci como el Hombre de Vitruvio.']
        },
        {
          q: '¿Cuál de los siguientes hitos históricos NO tuvo lugar en el trascendental año 1492 en España?',
          opts: ['La batalla de Las Navas de Tolosa', 'La conquista del Reino Nazarí de Granada por los Reyes Católicos', 'La llegada de la expedición de Cristóbal Colón a América', 'La publicación de la primera Gramática castellana de Nebrija'],
          c: 0,
          exp: 'Las Navas de Tolosa tuvo lugar en 1212. En 1492 ocurrieron tres hitos colosales: la toma de Granada (enero), la expedición colombina a América (octubre) y la Gramática de Antonio de Nebrija.',
          hints: ['La batalla contra los almohades ocurrió casi tres siglos antes, en 1212.', 'Los Reyes Católicos culminaron la Reconquista en Granada en 1492.', 'Colón partió del puerto de Palos en 1492.']
        }
      ];
      const selected = items[Math.floor(Math.random() * items.length)];
      return {
        question: selected.q,
        options: selected.opts,
        correctIndex: selected.c,
        explanation: selected.exp,
        hints: selected.hints
      };
    }
  },
  {
    subjectId: 'geografia-historia',
    topicId: 'gh-6',
    topicName: 'Población y Espacios Urbanos en España y el Mundo',
    generator: () => {
      const items = [
        {
          q: '¿Cómo se calcula el saldo vegetativo o crecimiento natural de una población?',
          opts: ['Número de nacimientos menos número de defunciones (Nacimientos - Defunciones)', 'Número de inmigrantes menos número de emigrantes', 'Población total dividida entre la superficie en km²', 'Tasa de natalidad multiplicada por la esperanza de vida'],
          c: 0,
          exp: 'El crecimiento natural o vegetativo es la diferencia entre los nacidos vivos y los fallecidos en un período determinado. Si nacen más de los que mueren, el saldo es positivo.',
          hints: ['Vegetativo hace referencia a los procesos biológicos naturales: nacer y morir.', 'No confundir con el saldo migratorio (inmigrantes - emigrantes).', 'Es una simple resta entre nacimientos y defunciones.']
        },
        {
          q: 'En geografía urbana, ¿qué caracteriza a la parte antigua o casco histórico de una ciudad medieval como Cuenca?',
          opts: ['Plano irregular con calles estrechas, sinuosas y adaptadas al relieve rocoso de las hoces', 'Plano ortogonal en cuadrícula perfecta estilo ensanche del siglo XIX', 'Ausencia total de murallas o edificios religiosos', 'Calles de 8 carriles con autopistas periféricas'],
          c: 0,
          exp: 'El casco histórico de Cuenca tiene un plano irregular y adaptado al espolón rocoso entre las hoces del Júcar y del Huécar, con callejuelas estrechas, plazas recoletas y arquitectura defensiva.',
          hints: ['Las ciudades medievales crecían dentro de murallas sobre promontorios defensivos.', 'El plano no seguía un trazado geométrico planificado con escuadra.', 'Piensa en cómo son las calles que suben a la Plaza Mayor de Cuenca.']
        }
      ];
      const selected = items[Math.floor(Math.random() * items.length)];
      return {
        question: selected.q,
        options: selected.opts,
        correctIndex: selected.c,
        explanation: selected.exp,
        hints: selected.hints
      };
    }
  },

  // --- MATEMÁTICAS ---
  {
    subjectId: 'matematicas',
    topicId: 'mat-1',
    topicName: 'Números Enteros y Operaciones Combinadas',
    generator: () => {
      const a = Math.floor(Math.random() * 5) + 2; // 2..6
      const b = Math.floor(Math.random() * 4) + 2; // 2..5
      const c = Math.floor(Math.random() * 6) + 2; // 2..7
      // (-a) * b + c = -a*b + c
      const res = -a * b + c;
      const opts = [
        `${res}`,
        `${a * b + c}`,
        `${-a * (b + c)}`,
        `${res + 4}`
      ];
      return {
        question: `Calcula el resultado de la siguiente operación combinada con números enteros: (-${a}) · ${b} + ${c}`,
        options: opts,
        correctIndex: 0,
        explanation: `Primero resolvemos la multiplicación respetando la regla de los signos: (-${a}) · ${b} = -${a * b}. A continuación sumamos ${c}: -${a * b} + ${c} = ${res}.`,
        hints: [
          'Recuerda la jerarquía: primero la multiplicación y luego la suma.',
          `Menos por más es menos: (-${a}) · ${b} = -${a * b}.`,
          `Ahora calcula -${a * b} + ${c}.`
        ]
      };
    }
  },
  {
    subjectId: 'matematicas',
    topicId: 'mat-2',
    topicName: 'Fracciones y Decimales',
    generator: () => {
      const items = [
        {
          q: '¿Cuál es la fracción irreducible equivalente a 18/24 tras simplificar por el máximo común divisor?',
          opts: ['3/4', '9/12', '2/3', '6/8'],
          c: 0,
          exp: 'El m.c.d.(18, 24) es 6. Dividiendo numerador y denominador entre 6: 18:6 = 3 y 24:6 = 4. La fracción irreducible es 3/4.',
          hints: ['Busca el mayor divisor común de 18 y 24.', 'Ambos números son divisibles entre 2, 3 y 6.', '18 / 6 = 3, y 24 / 6 = 4.']
        },
        {
          q: 'Un estudiante de 2º ESO ha leído 2/5 de un libro de lectura de 150 páginas. ¿Cuántas páginas le quedan todavía por leer?',
          opts: ['90 páginas', '60 páginas', '75 páginas', '100 páginas'],
          c: 0,
          exp: 'Ha leído (2/5) · 150 = 60 páginas. Por tanto, le faltan por leer 150 - 60 = 90 páginas (o bien 3/5 de 150 = 90 páginas).',
          hints: ['Calcula primero cuántas páginas ha leído: divide 150 entre 5 y multiplica por 2.', '150 : 5 = 30; 30 · 2 = 60 páginas leídas.', 'Resta las páginas leídas del total de 150.']
        }
      ];
      const selected = items[Math.floor(Math.random() * items.length)];
      return {
        question: selected.q,
        options: selected.opts,
        correctIndex: selected.c,
        explanation: selected.exp,
        hints: selected.hints
      };
    }
  },
  {
    subjectId: 'matematicas',
    topicId: 'mat-6',
    topicName: 'Ecuaciones de 1º y 2º Grado',
    generator: () => {
      const xVal = Math.floor(Math.random() * 5) + 2; // 2..6
      const coeff = Math.floor(Math.random() * 3) + 2; // 2..4
      const constTerm = Math.floor(Math.random() * 6) + 1; // 1..6
      const rightSide = coeff * xVal + constTerm;
      const opts = [
        `x = ${xVal}`,
        `x = ${xVal + 2}`,
        `x = ${xVal - 1 || 8}`,
        `x = ${rightSide}`
      ];
      return {
        question: `Resuelve la ecuación lineal de primer grado: ${coeff}x + ${constTerm} = ${rightSide}`,
        options: opts,
        correctIndex: 0,
        explanation: `Restamos ${constTerm} en ambos miembros: ${coeff}x = ${rightSide} - ${constTerm} = ${rightSide - constTerm}. Dividimos entre ${coeff}: x = ${rightSide - constTerm} / ${coeff} = ${xVal}.`,
        hints: [
          `Pasa el término independiente al segundo miembro restando: ${rightSide} - ${constTerm}.`,
          `Te queda ${coeff}x = ${rightSide - constTerm}.`,
          `Divide ${rightSide - constTerm} entre el coeficiente de la incógnita (${coeff}).`
        ]
      };
    }
  },
  {
    subjectId: 'matematicas',
    topicId: 'mat-7',
    topicName: 'Teorema de Pitágoras y Geometría Plana',
    generator: () => {
      const triples = [
        { c1: 3, c2: 4, h: 5 },
        { c1: 6, c2: 8, h: 10 },
        { c1: 5, c2: 12, h: 13 },
        { c1: 9, c2: 12, h: 15 }
      ];
      const t = triples[Math.floor(Math.random() * triples.length)];
      return {
        question: `En un triángulo rectángulo, los catetos miden ${t.c1} cm y ${t.c2} cm. ¿Cuánto mide su hipotenusa?`,
        options: [`${t.h} cm`, `${t.c1 + t.c2} cm`, `${t.h + 3} cm`, `${t.c1 * 2} cm`],
        correctIndex: 0,
        explanation: `Por el Teorema de Pitágoras: h² = c₁² + c₂² = ${t.c1}² + ${t.c2}² = ${t.c1 * t.c1} + ${t.c2 * t.c2} = ${t.h * t.h}. Por tanto, h = √${t.h * t.h} = ${t.h} cm.`,
        hints: [
          'La fórmula es: Hipotenusa² = Cateto₁² + Cateto₂².',
          `Calcula los cuadrados: ${t.c1 * t.c1} y ${t.c2 * t.c2}.`,
          `Suma ambos valores y calcula la raíz cuadrada de ${t.h * t.h}.`
        ]
      };
    }
  },

  // --- LENGUA Y LITERATURA ---
  {
    subjectId: 'lengua',
    topicId: 'len-2',
    topicName: 'Morfología: Clases de Palabras',
    generator: () => {
      const items = [
        {
          q: 'En la oración: "Aquel antiguo manuscrito estaba escondido bajo la mesa", ¿qué categoría gramatical tiene la palabra "Aquel"?',
          opts: ['Determinante demostrativo', 'Pronombre demostrativo', 'Adjetivo calificativo', 'Adverbio de lugar'],
          c: 0,
          exp: '"Aquel" acompaña directamente al sustantivo "manuscrito", concordando en género y número masculino singular; por tanto, es un determinante demostrativo.',
          hints: ['Fíjate en si acompaña a un sustantivo o si lo sustituye.', 'Si acompaña a un nombre (manuscrito), es un determinante.', 'Indica lejanía en el espacio o en el tiempo.']
        },
        {
          q: '¿Cuál de las siguientes palabras es un adverbio y, por tanto, una palabra completamente invariable (sin género ni número)?',
          opts: ['Rápidamente', 'Rápido', 'Rápidos', 'Rapidez'],
          c: 0,
          exp: '"Rápidamente" es un adverbio de modo formado con el sufijo -mente y no varía en género ni número ("Ellos corren rápidamente", "Ella corre rápidamente").',
          hints: ['Los adverbios no admiten plural ni femenino (*rápidamentes no existe).', 'Los terminados en -mente sobre adjetivos son adverbios de modo.', 'Rapidez es un sustantivo abstracto.']
        }
      ];
      const selected = items[Math.floor(Math.random() * items.length)];
      return {
        question: selected.q,
        options: selected.opts,
        correctIndex: selected.c,
        explanation: selected.exp,
        hints: selected.hints
      };
    }
  },
  {
    subjectId: 'lengua',
    topicId: 'len-3',
    topicName: 'Sintaxis: La Oración Simple y sus Complementos',
    generator: () => {
      const items = [
        {
          q: 'En la oración: "La alumna de 2º ESO parecía muy tranquila antes del examen de Cuenca", ¿qué función sintáctica desempeña "muy tranquila"?',
          opts: ['Atributo (Atrib)', 'Complemento Directo (CD)', 'Complemento Circunstancial de Modo (CCM)', 'Complemento Predicativo'],
          c: 0,
          exp: 'El verbo "parecía" es copulativo (ser, estar, parecer). El sintagma que califica al sujeto a través de un verbo copulativo es el Atributo y puede sustituirse por "lo": "La alumna lo parecía".',
          hints: ['Fíjate en el verbo principal: "parecer". ¿Es copulativo o predicativo?', 'Los verbos ser, estar y parecer llevan Atributo.', 'Prueba a sustituirlo por el pronombre "lo": "La alumna LO parecía".']
        },
        {
          q: 'En la oración: "El árbitro mostró la tarjeta roja al delantero", ¿cómo podemos pronominalizar conjuntamente el Complemento Directo y el Complemento Indirecto?',
          opts: ['El árbitro se la mostró', 'El árbitro le la mostró', 'El árbitro la le mostró', 'El árbitro lo mostró a él'],
          c: 0,
          exp: 'El CD es "la tarjeta roja" (la) y el CI es "al delantero" (le). Al juntarse "le" y "la", el pronombre "le" se transforma por eufonía en "se": "El árbitro se la mostró".',
          hints: ['El CD es "la tarjeta" (femenino singular: "la").', 'El CI es "al delantero" (tercera persona: "le").', 'En español no se dice "le la mostró", sino que "le" pasa a ser "se".']
        }
      ];
      const selected = items[Math.floor(Math.random() * items.length)];
      return {
        question: selected.q,
        options: selected.opts,
        correctIndex: selected.c,
        explanation: selected.exp,
        hints: selected.hints
      };
    }
  },

  // --- FÍSICA Y QUÍMICA ---
  {
    subjectId: 'fisica-quimica',
    topicId: 'fq-1',
    topicName: 'El Método Científico y Magnitudes (SI)',
    generator: () => {
      const items = [
        {
          q: '¿Cuál de las siguientes unidades pertenece al Sistema Internacional (SI) para medir la masa de un cuerpo?',
          opts: ['Kilogramo (kg)', 'Gramo (g)', 'Tonelada (t)', 'Libra (lb)'],
          c: 0,
          exp: 'En el Sistema Internacional (SI), la unidad fundamental de masa es el kilogramo (kg), no el gramo.',
          hints: ['Aunque en el laboratorio pesemos gramos con frecuencia, la unidad base del SI lleva prefijo kilo-.', 'El metro, el segundo y el kilogramo forman la base MKS del SI.', 'Empieza por kilo.']
        },
        {
          q: 'Un ciclista viaja a una velocidad constante de 72 km/h. ¿Cuál es su velocidad equivalente expresada en metros por segundo (m/s) en el SI?',
          opts: ['20 m/s', '7,2 m/s', '25,9 m/s', '720 m/s'],
          c: 0,
          exp: 'Para pasar de km/h a m/s se divide entre 3,6: 72 / 3,6 = 20 m/s (o multiplicando por 1000 m y dividiendo entre 3600 s).',
          hints: ['Recuerda el factor rápido de conversión: 1 m/s = 3,6 km/h.', 'Para pasar de km/h a m/s se divide entre 3,6.', '72 dividido entre 3,6 da un número entero exacto: 20.']
        }
      ];
      const selected = items[Math.floor(Math.random() * items.length)];
      return {
        question: selected.q,
        options: selected.opts,
        correctIndex: selected.c,
        explanation: selected.exp,
        hints: selected.hints
      };
    }
  },
  {
    subjectId: 'fisica-quimica',
    topicId: 'fq-4',
    topicName: 'Estructura Atómica y Tabla Periódica',
    generator: () => {
      const items = [
        {
          q: 'Si un átomo neutro de Sodio (Na) tiene número atómico Z = 11 y número másico A = 23, ¿cuántos neutrones posee en su núcleo?',
          opts: ['12 neutrones', '11 neutrones', '23 neutrones', '34 neutrones'],
          c: 0,
          exp: 'El número másico A representa protones + neutrones (A = Z + N). Por tanto, los neutrones son N = A - Z = 23 - 11 = 12 neutrones.',
          hints: ['La fórmula básica del átomo es A = Z + N.', 'Z son los protones (11) y A es la masa total del núcleo (23).', 'Resta el número atómico al número másico: 23 - 11.']
        },
        {
          q: '¿Qué partículas subatómicas tienen carga eléctrica negativa y orbitan alrededor del núcleo atómico?',
          opts: ['Los electrones', 'Los protones', 'Los neutrones', 'Los positrones'],
          c: 0,
          exp: 'Los electrones tienen carga negativa y forman la corteza atómica. Los protones tienen carga positiva y los neutrones carecen de carga; ambos forman el núcleo.',
          hints: ['Los protones son positivos y están en el núcleo.', 'Los neutrones no tienen carga (neutros).', 'Tienen carga negativa y se mueven en la corteza.']
        }
      ];
      const selected = items[Math.floor(Math.random() * items.length)];
      return {
        question: selected.q,
        options: selected.opts,
        correctIndex: selected.c,
        explanation: selected.exp,
        hints: selected.hints
      };
    }
  },

  // --- INGLÉS ---
  {
    subjectId: 'ingles',
    topicId: 'ing-1',
    topicName: 'Present Simple vs Present Continuous',
    generator: () => {
      const items = [
        {
          q: 'Complete the sentence with the correct tense: "Listen! The baby _______ in the bedroom."',
          opts: ['is crying', 'cries', 'cry', 'are crying'],
          c: 0,
          exp: 'We use the Present Continuous ("is crying") because "Listen!" indicates that the action is happening right now at the moment of speaking.',
          hints: ['"Listen!" shows an action taking place right now.', 'Singular subject "The baby" takes "is + verb-ing".', 'Present Continuous formula: am/is/are + verb-ing.']
        },
        {
          q: 'Choose the correct form: "My parents _______ coffee every morning before going to work."',
          opts: ['drink', 'are drinking', 'drinks', 'is drinking'],
          c: 0,
          exp: 'We use the Present Simple ("drink") for routines and daily habits with time expressions like "every morning". Plural subject "parents" takes base form "drink".',
          hints: ['"Every morning" expresses a routine or habit.', 'For habits and routines we use Present Simple.', 'Subject "My parents" is plural (they), so no "-s".']
        }
      ];
      const selected = items[Math.floor(Math.random() * items.length)];
      return {
        question: selected.q,
        options: selected.opts,
        correctIndex: selected.c,
        explanation: selected.exp,
        hints: selected.hints
      };
    }
  },
  {
    subjectId: 'ingles',
    topicId: 'ing-6',
    topicName: 'Comparatives, Superlatives and First Conditional',
    generator: () => {
      const items = [
        {
          q: 'Complete the First Conditional sentence: "If it _______ tomorrow, we _______ to the park."',
          opts: ['rains / won\'t go', 'will rain / don\'t go', 'rain / aren\'t go', 'is raining / didn\'t go'],
          c: 0,
          exp: 'First Conditional rule: If + Present Simple (rains), will/won\'t + bare infinitive (won\'t go).',
          hints: ['Remember: never put "will" in the "if" clause.', 'Clause with "if" uses Present Simple with 3rd person -s (rains).', 'Main clause uses will/won\'t + verb.']
        },
        {
          q: 'What is the correct comparative form of the adjective "good"?',
          opts: ['Better than', 'Gooder than', 'More good than', 'Best than'],
          c: 0,
          exp: '"Good" is an irregular adjective: good -> better (comparative) -> the best (superlative).',
          hints: ['It is an irregular adjective.', 'You cannot add -er to good.', 'Good -> Better -> Best.']
        }
      ];
      const selected = items[Math.floor(Math.random() * items.length)];
      return {
        question: selected.q,
        options: selected.opts,
        correctIndex: selected.c,
        explanation: selected.exp,
        hints: selected.hints
      };
    }
  },
  {
    subjectId: 'ingles',
    topicId: 'ing-2',
    topicName: 'Past Simple and Past Continuous',
    generator: () => {
      const items = [
        {
          q: 'Choose the correct verb form: "While I _______ my homework, my brother _______ into the room."',
          opts: ['was doing / came', 'did / was coming', 'was doing / was coming', 'did / came'],
          c: 0,
          exp: 'We use the Past Continuous ("was doing") for the longer background action and the Past Simple ("came") for the short interruption.',
          hints: ['"While" introduces a progressive action in progress (was doing).', 'The sudden action interrupting it uses Past Simple.', 'Past Continuous = was/were + verb-ing; Past Simple = irregular 2nd form (came).']
        },
        {
          q: 'What is the past simple and past participle form of the irregular verb "buy"?',
          opts: ['bought / bought', 'buyed / buyed', 'brought / brought', 'boughten / boughten'],
          c: 0,
          exp: 'Buy is an irregular verb: buy -> bought -> bought. (Do not confuse with bring -> brought).',
          hints: ['It is an irregular verb ending in -ought.', 'Bring -> brought, but Buy -> bought.', 'Spelling: b-o-u-g-h-t.']
        },
        {
          q: 'How do you form a negative sentence in Past Simple? "She _______ to the cinema yesterday."',
          opts: ['didn\'t go', 'didn\'t went', 'not went', 'wasn\'t go'],
          c: 0,
          exp: 'In Past Simple negative sentences, we use the auxiliary "didn\'t" + bare infinitive ("didn\'t go"), never "didn\'t went".',
          hints: ['After the auxiliary "didn\'t", the main verb stays in the infinitive (base form).', 'Never put two past markers together (no "didn\'t went").', 'Correct formula: didn\'t + go.']
        }
      ];
      const selected = items[Math.floor(Math.random() * items.length)];
      return {
        question: selected.q,
        options: selected.opts,
        correctIndex: selected.c,
        explanation: selected.exp,
        hints: selected.hints
      };
    }
  },
  {
    subjectId: 'ingles',
    topicId: 'ing-3',
    topicName: 'Future Forms: Will, Be Going To and Present Continuous',
    generator: () => {
      const items = [
        {
          q: 'Look at those dark clouds in the sky! It _______ rain.',
          opts: ['is going to', 'will', 'is raining', 'shall'],
          c: 0,
          exp: 'We use "be going to" for predictions based on present evidence (the dark clouds in the sky).',
          hints: ['There is clear physical evidence right now (dark clouds).', 'Predictions with evidence use "be going to".', 'Formula: is + going to + verb.']
        },
        {
          q: 'Don\'t worry about carrying that heavy bag, I _______ you!',
          opts: ['will help', 'am going to help', 'am helping', 'helped'],
          c: 0,
          exp: 'We use "will" for spontaneous decisions and offers made at the moment of speaking.',
          hints: ['It is an instant offer made right now.', 'Spontaneous offers use "will".', 'I will help you.']
        }
      ];
      const selected = items[Math.floor(Math.random() * items.length)];
      return {
        question: selected.q,
        options: selected.opts,
        correctIndex: selected.c,
        explanation: selected.exp,
        hints: selected.hints
      };
    }
  },
  {
    subjectId: 'ingles',
    topicId: 'ing-5',
    topicName: 'Modal Verbs: Obligation, Prohibition and Advice',
    generator: () => {
      const items = [
        {
          q: 'You _______ shout in the library. It is strictly forbidden!',
          opts: ['mustn\'t', 'should', 'don\'t have to', 'can'],
          c: 0,
          exp: '"Mustn\'t" expresses strict prohibition (it is against the rules). "Don\'t have to" only means lack of necessity.',
          hints: ['Forbidden means you are not allowed to do it.', 'For prohibition we use "mustn\'t".', 'Don\'t have to means optional, not forbidden.']
        },
        {
          q: 'If you have a high fever and a headache, you _______ see a doctor.',
          opts: ['should', 'mustn\'t', 'couldn\'t', 'shall not'],
          c: 0,
          exp: 'We use "should" to give advice or a friendly recommendation.',
          hints: ['This is advice or recommendation for someone sick.', 'Advice uses "should" (deberías).', 'Formula: should + base form.']
        }
      ];
      const selected = items[Math.floor(Math.random() * items.length)];
      return {
        question: selected.q,
        options: selected.opts,
        correctIndex: selected.c,
        explanation: selected.exp,
        hints: selected.hints
      };
    }
  },
  {
    subjectId: 'fisica-quimica',
    topicId: 'fq-2',
    topicName: 'La Materia y la Teoría Cinético-Molecular',
    generator: () => {
      const items = [
        {
          q: 'Según la teoría cinético-molecular, ¿cómo se encuentran las partículas en el estado gaseoso?',
          opts: ['Muy separadas entre sí, moviéndose caóticamente a gran velocidad con grandes espacios vacíos', 'Unidas fuertemente en posiciones fijas vibrando levemente', 'En contacto continuo pero resbalando unas sobre otras', 'Formando una red cristalina inmóvil'],
          c: 0,
          exp: 'En los gases, las fuerzas de cohesión son despreciables: las partículas están muy alejadas, se mueven en todas direcciones a gran velocidad y chocan elásticamente contra las paredes del recipiente.',
          hints: ['Los gases ocupan todo el volumen disponible y se pueden comprimir fácilmente.', 'Las partículas están muy separadas y tienen gran energía cinética.', 'No tienen forma ni volumen fijo.']
        },
        {
          q: '¿Cómo se denomina el cambio de estado directo de gas a sólido sin pasar por el estado líquido?',
          opts: ['Sublimación regresiva o inversa', 'Condensación', 'Vaporización', 'Solidificación'],
          c: 0,
          exp: 'El paso directo de gas a sólido se llama sublimación inversa o regresiva (o deposición). El paso de gas a líquido es condensación.',
          hints: ['De sólido a gas directo es sublimación (como el hielo seco).', 'El proceso contrario se llama sublimación inversa.', 'No pasa por líquido.']
        }
      ];
      const selected = items[Math.floor(Math.random() * items.length)];
      return {
        question: selected.q,
        options: selected.opts,
        correctIndex: selected.c,
        explanation: selected.exp,
        hints: selected.hints
      };
    }
  },
  {
    subjectId: 'fisica-quimica',
    topicId: 'fq-3',
    topicName: 'Sustancias Puras, Mezclas y Técnicas de Separación',
    generator: () => {
      const items = [
        {
          q: 'En el laboratorio de ciencias del IES San José, ¿qué método utilizarías para separar una mezcla de agua y alcohol basándote en sus distintos puntos de ebullición?',
          opts: ['Destilación simple', 'Filtración por gravedad', 'Decantación con embudo', 'Cristalización en placa'],
          c: 0,
          exp: 'La destilación separa líquidos miscibles homogéneos aprovechando que hierven a diferentes temperaturas (el alcohol a ~78 °C y el agua a 100 °C).',
          hints: ['El agua y el alcohol forman una mezcla homogénea (se mezclan completamente).', 'Uno hierve antes que el otro.', 'El vapor del componente más volátil se condensa en un refrigerante.']
        },
        {
          q: '¿Cuál de los siguientes sistemas materiales es una mezcla heterogénea?',
          opts: ['Agua con aceite', 'Agua con sal completamente disuelta', 'El aire limpio de la Serranía de Cuenca', 'Una moneda de bronce'],
          c: 0,
          exp: 'El agua y el aceite son líquidos inmiscibles que forman dos fases claramente diferenciadas a simple vista (mezcla heterogénea).',
          hints: ['En una mezcla heterogénea se distinguen las diferentes fases o componentes.', 'El aceite flota sobre el agua debido a su menor densidad.', 'El agua con sal disuelta es una disolución homogénea.']
        }
      ];
      const selected = items[Math.floor(Math.random() * items.length)];
      return {
        question: selected.q,
        options: selected.opts,
        correctIndex: selected.c,
        explanation: selected.exp,
        hints: selected.hints
      };
    }
  },
  {
    subjectId: 'lengua',
    topicId: 'len-1',
    topicName: 'Comunicación y Tipologías Textuales',
    generator: () => {
      const items = [
        {
          q: '¿Qué tipo de texto tiene como propósito principal defender una tesis o postura mediante razones y argumentos para convencer al receptor?',
          opts: ['Texto argumentativo', 'Texto expositivo', 'Texto narrativo', 'Texto prescriptivo'],
          c: 0,
          exp: 'El texto argumentativo defiende una opinión o tesis con argumentos lógicos para persuadir al lector (ejemplos: un artículo de opinión, un ensayo, un debate).',
          hints: ['Su fin es persuadir y convencer mediante razones.', 'Incluye tesis y argumentos a favor o en contra.', 'Los artículos de opinión y debates son ejemplos claros.']
        },
        {
          q: 'En un texto narrativo, ¿cómo se llama el narrador que participa como protagonista o testigo de los hechos utilizando la primera persona (yo)?',
          opts: ['Narrador interno (en 1ª persona)', 'Narrador omnisciente', 'Narrador objetivo (cámara)', 'Narrador en 3ª persona ausente'],
          c: 0,
          exp: 'El narrador interno cuenta la historia desde dentro como protagonista o testigo y usa la 1ª persona gramatical.',
          hints: ['Habla en primera persona ("yo fui", "nosotros vimos").', 'Forma parte del relato.', 'No sabe los pensamientos secretos de todos como el omnisciente.']
        }
      ];
      const selected = items[Math.floor(Math.random() * items.length)];
      return {
        question: selected.q,
        options: selected.opts,
        correctIndex: selected.c,
        explanation: selected.exp,
        hints: selected.hints
      };
    }
  },
  {
    subjectId: 'matematicas',
    topicId: 'mat-4',
    topicName: 'Proporcionalidad y Porcentajes',
    generator: () => {
      const percent = [10, 15, 20, 25][Math.floor(Math.random() * 4)];
      const price = [40, 60, 80, 100, 120][Math.floor(Math.random() * 5)];
      const discount = (price * percent) / 100;
      const finalPrice = price - discount;

      const opts = [
        `${finalPrice} €`,
        `${finalPrice + 5} €`,
        `${discount} €`,
        `${price - 5} €`
      ];

      return {
        question: `Un abrigo cuesta ${price} € en una tienda de Cuenca. Si tiene una rebaja del ${percent} %, ¿cuál es su precio final con el descuento aplicado?`,
        options: opts,
        correctIndex: 0,
        explanation: `Calculamos el descuento: ${percent} % de ${price} = (${percent} · ${price}) / 100 = ${discount} €. Restamos el descuento al precio original: ${price} - ${discount} = ${finalPrice} €.`,
        hints: [
          `Calcula cuánto te descuentan: multiplica ${price} por ${percent} y divide entre 100.`,
          `El descuento es de ${discount} €.`,
          `Resta ese descuento (${discount} €) a los ${price} € iniciales.`
        ]
      };
    }
  }
];

function shuffleOptions(options: string[], correctIndex: number): { options: string[]; correctIndex: number } {
  const correctText = options[correctIndex];
  const shuffled = [...options];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return {
    options: shuffled,
    correctIndex: shuffled.indexOf(correctText)
  };
}

export async function requestAIChallenge(
  subjectId: SubjectId,
  topicName: string,
  topicId?: string,
  difficulty: string = 'medio'
): Promise<Challenge> {
  const subject = SUBJECTS.find(s => s.id === subjectId);
  const subjectTitle = subject?.name || subjectId;

  // 1. Direct client-side Gemini call if custom API key or env key is available
  const clientKey = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY) ||
    (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
    storage.getCustomApiKey();

  if (clientKey) {
    try {
      const { GoogleGenAI, Type } = await import('@google/genai');
      const ai = new GoogleGenAI({
        apiKey: clientKey,
        httpOptions: { headers: { 'User-Agent': 'tutorsanjose-client' } }
      });

      const res = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Genera 1 reto interactivo tipo test de 4 opciones para un estudiante de 2º de ESO (13-14 años) sobre "${topicName}" en la asignatura "${subjectTitle}". Decreto 82/2022 LOMLOE Castilla-La Mancha. La pregunta debe ser rigurosa, clara y formativa.`,
        config: {
          systemInstruction: `Eres un profesor de secundaria creador de retos de 2º ESO del IES San José de Cuenca (Castilla-La Mancha).
Devuelve un JSON con:
- question (string con el enunciado de la pregunta)
- options (array de 4 strings de opciones posibles)
- correctIndex (entero de 0 a 3 con la opción correcta)
- explanation (explicación detallada de por qué es la respuesta correcta)
- hints (array de 3 pistas socráticas graduales)`,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctIndex: { type: Type.INTEGER },
              explanation: { type: Type.STRING },
              hints: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ['question', 'options', 'correctIndex', 'explanation', 'hints']
          }
        }
      });

      const parsed = JSON.parse(res.text || '{}');
      if (parsed.question && Array.isArray(parsed.options) && parsed.options.length === 4) {
        const { options: shuffledOpts, correctIndex: newCorrect } = shuffleOptions(
          parsed.options, 
          typeof parsed.correctIndex === 'number' ? parsed.correctIndex : 0
        );

        return {
          id: 'ch-ai-' + Date.now(),
          subjectId,
          topicId: topicId || undefined,
          topicName: topicName || '2º ESO',
          question: parsed.question,
          options: shuffledOpts,
          correctIndex: newCorrect,
          explanation: parsed.explanation || 'Explicación del reto.',
          hints: Array.isArray(parsed.hints) ? parsed.hints : ['Piensa en el concepto clave.'],
          difficulty: 'medio'
        };
      }
    } catch (e) {
      console.info('Client Gemini generation fallback:', e);
    }
  }

  // 2. Attempt to call server endpoint (/api/tutor/challenge)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    const response = await fetch('/api/tutor/challenge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subjectId,
        topicName,
        difficulty
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && data.question && Array.isArray(data.options) && !data.error) {
        // Discard generic dummy boilerplate if returned by any legacy server
        if (!data.question.includes('¿cuál de las siguientes opciones describe el método de trabajo adecuado?') &&
            !data.question.includes('¿cuál de las siguientes afirmaciones es correcta según el currículo LOMLOE')) {
          const { options: shuffledOpts, correctIndex: newCorrect } = shuffleOptions(
            data.options, 
            typeof data.correctIndex === 'number' ? data.correctIndex : 0
          );
          return {
            id: 'ch-ai-' + Date.now(),
            subjectId,
            topicId: topicId || undefined,
            topicName: topicName || data.topicName || '2º ESO',
            question: data.question,
            options: shuffledOpts,
            correctIndex: newCorrect,
            explanation: data.explanation || 'Explicación del reto.',
            hints: Array.isArray(data.hints) ? data.hints : ['Piensa en el concepto clave.'],
            difficulty: 'medio'
          };
        }
      }
    }
  } catch (err) {
    console.info('Server API unreachable, using curricular dynamic generator:', err);
  }

  // 3. Intelligent dynamic curricular fallback generator
  // Match template strictly for subject and topicId
  let matchingTemplates = TEMPLATE_GENERATORS.filter(t => {
    if (t.subjectId !== subjectId) return false;
    if (topicId) return t.topicId === topicId;
    return true;
  });

  if (matchingTemplates.length === 0) {
    matchingTemplates = TEMPLATE_GENERATORS.filter(t => t.subjectId === subjectId);
  }

  const template = matchingTemplates.length > 0
    ? matchingTemplates[Math.floor(Math.random() * matchingTemplates.length)]
    : null;

  if (template) {
    const gen = template.generator();
    const { options: shuffledOpts, correctIndex: newCorrect } = shuffleOptions(gen.options, gen.correctIndex);
    return {
      id: 'ch-gen-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      subjectId,
      topicId: topicId || template.topicId,
      topicName: topicName || template.topicName,
      question: gen.question,
      options: shuffledOpts,
      correctIndex: newCorrect,
      explanation: gen.explanation,
      hints: gen.hints,
      difficulty: 'medio'
    };
  }

  // 4. Default curricular fallback with varied questions
  const activeTopic = subject?.topics.find(t => t.id === topicId) || subject?.topics[0];
  const concept = activeTopic?.keyConcepts[Math.floor(Math.random() * (activeTopic?.keyConcepts.length || 1))] || 'Concepto clave 2º ESO';

  const rawOpts = [
    `Comprender el concepto de "${concept}" y aplicar su procedimiento razonado paso a paso.`,
    `Aprender únicamente de memoria las palabras sin entender su significado real.`,
    `Ignorar las unidades de medida y la coherencia del resultado final.`,
    `Resolver mediante ensayo y error sin justificar ningún cálculo o argumento.`
  ];
  const { options: finalOpts, correctIndex: finalCorrect } = shuffleOptions(rawOpts, 0);

  return {
    id: 'ch-gen-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    subjectId,
    topicId: activeTopic?.id,
    topicName: activeTopic?.name || topicName,
    question: `En 2º de ESO (${subject?.name || ''}), respecto a "${concept}" en el bloque "${activeTopic?.name || topicName}", ¿cuál es la pauta correcta según el método de trabajo en clase?`,
    options: finalOpts,
    correctIndex: finalCorrect,
    explanation: `En ${subject?.name}, el aprendizaje competencial de 2º de ESO requiere comprender el concepto de "${concept}" para aplicarlo de forma fundamentada en problemas y textos.`,
    hints: [
      `Piensa en cómo se aborda "${concept}" en las clases del IES San José.`,
      `Descarta las opciones que rechazan el rigor y el análisis razonado.`,
      `El método correcto exige comprender el concepto antes de aplicar la regla o fórmula.`
    ],
    difficulty: 'medio'
  };
}

// Subject-specific Socratic Engine for 2º ESO LOMLOE
export function generateSubjectSocraticResponse(
  subjectId: SubjectId,
  message: string,
  topicName: string,
  _history?: { role: 'user' | 'assistant'; content: string }[]
): {
  explanation: string;
  keyConcept: string;
  hints: string[];
  reflectionQuestion: string;
} {
  const lower = message.toLowerCase().trim();

  if (subjectId === 'ingles') {
    // 🇬🇧 INGLÉS - Ms. Davies (English Teacher 2º ESO)
    if (
      lower.includes('past') || lower.includes('ayer') || lower.includes('yesterday') ||
      lower.includes('irregular') || lower.includes('did') || lower.includes('was') ||
      lower.includes('were') || lower.includes('went') || lower.includes('ago') ||
      lower.includes('last week') || lower.includes('last night') || lower.includes('pasado')
    ) {
      return {
        explanation: 'Hello! As your English tutor, let\'s look at this past tense structure together. In 2º ESO, remember that the Past Simple expresses completed actions in the past. To form it correctly, we first check whether the verb is regular (adds -ed) or irregular (from your 2º ESO verb list).',
        keyConcept: 'Past Simple: Regular & Irregular Verbs',
        hints: [
          'Hint 1: Check the time marker in the sentence (words like "yesterday", "last year", "in 2024", or "two days ago" indicate Past Simple).',
          'Hint 2: For regular verbs, remember the spelling rules: verbs ending in consonant + y change to -ied (study -> studied); short verbs ending in consonant-vowel-consonant double the last consonant (stop -> stopped).',
          'Hint 3: In negative sentences and questions, use the auxiliary did / didn\'t + the base infinitive of the verb: "Did you watch the movie?" (NOT "Did you watched").'
        ],
        reflectionQuestion: 'In your sentence, is the verb regular or irregular, and is the clause affirmative, negative, or a question?'
      };
    }

    if (
      lower.includes('continuous') || lower.includes('continuo') || lower.includes('ing') ||
      lower.includes('now') || lower.includes('ahora') || lower.includes('moment') ||
      lower.includes('routine') || lower.includes('rutina') || lower.includes('usually') ||
      lower.includes('always') || lower.includes('present') || lower.includes('presente')
    ) {
      return {
        explanation: 'Great question! In 2º ESO English, distinguishing Present Simple and Present Continuous is key. Ask yourself: is this action an everyday routine or habit, or is it happening right now at this exact moment?',
        keyConcept: 'Present Simple vs Present Continuous',
        hints: [
          'Hint 1: Look for frequency adverbs like "always", "usually", "never", "every day" (Present Simple) vs time expressions like "now", "at the moment", "Look!", "Listen!" (Present Continuous).',
          'Hint 2: In Present Simple, do not forget the -s or -es suffix for third person singular subjects (he / she / it).',
          'Hint 3: In Present Continuous, you must use the auxiliary verb TO BE (am / is / are) + the main verb ending in -ING (e.g. "She is reading").'
        ],
        reflectionQuestion: 'Which time adverb appears in your exercise, and does it point to a regular routine or an action in progress right now?'
      };
    }

    if (
      lower.includes('comparative') || lower.includes('superlative') || lower.includes('comparativo') ||
      lower.includes('superlativo') || lower.includes('than') || lower.includes('more') ||
      lower.includes('the most') || lower.includes('better') || lower.includes('worse') || lower.includes('mas que')
    ) {
      return {
        explanation: 'Let\'s analyze comparisons in English! The fundamental rule depends on the syllable length of the adjective: short adjectives (1 syllable) follow a different pattern from long adjectives (2 or more syllables).',
        keyConcept: 'Comparative and Superlative Adjectives',
        hints: [
          'Hint 1: Short adjectives add "-er than" for comparative (e.g. fast -> faster than) and "the -est" for superlative (e.g. the fastest).',
          'Hint 2: Long adjectives use "more ... than" for comparative and "the most ..." for superlative (e.g. more dangerous than / the most dangerous).',
          'Hint 3: Watch out for the irregular adjectives: good -> better -> the best, and bad -> worse -> the worst.'
        ],
        reflectionQuestion: 'How many syllables does your adjective have, and are you comparing two items or finding the extreme of a group?'
      };
    }

    if (
      lower.includes('modal') || lower.includes('can') || lower.includes('could') ||
      lower.includes('must') || lower.includes('should') || lower.includes('have to')
    ) {
      return {
        explanation: 'Modals are auxiliary verbs used to express ability (can), obligation (must / have to), or advice (should). Notice that modals never add "-s" in the 3rd person and are always followed by a bare infinitive (without "to").',
        keyConcept: 'Modal Verbs: Ability, Obligation & Advice',
        hints: [
          'Hint 1: Check what the speaker wants to express: ability/permission (can), recommendation/advice (should), or strict rule/duty (must/have to).',
          'Hint 2: The verb immediately following a modal verb must be in its base infinitive form (e.g. "You should eat", NOT "You should to eat").',
          'Hint 3: In negative sentences: can\'t (cannot), shouldn\'t (advice not to do something), mustn\'t (prohibition).'
        ],
        reflectionQuestion: 'Does your sentence express an ability, a piece of advice, or a mandatory rule?'
      };
    }

    // Default English Socratic response
    return {
      explanation: `Hello! I'm Ms. Davies, your English tutor for 2º ESO. I'm here to help you work through this doubt step by step without giving away the final answer. Let's look closely at the sentence and the vocabulary or grammar structure you are practicing.`,
      keyConcept: topicName || 'English Grammar & Vocabulary (2º ESO)',
      hints: [
        'Hint 1: Identify the main subject (who does the action) and the main verb in your sentence.',
        'Hint 2: Check the tense of the sentence: look for time adverbs (yesterday, now, every day, tomorrow) to choose the right verb form.',
        'Hint 3: In English sentences, remember the basic word order: Subject + Verb + Object/Complements (S-V-O).'
      ],
      reflectionQuestion: 'Who is the subject of your sentence, and what action or state is being described?'
    };
  }

  if (subjectId === 'lengua') {
    // 📖 LENGUA CASTELLANA Y LITERATURA - D. Santiago
    if (
      lower.includes('sujeto') || lower.includes('predicado') || lower.includes('directo') ||
      lower.includes('indirecto') || lower.includes('cd') || lower.includes('ci') ||
      lower.includes('sintaxis') || lower.includes('atributo') || lower.includes('circunstancial')
    ) {
      return {
        explanation: '¡Hola! Como tu profesor de Lengua Castellana de 2º ESO, te propongo seguir el método sintáctico riguroso: en primer lugar, localiza el verbo principal conjugado de la oración. A partir de él se organiza toda la estructura oracional.',
        keyConcept: 'Sintaxis: Estructura de la Oración Simple',
        hints: [
          'Pista 1: Para identificar el Sujeto, aplica la prueba de la concordancia: cambia el número del verbo (de singular a plural). La palabra que cambie obligatoriamente junto con él es el Sujeto.',
          'Pista 2: Para el Complemento Directo (CD), comprueba si puedes sustituirlo por los pronombres lo, la, los, las, o si al pasar la oración a pasiva se convierte en Sujeto Paciente.',
          'Pista 3: Para el Complemento Indirecto (CI), comprueba si va introducido por la preposición "a" y si puedes sustituirlo por los pronombres le o les.'
        ],
        reflectionQuestion: '¿Cuál es el verbo principal conjugado de la oración y qué parte cambia si lo pasas al plural?'
      };
    }

    return {
      explanation: '¡Hola! Soy D. Santiago, tu tutor de Lengua Castellana y Literatura para 2º ESO en el IES San José. Analicemos juntos tu duda razonando las normas gramaticales, ortográficas o literarias que habéis trabajado en clase.',
      keyConcept: topicName || 'Lengua Castellana y Literatura (2º ESO)',
      hints: [
        'Pista 1: Identifica qué categoría gramatical o concepto teórico está en juego en tu duda.',
        'Pista 2: Recuerda la regla gramatical o literaria vista en los saberes básicos de este trimestre.',
        'Pista 3: Formula tu hipótesis inicial o escribe tu análisis preliminar y lo revisamos juntos.'
      ],
      reflectionQuestion: '¿A qué bloque del temario (gramática, léxico, ortografía o literatura) corresponde este ejercicio?'
    };
  }

  if (subjectId === 'geografia-historia') {
    // 🏰 GEOGRAFÍA E HISTORIA - Dña. Carmen
    return {
      explanation: '¡Hola! Soy Dña. Carmen, tu tutora de Geografía e Historia para 2º de ESO. En historia y geografía no memorizamos datos aislados, sino que comprendemos causas, consecuencias y procesos de transformación social y territorial.',
      keyConcept: topicName || 'Geografía e Historia (2º ESO LOMLOE)',
      hints: [
        'Pista 1: Sitúa el hecho o fenómeno en su época histórica concreta o en su marco geográfico espacial.',
        'Pista 2: Piensa qué factores políticos, sociales, económicos o culturales provocaron esta situación (causas) y qué cambió después (consecuencias).',
        'Pista 3: Si se trata de arte o arquitectura (románico, gótico), fíjate en los elementos constructivos característicos (tipo de arco, bóveda, luz y vanos).'
      ],
      reflectionQuestion: '¿En qué siglo o periodo se sitúa este acontecimiento y cuál fue el principal motivo que lo originó?'
    };
  }

  if (subjectId === 'fisica-quimica') {
    // 🔬 FÍSICA Y QUÍMICA - D. Roberto
    return {
      explanation: '¡Hola! Soy D. Roberto, tu tutor de Física y Química para 2º de ESO. En las ciencias experimentales aplicamos el método científico: observamos, identificamos las magnitudes físicas o sustancias químicas, y planteamos la ley o relación adecuada.',
      keyConcept: topicName || 'Física y Química (2º ESO LOMLOE)',
      hints: [
        'Pista 1: Identifica qué magnitudes intervienen en el problema (masa, volumen, tiempo, velocidad, fuerza) y comprueba sus unidades en el Sistema Internacional (SI).',
        'Pista 2: Si necesitas cambiar de unidades, aplica factores de conversión multiplicando por fracciones equivalentes.',
        'Pista 3: Si se trata de materia, distingue si es un cambio físico (la sustancia sigue siendo la misma) o un cambio químico (se forman sustancias nuevas con propiedades distintas).'
      ],
      reflectionQuestion: '¿Qué magnitudes físicas o sustancias químicas aparecen en el enunciado y qué unidades tienen?'
    };
  }

  // 📐 MATEMÁTICAS - Dña. Elena
  return {
    explanation: '¡Hola! Soy Dña. Elena, tu tutora de Matemáticas de 2º de ESO en el IES San José. Para resolver este ejercicio con seguridad matemática, vamos a descomponerlo en pasos lógicos siguiendo las propiedades oficiales.',
    keyConcept: topicName || 'Matemáticas (2º ESO LOMLOE)',
    hints: [
      'Pista 1: Revisa la jerarquía de las operaciones: primero paréntesis y corchetes, luego multiplicaciones y divisiones (de izquierda a derecha), y por último sumas y restas.',
      'Pista 2: Presta especial atención a la regla de los signos: (+)(+) = +, (-)(-) = +, (+)(-) = -, (-)(+) = -.',
      'Pista 3: Escribe el primer paso en un papel o aquí en el chat para comprobar que vas por buen camino.'
    ],
    reflectionQuestion: '¿Cuál es la primera operación prioritaria según la jerarquía matemática?'
  };
}

export async function requestSocraticChat(
  subjectId: SubjectId,
  message: string,
  topicName: string,
  history: { role: 'user' | 'assistant'; content: string }[]
): Promise<{
  explanation: string;
  keyConcept?: string;
  hints: string[];
  reflectionQuestion?: string;
}> {
  // 1. Try serverless / server route /api/tutor/chat
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    const response = await fetch('/api/tutor/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subjectId,
        message,
        topicName,
        conversationHistory: history
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && data.explanation && !data.error) {
        // Sanity check: Ensure English tutor doesn't accidentally output calculation text
        if (subjectId === 'ingles' && (data.explanation.includes('calcular') || data.explanation.includes('incógnita'))) {
          // Bad server response detected; fallback to subject-accurate response
          return generateSubjectSocraticResponse(subjectId, message, topicName, history);
        }
        return {
          explanation: data.explanation,
          keyConcept: data.keyConcept,
          hints: Array.isArray(data.hints) && data.hints.length > 0 ? data.hints : [
            'Revisa los conceptos básicos trabajados esta semana.',
            'Haz un primer intento razonado por pasos.',
            'Comprueba la coherencia de tu respuesta.'
          ],
          reflectionQuestion: data.reflectionQuestion || '¿Cuál crees que sería el primer paso para abordarlo?'
        };
      }
    }
  } catch (err) {
    console.info('Server chat API unreachable, checking direct AI or subject engine:', err);
  }

  // 2. Client-side direct Gemini call if API key is present
  const clientKey = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY) ||
    (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
    storage.getCustomApiKey();

  if (clientKey) {
    try {
      const { GoogleGenAI, Type } = await import('@google/genai');
      const ai = new GoogleGenAI({
        apiKey: clientKey,
        httpOptions: { headers: { 'User-Agent': 'tutorsanjose-client' } }
      });

      const subject = SUBJECTS.find(s => s.id === subjectId);
      const subjectName = subject?.name || subjectId;
      const tutorName = subject?.tutorName || 'Tutor Socrático';

      let subjectGuidance = '';
      if (subjectId === 'ingles') {
        subjectGuidance = 'Eres Ms. Davies, profesora y tutora socrática de Inglés para 2º de la ESO en el IES San José (Cuenca). PROHIBIDO hablar de "calcular", "fórmulas" o matemáticas. Es una clase de LENGUA EXTRANJERA: INGLÉS. Orienta sobre tiempos verbales (Past Simple, Present Continuous, Irregulars), vocabulario, comparativos, preposiciones y pronunciación.';
      } else if (subjectId === 'lengua') {
        subjectGuidance = 'Eres D. Santiago, tutor socrático de Lengua Castellana y Literatura para 2º ESO. Orienta sobre sintaxis (Sujeto, CD, CI, CC), morfología, ortografía y literatura sin usar términos de cálculo.';
      } else if (subjectId === 'geografia-historia') {
        subjectGuidance = 'Eres Dña. Carmen, tutora socrática de Geografía e Historia para 2º ESO. Orienta sobre historia medieval (Al-Ándalus, Reconquista, Alfonso VIII, Cuenca, feudalismo, románico/gótico) y geografía urbana.';
      } else if (subjectId === 'fisica-quimica') {
        subjectGuidance = 'Eres D. Roberto, tutor de Física y Química de 2º ESO. Orienta sobre el método científico, Sistema Internacional, densidad, estados de la materia y átomos.';
      } else {
        subjectGuidance = 'Eres Dña. Elena, tutora de Matemáticas de 2º ESO. Orienta sobre números enteros, álgebra, fracciones y geometría.';
      }

      const systemInstruction = `${subjectGuidance}
Currículo: LOMLOE Decreto 82/2022 de Castilla-La Mancha para alumnos de 13-14 años.
REGLA SOCRÁTICA INQUEBRANTABLE:
1. NUNCA des la respuesta final o solución directa.
2. Orienta al alumno con preguntas y pistas escalonadas adaptadas rigurosamente a la materia "${subjectName}".
3. Devuelve SIEMPRE JSON con:
- explanation (string de 2-3 frases orientadoras socráticas)
- keyConcept (string breve del concepto clave curricular)
- hints (array de 3 strings con pistas útiles y progresivas)
- reflectionQuestion (string con una pregunta para que el alumno razone)`;

      const historyFormatted = (history || []).slice(-4).map(h => `${h.role === 'user' ? 'Alumno' : tutorName}: ${h.content}`).join('\n');
      const prompt = `Tema de trabajo: ${topicName || 'General 2º ESO'}\nHistorial reciente:\n${historyFormatted}\n\nNueva consulta del alumno: ${message}`;

      const res = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
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

      const parsed = JSON.parse(res.text || '{}');
      if (parsed.explanation) {
        return {
          explanation: parsed.explanation,
          keyConcept: parsed.keyConcept || topicName,
          hints: Array.isArray(parsed.hints) ? parsed.hints : [],
          reflectionQuestion: parsed.reflectionQuestion
        };
      }
    } catch (clientErr) {
      console.warn('Direct client Gemini call failed, using subject Socratic engine:', clientErr);
    }
  }

  // 3. Fallback to specialized subject Socratic engine
  return generateSubjectSocraticResponse(subjectId, message, topicName, history);
}

