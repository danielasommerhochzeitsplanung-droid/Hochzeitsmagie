/*
  # Add support_team_role column to guests table

  1. Changes
    - Add `support_team_role` column to `guests` table
      - Type: text (optional)
      - Stores the role a guest has in the support team
  
  2. Notes
    - This column complements the `support_team_id` foreign key
    - Allows tracking what role a guest plays when they are part of the support team
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'support_team_role'
  ) THEN
    ALTER TABLE guests ADD COLUMN support_team_role text;
  END IF;
END $$;