import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Plus, Users, Circle, Square, Minus, Star, Heart, Baby, AlertCircle } from 'lucide-react';
import { storage } from '../lib/storage-adapter';
import TableModal from './TableModal';
import GuestAssignmentModal from './GuestAssignmentModal';

interface Table {
  id: string;
  name: string;
  table_type: string;
  table_number: number;
  shape: string;
  capacity: number;
  position_x: number;
  position_y: number;
  notes: string;
  event_id: string | null;
  archived?: boolean;
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
  events_attending: string[];
  relationship_category?: string;
  dietary_restrictions?: any[];
}

export default function SeatingModule() {
  const { t, i18n } = useTranslation();
  const [tables, setTables] = useState<Table[]>([]);
  const [assignments, setAssignments] = useState<SeatingAssignment[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [editingTable, setEditingTable] = useState<Table | null>(null);
  const [selectedTableForGuests, setSelectedTableForGuests] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [detailViewEventId, setDetailViewEventId] = useState<string | null | undefined>(undefined);
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    loadTables();
    loadAssignments();
    loadGuests();
    loadEvents();
  }, [showArchived]);

  const loadTables = () => {
    const allTables = storage.tables.getAll();
    const filtered = allTables.filter(t => (t.archived || false) === showArchived);
    const sorted = filtered.sort((a, b) => a.table_number - b.table_number);
    setTables(sorted);
  };

  const loadAssignments = () => {
    const allAssignments = storage.guestTableAssignments.getAll();
    setAssignments(allAssignments as any);
  };

  const loadGuests = () => {
    const allGuests = storage.guests.getAll();
    const filtered = allGuests.filter(g => !g.archived);
    const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name));
    setGuests(sorted as any);
  };

  const loadEvents = () => {
    const allEvents = storage.events.getAll();
    const filtered = allEvents.filter(e => e.active);
    const sorted = filtered.sort((a, b) => {
      if (!a.date || !b.date) return 0;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    setEvents(sorted as any);
  };

  const handleAddTable = (eventId: string | null) => {
    setEditingTable(null);
    setSelectedEventId(eventId);
    setIsTableModalOpen(true);
  };

  const handleEditTable = (table: Table) => {
    setEditingTable(table);
    setSelectedEventId(table.event_id);
    setIsTableModalOpen(true);
  };

  const handleSaveTable = (tableData: Omit<Table, 'id'>) => {
    if (editingTable) {
      storage.tables.update(editingTable.id, { ...tableData, event_id: selectedEventId });
      loadTables();
      setIsTableModalOpen(false);
      setEditingTable(null);
    } else {
      storage.tables.create({ ...tableData, event_id: selectedEventId } as any);
      loadTables();
      setIsTableModalOpen(false);
    }
  };

  const handleDeleteTable = (id: string) => {
    storage.tables.update(id, { archived: true });
    loadTables();
  };

  const handleArchiveTable = (id: string) => {
    storage.tables.update(id, { archived: true });
    loadTables();
  };

  const handleRestoreTable = (id: string) => {
    storage.tables.update(id, { archived: false });
    loadTables();
  };

  const handleDeletePermanently = (id: string) => {
    if (window.confirm(t('seating.confirmDeleteTablePermanently'))) {
      storage.tables.delete(id);
      loadTables();
      loadAssignments();
    }
  };

  const handleAssignGuest = (guestId: string) => {
    if (!selectedTableForGuests) return;

    storage.guestTableAssignments.create({
      table_id: selectedTableForGuests,
      guest_id: guestId
    });
    loadAssignments();
  };

  const handleRemoveAssignment = (assignmentId: string) => {
    storage.guestTableAssignments.delete(assignmentId);
    loadAssignments();
  };

  const openGuestModal = (tableId: string, eventId: string | null) => {
    setSelectedTableForGuests(tableId);
    setSelectedEventId(eventId);
    setIsGuestModalOpen(true);
  };

  const getAssignedGuestsCount = (tableId: string) => {
    const directlyAssigned = assignments.filter(a => a.table_id === tableId).length;
    const childrenWithCustomTable = guests.filter(
      g => g.is_child && g.seating_preference === 'custom_table' && g.custom_table_id === tableId
    ).length;

    const childrenAtParentTable = guests.filter(g => {
      if (!g.is_child || g.seating_preference !== 'parent_table') return false;
      const parent = guests.find(p => p.id === g.parent_guest_id);
      if (!parent) return false;
      return assignments.some(a => a.guest_id === parent.id && a.table_id === tableId);
    }).length;

    return directlyAssigned + childrenWithCustomTable + childrenAtParentTable;
  };

  const getShapeIcon = (shape: string) => {
    switch (shape) {
      case 'round':
        return <Circle className="w-4 h-4" />;
      case 'rectangular':
      case 'banquet':
        return <Minus className="w-4 h-4 rotate-90" />;
      case 'square':
        return <Square className="w-4 h-4" />;
      case 'l_shape':
        return <span className="text-sm font-bold">L</span>;
      case 'u_shape':
        return <span className="text-sm font-bold">U</span>;
      case 't_shape':
        return <span className="text-sm font-bold">T</span>;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  const getTotalGuestsForEvent = (eventId: string | null) => {
    if (!eventId) {
      return guests.length;
    }
    return guests.filter(g => g.events_attending && g.events_attending.includes(eventId)).length;
  };

  const getAssignedGuestsForEvent = (eventId: string | null) => {
    const eventTables = tables.filter(t => t.event_id === eventId);
    let count = 0;
    eventTables.forEach(table => {
      count += getAssignedGuestsCount(table.id);
    });
    return count;
  };

  const handleExportCSV = () => {
    const csvData: string[] = [];
    csvData.push([
      t('seating.event'),
      t('seating.tableNumber'),
      t('seating.tableShape'),
      t('seating.capacity'),
      t('seating.occupancy'),
      t('guests.name')
    ].join(','));

    tables.forEach(table => {
      const tableAssignments = assignments.filter(a => a.table_id === table.id);
      const tableGuests = tableAssignments
        .map(a => guests.find(g => g.id === a.guest_id))
        .filter(Boolean);

      const eventName = table.event_id
        ? events.find(e => e.id === table.event_id)?.[i18n.language === 'de' ? 'name_de' : 'name_en']
        : t('seating.generalTable');

      if (tableGuests.length > 0) {
        tableGuests.forEach((guest: any) => {
          const guestName = guest.partner_name
            ? `${guest.name} + ${guest.partner_name}`
            : guest.name;
          csvData.push([
            `"${eventName}"`,
            table.table_number.toString(),
            t(`seating.tableType_${table.shape}`),
            table.capacity.toString(),
            `${getAssignedGuestsCount(table.id)}/${table.capacity}`,
            `"${guestName}"`
          ].join(','));
        });
      } else {
        csvData.push([
          `"${eventName}"`,
          table.table_number.toString(),
          t(`seating.tableType_${table.shape}`),
          table.capacity.toString(),
          `0/${table.capacity}`,
          ''
        ].join(','));
      }
    });

    const blob = new Blob(['\ufeff' + csvData.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `sitzplan_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const getGuestStatistics = () => {
    const totalGuests = guests.length;
    const totalChildren = guests.filter(g => g.is_child).length;
    const brideTableGuests = guests.filter(g => g.relationship_category === 'bride_table').length;
    const weddingCoupleGuests = guests.filter(g => g.relationship_category === 'wedding_couple').length;
    const guestsWithDietary = guests.filter(g => g.dietary_restrictions && g.dietary_restrictions.length > 0).length;

    return {
      total: totalGuests,
      children: totalChildren,
      brideTable: brideTableGuests,
      weddingCouple: weddingCoupleGuests,
      dietary: guestsWithDietary
    };
  };

  const renderEventCard = (event: Event | null) => {
    const eventId = event?.id || null;
    const eventTables = tables.filter(t => t.event_id === eventId);
    const totalGuests = getTotalGuestsForEvent(eventId);
    const assignedGuests = getAssignedGuestsForEvent(eventId);

    return (
      <div
        key={eventId || 'general'}
        className="bg-white rounded-lg border p-4 space-y-3 hover:shadow-md transition-all cursor-pointer"
        style={{ borderColor: '#e5e5e5' }}
      >
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="text-3xl">
            {event ? event.emoji : '🪑'}
          </div>
          <h3 className="text-sm font-semibold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
            {event ? (i18n.language === 'de' ? event.name_de : event.name_en) : t('seating.generalTables')}
          </h3>

          <div className="w-full space-y-2 text-xs" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>
            <div className="flex justify-between items-center">
              <span>{t('seating.tables')}:</span>
              <span className="font-semibold" style={{ color: '#3b3b3d' }}>{eventTables.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>{t('seating.guestsAssigned')}:</span>
              <span className="font-semibold" style={{ color: '#3b3b3d' }}>
                {assignedGuests} / {totalGuests}
              </span>
            </div>
          </div>

          <button
            onClick={() => setDetailViewEventId(eventId)}
            className="w-full px-3 py-2 rounded-md transition-all hover:opacity-90 flex items-center justify-center gap-2"
            style={{
              backgroundColor: '#d6b15b',
              color: 'white',
              fontFamily: 'Open Sans, sans-serif',
              fontWeight: 600,
              fontSize: '0.8rem'
            }}
          >
            <span>&gt;</span>
            {t('seating.seatingPlan')}
          </button>
        </div>
      </div>
    );
  };

  const renderDetailView = () => {
    if (detailViewEventId === undefined) return null;

    const event = detailViewEventId ? events.find(e => e.id === detailViewEventId) : null;
    const eventTables = tables.filter(t => t.event_id === detailViewEventId);
    const totalGuests = getTotalGuestsForEvent(detailViewEventId);
    const assignedGuests = getAssignedGuestsForEvent(detailViewEventId);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: '#e5e5e5' }}>
            <div>
              <h2 className="text-xl font-semibold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                {event ? `${event.emoji} ${i18n.language === 'de' ? event.name_de : event.name_en}` : t('seating.generalTables')}
              </h2>
              <div className="flex items-center gap-4 mt-2 text-sm" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>
                <span>{eventTables.length} {t('seating.tables')}</span>
                <span>•</span>
                <span>{assignedGuests} / {totalGuests} {t('seating.guestsAssigned')}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleAddTable(detailViewEventId)}
                className="px-4 py-2 rounded-md transition-all hover:opacity-90 flex items-center gap-2"
                style={{
                  backgroundColor: '#d6b15b',
                  color: 'white',
                  fontFamily: 'Open Sans, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.85rem'
                }}
              >
                <Plus className="w-4 h-4" />
                {t('seating.addTable')}
              </button>
              <button
                onClick={() => setDetailViewEventId(undefined)}
                className="px-4 py-2 rounded-md transition-all hover:bg-gray-100"
                style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}
              >
                {t('common.close')}
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {eventTables.length === 0 ? (
              <p className="text-center py-16" style={{ fontFamily: 'Open Sans, sans-serif', color: '#9ca3af' }}>
                {t('seating.noTables')}
              </p>
            ) : (
              <div className="space-y-2">
                {eventTables.map(table => {
                  const occupancy = getAssignedGuestsCount(table.id);
                  return (
                    <div
                      key={table.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-all"
                      style={{ borderColor: '#e5e5e5' }}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center gap-2" style={{ color: '#3b3b3d' }}>
                          {getShapeIcon(table.shape)}
                          <span className="font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                            {t('seating.tableNumber')} {table.table_number}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>
                          <span>{table.capacity} {t('seating.capacity')}</span>
                          <span className="px-2 py-0.5 rounded text-xs" style={{
                            backgroundColor: occupancy > table.capacity ? '#fee2e2' : occupancy === table.capacity ? '#fef3c7' : '#dcfce7',
                            color: occupancy > table.capacity ? '#991b1b' : occupancy === table.capacity ? '#92400e' : '#166534'
                          }}>
                            {occupancy}/{table.capacity}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openGuestModal(table.id, detailViewEventId)}
                          className="px-3 py-1.5 rounded transition-all hover:opacity-70 flex items-center gap-1 text-sm"
                          style={{ backgroundColor: '#f3f4f6', color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}
                        >
                          <Users className="w-3.5 h-3.5" />
                          {t('seating.assignGuestsToTable')}
                        </button>
                        <button
                          onClick={() => handleEditTable(table)}
                          className="px-3 py-1.5 rounded transition-all hover:opacity-70 text-sm"
                          style={{ backgroundColor: '#f3f4f6', color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}
                        >
                          {t('common.edit')}
                        </button>
                        <button
                          onClick={() => handleDeleteTable(table.id)}
                          className="px-3 py-1.5 rounded transition-all hover:opacity-70 text-sm"
                          style={{ backgroundColor: '#fee2e2', color: '#991b1b', fontFamily: 'Open Sans, sans-serif' }}
                        >
                          {t('common.delete')}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const stats = getGuestStatistics();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontWeight: 600 }}>
            {t('modules.seating')}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowArchived(false)}
              className="px-4 py-1.5 rounded-md transition-all text-sm"
              style={{
                backgroundColor: !showArchived ? '#d6b15b' : 'transparent',
                color: !showArchived ? 'white' : '#666',
                border: !showArchived ? 'none' : '1px solid #e5e5e5',
                fontFamily: 'Open Sans, sans-serif',
                fontWeight: !showArchived ? 600 : 400
              }}
            >
              {t('seating.activeTables')}
            </button>
            <button
              onClick={() => setShowArchived(true)}
              className="px-4 py-1.5 rounded-md transition-all text-sm"
              style={{
                backgroundColor: showArchived ? '#d6b15b' : 'transparent',
                color: showArchived ? 'white' : '#666',
                border: showArchived ? 'none' : '1px solid #e5e5e5',
                fontFamily: 'Open Sans, sans-serif',
                fontWeight: showArchived ? 600 : 400
              }}
            >
              {t('seating.archivedTables')}
            </button>
          </div>
        </div>
        <button
          onClick={handleExportCSV}
          className="px-4 py-2 border rounded-lg transition-all hover:bg-gray-50 flex items-center gap-2"
          style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', borderColor: '#e5e5e5', fontSize: '0.9rem' }}
        >
          <Download className="w-4 h-4" />
          {t('seating.exportCSV')}
        </button>
      </div>

      <div className="bg-white rounded-lg border p-5 shadow-sm" style={{ borderColor: '#e5e5e5' }}>
        <h3 className="text-sm font-semibold mb-4" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
          {t('guests.summary')}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: '#f9fafb' }}>
            <Users className="w-5 h-5" style={{ color: '#4ECDC4' }} />
            <div>
              <div className="text-lg font-semibold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                {stats.total}
              </div>
              <div className="text-xs" style={{ fontFamily: 'Open Sans, sans-serif', color: '#6b7280' }}>
                {t('guests.totalGuestEntries')}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: '#f9fafb' }}>
            <Baby className="w-5 h-5" style={{ color: '#4ECDC4' }} />
            <div>
              <div className="text-lg font-semibold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                {stats.children}
              </div>
              <div className="text-xs" style={{ fontFamily: 'Open Sans, sans-serif', color: '#6b7280' }}>
                {t('guests.totalChildren')}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: '#fef9e6' }}>
            <Star className="w-5 h-5" style={{ color: '#d6b15b' }} />
            <div>
              <div className="text-lg font-semibold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                {stats.brideTable}
              </div>
              <div className="text-xs" style={{ fontFamily: 'Open Sans, sans-serif', color: '#6b7280' }}>
                {t('guests.relationshipBrideTable')}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: '#ffe4e6' }}>
            <Heart className="w-5 h-5" style={{ color: '#e11d48' }} />
            <div>
              <div className="text-lg font-semibold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                {stats.weddingCouple}
              </div>
              <div className="text-xs" style={{ fontFamily: 'Open Sans, sans-serif', color: '#6b7280' }}>
                {t('guests.relationshipWeddingCouple')}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: '#f9fafb' }}>
            <AlertCircle className="w-5 h-5" style={{ color: '#6b7280' }} />
            <div>
              <div className="text-lg font-semibold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                {stats.dietary}
              </div>
              <div className="text-xs" style={{ fontFamily: 'Open Sans, sans-serif', color: '#6b7280' }}>
                {t('guests.dietaryRestrictions')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map(event => renderEventCard(event))}
        {renderEventCard(null)}
      </div>

      {renderDetailView()}

      <TableModal
        isOpen={isTableModalOpen}
        onClose={() => {
          setIsTableModalOpen(false);
          setEditingTable(null);
        }}
        onSave={handleSaveTable}
        table={editingTable}
        events={events}
      />

      <GuestAssignmentModal
        isOpen={isGuestModalOpen}
        onClose={() => {
          setIsGuestModalOpen(false);
          setSelectedTableForGuests(null);
        }}
        tableId={selectedTableForGuests || ''}
        eventId={selectedEventId}
        assignments={assignments}
        onAssignGuest={handleAssignGuest}
      />
    </div>
  );
}
