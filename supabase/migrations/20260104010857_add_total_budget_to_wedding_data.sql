/*
  # Add Total Budget Field to Wedding Data

  1. Changes
    - Add `total_budget` column to `wedding_data` table
      - Type: decimal (numeric) to store budget amounts with precision
      - Default: NULL (no budget set initially)
      - Allows couples to set their overall wedding budget limit
  
  2. Purpose
    - Enables tracking of planned expenses against total available budget
    - Supports budget management and overspend warnings
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'wedding_data' AND column_name = 'total_budget'
  ) THEN
    ALTER TABLE wedding_data ADD COLUMN total_budget NUMERIC(10, 2);
  END IF;
END $$;
