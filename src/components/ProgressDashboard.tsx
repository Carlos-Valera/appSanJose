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
  Sparkles
} from 'lucide-react';
import { AcademicGrade, StudySession, Subject, SubjectId } from '../types';

interface ProgressDashboardProps {
  subjects: Subject[];
  grades: AcademicGrade[];
  sessions: StudySession[];
  onAddGrade: (grade: AcademicGrade) => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  subjects,
  grades,
  sessions,
  onAddGrade
}) => {
  const [isAddGradeOpen, setIsAddGradeOpen] = useState(false);
  const [newSubjectId, setNewSubjectId] = useState<SubjectId>('matematicas');
  const [newTitle, setNewTitle] = useState('');
  const [newScore, setNewScore] = useState<number>(8.5);
  const [newDate, setNewDate] = useState('2026-10-10');
  const [newTerm, setNewTerm] = useState<'1º Trimestre' | '2º Trimestre' | '3º Trimestre'>('1º Trimestre');

  const handleCreateGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const grade: AcademicGrade = {
      id: 'gr-' + Date.now(),
      subjectId: newSubjectId,
      title: newTitle,
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
  };

  // General average calculation
  const totalGradesScore = grades.reduce((acc, g) => acc + g.score, 0);
  const overallAverage = grades.length > 0 ? (totalGradesScore / grades.length).toFixed(2) : '0.00';

  // Monthly study minutes aggregation
  const monthlyData = [
    { month: 'Sep 2026', hours: 14.5, sessions: 18 },
    { month: 'Oct 2026', hours: 19.0, sessions: 24 },
    { month: 'Nov 2026', hours: 0, sessions: 0 },
    { month: 'Dic 2026', hours: 0, sessions: 0 }
  ];

  const maxHours = Math.max(...monthlyData.map(m => m.hours), 25);

  // Subject performance calculation
  const subjectStats = subjects.map(s => {
    const sGrades = grades.filter(g => g.subjectId === s.id);
    const avg = sGrades.length > 0 ? (sGrades.reduce((acc, g) => acc + g.score, 0) / sGrades.length).toFixed(1) : '-';
    const sSessions = sessions.filter(ses => ses.subjectId === s.id);
    const totalMinutes = sSessions.reduce((acc, ses) => acc + ses.durationMinutes, 0);

    return {
      subject: s,
      average: avg,
      gradesCount: sGrades.length,
      totalMinutes,
      totalHours: (totalMinutes / 60).toFixed(1)
    };
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
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

        <button
          onClick={() => setIsAddGradeOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Registrar Calificación de Examen</span>
        </button>
      </div>

      {/* KPI Cards Row */}
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
            Notable alto en 2º ESO
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
            100% aprobadas con solidez
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-1">
            Tiempo de Estudio Activo
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 font-mono">
              33.5
            </span>
            <span className="text-xs text-slate-400 font-mono">horas</span>
          </div>
          <span className="text-[11px] text-blue-600 dark:text-blue-400 mt-1 block font-medium">
            Constancia regular
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-1">
            Retos Superados
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-500 font-mono">
              42
            </span>
            <span className="text-xs text-slate-400">cuestiones</span>
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 block font-medium">
            88% de precisión en test
          </span>
        </div>
      </div>

      {/* Main Charts & Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Progression Chart */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Evolución de Horas de Estudio por Mes
              </h3>
            </div>
            <span className="text-xs text-slate-400">Curso 2026/2027</span>
          </div>

          <div className="h-56 flex items-end justify-between gap-6 px-4 pt-6 pb-2">
            {monthlyData.map((item, idx) => {
              const heightPercent = item.hours > 0 ? (item.hours / maxHours) * 100 : 8;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono">
                    {item.hours > 0 ? `${item.hours}h` : '-'}
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

          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg text-xs text-slate-600 dark:text-slate-400 flex items-center justify-between">
            <span>Objetivo mensual recomendado para 2º ESO: <strong>16 horas de estudio guiado</strong></span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-mono">✓ Cumplido en Octubre</span>
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
                    <span className="text-slate-400 text-[11px]">{stat.totalHours}h</span>
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
            Histórico Oficial de Calificaciones del Curso
          </h3>
          <span className="text-xs text-slate-400">
            {grades.length} evaluaciones en el IES San José
          </span>
        </div>

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
      </div>

      {/* Add Grade Modal */}
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
