import { TaskTemplate } from './taskAutomation';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

let templateCache: TaskTemplate[] | null = null;

export async function loadTaskTemplates(): Promise<TaskTemplate[]> {
  if (templateCache) {
    return templateCache;
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/task_templates?select=*`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to load templates');
    }

    const templates = await response.json();
    templateCache = templates;
    return templates;
  } catch (error) {
    console.error('Error loading task templates:', error);
    return [];
  }
}

export function clearTemplateCache() {
  templateCache = null;
}
