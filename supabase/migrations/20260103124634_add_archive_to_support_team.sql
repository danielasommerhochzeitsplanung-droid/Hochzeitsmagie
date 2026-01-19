/*
  # Add archive functionality to support_team table

  1. Changes
    - Add `archived` boolean column (default: false)
    - Add `archived_at` timestamp column to track when the member was archived
  
  2. Purpose
    - Enable soft deletion by archiving team members instead of permanently deleting them
    - Preserve historical data while keeping the active list clean
    - Allow restoration of archived members
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'support_team' AND column_name = 'archived'
  ) THEN
    ALTER TABLE support_team ADD COLUMN archived boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'support_team' AND column_name = 'archived_at'
  ) THEN
    ALTER TABLE support_team ADD COLUMN archived_at timestamptz;
  END IF;
END $$;