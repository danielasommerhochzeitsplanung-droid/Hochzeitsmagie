/*
  # Add Support Team Assignment to Program Items

  1. Changes
    - Add `support_team_id` column to `program_items` table
      - References support_team table
      - Nullable (not all program items need a support team member)
      - Allows assigning a support team member to specific program item tasks
  
  2. Purpose
    - Enables linking support team members to specific tasks/program items within an event
    - Example: Assign flower girl to "Flower Throwing" program item at 14:30
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'program_items' AND column_name = 'support_team_id'
  ) THEN
    ALTER TABLE program_items 
    ADD COLUMN support_team_id uuid REFERENCES support_team(id) ON DELETE SET NULL;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_program_items_support_team ON program_items(support_team_id);