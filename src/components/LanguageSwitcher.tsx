import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="fixed top-6 right-6 flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md border border-gray-200">
      <Globe size={20} style={{ color: '#d6b15b' }} />
      <button
        onClick={() => changeLanguage('de')}
        className={`px-3 py-1 rounded transition-all ${
          i18n.language === 'de'
            ? ''
            : 'opacity-60 hover:opacity-100'
        }`}
        style={{
          fontFamily: 'Open Sans, sans-serif',
          color: i18n.language === 'de' ? '#d6b15b' : '#3b3b3d',
          fontWeight: 'normal'
        }}
      >
        DE
      </button>
      <span style={{ color: '#d6b15b' }}>|</span>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded transition-all ${
          i18n.language === 'en'
            ? ''
            : 'opacity-60 hover:opacity-100'
        }`}
        style={{
          fontFamily: 'Open Sans, sans-serif',
          color: i18n.language === 'en' ? '#d6b15b' : '#3b3b3d',
          fontWeight: 'normal'
        }}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
