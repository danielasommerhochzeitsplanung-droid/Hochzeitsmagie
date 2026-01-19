/*
  # Create vendor_event_day_contacts table

  1. New Tables
    - `vendor_event_day_contacts`
      - `id` (uuid, primary key)
      - `vendor_id` (uuid, foreign key to vendors)
      - `name` (text)
      - `phone` (text)
      - `email` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `vendor_event_day_contacts` table
    - Add policies for anonymous users to manage vendor event day contacts

  3. Migration
    - Migrate existing event day contact person from vendors table to vendor_event_day_contacts table
    - Remove old event day contact fields from vendors table
*/

-- Create vendor_event_day_contacts table
CREATE TABLE IF NOT EXISTS vendor_event_day_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  name text DEFAULT '',
  phone text DEFAULT '',
  email text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE vendor_event_day_contacts ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous users
CREATE POLICY "Anyone can view vendor event day contacts"
  ON vendor_event_day_contacts FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert vendor event day contacts"
  ON vendor_event_day_contacts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update vendor event day contacts"
  ON vendor_event_day_contacts FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete vendor event day contacts"
  ON vendor_event_day_contacts FOR DELETE
  USING (true);

-- Migrate existing event day contact person from vendors table
INSERT INTO vendor_event_day_contacts (vendor_id, name, phone, email)
SELECT 
  id,
  contact_person_event_day,
  phone_event_day,
  email_event_day
FROM vendors
WHERE contact_person_event_day IS NOT NULL AND contact_person_event_day != '';

-- Drop old event day contact columns from vendors table
ALTER TABLE vendors 
  DROP COLUMN IF EXISTS contact_person_event_day,
  DROP COLUMN IF EXISTS phone_event_day,
  DROP COLUMN IF EXISTS email_event_day;