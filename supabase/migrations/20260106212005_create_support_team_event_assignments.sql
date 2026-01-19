/*
  # Create Support Team Event Assignments Table

  1. New Tables
    - `support_team_event_assignments`
      - `support_team_id` (uuid, foreign key to support_team)
      - `event_id` (uuid, foreign key to events)
      - `created_at` (timestamp)
      - Composite primary key (support_team_id, event_id)

  2. Purpose
    - Links support team members to events
    - Allows multiple support team members per event
    - Similar pattern to vendor_event_assignments

  3. Security
    - Enable RLS on table
    - Add policies for authenticated users to manage assignments
*/

CREATE TABLE IF NOT EXISTS support_team_event_assignments (
  support_team_id uuid NOT NULL REFERENCES support_team(id) ON DELETE CASCADE,
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (support_team_id, event_id)
);

-- Enable RLS
ALTER TABLE support_team_event_assignments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Support team event assignments are publicly readable"
  ON support_team_event_assignments
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert support team event assignments"
  ON support_team_event_assignments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update support team event assignments"
  ON support_team_event_assignments
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete support team event assignments"
  ON support_team_event_assignments
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_support_team_event_assignments_event ON support_team_event_assignments(event_id);
CREATE INDEX IF NOT EXISTS idx_support_team_event_assignments_support_team ON support_team_event_assignments(support_team_id);