import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface QuickAddButton {
  icon: string;
  label: string;
  onClick: () => void;
}

interface QuickAddBarProps {
  buttons: QuickAddButton[];
}

export default function QuickAddBar({ buttons }: QuickAddBarProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200 mb-6">
      <span className="text-sm font-medium mr-2" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
        {t('common.quickAdd')}:
      </span>
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.onClick}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-md border transition-all hover:shadow-sm hover:scale-105"
          style={{
            borderColor: '#d6b15b',
            color: '#3b3b3d',
            fontFamily: 'Open Sans, sans-serif',
            fontSize: '0.85rem'
          }}
        >
          <span className="text-base">{button.icon}</span>
          <Plus className="w-3.5 h-3.5" style={{ color: '#d6b15b' }} />
          <span>{button.label}</span>
        </button>
      ))}
    </div>
  );
}
