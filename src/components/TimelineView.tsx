import { useState, useMemo } from 'react';
import { CheckCircle2, Circle, AlertCircle, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { Task } from '../lib/storage-adapter';
import { taskCategories } from './taskTemplates';

interface TimelineViewProps {
  tasks: Task[];
  weddingDate: string;
  onToggleTask: (task: Task) => void;
  onEditTask: (task: Task) => void;
  getBlockedTasks: (task: Task) => string[];
}

type ZoomLevel = 'year' | 'sixMonths' | 'threeMonths';

export default function TimelineView({
  tasks,
  weddingDate,
  onToggleTask,
  onEditTask,
  getBlockedTasks,
}: TimelineViewProps) {
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>('year');
  const [hoveredTask, setHoveredTask] = useState<string | null>(null);

  const weddingDateObj = new Date(weddingDate + 'T12:00:00');
  const today = new Date();

  const { startDate, endDate, totalDays } = useMemo(() => {
    const earliestTask = tasks.reduce((earliest, task) => {
      if (!task.start_date) return earliest;
      const taskDate = new Date(task.start_date);
      return !earliest || taskDate < earliest ? taskDate : earliest;
    }, null as Date | null);

    let start = earliestTask || new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);
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
  }, [tasks, weddingDateObj, today, zoomLevel]);

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

  const getTaskPosition = (task: Task) => {
    if (!task.start_date || !task.due_date) return null;

    const taskStart = new Date(task.start_date);
    const taskEnd = new Date(task.due_date);

    const startPercent = ((taskStart.getTime() - startDate.getTime()) / (totalDays * 24 * 60 * 60 * 1000)) * 100;
    const durationPercent = ((taskEnd.getTime() - taskStart.getTime()) / (totalDays * 24 * 60 * 60 * 1000)) * 100;

    return {
      left: Math.max(0, Math.min(100, startPercent)),
      width: Math.max(1, Math.min(100 - startPercent, durationPercent))
    };
  };

  const getCategoryColor = (category: string) => {
    const cat = taskCategories.find(c => c.id === category);
    return cat?.color || 'bg-gray-500';
  };

  const groupedTasks = useMemo(() => {
    const groups = new Map<string, Task[]>();

    tasks
      .filter(t => t.start_date && t.due_date)
      .sort((a, b) => {
        if (!a.due_date || !b.due_date) return 0;
        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
      })
      .forEach(task => {
        const category = task.category;
        if (!groups.has(category)) {
          groups.set(category, []);
        }
        groups.get(category)!.push(task);
      });

    return groups;
  }, [tasks]);

  const weddingPercent = ((weddingDateObj.getTime() - startDate.getTime()) / (totalDays * 24 * 60 * 60 * 1000)) * 100;

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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium" style={{ color: '#666' }}>
          Zeitraum: {startDate.toLocaleDateString('de-DE')} - {endDate.toLocaleDateString('de-DE')}
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

        <div className="relative" style={{ minHeight: '400px' }}>
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-rose-500 z-20"
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
                className="absolute top-0 bottom-0 w-px bg-gray-200"
                style={{ left: `${percent}%` }}
              />
            );
          })}

          <div className="p-4 space-y-6">
            {Array.from(groupedTasks.entries()).map(([category, categoryTasks]) => {
              const categoryInfo = taskCategories.find(c => c.id === category);

              return (
                <div key={category} className="space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-8 h-8 rounded ${getCategoryColor(category)} flex items-center justify-center text-white text-sm`}>
                      {categoryInfo?.icon || '📋'}
                    </div>
                    <h4 className="text-sm font-bold" style={{ color: '#3b3b3d' }}>
                      {categoryInfo?.label || category}
                    </h4>
                    <span className="text-xs text-gray-500">
                      ({categoryTasks.filter(t => t.completed).length}/{categoryTasks.length})
                    </span>
                  </div>

                  <div className="space-y-2">
                    {categoryTasks.map(task => {
                      const position = getTaskPosition(task);
                      if (!position) return null;

                      const blockedBy = getBlockedTasks(task);
                      const isBlocked = blockedBy.length > 0;
                      const isOverdue = task.due_date && new Date(task.due_date) < new Date() && !task.completed;
                      const isHovered = hoveredTask === task.id;

                      return (
                        <div
                          key={task.id}
                          className="relative group"
                          onMouseEnter={() => setHoveredTask(task.id)}
                          onMouseLeave={() => setHoveredTask(null)}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <button
                              onClick={() => onToggleTask(task)}
                              className="flex-shrink-0"
                            >
                              {task.completed ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              ) : (
                                <Circle className="w-4 h-4 text-gray-400 hover:text-emerald-500 transition-colors" />
                              )}
                            </button>
                            <span
                              className={`text-xs ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'} ${isOverdue ? 'text-rose-600 font-semibold' : ''}`}
                              style={{ fontFamily: 'Open Sans, sans-serif' }}
                            >
                              {task.title}
                            </span>
                            {isBlocked && !task.completed && (
                              <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                            )}
                            {task.priority === 'high' && !task.completed && (
                              <span className="text-xs text-rose-600">⚡</span>
                            )}
                          </div>

                          <div className="relative h-8 bg-gray-100 rounded-md overflow-visible">
                            <button
                              onClick={() => onEditTask(task)}
                              className="absolute h-full rounded-md transition-all cursor-pointer hover:opacity-100 hover:shadow-lg"
                              style={{
                                left: `${position.left}%`,
                                width: `${position.width}%`,
                                backgroundColor: getColorHex(getCategoryColor(task.category)),
                                opacity: task.completed ? 0.4 : 0.85,
                                border: isHovered ? '2px solid #3b3b3d' : 'none',
                                zIndex: isHovered ? 10 : 1,
                              }}
                            >
                              {position.width > 5 && (
                                <div className="px-2 py-1 text-xs text-white truncate font-medium">
                                  {task.is_system_generated ? '🤖' : '💍'}
                                </div>
                              )}
                            </button>

                            {isHovered && task.due_date && (
                              <div
                                className="absolute z-20 bg-gray-900 text-white text-xs rounded px-3 py-2 shadow-xl whitespace-nowrap pointer-events-none"
                                style={{
                                  left: `${position.left}%`,
                                  top: '-60px',
                                  transform: 'translateX(-50%)',
                                }}
                              >
                                <div className="font-semibold mb-1">{task.title}</div>
                                <div className="text-gray-300">
                                  {new Date(task.start_date!).toLocaleDateString('de-DE')} - {new Date(task.due_date).toLocaleDateString('de-DE')}
                                </div>
                                {task.description && (
                                  <div className="text-gray-400 text-xs mt-1 max-w-xs truncate">
                                    {task.description}
                                  </div>
                                )}
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
                                </div>
                              </div>
                            )}
                          </div>

                          {isBlocked && !task.completed && (
                            <div className="mt-1 text-xs text-amber-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                              ⏳ Wartet auf: {blockedBy.join(', ')}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-rose-500 rounded-full" />
          <span>Heute</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-rose-500 transform rotate-45" />
          <span>Hochzeitstag</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🤖</span>
          <span>Empfehlung</span>
        </div>
        <div className="flex items-center gap-2">
          <span>💍</span>
          <span>Manuell</span>
        </div>
        <div className="flex items-center gap-2">
          <span>⚡</span>
          <span>Hohe Priorität</span>
        </div>
      </div>
    </div>
  );
}
