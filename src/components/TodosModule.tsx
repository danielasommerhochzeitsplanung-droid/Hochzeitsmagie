import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Circle, Calendar, AlertCircle, Plus, Filter, X, RefreshCw, Edit2, ChevronDown, ChevronRight, Lock } from 'lucide-react';
import { useWeddingData } from '../contexts/WeddingDataContext';
import { Task, Phase } from '../lib/storage-adapter';
import { taskCategories, standardTasks, TaskTemplate } from './taskTemplates';
import TimelineView from './TimelineView';
import GanttChart from './GanttChart';
import { getPhaseColor } from '../utils/phaseManagement';

const mainCategories = [
  {
    id: 'location_venue',
    icon: '🏛️',
    color: 'bg-emerald-500',
    subcategories: ['location']
  },
  {
    id: 'ceremony_legal',
    icon: '💒',
    color: 'bg-rose-500',
    subcategories: ['planning']
  },
  {
    id: 'vendors_services',
    icon: '🤝',
    color: 'bg-blue-500',
    subcategories: ['catering', 'planning']
  },
  {
    id: 'guests_communication',
    icon: '👥',
    color: 'bg-amber-500',
    subcategories: ['guests']
  },
  {
    id: 'styling_atmosphere',
    icon: '🎨',
    color: 'bg-cyan-500',
    subcategories: ['decoration']
  },
  {
    id: 'organization_closure',
    icon: '📋',
    color: 'bg-purple-500',
    subcategories: []
  },
];

const categoryToMainCategory = (category: string): string => {
  const categoryLower = category.toLowerCase();

  if (categoryLower === 'location' || categoryLower === 'location_venue') return 'location_venue';
  if (categoryLower === 'guests' || categoryLower === 'guests_communication') return 'guests_communication';
  if (categoryLower === 'catering' || categoryLower === 'vendors_services') return 'vendors_services';
  if (categoryLower === 'decoration' || categoryLower === 'styling_atmosphere') return 'styling_atmosphere';
  if (categoryLower === 'planning' || categoryLower === 'ceremony_legal' || categoryLower === 'trauung_formalitaeten') return 'ceremony_legal';
  if (categoryLower === 'organization_closure') return 'organization_closure';

  return 'organization_closure';
};

export default function TodosModule() {
  const { t } = useTranslation();
  const { weddingData, tasks, phases, events, vendors, locations, supportTeam, addTask, updateTask, updateEvent, deleteTask, initializeAutoTasks, dismissTaskWarning, updateWeddingData, addPhase } = useWeddingData();
  const [showGenerateDialog, setShowGenerateDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showRecalculateDialog, setShowRecalculateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [view, setView] = useState<'list' | 'timeline' | 'gantt'>('list');
  const [isMobile, setIsMobile] = useState(false);
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  const [expandedMainCategories, setExpandedMainCategories] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set());
  const [showArchived, setShowArchived] = useState(false);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'organization_closure',
    due_date: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleEnableAutoTasks = async () => {
    await initializeAutoTasks();
  };

  const handleSkipAutoTasks = async () => {
    await updateWeddingData({ auto_tasks_initialized: true });
  };

  const generateStandardTasks = () => {
    if (!weddingData?.wedding_date) return;

    const weddingDate = new Date(weddingData.wedding_date + 'T12:00:00');
    const today = new Date();
    const planningStart = weddingData.planning_start_date
      ? new Date(weddingData.planning_start_date + 'T12:00:00')
      : today;

    const totalDays = Math.ceil((weddingDate.getTime() - planningStart.getTime()) / (1000 * 60 * 60 * 24));

    if (totalDays <= 0) {
      alert(t('todos.alerts.planningBeforeWedding'));
      return;
    }

    const sortedTemplates = [...standardTasks].sort((a, b) => b.weeks_before_wedding - a.weeks_before_wedding);

    const maxWeeks = sortedTemplates[0].weeks_before_wedding;
    const minWeeks = sortedTemplates[sortedTemplates.length - 1].weeks_before_wedding;

    const taskIdMap = new Map<string, string>();

    sortedTemplates.forEach((template: TaskTemplate, index: number) => {
      const normalizedPosition = (template.weeks_before_wedding - minWeeks) / (maxWeeks - minWeeks);

      const daysFromStart = Math.round(totalDays * (1 - normalizedPosition));

      const dueDate = new Date(planningStart);
      dueDate.setDate(dueDate.getDate() + daysFromStart);

      if (dueDate > weddingDate) {
        dueDate.setTime(weddingDate.getTime());
      }

      const startDate = new Date(dueDate);
      startDate.setDate(startDate.getDate() - 7);

      if (startDate < planningStart) {
        startDate.setTime(planningStart.getTime());
      }

      const task = addTask({
        title: template.title,
        description: template.description,
        category: template.category,
        start_date: startDate.toISOString().split('T')[0],
        due_date: dueDate.toISOString().split('T')[0],
        completed: false,
        priority: template.priority,
        depends_on: [],
        is_system_generated: template.isAutoGenerated,
      });

      taskIdMap.set(template.category, task.id);
    });

    setShowGenerateDialog(false);
  };

  const recalculateAutoTaskDates = () => {
    if (!weddingData?.wedding_date) {
      alert(t('todos.alerts.setWeddingDate'));
      return;
    }

    const weddingDate = new Date(weddingData.wedding_date + 'T12:00:00');
    const planningStart = weddingData.planning_start_date
      ? new Date(weddingData.planning_start_date + 'T12:00:00')
      : new Date();

    const totalDays = Math.ceil((weddingDate.getTime() - planningStart.getTime()) / (1000 * 60 * 60 * 24));

    if (totalDays <= 0) {
      alert(t('todos.alerts.planningBeforeWedding'));
      return;
    }

    const sortedTemplates = [...standardTasks].sort((a, b) => b.weeks_before_wedding - a.weeks_before_wedding);
    const maxWeeks = sortedTemplates[0].weeks_before_wedding;
    const minWeeks = sortedTemplates[sortedTemplates.length - 1].weeks_before_wedding;

    const autoTasks = tasks.filter(task => task.is_system_generated && !task.completed);

    autoTasks.forEach(task => {
      const template = standardTasks.find(t => t.title === task.title);
      if (!template) return;

      const normalizedPosition = (template.weeks_before_wedding - minWeeks) / (maxWeeks - minWeeks);
      const daysFromStart = Math.round(totalDays * (1 - normalizedPosition));

      const dueDate = new Date(planningStart);
      dueDate.setDate(dueDate.getDate() + daysFromStart);

      if (dueDate > weddingDate) {
        dueDate.setTime(weddingDate.getTime());
      }

      const startDate = new Date(dueDate);
      startDate.setDate(startDate.getDate() - 7);

      if (startDate < planningStart) {
        startDate.setTime(planningStart.getTime());
      }

      if (task.manually_modified) {
        updateTask(task.id, {
          date_change_notice: '⚠️ Durch die Änderung des Hochzeitsdatums hat sich das optimale Zeitfenster geändert. Bitte überprüfe die Deadline.',
          completed: false,
        });
      } else {
        deleteTask(task.id);
        addTask({
          title: template.title,
          description: template.description,
          category: template.category,
          start_date: startDate.toISOString().split('T')[0],
          due_date: dueDate.toISOString().split('T')[0],
          completed: false,
          priority: template.priority,
          depends_on: [],
          is_system_generated: template.isAutoGenerated,
        });
      }
    });

    setShowRecalculateDialog(false);
  };

  // DEBUG: Temporarily disabled for testing
  // const filteredTasks = useMemo(() => {
  //   return tasks.filter(task => {
  //     if (filterCategory !== 'all' && task.category !== filterCategory) return false;
  //     if (filterStatus === 'completed' && !task.completed) return false;
  //     if (filterStatus === 'active' && task.completed) return false;
  //     return true;
  //   });
  // }, [tasks, filterCategory, filterStatus]);

  // const sortedTasks = useMemo(() => {
  //   return [...filteredTasks].sort((a, b) => {
  //     if (!a.due_date || !b.due_date) return 0;
  //     return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
  //   });
  // }, [filteredTasks]);

  // const groupedTasks = useMemo(() => {
  //   const groups = new Map<string, Task[]>();
  //   sortedTasks.forEach(task => {
  //     const category = task.category;
  //     if (!groups.has(category)) {
  //       groups.set(category, []);
  //     }
  //     groups.get(category)!.push(task);
  //   });
  //   return groups;
  // }, [sortedTasks]);

  // const groupedByPhase = useMemo(() => {
  //   const categoryGroups = new Map<string, Map<string, Task[]>>();

  //   groupedTasks.forEach((categoryTasks, category) => {
  //     const phaseGroups = new Map<string, Task[]>();
  //     const sortedPhases = [...phases].sort((a, b) => a.order_index - b.order_index);

  //     sortedPhases.forEach(phase => {
  //       phaseGroups.set(phase.id, []);
  //     });
  //     phaseGroups.set('no-phase', []);

  //     categoryTasks.forEach(task => {
  //       const phaseId = task.phase_id || 'no-phase';
  //       if (!phaseGroups.has(phaseId)) {
  //         phaseGroups.set(phaseId, []);
  //       }
  //       phaseGroups.get(phaseId)!.push(task);
  //     });

  //     categoryGroups.set(category, phaseGroups);
  //   });

  //   return categoryGroups;
  // }, [groupedTasks, phases]);

  // DEBUG: Temporarily disabled
  // useEffect(() => {
  //   const initialExpanded = new Set<string>();
  //   groupedTasks.forEach((tasks) => {
  //     const firstIncomplete = tasks.find(t => !t.completed);
  //     if (firstIncomplete) {
  //       initialExpanded.add(firstIncomplete.id);
  //     }
  //   });
  //   setExpandedTasks(initialExpanded);
  // }, [groupedTasks.size]);

  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const toggleCategoryExpansion = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const togglePhaseExpansion = (phaseKey: string) => {
    setExpandedPhases(prev => {
      const newSet = new Set(prev);
      if (newSet.has(phaseKey)) {
        newSet.delete(phaseKey);
      } else {
        newSet.add(phaseKey);
      }
      return newSet;
    });
  };

  const toggleMainCategoryExpansion = (mainCategoryId: string) => {
    setExpandedMainCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(mainCategoryId)) {
        newSet.delete(mainCategoryId);
      } else {
        newSet.add(mainCategoryId);
      }
      return newSet;
    });
  };

  const groupedByMainCategory = useMemo(() => {
    const groups = new Map<string, Task[]>();

    mainCategories.forEach(mainCat => {
      groups.set(mainCat.id, []);
    });

    tasks.filter(task => (task.archived || false) === showArchived).forEach(task => {
      const mainCategoryId = categoryToMainCategory(task.category);
      if (!groups.has(mainCategoryId)) {
        groups.set(mainCategoryId, []);
      }
      groups.get(mainCategoryId)!.push(task);
    });

    return groups;
  }, [tasks, showArchived]);

  const completionStats = useMemo(() => {
    const activeTasks = tasks.filter(t => !t.archived);
    const total = activeTasks.length;
    const completed = activeTasks.filter(t => t.completed).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, percentage };
  }, [tasks]);

  const toggleTaskCompletion = (task: Task) => {
    updateTask(task.id, {
      completed: !task.completed,
      completed_at: !task.completed ? new Date().toISOString() : undefined,
    });
  };

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;

    addTask({
      title: newTask.title,
      description: newTask.description,
      category: newTask.category,
      due_date: newTask.due_date || undefined,
      completed: false,
      priority: newTask.priority,
      is_system_generated: false,
      archived: false,
    });

    setNewTask({
      title: '',
      description: '',
      category: 'organization_closure',
      due_date: '',
      priority: 'medium',
    });
    setShowAddDialog(false);
  };

  const handleArchiveTask = (taskId: string) => {
    updateTask(taskId, { archived: true });
  };

  const handleRestoreTask = (taskId: string) => {
    updateTask(taskId, { archived: false });
  };

  const handleDeletePermanently = (taskId: string) => {
    if (window.confirm(t('todos.confirmDeletePermanently'))) {
      deleteTask(taskId);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    if (!editingTask) return;

    const originalTask = tasks.find(t => t.id === editingTask.id);
    const template = standardTasks.find(t => t.title === originalTask?.title);

    const isModified = editingTask.is_system_generated && originalTask && (
      template?.title !== editingTask.title ||
      template?.description !== editingTask.description ||
      originalTask.due_date !== editingTask.due_date
    );

    updateTask(editingTask.id, {
      title: editingTask.title,
      description: editingTask.description,
      category: editingTask.category,
      due_date: editingTask.due_date,
      priority: editingTask.priority,
      manually_modified: isModified || editingTask.manually_modified,
      date_change_notice: undefined,
    });

    setEditingTask(null);
    setShowEditDialog(false);
  };

  const dismissDateChangeNotice = (taskId: string) => {
    updateTask(taskId, { date_change_notice: undefined });
  };

  const getBlockedTasks = (task: Task): string[] => {
    if (!task.depends_on || task.depends_on.length === 0) return [];

    return task.depends_on
      .map(depId => tasks.find(t => t.id === depId))
      .filter(t => t && !t.completed)
      .map(t => t!.title);
  };

  const getCategoryColor = (category: string) => {
    const cat = taskCategories.find(c => c.id === category);
    return cat?.color || 'bg-gray-500';
  };

  const showAutoTaskBanner = tasks.length === 0 && weddingData?.wedding_date && !weddingData?.auto_tasks_initialized;

  return (
    <div className="space-y-6">
      {showAutoTaskBanner && (
        <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                {t('todos.banner.title')}
              </h3>
              <p className="text-blue-800 mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                {t('todos.banner.description', { date: new Date(weddingData.wedding_date).toLocaleDateString('de-DE') })}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleEnableAutoTasks}
                  className="px-6 py-2 rounded-md transition-all hover:opacity-90 font-semibold"
                  style={{
                    backgroundColor: '#d6b15b',
                    color: 'white',
                    fontFamily: 'Open Sans, sans-serif',
                  }}
                >
                  {t('todos.banner.generateButton')}
                </button>
                <button
                  onClick={handleSkipAutoTasks}
                  className="px-6 py-2 rounded-md border-2 transition-all hover:bg-white font-semibold"
                  style={{
                    borderColor: '#d6b15b',
                    color: '#3b3b3d',
                    fontFamily: 'Open Sans, sans-serif',
                  }}
                >
                  {t('todos.banner.skipButton')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-6">
          <div>
            <div className="text-2xl font-bold" style={{ color: '#3b3b3d' }}>
              {completionStats.completed} / {completionStats.total}
            </div>
            <div className="text-sm" style={{ color: '#666' }}>
              {t('todos.stats.tasksCompleted')}
            </div>
          </div>

          <div className="w-48">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${completionStats.percentage}%` }}
              />
            </div>
            <div className="text-xs mt-1" style={{ color: '#666' }}>
              {completionStats.percentage}% {t('todos.stats.completed')}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowArchived(false)}
              className="px-4 py-1.5 rounded-md transition-all text-sm"
              style={{
                backgroundColor: !showArchived ? '#d6b15b' : 'transparent',
                color: !showArchived ? 'white' : '#666',
                border: !showArchived ? 'none' : '1px solid #e5e5e5',
                fontFamily: 'Open Sans, sans-serif',
                fontWeight: !showArchived ? 600 : 400
              }}
            >
              {t('todos.activeTasks')}
            </button>
            <button
              onClick={() => setShowArchived(true)}
              className="px-4 py-1.5 rounded-md transition-all text-sm"
              style={{
                backgroundColor: showArchived ? '#d6b15b' : 'transparent',
                color: showArchived ? 'white' : '#666',
                border: showArchived ? 'none' : '1px solid #e5e5e5',
                fontFamily: 'Open Sans, sans-serif',
                fontWeight: showArchived ? 600 : 400
              }}
            >
              {t('todos.archivedTasks')}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-lg overflow-hidden border-2" style={{ borderColor: '#d6b15b' }}>
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 text-sm font-medium transition-all ${
                view === 'list'
                  ? 'text-white'
                  : 'text-gray-700 bg-white hover:bg-gray-50'
              }`}
              style={view === 'list' ? { backgroundColor: '#d6b15b' } : {}}
            >
              {t('todos.views.list')}
            </button>
            <button
              onClick={() => setView('timeline')}
              className={`px-4 py-2 text-sm font-medium transition-all ${
                view === 'timeline'
                  ? 'text-white'
                  : 'text-gray-700 bg-white hover:bg-gray-50'
              }`}
              style={view === 'timeline' ? { backgroundColor: '#d6b15b' } : {}}
            >
              {t('todos.views.timeline')}
            </button>
            <button
              onClick={() => setView('gantt')}
              className={`px-4 py-2 text-sm font-medium transition-all ${
                view === 'gantt'
                  ? 'text-white'
                  : 'text-gray-700 bg-white hover:bg-gray-50'
              }`}
              style={view === 'gantt' ? { backgroundColor: '#d6b15b' } : {}}
            >
              {t('todos.views.gantt')}
            </button>
          </div>

          <button
            onClick={() => setShowAddDialog(true)}
            className="px-6 py-2 rounded-md transition-all hover:opacity-90 flex items-center gap-2"
            style={{
              backgroundColor: '#d6b15b',
              color: 'white',
              fontFamily: 'Open Sans, sans-serif',
              fontWeight: 600
            }}
          >
            <Plus className="w-4 h-4" />
            {t('todos.buttons.addTask')}
          </button>

          <button
            onClick={() => setShowRecalculateDialog(true)}
            className="px-4 py-2 rounded-md border-2 transition-all hover:bg-gray-50 flex items-center gap-2"
            style={{
              borderColor: '#d6b15b',
              color: '#3b3b3d',
              fontFamily: 'Open Sans, sans-serif',
              fontWeight: 600
            }}
            title={t('todos.recalculateDialog.title')}
          >
            <RefreshCw className="w-4 h-4" />
            {t('todos.buttons.recalculate')}
          </button>
        </div>
      </div>

      {/* DEBUG: Filter UI temporarily disabled */}
      {/* <div className="flex gap-4 items-center flex-wrap">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4" style={{ color: '#666' }} />
          <span className="text-sm font-medium" style={{ color: '#666' }}>
            Filter:
          </span>
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-1.5 rounded-md border-2 text-sm"
          style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
        >
          <option value="all">Alle Kategorien</option>
          {taskCategories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.label}</option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-1.5 rounded-md border-2 text-sm"
          style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
        >
          <option value="all">Alle Status</option>
          <option value="active">Aktiv</option>
          <option value="completed">Erledigt</option>
        </select>

        <div className="flex gap-2 flex-wrap">
          {taskCategories.map(cat => {
            const count = tasks.filter(t => t.category === cat.id).length;
            return (
              <div
                key={cat.id}
                className="flex items-center gap-1 px-2 py-1 rounded text-xs text-white"
                style={{ backgroundColor: cat.color.replace('bg-', '#') }}
              >
                <span className={`w-3 h-3 rounded ${cat.color}`} />
                <span>{cat.label} ({count})</span>
              </div>
            );
          })}
        </div>
      </div> */}

      {(view === 'timeline' || view === 'gantt') && isMobile && (
        <div className="bg-amber-50 border-2 border-amber-500 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-amber-900 mb-1">
              {t('todos.warnings.desktopRecommended')}
            </div>
            <div className="text-sm text-amber-700">
              {t('todos.warnings.desktopDescription', { view: view === 'gantt' ? 'Gantt' : 'Timeline' })}
            </div>
          </div>
        </div>
      )}

      {view === 'timeline' ? (
        weddingData?.wedding_date ? (
          <TimelineView
            tasks={tasks}
            events={events}
            vendors={vendors}
            locations={locations}
            supportTeam={supportTeam}
            weddingDate={weddingData.wedding_date}
            onToggleTask={toggleTaskCompletion}
            onEditTask={handleEditTask}
            onUpdateTask={updateTask}
            onUpdateEvent={updateEvent}
            getBlockedTasks={getBlockedTasks}
          />
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2" style={{ borderColor: '#e5e5e5' }}>
            <Calendar className="w-12 h-12 mx-auto mb-3" style={{ color: '#d6b15b' }} />
            <p className="text-gray-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              {t('todos.emptyStates.noWeddingDate')}
            </p>
          </div>
        )
      ) : view === 'gantt' ? (
        weddingData?.wedding_date ? (
          <GanttChart
            tasks={tasks}
            events={events}
            vendors={vendors}
            locations={locations}
            supportTeam={supportTeam}
            phases={phases}
            weddingDate={weddingData.wedding_date}
            onToggleTask={toggleTaskCompletion}
            onEditTask={handleEditTask}
            onUpdateTask={updateTask}
            onUpdateEvent={updateEvent}
          />
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2" style={{ borderColor: '#e5e5e5' }}>
            <Calendar className="w-12 h-12 mx-auto mb-3" style={{ color: '#d6b15b' }} />
            <p className="text-gray-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              {t('todos.emptyStates.noWeddingDate')}
            </p>
          </div>
        )
      ) : (
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2" style={{ borderColor: '#e5e5e5' }}>
              <Calendar className="w-12 h-12 mx-auto mb-3" style={{ color: '#d6b15b' }} />
              <p className="text-gray-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                {t('todos.emptyStates.noTasks')}
              </p>
            </div>
          ) : (
            mainCategories.map(mainCategory => {
              const mainCategoryTasks = groupedByMainCategory.get(mainCategory.id) || [];

              const completedCount = mainCategoryTasks.filter(t => t.completed).length;
              const isExpanded = expandedMainCategories.has(mainCategory.id);

              return (
                <div
                  key={mainCategory.id}
                  className="bg-white rounded-lg border-2 hover:shadow-md transition-all"
                  style={{ borderColor: '#d6b15b' }}
                >
                  <div
                    className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleMainCategoryExpansion(mainCategory.id)}
                  >
                    <div className="text-3xl flex-shrink-0">
                      {mainCategory.icon}
                    </div>
                    <h3 className="text-lg font-bold flex-1" style={{ color: '#3b3b3d' }}>
                      {t(`todos.categories.${mainCategory.id}`)}
                    </h3>
                    <span className="text-sm font-medium text-gray-500">
                      {completedCount}/{mainCategoryTasks.length}
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </div>

                  {isExpanded && (
                    <div className="border-t-2 divide-y" style={{ borderColor: '#f3f4f6' }}>
                      {mainCategoryTasks.map(task => {
                        const isTaskExpanded = expandedTasks.has(task.id);
                        const blockedBy = getBlockedTasks(task);
                        const isBlocked = blockedBy.length > 0;
                        const isOverdue = task.due_date && new Date(task.due_date) < new Date() && !task.completed;

                        return (
                          <div key={task.id}>
                            <div
                              className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${isBlocked && !task.completed ? 'bg-gray-50 opacity-75' : ''}`}
                              onClick={() => toggleTaskExpansion(task.id)}
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (!isBlocked) {
                                    toggleTaskCompletion(task);
                                  }
                                }}
                                className="flex-shrink-0"
                                disabled={isBlocked && !task.completed}
                                title={isBlocked && !task.completed ? `Warte auf: ${blockedBy.join(', ')}` : ''}
                              >
                                {task.completed ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                ) : isBlocked ? (
                                  <Lock className="w-5 h-5 text-amber-500" />
                                ) : (
                                  <Circle className="w-5 h-5 text-gray-400 hover:text-emerald-500 transition-colors" />
                                )}
                              </button>

                              <h4
                                className={`flex-1 font-medium ${
                                  task.completed
                                    ? 'line-through text-gray-400'
                                    : isBlocked
                                      ? 'text-gray-500'
                                      : 'text-gray-900'
                                }`}
                                style={{ fontFamily: 'Open Sans, sans-serif' }}
                              >
                                {task.title}
                                {isBlocked && !task.completed && (
                                  <span className="ml-2 text-xs text-amber-600">
                                    ({blockedBy.length} {blockedBy.length === 1 ? t('todos.taskDetails.dependency') : t('todos.taskDetails.dependencies')})
                                  </span>
                                )}
                              </h4>

                              {isTaskExpanded ? (
                                <ChevronDown className="w-5 h-5 text-gray-400" />
                              ) : (
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                              )}
                            </div>

                            {isTaskExpanded && (
                              <div className="px-4 pb-4 bg-gray-50">
                                <div className="pt-3 flex items-start justify-between gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      {task.is_system_generated ? (
                                        <>
                                          <span className="text-lg">🤖</span>
                                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-700 font-medium">
                                            {t('todos.taskDetails.recommendation')}
                                          </span>
                                          {task.manually_modified && (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-amber-100 text-amber-700 font-medium">
                                              {t('todos.taskDetails.adjusted')}
                                            </span>
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          <span className="text-lg">💍</span>
                                          {task.needs_adjustment_warning && !task.warning_dismissed && (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-orange-100 text-orange-700 font-medium">
                                              ⚠️ {t('todos.taskDetails.checkDate')}
                                            </span>
                                          )}
                                        </>
                                      )}
                                    </div>

                                    {task.description && (
                                      <p className="text-sm text-gray-600 mt-2">
                                        {task.description}
                                      </p>
                                    )}
                                  </div>

                                  <div className="flex items-center gap-2">
                                    {!showArchived && (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleEditTask(task);
                                        }}
                                        className="text-gray-400 hover:text-blue-500 transition-colors"
                                        title={t('todos.taskDetails.editTask')}
                                      >
                                        <Edit2 className="w-5 h-5" />
                                      </button>
                                    )}
                                    {showArchived ? (
                                      <>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleRestoreTask(task.id);
                                          }}
                                          className="text-gray-400 hover:text-green-500 transition-colors"
                                          title={t('todos.taskDetails.restoreTask')}
                                        >
                                          <RefreshCw className="w-5 h-5" />
                                        </button>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeletePermanently(task.id);
                                          }}
                                          className="text-gray-400 hover:text-rose-500 transition-colors"
                                          title={t('todos.taskDetails.deleteTaskPermanently')}
                                        >
                                          <X className="w-5 h-5" />
                                        </button>
                                      </>
                                    ) : (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleArchiveTask(task.id);
                                        }}
                                        className="text-gray-400 hover:text-amber-500 transition-colors"
                                        title={t('todos.taskDetails.archiveTask')}
                                      >
                                        <X className="w-5 h-5" />
                                      </button>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 flex-wrap mt-3">
                                  <span
                                    className={`inline-flex items-center px-2 py-1 rounded text-xs text-white font-medium ${getCategoryColor(task.category)}`}
                                  >
                                    {t(`todos.categories.${task.category}`)}
                                  </span>

                                  {task.priority === 'high' && (
                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-rose-100 text-rose-700 font-medium">
                                      {t('todos.taskDetails.priorityHigh')}
                                    </span>
                                  )}

                                  {task.due_date && (
                                    <span className={`text-xs flex items-center gap-1 ${
                                      isOverdue ? 'text-rose-600 font-semibold' : 'text-gray-600'
                                    }`}>
                                      <Calendar className="w-3.5 h-3.5" />
                                      {new Date(task.due_date).toLocaleDateString('de-DE')}
                                      {isOverdue && ` (${t('todos.taskDetails.overdue')})`}
                                    </span>
                                  )}
                                </div>

                                {isBlocked && !task.completed && (
                                  <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded flex items-start gap-2">
                                    <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                    <div className="text-sm text-amber-800">
                                      <span className="font-semibold">{t('todos.taskDetails.waitingFor')}</span> {blockedBy.join(', ')}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}

          {/* OLD GROUPED VIEW - COMMENTED OUT FOR DEBUG
          {sortedTasks.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2" style={{ borderColor: '#e5e5e5' }}>
              <Calendar className="w-12 h-12 mx-auto mb-3" style={{ color: '#d6b15b' }} />
              <p className="text-gray-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                Keine Aufgaben vorhanden
              </p>
            </div>
          ) : (
            Array.from(groupedByPhase.entries()).map(([category, phaseGroups]) => {
              const categoryInfo = taskCategories.find(c => c.id === category);
              const allCategoryTasks = Array.from(phaseGroups.values()).flat();
              const completedCount = allCategoryTasks.filter(t => t.completed).length;
              const isCategoryExpanded = expandedCategories.has(category);

              return (
                <div
                  key={category}
                  className="bg-white rounded-lg border-2 hover:shadow-md transition-all"
                  style={{ borderColor: '#d6b15b' }}
                >
                  <div
                    className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleCategoryExpansion(category)}
                  >
                    <div className="text-3xl flex-shrink-0">
                      {categoryInfo?.icon || '📋'}
                    </div>
                    <h3 className="text-lg font-bold flex-1" style={{ color: '#3b3b3d' }}>
                      {categoryInfo?.label || category}
                    </h3>
                    <span className="text-sm font-medium text-gray-500">
                      {completedCount}/{allCategoryTasks.length}
                    </span>
                    {isCategoryExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </div>

                  {isCategoryExpanded && (
                    <div className="border-t-2" style={{ borderColor: '#f3f4f6' }}>
                      {Array.from(phaseGroups.entries()).map(([phaseId, phaseTasks]) => {
                        if (phaseTasks.length === 0) return null;

                        const phase = phaseId === 'no-phase' ? null : phases.find(p => p.id === phaseId);
                        const phaseKey = `${category}-${phaseId}`;
                        const isPhaseExpanded = expandedPhases.has(phaseKey);
                        const phaseCompletedCount = phaseTasks.filter(t => t.completed).length;

                        return (
                          <div key={phaseKey} className="border-b-2 last:border-b-0" style={{ borderColor: '#f3f4f6' }}>
                            <div
                              className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors bg-gray-50/50"
                              onClick={() => togglePhaseExpansion(phaseKey)}
                            >
                              {isPhaseExpanded ? (
                                <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              )}
                              {phase ? (
                                <span
                                  className="inline-flex items-center px-3 py-1 rounded text-sm font-semibold"
                                  style={{
                                    backgroundColor: phase.color,
                                    color: 'white'
                                  }}
                                >
                                  {phase.name}
                                </span>
                              ) : (
                                <span className="text-sm font-medium text-gray-500">
                                  Ohne Phase
                                </span>
                              )}
                              <span className="text-xs text-gray-500 ml-auto">
                                {phaseCompletedCount}/{phaseTasks.length}
                              </span>
                            </div>

                            {isPhaseExpanded && (
                              <div className="divide-y" style={{ borderColor: '#f3f4f6' }}>
                                {phaseTasks.map(task => {
                                  const isExpanded = expandedTasks.has(task.id);
                                  const blockedBy = getBlockedTasks(task);
                                  const isBlocked = blockedBy.length > 0;
                                  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && !task.completed;

                                  return (
                                    <div key={task.id}>
                                      <div
                                        className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${isBlocked && !task.completed ? 'bg-gray-50 opacity-75' : ''}`}
                                        onClick={() => toggleTaskExpansion(task.id)}
                                      >
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            if (!isBlocked) {
                                              toggleTaskCompletion(task);
                                            }
                                          }}
                                          className="flex-shrink-0 ml-6"
                                          disabled={isBlocked && !task.completed}
                                          title={isBlocked && !task.completed ? `Warte auf: ${blockedBy.join(', ')}` : ''}
                                        >
                                          {task.completed ? (
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                          ) : isBlocked ? (
                                            <Lock className="w-5 h-5 text-amber-500" />
                                          ) : (
                                            <Circle className="w-5 h-5 text-gray-400 hover:text-emerald-500 transition-colors" />
                                          )}
                                        </button>

                                        <h4
                                          className={`flex-1 font-medium ${
                                            task.completed
                                              ? 'line-through text-gray-400'
                                              : isBlocked
                                                ? 'text-gray-500'
                                                : 'text-gray-900'
                                          }`}
                                          style={{ fontFamily: 'Open Sans, sans-serif' }}
                                        >
                                          {task.title}
                                          {isBlocked && !task.completed && (
                                            <span className="ml-2 text-xs text-amber-600">
                                              ({blockedBy.length} {blockedBy.length === 1 ? 'Abhängigkeit' : 'Abhängigkeiten'})
                                            </span>
                                          )}
                                        </h4>

                                        {isExpanded ? (
                                          <ChevronDown className="w-5 h-5 text-gray-400" />
                                        ) : (
                                          <ChevronRight className="w-5 h-5 text-gray-400" />
                                        )}
                                      </div>

                                      {isExpanded && (
                                        <div className="px-4 pb-4 bg-gray-50 ml-6">
                                          <div className="pt-3 flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                              <div className="flex items-center gap-2 mb-2">
                                                {task.is_system_generated ? (
                                                  <>
                                                    <span className="text-lg">🤖</span>
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-700 font-medium">
                                                      Empfehlung
                                                    </span>
                                                    {task.manually_modified && (
                                                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-amber-100 text-amber-700 font-medium">
                                                        Angepasst
                                                      </span>
                                                    )}
                                                  </>
                                                ) : (
                                                  <>
                                                    <span className="text-lg">💍</span>
                                                    {task.needs_adjustment_warning && !task.warning_dismissed && (
                                                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-orange-100 text-orange-700 font-medium">
                                                        ⚠️ Datum prüfen
                                                      </span>
                                                    )}
                                                  </>
                                                )}
                                              </div>

                                              {task.needs_adjustment_warning && !task.warning_dismissed && !task.is_system_task && (
                                                <div className="mt-2 bg-orange-50 border border-orange-200 rounded-lg p-3">
                                                  <div className="flex items-start gap-2">
                                                    <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                                                    <div className="flex-1 text-sm text-orange-800">
                                                      <p className="font-medium">Planungsfenster hat sich verschoben</p>
                                                      <p className="text-xs mt-1">Bitte prüfe, ob das Fälligkeitsdatum dieser Aufgabe noch passt.</p>
                                                    </div>
                                                    <button
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        dismissTaskWarning(task.id);
                                                      }}
                                                      className="text-orange-600 hover:text-orange-800"
                                                    >
                                                      <X className="w-4 h-4" />
                                                    </button>
                                                  </div>
                                                </div>
                                              )}

                                              {task.description && (
                                                <p className="text-sm text-gray-600 mt-2">
                                                  {task.description}
                                                </p>
                                              )}
                                            </div>

                                            <div className="flex items-center gap-2">
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleEditTask(task);
                                                }}
                                                className="text-gray-400 hover:text-blue-500 transition-colors"
                                                title="Aufgabe bearbeiten"
                                              >
                                                <Edit2 className="w-5 h-5" />
                                              </button>
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  deleteTask(task.id);
                                                }}
                                                className="text-gray-400 hover:text-rose-500 transition-colors"
                                                title="Aufgabe löschen"
                                              >
                                                <X className="w-5 h-5" />
                                              </button>
                                            </div>
                                          </div>

                                          {task.date_change_notice && !task.completed && (
                                            <div className="mt-3 p-3 bg-amber-50 border border-amber-300 rounded flex items-start gap-2">
                                              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                              <div className="flex-1">
                                                <p className="text-sm text-amber-800">{task.date_change_notice}</p>
                                              </div>
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  dismissDateChangeNotice(task.id);
                                                }}
                                                className="text-amber-600 hover:text-amber-800 transition-colors"
                                                title="Hinweis verwerfen"
                                              >
                                                <X className="w-4 h-4" />
                                              </button>
                                            </div>
                                          )}

                                          <div className="flex items-center gap-3 flex-wrap mt-3">
                                            <span
                                              className={`inline-flex items-center px-2 py-1 rounded text-xs text-white font-medium ${getCategoryColor(task.category)}`}
                                            >
                                              {taskCategories.find(c => c.id === task.category)?.label || task.category}
                                            </span>

                                            {task.phase_id && (() => {
                                              const taskPhase = phases.find(p => p.id === task.phase_id);
                                              if (taskPhase) {
                                                return (
                                                  <span
                                                    className="inline-flex items-center px-2 py-1 rounded text-xs font-medium"
                                                    style={{
                                                      backgroundColor: getPhaseColor(taskPhase, task.completed),
                                                      color: 'white'
                                                    }}
                                                  >
                                                    {taskPhase.name}
                                                  </span>
                                                );
                                              }
                                              return null;
                                            })()}

                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                updateTask(task.id, { is_system_generated: !task.is_system_generated });
                                              }}
                                              className="text-xs text-gray-500 hover:text-gray-700 underline"
                                              title={task.is_system_generated ? 'Als manuell markieren' : 'Als automatisch markieren'}
                                            >
                                              {task.is_system_generated ? '→ Manuell' : '→ Auto'}
                                            </button>

                                            {task.priority === 'high' && (
                                              <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-rose-100 text-rose-700 font-medium">
                                                Hoch
                                              </span>
                                            )}

                                            {task.due_date && (
                                              <span className={`text-xs flex items-center gap-1 ${
                                                isOverdue ? 'text-rose-600 font-semibold' : 'text-gray-600'
                                              }`}>
                                                <Calendar className="w-3.5 h-3.5" />
                                                {new Date(task.due_date).toLocaleDateString('de-DE')}
                                                {isOverdue && ' (überfällig)'}
                                              </span>
                                            )}

                                            {task.assigned_to && (
                                              <span className="text-xs text-gray-600">
                                                Zugewiesen: {task.assigned_to}
                                              </span>
                                            )}
                                          </div>

                                          {isBlocked && !task.completed && (
                                            <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded flex items-start gap-2">
                                              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                              <div className="text-sm text-amber-800">
                                                <span className="font-semibold">Wartet auf:</span> {blockedBy.join(', ')}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )
          */}
        </div>
      )}

      {showGenerateDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4" style={{ color: '#3b3b3d' }}>
              {t('todos.generateDialog.title')}
            </h3>
            <p className="text-gray-700 mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              {t('todos.generateDialog.description')}
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">{t('todos.generateDialog.planningPeriod')}</span><br />
                {t('todos.generateDialog.from')} <strong>{weddingData?.planning_start_date ? new Date(weddingData.planning_start_date).toLocaleDateString('de-DE') : t('todos.generateDialog.today')}</strong><br />
                {t('todos.generateDialog.to')} <strong>{weddingData?.wedding_date ? new Date(weddingData.wedding_date).toLocaleDateString('de-DE') : ''}</strong>
              </p>
            </div>
            <p className="text-sm text-gray-600 mb-6" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              {t('todos.generateDialog.distributionInfo')}
              {!weddingData?.planning_start_date && ` ${t('todos.generateDialog.planningStartInfo')}`}
            </p>
            <div className="flex gap-3">
              <button
                onClick={generateStandardTasks}
                className="flex-1 px-6 py-3 rounded-md transition-all hover:opacity-90 font-semibold"
                style={{
                  backgroundColor: '#d6b15b',
                  color: 'white',
                  fontFamily: 'Open Sans, sans-serif',
                }}
              >
                {t('todos.generateDialog.confirmButton')}
              </button>
              <button
                onClick={() => setShowGenerateDialog(false)}
                className="flex-1 px-6 py-3 rounded-md border-2 transition-all hover:bg-gray-50 font-semibold"
                style={{
                  borderColor: '#d6b15b',
                  color: '#3b3b3d',
                  fontFamily: 'Open Sans, sans-serif',
                }}
              >
                {t('todos.generateDialog.cancelButton')}
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold" style={{ color: '#3b3b3d' }}>
                {t('todos.addDialog.title')}
              </h3>
              <button
                onClick={() => setShowAddDialog(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d' }}>
                  {t('todos.addDialog.titleLabel')}
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-3 py-2 border-2 rounded-md"
                  style={{ borderColor: '#d6b15b' }}
                  placeholder={t('todos.addDialog.titlePlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d' }}>
                  {t('todos.addDialog.descriptionLabel')}
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full px-3 py-2 border-2 rounded-md"
                  style={{ borderColor: '#d6b15b' }}
                  rows={3}
                  placeholder={t('todos.addDialog.descriptionPlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d' }}>
                  {t('todos.addDialog.categoryLabel')}
                </label>
                <select
                  value={newTask.category}
                  onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                  className="w-full px-3 py-2 border-2 rounded-md"
                  style={{ borderColor: '#d6b15b' }}
                >
                  {taskCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{t(`todos.categories.${cat.id}`)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d' }}>
                  {t('todos.addDialog.dueDateLabel')}
                </label>
                <input
                  type="date"
                  value={newTask.due_date}
                  onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                  className="w-full px-3 py-2 border-2 rounded-md"
                  style={{ borderColor: '#d6b15b' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d' }}>
                  {t('todos.addDialog.priorityLabel')}
                </label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'high' | 'medium' | 'low' })}
                  className="w-full px-3 py-2 border-2 rounded-md"
                  style={{ borderColor: '#d6b15b' }}
                >
                  <option value="low">{t('todos.addDialog.priorityLow')}</option>
                  <option value="medium">{t('todos.addDialog.priorityMedium')}</option>
                  <option value="high">{t('todos.addDialog.priorityHigh')}</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddTask}
                className="flex-1 px-6 py-3 rounded-md transition-all hover:opacity-90 font-semibold"
                style={{
                  backgroundColor: '#d6b15b',
                  color: 'white',
                  fontFamily: 'Open Sans, sans-serif',
                }}
              >
                {t('todos.addDialog.addButton')}
              </button>
              <button
                onClick={() => setShowAddDialog(false)}
                className="px-6 py-3 rounded-md border-2 transition-all hover:bg-gray-50 font-semibold"
                style={{
                  borderColor: '#d6b15b',
                  color: '#3b3b3d',
                  fontFamily: 'Open Sans, sans-serif',
                }}
              >
                {t('todos.addDialog.cancelButton')}
              </button>
            </div>
          </div>
        </div>
      )}

      {showRecalculateDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4" style={{ color: '#3b3b3d' }}>
              {t('todos.recalculateDialog.title')}
            </h3>
            <p className="text-gray-700 mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              {t('todos.recalculateDialog.description', {
                date: weddingData?.wedding_date ? new Date(weddingData.wedding_date).toLocaleDateString('de-DE') : ''
              })}
            </p>
            <p className="text-gray-700 mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              {t('todos.recalculateDialog.countsInfo', {
                unchanged: tasks.filter(t => t.is_system_generated && !t.completed && !t.manually_modified).length,
                modified: tasks.filter(t => t.is_system_generated && !t.completed && t.manually_modified).length
              })}
            </p>
            <p className="text-gray-700 mb-6" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              {t('todos.recalculateDialog.userTasksInfo')}
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-6">
              <p className="text-sm text-blue-800">
                {t('todos.recalculateDialog.infoBox')}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={recalculateAutoTaskDates}
                className="flex-1 px-6 py-3 rounded-md transition-all hover:opacity-90 font-semibold"
                style={{
                  backgroundColor: '#d6b15b',
                  color: 'white',
                  fontFamily: 'Open Sans, sans-serif',
                }}
              >
                {t('todos.recalculateDialog.confirmButton')}
              </button>
              <button
                onClick={() => setShowRecalculateDialog(false)}
                className="flex-1 px-6 py-3 rounded-md border-2 transition-all hover:bg-gray-50 font-semibold"
                style={{
                  borderColor: '#d6b15b',
                  color: '#3b3b3d',
                  fontFamily: 'Open Sans, sans-serif',
                }}
              >
                {t('todos.recalculateDialog.cancelButton')}
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditDialog && editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold" style={{ color: '#3b3b3d' }}>
                {t('todos.editDialog.title')}
              </h3>
              <button
                onClick={() => {
                  setShowEditDialog(false);
                  setEditingTask(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d' }}>
                  {t('todos.addDialog.titleLabel')}
                </label>
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  className="w-full px-3 py-2 border-2 rounded-md"
                  style={{ borderColor: '#d6b15b' }}
                  placeholder={t('todos.addDialog.titlePlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d' }}>
                  {t('todos.addDialog.descriptionLabel')}
                </label>
                <textarea
                  value={editingTask.description || ''}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  className="w-full px-3 py-2 border-2 rounded-md"
                  style={{ borderColor: '#d6b15b' }}
                  rows={3}
                  placeholder={t('todos.addDialog.descriptionPlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d' }}>
                  {t('todos.addDialog.categoryLabel')}
                </label>
                <select
                  value={editingTask.category}
                  onChange={(e) => setEditingTask({ ...editingTask, category: e.target.value })}
                  className="w-full px-3 py-2 border-2 rounded-md"
                  style={{ borderColor: '#d6b15b' }}
                >
                  {taskCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{t(`todos.categories.${cat.id}`)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d' }}>
                  {t('todos.addDialog.dueDateLabel')}
                </label>
                <input
                  type="date"
                  value={editingTask.due_date || ''}
                  onChange={(e) => setEditingTask({ ...editingTask, due_date: e.target.value })}
                  className="w-full px-3 py-2 border-2 rounded-md"
                  style={{ borderColor: '#d6b15b' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d' }}>
                  {t('todos.addDialog.priorityLabel')}
                </label>
                <select
                  value={editingTask.priority}
                  onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value as 'high' | 'medium' | 'low' })}
                  className="w-full px-3 py-2 border-2 rounded-md"
                  style={{ borderColor: '#d6b15b' }}
                >
                  <option value="low">{t('todos.addDialog.priorityLow')}</option>
                  <option value="medium">{t('todos.addDialog.priorityMedium')}</option>
                  <option value="high">{t('todos.addDialog.priorityHigh')}</option>
                </select>
              </div>

              {editingTask.is_system_generated && (
                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <p className="text-sm text-blue-800">
                    {t('todos.editDialog.systemGeneratedInfo')}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveEdit}
                className="flex-1 px-6 py-3 rounded-md transition-all hover:opacity-90 font-semibold"
                style={{
                  backgroundColor: '#d6b15b',
                  color: 'white',
                  fontFamily: 'Open Sans, sans-serif',
                }}
              >
                {t('todos.editDialog.saveButton')}
              </button>
              <button
                onClick={() => {
                  setShowEditDialog(false);
                  setEditingTask(null);
                }}
                className="px-6 py-3 rounded-md border-2 transition-all hover:bg-gray-50 font-semibold"
                style={{
                  borderColor: '#d6b15b',
                  color: '#3b3b3d',
                  fontFamily: 'Open Sans, sans-serif',
                }}
              >
                {t('todos.editDialog.cancelButton')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
