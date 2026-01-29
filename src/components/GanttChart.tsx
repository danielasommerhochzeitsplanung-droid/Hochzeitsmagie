import { useState, useMemo, useCallback } from 'react';
import {
  CheckCircle2,
  Circle,
  Calendar,
  MapPin,
  Users,
  Briefcase,
  ChevronDown,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { Task, Event, Vendor, Location, SupportTeam } from '../lib/storage-adapter';
import { taskCategories } from './taskTemplates';

interface GanttChartProps {
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
}

type ZoomLevel = 'day' | 'week' | 'month';
type ItemType = 'event' | 'task' | 'vendor' | 'location' | 'support';

interface GanttItem {
  id: string;
  type: ItemType;
  title: string;
  startDate: Date;
  endDate: Date;
  category?: string;
  completed?: boolean;
  priority?: string;
  data: Task | Event | Vendor | Location | SupportTeam;
}

interface GanttGroup {
  id: string;
  title: string;
  type: ItemType;
  icon: JSX.Element;
  color: string;
  items: GanttItem[];
  collapsed: boolean;
}

export default function GanttChart({
  tasks,
  events,
  vendors,
  locations,
  supportTeam,
  weddingDate,
  onToggleTask,
  onUpdateTask,
  onUpdateEvent,
}: GanttChartProps) {
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>('month');
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<GanttItem | null>(null);
  const [resizingItem, setResizingItem] = useState<{ item: GanttItem; side: 'left' | 'right' } | null>(null);

  const weddingDateObj = new Date(weddingDate + 'T12:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const ganttItems = useMemo((): GanttItem[] => {
    const items: GanttItem[] = [];

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

    vendors.forEach(vendor => {
      if (vendor.first_contact_date) {
        const date = new Date(vendor.first_contact_date);
        items.push({
          id: `${vendor.id}-first`,
          type: 'vendor',
          title: `${vendor.name} - Erstkontakt`,
          startDate: date,
          endDate: date,
          data: vendor,
        });
      }
      if (vendor.next_appointment) {
        const date = new Date(vendor.next_appointment);
        items.push({
          id: `${vendor.id}-next`,
          type: 'vendor',
          title: `${vendor.name} - Termin`,
          startDate: date,
          endDate: date,
          data: vendor,
        });
      }
    });

    locations.forEach(location => {
      if (location.viewing_date) {
        const date = new Date(location.viewing_date);
        items.push({
          id: `${location.id}-viewing`,
          type: 'location',
          title: `${location.name} - Besichtigung`,
          startDate: date,
          endDate: date,
          data: location,
        });
      }
    });

    supportTeam.forEach(member => {
      if (member.briefing_date) {
        const date = new Date(member.briefing_date);
        items.push({
          id: `${member.id}-briefing`,
          type: 'support',
          title: `${member.name} - Briefing`,
          startDate: date,
          endDate: date,
          data: member,
        });
      }
    });

    return items.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  }, [events, tasks, vendors, locations, supportTeam]);

  const ganttGroups = useMemo((): GanttGroup[] => {
    const groups: GanttGroup[] = [
      {
        id: 'events',
        title: 'Events',
        type: 'event',
        icon: <Calendar className="w-4 h-4" />,
        color: '#d6b15b',
        items: ganttItems.filter(item => item.type === 'event'),
        collapsed: collapsedGroups.has('events'),
      },
      {
        id: 'tasks',
        title: 'Aufgaben',
        type: 'task',
        icon: <Clock className="w-4 h-4" />,
        color: '#3b82f6',
        items: ganttItems.filter(item => item.type === 'task'),
        collapsed: collapsedGroups.has('tasks'),
      },
      {
        id: 'vendors',
        title: 'Dienstleister',
        type: 'vendor',
        icon: <Briefcase className="w-4 h-4" />,
        color: '#f97316',
        items: ganttItems.filter(item => item.type === 'vendor'),
        collapsed: collapsedGroups.has('vendors'),
      },
      {
        id: 'locations',
        title: 'Locations',
        type: 'location',
        icon: <MapPin className="w-4 h-4" />,
        color: '#06b6d4',
        items: ganttItems.filter(item => item.type === 'location'),
        collapsed: collapsedGroups.has('locations'),
      },
      {
        id: 'support',
        title: 'Support Team',
        type: 'support',
        icon: <Users className="w-4 h-4" />,
        color: '#10b981',
        items: ganttItems.filter(item => item.type === 'support'),
        collapsed: collapsedGroups.has('support'),
      },
    ];

    return groups.filter(g => g.items.length > 0);
  }, [ganttItems, collapsedGroups]);

  const { startDate, endDate, timeUnits } = useMemo(() => {
    const earliestItem = ganttItems.reduce((earliest, item) => {
      return !earliest || item.startDate < earliest ? item.startDate : earliest;
    }, null as Date | null);

    let start = earliestItem || new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    let end = new Date(weddingDateObj);
    end.setMonth(end.getMonth() + 1);
    end.setDate(0);
    end.setHours(23, 59, 59, 999);

    const units: { date: Date; label: string; type: 'month' | 'week' | 'day' }[] = [];
    const current = new Date(start);

    if (zoomLevel === 'month') {
      while (current <= end) {
        units.push({
          date: new Date(current),
          label: current.toLocaleDateString('de-DE', { month: 'short', year: '2-digit' }),
          type: 'month',
        });
        current.setMonth(current.getMonth() + 1);
      }
    } else if (zoomLevel === 'week') {
      while (current <= end) {
        units.push({
          date: new Date(current),
          label: `KW ${getWeekNumber(current)}`,
          type: 'week',
        });
        current.setDate(current.getDate() + 7);
      }
    } else {
      while (current <= end) {
        units.push({
          date: new Date(current),
          label: current.getDate().toString(),
          type: 'day',
        });
        current.setDate(current.getDate() + 1);
      }
    }

    return { startDate: start, endDate: end, timeUnits: units };
  }, [ganttItems, weddingDateObj, today, zoomLevel]);

  const getWeekNumber = (date: Date): number => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  };

  const getItemPosition = (item: GanttItem) => {
    const totalMillis = endDate.getTime() - startDate.getTime();
    const startMillis = item.startDate.getTime() - startDate.getTime();
    const durationMillis = item.endDate.getTime() - item.startDate.getTime();

    const left = Math.max(0, (startMillis / totalMillis) * 100);
    const width = Math.max(0.3, (durationMillis / totalMillis) * 100);

    return { left, width };
  };

  const toggleGroup = (groupId: string) => {
    setCollapsedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  };

  const handleDragStart = (item: GanttItem, e: React.MouseEvent) => {
    e.preventDefault();
    setDraggedItem(item);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const timelineEl = document.getElementById('gantt-timeline');
      if (!timelineEl || !draggedItem) return;

      const rect = timelineEl.getBoundingClientRect();
      const x = moveEvent.clientX - rect.left;
      const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));

      const totalMillis = endDate.getTime() - startDate.getTime();
      const newStartMillis = startDate.getTime() + (percent / 100) * totalMillis;
      const newStartDate = new Date(newStartMillis);
      newStartDate.setHours(0, 0, 0, 0);

      const duration = item.endDate.getTime() - item.startDate.getTime();
      const newEndDate = new Date(newStartDate.getTime() + duration);

      item.startDate = newStartDate;
      item.endDate = newEndDate;
    };

    const handleMouseUp = () => {
      if (draggedItem) {
        const formattedStart = draggedItem.startDate.toISOString().split('T')[0];
        const formattedEnd = draggedItem.endDate.toISOString().split('T')[0];

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
      }

      setDraggedItem(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleResizeStart = (item: GanttItem, side: 'left' | 'right', e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setResizingItem({ item, side });

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const timelineEl = document.getElementById('gantt-timeline');
      if (!timelineEl || !resizingItem) return;

      const rect = timelineEl.getBoundingClientRect();
      const x = moveEvent.clientX - rect.left;
      const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));

      const totalMillis = endDate.getTime() - startDate.getTime();
      const newMillis = startDate.getTime() + (percent / 100) * totalMillis;
      const newDate = new Date(newMillis);
      newDate.setHours(0, 0, 0, 0);

      if (side === 'left') {
        if (newDate < item.endDate) {
          item.startDate = newDate;
        }
      } else {
        if (newDate > item.startDate) {
          item.endDate = newDate;
        }
      }
    };

    const handleMouseUp = () => {
      if (resizingItem) {
        const { item } = resizingItem;
        const formattedStart = item.startDate.toISOString().split('T')[0];
        const formattedEnd = item.endDate.toISOString().split('T')[0];

        if (item.type === 'task') {
          onUpdateTask(item.id, {
            start_date: formattedStart,
            due_date: formattedEnd,
          });
        }
      }

      setResizingItem(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const todayPercent = ((today.getTime() - startDate.getTime()) / (endDate.getTime() - startDate.getTime())) * 100;
  const weddingPercent = ((weddingDateObj.getTime() - startDate.getTime()) / (endDate.getTime() - startDate.getTime())) * 100;

  const isOverdue = (item: GanttItem): boolean => {
    return item.type === 'task' && !item.completed && item.endDate < today;
  };

  const getItemColor = (item: GanttItem): string => {
    if (item.type === 'task') {
      const cat = taskCategories.find(c => c.id === item.category);
      return cat ? getColorHex(cat.color) : '#6b7280';
    }
    const group = ganttGroups.find(g => g.type === item.type);
    return group?.color || '#6b7280';
  };

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

  const rowHeight = 40;
  const leftColumnWidth = 300;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-600">
          Gantt-Ansicht: {startDate.toLocaleDateString('de-DE')} - {endDate.toLocaleDateString('de-DE')}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-600">Zoom:</span>
          <div className="flex rounded-lg overflow-hidden border-2" style={{ borderColor: '#d6b15b' }}>
            <button
              onClick={() => setZoomLevel('day')}
              className={`px-3 py-1.5 text-xs font-medium transition-all flex items-center gap-1 ${
                zoomLevel === 'day'
                  ? 'text-white'
                  : 'text-gray-700 bg-white hover:bg-gray-50'
              }`}
              style={zoomLevel === 'day' ? { backgroundColor: '#d6b15b' } : {}}
            >
              <ZoomIn className="w-3 h-3" />
              Tag
            </button>
            <button
              onClick={() => setZoomLevel('week')}
              className={`px-3 py-1.5 text-xs font-medium transition-all flex items-center gap-1 ${
                zoomLevel === 'week'
                  ? 'text-white'
                  : 'text-gray-700 bg-white hover:bg-gray-50'
              }`}
              style={zoomLevel === 'week' ? { backgroundColor: '#d6b15b' } : {}}
            >
              <ZoomOut className="w-3 h-3" />
              Woche
            </button>
            <button
              onClick={() => setZoomLevel('month')}
              className={`px-3 py-1.5 text-xs font-medium transition-all flex items-center gap-1 ${
                zoomLevel === 'month'
                  ? 'text-white'
                  : 'text-gray-700 bg-white hover:bg-gray-50'
              }`}
              style={zoomLevel === 'month' ? { backgroundColor: '#d6b15b' } : {}}
            >
              <Maximize2 className="w-3 h-3" />
              Monat
            </button>
          </div>
        </div>
      </div>

      <div className="border-2 rounded-lg overflow-hidden bg-white" style={{ borderColor: '#d6b15b' }}>
        <div className="flex" style={{ height: '50px' }}>
          <div
            className="flex-shrink-0 bg-gray-100 border-r-2 flex items-center justify-center font-semibold text-sm text-gray-700"
            style={{ width: `${leftColumnWidth}px`, borderColor: '#d6b15b' }}
          >
            Kategorien
          </div>
          <div className="flex-1 bg-gray-100 border-b-2 overflow-x-auto" style={{ borderColor: '#d6b15b' }}>
            <div className="flex h-full" style={{ minWidth: '100%' }}>
              {timeUnits.map((unit, idx) => (
                <div
                  key={idx}
                  className="flex-1 border-r border-gray-300 flex items-center justify-center text-xs font-medium text-gray-600 px-2"
                  style={{ minWidth: zoomLevel === 'day' ? '40px' : zoomLevel === 'week' ? '80px' : '100px' }}
                >
                  {unit.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          {ganttGroups.map((group, groupIdx) => (
            <div key={group.id}>
              <div
                className="flex border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                style={{ height: `${rowHeight}px` }}
                onClick={() => toggleGroup(group.id)}
              >
                <div
                  className="flex-shrink-0 border-r-2 flex items-center gap-2 px-3"
                  style={{ width: `${leftColumnWidth}px`, borderColor: '#e5e5e5' }}
                >
                  {group.collapsed ? (
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center text-white"
                    style={{ backgroundColor: group.color }}
                  >
                    {group.icon}
                  </div>
                  <span className="font-semibold text-sm text-gray-800">
                    {group.title}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({group.items.length})
                  </span>
                </div>
                <div className="flex-1 relative" id="gantt-timeline">
                  {todayPercent >= 0 && todayPercent <= 100 && (
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10 pointer-events-none"
                      style={{ left: `${todayPercent}%` }}
                    />
                  )}
                  {weddingPercent >= 0 && weddingPercent <= 100 && (
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-rose-600 z-10 pointer-events-none"
                      style={{ left: `${weddingPercent}%` }}
                    />
                  )}
                </div>
              </div>

              {!group.collapsed && group.items.map((item, itemIdx) => {
                const position = getItemPosition(item);
                const isHovered = hoveredItem === item.id;
                const overdue = isOverdue(item);

                return (
                  <div
                    key={item.id}
                    className="flex border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    style={{ height: `${rowHeight}px` }}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div
                      className="flex-shrink-0 border-r-2 flex items-center gap-2 px-3 pl-10"
                      style={{ width: `${leftColumnWidth}px`, borderColor: '#e5e5e5' }}
                    >
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
                        className={`text-xs truncate flex-1 ${
                          item.completed ? 'line-through text-gray-400' : 'text-gray-700'
                        }`}
                      >
                        {item.title}
                      </span>
                      {overdue && (
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      )}
                    </div>

                    <div className="flex-1 relative" id="gantt-timeline">
                      {todayPercent >= 0 && todayPercent <= 100 && (
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10 pointer-events-none"
                          style={{ left: `${todayPercent}%` }}
                        />
                      )}
                      {weddingPercent >= 0 && weddingPercent <= 100 && (
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-rose-600 z-10 pointer-events-none"
                          style={{ left: `${weddingPercent}%` }}
                        />
                      )}

                      <div
                        className="absolute top-1/2 -translate-y-1/2 rounded cursor-move flex items-center px-2 group/bar"
                        style={{
                          left: `${position.left}%`,
                          width: `${position.width}%`,
                          height: '24px',
                          backgroundColor: getItemColor(item),
                          opacity: item.completed ? 0.5 : overdue ? 0.9 : 0.85,
                          border: isHovered ? '2px solid #3b3b3d' : overdue ? '2px solid #dc2626' : 'none',
                          boxShadow: isHovered ? '0 4px 6px rgba(0,0,0,0.2)' : 'none',
                        }}
                        onMouseDown={(e) => handleDragStart(item, e)}
                      >
                        {(item.type === 'task' || item.type === 'event') && (
                          <>
                            <div
                              className="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-black/20"
                              onMouseDown={(e) => handleResizeStart(item, 'left', e)}
                            />
                            <div
                              className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-black/20"
                              onMouseDown={(e) => handleResizeStart(item, 'right', e)}
                            />
                          </>
                        )}
                        {position.width > 5 && (
                          <span className="text-xs text-white font-medium truncate">
                            {item.title}
                          </span>
                        )}
                      </div>

                      {isHovered && (
                        <div
                          className="absolute z-20 bg-gray-900 text-white text-xs rounded px-3 py-2 shadow-xl whitespace-nowrap pointer-events-none"
                          style={{
                            left: `${position.left + position.width / 2}%`,
                            top: '-60px',
                            transform: 'translateX(-50%)',
                          }}
                        >
                          <div className="font-semibold mb-1">{item.title}</div>
                          <div className="text-gray-300">
                            {item.startDate.toLocaleDateString('de-DE')}
                            {item.endDate.getTime() !== item.startDate.getTime() &&
                              ` - ${item.endDate.toLocaleDateString('de-DE')}`
                            }
                          </div>
                          {overdue && (
                            <div className="text-red-400 text-xs mt-1">
                              Überfällig
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6 text-xs text-gray-600 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span>Heute</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-rose-600 rounded-full" />
          <span>Hochzeitstag</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <span>Überfällig</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs italic">
            Drag & Drop zum Verschieben • Ränder ziehen für Dauer • Klick auf Gruppe zum Ein-/Ausklappen
          </span>
        </div>
      </div>
    </div>
  );
}
