import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

interface Table {
  id: string;
  name: string;
  table_type: string;
  capacity: number;
  position_x: number;
  position_y: number;
  notes: string;
  event_id: string | null;
  shape: string;
  table_number: number;
}

interface Event {
  id: string;
  name_de: string;
  name_en: string;
  emoji: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (table: Omit<Table, 'id'>) => void;
  table: Table | null;
  events: Event[];
}

export default function TableModal({ isOpen, onClose, onSave, table, events }: Props) {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState('');
  const [shape, setShape] = useState('round');
  const [capacity, setCapacity] = useState(8);
  const [notes, setNotes] = useState('');
  const [eventId, setEventId] = useState<string>('');
  const [tableNumber, setTableNumber] = useState(1);

  useEffect(() => {
    if (table) {
      setName(table.name);
      setShape(table.shape || 'round');
      setCapacity(table.capacity);
      setNotes(table.notes || '');
      setEventId(table.event_id || '');
      setTableNumber(table.table_number || 1);
    } else {
      setName('');
      setShape('round');
      setCapacity(8);
      setNotes('');
      setEventId('');
      setTableNumber(1);
    }
  }, [table, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      table_type: 'standard',
      shape,
      capacity,
      position_x: 0,
      position_y: 0,
      notes,
      event_id: eventId || null,
      table_number: tableNumber,
    } as any);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between" style={{ borderColor: '#e5e5e5' }}>
          <h2 className="text-xl" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontWeight: 600 }}>
            {table ? t('seating.editTable') : t('seating.addTable')}
          </h2>
          <button onClick={onClose} className="hover:opacity-70 transition-opacity" style={{ color: '#6b7280' }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block mb-2 text-sm" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontWeight: 600 }}>
              {t('seating.tableName')}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('seating.tableNamePlaceholder')}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
              style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', borderColor: '#d6b15b', fontSize: '0.9rem' }}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontWeight: 600 }}>
              {t('seating.event')}
            </label>
            <select
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
              style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', borderColor: '#d6b15b', fontSize: '0.9rem' }}
            >
              <option value="">{t('seating.generalTable')}</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>
                  {event.emoji} {i18n.language === 'de' ? event.name_de : event.name_en}
                </option>
              ))}
            </select>
            <p className="text-xs mt-1" style={{ fontFamily: 'Open Sans, sans-serif', color: '#6b7280' }}>
              {t('seating.eventHint')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontWeight: 600 }}>
                {t('seating.tableNumber')} *
              </label>
              <input
                type="number"
                value={tableNumber}
                onChange={(e) => setTableNumber(parseInt(e.target.value) || 1)}
                min="1"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', borderColor: '#d6b15b', fontSize: '0.9rem' }}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontWeight: 600 }}>
                {t('seating.capacity')} *
              </label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(parseInt(e.target.value) || 0)}
                min="1"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', borderColor: '#d6b15b', fontSize: '0.9rem' }}
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontWeight: 600 }}>
              {t('seating.tableShape')} *
            </label>
            <select
              value={shape}
              onChange={(e) => setShape(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
              style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', borderColor: '#d6b15b', fontSize: '0.9rem' }}
              required
            >
              <option value="round">{t('seating.tableType_round')}</option>
              <option value="rectangular">{t('seating.tableType_rectangular')}</option>
              <option value="square">{t('seating.tableType_square')}</option>
              <option value="l_shape">{t('seating.tableType_l_shape')}</option>
              <option value="u_shape">{t('seating.tableType_u_shape')}</option>
              <option value="banquet">{t('seating.tableType_banquet')}</option>
              <option value="t_shape">{t('seating.tableType_t_shape')}</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontWeight: 600 }}>
              {t('seating.notes')}
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t('seating.notesPlaceholder')}
              rows={3}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
              style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', borderColor: '#d6b15b', fontSize: '0.9rem' }}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded-lg transition-all hover:bg-gray-50"
              style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', borderColor: '#e5e5e5', fontSize: '0.9rem' }}
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
              style={{ fontFamily: 'Open Sans, sans-serif', backgroundColor: '#d6b15b', fontSize: '0.9rem' }}
            >
              {t('common.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
