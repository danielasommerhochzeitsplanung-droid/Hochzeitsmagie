/*
  # Create Guests Table

  1. New Tables
    - `guests`
      - `id` (uuid, primary key) - Unique identifier for each guest
      - `name` (text, required) - Name of the main guest
      - `partner_name` (text, optional) - Name of partner/companion
      - `number_of_adults` (integer, default 1) - Number of adults in the party
      - `number_of_children` (integer, default 0) - Number of children in the party
      - `children` (jsonb, default []) - Array of children with name and age
      - `save_the_date_sent` (boolean, default false) - Save the Date sending status
      - `invitation_sent` (boolean, default false) - Invitation sending status
      - `events` (jsonb, default []) - Array of selected event IDs
      - `notes` (text, optional) - Additional notes about the guest
      - `archived` (boolean, default false) - Whether the guest is archived
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `guests` table
    - Add policy for authenticated users to read all guests
    - Add policy for authenticated users to insert guests
    - Add policy for authenticated users to update guests
    - Add policy for authenticated users to delete guests

  3. Indexes
    - Index on `name` for sorting
    - Index on `archived` for filtering active/archived guests
*/

CREATE TABLE IF NOT EXISTS guests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  partner_name text,
  number_of_adults integer DEFAULT 1,
  number_of_children integer DEFAULT 0,
  children jsonb DEFAULT '[]'::jsonb,
  save_the_date_sent boolean DEFAULT false,
  invitation_sent boolean DEFAULT false,
  events jsonb DEFAULT '[]'::jsonb,
  notes text,
  archived boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index for sorting by name
CREATE INDEX IF NOT EXISTS idx_guests_name ON guests(name);

-- Create index for filtering by archived status
CREATE INDEX IF NOT EXISTS idx_guests_archived ON guests(archived);

-- Enable RLS
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

-- Policies for authenticated users
CREATE POLICY "Authenticated users can read guests"
  ON guests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert guests"
  ON guests FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update guests"
  ON guests FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete guests"
  ON guests FOR DELETE
  TO authenticated
  USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_guests_updated_at
  BEFORE UPDATE ON guests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();