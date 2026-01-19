// Seed-Script für Testdaten
// Dieses Script fügt realistische Hochzeitsdaten in localStorage ein

const generateId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const STORAGE_PREFIX = 'wedding_';

// Helper-Funktion zum Speichern
const saveToStorage = (key, data) => {
  localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
};

// Datum-Helper
const getDateString = (daysFromNow) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
};

console.log('🎉 Starte Seed-Prozess...');

// 1. LOCATIONS
const locations = [
  {
    id: generateId(),
    name: 'Standesamt Mitte',
    address: 'Rathausstraße 15',
    city: 'Berlin',
    postal_code: '10178',
    country: 'Deutschland',
    email: 'info@standesamt-mitte.de',
    phone: '+49 30 12345678',
    website: 'https://standesamt-mitte.de',
    capacity: 80,
    notes: 'Historisches Gebäude mit wunderschönem Trausaal',
    archived: false,
    created_at: new Date().toISOString()
  },
  {
    id: generateId(),
    name: 'Schloss Charlottenburg Park',
    address: 'Spandauer Damm 20',
    city: 'Berlin',
    postal_code: '14059',
    country: 'Deutschland',
    phone: '+49 30 87654321',
    capacity: 50,
    notes: 'Perfekt für Fotoshootings im Schlosspark',
    archived: false,
    created_at: new Date().toISOString()
  },
  {
    id: generateId(),
    name: 'Hotel & Restaurant Bellevue',
    address: 'Am See 7',
    city: 'Berlin',
    postal_code: '10785',
    country: 'Deutschland',
    email: 'events@bellevue-berlin.de',
    phone: '+49 30 98765432',
    website: 'https://bellevue-berlin.de',
    capacity: 150,
    notes: 'Exklusiver Ballsaal mit Seeblick, eigene Küche',
    archived: false,
    created_at: new Date().toISOString()
  },
  {
    id: generateId(),
    name: 'Café Rosengarten',
    address: 'Gartenstraße 42',
    city: 'Berlin',
    postal_code: '10115',
    country: 'Deutschland',
    email: 'info@rosengarten-cafe.de',
    phone: '+49 30 55667788',
    capacity: 40,
    notes: 'Gemütliche Location für Verlobungsfeier',
    archived: false,
    created_at: new Date().toISOString()
  },
  {
    id: generateId(),
    name: 'Villa Brautsuite',
    address: 'Lindenallee 88',
    city: 'Berlin',
    postal_code: '10969',
    country: 'Deutschland',
    email: 'info@villa-brautsuite.de',
    phone: '+49 30 11223344',
    capacity: 10,
    notes: 'Exklusive Suite zum Getting Ready mit professioneller Beleuchtung',
    archived: false,
    created_at: new Date().toISOString()
  }
];

saveToStorage('locations', locations);
console.log('✅ 5 Locations angelegt');

// 2. EVENTS
const verlobungsfeierDatum = getDateString(30); // Anfang März (ca. 30 Tage von jetzt)
const hochzeitsDatum = getDateString(120); // ca. 4 Monate später

const events = [
  {
    id: generateId(),
    name_de: 'Verlobungsfeier',
    name_en: 'Engagement Party',
    emoji: '💍',
    active: true,
    is_enabled: true,
    date: verlobungsfeierDatum,
    time_start: '18:00',
    time_end: '23:00',
    location_id: locations[3].id, // Café Rosengarten
    transport_info: '',
    transport_time_start: null,
    transport_time_end: null,
    transport_type: '',
    transport_from: '',
    transport_to: '',
    transport_provider: '',
    transport_notes: '',
    created_at: new Date().toISOString()
  },
  {
    id: generateId(),
    name_de: 'Getting Ready',
    name_en: 'Getting Ready',
    emoji: '💄',
    active: true,
    is_enabled: true,
    date: hochzeitsDatum,
    time_start: '09:00',
    time_end: '12:00',
    location_id: locations[4].id, // Villa Brautsuite
    transport_info: '',
    transport_time_start: null,
    transport_time_end: null,
    transport_type: '',
    transport_from: '',
    transport_to: '',
    transport_provider: '',
    transport_notes: '',
    created_at: new Date().toISOString()
  },
  {
    id: generateId(),
    name_de: 'Standesamtliche Trauung',
    name_en: 'Civil Wedding Ceremony',
    emoji: '💒',
    active: true,
    is_enabled: true,
    date: hochzeitsDatum,
    time_start: '13:00',
    time_end: '14:30',
    location_id: locations[0].id, // Standesamt
    transport_info: 'Shuttle-Service für Gäste',
    transport_time_start: '12:30',
    transport_time_end: '13:00',
    transport_type: 'Bus',
    transport_from: 'Hotel Adlon',
    transport_to: 'Standesamt Mitte',
    transport_provider: 'Berlin Shuttle Service',
    transport_notes: '2 Busse à 40 Personen',
    created_at: new Date().toISOString()
  },
  {
    id: generateId(),
    name_de: 'Nachmittagsprogramm',
    name_en: 'Afternoon Program',
    emoji: '📸',
    active: true,
    is_enabled: true,
    date: hochzeitsDatum,
    time_start: '15:00',
    time_end: '18:00',
    location_id: locations[1].id, // Schloss Charlottenburg Park
    transport_info: 'Oldtimer-Shuttle für Brautpaar',
    transport_time_start: '14:30',
    transport_time_end: '15:00',
    transport_type: 'Oldtimer',
    transport_from: 'Standesamt Mitte',
    transport_to: 'Schloss Charlottenburg',
    transport_provider: 'Classic Cars Berlin',
    transport_notes: 'Cabrio bei gutem Wetter',
    created_at: new Date().toISOString()
  },
  {
    id: generateId(),
    name_de: 'Abendprogramm & Dinner',
    name_en: 'Evening Program & Dinner',
    emoji: '🍾',
    active: true,
    is_enabled: true,
    date: hochzeitsDatum,
    time_start: '18:30',
    time_end: '01:00',
    location_id: locations[2].id, // Hotel Bellevue
    transport_info: 'Shuttle-Service für alle Gäste',
    transport_time_start: '18:00',
    transport_time_end: '18:30',
    transport_type: 'Bus',
    transport_from: 'Schloss Charlottenburg',
    transport_to: 'Hotel Bellevue',
    transport_provider: 'Berlin Shuttle Service',
    transport_notes: '2 Busse für alle Gäste',
    created_at: new Date().toISOString()
  },
  {
    id: generateId(),
    name_de: 'Polterabend',
    name_en: 'Polterabend',
    emoji: '🎊',
    active: true,
    is_enabled: true,
    date: getDateString(119), // Tag vor der Hochzeit
    time_start: '19:00',
    time_end: '24:00',
    location_id: locations[3].id, // Café Rosengarten
    transport_info: '',
    transport_time_start: null,
    transport_time_end: null,
    transport_type: '',
    transport_from: '',
    transport_to: '',
    transport_provider: '',
    transport_notes: '',
    created_at: new Date().toISOString()
  }
];

saveToStorage('events', events);
console.log('✅ 6 Events angelegt');

// 3. DIENSTLEISTER (VENDORS)
const vendors = [
  {
    id: generateId(),
    category: 'Fotografie',
    company_name: 'Lichtblick Fotografie',
    contact_person_planning: 'Sarah Müller',
    phone_planning: '+49 30 12345001',
    email_planning: 'sarah@lichtblick-foto.de',
    website: 'https://lichtblick-foto.de',
    address: 'Friedrichstraße 123, 10117 Berlin',
    first_contact_date: getDateString(-60),
    status: 'Gebucht',
    contract_status: 'Vertrag unterschrieben',
    price_estimate: 2800,
    final_price: 2800,
    payment_status: 'Anzahlung geleistet',
    rating: 5,
    notes: 'Sehr professionell, macht auch Drohnenaufnahmen',
    archived: false,
    catering_events: [events[2].id, events[3].id, events[4].id],
    event_assignments: [events[2].id, events[3].id, events[4].id],
    created_at: new Date().toISOString()
  },
  {
    id: generateId(),
    category: 'Videografie',
    company_name: 'Filmemotion Studios',
    contact_person_planning: 'Marcus Weber',
    phone_planning: '+49 30 12345002',
    email_planning: 'marcus@filmemotion.de',
    website: 'https://filmemotion.de',
    address: 'Kurfürstendamm 88, 10709 Berlin',
    first_contact_date: getDateString(-55),
    status: 'Gebucht',
    contract_status: 'Vertrag unterschrieben',
    price_estimate: 3200,
    final_price: 3500,
    payment_status: 'Anzahlung geleistet',
    rating: 5,
    notes: 'Erstellt auch Same-Day-Edit Video',
    archived: false,
    catering_events: [events[2].id, events[3].id, events[4].id],
    event_assignments: [events[2].id, events[3].id, events[4].id],
    created_at: new Date().toISOString()
  },
  {
    id: generateId(),
    category: 'Catering',
    company_name: 'Gourmet Deluxe Catering',
    contact_person_planning: 'Julia Schneider',
    phone_planning: '+49 30 12345003',
    email_planning: 'julia@gourmet-deluxe.de',
    website: 'https://gourmet-deluxe.de',
    address: 'Potsdamer Platz 5, 10785 Berlin',
    first_contact_date: getDateString(-70),
    status: 'Gebucht',
    contract_status: 'Vertrag vollständig',
    price_estimate: 12000,
    final_price: 12500,
    payment_status: 'Anzahlung geleistet',
    rating: 5,
    notes: '5-Gänge-Menü inkl. Mitternachtssnack',
    archived: false,
    catering_events: [],
    event_assignments: [events[4].id],
    created_at: new Date().toISOString()
  },
  {
    id: generateId(),
    category: 'Floristik',
    company_name: 'Blütenzauber',
    contact_person_planning: 'Emma Schmidt',
    phone_planning: '+49 30 12345004',
    email_planning: 'emma@bluetenzauber-berlin.de',
    website: 'https://bluetenzauber.de',
    address: 'Rosenthaler Straße 42, 10178 Berlin',
    first_contact_date: getDateString(-50),
    status: 'Gebucht',
    contract_status: 'Vertrag unterschrieben',
    price_estimate: 2500,
    final_price: 2800,
    payment_status: 'Anzahlung geleistet',
    rating: 5,
    notes: 'Brautstrauß, Tischdeko und Location-Dekoration',
    archived: false,
    catering_events: [events[4].id],
    event_assignments: [events[2].id, events[4].id],
    created_at: new Date().toISOString()
  },
  {
    id: generateId(),
    category: 'DJ / Musik',
    company_name: 'DJ Mike Entertainment',
    contact_person_planning: 'Mike Johnson',
    phone_planning: '+49 30 12345005',
    email_planning: 'mike@djmike-entertainment.de',
    website: 'https://djmike-entertainment.de',
    address: 'Warschauer Straße 70, 10243 Berlin',
    first_contact_date: getDateString(-45),
    status: 'Gebucht',
    contract_status: 'Vertrag unterschrieben',
    price_estimate: 1800,
    final_price: 1800,
    payment_status: 'Anzahlung geleistet',
    rating: 5,
    notes: 'Professionelle Anlage, auch für Trauung',
    archived: false,
    catering_events: [events[4].id],
    event_assignments: [events[2].id, events[4].id],
    created_at: new Date().toISOString()
  },
  {
    id: generateId(),
    category: 'Hochzeitstorte',
    company_name: 'Patisserie Traumtorte',
    contact_person_planning: 'Anna Becker',
    phone_planning: '+49 30 12345006',
    email_planning: 'anna@traumtorte.de',
    website: 'https://traumtorte.de',
    address: 'Unter den Linden 55, 10117 Berlin',
    first_contact_date: getDateString(-40),
    status: 'Gebucht',
    contract_status: 'Vertrag unterschrieben',
    price_estimate: 850,
    final_price: 850,
    payment_status: 'Noch keine Zahlung',
    rating: 5,
    notes: '3-stöckige Torte mit echten Blumen',
    archived: false,
    catering_events: [],
    event_assignments: [events[4].id],
    created_at: new Date().toISOString()
  },
  {
    id: generateId(),
    category: 'Hairstyling',
    company_name: 'Salon Elegance',
    contact_person_planning: 'Lisa Wagner',
    phone_planning: '+49 30 12345007',
    email_planning: 'lisa@salon-elegance.de',
    website: 'https://salon-elegance.de',
    address: 'Kantstraße 12, 10623 Berlin',
    first_contact_date: getDateString(-35),
    status: 'Gebucht',
    contract_status: 'Vertrag unterschrieben',
    price_estimate: 450,
    final_price: 450,
    payment_status: 'Noch keine Zahlung',
    rating: 5,
    notes: 'Braut + 4 Brautjungfern',
    archived: false,
    catering_events: [],
    event_assignments: [events[1].id],
    created_at: new Date().toISOString()
  },
  {
    id: generateId(),
    category: 'Make-up',
    company_name: 'Beauty by Sophia',
    contact_person_planning: 'Sophia Klein',
    phone_planning: '+49 30 12345008',
    email_planning: 'sophia@beauty-sophia.de',
    website: 'https://beauty-sophia.de',
    address: 'Tauentzienstraße 9, 10789 Berlin',
    first_contact_date: getDateString(-35),
    status: 'Gebucht',
    contract_status: 'Vertrag unterschrieben',
    price_estimate: 380,
    final_price: 380,
    payment_status: 'Noch keine Zahlung',
    rating: 5,
    notes: 'Braut-Make-up mit Airbrush-Technik',
    archived: false,
    catering_events: [],
    event_assignments: [events[1].id],
    created_at: new Date().toISOString()
  },
  {
    id: generateId(),
    category: 'Transport',
    company_name: 'Classic Cars Berlin',
    contact_person_planning: 'Thomas Richter',
    phone_planning: '+49 30 12345009',
    email_planning: 'thomas@classiccars-berlin.de',
    website: 'https://classiccars-berlin.de',
    address: 'Invalidenstraße 88, 10115 Berlin',
    first_contact_date: getDateString(-30),
    status: 'Gebucht',
    contract_status: 'Vertrag unterschrieben',
    price_estimate: 650,
    final_price: 650,
    payment_status: 'Noch keine Zahlung',
    rating: 4,
    notes: 'Weißes Cabrio, Baujahr 1965',
    archived: false,
    catering_events: [],
    event_assignments: [events[3].id],
    created_at: new Date().toISOString()
  },
  {
    id: generateId(),
    category: 'Hochzeitsplanung',
    company_name: 'Perfect Day Wedding Planner',
    contact_person_planning: 'Laura Hoffmann',
    phone_planning: '+49 30 12345010',
    email_planning: 'laura@perfectday-wedding.de',
    website: 'https://perfectday-wedding.de',
    address: 'Alexanderplatz 1, 10178 Berlin',
    first_contact_date: getDateString(-90),
    status: 'Gebucht',
    contract_status: 'Vertrag vollständig',
    price_estimate: 4500,
    final_price: 4500,
    payment_status: 'Restbetrag ausstehend',
    rating: 5,
    notes: 'Full-Service Planung und Koordination am Tag',
    archived: false,
    catering_events: [events[2].id, events[3].id, events[4].id],
    event_assignments: [events[0].id, events[1].id, events[2].id, events[3].id, events[4].id, events[5].id],
    created_at: new Date().toISOString()
  }
];

saveToStorage('vendors', vendors);
console.log('✅ 10 Dienstleister angelegt');

// 4. VENDOR CONTACTS (Ansprechpartner für den Eventtag)
const vendorContacts = [
  // Fotograf
  { id: generateId(), vendor_id: vendors[0].id, name: 'Sarah Müller', phone: '+49 30 12345001', email: 'sarah@lichtblick-foto.de', is_primary: true, event_day_contact: true, participates_in_events: [events[2].id, events[3].id, events[4].id], created_at: new Date().toISOString() },
  { id: generateId(), vendor_id: vendors[0].id, name: 'Tim Braun', phone: '+49 30 12345101', email: 'tim@lichtblick-foto.de', is_primary: false, event_day_contact: true, participates_in_events: [events[2].id, events[3].id, events[4].id], created_at: new Date().toISOString() },

  // Videograf
  { id: generateId(), vendor_id: vendors[1].id, name: 'Marcus Weber', phone: '+49 30 12345002', email: 'marcus@filmemotion.de', is_primary: true, event_day_contact: true, participates_in_events: [events[2].id, events[3].id, events[4].id], created_at: new Date().toISOString() },
  { id: generateId(), vendor_id: vendors[1].id, name: 'Kevin Lorenz', phone: '+49 30 12345102', email: 'kevin@filmemotion.de', is_primary: false, event_day_contact: true, participates_in_events: [events[2].id, events[3].id, events[4].id], created_at: new Date().toISOString() },
  { id: generateId(), vendor_id: vendors[1].id, name: 'Jana Koch', phone: '+49 30 12345202', email: 'jana@filmemotion.de', is_primary: false, event_day_contact: true, participates_in_events: [events[4].id], created_at: new Date().toISOString() },

  // Catering
  { id: generateId(), vendor_id: vendors[2].id, name: 'Julia Schneider', phone: '+49 30 12345003', email: 'julia@gourmet-deluxe.de', is_primary: true, event_day_contact: false, participates_in_events: [], created_at: new Date().toISOString() },
  { id: generateId(), vendor_id: vendors[2].id, name: 'Chef Thomas Meyer', phone: '+49 30 12345103', email: 'thomas@gourmet-deluxe.de', is_primary: false, event_day_contact: true, participates_in_events: [events[4].id], created_at: new Date().toISOString() },
  { id: generateId(), vendor_id: vendors[2].id, name: 'Service Koordinator Peter Lang', phone: '+49 30 12345203', email: 'peter@gourmet-deluxe.de', is_primary: false, event_day_contact: true, participates_in_events: [events[4].id], created_at: new Date().toISOString() },

  // Floristik
  { id: generateId(), vendor_id: vendors[3].id, name: 'Emma Schmidt', phone: '+49 30 12345004', email: 'emma@bluetenzauber-berlin.de', is_primary: true, event_day_contact: true, participates_in_events: [events[2].id, events[4].id], created_at: new Date().toISOString() },
  { id: generateId(), vendor_id: vendors[3].id, name: 'Nina Hoffmann', phone: '+49 30 12345104', email: 'nina@bluetenzauber-berlin.de', is_primary: false, event_day_contact: true, participates_in_events: [events[4].id], created_at: new Date().toISOString() },

  // DJ
  { id: generateId(), vendor_id: vendors[4].id, name: 'Mike Johnson', phone: '+49 30 12345005', email: 'mike@djmike-entertainment.de', is_primary: true, event_day_contact: true, participates_in_events: [events[2].id, events[4].id], created_at: new Date().toISOString() },

  // Torte
  { id: generateId(), vendor_id: vendors[5].id, name: 'Anna Becker', phone: '+49 30 12345006', email: 'anna@traumtorte.de', is_primary: true, event_day_contact: true, participates_in_events: [events[4].id], created_at: new Date().toISOString() },

  // Hairstyling
  { id: generateId(), vendor_id: vendors[6].id, name: 'Lisa Wagner', phone: '+49 30 12345007', email: 'lisa@salon-elegance.de', is_primary: true, event_day_contact: true, participates_in_events: [events[1].id], created_at: new Date().toISOString() },
  { id: generateId(), vendor_id: vendors[6].id, name: 'Marie Fischer', phone: '+49 30 12345107', email: 'marie@salon-elegance.de', is_primary: false, event_day_contact: true, participates_in_events: [events[1].id], created_at: new Date().toISOString() },

  // Make-up
  { id: generateId(), vendor_id: vendors[7].id, name: 'Sophia Klein', phone: '+49 30 12345008', email: 'sophia@beauty-sophia.de', is_primary: true, event_day_contact: true, participates_in_events: [events[1].id], created_at: new Date().toISOString() },

  // Transport
  { id: generateId(), vendor_id: vendors[8].id, name: 'Thomas Richter', phone: '+49 30 12345009', email: 'thomas@classiccars-berlin.de', is_primary: true, event_day_contact: false, participates_in_events: [], created_at: new Date().toISOString() },
  { id: generateId(), vendor_id: vendors[8].id, name: 'Fahrer Robert Zimmermann', phone: '+49 30 12345109', email: 'robert@classiccars-berlin.de', is_primary: false, event_day_contact: true, participates_in_events: [events[3].id], created_at: new Date().toISOString() },

  // Wedding Planner
  { id: generateId(), vendor_id: vendors[9].id, name: 'Laura Hoffmann', phone: '+49 30 12345010', email: 'laura@perfectday-wedding.de', is_primary: true, event_day_contact: true, participates_in_events: [events[0].id, events[1].id, events[2].id, events[3].id, events[4].id, events[5].id], created_at: new Date().toISOString() },
  { id: generateId(), vendor_id: vendors[9].id, name: 'Assistentin Clara Neumann', phone: '+49 30 12345110', email: 'clara@perfectday-wedding.de', is_primary: false, event_day_contact: true, participates_in_events: [events[2].id, events[3].id, events[4].id], created_at: new Date().toISOString() }
];

saveToStorage('vendor_contacts', vendorContacts);
console.log('✅ 19 Vendor-Kontakte angelegt');

// 5. PROGRAMMPUNKTE
const programItems = [
  // Verlobungsfeier
  { id: generateId(), event_id: events[0].id, title: 'Ankunft der Gäste', type: 'Arrival', start_time: '18:00', end_time: '18:30', duration_minutes: 30, location: 'Eingangsbereich', description: 'Empfang mit Sekt', order_index: 0, notes: '', support_team_id: null, created_at: new Date().toISOString() },
  { id: generateId(), event_id: events[0].id, title: 'Begrüßung & Ansprache', type: 'Speeches', start_time: '18:30', end_time: '19:00', duration_minutes: 30, location: 'Hauptraum', description: 'Kurze Ansprache des Brautpaares', order_index: 1, notes: '', support_team_id: null, created_at: new Date().toISOString() },
  { id: generateId(), event_id: events[0].id, title: 'Abendessen', type: 'Dinner', start_time: '19:00', end_time: '21:00', duration_minutes: 120, location: 'Hauptraum', description: 'Buffet mit internationalen Speisen', order_index: 2, notes: '', support_team_id: null, created_at: new Date().toISOString() },
  { id: generateId(), event_id: events[0].id, title: 'Gemütliches Beisammensein', type: 'Activity', start_time: '21:00', end_time: '23:00', duration_minutes: 120, location: 'Gesamte Location', description: 'Musik und Gespräche', order_index: 3, notes: '', support_team_id: null, created_at: new Date().toISOString() },

  // Getting Ready
  { id: generateId(), event_id: events[1].id, title: 'Braut Ankunft', type: 'Arrival', start_time: '09:00', end_time: '09:15', duration_minutes: 15, location: 'Villa Brautsuite', description: 'Braut und Brautjungfern treffen ein', order_index: 0, notes: '', support_team_id: null, created_at: new Date().toISOString() },
  { id: generateId(), event_id: events[1].id, title: 'Hairstyling', type: 'Activity', start_time: '09:15', end_time: '10:30', duration_minutes: 75, location: 'Styling-Bereich', description: 'Haare für Braut und Brautjungfern', order_index: 1, notes: '', support_team_id: null, created_at: new Date().toISOString() },
  { id: generateId(), event_id: events[1].id, title: 'Make-up', type: 'Activity', start_time: '10:30', end_time: '11:30', duration_minutes: 60, location: 'Styling-Bereich', description: 'Braut-Make-up', order_index: 2, notes: '', support_team_id: null, created_at: new Date().toISOString() },
  { id: generateId(), event_id: events[1].id, title: 'Ankleiden', type: 'Activity', start_time: '11:30', end_time: '12:00', duration_minutes: 30, location: 'Ankleidezimmer', description: 'Brautkleid anziehen', order_index: 3, notes: '', support_team_id: null, created_at: new Date().toISOString() },

  // Standesamtliche Trauung
  { id: generateId(), event_id: events[2].id, title: 'Ankunft Gäste', type: 'Arrival', start_time: '12:45', end_time: '13:00', duration_minutes: 15, location: 'Standesamt Eingang', description: 'Gäste versammeln sich', order_index: 0, notes: '', support_team_id: null, created_at: new Date().toISOString() },
  { id: generateId(), event_id: events[2].id, title: 'Einzug Brautpaar', type: 'Ceremony', start_time: '13:00', end_time: '13:05', duration_minutes: 5, location: 'Trausaal', description: 'Feierlicher Einzug', order_index: 1, notes: '', support_team_id: null, created_at: new Date().toISOString() },
  { id: generateId(), event_id: events[2].id, title: 'Trauzeremonie', type: 'Ceremony', start_time: '13:05', end_time: '13:35', duration_minutes: 30, location: 'Trausaal', description: 'Standesamtliche Trauung', order_index: 2, notes: '', support_team_id: null, created_at: new Date().toISOString() },
  { id: generateId(), event_id: events[2].id, title: 'Auszug & Gratulationen', type: 'Congratulations', start_time: '13:35', end_time: '14:00', duration_minutes: 25, location: 'Vor dem Standesamt', description: 'Spalier und Gratulationen', order_index: 3, notes: '', support_team_id: null, created_at: new Date().toISOString() },
  { id: generateId(), event_id: events[2].id, title: 'Sektempfang', type: 'Reception', start_time: '14:00', end_time: '14:30', duration_minutes: 30, location: 'Standesamt Garten', description: 'Sektempfang mit kleinen Häppchen', order_index: 4, notes: '', support_team_id: null, created_at: new Date().toISOString() },

  // Nachmittagsprogramm
  { id: generateId(), event_id: events[3].id, title: 'Ankunft im Park', type: 'Arrival', start_time: '15:00', end_time: '15:15', duration_minutes: 15, location: 'Schlosspark', description: 'Brautpaar und Gäste treffen ein', order_index: 0, notes: '', support_team_id: null, created_at: new Date().toISOString() },
  { id: generateId(), event_id: events[3].id, title: 'Paar-Fotoshooting', type: 'Photos', start_time: '15:15', end_time: '16:30', duration_minutes: 75, location: 'Verschiedene Locations im Park', description: 'Exklusives Fotoshooting für das Brautpaar', order_index: 1, notes: '', support_team_id: null, created_at: new Date().toISOString() },
  { id: generateId(), event_id: events[3].id, title: 'Gruppenfotos', type: 'Photos', start_time: '16:30', end_time: '17:15', duration_minutes: 45, location: 'Vor dem Schloss', description: 'Fotos mit allen Gästen', order_index: 2, notes: '', support_team_id: null, created_at: new Date().toISOString() },
  { id: generateId(), event_id: events[3].id, title: 'Kaffee & Kuchen', type: 'Coffee', start_time: '17:15', end_time: '18:00', duration_minutes: 45, location: 'Schloss-Café', description: 'Entspannte Kaffeepause', order_index: 3, notes: '', support_team_id: null, created_at: new Date().toISOString() },

  // Abendprogramm
  { id: generateId(), event_id: events[4].id, title: 'Ankunft & Empfang', type: 'Arrival', start_time: '18:30', end_time: '19:00', duration_minutes: 30, location: 'Hotellobby', description: 'Empfang mit Champagner', order_index: 0, notes: '', support_team_id: null, created_at: new Date().toISOString() },
  { id: generateId(), event_id: events[4].id, title: 'Eröffnung & Willkommensrede', type: 'Speeches', start_time: '19:00', end_time: '19:15', duration_minutes: 15, location: 'Ballsaal', description: 'Begrüßung durch Hochzeitsplaner', order_index: 1, notes: '', support_team_id: null, created_at: new Date().toISOString() },
  { id: generateId(), event_id: events[4].id, title: 'Festliches Dinner (5 Gänge)', type: 'Dinner', start_time: '19:15', end_time: '21:30', duration_minutes: 135, location: 'Ballsaal', description: 'Exquisites 5-Gänge-Menü', order_index: 2, notes: '', support_team_id: null, created_at: new Date().toISOString() },
  { id: generateId(), event_id: events[4].id, title: 'Hochzeitsreden', type: 'Speeches', start_time: '21:30', end_time: '22:00', duration_minutes: 30, location: 'Ballsaal', description: 'Reden von Trauzeugen und Familie', order_index: 3, notes: '', support_team_id: null, created_at: new Date().toISOString() },
  { id: generateId(), event_id: events[4].id, title: 'Anschneiden der Torte', type: 'Cake', start_time: '22:00', end_time: '22:15', duration_minutes: 15, location: 'Ballsaal', description: 'Traditionelles Anschneiden', order_index: 4, notes: '', support_team_id: null, created_at: new Date().toISOString() },
  { id: generateId(), event_id: events[4].id, title: 'Eröffnungstanz', type: 'Dance', start_time: '22:15', end_time: '22:25', duration_minutes: 10, location: 'Tanzfläche', description: 'Erster Tanz des Brautpaares', order_index: 5, notes: '', support_team_id: null, created_at: new Date().toISOString() },
  { id: generateId(), event_id: events[4].id, title: 'Party & Tanz', type: 'Dance', start_time: '22:25', end_time: '00:30', duration_minutes: 125, location: 'Tanzfläche', description: 'Ausgelassene Tanzparty', order_index: 6, notes: '', support_team_id: null, created_at: new Date().toISOString() },
  { id: generateId(), event_id: events[4].id, title: 'Mitternachtssnack', type: 'Food', start_time: '00:30', end_time: '01:00', duration_minutes: 30, location: 'Buffetbereich', description: 'Burger und Pommes', order_index: 7, notes: '', support_team_id: null, created_at: new Date().toISOString() },

  // Polterabend
  { id: generateId(), event_id: events[5].id, title: 'Ankunft der Gäste', type: 'Arrival', start_time: '19:00', end_time: '19:30', duration_minutes: 30, location: 'Café Eingang', description: 'Lockerer Empfang', order_index: 0, notes: '', support_team_id: null, created_at: new Date().toISOString() },
  { id: generateId(), event_id: events[5].id, title: 'Porzellan werfen', type: 'Activity', start_time: '19:30', end_time: '20:00', duration_minutes: 30, location: 'Innenhof', description: 'Traditionelles Porzellan werfen', order_index: 1, notes: '', support_team_id: null, created_at: new Date().toISOString() },
  { id: generateId(), event_id: events[5].id, title: 'Buffet', type: 'Food', start_time: '20:00', end_time: '22:00', duration_minutes: 120, location: 'Hauptraum', description: 'Rustikales Buffet', order_index: 2, notes: '', support_team_id: null, created_at: new Date().toISOString() },
  { id: generateId(), event_id: events[5].id, title: 'Spiele & Unterhaltung', type: 'Activity', start_time: '22:00', end_time: '24:00', duration_minutes: 120, location: 'Gesamte Location', description: 'Lustige Hochzeitsspiele', order_index: 3, notes: '', support_team_id: null, created_at: new Date().toISOString() }
];

saveToStorage('program_items', programItems);
console.log('✅ 30 Programmpunkte angelegt');

// 6. WEDDING DATA
const weddingData = [{
  id: generateId(),
  couple_name_1: 'Sophie',
  couple_name_2: 'Alexander',
  wedding_date: hochzeitsDatum,
  venue: 'Hotel & Restaurant Bellevue',
  total_budget: 35000,
  created_at: new Date().toISOString()
}];

saveToStorage('wedding_data', weddingData);
console.log('✅ Hochzeitsdaten angelegt');

console.log('\n🎊 Seed-Prozess abgeschlossen!');
console.log('📊 Zusammenfassung:');
console.log('   - 5 Locations');
console.log('   - 6 Events');
console.log('   - 10 Dienstleister');
console.log('   - 19 Vendor-Kontakte (Ansprechpartner)');
console.log('   - 30 Programmpunkte');
console.log('   - 1 Hochzeitsdaten-Eintrag');
console.log('\n✨ Die Anwendung kann nun genutzt werden!');
