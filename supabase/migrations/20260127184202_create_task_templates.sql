/*
  # Task Templates Tabelle erstellen

  1. Neue Tabelle
    - `task_templates`
      - `id` (text, primary key) - Eindeutige ID des Templates (z.B. 'planung-1')
      - `category` (text) - Kategorie des Tasks (z.B. 'Planung', 'Location', 'Catering')
      - `task_name` (text) - Name der Aufgabe
      - `description` (text) - Detaillierte Beschreibung der Aufgabe
      - `priority` (text) - Priorität: 'high', 'medium' oder 'low'
      - `default_duration` (integer) - Standard-Dauer in Tagen
      - `timing_rules` (jsonb) - Zeitpunkt-Regeln (z.B. {"immediate": true, "3_months": true})
      - `created_at` (timestamptz) - Erstellungszeitpunkt

  2. Sicherheit
    - RLS aktiviert
    - Leserechte für authentifizierte Benutzer
    - Schreibrechte nur für authentifizierte Benutzer (für spätere Admin-Funktionen)
*/

CREATE TABLE IF NOT EXISTS task_templates (
  id text PRIMARY KEY,
  category text NOT NULL,
  task_name text NOT NULL,
  description text NOT NULL,
  priority text NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
  default_duration integer NOT NULL DEFAULT 7,
  timing_rules jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE task_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read task templates"
  ON task_templates
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert templates"
  ON task_templates
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update templates"
  ON task_templates
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete templates"
  ON task_templates
  FOR DELETE
  TO authenticated
  USING (true);