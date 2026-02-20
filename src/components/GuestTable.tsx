import { Edit, Trash2, Users, ArchiveRestore, Hotel, UserPlus, Shield, Baby, Star, Heart, Award, UserCheck, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DietaryRestriction {
  id?: string;
  guest_id?: string;
  name: string;
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_lactose_intolerant: boolean;
  is_gluten_intolerant: boolean;
  is_halal: boolean;
  allergies: string;
}

interface Guest {
  id: string;
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
  relationship_category?: string;
  side?: string;
  specific_relationship?: string;
  custom_relationship?: string;
  notes: string;
  archived: boolean;
  support_team_id?: string | null;
  support_team_role?: string;
  is_child: boolean;
  parent_guest_id?: string | null;
  date_of_birth: string;
  age: number | null;
  badge_type?: string;
}

interface Event {
  id: string;
  name_de: string;
  name_en: string;
  emoji: string;
}

interface GuestTableProps {
  guests: Guest[];
  events: Event[];
  onEdit: (guest: Guest) => void;
  onDelete: (id: string) => void;
  onRestore?: (id: string) => void;
  isArchived?: boolean;
  onAddToSupportTeam?: (guest: Guest) => void;
}

export default function GuestTable({ guests, events, onEdit, onDelete, onRestore, isArchived = false, onAddToSupportTeam }: GuestTableProps) {
  const { t, i18n } = useTranslation();

  const parentGuests = guests.filter(g => !g.is_child);
  const childGuests = guests.filter(g => g.is_child);

  const guestsWithChildren = parentGuests.map(parent => ({
    ...parent,
    children: childGuests.filter(child => child.parent_guest_id === parent.id)
  }));

  const sortedGuests = [...guestsWithChildren].sort((a, b) => a.name.localeCompare(b.name));

  const getRelationshipLabel = (category?: string) => {
    if (!category) return '—';
    return t(`guests.relationship${category.charAt(0).toUpperCase()}${category.slice(1).replace(/_([a-z])/g, (m, c) => c.toUpperCase())}`);
  };

  const getSpecificRelationshipDisplay = (guest: Guest) => {
    if (!guest.specific_relationship && !guest.side) return null;

    let relationshipText = '';
    if (guest.specific_relationship === 'other' && guest.custom_relationship) {
      relationshipText = guest.custom_relationship;
    } else if (guest.specific_relationship) {
      relationshipText = t(`guests.relationship${guest.specific_relationship.charAt(0).toUpperCase()}${guest.specific_relationship.slice(1).replace(/_([a-z])/g, (m, c) => c.toUpperCase())}`);
    }

    let sideText = '';
    if (guest.side) {
      sideText = t(`guests.side${guest.side.charAt(0).toUpperCase()}${guest.side.slice(1)}`);
    }

    if (relationshipText && sideText) {
      return `${relationshipText} • ${sideText}`;
    }
    return relationshipText || sideText;
  };

  const getEventEmojis = (eventIds: string[]) => {
    return eventIds
      .map(id => events.find(e => e.id === id))
      .filter(Boolean)
      .map(event => event!.emoji);
  };

  const getBadge = (badgeType?: string) => {
    if (!badgeType) return null;

    const badgeStyles: { [key: string]: { icon: JSX.Element; bg: string; color: string; label: string } } = {
      vip: { icon: <Star className="w-3 h-3" />, bg: '#fef9e6', color: '#d6b15b', label: 'VIP' },
      family: { icon: <Heart className="w-3 h-3" />, bg: '#ffe4e6', color: '#e11d48', label: 'Familie' },
      friend: { icon: <UserCheck className="w-3 h-3" />, bg: '#e0f7f6', color: '#4ECDC4', label: 'Freund/in' },
      colleague: { icon: <Briefcase className="w-3 h-3" />, bg: '#f3f4f6', color: '#6b7280', label: 'Kollege/in' },
      child: { icon: <Baby className="w-3 h-3" />, bg: '#dbeafe', color: '#3b82f6', label: 'Kind' }
    };

    const style = badgeStyles[badgeType];
    if (!style) return null;

    return (
      <span
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
        style={{ backgroundColor: style.bg, color: style.color, fontFamily: 'Open Sans, sans-serif' }}
      >
        {style.icon}
        {style.label}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusStyles: { [key: string]: { bg: string; text: string } } = {
      pending: { bg: '#f3f4f6', text: '#6b7280' },
      sent: { bg: '#e0f7f6', text: '#4ECDC4' },
      confirmed: { bg: '#fef9e6', text: '#d6b15b' },
      declined: { bg: '#e8e8e8', text: '#3b3b3d' }
    };

    const style = statusStyles[status] || statusStyles.pending;

    return (
      <span
        className="px-2 py-1 rounded-full text-xs"
        style={{ backgroundColor: style.bg, color: style.text, fontFamily: 'Open Sans, sans-serif' }}
      >
        {t(`guests.status${status.charAt(0).toUpperCase()}${status.slice(1)}`)}
      </span>
    );
  };

  const getAccommodationDisplay = (type: string, rooms: number | null) => {
    if (type === 'hotel') {
      return rooms ? `🏨 ${rooms}` : '🏨';
    } else if (type === 'own') {
      return '🏠';
    }
    return '—';
  };

  const totalAdults = parentGuests.reduce((sum, guest) => sum + guest.number_of_adults, 0);
  const totalChildren = childGuests.length;
  const saveTheDateSent = parentGuests.filter(g => g.save_the_date_status === 'sent' || g.save_the_date_status === 'confirmed' || g.save_the_date_status === 'declined').length;
  const invitationsSent = parentGuests.filter(g => g.invitation_status === 'sent' || g.invitation_status === 'confirmed' || g.invitation_status === 'declined').length;
  const saveTheDateConfirmed = parentGuests.filter(g => g.save_the_date_status === 'confirmed').length;
  const invitationsConfirmed = parentGuests.filter(g => g.invitation_status === 'confirmed').length;

  const hotelBookings = guests.filter(g => g.accommodation_type === 'hotel').length;
  const totalHotelRooms = guests.reduce((sum, guest) => {
    if (guest.accommodation_type === 'hotel' && guest.accommodation_rooms) {
      return sum + guest.accommodation_rooms;
    }
    return sum;
  }, 0);

  const eventParticipation = events.map(event => {
    const participatingGuests = guests.filter(g => g.events.includes(event.id));
    const totalPeople = participatingGuests.reduce((sum, guest) => {
      if (guest.is_child) return sum + 1;
      return sum + guest.number_of_adults;
    }, 0);
    return {
      event,
      guests: participatingGuests.filter(g => !g.is_child).length,
      people: totalPeople
    };
  });

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs uppercase tracking-wider" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif', fontWeight: 'normal' }}>
                {t('guests.name')}
              </th>
              <th className="px-6 py-3 text-left text-xs uppercase tracking-wider" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif', fontWeight: 'normal' }}>
                {t('guests.relationshipCategory')}
              </th>
              <th className="px-6 py-3 text-center text-xs uppercase tracking-wider" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif', fontWeight: 'normal' }}>
                <Users className="w-4 h-4 mx-auto" />
              </th>
              <th className="px-6 py-3 text-center text-xs uppercase tracking-wider" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif', fontWeight: 'normal' }}>
                <Baby className="w-4 h-4 mx-auto" />
              </th>
              <th className="px-6 py-3 text-center text-xs uppercase tracking-wider" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif', fontWeight: 'normal' }}>
                {t('guests.saveTheDate')}
              </th>
              <th className="px-6 py-3 text-center text-xs uppercase tracking-wider" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif', fontWeight: 'normal' }}>
                {t('guests.invitation')}
              </th>
              <th className="px-6 py-3 text-center text-xs uppercase tracking-wider" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif', fontWeight: 'normal' }}>
                {t('guests.events')}
              </th>
              <th className="px-6 py-3 text-center text-xs uppercase tracking-wider" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif', fontWeight: 'normal' }}>
                <Hotel className="w-4 h-4 mx-auto" />
              </th>
              <th className="px-6 py-3 text-center text-xs uppercase tracking-wider" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif', fontWeight: 'normal' }}>
                <Shield className="w-4 h-4 mx-auto" />
              </th>
              <th className="px-6 py-3 text-right text-xs uppercase tracking-wider" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif', fontWeight: 'normal' }}>
                {t('guests.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedGuests.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-6 py-8 text-center text-gray-500">
                  {isArchived ? t('guests.noArchivedGuests') : t('guests.noGuests')}
                </td>
              </tr>
            ) : (
              sortedGuests.map((guest) => (
                <tr key={guest.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onEdit(guest)}
                        className="transition-colors"
                        style={{ color: '#9ca3af' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#4ECDC4'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                        title={t('guests.edit')}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <div>
                        <div className="flex items-center gap-2">
                          <span style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>{guest.name}</span>
                          {getBadge(guest.badge_type)}
                        </div>
                        {guest.partner_name && (
                          <div className="text-sm" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>{guest.partner_name}</div>
                        )}
                        {getSpecificRelationshipDisplay(guest) && (
                          <div className="mt-1">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs" style={{ backgroundColor: '#fef9e6', color: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}>
                              {getSpecificRelationshipDisplay(guest)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                    {getRelationshipLabel(guest.relationship_category)}
                  </td>
                  <td className="px-6 py-4 text-center" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                    {guest.number_of_adults}
                  </td>
                  <td className="px-6 py-4 text-center" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                    {guest.children?.length || 0}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {getStatusBadge(guest.save_the_date_status)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {getStatusBadge(guest.invitation_status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-1 text-xl">
                      {getEventEmojis(guest.events).map((emoji, idx) => (
                        <span key={idx}>{emoji}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                    {getAccommodationDisplay(guest.accommodation_type, guest.accommodation_rooms)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {guest.support_team_id ? (
                      <div className="flex items-center justify-center gap-1">
                        <Shield className="w-4 h-4" style={{ color: '#4ECDC4' }} />
                        {guest.support_team_role && (
                          <span className="text-xs" style={{ color: '#4ECDC4', fontFamily: 'Open Sans, sans-serif' }}>
                            {guest.support_team_role}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span style={{ color: '#9ca3af' }}>—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {!isArchived && !guest.support_team_id && onAddToSupportTeam && (
                        <button
                          onClick={() => onAddToSupportTeam(guest)}
                          className="p-2 rounded-lg transition-colors"
                          style={{ color: '#4ECDC4' }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0f7f6'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          title={t('guests.addToSupportTeam')}
                        >
                          <UserPlus className="w-4 h-4" />
                        </button>
                      )}
                      {isArchived && onRestore ? (
                        <button
                          onClick={() => onRestore(guest.id)}
                          className="p-2 rounded-lg transition-colors"
                          style={{ color: '#4ECDC4' }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0f7f6'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          title={t('guests.restore')}
                        >
                          <ArchiveRestore className="w-4 h-4" />
                        </button>
                      ) : null}
                      <button
                        onClick={() => onDelete(guest.id)}
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: '#3b3b3d' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e8e8e8'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        title={isArchived ? t('guests.deletePermanently') : t('guests.archive')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!isArchived && guests.length > 0 && (
        <div className="rounded-lg p-6 shadow" style={{ background: 'linear-gradient(to right, #fef9e6, #e0f7f6)' }}>
          <h3 className="text-lg mb-4" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif', fontWeight: 'normal' }}>{t('guests.summary')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm mb-1" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>{t('guests.totalGuestEntries')}</div>
              <div className="text-2xl" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>{guests.length}</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm mb-1" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>{t('guests.totalAdults')}</div>
              <div className="text-2xl" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>{totalAdults}</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm mb-1" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>{t('guests.totalChildren')}</div>
              <div className="text-2xl" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>{totalChildren}</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm mb-1" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>{t('guests.totalPeople')}</div>
              <div className="text-2xl" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>{totalAdults + totalChildren}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm mb-1" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>{t('guests.saveTheDateSent')}</div>
              <div className="text-2xl" style={{ color: '#4ECDC4', fontFamily: 'Open Sans, sans-serif' }}>
                {saveTheDateSent} / {guests.length}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm mb-1" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>{t('guests.saveTheDateConfirmed')}</div>
              <div className="text-2xl" style={{ color: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}>
                {saveTheDateConfirmed} / {guests.length}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm mb-1" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>{t('guests.invitationsSent')}</div>
              <div className="text-2xl" style={{ color: '#4ECDC4', fontFamily: 'Open Sans, sans-serif' }}>
                {invitationsSent} / {guests.length}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm mb-1" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>{t('guests.invitationsConfirmed')}</div>
              <div className="text-2xl" style={{ color: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}>
                {invitationsConfirmed} / {guests.length}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm mb-1" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>{t('guests.hotelBookings')}</div>
              <div className="text-lg" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                {hotelBookings} {hotelBookings === 1 ? t('guests.guestSingular') : t('guests.guestPlural')} | {totalHotelRooms} {totalHotelRooms === 1 ? t('guests.roomSingular') : t('guests.roomPlural')}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm mb-1" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>{t('guests.ownAccommodation')}</div>
              <div className="text-lg" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                {guests.filter(g => g.accommodation_type === 'own').length} {guests.filter(g => g.accommodation_type === 'own').length === 1 ? t('guests.guestSingular') : t('guests.guestPlural')}
              </div>
            </div>
          </div>

          {eventParticipation.length > 0 && (
            <div className="mt-4">
              <h4 className="text-md mb-3" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif', fontWeight: 'normal' }}>
                {t('guests.eventParticipation')}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {eventParticipation.map(({ event, guests: guestCount, people }) => (
                  <div key={event.id} className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{event.emoji}</span>
                      <div className="text-xs" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>
                        {i18n.language === 'de' ? event.name_de : event.name_en}
                      </div>
                    </div>
                    <div className="text-sm" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                      {guestCount} {guestCount === 1 ? t('guests.guestSingular') : t('guests.guestPlural')} | {people} {people === 1 ? t('guests.personSingular') : t('guests.personPlural')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {guests.some(g => g.dietary_restrictions && g.dietary_restrictions.length > 0) && (
            <div className="mt-4">
              <h4 className="text-md mb-3" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif', fontWeight: 'normal' }}>
                {t('guests.dietaryRestrictions')}
              </h4>
              <div className="space-y-3">
                {guests.flatMap(guest =>
                  (guest.dietary_restrictions || []).map(restriction => ({
                    guestName: guest.name,
                    restriction
                  }))
                ).map((item, idx) => {
                  const restrictions = [];
                  if (item.restriction.is_vegetarian) restrictions.push(t('guests.vegetarian'));
                  if (item.restriction.is_vegan) restrictions.push(t('guests.vegan'));
                  if (item.restriction.is_lactose_intolerant) restrictions.push(t('guests.lactoseIntolerant'));
                  if (item.restriction.is_gluten_intolerant) restrictions.push(t('guests.glutenIntolerant'));
                  if (item.restriction.is_halal) restrictions.push(t('guests.halal'));

                  return (
                    <div key={idx} className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <div className="font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                            {item.restriction.name || item.guestName}
                          </div>
                          {item.restriction.name && (
                            <div className="text-xs mb-1" style={{ color: '#6b7280', fontFamily: 'Open Sans, sans-serif' }}>
                              ({item.guestName})
                            </div>
                          )}
                          <div className="flex flex-wrap gap-1 mb-2">
                            {restrictions.map((r, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 rounded-full text-xs"
                                style={{ backgroundColor: '#e0f7f6', color: '#4ECDC4', fontFamily: 'Open Sans, sans-serif' }}
                              >
                                {r}
                              </span>
                            ))}
                          </div>
                          {item.restriction.allergies && (
                            <div className="text-sm" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                              {t('guests.allergies')}: {item.restriction.allergies}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
