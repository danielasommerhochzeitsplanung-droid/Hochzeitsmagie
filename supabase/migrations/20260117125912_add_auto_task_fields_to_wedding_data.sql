/*
  # Add Auto-Task Fields to Wedding Data

  1. Changes to `wedding_data` table
    - Add `auto_tasks_enabled` (boolean) - Toggle for automatic task generation
    - Add `last_planning_start_date` (date) - Track changes to detect shifts
    - Add `last_wedding_date` (date) - Track changes to detect shifts
    - Add `auto_tasks_initialized` (boolean) - Flag to show initial setup dialog

  2. Notes
    - These fields enable automatic task distribution and recalculation
    - When dates change, system can detect and update system tasks
    - User tasks get warning flags instead of automatic updates
*/

-- Add new columns to wedding_data table
DO $$
BEGIN
  -- Add auto_tasks_enabled column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'wedding_data' AND column_name = 'auto_tasks_enabled'
  ) THEN
    ALTER TABLE wedding_data ADD COLUMN auto_tasks_enabled boolean DEFAULT false;
  END IF;

  -- Add last_planning_start_date column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'wedding_data' AND column_name = 'last_planning_start_date'
  ) THEN
    ALTER TABLE wedding_data ADD COLUMN last_planning_start_date date;
  END IF;

  -- Add last_wedding_date column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'wedding_data' AND column_name = 'last_wedding_date'
  ) THEN
    ALTER TABLE wedding_data ADD COLUMN last_wedding_date date;
  END IF;

  -- Add auto_tasks_initialized column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'wedding_data' AND column_name = 'auto_tasks_initialized'
  ) THEN
    ALTER TABLE wedding_data ADD COLUMN auto_tasks_initialized boolean DEFAULT false;
  END IF;
END $$;