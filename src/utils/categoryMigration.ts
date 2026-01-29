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

const MIGRATION_KEY = 'category_migration_v1_completed';

export function migrateCategoriesIfNeeded(): boolean {
  if (typeof window === 'undefined') return false;

  const migrationCompleted = localStorage.getItem(MIGRATION_KEY);
  if (migrationCompleted === 'true') {
    return false;
  }

  try {
    const weddingDataStr = localStorage.getItem('wedding-data');
    if (!weddingDataStr) {
      localStorage.setItem(MIGRATION_KEY, 'true');
      return false;
    }

    const weddingData = JSON.parse(weddingDataStr);
    let migratedCount = 0;

    if (weddingData.todos && Array.isArray(weddingData.todos)) {
      weddingData.todos = weddingData.todos.map((todo: any) => {
        if (todo.category && OLD_TO_NEW_CATEGORY_MAP[todo.category]) {
          migratedCount++;
          return {
            ...todo,
            category: OLD_TO_NEW_CATEGORY_MAP[todo.category]
          };
        }
        return todo;
      });
    }

    if (migratedCount > 0) {
      localStorage.setItem('wedding-data', JSON.stringify(weddingData));
      console.log(`✅ Migration completed: ${migratedCount} tasks updated`);
    }

    localStorage.setItem(MIGRATION_KEY, 'true');
    return migratedCount > 0;
  } catch (error) {
    console.error('Migration failed:', error);
    return false;
  }
}
