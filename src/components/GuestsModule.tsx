import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Archive } from 'lucide-react';
import { storage } from '../lib/storage-adapter';
import GuestModal from './GuestModal';
import GuestTable from './GuestTable';
import QuickAddBar from './QuickAddBar';
import EventModal from './EventModal';
import LocationModal from './LocationModal';
import SupportTeamModal from './SupportTeamModal';

interface DietaryRestriction {
  id?: string;
  guest_id?: string;
  name: string;
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_lactose_intolerant: boolean;
  is_gluten_intolerant: boolean;
  is_halal: boolean;
  allergies: string;
}

interface Guest {
  id: string;
  name: string;
  partner_name: string;
  number_of_adults: number;
  save_the_date_status: string;
  invitation_status: string;
  save_the_date_sent_date: string;
  invitation_sent_date: string;
  events: string[];
  accommodation_type: string;
  accommodation_rooms: number | null;
  dietary_restrictions?: DietaryRestriction[];
  lactose_intolerant_count: number;
  vegetarian_count: number;
  vegan_count: number;
  gluten_intolerant_count: number;
  has_allergies_count: number;
  nut_allergy_count: number;
  fish_allergy_count: number;
  egg_allergy_count: number;
  soy_allergy_count: number;
  halal_count: number;
  notes: string;
  archived: boolean;
  support_team_id?: string | null;
  support_team_role?: string;
  is_child: boolean;
  parent_guest_id?: string | null;
  date_of_birth: string;
  age: number | null;
}

interface Event {
  id: string;
  name_de: string;
  name_en: string;
  emoji: string;
}

interface Table {
  id: string;
  name: string;
  table_type: string;
  capacity: number;
}

export default function GuestsModule() {
  const { t } = useTranslation();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [archivedGuests, setArchivedGuests] = useState<Guest[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [parentGuest, setParentGuest] = useState<Guest | null>(null);
  const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active');
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isSupportTeamModalOpen, setIsSupportTeamModalOpen] = useState(false);
  const [prefilledGuest, setPrefilledGuest] = useState<Guest | null>(null);

  useEffect(() => {
    loadEvents();
    loadGuests();
    loadTables();
  }, []);

  const loadEvents = () => {
    const allEvents = storage.events.getAll();
    const eventsWithNames = allEvents.map(event => ({
      id: event.id,
      name_de: event.title,
      name_en: event.title,
      emoji: '🎉'
    }));
    setEvents(eventsWithNames);
  };

  const loadTables = () => {
    const allTables = storage.tables.getAll();
    const tablesData = allTables.map(table => ({
      id: table.id,
      name: table.name,
      table_type: table.shape || '',
      capacity: table.capacity
    }));
    setTables(tablesData);
  };

  const loadGuests = () => {
    const allGuests = storage.guests.getAll();
    const supportTeamData = storage.supportTeam.getAll();

    const guestsWithData = allGuests.map(guest => {
      const supportTeamMember = supportTeamData?.find(st => st.id === guest.support_team_role);
      return {
        id: guest.id,
        name: guest.name,
        partner_name: guest.partner_name || '',
        email: guest.email || '',
        phone: guest.phone || '',
        number_of_adults: guest.number_of_adults || 1,
        save_the_date_status: guest.save_the_date_status || guest.rsvp_status || 'pending',
        invitation_status: guest.invitation_status || guest.attendance_status || 'pending',
        save_the_date_sent_date: guest.save_the_date_sent_date || '',
        invitation_sent_date: guest.invitation_sent_date || '',
        events: guest.events || [],
        accommodation_type: guest.accommodation_type || '',
        accommodation_rooms: guest.accommodation_rooms || null,
        dietary_restrictions: guest.dietary_restrictions || [],
        lactose_intolerant_count: guest.lactose_intolerance ? 1 : 0,
        vegetarian_count: 0,
        vegan_count: 0,
        gluten_intolerant_count: guest.gluten_intolerance ? 1 : 0,
        has_allergies_count: guest.peanut_allergy || guest.tree_nut_allergy ? 1 : 0,
        nut_allergy_count: guest.tree_nut_allergy ? 1 : 0,
        fish_allergy_count: 0,
        egg_allergy_count: 0,
        soy_allergy_count: 0,
        halal_count: guest.halal ? 1 : 0,
        street_address: guest.street_address || '',
        postal_code: guest.postal_code || '',
        city: guest.city || '',
        relationship_category: guest.relationship_category || '',
        side: guest.side || '',
        specific_relationship: guest.specific_relationship || '',
        custom_relationship: guest.custom_relationship || '',
        notes: guest.notes || '',
        archived: guest.archived || false,
        support_team_id: guest.support_team_id || guest.support_team_role || null,
        support_team_role: supportTeamMember?.role,
        gift_received: guest.gift_received || '',
        thank_you_sent: guest.thank_you_sent || false,
        thank_you_sent_date: guest.thank_you_sent_date || '',
        is_child: guest.is_child,
        parent_guest_id: guest.parent_guest_id || null,
        date_of_birth: guest.date_of_birth || '',
        age: guest.age || null,
        seating_preference: guest.seating_preference || 'parent_table',
        custom_table_id: guest.custom_table_id || null,
      };
    });

    const activeGuests = guestsWithData.filter(g => !g.archived);
    const archived = guestsWithData.filter(g => g.archived);

    setGuests(activeGuests);
    setArchivedGuests(archived);
  };

  const handleAddGuest = () => {
    setEditingGuest(null);
    setParentGuest(null);
    setIsModalOpen(true);
  };

  const handleEditGuest = (guest: Guest) => {
    setEditingGuest(guest);
    setParentGuest(null);
    setIsModalOpen(true);
  };


  const handleConfirmNamesGuest = (guestData: Omit<Guest, 'id' | 'archived'>) => {
    const simpleGuestData = {
      name: guestData.name,
      partner_name: guestData.partner_name || '',
      email: '',
      phone: '',
      number_of_adults: guestData.number_of_adults || 1,
      rsvp_status: guestData.save_the_date_status || 'pending',
      attendance_status: guestData.invitation_status || 'pending',
      notes: guestData.notes || '',
      dietary_restrictions: guestData.dietary_restrictions || [],
      peanut_allergy: false,
      tree_nut_allergy: false,
      gluten_intolerance: guestData.gluten_intolerant_count > 0,
      lactose_intolerance: guestData.lactose_intolerant_count > 0,
      halal: guestData.halal_count > 0,
      contact_address: '',
      gift_received: false,
      gift_description: '',
      thank_you_sent: false,
      family_name: '',
      is_child: guestData.is_child,
      parent_guest_id: guestData.parent_guest_id || undefined,
      child_age: guestData.age || undefined,
      seated_with_parents: false,
      archived: false,
    };

    storage.guests.create(simpleGuestData);

    setTimeout(() => {
      loadGuests();
      const allGuestsList = storage.guests.getAll();
      const newGuest = allGuestsList.find(g => g.name === guestData.name && !g.archived);
      if (newGuest) {
        setEditingGuest(newGuest as any);
      }
    }, 100);
  };

  const recalculateParentAdults = (parentId: string) => {
    const parent = storage.guests.get(parentId);
    if (!parent) return;

    const allGuests = storage.guests.getAll();
    const children = allGuests.filter(g => g.parent_guest_id === parentId);

    const baseAdults = parent.partner_name?.trim() ? 2 : 1;
    const adultsFromChildren = children.filter(child => child.child_age && child.child_age >= 18).length;
    const totalAdults = baseAdults + adultsFromChildren;

    storage.guests.update(parentId, {
      number_of_adults: totalAdults
    });
  };

  const handleSaveGuest = (guestData: Omit<Guest, 'id' | 'archived'>) => {
    const storageData = {
      name: guestData.name,
      partner_name: guestData.partner_name || '',
      email: guestData.email || '',
      phone: guestData.phone || '',
      number_of_adults: guestData.number_of_adults || 1,
      rsvp_status: guestData.save_the_date_status || 'pending',
      attendance_status: guestData.invitation_status || 'pending',
      notes: guestData.notes || '',
      dietary_restrictions: guestData.dietary_restrictions || [],
      peanut_allergy: false,
      tree_nut_allergy: false,
      gluten_intolerance: guestData.gluten_intolerant_count > 0,
      lactose_intolerance: guestData.lactose_intolerant_count > 0,
      halal: guestData.halal_count > 0,
      street_address: guestData.street_address || '',
      postal_code: guestData.postal_code || '',
      city: guestData.city || '',
      relationship_category: guestData.relationship_category || '',
      side: guestData.side || '',
      specific_relationship: guestData.specific_relationship || '',
      custom_relationship: guestData.custom_relationship || '',
      support_team_role: guestData.support_team_id || undefined,
      gift_received: guestData.gift_received || '',
      gift_description: '',
      thank_you_sent: guestData.thank_you_sent || false,
      thank_you_sent_date: guestData.thank_you_sent_date || '',
      family_name: '',
      is_child: guestData.is_child,
      parent_guest_id: guestData.parent_guest_id || undefined,
      age: guestData.age || undefined,
      date_of_birth: guestData.date_of_birth || '',
      seated_with_parents: false,
      custom_table_id: guestData.custom_table_id || undefined,
      seating_preference: guestData.seating_preference || 'parent_table',
      archived: false,
      save_the_date_status: guestData.save_the_date_status,
      invitation_status: guestData.invitation_status,
      save_the_date_sent_date: guestData.save_the_date_sent_date,
      invitation_sent_date: guestData.invitation_sent_date,
      events: guestData.events || [],
      accommodation_type: guestData.accommodation_type || '',
      accommodation_rooms: guestData.accommodation_rooms || undefined,
      support_team_id: guestData.support_team_id || undefined,
    };

    if (editingGuest) {
      storage.guests.update(editingGuest.id, storageData);
    } else {
      storage.guests.create(storageData);
    }

    if (guestData.is_child && guestData.parent_guest_id) {
      recalculateParentAdults(guestData.parent_guest_id);
    }

    loadGuests();
  };

  const handleArchiveGuest = (id: string) => {
    storage.guests.update(id, { archived: true });
    loadGuests();
  };

  const handleRestoreGuest = (id: string) => {
    storage.guests.update(id, { archived: false });
    loadGuests();
  };

  const handleDeletePermanently = (id: string) => {
    if (window.confirm(t('guests.confirmDelete'))) {
      storage.guests.delete(id);
      loadGuests();
    }
  };

  const handleSaveEvent = (eventData: any, contacts: any[], vendorIds: string[]) => {
    storage.events.create({
      title: eventData.name_de || eventData.title,
      date: eventData.date || '',
      time: eventData.time,
      description: eventData.description,
      dress_code: eventData.dress_code,
      accommodation_info: eventData.accommodation_info,
      transport_needed: eventData.transport_needed || false,
      transport_time: eventData.transport_time,
      transport_departure_location: eventData.transport_departure_location,
    });
    loadEvents();
    setIsEventModalOpen(false);
  };

  const handleSaveLocation = (locationData: any) => {
    storage.locations.create({
      name: locationData.name,
      address: locationData.address || '',
      city: locationData.city,
      postal_code: locationData.postal_code,
      country: locationData.country,
      email: locationData.email,
      phone: locationData.phone,
      website: locationData.website,
      capacity: locationData.capacity,
      notes: locationData.notes,
      archived: false,
    });
    setIsLocationModalOpen(false);
  };

  const handleAddToSupportTeam = (guest: Guest) => {
    setPrefilledGuest(guest);
    setIsSupportTeamModalOpen(true);
  };

  const handleSaveSupportTeam = (supportTeamData: any) => {
    const newMember = storage.supportTeam.create({
      name: supportTeamData.name,
      role: supportTeamData.role,
      email: supportTeamData.email,
      phone: supportTeamData.phone,
      notes: supportTeamData.notes,
      archived: false,
      guest_id: prefilledGuest?.id,
    });

    if (prefilledGuest) {
      storage.guests.update(prefilledGuest.id, {
        support_team_role: newMember.id,
      });
    }

    setIsSupportTeamModalOpen(false);
    setPrefilledGuest(null);
    loadGuests();
  };

  return (
    <div className="space-y-6">
      <QuickAddBar
        buttons={[
          {
            icon: '🎉',
            label: t('common.quickAddEvent'),
            onClick: () => setIsEventModalOpen(true)
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
            👥 {t('guests.activeGuests')}
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
            {t('guests.archivedGuests')}
          </button>
        </div>

        <button
          onClick={handleAddGuest}
          className="px-6 py-2 rounded-md transition-all hover:opacity-90"
          style={{
            backgroundColor: '#d6b15b',
            color: 'white',
            fontFamily: 'Open Sans, sans-serif',
            fontWeight: 600
          }}
        >
          {t('guests.addGuest')}
        </button>
      </div>

      <div className="border-b border-gray-200 mb-4"></div>

      {activeTab === 'active' ? (
        <GuestTable
          guests={guests}
          events={events}
          onEdit={handleEditGuest}
          onDelete={handleArchiveGuest}
          onAddToSupportTeam={handleAddToSupportTeam}
        />
      ) : (
        <GuestTable
          guests={archivedGuests}
          events={events}
          onEdit={handleEditGuest}
          onDelete={handleDeletePermanently}
          onRestore={handleRestoreGuest}
          isArchived={true}
        />
      )}

      <GuestModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingGuest(null);
          setParentGuest(null);
        }}
        onSave={handleSaveGuest}
        onConfirmNames={handleConfirmNamesGuest}
        guest={editingGuest}
        parentGuest={parentGuest}
        events={events}
        allGuests={guests}
        tables={tables}
        onEditChild={handleEditGuest}
        onAddChild={(parent) => {
          setParentGuest(parent);
          setEditingGuest(null);
          setIsModalOpen(true);
        }}
      />

      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onSave={handleSaveEvent}
        event={null}
      />

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSave={handleSaveLocation}
        location={null}
      />

      <SupportTeamModal
        isOpen={isSupportTeamModalOpen}
        onClose={() => {
          setIsSupportTeamModalOpen(false);
          setPrefilledGuest(null);
        }}
        onSave={handleSaveSupportTeam}
        member={null}
        prefilledData={prefilledGuest ? {
          name: prefilledGuest.name,
          email: '',
          phone: ''
        } : undefined}
      />
    </div>
  );
}