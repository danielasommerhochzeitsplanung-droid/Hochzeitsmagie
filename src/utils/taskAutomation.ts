import { storage } from '../lib/storage-adapter';

export interface TaskTemplate {
  id: string;
  category: string;
  task_name: string;
  description: string;
  priority: string;
  default_duration: number;
  timing_rules: {
    immediate?: boolean;
    '3_months'?: boolean;
    '6_months'?: boolean;
    '9_months'?: boolean;
    '12_months'?: boolean;
    '18_months'?: boolean;
  };
  weeks_before_wedding?: number;
  main_category?: string;
  depends_on?: string[];
  planning_timeline?: string[];
}

export interface Task {
  id?: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  category: string;
  is_system_task?: boolean;
  template_id?: string;
  offset_weeks?: number;
  offset_type?: string;
  needs_adjustment_warning?: boolean;
  warning_dismissed?: boolean;
  depends_on?: string[];
}

export function calculatePlanningWindow(planningStartDate: string, weddingDate: string): string {
  const start = new Date(planningStartDate);
  const wedding = new Date(weddingDate);

  const diffTime = wedding.getTime() - start.getTime();
  const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30.44);

  if (diffMonths >= 18) return '18_months';
  if (diffMonths >= 12) return '12_months';
  if (diffMonths >= 9) return '9_months';
  if (diffMonths >= 6) return '6_months';
  if (diffMonths >= 3) return '3_months';
  return 'immediate';
}

export function getApplicableTimingWindows(planningWindow: string): string[] {
  const windows = ['immediate', '3_months', '6_months', '9_months', '12_months', '18_months'];
  const currentIndex = windows.indexOf(planningWindow);

  return windows.slice(0, currentIndex + 1);
}

export function calculateDueDate(
  weddingDate: string,
  timingWindow: string,
  planningStartDate?: string,
  weeksBeforeWedding?: number
): string {
  const wedding = new Date(weddingDate);

  let offsetWeeks = 0;

  if (weeksBeforeWedding !== undefined) {
    offsetWeeks = weeksBeforeWedding;
  } else {
    switch (timingWindow) {
      case 'immediate':
        offsetWeeks = 4;
        break;
      case '3_months':
        offsetWeeks = 12;
        break;
      case '6_months':
        offsetWeeks = 24;
        break;
      case '9_months':
        offsetWeeks = 36;
        break;
      case '12_months':
        offsetWeeks = 48;
        break;
      case '18_months':
        offsetWeeks = 72;
        break;
    }
  }

  const dueDate = new Date(wedding);
  dueDate.setDate(dueDate.getDate() - (offsetWeeks * 7));

  if (planningStartDate) {
    const planningStart = new Date(planningStartDate);
    if (dueDate < planningStart) {
      const adjustedDate = new Date(planningStart);
      adjustedDate.setDate(adjustedDate.getDate() + 7);
      return adjustedDate.toISOString().split('T')[0];
    }
  }

  return dueDate.toISOString().split('T')[0];
}

export function getOffsetWeeksFromTimingWindow(timingWindow: string): number {
  switch (timingWindow) {
    case 'immediate':
      return 4;
    case '3_months':
      return 12;
    case '6_months':
      return 24;
    case '9_months':
      return 36;
    case '12_months':
      return 48;
    case '18_months':
      return 72;
    default:
      return 4;
  }
}

export function generateTasksFromTemplates(
  planningStartDate: string,
  weddingDate: string,
  templates: TaskTemplate[]
): Task[] {
  const planningWindow = calculatePlanningWindow(planningStartDate, weddingDate);
  const applicableWindows = getApplicableTimingWindows(planningWindow);

  const tasks: Task[] = [];

  for (const template of templates) {
    if (template.weeks_before_wedding !== undefined && template.weeks_before_wedding !== null) {
      const dueDate = calculateDueDate(
        weddingDate,
        '',
        planningStartDate,
        template.weeks_before_wedding
      );

      tasks.push({
        title: template.task_name,
        description: template.description || '',
        status: 'pending',
        priority: template.priority || 'medium',
        dueDate,
        category: template.category,
        is_system_task: true,
        template_id: template.id,
        offset_weeks: template.weeks_before_wedding,
        offset_type: 'weeks_before'
      });
    } else {
      const timingRules = template.timing_rules as TaskTemplate['timing_rules'];

      for (const window of applicableWindows) {
        const windowKey = window as keyof typeof timingRules;
        if (timingRules[windowKey]) {
          const dueDate = calculateDueDate(weddingDate, window, planningStartDate);
          const offsetWeeks = getOffsetWeeksFromTimingWindow(window);

          tasks.push({
            title: template.task_name,
            description: template.description || '',
            status: 'pending',
            priority: template.priority || 'medium',
            dueDate,
            category: template.category,
            is_system_task: true,
            template_id: template.id,
            offset_weeks: offsetWeeks,
            offset_type: 'weeks_before'
          });

          break;
        }
      }
    }
  }

  return tasks;
}

export function recalculateSystemTasks(
  weddingDate: string
): void {
  const allTasks = storage.tasks.getAll();
  const systemTasks = allTasks.filter(
    task => task.is_system_task && (task.completed === false)
  );

  if (systemTasks.length === 0) return;

  for (const task of systemTasks) {
    if (task.offset_weeks && task.offset_type === 'weeks_before') {
      const wedding = new Date(weddingDate);
      const newDueDate = new Date(wedding);
      newDueDate.setDate(newDueDate.getDate() - (task.offset_weeks * 7));

      storage.tasks.update(task.id, {
        due_date: newDueDate.toISOString().split('T')[0]
      });
    }
  }
}

export function flagUserTasksForAdjustment(): void {
  const allTasks = storage.tasks.getAll();
  const userTasks = allTasks.filter(
    task => !task.is_system_task && task.completed === false
  );

  for (const task of userTasks) {
    storage.tasks.update(task.id, {
      needs_adjustment_warning: true,
      warning_dismissed: false
    });
  }
}

export function handleDateChange(
  weddingDataId: string,
  newPlanningStartDate: string | null,
  newWeddingDate: string,
  oldPlanningStartDate: string | null,
  oldWeddingDate: string | null
): void {
  const planningChanged = newPlanningStartDate !== oldPlanningStartDate;
  const weddingChanged = newWeddingDate !== oldWeddingDate;

  if (!planningChanged && !weddingChanged) return;

  if (weddingChanged && oldWeddingDate) {
    recalculateSystemTasks(newWeddingDate);
    flagUserTasksForAdjustment();
  }

  storage.weddingData.update(weddingDataId, {
    last_planning_start_date: newPlanningStartDate || undefined,
    last_wedding_date: newWeddingDate
  });
}
