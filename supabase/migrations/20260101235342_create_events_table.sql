/*
  # Create Events Table

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `name_de` (text) - German name of the event
      - `name_en` (text) - English name of the event
      - `emoji` (text) - Emoji representing the event
      - `active` (boolean) - Whether the event is active
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `events` table
    - Add policy for all users to read events (public read access)

  3. Data
    - Insert all wedding events with German and English names
*/

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_de text NOT NULL,
  name_en text NOT NULL,
  emoji text NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Allow all users to read events
CREATE POLICY "Events are publicly readable"
  ON events
  FOR SELECT
  USING (true);

-- Insert wedding events
INSERT INTO events (name_de, name_en, emoji, active)
VALUES
  ('Standesamt', 'Registry Office', '🏛️', true),
  ('Traditionelle Zeremonie', 'Traditional Ceremony', '👰', true),
  ('Kirche', 'Church', '⛪', true),
  ('Sektempfang', 'Champagne Reception', '🥂', true),
  ('Freie Trauung', 'Outdoor Ceremony', '💐', true),
  ('Nachmittagskaffee', 'Afternoon Coffee', '☕', true),
  ('Dinner', 'Dinner', '🍽️', true),
  ('Feier', 'Party', '🎉', true),
  ('Brunch', 'Brunch', '🥐', true)
ON CONFLICT (id) DO NOTHING;