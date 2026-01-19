/*
  # Add weeks_before_wedding to Task Templates

  1. Changes
    - Add `weeks_before_wedding` column (integer) to task_templates table
    - This replaces the timing_rules approach with individual week offsets per template
    - Allows more precise task scheduling based on wedding date

  2. Migration of Existing Data
    - Update all existing templates with appropriate weeks_before_wedding values
    - Values range from 2 weeks (very last minute) to 78 weeks (18 months early)
    - Each task gets individual timing based on typical wedding planning schedules

  3. Notes
    - Early tasks (40+ weeks): Location search, guest list creation
    - Mid-range (12-24 weeks): Invitations, photographer booking
    - Late tasks (1-4 weeks): Final guest count, last details
    - Values based on German wedding planning conventions
*/

-- Add weeks_before_wedding column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'task_templates' AND column_name = 'weeks_before_wedding'
  ) THEN
    ALTER TABLE task_templates ADD COLUMN weeks_before_wedding integer;
  END IF;
END $$;

-- Update existing templates with individual week offsets

-- Location Tasks (Very early: 48-78 weeks)
UPDATE task_templates SET weeks_before_wedding = 52 WHERE task_name = 'Locations recherchieren und besichtigen';
UPDATE task_templates SET weeks_before_wedding = 48 WHERE task_name = 'Location buchen';
UPDATE task_templates SET weeks_before_wedding = 12 WHERE task_name = 'Detailplanung mit Location';
UPDATE task_templates SET weeks_before_wedding = 2 WHERE task_name = 'Final Walk-Through';

-- Catering Tasks (Early to late: 36-2 weeks)
UPDATE task_templates SET weeks_before_wedding = 40 WHERE task_name = 'Catering-Anbieter recherchieren';
UPDATE task_templates SET weeks_before_wedding = 24 WHERE task_name = 'Menü-Verkostung';
UPDATE task_templates SET weeks_before_wedding = 26 WHERE task_name = 'Catering buchen';
UPDATE task_templates SET weeks_before_wedding = 2 WHERE task_name = 'Finale Gästezahl mitteilen';

-- Fotograf Tasks (Mid-range: 36-4 weeks)
UPDATE task_templates SET weeks_before_wedding = 40 WHERE task_name = 'Fotografen recherchieren';
UPDATE task_templates SET weeks_before_wedding = 32 WHERE task_name = 'Fotografen buchen';
UPDATE task_templates SET weeks_before_wedding = 16 WHERE task_name = 'Engagement Shooting';
UPDATE task_templates SET weeks_before_wedding = 4 WHERE task_name = 'Shot List erstellen';

-- Dekoration Tasks (Mid to late: 24-2 weeks)
UPDATE task_templates SET weeks_before_wedding = 28 WHERE task_name = 'Deko-Konzept entwickeln';
UPDATE task_templates SET weeks_before_wedding = 24 WHERE task_name = 'Florist recherchieren und buchen';
UPDATE task_templates SET weeks_before_wedding = 12 WHERE task_name = 'Deko-Material besorgen';
UPDATE task_templates SET weeks_before_wedding = 2 WHERE task_name = 'Finale Deko-Details';

-- Musik/DJ Tasks (Mid-range: 36-3 weeks)
UPDATE task_templates SET weeks_before_wedding = 40 WHERE task_name = 'DJ/Band recherchieren';
UPDATE task_templates SET weeks_before_wedding = 32 WHERE task_name = 'DJ/Band buchen';
UPDATE task_templates SET weeks_before_wedding = 12 WHERE task_name = 'Playlist besprechen';
UPDATE task_templates SET weeks_before_wedding = 4 WHERE task_name = 'Ablaufplan für Musik erstellen';

-- Einladungen Tasks (Mid-range: 24-12 weeks)
UPDATE task_templates SET weeks_before_wedding = 26 WHERE task_name = 'Design festlegen';
UPDATE task_templates SET weeks_before_wedding = 40 WHERE task_name = 'Save-the-Dates versenden';
UPDATE task_templates SET weeks_before_wedding = 16 WHERE task_name = 'Einladungen drucken';
UPDATE task_templates SET weeks_before_wedding = 14 WHERE task_name = 'Einladungen versenden';

-- Kleidung Tasks (Early to late: 52-2 weeks)
UPDATE task_templates SET weeks_before_wedding = 52 WHERE task_name = 'Brautkleid-Termine vereinbaren';
UPDATE task_templates SET weeks_before_wedding = 40 WHERE task_name = 'Brautkleid kaufen';
UPDATE task_templates SET weeks_before_wedding = 24 WHERE task_name = 'Anzug/Smoking besorgen';
UPDATE task_templates SET weeks_before_wedding = 4 WHERE task_name = 'Anproben Brautkleid';

-- Standesamt Tasks (Mid-range: 26-12 weeks)
UPDATE task_templates SET weeks_before_wedding = 26 WHERE task_name = 'Standesamt-Termin vereinbaren';
UPDATE task_templates SET weeks_before_wedding = 16 WHERE task_name = 'Dokumente besorgen';
UPDATE task_templates SET weeks_before_wedding = 24 WHERE task_name = 'Trauzeuge festlegen';

-- Ringe Tasks (Mid-range: 24-12 weeks)
UPDATE task_templates SET weeks_before_wedding = 28 WHERE task_name = 'Ringe anschauen';
UPDATE task_templates SET weeks_before_wedding = 16 WHERE task_name = 'Ringe bestellen';
UPDATE task_templates SET weeks_before_wedding = 16 WHERE task_name = 'Gravur festlegen';

-- Transport Tasks (Late: 12-8 weeks)
UPDATE task_templates SET weeks_before_wedding = 16 WHERE task_name = 'Hochzeitsauto organisieren';
UPDATE task_templates SET weeks_before_wedding = 12 WHERE task_name = 'Gäste-Transport planen';

-- Unterhaltung Tasks (Mid-range: 16-12 weeks)
UPDATE task_templates SET weeks_before_wedding = 16 WHERE task_name = 'Zusätzliche Unterhaltung planen';
UPDATE task_templates SET weeks_before_wedding = 16 WHERE task_name = 'Kinderprogramm organisieren';

-- Flitterwochen Tasks (Mid-range: 24-12 weeks)
UPDATE task_templates SET weeks_before_wedding = 28 WHERE task_name = 'Reiseziel festlegen';
UPDATE task_templates SET weeks_before_wedding = 16 WHERE task_name = 'Flitterwochen buchen';

-- Papeterie Tasks (Late: 12-3 weeks)
UPDATE task_templates SET weeks_before_wedding = 12 WHERE task_name = 'Menükarten gestalten';
UPDATE task_templates SET weeks_before_wedding = 4 WHERE task_name = 'Tischkarten erstellen';
UPDATE task_templates SET weeks_before_wedding = 3 WHERE task_name = 'Programmheft erstellen';