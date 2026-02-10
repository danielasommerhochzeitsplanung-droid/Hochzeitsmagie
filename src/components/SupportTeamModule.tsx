import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Archive } from 'lucide-react';
import { storage, Task } from '../lib/storage-adapter';
import { useWeddingData } from '../contexts/WeddingDataContext';
import SupportTeamModal, { SupportTeamMember } from './SupportTeamModal';
import SupportTeamTable from './SupportTeamTable';

interface TaskModalData {
  memberId: string;
  task: Task | null;
}

export default function SupportTeamModule() {
  const { t } = useTranslation();
  const { weddingData, updateWeddingData } = useWeddingData();
  const [members, setMembers] = useState<SupportTeamMember[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<SupportTeamMember | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const [taskModalData, setTaskModalData] = useState<TaskModalData | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

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

  const handleCreateTask = (memberId: string) => {
    setTaskModalData({ memberId, task: null });
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    if (task.assigned_to) {
      setTaskModalData({ memberId: task.assigned_to, task });
      setIsTaskModalOpen(true);
    }
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'created_at'>) => {
    const memberId = taskModalData?.memberId;

    if (taskModalData?.task?.id) {
      const updatedTasks = weddingData.tasks.map(t =>
        t.id === taskModalData.task!.id ? { ...t, ...taskData } : t
      );
      updateWeddingData({ tasks: updatedTasks });
    } else {
      const newTask: Task = {
        ...taskData,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
      };
      updateWeddingData({ tasks: [...weddingData.tasks, newTask] });
    }
    setIsTaskModalOpen(false);
    setTaskModalData(null);

    if (memberId) {
      const member = members.find(m => m.id === memberId);
      if (member) {
        setEditingMember(member);
        setIsModalOpen(true);
      }
    }
  };

  const handleToggleTaskComplete = (taskId: string) => {
    const task = weddingData.tasks.find(t => t.id === taskId);
    if (task) {
      const updatedTasks = weddingData.tasks.map(t =>
        t.id === taskId ? { ...t, completed: !t.completed, completed_at: !t.completed ? new Date().toISOString() : undefined } : t
      );
      updateWeddingData({ tasks: updatedTasks });
    }
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
        onCreateTask={handleCreateTask}
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
        onAddTask={(memberId) => {
          setIsModalOpen(false);
          handleCreateTask(memberId);
        }}
      />

      {isTaskModalOpen && taskModalData && (
        <TaskQuickModal
          isOpen={isTaskModalOpen}
          onClose={() => {
            setIsTaskModalOpen(false);
            setTaskModalData(null);
          }}
          onSave={handleSaveTask}
          task={taskModalData.task}
          preselectedMemberId={taskModalData.memberId}
          members={members.filter(m => !m.archived)}
        />
      )}
    </div>
  );
}

interface TaskQuickModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id' | 'created_at'>) => void;
  task: Task | null;
  preselectedMemberId: string;
  members: SupportTeamMember[];
}

function TaskQuickModal({ isOpen, onClose, onSave, task, preselectedMemberId, members }: TaskQuickModalProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    category: task?.category || 'planning',
    priority: task?.priority || 'medium' as 'high' | 'medium' | 'low',
    due_date: task?.due_date || '',
    assigned_to: task?.assigned_to || preselectedMemberId,
    completed: task?.completed || false,
    archived: task?.archived || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b" style={{ borderColor: '#d6b15b' }}>
          <h2 className="text-2xl font-bold" style={{ fontFamily: 'Cinzel, serif', color: '#3b3b3d' }}>
            {task ? t('supportTeam.editTask') : t('supportTeam.createTask')}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
              {t('tasks.title')} *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
              {t('tasks.description')}
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                {t('tasks.priority')}
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'high' | 'medium' | 'low' })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
              >
                <option value="low">{t('tasks.low')}</option>
                <option value="medium">{t('tasks.medium')}</option>
                <option value="high">{t('tasks.high')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                {t('tasks.dueDate')}
              </label>
              <input
                type="date"
                value={formData.due_date}
                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
              {t('tasks.assignedTo')}
            </label>
            <select
              value={formData.assigned_to}
              onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
            >
              <option value="">{t('tasks.unassigned')}</option>
              {members.map(member => (
                <option key={member.id} value={member.id}>
                  {member.name} - {member.role}
                </option>
              ))}
            </select>
          </div>

          {task && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="completed"
                checked={formData.completed}
                onChange={(e) => setFormData({ ...formData, completed: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="completed" className="text-sm" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                {t('tasks.markAsCompleted')}
              </label>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-all"
              style={{ borderColor: '#d6b15b', color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg transition-all hover:opacity-90"
              style={{ backgroundColor: '#d6b15b', color: 'white', fontFamily: 'Open Sans, sans-serif', fontWeight: 600 }}
            >
              {task ? t('common.save') : t('common.create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
