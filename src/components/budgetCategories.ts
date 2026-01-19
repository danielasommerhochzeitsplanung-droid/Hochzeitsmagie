export const BUDGET_CATEGORIES = [
  { value: 'Location/Veranstaltungsort', emoji: '🏰' },
  { value: 'Catering', emoji: '🍽️' },
  { value: 'Fotografie', emoji: '📸' },
  { value: 'Videografie', emoji: '🎥' },
  { value: 'Musik/DJ/Band', emoji: '🎵' },
  { value: 'Blumen/Floristik', emoji: '💐' },
  { value: 'Torte/Konditorei', emoji: '🎂' },
  { value: 'Hochzeitsplaner', emoji: '📋' },
  { value: 'Transport/Fahrzeuge', emoji: '🚗' },
  { value: 'Dekoration', emoji: '🎨' },
  { value: 'Brautmode/Anzug', emoji: '👗' },
  { value: 'Friseur/Make-up', emoji: '💄' },
  { value: 'Ringe/Schmuck', emoji: '💍' },
  { value: 'Papeterie/Einladungen', emoji: '💌' },
  { value: 'Unterkunft', emoji: '🏨' },
  { value: 'Sonstiges', emoji: '✨' }
];

export const getCategoryEmoji = (category: string): string => {
  const found = BUDGET_CATEGORIES.find(cat => cat.value === category);
  return found ? found.emoji : '✨';
};
