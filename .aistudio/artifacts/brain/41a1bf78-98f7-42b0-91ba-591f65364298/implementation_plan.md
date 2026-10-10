# TutorSanJose - Tutor Personal Socrático de 2º ESO (IES San José, Cuenca)

Plataforma educativa inteligente diseñada específicamente para un alumno de 2º de la ESO del **IES San José (Cuenca, Castilla-La Mancha)**. Actúa como un tutor personal socrático con tutores dedicados para cada una de las 5 materias troncales oficiales (Matemáticas, Lengua Castellana y Literatura, Geografía e Historia, Física y Química, e Inglés), guiando mediante pistas y preguntas reflexivas sin resolver directamente las tareas, con calendario de exámenes, métricas de progreso mensual, exportación de informes en PDF y sincronización multidispositivo en tiempo real.

---

## Decisiones Críticas y Preferencias Confirmadas

> [!IMPORTANT]
> **Decisiones confirmadas por el usuario en la fase de entrevista:**
> - **Estilo pedagógico del tutor**: Método socrático riguroso con pistas graduales, preguntas de razonamiento y validación intermedia; el tutor nunca realiza los deberes por el alumno.
> - **Estilo visual y experiencia**: Panel académico moderno, sobrio y de alta legibilidad, con modo oscuro personalizable y soporte de visualización optimizada para sesiones largas de estudio.
> - **Materias oficiales**: Enfoque prioritario en las 5 materias troncales obligatorias de 2º de ESO según el Decreto 82/2022 de Castilla-La Mancha: *Matemáticas*, *Lengua Castellana y Literatura*, *Geografía e Historia*, *Física y Química*, y *Lengua Extranjera (Inglés)*.

---

## 1. Visión General y Concepto Central

### Qué hace la aplicación
**TutorSanJose** proporciona un ecosistema de estudio completo y disciplinado para el alumno y su familia:
1. **5 Tutores Especializados con IA (Gemini 3.8 Flash con Grounding Curricular)**: Cada asignatura cuenta con un tutor con personalidad docente cercana pero exigente, especializado en los saberes básicos de 2º de ESO de Castilla-La Mancha.
2. **Pedagogía Socrática Activa**: Cuando el alumno introduce un ejercicio o duda, el tutor analiza el enunciado, detecta el concepto subyacente y formula una pregunta guía o sugiere una pista progresiva (Nivel 1: Concepto clave, Nivel 2: Paso inicial, Nivel 3: Verificación de resultado intermedio).
3. **Generador de Retos, Quizzes y Preparador de Exámenes**: Desafíos diarios rápidos (Flash challenges), simulacros de examen adaptados a trimestres (1º, 2º y 3º trimestre) y fichas de repaso interactivas.
4. **Planificador Diario y Calendario Académico**: Registro interactivo de tareas pendientes, entregas de trabajos y fechas de exámenes del IES San José con recordatorios y avisos visuales de proximidad.
5. **Panel de Progreso y Rendimiento Mensual**: Métricas de constancia, dominio competencial por materia, gráficas de evolución mensual y mapa de fortalezas/áreas de mejora.
6. **Exportación de Informes en PDF**: Generación en un clic de boletines ejecutivos de seguimiento para la familia con notas registradas, tareas completadas, tiempo dedicado y valoración del tutor.
7. **Sincronización en Tiempo Real y Soporte Offline/Cloud**: Persistencia reactiva local con capacidad de sincronización en la nube y exportación segura de copias de seguridad.

### Audiencia Objetivo
- **Alumno de 2º de ESO (13-14 años)**: Necesita una interfaz atractiva, intuitiva, motivadora y que no abrume, con explicaciones claras ajustadas a su edad.
- **Padres y Tutores Legales**: Necesitan visibilidad transparente sobre el esfuerzo real, los exámenes próximos y la evolución académica mediante reportes claros.

---

## 2. Experiencia de Usuario y Diseño Visual

### Identidad Visual y Estilo (Conforme a la Constitución Frontend)
- **Dirección estética**: Panel académico editorial moderno (*Academic Studio*), limpio, sin elementos superfluos ni lenguaje de rol play confuso.
- **Paleta de color (Regla 60-30-10)**:
  - *60% Lienzo Neutral*: Blanco níveo suave (`#F8FAFC`) en modo claro; pizarra oscura profunda (`#0B0F19` y `#111827`) en modo oscuro.
  - *30% Superficies Estructurales*: Paneles con bordes sutiles de 1px (`#E2E8F0` / `#1F2937`), fondos de tarjeta limpios (`#FFFFFF` / `#161F30`), tipografía con contraste calibrado.
  - *10% Acentos Semánticos por Materia*:
    - **Matemáticas**: Azul zafiro (`#2563EB`)
    - **Física y Química**: Violeta índigo (`#6366F1`)
    - **Lengua y Literatura**: Ámbar cálido (`#D97706`)
    - **Geografía e Historia**: Esmeralda terracota (`#059669`)
    - **Inglés**: Cian atlántico (`#0891B2`)
- **Tipografía**:
  - Títulos y destacados: `Plus Jakarta Sans` (pesos 600 y 700, legibilidad cristalina y aire universitario contemporáneo).
  - Cuerpo de texto: `DM Sans` / sans-serif nativo equilibrado (15px/16px, espaciado cómodo para lectura de textos y enunciados).
  - Fórmulas y métricas: `font-mono tabular-nums` para expresiones algebraicas, fechas y porcentajes.
- **Modo Oscuro Personalizable**:
  - Selector de tema (Claro / Oscuro / Automático por sistema) con transición fluida sin parpadeos y reducción drástica de fatiga visual nocturna.

### Flujos Clave del Alumno
1. **Acceso al Panel Principal (Home / Dashboard)**:
   - Vista de saludo personalizado con frase motivadora, resumen del día (tareas urgentes, próximo examen a la vista).
   - Selector directo de los 5 tutores con indicador de estado y progreso curricular.
2. **Sesión de Tutoría Socrática**:
   - Chat interactivo con el tutor de la materia elegida.
   - Opciones rápidas integradas: "¿Puedes darme una pista?", "¿Por dónde empiezo?", "Comprueba si mi razonamiento es correcto", "Ponme un ejercicio similar para practicar".
   - Botón de "Modo Reto / Quiz" para generar 3 preguntas de autoevaluación al terminar una duda.
3. **Planificador y Calendario de Exámenes**:
   - Calendario mensual y semanal con código de color por asignatura.
   - Creación rápida de eventos (Examen, Entrega de deberes, Repaso programado).
   - Notificaciones activas de fechas límite inminentes (< 48 horas).
4. **Seguimiento del Rendimiento y Gráficas**:
   - Gráfica interactiva de horas de estudio y ejercicios superados por mes.
   - Distribución del tiempo entre asignaturas.
   - Registro de calificaciones obtenidas en exámenes reales para contrastar con el progreso en la app.
5. **Descarga de Reporte PDF**:
   - Generación instantánea de un documento formal de reporte académico con el membrete del IES San José de Cuenca, resumen de actividad del mes y desglose por asignaturas.

---

## 3. Decisiones de Producto y Currículo de 2º ESO (CLM LOMLOE)

### Currículo Integrado por Materia (Decreto 82/2022 de Castilla-La Mancha)
El sistema precarga los bloques de saberes básicos oficiales de 2º ESO para orientar al tutor y a las preguntas del generador de ejercicios:

1. **Matemáticas (4h/semana)**:
   - Números enteros, fracciones, decimales y operaciones combinadas con jerarquía.
   - Potencias, raíces cuadradas y proporcionalidad (directa, inversa, porcentajes).
   - Lenguaje algebraico, monomios, polinomios sencillos, ecuaciones de 1er y 2º grado.
   - Geometría plana, Teorema de Pitágoras, áreas y volúmenes de prismas, pirámides y cilindros.
   - Estadística descriptiva básica y probabilidad de Laplace.
2. **Lengua Castellana y Literatura (4h/semana)**:
   - Modalidades textuales: narración, descripción, exposición y argumentación elemental.
   - Morfosintaxis: clases de palabras, sintaxis de la oración simple (Sujeto, Predicado, CD, CI, CC, Atributo).
   - Semántica: sinonimia, antonimia, polisemia y familias léxicas.
   - Literatura: géneros literarios (lírica, narrativa, dramática), métrica y recursos retóricos.
3. **Física y Química (3h/semana)**:
   - Método científico, magnitudes, Sistema Internacional (SI) y factores de conversión.
   - Estados de agregación de la materia, teoría cinético-molecular, mezclas y disoluciones.
   - Estructura atómica elemental, elementos químicos y tabla periódica básica.
   - Movimiento: velocidad constante, aceleración conceptual y fuerzas en la vida cotidiana.
   - Energía, calor, temperatura y fuentes energéticas sostenibles.
4. **Geografía e Historia (3h/semana)**:
   - La Edad Media: Bizancio, el Islam, Al-Ándalus (emirato, califato y taifas; reconquista y repoblación en Castilla y Cuenca).
   - El feudalismo, las cruzadas, el resurgir urbano y el arte Románico y Gótico.
   - El inicio de la Edad Moderna: descubrimientos geográficos, Renacimiento, Humanismo y los Reyes Católicos.
   - Geografía humana: demografía, poblamiento urbano y rural, sostenibilidad ambiental.
5. **Lengua Extranjera - Inglés (4h/semana)**:
   - Gramática: Present Simple & Continuous, Past Simple & Continuous, Present Perfect, Future (will / be going to), modal verbs (can, must, should), first conditional, comparatives & superlatives.
   - Habilidades: Reading comprehension, writing de cartas/emails cortos, vocabulario de hobbies, colegio, naturaleza y tecnología.

### Motor Socrático Anti-Resolución Automática
- Regla de oro en el *System Instruction* de cada tutor:
  > *"Tu rol es de tutor personal socrático para un estudiante de 13-14 años de 2º de ESO. Tienes terminantemente prohibido darle al alumno la solución final de sus deberes o redactar sus trabajos por él. Si el alumno te pega un ejercicio o pregunta de examen, desglosa el problema en pasos lógicos, pregúntale qué fórmula o concepto cree que se aplica, proporciónale pistas graduales y felicita su razonamiento cuando avance correctamente."*

---

## 4. Arquitectura Técnica y Estrategia de Datos

```
┌────────────────────────────────────────────────────────────────────────┐
│                        TutorSanJose Web Client                         │
│                                                                        │
│  ┌───────────────────────┐  ┌───────────────────────────────────────┐  │
│  │   Navigation / Nav    │  │   Theme Toggle (Dark/Light/System)    │  │
│  └───────────┬───────────┘  └───────────────────┬───────────────────┘  │
│              ▼                                  ▼                      │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                        App Router / Tabs                         │  │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────┐ │  │
│  │  │ Panel Inicio │ │ Tutores (5)  │ │ Calendario   │ │ Progreso │ │  │
│  │  │ & Tareas     │ │ Socráticos   │ │ & Exámenes   │ │ & PDF    │ │  │
│  │  └───────┬──────┘ └───────┬──────┘ └───────┬──────┘ └────┬─────┘ │  │
│  └──────────┼────────────────┼────────────────┼─────────────┼───────┘  │
│             │                │                │             │          │
│  ┌──────────▼────────────────▼────────────────▼─────────────▼───────┐  │
│  │               Client State Store & Local Persistence             │  │
│  │ (IndexedDB / localStorage con exportación / importación JSON)   │  │
│  └───────────────────────────┬──────────────────────────────────────┘  │
└──────────────────────────────┼─────────────────────────────────────────┘
                               │ HTTP Fetch / Proxy
                               ▼
┌────────────────────────────────────────────────────────────────────────┐
│                  Express Server Backend (/server.ts)                   │
│                                                                        │
│  ┌──────────────────────┐  ┌─────────────────┐  ┌───────────────────┐  │
│  │ /api/tutor/chat      │  │ /api/tutor/quiz │  │ /api/sync/backup  │  │
│  │ Gemini 3.8 Flash     │  │ Generador Retos │  │ Cloud Sync Mirror │  │
│  └──────────┬───────────┘  └────────┬────────┘  └───────────────────┘  │
│             │                       │                                  │
│             └───────────┬───────────┘                                  │
│                         ▼                                              │
│  ┌───────────────────────────────────────────┐                         │
│  │ Google GenAI SDK (@google/genai)          │                         │
│  │ model: "gemini-3.8-flash"                 │                         │
│  │ User-Agent: "aistudio-build"              │                         │
│  │ Curricular Prompting LOMLOE CLM 2º ESO    │                         │
│  └───────────────────────────────────────────┘                         │
└────────────────────────────────────────────────────────────────────────┘
```

### Componentes Principales
1. **`Navbar`**:
   - Cabecera conforme a la Constitución Frontend: Wordmark institucional ("TutorSanJose · 2º ESO IES San José"), enlaces de navegación de una línea (`whitespace-nowrap`), selector de tema y botón de acceso rápido.
2. **`SubjectSelector`**:
   - Selector de las 5 materias con los colores y descriptores curriculares oficiales de Castilla-La Mancha.
3. **`SocraticChat`**:
   - Chat interactivo con streaming/respuestas rápidas, formateo de fórmulas matemáticas, bloques de código para inglés y botones de acción rápida ("Dame una pista", "Ponme un reto de este tema", "Explícamelo con un ejemplo").
4. **`ChallengeGenerator`**:
   - Herramienta para generar cuestionarios tipo test de 3 a 5 preguntas con feedback explicativo inmediato tras cada respuesta.
5. **`AcademicCalendar`**:
   - Calendario interactivo mensual y semanal para registrar exámenes del IES San José, fechas de entrega de trabajos y sesiones de estudio programadas.
6. **`ProgressMetrics`**:
   - Cuadros de mando con gráficos de evolución mensual, desglose de tiempo por materia, control de racha de estudio y notas obtenidas.
7. **`ReportGenerator`**:
   - Generador y vista previa de reporte formal académico con botón de descarga en PDF (`print-to-pdf` estilizado profesionalmente con CSS `@media print`).

### Protocolo de Verificación
- Verificación de compilación estricta con `compile_applet` tras completar todos los módulos.
- Comprobación de que no existan llamadas directas al SDK de Gemini desde el cliente (todas a través del backend Express `/api/tutor`).
- Pruebas de funcionamiento del modo oscuro, exportación en PDF y persistencia en recargas de página.
