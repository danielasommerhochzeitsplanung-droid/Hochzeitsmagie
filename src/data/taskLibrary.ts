export interface MasterTask {
  id: string;
  category: string;
  sub_area: string;
  sort_order: number;
  planning_hint: 'start' | 'middle' | 'final' | 'after';
  optional: boolean;
  i18nKey: string;
}

export const TASK_LIBRARY: MasterTask[] = [
  {
    id: 'outfit-001',
    category: 'styling_outfit',
    sub_area: 'outfits_accessories',
    sort_order: 1,
    planning_hint: 'start',
    optional: false,
    i18nKey: 'master_tasks.outfits_accessories.collect_inspiration'
  },
  {
    id: 'outfit-002',
    category: 'styling_outfit',
    sub_area: 'outfits_accessories',
    sort_order: 2,
    planning_hint: 'start',
    optional: false,
    i18nKey: 'master_tasks.outfits_accessories.define_style'
  },
  {
    id: 'outfit-003',
    category: 'styling_outfit',
    sub_area: 'outfits_accessories',
    sort_order: 3,
    planning_hint: 'middle',
    optional: false,
    i18nKey: 'master_tasks.outfits_accessories.research_outfits'
  },
  {
    id: 'outfit-004',
    category: 'styling_outfit',
    sub_area: 'outfits_accessories',
    sort_order: 4,
    planning_hint: 'middle',
    optional: false,
    i18nKey: 'master_tasks.outfits_accessories.try_on_select'
  },
  {
    id: 'outfit-005',
    category: 'styling_outfit',
    sub_area: 'outfits_accessories',
    sort_order: 5,
    planning_hint: 'middle',
    optional: false,
    i18nKey: 'master_tasks.outfits_accessories.order_outfits'
  },
  {
    id: 'outfit-006',
    category: 'styling_outfit',
    sub_area: 'outfits_accessories',
    sort_order: 6,
    planning_hint: 'final',
    optional: false,
    i18nKey: 'master_tasks.outfits_accessories.select_accessories'
  },
  {
    id: 'outfit-007',
    category: 'styling_outfit',
    sub_area: 'outfits_accessories',
    sort_order: 7,
    planning_hint: 'final',
    optional: false,
    i18nKey: 'master_tasks.outfits_accessories.adjustments'
  },
  {
    id: 'catering-001',
    category: 'vendors_services',
    sub_area: 'catering_drinks',
    sort_order: 1,
    planning_hint: 'start',
    optional: false,
    i18nKey: 'master_tasks.catering_drinks.culinary_concept'
  },
  {
    id: 'catering-002',
    category: 'vendors_services',
    sub_area: 'catering_drinks',
    sort_order: 2,
    planning_hint: 'start',
    optional: false,
    i18nKey: 'master_tasks.catering_drinks.drinks_concept'
  },
  {
    id: 'catering-003',
    category: 'vendors_services',
    sub_area: 'catering_drinks',
    sort_order: 3,
    planning_hint: 'middle',
    optional: false,
    i18nKey: 'master_tasks.catering_drinks.research_caterers'
  },
  {
    id: 'catering-004',
    category: 'vendors_services',
    sub_area: 'catering_drinks',
    sort_order: 4,
    planning_hint: 'middle',
    optional: false,
    i18nKey: 'master_tasks.catering_drinks.tasting_session'
  },
  {
    id: 'catering-005',
    category: 'vendors_services',
    sub_area: 'catering_drinks',
    sort_order: 5,
    planning_hint: 'middle',
    optional: false,
    i18nKey: 'master_tasks.catering_drinks.book_catering'
  },
  {
    id: 'catering-006',
    category: 'vendors_services',
    sub_area: 'catering_drinks',
    sort_order: 6,
    planning_hint: 'final',
    optional: false,
    i18nKey: 'master_tasks.catering_drinks.finalize_menu'
  },
  {
    id: 'catering-007',
    category: 'vendors_services',
    sub_area: 'catering_drinks',
    sort_order: 7,
    planning_hint: 'final',
    optional: false,
    i18nKey: 'master_tasks.catering_drinks.coordinate_service'
  },
  {
    id: 'transport-001',
    category: 'vendors_services',
    sub_area: 'transport_logistics',
    sort_order: 1,
    planning_hint: 'start',
    optional: false,
    i18nKey: 'master_tasks.transport_logistics.clarify_needs'
  },
  {
    id: 'transport-002',
    category: 'vendors_services',
    sub_area: 'transport_logistics',
    sort_order: 2,
    planning_hint: 'start',
    optional: false,
    i18nKey: 'master_tasks.transport_logistics.define_transport_types'
  },
  {
    id: 'transport-003',
    category: 'vendors_services',
    sub_area: 'transport_logistics',
    sort_order: 3,
    planning_hint: 'middle',
    optional: false,
    i18nKey: 'master_tasks.transport_logistics.research_providers'
  },
  {
    id: 'transport-004',
    category: 'vendors_services',
    sub_area: 'transport_logistics',
    sort_order: 4,
    planning_hint: 'middle',
    optional: false,
    i18nKey: 'master_tasks.transport_logistics.book_transport'
  },
  {
    id: 'transport-005',
    category: 'vendors_services',
    sub_area: 'transport_logistics',
    sort_order: 5,
    planning_hint: 'middle',
    optional: false,
    i18nKey: 'master_tasks.transport_logistics.create_plan'
  },
  {
    id: 'transport-006',
    category: 'vendors_services',
    sub_area: 'transport_logistics',
    sort_order: 6,
    planning_hint: 'final',
    optional: false,
    i18nKey: 'master_tasks.transport_logistics.finalize_schedule'
  },
  {
    id: 'transport-007',
    category: 'vendors_services',
    sub_area: 'transport_logistics',
    sort_order: 7,
    planning_hint: 'final',
    optional: false,
    i18nKey: 'master_tasks.transport_logistics.confirm_details'
  },
  {
    id: 'music-001',
    category: 'vendors_services',
    sub_area: 'music_entertainment',
    sort_order: 1,
    planning_hint: 'start',
    optional: false,
    i18nKey: 'master_tasks.music_entertainment.define_areas'
  },
  {
    id: 'music-002',
    category: 'vendors_services',
    sub_area: 'music_entertainment',
    sort_order: 2,
    planning_hint: 'start',
    optional: false,
    i18nKey: 'master_tasks.music_entertainment.define_music_style'
  },
  {
    id: 'music-003',
    category: 'vendors_services',
    sub_area: 'music_entertainment',
    sort_order: 3,
    planning_hint: 'start',
    optional: false,
    i18nKey: 'master_tasks.music_entertainment.plan_budget'
  },
  {
    id: 'music-004',
    category: 'vendors_services',
    sub_area: 'music_entertainment',
    sort_order: 4,
    planning_hint: 'middle',
    optional: false,
    i18nKey: 'master_tasks.music_entertainment.research_compare_providers'
  },
  {
    id: 'music-005',
    category: 'vendors_services',
    sub_area: 'music_entertainment',
    sort_order: 5,
    planning_hint: 'middle',
    optional: false,
    i18nKey: 'master_tasks.music_entertainment.book_main_provider'
  },
  {
    id: 'music-006',
    category: 'vendors_services',
    sub_area: 'music_entertainment',
    sort_order: 6,
    planning_hint: 'final',
    optional: false,
    i18nKey: 'master_tasks.music_entertainment.coordinate_schedule_wishes'
  },
  {
    id: 'music-007',
    category: 'vendors_services',
    sub_area: 'music_entertainment',
    sort_order: 7,
    planning_hint: 'final',
    optional: false,
    i18nKey: 'master_tasks.music_entertainment.clarify_tech_setup'
  },
  {
    id: 'music-008',
    category: 'vendors_services',
    sub_area: 'music_entertainment',
    sort_order: 8,
    planning_hint: 'final',
    optional: false,
    i18nKey: 'master_tasks.music_entertainment.final_confirmation'
  }
];

export function getTasksByCategory(category: string, subArea?: string): MasterTask[] {
  return TASK_LIBRARY.filter(task => {
    if (subArea) {
      return task.category === category && task.sub_area === subArea;
    }
    return task.category === category;
  }).sort((a, b) => a.sort_order - b.sort_order);
}

export function getTasksByCategories(filters: { category: string; subArea?: string }[]): MasterTask[] {
  const allTasks: MasterTask[] = [];

  for (const filter of filters) {
    const tasks = getTasksByCategory(filter.category, filter.subArea);
    allTasks.push(...tasks);
  }

  return allTasks;
}

export function getAllTasks(): MasterTask[] {
  return [...TASK_LIBRARY].sort((a, b) => a.sort_order - b.sort_order);
}
