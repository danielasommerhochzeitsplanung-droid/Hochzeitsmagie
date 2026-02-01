/*
  # Update Location Tasks with New Phase-Based Structure
  
  This migration replaces the 4 existing location tasks with a comprehensive
  14-task system organized into 3 phases with precise timing distributions.
  
  ## Changes
  
  1. Delete Old Location Tasks:
    - Removes location-1 through location-4 (old structure)
  
  2. Add New 14 Location Tasks:
    
    **Phase 1: Location finden & sichern (Tasks 1-8)**
    Focus: Finding and booking the venue
    - Budget festlegen
    - Anforderungen definieren
    - Recherche
    - Besichtigungstermine
    - Besichtigen
    - Pro/Contra-Liste
    - Entscheidung
    - Vertrag & Anzahlung
    
    **Phase 2: Details klären (Tasks 9-11)**
    Focus: Planning logistics and technical details
    - Grundriss + Raumaufteilung
    - Catering-Optionen
    - Technik-Check
    
    **Phase 3: Finale Koordination (Tasks 12-14)**
    Focus: Final coordination before wedding (ends 2 weeks before)
    - Timeline final abstimmen
    - Ansprechpartner festlegen
    - Notfallplan besprechen
  
  3. Task Dependencies:
    - Tasks follow logical sequence (e.g., Task 2 depends on Task 1)
    - Phase 3 tasks depend on completion of Phase 2 tasks
  
  4. Timing Distribution:
    All tasks support multiple planning timelines (6, 9, 12, 18, 24 months)
    Phase 3 tasks also include 'immediate' and '3_months' timing
  
  ## Security
  No changes to RLS policies needed.
*/

-- Delete old location tasks
DELETE FROM task_templates WHERE id IN ('location-1', 'location-2', 'location-3', 'location-4');

-- Insert Phase 1: Location finden & sichern (Tasks 1-8)
INSERT INTO task_templates (
  id, category, task_name, description, priority, default_duration, 
  timing_rules, main_category, depends_on, planning_timeline
) VALUES
(
  'location-1',
  'location',
  'Budget für Location festlegen',
  'Definieren Sie Ihr Gesamtbudget für die Location und legen Sie fest, welchen Anteil die Locationmiete ausmachen darf. Berücksichtigen Sie dabei auch Nebenkosten wie Strom, Heizung, Reinigung, Versicherung.',
  'high',
  7,
  '{"6_months": true, "9_months": true, "12_months": true, "18_months": true}'::jsonb,
  'location_venue',
  '{}',
  ARRAY['6_months', '9_months', '12_months', '18_months']
),
(
  'location-2',
  'location',
  'Anforderungen definieren (Gästezahl, Stil, Must-haves)',
  'Erstellen Sie eine Liste mit allen wichtigen Anforderungen: Wie viele Gäste erwarten Sie? Welcher Stil gefällt Ihnen (rustikal, modern, romantisch)? Was sind absolute Must-haves (z.B. Barrierefreiheit, Übernachtungsmöglichkeiten, Indoor/Outdoor)?',
  'high',
  7,
  '{"6_months": true, "9_months": true, "12_months": true, "18_months": true}'::jsonb,
  'location_venue',
  ARRAY['location-1'],
  ARRAY['6_months', '9_months', '12_months', '18_months']
),
(
  'location-3',
  'location',
  'Locations recherchieren (online, Empfehlungen)',
  'Suchen Sie online nach passenden Locations, fragen Sie Freunde und Familie nach Empfehlungen, schauen Sie sich Hochzeitsblogs und Instagram an. Erstellen Sie eine Shortlist von 5-10 interessanten Locations.',
  'high',
  14,
  '{"6_months": true, "9_months": true, "12_months": true, "18_months": true}'::jsonb,
  'location_venue',
  ARRAY['location-2'],
  ARRAY['6_months', '9_months', '12_months', '18_months']
),
(
  'location-4',
  'location',
  'Besichtigungstermine vereinbaren',
  'Kontaktieren Sie die Locations auf Ihrer Shortlist und vereinbaren Sie Besichtigungstermine. Fragen Sie vorab nach Verfügbarkeit an Ihrem Wunschtermin und groben Preisinformationen.',
  'high',
  7,
  '{"6_months": true, "9_months": true, "12_months": true, "18_months": true}'::jsonb,
  'location_venue',
  ARRAY['location-3'],
  ARRAY['6_months', '9_months', '12_months', '18_months']
),
(
  'location-5',
  'location',
  'Locations besichtigen',
  'Besuchen Sie die Locations persönlich. Achten Sie auf: Raumgröße, Atmosphäre, Parkplätze, Akustik, Lichtverhältnisse, sanitäre Anlagen, Küche/Catering-Möglichkeiten. Machen Sie Fotos und Notizen.',
  'high',
  14,
  '{"6_months": true, "9_months": true, "12_months": true, "18_months": true}'::jsonb,
  'location_venue',
  ARRAY['location-4'],
  ARRAY['6_months', '9_months', '12_months', '18_months']
),
(
  'location-6',
  'location',
  'Pro/Contra-Liste erstellen',
  'Vergleichen Sie alle besichtigten Locations anhand Ihrer Kriterien: Preis, Atmosphäre, Kapazität, Ausstattung, Flexibilität, Service. Gewichten Sie die Faktoren nach Wichtigkeit.',
  'high',
  7,
  '{"6_months": true, "9_months": true, "12_months": true, "18_months": true}'::jsonb,
  'location_venue',
  ARRAY['location-5'],
  ARRAY['6_months', '9_months', '12_months', '18_months']
),
(
  'location-7',
  'location',
  'Entscheidung treffen',
  'Treffen Sie gemeinsam die finale Entscheidung für eine Location. Besprechen Sie eventuelle Bedenken und stellen Sie sicher, dass beide Partner mit der Wahl glücklich sind.',
  'high',
  3,
  '{"6_months": true, "9_months": true, "12_months": true, "18_months": true}'::jsonb,
  'location_venue',
  ARRAY['location-6'],
  ARRAY['6_months', '9_months', '12_months', '18_months']
),
(
  'location-8',
  'location',
  'Vertrag unterschreiben & Anzahlung leisten',
  'Prüfen Sie den Vertrag sorgfältig: Mietpreis, Nebenkosten, Stornierungsbedingungen, inkludierte Leistungen, Haftung. Unterschreiben Sie den Vertrag und leisten Sie die Anzahlung. Bewahren Sie alle Unterlagen gut auf.',
  'high',
  7,
  '{"6_months": true, "9_months": true, "12_months": true, "18_months": true}'::jsonb,
  'location_venue',
  ARRAY['location-7'],
  ARRAY['6_months', '9_months', '12_months', '18_months']
);

-- Insert Phase 2: Details klären (Tasks 9-11)
INSERT INTO task_templates (
  id, category, task_name, description, priority, default_duration, 
  timing_rules, main_category, depends_on, planning_timeline
) VALUES
(
  'location-9',
  'location',
  'Grundriss + Raumaufteilung besprechen',
  'Planen Sie mit der Location die genaue Raumaufteilung: Wo steht die Tafel/Tische? Wo ist die Tanzfläche? Wo der Empfangsbereich? Klären Sie Bestuhlung für die Zeremonie (falls vor Ort). Erstellen Sie einen Grundriss-Plan.',
  'high',
  14,
  '{"6_months": true, "9_months": true, "12_months": true, "18_months": true}'::jsonb,
  'location_venue',
  ARRAY['location-8'],
  ARRAY['6_months', '9_months', '12_months', '18_months']
),
(
  'location-10',
  'location',
  'Catering-Optionen abklären',
  'Besprechen Sie mit der Location die Catering-Möglichkeiten: Gibt es einen Exklusiv-Caterer? Dürfen Sie einen eigenen Caterer mitbringen? Welche Küche ist vorhanden? Gibt es Geschirr, Besteck, Gläser? Welche Kosten entstehen?',
  'high',
  7,
  '{"6_months": true, "9_months": true, "12_months": true, "18_months": true}'::jsonb,
  'location_venue',
  ARRAY['location-8'],
  ARRAY['6_months', '9_months', '12_months', '18_months']
),
(
  'location-11',
  'location',
  'Technik-Check (Sound, Licht, Beamer)',
  'Prüfen Sie die technische Ausstattung: Welche Soundanlage ist vorhanden? Gibt es Mikrofone? Wie ist die Beleuchtung? Gibt es einen Beamer für Präsentationen? Was muss extern gemietet werden? Wer ist für den technischen Support zuständig?',
  'medium',
  7,
  '{"6_months": true, "9_months": true, "12_months": true, "18_months": true}'::jsonb,
  'location_venue',
  ARRAY['location-8'],
  ARRAY['6_months', '9_months', '12_months', '18_months']
);

-- Insert Phase 3: Finale Koordination (Tasks 12-14)
INSERT INTO task_templates (
  id, category, task_name, description, priority, default_duration, 
  timing_rules, main_category, depends_on, planning_timeline
) VALUES
(
  'location-12',
  'location',
  'Timeline final abstimmen',
  'Erstellen Sie gemeinsam mit der Location einen detaillierten Zeitplan für den Hochzeitstag: Aufbau-Beginn, Einlass, Zeremonie, Essen, Tortenanschnitt, Erste Tanz, Party, Abbau. Klären Sie Zeitfenster für Lieferanten.',
  'high',
  7,
  '{"immediate": true, "3_months": true, "6_months": true, "9_months": true, "12_months": true, "18_months": true}'::jsonb,
  'location_venue',
  ARRAY['location-9', 'location-10', 'location-11'],
  ARRAY['immediate', '3_months', '6_months', '9_months', '12_months', '18_months']
),
(
  'location-13',
  'location',
  'Ansprechpartner am Hochzeitstag festlegen',
  'Definieren Sie klare Ansprechpartner: Wer ist vor Ort für die Location verantwortlich? Welche Telefonnummern sind im Notfall erreichbar? Gibt es einen Koordinator/Service-Mitarbeiter während der Feier?',
  'high',
  3,
  '{"immediate": true, "3_months": true, "6_months": true, "9_months": true, "12_months": true, "18_months": true}'::jsonb,
  'location_venue',
  ARRAY['location-12'],
  ARRAY['immediate', '3_months', '6_months', '9_months', '12_months', '18_months']
),
(
  'location-14',
  'location',
  'Notfallplan besprechen',
  'Klären Sie mit der Location alle Notfall-Szenarien: Was passiert bei Regen (wenn Outdoor geplant)? Gibt es einen Plan B-Raum? Was gilt bei Stromausfall? Wo sind Erste-Hilfe-Kasten und Feuerlöscher? Welche Versicherungen greifen?',
  'medium',
  3,
  '{"immediate": true, "3_months": true, "6_months": true, "9_months": true, "12_months": true, "18_months": true}'::jsonb,
  'location_venue',
  ARRAY['location-12'],
  ARRAY['immediate', '3_months', '6_months', '9_months', '12_months', '18_months']
);
