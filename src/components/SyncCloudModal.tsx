import React, { useState } from 'react';
import { 
  Cloud, 
  Upload, 
  Download, 
  Check, 
  AlertCircle, 
  X, 
  Smartphone, 
  Laptop, 
  RotateCw,
  Copy
} from 'lucide-react';
import { storage } from '../lib/storage';

interface SyncCloudModalProps {
  isOpen: boolean;
  onClose: () => void;
  lastSynced: string | null;
  onTriggerCloudSync: () => Promise<boolean>;
  onDataImported: () => void;
}

export const SyncCloudModal: React.FC<SyncCloudModalProps> = ({
  isOpen,
  onClose,
  lastSynced,
  onTriggerCloudSync,
  onDataImported
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccessMessage, setSyncSuccessMessage] = useState<string | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [copiedAppUrl, setCopiedAppUrl] = useState(false);

  if (!isOpen) return null;

  const handleManualSync = async () => {
    setIsSyncing(true);
    setSyncSuccessMessage(null);
    const success = await onTriggerCloudSync();
    setIsSyncing(false);
    if (success) {
      setSyncSuccessMessage('¡Datos sincronizados con éxito en la nube del IES San José!');
      setTimeout(() => setSyncSuccessMessage(null), 4000);
    }
  };

  const handleExportBackup = () => {
    const dataStr = storage.exportData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TutorSanJose_CopiaSeguridad_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = storage.importData(content);
      if (success) {
        setImportError(null);
        setSyncSuccessMessage('¡Copia de seguridad restaurada correctamente!');
        onDataImported();
      } else {
        setImportError('El archivo no tiene el formato JSON válido de TutorSanJose.');
      }
    };
    reader.readAsText(file);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedAppUrl(true);
    setTimeout(() => setCopiedAppUrl(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Sincronización en Tiempo Real y Copias
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live status banner */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Estado de Sincronización Multidispositivo
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Activa
            </span>
          </div>

          <p className="text-slate-500 dark:text-slate-400 text-[11px]">
            {lastSynced
              ? `Última sincronización: ${new Date(lastSynced).toLocaleString('es-ES')}`
              : 'Los datos se guardan reactivamente en tu dispositivo y se replican al servidor.'}
          </p>

          <button
            onClick={handleManualSync}
            disabled={isSyncing}
            className="w-full mt-2 py-2 px-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Sincronizando...' : 'Sincronizar ahora con la nube'}</span>
          </button>

          {syncSuccessMessage && (
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 rounded-md text-[11px] font-medium flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              {syncSuccessMessage}
            </div>
          )}
        </div>

        {/* Multi-device Access */}
        <div className="space-y-2 text-xs">
          <span className="font-bold text-slate-800 dark:text-slate-200 block">
            Acceso simultáneo en móvil, tablet y ordenador
          </span>
          <div className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <Laptop className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate flex-1 font-mono">
              {window.location.href}
            </span>
            <button
              onClick={handleCopyUrl}
              className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 rounded flex items-center gap-1 shrink-0"
            >
              {copiedAppUrl ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copiedAppUrl ? 'Copiado' : 'Copiar URL'}</span>
            </button>
          </div>
        </div>

        {/* Manual Backup and Cloud Drive Export */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs">
          <span className="font-bold text-slate-800 dark:text-slate-200 block">
            Copias de Seguridad (Google Drive / OneDrive / Archivo Local)
          </span>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleExportBackup}
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-300 flex flex-col items-center text-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="font-semibold text-[11px]">Descargar Copia JSON</span>
              <span className="text-[10px] text-slate-400">Guarda tus notas y tareas</span>
            </button>

            <label className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-300 flex flex-col items-center text-center gap-1.5 cursor-pointer transition-colors">
              <Upload className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="font-semibold text-[11px]">Restaurar Copia</span>
              <span className="text-[10px] text-slate-400">Importar archivo JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="hidden"
              />
            </label>
          </div>

          {importError && (
            <div className="p-2 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 rounded-md text-[11px] flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
              {importError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
