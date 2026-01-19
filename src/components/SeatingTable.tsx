import { useTranslation } from 'react-i18next';
import { Edit2, Trash2, Users, Baby } from 'lucide-react';
import { useState } from 'react';

interface Table {
  id: string;
  name: string;
  table_type: string;
  capacity: number;
  position_x: number;
  position_y: number;
  notes: string;
  event_id: string | null;
}

interface Event {
  id: string;
  name_de: string;
  name_en: string;
  emoji: string;
}

interface SeatingAssignment {
  id: string;
  table_id: string;
  guest_id: string;
  assigned_at: string;
  notes: string;
}

interface Guest {
  id: string;
  name: string;
  partner_name: string;
  number_of_adults: number;
  is_child: boolean;
  parent_guest_id: string | null;
  seating_preference: string;
  custom_table_id: string | null;
  age: number | null;
}

interface Props {
  tables: Table[];
  assignments: SeatingAssignment[];
  guests: Guest[];
  events: Event[];
  onEdit: (table: Table) => void;
  onDelete: (id: string) => void;
  onAssignGuest: (tableId: string, guestId: string) => void;
  onRemoveAssignment: (assignmentId: string) => void;
}

export default function SeatingTable({
  tables,
  assignments,
  guests,
  events,
  onEdit,
  onDelete,
  onAssignGuest,
  onRemoveAssignment,
}: Props) {
  const { t, i18n } = useTranslation();
  const [expandedTableId, setExpandedTableId] = useState<string | null>(null);

  const getTableTypeLabel = (type: string) => {
    return t(`seating.tableType_${type}`);
  };

  const getAssignedGuests = (tableId: string) => {
    const directlyAssigned = assignments
      .filter(a => a.table_id === tableId)
      .map(a => guests.find(g => g.id === a.guest_id))
      .filter(Boolean);

    const childrenWithCustomTable = guests.filter(
      g => g.is_child && g.seating_preference === 'custom_table' && g.custom_table_id === tableId
    );

    const childrenAtParentTable = guests.filter(g => {
      if (!g.is_child || g.seating_preference !== 'parent_table') return false;
      const parent = guests.find(p => p.id === g.parent_guest_id);
      if (!parent) return false;
      return assignments.some(a => a.guest_id === parent.id && a.table_id === tableId);
    });

    return [...directlyAssigned, ...childrenWithCustomTable, ...childrenAtParentTable];
  };

  const getUnassignedGuests = () => {
    const assignedGuestIds = new Set(assignments.map(a => a.guest_id));
    const childrenWithCustomTable = new Set(
      guests.filter(g => g.is_child && g.seating_preference === 'custom_table' && g.custom_table_id).map(g => g.id)
    );
    const childrenWithParentTable = new Set(
      guests.filter(g => {
        if (!g.is_child || g.seating_preference !== 'parent_table') return false;
        const parent = guests.find(p => p.id === g.parent_guest_id);
        return parent && assignedGuestIds.has(parent.id);
      }).map(g => g.id)
    );

    return guests.filter(g =>
      !assignedGuestIds.has(g.id) &&
      !childrenWithCustomTable.has(g.id) &&
      !childrenWithParentTable.has(g.id)
    );
  };

  const getAssignmentId = (tableId: string, guestId: string) => {
    return assignments.find(a => a.table_id === tableId && a.guest_id === guestId)?.id;
  };

  const getEventName = (eventId: string | null) => {
    if (!eventId) return t('seating.generalTable');
    const event = events.find(e => e.id === eventId);
    if (!event) return '-';
    const name = i18n.language === 'de' ? event.name_de : event.name_en;
    return `${event.emoji} ${name}`;
  };

  if (tables.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg" style={{ borderColor: '#e5e5e5' }}>
        <p style={{ fontFamily: 'Open Sans, sans-serif', color: '#9ca3af' }}>
          {t('seating.noTables')}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr style={{ backgroundColor: '#f9fafb' }}>
            <th className="px-4 py-3 text-left" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontWeight: 600, fontSize: '0.85rem' }}>
              {t('seating.tableName')}
            </th>
            <th className="px-4 py-3 text-left" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontWeight: 600, fontSize: '0.85rem' }}>
              {t('seating.event')}
            </th>
            <th className="px-4 py-3 text-left" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontWeight: 600, fontSize: '0.85rem' }}>
              {t('seating.tableType')}
            </th>
            <th className="px-4 py-3 text-left" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontWeight: 600, fontSize: '0.85rem' }}>
              {t('seating.capacity')}
            </th>
            <th className="px-4 py-3 text-left" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontWeight: 600, fontSize: '0.85rem' }}>
              {t('seating.occupancy')}
            </th>
            <th className="px-4 py-3 text-right" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontWeight: 600, fontSize: '0.85rem' }}>
              {t('common.actions')}
            </th>
          </tr>
        </thead>
        <tbody>
          {tables.map((table) => {
            const assignedGuests = getAssignedGuests(table.id);
            const occupancy = assignedGuests.length;
            const isExpanded = expandedTableId === table.id;
            const unassignedGuests = getUnassignedGuests();

            return (
              <>
                <tr key={table.id} className="border-t hover:bg-gray-50" style={{ borderColor: '#e5e5e5' }}>
                  <td className="px-4 py-3" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontSize: '0.9rem' }}>
                    {table.name}
                  </td>
                  <td className="px-4 py-3" style={{ fontFamily: 'Open Sans, sans-serif', color: '#6b7280', fontSize: '0.85rem' }}>
                    {getEventName(table.event_id)}
                  </td>
                  <td className="px-4 py-3" style={{ fontFamily: 'Open Sans, sans-serif', color: '#6b7280', fontSize: '0.85rem' }}>
                    {getTableTypeLabel(table.table_type)}
                  </td>
                  <td className="px-4 py-3" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontSize: '0.9rem' }}>
                    {table.capacity}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs"
                      style={{
                        fontFamily: 'Open Sans, sans-serif',
                        backgroundColor: occupancy > table.capacity ? '#fee2e2' : occupancy === table.capacity ? '#fef3c7' : '#dcfce7',
                        color: occupancy > table.capacity ? '#991b1b' : occupancy === table.capacity ? '#92400e' : '#166534'
                      }}
                    >
                      {occupancy} / {table.capacity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setExpandedTableId(isExpanded ? null : table.id)}
                      className="mr-3 hover:opacity-70 transition-opacity"
                      style={{ color: '#d6b15b' }}
                      title={t('seating.manageGuests')}
                    >
                      <Users className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(table)}
                      className="mr-3 hover:opacity-70 transition-opacity"
                      style={{ color: '#3b3b3d' }}
                      title={t('common.edit')}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(table.id)}
                      className="hover:opacity-70 transition-opacity"
                      style={{ color: '#ef4444' }}
                      title={t('common.delete')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
                {isExpanded && (
                  <tr>
                    <td colSpan={6} className="px-4 py-4" style={{ backgroundColor: '#f9fafb' }}>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm mb-2" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontWeight: 600 }}>
                            {t('seating.assignedGuests')} ({assignedGuests.length})
                          </h4>
                          {assignedGuests.length > 0 ? (
                            <div className="space-y-2">
                              {assignedGuests.map((guest: any) => {
                                const isAutoAssignedChild = guest.is_child && (
                                  guest.seating_preference === 'parent_table' ||
                                  guest.seating_preference === 'custom_table'
                                );
                                const assignmentId = getAssignmentId(table.id, guest.id);

                                return (
                                  <div key={guest.id} className="flex items-center justify-between bg-white px-3 py-2 rounded border" style={{ borderColor: '#e5e5e5' }}>
                                    <div className="flex items-center gap-2">
                                      {guest.is_child && (
                                        <Baby className="w-4 h-4" style={{ color: '#4ECDC4' }} />
                                      )}
                                      <span style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontSize: '0.85rem' }}>
                                        {guest.name} {guest.partner_name && `+ ${guest.partner_name}`}
                                        {guest.is_child && guest.age && (
                                          <span style={{ color: '#6b7280', fontSize: '0.75rem' }}> ({guest.age})</span>
                                        )}
                                      </span>
                                      {isAutoAssignedChild && (
                                        <span
                                          className="px-2 py-0.5 rounded text-xs"
                                          style={{
                                            backgroundColor: '#e0f7f6',
                                            color: '#4ECDC4',
                                            fontFamily: 'Open Sans, sans-serif'
                                          }}
                                        >
                                          {guest.seating_preference === 'parent_table' ? t('guests.seatingParentTable') : t('guests.seatingCustomTable')}
                                        </span>
                                      )}
                                    </div>
                                    {!isAutoAssignedChild && assignmentId && (
                                      <button
                                        onClick={() => onRemoveAssignment(assignmentId)}
                                        className="text-xs px-2 py-1 rounded hover:opacity-70"
                                        style={{ backgroundColor: '#fee2e2', color: '#991b1b', fontFamily: 'Open Sans, sans-serif' }}
                                      >
                                        {t('seating.removeGuest')}
                                      </button>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <p className="text-sm" style={{ fontFamily: 'Open Sans, sans-serif', color: '#9ca3af' }}>
                              {t('seating.noGuestsAssigned')}
                            </p>
                          )}
                        </div>

                        {unassignedGuests.length > 0 && (
                          <div>
                            <h4 className="text-sm mb-2" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontWeight: 600 }}>
                              {t('seating.addGuest')}
                            </h4>
                            <select
                              onChange={(e) => {
                                if (e.target.value) {
                                  onAssignGuest(table.id, e.target.value);
                                  e.target.value = '';
                                }
                              }}
                              className="w-full px-3 py-2 border rounded"
                              style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '0.85rem', borderColor: '#d6b15b' }}
                            >
                              <option value="">{t('seating.selectGuest')}</option>
                              {unassignedGuests.map(guest => (
                                <option key={guest.id} value={guest.id}>
                                  {guest.name} {guest.partner_name && `+ ${guest.partner_name}`}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
