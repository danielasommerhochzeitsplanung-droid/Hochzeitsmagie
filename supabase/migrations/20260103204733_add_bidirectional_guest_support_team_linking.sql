/*
  # Add bidirectional guest-support team linking

  1. Changes to Tables
    - `guests` table:
      - Add `support_team_id` (uuid, nullable) - reference to support_team
    - `support_team` table:
      - Add `guest_id` (uuid, nullable) - reference to guests

  2. Foreign Keys
    - guests.support_team_id → support_team.id (on delete set null)
    - support_team.guest_id → guests.id (on delete set null)

  3. Security
    - No RLS changes needed (inherits from existing policies)
*/

-- Add support_team_id to guests table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'support_team_id'
  ) THEN
    ALTER TABLE guests ADD COLUMN support_team_id uuid;
    ALTER TABLE guests ADD CONSTRAINT fk_guests_support_team 
      FOREIGN KEY (support_team_id) REFERENCES support_team(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Add guest_id to support_team table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'support_team' AND column_name = 'guest_id'
  ) THEN
    ALTER TABLE support_team ADD COLUMN guest_id uuid;
    ALTER TABLE support_team ADD CONSTRAINT fk_support_team_guests 
      FOREIGN KEY (guest_id) REFERENCES guests(id) ON DELETE SET NULL;
  END IF;
END $$;