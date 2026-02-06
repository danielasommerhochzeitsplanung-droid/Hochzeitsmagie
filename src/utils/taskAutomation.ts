import { storage, Task } from '../lib/storage-adapter';
import { supabase } from '../lib/supabase';

export interface TaskTemplate {
  id: string;
  category: string;
  phase: number;
  order_in_phase: number;
  title_de: string;
  title_en: string;
  description_de?: string;
  description_en?: string;
  planning_duration_months: number;
  recommended_offset_months: number;
  latest_completion_months: number;
  is_critical: boolean;
  created_at: string;
}

export function calculatePlanningDurationMonths(planningStartDate: string, weddingDate: string): number {
  const start = new Date(planningStartDate);
  const wedding = new Date(weddingDate);

  const diffTime = wedding.getTime() - start.getTime();
  const diffMonths = Math.round(diffTime / (1000 * 60 * 60 * 24 * 30.44));

  return diffMonths;
}

export function findBestMatchingPlanningDuration(actualMonths: number): number {
  const availableDurations = [6, 9, 12, 15, 18, 24, 30];

  for (const duration of availableDurations) {
    if (actualMonths <= duration) {
      return duration;
    }
  }

  return 30;
}

export function calculateDueDateFromOffset(
  weddingDate: string,
  offsetMonths: number,
  planningStartDate?: string
): string {
  const wedding = new Date(weddingDate);
  const dueDate = new Date(wedding);

  dueDate.setMonth(dueDate.getMonth() + offsetMonths);

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

export async function fetchTaskTemplatesFromSupabase(
  planningDurationMonths: number,
  category?: string
): Promise<TaskTemplate[]> {
  let query = supabase
    .from('task_templates')
    .select('*')
    .eq('planning_duration_months', planningDurationMonths);

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query
    .order('phase', { ascending: true })
    .order('order_in_phase', { ascending: true });

  if (error) {
    console.error('[fetchTaskTemplatesFromSupabase] Error fetching templates:', error);
    return [];
  }

  return data || [];
}

export async function generateLocationTasksFromTemplates(
  planningStartDate: string,
  weddingDate: string,
  language: string = 'de'
): Promise<Omit<Task, 'id' | 'created_at'>[]> {
  const actualMonths = calculatePlanningDurationMonths(planningStartDate, weddingDate);
  const planningDuration = findBestMatchingPlanningDuration(actualMonths);

  console.log('[generateLocationTasksFromTemplates] Actual planning months:', actualMonths);
  console.log('[generateLocationTasksFromTemplates] Selected planning duration:', planningDuration);

  const templates = await fetchTaskTemplatesFromSupabase(planningDuration);

  console.log('[generateLocationTasksFromTemplates] Found', templates.length, 'templates');

  const tasks: Omit<Task, 'id' | 'created_at'>[] = [];

  for (const template of templates) {
    const title = language === 'de' ? template.title_de : template.title_en;
    const description = language === 'de' ? template.description_de : template.description_en;

    const dueDate = calculateDueDateFromOffset(
      weddingDate,
      template.recommended_offset_months,
      planningStartDate
    );

    const priority = template.is_critical ? 'high' : 'medium';

    tasks.push({
      title,
      description: description || '',
      category: template.category,
      due_date: dueDate,
      priority: priority as 'high' | 'medium' | 'low',
      completed: false,
      is_system_generated: true
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
