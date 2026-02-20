import { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronUp, Shield, Baby, Edit, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { generateId } from '../lib/uuid';

interface DietaryRestriction {
  id?: string;
  name: string;
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_lactose_intolerant: boolean;
  is_gluten_intolerant: boolean;
  is_halal: boolean;
  has_allergies: boolean;
  allergy_nuts: boolean;
  allergy_peanuts: boolean;
  allergy_eggs: boolean;
  allergy_fish: boolean;
  allergy_shellfish: boolean;
  allergy_soy: boolean;
  allergy_sesame: boolean;
  allergies: string;
}

interface Guest {
  id?: string;
  name: string;
  partner_name: string;
  number_of_adults: number;
  save_the_date_status: string;
  invitation_status: string;
  save_the_date_sent_date: string;
  invitation_sent_date: string;
  events: string[];
  accommodation_type: string;
  accommodation_rooms: number | null;
  dietary_restrictions?: DietaryRestriction[];
  lactose_intolerant_count: number;
  vegetarian_count: number;
  vegan_count: number;
  gluten_intolerant_count: number;
  has_allergies_count: number;
  nut_allergy_count: number;
  fish_allergy_count: number;
  egg_allergy_count: number;
  soy_allergy_count: number;
  halal_count: number;
  street_address: string;
  postal_code: string;
  city: string;
  email: string;
  phone: string;
  relationship_category: string;
  side: string;
  specific_relationship: string;
  custom_relationship: string;
  notes: string;
  support_team_id?: string | null;
  support_team_role?: string;
  gift_received: string;
  thank_you_sent: boolean;
  thank_you_sent_date: string;
  is_child: boolean;
  parent_guest_id?: string | null;
  date_of_birth: string;
  age: number | null;
  seating_preference: string;
  custom_table_id?: string | null;
  badge_type?: string;
}

interface Event {
  id: string;
  name_de: string;
  name_en: string;
  emoji: string;
}

interface Table {
  id: string;
  name: string;
  table_type: string;
  capacity: number;
}

interface GuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (guest: Guest) => void;
  onConfirmNames?: (guest: Guest) => void;
  guest?: Guest | null;
  events: Event[];
  parentGuest?: Guest | null;
  allGuests?: Guest[];
  onEditChild?: (child: Guest) => void;
  onAddChild?: (parent: Guest) => void;
  tables?: Table[];
}

export default function GuestModal({ isOpen, onClose, onSave, onConfirmNames, guest, events, parentGuest, allGuests = [], onEditChild, onAddChild, tables = [] }: GuestModalProps) {
  const { t, i18n } = useTranslation();
  const [isContactInfoExpanded, setIsContactInfoExpanded] = useState(true);
  const [isEventsExpanded, setIsEventsExpanded] = useState(true);
  const [isAccommodationExpanded, setIsAccommodationExpanded] = useState(true);
  const [isDietaryExpanded, setIsDietaryExpanded] = useState(true);
  const [isGiftExpanded, setIsGiftExpanded] = useState(true);
  const [isChildrenExpanded, setIsChildrenExpanded] = useState(true);
  const [showChildActions, setShowChildActions] = useState(false);

  const [formData, setFormData] = useState<Guest>({
    name: '',
    partner_name: '',
    number_of_adults: 1,
    save_the_date_status: 'pending',
    invitation_status: 'pending',
    save_the_date_sent_date: '',
    invitation_sent_date: '',
    events: [],
    accommodation_type: 'none',
    accommodation_rooms: null,
    dietary_restrictions: [],
    lactose_intolerant_count: 0,
    vegetarian_count: 0,
    vegan_count: 0,
    gluten_intolerant_count: 0,
    has_allergies_count: 0,
    nut_allergy_count: 0,
    fish_allergy_count: 0,
    egg_allergy_count: 0,
    soy_allergy_count: 0,
    halal_count: 0,
    street_address: '',
    postal_code: '',
    city: '',
    email: '',
    phone: '',
    relationship_category: '',
    side: '',
    specific_relationship: '',
    custom_relationship: '',
    notes: '',
    gift_received: '',
    thank_you_sent: false,
    thank_you_sent_date: '',
    is_child: parentGuest ? true : false,
    parent_guest_id: parentGuest?.id || null,
    date_of_birth: '',
    age: null,
    seating_preference: 'parent_table',
    custom_table_id: null,
    badge_type: ''
  });

  useEffect(() => {
    if (!isOpen) {
      setShowChildActions(false);
    }

    if (guest) {
      setFormData({
        ...guest,
        dietary_restrictions: guest.dietary_restrictions || [],
        lactose_intolerant_count: guest.lactose_intolerant_count || 0,
        vegetarian_count: guest.vegetarian_count || 0,
        vegan_count: guest.vegan_count || 0,
        gluten_intolerant_count: guest.gluten_intolerant_count || 0,
        has_allergies_count: guest.has_allergies_count || 0,
        nut_allergy_count: guest.nut_allergy_count || 0,
        fish_allergy_count: guest.fish_allergy_count || 0,
        egg_allergy_count: guest.egg_allergy_count || 0,
        soy_allergy_count: guest.soy_allergy_count || 0,
        halal_count: guest.halal_count || 0,
        is_child: guest.is_child || false,
        parent_guest_id: guest.parent_guest_id || null,
        date_of_birth: guest.date_of_birth || '',
        age: guest.age || null,
        seating_preference: guest.seating_preference || 'parent_table',
        custom_table_id: guest.custom_table_id || null,
        badge_type: guest.badge_type || ''
      });
    } else {
      setFormData({
        name: '',
        partner_name: '',
        number_of_adults: 1,
        save_the_date_status: 'pending',
        invitation_status: 'pending',
        save_the_date_sent_date: '',
        invitation_sent_date: '',
        events: [],
        accommodation_type: 'none',
        accommodation_rooms: null,
        dietary_restrictions: [],
        lactose_intolerant_count: 0,
        vegetarian_count: 0,
        vegan_count: 0,
        gluten_intolerant_count: 0,
        has_allergies_count: 0,
        nut_allergy_count: 0,
        fish_allergy_count: 0,
        egg_allergy_count: 0,
        soy_allergy_count: 0,
        halal_count: 0,
        street_address: '',
        postal_code: '',
        city: '',
        email: '',
        phone: '',
        relationship_category: '',
        side: '',
        specific_relationship: '',
        custom_relationship: '',
        notes: '',
        gift_received: '',
        thank_you_sent: false,
        thank_you_sent_date: '',
        is_child: parentGuest ? true : false,
        parent_guest_id: parentGuest?.id || null,
        date_of_birth: '',
        age: null,
        seating_preference: 'parent_table',
        custom_table_id: null,
        badge_type: ''
      });
    }
  }, [guest, isOpen, parentGuest, allGuests]);

  const calculateNumberOfAdults = (guestData: Guest) => {
    let adultsCount = guestData.partner_name.trim() ? 2 : 1;

    if (guestData.id) {
      const children = allGuests.filter(g => g.parent_guest_id === guestData.id);
      const adultsFromChildren = children.filter(child => child.age && child.age >= 18).length;
      adultsCount += adultsFromChildren;
    }

    return adultsCount;
  };

  const saveChildLocally = (childData: Guest) => {
    const localId = generateId();
    const childWithId = { ...childData, id: localId };

    const existingChildren = JSON.parse(localStorage.getItem('local_children') || '[]');
    existingChildren.push(childWithId);
    localStorage.setItem('local_children', JSON.stringify(existingChildren));

    return childWithId;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      const dataToSave = {
        ...formData,
        number_of_adults: formData.is_child ? formData.number_of_adults : calculateNumberOfAdults(formData)
      };

      onSave(dataToSave);
      setShowChildActions(false);
      onClose();
    }
  };

  const handleConfirmNames = () => {
    if (!formData.name.trim()) {
      alert(t('guests.pleaseEnterName'));
      return;
    }
    const dataToSave = {
      ...formData,
      number_of_adults: formData.is_child ? formData.number_of_adults : calculateNumberOfAdults(formData)
    };

    if (formData.is_child) {
      setShowChildActions(true);
    } else {
      if (onConfirmNames) {
        onConfirmNames(dataToSave);
      } else {
        onSave(dataToSave);
      }
    }
  };

  const updateDietaryRestriction = (personName: string, field: keyof DietaryRestriction, value: string | boolean) => {
    const newRestrictions = [...(formData.dietary_restrictions || [])];
    const existingIndex = newRestrictions.findIndex(r => r.name === personName);

    if (existingIndex >= 0) {
      newRestrictions[existingIndex] = { ...newRestrictions[existingIndex], [field]: value };
    } else {
      newRestrictions.push({
        name: personName,
        is_vegetarian: false,
        is_vegan: false,
        is_lactose_intolerant: false,
        is_gluten_intolerant: false,
        is_halal: false,
        has_allergies: false,
        allergy_nuts: false,
        allergy_peanuts: false,
        allergy_eggs: false,
        allergy_fish: false,
        allergy_shellfish: false,
        allergy_soy: false,
        allergy_sesame: false,
        allergies: '',
        [field]: value
      });
    }

    setFormData({ ...formData, dietary_restrictions: newRestrictions });
  };

  const getDietaryRestrictionForPerson = (personName: string): DietaryRestriction => {
    const existing = (formData.dietary_restrictions || []).find(r => r.name === personName);
    if (existing) return existing;

    return {
      name: personName,
      is_vegetarian: false,
      is_vegan: false,
      is_lactose_intolerant: false,
      is_gluten_intolerant: false,
      is_halal: false,
      has_allergies: false,
      allergy_nuts: false,
      allergy_peanuts: false,
      allergy_eggs: false,
      allergy_fish: false,
      allergy_shellfish: false,
      allergy_soy: false,
      allergy_sesame: false,
      allergies: ''
    };
  };

  const toggleEvent = (eventId: string) => {
    const newEvents = formData.events.includes(eventId)
      ? formData.events.filter(id => id !== eventId)
      : [...formData.events, eventId];
    setFormData({ ...formData, events: newEvents });
  };

  const handleAddChildClick = () => {
    if (!guest?.id) {
      if (!formData.name.trim()) {
        alert(t('guests.pleaseEnterName'));
        return;
      }

      onSave(formData);
      alert(t('guests.guestSavedAddChild'));
    } else {
      if (onAddChild) {
        onClose();
        onAddChild(guest);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif', fontWeight: 'normal' }}>
            {guest ? t('guests.editGuest') : t('guests.addGuest')}
          </h2>
          <button
            onClick={onClose}
            className="transition-colors"
            style={{ color: '#9ca3af' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#3b3b3d'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {guest && guest.support_team_id && (
          <div className="px-6 pt-4">
            <div className="rounded-lg p-3 flex items-center gap-2" style={{ backgroundColor: '#e0f7f6' }}>
              <Shield className="w-4 h-4" style={{ color: '#4ECDC4' }} />
              <span className="text-sm" style={{ color: '#4ECDC4', fontFamily: 'Open Sans, sans-serif' }}>
                {t('guests.inSupportTeam')}{guest.support_team_role && `: ${guest.support_team_role}`}
              </span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                {formData.is_child ? t('guests.childName') : t('guests.guestName')} *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all"
                style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}
                placeholder={formData.is_child ? t('guests.enterChildName') : t('guests.enterName')}
              />
            </div>

            {!formData.is_child && (
              <div>
                <label className="block text-sm mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  {t('guests.partnerName')}
                </label>
                <input
                  type="text"
                  value={formData.partner_name}
                  onChange={(e) => setFormData({ ...formData, partner_name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}
                  placeholder={t('guests.enterPartnerName')}
                />
              </div>
            )}
          </div>


          {!guest?.id && !showChildActions && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleConfirmNames}
                className="flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-all shadow-md hover:shadow-lg"
                style={{ backgroundColor: '#22c55e', fontFamily: 'Open Sans, sans-serif' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#22c55e'}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                {t('guests.confirmNames')}
              </button>
            </div>
          )}


          {!formData.is_child && (
            <div className="border rounded-lg p-4" style={{ borderColor: '#d6b15b', backgroundColor: '#fafafa' }}>
              <button
                type="button"
                onClick={() => setIsChildrenExpanded(!isChildrenExpanded)}
                className="w-full flex items-center justify-between mb-3"
              >
                <h3 className="text-base font-semibold flex items-center gap-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  <Baby className="w-5 h-5" style={{ color: '#4ECDC4' }} />
                  {t('guests.children')}
                </h3>
                {isChildrenExpanded ? (
                  <ChevronUp className="w-5 h-5" style={{ color: '#3b3b3d' }} />
                ) : (
                  <ChevronDown className="w-5 h-5" style={{ color: '#3b3b3d' }} />
                )}
              </button>

              {!isChildrenExpanded && guest?.id && allGuests.filter(g => g.parent_guest_id === guest.id).length > 0 && (
                <div className="text-sm" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>
                  {allGuests.filter(g => g.parent_guest_id === guest.id).length} {allGuests.filter(g => g.parent_guest_id === guest.id).length === 1 ? t('guests.child') : t('guests.children')}
                </div>
              )}

              {isChildrenExpanded && (
                <div className="space-y-3">
                  {guest?.id && allGuests.filter(g => g.parent_guest_id === guest.id).length > 0 ? (
                    <div className="space-y-2">
                      {allGuests
                        .filter(g => g.parent_guest_id === guest.id)
                        .map((child) => (
                          <div
                            key={child.id}
                            className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <Baby className="w-4 h-4" style={{ color: '#4ECDC4' }} />
                              <div>
                                <div className="font-medium" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                                  {child.name}
                                </div>
                                {child.age && (
                                  <div className="text-xs" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>
                                    {child.age} {t('guests.yearsOld')}
                                  </div>
                                )}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                if (onEditChild) {
                                  onClose();
                                  onEditChild(child);
                                }
                              }}
                              className="p-2 rounded-lg transition-colors"
                              style={{ color: '#4ECDC4' }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0f7f6'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                              title={t('guests.edit')}
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-2 text-sm" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>
                      {guest?.id ? t('guests.noChildren') : t('guests.saveFirstToAddChildren')}
                    </div>
                  )}

                  {onAddChild && (
                    <button
                      type="button"
                      onClick={handleAddChildClick}
                      className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed rounded-lg transition-colors"
                      style={{ borderColor: '#4ECDC4', color: '#4ECDC4', fontFamily: 'Open Sans, sans-serif' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0f7f6'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <Plus className="w-4 h-4" />
                      {t('guests.addChild')}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {guest?.id && !formData.is_child && (
          <>
          <div>
            <button
              type="button"
              onClick={() => setIsContactInfoExpanded(!isContactInfoExpanded)}
              className="w-full flex items-center justify-between mb-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-lg font-semibold" style={{ color: '#3b3b3d', fontFamily: 'Playfair Display, serif' }}>
                {t('guests.contactInformation')}
              </h3>
              {isContactInfoExpanded ? (
                <ChevronUp className="w-5 h-5" style={{ color: '#3b3b3d' }} />
              ) : (
                <ChevronDown className="w-5 h-5" style={{ color: '#3b3b3d' }} />
              )}
            </button>

            {!isContactInfoExpanded && (formData.email || formData.phone || formData.street_address) && (
              <div className="mb-3 p-3 bg-gray-50 rounded-lg text-sm" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>
                {formData.email && <div>{formData.email}</div>}
                {formData.phone && <div>{formData.phone}</div>}
                {formData.street_address && <div>{formData.street_address}, {formData.postal_code} {formData.city}</div>}
              </div>
            )}

            {isContactInfoExpanded && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                    {t('guests.streetAddress')}
                  </label>
                  <input
                    type="text"
                    value={formData.street_address}
                    onChange={(e) => setFormData({ ...formData, street_address: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all"
                    style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}
                    placeholder={t('guests.enterStreetAddress')}
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                    {t('guests.postalCode')}
                  </label>
                  <input
                    type="text"
                    value={formData.postal_code}
                    onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all"
                    style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}
                    placeholder={t('guests.enterPostalCode')}
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                    {t('guests.city')}
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all"
                    style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}
                    placeholder={t('guests.enterCity')}
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                    {t('guests.email')}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all"
                    style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}
                    placeholder={t('guests.enterEmail')}
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                    {t('guests.phone')}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all"
                    style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}
                    placeholder={t('guests.enterPhone')}
                  />
                </div>
              </div>
            )}
          </div>
          </>
          )}

          {formData.is_child && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="text-sm font-medium mb-3" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                {t('guests.childInformation')}
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  {t('guests.age')}
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.age || ''}
                  onChange={(e) => {
                    const newAge = e.target.value ? parseInt(e.target.value) : null;
                    setFormData({
                      ...formData,
                      age: newAge,
                      badge_type: 'child'
                    });
                  }}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}
                  placeholder={t('guests.enterAge')}
                />
              </div>

              <div className="border-t border-blue-200 pt-4">
                <label className="block text-sm font-medium mb-3" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  {t('guests.seatingPreference')}
                </label>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all hover:bg-blue-100"
                    style={{
                      borderColor: formData.seating_preference === 'parent_table' ? '#4ECDC4' : '#d6b15b',
                      backgroundColor: formData.seating_preference === 'parent_table' ? '#e0f7f6' : 'white'
                    }}
                  >
                    <input
                      type="radio"
                      name="seating_preference"
                      value="parent_table"
                      checked={formData.seating_preference === 'parent_table'}
                      onChange={(e) => setFormData({ ...formData, seating_preference: e.target.value, custom_table_id: null })}
                      className="mt-1"
                      style={{ accentColor: '#4ECDC4' }}
                    />
                    <div>
                      <div className="font-medium text-sm" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                        {t('guests.seatingParentTable')}
                      </div>
                      <div className="text-xs" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>
                        {t('guests.seatingParentTableDesc')}
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all hover:bg-blue-100"
                    style={{
                      borderColor: formData.seating_preference === 'kids_table' ? '#4ECDC4' : '#d6b15b',
                      backgroundColor: formData.seating_preference === 'kids_table' ? '#e0f7f6' : 'white'
                    }}
                  >
                    <input
                      type="radio"
                      name="seating_preference"
                      value="kids_table"
                      checked={formData.seating_preference === 'kids_table'}
                      onChange={(e) => setFormData({ ...formData, seating_preference: e.target.value, custom_table_id: null })}
                      className="mt-1"
                      style={{ accentColor: '#4ECDC4' }}
                    />
                    <div>
                      <div className="font-medium text-sm" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                        {t('guests.seatingKidsTable')}
                      </div>
                      <div className="text-xs" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>
                        {t('guests.seatingKidsTableDesc')}
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all hover:bg-blue-100"
                    style={{
                      borderColor: formData.seating_preference === 'custom_table' ? '#4ECDC4' : '#d6b15b',
                      backgroundColor: formData.seating_preference === 'custom_table' ? '#e0f7f6' : 'white'
                    }}
                  >
                    <input
                      type="radio"
                      name="seating_preference"
                      value="custom_table"
                      checked={formData.seating_preference === 'custom_table'}
                      onChange={(e) => setFormData({ ...formData, seating_preference: e.target.value })}
                      className="mt-1"
                      style={{ accentColor: '#4ECDC4' }}
                    />
                    <div className="flex-1">
                      <div className="font-medium text-sm mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                        {t('guests.seatingCustomTable')}
                      </div>
                      <div className="text-xs mb-2" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>
                        {t('guests.seatingCustomTableDesc')}
                      </div>
                      {formData.seating_preference === 'custom_table' && (
                        <select
                          value={formData.custom_table_id || ''}
                          onChange={(e) => setFormData({ ...formData, custom_table_id: e.target.value || null })}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all"
                          style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontSize: '0.875rem' }}
                        >
                          <option value="">{t('guests.selectTable')}</option>
                          {tables.map(table => (
                            <option key={table.id} value={table.id}>
                              {table.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {!formData.is_child && (
            <>
              <div>
                <label className="block text-sm mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  {t('guests.seatingPreferences')}
                </label>
                <select
                  value={formData.badge_type || ''}
                  onChange={(e) => setFormData({ ...formData, badge_type: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}
                >
                  <option value="">{t('guests.seatingPreferencesNone')}</option>
                  <option value="vip">{t('guests.seatingPreferencesVIP')}</option>
                  <option value="family">{t('guests.seatingPreferencesFamily')}</option>
                  <option value="friend">{t('guests.seatingPreferencesFriend')}</option>
                  <option value="colleague">{t('guests.seatingPreferencesColleague')}</option>
                  <option value="child">{t('guests.seatingPreferencesChild')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  {t('guests.relationshipCategory')}
                </label>
                <select
                  value={formData.relationship_category}
                  onChange={(e) => setFormData({ ...formData, relationship_category: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}
                >
                  <option value=""></option>
                  <option value="immediate_family">{t('guests.relationshipImmediateFamily')}</option>
                  <option value="family">{t('guests.relationshipFamily')}</option>
                  <option value="close_friends">{t('guests.relationshipCloseFriends')}</option>
                  <option value="friends">{t('guests.relationshipFriends')}</option>
                  <option value="colleagues">{t('guests.relationshipColleagues')}</option>
                  <option value="acquaintances">{t('guests.relationshipAcquaintances')}</option>
                  <option value="neighbors">{t('guests.relationshipNeighbors')}</option>
                </select>
              </div>
            </>
          )}

          {!formData.is_child && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-3" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                    {t('guests.side')}
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="side"
                        value="bride"
                        checked={formData.side === 'bride'}
                        onChange={(e) => setFormData({ ...formData, side: e.target.value })}
                        className="w-4 h-4"
                        style={{ accentColor: '#4ECDC4' }}
                      />
                      <span className="text-sm" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                        {t('guests.sideBride')}
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="side"
                        value="groom"
                        checked={formData.side === 'groom'}
                        onChange={(e) => setFormData({ ...formData, side: e.target.value })}
                        className="w-4 h-4"
                        style={{ accentColor: '#4ECDC4' }}
                      />
                      <span className="text-sm" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                        {t('guests.sideGroom')}
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="side"
                        value="both"
                        checked={formData.side === 'both'}
                        onChange={(e) => setFormData({ ...formData, side: e.target.value })}
                        className="w-4 h-4"
                        style={{ accentColor: '#4ECDC4' }}
                      />
                      <span className="text-sm" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                        {t('guests.sideBoth')}
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                    {t('guests.specificRelationship')}
                  </label>
                  <select
                    value={formData.specific_relationship}
                    onChange={(e) => setFormData({ ...formData, specific_relationship: e.target.value, custom_relationship: e.target.value === 'other' ? formData.custom_relationship : '' })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all"
                    style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}
                  >
                    <option value=""></option>
                    <optgroup label={t('guests.relationshipGroupFamily')}>
                      <option value="mother">{t('guests.relationshipMother')}</option>
                      <option value="father">{t('guests.relationshipFather')}</option>
                      <option value="grandmother">{t('guests.relationshipGrandmother')}</option>
                      <option value="grandfather">{t('guests.relationshipGrandfather')}</option>
                      <option value="sister">{t('guests.relationshipSister')}</option>
                      <option value="brother">{t('guests.relationshipBrother')}</option>
                      <option value="aunt">{t('guests.relationshipAunt')}</option>
                      <option value="uncle">{t('guests.relationshipUncle')}</option>
                      <option value="female_cousin">{t('guests.relationshipFemaleCousin')}</option>
                      <option value="male_cousin">{t('guests.relationshipMaleCousin')}</option>
                      <option value="niece">{t('guests.relationshipNiece')}</option>
                      <option value="nephew">{t('guests.relationshipNephew')}</option>
                    </optgroup>
                    <optgroup label={t('guests.relationshipGroupInLaws')}>
                      <option value="mother_in_law">{t('guests.relationshipMotherInLaw')}</option>
                      <option value="father_in_law">{t('guests.relationshipFatherInLaw')}</option>
                      <option value="sister_in_law">{t('guests.relationshipSisterInLaw')}</option>
                      <option value="brother_in_law">{t('guests.relationshipBrotherInLaw')}</option>
                    </optgroup>
                    <optgroup label={t('guests.relationshipGroupFriends')}>
                      <option value="best_friend_female">{t('guests.relationshipBestFriendFemale')}</option>
                      <option value="best_friend_male">{t('guests.relationshipBestFriendMale')}</option>
                      <option value="close_friend_female">{t('guests.relationshipCloseFriendFemale')}</option>
                      <option value="close_friend_male">{t('guests.relationshipCloseFriendMale')}</option>
                      <option value="friend_female">{t('guests.relationshipFriendFemale')}</option>
                      <option value="friend_male">{t('guests.relationshipFriendMale')}</option>
                    </optgroup>
                    <optgroup label={t('guests.relationshipGroupWorkStudy')}>
                      <option value="colleague">{t('guests.relationshipColleague')}</option>
                      <option value="study_friend">{t('guests.relationshipStudyFriend')}</option>
                    </optgroup>
                    <optgroup label={t('guests.relationshipGroupOther')}>
                      <option value="other">{t('guests.relationshipOther')}</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              {formData.specific_relationship === 'other' && (
                <div>
                  <label className="block text-sm mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                    {t('guests.customRelationship')}
                  </label>
                  <input
                    type="text"
                    value={formData.custom_relationship}
                    onChange={(e) => setFormData({ ...formData, custom_relationship: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all"
                    style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}
                    placeholder={t('guests.enterCustomRelationship')}
                  />
                </div>
              )}
            </>
          )}

          {!formData.is_child && (
            <>
              <div className="border-t border-gray-200 pt-6">
                <label className="block text-sm mb-3" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  {t('guests.saveTheDate')}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs mb-2" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>
                      {t('guests.statusLabel')}
                    </label>
                    <select
                      value={formData.save_the_date_status}
                      onChange={(e) => setFormData({ ...formData, save_the_date_status: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all"
                      style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}
                    >
                      <option value="pending">{t('guests.statusPending')}</option>
                      <option value="sent">{t('guests.statusSent')}</option>
                      <option value="confirmed">{t('guests.statusConfirmed')}</option>
                      <option value="declined">{t('guests.statusDeclined')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs mb-2" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>
                      {t('guests.sentDate')}
                    </label>
                    <input
                      type="date"
                      value={formData.save_the_date_sent_date}
                      onChange={(e) => setFormData({ ...formData, save_the_date_sent_date: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all"
                      style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <label className="block text-sm mb-3" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  {t('guests.invitation')}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs mb-2" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>
                      {t('guests.statusLabel')}
                    </label>
                    <select
                      value={formData.invitation_status}
                      onChange={(e) => setFormData({ ...formData, invitation_status: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all"
                      style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}
                    >
                      <option value="pending">{t('guests.statusPending')}</option>
                      <option value="sent">{t('guests.statusSent')}</option>
                      <option value="confirmed">{t('guests.statusConfirmed')}</option>
                      <option value="declined">{t('guests.statusDeclined')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs mb-2" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>
                      {t('guests.sentDate')}
                    </label>
                    <input
                      type="date"
                      value={formData.invitation_sent_date}
                      onChange={(e) => setFormData({ ...formData, invitation_sent_date: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all"
                      style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={() => setIsEventsExpanded(!isEventsExpanded)}
              className="w-full flex items-center justify-between mb-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-lg font-semibold" style={{ color: '#3b3b3d', fontFamily: 'Playfair Display, serif' }}>
                {t('guests.events')}
              </h3>
              {isEventsExpanded ? (
                <ChevronUp className="w-5 h-5" style={{ color: '#3b3b3d' }} />
              ) : (
                <ChevronDown className="w-5 h-5" style={{ color: '#3b3b3d' }} />
              )}
            </button>

            {!isEventsExpanded && formData.events.length > 0 && (
              <div className="mb-3 p-3 bg-gray-50 rounded-lg text-sm" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>
                {formData.events.length} {t('guests.eventsSelected')}
              </div>
            )}

            {isEventsExpanded && (
              <div className="grid grid-cols-2 gap-3">
                {events.map((event) => (
                  <label
                    key={event.id}
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    style={{ borderColor: '#d6b15b' }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.events.includes(event.id)}
                      onChange={() => toggleEvent(event.id)}
                      className="w-5 h-5 border-gray-300 rounded"
                      style={{ accentColor: '#4ECDC4' }}
                    />
                    <span className="text-2xl">{event.emoji}</span>
                    <span className="text-sm" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                      {i18n.language === 'de' ? event.name_de : event.name_en}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {!formData.is_child && (
            <div className="border-t border-gray-200 pt-6">
              <button
                type="button"
                onClick={() => setIsAccommodationExpanded(!isAccommodationExpanded)}
                className="w-full flex items-center justify-between mb-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold" style={{ color: '#3b3b3d', fontFamily: 'Playfair Display, serif' }}>
                  {t('guests.accommodation')}
                </h3>
                {isAccommodationExpanded ? (
                  <ChevronUp className="w-5 h-5" style={{ color: '#3b3b3d' }} />
                ) : (
                  <ChevronDown className="w-5 h-5" style={{ color: '#3b3b3d' }} />
                )}
              </button>

              {!isAccommodationExpanded && formData.accommodation_type !== 'none' && (
                <div className="mb-3 p-3 bg-gray-50 rounded-lg text-sm" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>
                  {formData.accommodation_type === 'hotel' ? t('guests.accommodationHotel') : t('guests.accommodationOwn')}
                  {formData.accommodation_type === 'hotel' && formData.accommodation_rooms && ` (${formData.accommodation_rooms} ${t('guests.rooms')})`}
                </div>
              )}

              {isAccommodationExpanded && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs mb-2" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>
                      {t('guests.accommodationType')}
                    </label>
                    <select
                      value={formData.accommodation_type}
                      onChange={(e) => setFormData({
                        ...formData,
                        accommodation_type: e.target.value,
                        accommodation_rooms: e.target.value === 'hotel' ? formData.accommodation_rooms : null
                      })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all"
                      style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}
                    >
                      <option value="none">{t('guests.accommodationNone')}</option>
                      <option value="hotel">{t('guests.accommodationHotel')}</option>
                      <option value="own">{t('guests.accommodationOwn')}</option>
                    </select>
                  </div>
                  {formData.accommodation_type === 'hotel' && (
                    <div>
                      <label className="block text-xs mb-2" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>
                        {t('guests.accommodationRooms')}
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.accommodation_rooms || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          accommodation_rooms: e.target.value ? parseInt(e.target.value) : null
                        })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all"
                        style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}
                        placeholder={t('guests.enterRooms')}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {!formData.is_child && (
          <div className="border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={() => setIsDietaryExpanded(!isDietaryExpanded)}
              className="w-full flex items-center justify-between mb-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-lg font-semibold" style={{ color: '#3b3b3d', fontFamily: 'Playfair Display, serif' }}>
                {t('guests.dietaryRestrictions')}
              </h3>
              {isDietaryExpanded ? (
                <ChevronUp className="w-5 h-5" style={{ color: '#3b3b3d' }} />
              ) : (
                <ChevronDown className="w-5 h-5" style={{ color: '#3b3b3d' }} />
              )}
            </button>

            {!isDietaryExpanded && (formData.dietary_restrictions || []).length > 0 && (
              <div className="mb-3 p-3 bg-gray-50 rounded-lg text-sm" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>
                {(formData.dietary_restrictions || []).length} {t('guests.personsWithRestrictions')}
              </div>
            )}

            {isDietaryExpanded && (() => {
              const persons: string[] = [];
              if (formData.name) persons.push(formData.name);
              if (formData.partner_name) persons.push(formData.partner_name);
              if (guest?.id) {
                const children = allGuests.filter(g => g.parent_guest_id === guest.id);
                children.forEach(child => persons.push(child.name));
              }
              return persons.length > 0 ? (
                <div className="space-y-4">
                  {persons.map((personName) => {
                    const restriction = getDietaryRestrictionForPerson(personName);
                    return (
                      <div key={personName} className="bg-gray-50 p-4 rounded-lg space-y-3">
                        <div className="font-medium text-base mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                          {personName}
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={restriction.is_vegetarian}
                              onChange={(e) => updateDietaryRestriction(personName, 'is_vegetarian', e.target.checked)}
                              className="w-4 h-4 border-gray-300 rounded"
                              style={{ accentColor: '#4ECDC4' }}
                            />
                            <span className="text-sm" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                              {t('guests.vegetarian')}
                            </span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={restriction.is_vegan}
                              onChange={(e) => updateDietaryRestriction(personName, 'is_vegan', e.target.checked)}
                              className="w-4 h-4 border-gray-300 rounded"
                              style={{ accentColor: '#4ECDC4' }}
                            />
                            <span className="text-sm" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                              {t('guests.vegan')}
                            </span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={restriction.is_lactose_intolerant}
                              onChange={(e) => updateDietaryRestriction(personName, 'is_lactose_intolerant', e.target.checked)}
                              className="w-4 h-4 border-gray-300 rounded"
                              style={{ accentColor: '#4ECDC4' }}
                            />
                            <span className="text-sm" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                              {t('guests.lactoseIntolerant')}
                            </span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={restriction.is_gluten_intolerant}
                              onChange={(e) => updateDietaryRestriction(personName, 'is_gluten_intolerant', e.target.checked)}
                              className="w-4 h-4 border-gray-300 rounded"
                              style={{ accentColor: '#4ECDC4' }}
                            />
                            <span className="text-sm" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                              {t('guests.glutenIntolerant')}
                            </span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={restriction.is_halal}
                              onChange={(e) => updateDietaryRestriction(personName, 'is_halal', e.target.checked)}
                              className="w-4 h-4 border-gray-300 rounded"
                              style={{ accentColor: '#4ECDC4' }}
                            />
                            <span className="text-sm" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                              {t('guests.halal')}
                            </span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={restriction.has_allergies}
                              onChange={(e) => updateDietaryRestriction(personName, 'has_allergies', e.target.checked)}
                              className="w-4 h-4 border-gray-300 rounded"
                              style={{ accentColor: '#4ECDC4' }}
                            />
                            <span className="text-sm" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                              {t('guests.allergies')}
                            </span>
                          </label>
                        </div>

                        {restriction.has_allergies && (
                          <div className="mt-3">
                            <label className="block text-xs mb-2" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>
                              {t('guests.allergyDetails')}
                            </label>
                            <textarea
                              value={restriction.allergies}
                              onChange={(e) => updateDietaryRestriction(personName, 'allergies', e.target.value)}
                              placeholder={t('guests.enterAllergyDetails')}
                              rows={3}
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none resize-none transition-all"
                              style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', backgroundColor: '#ffffff' }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : null;
            })()}
          </div>
          )}

          {!formData.is_child && (
            <div className="border-t border-gray-200 pt-6">
              <button
                type="button"
                onClick={() => setIsGiftExpanded(!isGiftExpanded)}
                className="w-full flex items-center justify-between mb-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold" style={{ color: '#3b3b3d', fontFamily: 'Playfair Display, serif' }}>
                  {t('guests.giftsAndThankYou')}
                </h3>
                {isGiftExpanded ? (
                  <ChevronUp className="w-5 h-5" style={{ color: '#3b3b3d' }} />
                ) : (
                  <ChevronDown className="w-5 h-5" style={{ color: '#3b3b3d' }} />
                )}
              </button>

              {!isGiftExpanded && (formData.gift_received || formData.thank_you_sent) && (
                <div className="mb-3 p-3 bg-gray-50 rounded-lg text-sm" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>
                  {formData.gift_received && <div>{t('guests.giftReceived')}: {formData.gift_received}</div>}
                  {formData.thank_you_sent && <div>{t('guests.thankYouSent')}: {formData.thank_you_sent_date}</div>}
                </div>
              )}

              {isGiftExpanded && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                      {t('guests.giftReceived')}
                    </label>
                    <input
                      type="text"
                      value={formData.gift_received}
                      onChange={(e) => setFormData({ ...formData, gift_received: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all"
                      style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}
                      placeholder={t('guests.enterGiftReceived')}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.thank_you_sent}
                          onChange={(e) => setFormData({ ...formData, thank_you_sent: e.target.checked })}
                          className="w-5 h-5 border-gray-300 rounded"
                          style={{ accentColor: '#4ECDC4' }}
                        />
                        <span className="text-sm" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                          {t('guests.thankYouSent')}
                        </span>
                      </label>
                    </div>

                    {formData.thank_you_sent && (
                      <div>
                        <label className="block text-xs mb-2" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>
                          {t('guests.sentDate')}
                        </label>
                        <input
                          type="date"
                          value={formData.thank_you_sent_date}
                          onChange={(e) => setFormData({ ...formData, thank_you_sent_date: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all"
                          style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
              {t('guests.notes')}
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none resize-none transition-all"
              style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}
              placeholder={t('guests.addNotes')}
            />
          </div>

          {(guest?.id || showChildActions) && (
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            {showChildActions && formData.is_child && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                }}
                className="flex items-center gap-2 px-6 py-2 border rounded-lg transition-all"
                style={{ borderColor: '#4ECDC4', color: '#4ECDC4', fontFamily: 'Open Sans, sans-serif' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e0f7f6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Shield className="w-5 h-5" />
                {t('guests.assignToSupportTeam')}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded-lg transition-all"
              style={{ borderColor: '#d6b15b', color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {t('guests.cancel')}
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg text-white transition-all"
              style={{ backgroundColor: '#4ECDC4', fontFamily: 'Open Sans, sans-serif' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3ba39c'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4ECDC4'}
            >
              {t('guests.save')}
            </button>
          </div>
          )}
        </form>
      </div>
    </div>
  );
}
