/*
  # Rename events location column to location_id for consistency

  ## Changes
    - Rename `location` column to `location_id` in `events` table
    - This ensures consistency with other tables that use location_id naming convention
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'events' AND column_name = 'location'
  ) THEN
    ALTER TABLE events RENAME COLUMN location TO location_id;
  END IF;
END $$;