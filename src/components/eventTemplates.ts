export interface EventTemplate {
  name_de: string;
  name_en: string;
  emoji: string;
}

export const EVENT_TEMPLATES: EventTemplate[] = [
  { name_de: 'Getting Ready', name_en: 'Getting Ready', emoji: '💄' },
  { name_de: 'Standesamtliche Trauung', name_en: 'Civil Ceremony', emoji: '💍' },
  { name_de: 'Kirchliche Trauung', name_en: 'Church Ceremony', emoji: '⛪' },
  { name_de: 'Freie Trauung', name_en: 'Free Ceremony', emoji: '🌸' },
  { name_de: 'Traditionelle Zeremonie', name_en: 'Traditional Ceremony', emoji: '🕊️' },
  { name_de: 'Nachmittagsprogramm', name_en: 'Afternoon Program', emoji: '☀️' },
  { name_de: 'Abendprogramm', name_en: 'Evening Program', emoji: '🌙' },
  { name_de: 'Hochzeitsessen', name_en: 'Wedding Dinner', emoji: '🍽️' },
  { name_de: 'Abend und Tanz', name_en: 'Evening & Dance', emoji: '💃' },
  { name_de: 'Brunch (nächster Tag)', name_en: 'Brunch (next day)', emoji: '🌅' },
  { name_de: 'Willkommensabend', name_en: 'Welcome Evening', emoji: '🎉' },
  { name_de: 'Junggesellenabschied', name_en: 'Bachelor Party', emoji: '🎊' },
  { name_de: 'Junggesellinnenabschied', name_en: 'Bachelorette Party', emoji: '👰' },
  { name_de: 'Verlobungsfeier', name_en: 'Engagement Party', emoji: '💐' },
  { name_de: 'Verwöhntag', name_en: 'Pampering Day', emoji: '✨' },
  { name_de: '+ Eigenes Event', name_en: '+ Custom Event', emoji: '➕' },
];
