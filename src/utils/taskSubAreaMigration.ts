import { storage } from '../lib/storage-adapter';
import { supabase } from '../lib/supabase';

const MIGRATION_KEY = 'wedding_sub_area_migration_done';

export async function migrateTaskSubAreasIfNeeded(): Promise<void> {
  if (localStorage.getItem(MIGRATION_KEY) === 'true') {
    return;
  }

  console.log('[migrateTaskSubAreasIfNeeded] Starting migration...');

  const tasks = storage.tasks.getAll();
  const tasksWithTemplateId = tasks.filter(task => task.template_id && !task.sub_area);

  if (tasksWithTemplateId.length === 0) {
    console.log('[migrateTaskSubAreasIfNeeded] No tasks need migration');
    localStorage.setItem(MIGRATION_KEY, 'true');
    return;
  }

  if (!supabase) {
    console.error('[migrateTaskSubAreasIfNeeded] Supabase not initialized');
    return;
  }

  const templateIds = tasksWithTemplateId.map(task => task.template_id!);

  const { data: templates, error } = await supabase
    .from('task_templates')
    .select('id, sub_area')
    .in('id', templateIds);

  if (error) {
    console.error('[migrateTaskSubAreasIfNeeded] Error loading templates:', error);
    return;
  }

  if (!templates || templates.length === 0) {
    console.log('[migrateTaskSubAreasIfNeeded] No templates found');
    localStorage.setItem(MIGRATION_KEY, 'true');
    return;
  }

  const templateMap = new Map(templates.map(t => [t.id, t.sub_area]));

  let updatedCount = 0;
  tasksWithTemplateId.forEach(task => {
    const subArea = templateMap.get(task.template_id!);
    if (subArea) {
      storage.tasks.update(task.id, { sub_area: subArea });
      updatedCount++;
    }
  });

  console.log(`[migrateTaskSubAreasIfNeeded] Updated ${updatedCount} tasks with sub_area`);
  localStorage.setItem(MIGRATION_KEY, 'true');
}
