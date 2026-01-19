import { useTranslation } from 'react-i18next';
import { Edit2, Trash2, Phone, Mail, Archive, RotateCcw, Users } from 'lucide-react';
import { SupportTeamMember } from './SupportTeamModal';

interface SupportTeamTableProps {
  members: SupportTeamMember[];
  onEdit: (member: SupportTeamMember) => void;
  onArchive: (id: string) => void;
  onRestore: (id: string) => void;
  onDelete: (id: string) => void;
  showArchived: boolean;
}

export default function SupportTeamTable({ members, onEdit, onArchive, onRestore, onDelete, showArchived }: SupportTeamTableProps) {
  const { t } = useTranslation();

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
      {members.map((member) => (
        <div
          key={member.id}
          className="bg-white border rounded-lg p-5 hover:shadow-lg transition-all"
          style={{
            borderColor: '#d6b15b',
            opacity: showArchived ? 0.7 : 1
          }}
        >
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
        </div>
      ))}
    </div>
  );
}
