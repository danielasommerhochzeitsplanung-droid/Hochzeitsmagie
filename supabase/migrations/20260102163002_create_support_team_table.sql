/*
  # Create Support Team Table

  1. New Tables
    - `support_team`
      - `id` (uuid, primary key)
      - `name` (text) - Name of the team member
      - `role` (text) - Role (e.g., Best Man, Maid of Honor, Wedding Planner)
      - `phone` (text) - Phone number
      - `email` (text) - Email address
      - `responsibilities` (text) - Tasks and responsibilities
      - `notes` (text) - Additional notes
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `support_team` table
    - Add policies for anonymous users to perform all operations
*/

CREATE TABLE IF NOT EXISTS support_team (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT '',
  phone text DEFAULT '',
  email text DEFAULT '',
  responsibilities text DEFAULT '',
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE support_team ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous users to read support team"
  ON support_team
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anonymous users to insert support team"
  ON support_team
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous users to update support team"
  ON support_team
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow anonymous users to delete support team"
  ON support_team
  FOR DELETE
  TO anon
  USING (true);