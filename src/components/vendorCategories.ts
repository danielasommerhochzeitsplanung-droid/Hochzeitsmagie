export const VENDOR_CATEGORIES = [
  { value: 'Location/Veranstaltungsort', emoji: '🏰' },
  { value: 'Catering', emoji: '🍽️' },
  { value: 'Fotograf', emoji: '📸' },
  { value: 'Videograf', emoji: '🎥' },
  { value: 'DJ/Musik/Band', emoji: '🎵' },
  { value: 'Florist/Blumen', emoji: '💐' },
  { value: 'Konditorei/Torte', emoji: '🎂' },
  { value: 'Hochzeitsplaner', emoji: '📋' },
  { value: 'Fahrzeuge/Transport', emoji: '🚗' },
  { value: 'Dekoration', emoji: '🎨' },
  { value: 'Brautausstatter/Mode', emoji: '👗' },
  { value: 'Friseur/Make-up', emoji: '💄' },
  { value: 'Trauringe', emoji: '💍' },
  { value: 'Papeterie/Einladungen', emoji: '💌' },
  { value: 'Sonstiges', emoji: '✨' }
];

export const getCategoryEmoji = (category: string): string => {
  const found = VENDOR_CATEGORIES.find(cat => cat.value === category);
  return found ? found.emoji : '✨';
};

export const normalizeUrl = (url: string): string => {
  if (!url) return '';
  const trimmed = url.trim();
  if (trimmed.startsWith('www.')) {
    return `https://${trimmed}`;
  }
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    return `https://${trimmed}`;
  }
  return trimmed;
};
