/*
  # Update Location Tasks with Structured Phases
  
  This migration replaces existing location tasks with a new structured approach
  organized into 3 phases:
  
  ## Phase 1: Entscheidung & Buchung (Decision & Booking)
  1. Rahmen für die Location festlegen
  2. Locations recherchieren & vergleichen
  3. Locations besichtigen
  4. Location auswählen & buchen
  
  ## Phase 2: Ablauf & Machbarkeit (Process & Feasibility)
  5. Räume, Ablauf & Leistungen mit der Location klären
  
  ## Phase 3: Finalisierung (Finalization)
  6. Ablauf & Plan B final abstimmen
  
  ## Changes
  - Deletes all existing location category tasks
  - Creates 6 new structured tasks with phase information
  - Updates main_category to location_schedule
  
  ## Important
  - This does NOT affect user-created tasks, only task templates
  - Existing tasks from templates will remain unchanged
*/

-- Delete all existing location task templates
DELETE FROM task_templates WHERE category = 'location';

-- Insert new structured location tasks

-- Phase 1: Entscheidung & Buchung
INSERT INTO task_templates (
  id, 
  category, 
  task_name, 
  description, 
  priority, 
  default_duration,
  timing_rules,
  main_category,
  planning_timeline
) VALUES 
(
  'location-phase1-1',
  'location',
  'Rahmen für die Location festlegen',
  'Budget, Gästezahl, Stil, Must-haves definieren',
  'high',
  7,
  '{"18_months": true, "12_months": true, "9_months": true, "6_months": true}'::jsonb,
  'location_schedule',
  ARRAY['Phase 1: Entscheidung & Buchung']
),
(
  'location-phase1-2',
  'location',
  'Locations recherchieren & vergleichen',
  'Recherche, Empfehlungen einholen, Vorauswahl treffen',
  'high',
  14,
  '{"18_months": true, "12_months": true, "9_months": true, "6_months": true}'::jsonb,
  'location_schedule',
  ARRAY['Phase 1: Entscheidung & Buchung']
),
(
  'location-phase1-3',
  'location',
  'Locations besichtigen',
  'Besichtigungstermine wahrnehmen, Gespräch führen, auf Bauchgefühl achten',
  'high',
  14,
  '{"18_months": true, "12_months": true, "9_months": true, "6_months": true}'::jsonb,
  'location_schedule',
  ARRAY['Phase 1: Entscheidung & Buchung']
),
(
  'location-phase1-4',
  'location',
  'Location auswählen & buchen',
  'Vertrag unterschreiben, Anzahlung leisten',
  'high',
  7,
  '{"18_months": true, "12_months": true, "9_months": true, "6_months": true}'::jsonb,
  'location_schedule',
  ARRAY['Phase 1: Entscheidung & Buchung']
),

-- Phase 2: Ablauf & Machbarkeit
(
  'location-phase2-1',
  'location',
  'Räume, Ablauf & Leistungen mit der Location klären',
  'Raumaufteilung, Catering-Optionen, Technik, Logistik, Ansprechpartner besprechen',
  'high',
  14,
  '{"12_months": true, "9_months": true, "6_months": true, "3_months": true}'::jsonb,
  'location_schedule',
  ARRAY['Phase 2: Ablauf & Machbarkeit']
),

-- Phase 3: Finalisierung
(
  'location-phase3-1',
  'location',
  'Ablauf & Plan B final abstimmen',
  'Timeline finalisieren, Zuständigkeiten klären, Schlechtwetterlösung festlegen',
  'high',
  7,
  '{"6_months": true, "3_months": true, "immediate": true}'::jsonb,
  'location_schedule',
  ARRAY['Phase 3: Finalisierung']
);
