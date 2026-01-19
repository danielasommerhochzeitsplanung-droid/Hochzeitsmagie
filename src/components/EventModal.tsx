import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, ChevronDown, ChevronUp, Plus, Trash2, Clock, AlertTriangle } from 'lucide-react';
import { storage } from '../lib/storage-adapter';
import { isValidUuid } from '../lib/uuid';
import { Event } from './EventsModule';
import { Vendor } from './VendorsModule';
import ProgramItemModal from './ProgramItemModal';
import VendorModal from './VendorModal';
import SupportTeamModal from './SupportTeamModal';
import LocationModal from './LocationModal';
import { findEventConflicts, formatEventTimeWithTransport } from '../utils/eventConflicts';

export interface EventContact {
  id?: string;
  event_id?: string;
  name: string;
  phone: string;
  email: string;
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<Event, 'id' | 'created_at'>, contacts: EventContact[], vendorIds: string[], supportTeamIds: string[]) => Promise<string | undefined>;
  event: Event | null;
  preselectedLocationId?: string;
  onRequestOpenProgramModal?: (eventId: string) => void;
}

interface CollapsibleSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  summary?: string;
}

function CollapsibleSection({ title, isOpen, onToggle, children, summary }: CollapsibleSectionProps) {
  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-100 transition-colors"
      >
        <div className="flex-1 text-left">
          <h3 className="font-semibold text-lg" style={{ color: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}>
            {title}
          </h3>
          {!isOpen && summary && (
            <p className="text-sm mt-1" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
              {summary}
            </p>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 flex-shrink-0 ml-2" style={{ color: '#d6b15b' }} />
        ) : (
          <ChevronDown className="w-5 h-5 flex-shrink-0 ml-2" style={{ color: '#d6b15b' }} />
        )}
      </button>
      {isOpen && (
        <div className="p-4 pt-0">
          {children}
        </div>
      )}
    </div>
  );
}

export default function EventModal({ isOpen, onClose, onSave, event, preselectedLocationId, onRequestOpenProgramModal }: EventModalProps) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const [mode, setMode] = useState<'create' | 'assign'>('create');
  const [existingEvents, setExistingEvents] = useState<Event[]>([]);
  const [selectedExistingEventId, setSelectedExistingEventId] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [newEventId, setNewEventId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name_de: '',
    name_en: '',
    emoji: '🎉',
    active: true,
    is_enabled: false,
    date: '',
    time_start: '',
    time_end: '',
    location_id: '',
    transport_info: '',
    transport_time_start: '',
    transport_time_end: '',
    transport_type: '',
    transport_from: '',
    transport_to: '',
    transport_provider: '',
    transport_notes: '',
  });

  const [contacts, setContacts] = useState<EventContact[]>([]);
  const [selectedVendorIds, setSelectedVendorIds] = useState<string[]>([]);
  const [selectedSupportTeamIds, setSelectedSupportTeamIds] = useState<string[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [locations, setLocations] = useState<Array<{ id: string; name: string }>>([]);
  const [programItems, setProgramItems] = useState<any[]>([]);
  const [showProgramItemModal, setShowProgramItemModal] = useState(false);
  const [selectedProgramItem, setSelectedProgramItem] = useState<any>(null);
  const [supportTeamMembers, setSupportTeamMembers] = useState<Array<{ id: string; name: string; phone: string; email: string; role: string }>>([]);
  const [vendorContacts, setVendorContacts] = useState<Array<{ id: string; name: string; phone: string; email: string; vendor_name: string }>>([]);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [showSupportTeamModal, setShowSupportTeamModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const [sectionsOpen, setSectionsOpen] = useState({
    basic: true,
    dateTime: true,
    location: true,
    transport: true,
    program: true,
    contacts: true,
    vendors: true,
    supportTeam: true,
  });

  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [conflictingEvents, setConflictingEvents] = useState<Event[]>([]);

  useEffect(() => {
    loadVendors();
    loadLocations();
    loadSupportTeam();
    loadVendorContacts();
    loadAllEvents();
    if (preselectedLocationId && isOpen) {
      loadExistingEvents();
    }
  }, [isOpen, preselectedLocationId]);

  useEffect(() => {
    if (preselectedLocationId && isOpen && !event) {
      setFormData(prev => ({ ...prev, location_id: preselectedLocationId }));
      setMode('create');
      setSelectedExistingEventId('');
    }
  }, [preselectedLocationId, isOpen, event]);

  useEffect(() => {
    if (!isOpen) return;

    const currentEvent: Event = {
      id: event?.id || '',
      name_de: formData.name_de,
      name_en: formData.name_en,
      emoji: formData.emoji,
      active: formData.active,
      is_enabled: formData.is_enabled,
      date: formData.date || null,
      time_start: formData.time_start || null,
      time_end: formData.time_end || null,
      location_id: formData.location_id || null,
      transport_info: formData.transport_info,
      transport_time_start: formData.transport_time_start || null,
      transport_time_end: formData.transport_time_end || null,
      transport_type: formData.transport_type,
      transport_from: formData.transport_from,
      transport_to: formData.transport_to,
      transport_provider: formData.transport_provider,
      transport_notes: formData.transport_notes,
    };

    const conflicts = findEventConflicts(currentEvent, allEvents);
    setConflictingEvents(conflicts);
  }, [formData.date, formData.time_start, formData.time_end, formData.transport_time_start, formData.transport_time_end, allEvents, isOpen]);

  useEffect(() => {
    if (event && event.id && isValidUuid(event.id) && isOpen) {
      setFormData({
        name_de: event.name_de,
        name_en: event.name_en,
        emoji: event.emoji,
        active: event.active,
        is_enabled: event.is_enabled,
        date: event.date || '',
        time_start: event.time_start || '',
        time_end: event.time_end || '',
        location_id: event.location_id || '',
        transport_info: event.transport_info || '',
        transport_time_start: event.transport_time_start || '',
        transport_time_end: event.transport_time_end || '',
        transport_type: event.transport_type || '',
        transport_from: event.transport_from || '',
        transport_to: event.transport_to || '',
        transport_provider: event.transport_provider || '',
        transport_notes: event.transport_notes || '',
      });
      loadEventContacts(event.id);
      loadEventVendors(event.id);
      loadEventSupportTeam(event.id);
      loadProgramItems(event.id);
    } else if (isOpen && (!event || !event.id || !isValidUuid(event.id))) {
      setFormData({
        name_de: event?.name_de || '',
        name_en: event?.name_en || '',
        emoji: event?.emoji || '🎉',
        active: true,
        is_enabled: false,
        date: '',
        time_start: '',
        time_end: '',
        location_id: '',
        transport_info: '',
        transport_time_start: '',
        transport_time_end: '',
        transport_type: '',
        transport_from: '',
        transport_to: '',
        transport_provider: '',
        transport_notes: '',
      });
      setContacts([]);
      setSelectedVendorIds([]);
      setSelectedSupportTeamIds([]);
      setProgramItems([]);
    }
  }, [event, isOpen]);

  const loadVendors = () => {
    const data = storage.vendors.getAll()
      .filter((vendor: any) => !vendor.archived)
      .sort((a: any, b: any) => a.company_name.localeCompare(b.company_name));
    setVendors(data);
  };

  const loadLocations = () => {
    const data = storage.locations.getAll()
      .filter((loc: any) => !loc.archived)
      .map((loc: any) => ({ id: loc.id, name: loc.name }))
      .sort((a: any, b: any) => a.name.localeCompare(b.name));
    setLocations(data);
  };

  const loadSupportTeam = () => {
    const data = storage.supportTeam.getAll()
      .filter((member: any) => !member.archived)
      .map((member: any) => ({
        id: member.id,
        name: member.name,
        phone: member.phone || '',
        email: member.email || '',
        role: member.role || ''
      }))
      .sort((a: any, b: any) => a.name.localeCompare(b.name));
    setSupportTeamMembers(data);
  };

  const loadVendorContacts = () => {
    const data = storage.vendors.getAll();
    const contacts = data
      .filter((v: any) => v.contact_person || v.phone || v.email)
      .map((v: any) => ({
        id: v.id,
        name: v.contact_person || v.company_name,
        phone: v.phone || '',
        email: v.email || '',
        vendor_name: v.company_name
      }));
    setVendorContacts(contacts);
  };

  const loadExistingEvents = () => {
    const data = storage.events.getAll()
      .sort((a: any, b: any) => (a.date || '').localeCompare(b.date || ''));
    setExistingEvents(data);
  };

  const loadAllEvents = () => {
    const data = storage.events.getAll().filter((evt: any) => evt.active);
    const locations = storage.locations.getAll();

    const eventsWithLocation = data.map((evt: any) => {
      const location = locations.find((loc: any) => loc.id === evt.location_id);
      return {
        ...evt,
        location: location?.name || null
      };
    });
    setAllEvents(eventsWithLocation);
  };

  const loadEventContacts = (eventId: string) => {
    if (!eventId || !isValidUuid(eventId)) {
      console.warn('Invalid event ID for loading contacts:', eventId);
      setContacts([]);
      return;
    }
    setContacts([]);
  };

  const loadEventVendors = (eventId: string) => {
    if (!eventId || !isValidUuid(eventId)) {
      console.warn('Invalid event ID for loading vendors:', eventId);
      setSelectedVendorIds([]);
      return;
    }
    setSelectedVendorIds([]);
  };

  const loadEventSupportTeam = (eventId: string) => {
    if (!eventId || !isValidUuid(eventId)) {
      console.warn('Invalid event ID for loading support team:', eventId);
      setSelectedSupportTeamIds([]);
      return;
    }
    const assignments = storage.supportTeamEventAssignments.getAll()
      .filter((a: any) => a.event_id === eventId);
    setSelectedSupportTeamIds(assignments.map((a: any) => a.support_team_id));
  };

  const loadProgramItems = (eventId: string) => {
    if (!eventId || !isValidUuid(eventId)) {
      console.warn('Invalid event ID for loading program items:', eventId);
      setProgramItems([]);
      return;
    }

    const data = storage.programItems.getAll()
      .filter((item: any) => item.event_id === eventId)
      .sort((a: any, b: any) => a.order_index - b.order_index);

    const supportTeamMembers = storage.supportTeam.getAll();
    const itemsWithSupportTeam = data.map((item: any) => {
      const supportTeam = item.support_team_id
        ? supportTeamMembers.find((m: any) => m.id === item.support_team_id)
        : null;
      return {
        ...item,
        support_team: supportTeam ? { id: supportTeam.id, name: supportTeam.name, role: supportTeam.role } : undefined
      };
    });
    setProgramItems(itemsWithSupportTeam);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'assign' && selectedExistingEventId && preselectedLocationId) {
      storage.events.update(selectedExistingEventId, { location_id: preselectedLocationId });
      onClose();
      window.location.reload();
      return;
    }

    const dataToSave = {
      ...formData,
      name_de: formData.name_de || formData.name_en,
      name_en: formData.name_en || formData.name_de,
      date: formData.date || null,
      time_start: formData.time_start || null,
      time_end: formData.time_end || null,
      location_id: formData.location_id || null,
      transport_time_start: formData.transport_time_start || null,
      transport_time_end: formData.transport_time_end || null,
    };

    const newEventId = await onSave(dataToSave, contacts, selectedVendorIds, selectedSupportTeamIds);

    if (newEventId) {
      setNewEventId(newEventId);
      setShowSuccessDialog(true);
    }
  };

  const handleAddContact = () => {
    setContacts([...contacts, { name: '', phone: '', email: '' }]);
  };

  const handleRemoveContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const handleContactChange = (index: number, field: keyof EventContact, value: string) => {
    const newContacts = [...contacts];
    newContacts[index] = { ...newContacts[index], [field]: value };
    setContacts(newContacts);
  };

  const handleSelectContact = (index: number, type: 'support' | 'vendor', contactId: string) => {
    if (type === 'support') {
      const member = supportTeamMembers.find(m => m.id === contactId);
      if (member) {
        const newContacts = [...contacts];
        newContacts[index] = {
          ...newContacts[index],
          name: member.name,
          phone: member.phone || '',
          email: member.email || ''
        };
        setContacts(newContacts);
      }
    } else if (type === 'vendor') {
      const vendor = vendorContacts.find(v => v.id === contactId);
      if (vendor) {
        const newContacts = [...contacts];
        newContacts[index] = {
          ...newContacts[index],
          name: vendor.name,
          phone: vendor.phone || '',
          email: vendor.email || ''
        };
        setContacts(newContacts);
      }
    }
  };

  const handleVendorToggle = (vendorId: string) => {
    if (selectedVendorIds.includes(vendorId)) {
      setSelectedVendorIds(selectedVendorIds.filter(id => id !== vendorId));
    } else {
      setSelectedVendorIds([...selectedVendorIds, vendorId]);
    }
  };

  const handleSupportTeamToggle = (supportTeamId: string) => {
    if (selectedSupportTeamIds.includes(supportTeamId)) {
      setSelectedSupportTeamIds(selectedSupportTeamIds.filter(id => id !== supportTeamId));
    } else {
      setSelectedSupportTeamIds([...selectedSupportTeamIds, supportTeamId]);
    }
  };

  const handleAddProgramItem = () => {
    setSelectedProgramItem(null);
    setShowProgramItemModal(true);
  };

  const handleEditProgramItem = (item: any) => {
    setSelectedProgramItem(item);
    setShowProgramItemModal(true);
  };

  const handleProgramItemSaved = () => {
    if (event?.id && isValidUuid(event.id)) {
      loadProgramItems(event.id);
    }
  };

  const handleVendorSaved = (vendorData: Omit<Vendor, 'id' | 'created_at'>, contacts: any[]) => {
    try {
      const newVendor = storage.vendors.create(vendorData);
      loadVendors();
      loadVendorContacts();
      setShowVendorModal(false);
    } catch (error: any) {
      console.error('Error inserting vendor:', error);
      alert(`Fehler beim Speichern: ${error.message || error}`);
    }
  };

  const handleSupportTeamSaved = (memberData: any) => {
    try {
      storage.supportTeam.create(memberData);
      loadSupportTeam();
      setShowSupportTeamModal(false);
    } catch (error: any) {
      console.error('Error inserting support team member:', error);
      alert(`Fehler beim Speichern: ${error.message || error}`);
    }
  };

  const handleLocationSaved = (locationData: any) => {
    try {
      const newLocation = storage.locations.create(locationData);
      loadLocations();
      setFormData({ ...formData, location_id: newLocation.id });
      setShowLocationModal(false);
    } catch (error: any) {
      console.error('Error inserting location:', error);
      alert(`Fehler beim Speichern: ${error.message || error}`);
    }
  };

  const toggleSection = (section: keyof typeof sectionsOpen) => {
    setSectionsOpen(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const getBasicSummary = () => {
    return currentLang === 'de' ? formData.name_de : formData.name_en;
  };

  const getDateTimeSummary = () => {
    const parts = [];
    if (formData.date) {
      const date = new Date(formData.date);
      parts.push(date.toLocaleDateString(currentLang === 'de' ? 'de-DE' : 'en-US'));
    }
    if (formData.time_start) parts.push(`${formData.time_start.substring(0, 5)}`);
    if (formData.time_end) parts.push(`- ${formData.time_end.substring(0, 5)}`);
    return parts.join(' ');
  };

  const getLocationSummary = () => {
    const parts = [];
    if (formData.location_id) {
      const locationName = locations.find(l => l.id === formData.location_id)?.name || formData.location_id;
      parts.push(locationName);
    }
    if (formData.transport_info) parts.push('Transport');
    return parts.join(' • ');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
            {event ? t('events.editEvent') : t('events.addEvent')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" style={{ color: '#3b3b3d' }} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {conflictingEvents.length > 0 && (
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-orange-800 mb-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    {currentLang === 'de' ? 'Zeitliche Überschneidung erkannt!' : 'Time Conflict Detected!'}
                  </h3>
                  <p className="text-sm text-orange-700 mb-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    {currentLang === 'de'
                      ? 'Dieses Event überschneidet sich mit folgenden Events (inkl. Transportzeiten):'
                      : 'This event overlaps with the following events (including transport times):'}
                  </p>
                  <ul className="space-y-1">
                    {conflictingEvents.map((conflictEvent) => (
                      <li key={conflictEvent.id} className="text-sm text-orange-800" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                        <span className="font-medium">
                          {currentLang === 'de' ? conflictEvent.name_de : conflictEvent.name_en}
                        </span>
                        {' - '}
                        <span className="text-orange-700">
                          {formatEventTimeWithTransport(conflictEvent, currentLang as 'de' | 'en')}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {preselectedLocationId && !event && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    value="create"
                    checked={mode === 'create'}
                    onChange={() => setMode('create')}
                    className="w-4 h-4"
                    style={{ accentColor: '#d6b15b' }}
                  />
                  <span style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                    {t('events.createNewEvent')}
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    value="assign"
                    checked={mode === 'assign'}
                    onChange={() => setMode('assign')}
                    className="w-4 h-4"
                    style={{ accentColor: '#d6b15b' }}
                  />
                  <span style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                    {t('events.assignExistingEvent')}
                  </span>
                </label>
              </div>

              {mode === 'assign' && (
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                    {t('events.selectEvent')}
                  </label>
                  <select
                    value={selectedExistingEventId}
                    onChange={(e) => setSelectedExistingEventId(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                    style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                    required
                  >
                    <option value="">{t('events.pleaseSelect')}</option>
                    {existingEvents.map((evt) => (
                      <option key={evt.id} value={evt.id}>
                        {evt.name_de} {evt.date ? `(${new Date(evt.date).toLocaleDateString('de-DE')})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {mode === 'create' && (
            <>
          <CollapsibleSection
            title={t('events.basicInformation')}
            isOpen={sectionsOpen.basic}
            onToggle={() => toggleSection('basic')}
            summary={getBasicSummary()}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  {t('events.name')} *
                </label>
                <input
                  type="text"
                  value={currentLang === 'de' ? formData.name_de : formData.name_en}
                  onChange={(e) => setFormData({
                    ...formData,
                    [currentLang === 'de' ? 'name_de' : 'name_en']: e.target.value
                  })}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                  placeholder={currentLang === 'de' ? t('events.nameDeExample') : t('events.nameEnExample')}
                  required
                />
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title={t('events.dateTimeSection')}
            isOpen={sectionsOpen.dateTime}
            onToggle={() => toggleSection('dateTime')}
            summary={getDateTimeSummary()}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  {t('events.date')}
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  {t('events.timeStart')}
                </label>
                <input
                  type="time"
                  value={formData.time_start}
                  onChange={(e) => setFormData({ ...formData, time_start: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  {t('events.timeEnd')}
                </label>
                <input
                  type="time"
                  value={formData.time_end}
                  onChange={(e) => setFormData({ ...formData, time_end: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title={t('events.locationSection')}
            isOpen={sectionsOpen.location}
            onToggle={() => toggleSection('location')}
            summary={formData.location_id ? locations.find(l => l.id === formData.location_id)?.name || '' : ''}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  {t('events.location')}
                </label>
                <select
                  value={formData.location_id}
                  onChange={(e) => setFormData({ ...formData, location_id: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                >
                  <option value="">{t('events.locationPlaceholder')}</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => setShowLocationModal(true)}
                className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 transition-all w-full"
                style={{ borderColor: '#d6b15b', color: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
              >
                <Plus size={18} />
                {t('events.newLocation')}
              </button>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title={t('events.transportSection')}
            isOpen={sectionsOpen.transport}
            onToggle={() => toggleSection('transport')}
            summary={formData.transport_type ? `${formData.transport_type}` : ''}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                    {t('events.transportType')}
                  </label>
                  <input
                    type="text"
                    value={formData.transport_type}
                    onChange={(e) => setFormData({ ...formData, transport_type: e.target.value })}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                    style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                    placeholder={t('events.transportTypePlaceholder')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                    {t('events.transportProvider')}
                  </label>
                  <input
                    type="text"
                    value={formData.transport_provider}
                    onChange={(e) => setFormData({ ...formData, transport_provider: e.target.value })}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                    style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                    placeholder={t('events.transportProviderPlaceholder')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                    {t('events.transportFrom')}
                  </label>
                  <input
                    type="text"
                    value={formData.transport_from}
                    onChange={(e) => setFormData({ ...formData, transport_from: e.target.value })}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                    style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                    placeholder={t('events.transportFromPlaceholder')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                    {t('events.transportTo')}
                  </label>
                  <input
                    type="text"
                    value={formData.transport_to}
                    onChange={(e) => setFormData({ ...formData, transport_to: e.target.value })}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                    style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                    placeholder={t('events.transportToPlaceholder')}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  {t('events.transportNotes')}
                </label>
                <textarea
                  value={formData.transport_notes}
                  onChange={(e) => setFormData({ ...formData, transport_notes: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                  placeholder={t('events.transportNotesPlaceholder')}
                  rows={3}
                />
              </div>
            </div>
          </CollapsibleSection>

          {(!event || !event.id || !isValidUuid(event.id)) && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                ℹ️ {currentLang === 'de'
                  ? 'Hinweis: Bitte speichere das Event zuerst, damit du danach Programmpunkte hinzufügen kannst!'
                  : 'Note: Please save the event first so you can add program items afterwards!'}
              </p>
            </div>
          )}

          <CollapsibleSection
            title={t('contacts.title')}
            isOpen={sectionsOpen.contacts}
            onToggle={() => toggleSection('contacts')}
            summary={contacts.length > 0 ? `${contacts.length} ${t('contacts.count')}` : ''}
          >
            <div className="space-y-3">
              <div className="flex gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setShowSupportTeamModal(true)}
                  className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-50 transition-all text-sm"
                  style={{ borderColor: '#d6b15b', color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}
                >
                  <span>👥</span>
                  <Plus size={14} style={{ color: '#d6b15b' }} />
                  <span>{t('events.newSupportTeamMember')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowVendorModal(true)}
                  className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-50 transition-all text-sm"
                  style={{ borderColor: '#d6b15b', color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}
                >
                  <span>🤝</span>
                  <Plus size={14} style={{ color: '#d6b15b' }} />
                  <span>{t('events.newVendor')}</span>
                </button>
              </div>
              {contacts.map((contact, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex gap-2">
                    <select
                      onChange={(e) => {
                        const [type, id] = e.target.value.split(':');
                        if (type && id) {
                          handleSelectContact(index, type as 'support' | 'vendor', id);
                        }
                      }}
                      className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm"
                      style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif', color: '#666' }}
                    >
                      <option value="">{t('contacts.selectFrom')}</option>
                      {supportTeamMembers.length > 0 && (
                        <optgroup label={t('contacts.selectFromSupportTeam')}>
                          {supportTeamMembers.map(member => (
                            <option key={member.id} value={`support:${member.id}`}>
                              {member.name}
                            </option>
                          ))}
                        </optgroup>
                      )}
                      {vendorContacts.length > 0 && (
                        <optgroup label={t('contacts.selectFromVendors')}>
                          {vendorContacts.map(vendor => (
                            <option key={vendor.id} value={`vendor:${vendor.id}`}>
                              {vendor.name} ({vendor.vendor_name})
                            </option>
                          ))}
                        </optgroup>
                      )}
                    </select>
                  </div>
                  <div className="flex gap-2 items-start p-3 bg-white rounded-md border" style={{ borderColor: '#d6b15b' }}>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={contact.name}
                        onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                        placeholder={t('contacts.name')}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                        style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                      />
                      <input
                        type="tel"
                        value={contact.phone}
                        onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                        placeholder={t('contacts.phone')}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                        style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                      />
                      <input
                        type="email"
                        value={contact.email}
                        onChange={(e) => handleContactChange(index, 'email', e.target.value)}
                        placeholder={t('contacts.email')}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                        style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveContact(index)}
                      className="p-2 hover:bg-gray-100 rounded transition-colors"
                      style={{ color: '#e63946' }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddContact}
                className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 transition-all"
                style={{ borderColor: '#d6b15b', color: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
              >
                <Plus size={18} />
                {t('contacts.add')}
              </button>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title={t('events.vendorsTitle')}
            isOpen={sectionsOpen.vendors}
            onToggle={() => toggleSection('vendors')}
            summary={selectedVendorIds.length > 0 ? `${selectedVendorIds.length} ${t('events.vendorsTitle')}` : ''}
          >
            <div className="space-y-3">
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {vendors.length === 0 ? (
                  <p className="text-sm" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
                    {t('events.noVendorsAvailable')}
                  </p>
                ) : (
                  vendors.map(vendor => (
                    <label
                      key={vendor.id}
                      className="flex items-center gap-3 p-3 bg-white rounded-md border hover:bg-gray-50 cursor-pointer transition-colors"
                      style={{ borderColor: selectedVendorIds.includes(vendor.id) ? '#d6b15b' : '#e5e5e5' }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedVendorIds.includes(vendor.id)}
                        onChange={() => handleVendorToggle(vendor.id)}
                        className="w-4 h-4"
                        style={{ accentColor: '#d6b15b' }}
                      />
                      <div className="flex-1">
                        <div className="font-medium" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                          {vendor.company_name}
                        </div>
                        <div className="text-sm" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
                          {vendor.category}
                        </div>
                      </div>
                    </label>
                  ))
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowVendorModal(true)}
                className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 transition-all w-full"
                style={{ borderColor: '#d6b15b', color: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
              >
                <Plus size={18} />
                {t('events.newVendor')}
              </button>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title={t('events.supportTeamTitle')}
            isOpen={sectionsOpen.supportTeam}
            onToggle={() => toggleSection('supportTeam')}
            summary={selectedSupportTeamIds.length > 0 ? `${selectedSupportTeamIds.length} ${t('events.members')}` : ''}
          >
            <div className="space-y-3">
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {supportTeamMembers.length === 0 ? (
                  <p className="text-sm" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
                    {t('events.noSupportTeamAvailable')}
                  </p>
                ) : (
                  supportTeamMembers.map(member => (
                    <label
                      key={member.id}
                      className="flex items-center gap-3 p-3 bg-white rounded-md border hover:bg-gray-50 cursor-pointer transition-colors"
                      style={{ borderColor: selectedSupportTeamIds.includes(member.id) ? '#d6b15b' : '#e5e5e5' }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedSupportTeamIds.includes(member.id)}
                        onChange={() => handleSupportTeamToggle(member.id)}
                        className="w-4 h-4"
                        style={{ accentColor: '#d6b15b' }}
                      />
                      <div className="flex-1">
                        <div className="font-medium" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                          {member.name}
                        </div>
                        {member.role && (
                          <div className="text-sm" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
                            {member.role}
                          </div>
                        )}
                      </div>
                    </label>
                  ))
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowSupportTeamModal(true)}
                className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 transition-all w-full"
                style={{ borderColor: '#d6b15b', color: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
              >
                <Plus size={18} />
                {t('events.newSupportTeamMember')}
              </button>
            </div>
          </CollapsibleSection>
          </>
          )}

          <div className="flex gap-4 justify-end pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded-md hover:bg-gray-50 transition-all"
              style={{ borderColor: '#d6b15b', color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-white rounded-md hover:opacity-90 transition-all"
              style={{ backgroundColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
            >
              {mode === 'assign' ? t('events.assign') : t('common.save')}
            </button>
          </div>
        </form>

        {event && (
          <ProgramItemModal
            isOpen={showProgramItemModal}
            onClose={() => setShowProgramItemModal(false)}
            eventId={event.id}
            item={selectedProgramItem}
            onSave={handleProgramItemSaved}
            nextOrderIndex={programItems.length}
          />
        )}

        <VendorModal
          isOpen={showVendorModal}
          onClose={() => setShowVendorModal(false)}
          onSave={handleVendorSaved}
          vendor={null}
        />

        <SupportTeamModal
          isOpen={showSupportTeamModal}
          onClose={() => setShowSupportTeamModal(false)}
          onSave={handleSupportTeamSaved}
          member={null}
        />

        <LocationModal
          isOpen={showLocationModal}
          onClose={() => setShowLocationModal(false)}
          onSave={handleLocationSaved}
          location={null}
        />
      </div>

      {showSuccessDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4" style={{ color: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}>
              ✅ {currentLang === 'de' ? 'Event erfolgreich erstellt!' : 'Event successfully created!'}
            </h3>
            <p className="mb-6" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
              {currentLang === 'de'
                ? 'Möchtest du jetzt Programmpunkte hinzufügen?'
                : 'Would you like to add program items now?'}
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowSuccessDialog(false);
                  onClose();
                }}
                className="flex-1 px-6 py-3 border rounded-md hover:bg-gray-50 transition-all"
                style={{ borderColor: '#d6b15b', color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}
              >
                {currentLang === 'de' ? 'Nein, später' : 'No, later'}
              </button>
              <button
                onClick={() => {
                  setShowSuccessDialog(false);
                  if (newEventId && onRequestOpenProgramModal) {
                    onRequestOpenProgramModal(newEventId);
                  }
                }}
                className="flex-1 px-6 py-3 text-white rounded-md hover:opacity-90 transition-all"
                style={{ backgroundColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
              >
                {currentLang === 'de' ? 'Ja, Programmpunkte hinzufügen' : 'Yes, add program items'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
