/*
  # Add Transport Time Fields

  1. Changes to `events` table
    - Add `transport_time_start` (time) - Start time for transportation
    - Add `transport_time_end` (time) - End time for transportation
    
  2. Notes
    - These fields allow tracking specific departure and arrival times for transportation between locations
    - Useful for shuttle buses, car transfers, etc.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'events' AND column_name = 'transport_time_start'
  ) THEN
    ALTER TABLE events ADD COLUMN transport_time_start time;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'events' AND column_name = 'transport_time_end'
  ) THEN
    ALTER TABLE events ADD COLUMN transport_time_end time;
  END IF;
END $$;