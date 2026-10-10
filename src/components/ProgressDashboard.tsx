import React, { useState } from 'react';
import { 
  TrendingUp, 
  Award, 
  Clock, 
  Plus, 
  BarChart3, 
  CheckCircle2, 
  BookOpen,
  Calendar,
  Sparkles,
  RotateCcw,
  Trash2,
  Check,
  AlertCircle
} from 'lucide-react';
import { AcademicGrade, QuizAttempt, StudySession, Subject, SubjectId } from '../types';

interface ProgressDashboardProps {
  subjects: Subject[];
  grades: AcademicGrade[];
  sessions: StudySession[];
  attempts: QuizAttempt[];
  onAddGrade: (grade: AcademicGrade) => void;
  onResetMonthlyProgress: (yearMonth?: string) => void;
  onResetAllProgress: () => void;
  onAddSession: (session: StudySession) => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  subjects,
  grades,
  sessions,
  attempts,
  onAddGrade,
  onResetMonthlyProgress,
  onResetAllProgress,
  onAddSession
}) => {
  const [isAddGradeOpen, setIsAddGradeOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isAddSessionOpen, setIsAddSessionOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // New Grade state
  const [newSubjectId, setNewSubjectId] = useState<SubjectId>('matematicas');
  const [newTitle, setNewTitle] = useState('');
  const [newScore, setNewScore] = useState<number>(8.5);
  const [newDate, setNewDate] = useState('2026-10-10');
  const [newTerm, setNewTerm] = useState<'1º Trimestre' | '2º Trimestre' | '3º Trimestre'>('1º Trimestre');

  // New Session state
  const [sessionSubjectId, setSessionSubjectId] = useState<SubjectId>('matematicas');
  const [sessionMinutes, setSessionMinutes] = useState<number>(45);
  const [sessionDate, setSessionDate] = useState('2026-10-10');
  const [sessionTopic, setSessionTopic] = useState('');

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const grade: AcademicGrade = {
      id: 'gr-' + Date.now(),
      subjectId: newSubjectId,
      title: newTitle.trim(),
      score: Number(newScore),
      maxScore: 10,
      date: newDate,
      term: newTerm,
      type: 'examen'
    };

    onAddGrade(grade);
    setIsAddGradeOpen(false);
    setNewTitle('');
    setNewScore(8.5);
    triggerNotification('Calificación guardada correctamente.');
  };

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    const session: StudySession = {
      id: 'ses-' + Date.now(),
      subjectId: sessionSubjectId,
      durationMinutes: Number(sessionMinutes),
      date: sessionDate,
      topicCovered: sessionTopic.trim() || 'Estudio y resolución de dudas',
      exercisesDone: 5
    };
    onAddSession(session);
    setIsAddSessionOpen(false);
    setSessionTopic('');
    triggerNotification(`Registrados ${sessionMinutes} minutos de estudio.`);
  };

  // Real calculations from stored state
  const totalGradesScore = grades.reduce((acc, g) => acc + g.score, 0);
  const overallAverage = grades.length > 0 ? (totalGradesScore / grades.length).toFixed(2) : '0.00';

  const totalStudyMinutes = sessions.reduce((acc, ses) => acc + ses.durationMinutes, 0);
  const totalStudyHours = (totalStudyMinutes / 60).toFixed(1);

  const correctAttempts = attempts.filter(a => a.isCorrect).length;
  const totalAttempts = attempts.length;
  const accuracyPercent = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;

  // Dynamic monthly aggregation based on real sessions
  const academicMonths = [
    { key: '2026-09', label: 'Sep 2026' },
    { key: '2026-10', label: 'Oct 2026' },
    { key: '2026-11', label: 'Nov 2026' },
    { key: '2026-12', label: 'Dic 2026' }
  ];

  const monthlyData = academicMonths.map(m => {
    const monthSessions = sessions.filter(s => s.date.startsWith(m.key));
    const mins = monthSessions.reduce((acc, s) => acc + s.durationMinutes, 0);
    return {
      key: m.key,
      month: m.label,
      hours: Number((mins / 60).toFixed(1)),
      sessionsCount: monthSessions.length
    };
  });

  const maxHours = Math.max(...monthlyData.map(m => m.hours), 12);
  const currentMonthData = monthlyData.find(m => m.key === '2026-10') || monthlyData[1];

  // Subject performance calculation from real sessions & grades
  const subjectStats = subjects.map(s => {
    const sGrades = grades.filter(g => g.subjectId === s.id);
    const avg = sGrades.length > 0 ? (sGrades.reduce((acc, g) => acc + g.score, 0) / sGrades.length).toFixed(1) : '-';
    const sSessions = sessions.filter(ses => ses.subjectId === s.id);
    const sMinutes = sSessions.reduce((acc, ses) => acc + ses.durationMinutes, 0);

    return {
      subject: s,
      average: avg,
      gradesCount: sGrades.length,
      totalMinutes: sMinutes,
      totalHours: (sMinutes / 60).toFixed(1)
    };
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Seguimiento del Rendimiento Académico
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Métricas de horas dedicadas y calificaciones oficiales de 2º de ESO (IES San José, Cuenca).
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsResetModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors border border-slate-200 dark:border-slate-700 shadow-xs"
            title="Resetear el progreso mensual para empezar de cero"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-500" />
            <span>Resetear Progreso Mensual</span>
          </button>

          <button
            onClick={() => setIsAddSessionOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs font-semibold transition-colors border border-emerald-200 dark:border-emerald-800 shadow-xs"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>+ Tiempo de Estudio</span>
          </button>

          <button
            onClick={() => setIsAddGradeOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Registrar Calificación</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row (Real Data) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-1">
            Nota Media Global
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">
              {overallAverage}
            </span>
            <span className="text-xs text-slate-400 font-mono">/ 10</span>
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 block font-medium">
            {Number(overallAverage) >= 7 ? 'Notable en 2º ESO' : Number(overallAverage) >= 5 ? 'Aprobado' : 'A reforzar'}
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-1">
            Exámenes Registrados
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 font-mono">
              {grades.length}
            </span>
            <span className="text-xs text-slate-400">evaluaciones</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {grades.filter(g => g.score >= 5).length} de {grades.length} aprobadas
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-1">
              Tiempo de Estudio Activo
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold font-mono">
              {currentMonthData.hours}h este mes
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 font-mono">
              {totalStudyHours}
            </span>
            <span className="text-xs text-slate-400 font-mono">horas</span>
          </div>
          <span className="text-[11px] text-blue-600 dark:text-blue-400 mt-1 block font-medium">
            {sessions.length} sesiones acumuladas
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-1">
            Retos Superados
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-500 font-mono">
              {correctAttempts}
            </span>
            <span className="text-xs text-slate-400">/ {totalAttempts} respondidos</span>
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 block font-medium">
            {accuracyPercent}% de precisión en test
          </span>
        </div>
      </div>

      {/* Main Charts & Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Progression Chart (Dynamic from sessions) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Evolución de Horas de Estudio por Mes (Real)
              </h3>
            </div>
            <span className="text-xs text-slate-400">Curso 2026/2027</span>
          </div>

          <div className="h-56 flex items-end justify-between gap-6 px-4 pt-6 pb-2">
            {monthlyData.map((item, idx) => {
              const heightPercent = item.hours > 0 ? Math.min(100, Math.max(10, (item.hours / maxHours) * 100)) : 6;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono">
                    {item.hours > 0 ? `${item.hours}h` : '0h'}
                  </span>

                  <div className="w-full max-w-[48px] bg-slate-100 dark:bg-slate-800 rounded-t-lg overflow-hidden flex items-end h-40">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        item.hours > 0
                          ? 'bg-gradient-to-t from-blue-600 to-indigo-500'
                          : 'bg-slate-200 dark:bg-slate-700'
                      }`}
                    />
                  </div>

                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg text-xs text-slate-600 dark:text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>Objetivo mensual recomendado para 2º ESO: <strong>16 horas</strong></span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold font-mono">
              Horas registradas en Octubre: {currentMonthData.hours}h ({currentMonthData.sessionsCount} sesiones)
            </span>
          </div>
        </div>

        {/* Subjects Performance Breakdown */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Rendimiento por Materia (2º ESO)
            </h3>
            <span className="text-xs text-slate-400">Notas sobre 10</span>
          </div>

          <div className="space-y-3.5">
            {subjectStats.map(stat => (
              <div key={stat.subject.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {stat.subject.name}
                  </span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-slate-400 text-[11px]">{stat.totalHours}h estudio</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      {stat.average}
                    </span>
                  </div>
                </div>

                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    style={{
                      width: stat.average !== '-' ? `${(Number(stat.average) / 10) * 100}%` : '50%',
                      backgroundColor: stat.subject.color
                    }}
                    className="h-full rounded-full transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grades History Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Histórico de Calificaciones Registradas
          </h3>
          <span className="text-xs text-slate-400">
            {grades.length} evaluaciones en el IES San José
          </span>
        </div>

        {grades.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-6">
            No hay calificaciones registradas. Haz clic en "Registrar Calificación" para añadir las notas oficiales de tu hijo.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-2.5 px-3">Fecha</th>
                  <th className="py-2.5 px-3">Materia</th>
                  <th className="py-2.5 px-3">Evaluación / Examen</th>
                  <th className="py-2.5 px-3">Trimestre</th>
                  <th className="py-2.5 px-3 text-right">Calificación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {grades.map(grade => {
                  const sub = subjects.find(s => s.id === grade.subjectId);
                  const scoreNumber = grade.score;
                  let badgeClass = 'text-blue-600 dark:text-blue-400';
                  if (scoreNumber >= 9) badgeClass = 'text-emerald-600 dark:text-emerald-400';
                  else if (scoreNumber < 5) badgeClass = 'text-rose-600 dark:text-rose-400';

                  return (
                    <tr key={grade.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="py-2.5 px-3 font-mono text-slate-500">{grade.date}</td>
                      <td className="py-2.5 px-3 font-medium text-slate-800 dark:text-slate-200">
                        {sub?.shortName || grade.subjectId}
                      </td>
                      <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">
                        {grade.title}
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">{grade.term}</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-sm">
                        <span className={badgeClass}>{grade.score.toFixed(2)}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: Reset Progress (Monthly / All) */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-rose-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Resetear Progreso y Horas de Estudio
                </h3>
              </div>
              <button
                onClick={() => setIsResetModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Selecciona qué datos deseas reiniciar para que las estadísticas reflejen exactamente el uso real que has hecho de la aplicación:
            </p>

            <div className="space-y-3">
              {/* Option 1: Current month only */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">
                    Resetear solo el mes actual (Octubre 2026)
                  </span>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono font-bold">
                    {currentMonthData.hours}h actuales
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Borra las sesiones de estudio del mes en curso y pone el contador de este mes a <strong>0.0 horas</strong>, manteniendo los meses anteriores.
                </p>
                <button
                  onClick={() => {
                    onResetMonthlyProgress('2026-10');
                    setIsResetModalOpen(false);
                    triggerNotification('Progreso del mes actual reseteado a 0 horas.');
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-colors"
                >
                  Confirmar reseteo de Octubre 2026
                </button>
              </div>

              {/* Option 2: Reset all study progress */}
              <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-rose-900 dark:text-rose-200">
                    Resetear TODO el progreso acumulado
                  </span>
                  <span className="text-[10px] text-rose-600 dark:text-rose-400 font-mono font-bold">
                    {totalStudyHours}h totales
                  </span>
                </div>
                <p className="text-[11px] text-rose-700 dark:text-rose-300">
                  Borra todas las sesiones históricas y el registro de retos respondidos, dejando todos los contadores de horas a cero.
                </p>
                <button
                  onClick={() => {
                    onResetAllProgress();
                    setIsResetModalOpen(false);
                    triggerNotification('Todo el progreso y horas de estudio han sido reseteados a 0.');
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors"
                >
                  Poner todos los contadores a CERO
                </button>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setIsResetModalOpen(false)}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-medium"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Manual Study Session */}
      {isAddSessionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Registrar Tiempo de Estudio Real
                </h3>
              </div>
              <button
                onClick={() => setIsAddSessionOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSession} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                  Materia estudiada *
                </label>
                <select
                  value={sessionSubjectId}
                  onChange={(e) => setSessionSubjectId(e.target.value as SubjectId)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                    Duración (minutos) *
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="300"
                    step="5"
                    required
                    value={sessionMinutes}
                    onChange={(e) => setSessionMinutes(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                    Fecha *
                  </label>
                  <input
                    type="date"
                    required
                    value={sessionDate}
                    onChange={(e) => setSessionDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                  Tema o tarea abordada (opcional)
                </label>
                <input
                  type="text"
                  value={sessionTopic}
                  onChange={(e) => setSessionTopic(e.target.value)}
                  placeholder="Ej: Repaso de ecuaciones o vocabulario de inglés..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddSessionOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold shadow-xs"
                >
                  Añadir Sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Grade */}
      {isAddGradeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Registrar Calificación Obtenida
              </h3>
              <button
                onClick={() => setIsAddGradeOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateGrade} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                  Materia *
                </label>
                <select
                  value={newSubjectId}
                  onChange={(e) => setNewSubjectId(e.target.value as SubjectId)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                  Título o tema del examen *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ej: Examen Tema 3: Álgebra y monomios..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                    Nota obtenida (0 a 10) *
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    max="10"
                    required
                    value={newScore}
                    onChange={(e) => setNewScore(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                    Trimestre
                  </label>
                  <select
                    value={newTerm}
                    onChange={(e) => setNewTerm(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="1º Trimestre">1º Trimestre</option>
                    <option value="2º Trimestre">2º Trimestre</option>
                    <option value="3º Trimestre">3º Trimestre</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                  Fecha de la nota *
                </label>
                <input
                  type="date"
                  required
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddGradeOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold shadow-xs"
                >
                  Guardar Calificación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
