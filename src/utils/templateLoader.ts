import { TaskTemplate } from './taskAutomation';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

let templateCache: TaskTemplate[] | null = null;

export async function loadTaskTemplates(): Promise<TaskTemplate[]> {
  if (templateCache) {
    return templateCache;
  }

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('Supabase credentials not found');
    return [];
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/task_templates?select=*`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    if (!response.ok) {
      console.error('Failed to load templates:', response.status, response.statusText);
      return [];
    }

    const templates = await response.json();
    console.log('Loaded templates:', templates.length);
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
