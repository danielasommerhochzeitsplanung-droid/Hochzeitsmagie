/*
  # Create wedding data table

  1. New Tables
    - `wedding_data`
      - `id` (uuid, primary key)
      - `bride_name` (text, not null)
      - `groom_name` (text, not null)
      - `wedding_date` (date, not null)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)
  
  2. Security
    - Enable RLS on `wedding_data` table
    - Add policy for public access (no auth required for this planning tool)
*/

CREATE TABLE IF NOT EXISTS wedding_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bride_name text NOT NULL,
  groom_name text NOT NULL,
  wedding_date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE wedding_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON wedding_data
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public insert access"
  ON wedding_data
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public update access"
  ON wedding_data
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);