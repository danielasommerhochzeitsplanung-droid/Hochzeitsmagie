/*
  # Add archive functionality to locations table

  1. Changes
    - Add `archived` column to `locations` table (boolean, default: false)
    - Add index for better query performance on archived status
  
  2. Purpose
    - Allow users to archive/hide locations instead of deleting them
    - Maintain historical data while keeping the active location list clean
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'locations' AND column_name = 'archived'
  ) THEN
    ALTER TABLE locations ADD COLUMN archived boolean DEFAULT false;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_locations_archived ON locations(archived);