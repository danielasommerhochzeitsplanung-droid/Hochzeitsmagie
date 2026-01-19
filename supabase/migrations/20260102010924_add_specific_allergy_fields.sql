/*
  # Add specific allergy fields to dietary_restrictions table

  1. Changes
    - Add boolean fields for common allergies:
      - `allergy_nuts` (boolean, default false) - Allergy to nuts
      - `allergy_peanuts` (boolean, default false) - Allergy to peanuts
      - `allergy_eggs` (boolean, default false) - Allergy to eggs
      - `allergy_fish` (boolean, default false) - Allergy to fish
      - `allergy_shellfish` (boolean, default false) - Allergy to shellfish
      - `allergy_soy` (boolean, default false) - Allergy to soy
      - `allergy_sesame` (boolean, default false) - Allergy to sesame
    - Keep existing `allergies` text field for additional notes

  2. Notes
    - These fields work together with existing dietary restriction flags
    - The text field can still be used for uncommon allergies
    - Fields are opt-in (default false) to avoid confusion
*/

-- Add allergy fields to dietary_restrictions table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'dietary_restrictions' AND column_name = 'allergy_nuts'
  ) THEN
    ALTER TABLE dietary_restrictions ADD COLUMN allergy_nuts boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'dietary_restrictions' AND column_name = 'allergy_peanuts'
  ) THEN
    ALTER TABLE dietary_restrictions ADD COLUMN allergy_peanuts boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'dietary_restrictions' AND column_name = 'allergy_eggs'
  ) THEN
    ALTER TABLE dietary_restrictions ADD COLUMN allergy_eggs boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'dietary_restrictions' AND column_name = 'allergy_fish'
  ) THEN
    ALTER TABLE dietary_restrictions ADD COLUMN allergy_fish boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'dietary_restrictions' AND column_name = 'allergy_shellfish'
  ) THEN
    ALTER TABLE dietary_restrictions ADD COLUMN allergy_shellfish boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'dietary_restrictions' AND column_name = 'allergy_soy'
  ) THEN
    ALTER TABLE dietary_restrictions ADD COLUMN allergy_soy boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'dietary_restrictions' AND column_name = 'allergy_sesame'
  ) THEN
    ALTER TABLE dietary_restrictions ADD COLUMN allergy_sesame boolean DEFAULT false;
  END IF;
END $$;