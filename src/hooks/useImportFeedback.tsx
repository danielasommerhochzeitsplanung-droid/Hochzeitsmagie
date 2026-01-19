import React, { useState, useCallback } from 'react';
import { ImportResult } from '../lib/storage-adapter';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

interface ImportFeedbackState {
  visible: boolean;
  result: ImportResult | null;
}

export function useImportFeedback() {
  const [state, setState] = useState<ImportFeedbackState>({
    visible: false,
    result: null,
  });

  const showFeedback = useCallback((result: ImportResult) => {
    setState({ visible: true, result });
  }, []);

  const hideFeedback = useCallback(() => {
    setState({ visible: false, result: null });
  }, []);

  const FeedbackComponent = useCallback(() => {
    if (!state.visible || !state.result) return null;

    const { ok, imported, errors } = state.result;
    const MAX_DISPLAYED_ERRORS = 5;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
          <button
            onClick={hideFeedback}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>

          {ok ? (
            <>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Import erfolgreich
                </h2>
              </div>
              <p className="text-gray-600 mb-4">
                {imported} {imported === 1 ? 'Datensatz' : 'Datensätze'} erfolgreich importiert.
              </p>
              <button
                onClick={hideFeedback}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                OK
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-8 h-8 text-red-500 flex-shrink-0" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Import fehlgeschlagen
                </h2>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 font-medium mb-2">Fehler:</p>
                <ul className="space-y-1 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg max-h-60 overflow-y-auto">
                  {errors.slice(0, MAX_DISPLAYED_ERRORS).map((error, index) => (
                    <li key={index} className="break-words">
                      • {error}
                    </li>
                  ))}
                  {errors.length > MAX_DISPLAYED_ERRORS && (
                    <li className="text-gray-500 italic">
                      ... und {errors.length - MAX_DISPLAYED_ERRORS} weitere Fehler
                    </li>
                  )}
                </ul>
              </div>

              <button
                onClick={hideFeedback}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Schließen
              </button>
            </>
          )}
        </div>
      </div>
    );
  }, [state, hideFeedback]);

  return {
    showFeedback,
    hideFeedback,
    FeedbackComponent,
  };
}
