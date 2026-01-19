/*
  # Update Guests Table Status Fields

  1. Changes
    - Replace `save_the_date_sent` (boolean) with `save_the_date_status` (text)
    - Replace `invitation_sent` (boolean) with `invitation_status` (text)
    - Add `save_the_date_sent_date` (date) - Date when Save the Date was sent
    - Add `invitation_sent_date` (date) - Date when invitation was sent
    - Remove `number_of_children` field as it will be calculated from children array

  2. Status Values
    - 'pending' - Ausstehend (default)
    - 'sent' - Versendet
    - 'confirmed' - Zugesagt
    - 'declined' - Abgesagt

  3. Data Migration
    - Convert existing boolean values to new status values
    - Existing true values become 'sent', false values become 'pending'
*/

-- Add new columns with default values
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'save_the_date_status'
  ) THEN
    ALTER TABLE guests ADD COLUMN save_the_date_status text DEFAULT 'pending';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'invitation_status'
  ) THEN
    ALTER TABLE guests ADD COLUMN invitation_status text DEFAULT 'pending';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'save_the_date_sent_date'
  ) THEN
    ALTER TABLE guests ADD COLUMN save_the_date_sent_date date;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'invitation_sent_date'
  ) THEN
    ALTER TABLE guests ADD COLUMN invitation_sent_date date;
  END IF;
END $$;

-- Migrate existing data
UPDATE guests
SET save_the_date_status = CASE
  WHEN save_the_date_sent = true THEN 'sent'
  ELSE 'pending'
END,
invitation_status = CASE
  WHEN invitation_sent = true THEN 'sent'
  ELSE 'pending'
END
WHERE save_the_date_status = 'pending' OR invitation_status = 'pending';

-- Drop old columns if they exist
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'save_the_date_sent'
  ) THEN
    ALTER TABLE guests DROP COLUMN save_the_date_sent;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'invitation_sent'
  ) THEN
    ALTER TABLE guests DROP COLUMN invitation_sent;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'number_of_children'
  ) THEN
    ALTER TABLE guests DROP COLUMN number_of_children;
  END IF;
END $$;