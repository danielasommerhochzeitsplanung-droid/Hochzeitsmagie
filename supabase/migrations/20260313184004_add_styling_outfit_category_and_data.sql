/*
  # Add styling_outfit Category and Data

  1. Changes
    - Add 'styling_outfit' to allowed category values
    - Delete any existing styling_outfit tasks
    - Insert exact 12 tasks for 30-month planning duration
    
  2. Task Structure
    - Phase 1: Tasks 1-4 (Stil festlegen, Recherche)
    - Phase 2: Tasks 1-4 (Bestellung, Buchung)
    - Phase 3: Tasks 1-4 (Anpassungen, Probestyling, Zeitplan, Abholung)
    - sub_areas: outfits_accessories, beauty_styling, rings
    - Planning duration: 30 months only
*/

-- Add 'styling_outfit' to the category constraint
ALTER TABLE task_templates DROP CONSTRAINT IF EXISTS task_templates_category_check;

ALTER TABLE task_templates ADD CONSTRAINT task_templates_category_check 
CHECK (category = ANY (ARRAY[
  'location_venue'::text, 
  'ceremony_legal'::text, 
  'vendors_services'::text, 
  'guests_communication'::text, 
  'styling_atmosphere'::text, 
  'organization_closure'::text,
  'styling_outfit'::text
]));

-- Delete all existing styling_outfit tasks
DELETE FROM task_templates WHERE category = 'styling_outfit';

-- Insert 12 exact tasks for 30-month planning duration
INSERT INTO task_templates (id, category, planning_duration_months, phase, order_in_phase, sub_area, title_de, title_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  ('styling_outfit_30_1_1', 'styling_outfit', 30, 1, 1, 'outfits_accessories', 'Stil für Hochzeitsoutfits festlegen', 'Define wedding outfit style', 12, 10, false),
  ('styling_outfit_30_1_2', 'styling_outfit', 30, 1, 2, 'outfits_accessories', 'Brautkleid und Hochzeitsoutfits recherchieren', 'Research wedding outfits', 11, 9, false),
  ('styling_outfit_30_1_3', 'styling_outfit', 30, 1, 3, 'beauty_styling', 'Hair & Make-up Stil festlegen', 'Define hair and makeup style', 10, 8, false),
  ('styling_outfit_30_1_4', 'styling_outfit', 30, 1, 4, 'rings', 'Trauring-Stil festlegen', 'Define ring style', 9, 7, false),
  ('styling_outfit_30_2_1', 'styling_outfit', 30, 2, 1, 'outfits_accessories', 'Brautkleid / Hochzeitsoutfits bestellen', 'Order wedding outfits', 9, 7, false),
  ('styling_outfit_30_2_2', 'styling_outfit', 30, 2, 2, 'beauty_styling', 'Hair & Make-up Artist buchen', 'Book hair and makeup artist', 7, 5, false),
  ('styling_outfit_30_2_3', 'styling_outfit', 30, 2, 3, 'rings', 'Trauringe auswählen und bestellen', 'Select and order rings', 7, 5, false),
  ('styling_outfit_30_2_4', 'styling_outfit', 30, 2, 4, 'outfits_accessories', 'Accessoires auswählen', 'Choose accessories', 6, 4, false),
  ('styling_outfit_30_3_1', 'styling_outfit', 30, 3, 1, 'outfits_accessories', 'Kleid- und Outfitanpassungen durchführen', 'Complete outfit alterations', 2, 1, false),
  ('styling_outfit_30_3_2', 'styling_outfit', 30, 3, 2, 'beauty_styling', 'Probestyling durchführen', 'Complete hair and makeup trial', 2, 1, false),
  ('styling_outfit_30_3_3', 'styling_outfit', 30, 3, 3, 'beauty_styling', 'Zeitplan für Getting Ready abstimmen', 'Confirm getting ready schedule', 1, 0.5, false),
  ('styling_outfit_30_3_4', 'styling_outfit', 30, 3, 4, 'rings', 'Ringe prüfen und abholen', 'Check and collect rings', 1, 0.5, false);