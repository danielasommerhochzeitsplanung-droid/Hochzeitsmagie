import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, CheckCircle, HelpCircle, XCircle, AlertTriangle } from 'lucide-react';
import { storage } from '../lib/storage-adapter';

interface Guest {
  id: string;
  name: string;
  partner_name: string;
  relationship_to_couple: string;
  relationship_detail: string;
  invitation_status: string;
  events_attending: string[];
}

interface SeatingAssignment {
  id: string;
  table_id: string;
  guest_id: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  tableId: string;
  eventId: string | null;
  assignments: SeatingAssignment[];
  onAssignGuest: (guestId: string) => void;
}

export default function GuestAssignmentModal({
  isOpen,
  onClose,
  tableId,
  eventId,
  assignments,
  onAssignGuest,
}: Props) {
  const { t } = useTranslation();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadGuests();
    }
  }, [isOpen, eventId]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredGuests(
        guests.filter((g) =>
          g.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredGuests(guests);
    }
  }, [searchTerm, guests]);

  const loadGuests = () => {
    const data = storage.guests.getAll()
      .filter((g: any) => !g.archived)
      .sort((a: any, b: any) => a.name.localeCompare(b.name));

    if (eventId) {
      const eventGuests = data.filter(
        (g: any) => g.events_attending && g.events_attending.includes(eventId)
      );
      setGuests(eventGuests);
      setFilteredGuests(eventGuests);
    } else {
      setGuests(data);
      setFilteredGuests(data);
    }
  };

  const isGuestAssigned = (guestId: string) => {
    return assignments.some((a) => a.guest_id === guestId);
  };

  const isGuestAssignedToOtherTable = (guestId: string) => {
    return assignments.some(
      (a) => a.guest_id === guestId && a.table_id !== tableId
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" style={{ color: '#10b981' }} />;
      case 'invited':
        return <HelpCircle className="w-4 h-4" style={{ color: '#f59e0b' }} />;
      case 'declined':
        return <XCircle className="w-4 h-4" style={{ color: '#ef4444' }} />;
      default:
        return <HelpCircle className="w-4 h-4" style={{ color: '#9ca3af' }} />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed':
        return t('seating.confirmed');
      case 'invited':
        return t('seating.invited');
      case 'declined':
        return t('seating.declined');
      default:
        return '-';
    }
  };

  const handleAssign = (guestId: string) => {
    onAssignGuest(guestId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="bg-white border-b px-6 py-4 flex items-center justify-between" style={{ borderColor: '#e5e5e5' }}>
          <h2 className="text-xl" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontWeight: 600 }}>
            {t('seating.assignGuestsToTable')}
          </h2>
          <button onClick={onClose} className="hover:opacity-70 transition-opacity" style={{ color: '#6b7280' }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 border-b" style={{ borderColor: '#e5e5e5' }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('seating.selectGuest')}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
            style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', borderColor: '#d6b15b', fontSize: '0.9rem' }}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {filteredGuests.length === 0 ? (
            <p className="text-center" style={{ fontFamily: 'Open Sans, sans-serif', color: '#9ca3af' }}>
              {eventId ? t('seating.guestsForEvent') : t('seating.noGuestsAssigned')}
            </p>
          ) : (
            <div className="space-y-2">
              {filteredGuests.map((guest) => {
                const assigned = isGuestAssignedToOtherTable(guest.id);
                const isDeclined = guest.invitation_status === 'declined';
                const showWarning = isDeclined && assigned;

                return (
                  <div
                    key={guest.id}
                    className={`flex items-center justify-between p-4 border rounded-lg transition-all ${
                      assigned ? 'bg-gray-50' : 'hover:bg-gray-50'
                    }`}
                    style={{ borderColor: isDeclined ? '#fee2e2' : '#e5e5e5' }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(guest.invitation_status)}
                        <span className="font-medium" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                          {guest.name} {guest.partner_name && `+ ${guest.partner_name}`}
                        </span>
                        {showWarning && (
                          <div className="flex items-center gap-1 px-2 py-1 rounded" style={{ backgroundColor: '#fee2e2' }}>
                            <AlertTriangle className="w-3 h-3" style={{ color: '#ef4444' }} />
                            <span className="text-xs" style={{ fontFamily: 'Open Sans, sans-serif', color: '#ef4444' }}>
                              {t('seating.guestDeclined')}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm" style={{ color: '#6b7280' }}>
                        <span style={{ fontFamily: 'Open Sans, sans-serif' }}>
                          <strong>{t('seating.relationship')}:</strong>{' '}
                          {guest.relationship_to_couple || '-'}
                        </span>
                        {guest.relationship_detail && (
                          <span style={{ fontFamily: 'Open Sans, sans-serif' }}>
                            <strong>{t('seating.relationshipDetail')}:</strong>{' '}
                            {guest.relationship_detail}
                          </span>
                        )}
                        <span style={{ fontFamily: 'Open Sans, sans-serif' }}>
                          <strong>Status:</strong> {getStatusLabel(guest.invitation_status)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAssign(guest.id)}
                      disabled={assigned}
                      className={`px-4 py-2 rounded-lg text-sm transition-all ${
                        assigned
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'hover:opacity-90'
                      }`}
                      style={{
                        fontFamily: 'Open Sans, sans-serif',
                        backgroundColor: assigned ? undefined : '#d6b15b',
                        color: assigned ? undefined : 'white',
                      }}
                    >
                      {assigned ? t('seating.assignedGuests') : t('seating.addGuest')}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="border-t px-6 py-4 flex justify-end" style={{ borderColor: '#e5e5e5' }}>
          <button
            onClick={onClose}
            className="px-6 py-2 border rounded-lg transition-all hover:bg-gray-50"
            style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', borderColor: '#e5e5e5' }}
          >
            {t('common.cancel')}
          </button>
        </div>
      </div>
    </div>
  );
}
