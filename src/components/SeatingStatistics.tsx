import { useTranslation } from 'react-i18next';

interface Table {
  id: string;
  name: string;
  table_type: string;
  capacity: number;
  position_x: number;
  position_y: number;
  notes: string;
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
}

interface Props {
  tables: Table[];
  assignments: SeatingAssignment[];
  guests: Guest[];
}

export default function SeatingStatistics({ tables, assignments, guests }: Props) {
  const { t } = useTranslation();

  const totalTables = tables.length;
  const totalCapacity = tables.reduce((sum, table) => sum + table.capacity, 0);
  const assignedGuests = assignments.length;
  const unassignedGuests = guests.length - assignedGuests;
  const occupiedSeats = assignedGuests;
  const freeSeats = totalCapacity - occupiedSeats;
  const occupancyRate = totalCapacity > 0 ? Math.round((occupiedSeats / totalCapacity) * 100) : 0;

  const getTablesByType = () => {
    const types = ['round', 'rectangular', 'head_table', 'couple_table'];
    return types.map(type => ({
      type,
      count: tables.filter(t => t.table_type === type).length,
      capacity: tables.filter(t => t.table_type === type).reduce((sum, t) => sum + t.capacity, 0)
    })).filter(item => item.count > 0);
  };

  const overCapacityTables = tables.filter(table => {
    const tableAssignments = assignments.filter(a => a.table_id === table.id).length;
    return tableAssignments > table.capacity;
  }).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white border rounded-lg p-4" style={{ borderColor: '#e5e5e5' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm" style={{ fontFamily: 'Open Sans, sans-serif', color: '#6b7280' }}>
            {t('seating.stats.totalTables')}
          </span>
        </div>
        <div className="text-2xl font-semibold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
          {totalTables}
        </div>
        <div className="mt-2 text-xs" style={{ fontFamily: 'Open Sans, sans-serif', color: '#9ca3af' }}>
          {getTablesByType().map(item => (
            <div key={item.type}>
              {t(`seating.tableType_${item.type}`)}: {item.count}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border rounded-lg p-4" style={{ borderColor: '#e5e5e5' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm" style={{ fontFamily: 'Open Sans, sans-serif', color: '#6b7280' }}>
            {t('seating.stats.totalCapacity')}
          </span>
        </div>
        <div className="text-2xl font-semibold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
          {totalCapacity}
        </div>
        <div className="mt-2 text-xs" style={{ fontFamily: 'Open Sans, sans-serif', color: '#9ca3af' }}>
          {t('seating.stats.seatsAvailable')}
        </div>
      </div>

      <div className="bg-white border rounded-lg p-4" style={{ borderColor: '#e5e5e5' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm" style={{ fontFamily: 'Open Sans, sans-serif', color: '#6b7280' }}>
            {t('seating.stats.occupancy')}
          </span>
        </div>
        <div className="text-2xl font-semibold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
          {occupiedSeats} / {totalCapacity}
        </div>
        <div className="mt-2">
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all"
                style={{
                  width: `${occupancyRate}%`,
                  backgroundColor: occupancyRate > 90 ? '#ef4444' : occupancyRate > 70 ? '#f59e0b' : '#10b981'
                }}
              />
            </div>
            <span className="text-xs" style={{ fontFamily: 'Open Sans, sans-serif', color: '#6b7280' }}>
              {occupancyRate}%
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-4" style={{ borderColor: '#e5e5e5' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm" style={{ fontFamily: 'Open Sans, sans-serif', color: '#6b7280' }}>
            {t('seating.stats.guestStatus')}
          </span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
              {t('seating.stats.assigned')}
            </span>
            <span className="text-sm font-semibold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#10b981' }}>
              {assignedGuests}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
              {t('seating.stats.unassigned')}
            </span>
            <span className="text-sm font-semibold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#f59e0b' }}>
              {unassignedGuests}
            </span>
          </div>
          {overCapacityTables > 0 && (
            <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: '#e5e5e5' }}>
              <span className="text-sm" style={{ fontFamily: 'Open Sans, sans-serif', color: '#ef4444' }}>
                {t('seating.stats.overCapacity')}
              </span>
              <span className="text-sm font-semibold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#ef4444' }}>
                {overCapacityTables}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
