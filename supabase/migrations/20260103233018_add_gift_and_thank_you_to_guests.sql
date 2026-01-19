/*
  # Add gift and thank you tracking to guests table

  1. Changes
    - Add `gift_received` column to `guests` table
      - Type: text (optional)
      - Stores description of the gift received by the guest
    - Add `thank_you_sent` column to `guests` table
      - Type: boolean
      - Default: false
      - Tracks whether thank you note has been sent
    - Add `thank_you_sent_date` column to `guests` table
      - Type: date (optional)
      - Stores the date when thank you note was sent
  
  2. Notes
    - These fields allow tracking guest gifts and thank you notes directly in the guests module
    - No additional module needed for gift management
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'gift_received'
  ) THEN
    ALTER TABLE guests ADD COLUMN gift_received text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'thank_you_sent'
  ) THEN
    ALTER TABLE guests ADD COLUMN thank_you_sent boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'thank_you_sent_date'
  ) THEN
    ALTER TABLE guests ADD COLUMN thank_you_sent_date date;
  END IF;
END $$;