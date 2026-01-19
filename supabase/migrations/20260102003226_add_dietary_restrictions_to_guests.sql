/*
  # Add dietary restrictions to guests table

  1. Changes
    - Add `lactose_intolerant_count` (integer) - Number of people with lactose intolerance
    - Add `vegetarian_count` (integer) - Number of vegetarian people
    - Add `vegan_count` (integer) - Number of vegan people
    - Add `gluten_intolerant_count` (integer) - Number of people with gluten intolerance
    
  2. Notes
    - All fields default to 0
    - Values represent the number of people in the party with each dietary restriction
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'lactose_intolerant_count'
  ) THEN
    ALTER TABLE guests ADD COLUMN lactose_intolerant_count integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'vegetarian_count'
  ) THEN
    ALTER TABLE guests ADD COLUMN vegetarian_count integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'vegan_count'
  ) THEN
    ALTER TABLE guests ADD COLUMN vegan_count integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'gluten_intolerant_count'
  ) THEN
    ALTER TABLE guests ADD COLUMN gluten_intolerant_count integer DEFAULT 0;
  END IF;
END $$;