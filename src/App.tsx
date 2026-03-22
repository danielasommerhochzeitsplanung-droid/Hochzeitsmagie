import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Settings, Save, Download, Upload } from 'lucide-react';
import { useWeddingData } from './contexts/WeddingDataContext';
import LanguageSwitcher from './components/LanguageSwitcher';
import SettingsModal from './components/SettingsModal';
import StorageQuotaBanner from './components/StorageQuotaBanner';
import ModuleCard from './components/ModuleCard';
import GuestsModule from './components/GuestsModule';
import VendorsModule from './components/VendorsModule';
import EventsModule from './components/EventsModule';
import CalendarModule from './components/CalendarModule';
import TodosModule from './components/TodosModule';
import SupportTeamModule from './components/SupportTeamModule';
import LocationsModule from './components/LocationsModule';
import BudgetModule from './components/BudgetModule';
import SeatingModule from './components/SeatingModule';
import ScrollToTopButton from './components/ScrollToTopButton';
import FirstSetupDialog from './components/FirstSetupDialog';

interface WeddingData {
  id?: string;
  bride_name: string;
  groom_name: string;
  wedding_date: string;
}

type ModuleType = 'calendar' | 'guests' | 'todos' | 'vendors' | 'support_team' | 'locations' | 'events' | 'budget' | 'seating' | null;

function App() {
  const { t } = useTranslation();
  const { weddingData: contextWeddingData, updateWeddingData, manualSave, exportData, importData, storageChangeCounter, taskModalTrigger, addGuest, loadTasksFromMaster, tasks } = useWeddingData();
  const [weddingData, setWeddingData] = useState<WeddingData | null>(null);
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [activeModule, setActiveModule] = useState<ModuleType>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showSetupDialog, setShowSetupDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (contextWeddingData.couple_name_1 && contextWeddingData.wedding_date) {
      setWeddingData({
        bride_name: contextWeddingData.couple_name_1,
        groom_name: contextWeddingData.couple_name_2 || '',
        wedding_date: contextWeddingData.wedding_date,
      });
    } else {
      setShowSetupDialog(true);
    }
  }, [contextWeddingData]);

  useEffect(() => {
    if (weddingData) {
      calculateDaysRemaining(weddingData.wedding_date);
      const interval = setInterval(() => {
        calculateDaysRemaining(weddingData.wedding_date);
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [weddingData]);

  useEffect(() => {
    if (taskModalTrigger && activeModule !== 'todos') {
      setActiveModule('todos');
    }
  }, [taskModalTrigger, activeModule]);

  const calculateDaysRemaining = (date: string) => {
    const today = new Date();
    const weddingDay = new Date(date);
    const difference = weddingDay.getTime() - today.getTime();
    const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
    setDaysRemaining(days);
  };

  const handleSetupComplete = async (data: {
    partner1: string;
    partner2: string;
    gender1: 'male' | 'female' | '';
    gender2: 'male' | 'female' | '';
    weddingDate: string;
    planningStartDate: string;
    loadTasks: boolean;
  }) => {
    await updateWeddingData({
      couple_name_1: data.partner1,
      couple_name_2: data.partner2,
      couple_gender_1: data.gender1,
      couple_gender_2: data.gender2,
      wedding_date: data.weddingDate,
      planning_start_date: data.planningStartDate,
      auto_tasks_enabled: true,
    });

    addGuest({
      name: data.partner1,
      number_of_adults: 1,
      side: 'Beide',
      specific_relationship: 'other',
      relationship_category: 'wedding_couple',
      save_the_date_status: '★',
      invitation_status: '★',
      rsvp_status: 'accepted',
      attendance_status: 'confirmed',
      peanut_allergy: false,
      tree_nut_allergy: false,
      gluten_intolerance: false,
      lactose_intolerance: false,
      halal: false,
      gift_received: 'no',
      thank_you_sent: false,
      is_child: false,
      seated_with_parents: false,
      archived: false,
    });

    addGuest({
      name: data.partner2,
      number_of_adults: 1,
      side: 'Beide',
      specific_relationship: 'other',
      relationship_category: 'wedding_couple',
      save_the_date_status: '★',
      invitation_status: '★',
      rsvp_status: 'accepted',
      attendance_status: 'confirmed',
      peanut_allergy: false,
      tree_nut_allergy: false,
      gluten_intolerance: false,
      lactose_intolerance: false,
      halal: false,
      gift_received: 'no',
      thank_you_sent: false,
      is_child: false,
      seated_with_parents: false,
      archived: false,
    });

    if (data.loadTasks) {
      const allCategories = [
        'ceremony_legal',
        'location_venue',
        'styling_atmosphere',
        'styling_outfit',
        'vendors_services',
        'guests_communication',
        'organization_closure'
      ];

      await loadTasksFromMaster(allCategories);
    }

    setShowSetupDialog(false);
    setWeddingData({
      bride_name: data.partner1,
      groom_name: data.partner2,
      wedding_date: data.weddingDate,
    });
  };

  const handleDownload = () => {
    exportData();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!confirm(t('settings.import_confirm') || 'Möchten Sie die aktuellen Daten wirklich überschreiben?')) {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = event.target?.result as string;
        importData(jsonData);
        alert(t('settings.import_success') || 'Daten erfolgreich importiert!');
      } catch (error) {
        alert(t('settings.import_error') || 'Fehler beim Importieren der Daten. Bitte überprüfen Sie das Dateiformat.');
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };


  return (
    <>
      <FirstSetupDialog isOpen={showSetupDialog} onComplete={handleSetupComplete} />
      {weddingData && activeModule && (
        <div className="min-h-screen bg-white">
          <StorageQuotaBanner onExport={handleDownload} storageChangeCounter={storageChangeCounter} />
          <LanguageSwitcher />
          <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
          <header className="bg-white border-b border-gray-200 py-7 px-6 relative">
            <div className="absolute top-6 right-6 flex gap-2">
              <button
                onClick={handleDownload}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                title="Daten exportieren"
              >
                <Download className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={handleUploadClick}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                title="Daten importieren"
              >
                <Upload className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={manualSave}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                title="Speichern"
              >
                <Save className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                title={t('settings.title')}
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
            <h1 className="text-3xl text-center mb-3" style={{ fontFamily: 'Cinzel, serif', color: '#3b3b3d', fontWeight: 'normal' }}>
              {t('dashboard.header_title', { brideName: weddingData.bride_name, groomName: weddingData.groom_name })}
            </h1>
            <div className="text-center">
              <p className="text-xl" style={{ fontFamily: 'Open Sans, sans-serif', color: '#d6b15b' }}>
                {t(daysRemaining === 1 ? 'dashboard.countdown_text_singular' : 'dashboard.countdown_text_plural', { days: daysRemaining })}
              </p>
            </div>
          </header>
          <main className="container mx-auto px-6 py-8">
            <div className="mb-6">
              <button
                onClick={() => setActiveModule(null)}
                className="px-5 py-2 rounded-lg text-white transition-all hover:opacity-90"
                style={{ fontFamily: 'Open Sans, sans-serif', backgroundColor: '#d6b15b', fontSize: '0.9rem' }}
              >
                {t('navigation.back_to_overview')}
              </button>
            </div>
            <h2 className="text-2xl mb-6" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontWeight: 'normal' }}>
              {t(`modules.${activeModule}`)}
            </h2>
            {activeModule === 'guests' ? (
              <GuestsModule />
            ) : activeModule === 'vendors' ? (
              <VendorsModule />
            ) : activeModule === 'events' ? (
              <EventsModule />
            ) : activeModule === 'calendar' ? (
              <CalendarModule />
            ) : activeModule === 'todos' ? (
              <TodosModule />
            ) : activeModule === 'support_team' ? (
              <SupportTeamModule />
            ) : activeModule === 'locations' ? (
              <LocationsModule />
            ) : activeModule === 'budget' ? (
              <BudgetModule />
            ) : activeModule === 'seating' ? (
              <SeatingModule />
            ) : null}
          </main>
          <ScrollToTopButton />
        </div>
      )}
      {weddingData && !activeModule && (
        <div className="min-h-screen bg-white">
          <StorageQuotaBanner onExport={handleDownload} storageChangeCounter={storageChangeCounter} />
          <LanguageSwitcher />
          <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        <header className="bg-white border-b border-gray-200 py-7 px-6 relative">
          <div className="absolute top-6 right-6 flex gap-2">
            <button
              onClick={handleDownload}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Daten exportieren"
            >
              <Download className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={handleUploadClick}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Daten importieren"
            >
              <Upload className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={manualSave}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Speichern"
            >
              <Save className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title={t('settings.title')}
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
          <h1 className="text-3xl text-center mb-3" style={{ fontFamily: 'Cinzel, serif', color: '#3b3b3d', fontWeight: 'normal' }}>
            {t('dashboard.header_title', { brideName: weddingData.bride_name, groomName: weddingData.groom_name })}
          </h1>
          <div className="text-center">
            <p className="text-xl" style={{ fontFamily: 'Open Sans, sans-serif', color: '#d6b15b' }}>
              {t(daysRemaining === 1 ? 'dashboard.countdown_text_singular' : 'dashboard.countdown_text_plural', { days: daysRemaining })}
            </p>
          </div>
        </header>
        <main className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ModuleCard emoji="📅" title={t('modules.calendar')} onClick={() => setActiveModule('calendar')} />
            <ModuleCard emoji="👥" title={t('modules.guests')} onClick={() => setActiveModule('guests')} />
            <ModuleCard emoji="✓" title={t('modules.todos')} onClick={() => setActiveModule('todos')} />
            <ModuleCard emoji="🤝" title={t('modules.vendors')} onClick={() => setActiveModule('vendors')} />
            <ModuleCard emoji="💪" title={t('modules.support_team')} onClick={() => setActiveModule('support_team')} />
            <ModuleCard emoji="📍" title={t('modules.locations')} onClick={() => setActiveModule('locations')} />
            <ModuleCard emoji="🎉" title={t('modules.events')} onClick={() => setActiveModule('events')} />
            <ModuleCard emoji="💰" title={t('modules.budget')} onClick={() => setActiveModule('budget')} />
            <ModuleCard emoji="🪑" title={t('modules.seating')} onClick={() => setActiveModule('seating')} />
          </div>
        </main>
      </div>
      )}
    </>
  );
}

export default App;
