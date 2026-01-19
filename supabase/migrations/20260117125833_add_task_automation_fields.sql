/*
  # Add Task Automation Fields

  1. Changes to `tasks` table
    - Add `is_system_task` (boolean) - Identifies system-generated vs user-created tasks
    - Add `template_id` (text) - Reference to task template
    - Add `offset_weeks` (integer) - Weeks before wedding date for calculation
    - Add `offset_type` (text) - Type of offset calculation
    - Add `needs_adjustment_warning` (boolean) - Flag for user tasks when dates shift
    - Add `warning_dismissed` (boolean) - Track if user dismissed the warning
  
  2. Notes
    - System tasks can be automatically recalculated when dates change
    - User tasks will receive warnings but won't be auto-adjusted
    - Offset calculations enable dynamic task scheduling
*/

-- Add new columns to tasks table
DO $$
BEGIN
  -- Add is_system_task column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tasks' AND column_name = 'is_system_task'
  ) THEN
    ALTER TABLE tasks ADD COLUMN is_system_task boolean DEFAULT false;
  END IF;

  -- Add template_id column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tasks' AND column_name = 'template_id'
  ) THEN
    ALTER TABLE tasks ADD COLUMN template_id text;
  END IF;

  -- Add offset_weeks column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tasks' AND column_name = 'offset_weeks'
  ) THEN
    ALTER TABLE tasks ADD COLUMN offset_weeks integer;
  END IF;

  -- Add offset_type column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tasks' AND column_name = 'offset_type'
  ) THEN
    ALTER TABLE tasks ADD COLUMN offset_type text DEFAULT 'weeks_before';
  END IF;

  -- Add needs_adjustment_warning column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tasks' AND column_name = 'needs_adjustment_warning'
  ) THEN
    ALTER TABLE tasks ADD COLUMN needs_adjustment_warning boolean DEFAULT false;
  END IF;

  -- Add warning_dismissed column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tasks' AND column_name = 'warning_dismissed'
  ) THEN
    ALTER TABLE tasks ADD COLUMN warning_dismissed boolean DEFAULT false;
  END IF;
END $$;