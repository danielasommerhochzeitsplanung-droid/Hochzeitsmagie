import { useTranslation } from 'react-i18next';

export default function CalendarModule() {
  const { t } = useTranslation();

  const handleAddEntry = () => {
    alert('Kalendereintrag hinzufügen - Coming Soon');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
            0 Einträge
          </span>
        </div>
        <button
          onClick={handleAddEntry}
          className="px-6 py-2 rounded-md transition-all hover:opacity-90"
          style={{
            backgroundColor: '#d6b15b',
            color: 'white',
            fontFamily: 'Open Sans, sans-serif',
            fontWeight: 600
          }}
        >
          Eintrag hinzufügen
        </button>
      </div>

      <div className="bg-gray-50 border-2 rounded-lg p-8 text-center" style={{ borderColor: '#d6b15b' }}>
        <p style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontSize: '0.95rem' }}>
          {t('common.coming_soon')}
        </p>
      </div>
    </div>
  );
}
