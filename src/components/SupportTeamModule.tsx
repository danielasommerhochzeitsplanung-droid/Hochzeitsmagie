import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { storage } from '../lib/storage-adapter';
import SupportTeamModal, { SupportTeamMember } from './SupportTeamModal';
import SupportTeamTable from './SupportTeamTable';

export default function SupportTeamModule() {
  const { t } = useTranslation();
  const [members, setMembers] = useState<SupportTeamMember[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<SupportTeamMember | null>(null);
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    loadMembers();
  }, [showArchived]);

  const loadMembers = () => {
    const allMembers = storage.supportTeam.getAll();
    const filtered = allMembers.filter(m => m.archived === showArchived);
    const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name));
    setMembers(sorted);
  };

  const handleAddMember = () => {
    setEditingMember(null);
    setIsModalOpen(true);
  };

  const handleEditMember = (member: SupportTeamMember) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const handleSaveMember = (memberData: Omit<SupportTeamMember, 'id' | 'created_at'>) => {
    if (editingMember?.id) {
      storage.supportTeam.update(editingMember.id, memberData);
      loadMembers();
      setIsModalOpen(false);
      setEditingMember(null);
    } else {
      storage.supportTeam.create(memberData);
      loadMembers();
      setIsModalOpen(false);
    }
  };

  const handleArchiveMember = (id: string) => {
    if (window.confirm(t('supportTeam.confirmArchive'))) {
      storage.supportTeam.update(id, { archived: true });
      loadMembers();
    }
  };

  const handleRestoreMember = (id: string) => {
    storage.supportTeam.update(id, { archived: false });
    loadMembers();
  };

  const handleDeleteMember = (id: string) => {
    if (window.confirm(t('supportTeam.confirmDeletePermanently'))) {
      storage.supportTeam.delete(id);
      loadMembers();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
            {members.length} {members.length === 1 ? t('supportTeam.member') : t('supportTeam.members')}
          </span>
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
              {t('supportTeam.activeMembers')}
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
              {t('supportTeam.archivedMembers')}
            </button>
          </div>
        </div>
        <button
          onClick={handleAddMember}
          className="px-6 py-2 rounded-md transition-all hover:opacity-90"
          style={{
            backgroundColor: '#d6b15b',
            color: 'white',
            fontFamily: 'Open Sans, sans-serif',
            fontWeight: 600
          }}
        >
          {t('supportTeam.addMember')}
        </button>
      </div>

      <SupportTeamTable
        members={members}
        onEdit={handleEditMember}
        onArchive={handleArchiveMember}
        onRestore={handleRestoreMember}
        onDelete={handleDeleteMember}
        showArchived={showArchived}
      />

      <SupportTeamModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMember(null);
        }}
        onSave={handleSaveMember}
        member={editingMember}
      />
    </div>
  );
}
