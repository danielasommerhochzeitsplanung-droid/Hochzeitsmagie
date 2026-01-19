import { useState, useEffect } from 'react';
import { Pencil, Trash2, MapPin, Phone, Mail, ChevronDown, ChevronUp, Calendar, Archive, ArchiveRestore } from 'lucide-react';
import { Location } from './LocationModal';
import { LocationContact, LocationVendorAssignment } from './LocationsModule';
import { storage } from '../lib/storage-adapter';

interface LocationTableProps {
  locations: Location[];
  onEdit: (location: Location) => void;
  onDelete: (id: string) => void;
  onArchive: (id: string, archived: boolean) => void;
  showArchived: boolean;
  onAddContact: (locationId: string) => void;
  onEditContact: (contact: LocationContact) => void;
  onDeleteContact: (contactId: string) => void;
  onAddVendorAssignment: (locationId: string) => void;
  onEditVendorAssignment: (assignment: LocationVendorAssignment) => void;
  onDeleteVendorAssignment: (assignmentId: string) => void;
  onAddEvent: (locationId: string) => void;
}

interface VendorWithDetails extends LocationVendorAssignment {
  vendor_name: string;
  vendor_category: string;
}

interface EventAtLocation {
  id: string;
  name_de: string;
  name_en: string;
  date: string;
  time_start: string;
}

export default function LocationTable({
  locations,
  onEdit,
  onDelete,
  onArchive,
  showArchived,
  onAddContact,
  onEditContact,
  onDeleteContact,
  onAddVendorAssignment,
  onEditVendorAssignment,
  onDeleteVendorAssignment,
  onAddEvent
}: LocationTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());
  const [contacts, setContacts] = useState<Record<string, LocationContact[]>>({});
  const [vendorAssignments, setVendorAssignments] = useState<Record<string, VendorWithDetails[]>>({});
  const [events, setEvents] = useState<Record<string, EventAtLocation[]>>({});

  useEffect(() => {
    loadContactsAndVendors();
  }, [locations]);

  const loadContactsAndVendors = () => {
    const locationIds = locations.map(l => l.id);
    if (locationIds.length === 0) return;

    const contactsData = storage.locationContacts.getAll()
      .filter((c: any) => locationIds.includes(c.location_id));

    const vendorAssignmentsData = storage.locationContacts.getAll()
      .filter((a: any) => locationIds.includes(a.location_id));

    const vendors = storage.vendors.getAll();

    const eventsData = storage.events.getAll()
      .filter((e: any) => e.location_id && locationIds.includes(e.location_id))
      .sort((a: any, b: any) => (a.date || '').localeCompare(b.date || ''));

    const contactsByLocation: Record<string, LocationContact[]> = {};
    contactsData?.forEach((contact: any) => {
      if (!contactsByLocation[contact.location_id]) {
        contactsByLocation[contact.location_id] = [];
      }
      contactsByLocation[contact.location_id].push(contact);
    });

    const vendorsByLocation: Record<string, VendorWithDetails[]> = {};

    const eventsByLocation: Record<string, EventAtLocation[]> = {};
    eventsData.forEach((event: any) => {
      if (!eventsByLocation[event.location_id]) {
        eventsByLocation[event.location_id] = [];
      }
      eventsByLocation[event.location_id].push({
        id: event.id,
        name_de: event.name_de,
        name_en: event.name_en,
        date: event.date,
        time_start: event.time_start || ''
      });
    });

    setContacts(contactsByLocation);
    setVendorAssignments(vendorsByLocation);
    setEvents(eventsByLocation);
  };

  const toggleRow = (locationId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(locationId)) {
      newExpanded.delete(locationId);
    } else {
      newExpanded.add(locationId);
    }
    setExpandedRows(newExpanded);
  };

  const toggleEvents = (locationId: string) => {
    const newExpanded = new Set(expandedEvents);
    if (newExpanded.has(locationId)) {
      newExpanded.delete(locationId);
    } else {
      newExpanded.add(locationId);
    }
    setExpandedEvents(newExpanded);
  };

  if (locations.length === 0) {
    return (
      <div className="bg-gray-50 border-2 rounded-lg p-8 text-center" style={{ borderColor: '#d6b15b' }}>
        <MapPin size={48} className="mx-auto mb-3 opacity-30" style={{ color: '#d6b15b' }} />
        <p style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontSize: '0.95rem' }}>
          Noch keine Locations erfasst
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {locations.map((location) => {
        const isExpanded = expandedRows.has(location.id);
        const locationContacts = contacts[location.id] || [];
        const locationVendors = vendorAssignments[location.id] || [];
        const locationEvents = events[location.id] || [];

        return (
          <div
            key={location.id}
            className="border rounded-lg overflow-hidden"
            style={{ borderColor: '#d6b15b' }}
          >
            <div className="bg-white p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 grid grid-cols-4 gap-4">
                  <div>
                    <div className="font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                      {location.name}
                    </div>
                    <span
                      className="px-2 py-1 rounded text-xs font-medium inline-block"
                      style={{
                        backgroundColor: '#f8f4ed',
                        color: '#d6b15b',
                        fontFamily: 'Open Sans, sans-serif'
                      }}
                    >
                      {location.type}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm mb-1" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
                      {location.address || '-'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm space-y-1" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
                      {location.contact_name && <div>{location.contact_name}</div>}
                      {location.contact_phone && (
                        <div className="flex items-center gap-1">
                          <Phone size={12} />
                          {location.contact_phone}
                        </div>
                      )}
                      {location.contact_email && (
                        <div className="flex items-center gap-1">
                          <Mail size={12} />
                          {location.contact_email}
                        </div>
                      )}
                      {!location.contact_name && !location.contact_phone && !location.contact_email && '-'}
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-center gap-1 text-xs" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
                    <div>{locationEvents.length} {locationEvents.length === 1 ? 'Event' : 'Events'}</div>
                    <div>{locationContacts.length} Ansprechpartner</div>
                    <div>{locationVendors.length} Dienstleister</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleRow(location.id)}
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                    style={{ color: '#d6b15b' }}
                    title={isExpanded ? 'Einklappen' : 'Erweitern'}
                  >
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  <button
                    onClick={() => onEdit(location)}
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                    style={{ color: '#d6b15b' }}
                    title="Bearbeiten"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onArchive(location.id, !showArchived)}
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                    style={{ color: '#d6b15b' }}
                    title={showArchived ? 'Wiederherstellen' : 'Archivieren'}
                  >
                    {showArchived ? <ArchiveRestore size={16} /> : <Archive size={16} />}
                  </button>
                  <button
                    onClick={() => onDelete(location.id)}
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                    style={{ color: '#e63946' }}
                    title="Löschen"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>

            {isExpanded && (
              <div className="border-t" style={{ borderColor: '#e5e5e5', backgroundColor: '#fafafa' }}>
                <div className="p-4 space-y-4">
                  <div>
                    <button
                      onClick={() => toggleEvents(location.id)}
                      className="w-full flex items-center justify-between p-3 hover:bg-gray-100 rounded transition-colors"
                    >
                      <h4 className="font-semibold text-sm" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                        Events an dieser Location ({locationEvents.length})
                      </h4>
                      {expandedEvents.has(location.id) ? (
                        <ChevronUp size={16} style={{ color: '#d6b15b' }} />
                      ) : (
                        <ChevronDown size={16} style={{ color: '#d6b15b' }} />
                      )}
                    </button>

                    {expandedEvents.has(location.id) && (
                      <div className="mt-2 space-y-2">
                        {locationEvents.map((event) => (
                          <div
                            key={event.id}
                            className="bg-white p-3 rounded border"
                            style={{ borderColor: '#e5e5e5' }}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="font-medium text-sm mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                                  {event.name_de}
                                </div>
                                <div className="flex items-center gap-3 text-xs" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
                                  {event.date && (
                                    <div className="flex items-center gap-1">
                                      <Calendar size={12} />
                                      {new Date(event.date).toLocaleDateString('de-DE')}
                                      {event.time_start && `, ${event.time_start.substring(0, 5)} Uhr`}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={() => onAddEvent(location.id)}
                          className="w-full text-xs px-3 py-2 rounded border-2 border-dashed hover:bg-gray-50 transition-colors"
                          style={{ borderColor: '#d6b15b', color: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                        >
                          + Event erstellen
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                        Ansprechpartner
                      </h4>
                      <button
                        onClick={() => onAddContact(location.id)}
                        className="text-xs px-3 py-1 rounded"
                        style={{ backgroundColor: '#d6b15b', color: 'white', fontFamily: 'Open Sans, sans-serif' }}
                      >
                        + Hinzufügen
                      </button>
                    </div>
                    {locationContacts.length === 0 ? (
                      <p className="text-sm text-gray-500" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                        Keine Ansprechpartner erfasst
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {locationContacts.map((contact) => (
                          <div
                            key={contact.id}
                            className="bg-white p-3 rounded border flex items-start justify-between"
                            style={{ borderColor: '#e5e5e5' }}
                          >
                            <div className="flex-1">
                              <div className="font-medium text-sm" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                                {contact.name}
                              </div>
                              {contact.role && (
                                <div className="text-xs" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
                                  {contact.role}
                                </div>
                              )}
                              <div className="text-xs mt-1 space-y-1" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
                                {contact.phone && <div><Phone size={10} className="inline mr-1" />{contact.phone}</div>}
                                {contact.email && <div><Mail size={10} className="inline mr-1" />{contact.email}</div>}
                              </div>
                              {contact.notes && (
                                <div className="text-xs mt-2 text-gray-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                                  {contact.notes}
                                </div>
                              )}
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => onEditContact(contact)}
                                className="p-1 hover:bg-gray-100 rounded"
                                style={{ color: '#d6b15b' }}
                              >
                                <Pencil size={14} />
                              </button>
                              <button
                                onClick={() => onDeleteContact(contact.id!)}
                                className="p-1 hover:bg-gray-100 rounded"
                                style={{ color: '#e63946' }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                        Dienstleister
                      </h4>
                      <button
                        onClick={() => onAddVendorAssignment(location.id)}
                        className="text-xs px-3 py-1 rounded"
                        style={{ backgroundColor: '#d6b15b', color: 'white', fontFamily: 'Open Sans, sans-serif' }}
                      >
                        + Hinzufügen
                      </button>
                    </div>
                    {locationVendors.length === 0 ? (
                      <p className="text-sm text-gray-500" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                        Keine Dienstleister zugewiesen
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {locationVendors.map((assignment) => (
                          <div
                            key={assignment.id}
                            className="bg-white p-3 rounded border flex items-start justify-between"
                            style={{ borderColor: '#e5e5e5' }}
                          >
                            <div className="flex-1">
                              <div className="font-medium text-sm" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                                {assignment.vendor_name}
                              </div>
                              <div className="text-xs" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
                                {assignment.vendor_category}
                              </div>
                              {assignment.notes && (
                                <div className="text-xs mt-2 text-gray-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                                  {assignment.notes}
                                </div>
                              )}
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => onEditVendorAssignment(assignment)}
                                className="p-1 hover:bg-gray-100 rounded"
                                style={{ color: '#d6b15b' }}
                              >
                                <Pencil size={14} />
                              </button>
                              <button
                                onClick={() => onDeleteVendorAssignment(assignment.id!)}
                                className="p-1 hover:bg-gray-100 rounded"
                                style={{ color: '#e63946' }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}