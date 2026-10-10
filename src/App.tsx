import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SubjectBar } from './components/SubjectBar';
import { DashboardHome } from './components/DashboardHome';
import { SocraticTutorView } from './components/SocraticTutorView';
import { ChallengeView } from './components/ChallengeView';
import { CalendarView } from './components/CalendarView';
import { ProgressDashboard } from './components/ProgressDashboard';
import { AcademicReportModal } from './components/AcademicReportModal';
import { SyncCloudModal } from './components/SyncCloudModal';
import { ProfileSettingsModal } from './components/ProfileSettingsModal';
import { SUBJECTS, INITIAL_CHALLENGES } from './data/curriculum';
import { storage } from './lib/storage';
import { 
  AcademicGrade, 
  AcademicTask, 
  Challenge, 
  ChatMessage, 
  QuizAttempt, 
  StudentProfile, 
  SubjectId, 
  ThemeMode 
} from './types';

export default function App() {
  // Navigation & Subject State
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'tutors' | 'challenges' | 'calendar' | 'progress'>('dashboard');
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId>('matematicas');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');

  // Academic Database State
  const [profile, setProfile] = useState<StudentProfile>(storage.getProfile());
  const [tasks, setTasks] = useState<AcademicTask[]>(storage.getTasks());
  const [grades, setGrades] = useState<AcademicGrade[]>(storage.getGrades());
  const [chats, setChats] = useState<Record<SubjectId, ChatMessage[]>>(storage.getChats());
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);
  const [attempts, setAttempts] = useState<QuizAttempt[]>(storage.getAttempts());
  const [sessions, setSessions] = useState(storage.getSessions());

  // UI & Network State
  const [theme, setTheme] = useState<ThemeMode>(storage.getTheme());
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSendingChat, setIsSendingChat] = useState(false);
  const [isGeneratingAIChallenge, setIsGeneratingAIChallenge] = useState(false);
  const [lastSynced, setLastSynced] = useState<string | null>(storage.getLastSync());
  const [isSynced, setIsSynced] = useState(true);

  // Initialize Theme on Mount & Change
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Initial Sync check with backend
  useEffect(() => {
    fetch('/api/sync')
      .then(res => res.json())
      .then(data => {
        if (data.hasData && data.timestamp) {
          setLastSynced(data.timestamp);
        }
      })
      .catch(err => console.log('Sync server active locally:', err));
  }, []);

  const handleToggleTheme = () => {
    const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    storage.saveTheme(nextTheme);
  };

  // Chat message submission
  const handleSendMessage = async (text: string, topicName?: string) => {
    const userMessage: ChatMessage = {
      id: 'msg-user-' + Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
      subjectId: selectedSubjectId
    };

    const currentSubjectMessages = [...(chats[selectedSubjectId] || []), userMessage];
    const updatedChats = {
      ...chats,
      [selectedSubjectId]: currentSubjectMessages
    };

    setChats(updatedChats);
    storage.saveChats(updatedChats);
    setIsSendingChat(true);

    try {
      const response = await fetch('/api/tutor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectId: selectedSubjectId,
          message: text,
          topicName: topicName || 'General 2º ESO',
          conversationHistory: currentSubjectMessages.slice(-6).map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: 'msg-tutor-' + Date.now(),
        role: 'assistant',
        content: data.explanation || 'Vamos a analizar este problema juntos con el método socrático.',
        timestamp: new Date().toISOString(),
        subjectId: selectedSubjectId,
        hints: data.hints || [],
        reflectionQuestion: data.reflectionQuestion,
        keyConcept: data.keyConcept
      };

      const finalChats = {
        ...chats,
        [selectedSubjectId]: [...currentSubjectMessages, assistantMessage]
      };

      setChats(finalChats);
      storage.saveChats(finalChats);
    } catch (err) {
      console.error('Error fetching tutor response:', err);

      const fallbackMsg: ChatMessage = {
        id: 'msg-err-' + Date.now(),
        role: 'assistant',
        content: `Como tutor socrático de 2º ESO para ${selectedSubjectId}, quiero proponerte que desgloses tu duda: ¿cuál es el dato clave que te pide calcular o identificar el enunciado?`,
        timestamp: new Date().toISOString(),
        subjectId: selectedSubjectId,
        hints: [
          'Vuelve a leer la pregunta e identifica la palabra clave.',
          'Revisa el ejemplo resuelto en tu libro de texto.',
          'Escribe tu primer paso o cálculo y te diré si vas por buen camino.'
        ],
        reflectionQuestion: '¿Por qué paso crees que es más adecuado comenzar?'
      };

      const finalChats = {
        ...chats,
        [selectedSubjectId]: [...currentSubjectMessages, fallbackMsg]
      };
      setChats(finalChats);
      storage.saveChats(finalChats);
    } finally {
      setIsSendingChat(false);
    }
  };

  const handleClearHistory = () => {
    const updatedChats = {
      ...chats,
      [selectedSubjectId]: []
    };
    setChats(updatedChats);
    storage.saveChats(updatedChats);
  };

  // AI Challenge Generator
  const handleGenerateAIChallenge = async (subjectId: SubjectId, topicName: string): Promise<Challenge | null> => {
    setIsGeneratingAIChallenge(true);
    try {
      const response = await fetch('/api/tutor/challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectId,
          topicName,
          difficulty: 'medio'
        })
      });

      if (!response.ok) throw new Error('Failed to generate challenge');

      const data = await response.json();
      const newChallenge: Challenge = {
        id: 'ch-ai-' + Date.now(),
        subjectId,
        topicName,
        question: data.question,
        options: data.options,
        correctIndex: data.correctIndex,
        explanation: data.explanation,
        hints: data.hints || [],
        difficulty: 'medio'
      };

      setChallenges(prev => [newChallenge, ...prev]);
      return newChallenge;
    } catch (err) {
      console.error('Error generating AI challenge:', err);
      return null;
    } finally {
      setIsGeneratingAIChallenge(false);
    }
  };

  // Quiz Attempts
  const handleSaveAttempt = (attempt: QuizAttempt) => {
    const updated = [attempt, ...attempts];
    setAttempts(updated);
    storage.saveAttempts(updated);
  };

  // Tasks & Calendar Handlers
  const handleAddTask = (task: AcademicTask) => {
    const updated = [...tasks, task];
    setTasks(updated);
    storage.saveTasks(updated);
  };

  const handleToggleCompleteTask = (taskId: string) => {
    const updated = tasks.map(t => (t.id === taskId ? { ...t, completed: !t.completed } : t));
    setTasks(updated);
    storage.saveTasks(updated);
  };

  const handleDeleteTask = (taskId: string) => {
    const updated = tasks.filter(t => t.id !== taskId);
    setTasks(updated);
    storage.saveTasks(updated);
  };

  // Grades Handlers
  const handleAddGrade = (grade: AcademicGrade) => {
    const updated = [grade, ...grades];
    setGrades(updated);
    storage.saveGrades(updated);
  };

  // Real-time Cloud Sync Trigger
  const handleTriggerCloudSync = async (): Promise<boolean> => {
    try {
      const fullPayload = {
        profile,
        tasks,
        grades,
        attempts,
        sessions,
        lastUpdated: new Date().toISOString()
      };

      const res = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload: fullPayload })
      });

      if (res.ok) {
        const data = await res.json();
        const now = data.timestamp || new Date().toISOString();
        setLastSynced(now);
        storage.setLastSync(now);
        setIsSynced(true);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Error syncing:', e);
      return false;
    }
  };

  const handleSaveProfile = (updatedProfile: StudentProfile) => {
    setProfile(updatedProfile);
    storage.saveProfile(updatedProfile);
  };

  const handleClearSampleData = () => {
    setTasks([]);
    storage.saveTasks([]);
    setGrades([]);
    storage.saveGrades([]);
  };

  const handleDataImported = () => {
    setProfile(storage.getProfile());
    setTasks(storage.getTasks());
    setGrades(storage.getGrades());
    setChats(storage.getChats());
    setAttempts(storage.getAttempts());
    setSessions(storage.getSessions());
  };

  const currentSubject = SUBJECTS.find(s => s.id === selectedSubjectId) || SUBJECTS[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Primary Top Bar (3-Zone Contract) */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenReport={() => setIsReportModalOpen(true)}
        onOpenSync={() => setIsSyncModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        studentName={profile.name}
        isSynced={isSynced}
      />

      {/* Subject Bar strip for relevant tabs */}
      {(currentTab === 'tutors' || currentTab === 'challenges') && (
        <SubjectBar
          subjects={SUBJECTS}
          selectedSubjectId={selectedSubjectId}
          onSelectSubject={setSelectedSubjectId}
          selectedTopicId={selectedTopicId}
          onSelectTopic={setSelectedTopicId}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'dashboard' && (
          <DashboardHome
            profile={profile}
            subjects={SUBJECTS}
            tasks={tasks}
            onSelectSubject={setSelectedSubjectId}
            onNavigateToTab={setCurrentTab}
            onToggleCompleteTask={handleToggleCompleteTask}
            onOpenReport={() => setIsReportModalOpen(true)}
            onOpenProfile={() => setIsProfileModalOpen(true)}
          />
        )}

        {currentTab === 'tutors' && (
          <SocraticTutorView
            subject={currentSubject}
            messages={chats[selectedSubjectId] || []}
            onSendMessage={handleSendMessage}
            onClearHistory={handleClearHistory}
            onNavigateToChallenges={() => setCurrentTab('challenges')}
            isLoading={isSendingChat}
          />
        )}

        {currentTab === 'challenges' && (
          <ChallengeView
            subjects={SUBJECTS}
            selectedSubjectId={selectedSubjectId}
            onSelectSubject={setSelectedSubjectId}
            challenges={challenges}
            attempts={attempts}
            onSaveAttempt={handleSaveAttempt}
            onGenerateAIChallenge={handleGenerateAIChallenge}
            isGeneratingAI={isGeneratingAIChallenge}
          />
        )}

        {currentTab === 'calendar' && (
          <CalendarView
            tasks={tasks}
            subjects={SUBJECTS}
            onAddTask={handleAddTask}
            onToggleCompleteTask={handleToggleCompleteTask}
            onDeleteTask={handleDeleteTask}
          />
        )}

        {currentTab === 'progress' && (
          <ProgressDashboard
            subjects={SUBJECTS}
            grades={grades}
            sessions={sessions}
            onAddGrade={handleAddGrade}
          />
        )}
      </main>

      {/* Modals */}
      <AcademicReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        profile={profile}
        subjects={SUBJECTS}
        grades={grades}
        tasks={tasks}
      />

      <SyncCloudModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        lastSynced={lastSynced}
        onTriggerCloudSync={handleTriggerCloudSync}
        onDataImported={handleDataImported}
      />

      <ProfileSettingsModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
        onClearSampleData={handleClearSampleData}
      />
    </div>
  );
}
