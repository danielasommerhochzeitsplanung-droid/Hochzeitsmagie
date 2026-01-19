import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Pencil, Trash2, RotateCcw, ChevronRight, ChevronDown, Plus, AlertTriangle } from 'lucide-react';
import { storage } from '../lib/storage-adapter';
import { Event } from './EventsModule';
import { getAllEventConflicts } from '../utils/eventConflicts';

interface ProgramItem {
  id: string;
  event_id: string;
  title: string;
  type: string;
  start_time: string | null;
  end_time: string | null;
  duration_minutes: number;
  location: string;
  description: string;
  order_index: number;
  notes: string;
  support_team_id?: string | null;
  support_team?: { name: string; role?: string };
}

interface EventTableProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
  onRestore?: (id: string) => void;
  isArchived?: boolean;
  onAddProgramItem?: (eventId: string) => void;
  onEditProgramItem?: (eventId: string, item: ProgramItem) => void;
}

export default function EventTable({ events, onEdit, onDelete, onRestore, isArchived = false, onAddProgramItem, onEditProgramItem }: EventTableProps) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());
  const [programItems, setProgramItems] = useState<{ [eventId: string]: ProgramItem[] }>({});
  const [eventConflicts, setEventConflicts] = useState<Map<string, Event[]>>(new Map());

  useEffect(() => {
    loadProgramItemsForEvents();
    const conflicts = getAllEventConflicts(events);
    setEventConflicts(conflicts);
  }, [events]);

  const loadProgramItemsForEvents = () => {
    const eventIds = events.map(e => e.id);
    if (eventIds.length === 0) return;

    const data = storage.programItems.getAll()
      .filter((item: any) => eventIds.includes(item.event_id))
      .sort((a: any, b: any) => (a.start_time || '').localeCompare(b.start_time || ''));

    const supportTeamMembers = storage.supportTeam.getAll();

    const itemsByEvent: { [eventId: string]: ProgramItem[] } = {};
    data.forEach((item: any) => {
      if (!itemsByEvent[item.event_id]) {
        itemsByEvent[item.event_id] = [];
      }
      const supportTeam = item.support_team_id
        ? supportTeamMembers.find((m: any) => m.id === item.support_team_id)
        : null;
      itemsByEvent[item.event_id].push({
        ...item,
        support_team: supportTeam ? { name: supportTeam.name, role: supportTeam.role } : undefined
      });
    });
    setProgramItems(itemsByEvent);
  };

  const toggleEvent = (eventId: string) => {
    const newExpanded = new Set(expandedEvents);
    if (newExpanded.has(eventId)) {
      newExpanded.delete(eventId);
    } else {
      newExpanded.add(eventId);
    }
    setExpandedEvents(newExpanded);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLang === 'de' ? 'de-DE' : 'en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string | null) => {
    if (!timeString) return '-';
    return timeString.substring(0, 5);
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          {isArchived ? t('events.noArchivedEvents') : t('events.noEvents')}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full">
        <thead style={{ backgroundColor: '#f8f9fa' }}>
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold w-12" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
              {t('events.event')}
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
              {t('events.dateTime')}
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
              {t('events.location')}
            </th>
            <th className="px-6 py-4 text-right text-sm font-semibold" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
              {t('common.actions')}
            </th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => {
            const isExpanded = expandedEvents.has(event.id);
            const eventItems = programItems[event.id] || [];
            const hasItems = eventItems.length > 0;
            const hasConflicts = eventConflicts.has(event.id);
            const conflicts = eventConflicts.get(event.id) || [];

            return (
              <React.Fragment key={event.id}>
                <tr
                  className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                  style={index % 2 === 0 ? {} : { backgroundColor: '#fafafa' }}
                >
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleEvent(event.id)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                      style={{ color: hasItems ? '#d6b15b' : '#d1d5db' }}
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{event.emoji}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="font-medium" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                            {currentLang === 'de' ? event.name_de : event.name_en}
                          </div>
                          {hasConflicts && (
                            <div
                              className="group relative"
                              title={currentLang === 'de'
                                ? `Überschneidung mit ${conflicts.length} Event(s)`
                                : `Conflicts with ${conflicts.length} event(s)`}
                            >
                              <AlertTriangle className="w-4 h-4 text-orange-500 cursor-help" />
                              <div className="hidden group-hover:block absolute left-0 top-6 z-10 w-64 bg-orange-50 border border-orange-200 rounded-lg p-3 shadow-lg">
                                <p className="text-xs font-semibold text-orange-800 mb-1" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                                  {currentLang === 'de' ? 'Überschneidungen:' : 'Conflicts:'}
                                </p>
                                <ul className="text-xs text-orange-700 space-y-0.5" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                                  {conflicts.map(c => (
                                    <li key={c.id}>
                                      {currentLang === 'de' ? c.name_de : c.name_en}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                        {hasItems && (
                          <div className="text-xs mt-1" style={{ color: '#9ca3af', fontFamily: 'Open Sans, sans-serif' }}>
                            {eventItems.length} {eventItems.length === 1 ? t('program.programItem') : t('program.programItems')}
                          </div>
                        )}
                        {event.support_team_members && event.support_team_members.length > 0 && (
                          <div className="text-xs mt-1" style={{ color: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}>
                            👥 {event.support_team_members.map(st => st.name).join(', ')}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                      <div className="font-medium" style={{ color: '#3b3b3d' }}>
                        {formatDate(event.date)}
                      </div>
                      {(event.time_start || event.time_end) && (
                        <div className="text-gray-500">
                          {formatTime(event.time_start)} - {formatTime(event.time_end)}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                      {event.location ? (
                        <>
                          <div className="font-medium" style={{ color: '#3b3b3d' }}>
                            {event.location}
                          </div>
                          {event.transport_info && (
                            <div className="text-xs text-gray-500 mt-1">
                              🚗 {event.transport_info.substring(0, 30)}
                              {event.transport_info.length > 30 ? '...' : ''}
                              {(event.transport_time_start || event.transport_time_end) && (
                                <span className="ml-1">
                                  ({formatTime(event.transport_time_start)} - {formatTime(event.transport_time_end)})
                                </span>
                              )}
                            </div>
                          )}
                        </>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(event)}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                        title={t('common.edit')}
                      >
                        <Pencil className="w-4 h-4" style={{ color: '#d6b15b' }} />
                      </button>
                      {isArchived && onRestore && (
                        <button
                          onClick={() => onRestore(event.id)}
                          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                          title={t('common.restore')}
                        >
                          <RotateCcw className="w-4 h-4" style={{ color: '#10b981' }} />
                        </button>
                      )}
                      <button
                        onClick={() => onDelete(event.id)}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                        title={isArchived ? t('common.deletePermanently') : t('common.archive')}
                      >
                        <Trash2 className="w-4 h-4" style={{ color: '#ef4444' }} />
                      </button>
                    </div>
                  </td>
                </tr>

                {isExpanded && (
                  <tr className="border-t border-gray-100" style={{ backgroundColor: '#f9fafb' }}>
                    <td colSpan={5} className="px-6 py-4">
                      <div className="ml-12 space-y-2">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-sm" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                            {t('program.programItems')}
                          </h4>
                          {onAddProgramItem && (
                            <button
                              onClick={() => onAddProgramItem(event.id)}
                              className="flex items-center gap-1 px-3 py-1.5 text-sm text-white rounded-md hover:opacity-90 transition-all"
                              style={{ backgroundColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
                            >
                              <Plus className="w-4 h-4" />
                              {t('program.addItem')}
                            </button>
                          )}
                        </div>

                        {eventItems.length === 0 ? (
                          <div className="text-sm text-gray-500 py-4 text-center" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                            {t('program.noItems')}
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {eventItems.map((item) => (
                              <div
                                key={item.id}
                                onClick={() => onEditProgramItem && onEditProgramItem(event.id, item)}
                                className="bg-white p-3 rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer transition-all"
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3">
                                      {item.start_time && (
                                        <span className="text-sm font-semibold" style={{ color: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}>
                                          {formatTime(item.start_time)}
                                        </span>
                                      )}
                                      <span className="font-medium" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
                                        {item.title}
                                      </span>
                                      {item.type && (
                                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                                          {item.type}
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-500" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                                      {item.duration_minutes > 0 && (
                                        <span>⏱️ {item.duration_minutes} min</span>
                                      )}
                                      {item.location && (
                                        <span>📍 {item.location}</span>
                                      )}
                                      {item.support_team && (
                                        <span>👤 {item.support_team.name}</span>
                                      )}
                                    </div>
                                    {item.description && (
                                      <div className="text-xs text-gray-600 mt-1" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                                        {item.description}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
