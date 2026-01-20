import { useState, useEffect } from 'react';
import { AlertTriangle, X, Download } from 'lucide-react';
import { getStorageQuotaInfo } from '../utils/storageQuota';

interface StorageQuotaBannerProps {
  onExport: () => void;
}

export default function StorageQuotaBanner({ onExport }: StorageQuotaBannerProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [percentageUsed, setPercentageUsed] = useState(0);

  useEffect(() => {
    const checkQuota = () => {
      const quotaInfo = getStorageQuotaInfo();
      setPercentageUsed(quotaInfo.percentageUsed);

      const sessionKey = 'storageQuotaBannerDismissed';
      const isDismissed = sessionStorage.getItem(sessionKey) === 'true';

      if (quotaInfo.percentageUsed >= 80 && !isDismissed) {
        setShowBanner(true);
      } else {
        setShowBanner(false);
      }
    };

    checkQuota();
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('storageQuotaBannerDismissed', 'true');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  const isCritical = percentageUsed >= 90;

  return (
    <div
      className="w-full px-6 py-3 flex items-center justify-between gap-4"
      style={{
        backgroundColor: isCritical ? '#ef4444' : '#fbbf24',
        color: '#ffffff',
        fontFamily: 'Open Sans, sans-serif',
        fontSize: '0.9rem',
      }}
    >
      <div className="flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
        <span className="font-medium">
          {isCritical
            ? 'Achtung: Speicher fast voll. Bitte jetzt Daten exportieren.'
            : 'Dein Speicher wird knapp. Bitte exportiere deine Daten als Backup.'}
        </span>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={onExport}
          className="px-4 py-1.5 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all flex items-center gap-2"
          style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '0.85rem' }}
        >
          <Download className="w-4 h-4" />
          Daten exportieren
        </button>
        <button
          onClick={handleDismiss}
          className="p-1.5 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all"
          title="Ausblenden"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
