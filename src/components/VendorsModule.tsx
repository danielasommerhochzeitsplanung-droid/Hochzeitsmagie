import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { storage } from '../lib/storage-adapter';
import VendorModal from './VendorModal';
import VendorTable from './VendorTable';
import { getCategoryEmoji } from './vendorCategories';
import QuickAddBar from './QuickAddBar';
import EventModal from './EventModal';
import LocationModal from './LocationModal';

export interface Vendor {
  id: string;
  created_at?: string;
  category: string;
  company_name: string;
  contact_person: string;
  phone: string;
  email: string;
  contact_person_planning: string;
  phone_planning: string;
  email_planning: string;
  website: string;
  social_media: string;
  address: string;
  first_contact_date: string;
  next_appointment: string;
  status: string;
  contract_status: string;
  price_estimate: number | null;
  final_price: number | null;
  payment_status: string;
  recommendation_source: string;
  rating: number | null;
  notes: string;
  catering_events: string[];
  documents_link: string;
  cancellation_deadline: string;
  event_assignments: string[];
}

export interface VendorEventDayContact {
  id?: string;
  vendor_id?: string;
  name: string;
  phone: string;
  email: string;
  event_ids?: string[];
  catering_event_ids?: string[];
}

export default function VendorsModule() {
  const { t } = useTranslation();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showArchived, setShowArchived] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  useEffect(() => {
    loadVendors();
  }, [showArchived]);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredVendors(vendors);
    } else {
      setFilteredVendors(vendors.filter(v => v.category === selectedCategory));
    }
  }, [selectedCategory, vendors]);

  const loadVendors = () => {
    const allVendors = storage.vendors.getAll();
    const vendorsData = allVendors
      .filter(v => v.archived === showArchived)
      .map(vendor => ({
        ...vendor,
        company_name: vendor.name,
        contact_person: '',
        phone: vendor.phone || '',
        email: vendor.email || '',
        contact_person_planning: '',
        phone_planning: '',
        email_planning: '',
        website: vendor.website || '',
        social_media: '',
        address: '',
        first_contact_date: '',
        next_appointment: '',
        contract_status: vendor.contract_signed ? 'signed' : 'pending',
        price_estimate: vendor.cost || null,
        final_price: vendor.cost || null,
        payment_status: vendor.deposit_paid ? 'paid' : 'pending',
        recommendation_source: '',
        rating: null,
        catering_events: [],
        documents_link: '',
        cancellation_deadline: vendor.final_payment_due || '',
        event_assignments: [],
      }));
    setVendors(vendorsData);
  };

  const handleAddVendor = () => {
    setEditingVendor(null);
    setIsModalOpen(true);
  };

  const handleEditVendor = (vendor: Vendor) => {
    setEditingVendor(vendor);
    setIsModalOpen(true);
  };

  const handleSaveVendor = (vendorData: Omit<Vendor, 'id' | 'created_at'>, contacts: VendorEventDayContact[]) => {
    const simpleVendorData = {
      name: vendorData.company_name,
      category: vendorData.category,
      email: vendorData.email,
      phone: vendorData.phone,
      website: vendorData.website,
      cost: vendorData.price_estimate || vendorData.final_price,
      status: vendorData.status,
      notes: vendorData.notes,
      contract_signed: vendorData.contract_status === 'signed',
      deposit_paid: vendorData.payment_status === 'paid',
      final_payment_due: vendorData.cancellation_deadline,
      archived: false,
    };

    if (editingVendor) {
      storage.vendors.update(editingVendor.id, simpleVendorData);
    } else {
      storage.vendors.create(simpleVendorData);
    }

    loadVendors();
    setIsModalOpen(false);
    setEditingVendor(null);
  };

  const handleArchiveVendor = (id: string) => {
    if (window.confirm(t('vendors.confirmArchive'))) {
      storage.vendors.update(id, { archived: true });
      loadVendors();
    }
  };

  const handleRestoreVendor = (id: string) => {
    storage.vendors.update(id, { archived: false });
    loadVendors();
  };

  const handleDeleteVendor = (id: string) => {
    if (window.confirm(t('vendors.confirmDeletePermanently'))) {
      storage.vendors.delete(id);
      loadVendors();
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

  const categories = Array.from(new Set(vendors.map(v => v.category))).sort();

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

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-wrap">
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
              {t('vendors.activeVendors')}
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
              {t('vendors.archivedVendors')}
            </button>
          </div>
          <label className="text-sm font-medium" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
            {t('vendors.filterByCategory')}:
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 transition-all"
            style={{
              fontFamily: 'Open Sans, sans-serif',
              borderColor: '#d6b15b',
              color: '#3b3b3d'
            }}
          >
            <option value="all">{t('vendors.allCategories')}</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {getCategoryEmoji(cat)} {cat}
              </option>
            ))}
          </select>
          <span className="text-sm" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
            {filteredVendors.length} {t('vendors.vendors')}
          </span>
        </div>
        <button
          onClick={handleAddVendor}
          className="px-6 py-2 rounded-md transition-all hover:opacity-90"
          style={{
            backgroundColor: '#d6b15b',
            color: 'white',
            fontFamily: 'Open Sans, sans-serif',
            fontWeight: 600
          }}
        >
          {t('vendors.addVendor')}
        </button>
      </div>

      <VendorTable
        vendors={filteredVendors}
        onEdit={handleEditVendor}
        onArchive={handleArchiveVendor}
        onRestore={handleRestoreVendor}
        onDelete={handleDeleteVendor}
        showArchived={showArchived}
      />

      <VendorModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingVendor(null);
        }}
        onSave={handleSaveVendor}
        vendor={editingVendor}
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
    </div>
  );
}
