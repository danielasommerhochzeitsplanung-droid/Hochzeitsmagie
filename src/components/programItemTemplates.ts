export interface ProgramItemTemplate {
  name_de: string;
  name_en: string;
  type: string;
  durationMinutes: number;
  description_de: string;
  description_en: string;
}

export const programItemTemplates: ProgramItemTemplate[] = [
  {
    name_de: 'Ankunft der Gäste',
    name_en: 'Arrival of Guests',
    type: 'Arrival',
    durationMinutes: 30,
    description_de: 'Ankunft und Begrüßung der Gäste',
    description_en: 'Guest arrival and welcome'
  },
  {
    name_de: 'Sektempfang',
    name_en: 'Champagne Reception',
    type: 'Reception',
    durationMinutes: 45,
    description_de: 'Willkommensgetränke und Häppchen',
    description_en: 'Welcome drinks and canapés'
  },
  {
    name_de: 'Zeremonie',
    name_en: 'Ceremony',
    type: 'Ceremony',
    durationMinutes: 45,
    description_de: 'Trauzeremonie',
    description_en: 'Wedding ceremony'
  },
  {
    name_de: 'Gratulation',
    name_en: 'Congratulations',
    type: 'Congratulations',
    durationMinutes: 30,
    description_de: 'Glückwünsche durch die Gäste',
    description_en: 'Receiving congratulations from guests'
  },
  {
    name_de: 'Fotoshooting',
    name_en: 'Photo Session',
    type: 'Photos',
    durationMinutes: 60,
    description_de: 'Professionelles Fotoshooting',
    description_en: 'Professional photo session'
  },
  {
    name_de: 'Gruppenfotos',
    name_en: 'Group Photos',
    type: 'Photos',
    durationMinutes: 30,
    description_de: 'Gruppen- und Familienfotos',
    description_en: 'Group and family photos'
  },
  {
    name_de: 'Kaffee & Kuchen',
    name_en: 'Coffee & Cake',
    type: 'Coffee',
    durationMinutes: 60,
    description_de: 'Kaffeepause mit Hochzeitstorte',
    description_en: 'Coffee break with wedding cake'
  },
  {
    name_de: 'Cocktailstunde',
    name_en: 'Cocktail Hour',
    type: 'Reception',
    durationMinutes: 60,
    description_de: 'Cocktailempfang',
    description_en: 'Cocktail reception'
  },
  {
    name_de: 'Abendessen',
    name_en: 'Dinner',
    type: 'Dinner',
    durationMinutes: 120,
    description_de: 'Festliches Abendessen',
    description_en: 'Wedding dinner'
  },
  {
    name_de: 'Reden',
    name_en: 'Speeches',
    type: 'Speeches',
    durationMinutes: 45,
    description_de: 'Hochzeitsreden und Toasts',
    description_en: 'Wedding speeches and toasts'
  },
  {
    name_de: 'Eröffnungstanz',
    name_en: 'First Dance',
    type: 'Dance',
    durationMinutes: 15,
    description_de: 'Erster Tanz des Brautpaares',
    description_en: 'First dance of the couple'
  },
  {
    name_de: 'Anschneiden der Torte',
    name_en: 'Cake Cutting',
    type: 'Cake',
    durationMinutes: 15,
    description_de: 'Anschneiden der Hochzeitstorte',
    description_en: 'Cutting the wedding cake'
  },
  {
    name_de: 'Tanz',
    name_en: 'Dancing',
    type: 'Dance',
    durationMinutes: 180,
    description_de: 'Tanzparty',
    description_en: 'Dance party'
  },
  {
    name_de: 'Mitternachtssnack',
    name_en: 'Midnight Snack',
    type: 'Food',
    durationMinutes: 30,
    description_de: 'Späte Snacks',
    description_en: 'Late night snacks'
  },
  {
    name_de: 'Brautstraußwurf',
    name_en: 'Bouquet Toss',
    type: 'Activity',
    durationMinutes: 10,
    description_de: 'Werfen des Brautstraußes',
    description_en: 'Bouquet toss ceremony'
  },
  {
    name_de: 'Strumpfbandwurf',
    name_en: 'Garter Toss',
    type: 'Activity',
    durationMinutes: 10,
    description_de: 'Werfen des Strumpfbandes',
    description_en: 'Garter toss ceremony'
  },
  {
    name_de: 'Gästetransport',
    name_en: 'Guest Transport',
    type: 'Transport',
    durationMinutes: 30,
    description_de: 'Transport für Gäste',
    description_en: 'Transport for guests'
  },
  {
    name_de: 'Spiele & Aktivitäten',
    name_en: 'Games & Activities',
    type: 'Activity',
    durationMinutes: 45,
    description_de: 'Hochzeitsspiele und Aktivitäten',
    description_en: 'Wedding games and activities'
  },
  {
    name_de: 'Gastgeschenke-Verteilung',
    name_en: 'Wedding Favors Distribution',
    type: 'Activity',
    durationMinutes: 20,
    description_de: 'Verteilung der Gastgeschenke an die Gäste',
    description_en: 'Distribution of wedding favors to guests'
  },
  {
    name_de: 'Wunderkerzen-Abschied',
    name_en: 'Sparkler Exit',
    type: 'Exit',
    durationMinutes: 15,
    description_de: 'Verabschiedung mit Wunderkerzen',
    description_en: 'Sparkler send-off'
  },
  {
    name_de: 'Verabschiedung',
    name_en: 'Farewell',
    type: 'Exit',
    durationMinutes: 30,
    description_de: 'Verabschiedung der Gäste',
    description_en: 'Farewell to guests'
  }
];

export const programItemTypes = [
  'Arrival',
  'Reception',
  'Ceremony',
  'Congratulations',
  'Photos',
  'Coffee',
  'Dinner',
  'Speeches',
  'Dance',
  'Cake',
  'Food',
  'Activity',
  'Transport',
  'Exit',
  'Custom'
];
