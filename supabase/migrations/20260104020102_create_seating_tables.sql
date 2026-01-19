/*
  # Sitzplan-Modul: Tische & Zuordnungen

  1. Neue Tabellen
    - `tables`
      - `id` (uuid, primary key)
      - `name` (text) - Tischname/nummer (z.B. "Tisch 1", "Brautpaar-Tisch")
      - `table_type` (text) - Typ: round, rectangular, head_table, couple_table
      - `capacity` (integer) - Anzahl verfügbarer Sitzplätze
      - `position_x` (numeric) - X-Position im Saalplan (optional, für grafische Darstellung)
      - `position_y` (numeric) - Y-Position im Saalplan (optional)
      - `notes` (text) - Notizen zum Tisch
      - `created_at` (timestamptz)

    - `seating_assignments`
      - `id` (uuid, primary key)
      - `table_id` (uuid, foreign key -> tables)
      - `guest_id` (uuid, foreign key -> guests)
      - `assigned_at` (timestamptz) - Zeitpunkt der Zuordnung
      - `notes` (text) - Notizen zur Zuordnung
      - `created_at` (timestamptz)

  2. Sicherheit
    - RLS für beide Tabellen aktiviert
    - Policies für SELECT, INSERT, UPDATE, DELETE (anonym erlaubt für Demo-Zwecke)

  3. Constraints
    - Ein Gast kann nur einmal zugeordnet werden (unique constraint auf guest_id)
    - Kapazitätsprüfung über Application-Layer
*/

CREATE TABLE IF NOT EXISTS tables (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  table_type text NOT NULL DEFAULT 'round',
  capacity integer NOT NULL DEFAULT 8,
  position_x numeric DEFAULT 0,
  position_y numeric DEFAULT 0,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS seating_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  table_id uuid NOT NULL REFERENCES tables(id) ON DELETE CASCADE,
  guest_id uuid NOT NULL REFERENCES guests(id) ON DELETE CASCADE,
  assigned_at timestamptz DEFAULT now(),
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  UNIQUE(guest_id)
);

ALTER TABLE tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE seating_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on tables for everyone"
  ON tables
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on seating_assignments for everyone"
  ON seating_assignments
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_seating_assignments_table_id ON seating_assignments(table_id);
CREATE INDEX IF NOT EXISTS idx_seating_assignments_guest_id ON seating_assignments(guest_id);