import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SaveStatusIndicatorProps {
  status: 'idle' | 'saving' | 'saved' | 'error';
  errorMessage?: string;
}

export function SaveStatusIndicator({ status, errorMessage }: SaveStatusIndicatorProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (status === 'saving' || status === 'saved' || status === 'error') {
      setVisible(true);

      if (status === 'saved') {
        const timer = setTimeout(() => setVisible(false), 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [status]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg transition-all ${
          status === 'saving'
            ? 'bg-blue-50 text-blue-700 border border-blue-200'
            : status === 'saved'
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}
      >
        {status === 'saving' && (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm font-medium">Speichert...</span>
          </>
        )}
        {status === 'saved' && (
          <>
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-sm font-medium">Gespeichert</span>
          </>
        )}
        {status === 'error' && (
          <>
            <AlertCircle className="h-4 w-4" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Fehler beim Speichern</span>
              {errorMessage && (
                <span className="text-xs opacity-75">{errorMessage}</span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
