/*
  # Update Events and Add Accommodation Fields

  1. Changes to Events Table
    - Update "Brunch" event to "Brunch am nächsten Tag" / "Brunch Next Day"
    - Add new event: "Get Together" before the wedding

  2. New Fields in Guests Table
    - `accommodation_type` (text) - Type of accommodation: 'hotel', 'own', or 'none'
    - `accommodation_rooms` (integer, nullable) - Number of rooms needed (for hotel option)

  3. Security
    - No RLS changes needed as guests table already has proper policies
*/

-- Update Brunch event name
UPDATE events 
SET 
  name_de = 'Brunch am nächsten Tag',
  name_en = 'Brunch Next Day'
WHERE name_de = 'Brunch';

-- Add new "Get Together" event
INSERT INTO events (name_de, name_en, emoji, active)
VALUES ('Get Together', 'Get Together', '🤝', true)
ON CONFLICT DO NOTHING;

-- Add accommodation fields to guests table
DO $$
BEGIN
  -- Add accommodation_type column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'accommodation_type'
  ) THEN
    ALTER TABLE guests ADD COLUMN accommodation_type text DEFAULT 'none' CHECK (accommodation_type IN ('hotel', 'own', 'none'));
  END IF;

  -- Add accommodation_rooms column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'accommodation_rooms'
  ) THEN
    ALTER TABLE guests ADD COLUMN accommodation_rooms integer CHECK (accommodation_rooms IS NULL OR accommodation_rooms > 0);
  END IF;
END $$;