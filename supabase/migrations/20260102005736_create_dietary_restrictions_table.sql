/*
  # Create dietary restrictions table

  1. New Tables
    - `dietary_restrictions`
      - `id` (uuid, primary key)
      - `guest_id` (uuid, foreign key to guests table)
      - `name` (text, optional - name or note about the person)
      - `is_vegetarian` (boolean, default false)
      - `is_vegan` (boolean, default false)
      - `is_lactose_intolerant` (boolean, default false)
      - `is_gluten_intolerant` (boolean, default false)
      - `is_halal` (boolean, default false)
      - `allergies` (text, nullable - for specific allergies)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `dietary_restrictions` table
    - Add policy for anyone to read dietary restrictions
    - Add policy for anyone to insert dietary restrictions
    - Add policy for anyone to update dietary restrictions
    - Add policy for anyone to delete dietary restrictions

  3. Notes
    - This replaces the counter-based dietary fields in the guests table
    - Each row represents one person with their specific dietary needs
    - Multiple restrictions can be combined per person (e.g., gluten + halal)
    - The old dietary fields in guests table are kept for data safety
*/

-- Create dietary_restrictions table
CREATE TABLE IF NOT EXISTS dietary_restrictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_id uuid NOT NULL REFERENCES guests(id) ON DELETE CASCADE,
  name text DEFAULT '',
  is_vegetarian boolean DEFAULT false,
  is_vegan boolean DEFAULT false,
  is_lactose_intolerant boolean DEFAULT false,
  is_gluten_intolerant boolean DEFAULT false,
  is_halal boolean DEFAULT false,
  allergies text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE dietary_restrictions ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous access
CREATE POLICY "Anyone can view dietary restrictions"
  ON dietary_restrictions FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert dietary restrictions"
  ON dietary_restrictions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update dietary restrictions"
  ON dietary_restrictions FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete dietary restrictions"
  ON dietary_restrictions FOR DELETE
  USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_dietary_restrictions_guest_id ON dietary_restrictions(guest_id);