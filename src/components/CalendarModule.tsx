import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { X, ChevronLeft, ChevronRight, Calendar as CalendarIcon, List, Grid3x3, Clock, Printer, ExternalLink, CheckCircle2, MapPin, Users, Briefcase, ListTodo } from 'lucide-react';
import { useWeddingData } from '../contexts/WeddingDataContext';

interface CalendarModuleProps {
  onClose: () => void;
}

type CalendarView = 'day' | 'week' | 'month' | 'wedding';
type CalendarEntryType = 'event' | 'program_item' | 'task' | 'vendor_appointment' | 'vendor_deadline';

interface CalendarEntry {
  id: string;
  title: string;
  date: string;
  time_start?: string;
  time_end?: string;
  type: CalendarEntryType;
  source_module: string;
  source_id: string;
  color: string;
  location?: string;
  description?: string;
  assignees?: string[];
}

const TYPE_COLORS: Record<CalendarEntryType, string> = {
  event: '#3b82f6',
  program_item: '#8b5cf6',
  task: '#10b981',
  vendor_appointment: '#f59e0b',
  vendor_deadline: '#ef4444',
};

export default function CalendarModule({ onClose }: CalendarModuleProps) {
  const { t } = useTranslation();
  const { weddingData, events, tasks, vendors, programItems, locations, guests, supportTeam, updateTask } = useWeddingData();

  const [view, setView] = useState<CalendarView>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEntry, setSelectedEntry] = useState<CalendarEntry | null>(null);

  const allEntries = useMemo((): CalendarEntry[] => {
    const entries: CalendarEntry[] = [];

    events.forEach(event => {
      if (event.date) {
        entries.push({
          id: `event-${event.id}`,
          title: event.title || '',
          date: event.date,
          time_start: event.time,
          time_end: undefined,
          type: 'event',
          source_module: 'events',
          source_id: event.id,
          color: TYPE_COLORS.event,
          location: event.location_id ? locations.find(l => l.id === event.location_id)?.name : undefined,
          description: event.description,
        });
      }
    });

    programItems.forEach(item => {
      const event = events.find(e => e.id === item.event_id);
      if (event?.date && item.start_time) {
        entries.push({
          id: `program-${item.id}`,
          title: item.title,
          date: event.date,
          time_start: item.start_time,
          type: 'program_item',
          source_module: 'program',
          source_id: item.id,
          color: TYPE_COLORS.program_item,
          location: item.location,
          description: item.description,
        });
      }
    });

    tasks.forEach(task => {
      if (task.due_date) {
        entries.push({
          id: `task-due-${task.id}`,
          title: task.title || t('calendar.untitled_task'),
          date: task.due_date,
          type: 'task',
          source_module: 'tasks',
          source_id: task.id,
          color: TYPE_COLORS.task,
          description: task.description,
        });
      }
      if (task.start_date && task.start_date !== task.due_date) {
        entries.push({
          id: `task-start-${task.id}`,
          title: `${task.title || t('calendar.untitled_task')} (${t('calendar.start')})`,
          date: task.start_date,
          type: 'task',
          source_module: 'tasks',
          source_id: task.id,
          color: TYPE_COLORS.task,
          description: task.description,
        });
      }
    });

    vendors.forEach(vendor => {
      if (vendor.final_payment_due) {
        entries.push({
          id: `vendor-payment-${vendor.id}`,
          title: `${vendor.name} - ${t('calendar.payment_due')}`,
          date: vendor.final_payment_due,
          type: 'vendor_deadline',
          source_module: 'vendors',
          source_id: vendor.id,
          color: TYPE_COLORS.vendor_deadline,
        });
      }
    });

    return entries.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time_start || '00:00'}`);
      const dateB = new Date(`${b.date}T${b.time_start || '00:00'}`);
      return dateA.getTime() - dateB.getTime();
    });
  }, [events, tasks, vendors, programItems, locations, t]);

  const weddingDayEntries = useMemo(() => {
    const weddingDate = weddingData.wedding_date;
    if (!weddingDate) return [];
    return allEntries.filter(e => e.date === weddingDate);
  }, [allEntries, weddingData]);

  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    const firstDayOfWeek = firstDay.getDay();
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - (firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1));

    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }

    return days;
  };

  const getWeekDays = () => {
    const days: Date[] = [];
    const start = new Date(currentDate);
    const dayOfWeek = start.getDay();
    start.setDate(start.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getEntriesForDate = (date: Date): CalendarEntry[] => {
    const dateStr = date.toISOString().split('T')[0];
    return allEntries.filter(e => e.date === dateStr);
  };

  const navigatePrev = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else if (view === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const navigateNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else if (view === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDateHeader = () => {
    if (view === 'day') {
      return currentDate.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    } else if (view === 'week') {
      const weekDays = getWeekDays();
      const start = weekDays[0].toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
      const end = weekDays[6].toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
      return `${start} - ${end}`;
    } else if (view === 'month') {
      return currentDate.toLocaleDateString('de-DE', { year: 'numeric', month: 'long' });
    } else {
      return t('calendar.wedding_day');
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div className="flex items-center gap-4">
            <CalendarIcon className="w-6 h-6 text-neutral-700" />
            <h2 className="text-2xl font-light text-neutral-900">{t('calendar.title')}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-neutral-600" />
          </button>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView('day')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === 'day' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('week')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === 'week' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('month')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === 'month' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('wedding')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === 'wedding' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <Clock className="w-4 h-4" />
            </button>
          </div>

          {view !== 'wedding' && (
            <div className="flex items-center gap-3">
              <button
                onClick={navigatePrev}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-neutral-700" />
              </button>
              <div className="min-w-[280px] text-center">
                <h3 className="text-lg font-light text-neutral-900">{formatDateHeader()}</h3>
              </div>
              <button
                onClick={navigateNext}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-neutral-700" />
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            {view !== 'wedding' && (
              <button
                onClick={goToToday}
                className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors text-sm"
              >
                {t('calendar.today')}
              </button>
            )}
            <button
              onClick={handlePrint}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <Printer className="w-5 h-5 text-neutral-700" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {view === 'month' && (
            <div className="grid grid-cols-7 gap-px bg-neutral-200 border border-neutral-200 rounded-lg overflow-hidden">
              {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(day => (
                <div key={day} className="bg-neutral-50 p-3 text-center text-sm font-medium text-neutral-600">
                  {day}
                </div>
              ))}
              {getMonthDays().map((day, idx) => {
                const entries = getEntriesForDate(day);
                return (
                  <div
                    key={idx}
                    className={`bg-white min-h-[120px] p-2 ${
                      !isCurrentMonth(day) ? 'opacity-40' : ''
                    } ${isToday(day) ? 'ring-2 ring-neutral-900' : ''}`}
                  >
                    <div className={`text-sm mb-2 ${isToday(day) ? 'font-medium text-neutral-900' : 'text-neutral-600'}`}>
                      {day.getDate()}
                    </div>
                    <div className="space-y-1">
                      {entries.slice(0, 3).map(entry => (
                        <button
                          key={entry.id}
                          onClick={() => setSelectedEntry(entry)}
                          className="text-xs px-2 py-1 rounded truncate w-full text-left hover:opacity-80 transition-opacity"
                          style={{ backgroundColor: `${entry.color}20`, color: entry.color }}
                          title={entry.title}
                        >
                          {entry.time_start && <span className="font-medium">{entry.time_start} </span>}
                          {entry.title}
                        </button>
                      ))}
                      {entries.length > 3 && (
                        <div className="text-xs text-neutral-500 px-2">+{entries.length - 3} {t('calendar.more')}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {view === 'week' && (
            <div className="grid grid-cols-7 gap-3">
              {getWeekDays().map((day, idx) => {
                const entries = getEntriesForDate(day);
                return (
                  <div key={idx} className={`border border-neutral-200 rounded-lg p-3 ${isToday(day) ? 'ring-2 ring-neutral-900' : ''}`}>
                    <div className="text-center mb-3">
                      <div className="text-xs text-neutral-500">{day.toLocaleDateString('de-DE', { weekday: 'short' })}</div>
                      <div className={`text-lg ${isToday(day) ? 'font-medium text-neutral-900' : 'text-neutral-700'}`}>
                        {day.getDate()}
                      </div>
                    </div>
                    <div className="space-y-2">
                      {entries.map(entry => (
                        <button
                          key={entry.id}
                          onClick={() => setSelectedEntry(entry)}
                          className="text-xs px-2 py-2 rounded border w-full text-left hover:shadow-sm transition-shadow"
                          style={{ borderColor: entry.color, backgroundColor: `${entry.color}10` }}
                        >
                          {entry.time_start && (
                            <div className="font-medium mb-1" style={{ color: entry.color }}>{entry.time_start}</div>
                          )}
                          <div className="text-neutral-900 font-medium">{entry.title}</div>
                          {entry.location && (
                            <div className="text-neutral-600 mt-1">{entry.location}</div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {view === 'day' && (
            <div className="max-w-2xl mx-auto">
              <div className="border border-neutral-200 rounded-lg overflow-hidden">
                {getEntriesForDate(currentDate).length === 0 ? (
                  <div className="p-12 text-center text-neutral-500">
                    {t('calendar.no_events')}
                  </div>
                ) : (
                  <div className="divide-y divide-neutral-100">
                    {getEntriesForDate(currentDate).map(entry => (
                      <button
                        key={entry.id}
                        onClick={() => setSelectedEntry(entry)}
                        className="p-4 hover:bg-neutral-50 transition-colors w-full text-left"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: entry.color }} />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              {entry.time_start && (
                                <span className="text-sm font-medium text-neutral-700">{entry.time_start}</span>
                              )}
                              {entry.time_end && (
                                <span className="text-sm text-neutral-500">- {entry.time_end}</span>
                              )}
                            </div>
                            <h4 className="font-medium text-neutral-900 mb-1">{entry.title}</h4>
                            {entry.location && (
                              <p className="text-sm text-neutral-600 mb-1">{entry.location}</p>
                            )}
                            {entry.description && (
                              <p className="text-sm text-neutral-600">{entry.description}</p>
                            )}
                            <span className="inline-block mt-2 px-2 py-1 text-xs rounded" style={{ backgroundColor: `${entry.color}20`, color: entry.color }}>
                              {t(`calendar.type.${entry.type}`)}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {view === 'wedding' && (
            <div className="max-w-3xl mx-auto">
              <div className="mb-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                <h3 className="text-lg font-medium text-neutral-900 mb-2">{t('calendar.wedding_day_timeline')}</h3>
                <p className="text-sm text-neutral-600">
                  {weddingData.wedding_date
                    ? new Date(weddingData.wedding_date).toLocaleDateString('de-DE', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : t('calendar.no_wedding_date')}
                </p>
              </div>

              {weddingDayEntries.length === 0 ? (
                <div className="p-12 text-center text-neutral-500 border border-neutral-200 rounded-lg">
                  {t('calendar.no_wedding_events')}
                </div>
              ) : (
                <div className="space-y-3">
                  {weddingDayEntries.map((entry, idx) => (
                    <button
                      key={entry.id}
                      onClick={() => setSelectedEntry(entry)}
                      className="relative pl-8 pb-6 border-l-2 w-full text-left"
                      style={{ borderColor: idx === weddingDayEntries.length - 1 ? 'transparent' : entry.color }}
                    >
                      <div
                        className="absolute left-0 -translate-x-1/2 w-4 h-4 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      />
                      <div className="bg-white border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            {entry.time_start && (
                              <span className="text-lg font-medium text-neutral-900">{entry.time_start}</span>
                            )}
                            {entry.time_end && (
                              <span className="text-sm text-neutral-500 ml-2">- {entry.time_end}</span>
                            )}
                          </div>
                          <span
                            className="px-2 py-1 text-xs rounded"
                            style={{ backgroundColor: `${entry.color}20`, color: entry.color }}
                          >
                            {t(`calendar.type.${entry.type}`)}
                          </span>
                        </div>
                        <h4 className="text-lg font-medium text-neutral-900 mb-2">{entry.title}</h4>
                        {entry.location && (
                          <p className="text-sm text-neutral-600 mb-1">📍 {entry.location}</p>
                        )}
                        {entry.description && (
                          <p className="text-sm text-neutral-600 mt-2">{entry.description}</p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50">
          <div className="flex items-center gap-6 text-xs">
            {Object.entries(TYPE_COLORS).map(([type, color]) => (
              <div key={type} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: color }} />
                <span className="text-neutral-600">{t(`calendar.type.${type}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          .fixed {
            position: relative;
          }
          button {
            display: none !important;
          }
        }
      `}</style>

      {selectedEntry && (() => {
        const sourceData = (() => {
          switch (selectedEntry.source_module) {
            case 'tasks': {
              const task = tasks.find(t => t.id === selectedEntry.source_id);
              if (!task) return null;
              const assignee = task.assigned_to
                ? guests.find(g => g.id === task.assigned_to) || supportTeam.find(s => s.id === task.assigned_to)
                : null;
              return {
                type: 'task',
                data: task,
                assignee,
                canComplete: true,
              };
            }
            case 'events': {
              const event = events.find(e => e.id === selectedEntry.source_id);
              const location = event?.location_id ? locations.find(l => l.id === event.location_id) : null;
              return { type: 'event', data: event, location };
            }
            case 'vendors': {
              const vendor = vendors.find(v => v.id === selectedEntry.source_id);
              return { type: 'vendor', data: vendor };
            }
            case 'program': {
              const program = programItems.find(p => p.id === selectedEntry.source_id);
              return { type: 'program', data: program };
            }
            default:
              return null;
          }
        })();

        const handleCompleteTask = () => {
          if (sourceData?.type === 'task' && sourceData.data) {
            updateTask(sourceData.data.id, { completed: true });
            setSelectedEntry(null);
          }
        };

        return (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedEntry(null)}>
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-neutral-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-neutral-900 mb-2">{selectedEntry.title}</h3>
                    <span
                      className="inline-block px-3 py-1 text-xs rounded-full font-medium"
                      style={{ backgroundColor: `${selectedEntry.color}20`, color: selectedEntry.color }}
                    >
                      {t(`calendar.type.${selectedEntry.type}`)}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedEntry(null)}
                    className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-neutral-600" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <div className="text-sm font-medium text-neutral-500 mb-1">{t('calendar.date')}</div>
                  <div className="text-base text-neutral-900">
                    {new Date(selectedEntry.date).toLocaleDateString('de-DE', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>

                {selectedEntry.time_start && (
                  <div>
                    <div className="text-sm font-medium text-neutral-500 mb-1">{t('calendar.time')}</div>
                    <div className="text-base text-neutral-900">
                      {selectedEntry.time_start}
                      {selectedEntry.time_end && ` - ${selectedEntry.time_end}`}
                    </div>
                  </div>
                )}

                {selectedEntry.location && (
                  <div>
                    <div className="text-sm font-medium text-neutral-500 mb-1 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {t('calendar.location')}
                    </div>
                    <div className="text-base text-neutral-900">{selectedEntry.location}</div>
                  </div>
                )}

                {sourceData?.type === 'task' && sourceData.assignee && (
                  <div>
                    <div className="text-sm font-medium text-neutral-500 mb-1 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {t('calendar.assigned_to')}
                    </div>
                    <div className="text-base text-neutral-900">
                      {sourceData.assignee.name || `${sourceData.assignee.first_name || ''} ${sourceData.assignee.last_name || ''}`.trim()}
                    </div>
                  </div>
                )}

                {sourceData?.type === 'task' && sourceData.data.category && (
                  <div>
                    <div className="text-sm font-medium text-neutral-500 mb-1 flex items-center gap-2">
                      <ListTodo className="w-4 h-4" />
                      {t('calendar.category')}
                    </div>
                    <div className="text-base text-neutral-900">{sourceData.data.category}</div>
                  </div>
                )}

                {sourceData?.type === 'vendor' && sourceData.data.category && (
                  <div>
                    <div className="text-sm font-medium text-neutral-500 mb-1 flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      {t('calendar.category')}
                    </div>
                    <div className="text-base text-neutral-900">{sourceData.data.category}</div>
                  </div>
                )}

                {selectedEntry.description && (
                  <div>
                    <div className="text-sm font-medium text-neutral-500 mb-1">{t('calendar.description')}</div>
                    <div className="text-base text-neutral-900 whitespace-pre-wrap">{selectedEntry.description}</div>
                  </div>
                )}

                {sourceData?.type === 'task' && sourceData.data.completed && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-green-700 font-medium">{t('calendar.completed')}</span>
                  </div>
                )}
              </div>

              <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex justify-between items-center">
                <div className="text-sm text-neutral-500 flex items-center gap-2">
                  {selectedEntry.source_module === 'tasks' && <ListTodo className="w-4 h-4" />}
                  {selectedEntry.source_module === 'events' && <CalendarIcon className="w-4 h-4" />}
                  {selectedEntry.source_module === 'vendors' && <Briefcase className="w-4 h-4" />}
                  {selectedEntry.source_module === 'program' && <Clock className="w-4 h-4" />}
                  <span className="capitalize">{selectedEntry.source_module}</span>
                </div>
                <div className="flex gap-2">
                  {sourceData?.type === 'task' && !sourceData.data.completed && (
                    <button
                      onClick={handleCompleteTask}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {t('calendar.mark_complete')}
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedEntry(null)}
                    className="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
                  >
                    {t('calendar.close')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
