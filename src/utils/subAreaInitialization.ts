import { storage, SubArea } from '../lib/storage-adapter';

export interface SubAreaDefinition {
  id: string;
  parent_category: string;
  label: string;
  icon: string;
}

const DEFAULT_SUB_AREAS: SubAreaDefinition[] = [
  { id: 'memories', parent_category: 'vendors_services', label: 'Erinnerungen', icon: '📸' },
  { id: 'catering_drinks', parent_category: 'vendors_services', label: 'Kulinarik & Getränke', icon: '🍽️' },
  { id: 'music_entertainment', parent_category: 'vendors_services', label: 'Musik & Unterhaltung', icon: '🎵' },
  { id: 'transport_logistics', parent_category: 'vendors_services', label: 'Transport & Logistik', icon: '🚗' },
  { id: 'outfits_accessories', parent_category: 'styling_outfit', label: 'Outfits & Accessoires', icon: '👗' },
  { id: 'beauty_styling', parent_category: 'styling_outfit', label: 'Beauty & Styling', icon: '💄' },
  { id: 'rings', parent_category: 'styling_outfit', label: 'Ringe', icon: '💍' },
  { id: 'support_team', parent_category: 'organization_closure', label: 'Helfer & Supportteam', icon: '💪' },
  { id: 'guest_care', parent_category: 'organization_closure', label: 'Gästebetreuung', icon: '🎁' },
];

export function initializeSubAreasIfNeeded(): void {
  const existingSubAreas = storage.subAreas.getAll();

  if (existingSubAreas.length === 0) {
    DEFAULT_SUB_AREAS.forEach(definition => {
      storage.subAreas.create({
        sub_area_id: definition.id,
        parent_category: definition.parent_category,
        label: definition.label,
        icon: definition.icon,
        is_archived: false,
      });
    });
  } else {
    const existingIds = new Set(existingSubAreas.map(s => s.sub_area_id));

    DEFAULT_SUB_AREAS.forEach(definition => {
      if (!existingIds.has(definition.id)) {
        storage.subAreas.create({
          sub_area_id: definition.id,
          parent_category: definition.parent_category,
          label: definition.label,
          icon: definition.icon,
          is_archived: false,
        });
      }
    });
  }
}

export function getSubAreasForCategory(categoryId: string, includeArchived: boolean = false): SubArea[] {
  const allSubAreas = storage.subAreas.getAll();

  return allSubAreas.filter(subArea => {
    const matchesCategory = subArea.parent_category === categoryId;
    const matchesArchiveFilter = includeArchived || !subArea.is_archived;
    return matchesCategory && matchesArchiveFilter;
  });
}
