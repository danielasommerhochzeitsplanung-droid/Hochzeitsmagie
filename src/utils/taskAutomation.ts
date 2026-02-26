import { storage, Task } from '../lib/storage-adapter';
import { supabase } from '../lib/supabase';

export interface TaskTemplate {
  id: string;
  category: string;
  task_name: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
  default_duration: number;
  timing_rules: {
    immediate?: boolean;
    '3_months'?: boolean;
    '6_months'?: boolean;
    '9_months'?: boolean;
    '12_months'?: boolean;
    '18_months'?: boolean;
  };
  main_category?: string;
  depends_on?: string[];
  planning_timeline?: string;
}

export function calculatePlanningDurationMonths(planningStartDate: string, weddingDate: string): number {
  const start = new Date(planningStartDate);
  const wedding = new Date(weddingDate);

  const diffTime = wedding.getTime() - start.getTime();
  const diffMonths = Math.round(diffTime / (1000 * 60 * 60 * 24 * 30.44));

  return diffMonths;
}

export function findBestMatchingPlanningDuration(actualMonths: number): string {
  if (actualMonths < 3) return 'immediate';
  if (actualMonths <= 3) return '3_months';
  if (actualMonths <= 6) return '6_months';
  if (actualMonths <= 9) return '9_months';
  if (actualMonths <= 12) return '12_months';
  return '18_months';
}

export function calculateDueDateFromDuration(
  planningStartDate: string,
  durationDays: number
): string {
  const start = new Date(planningStartDate);
  const dueDate = new Date(start);
  dueDate.setDate(dueDate.getDate() + durationDays);
  return dueDate.toISOString().split('T')[0];
}

function getCategoryFromDbCategory(dbCategory: string): string {
  return dbCategory;
}

function calculateDueDateFromOffset(
  weddingDate: string,
  offsetMonths: number
): string {
  const wedding = new Date(weddingDate);
  const dueDate = new Date(wedding);
  dueDate.setMonth(dueDate.getMonth() - offsetMonths);
  return dueDate.toISOString().split('T')[0];
}

export async function generateLocationTasksFromTemplates(
  planningStartDate: string,
  weddingDate: string,
  language: string = 'de'
): Promise<Omit<Task, 'id' | 'created_at'>[]> {
  const actualMonths = calculatePlanningDurationMonths(planningStartDate, weddingDate);

  console.log('[generateLocationTasksFromTemplates] Actual planning months:', actualMonths);

  if (!supabase) {
    console.error('[generateLocationTasksFromTemplates] Supabase not initialized');
    return [];
  }

  const { data: templates, error } = await supabase
    .from('task_templates')
    .select('*')
    .eq('planning_duration_months',
        actualMonths >= 6 && actualMonths < 9 ? 6 :
        actualMonths >= 9 && actualMonths < 12 ? 9 :
        actualMonths >= 12 && actualMonths < 15 ? 12 :
        actualMonths >= 15 && actualMonths < 18 ? 15 :
        actualMonths >= 18 && actualMonths < 24 ? 18 :
        actualMonths >= 24 && actualMonths < 30 ? 24 : 30);

  if (error) {
    console.error('[generateLocationTasksFromTemplates] Error loading templates:', error);
    return [];
  }

  if (!templates || templates.length === 0) {
    console.log('[generateLocationTasksFromTemplates] No templates found in database');
    return [];
  }

  console.log('[generateLocationTasksFromTemplates] Found', templates.length, 'matching templates');

  const tasks: Omit<Task, 'id' | 'created_at'>[]= [];

  for (const template of templates) {
    const dueDate = calculateDueDateFromOffset(
      weddingDate,
      parseFloat(template.recommended_offset_months?.toString() || '1')
    );

    tasks.push({
      template_id: template.id,
      category: getCategoryFromDbCategory(template.category),
      due_date: dueDate,
      priority: template.is_critical ? 'high' : 'medium',
      completed: false,
      is_system_generated: true,
      archived: false
    });
  }

  console.log('[generateLocationTasksFromTemplates] Generated', tasks.length, 'tasks');
  return tasks;
}

export function recalculateSystemTasks(
  weddingDate: string
): void {
  const allTasks = storage.tasks.getAll();
  const systemTasks = allTasks.filter(
    task => task.is_system_generated && !task.completed
  );

  if (systemTasks.length === 0) return;

  for (const task of systemTasks) {
    console.warn('[recalculateSystemTasks] System-generated tasks cannot be automatically recalculated. Manual adjustment needed for:', task.title);
  }
}

export function flagUserTasksForAdjustment(): void {
  const allTasks = storage.tasks.getAll();
  const userTasks = allTasks.filter(
    task => !task.is_system_generated && !task.completed
  );

  for (const task of userTasks) {
    console.log('[flagUserTasksForAdjustment] Task may need adjustment:', task.title);
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
