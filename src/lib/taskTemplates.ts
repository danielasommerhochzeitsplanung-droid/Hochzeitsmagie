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

    return data.map(template => ({
      id: template.id,
      category: template.category,
      task_name: template.task_name,
      description: template.description || '',
      priority: template.priority,
      default_duration: template.default_duration,
      timing_rules: template.timing_rules || {}
    }));
  } catch (error) {
    console.error('Failed to load task templates:', error);
    console.warn('Using fallback templates');
    return taskTemplateData;
  }
}
