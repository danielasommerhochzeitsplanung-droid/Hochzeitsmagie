/*
  # Update events location field to reference locations table

  ## Changes
    - Change `location` column in `events` table from text to uuid
    - Add foreign key constraint to `locations` table
    - This enables proper relational data between events and locations
  
  ## Migration Strategy
    - Drop existing location column (safe because it's text, not yet in production use)
    - Add new location_id column as uuid with foreign key to locations
    - Keep column name as "location" for backwards compatibility with existing code
*/

DO $$
BEGIN
  -- Drop the old text column if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'events' AND column_name = 'location' AND data_type = 'text'
  ) THEN
    ALTER TABLE events DROP COLUMN location;
  END IF;

  -- Add the new location column as uuid with foreign key
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'events' AND column_name = 'location' AND data_type = 'uuid'
  ) THEN
    ALTER TABLE events ADD COLUMN location uuid REFERENCES locations(id) ON DELETE SET NULL;
  END IF;
END $$;