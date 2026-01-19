/*
  # Add Transport Fields to Events Table

  1. Changes
    - Add `transport_type` column (text) - Type of transport (e.g., Bus, Boat, Car, etc.)
    - Add `transport_from` column (text) - Starting point of transport
    - Add `transport_to` column (text) - Destination of transport
    - Add `transport_provider` column (text) - Company/person providing transport
    - Add `transport_notes` column (text) - Additional notes about transport
    
  2. Purpose
    - Allows couples to specify transport logistics directly in event details
    - Transport can also be added as separate program items for special cases
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'events' AND column_name = 'transport_type'
  ) THEN
    ALTER TABLE events ADD COLUMN transport_type text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'events' AND column_name = 'transport_from'
  ) THEN
    ALTER TABLE events ADD COLUMN transport_from text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'events' AND column_name = 'transport_to'
  ) THEN
    ALTER TABLE events ADD COLUMN transport_to text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'events' AND column_name = 'transport_provider'
  ) THEN
    ALTER TABLE events ADD COLUMN transport_provider text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'events' AND column_name = 'transport_notes'
  ) THEN
    ALTER TABLE events ADD COLUMN transport_notes text DEFAULT '';
  END IF;
END $$;