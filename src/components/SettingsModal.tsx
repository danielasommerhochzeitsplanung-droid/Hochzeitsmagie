import React, { useState, useEffect } from 'react';
import { X, Download, Upload, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useWeddingData } from '../contexts/WeddingDataContext';
import { StorageInfo } from './StorageInfo';

interface Person {
  name: string;
  gender: 'male' | 'female' | '';
  vegetarian: boolean;
  vegan: boolean;
  lactose_intolerant: boolean;
  gluten_intolerant: boolean;
  allergy_nuts: boolean;
  allergy_peanuts: boolean;
  allergy_eggs: boolean;
  allergy_fish: boolean;
  allergy_shellfish: boolean;
  allergy_soy: boolean;
  allergy_sesame: boolean;
  allergy_other: string;
  halal: boolean;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { t } = useTranslation();
  const { weddingData, updateWeddingData, exportData, importData, clearAllData, tasks, updateTask } = useWeddingData();
  const [loading, setLoading] = useState(false);
  const [totalBudget, setTotalBudget] = useState<string>('');
  const [weddingDate, setWeddingDate] = useState<string>('');
  const [planningStartDate, setPlanningStartDate] = useState<string>('');
  const [originalWeddingDate, setOriginalWeddingDate] = useState<string>('');
  const [showDateChangeDialog, setShowDateChangeDialog] = useState(false);

  const [person1, setPerson1] = useState<Person>({
    name: '',
    gender: '',
    vegetarian: false,
    vegan: false,
    lactose_intolerant: false,
    gluten_intolerant: false,
    allergy_nuts: false,
    allergy_peanuts: false,
    allergy_eggs: false,
    allergy_fish: false,
    allergy_shellfish: false,
    allergy_soy: false,
    allergy_sesame: false,
    allergy_other: '',
    halal: false,
  });

  const [person2, setPerson2] = useState<Person>({
    name: '',
    gender: '',
    vegetarian: false,
    vegan: false,
    lactose_intolerant: false,
    gluten_intolerant: false,
    allergy_nuts: false,
    allergy_peanuts: false,
    allergy_eggs: false,
    allergy_fish: false,
    allergy_shellfish: false,
    allergy_soy: false,
    allergy_sesame: false,
    allergy_other: '',
    halal: false,
  });

  useEffect(() => {
    if (isOpen) {
      loadSettings();
    }
  }, [isOpen, weddingData]);

  const loadSettings = () => {
    try {
      setTotalBudget(weddingData.total_budget?.toString() || '');
      setWeddingDate(weddingData.wedding_date || '');
      setPlanningStartDate(weddingData.planning_start_date || '');
      setOriginalWeddingDate(weddingData.wedding_date || '');
      setPerson1({
        name: weddingData.couple_name_1 || '',
        gender: '',
        vegetarian: false,
        vegan: false,
        lactose_intolerant: false,
        gluten_intolerant: false,
        allergy_nuts: false,
        allergy_peanuts: false,
        allergy_eggs: false,
        allergy_fish: false,
        allergy_shellfish: false,
        allergy_soy: false,
        allergy_sesame: false,
        allergy_other: '',
        halal: false,
      });
      setPerson2({
        name: weddingData.couple_name_2 || '',
        gender: '',
        vegetarian: false,
        vegan: false,
        lactose_intolerant: false,
        gluten_intolerant: false,
        allergy_nuts: false,
        allergy_peanuts: false,
        allergy_eggs: false,
        allergy_fish: false,
        allergy_shellfish: false,
        allergy_soy: false,
        allergy_sesame: false,
        allergy_other: '',
        halal: false,
      });
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleExport = () => {
    exportData();
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const MAX_FILE_SIZE = 2 * 1024 * 1024;

        if (file.size > MAX_FILE_SIZE) {
          alert(t('settings.importFileTooLarge') || 'Die Datei ist zu groß (maximal 2 MB erlaubt).');
          return;
        }

        const reader = new FileReader();
        reader.onload = (event: any) => {
          try {
            const jsonData = event.target.result as string;
            if (window.confirm(t('settings.confirmImport') || 'Alle Daten überschreiben?')) {
              importData(jsonData);
              window.location.reload();
            }
          } catch (error) {
            console.error('Import error:', error);
            alert(t('settings.importError') || 'Fehler beim Importieren der Daten. Bitte überprüfen Sie das Dateiformat.');
          }
        };
        reader.onerror = () => {
          alert(t('settings.importReadError') || 'Fehler beim Lesen der Datei.');
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleClearAll = () => {
    const confirmMessage = t('settings.confirmClearAll') ||
      'WARNUNG: Dies löscht ALLE Hochzeitsdaten unwiderruflich!\n\nMöchtest du vorher ein Backup herunterladen?';

    if (window.confirm(confirmMessage)) {
      handleExport();

      setTimeout(() => {
        const finalConfirm = t('settings.confirmClearAllFinal') ||
          'Backup heruntergeladen.\n\nJETZT wirklich ALLE Daten löschen?\n\nDies kann NICHT rückgängig gemacht werden!';

        if (window.confirm(finalConfirm)) {
          clearAllData();
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }
      }, 1000);
    }
  };

  const adjustAutoTasks = () => {
    if (!weddingDate || !originalWeddingDate) return;

    const newWeddingDate = new Date(weddingDate + 'T12:00:00');
    const oldWeddingDate = new Date(originalWeddingDate + 'T12:00:00');

    if (newWeddingDate.getTime() === oldWeddingDate.getTime()) return;

    const autoTasks = tasks.filter(task => task.is_system_generated && !task.completed);

    autoTasks.forEach(task => {
      if (!task.due_date) return;

      const oldDueDate = new Date(task.due_date + 'T12:00:00');
      const daysBeforeOldWedding = Math.floor((oldWeddingDate.getTime() - oldDueDate.getTime()) / (1000 * 60 * 60 * 24));

      const newDueDate = new Date(newWeddingDate);
      newDueDate.setDate(newDueDate.getDate() - daysBeforeOldWedding);

      const newStartDate = task.start_date ? (() => {
        const oldStartDate = new Date(task.start_date + 'T12:00:00');
        const daysBeforeOldWeddingStart = Math.floor((oldWeddingDate.getTime() - oldStartDate.getTime()) / (1000 * 60 * 60 * 24));
        const calculatedStartDate = new Date(newWeddingDate);
        calculatedStartDate.setDate(calculatedStartDate.getDate() - daysBeforeOldWeddingStart);
        return calculatedStartDate.toISOString().split('T')[0];
      })() : undefined;

      updateTask(task.id, {
        due_date: newDueDate.toISOString().split('T')[0],
        start_date: newStartDate,
      });
    });
  };

  const handleSave = () => {
    if (!person1.name || !person2.name) {
      alert('Bitte beide Namen eingeben');
      return;
    }

    if (weddingDate && originalWeddingDate && weddingDate !== originalWeddingDate) {
      const autoTasksCount = tasks.filter(task => task.is_system_generated && !task.completed).length;
      if (autoTasksCount > 0) {
        setShowDateChangeDialog(true);
        return;
      }
    }

    saveSettings();
  };

  const saveSettings = () => {
    setLoading(true);
    try {
      updateWeddingData({
        couple_name_1: person1.name,
        couple_name_2: person2.name,
        total_budget: totalBudget ? parseFloat(totalBudget) : undefined,
        wedding_date: weddingDate || undefined,
        planning_start_date: planningStartDate || undefined,
      });
      onClose();
    } catch (error: any) {
      console.error('Error saving settings:', error);
      alert(`Fehler beim Speichern: ${error.message || 'Unbekannter Fehler'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChangeConfirm = (adjustTasks: boolean) => {
    if (adjustTasks) {
      adjustAutoTasks();
    }
    saveSettings();
    setShowDateChangeDialog(false);
  };

  const getPersonLabel = (personNum: 1 | 2) => {
    const p1Gender = person1.gender;
    const p2Gender = person2.gender;

    if (!p1Gender || !p2Gender) {
      return t(`settings.person${personNum}`);
    }

    if (p1Gender === 'female' && p2Gender === 'male') {
      return personNum === 1 ? t('settings.bride') : t('settings.groom');
    } else if (p1Gender === 'male' && p2Gender === 'female') {
      return personNum === 1 ? t('settings.groom') : t('settings.bride');
    } else {
      return t(`settings.partner${personNum}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-semibold text-gray-800">{t('settings.title')}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {t('settings.coupleManagement')}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-700">{getPersonLabel(1)}</h4>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPerson1({ ...person1, gender: 'male' })}
                      className={`text-2xl p-2 rounded transition-all ${
                        person1.gender === 'male'
                          ? 'bg-blue-100 ring-2 ring-blue-500'
                          : 'hover:bg-gray-200'
                      }`}
                    >
                      👨
                    </button>
                    <button
                      type="button"
                      onClick={() => setPerson1({ ...person1, gender: 'female' })}
                      className={`text-2xl p-2 rounded transition-all ${
                        person1.gender === 'female'
                          ? 'bg-pink-100 ring-2 ring-pink-500'
                          : 'hover:bg-gray-200'
                      }`}
                    >
                      👩
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('settings.name')}
                  </label>
                  <input
                    type="text"
                    value={person1.name}
                    onChange={(e) => setPerson1({ ...person1, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder={t('settings.namePlaceholder')}
                  />
                </div>

                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">
                    {t('settings.dietaryRestrictions')}
                  </h5>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={person1.vegetarian}
                        onChange={(e) => setPerson1({ ...person1, vegetarian: e.target.checked })}
                        className="rounded"
                      />
                      <span className="text-sm">{t('guests.vegetarian')}</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={person1.vegan}
                        onChange={(e) => setPerson1({ ...person1, vegan: e.target.checked })}
                        className="rounded"
                      />
                      <span className="text-sm">{t('guests.vegan')}</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={person1.lactose_intolerant}
                        onChange={(e) =>
                          setPerson1({ ...person1, lactose_intolerant: e.target.checked })
                        }
                        className="rounded"
                      />
                      <span className="text-sm">{t('guests.lactoseIntolerant')}</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={person1.gluten_intolerant}
                        onChange={(e) =>
                          setPerson1({ ...person1, gluten_intolerant: e.target.checked })
                        }
                        className="rounded"
                      />
                      <span className="text-sm">{t('guests.glutenIntolerant')}</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={person1.halal}
                        onChange={(e) => setPerson1({ ...person1, halal: e.target.checked })}
                        className="rounded"
                      />
                      <span className="text-sm">{t('guests.halal')}</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-700">{getPersonLabel(2)}</h4>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPerson2({ ...person2, gender: 'male' })}
                      className={`text-2xl p-2 rounded transition-all ${
                        person2.gender === 'male'
                          ? 'bg-blue-100 ring-2 ring-blue-500'
                          : 'hover:bg-gray-200'
                      }`}
                    >
                      👨
                    </button>
                    <button
                      type="button"
                      onClick={() => setPerson2({ ...person2, gender: 'female' })}
                      className={`text-2xl p-2 rounded transition-all ${
                        person2.gender === 'female'
                          ? 'bg-pink-100 ring-2 ring-pink-500'
                          : 'hover:bg-gray-200'
                      }`}
                    >
                      👩
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('settings.name')}
                  </label>
                  <input
                    type="text"
                    value={person2.name}
                    onChange={(e) => setPerson2({ ...person2, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder={t('settings.namePlaceholder')}
                  />
                </div>

                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">
                    {t('settings.dietaryRestrictions')}
                  </h5>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={person2.vegetarian}
                        onChange={(e) => setPerson2({ ...person2, vegetarian: e.target.checked })}
                        className="rounded"
                      />
                      <span className="text-sm">{t('guests.vegetarian')}</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={person2.vegan}
                        onChange={(e) => setPerson2({ ...person2, vegan: e.target.checked })}
                        className="rounded"
                      />
                      <span className="text-sm">{t('guests.vegan')}</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={person2.lactose_intolerant}
                        onChange={(e) =>
                          setPerson2({ ...person2, lactose_intolerant: e.target.checked })
                        }
                        className="rounded"
                      />
                      <span className="text-sm">{t('guests.lactoseIntolerant')}</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={person2.gluten_intolerant}
                        onChange={(e) =>
                          setPerson2({ ...person2, gluten_intolerant: e.target.checked })
                        }
                        className="rounded"
                      />
                      <span className="text-sm">{t('guests.glutenIntolerant')}</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={person2.halal}
                        onChange={(e) => setPerson2({ ...person2, halal: e.target.checked })}
                        className="rounded"
                      />
                      <span className="text-sm">{t('guests.halal')}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {t('budget.stats.totalBudget')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('settings.totalBudget')}
                </label>
                <input
                  type="number"
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder={t('settings.totalBudgetPlaceholder')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('settings.weddingDate')}
                </label>
                <input
                  type="date"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Planungszeitraum
            </h3>
            <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Hinweis:</span> Das Planungsstartdatum bestimmt, ab wann die To-Dos verteilt werden.
                Die 40 Standard-Aufgaben werden gleichmäßig zwischen diesem Datum und dem Hochzeitsdatum verteilt.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Planungsstartdatum
              </label>
              <input
                type="date"
                value={planningStartDate}
                onChange={(e) => setPlanningStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ab wann möchtet ihr mit der Planung beginnen?"
              />
              <p className="text-xs text-gray-500 mt-1">
                Leer lassen = Heutiges Datum wird beim Generieren der To-Dos verwendet
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Automatische Aufgaben
            </h3>
            <div className="bg-green-50 border border-green-200 rounded p-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="text-sm text-green-800 mb-2">
                    <span className="font-semibold">Intelligente Planung:</span> Aktiviere automatische Aufgabengenerierung basierend auf deinem Planungsfenster.
                  </p>
                  <ul className="text-xs text-green-700 space-y-1 ml-4 list-disc">
                    <li>System-Tasks werden automatisch an Datumsänderungen angepasst</li>
                    <li>Deine eigenen Tasks erhalten nur Hinweise bei Änderungen</li>
                    <li>Spare Zeit mit intelligenter Task-Verteilung</li>
                  </ul>
                </div>
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={weddingData.auto_tasks_enabled || false}
                    onChange={(e) => {
                      updateWeddingData({ auto_tasks_enabled: e.target.checked });
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Datenmanagement
            </h3>

            <div className="mb-6">
              <StorageInfo />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handleExport}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <Download className="w-5 h-5" />
                Daten exportieren
              </button>
              <button
                onClick={handleImport}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Upload className="w-5 h-5" />
                Daten importieren
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Exportiere deine Daten regelmäßig als Backup. Mit Import kannst du gesicherte Daten wiederherstellen.
            </p>
          </div>

          <div className="border-t-4 border-red-200 pt-6">
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">⚠️</span>
                GEFÄHRLICHER BEREICH
              </h3>
              <p className="text-sm text-red-700 mb-4">
                Diese Aktion löscht alle Hochzeitsdaten unwiderruflich. Ein Backup wird automatisch erstellt.
              </p>
              <button
                onClick={handleClearAll}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all font-semibold shadow-lg hover:shadow-xl"
              >
                <Trash2 className="w-5 h-5" />
                Komplett zurücksetzen
              </button>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
          >
            {t('common.cancel')}
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? t('program.saving') : t('common.save')}
          </button>
        </div>
      </div>

      {showDateChangeDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4" style={{ color: '#3b3b3d' }}>
              Hochzeitsdatum geändert
            </h3>
            <p className="text-gray-700 mb-6" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Das Hochzeitsdatum wurde von{' '}
              <strong>{new Date(originalWeddingDate).toLocaleDateString('de-DE')}</strong> auf{' '}
              <strong>{new Date(weddingDate).toLocaleDateString('de-DE')}</strong> geändert.
            </p>
            <p className="text-gray-700 mb-6" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Möchtest du die <strong>automatischen Empfehlungen</strong> ({tasks.filter(t => t.is_system_generated && !t.completed).length} Tasks)
              an das neue Datum anpassen?
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-6">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Hinweis:</span> Nur Tasks mit 🤖 (automatische Empfehlungen)
                werden angepasst. Deine eigenen Tasks mit 💍 bleiben unverändert.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleDateChangeConfirm(true)}
                className="flex-1 px-6 py-3 rounded-md transition-all hover:opacity-90 font-semibold"
                style={{
                  backgroundColor: '#d6b15b',
                  color: 'white',
                  fontFamily: 'Open Sans, sans-serif',
                }}
              >
                Ja, anpassen
              </button>
              <button
                onClick={() => handleDateChangeConfirm(false)}
                className="flex-1 px-6 py-3 rounded-md border-2 transition-all hover:bg-gray-50 font-semibold"
                style={{
                  borderColor: '#d6b15b',
                  color: '#3b3b3d',
                  fontFamily: 'Open Sans, sans-serif',
                }}
              >
                Nein, beibehalten
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
