/*
  # Add archive functionality to vendors table

  1. Changes
    - Add `archived` boolean column (default: false)
    - Add `archived_at` timestamp column to track when the vendor was archived
  
  2. Purpose
    - Enable soft deletion by archiving vendors instead of permanently deleting them
    - Preserve historical data while keeping the active list clean
    - Allow restoration of archived vendors
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendors' AND column_name = 'archived'
  ) THEN
    ALTER TABLE vendors ADD COLUMN archived boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendors' AND column_name = 'archived_at'
  ) THEN
    ALTER TABLE vendors ADD COLUMN archived_at timestamptz;
  END IF;
END $$;