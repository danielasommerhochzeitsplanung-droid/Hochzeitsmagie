/*
  # Add Missing Columns to Program Items Table

  1. Changes
    - Add `type` column (text) - Type of program item (Ceremony, Reception, Transport, etc.)
    - Add `duration_minutes` column (integer) - Duration in minutes
    - Add `location` column (text) - Location as free text (kept alongside location_id for flexibility)
    - Add `notes` column (text) - Internal notes for planning
  
  2. Purpose
    - Fixes discrepancy between frontend expectations and database schema
    - Enables full functionality of program item management
    - Maintains backward compatibility by keeping existing location_id column
  
  3. Notes
    - All new columns are nullable to support existing data
    - Default values provided for duration_minutes (0) and text fields (empty string)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'program_items' AND column_name = 'type'
  ) THEN
    ALTER TABLE program_items ADD COLUMN type text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'program_items' AND column_name = 'duration_minutes'
  ) THEN
    ALTER TABLE program_items ADD COLUMN duration_minutes integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'program_items' AND column_name = 'location'
  ) THEN
    ALTER TABLE program_items ADD COLUMN location text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'program_items' AND column_name = 'notes'
  ) THEN
    ALTER TABLE program_items ADD COLUMN notes text DEFAULT '';
  END IF;
END $$;