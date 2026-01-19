import { useTranslation } from 'react-i18next';
import { X, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

interface AutoTaskSetupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onEnable: () => void;
  onSkip: () => void;
  planningStartDate?: string;
  weddingDate?: string;
}

export default function AutoTaskSetupDialog({
  isOpen,
  onClose,
  onEnable,
  onSkip,
  planningStartDate,
  weddingDate
}: AutoTaskSetupDialogProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const hasDates = planningStartDate && weddingDate;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Automatische Aufgabenverteilung
              </h2>
              <p className="text-sm text-gray-500">
                Spare Zeit mit intelligenter Planung
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {!hasDates && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900 mb-1">
                  Daten erforderlich
                </h3>
                <p className="text-sm text-amber-800">
                  Um automatische Aufgaben zu erstellen, benötigen wir dein Hochzeitsdatum und optional dein Planungsstartdatum.
                  Bitte gib diese Informationen in den Einstellungen ein.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 text-lg">
              Wie funktioniert es?
            </h3>

            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Intelligente Verteilung</h4>
                  <p className="text-sm text-gray-600">
                    Basierend auf deinem Planungsfenster werden automatisch passende Aufgaben erstellt und zeitlich verteilt.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Dynamische Anpassung</h4>
                  <p className="text-sm text-gray-600">
                    Wenn sich dein Hochzeitsdatum ändert, werden System-Aufgaben automatisch neu berechnet.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Flexible Kontrolle</h4>
                  <p className="text-sm text-gray-600">
                    Deine eigenen Aufgaben erhalten nur einen Hinweis bei Datumsänderungen - du behältst die volle Kontrolle.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {hasDates && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Deine Planung</h4>
              <div className="space-y-1 text-sm">
                <p className="text-blue-800">
                  <span className="font-medium">Planungsstart:</span>{' '}
                  {new Date(planningStartDate).toLocaleDateString('de-DE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </p>
                <p className="text-blue-800">
                  <span className="font-medium">Hochzeitsdatum:</span>{' '}
                  {new Date(weddingDate).toLocaleDateString('de-DE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex gap-3 justify-end border-t">
          <button
            onClick={onSkip}
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Später entscheiden
          </button>
          <button
            onClick={onEnable}
            disabled={!hasDates}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Aufgaben automatisch erstellen
          </button>
        </div>
      </div>
    </div>
  );
}
