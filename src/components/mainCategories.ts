export interface SubArea {
  id: string;
  icon: string;
  label: string;
}

export interface MainCategory {
  id: string;
  icon: string;
  colorClass: string;
  colorHex: string;
  subcategories: string[];
  subAreas?: SubArea[];
}

export const mainCategories: MainCategory[] = [
  {
    id: 'location_venue',
    icon: '🏛️',
    colorClass: 'bg-emerald-500',
    colorHex: '#10b981',
    subcategories: ['location']
  },
  {
    id: 'ceremony_legal',
    icon: '💒',
    colorClass: 'bg-blue-500',
    colorHex: '#3b82f6',
    subcategories: ['planning']
  },
  {
    id: 'vendors_services',
    icon: '🤝',
    colorClass: 'bg-purple-500',
    colorHex: '#a855f7',
    subcategories: ['catering'],
    subAreas: [
      { id: 'memories', icon: '📸', label: 'Erinnerungen' },
      { id: 'catering_drinks', icon: '🍽️', label: 'Kulinarik & Getränke' },
      { id: 'music_entertainment', icon: '🎵', label: 'Musik & Unterhaltung' },
      { id: 'transport_logistics', icon: '🚗', label: 'Transport & Logistik' },
    ]
  },
  {
    id: 'guests_communication',
    icon: '👥',
    colorClass: 'bg-amber-500',
    colorHex: '#f59e0b',
    subcategories: ['guests']
  },
  {
    id: 'styling_atmosphere',
    icon: '🎨',
    colorClass: 'bg-cyan-500',
    colorHex: '#06b6d4',
    subcategories: ['decoration']
  },
  {
    id: 'styling_outfit',
    icon: '👗',
    colorClass: 'bg-rose-500',
    colorHex: '#f43f5e',
    subcategories: [],
    subAreas: [
      { id: 'outfits_accessories', icon: '👗', label: 'Outfits & Accessoires' },
      { id: 'beauty_styling', icon: '💄', label: 'Beauty & Styling' },
      { id: 'rings', icon: '💍', label: 'Ringe' },
    ]
  },
  {
    id: 'organization_closure',
    icon: '📋',
    colorClass: 'bg-pink-500',
    colorHex: '#ec4899',
    subcategories: [],
    subAreas: [
      { id: 'support_team', icon: '💪', label: 'Helfer & Supportteam' },
      { id: 'guest_care', icon: '🎁', label: 'Gästebetreuung' },
    ]
  },
];

export const categoryToMainCategory = (category: string): string => {
  const categoryLower = category.toLowerCase();

  if (categoryLower === 'location' || categoryLower === 'location_venue') return 'location_venue';
  if (categoryLower === 'guests' || categoryLower === 'guests_communication') return 'guests_communication';
  if (categoryLower === 'catering' || categoryLower === 'vendors_services') return 'vendors_services';
  if (categoryLower === 'decoration' || categoryLower === 'styling_atmosphere') return 'styling_atmosphere';
  if (categoryLower === 'styling_outfit') return 'styling_outfit';
  if (categoryLower === 'planning' || categoryLower === 'ceremony_legal' || categoryLower === 'trauung_formalitaeten') return 'ceremony_legal';
  if (categoryLower === 'organization_closure') return 'organization_closure';

  return 'organization_closure';
};
