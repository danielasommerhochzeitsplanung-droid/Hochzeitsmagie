/*
  # Vendor-Erweiterungen

  ## Änderungen
  1. Neue Spalten in `vendors` Tabelle
    - `documents_link` (text) - Link zu Dokumenten
    - `cancellation_deadline` (date) - Stornierungsfrist
  
  2. Neue Tabelle: `vendor_event_assignments`
    - Verknüpfung zwischen Vendors und Events
    - `vendor_id` (uuid, foreign key)
    - `event_id` (uuid, foreign key)
    - Composite primary key
  
  3. Security
    - RLS-Policies für neue Tabelle
    - Alle Benutzer können Vendor-Event-Zuordnungen verwalten
*/

-- Add new columns to vendors table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendors' AND column_name = 'documents_link'
  ) THEN
    ALTER TABLE vendors ADD COLUMN documents_link text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendors' AND column_name = 'cancellation_deadline'
  ) THEN
    ALTER TABLE vendors ADD COLUMN cancellation_deadline date;
  END IF;
END $$;

-- Create vendor_event_assignments table
CREATE TABLE IF NOT EXISTS vendor_event_assignments (
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (vendor_id, event_id)
);

-- Enable RLS
ALTER TABLE vendor_event_assignments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for vendor_event_assignments
CREATE POLICY "Anyone can view vendor event assignments"
  ON vendor_event_assignments
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert vendor event assignments"
  ON vendor_event_assignments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update vendor event assignments"
  ON vendor_event_assignments
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete vendor event assignments"
  ON vendor_event_assignments
  FOR DELETE
  TO anon, authenticated
  USING (true);