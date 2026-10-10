export type SubjectId = 
  | 'matematicas'
  | 'lengua'
  | 'geografia-historia'
  | 'fisica-quimica'
  | 'ingles';

export interface Subject {
  id: SubjectId;
  name: string;
  shortName: string;
  hoursPerWeek: number;
  color: string;
  accentClass: string;
  bgLightClass: string;
  darkAccentClass: string;
  iconName: string;
  description: string;
  tutorName: string;
  tutorRole: string;
  tutorAvatar: string;
  topics: {
    id: string;
    name: string;
    block: string;
    description: string;
    keyConcepts: string[];
  }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  subjectId: SubjectId;
  hints?: string[];
  revealedHintsCount?: number;
  reflectionQuestion?: string;
  keyConcept?: string;
  isThinking?: boolean;
}

export interface Challenge {
  id: string;
  subjectId: SubjectId;
  topicId?: string;
  topicName: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'facil' | 'medio' | 'reto';
  hints: string[];
}

export interface QuizAttempt {
  id: string;
  challengeId: string;
  subjectId: SubjectId;
  question: string;
  selectedOption: number;
  isCorrect: boolean;
  timestamp: string;
}

export interface AcademicTask {
  id: string;
  title: string;
  subjectId: SubjectId;
  dueDate: string; // YYYY-MM-DD
  dueTime?: string;
  type: 'examen' | 'deberes' | 'trabajo' | 'repaso';
  completed: boolean;
  priority: 'alta' | 'media' | 'baja';
  notes?: string;
}

export interface AcademicGrade {
  id: string;
  subjectId: SubjectId;
  title: string;
  score: number; // 0 to 10
  maxScore: number;
  date: string;
  term: '1º Trimestre' | '2º Trimestre' | '3º Trimestre';
  type: 'examen' | 'trabajo' | 'evaluacion_continua';
}

export interface StudySession {
  id: string;
  subjectId: SubjectId;
  durationMinutes: number;
  date: string; // YYYY-MM-DD
  topicCovered: string;
  exercisesDone: number;
}

export interface StudentProfile {
  name: string;
  grade: string;
  school: string;
  city: string;
  currentTerm: string;
  weeklyGoalHours: number;
}

export type ThemeMode = 'light' | 'dark' | 'system';
