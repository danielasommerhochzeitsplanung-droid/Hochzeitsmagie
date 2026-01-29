import { useState, useMemo, useCallback } from 'react';
import {
  CheckCircle2,
  Circle,
  AlertTriangle,
  XCircle,
  AlertCircle,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Calendar,
  MapPin,
  Users,
  Briefcase,
  Filter
} from 'lucide-react';
import { Task, Event, Vendor, Location, SupportTeam } from '../lib/storage-adapter';
import { taskCategories } from './taskTemplates';

interface TimelineViewProps {
  tasks: Task[];
  events: Event[];
  vendors: Vendor[];
  locations: Location[];
  supportTeam: SupportTeam[];
  weddingDate: string;
  onToggleTask: (task: Task) => void;
  onEditTask: (task: Task) => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onUpdateEvent: (id: string, updates: Partial<Event>) => void;
  getBlockedTasks: (task: Task) => string[];
}

type TimelineItemType = 'event' | 'task' | 'vendor' | 'location' | 'support';
type ConflictType = 'overlap' | 'impossible' | 'warning';
type ZoomLevel = 'year' | 'sixMonths' | 'threeMonths';

interface TimelineItem {
  id: string;
  type: TimelineItemType;
  title: string;
  startDate: Date;
  endDate?: Date;
  category?: string;
  completed?: boolean;
  priority?: string;
  data: Task | Event | Vendor | Location | SupportTeam;
}

interface Conflict {
  itemId: string;
  type: ConflictType;
  message: string;
  relatedItems: string[];
}

export default function TimelineView({
  tasks,
  events,
  vendors,
  locations,
  supportTeam,
  weddingDate,
  onToggleTask,
  onEditTask,
  onUpdateTask,
  onUpdateEvent,
  getBlockedTasks,
}: TimelineViewProps) {
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>('year');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<TimelineItem | null>(null);
  const [filters, setFilters] = useState({
    events: true,
    tasks: true,
    vendors: true,
    locations: true,
    support: true,
  });

  const weddingDateObj = new Date(weddingDate + 'T12:00:00');
  const today = new Date();

  const timelineItems = useMemo((): TimelineItem[] => {
    const items: TimelineItem[] = [];

    if (filters.events) {
      events.forEach(event => {
        if (event.date) {
          const eventDate = new Date(event.date);
          items.push({
            id: event.id,
            type: 'event',
            title: event.title,
            startDate: eventDate,
            endDate: eventDate,
            data: event,
          });
        }
      });
    }

    if (filters.tasks) {
      tasks.forEach(task => {
        if (task.due_date) {
          const startDate = task.start_date ? new Date(task.start_date) : new Date(task.due_date);
          items.push({
            id: task.id,
            type: 'task',
            title: task.title,
            startDate,
            endDate: new Date(task.due_date),
            category: task.category,
            completed: task.completed,
            priority: task.priority,
            data: task,
          });
        }
      });
    }

    if (filters.vendors) {
      vendors.forEach(vendor => {
        if (vendor.first_contact_date) {
          items.push({
            id: `${vendor.id}-first`,
            type: 'vendor',
            title: `${vendor.name} - Erstkontakt`,
            startDate: new Date(vendor.first_contact_date),
            data: vendor,
          });
        }
        if (vendor.next_appointment) {
          items.push({
            id: `${vendor.id}-next`,
            type: 'vendor',
            title: `${vendor.name} - Nächster Termin`,
            startDate: new Date(vendor.next_appointment),
            data: vendor,
          });
        }
        if (vendor.cancellation_deadline) {
          items.push({
            id: `${vendor.id}-cancel`,
            type: 'vendor',
            title: `${vendor.name} - Storno-Frist`,
            startDate: new Date(vendor.cancellation_deadline),
            data: vendor,
          });
        }
      });
    }

    if (filters.locations) {
      locations.forEach(location => {
        if (location.viewing_date) {
          items.push({
            id: `${location.id}-viewing`,
            type: 'location',
            title: `${location.name} - Besichtigung`,
            startDate: new Date(location.viewing_date),
            data: location,
          });
        }
        if (location.reservation_date) {
          items.push({
            id: `${location.id}-reservation`,
            type: 'location',
            title: `${location.name} - Reservierung`,
            startDate: new Date(location.reservation_date),
            data: location,
          });
        }
      });
    }

    if (filters.support) {
      supportTeam.forEach(member => {
        if (member.briefing_date) {
          items.push({
            id: `${member.id}-briefing`,
            type: 'support',
            title: `${member.name} - Briefing`,
            startDate: new Date(member.briefing_date),
            data: member,
          });
        }
        if (member.availability_start && member.availability_end) {
          items.push({
            id: `${member.id}-availability`,
            type: 'support',
            title: `${member.name} - Verfügbar`,
            startDate: new Date(member.availability_start),
            endDate: new Date(member.availability_end),
            data: member,
          });
        }
      });
    }

    return items.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  }, [events, tasks, vendors, locations, supportTeam, filters]);

  const conflicts = useMemo((): Conflict[] => {
    const foundConflicts: Conflict[] = [];

    timelineItems.forEach((item, index) => {
      if (item.type === 'task' && item.startDate > weddingDateObj) {
        foundConflicts.push({
          itemId: item.id,
          type: 'impossible',
          message: 'Aufgabe beginnt nach dem Hochzeitstag',
          relatedItems: [],
        });
      }

      if (item.endDate && item.endDate > weddingDateObj && item.type === 'task') {
        foundConflicts.push({
          itemId: item.id,
          type: 'impossible',
          message: 'Aufgabe endet nach dem Hochzeitstag',
          relatedItems: [],
        });
      }

      for (let i = index + 1; i < timelineItems.length; i++) {
        const other = timelineItems[i];

        if (item.type === 'event' && other.type === 'event') {
          const itemStart = item.startDate.getTime();
          const itemEnd = (item.endDate || item.startDate).getTime();
          const otherStart = other.startDate.getTime();
          const otherEnd = (other.endDate || other.startDate).getTime();

          if (
            (itemStart <= otherEnd && itemEnd >= otherStart) ||
            (otherStart <= itemEnd && otherEnd >= itemStart)
          ) {
            foundConflicts.push({
              itemId: item.id,
              type: 'overlap',
              message: `Überschneidung mit ${other.title}`,
              relatedItems: [other.id],
            });
          }
        }
      }

      if (item.type === 'task' && item.endDate) {
        const daysUntilDue = Math.ceil((item.endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        if (daysUntilDue > 0 && daysUntilDue <= 7 && !item.completed) {
          foundConflicts.push({
            itemId: item.id,
            type: 'warning',
            message: `Fällig in ${daysUntilDue} Tag${daysUntilDue === 1 ? '' : 'en'}`,
            relatedItems: [],
          });
        }
      }
    });

    return foundConflicts;
  }, [timelineItems, weddingDateObj, today]);

  const { startDate, endDate, totalDays } = useMemo(() => {
    const earliestItem = timelineItems.reduce((earliest, item) => {
      return !earliest || item.startDate < earliest ? item.startDate : earliest;
    }, null as Date | null);

    let start = earliestItem || new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);
    let end = new Date(weddingDateObj);

    switch (zoomLevel) {
      case 'threeMonths':
        start = new Date(Math.max(start.getTime(), today.getTime() - 30 * 24 * 60 * 60 * 1000));
        end = new Date(Math.min(end.getTime(), today.getTime() + 90 * 24 * 60 * 60 * 1000));
        break;
      case 'sixMonths':
        start = new Date(Math.max(start.getTime(), today.getTime() - 60 * 24 * 60 * 60 * 1000));
        end = new Date(Math.min(end.getTime(), today.getTime() + 180 * 24 * 60 * 60 * 1000));
        break;
    }

    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return { startDate: start, endDate: end, totalDays: days };
  }, [timelineItems, weddingDateObj, today, zoomLevel]);

  const todayPercent = Math.max(
    0,
    Math.min(
      100,
      ((today.getTime() - startDate.getTime()) / (endDate.getTime() - startDate.getTime())) * 100
    )
  );

  const timeMarkers = useMemo(() => {
    const markers: { date: Date; label: string; isMonth: boolean }[] = [];
    const current = new Date(startDate);
    current.setDate(1);
    current.setHours(0, 0, 0, 0);

    while (current <= endDate) {
      const percent = ((current.getTime() - startDate.getTime()) / (totalDays * 24 * 60 * 60 * 1000)) * 100;

      if (percent >= 0 && percent <= 100) {
        markers.push({
          date: new Date(current),
          label: current.toLocaleDateString('de-DE', { month: 'short', year: '2-digit' }),
          isMonth: true,
        });
      }

      current.setMonth(current.getMonth() + 1);
    }

    return markers;
  }, [startDate, endDate, totalDays]);

  const getItemPosition = (item: TimelineItem) => {
    const itemStart = item.startDate;
    const itemEnd = item.endDate || item.startDate;

    const startPercent = ((itemStart.getTime() - startDate.getTime()) / (totalDays * 24 * 60 * 60 * 1000)) * 100;
    const durationPercent = ((itemEnd.getTime() - itemStart.getTime()) / (totalDays * 24 * 60 * 60 * 1000)) * 100;

    return {
      left: Math.max(0, Math.min(100, startPercent)),
      width: Math.max(0.5, Math.min(100 - startPercent, durationPercent))
    };
  };

  const getItemColor = (item: TimelineItem): string => {
    switch (item.type) {
      case 'event':
        return '#d6b15b';
      case 'task':
        const cat = taskCategories.find(c => c.id === item.category);
        return cat ? getColorHex(cat.color) : '#6b7280';
      case 'vendor':
        return '#f97316';
      case 'location':
        return '#06b6d4';
      case 'support':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const getItemIcon = (item: TimelineItem) => {
    switch (item.type) {
      case 'event':
        return <Calendar className="w-3 h-3" />;
      case 'task':
        return item.completed ? <CheckCircle2 className="w-3 h-3" /> : <Circle className="w-3 h-3" />;
      case 'vendor':
        return <Briefcase className="w-3 h-3" />;
      case 'location':
        return <MapPin className="w-3 h-3" />;
      case 'support':
        return <Users className="w-3 h-3" />;
    }
  };

  const getConflictIcon = (type: ConflictType) => {
    switch (type) {
      case 'overlap':
        return <XCircle className="w-4 h-4 text-rose-500" />;
      case 'impossible':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
    }
  };

  const snapToDay = (percent: number): number => {
    const totalMillis = endDate.getTime() - startDate.getTime();
    const millisPerDay = 24 * 60 * 60 * 1000;
    const targetMillis = (percent / 100) * totalMillis;
    const targetDay = Math.round(targetMillis / millisPerDay);
    return (targetDay * millisPerDay / totalMillis) * 100;
  };

  const handleDragStart = useCallback((item: TimelineItem, e: React.DragEvent) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedItem) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width) * 100;
    const snappedPercent = snapToDay(percent);

    const totalMillis = endDate.getTime() - startDate.getTime();
    const newStartMillis = startDate.getTime() + (snappedPercent / 100) * totalMillis;
    const newStartDate = new Date(newStartMillis);
    newStartDate.setHours(0, 0, 0, 0);

    const duration = draggedItem.endDate
      ? draggedItem.endDate.getTime() - draggedItem.startDate.getTime()
      : 0;
    const newEndDate = duration > 0 ? new Date(newStartDate.getTime() + duration) : newStartDate;

    const formattedStart = newStartDate.toISOString().split('T')[0];
    const formattedEnd = newEndDate.toISOString().split('T')[0];

    if (draggedItem.type === 'task') {
      onUpdateTask(draggedItem.id, {
        start_date: formattedStart,
        due_date: formattedEnd,
      });
    } else if (draggedItem.type === 'event') {
      onUpdateEvent(draggedItem.id, {
        date: formattedStart,
      });
    }

    setDraggedItem(null);
  }, [draggedItem, startDate, endDate, snapToDay, onUpdateTask, onUpdateEvent]);

  const getColorHex = (bgClass: string): string => {
    const colorMap: Record<string, string> = {
      'bg-blue-500': '#3b82f6',
      'bg-purple-500': '#a855f7',
      'bg-pink-500': '#ec4899',
      'bg-rose-500': '#f43f5e',
      'bg-orange-500': '#f97316',
      'bg-amber-500': '#f59e0b',
      'bg-emerald-500': '#10b981',
      'bg-teal-500': '#14b8a6',
      'bg-cyan-500': '#06b6d4',
      'bg-indigo-500': '#6366f1',
      'bg-gray-500': '#6b7280',
    };
    return colorMap[bgClass] || '#6b7280';
  };

  const weddingPercent = ((weddingDateObj.getTime() - startDate.getTime()) / (totalDays * 24 * 60 * 60 * 1000)) * 100;

  const groupedItems = useMemo(() => {
    const groups = new Map<string, TimelineItem[]>();

    timelineItems.forEach(item => {
      const key = item.type;
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)!.push(item);
    });

    return groups;
  }, [timelineItems]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium" style={{ color: '#666' }}>
          Zeitraum: {startDate.toLocaleDateString('de-DE')} - {endDate.toLocaleDateString('de-DE')}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border-2 rounded-lg px-3 py-1.5" style={{ borderColor: '#d6b15b' }}>
            <Filter className="w-4 h-4" style={{ color: '#d6b15b' }} />
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.events}
                onChange={(e) => setFilters(f => ({ ...f, events: e.target.checked }))}
                className="w-3.5 h-3.5"
              />
              <span className="text-xs font-medium">Events</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.tasks}
                onChange={(e) => setFilters(f => ({ ...f, tasks: e.target.checked }))}
                className="w-3.5 h-3.5"
              />
              <span className="text-xs font-medium">Todos</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.vendors}
                onChange={(e) => setFilters(f => ({ ...f, vendors: e.target.checked }))}
                className="w-3.5 h-3.5"
              />
              <span className="text-xs font-medium">Vendors</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.locations}
                onChange={(e) => setFilters(f => ({ ...f, locations: e.target.checked }))}
                className="w-3.5 h-3.5"
              />
              <span className="text-xs font-medium">Locations</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.support}
                onChange={(e) => setFilters(f => ({ ...f, support: e.target.checked }))}
                className="w-3.5 h-3.5"
              />
              <span className="text-xs font-medium">Support</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium" style={{ color: '#666' }}>Zoom:</span>
            <div className="flex rounded-lg overflow-hidden border-2" style={{ borderColor: '#d6b15b' }}>
              <button
                onClick={() => setZoomLevel('threeMonths')}
                className={`px-3 py-1.5 text-xs font-medium transition-all flex items-center gap-1 ${
                  zoomLevel === 'threeMonths'
                    ? 'text-white'
                    : 'text-gray-700 bg-white hover:bg-gray-50'
                }`}
                style={zoomLevel === 'threeMonths' ? { backgroundColor: '#d6b15b' } : {}}
                title="3 Monate"
              >
                <ZoomIn className="w-3 h-3" />
                3M
              </button>
              <button
                onClick={() => setZoomLevel('sixMonths')}
                className={`px-3 py-1.5 text-xs font-medium transition-all flex items-center gap-1 ${
                  zoomLevel === 'sixMonths'
                    ? 'text-white'
                    : 'text-gray-700 bg-white hover:bg-gray-50'
                }`}
                style={zoomLevel === 'sixMonths' ? { backgroundColor: '#d6b15b' } : {}}
                title="6 Monate"
              >
                <ZoomOut className="w-3 h-3" />
                6M
              </button>
              <button
                onClick={() => setZoomLevel('year')}
                className={`px-3 py-1.5 text-xs font-medium transition-all flex items-center gap-1 ${
                  zoomLevel === 'year'
                    ? 'text-white'
                    : 'text-gray-700 bg-white hover:bg-gray-50'
                }`}
                style={zoomLevel === 'year' ? { backgroundColor: '#d6b15b' } : {}}
                title="Gesamtansicht"
              >
                <Maximize2 className="w-3 h-3" />
                Alle
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-white rounded-lg border-2 overflow-hidden" style={{ borderColor: '#d6b15b' }}>
        <div className="relative border-b-2 bg-gray-50" style={{ borderColor: '#e5e5e5', height: '60px' }}>
          <div className="absolute inset-0 flex">
            {timeMarkers.map((marker, idx) => {
              const percent = ((marker.date.getTime() - startDate.getTime()) / (totalDays * 24 * 60 * 60 * 1000)) * 100;

              if (percent < 0 || percent > 100) return null;

              return (
                <div
                  key={idx}
                  className="absolute top-0 bottom-0 flex flex-col items-start justify-center border-l"
                  style={{
                    left: `${percent}%`,
                    borderColor: '#e5e5e5',
                  }}
                >
                  <div className="pl-2">
                    <div className="text-xs font-semibold" style={{ color: '#666' }}>
                      {marker.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {weddingPercent >= 0 && weddingPercent <= 100 && (
            <div
              className="absolute top-0 bottom-0 flex items-center justify-center"
              style={{ left: `${weddingPercent}%`, transform: 'translateX(-50%)' }}
            >
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-rose-500 transform rotate-45" style={{ marginBottom: '4px' }} />
                <div className="text-xs font-bold text-rose-600 whitespace-nowrap">
                  Hochzeit
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          className="relative"
          style={{ minHeight: '500px' }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-rose-500 z-20 pointer-events-none"
            style={{ left: `${todayPercent}%` }}
          >
            <div className="absolute -top-1 -left-2 w-4 h-4 bg-rose-500 rounded-full" />
            <div className="absolute top-2 left-2 text-xs font-bold text-rose-600 whitespace-nowrap">
              Heute
            </div>
          </div>

          {timeMarkers.map((marker, idx) => {
            const percent = ((marker.date.getTime() - startDate.getTime()) / (totalDays * 24 * 60 * 60 * 1000)) * 100;

            if (percent < 0 || percent > 100) return null;

            return (
              <div
                key={`grid-${idx}`}
                className="absolute top-0 bottom-0 w-px bg-gray-200 pointer-events-none"
                style={{ left: `${percent}%` }}
              />
            );
          })}

          <div className="p-4 space-y-8">
            {Array.from(groupedItems.entries()).map(([type, items]) => (
              <div key={type} className="space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center text-white text-sm"
                    style={{ backgroundColor: getItemColor(items[0]) }}
                  >
                    {getItemIcon(items[0])}
                  </div>
                  <h4 className="text-sm font-bold" style={{ color: '#3b3b3d' }}>
                    {type === 'event' && 'Events'}
                    {type === 'task' && 'Aufgaben'}
                    {type === 'vendor' && 'Dienstleister'}
                    {type === 'location' && 'Locations'}
                    {type === 'support' && 'Support Team'}
                  </h4>
                  <span className="text-xs text-gray-500">
                    ({items.length})
                  </span>
                </div>

                <div className="space-y-2">
                  {items.map(item => {
                    const position = getItemPosition(item);
                    const itemConflicts = conflicts.filter(c => c.itemId === item.id);
                    const isHovered = hoveredItem === item.id;
                    const isEvent = item.type === 'event';

                    return (
                      <div
                        key={item.id}
                        className="relative group"
                        onMouseEnter={() => setHoveredItem(item.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {item.type === 'task' && (
                            <button
                              onClick={() => onToggleTask(item.data as Task)}
                              className="flex-shrink-0"
                            >
                              {item.completed ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              ) : (
                                <Circle className="w-4 h-4 text-gray-400 hover:text-emerald-500 transition-colors" />
                              )}
                            </button>
                          )}
                          <span
                            className={`text-xs ${item.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}
                            style={{ fontFamily: 'Open Sans, sans-serif' }}
                          >
                            {item.title}
                          </span>
                          {itemConflicts.map((conflict, idx) => (
                            <div key={idx} title={conflict.message}>
                              {getConflictIcon(conflict.type)}
                            </div>
                          ))}
                        </div>

                        <div className={`relative ${isEvent ? 'h-12' : 'h-8'} bg-gray-100 rounded-md overflow-visible`}>
                          <div
                            draggable={item.type === 'task' || item.type === 'event'}
                            onDragStart={(e) => handleDragStart(item, e)}
                            className={`absolute h-full rounded-md transition-all ${
                              (item.type === 'task' || item.type === 'event') ? 'cursor-move' : 'cursor-default'
                            } hover:opacity-100 hover:shadow-lg flex items-center px-2`}
                            style={{
                              left: `${position.left}%`,
                              width: `${position.width}%`,
                              backgroundColor: getItemColor(item),
                              opacity: item.completed ? 0.4 : 0.9,
                              border: isHovered ? '2px solid #3b3b3d' : 'none',
                              zIndex: isHovered ? 10 : 1,
                            }}
                          >
                            {position.width > 3 && (
                              <div className="flex items-center gap-1.5 text-white">
                                {getItemIcon(item)}
                                <span className="text-xs font-medium truncate">
                                  {item.title}
                                </span>
                              </div>
                            )}
                          </div>

                          {isHovered && (
                            <div
                              className="absolute z-20 bg-gray-900 text-white text-xs rounded px-3 py-2 shadow-xl whitespace-nowrap pointer-events-none"
                              style={{
                                left: `${position.left}%`,
                                top: '-70px',
                                transform: 'translateX(-50%)',
                              }}
                            >
                              <div className="font-semibold mb-1">{item.title}</div>
                              <div className="text-gray-300">
                                {item.startDate.toLocaleDateString('de-DE')}
                                {item.endDate && item.endDate.getTime() !== item.startDate.getTime() &&
                                  ` - ${item.endDate.toLocaleDateString('de-DE')}`
                                }
                              </div>
                              {itemConflicts.length > 0 && (
                                <div className="text-amber-300 text-xs mt-1">
                                  {itemConflicts[0].message}
                                </div>
                              )}
                              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 text-xs text-gray-600 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-rose-500 rounded-full" />
          <span>Heute</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-rose-500 transform rotate-45" />
          <span>Hochzeitstag</span>
        </div>
        <div className="flex items-center gap-2">
          <XCircle className="w-4 h-4 text-rose-500" />
          <span>Überschneidung</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span>Unmöglich</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>Warnung</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs italic">Drag & Drop zum Verschieben (rastet auf Tage)</span>
        </div>
      </div>
    </div>
  );
}
