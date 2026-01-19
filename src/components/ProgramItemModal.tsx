import React, { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { storage } from '../lib/storage-adapter';
import { programItemTemplates, programItemTypes } from './programItemTemplates';
import { useTranslation } from 'react-i18next';

interface ProgramItem {
  id?: string;
  event_id: string;
  title: string;
  type: string;
  start_time: string | null;
  end_time: string | null;
  duration_minutes: number;
  location: string;
  description: string;
  order_index: number;
  notes: string;
  support_team_id?: string | null;
}

interface ProgramItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  item: ProgramItem | null;
  onSave: () => void;
  nextOrderIndex: number;
}

export default function ProgramItemModal({ isOpen, onClose, eventId, item, onSave, nextOrderIndex }: ProgramItemModalProps) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [formData, setFormData] = useState<ProgramItem>({
    event_id: eventId,
    title: '',
    type: '',
    start_time: null,
    end_time: null,
    duration_minutes: 0,
    location: '',
    description: '',
    order_index: nextOrderIndex,
    notes: '',
    support_team_id: null
  });
  const [useTemplate, setUseTemplate] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [showCustomType, setShowCustomType] = useState(false);
  const [customType, setCustomType] = useState('');
  const [loading, setLoading] = useState(false);
  const [supportTeamMembers, setSupportTeamMembers] = useState<Array<{ id: string; name: string; role?: string }>>([]);
  const [eventDate, setEventDate] = useState<string>('');
  const [eventInfo, setEventInfo] = useState<{ name: string; date: string; startTime: string; endTime: string } | null>(null);

  useEffect(() => {
    loadSupportTeam();
    loadEventDate();
    loadEventInfo();
  }, [eventId]);

  const loadEventDate = () => {
    const event = storage.events.get(eventId);
    if (event && event.date) {
      setEventDate(event.date);
    }
  };

  const loadEventInfo = () => {
    const event = storage.events.get(eventId);
    if (event) {
      setEventInfo({
        name: event.title || '',
        date: event.date || '',
        startTime: event.start_time || '',
        endTime: event.end_time || ''
      });
    }
  };

  useEffect(() => {
    if (item) {
      setFormData({
        ...item,
        support_team_id: item.support_team_id || null
      });
      if (!programItemTypes.includes(item.type) && item.type !== '') {
        setShowCustomType(true);
        setCustomType(item.type);
      }
    } else {
      setFormData({
        event_id: eventId,
        title: '',
        type: '',
        start_time: null,
        end_time: null,
        duration_minutes: 0,
        location: '',
        description: '',
        order_index: nextOrderIndex,
        notes: '',
        support_team_id: null
      });
      setUseTemplate(false);
      setSelectedTemplate('');
      setShowCustomType(false);
      setCustomType('');
    }
  }, [item, eventId, nextOrderIndex]);

  const loadSupportTeam = () => {
    const data = storage.supportTeam.getAll()
      .filter((m: any) => !m.archived)
      .map((m: any) => ({ id: m.id, name: m.name, role: m.role }))
      .sort((a: any, b: any) => a.name.localeCompare(b.name));
    setSupportTeamMembers(data);
  };

  const handleTemplateSelect = (templateId: string) => {
    if (templateId === '') {
      setSelectedTemplate('');
      return;
    }

    if (templateId === 'custom') {
      setFormData({
        event_id: eventId,
        title: '',
        type: '',
        start_time: null,
        end_time: null,
        duration_minutes: 0,
        location: '',
        description: '',
        order_index: nextOrderIndex,
        notes: '',
        support_team_id: null
      });
      setSelectedTemplate('custom');
      return;
    }

    const template = programItemTemplates[parseInt(templateId)];
    if (template) {
      setFormData({
        ...formData,
        title: currentLang === 'de' ? template.name_de : template.name_en,
        type: template.type,
        duration_minutes: template.durationMinutes,
        description: currentLang === 'de' ? template.description_de : template.description_en
      });
      setSelectedTemplate(templateId);
    }
  };

  const getTypeTranslation = (type: string): string => {
    const typeMap: { [key: string]: string } = {
      'Arrival': t('program.typeArrival'),
      'Reception': t('program.typeReception'),
      'Ceremony': t('program.typeCeremony'),
      'Congratulations': t('program.typeCongratulations'),
      'Photos': t('program.typePhotos'),
      'Coffee': t('program.typeCoffee'),
      'Dinner': t('program.typeDinner'),
      'Speeches': t('program.typeSpeeches'),
      'Dance': t('program.typeDance'),
      'Cake': t('program.typeCake'),
      'Food': t('program.typeFood'),
      'Activity': t('program.typeActivity'),
      'Transport': t('program.typeTransport'),
      'Exit': t('program.typeExit'),
      'Custom': t('program.typeCustom')
    };
    return typeMap[type] || type;
  };

  const calculateEndTime = (startTime: string | null, durationMinutes: number): string | null => {
    if (!startTime || durationMinutes === 0) return null;

    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + durationMinutes;
    const endHours = Math.floor(totalMinutes / 60) % 24;
    const endMinutes = totalMinutes % 60;

    return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
  };

  const handleStartTimeChange = (startTime: string) => {
    const timeValue = startTime || null;
    setFormData({
      ...formData,
      start_time: timeValue,
      end_time: calculateEndTime(timeValue, formData.duration_minutes)
    });
  };

  const handleDurationChange = (duration: number) => {
    setFormData({
      ...formData,
      duration_minutes: duration,
      end_time: calculateEndTime(formData.start_time, duration)
    });
  };

  const cleanUuidField = (value: any): string | null => {
    if (!value || value === '' || value === 'null' || value === 'undefined') {
      return null;
    }
    return value;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const finalType = showCustomType ? customType : formData.type;

      const baseData = {
        event_id: eventId,
        title: formData.title,
        type: finalType,
        start_time: formData.start_time || null,
        end_time: formData.end_time || null,
        duration_minutes: formData.duration_minutes,
        location: formData.location,
        description: formData.description,
        order_index: formData.order_index,
        notes: formData.notes,
        support_team_id: formData.support_team_id || null
      };

      if (item?.id) {
        storage.programItems.update(item.id, baseData);
      } else {
        storage.programItems.create(baseData);
      }

      onSave();
      onClose();
    } catch (error: any) {
      console.error('Error saving program item:', error);
      alert(`Fehler beim Speichern: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (!item?.id || !confirm(t('program.confirmDelete'))) return;

    setLoading(true);
    try {
      storage.programItems.delete(item.id);
      onSave();
      onClose();
    } catch (error) {
      console.error('Error deleting program item:', error);
      alert('Error deleting program item');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold">
            {item ? t('program.editItem') : t('program.addItem')}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {eventInfo && (
          <div className="px-6 pt-4 pb-2">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-gray-700">
                📅 <span className="font-medium">{eventInfo.name}</span> - {new Date(eventInfo.date).toLocaleDateString(currentLang === 'de' ? 'de-DE' : 'en-US', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}, {eventInfo.startTime} - {eventInfo.endTime} {currentLang === 'de' ? 'Uhr' : ''}
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!item && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  id="useTemplate"
                  checked={useTemplate}
                  onChange={(e) => {
                    setUseTemplate(e.target.checked);
                    if (!e.target.checked) {
                      setSelectedTemplate('');
                    }
                  }}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="useTemplate" className="text-sm font-medium text-gray-900 cursor-pointer">
                  {t('program.useTemplate')}
                </label>
              </div>

              {useTemplate && (
                <div>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => handleTemplateSelect(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                  >
                    <option value="">{t('program.chooseTemplate')}</option>
                    <option
                      value="custom"
                      style={{ fontWeight: 600 }}
                    >
                      📝 {t('program.customProgramItem')}
                    </option>
                    <option disabled>──────────</option>
                    {programItemTemplates.map((template, index) => (
                      <option key={index} value={index.toString()}>
                        {currentLang === 'de' ? template.name_de : template.name_en}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('program.itemTitleRequired')}
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('program.titlePlaceholder')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('program.typeOptional')}
            </label>
            {!showCustomType ? (
              <div className="flex gap-2">
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t('program.selectType')}</option>
                  {programItemTypes.filter(t => t !== 'Custom').map((type) => (
                    <option key={type} value={type}>
                      {getTypeTranslation(type)}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setShowCustomType(true)}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center gap-1 whitespace-nowrap"
                  title={t('program.customType')}
                >
                  <Plus size={16} />
                  {t('program.custom')}
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customType}
                  onChange={(e) => setCustomType(e.target.value)}
                  placeholder={t('program.enterCustomType')}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowCustomType(false);
                    setCustomType('');
                  }}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  {t('common.cancel')}
                </button>
              </div>
            )}
          </div>

          {eventDate && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('program.date')}
              </label>
              <input
                type="date"
                value={eventDate}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                title={t('program.dateFromEvent')}
              />
              <p className="text-xs text-gray-500 mt-1">{t('program.dateAutomatic')}</p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('program.startTime')}
              </label>
              <input
                type="time"
                value={formData.start_time || ''}
                onChange={(e) => handleStartTimeChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('program.duration')}
              </label>
              <input
                type="number"
                value={formData.duration_minutes}
                onChange={(e) => handleDurationChange(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('program.endTime')}
              </label>
              <input
                type="time"
                value={formData.end_time || ''}
                onChange={(e) => setFormData({ ...formData, end_time: e.target.value || null })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('program.location')}
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('program.supportTeamMember')}
            </label>
            <select
              value={formData.support_team_id || ''}
              onChange={(e) => {
                const value = e.target.value;
                setFormData({ ...formData, support_team_id: value === '' ? null : value });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{t('program.noSupportTeam')}</option>
              {supportTeamMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name} {member.role ? `(${member.role})` : ''}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('program.description')}
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('program.notes')}
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-between pt-4">
            <div>
              {item && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                  {t('program.delete')}
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {t('common.cancel')}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? t('program.saving') : t('common.save')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
