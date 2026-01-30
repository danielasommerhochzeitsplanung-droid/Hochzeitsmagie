import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { storage } from '../lib/storage-adapter';
import LocationModal, { Location } from './LocationModal';
import LocationTable from './LocationTable';
import { LocationContactModal } from './LocationContactModal';
import { LocationVendorAssignmentModal } from './LocationVendorAssignmentModal';
import EventModal, { Event } from './EventModal';
import QuickAddBar from './QuickAddBar';
import VendorModal from './VendorModal';
import LocationTasksSection from './LocationTasksSection';

export interface LocationContact {
  id?: string;
  location_id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  notes: string;
}

export interface LocationVendorAssignment {
  id?: string;
  location_id: string;
  vendor_id: string;
  notes: string;
}

export default function LocationsModule() {
  const { t } = useTranslation();
  const [locations, setLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showArchived, setShowArchived] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<LocationContact | null>(null);
  const [currentLocationId, setCurrentLocationId] = useState<string>('');
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [editingVendorAssignment, setEditingVendorAssignment] = useState<LocationVendorAssignment | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [preselectedLocationId, setPreselectedLocationId] = useState<string>('');
  const [isVendorQuickAddModalOpen, setIsVendorQuickAddModalOpen] = useState(false);

  useEffect(() => {
    loadLocations();
  }, [showArchived]);

  useEffect(() => {
    if (selectedType === 'all') {
      setFilteredLocations(locations);
    } else {
      setFilteredLocations(locations.filter(l => l.type === selectedType));
    }
  }, [selectedType, locations]);

  const loadLocations = () => {
    const allLocations = storage.locations.getAll();
    const filtered = allLocations.filter(l => l.archived === showArchived);
    const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name));
    setLocations(sorted);
  };

  const handleAddLocation = () => {
    setEditingLocation(null);
    setIsModalOpen(true);
  };

  const handleEditLocation = (location: Location) => {
    setEditingLocation(location);
    setIsModalOpen(true);
  };

  const handleSaveLocation = (locationData: Omit<Location, 'id' | 'created_at'>) => {
    if (editingLocation) {
      storage.locations.update(editingLocation.id, locationData);
      loadLocations();
      setIsModalOpen(false);
      setEditingLocation(null);
    } else {
      storage.locations.create(locationData);
      loadLocations();
      setIsModalOpen(false);
    }
  };

  const handleDeleteLocation = (id: string) => {
    if (window.confirm('Diese Location wirklich löschen?')) {
      storage.locations.delete(id);
      loadLocations();
    }
  };

  const handleArchiveLocation = (id: string, archived: boolean) => {
    storage.locations.update(id, { archived });
    loadLocations();
  };

  const handleAddContact = (locationId: string) => {
    setCurrentLocationId(locationId);
    setEditingContact(null);
    setIsContactModalOpen(true);
  };

  const handleEditContact = (contact: LocationContact) => {
    setCurrentLocationId(contact.location_id);
    setEditingContact(contact);
    setIsContactModalOpen(true);
  };

  const handleSaveContact = (contactData: LocationContact) => {
    if (editingContact?.id) {
      storage.locationContacts.update(editingContact.id, contactData);
      loadLocations();
      setIsContactModalOpen(false);
      setEditingContact(null);
    } else {
      storage.locationContacts.create(contactData);
      loadLocations();
      setIsContactModalOpen(false);
    }
  };

  const handleDeleteContact = (contactId: string) => {
    if (window.confirm('Diesen Kontakt wirklich löschen?')) {
      storage.locationContacts.delete(contactId);
      loadLocations();
    }
  };

  const handleAddVendorAssignment = (locationId: string) => {
    setCurrentLocationId(locationId);
    setEditingVendorAssignment(null);
    setIsVendorModalOpen(true);
  };

  const handleEditVendorAssignment = (assignment: LocationVendorAssignment) => {
    setCurrentLocationId(assignment.location_id);
    setEditingVendorAssignment(assignment);
    setIsVendorModalOpen(true);
  };

  const handleSaveVendorAssignment = (assignmentData: LocationVendorAssignment) => {
    if (editingVendorAssignment?.id) {
      loadLocations();
      setIsVendorModalOpen(false);
      setEditingVendorAssignment(null);
    } else {
      loadLocations();
      setIsVendorModalOpen(false);
    }
  };

  const handleDeleteVendorAssignment = (assignmentId: string) => {
    if (window.confirm('Diese Dienstleister-Zuweisung wirklich löschen?')) {
      loadLocations();
    }
  };

  const handleAddEvent = (locationId: string) => {
    setPreselectedLocationId(locationId);
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = (eventData: Event) => {
    storage.events.create(eventData as any);
    loadLocations();
    setIsEventModalOpen(false);
    setPreselectedLocationId('');
  };

  const handleSaveVendorQuickAdd = (vendorData: any, contacts: any[]) => {
    const { event_assignments, ...vendorFields } = vendorData;

    const dataToSave = {
      ...vendorFields,
      first_contact_date: vendorData.first_contact_date || null,
      next_appointment: vendorData.next_appointment || null,
      cancellation_deadline: vendorData.cancellation_deadline || null,
      price_estimate: vendorData.price_estimate || null,
      final_price: vendorData.final_price || null,
      rating: vendorData.rating || null,
    };

    storage.vendors.create(dataToSave);
    loadLocations();
    setIsVendorQuickAddModalOpen(false);
  };

  const types = Array.from(new Set(locations.map(l => l.type))).sort();

  return (
    <div className="space-y-6">
      <QuickAddBar
        buttons={[
          {
            icon: '🤝',
            label: t('common.quickAddVendor'),
            onClick: () => setIsVendorQuickAddModalOpen(true)
          },
          {
            icon: '🎉',
            label: t('common.quickAddEvent'),
            onClick: () => {
              setPreselectedLocationId('');
              setIsEventModalOpen(true);
            }
          }
        ]}
      />

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
            Filter:
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 transition-all"
            style={{
              fontFamily: 'Open Sans, sans-serif',
              borderColor: '#d6b15b',
              color: '#3b3b3d'
            }}
          >
            <option value="all">Alle Typen</option>
            {types.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowArchived(!showArchived)}
            className="px-4 py-2 border rounded-md transition-all hover:bg-gray-50"
            style={{
              borderColor: showArchived ? '#d6b15b' : '#e5e5e5',
              backgroundColor: showArchived ? '#f8f4ed' : 'white',
              color: showArchived ? '#d6b15b' : '#666',
              fontFamily: 'Open Sans, sans-serif'
            }}
          >
            {showArchived ? 'Archiv' : 'Aktive'}
          </button>
          <span className="text-sm" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
            {filteredLocations.length} Locations
          </span>
        </div>
        <button
          onClick={handleAddLocation}
          className="px-6 py-2 rounded-md transition-all hover:opacity-90"
          style={{
            backgroundColor: '#d6b15b',
            color: 'white',
            fontFamily: 'Open Sans, sans-serif',
            fontWeight: 600
          }}
        >
          Location hinzufügen
        </button>
      </div>

      <LocationTable
        locations={filteredLocations}
        onEdit={handleEditLocation}
        onDelete={handleDeleteLocation}
        onArchive={handleArchiveLocation}
        showArchived={showArchived}
        onAddContact={handleAddContact}
        onEditContact={handleEditContact}
        onDeleteContact={handleDeleteContact}
        onAddVendorAssignment={handleAddVendorAssignment}
        onEditVendorAssignment={handleEditVendorAssignment}
        onDeleteVendorAssignment={handleDeleteVendorAssignment}
        onAddEvent={handleAddEvent}
      />

      <LocationTasksSection />

      <LocationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingLocation(null);
        }}
        onSave={handleSaveLocation}
        location={editingLocation}
      />

      <LocationContactModal
        isOpen={isContactModalOpen}
        onClose={() => {
          setIsContactModalOpen(false);
          setEditingContact(null);
        }}
        onSave={handleSaveContact}
        contact={editingContact}
        locationId={currentLocationId}
      />

      <LocationVendorAssignmentModal
        isOpen={isVendorModalOpen}
        onClose={() => {
          setIsVendorModalOpen(false);
          setEditingVendorAssignment(null);
        }}
        onSave={handleSaveVendorAssignment}
        assignment={editingVendorAssignment}
        locationId={currentLocationId}
      />

      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => {
          setIsEventModalOpen(false);
          setPreselectedLocationId('');
        }}
        onSave={handleSaveEvent}
        event={null}
        preselectedLocationId={preselectedLocationId}
      />

      <VendorModal
        isOpen={isVendorQuickAddModalOpen}
        onClose={() => setIsVendorQuickAddModalOpen(false)}
        onSave={handleSaveVendorQuickAdd}
        vendor={null}
      />
    </div>
  );
}
