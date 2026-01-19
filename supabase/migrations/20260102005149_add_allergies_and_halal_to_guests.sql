/*
  # Add allergies and halal dietary options to guests table

  1. Changes
    - Add `has_allergies_count` (integer) - Number of people with allergies (toggle)
    - Add `nut_allergy_count` (integer) - Number of people with nut allergy
    - Add `fish_allergy_count` (integer) - Number of people with fish/seafood allergy
    - Add `egg_allergy_count` (integer) - Number of people with egg allergy
    - Add `soy_allergy_count` (integer) - Number of people with soy allergy
    - Add `halal_count` (integer) - Number of people requiring halal food
    
  2. Notes
    - All fields default to 0
    - Values represent the number of people in the party with each dietary restriction
    - `has_allergies_count` acts as a toggle - when > 0, specific allergy fields become visible
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'has_allergies_count'
  ) THEN
    ALTER TABLE guests ADD COLUMN has_allergies_count integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'nut_allergy_count'
  ) THEN
    ALTER TABLE guests ADD COLUMN nut_allergy_count integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'fish_allergy_count'
  ) THEN
    ALTER TABLE guests ADD COLUMN fish_allergy_count integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'egg_allergy_count'
  ) THEN
    ALTER TABLE guests ADD COLUMN egg_allergy_count integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'soy_allergy_count'
  ) THEN
    ALTER TABLE guests ADD COLUMN soy_allergy_count integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'halal_count'
  ) THEN
    ALTER TABLE guests ADD COLUMN halal_count integer DEFAULT 0;
  END IF;
END $$;