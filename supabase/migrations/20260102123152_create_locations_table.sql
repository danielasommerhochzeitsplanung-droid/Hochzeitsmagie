/*
  # Create locations table

  1. New Tables
    - `locations`
      - `id` (uuid, primary key) - Unique identifier for each location
      - `name` (text) - Name of the location (e.g., "Hotel Adler", "Salon Maria")
      - `type` (text) - Type of location (e.g., "Hotel", "Salon", "Kirche", "Standesamt", "Feier-Location", "Parkplatz")
      - `address` (text) - Full address of the location
      - `contact_name` (text) - Contact person at this location
      - `contact_phone` (text) - Phone number
      - `contact_email` (text) - Email address
      - `notes` (text) - Additional notes
      - `created_at` (timestamptz) - Timestamp when location was created

  2. Security
    - Enable RLS on `locations` table
    - Add policy for anyone to read locations
    - Add policy for anyone to insert locations
    - Add policy for anyone to update locations
    - Add policy for anyone to delete locations
*/

CREATE TABLE IF NOT EXISTS locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  address text DEFAULT '',
  contact_name text DEFAULT '',
  contact_phone text DEFAULT '',
  contact_email text DEFAULT '',
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read locations"
  ON locations FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert locations"
  ON locations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update locations"
  ON locations FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete locations"
  ON locations FOR DELETE
  USING (true);