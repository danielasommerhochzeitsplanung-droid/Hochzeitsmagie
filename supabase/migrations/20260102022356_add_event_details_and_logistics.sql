/*
  # Add Event Details and Logistics

  1. Changes to `events` table
    - Add `date` (date) - The date when the event takes place
    - Add `time_start` (time) - Start time of the event
    - Add `time_end` (time) - End time of the event
    - Add `location` (text) - Location/venue of the event
    - Add `transport_info` (text) - Transportation information for location changes
    - Add `is_enabled` (boolean) - Whether the couple is doing this event (default true)
    
  2. Notes
    - The `active` field will be used for archiving (soft delete)
    - The `is_enabled` field indicates if the couple is actually doing this event
    - All new fields are nullable except `is_enabled`
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'events' AND column_name = 'date'
  ) THEN
    ALTER TABLE events ADD COLUMN date date;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'events' AND column_name = 'time_start'
  ) THEN
    ALTER TABLE events ADD COLUMN time_start time;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'events' AND column_name = 'time_end'
  ) THEN
    ALTER TABLE events ADD COLUMN time_end time;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'events' AND column_name = 'location'
  ) THEN
    ALTER TABLE events ADD COLUMN location text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'events' AND column_name = 'transport_info'
  ) THEN
    ALTER TABLE events ADD COLUMN transport_info text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'events' AND column_name = 'is_enabled'
  ) THEN
    ALTER TABLE events ADD COLUMN is_enabled boolean DEFAULT true;
  END IF;
END $$;