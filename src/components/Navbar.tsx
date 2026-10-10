import React from 'react';
import { 
  GraduationCap, 
  Moon, 
  Sun, 
  CloudCheck, 
  Cloud, 
  FileText,
  Calendar,
  Sparkles,
  Award,
  BookOpen,
  User
} from 'lucide-react';
import { ThemeMode } from '../types';

interface NavbarProps {
  currentTab: 'dashboard' | 'tutors' | 'challenges' | 'calendar' | 'progress';
  onSelectTab: (tab: 'dashboard' | 'tutors' | 'challenges' | 'calendar' | 'progress') => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenReport: () => void;
  onOpenSync: () => void;
  onOpenProfile: () => void;
  studentName: string;
  isSynced: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  theme,
  onToggleTheme,
  onOpenReport,
  onOpenSync,
  onOpenProfile,
  studentName,
  isSynced
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Single element wordmark */}
          <button 
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white block leading-tight">
                TutorSanJose
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block leading-none">
                2º ESO · IES San José
              </span>
            </div>
          </button>

          {/* Zone 2: 5 single-line clean navigation links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`px-3 py-1.5 text-xs lg:text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                currentTab === 'dashboard'
                  ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => onSelectTab('tutors')}
              className={`px-3 py-1.5 text-xs lg:text-sm font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                currentTab === 'tutors'
                  ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Tutores Socráticos
            </button>
            <button
              onClick={() => onSelectTab('challenges')}
              className={`px-3 py-1.5 text-xs lg:text-sm font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                currentTab === 'challenges'
                  ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Retos y Test
            </button>
            <button
              onClick={() => onSelectTab('calendar')}
              className={`px-3 py-1.5 text-xs lg:text-sm font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                currentTab === 'calendar'
                  ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              Calendario & Exámenes
            </button>
            <button
              onClick={() => onSelectTab('progress')}
              className={`px-3 py-1.5 text-xs lg:text-sm font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                currentTab === 'progress'
                  ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Progreso Mensual
            </button>
          </nav>

          {/* Zone 3: Actions (Sync, Dark mode, PDF Report) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenSync}
              title={isSynced ? 'Sincronizado en la nube' : 'Sincronizar dispositivos'}
              className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Sincronización en la nube"
            >
              <Cloud className={`w-4 h-4 ${isSynced ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-400'}`} />
            </button>

            <button
              onClick={onToggleTheme}
              title={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
              className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Alternar modo oscuro"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            <button
              onClick={onOpenProfile}
              title="Configurar datos del alumno y centro"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="hidden sm:inline font-semibold">{studentName}</span>
            </button>

            <button
              onClick={onOpenReport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shadow-xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reporte</span> PDF
            </button>
          </div>
        </div>

        {/* Mobile secondary tab strip */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-100 dark:border-slate-800/60 overflow-x-auto">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`text-xs px-2 py-1 font-medium whitespace-nowrap ${currentTab === 'dashboard' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400'}`}
          >
            Inicio
          </button>
          <button
            onClick={() => onSelectTab('tutors')}
            className={`text-xs px-2 py-1 font-medium whitespace-nowrap ${currentTab === 'tutors' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400'}`}
          >
            Tutores
          </button>
          <button
            onClick={() => onSelectTab('challenges')}
            className={`text-xs px-2 py-1 font-medium whitespace-nowrap ${currentTab === 'challenges' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400'}`}
          >
            Retos
          </button>
          <button
            onClick={() => onSelectTab('calendar')}
            className={`text-xs px-2 py-1 font-medium whitespace-nowrap ${currentTab === 'calendar' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400'}`}
          >
            Calendario
          </button>
          <button
            onClick={() => onSelectTab('progress')}
            className={`text-xs px-2 py-1 font-medium whitespace-nowrap ${currentTab === 'progress' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400'}`}
          >
            Progreso
          </button>
        </div>
      </div>
    </header>
  );
};
