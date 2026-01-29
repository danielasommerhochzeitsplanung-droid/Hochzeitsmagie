import { supabase } from './supabase';
import { TaskTemplate } from '../utils/taskAutomation';

export async function loadTaskTemplates(): Promise<TaskTemplate[]> {
  try {
    const { data, error } = await supabase
      .from('task_templates')
      .select('*')
      .order('category', { ascending: true });

    if (error) {
      console.error('Error loading task templates from database:', error);
      return [];
    }

    if (!data) {
      return [];
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
    return [];
  }
}
