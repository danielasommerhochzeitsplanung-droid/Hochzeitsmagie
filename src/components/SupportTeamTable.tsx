import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit2, Trash2, Phone, Mail, Archive, RotateCcw, Users, ChevronDown, ChevronRight, Plus, CheckCircle2, Circle, Calendar } from 'lucide-react';
import { SupportTeamMember } from './SupportTeamModal';
import { Task } from '../lib/storage-adapter';
import { useWeddingData } from '../contexts/WeddingDataContext';

interface SupportTeamTableProps {
  members: SupportTeamMember[];
  tasks: Task[];
  onEdit: (member: SupportTeamMember) => void;
  onArchive: (id: string) => void;
  onRestore: (id: string) => void;
  onDelete: (id: string) => void;
  onEditTask: (task: Task) => void;
  showArchived: boolean;
}

export default function SupportTeamTable({ members, tasks, onEdit, onArchive, onRestore, onDelete, onEditTask, showArchived }: SupportTeamTableProps) {
  const { t } = useTranslation();
  const { openTaskModalForAssignee } = useWeddingData();
  const [expandedMembers, setExpandedMembers] = useState<Set<string>>(new Set());

  const toggleExpanded = (memberId: string) => {
    const newExpanded = new Set(expandedMembers);
    if (newExpanded.has(memberId)) {
      newExpanded.delete(memberId);
    } else {
      newExpanded.add(memberId);
    }
    setExpandedMembers(newExpanded);
  };

  const getMemberTasks = (memberId: string) => {
    if (!tasks || !Array.isArray(tasks)) return [];
    return tasks.filter(task => task.assigned_to === memberId && !task.archived);
  };

  const getTaskStats = (memberId: string) => {
    const memberTasks = getMemberTasks(memberId);
    const completed = memberTasks.filter(t => t.completed).length;
    const total = memberTasks.length;
    return { completed, total, pending: total - completed };
  };

  if (members.length === 0) {
    return (
      <div className="bg-gray-50 border-2 rounded-lg p-8 text-center" style={{ borderColor: '#d6b15b' }}>
        <p style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontSize: '0.95rem' }}>
          {showArchived ? t('supportTeam.noArchivedMembers') : t('supportTeam.noMembers')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {members.map((member) => {
        const isExpanded = expandedMembers.has(member.id!);
        const memberTasks = getMemberTasks(member.id!);
        const stats = getTaskStats(member.id!);

        return (
          <div
            key={member.id}
            className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-all"
            style={{
              borderColor: '#d6b15b',
              opacity: showArchived ? 0.7 : 1
            }}
          >
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1" style={{ fontFamily: 'Cinzel, serif', color: '#3b3b3d' }}>
                    {member.name}
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-sm"
                      style={{
                        backgroundColor: '#f9f5ed',
                        color: '#d6b15b',
                        fontFamily: 'Open Sans, sans-serif',
                        fontWeight: 600
                      }}
                    >
                      {member.role}
                    </span>
                    {member.guest_id && (
                      <span
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs"
                        style={{
                          backgroundColor: '#e0f7f6',
                          color: '#4ECDC4',
                          fontFamily: 'Open Sans, sans-serif'
                        }}
                      >
                        <Users className="w-3 h-3" />
                        {t('supportTeam.isGuest')}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  {!showArchived && (
                    <>
                      <button
                        onClick={() => member.id && openTaskModalForAssignee(member.id)}
                        className="p-2 hover:bg-green-50 rounded-lg transition-all"
                        title={t('supportTeam.createTask')}
                      >
                        <Plus className="w-4 h-4 text-green-600" />
                      </button>
                      <button
                        onClick={() => onEdit(member)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                        title={t('common.edit')}
                      >
                        <Edit2 className="w-4 h-4" style={{ color: '#d6b15b' }} />
                      </button>
                      <button
                        onClick={() => member.id && onArchive(member.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                        title={t('common.archive')}
                      >
                        <Archive className="w-4 h-4" style={{ color: '#d6b15b' }} />
                      </button>
                    </>
                  )}
                  {showArchived && (
                    <>
                      <button
                        onClick={() => member.id && onRestore(member.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                        title={t('common.restore')}
                      >
                        <RotateCcw className="w-4 h-4" style={{ color: '#d6b15b' }} />
                      </button>
                      <button
                        onClick={() => member.id && onDelete(member.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                        title={t('common.deletePermanently')}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                {member.phone && (
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
                    <Phone className="w-4 h-4" style={{ color: '#d6b15b' }} />
                    <a href={`tel:${member.phone}`} className="hover:underline">
                      {member.phone}
                    </a>
                  </div>
                )}

                {member.email && (
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
                    <Mail className="w-4 h-4" style={{ color: '#d6b15b' }} />
                    <a href={`mailto:${member.email}`} className="hover:underline">
                      {member.email}
                    </a>
                  </div>
                )}
              </div>

              {member.responsibilities && (
                <div className="mt-3 pt-3 border-t" style={{ borderColor: '#e5e5e5' }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                    {t('supportTeam.responsibilities')}:
                  </p>
                  <p className="text-sm" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
                    {member.responsibilities}
                  </p>
                </div>
              )}

              {member.notes && (
                <div className="mt-3 pt-3 border-t" style={{ borderColor: '#e5e5e5' }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                    {t('supportTeam.notes')}:
                  </p>
                  <p className="text-sm" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
                    {member.notes}
                  </p>
                </div>
              )}

              {!showArchived && (
                <div className="mt-3 pt-3 border-t" style={{ borderColor: '#e5e5e5' }}>
                  <button
                    onClick={() => member.id && toggleExpanded(member.id)}
                    className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-all"
                  >
                    <div className="flex items-center gap-2">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" style={{ color: '#d6b15b' }} />
                      ) : (
                        <ChevronRight className="w-4 h-4" style={{ color: '#d6b15b' }} />
                      )}
                      <span className="text-sm font-semibold" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                        {t('supportTeam.tasks')} ({stats.total})
                      </span>
                    </div>
                    {stats.total > 0 && (
                      <div className="flex items-center gap-2 text-xs" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                        <span className="text-green-600">{stats.completed} {t('supportTeam.completed')}</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-orange-600">{stats.pending} {t('supportTeam.pending')}</span>
                      </div>
                    )}
                  </button>
                </div>
              )}
            </div>

            {!showArchived && isExpanded && (
              <div className="border-t px-5 py-4" style={{ borderColor: '#e5e5e5', backgroundColor: '#fafafa' }}>
                {memberTasks.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-sm" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
                      {t('supportTeam.noTasks')}
                    </p>
                    <button
                      onClick={() => member.id && openTaskModalForAssignee(member.id)}
                      className="mt-3 px-4 py-2 rounded-md transition-all hover:opacity-90 text-sm"
                      style={{
                        backgroundColor: '#d6b15b',
                        color: 'white',
                        fontFamily: 'Open Sans, sans-serif',
                        fontWeight: 600
                      }}
                    >
                      <Plus className="w-4 h-4 inline mr-1" />
                      {t('supportTeam.createFirstTask')}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {memberTasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => onEditTask(task)}
                        className="bg-white border rounded-lg p-3 hover:shadow-md transition-all cursor-pointer"
                        style={{ borderColor: '#e5e5e5' }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            {task.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-sm font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}
                              style={{ fontFamily: 'Open Sans, sans-serif' }}
                            >
                              {task.title}
                            </p>
                            {task.due_date && (
                              <div className="flex items-center gap-1 mt-1 text-xs" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
                                <Calendar className="w-3 h-3" />
                                {new Date(task.due_date).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                          <div className="flex-shrink-0">
                            <span
                              className="inline-block px-2 py-1 rounded text-xs font-medium"
                              style={{
                                backgroundColor: task.priority === 'high' ? '#fee2e2' : task.priority === 'medium' ? '#fef3c7' : '#f3f4f6',
                                color: task.priority === 'high' ? '#dc2626' : task.priority === 'medium' ? '#d97706' : '#6b7280',
                                fontFamily: 'Open Sans, sans-serif'
                              }}
                            >
                              {task.priority === 'high' ? t('tasks.high') : task.priority === 'medium' ? t('tasks.medium') : t('tasks.low')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
