/*
  # Seed Task Templates

  1. Initial Task Templates
    - Comprehensive set of wedding planning tasks
    - Organized by vendor/category
    - Timing rules based on planning window (18mo, 12mo, 9mo, 6mo, 3mo, immediate)
    - Default durations and priorities set

  2. Template Structure
    - category: Vendor or planning category
    - task_name: Specific task description
    - timing_rules: When task should be created based on planning window
    - priority: high, medium, low
    - default_duration: Days to complete task

  3. Notes
    - These are baseline templates that can be customized
    - Tasks auto-generate based on planning_start_date and wedding_date gap
*/

-- Insert task templates
INSERT INTO task_templates (category, task_name, description, priority, default_duration, timing_rules)
VALUES
  -- Location Tasks
  ('Location', 'Locations recherchieren und besichtigen', 'Verschiedene Locations anschauen und vergleichen', 'high', 14, '{"12_months": true, "18_months": true}'::jsonb),
  ('Location', 'Location buchen', 'Vertrag abschließen und Anzahlung leisten', 'high', 7, '{"9_months": true, "12_months": true, "18_months": true}'::jsonb),
  ('Location', 'Detailplanung mit Location', 'Raumaufteilung, Zeitplan, technische Details klären', 'medium', 14, '{"3_months": true, "6_months": true}'::jsonb),
  ('Location', 'Final Walk-Through', 'Letzte Absprachen vor Ort', 'high', 3, '{"immediate": true}'::jsonb),

  -- Catering Tasks
  ('Catering', 'Catering-Anbieter recherchieren', 'Verschiedene Caterer vergleichen und Angebote einholen', 'high', 14, '{"9_months": true, "12_months": true, "18_months": true}'::jsonb),
  ('Catering', 'Menü-Verkostung', 'Probemenü mit Caterer durchführen', 'medium', 7, '{"6_months": true, "9_months": true}'::jsonb),
  ('Catering', 'Catering buchen', 'Vertrag abschließen und Menü festlegen', 'high', 7, '{"6_months": true, "9_months": true, "12_months": true}'::jsonb),
  ('Catering', 'Finale Gästezahl mitteilen', 'Endgültige Anzahl und Sonderwünsche bestätigen', 'high', 3, '{"immediate": true}'::jsonb),

  -- Fotograf Tasks
  ('Fotograf', 'Fotografen recherchieren', 'Portfolio verschiedener Fotografen anschauen', 'high', 14, '{"9_months": true, "12_months": true, "18_months": true}'::jsonb),
  ('Fotograf', 'Fotografen buchen', 'Vertrag abschließen und Zeitplan besprechen', 'high', 7, '{"6_months": true, "9_months": true, "12_months": true}'::jsonb),
  ('Fotograf', 'Engagement Shooting', 'Vorab-Fotoshooting zur Vorbereitung', 'low', 7, '{"3_months": true, "6_months": true}'::jsonb),
  ('Fotograf', 'Shot List erstellen', 'Wunschfotos und wichtige Momente festhalten', 'medium', 7, '{"immediate": true, "3_months": true}'::jsonb),

  -- Dekoration Tasks
  ('Dekoration', 'Deko-Konzept entwickeln', 'Farbschema und Stil festlegen', 'medium', 14, '{"6_months": true, "9_months": true, "12_months": true}'::jsonb),
  ('Dekoration', 'Florist recherchieren und buchen', 'Blumenschmuck planen und bestellen', 'medium', 14, '{"6_months": true, "9_months": true}'::jsonb),
  ('Dekoration', 'Deko-Material besorgen', 'DIY-Material und zusätzliche Deko kaufen', 'low', 14, '{"3_months": true, "6_months": true}'::jsonb),
  ('Dekoration', 'Finale Deko-Details', 'Letzte Abstimmung mit Florist und Location', 'medium', 3, '{"immediate": true}'::jsonb),

  -- Musik/DJ Tasks
  ('Musik', 'DJ/Band recherchieren', 'Verschiedene Musiker vergleichen', 'medium', 14, '{"9_months": true, "12_months": true, "18_months": true}'::jsonb),
  ('Musik', 'DJ/Band buchen', 'Vertrag abschließen', 'high', 7, '{"6_months": true, "9_months": true, "12_months": true}'::jsonb),
  ('Musik', 'Playlist besprechen', 'Musikwünsche und No-Gos festlegen', 'medium', 7, '{"3_months": true, "6_months": true}'::jsonb),
  ('Musik', 'Ablaufplan für Musik erstellen', 'Zeitplan für erste Tanz, Einzug, etc.', 'medium', 3, '{"immediate": true, "3_months": true}'::jsonb),

  -- Einladungen Tasks
  ('Einladungen', 'Design festlegen', 'Stil und Layout der Einladungen wählen', 'medium', 14, '{"6_months": true, "9_months": true}'::jsonb),
  ('Einladungen', 'Save-the-Dates versenden', 'Vorab-Information an Gäste', 'medium', 7, '{"9_months": true, "12_months": true, "18_months": true}'::jsonb),
  ('Einladungen', 'Einladungen drucken', 'Finale Version drucken lassen', 'high', 14, '{"3_months": true, "6_months": true}'::jsonb),
  ('Einladungen', 'Einladungen versenden', 'An alle Gäste verschicken', 'high', 7, '{"3_months": true, "6_months": true}'::jsonb),

  -- Kleidung Tasks
  ('Kleidung', 'Brautkleid-Termine vereinbaren', 'Verschiedene Geschäfte besuchen', 'high', 14, '{"9_months": true, "12_months": true, "18_months": true}'::jsonb),
  ('Kleidung', 'Brautkleid kaufen', 'Kleid bestellen', 'high', 7, '{"6_months": true, "9_months": true, "12_months": true}'::jsonb),
  ('Kleidung', 'Anzug/Smoking besorgen', 'Outfit für Bräutigam', 'high', 14, '{"3_months": true, "6_months": true, "9_months": true}'::jsonb),
  ('Kleidung', 'Anproben Brautkleid', 'Finale Anpassungen', 'high', 7, '{"immediate": true, "3_months": true}'::jsonb),

  -- Standesamt Tasks
  ('Standesamt', 'Standesamt-Termin vereinbaren', 'Anmeldung zur Eheschließung', 'high', 7, '{"6_months": true, "9_months": true, "12_months": true}'::jsonb),
  ('Standesamt', 'Dokumente besorgen', 'Geburtsurkunden, Meldebescheinigungen, etc.', 'high', 14, '{"3_months": true, "6_months": true}'::jsonb),
  ('Standesamt', 'Trauzeuge festlegen', 'Offizielle Trauzeuge bestimmen', 'medium', 7, '{"6_months": true, "9_months": true}'::jsonb),

  -- Ringe Tasks
  ('Ringe', 'Ringe anschauen', 'Verschiedene Juweliere besuchen', 'high', 14, '{"6_months": true, "9_months": true, "12_months": true}'::jsonb),
  ('Ringe', 'Ringe bestellen', 'Auswahl treffen und bestellen', 'high', 7, '{"3_months": true, "6_months": true}'::jsonb),
  ('Ringe', 'Gravur festlegen', 'Text für Ringinnenseite wählen', 'low', 7, '{"3_months": true, "6_months": true}'::jsonb),

  -- Transport Tasks
  ('Transport', 'Hochzeitsauto organisieren', 'Fahrzeug für Brautpaar buchen', 'low', 14, '{"3_months": true, "6_months": true}'::jsonb),
  ('Transport', 'Gäste-Transport planen', 'Shuttle oder Fahrgemeinschaften organisieren', 'medium', 14, '{"3_months": true, "6_months": true}'::jsonb),

  -- Unterhaltung Tasks
  ('Unterhaltung', 'Zusätzliche Unterhaltung planen', 'Photobooth, Spiele, Animation', 'low', 14, '{"3_months": true, "6_months": true}'::jsonb),
  ('Unterhaltung', 'Kinderprogramm organisieren', 'Betreuung und Aktivitäten für Kinder', 'medium', 14, '{"3_months": true, "6_months": true}'::jsonb),

  -- Flitterwochen Tasks
  ('Flitterwochen', 'Reiseziel festlegen', 'Honeymoon planen', 'low', 14, '{"6_months": true, "9_months": true, "12_months": true}'::jsonb),
  ('Flitterwochen', 'Flitterwochen buchen', 'Flüge und Unterkunft reservieren', 'medium', 7, '{"3_months": true, "6_months": true}'::jsonb),

  -- Papeterie Tasks
  ('Papeterie', 'Menükarten gestalten', 'Design und Druck', 'low', 14, '{"3_months": true, "6_months": true}'::jsonb),
  ('Papeterie', 'Tischkarten erstellen', 'Namen und Sitzplätze', 'medium', 7, '{"immediate": true, "3_months": true}'::jsonb),
  ('Papeterie', 'Programmheft erstellen', 'Ablauf für Gäste', 'low', 7, '{"immediate": true, "3_months": true}'::jsonb)

ON CONFLICT DO NOTHING;