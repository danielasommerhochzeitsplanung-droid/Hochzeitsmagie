const OLD_TO_NEW_CATEGORY_MAP: Record<string, string> = {
  'Location': 'location',
  'Fotograf': 'planning',
  'Dekoration': 'decoration',
  'Musik': 'catering',
  'Einladungen': 'guests',
  'Kleidung': 'couple',
  'Ringe': 'couple',
  'Transport': 'planning',
  'Unterhaltung': 'catering',
  'Flitterwochen': 'planning',
  'Papeterie': 'decoration',
  'Rechtliche Vorsorge': 'planning',
  'Kirchliche Trauung': 'planning',
  'Catering': 'catering',
  'Nach der Trauung': 'planning',
};

const MIGRATION_KEY = 'category_migration_v2_completed';
const TASKS_STORAGE_KEY = 'wedding_tasks';

export function migrateCategoriesIfNeeded(): boolean {
  if (typeof window === 'undefined') return false;

  const migrationCompleted = localStorage.getItem(MIGRATION_KEY);
  if (migrationCompleted === 'true') {
    return false;
  }

  try {
    const tasksStr = localStorage.getItem(TASKS_STORAGE_KEY);
    if (!tasksStr) {
      localStorage.setItem(MIGRATION_KEY, 'true');
      return false;
    }

    const tasks = JSON.parse(tasksStr);
    let migratedCount = 0;

    if (Array.isArray(tasks)) {
      const updatedTasks = tasks.map((task: any) => {
        if (task.category && OLD_TO_NEW_CATEGORY_MAP[task.category]) {
          migratedCount++;
          return {
            ...task,
            category: OLD_TO_NEW_CATEGORY_MAP[task.category]
          };
        }
        return task;
      });

      if (migratedCount > 0) {
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
        console.log(`✅ Migration completed: ${migratedCount} tasks updated`);
      }
    }

    localStorage.setItem(MIGRATION_KEY, 'true');
    return migratedCount > 0;
  } catch (error) {
    console.error('Migration failed:', error);
    localStorage.setItem(MIGRATION_KEY, 'true');
    return false;
  }
}
