/*
  # Create Location Contacts and Vendor Assignments Tables

  1. New Tables
    - `location_contacts`
      - `id` (uuid, primary key)
      - `location_id` (uuid, references locations)
      - `name` (text) - Full name of the contact person
      - `role` (text) - Their role/position (e.g., "Event Manager", "Hausmeister")
      - `phone` (text, optional) - Phone number
      - `email` (text, optional) - Email address
      - `notes` (text, optional) - Additional notes
      - `created_at` (timestamptz)
      
    - `location_vendor_assignments`
      - `id` (uuid, primary key)
      - `location_id` (uuid, references locations)
      - `vendor_id` (uuid, references vendors)
      - `notes` (text, optional) - Notes about this vendor's work at this location
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for anonymous users to perform all operations

  3. Important Notes
    - Contacts are specific to locations (e.g., hotel manager)
    - Vendor assignments link vendors to locations where they work
    - Keeps clear separation between location and event contacts
*/

-- Create location_contacts table
CREATE TABLE IF NOT EXISTS location_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id uuid REFERENCES locations(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  role text DEFAULT '',
  phone text DEFAULT '',
  email text DEFAULT '',
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create location_vendor_assignments table
CREATE TABLE IF NOT EXISTS location_vendor_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id uuid REFERENCES locations(id) ON DELETE CASCADE NOT NULL,
  vendor_id uuid REFERENCES vendors(id) ON DELETE CASCADE NOT NULL,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE location_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE location_vendor_assignments ENABLE ROW LEVEL SECURITY;

-- Policies for location_contacts (anonymous access)
CREATE POLICY "Allow anonymous select on location_contacts"
  ON location_contacts FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anonymous insert on location_contacts"
  ON location_contacts FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous update on location_contacts"
  ON location_contacts FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow anonymous delete on location_contacts"
  ON location_contacts FOR DELETE
  TO anon
  USING (true);

-- Policies for location_vendor_assignments (anonymous access)
CREATE POLICY "Allow anonymous select on location_vendor_assignments"
  ON location_vendor_assignments FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anonymous insert on location_vendor_assignments"
  ON location_vendor_assignments FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous update on location_vendor_assignments"
  ON location_vendor_assignments FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow anonymous delete on location_vendor_assignments"
  ON location_vendor_assignments FOR DELETE
  TO anon
  USING (true);