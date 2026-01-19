import { HardDrive, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { storage } from '../lib/storage-adapter';

export function StorageInfo() {
  const [stats, setStats] = useState<ReturnType<typeof storage.getStorageStats> | null>(null);

  useEffect(() => {
    const updateStats = () => {
      try {
        setStats(storage.getStorageStats());
      } catch (error) {
        console.error('Fehler beim Abrufen der Speicher-Statistiken:', error);
      }
    };

    updateStats();
    const interval = setInterval(updateStats, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!stats) return null;

  const isWarning = stats.usagePercent > 70;
  const isDanger = stats.usagePercent > 90;

  return (
    <div
      className={`rounded-lg p-4 border ${
        isDanger
          ? 'bg-red-50 border-red-200'
          : isWarning
          ? 'bg-yellow-50 border-yellow-200'
          : 'bg-gray-50 border-gray-200'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`p-2 rounded-lg ${
            isDanger
              ? 'bg-red-100 text-red-700'
              : isWarning
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          {isDanger || isWarning ? (
            <AlertTriangle className="h-5 w-5" />
          ) : (
            <HardDrive className="h-5 w-5" />
          )}
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">Speicherplatz</h3>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Verwendet:</span>
              <span className="font-medium">{stats.formattedSize}</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  isDanger
                    ? 'bg-red-500'
                    : isWarning
                    ? 'bg-yellow-500'
                    : 'bg-blue-500'
                }`}
                style={{ width: `${Math.min(stats.usagePercent, 100)}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              <span>{stats.usagePercent.toFixed(1)}% verwendet</span>
              <span>Max: {stats.formattedMax}</span>
            </div>
          </div>

          {isDanger && (
            <p className="text-sm text-red-700 mt-2">
              Speicher fast voll! Bitte exportieren Sie Ihre Daten und löschen Sie nicht benötigte Einträge.
            </p>
          )}
          {isWarning && !isDanger && (
            <p className="text-sm text-yellow-700 mt-2">
              Speicher wird knapp. Erwägen Sie einen Daten-Export.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
