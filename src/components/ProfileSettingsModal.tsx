import React, { useState } from 'react';
import { User, School, Trash2, Check, X, Sparkles, BookOpen } from 'lucide-react';
import { StudentProfile } from '../types';
import { storage } from '../lib/storage';

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onSaveProfile: (profile: StudentProfile) => void;
  onClearSampleData: () => void;
}

export const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  onClearSampleData
}) => {
  const [name, setName] = useState(profile.name);
  const [grade, setGrade] = useState(profile.grade);
  const [school, setSchool] = useState(profile.school);
  const [city, setCity] = useState(profile.city);
  const [currentTerm, setCurrentTerm] = useState(profile.currentTerm);
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(() => storage.getCustomApiKey());

  // Actualizar valores al abrir si el profile cambia
  React.useEffect(() => {
    if (isOpen) {
      setName(profile.name);
      setGrade(profile.grade);
      setSchool(profile.school);
      setCity(profile.city);
      setCurrentTerm(profile.currentTerm);
      setApiKeyInput(storage.getCustomApiKey());
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSaveProfile({
      ...profile,
      name: name.trim(),
      grade: grade.trim(),
      school: school.trim(),
      city: city.trim(),
      currentTerm
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  const handleClear = () => {
    onClearSampleData();
    setShowConfirmClear(false);
    onClose();
  };

  const handleSaveApiKey = () => {
    storage.saveCustomApiKey(apiKeyInput);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Datos del Alumno y Ajustes
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              Nombre de tu hijo *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Introduce el nombre de tu hijo..."
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Este nombre aparecerá en los saludos del tutor y en los informes PDF oficiales.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Curso
              </label>
              <input
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Trimestre actual
              </label>
              <select
                value={currentTerm}
                onChange={(e) => setCurrentTerm(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="1º Trimestre">1º Trimestre</option>
                <option value="2º Trimestre">2º Trimestre</option>
                <option value="3º Trimestre">3º Trimestre</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Instituto / Centro
              </label>
              <input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Localidad
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>¡Guardado!</span>
                </>
              ) : (
                <span>Guardar cambios</span>
              )}
            </button>
          </div>
        </form>

        {/* Optional Gemini API Key Section for personal Vercel deployments */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Clave de API Gemini (opcional para Vercel)
            </span>
            <span className="text-[10px] text-slate-400">Personal</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Si despliegas en tu propio Vercel y deseas que el tutor socrático y generador de retos usen IA directa sin configurar variables de servidor:
          </p>
          <div className="flex gap-2">
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-[11px]"
            />
            <button
              type="button"
              onClick={handleSaveApiKey}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-lg text-[11px] font-semibold"
            >
              Guardar clave
            </button>
          </div>
        </div>

        {/* Clear Sample Data Section */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                Limpiar datos de prueba iniciales
              </span>
              <span className="text-[11px] text-slate-400 block">
                Vacía las tareas y notas precargadas de ejemplo.
              </span>
            </div>

            {!showConfirmClear ? (
              <button
                type="button"
                onClick={() => setShowConfirmClear(true)}
                className="px-2.5 py-1.5 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg text-[11px] font-medium transition-colors"
              >
                Limpiar ejemplos
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-2 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded text-[11px] font-semibold"
                >
                  Sí, vaciar
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirmClear(false)}
                  className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded text-[11px]"
                >
                  No
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
