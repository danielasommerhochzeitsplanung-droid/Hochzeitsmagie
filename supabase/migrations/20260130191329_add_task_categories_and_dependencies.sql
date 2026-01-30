/*
  # Task Templates: Main Categories and Dependencies
  
  This migration adds the structure for organizing tasks into main categories,
  defining dependencies between tasks, and supporting multiple planning timelines.
  
  ## Changes
  
  1. New Columns Added to task_templates:
    - `main_category` (text): One of 6 primary categories for organizing all wedding tasks
    - `depends_on` (text[]): Array of task template IDs that must be completed first
    - `planning_timeline` (text[]): Which planning timelines this task appears in (6, 9, 12, 18 months)
  
  2. Main Categories:
    - "location_venue" - Location & Räumlichkeiten
    - "ceremony_legal" - Trauung & Standesamt
    - "vendors_services" - Dienstleister & Vendors
    - "guests_communication" - Gäste & Kommunikation
    - "couple_personal" - Brautpaar Persönliches
    - "design_decoration" - Design & Dekoration
  
  3. Dependencies:
    Tasks can now specify prerequisite tasks that must be completed first.
    Example: "Location buchen" depends on "Locations besichtigen"
  
  4. Planning Timelines:
    Support for different planning periods (6, 9, 12, 18 months before wedding)
    
  ## Security
  No changes to RLS policies needed.
*/

-- Add new columns to task_templates
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'task_templates' AND column_name = 'main_category'
  ) THEN
    ALTER TABLE task_templates ADD COLUMN main_category text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'task_templates' AND column_name = 'depends_on'
  ) THEN
    ALTER TABLE task_templates ADD COLUMN depends_on text[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'task_templates' AND column_name = 'planning_timeline'
  ) THEN
    ALTER TABLE task_templates ADD COLUMN planning_timeline text[] DEFAULT '{}';
  END IF;
END $$;

-- Create index for performance on main_category
CREATE INDEX IF NOT EXISTS idx_task_templates_main_category ON task_templates(main_category);

-- Update existing tasks with main categories
UPDATE task_templates SET main_category = 'location_venue' WHERE category IN ('location', 'Location');
UPDATE task_templates SET main_category = 'ceremony_legal' WHERE id LIKE 'standesamt-%' OR id LIKE 'kirchliche-%';
UPDATE task_templates SET main_category = 'vendors_services' WHERE category IN ('catering', 'decoration') OR id LIKE 'fotograf-%' OR id LIKE 'musik-%';
UPDATE task_templates SET main_category = 'guests_communication' WHERE category = 'guests' OR id LIKE 'einladungen-%';
UPDATE task_templates SET main_category = 'couple_personal' WHERE category = 'couple' OR id LIKE 'kleidung-%' OR id LIKE 'ringe-%' OR id LIKE 'flitterwochen-%';
UPDATE task_templates SET main_category = 'design_decoration' WHERE id LIKE 'deko-%' OR id LIKE 'papeterie-%';
UPDATE task_templates SET main_category = 'ceremony_legal' WHERE id IN ('planung-1', 'wichtige-themen-1', 'rechtliche-vorsorge-1', 'nach-trauung-1');
UPDATE task_templates SET main_category = 'vendors_services' WHERE id LIKE 'transport-%' OR id LIKE 'unterhaltung-%';

-- Convert timing_rules to planning_timeline array
UPDATE task_templates SET planning_timeline = 
  ARRAY(
    SELECT jsonb_object_keys(timing_rules)
  )
WHERE timing_rules IS NOT NULL AND timing_rules != '{}'::jsonb;