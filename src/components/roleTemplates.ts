export interface RoleTemplate {
  name_de: string;
  name_en: string;
  emoji: string;
}

export const ROLE_TEMPLATES: RoleTemplate[] = [
  { name_de: 'Trauzeuge', name_en: 'Best Man', emoji: '🤵' },
  { name_de: 'Trauzeugin', name_en: 'Maid of Honor', emoji: '👰' },
  { name_de: 'Brautjungfer', name_en: 'Bridesmaid', emoji: '💐' },
  { name_de: 'Groomsman', name_en: 'Groomsman', emoji: '🎩' },
  { name_de: 'Ringträger', name_en: 'Ring Bearer', emoji: '💍' },
  { name_de: 'Blumenkind', name_en: 'Flower Girl', emoji: '🌸' },
  { name_de: 'Wedding Planner', name_en: 'Wedding Planner', emoji: '📋' },
  { name_de: 'Zeremonienmeister', name_en: 'Master of Ceremonies', emoji: '🎙️' },
  { name_de: 'DJ', name_en: 'DJ', emoji: '🎧' },
  { name_de: 'Fotograf', name_en: 'Photographer', emoji: '📷' },
  { name_de: 'Videograf', name_en: 'Videographer', emoji: '🎥' },
  { name_de: 'Fahrer', name_en: 'Driver', emoji: '🚗' },
  { name_de: 'Koordinator', name_en: 'Coordinator', emoji: '🗂️' },
  { name_de: 'Helfer', name_en: 'Helper', emoji: '🤝' },
  { name_de: 'Sonstiges', name_en: 'Other', emoji: '✨' },
];
