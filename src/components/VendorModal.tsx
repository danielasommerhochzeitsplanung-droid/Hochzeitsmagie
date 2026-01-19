import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Star, ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { Vendor, VendorEventDayContact } from './VendorsModule';
import { VENDOR_CATEGORIES, normalizeUrl } from './vendorCategories';
import { storage } from '../lib/storage-adapter';

interface VendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (vendor: Omit<Vendor, 'id' | 'created_at'>, contacts: VendorEventDayContact[]) => Promise<void>;
  vendor: Vendor | null;
}

interface Event {
  id: string;
  name_de: string;
  name_en: string;
  emoji: string;
}

const STATUS_OPTIONS = [
  'Angefragt',
  'Angebot erhalten',
  'Zugesagt',
  'Gebucht',
  'Bezahlt',
  'Abgesagt'
];

const CONTRACT_STATUS_OPTIONS = [
  'Noch kein Vertrag',
  'Vertrag erhalten',
  'Vertrag unterschrieben',
  'Vertrag vollständig'
];

const PAYMENT_STATUS_OPTIONS = [
  'Noch keine Zahlung',
  'Anzahlung geleistet',
  'Restbetrag ausstehend',
  'Vollständig bezahlt'
];

interface CollapsibleSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  summary?: string;
}

function CollapsibleSection({ title, isOpen, onToggle, children, summary }: CollapsibleSectionProps) {
  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-100 transition-colors"
      >
        <div className="flex-1 text-left">
          <h3 className="font-semibold text-lg" style={{ color: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}>
            {title}
          </h3>
          {!isOpen && summary && (
            <p className="text-sm mt-1" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
              {summary}
            </p>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 flex-shrink-0 ml-2" style={{ color: '#d6b15b' }} />
        ) : (
          <ChevronDown className="w-5 h-5 flex-shrink-0 ml-2" style={{ color: '#d6b15b' }} />
        )}
      </button>
      {isOpen && (
        <div className="p-4 pt-0">
          {children}
        </div>
      )}
    </div>
  );
}

export default function VendorModal({ isOpen, onClose, onSave, vendor }: VendorModalProps) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [events, setEvents] = useState<Event[]>([]);
  const [eventDayContacts, setEventDayContacts] = useState<VendorEventDayContact[]>([]);
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState('');
  const [formData, setFormData] = useState<Omit<Vendor, 'id' | 'created_at'>>({
    category: '',
    company_name: '',
    contact_person: '',
    phone: '',
    email: '',
    contact_person_planning: '',
    phone_planning: '',
    email_planning: '',
    website: '',
    social_media: '',
    address: '',
    first_contact_date: '',
    next_appointment: '',
    status: 'Angefragt',
    contract_status: '',
    price_estimate: null,
    final_price: null,
    payment_status: '',
    recommendation_source: '',
    rating: null,
    notes: '',
    catering_events: [],
    documents_link: '',
    cancellation_deadline: '',
    event_assignments: []
  });

  const [sectionsOpen, setSectionsOpen] = useState({
    basic: true,
    contactPlanning: true,
    contactEventDay: true,
    contactDetails: true,
    scheduling: true,
    status: true,
    financial: true,
    additional: true
  });

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    if (vendor) {
      setFormData(vendor);
      loadEventDayContacts(vendor.id);

      const isCustomCategory = vendor.category && !VENDOR_CATEGORIES.some(cat => cat.value === vendor.category);
      if (isCustomCategory) {
        setShowCustomCategory(true);
        setCustomCategory(vendor.category);
      } else {
        setShowCustomCategory(false);
        setCustomCategory('');
      }
    } else {
      setFormData({
        category: '',
        company_name: '',
        contact_person: '',
        phone: '',
        email: '',
        contact_person_planning: '',
        phone_planning: '',
        email_planning: '',
        website: '',
        social_media: '',
        address: '',
        first_contact_date: '',
        next_appointment: '',
        status: 'Angefragt',
        contract_status: '',
        price_estimate: null,
        final_price: null,
        payment_status: '',
        recommendation_source: '',
        rating: null,
        notes: '',
        catering_events: [],
        documents_link: '',
        cancellation_deadline: '',
        event_assignments: []
      });
      setEventDayContacts([]);
      setShowCustomCategory(false);
      setCustomCategory('');
    }
  }, [vendor]);

  const loadEvents = () => {
    const allEvents = storage.events.getAll();
    const activeEvents = allEvents
      .filter((event: any) => event.active && event.is_enabled)
      .sort((a: any, b: any) => a.name_de.localeCompare(b.name_de));
    setEvents(activeEvents);
  };

  const loadEventDayContacts = (vendorId: string) => {
    const data = storage.vendorContacts.getAll()
      .filter((c: any) => c.vendor_id === vendorId)
      .sort((a: any, b: any) => (a.created_at || '').localeCompare(b.created_at || ''));
    setEventDayContacts(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalCategory = showCustomCategory ? customCategory : formData.category;
    const normalizedData = {
      ...formData,
      category: finalCategory,
      website: normalizeUrl(formData.website)
    };

    await onSave(normalizedData, eventDayContacts);
  };

  const addEventDayContact = () => {
    setEventDayContacts([...eventDayContacts, { name: '', phone: '', email: '', event_ids: [], catering_event_ids: [] }]);
  };

  const removeEventDayContact = (index: number) => {
    setEventDayContacts(eventDayContacts.filter((_, i) => i !== index));
  };

  const updateEventDayContact = (index: number, field: keyof VendorEventDayContact, value: string | string[]) => {
    const updated = [...eventDayContacts];
    updated[index] = { ...updated[index], [field]: value };
    setEventDayContacts(updated);
  };

  const handleChange = (field: keyof Omit<Vendor, 'id' | 'created_at'>, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSection = (section: keyof typeof sectionsOpen) => {
    setSectionsOpen(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const getBasicSummary = () => {
    const parts = [];
    if (formData.category) parts.push(formData.category);
    if (formData.company_name) parts.push(formData.company_name);
    return parts.join(' • ');
  };

  const getContactPlanningSummary = () => {
    const parts = [];
    if (formData.contact_person_planning) parts.push(formData.contact_person_planning);
    if (formData.phone_planning) parts.push(formData.phone_planning);
    if (formData.email_planning) parts.push(formData.email_planning);
    return parts.join(' • ');
  };

  const getContactEventDaySummary = () => {
    const parts = [];
    if (eventDayContacts.length > 0) {
      const contactNames = eventDayContacts
        .filter(c => c.name)
        .map(c => c.name)
        .join(', ');
      if (contactNames) parts.push(contactNames);
    }
    if (formData.event_assignments.length > 0) {
      const eventNames = formData.event_assignments
        .map(eventId => {
          const event = events.find(e => e.id === eventId);
          return event ? (currentLang === 'de' ? event.name_de : event.name_en) : null;
        })
        .filter(Boolean)
        .join(', ');
      if (eventNames) parts.push(`Events: ${eventNames}`);
    }
    if (formData.catering_events.length > 0) {
      const eventNames = formData.catering_events
        .map(eventId => {
          const event = events.find(e => e.id === eventId);
          return event ? (currentLang === 'de' ? event.name_de : event.name_en) : null;
        })
        .filter(Boolean)
        .join(', ');
      if (eventNames) parts.push(`Catering: ${eventNames}`);
    }
    return parts.join(' • ');
  };

  const getContactDetailsSummary = () => {
    const parts = [];
    if (formData.website) parts.push('Website');
    if (formData.social_media) parts.push('Social Media');
    if (formData.address) parts.push(formData.address);
    if (formData.documents_link) parts.push('Dokumente');
    return parts.join(' • ');
  };

  const getSchedulingSummary = () => {
    const parts = [];
    if (formData.first_contact_date) {
      const date = new Date(formData.first_contact_date);
      parts.push(`Erstkontakt: ${date.toLocaleDateString('de-DE')}`);
    }
    if (formData.next_appointment) {
      const date = new Date(formData.next_appointment);
      parts.push(`Nächster Termin: ${date.toLocaleDateString('de-DE')}`);
    }
    if (formData.cancellation_deadline) {
      const date = new Date(formData.cancellation_deadline);
      parts.push(`Stornierung bis: ${date.toLocaleDateString('de-DE')}`);
    }
    return parts.join(' • ');
  };

  const getStatusSummary = () => {
    const parts = [];
    if (formData.status) parts.push(formData.status);
    if (formData.contract_status) parts.push(formData.contract_status);
    return parts.join(' • ');
  };

  const getFinancialSummary = () => {
    const parts = [];
    if (formData.price_estimate) parts.push(`Angebot: ${formData.price_estimate.toFixed(2)} €`);
    if (formData.final_price) parts.push(`Endpreis: ${formData.final_price.toFixed(2)} €`);
    if (formData.payment_status) parts.push(formData.payment_status);
    return parts.join(' • ');
  };

  const getAdditionalSummary = () => {
    const parts = [];
    if (formData.recommendation_source) parts.push(`Empfehlung: ${formData.recommendation_source}`);
    if (formData.rating) parts.push(`${formData.rating} Sterne`);
    if (formData.notes) parts.push('Notizen vorhanden');
    return parts.join(' • ');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
            {vendor ? t('vendors.editVendor') : t('vendors.addVendor')}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <CollapsibleSection
            title={t('vendors.basicInformation')}
            isOpen={sectionsOpen.basic}
            onToggle={() => toggleSection('basic')}
            summary={getBasicSummary()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  {t('vendors.category')} *
                </label>
                {!showCustomCategory ? (
                  <div className="flex gap-2">
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => handleChange('category', e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                      style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                    >
                      <option value="">{t('vendors.selectCategory')}</option>
                      {VENDOR_CATEGORIES.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.emoji} {cat.value}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowCustomCategory(true)}
                      className="px-3 py-2 border rounded-md hover:bg-gray-50 transition-all flex items-center gap-1"
                      style={{ borderColor: '#d6b15b', color: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                    >
                      <Plus size={16} />
                      Custom
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      placeholder="Enter custom category..."
                      className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                      style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setShowCustomCategory(false);
                        setCustomCategory('');
                      }}
                      className="px-3 py-2 border rounded-md hover:bg-gray-50 transition-all"
                      style={{ borderColor: '#d6b15b', color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  {t('vendors.companyName')} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company_name}
                  onChange={(e) => handleChange('company_name', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Ansprechpartner Planung"
            isOpen={sectionsOpen.contactPlanning}
            onToggle={() => toggleSection('contactPlanning')}
            summary={getContactPlanningSummary()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  Name
                </label>
                <input
                  type="text"
                  value={formData.contact_person_planning}
                  onChange={(e) => handleChange('contact_person_planning', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  Telefon
                </label>
                <input
                  type="tel"
                  value={formData.phone_planning}
                  onChange={(e) => handleChange('phone_planning', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  E-Mail
                </label>
                <input
                  type="email"
                  value={formData.email_planning}
                  onChange={(e) => handleChange('email_planning', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Ansprechpartner Eventtag"
            isOpen={sectionsOpen.contactEventDay}
            onToggle={() => toggleSection('contactEventDay')}
            summary={getContactEventDaySummary()}
          >
            <div className="space-y-4">
              {eventDayContacts.map((contact, index) => (
                <div key={index} className="p-4 bg-white rounded-lg border" style={{ borderColor: '#e5e7eb' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                        Name
                      </label>
                      <input
                        type="text"
                        value={contact.name}
                        onChange={(e) => updateEventDayContact(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                        style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                        Telefon
                      </label>
                      <input
                        type="tel"
                        value={contact.phone}
                        onChange={(e) => updateEventDayContact(index, 'phone', e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                        style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                        E-Mail
                      </label>
                      <input
                        type="email"
                        value={contact.email}
                        onChange={(e) => updateEventDayContact(index, 'email', e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                        style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeEventDayContact(index)}
                        className="px-4 py-2 rounded-md transition-all hover:opacity-80 flex items-center gap-2"
                        style={{ backgroundColor: '#ef4444', color: 'white', fontFamily: 'Open Sans, sans-serif' }}
                      >
                        <Trash2 className="w-4 h-4" />
                        Entfernen
                      </button>
                    </div>
                  </div>

                  {formData.event_assignments.length > 0 && (
                    <div className="border-t pt-4" style={{ borderColor: '#e5e7eb' }}>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                        Event-Teilnahme für diesen Ansprechpartner
                      </label>
                      <div className="space-y-2">
                        {formData.event_assignments.map(eventId => {
                          const event = events.find(e => e.id === eventId);
                          if (!event) return null;

                          const isAttending = contact.event_ids?.includes(eventId) || false;
                          const isCatering = contact.catering_event_ids?.includes(eventId) || false;

                          return (
                            <div key={eventId} className="flex items-center gap-4 p-2 rounded hover:bg-gray-50 transition-colors">
                              <label className="flex items-center gap-2 cursor-pointer flex-1">
                                <input
                                  type="checkbox"
                                  checked={isAttending}
                                  onChange={(e) => {
                                    const currentEventIds = contact.event_ids || [];
                                    const updatedEventIds = e.target.checked
                                      ? [...currentEventIds, eventId]
                                      : currentEventIds.filter(id => id !== eventId);
                                    updateEventDayContact(index, 'event_ids', updatedEventIds);
                                  }}
                                  className="w-4 h-4 rounded border-2 transition-all"
                                  style={{
                                    borderColor: '#d6b15b',
                                    accentColor: '#d6b15b'
                                  }}
                                />
                                <span className="text-sm" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                                  {event.emoji} {currentLang === 'de' ? event.name_de : event.name_en}
                                </span>
                              </label>

                              {isAttending && (
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={isCatering}
                                    onChange={(e) => {
                                      const currentCateringIds = contact.catering_event_ids || [];
                                      const updatedCateringIds = e.target.checked
                                        ? [...currentCateringIds, eventId]
                                        : currentCateringIds.filter(id => id !== eventId);
                                      updateEventDayContact(index, 'catering_event_ids', updatedCateringIds);
                                    }}
                                    className="w-4 h-4 rounded border-2 transition-all"
                                    style={{
                                      borderColor: '#d6b15b',
                                      accentColor: '#d6b15b'
                                    }}
                                  />
                                  <span className="text-xs" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
                                    + Catering
                                  </span>
                                </label>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-xs mt-2" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
                        Wähle bei welchen Events dieser Ansprechpartner teilnimmt und ob er beim Catering mitisst
                      </p>
                    </div>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addEventDayContact}
                className="w-full px-4 py-3 border-2 border-dashed rounded-lg transition-all hover:bg-gray-50 flex items-center justify-center gap-2"
                style={{ borderColor: '#d6b15b', color: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
              >
                <Plus className="w-5 h-5" />
                Ansprechpartner hinzufügen
              </button>

              <div className="mt-6">
                <label className="block text-sm font-medium mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  Event-Zuordnung
                </label>
                <div className="space-y-2">
                  {events.map(event => (
                    <label key={event.id} className="flex items-center gap-3 cursor-pointer group p-2 rounded hover:bg-gray-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.event_assignments.includes(event.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleChange('event_assignments', [...formData.event_assignments, event.id]);
                          } else {
                            handleChange('event_assignments', formData.event_assignments.filter(id => id !== event.id));
                          }
                        }}
                        className="w-4 h-4 rounded border-2 transition-all"
                        style={{
                          borderColor: '#d6b15b',
                          accentColor: '#d6b15b'
                        }}
                      />
                      <span className="text-sm group-hover:opacity-80 transition-opacity"
                        style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                        {event.emoji} {currentLang === 'de' ? event.name_de : event.name_en}
                      </span>
                    </label>
                  ))}
                </div>
                <p className="text-xs mt-2" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
                  Wähle die Events aus, bei denen dieser Dienstleister tätig ist
                </p>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  Catering-Teilnahme
                </label>
                <div className="space-y-2">
                  {events.map(event => (
                    <label key={event.id} className="flex items-center gap-3 cursor-pointer group p-2 rounded hover:bg-gray-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.catering_events.includes(event.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleChange('catering_events', [...formData.catering_events, event.id]);
                          } else {
                            handleChange('catering_events', formData.catering_events.filter(id => id !== event.id));
                          }
                        }}
                        className="w-4 h-4 rounded border-2 transition-all"
                        style={{
                          borderColor: '#d6b15b',
                          accentColor: '#d6b15b'
                        }}
                      />
                      <span className="text-sm group-hover:opacity-80 transition-opacity"
                        style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                        {event.emoji} {currentLang === 'de' ? event.name_de : event.name_en}
                      </span>
                    </label>
                  ))}
                </div>
                <p className="text-xs mt-2" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
                  Wähle die Events aus, bei denen der Dienstleister Verpflegung erhält
                </p>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title={t('vendors.contactDetails')}
            isOpen={sectionsOpen.contactDetails}
            onToggle={() => toggleSection('contactDetails')}
            summary={getContactDetailsSummary()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  {t('vendors.website')}
                </label>
                <input
                  type="text"
                  value={formData.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  placeholder="www.example.com or https://example.com"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  {t('vendors.socialMedia')}
                </label>
                <input
                  type="text"
                  value={formData.social_media}
                  onChange={(e) => handleChange('social_media', e.target.value)}
                  placeholder="Instagram, Facebook, etc."
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  {t('vendors.address')}
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  Dokumenten-Link
                </label>
                <input
                  type="text"
                  value={formData.documents_link}
                  onChange={(e) => handleChange('documents_link', e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title={t('vendors.scheduling')}
            isOpen={sectionsOpen.scheduling}
            onToggle={() => toggleSection('scheduling')}
            summary={getSchedulingSummary()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  {t('vendors.firstContactDate')}
                </label>
                <input
                  type="date"
                  value={formData.first_contact_date}
                  onChange={(e) => handleChange('first_contact_date', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  {t('vendors.nextAppointment')}
                </label>
                <input
                  type="datetime-local"
                  value={formData.next_appointment}
                  onChange={(e) => handleChange('next_appointment', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  Stornierung bis
                </label>
                <input
                  type="date"
                  value={formData.cancellation_deadline}
                  onChange={(e) => handleChange('cancellation_deadline', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title={t('vendors.statusAndProgress')}
            isOpen={sectionsOpen.status}
            onToggle={() => toggleSection('status')}
            summary={getStatusSummary()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  {t('vendors.status')}
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                >
                  {STATUS_OPTIONS.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  {t('vendors.contractStatus')}
                </label>
                <select
                  value={formData.contract_status}
                  onChange={(e) => handleChange('contract_status', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                >
                  <option value="">-</option>
                  {CONTRACT_STATUS_OPTIONS.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title={t('vendors.financial')}
            isOpen={sectionsOpen.financial}
            onToggle={() => toggleSection('financial')}
            summary={getFinancialSummary()}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  {t('vendors.priceEstimate')}
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price_estimate || ''}
                  onChange={(e) => handleChange('price_estimate', e.target.value ? parseFloat(e.target.value) : null)}
                  placeholder="€"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  {t('vendors.finalPrice')}
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.final_price || ''}
                  onChange={(e) => handleChange('final_price', e.target.value ? parseFloat(e.target.value) : null)}
                  placeholder="€"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  {t('vendors.paymentStatus')}
                </label>
                <select
                  value={formData.payment_status}
                  onChange={(e) => handleChange('payment_status', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                >
                  <option value="">-</option>
                  {PAYMENT_STATUS_OPTIONS.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title={t('vendors.additionalInformation')}
            isOpen={sectionsOpen.additional}
            onToggle={() => toggleSection('additional')}
            summary={getAdditionalSummary()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  {t('vendors.recommendationSource')}
                </label>
                <input
                  type="text"
                  value={formData.recommendation_source}
                  onChange={(e) => handleChange('recommendation_source', e.target.value)}
                  placeholder={t('vendors.recommendationPlaceholder')}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  {t('vendors.rating')}
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleChange('rating', star === formData.rating ? null : star)}
                      className="transition-all hover:scale-110"
                    >
                      <Star
                        className="w-6 h-6"
                        fill={star <= (formData.rating || 0) ? '#d6b15b' : 'none'}
                        stroke={star <= (formData.rating || 0) ? '#d6b15b' : '#ccc'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  {t('vendors.notes')}
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  rows={4}
                  placeholder={t('vendors.notesPlaceholder')}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all resize-none"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>
            </div>
          </CollapsibleSection>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded-md transition-all hover:bg-gray-50"
              style={{ borderColor: '#d6b15b', color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-md text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
            >
              {t('common.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
