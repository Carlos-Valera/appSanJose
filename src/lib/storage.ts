import { 
  AcademicGrade, 
  AcademicTask, 
  Challenge,
  ChatMessage, 
  QuizAttempt, 
  StudentProfile, 
  StudySession, 
  SubjectId, 
  ThemeMode 
} from '../types';
import { INITIAL_CHALLENGES } from '../data/curriculum';

const STORAGE_KEYS = {
  PROFILE: 'tutorsanjose_profile_v1',
  TASKS: 'tutorsanjose_tasks_v1',
  GRADES: 'tutorsanjose_grades_v1',
  CHATS: 'tutorsanjose_chats_v1',
  ATTEMPTS: 'tutorsanjose_attempts_v1',
  CHALLENGES: 'tutorsanjose_challenges_v1',
  SESSIONS: 'tutorsanjose_sessions_v1',
  THEME: 'tutorsanjose_theme_v1',
  LAST_SYNC: 'tutorsanjose_last_sync_v1',
  CUSTOM_API_KEY: 'tutorsanjose_custom_gemini_api_key_v1'
};

const DEFAULT_PROFILE: StudentProfile = {
  name: 'Pablo Valera',
  grade: '2º de ESO',
  school: 'IES San José',
  city: 'Cuenca (Castilla-La Mancha)',
  currentTerm: '2º Trimestre',
  weeklyGoalHours: 12
};

// Seed realistic initial tasks for 2º ESO at IES San José
const DEFAULT_TASKS: AcademicTask[] = [
  {
    id: 'task-1',
    title: 'Examen Unidad 4: Álgebra y Ecuaciones',
    subjectId: 'matematicas',
    dueDate: '2026-10-15',
    dueTime: '10:15',
    type: 'examen',
    completed: false,
    priority: 'alta',
    notes: 'Entran monomios, polinomios y ecuaciones con paréntesis y denominadores.'
  },
  {
    id: 'task-2',
    title: 'Análisis sintáctico de 5 oraciones simples',
    subjectId: 'lengua',
    dueDate: '2026-10-13',
    dueTime: '08:30',
    type: 'deberes',
    completed: false,
    priority: 'media',
    notes: 'Identificar CD, CI, Atributo y CC de la ficha dada en clase.'
  },
  {
    id: 'task-3',
    title: 'Examen de Al-Ándalus y la Reconquista en Cuenca',
    subjectId: 'geografia-historia',
    dueDate: '2026-10-18',
    dueTime: '12:45',
    type: 'examen',
    completed: false,
    priority: 'alta',
    notes: 'Repasar la toma de Cuenca en 1177 por Alfonso VIII y el arte románico.'
  },
  {
    id: 'task-4',
    title: 'Informe del laboratorio: Separación de mezclas',
    subjectId: 'fisica-quimica',
    dueDate: '2026-10-14',
    dueTime: '11:15',
    type: 'trabajo',
    completed: false,
    priority: 'media',
    notes: 'Explicar filtración y decantación con esquema de material.'
  },
  {
    id: 'task-5',
    title: 'Short composition: "My last summer trip"',
    subjectId: 'ingles',
    dueDate: '2026-10-16',
    dueTime: '09:15',
    type: 'deberes',
    completed: false,
    priority: 'baja',
    notes: 'Utilizar 6 verbos irregulares en Past Simple y conectores temporales.'
  }
];

const DEFAULT_GRADES: AcademicGrade[] = [
  {
    id: 'gr-1',
    subjectId: 'matematicas',
    title: 'Examen Tema 1: Números enteros y jerarquía',
    score: 8.5,
    maxScore: 10,
    date: '2026-09-28',
    term: '1º Trimestre',
    type: 'examen'
  },
  {
    id: 'gr-2',
    subjectId: 'matematicas',
    title: 'Control Tema 2: Fracciones y decimales',
    score: 7.75,
    maxScore: 10,
    date: '2026-10-05',
    term: '1º Trimestre',
    type: 'examen'
  },
  {
    id: 'gr-3',
    subjectId: 'lengua',
    title: 'Comentario de texto y tipos de texto',
    score: 8.0,
    maxScore: 10,
    date: '2026-10-02',
    term: '1º Trimestre',
    type: 'examen'
  },
  {
    id: 'gr-4',
    subjectId: 'geografia-historia',
    title: 'Examen: El Islam y Bizancio',
    score: 9.0,
    maxScore: 10,
    date: '2026-09-30',
    term: '1º Trimestre',
    type: 'examen'
  },
  {
    id: 'gr-5',
    subjectId: 'fisica-quimica',
    title: 'Examen: El método científico y el SI',
    score: 8.25,
    maxScore: 10,
    date: '2026-10-03',
    term: '1º Trimestre',
    type: 'examen'
  },
  {
    id: 'gr-6',
    subjectId: 'ingles',
    title: 'Vocabulary & Grammar Unit 1',
    score: 8.75,
    maxScore: 10,
    date: '2026-10-04',
    term: '1º Trimestre',
    type: 'examen'
  }
];

const DEFAULT_SESSIONS: StudySession[] = [
  {
    id: 'ses-1',
    subjectId: 'matematicas',
    durationMinutes: 45,
    date: '2026-10-06',
    topicCovered: 'Resolución de ecuaciones de primer grado',
    exercisesDone: 6
  },
  {
    id: 'ses-2',
    subjectId: 'lengua',
    durationMinutes: 35,
    date: '2026-10-07',
    topicCovered: 'Reconocimiento de Complemento Directo e Indirecto',
    exercisesDone: 5
  },
  {
    id: 'ses-3',
    subjectId: 'fisica-quimica',
    durationMinutes: 40,
    date: '2026-10-08',
    topicCovered: 'Factores de conversión y cambio de unidades',
    exercisesDone: 4
  },
  {
    id: 'ses-4',
    subjectId: 'geografia-historia',
    durationMinutes: 50,
    date: '2026-10-09',
    topicCovered: 'Historia de Cuenca en 1177 y el Fuero',
    exercisesDone: 3
  },
  {
    id: 'ses-5',
    subjectId: 'ingles',
    durationMinutes: 30,
    date: '2026-10-09',
    topicCovered: 'Past Simple vs Past Continuous',
    exercisesDone: 8
  }
];

export const storage = {
  getProfile(): StudentProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return data ? JSON.parse(data) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  },
  saveProfile(profile: StudentProfile): void {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  },

  getTasks(): AcademicTask[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TASKS);
      return data ? JSON.parse(data) : DEFAULT_TASKS;
    } catch {
      return DEFAULT_TASKS;
    }
  },
  saveTasks(tasks: AcademicTask[]): void {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  },

  getGrades(): AcademicGrade[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.GRADES);
      return data ? JSON.parse(data) : DEFAULT_GRADES;
    } catch {
      return DEFAULT_GRADES;
    }
  },
  saveGrades(grades: AcademicGrade[]): void {
    localStorage.setItem(STORAGE_KEYS.GRADES, JSON.stringify(grades));
  },

  getChats(subjectId?: SubjectId): Record<SubjectId, ChatMessage[]> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CHATS);
      const parsed = data ? JSON.parse(data) : {};
      const subjects: SubjectId[] = ['matematicas', 'lengua', 'geografia-historia', 'fisica-quimica', 'ingles'];
      for (const s of subjects) {
        if (!parsed[s]) parsed[s] = [];
      }
      return parsed;
    } catch {
      return {
        matematicas: [],
        lengua: [],
        'geografia-historia': [],
        'fisica-quimica': [],
        ingles: []
      };
    }
  },
  saveChats(chats: Record<SubjectId, ChatMessage[]>): void {
    localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(chats));
  },

  getAttempts(): QuizAttempt[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  saveAttempts(attempts: QuizAttempt[]): void {
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(attempts));
  },

  getChallenges(): Challenge[] {
    const shuffleChallenge = (c: Challenge): Challenge => {
      if (!c.options || c.options.length < 2) return c;
      const correctText = c.options[c.correctIndex];
      let hash = 0;
      for (let i = 0; i < c.id.length; i++) hash = (hash * 31 + c.id.charCodeAt(i)) & 0xffffffff;
      const shuffled = [...c.options];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.abs((hash + i * 17) % (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return {
        ...c,
        options: shuffled,
        correctIndex: shuffled.indexOf(correctText)
      };
    };

    try {
      const data = localStorage.getItem(STORAGE_KEYS.CHALLENGES);
      if (!data) return INITIAL_CHALLENGES.map(shuffleChallenge);
      const customList = JSON.parse(data) as Challenge[];
      const customIds = new Set(customList.map(c => c.id));
      const merged = [...customList];
      for (const init of INITIAL_CHALLENGES) {
        if (!customIds.has(init.id)) {
          merged.push(init);
        }
      }
      return merged.map(shuffleChallenge);
    } catch {
      return INITIAL_CHALLENGES.map(shuffleChallenge);
    }
  },
  saveChallenges(challenges: Challenge[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CHALLENGES, JSON.stringify(challenges));
    } catch (e) {
      console.warn('Error saving challenges to storage:', e);
    }
  },

  getSessions(): StudySession[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      return data ? JSON.parse(data) : DEFAULT_SESSIONS;
    } catch {
      return DEFAULT_SESSIONS;
    }
  },
  saveSessions(sessions: StudySession[]): void {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  },

  getTheme(): ThemeMode {
    try {
      const theme = localStorage.getItem(STORAGE_KEYS.THEME) as ThemeMode;
      return theme || 'system';
    } catch {
      return 'system';
    }
  },
  saveTheme(theme: ThemeMode): void {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },

  getLastSync(): string | null {
    return localStorage.getItem(STORAGE_KEYS.LAST_SYNC);
  },
  setLastSync(timestamp: string): void {
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, timestamp);
  },

  getCustomApiKey(): string {
    return localStorage.getItem(STORAGE_KEYS.CUSTOM_API_KEY) || '';
  },
  saveCustomApiKey(key: string): void {
    if (key.trim()) {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_API_KEY, key.trim());
    } else {
      localStorage.removeItem(STORAGE_KEYS.CUSTOM_API_KEY);
    }
  },

  // Reset progress methods
  resetMonthlyProgress(yearMonth?: string): void {
    const targetMonth = yearMonth || new Date().toISOString().slice(0, 7); // e.g. "2026-10"
    const currentSessions = this.getSessions();
    const remaining = currentSessions.filter(s => !s.date.startsWith(targetMonth));
    this.saveSessions(remaining);
  },

  resetAllProgress(): void {
    this.saveSessions([]);
    this.saveAttempts([]);
  },

  addSession(session: StudySession): void {
    const existing = this.getSessions();
    const updated = [session, ...existing];
    this.saveSessions(updated);
  },

  // Export complete academic database as JSON
  exportData(): string {
    const fullState = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      profile: this.getProfile(),
      tasks: this.getTasks(),
      grades: this.getGrades(),
      chats: this.getChats(),
      attempts: this.getAttempts(),
      sessions: this.getSessions()
    };
    return JSON.stringify(fullState, null, 2);
  },

  // Import and restore database from JSON
  importData(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.profile) this.saveProfile(data.profile);
      if (data.tasks) this.saveTasks(data.tasks);
      if (data.grades) this.saveGrades(data.grades);
      if (data.chats) this.saveChats(data.chats);
      if (data.attempts) this.saveAttempts(data.attempts);
      if (data.sessions) this.saveSessions(data.sessions);
      this.setLastSync(new Date().toISOString());
      return true;
    } catch (e) {
      console.error('Failed to import backup data:', e);
      return false;
    }
  }
};
