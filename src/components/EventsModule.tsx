import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Archive, Plus, ChevronDown } from 'lucide-react';
import { storage } from '../lib/storage-adapter';
import { isValidUuid } from '../lib/uuid';
import EventModal, { EventContact } from './EventModal';
import EventTable from './EventTable';
import { EVENT_TEMPLATES } from './eventTemplates';
import QuickAddBar from './QuickAddBar';
import GuestModal from './GuestModal';
import LocationModal from './LocationModal';
import ProgramItemModal from './ProgramItemModal';

export interface Event {
  id: string;
  name_de: string;
  name_en: string;
  emoji: string;
  active: boolean;
  is_enabled: boolean;
  date: string | null;
  time_start: string | null;
  time_end: string | null;
  location_id: string | null;
  location?: string;
  transport_info: string;
  transport_time_start: string | null;
  transport_time_end: string | null;
  transport_type: string;
  transport_from: string;
  transport_to: string;
  transport_provider: string;
  transport_notes: string;
  support_team_members?: Array<{ id: string; name: string; role: string }>;
  created_at?: string;
}

export default function EventsModule() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [events, setEvents] = useState<Event[]>([]);
  const [archivedEvents, setArchivedEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isProgramItemModalOpen, setIsProgramItemModalOpen] = useState(false);
  const [selectedEventForProgram, setSelectedEventForProgram] = useState<Event | null>(null);
  const [editingProgramItem, setEditingProgramItem] = useState<any>(null);
  const [sortMode, setSortMode] = useState<'alphabetical' | 'chronological'>('alphabetical');

  useEffect(() => {
    loadEvents();
  }, [sortMode]);

  useEffect(() => {
    loadEvents();

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const loadEvents = () => {
    const allEvents = storage.events.getAll();
    const locations = storage.locations.getAll();
    const supportTeamAssignments = storage.supportTeamEventAssignments.getAll();
    const supportTeamMembers = storage.supportTeam.getAll();

    const eventsWithSupportTeam = allEvents.map((event: any) => {
      const location = locations.find(l => l.id === event.location_id);
      const assignments = supportTeamAssignments.filter(a => a.event_id === event.id);
      const members = assignments
        .map(a => supportTeamMembers.find(st => st.id === a.support_team_id))
        .filter(st => st !== null && st !== undefined);

      return {
        ...event,
        location: location?.name || null,
        support_team_members: members
      };
    });

    const sortedEvents = [...eventsWithSupportTeam].sort((a, b) => {
      if (sortMode === 'alphabetical') {
        return (currentLang === 'de' ? a.name_de : a.name_en).localeCompare(
          currentLang === 'de' ? b.name_de : b.name_en
        );
      } else {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;

        if (dateA !== dateB) {
          return dateA - dateB;
        }

        if (a.time_start && b.time_start) {
          return a.time_start.localeCompare(b.time_start);
        }

        return 0;
      }
    });

    setEvents(sortedEvents.filter(e => e.active));
    setArchivedEvents(sortedEvents.filter(e => !e.active));
  };

  const handleAddCustomEvent = () => {
    setEditingEvent({
      id: '',
      name_de: '',
      name_en: '',
      emoji: '',
      active: true,
      is_enabled: false,
      date: null,
      time_start: null,
      time_end: null,
      location_id: null,
      transport_info: '',
      transport_time_start: null,
      transport_time_end: null,
      transport_type: '',
      transport_from: '',
      transport_to: '',
      transport_provider: '',
      transport_notes: '',
    } as Event);
    setIsModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleAddEventFromTemplate = (template: typeof EVENT_TEMPLATES[0]) => {
    setEditingEvent({
      id: '',
      name_de: template.name_de,
      name_en: template.name_en,
      emoji: template.emoji,
      active: true,
      is_enabled: false,
      date: null,
      time_start: null,
      time_end: null,
      location_id: null,
      transport_info: '',
      transport_time_start: null,
      transport_time_end: null,
      transport_type: '',
      transport_from: '',
      transport_to: '',
      transport_provider: '',
      transport_notes: '',
    } as Event);
    setIsModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (eventData: Omit<Event, 'id' | 'created_at'>, contacts: EventContact[], vendorIds: string[], supportTeamIds: string[]): Promise<string | undefined> => {
    return new Promise((resolve) => {
      if (editingEvent && editingEvent.id && isValidUuid(editingEvent.id)) {
        const updatedEvent = storage.events.update(editingEvent.id, eventData);

        if (!updatedEvent) {
          alert('Fehler beim Speichern: Event nicht gefunden');
          resolve(undefined);
          return;
        }

        try {
          saveEventContacts(updatedEvent.id, contacts);
          saveVendorAssignments(updatedEvent.id, vendorIds);
          saveSupportTeamAssignments(updatedEvent.id, supportTeamIds);
          loadEvents();
          setEditingEvent(updatedEvent as Event);
          resolve(undefined);
        } catch (err: any) {
          console.error('Error saving event details:', err);
          alert(`Fehler beim Speichern der Details: ${err.message || err}`);
          resolve(undefined);
        }
      } else {
        const newEvent = storage.events.create({ ...eventData, active: true } as any);

        try {
          saveEventContacts(newEvent.id, contacts);
          saveVendorAssignments(newEvent.id, vendorIds);
          saveSupportTeamAssignments(newEvent.id, supportTeamIds);
          loadEvents();
          setEditingEvent(newEvent as Event);
          resolve(newEvent.id);
        } catch (err: any) {
          console.error('Error saving event details:', err);
          alert(`Fehler beim Speichern der Details: ${err.message || err}`);
          resolve(undefined);
        }
      }
    });
  };

  const saveEventContacts = (eventId: string, contacts: EventContact[]) => {
    if (!eventId || !isValidUuid(eventId)) {
      console.error('Invalid event ID for saving contacts:', eventId);
      throw new Error('Invalid event ID');
    }
  };

  const saveVendorAssignments = (eventId: string, vendorIds: string[]) => {
    if (!eventId || !isValidUuid(eventId)) {
      console.error('Invalid event ID for saving vendor assignments:', eventId);
      throw new Error('Invalid event ID');
    }
  };

  const saveSupportTeamAssignments = (eventId: string, supportTeamIds: string[]) => {
    if (!eventId || !isValidUuid(eventId)) {
      console.error('Invalid event ID for saving support team assignments:', eventId);
      throw new Error('Invalid event ID');
    }

    const allAssignments = storage.supportTeamEventAssignments.getAll();
    const existingAssignments = allAssignments.filter(a => a.event_id === eventId);

    existingAssignments.forEach(a => {
      storage.supportTeamEventAssignments.delete(a.id);
    });

    supportTeamIds.forEach(supportTeamId => {
      storage.supportTeamEventAssignments.create({
        event_id: eventId,
        support_team_id: supportTeamId
      });
    });
  };

  const handleArchiveEvent = (id: string) => {
    storage.events.update(id, { active: false });
    loadEvents();
  };

  const handleRestoreEvent = (id: string) => {
    storage.events.update(id, { active: true });
    loadEvents();
  };

  const handleDeletePermanently = (id: string) => {
    if (window.confirm(t('events.confirmDelete'))) {
      storage.events.delete(id);
      loadEvents();
    }
  };

  const handleSaveGuest = (guestData: any) => {
    const dataToSave = {
      ...guestData,
      save_the_date_sent_date: guestData.save_the_date_sent_date || null,
      invitation_sent_date: guestData.invitation_sent_date || null,
      dietary_restrictions: guestData.dietary_restrictions || [],
      archived: false
    };

    storage.guests.create(dataToSave);
    setIsGuestModalOpen(false);
  };

  const handleSaveLocation = (locationData: any) => {
    storage.locations.create(locationData);
    setIsLocationModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <QuickAddBar
        buttons={[
          {
            icon: '👥',
            label: t('common.quickAddGuest'),
            onClick: () => setIsGuestModalOpen(true)
          },
          {
            icon: '📍',
            label: t('common.quickAddLocation'),
            onClick: () => setIsLocationModalOpen(true)
          }
        ]}
      />

      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-6 py-3 transition-all ${
              activeTab === 'active'
                ? 'border-b-2'
                : 'hover:opacity-70'
            }`}
            style={activeTab === 'active' ? { borderColor: '#d6b15b', color: '#d6b15b', fontFamily: 'Open Sans, sans-serif' } : { color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}
          >
            🎉 {t('events.activeEvents')}
          </button>
          <button
            onClick={() => setActiveTab('archived')}
            className={`px-6 py-3 transition-all flex items-center gap-2 ${
              activeTab === 'archived'
                ? 'border-b-2'
                : 'hover:opacity-70'
            }`}
            style={activeTab === 'archived' ? { borderColor: '#d6b15b', color: '#d6b15b', fontFamily: 'Open Sans, sans-serif' } : { color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}
          >
            <Archive className="w-4 h-4" />
            {t('events.archivedEvents')}
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
              {t('events.alphabetical')}
            </span>
            <button
              onClick={() => setSortMode(sortMode === 'alphabetical' ? 'chronological' : 'alphabetical')}
              className="relative w-14 h-7 rounded-full transition-all duration-300 ease-in-out"
              style={{ backgroundColor: sortMode === 'chronological' ? '#d6b15b' : '#e5e7eb' }}
            >
              <span
                className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-all duration-300 ease-in-out shadow-md"
                style={{ transform: sortMode === 'chronological' ? 'translateX(28px)' : 'translateX(0)' }}
              />
            </button>
            <span className="text-sm" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
              {t('events.chronological')}
            </span>
          </div>

          <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-6 py-3 text-white rounded-lg hover:opacity-90 transition-all"
            style={{ backgroundColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
          >
            <Plus className="w-5 h-5" />
            {t('events.addEvent')}
            <ChevronDown className="w-4 h-4" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
              <div className="p-2">
                <button
                  onClick={handleAddCustomEvent}
                  className="w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 mb-2"
                  style={{
                    backgroundColor: '#fef9ef',
                    border: '1.5px solid #d6b15b',
                    fontFamily: 'Open Sans, sans-serif',
                    fontWeight: 600
                  }}
                >
                  <span className="text-2xl">📝</span>
                  <span style={{ color: '#3b3b3d' }}>
                    {t('events.customEvent')}
                  </span>
                </button>

                <div className="border-t border-gray-200 my-2"></div>

                {EVENT_TEMPLATES.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => handleAddEventFromTemplate(template)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3"
                  >
                    <span className="text-2xl">{template.emoji}</span>
                    <span style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                      {currentLang === 'de' ? template.name_de : template.name_en}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 mb-4"></div>

      {activeTab === 'active' ? (
        <EventTable
          events={events}
          onEdit={handleEditEvent}
          onDelete={handleArchiveEvent}
          onAddProgramItem={(eventId) => {
            const event = events.find(e => e.id === eventId);
            if (event) {
              setSelectedEventForProgram(event);
              setIsProgramItemModalOpen(true);
            }
          }}
          onEditProgramItem={async (eventId, item) => {
            const event = events.find(e => e.id === eventId);
            if (event) {
              setSelectedEventForProgram(event);
              setEditingProgramItem(item);
              setIsProgramItemModalOpen(true);
            }
          }}
        />
      ) : (
        <EventTable
          events={archivedEvents}
          onEdit={handleEditEvent}
          onDelete={handleDeletePermanently}
          onRestore={handleRestoreEvent}
          isArchived={true}
        />
      )}

      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEvent(null);
        }}
        onSave={handleSaveEvent}
        event={editingEvent}
        onRequestOpenProgramModal={(eventId) => {
          loadEvents();
          const event = storage.events.get(eventId);

          if (event) {
            setSelectedEventForProgram(event as Event);
            setIsProgramItemModalOpen(true);
            setIsModalOpen(false);
            setEditingEvent(null);
          }
        }}
      />

      <GuestModal
        isOpen={isGuestModalOpen}
        onClose={() => setIsGuestModalOpen(false)}
        onSave={handleSaveGuest}
        guest={null}
        events={events}
      />

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSave={handleSaveLocation}
        location={null}
      />

      {selectedEventForProgram && (
        <ProgramItemModal
          isOpen={isProgramItemModalOpen}
          onClose={() => {
            setIsProgramItemModalOpen(false);
            setSelectedEventForProgram(null);
            setEditingProgramItem(null);
          }}
          eventId={selectedEventForProgram.id}
          item={editingProgramItem}
          onSave={() => {
            setIsProgramItemModalOpen(false);
            setSelectedEventForProgram(null);
            setEditingProgramItem(null);
            loadEvents();
          }}
          nextOrderIndex={0}
        />
      )}
    </div>
  );
}
