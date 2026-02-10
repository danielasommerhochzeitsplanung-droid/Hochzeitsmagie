import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Archive } from 'lucide-react';
import { storage, Task } from '../lib/storage-adapter';
import { useWeddingData } from '../contexts/WeddingDataContext';
import SupportTeamModal, { SupportTeamMember } from './SupportTeamModal';
import SupportTeamTable from './SupportTeamTable';

export default function SupportTeamModule() {
  const { t } = useTranslation();
  const { weddingData, updateWeddingData } = useWeddingData();
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

  const handleEditTask = (task: Task) => {
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            <button
              onClick={() => setShowArchived(false)}
              className={`px-6 py-3 transition-all ${
                !showArchived
                  ? 'border-b-2'
                  : 'hover:opacity-70'
              }`}
              style={!showArchived ? { borderColor: '#d6b15b', color: '#d6b15b', fontFamily: 'Open Sans, sans-serif' } : { color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}
            >
              👔 {t('supportTeam.activeMembers')}
            </button>
            <button
              onClick={() => setShowArchived(true)}
              className={`px-6 py-3 transition-all flex items-center gap-2 ${
                showArchived
                  ? 'border-b-2'
                  : 'hover:opacity-70'
              }`}
              style={showArchived ? { borderColor: '#d6b15b', color: '#d6b15b', fontFamily: 'Open Sans, sans-serif' } : { color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}
            >
              <Archive className="w-4 h-4" />
              {t('supportTeam.archivedMembers')}
            </button>
          </div>

          <span className="text-sm" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
            {members.length} {members.length === 1 ? t('supportTeam.member') : t('supportTeam.members')}
          </span>
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

      <div className="border-b border-gray-200 mb-4"></div>

      <SupportTeamTable
        members={members}
        tasks={weddingData.tasks}
        onEdit={handleEditMember}
        onArchive={handleArchiveMember}
        onRestore={handleRestoreMember}
        onDelete={handleDeleteMember}
        onEditTask={handleEditTask}
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
