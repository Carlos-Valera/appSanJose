import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  RotateCw, 
  Sparkles, 
  Filter,
  Check,
  ArrowRight
} from 'lucide-react';
import { Challenge, QuizAttempt, Subject, SubjectId } from '../types';

interface ChallengeViewProps {
  subjects: Subject[];
  selectedSubjectId: SubjectId;
  onSelectSubject: (id: SubjectId) => void;
  challenges: Challenge[];
  attempts: QuizAttempt[];
  onSaveAttempt: (attempt: QuizAttempt) => void;
  onGenerateAIChallenge: (subjectId: SubjectId, topicName: string) => Promise<Challenge | null>;
  isGeneratingAI: boolean;
}

export const ChallengeView: React.FC<ChallengeViewProps> = ({
  subjects,
  selectedSubjectId,
  onSelectSubject,
  challenges,
  attempts,
  onSaveAttempt,
  onGenerateAIChallenge,
  isGeneratingAI
}) => {
  const currentSubject = subjects.find(s => s.id === selectedSubjectId) || subjects[0];
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [showHintIndex, setShowHintIndex] = useState(0);

  // Filter challenges for current subject & topic
  const filteredChallenges = challenges.filter(c => {
    if (c.subjectId !== selectedSubjectId) return false;
    if (selectedTopicId && c.topicId && c.topicId !== selectedTopicId) return false;
    return true;
  });

  const activeChallenge = filteredChallenges[activeChallengeIndex] || filteredChallenges[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !activeChallenge) return;
    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === activeChallenge.correctIndex;

    const newAttempt: QuizAttempt = {
      id: 'att-' + Date.now(),
      challengeId: activeChallenge.id,
      subjectId: activeChallenge.subjectId,
      question: activeChallenge.question,
      selectedOption,
      isCorrect,
      timestamp: new Date().toISOString()
    };

    onSaveAttempt(newAttempt);
  };

  const handleNextChallenge = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowHintIndex(0);
    if (activeChallengeIndex < filteredChallenges.length - 1) {
      setActiveChallengeIndex(prev => prev + 1);
    } else {
      setActiveChallengeIndex(0);
    }
  };

  const handleGenerateNew = async () => {
    const topic = currentSubject.topics.find(t => t.id === selectedTopicId) || currentSubject.topics[0];
    const generated = await onGenerateAIChallenge(selectedSubjectId, topic?.name || 'General');
    if (generated) {
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setShowHintIndex(0);
      setActiveChallengeIndex(0);
    }
  };

  // Stats calculation
  const subjectAttempts = attempts.filter(a => a.subjectId === selectedSubjectId);
  const correctCount = subjectAttempts.filter(a => a.isCorrect).length;
  const accuracyPercent = subjectAttempts.length > 0 ? Math.round((correctCount / subjectAttempts.length) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner & Stats */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Centro de Retos y Test de 2º ESO
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Preguntas tipo test oficiales para consolidar saberes básicos en {currentSubject.name}.
          </p>
        </div>

        {/* Quick KPI stats */}
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/60 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700/60">
          <div>
            <span className="text-[11px] text-slate-400 block uppercase">Retos Resueltos</span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 font-mono">
              {subjectAttempts.length}
            </span>
          </div>
          <div className="w-px h-7 bg-slate-200 dark:bg-slate-700" />
          <div>
            <span className="text-[11px] text-slate-400 block uppercase">Aciertos</span>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              {correctCount}
            </span>
          </div>
          <div className="w-px h-7 bg-slate-200 dark:bg-slate-700" />
          <div>
            <span className="text-[11px] text-slate-400 block uppercase">Precisión</span>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400 font-mono">
              {accuracyPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* Filter by Topic and AI Generator Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <button
            onClick={() => { setSelectedTopicId(''); setActiveChallengeIndex(0); }}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              !selectedTopicId
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            Todos los bloques
          </button>
          {currentSubject.topics.slice(0, 4).map(topic => (
            <button
              key={topic.id}
              onClick={() => { setSelectedTopicId(topic.id); setActiveChallengeIndex(0); }}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors truncate max-w-xs ${
                selectedTopicId === topic.id
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {topic.name}
            </button>
          ))}
        </div>

        <button
          onClick={handleGenerateNew}
          disabled={isGeneratingAI}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white transition-colors shrink-0 shadow-xs"
        >
          <Sparkles className={`w-3.5 h-3.5 ${isGeneratingAI ? 'animate-spin' : ''}`} />
          <span>{isGeneratingAI ? 'Generando reto...' : 'Crear reto con IA'}</span>
        </button>
      </div>

      {/* Challenge Card */}
      {activeChallenge ? (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
          {/* Card header */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {currentSubject.name}
              </span>
              <span>·</span>
              <span className="truncate">{activeChallenge.topicName}</span>
            </div>
            <span className="font-mono">
              Reto {activeChallengeIndex + 1} de {filteredChallenges.length}
            </span>
          </div>

          {/* Question Text */}
          <div className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
            {activeChallenge.question}
          </div>

          {/* Interactive Options List */}
          <div className="space-y-2.5">
            {activeChallenge.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isCorrect = index === activeChallenge.correctIndex;

              let optionClasses = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-blue-400';

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  optionClasses = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-medium';
                } else if (isSelected && !isCorrect) {
                  optionClasses = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200';
                } else {
                  optionClasses = 'opacity-60 bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-500';
                }
              } else if (isSelected) {
                optionClasses = 'bg-blue-50 dark:bg-blue-950/50 border-blue-600 text-blue-900 dark:text-blue-200 ring-1 ring-blue-600';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleSelectOption(index)}
                  disabled={isAnswerSubmitted}
                  className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-start justify-between gap-3 ${optionClasses}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 flex items-center justify-center text-xs font-bold shrink-0">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="pt-0.5">{option}</span>
                  </div>

                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Socratic Hint helper before submitting */}
          {!isAnswerSubmitted && activeChallenge.hints && activeChallenge.hints.length > 0 && (
            <div className="p-3 bg-amber-50/70 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900 text-xs">
              <div className="flex items-center justify-between text-amber-900 dark:text-amber-200 font-semibold mb-1">
                <span className="flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  Pista socrática para ayudarte a pensar
                </span>
                {showHintIndex < activeChallenge.hints.length - 1 && (
                  <button
                    onClick={() => setShowHintIndex(prev => prev + 1)}
                    className="text-[11px] text-amber-700 dark:text-amber-300 hover:underline"
                  >
                    Otra pista
                  </button>
                )}
              </div>
              <p className="text-amber-800 dark:text-amber-300">
                {activeChallenge.hints[showHintIndex]}
              </p>
            </div>
          )}

          {/* Answer Explanation Box when submitted */}
          {isAnswerSubmitted && (
            <div className={`p-4 rounded-xl border text-xs sm:text-sm space-y-1.5 ${
              selectedOption === activeChallenge.correctIndex
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
            }`}>
              <div className="font-bold flex items-center gap-1.5">
                {selectedOption === activeChallenge.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ¡Excelente razonamiento! Has acertado.
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600" />
                    Casi. La respuesta correcta era la opción {String.fromCharCode(65 + activeChallenge.correctIndex)}.
                  </>
                )}
              </div>
              <p className="leading-relaxed opacity-95">
                {activeChallenge.explanation}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-xs"
              >
                Comprobar respuesta
              </button>
            ) : (
              <button
                onClick={handleNextChallenge}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold transition-colors shadow-xs"
              >
                <span>Siguiente reto</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-3">
          <p className="text-sm text-slate-500">No hay retos preconfigurados para este filtro.</p>
          <button
            onClick={handleGenerateNew}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg"
          >
            Generar reto con IA ahora
          </button>
        </div>
      )}
    </div>
  );
};
