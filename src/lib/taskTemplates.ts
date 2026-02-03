import { supabase } from './supabase';
import { TaskTemplate } from '../utils/taskAutomation';
import { taskTemplateData } from '../data/taskTemplateData';

export async function loadTaskTemplates(): Promise<TaskTemplate[]> {
  if (!supabase) {
    console.warn('Supabase not available, using fallback templates');
    return taskTemplateData;
  }

  try {
    const { data, error } = await supabase
      .from('task_templates')
      .select('*')
      .order('category', { ascending: true });

    if (error) {
      console.error('Error loading task templates from database:', error);
      console.warn('Using fallback templates');
      return taskTemplateData;
    }

    if (!data || data.length === 0) {
      console.warn('No templates in database, using fallback');
      return taskTemplateData;
    }

    console.log('[loadTaskTemplates] Loaded', data.length, 'templates from database');

    const mapped = data.map(template => ({
      id: template.id,
      category: template.category,
      task_name: template.task_name,
      description: template.description || '',
      priority: template.priority,
      default_duration: template.default_duration,
      timing_rules: template.timing_rules || {},
      main_category: template.main_category,
      depends_on: template.depends_on,
      planning_timeline: template.planning_timeline
    }));

    console.log('[loadTaskTemplates] Sample template:', mapped[0]);
    return mapped;
  } catch (error) {
    console.error('Failed to load task templates:', error);
    console.warn('Using fallback templates');
    return taskTemplateData;
  }
}
