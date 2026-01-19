/*
  # Add contact information fields to guests table

  1. Changes
    - Add `street_address` (text, nullable) - Street name and house number
    - Add `postal_code` (text, nullable) - Postal/ZIP code
    - Add `city` (text, nullable) - City name
    - Add `email` (text, nullable) - Email address
    - Add `phone` (text, nullable) - Mobile/phone number

  2. Notes
    - All fields are optional to allow flexibility
    - Contact information helps with communication and logistics
    - Email and phone are stored as text to support international formats
*/

-- Add contact information fields to guests table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'street_address'
  ) THEN
    ALTER TABLE guests ADD COLUMN street_address text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'postal_code'
  ) THEN
    ALTER TABLE guests ADD COLUMN postal_code text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'city'
  ) THEN
    ALTER TABLE guests ADD COLUMN city text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'email'
  ) THEN
    ALTER TABLE guests ADD COLUMN email text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'phone'
  ) THEN
    ALTER TABLE guests ADD COLUMN phone text DEFAULT '';
  END IF;
END $$;