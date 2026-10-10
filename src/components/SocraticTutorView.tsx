import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Lightbulb, 
  HelpCircle, 
  Sparkles, 
  RotateCcw, 
  ChevronRight, 
  MessageSquare,
  ShieldCheck,
  Award
} from 'lucide-react';
import { Subject, ChatMessage, SubjectId } from '../types';

interface SocraticTutorViewProps {
  subject: Subject;
  messages: ChatMessage[];
  onSendMessage: (text: string, topicName?: string) => Promise<void>;
  onClearHistory: () => void;
  onNavigateToChallenges: () => void;
  isLoading: boolean;
}

export const SocraticTutorView: React.FC<SocraticTutorViewProps> = ({
  subject,
  messages,
  onSendMessage,
  onClearHistory,
  onNavigateToChallenges,
  isLoading
}) => {
  const [inputText, setInputText] = useState('');
  const [selectedTopicName, setSelectedTopicName] = useState(subject.topics[0]?.name || '');
  const [revealedHints, setRevealedHints] = useState<Record<string, number>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto sync topic when subject changes
  useEffect(() => {
    if (subject.topics && subject.topics.length > 0) {
      setSelectedTopicName(subject.topics[0].name);
    }
  }, [subject.id]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    const text = inputText;
    setInputText('');
    await onSendMessage(text, selectedTopicName);
  };

  const handleRevealNextHint = (messageId: string, totalHints: number) => {
    setRevealedHints(prev => {
      const current = prev[messageId] || 0;
      if (current < totalHints) {
        return { ...prev, [messageId]: current + 1 };
      }
      return prev;
    });
  };

  const handleQuickPrompt = (promptText: string) => {
    setInputText(promptText);
  };

  const quickPrompts = subject.id === 'ingles' ? [
    { icon: '🇬🇧', label: 'Past Simple vs Continuous', text: 'Explícame cuándo usar Past Simple y cuándo Past Continuous con ejemplos claros.' },
    { icon: '📝', label: 'Verbos irregulares', text: 'Tengo dudas con los verbos irregulares en pasado (go, see, have, buy...). ¿Cómo los practico?' },
    { icon: '🔍', label: 'Preguntas con do/did', text: '¿Cómo se forman preguntas y oraciones negativas en inglés con do / does / did?' },
    { icon: '🎯', label: 'Práctica de oraciones', text: `Ponme una frase en inglés sobre ${selectedTopicName || 'la unidad'} para que intente completarla.` }
  ] : subject.id === 'lengua' ? [
    { icon: '📖', label: 'Sujeto y CD', text: '¿Cómo distingo el Sujeto del Complemento Directo (CD) en una oración simple?' },
    { icon: '✍️', label: 'Análisis sintáctico', text: 'Tengo que analizar sintácticamente una oración y no sé por dónde empezar. ¿Cuáles son los pasos?' },
    { icon: '📝', label: 'Clases de palabras', text: '¿Cómo diferencio un determinante de un pronombre en una frase?' },
    { icon: '🎯', label: 'Ortografía y acentuación', text: 'Explícame las reglas de acentuación de palabras agudas, llanas y esdrújulas con ejemplos.' }
  ] : subject.id === 'geografia-historia' ? [
    { icon: '🏰', label: 'Reconquista y Cuenca', text: '¿Por qué fue crucial la conquista de Cuenca en 1177 por Alfonso VIII y qué supuso el Fuero de Cuenca?' },
    { icon: '🕌', label: 'Al-Ándalus', text: '¿Cuáles fueron las etapas principales de Al-Ándalus (Emirato, Califato, Taifas)?' },
    { icon: '🏛️', label: 'Románico vs Gótico', text: '¿Qué diferencias arquitectónicas principales hay entre una iglesia románica y una catedral gótica?' },
    { icon: '🌍', label: 'Población y ciudades', text: `Explícame las ideas clave de ${selectedTopicName || 'este bloque'} para preparar el examen.` }
  ] : subject.id === 'fisica-quimica' ? [
    { icon: '🔬', label: 'Factores de conversión', text: '¿Cómo se hacen los factores de conversión para pasar de km/h a m/s paso a paso?' },
    { icon: '⚗️', label: 'Cambio físico vs químico', text: '¿Cuál es la diferencia entre un cambio físico y un cambio químico? Ponme ejemplos.' },
    { icon: '⚖️', label: 'Densidad y unidades SI', text: '¿Cómo se relacionan masa, volumen y densidad? ¿En qué unidades se miden en el SI?' },
    { icon: '🧪', label: 'Estados de la materia', text: `¿Me puedes explicar los conceptos clave de ${selectedTopicName || 'este tema'}?` }
  ] : [
    { icon: '➕', label: 'Regla de los signos', text: 'Explícame la regla de los signos en operaciones combinadas con números enteros.' },
    { icon: '➗', label: 'Ecuaciones de 1er grado', text: '¿Qué pasos debo seguir para resolver una ecuación con paréntesis y denominadores?' },
    { icon: '📐', label: 'Teorema de Pitágoras', text: '¿Cómo se aplica el Teorema de Pitágoras para calcular la hipotenusa o un cateto?' },
    { icon: '🎯', label: 'Ejercicio de examen', text: `Ponme un ejercicio tipo examen de ${selectedTopicName || 'este tema'} para practicar.` }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-5xl mx-auto px-4 sm:px-6 py-4">
      {/* Tutor Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 mb-2 shadow-xs shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl border border-slate-200 dark:border-slate-700 shrink-0">
              {subject.tutorAvatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {subject.tutorName}
                </h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                  {subject.shortName}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {subject.tutorRole} · Currículo LOMLOE Cuenca
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateToChallenges}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg text-amber-700 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-900/50 border border-amber-200 dark:border-amber-900 transition-colors"
            >
              <Award className="w-3.5 h-3.5" />
              Retos de {subject.shortName}
            </button>
            {messages.length > 0 && (
              <button
                onClick={onClearHistory}
                title="Reiniciar conversación"
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Topic Selector Filter Pill Bar */}
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-semibold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
            Unidad activa:
          </span>
          {subject.topics.map((t) => {
            const isSelected = selectedTopicName === t.name;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTopicName(t.name)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {t.name}
              </button>
            );
          })}
        </div>

        {/* Socratic Covenant Notice */}
        <div className="mt-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>
            <strong>Método Socrático:</strong> {subject.tutorName} te guiará con pistas y preguntas orientadoras para que comprendas {subject.name} por ti mismo sin darte la respuesta hecha.
          </span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-slate-50/50 dark:bg-slate-900/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-3xl shadow-xs mb-3 border border-slate-200 dark:border-slate-700">
              {subject.tutorAvatar}
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              ¿En qué puedo ayudarte hoy en {subject.name}?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mb-4">
              Unidad actual: <strong className="text-blue-600 dark:text-blue-400">{selectedTopicName}</strong>. Escribe tu duda o usa las sugerencias rápidas:
            </p>

            {/* Subject-specific quick prompt suggestions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-xl text-left">
              {quickPrompts.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickPrompt(qp.text)}
                  className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex flex-col gap-0.5"
                >
                  <span className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <span>{qp.icon}</span>
                    <span>{qp.label}</span>
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                    "{qp.text}"
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => {
            const isUser = msg.role === 'user';
            const messageHintsCount = msg.hints?.length || 0;
            const revealedCount = revealedHints[msg.id] || 0;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-base shrink-0 shadow-xs">
                    {subject.tutorAvatar}
                  </div>
                )}

                <div className={`max-w-[85%] sm:max-w-[75%] space-y-2.5 ${isUser ? 'items-end' : 'items-start'}`}>
                  {/* Chat bubble */}
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      isUser
                        ? 'bg-blue-600 text-white rounded-br-xs'
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-xs shadow-xs'
                    }`}
                  >
                    {/* Key concept kicker */}
                    {msg.keyConcept && (
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                        Concepto: {msg.keyConcept}
                      </div>
                    )}

                    <div className="whitespace-pre-wrap">{msg.content}</div>

                    {/* Reflection Question Box */}
                    {msg.reflectionQuestion && (
                      <div className="mt-3 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200 text-xs">
                        <div className="font-semibold flex items-center gap-1.5 mb-1">
                          <HelpCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          Pregunta para reflexionar:
                        </div>
                        <p>{msg.reflectionQuestion}</p>
                        <button
                          onClick={() => setInputText(`Sobre tu pregunta de "${(msg.reflectionQuestion || '').slice(0, 35)}...": `)}
                          className="mt-2 text-[11px] font-medium text-amber-700 dark:text-amber-300 hover:underline flex items-center gap-1"
                        >
                          Responder a esta pregunta <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Socratic Progressive Hints Revealer */}
                  {messageHintsCount > 0 && (
                    <div className="bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 p-3 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                          <span>Pistas graduales ({revealedCount} de {messageHintsCount} desbloqueadas)</span>
                        </div>
                        {revealedCount < messageHintsCount && (
                          <button
                            onClick={() => handleRevealNextHint(msg.id, messageHintsCount)}
                            className="px-2 py-1 text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded transition-colors"
                          >
                            + Desbloquear pista {revealedCount + 1}
                          </button>
                        )}
                      </div>

                      {/* Render unlocked hints */}
                      <div className="space-y-1.5">
                        {msg.hints?.slice(0, revealedCount).map((hint, idx) => (
                          <div
                            key={idx}
                            className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                          >
                            <span className="font-semibold text-amber-600 dark:text-amber-400 mr-1.5">
                              Pista {idx + 1}:
                            </span>
                            {hint}
                          </div>
                        ))}
                      </div>

                      {revealedCount === 0 && (
                        <p className="text-[11px] text-slate-400 italic">
                          ¿Te has atascado? Haz clic en "Desbloquear pista 1" para recibir una ayuda orientativa sin que te dé la respuesta.
                        </p>
                      )}
                    </div>
                  )}

                  <span className="text-[10px] text-slate-400 px-1 block">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            );
          })
        )}

        {/* Loading / Thinking message */}
        {isLoading && (
          <div className="flex gap-3 justify-start items-center">
            <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-base shrink-0 shadow-xs">
              {subject.tutorAvatar}
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-spin" />
              <span>{subject.tutorName} está analizando tu duda socráticamente...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="mt-3 shrink-0">
        <div className="flex items-center gap-2 p-1.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 focus-within:border-blue-500 dark:focus-within:border-blue-500 shadow-xs transition-colors">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Pregunta a ${subject.tutorName} sobre ${selectedTopicName || subject.shortName}...`}
            className="flex-1 px-3 py-2 text-sm bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Enviar</span>
          </button>
        </div>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center mt-1.5">
          TutorSanJose fomenta el aprendizaje autónomo para 2º de ESO (LOMLOE CLM).
        </p>
      </form>
    </div>
  );
};
