import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import { Task } from '../lib/storage-adapter';

interface TaskTemplate {
  id: string;
  category: string;
  title_de: string;
  title_en: string;
  description_de: string | null;
  description_en: string | null;
  is_critical: boolean;
  recommended_offset_months: number;
  planning_duration_months: number;
}

export function useTaskTemplates() {
  const { i18n } = useTranslation();
  const [templates, setTemplates] = useState<Map<string, TaskTemplate>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('task_templates')
      .select('*');

    if (error) {
      console.error('[useTaskTemplates] Error loading templates:', error);
      setLoading(false);
      return;
    }

    if (data) {
      const templateMap = new Map<string, TaskTemplate>();
      data.forEach((template: TaskTemplate) => {
        templateMap.set(template.id, template);
      });
      setTemplates(templateMap);
    }

    setLoading(false);
  };

  const getTaskTitle = (task: Task): string => {
    if (task.template_id) {
      const template = templates.get(task.template_id);
      if (template) {
        const titleField = i18n.language === 'de' ? 'title_de' : 'title_en';
        return template[titleField] || template.title_de;
      }
      return task.title || '';
    }
    return task.title || '';
  };

  const getTaskDescription = (task: Task): string => {
    if (task.template_id) {
      const template = templates.get(task.template_id);
      if (template) {
        const descField = i18n.language === 'de' ? 'description_de' : 'description_en';
        return template[descField] || template.description_de || '';
      }
      return task.description || '';
    }
    return task.description || '';
  };

  return {
    templates,
    loading,
    getTaskTitle,
    getTaskDescription,
  };
}
