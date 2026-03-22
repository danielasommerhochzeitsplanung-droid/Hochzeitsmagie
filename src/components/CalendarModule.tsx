import { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { useWeddingData } from '../contexts/WeddingDataContext';
import { getAllCalendarEvents } from '../utils/calendarMapper';
import { CalendarEvent, CalendarEventType, CalendarEventSource } from '../types/calendar';
import CalendarEventDetailModal from './CalendarEventDetailModal';
import { useTranslation } from 'react-i18next';

type ViewMode = 'month' | 'week' | 'day' | 'timeline';

export default function CalendarModule() {
  const { t } = useTranslation();
  const { weddingData, events, tasks, budgetItems, guests, vendors } = useWeddingData();
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [typeFilters, setTypeFilters] = useState<Set<CalendarEventType>>(new Set());
  const [sourceFilters, setSourceFilters] = useState<Set<CalendarEventSource>>(new Set());

  const calendarData = useMemo(() => ({
    wedding_date: weddingData?.wedding_date,
    events: events || [],
    tasks: tasks || [],
    budgetItems: budgetItems || [],
    guests: guests || [],
    vendors: vendors || []
  }), [weddingData, events, tasks, budgetItems, guests, vendors]);

  const allEvents = useMemo(() => {
    const events = getAllCalendarEvents(calendarData);
    console.log('Calendar Debug:', {
      totalTasks: tasks.length,
      tasksWithDueDate: tasks.filter(t => t.due_date).length,
      calendarEvents: events.length,
      taskEvents: events.filter(e => e.source === 'todos').length,
      sampleTask: tasks[0],
      sampleEvent: events[0]
    });
    return events;
  }, [calendarData, tasks]);

  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      if (typeFilters.size > 0 && !typeFilters.has(event.type)) return false;
      if (sourceFilters.size > 0 && !sourceFilters.has(event.source)) return false;
      return true;
    });
  }, [allEvents, typeFilters, sourceFilters]);

  const weddingDate = weddingData?.wedding_date;
  const weddingDayEvents = useMemo(() => {
    if (!weddingDate) return [];
    return filteredEvents.filter(
      (event) => event.date === weddingDate && event.type === 'wedding_day_event'
    );
  }, [filteredEvents, weddingDate]);

  const toggleTypeFilter = (type: CalendarEventType) => {
    const newFilters = new Set(typeFilters);
    if (newFilters.has(type)) {
      newFilters.delete(type);
    } else {
      newFilters.add(type);
    }
    setTypeFilters(newFilters);
  };

  const toggleSourceFilter = (source: CalendarEventSource) => {
    const newFilters = new Set(sourceFilters);
    if (newFilters.has(source)) {
      newFilters.delete(source);
    } else {
      newFilters.add(source);
    }
    setSourceFilters(newFilters);
  };

  const goToPreviousPeriod = () => {
    const newDate = new Date(selectedDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    }
    setSelectedDate(newDate);
  };

  const goToNextPeriod = () => {
    const newDate = new Date(selectedDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    }
    setSelectedDate(newDate);
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const getTypeColor = (type: CalendarEventType) => {
    const colors = {
      wedding_day_event: 'bg-pink-500',
      todo: 'bg-blue-500',
      budget_deadline: 'bg-green-500',
      guest_deadline: 'bg-purple-500',
      vendor_appointment: 'bg-orange-500',
      other_event: 'bg-gray-500',
    };
    return colors[type];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-8 h-8 text-gray-800" />
          <h1 className="text-3xl font-bold text-gray-900">
            {t('calendar.title')}
          </h1>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
            showFilters || typeFilters.size > 0 || sourceFilters.size > 0
              ? 'bg-gray-800 text-white border-gray-800'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <Filter className="w-4 h-4" />
          {t('common.filter')}
          {(typeFilters.size > 0 || sourceFilters.size > 0) && (
            <span className="bg-white text-gray-800 px-2 py-0.5 rounded-full text-xs font-medium">
              {typeFilters.size + sourceFilters.size}
            </span>
          )}
        </button>
      </div>

      {showFilters && (
        <div className="bg-white rounded-lg shadow-sm border p-4 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              {t('calendar.filterByType')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {(['wedding_day_event', 'todo', 'budget_deadline', 'guest_deadline', 'vendor_appointment', 'other_event'] as CalendarEventType[]).map(
                (type) => (
                  <button
                    key={type}
                    onClick={() => toggleTypeFilter(type)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      typeFilters.has(type)
                        ? 'bg-gray-800 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t(`calendar.types.${type}`)}
                  </button>
                )
              )}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              {t('calendar.filterBySource')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {(['events', 'todos', 'budget', 'guests', 'vendors'] as CalendarEventSource[]).map(
                (source) => (
                  <button
                    key={source}
                    onClick={() => toggleSourceFilter(source)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      sourceFilters.has(source)
                        ? 'bg-gray-800 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t(`calendar.sources.${source}`)}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="border-b bg-gray-50 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={goToPreviousPeriod}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNextPeriod}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={goToToday}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t('calendar.today')}
              </button>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              {viewMode === 'month' &&
                selectedDate.toLocaleDateString('de-DE', {
                  month: 'long',
                  year: 'numeric',
                })}
              {viewMode === 'week' &&
                `${t('calendar.week')} ${getWeekNumber(selectedDate)}, ${selectedDate.getFullYear()}`}
              {viewMode === 'day' &&
                selectedDate.toLocaleDateString('de-DE', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              {viewMode === 'timeline' && t('calendar.weddingDayTimeline')}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  viewMode === 'month'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {t('calendar.month')}
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  viewMode === 'week'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {t('calendar.week')}
              </button>
              <button
                onClick={() => setViewMode('day')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  viewMode === 'day'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {t('calendar.day')}
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  viewMode === 'timeline'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {t('calendar.timeline')}
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {viewMode === 'month' && (
            <MonthView
              selectedDate={selectedDate}
              events={filteredEvents}
              onEventClick={setSelectedEvent}
              getTypeColor={getTypeColor}
            />
          )}
          {viewMode === 'week' && (
            <WeekView
              selectedDate={selectedDate}
              events={filteredEvents}
              onEventClick={setSelectedEvent}
              getTypeColor={getTypeColor}
            />
          )}
          {viewMode === 'day' && (
            <DayView
              selectedDate={selectedDate}
              events={filteredEvents}
              onEventClick={setSelectedEvent}
              getTypeColor={getTypeColor}
            />
          )}
          {viewMode === 'timeline' && (
            <TimelineView
              weddingDate={weddingDate}
              events={weddingDayEvents}
              onEventClick={setSelectedEvent}
              getTypeColor={getTypeColor}
            />
          )}
        </div>
      </div>

      {selectedEvent && (
        <CalendarEventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}

function MonthView({
  selectedDate,
  events,
  onEventClick,
  getTypeColor,
}: {
  selectedDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  getTypeColor: (type: CalendarEventType) => string;
}) {
  const { t } = useTranslation();

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDayOfWeek = (firstDay.getDay() + 6) % 7;
  const daysInMonth = lastDay.getDate();

  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter((e) => e.date === dateStr);
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 mb-2">{t('calendar.emptyState')}</p>
        <p className="text-sm text-gray-400">{t('calendar.emptyStateHint')}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
        {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day) => (
          <div
            key={day}
            className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-700"
          >
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          const dayEvents = day ? getEventsForDay(day) : [];
          const isToday =
            day &&
            new Date().getDate() === day &&
            new Date().getMonth() === month &&
            new Date().getFullYear() === year;

          return (
            <div
              key={index}
              className={`bg-white min-h-[100px] p-2 ${
                !day ? 'bg-gray-50' : ''
              }`}
            >
              {day && (
                <>
                  <div
                    className={`text-sm font-medium mb-1 ${
                      isToday
                        ? 'bg-gray-800 text-white w-6 h-6 rounded-full flex items-center justify-center'
                        : 'text-gray-700'
                    }`}
                  >
                    {day}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map((event) => (
                      <button
                        key={event.id}
                        onClick={() => onEventClick(event)}
                        className="w-full text-left text-xs p-1 rounded hover:opacity-80 transition-opacity"
                        style={{
                          backgroundColor: getTypeColor(event.type).replace(
                            'bg-',
                            ''
                          ),
                        }}
                      >
                        <div className="text-white font-medium truncate">
                          {event.time && `${event.time.substring(0, 5)} `}
                          {event.title}
                        </div>
                      </button>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-gray-500 pl-1">
                        +{dayEvents.length - 3} {t('calendar.more')}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WeekView({
  selectedDate,
  events,
  onEventClick,
  getTypeColor,
}: {
  selectedDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  getTypeColor: (type: CalendarEventType) => string;
}) {
  const { t } = useTranslation();

  const startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(selectedDate.getDate() - ((selectedDate.getDay() + 6) % 7));

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return day;
  });

  const getEventsForDay = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter((e) => e.date === dateStr);
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 mb-2">{t('calendar.emptyState')}</p>
        <p className="text-sm text-gray-400">{t('calendar.emptyStateHint')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-7 gap-4">
      {weekDays.map((day, index) => {
        const dayEvents = getEventsForDay(day);
        const isToday = day.toDateString() === new Date().toDateString();

        return (
          <div key={index} className="border rounded-lg p-3">
            <div
              className={`text-center mb-3 ${
                isToday ? 'text-gray-900 font-semibold' : 'text-gray-700'
              }`}
            >
              <div className="text-sm">
                {day.toLocaleDateString('de-DE', { weekday: 'short' })}
              </div>
              <div
                className={`text-lg ${
                  isToday
                    ? 'bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto'
                    : ''
                }`}
              >
                {day.getDate()}
              </div>
            </div>
            <div className="space-y-2">
              {dayEvents.map((event) => (
                <button
                  key={event.id}
                  onClick={() => onEventClick(event)}
                  className={`w-full text-left text-xs p-2 rounded hover:opacity-80 transition-opacity text-white ${getTypeColor(
                    event.type
                  )}`}
                >
                  <div className="font-medium">
                    {event.time && `${event.time.substring(0, 5)}`}
                  </div>
                  <div className="truncate">{event.title}</div>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DayView({
  selectedDate,
  events,
  onEventClick,
  getTypeColor,
}: {
  selectedDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  getTypeColor: (type: CalendarEventType) => string;
}) {
  const { t } = useTranslation();

  const dateStr = selectedDate.toISOString().split('T')[0];
  const dayEvents = events.filter((e) => e.date === dateStr);

  const sortedEvents = [...dayEvents].sort((a, b) => {
    if (a.time && b.time) {
      return a.time.localeCompare(b.time);
    }
    if (a.time) return -1;
    if (b.time) return 1;
    return 0;
  });

  if (sortedEvents.length === 0) {
    return (
      <div className="text-center py-12">
        <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">{t('calendar.noEventsThisDay')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedEvents.map((event) => (
        <button
          key={event.id}
          onClick={() => onEventClick(event)}
          className="w-full text-left p-4 border rounded-lg hover:shadow-md transition-shadow"
        >
          <div className="flex items-start gap-4">
            <div className={`w-1 h-full ${getTypeColor(event.type)} rounded`} />
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{event.title}</h3>
                {event.time && (
                  <span className="text-sm text-gray-600">
                    {event.time.substring(0, 5)}
                    {event.endTime && ` - ${event.endTime.substring(0, 5)}`}
                  </span>
                )}
              </div>
              {event.location && (
                <p className="text-sm text-gray-600 mb-1">{event.location}</p>
              )}
              {event.notes && (
                <p className="text-sm text-gray-500 line-clamp-2">
                  {event.notes}
                </p>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

function TimelineView({
  weddingDate,
  events,
  onEventClick,
  getTypeColor,
}: {
  weddingDate?: string;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  getTypeColor: (type: CalendarEventType) => string;
}) {
  const { t } = useTranslation();

  if (!weddingDate) {
    return (
      <div className="text-center py-12">
        <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">{t('calendar.noWeddingDateSet')}</p>
      </div>
    );
  }

  const sortedEvents = [...events].sort((a, b) => {
    if (a.time && b.time) {
      return a.time.localeCompare(b.time);
    }
    if (a.time) return -1;
    if (b.time) return 1;
    return 0;
  });

  if (sortedEvents.length === 0) {
    return (
      <div className="text-center py-12">
        <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">{t('calendar.noWeddingDayEvents')}</p>
        <p className="text-sm text-gray-400 mt-2">
          {t('calendar.addEventsToSeeTimeline')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          {new Date(weddingDate).toLocaleDateString('de-DE', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </h3>
      </div>
      <div className="relative">
        <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-gray-200" />
        {sortedEvents.map((event, index) => (
          <button
            key={event.id}
            onClick={() => onEventClick(event)}
            className="relative flex items-start gap-4 mb-6 w-full text-left hover:bg-gray-50 p-4 rounded-lg transition-colors"
          >
            <div className="w-24 flex-shrink-0 text-right">
              {event.time ? (
                <span className="text-sm font-medium text-gray-900">
                  {event.time.substring(0, 5)}
                </span>
              ) : (
                <span className="text-sm text-gray-400">
                  {t('calendar.noTime')}
                </span>
              )}
            </div>
            <div
              className={`w-3 h-3 rounded-full ${getTypeColor(
                event.type
              )} flex-shrink-0 relative z-10`}
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">
                {event.title}
              </h4>
              {event.location && (
                <p className="text-sm text-gray-600 mb-1">{event.location}</p>
              )}
              {event.notes && (
                <p className="text-sm text-gray-500 line-clamp-2">
                  {event.notes}
                </p>
              )}
              {event.endTime && (
                <p className="text-xs text-gray-400 mt-1">
                  {t('calendar.until')} {event.endTime.substring(0, 5)}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function getWeekNumber(date: Date): number {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}
