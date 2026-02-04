/*
  # Task Templates für Location & Ablauf (Neustrukturierung)

  ## Übersicht
  Erstellt eine neue Task-Templates Struktur für verschiedene Planungszeiträume.

  ## Änderungen
  - Alte `task_templates` Tabelle wird in `task_templates_old` umbenannt (Backup)
  - Neue `task_templates` Tabelle mit optimierter Struktur

  ## Neue Tabellen
  - `task_templates`
    - `id` (text, PK) - Eindeutige Template-ID (z.B. "LOC_01_6M")
    - `category` (text) - Kategorie (z.B. "Location & Ablauf")
    - `phase` (integer) - Phase 1-3 (Entscheidung, Ablauf, Finalisierung)
    - `order_in_phase` (integer) - Reihenfolge innerhalb der Phase
    - `title_de` (text) - Deutscher Titel
    - `title_en` (text) - Englischer Titel
    - `description_de` (text, optional) - Deutsche Beschreibung
    - `description_en` (text, optional) - Englische Beschreibung
    - `planning_duration_months` (integer) - Planungszeitraum (6, 9, 12, 15, 18, 24, 30)
    - `recommended_offset_months` (decimal) - Empfohlener Start vor Hochzeit
    - `latest_completion_months` (decimal) - Spätester Abschluss vor Hochzeit
    - `is_critical` (boolean) - Ist dieser Task kritisch?
    - `created_at` (timestamptz) - Erstellungszeitpunkt

  ## Daten
  - 42 Task-Templates (6 Tasks × 7 Planungszeiträume)
  - Kategorie: Location & Ablauf
  - 3 Phasen mit festen Inhalten, unterschiedlichen Zeitoffsets

  ## Sicherheit
  - RLS aktiviert
  - Alle User können Templates lesen (SELECT)
  - Keine Änderungen durch normale User möglich
*/

-- Backup der alten Tabelle
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'task_templates') THEN
    ALTER TABLE task_templates RENAME TO task_templates_old;
  END IF;
END $$;

-- Erstelle die neue Task-Templates Tabelle
CREATE TABLE task_templates (
  id text PRIMARY KEY,
  category text NOT NULL,
  phase integer NOT NULL CHECK (phase >= 1 AND phase <= 3),
  order_in_phase integer NOT NULL,
  title_de text NOT NULL,
  title_en text NOT NULL,
  description_de text,
  description_en text,
  planning_duration_months integer NOT NULL CHECK (planning_duration_months >= 6),
  recommended_offset_months decimal NOT NULL,
  latest_completion_months decimal NOT NULL,
  is_critical boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Erstelle Indizes für bessere Performance
CREATE INDEX idx_task_templates_category ON task_templates(category);
CREATE INDEX idx_task_templates_planning_duration ON task_templates(planning_duration_months);
CREATE INDEX idx_task_templates_phase ON task_templates(phase);

-- RLS aktivieren
ALTER TABLE task_templates ENABLE ROW LEVEL SECURITY;

-- Policy: Alle können Templates lesen
CREATE POLICY "Anyone can read task templates"
  ON task_templates
  FOR SELECT
  USING (true);

-- Füge die Task-Templates ein (Location & Ablauf)

-- 6 Monate Planungszeitraum
INSERT INTO task_templates (id, category, phase, order_in_phase, title_de, title_en, planning_duration_months, recommended_offset_months, latest_completion_months, is_critical) VALUES
('LOC_01_6M', 'Location & Ablauf', 1, 1, 'Rahmen für die Location festlegen', 'Define venue requirements', 6, -6, -5, true),
('LOC_02_6M', 'Location & Ablauf', 1, 2, 'Locations recherchieren & vergleichen', 'Research and compare venues', 6, -6, -5, true),
('LOC_03_6M', 'Location & Ablauf', 1, 3, 'Locations besichtigen', 'Visit venues', 6, -5.5, -5, true),
('LOC_04_6M', 'Location & Ablauf', 1, 4, 'Location auswählen & buchen', 'Select and book venue', 6, -5, -5, true),
('LOC_05_6M', 'Location & Ablauf', 2, 1, 'Räume, Ablauf & Leistungen mit der Location klären', 'Clarify spaces, schedule & services with venue', 6, -4.5, -2.5, false),
('LOC_06_6M', 'Location & Ablauf', 3, 1, 'Ablauf & Plan B final abstimmen', 'Finalize schedule & backup plan', 6, -2.5, -0.5, false);

-- 9 Monate Planungszeitraum
INSERT INTO task_templates (id, category, phase, order_in_phase, title_de, title_en, planning_duration_months, recommended_offset_months, latest_completion_months, is_critical) VALUES
('LOC_01_9M', 'Location & Ablauf', 1, 1, 'Rahmen für die Location festlegen', 'Define venue requirements', 9, -9, -7, true),
('LOC_02_9M', 'Location & Ablauf', 1, 2, 'Locations recherchieren & vergleichen', 'Research and compare venues', 9, -9, -7, true),
('LOC_03_9M', 'Location & Ablauf', 1, 3, 'Locations besichtigen', 'Visit venues', 9, -8, -7, true),
('LOC_04_9M', 'Location & Ablauf', 1, 4, 'Location auswählen & buchen', 'Select and book venue', 9, -7, -7, true),
('LOC_05_9M', 'Location & Ablauf', 2, 1, 'Räume, Ablauf & Leistungen mit der Location klären', 'Clarify spaces, schedule & services with venue', 9, -6, -3, false),
('LOC_06_9M', 'Location & Ablauf', 3, 1, 'Ablauf & Plan B final abstimmen', 'Finalize schedule & backup plan', 9, -3, -0.5, false);

-- 12 Monate Planungszeitraum
INSERT INTO task_templates (id, category, phase, order_in_phase, title_de, title_en, planning_duration_months, recommended_offset_months, latest_completion_months, is_critical) VALUES
('LOC_01_12M', 'Location & Ablauf', 1, 1, 'Rahmen für die Location festlegen', 'Define venue requirements', 12, -12, -10, true),
('LOC_02_12M', 'Location & Ablauf', 1, 2, 'Locations recherchieren & vergleichen', 'Research and compare venues', 12, -12, -10, true),
('LOC_03_12M', 'Location & Ablauf', 1, 3, 'Locations besichtigen', 'Visit venues', 12, -11, -10, true),
('LOC_04_12M', 'Location & Ablauf', 1, 4, 'Location auswählen & buchen', 'Select and book venue', 12, -10, -10, true),
('LOC_05_12M', 'Location & Ablauf', 2, 1, 'Räume, Ablauf & Leistungen mit der Location klären', 'Clarify spaces, schedule & services with venue', 12, -8, -5, false),
('LOC_06_12M', 'Location & Ablauf', 3, 1, 'Ablauf & Plan B final abstimmen', 'Finalize schedule & backup plan', 12, -3, -0.5, false);

-- 15 Monate Planungszeitraum
INSERT INTO task_templates (id, category, phase, order_in_phase, title_de, title_en, planning_duration_months, recommended_offset_months, latest_completion_months, is_critical) VALUES
('LOC_01_15M', 'Location & Ablauf', 1, 1, 'Rahmen für die Location festlegen', 'Define venue requirements', 15, -15, -13, true),
('LOC_02_15M', 'Location & Ablauf', 1, 2, 'Locations recherchieren & vergleichen', 'Research and compare venues', 15, -15, -13, true),
('LOC_03_15M', 'Location & Ablauf', 1, 3, 'Locations besichtigen', 'Visit venues', 15, -14, -13, true),
('LOC_04_15M', 'Location & Ablauf', 1, 4, 'Location auswählen & buchen', 'Select and book venue', 15, -13, -13, true),
('LOC_05_15M', 'Location & Ablauf', 2, 1, 'Räume, Ablauf & Leistungen mit der Location klären', 'Clarify spaces, schedule & services with venue', 15, -10, -7, false),
('LOC_06_15M', 'Location & Ablauf', 3, 1, 'Ablauf & Plan B final abstimmen', 'Finalize schedule & backup plan', 15, -3, -0.5, false);

-- 18 Monate Planungszeitraum
INSERT INTO task_templates (id, category, phase, order_in_phase, title_de, title_en, planning_duration_months, recommended_offset_months, latest_completion_months, is_critical) VALUES
('LOC_01_18M', 'Location & Ablauf', 1, 1, 'Rahmen für die Location festlegen', 'Define venue requirements', 18, -18, -16, true),
('LOC_02_18M', 'Location & Ablauf', 1, 2, 'Locations recherchieren & vergleichen', 'Research and compare venues', 18, -18, -16, true),
('LOC_03_18M', 'Location & Ablauf', 1, 3, 'Locations besichtigen', 'Visit venues', 18, -17, -16, true),
('LOC_04_18M', 'Location & Ablauf', 1, 4, 'Location auswählen & buchen', 'Select and book venue', 18, -16, -16, true),
('LOC_05_18M', 'Location & Ablauf', 2, 1, 'Räume, Ablauf & Leistungen mit der Location klären', 'Clarify spaces, schedule & services with venue', 18, -12, -9, false),
('LOC_06_18M', 'Location & Ablauf', 3, 1, 'Ablauf & Plan B final abstimmen', 'Finalize schedule & backup plan', 18, -3, -0.5, false);

-- 24 Monate Planungszeitraum
INSERT INTO task_templates (id, category, phase, order_in_phase, title_de, title_en, planning_duration_months, recommended_offset_months, latest_completion_months, is_critical) VALUES
('LOC_01_24M', 'Location & Ablauf', 1, 1, 'Rahmen für die Location festlegen', 'Define venue requirements', 24, -24, -22, true),
('LOC_02_24M', 'Location & Ablauf', 1, 2, 'Locations recherchieren & vergleichen', 'Research and compare venues', 24, -24, -22, true),
('LOC_03_24M', 'Location & Ablauf', 1, 3, 'Locations besichtigen', 'Visit venues', 24, -23, -22, true),
('LOC_04_24M', 'Location & Ablauf', 1, 4, 'Location auswählen & buchen', 'Select and book venue', 24, -22, -22, true),
('LOC_05_24M', 'Location & Ablauf', 2, 1, 'Räume, Ablauf & Leistungen mit der Location klären', 'Clarify spaces, schedule & services with venue', 24, -16, -13, false),
('LOC_06_24M', 'Location & Ablauf', 3, 1, 'Ablauf & Plan B final abstimmen', 'Finalize schedule & backup plan', 24, -3, -0.5, false);

-- 30 Monate Planungszeitraum
INSERT INTO task_templates (id, category, phase, order_in_phase, title_de, title_en, planning_duration_months, recommended_offset_months, latest_completion_months, is_critical) VALUES
('LOC_01_30M', 'Location & Ablauf', 1, 1, 'Rahmen für die Location festlegen', 'Define venue requirements', 30, -30, -28, true),
('LOC_02_30M', 'Location & Ablauf', 1, 2, 'Locations recherchieren & vergleichen', 'Research and compare venues', 30, -30, -28, true),
('LOC_03_30M', 'Location & Ablauf', 1, 3, 'Locations besichtigen', 'Visit venues', 30, -29, -28, true),
('LOC_04_30M', 'Location & Ablauf', 1, 4, 'Location auswählen & buchen', 'Select and book venue', 30, -28, -28, true),
('LOC_05_30M', 'Location & Ablauf', 2, 1, 'Räume, Ablauf & Leistungen mit der Location klären', 'Clarify spaces, schedule & services with venue', 30, -16, -13, false),
('LOC_06_30M', 'Location & Ablauf', 3, 1, 'Ablauf & Plan B final abstimmen', 'Finalize schedule & backup plan', 30, -3, -0.5, false);
