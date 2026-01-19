import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { storage } from '../lib/storage-adapter';

interface Vendor {
  id: string;
  company_name: string;
  category: string;
}

interface LocationVendorAssignment {
  id?: string;
  location_id: string;
  vendor_id: string;
  notes: string;
}

interface LocationVendorAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (assignment: LocationVendorAssignment) => void;
  assignment: LocationVendorAssignment | null;
  locationId: string;
}

export function LocationVendorAssignmentModal({
  isOpen,
  onClose,
  onSave,
  assignment,
  locationId
}: LocationVendorAssignmentModalProps) {
  const { t } = useTranslation();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [formData, setFormData] = useState<LocationVendorAssignment>({
    location_id: locationId,
    vendor_id: '',
    notes: '',
  });

  useEffect(() => {
    loadVendors();
  }, []);

  useEffect(() => {
    if (assignment) {
      setFormData(assignment);
    } else {
      setFormData({
        location_id: locationId,
        vendor_id: '',
        notes: '',
      });
    }
  }, [assignment, locationId]);

  const loadVendors = () => {
    const data = storage.vendors.getAll()
      .map((v: any) => ({ id: v.id, company_name: v.company_name, category: v.category }))
      .sort((a: any, b: any) => a.company_name.localeCompare(b.company_name));
    setVendors(data);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.vendor_id) {
      alert(t('pleaseSelectVendor'));
      return;
    }
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {assignment ? t('editVendorAssignment') : t('addVendorAssignment')}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('vendor')} *
            </label>
            <select
              required
              value={formData.vendor_id}
              onChange={(e) => setFormData({ ...formData, vendor_id: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!!assignment}
            >
              <option value="">{t('selectVendor')}</option>
              {vendors.map((vendor) => (
                <option key={vendor.id} value={vendor.id}>
                  {vendor.company_name} ({t(vendor.category)})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('notes')}
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('notesPlaceholder')}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {t('save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}