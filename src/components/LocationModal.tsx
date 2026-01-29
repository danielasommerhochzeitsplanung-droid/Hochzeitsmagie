import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface Location {
  id: string;
  name: string;
  type: string;
  address: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  viewing_date?: string;
  reservation_date?: string;
  notes: string;
  archived?: boolean;
  created_at?: string;
}

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (location: Omit<Location, 'id' | 'created_at'>) => void;
  location: Location | null;
}

const locationTypes = [
  'Hotel',
  'Kirche',
  'Standesamt',
  'Feier-Location',
  'Salon',
  'Parkplatz',
  'Restaurant',
  'Sonstiges'
];

export default function LocationModal({ isOpen, onClose, onSave, location }: LocationModalProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    type: 'Hotel',
    address: '',
    contact_name: '',
    contact_phone: '',
    contact_email: '',
    viewing_date: '',
    reservation_date: '',
    notes: ''
  });

  useEffect(() => {
    if (location) {
      setFormData({
        name: location.name,
        type: location.type,
        address: location.address,
        contact_name: location.contact_name,
        contact_phone: location.contact_phone,
        contact_email: location.contact_email,
        viewing_date: location.viewing_date || '',
        reservation_date: location.reservation_date || '',
        notes: location.notes
      });
    } else {
      setFormData({
        name: '',
        type: 'Hotel',
        address: '',
        contact_name: '',
        contact_phone: '',
        contact_email: '',
        viewing_date: '',
        reservation_date: '',
        notes: ''
      });
    }
  }, [location, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
            {location ? 'Location bearbeiten' : 'Location hinzufügen'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                Typ *
              </label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
              >
                {locationTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
              Adresse
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
            />
          </div>

          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
              Kontaktinformationen
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  Ansprechpartner
                </label>
                <input
                  type="text"
                  value={formData.contact_name}
                  onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={formData.contact_phone}
                    onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                    style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                    E-Mail
                  </label>
                  <input
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                    style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
              Termine
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  Besichtigungstermin
                </label>
                <input
                  type="date"
                  value={formData.viewing_date}
                  onChange={(e) => setFormData({ ...formData, viewing_date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  Reservierungstermin
                </label>
                <input
                  type="date"
                  value={formData.reservation_date}
                  onChange={(e) => setFormData({ ...formData, reservation_date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
              Notizen
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-all"
              style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-md transition-all hover:opacity-90"
              style={{
                backgroundColor: '#d6b15b',
                color: 'white',
                fontFamily: 'Open Sans, sans-serif',
                fontWeight: 600
              }}
            >
              Speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
