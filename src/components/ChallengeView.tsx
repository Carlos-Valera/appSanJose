import React, { useState, useEffect } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  Sparkles, 
  Filter, 
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  RotateCw,
  HelpCircle,
  Check
} from 'lucide-react';
import { Challenge, QuizAttempt, Subject, SubjectId } from '../types';

interface ChallengeViewProps {
  subjects: Subject[];
  selectedSubjectId: SubjectId;
  onSelectSubject: (id: SubjectId) => void;
  selectedTopicId?: string;
  onSelectTopic?: (topicId: string) => void;
  challenges: Challenge[];
  attempts: QuizAttempt[];
  onSaveAttempt: (attempt: QuizAttempt) => void;
  onGenerateAIChallenge: (subjectId: SubjectId, topicName: string, topicId?: string) => Promise<Challenge | null>;
  isGeneratingAI: boolean;
}

export const ChallengeView: React.FC<ChallengeViewProps> = ({
  subjects,
  selectedSubjectId,
  onSelectSubject,
  selectedTopicId: externalTopicId,
  onSelectTopic,
  challenges,
  attempts,
  onSaveAttempt,
  onGenerateAIChallenge,
  isGeneratingAI
}) => {
  const currentSubject = subjects.find(s => s.id === selectedSubjectId) || subjects[0];
  const [internalTopicId, setInternalTopicId] = useState<string>(externalTopicId || '');
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [showHintIndex, setShowHintIndex] = useState(0);
  const [noticeMsg, setNoticeMsg] = useState<string>('');

  // Sync external topic ID when prop changes
  useEffect(() => {
    if (externalTopicId !== undefined) {
      setInternalTopicId(externalTopicId);
      setActiveChallengeIndex(0);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setShowHintIndex(0);
    }
  }, [externalTopicId]);

  // Reset indices and options when subject changes
  useEffect(() => {
    setActiveChallengeIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowHintIndex(0);
  }, [selectedSubjectId]);

  const activeTopicId = externalTopicId !== undefined ? externalTopicId : internalTopicId;

  // Filter challenges for current subject & topic
  const filteredChallenges = challenges.filter(c => {
    if (c.subjectId !== selectedSubjectId) return false;
    if (activeTopicId) {
      return c.topicId === activeTopicId;
    }
    return true;
  });

  // Clamp activeChallengeIndex to valid range
  const safeIndex = activeChallengeIndex >= filteredChallenges.length 
    ? Math.max(0, filteredChallenges.length - 1) 
    : activeChallengeIndex;

  const activeChallenge = filteredChallenges[safeIndex];

  const handleSelectTopic = (topicId: string) => {
    setInternalTopicId(topicId);
    if (onSelectTopic) {
      onSelectTopic(topicId);
    }
    setActiveChallengeIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowHintIndex(0);
  };

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
    if (safeIndex < filteredChallenges.length - 1) {
      setActiveChallengeIndex(safeIndex + 1);
    } else {
      setActiveChallengeIndex(0);
    }
  };

  const handlePrevChallenge = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowHintIndex(0);
    if (safeIndex > 0) {
      setActiveChallengeIndex(safeIndex - 1);
    } else {
      setActiveChallengeIndex(filteredChallenges.length - 1);
    }
  };

  const handleJumpToChallenge = (idx: number) => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowHintIndex(0);
    setActiveChallengeIndex(idx);
  };

  const handleGenerateNew = async () => {
    const topic = currentSubject.topics.find(t => t.id === activeTopicId) || currentSubject.topics[0];
    const targetTopicName = topic?.name || 'General';
    const targetTopicId = activeTopicId || topic?.id;

    const generated = await onGenerateAIChallenge(selectedSubjectId, targetTopicName, targetTopicId);
    if (generated) {
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setShowHintIndex(0);
      setActiveChallengeIndex(0);
      setNoticeMsg(`¡Nuevo reto de "${targetTopicName.slice(0, 35)}..." generado y listo para resolver!`);
      setTimeout(() => setNoticeMsg(''), 4500);
    }
  };

  // Stats calculation
  const subjectAttempts = attempts.filter(a => a.subjectId === selectedSubjectId);
  const correctCount = subjectAttempts.filter(a => a.isCorrect).length;
  const accuracyPercent = subjectAttempts.length > 0 ? Math.round((correctCount / subjectAttempts.length) * 100) : 0;

  // Active topic object
  const activeTopicObj = currentSubject.topics.find(t => t.id === activeTopicId);

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
            Preguntas tipo test oficiales LOMLOE para consolidar saberes básicos en {currentSubject.name}.
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

      {/* Notification toast if challenge generated */}
      {noticeMsg && (
        <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 rounded-lg text-xs font-medium animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{noticeMsg}</span>
        </div>
      )}

      {/* Filter by Topic and AI Generator Button */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Filter className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Bloques temáticos de {currentSubject.shortName}:</span>
          </div>

          <button
            onClick={handleGenerateNew}
            disabled={isGeneratingAI}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white transition-colors shrink-0 shadow-xs cursor-pointer"
            title="Crea una nueva pregunta inédita adaptada al currículo oficial"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isGeneratingAI ? 'animate-spin' : ''}`} />
            <span>{isGeneratingAI ? 'Generando reto con IA...' : 'Crear reto con IA'}</span>
          </button>
        </div>

        {/* Complete horizontal list of topics with counts */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          <button
            onClick={() => handleSelectTopic('')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
              !activeTopicId
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
            }`}
          >
            Todos los bloques ({challenges.filter(c => c.subjectId === selectedSubjectId).length})
          </button>

          {currentSubject.topics.map((topic, tIdx) => {
            const countInTopic = challenges.filter(c => c.subjectId === selectedSubjectId && c.topicId === topic.id).length;
            const isSelected = activeTopicId === topic.id;

            return (
              <button
                key={topic.id}
                onClick={() => handleSelectTopic(topic.id)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors truncate max-w-xs cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
                title={`Bloque ${tIdx + 1}: ${topic.name}`}
              >
                <span>B{tIdx + 1}: {topic.name}</span>
                <span className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected
                    ? 'bg-white/20 dark:bg-slate-900/20 text-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }`}>
                  {countInTopic}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Challenge Card */}
      {activeChallenge ? (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
          {/* Card header with topic indicator, question count and jump navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-3 border-b border-slate-100 dark:border-slate-800 gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {currentSubject.name}
              </span>
              <span>·</span>
              <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-sm">
                {activeChallenge.topicName}
              </span>
            </div>

            {/* Question Counter & Jump buttons */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold">
                Reto {safeIndex + 1} de {filteredChallenges.length}
              </span>

              {filteredChallenges.length > 1 && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={handlePrevChallenge}
                    className="p-1 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                    title="Pregunta anterior"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleNextChallenge}
                    className="p-1 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                    title="Pregunta siguiente"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Question Selector Carousel / Badges */}
          {filteredChallenges.length > 1 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
              <span className="text-[11px] text-slate-400 font-medium mr-1 shrink-0">Navegar preguntas:</span>
              {filteredChallenges.map((ch, idx) => {
                const isCurrent = idx === safeIndex;
                const attempt = attempts.find(a => a.challengeId === ch.id);
                let btnColor = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-transparent';
                let icon = null;

                if (attempt) {
                  if (attempt.isCorrect) {
                    btnColor = 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-400';
                    icon = <Check className="w-2.5 h-2.5 inline ml-0.5" />;
                  } else {
                    btnColor = 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-400';
                    icon = <XCircle className="w-2.5 h-2.5 inline ml-0.5" />;
                  }
                }

                if (isCurrent) {
                  btnColor = 'ring-2 ring-blue-600 font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-500';
                }

                return (
                  <button
                    key={ch.id}
                    onClick={() => handleJumpToChallenge(idx)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono flex items-center justify-center gap-1 transition-all cursor-pointer shrink-0 ${btnColor}`}
                    title={`Ver reto ${idx + 1}`}
                  >
                    <span>Reto {idx + 1}</span>
                    {icon}
                  </button>
                );
              })}
            </div>
          )}

          {/* Question Text */}
          <div className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
            {activeChallenge.question}
          </div>

          {/* Interactive Options List */}
          <div className="space-y-2.5">
            {activeChallenge.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isCorrect = index === activeChallenge.correctIndex;

              let optionClasses = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-blue-400 dark:hover:border-blue-500';

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  optionClasses = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-medium';
                } else if (isSelected && !isCorrect) {
                  optionClasses = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200';
                } else {
                  optionClasses = 'opacity-60 bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400';
                }
              } else if (isSelected) {
                optionClasses = 'bg-blue-50 dark:bg-blue-950/50 border-blue-600 text-blue-900 dark:text-blue-200 ring-1 ring-blue-600';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleSelectOption(index)}
                  disabled={isAnswerSubmitted}
                  className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-start justify-between gap-3 cursor-pointer ${optionClasses}`}
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
            <div className="p-3.5 bg-amber-50/70 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900 text-xs">
              <div className="flex items-center justify-between text-amber-900 dark:text-amber-200 font-semibold mb-1">
                <span className="flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  Pista socrática para orientar tu razonamiento
                </span>
                {showHintIndex < activeChallenge.hints.length - 1 && (
                  <button
                    onClick={() => setShowHintIndex(prev => prev + 1)}
                    className="text-[11px] text-amber-700 dark:text-amber-300 hover:underline cursor-pointer"
                  >
                    Otra pista ({showHintIndex + 1}/{activeChallenge.hints.length})
                  </button>
                )}
              </div>
              <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
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
                    ¡Excelente razonamiento! Respuesta correcta.
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

          {/* Action buttons footer */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex-wrap">
            <div className="flex items-center gap-2">
              {filteredChallenges.length > 1 && (
                <button
                  onClick={handlePrevChallenge}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Anterior</span>
                </button>
              )}

              <button
                onClick={handleGenerateNew}
                disabled={isGeneratingAI}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/50 text-xs font-medium transition-colors cursor-pointer"
                title="Generar otra pregunta inédita con IA para este bloque"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isGeneratingAI ? 'animate-spin' : ''}`} />
                <span>Generar otro reto</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {!isAnswerSubmitted ? (
                <>
                  {filteredChallenges.length > 1 && (
                    <button
                      onClick={handleNextChallenge}
                      className="px-3 py-2 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer"
                      title="Pasar a la siguiente pregunta sin responder ahora"
                    >
                      Saltar reto →
                    </button>
                  )}
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
                  >
                    Comprobar respuesta
                  </button>
                </>
              ) : (
                <button
                  onClick={handleNextChallenge}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold transition-colors shadow-xs cursor-pointer"
                >
                  <span>Siguiente reto</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-800 dark:text-white">
              {activeTopicObj ? activeTopicObj.name : 'Bloque seleccionado'}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Aún no hay retos creados en este bloque temático específico. Haz clic a continuación para generar uno al instante con IA adaptado al currículo.
            </p>
          </div>
          <button
            onClick={handleGenerateNew}
            disabled={isGeneratingAI}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Sparkles className={`w-4 h-4 ${isGeneratingAI ? 'animate-spin' : ''}`} />
            <span>{isGeneratingAI ? 'Generando reto...' : 'Generar reto con IA ahora'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
