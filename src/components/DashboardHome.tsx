import React, { useState } from 'react';
import { 
  Sparkles, 
  Calendar as CalendarIcon, 
  Award, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Circle, 
  AlertTriangle,
  Play,
  Square,
  BookOpen,
  Edit3
} from 'lucide-react';
import { AcademicTask, StudentProfile, Subject, SubjectId } from '../types';

interface DashboardHomeProps {
  profile: StudentProfile;
  subjects: Subject[];
  tasks: AcademicTask[];
  onSelectSubject: (id: SubjectId) => void;
  onNavigateToTab: (tab: 'tutors' | 'challenges' | 'calendar' | 'progress') => void;
  onToggleCompleteTask: (taskId: string) => void;
  onOpenReport: () => void;
  onOpenProfile: () => void;
  onAddStudySession?: (durationMinutes: number) => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  profile,
  subjects,
  tasks,
  onSelectSubject,
  onNavigateToTab,
  onToggleCompleteTask,
  onOpenReport,
  onOpenProfile,
  onAddStudySession
}) => {
  // Study timer state
  const [isStudying, setIsStudying] = useState(false);
  const [studySeconds, setStudySeconds] = useState(0);
  const [timerInterval, setTimerInterval] = useState<any>(null);

  const handleStartTimer = () => {
    setIsStudying(true);
    const interval = setInterval(() => {
      setStudySeconds(prev => prev + 1);
    }, 1000);
    setTimerInterval(interval);
  };

  const handleStopTimer = () => {
    setIsStudying(false);
    if (timerInterval) clearInterval(timerInterval);
    if (studySeconds >= 10 && onAddStudySession) {
      const mins = Math.max(1, Math.round(studySeconds / 60));
      onAddStudySession(mins);
    }
    setStudySeconds(0);
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSec = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(remainingSec).padStart(2, '0')}`;
  };

  // Urgent tasks and exams
  const upcomingExams = tasks.filter(t => t.type === 'examen' && !t.completed);
  const pendingTasks = tasks.filter(t => !t.completed).slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
              <span>{profile.school}</span>
              <span>·</span>
              <span>{profile.city}</span>
            </div>
            <button
              onClick={onOpenProfile}
              className="text-[11px] bg-white/10 hover:bg-white/20 text-slate-200 px-2.5 py-1 rounded-full transition-colors flex items-center gap-1"
              title="Cambiar el nombre del alumno"
            >
              <Edit3 className="w-3 h-3 text-blue-300" />
              <span>Cambiar nombre</span>
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            ¡Hola, {profile.name}! Listo para tu estudio de 2º ESO
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Tienes a tus 5 tutores personales listos para ayudarte a razonar paso a paso sin resolver los deberes por ti. Conecta con la materia que estés preparando hoy.
          </p>

          {/* Study Timer Widget */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {!isStudying ? (
              <button
                onClick={handleStartTimer}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Comenzar Sesión de Estudio</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-blue-900/60 border border-blue-500/40 px-3.5 py-1.5 rounded-lg text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono font-bold text-emerald-300">{formatTimer(studySeconds)}</span>
                <span className="text-slate-300">Tiempo de estudio en curso</span>
                <button
                  onClick={handleStopTimer}
                  className="ml-2 px-2 py-0.5 bg-rose-600 hover:bg-rose-500 text-white rounded text-[11px] font-semibold"
                >
                  Finalizar
                </button>
              </div>
            )}

            <button
              onClick={onOpenReport}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-lg backdrop-blur-xs transition-colors"
            >
              <span>Ver Informe Académico Oficial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Subtle decorative background watermark */}
        <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Urgent Exams Alert if any */}
      {upcomingExams.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-200">
                ¡Atención a tu próximo examen: {upcomingExams[0].title}!
              </h3>
              <p className="text-xs text-amber-800 dark:text-amber-300 mt-0.5">
                Fecha programada: {upcomingExams[0].dueDate} ({upcomingExams[0].dueTime || 'horario lectivo'}). Inicia un repaso socrático guiado.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              onSelectSubject(upcomingExams[0].subjectId);
              onNavigateToTab('tutors');
            }}
            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg shrink-0 transition-colors shadow-xs"
          >
            Repasar ahora con el tutor
          </button>
        </div>
      )}

      {/* 5 Subject Tutors Hub */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Tus 5 Tutores Especializados de 2º ESO
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Elige la asignatura con la que vas a trabajar hoy para iniciar tu tutoría.
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab('tutors')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            Ver todos los tutores <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {subjects.map(subject => (
            <div
              key={subject.id}
              onClick={() => {
                onSelectSubject(subject.id);
                onNavigateToTab('tutors');
              }}
              className="group cursor-pointer bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 hover:border-blue-500 dark:hover:border-blue-500 transition-all shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 transition-transform">
                    {subject.tutorAvatar}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 font-semibold">
                    {subject.hoursPerWeek}h/sem
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {subject.name}
                  </h3>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block line-clamp-1">
                    {subject.tutorName}
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {subject.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span>Abrir Tutor</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two columns: Daily Tasks & Quick Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pending Tasks & Homework for 2º ESO */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Deberes y Tareas para Esta Semana
              </h3>
            </div>
            <button
              onClick={() => onNavigateToTab('calendar')}
              className="text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              Ir a Calendario Completo
            </button>
          </div>

          <div className="space-y-2">
            {pendingTasks.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">
                ¡Enhorabuena! No tienes tareas pendientes registradas para hoy.
              </p>
            ) : (
              pendingTasks.map(task => {
                const sub = subjects.find(s => s.id === task.subjectId);
                return (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onToggleCompleteTask(task.id)}
                        className="text-slate-400 hover:text-blue-600 transition-colors"
                      >
                        <Circle className="w-4 h-4" />
                      </button>
                      <div>
                        <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                          {task.title}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {sub?.shortName} · Entrega: {task.dueDate}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                      {task.type}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Quick Review Challenges Widget */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Reto Diario Rápido
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              +10 pts
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
              Física y Química · 2º ESO CLM
            </span>
            <p className="font-medium text-slate-800 dark:text-slate-200">
              ¿Cuál es la unidad de la fuerza en el Sistema Internacional (SI) y por qué es una magnitud vectorial?
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Pon a prueba tus conocimientos antes del próximo examen del tema.
            </p>
          </div>

          <button
            onClick={() => {
              onSelectSubject('fisica-quimica');
              onNavigateToTab('challenges');
            }}
            className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <span>Responder a los Retos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
