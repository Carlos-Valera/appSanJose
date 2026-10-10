import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle, 
  Trash2, 
  Bell,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { AcademicTask, Subject, SubjectId } from '../types';

interface CalendarViewProps {
  tasks: AcademicTask[];
  subjects: Subject[];
  onAddTask: (task: AcademicTask) => void;
  onToggleCompleteTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  tasks,
  subjects,
  onAddTask,
  onToggleCompleteTask,
  onDeleteTask
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filterSubjectId, setFilterSubjectId] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [currentDate, setCurrentDate] = useState(new Date(2026, 9, 10)); // October 2026 baseline
  const [notificationStatus, setNotificationStatus] = useState<string>('default');

  // Form state
  const [newTitle, setNewTitle] = useState('');
  const [newSubjectId, setNewSubjectId] = useState<SubjectId>('matematicas');
  const [newDueDate, setNewDueDate] = useState('2026-10-16');
  const [newDueTime, setNewDueTime] = useState('10:00');
  const [newType, setNewType] = useState<'examen' | 'deberes' | 'trabajo' | 'repaso'>('examen');
  const [newPriority, setNewPriority] = useState<'alta' | 'media' | 'baja'>('alta');
  const [newNotes, setNewNotes] = useState('');

  const handleRequestNotifications = async () => {
    if ('Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        setNotificationStatus(permission);
        if (permission === 'granted') {
          new Notification('TutorSanJose', {
            body: '¡Notificaciones activadas! Te avisaremos de tus exámenes y entregas del IES San José.',
            icon: '/favicon.ico'
          });
        }
      } catch (e) {
        console.error('Notification error', e);
      }
    }
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const task: AcademicTask = {
      id: 'task-' + Date.now(),
      title: newTitle,
      subjectId: newSubjectId,
      dueDate: newDueDate,
      dueTime: newDueTime,
      type: newType,
      completed: false,
      priority: newPriority,
      notes: newNotes
    };

    onAddTask(task);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewNotes('');
  };

  // Calendar calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0 to 11
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)
  // Shift so Monday is index 0
  const startOffset = (firstDayOfWeek + 6) % 7;

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const filteredTasks = tasks.filter(t => {
    if (filterSubjectId !== 'all' && t.subjectId !== filterSubjectId) return false;
    if (filterType !== 'all' && t.type !== filterType) return false;
    return true;
  }).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const getSubjectColor = (id: SubjectId) => {
    const s = subjects.find(sub => sub.id === id);
    return s?.color || '#2563EB';
  };

  const getDaysRemainingText = (dueDateStr: string) => {
    const target = new Date(dueDateStr + 'T23:59:59');
    const today = new Date(2026, 9, 10); // current baseline
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Vencida';
    if (diffDays === 0) return '¡Hoy!';
    if (diffDays === 1) return '¡Mañana!';
    if (diffDays <= 3) return `¡En ${diffDays} días!`;
    return `En ${diffDays} días`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CalendarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Calendario Académico y Fechas Límite
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Organiza tus entregas, deberes y fechas de exámenes del IES San José de Cuenca.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRequestNotifications}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors"
          >
            <Bell className="w-3.5 h-3.5 text-amber-500" />
            <span>{notificationStatus === 'granted' ? 'Avisos activos' : 'Activar avisos'}</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Añadir Examen o Tarea</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Month Grid */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
          {/* Month Header Switcher */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {monthNames[month]} {year}
            </h3>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
                className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
                className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400 dark:text-slate-500 mb-2">
            <div>Lun</div>
            <div>Mar</div>
            <div>Mié</div>
            <div>Jue</div>
            <div>Vie</div>
            <div>Sáb</div>
            <div>Dom</div>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {/* Blank leading slots */}
            {Array.from({ length: startOffset }).map((_, i) => (
              <div key={`blank-${i}`} className="h-16 rounded-lg bg-slate-50/50 dark:bg-slate-800/20" />
            ))}

            {/* Actual Month Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
              const dayTasks = tasks.filter(t => t.dueDate === dateStr);
              const isToday = dayNum === 10 && month === 9 && year === 2026;

              return (
                <div
                  key={dayNum}
                  className={`h-16 p-1.5 rounded-lg border text-xs flex flex-col justify-between transition-colors ${
                    isToday
                      ? 'border-blue-500 bg-blue-50/40 dark:bg-blue-950/30'
                      : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/30 dark:bg-slate-800/40'
                  }`}
                >
                  <span className={`font-semibold text-[11px] ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`}>
                    {dayNum}
                  </span>

                  {/* Dot/pill indicators for tasks on this day */}
                  <div className="space-y-0.5 overflow-hidden">
                    {dayTasks.slice(0, 2).map(dt => (
                      <div
                        key={dt.id}
                        className={`text-[9px] px-1 py-0.2 rounded truncate leading-tight font-medium ${
                          dt.type === 'examen'
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                        }`}
                        title={`${dt.title} (${dt.dueDate})`}
                      >
                        {dt.type === 'examen' ? 'Examen' : dt.title}
                      </div>
                    ))}
                    {dayTasks.length > 2 && (
                      <span className="text-[9px] text-slate-400 block leading-none">
                        +{dayTasks.length - 2} más
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Tasks List & Filters */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Próximas Fechas ({filteredTasks.length})
              </h3>

              {/* Subject filter dropdown */}
              <select
                value={filterSubjectId}
                onChange={(e) => setFilterSubjectId(e.target.value)}
                className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1 text-slate-700 dark:text-slate-300"
              >
                <option value="all">Todas las materias</option>
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.shortName}</option>
                ))}
              </select>
            </div>

            {/* List */}
            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  No hay tareas ni exámenes pendientes con este filtro.
                </div>
              ) : (
                filteredTasks.map(task => {
                  const daysRemaining = getDaysRemainingText(task.dueDate);
                  const isExam = task.type === 'examen';

                  return (
                    <div
                      key={task.id}
                      className={`p-3 rounded-xl border transition-all ${
                        task.completed
                          ? 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-60'
                          : isExam
                          ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/60'
                          : 'bg-white dark:bg-slate-800/70 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5">
                          <button
                            onClick={() => onToggleCompleteTask(task.id)}
                            className="mt-0.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            {task.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <Circle className="w-4 h-4" />
                            )}
                          </button>

                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded ${
                                isExam
                                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                                  : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                              }`}>
                                {task.type}
                              </span>
                              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                                {task.title}
                              </span>
                            </div>

                            {task.notes && (
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                                {task.notes}
                              </p>
                            )}

                            <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {task.dueDate} {task.dueTime && `(${task.dueTime})`}
                              </span>
                              <span className={`font-semibold ${
                                daysRemaining.includes('¡')
                                  ? 'text-rose-600 dark:text-rose-400'
                                  : 'text-slate-500'
                              }`}>
                                {daysRemaining}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => onDeleteTask(task.id)}
                          className="text-slate-400 hover:text-rose-500 p-1 rounded transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Task / Exam Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Añadir al Calendario Académico
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                  Título del examen o tarea *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ej: Examen Tema 4 de Matemáticas..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                    Materia
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
                    Tipo de evento
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="examen">Examen oficial</option>
                    <option value="deberes">Deberes diarios</option>
                    <option value="trabajo">Entrega de trabajo</option>
                    <option value="repaso">Sesión de repaso</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                    Fecha límite *
                  </label>
                  <input
                    type="date"
                    required
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                    Hora (opcional)
                  </label>
                  <input
                    type="time"
                    value={newDueTime}
                    onChange={(e) => setNewDueTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                  Notas adicionales / Contenidos a estudiar
                </label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Ej: Temas 3 y 4 del libro, traer calculadora científica..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold shadow-xs"
                >
                  Guardar en Calendario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
