import { Task } from '../lib/storage-adapter';
import { loadMasterTasks, MasterTask } from './masterTasksLoader';
import { generateId } from '../lib/uuid';

export interface GenerateMasterTasksOptions {
  category: string;
  subArea?: string;
  language?: string;
}

export async function generateTasksFromMasterTasks(
  options: GenerateMasterTasksOptions
): Promise<Omit<Task, 'id' | 'created_at'>[]> {
  const { category, subArea, language = 'de' } = options;

  const masterTasks = await loadMasterTasks(category, subArea);

  if (masterTasks.length === 0) {
    console.warn(`No master tasks found for category: ${category}, subArea: ${subArea}`);
    return [];
  }

  const tasks: Omit<Task, 'id' | 'created_at'>[] = masterTasks.map((masterTask) => {
    const i18nKey = masterTask.i18n_key;

    return {
      title: i18nKey,
      description: '',
      category: masterTask.category,
      sub_area: masterTask.sub_area || undefined,
      completed: false,
      priority: 'medium',
      is_system_generated: true,
      archived: false,
    };
  });

  return tasks;
}

export async function generateTasksForMultipleAreas(
  areas: GenerateMasterTasksOptions[]
): Promise<Omit<Task, 'id' | 'created_at'>[]> {
  const allTasks: Omit<Task, 'id' | 'created_at'>[] = [];

  for (const area of areas) {
    const tasks = await generateTasksFromMasterTasks(area);
    allTasks.push(...tasks);
  }

  return allTasks;
}
