/*
  # Add sub_area column to task_templates table
  
  1. Changes
    - Add `sub_area` column to `task_templates` table
    - Column is nullable text field
    - Allows categorizing tasks into sub-areas like 'memories', 'styling', 'logistics', etc.
    
  2. Notes
    - This enables better organization of tasks within main categories
    - Existing tasks will have NULL sub_area until explicitly updated
*/

-- Add sub_area column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'task_templates' AND column_name = 'sub_area'
  ) THEN
    ALTER TABLE task_templates ADD COLUMN sub_area text;
  END IF;
END $$;
