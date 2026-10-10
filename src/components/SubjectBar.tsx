import React from 'react';
import { Subject, SubjectId } from '../types';
import { Calculator, BookOpen, Globe, FlaskConical, Languages } from 'lucide-react';

interface SubjectBarProps {
  subjects: Subject[];
  selectedSubjectId: SubjectId;
  onSelectSubject: (id: SubjectId) => void;
  selectedTopicId?: string;
  onSelectTopic?: (topicId: string) => void;
}

export const SubjectBar: React.FC<SubjectBarProps> = ({
  subjects,
  selectedSubjectId,
  onSelectSubject,
  selectedTopicId,
  onSelectTopic
}) => {
  const getSubjectIcon = (id: SubjectId) => {
    switch (id) {
      case 'matematicas':
        return <Calculator className="w-4 h-4 shrink-0" />;
      case 'lengua':
        return <BookOpen className="w-4 h-4 shrink-0" />;
      case 'geografia-historia':
        return <Globe className="w-4 h-4 shrink-0" />;
      case 'fisica-quimica':
        return <FlaskConical className="w-4 h-4 shrink-0" />;
      case 'ingles':
        return <Languages className="w-4 h-4 shrink-0" />;
    }
  };

  const currentSubject = subjects.find(s => s.id === selectedSubjectId) || subjects[0];

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-3">
        {/* Subject buttons strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider whitespace-nowrap mr-1 hidden sm:inline">
            Materias 2º ESO:
          </span>
          {subjects.map(subject => {
            const isSelected = subject.id === selectedSubjectId;
            return (
              <button
                key={subject.id}
                onClick={() => onSelectSubject(subject.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 border-slate-900 dark:border-white shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className={isSelected ? 'text-blue-400 dark:text-blue-600' : 'text-slate-400 dark:text-slate-400'}>
                  {getSubjectIcon(subject.id)}
                </span>
                <span>{subject.shortName}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isSelected 
                    ? 'bg-slate-800 dark:bg-slate-200 text-slate-300 dark:text-slate-700' 
                    : 'bg-slate-200/70 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400'
                }`}>
                  {subject.hoursPerWeek}h
                </span>
              </button>
            );
          })}
        </div>

        {/* Topic filter pill strip if callback provided */}
        {onSelectTopic && currentSubject.topics && (
          <div className="flex items-center gap-2 overflow-x-auto pt-1 text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800/50">
            <span className="text-[11px] font-medium text-slate-400 shrink-0">Temas CLM:</span>
            <button
              onClick={() => onSelectTopic('')}
              className={`px-2.5 py-1 rounded text-xs whitespace-nowrap transition-colors ${
                !selectedTopicId
                  ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-medium'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              Todos los temas
            </button>
            {currentSubject.topics.map(topic => (
              <button
                key={topic.id}
                onClick={() => onSelectTopic(topic.id)}
                className={`px-2.5 py-1 rounded text-xs whitespace-nowrap transition-colors truncate max-w-xs ${
                  selectedTopicId === topic.id
                    ? 'bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-medium'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
                title={topic.name}
              >
                {topic.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
