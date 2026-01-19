/*
  # Create event contacts table

  1. New Tables
    - `event_contacts`
      - `id` (uuid, primary key) - Unique identifier for each contact
      - `event_id` (uuid, foreign key) - References events table
      - `name` (text) - Name of the contact person
      - `phone` (text) - Phone number
      - `email` (text) - Email address
      - `created_at` (timestamptz) - Timestamp when contact was created

  2. Security
    - Enable RLS on `event_contacts` table
    - Add policy for anyone to read event contacts
    - Add policy for anyone to insert event contacts
    - Add policy for anyone to update event contacts
    - Add policy for anyone to delete event contacts
*/

CREATE TABLE IF NOT EXISTS event_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT '',
  phone text DEFAULT '',
  email text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE event_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read event contacts"
  ON event_contacts FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert event contacts"
  ON event_contacts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update event contacts"
  ON event_contacts FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete event contacts"
  ON event_contacts FOR DELETE
  USING (true);