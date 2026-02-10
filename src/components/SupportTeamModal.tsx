import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Users, Plus, CheckCircle2, Circle } from 'lucide-react';
import { storage, Task } from '../lib/storage-adapter';
import { ROLE_TEMPLATES } from './roleTemplates';

export interface SupportTeamMember {
  id?: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  briefing_date?: string;
  availability_start?: string;
  availability_end?: string;
  responsibilities: string;
  notes: string;
  created_at?: string;
  guest_id?: string | null;
  archived?: boolean;
}

interface SupportTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: Omit<SupportTeamMember, 'id' | 'created_at'>) => void;
  member: SupportTeamMember | null;
  prefilledData?: {
    name: string;
    email: string;
    phone: string;
  };
  onAddTask?: (memberId: string) => void;
}


interface GuestOption {
  id: string;
  name: string;
  displayName: string;
  phone: string;
  email: string;
  isPartner?: boolean;
}

export default function SupportTeamModal({ isOpen, onClose, onSave, member, prefilledData, onAddTask }: SupportTeamModalProps) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [formData, setFormData] = useState<Omit<SupportTeamMember, 'id' | 'created_at'>>({
    name: '',
    role: '',
    phone: '',
    email: '',
    briefing_date: '',
    availability_start: '',
    availability_end: '',
    responsibilities: '',
    notes: ''
  });
  const [guests, setGuests] = useState<GuestOption[]>([]);
  const [existingTeamMembers, setExistingTeamMembers] = useState<SupportTeamMember[]>([]);
  const [selectionMode, setSelectionMode] = useState<'new' | 'existing' | 'guest'>('new');
  const [selectedGuestId, setSelectedGuestId] = useState('');
  const [selectedTeamMemberId, setSelectedTeamMemberId] = useState('');
  const [customRole, setCustomRole] = useState('');
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (isOpen) {
      loadGuests();
      loadExistingTeamMembers();
      if (member?.id) {
        loadAssignedTasks(member.id);
      }
    }
  }, [isOpen, member?.id]);

  const loadAssignedTasks = (memberId: string) => {
    const allTasks = storage.tasks.getAll();
    const memberTasks = allTasks.filter(task =>
      task.assigned_to === memberId && !task.archived
    );
    setAssignedTasks(memberTasks);
  };

  const loadGuests = () => {
    const data = storage.guests.getAll()
      .filter((g: any) => !g.archived)
      .sort((a: any, b: any) => a.name.localeCompare(b.name));

    const guestOptions: GuestOption[] = [];

    data.forEach((guest: any) => {
      guestOptions.push({
        id: guest.id,
        name: guest.name,
        displayName: guest.name,
        phone: guest.phone || '',
        email: guest.email || '',
        isPartner: false
      });

      if (guest.partner_name) {
        guestOptions.push({
          id: `${guest.id}-partner`,
          name: guest.partner_name,
          displayName: `${guest.partner_name} (Begleitung von ${guest.name})`,
          phone: guest.phone || '',
          email: guest.email || '',
          isPartner: true
        });
      }
    });

    setGuests(guestOptions);
  };

  const loadExistingTeamMembers = () => {
    const data = storage.supportTeam.getAll()
      .filter((m: any) => !m.archived)
      .sort((a: any, b: any) => a.name.localeCompare(b.name));
    setExistingTeamMembers(data);
  };

  const handleGuestSelection = (guestId: string) => {
    setSelectedGuestId(guestId);
    const selectedGuest = guests.find(g => g.id === guestId);
    if (selectedGuest) {
      setFormData({
        ...formData,
        name: selectedGuest.name,
        phone: selectedGuest.phone || '',
        email: selectedGuest.email || ''
      });
    }
  };

  const handleTeamMemberSelection = (teamMemberId: string) => {
    setSelectedTeamMemberId(teamMemberId);
    const selectedMember = existingTeamMembers.find(m => m.id === teamMemberId);
    if (selectedMember) {
      setFormData({
        name: selectedMember.name,
        role: selectedMember.role,
        phone: selectedMember.phone,
        email: selectedMember.email,
        briefing_date: selectedMember.briefing_date || '',
        availability_start: selectedMember.availability_start || '',
        availability_end: selectedMember.availability_end || '',
        responsibilities: selectedMember.responsibilities,
        notes: selectedMember.notes
      });
      const isTemplateRole = ROLE_TEMPLATES.find(
        t => t.name_de === selectedMember.role || t.name_en === selectedMember.role
      );
      if (!isTemplateRole) {
        setCustomRole(selectedMember.role);
      } else {
        setCustomRole('');
      }
    }
  };

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        role: member.role,
        phone: member.phone,
        email: member.email,
        briefing_date: member.briefing_date || '',
        availability_start: member.availability_start || '',
        availability_end: member.availability_end || '',
        responsibilities: member.responsibilities,
        notes: member.notes
      });
      const isTemplateRole = ROLE_TEMPLATES.find(
        t => t.name_de === member.role || t.name_en === member.role
      );
      if (!isTemplateRole) {
        setCustomRole(member.role);
      } else {
        setCustomRole('');
      }
      setSelectionMode('new');
      setSelectedGuestId('');
      setSelectedTeamMemberId('');
    } else if (prefilledData) {
      setFormData({
        name: prefilledData.name,
        role: '',
        phone: prefilledData.phone,
        email: prefilledData.email,
        briefing_date: '',
        availability_start: '',
        availability_end: '',
        responsibilities: '',
        notes: ''
      });
      setCustomRole('');
      setSelectionMode('guest');
      setSelectedGuestId('');
      setSelectedTeamMemberId('');
    } else {
      setFormData({
        name: '',
        role: '',
        phone: '',
        email: '',
        briefing_date: '',
        availability_start: '',
        availability_end: '',
        responsibilities: '',
        notes: ''
      });
      setCustomRole('');
      setSelectionMode('new');
      setSelectedGuestId('');
      setSelectedTeamMemberId('');
    }
  }, [member, prefilledData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSave = {
      ...formData,
      archived: member?.archived ?? false,
      guest_id: selectedGuestId || member?.guest_id || null
    };

    onSave(dataToSave);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold" style={{ fontFamily: 'Cinzel, serif', color: '#3b3b3d' }}>
            {member ? t('supportTeam.editMember') : t('supportTeam.addMember')}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {prefilledData && (
            <div className="rounded-lg p-3 flex items-center gap-2" style={{ backgroundColor: '#e0f7f6' }}>
              <Users className="w-4 h-4" style={{ color: '#4ECDC4' }} />
              <span className="text-sm" style={{ color: '#4ECDC4', fontFamily: 'Open Sans, sans-serif' }}>
                {t('supportTeam.addingFromGuest')}
              </span>
            </div>
          )}
          {!member && !prefilledData && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 rounded-lg border cursor-pointer"
                style={{
                  borderColor: selectionMode === 'existing' ? '#d6b15b' : '#e5e7eb',
                  backgroundColor: selectionMode === 'existing' ? '#fef9f0' : '#ffffff'
                }}
                onClick={() => {
                  setSelectionMode('existing');
                  setSelectedGuestId('');
                  setSelectedTeamMemberId('');
                }}
              >
                <Users className="w-5 h-5" style={{ color: '#d6b15b' }} />
                <label className="flex items-center gap-2 cursor-pointer flex-1">
                  <input
                    type="radio"
                    checked={selectionMode === 'existing'}
                    onChange={() => {
                      setSelectionMode('existing');
                      setSelectedGuestId('');
                      setSelectedTeamMemberId('');
                    }}
                    className="w-4 h-4 focus:ring-2"
                    style={{ accentColor: '#d6b15b' }}
                  />
                  <span style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif', fontWeight: 500 }}>
                    {t('supportTeam.selectFromExisting') || 'Aus bestehendem Support-Team wählen'}
                  </span>
                </label>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-lg border cursor-pointer"
                style={{
                  borderColor: selectionMode === 'guest' ? '#d6b15b' : '#e5e7eb',
                  backgroundColor: selectionMode === 'guest' ? '#fef9f0' : '#ffffff'
                }}
                onClick={() => {
                  setSelectionMode('guest');
                  setSelectedGuestId('');
                  setSelectedTeamMemberId('');
                }}
              >
                <Users className="w-5 h-5" style={{ color: '#d6b15b' }} />
                <label className="flex items-center gap-2 cursor-pointer flex-1">
                  <input
                    type="radio"
                    checked={selectionMode === 'guest'}
                    onChange={() => {
                      setSelectionMode('guest');
                      setSelectedGuestId('');
                      setSelectedTeamMemberId('');
                    }}
                    className="w-4 h-4 focus:ring-2"
                    style={{ accentColor: '#d6b15b' }}
                  />
                  <span style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif', fontWeight: 500 }}>
                    {t('supportTeam.selectFromGuests') || 'Aus Gästeliste wählen'}
                  </span>
                </label>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-lg border cursor-pointer"
                style={{
                  borderColor: selectionMode === 'new' ? '#d6b15b' : '#e5e7eb',
                  backgroundColor: selectionMode === 'new' ? '#fef9f0' : '#ffffff'
                }}
                onClick={() => {
                  setSelectionMode('new');
                  setSelectedGuestId('');
                  setSelectedTeamMemberId('');
                }}
              >
                <Users className="w-5 h-5" style={{ color: '#d6b15b' }} />
                <label className="flex items-center gap-2 cursor-pointer flex-1">
                  <input
                    type="radio"
                    checked={selectionMode === 'new'}
                    onChange={() => {
                      setSelectionMode('new');
                      setSelectedGuestId('');
                      setSelectedTeamMemberId('');
                    }}
                    className="w-4 h-4 focus:ring-2"
                    style={{ accentColor: '#d6b15b' }}
                  />
                  <span style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif', fontWeight: 500 }}>
                    {t('supportTeam.createNew') || 'Neues Mitglied anlegen'}
                  </span>
                </label>
              </div>
            </div>
          )}

          {selectionMode === 'existing' && !member && !prefilledData && (
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                {t('supportTeam.selectExistingMember') || 'Bestehendes Mitglied wählen'} *
              </label>
              <select
                required={selectionMode === 'existing'}
                value={selectedTeamMemberId}
                onChange={(e) => handleTeamMemberSelection(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all bg-white"
                style={{
                  fontFamily: 'Open Sans, sans-serif',
                  borderColor: '#d6b15b',
                  color: '#3b3b3d',
                  backgroundColor: '#ffffff'
                }}
              >
                <option value="" style={{ color: '#9ca3af' }}>{t('supportTeam.chooseMember') || 'Mitglied auswählen...'}</option>
                {existingTeamMembers.map(teamMember => (
                  <option key={teamMember.id} value={teamMember.id} style={{ color: '#3b3b3d' }}>
                    {teamMember.name} - {teamMember.role}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectionMode === 'guest' && !member && !prefilledData && (
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                {t('supportTeam.selectGuest')} *
              </label>
              <select
                required={selectionMode === 'guest'}
                value={selectedGuestId}
                onChange={(e) => handleGuestSelection(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all bg-white"
                style={{
                  fontFamily: 'Open Sans, sans-serif',
                  borderColor: '#d6b15b',
                  color: '#3b3b3d',
                  backgroundColor: '#ffffff'
                }}
              >
                <option value="" style={{ color: '#9ca3af' }}>{t('supportTeam.chooseGuest')}</option>
                {guests.map(guest => (
                  <option key={guest.id} value={guest.id} style={{ color: '#3b3b3d' }}>
                    {guest.displayName}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
              {t('supportTeam.name')} *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              style={{ fontFamily: 'Open Sans, sans-serif', borderColor: '#d6b15b' }}
              placeholder={t('supportTeam.namePlaceholder')}
              disabled={(selectionMode === 'guest' && !selectedGuestId) || (selectionMode === 'existing' && !selectedTeamMemberId)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
              {t('supportTeam.role')} *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {ROLE_TEMPLATES.map((roleTemplate) => {
                const roleName = currentLang === 'de' ? roleTemplate.name_de : roleTemplate.name_en;
                const isSelected = formData.role === roleName;
                const isCustom = roleTemplate.name_de === 'Sonstiges';

                return (
                  <button
                    key={roleTemplate.name_en}
                    type="button"
                    onClick={() => {
                      if (isCustom) {
                        setFormData({ ...formData, role: '' });
                        setCustomRole('');
                      } else {
                        setFormData({ ...formData, role: roleName });
                        setCustomRole('');
                      }
                    }}
                    className="flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all hover:shadow-md"
                    style={{
                      borderColor: isSelected ? '#d6b15b' : '#e5e7eb',
                      backgroundColor: isSelected ? '#fef9f0' : '#ffffff'
                    }}
                  >
                    <span className="text-3xl mb-2">{roleTemplate.emoji}</span>
                    <span
                      className="text-center text-sm font-medium"
                      style={{
                        color: isSelected ? '#d6b15b' : '#3b3b3d',
                        fontFamily: 'Open Sans, sans-serif'
                      }}
                    >
                      {roleName}
                    </span>
                  </button>
                );
              })}
            </div>

            {(formData.role === '' || formData.role === 'Sonstiges' || formData.role === 'Other' ||
              !ROLE_TEMPLATES.find(t => t.name_de === formData.role || t.name_en === formData.role)) && (
              <div>
                <input
                  type="text"
                  required
                  value={customRole || formData.role}
                  onChange={(e) => {
                    setCustomRole(e.target.value);
                    setFormData({ ...formData, role: e.target.value });
                  }}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all"
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    borderColor: '#d6b15b',
                    fontSize: '15px'
                  }}
                  placeholder={t('supportTeam.rolePlaceholder') || 'Freie Eingabe für individuelle Rolle...'}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                {t('supportTeam.phone')}
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                style={{ fontFamily: 'Open Sans, sans-serif', borderColor: '#d6b15b' }}
                placeholder={t('supportTeam.phonePlaceholder')}
                disabled={(selectionMode === 'guest' && !selectedGuestId) || (selectionMode === 'existing' && !selectedTeamMemberId)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                {t('supportTeam.email')}
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                style={{ fontFamily: 'Open Sans, sans-serif', borderColor: '#d6b15b' }}
                placeholder={t('supportTeam.emailPlaceholder')}
                disabled={(selectionMode === 'guest' && !selectedGuestId) || (selectionMode === 'existing' && !selectedTeamMemberId)}
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
              Termine
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  Briefing-Termin
                </label>
                <input
                  type="date"
                  value={formData.briefing_date || ''}
                  onChange={(e) => setFormData({ ...formData, briefing_date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  Verfügbar von
                </label>
                <input
                  type="date"
                  value={formData.availability_start || ''}
                  onChange={(e) => setFormData({ ...formData, availability_start: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  Verfügbar bis
                </label>
                <input
                  type="date"
                  value={formData.availability_end || ''}
                  onChange={(e) => setFormData({ ...formData, availability_end: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
              {t('supportTeam.responsibilities')}
            </label>
            <textarea
              value={formData.responsibilities}
              onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 resize-none"
              style={{ fontFamily: 'Open Sans, sans-serif', borderColor: '#d6b15b' }}
              placeholder={t('supportTeam.responsibilitiesPlaceholder')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
              {t('supportTeam.notes')}
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 resize-none"
              style={{ fontFamily: 'Open Sans, sans-serif', borderColor: '#d6b15b' }}
              placeholder={t('supportTeam.notesPlaceholder')}
            />
          </div>

          {member?.id && (
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                  Zugewiesene Aufgaben ({assignedTasks.length})
                </h3>
                {onAddTask && (
                  <button
                    type="button"
                    onClick={() => onAddTask(member.id!)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-md transition-all hover:opacity-90 text-sm font-medium"
                    style={{
                      backgroundColor: '#d6b15b',
                      color: 'white',
                      fontFamily: 'Open Sans, sans-serif'
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    Aufgabe hinzufügen
                  </button>
                )}
              </div>

              {assignedTasks.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  <p className="text-sm" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    Keine Aufgaben zugewiesen
                  </p>
                </div>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {assignedTasks.map(task => {
                    const phase = task.phase_id ? storage.phases.get(task.phase_id) : null;
                    return (
                      <div
                        key={task.id}
                        className="flex items-start gap-3 p-3 rounded-lg border"
                        style={{
                          borderColor: '#e5e7eb',
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div className="mt-0.5">
                          {task.completed ? (
                            <CheckCircle2 className="w-5 h-5" style={{ color: '#10b981' }} />
                          ) : (
                            <Circle className="w-5 h-5" style={{ color: '#d1d5db' }} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className="font-medium text-sm"
                            style={{
                              color: task.completed ? '#9ca3af' : '#3b3b3d',
                              fontFamily: 'Open Sans, sans-serif',
                              textDecoration: task.completed ? 'line-through' : 'none'
                            }}
                          >
                            {task.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {phase && (
                              <span
                                className="text-xs px-2 py-0.5 rounded-full"
                                style={{
                                  backgroundColor: `${phase.color}20`,
                                  color: phase.color,
                                  fontFamily: 'Open Sans, sans-serif'
                                }}
                              >
                                {phase.name}
                              </span>
                            )}
                            <span
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: task.completed ? '#d1fae5' : task.priority === 'high' ? '#fee2e2' : task.priority === 'medium' ? '#fef3c7' : '#f3f4f6',
                                color: task.completed ? '#065f46' : task.priority === 'high' ? '#991b1b' : task.priority === 'medium' ? '#92400e' : '#6b7280',
                                fontFamily: 'Open Sans, sans-serif'
                              }}
                            >
                              {task.completed ? 'Erledigt' : task.priority === 'high' ? 'Hoch' : task.priority === 'medium' ? 'Mittel' : 'Niedrig'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded-md transition-all hover:bg-gray-50"
              style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', borderColor: '#d6b15b' }}
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-md transition-all hover:opacity-90"
              style={{ backgroundColor: '#d6b15b', color: 'white', fontFamily: 'Open Sans, sans-serif', fontWeight: 600 }}
            >
              {t('common.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
