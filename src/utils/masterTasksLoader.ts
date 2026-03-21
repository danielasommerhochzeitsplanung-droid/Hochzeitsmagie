import { supabase } from '../lib/supabase';

export interface MasterTask {
  id: string;
  category: string;
  sub_area: string | null;
  sort_order: number;
  planning_hint: 'start' | 'middle' | 'final' | 'after';
  optional: boolean;
  i18n_key: string;
  is_active: boolean;
  created_at: string;
}

export async function loadMasterTasks(
  category?: string,
  subArea?: string
): Promise<MasterTask[]> {
  try {
    let query = supabase
      .from('master_tasks')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (category) {
      query = query.eq('category', category);
    }

    if (subArea) {
      query = query.eq('sub_area', subArea);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error loading master tasks:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error loading master tasks:', error);
    return [];
  }
}

export async function loadMasterTasksByCategories(
  filters: { category: string; subArea?: string }[]
): Promise<MasterTask[]> {
  try {
    const allTasks: MasterTask[] = [];

    for (const filter of filters) {
      const tasks = await loadMasterTasks(filter.category, filter.subArea);
      allTasks.push(...tasks);
    }

    return allTasks;
  } catch (error) {
    console.error('Error loading master tasks by categories:', error);
    return [];
  }
}
