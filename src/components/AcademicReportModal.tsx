import React from 'react';
import { 
  Printer, 
  Download, 
  X, 
  GraduationCap, 
  CheckCircle2, 
  Award, 
  FileText
} from 'lucide-react';
import { AcademicGrade, AcademicTask, StudentProfile, Subject } from '../types';

interface AcademicReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  subjects: Subject[];
  grades: AcademicGrade[];
  tasks: AcademicTask[];
}

export const AcademicReportModal: React.FC<AcademicReportModalProps> = ({
  isOpen,
  onClose,
  profile,
  subjects,
  grades,
  tasks
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadReport = () => {
    const reportData = {
      titulo: 'Informe de Seguimiento Académico 2º ESO',
      centro: profile.school,
      localidad: profile.city,
      alumno: profile.name,
      curso: profile.grade,
      trimestre: profile.currentTerm,
      fechaGeneracion: new Date().toLocaleDateString('es-ES'),
      calificaciones: grades,
      tareas: tasks
    };
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Informe_2ESO_${profile.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 100;

  const overallAvg = grades.length > 0
    ? (grades.reduce((acc, g) => acc + g.score, 0) / grades.length).toFixed(2)
    : '0.00';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        {/* Modal Top Actions (Hidden in Print) */}
        <div className="no-print flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Vista Previa de Informe Académico para Exportar
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadReport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              title="Descargar datos en formato JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Datos</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Guardar en PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE DOCUMENT AREA */}
        <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-6 print:border-none print:p-0">
          {/* Official Letterhead */}
          <div className="border-b-2 border-slate-900 dark:border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold text-xl shrink-0">
                SJ
              </div>
              <div>
                <h1 className="text-lg font-extrabold uppercase tracking-tight text-slate-900 dark:text-white">
                  {profile.school} · Cuenca
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Comunidad de Castilla-La Mancha · Decreto 82/2022 (LOMLOE)
                </p>
                <p className="text-[11px] font-semibold text-blue-700 dark:text-blue-400 mt-0.5">
                  Informe de Progreso y Seguimiento con Tutor Socrático
                </p>
              </div>
            </div>

            <div className="text-right text-xs space-y-0.5 font-mono">
              <div><strong>Fecha:</strong> {new Date().toLocaleDateString('es-ES')}</div>
              <div><strong>Periodo:</strong> {profile.currentTerm} (Curso 2026/27)</div>
            </div>
          </div>

          {/* Student Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-lg text-xs border border-slate-200 dark:border-slate-700/60 font-sans">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Alumno:</span>
              <span className="font-bold text-slate-900 dark:text-white">{profile.name}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Curso y Etapa:</span>
              <span className="font-bold text-slate-900 dark:text-white">{profile.grade}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Nota Media Global:</span>
              <span className="font-extrabold text-blue-600 dark:text-blue-400 font-mono text-sm">{overallAvg} / 10</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Entregas al Día:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">{completionRate}% ({completedTasks}/{totalTasks})</span>
            </div>
          </div>

          {/* Core Subjects & Tutor Assessments Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Desglose de Materias Troncales de 2º ESO
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-700 divide-y divide-slate-200 dark:divide-slate-700">
                <thead className="bg-slate-100 dark:bg-slate-800 font-semibold text-slate-600 dark:text-slate-300">
                  <tr>
                    <th className="py-2 px-3">Materia</th>
                    <th className="py-2 px-3 text-center">Horas/Sem</th>
                    <th className="py-2 px-3 text-center">Nota Media</th>
                    <th className="py-2 px-3">Valoración del Tutor Socrático</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {subjects.map(s => {
                    const subGrades = grades.filter(g => g.subjectId === s.id);
                    const avg = subGrades.length > 0
                      ? (subGrades.reduce((acc, g) => acc + g.score, 0) / subGrades.length).toFixed(1)
                      : '8.0';

                    let tutorComment = 'Buen progreso con razonamiento guiado.';
                    if (s.id === 'matematicas') tutorComment = 'Consolida la jerarquía de operaciones y álgebra con método socrático.';
                    else if (s.id === 'lengua') tutorComment = 'Distingue con precisión complementos oracionales (CD, CI).';
                    else if (s.id === 'geografia-historia') tutorComment = 'Excelente dominio del medievo hispánico y de la toma de Cuenca en 1177.';
                    else if (s.id === 'fisica-quimica') tutorComment = 'Maneja con soltura los factores de conversión y concentración en masa.';
                    else if (s.id === 'ingles') tutorComment = 'Diferencia claramente Past Simple vs Continuous y amplía léxico.';

                    return (
                      <tr key={s.id}>
                        <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">
                          {s.name}
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono">{s.hoursPerWeek}h</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-blue-600 dark:text-blue-400">
                          {avg}
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300 text-[11px]">
                          {tutorComment}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Exams Detail Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Detalle de Evaluaciones y Exámenes Realizados
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-700 divide-y divide-slate-200 dark:divide-slate-700">
                <thead className="bg-slate-50 dark:bg-slate-800/80 font-semibold text-slate-500">
                  <tr>
                    <th className="py-2 px-3">Fecha</th>
                    <th className="py-2 px-3">Materia</th>
                    <th className="py-2 px-3">Contenido Evaluado</th>
                    <th className="py-2 px-3 text-right">Calificación</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {grades.map(g => {
                    const sub = subjects.find(s => s.id === g.subjectId);
                    return (
                      <tr key={g.id}>
                        <td className="py-2 px-3 font-mono text-slate-500">{g.date}</td>
                        <td className="py-2 px-3 font-medium">{sub?.shortName}</td>
                        <td className="py-2 px-3">{g.title}</td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-slate-900 dark:text-white">
                          {g.score.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer and Signatures */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 text-center text-xs text-slate-500">
            <div>
              <div className="w-36 h-12 mx-auto border-b border-slate-400 mb-1" />
              <span>Firma del Alumno</span>
            </div>
            <div>
              <div className="w-36 h-12 mx-auto border-b border-slate-400 mb-1" />
              <span>Visto Bueno de la Familia / Tutores</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
