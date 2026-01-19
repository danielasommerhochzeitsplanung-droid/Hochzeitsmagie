/*
  # Replace vendor catering participation with event-specific assignments

  ## Overview
  This migration replaces the simple boolean `participates_in_catering` field
  with an array field that tracks which specific events each vendor provides
  catering for or participates in.

  ## Changes to `vendors` table
  
  **Removed Field:**
  - `participates_in_catering` (boolean) - Simple yes/no flag
  
  **New Field:**
  - `catering_events` (text[]) - Array of event IDs that the vendor participates
    in for catering purposes. This allows tracking which specific events the vendor
    attends and receives meals at.

  ## Notes
  - The new field defaults to an empty array
  - Vendors can now be assigned to multiple specific events
  - This provides more granular control than the previous boolean approach
*/

-- Drop the old boolean field
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendors' AND column_name = 'participates_in_catering'
  ) THEN
    ALTER TABLE vendors DROP COLUMN participates_in_catering;
  END IF;
END $$;

-- Add the new array field for event-specific catering participation
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendors' AND column_name = 'catering_events'
  ) THEN
    ALTER TABLE vendors ADD COLUMN catering_events text[] DEFAULT '{}';
  END IF;
END $$;