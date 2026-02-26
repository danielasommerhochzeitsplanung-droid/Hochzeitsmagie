/*
  # Add Styling & Atmosphere Tasks - Dekoration

  1. New Tasks
    - Adds comprehensive decoration and styling tasks for the "styling_atmosphere" category
    - Includes tasks for decoration planning, theme development, and styling coordination
    - Tasks are organized by planning duration (6, 9, 12, 15, 18, 24, 30 months)
    - Each task has proper offset timing relative to wedding date
  
  2. Task Categories
    - Color scheme and theme development
    - Decoration planning and execution
    - Table decorations and centerpieces
    - Ceremony decorations
    - Venue styling coordination
    - Final decoration setup
  
  3. Technical Details
    - All tasks use technical category name: "styling_atmosphere"
    - Translations handled via frontend i18n
    - Tasks properly sequenced with offset_months for optimal planning
    - Uses ID pattern: STY_<order>_<duration>M (e.g., STY_01_6M)
    - Includes latest_completion_months based on recommended_offset - 1 month buffer
*/

-- 6 months planning duration - Dekoration tasks
INSERT INTO task_templates (id, category, title_de, title_en, description_de, description_en, is_critical, recommended_offset_months, latest_completion_months, planning_duration_months, phase, order_in_phase)
VALUES 
  ('STY_01_6M', 'styling_atmosphere', 'Farbschema festlegen', 'Define color scheme', 'Hauptfarben und Farbpalette für die Hochzeit auswählen', 'Select main colors and color palette for the wedding', true, 4, 3, 6, 1, 1),
  ('STY_02_6M', 'styling_atmosphere', 'Dekorationsstil wählen', 'Choose decoration style', 'Entscheidung für Dekorationsstil (rustikal, modern, romantisch, etc.)', 'Decide on decoration style (rustic, modern, romantic, etc.)', true, 4, 3, 6, 1, 2),
  ('STY_03_6M', 'styling_atmosphere', 'Blumenschmuck planen', 'Plan floral decorations', 'Blumenarrangements für Zeremonie und Empfang planen', 'Plan flower arrangements for ceremony and reception', true, 3, 2, 6, 2, 1),
  ('STY_04_6M', 'styling_atmosphere', 'Tischdekoration festlegen', 'Define table decorations', 'Konzept für Tischdekoration und Centerpieces entwickeln', 'Develop concept for table decorations and centerpieces', false, 2, 1, 6, 2, 2),
  ('STY_05_6M', 'styling_atmosphere', 'Finale Deko-Details', 'Final decoration details', 'Letzte Details für Dekoration klären und organisieren', 'Clarify and organize final decoration details', false, 0.5, 0.2, 6, 3, 1);

-- 9 months planning duration - Dekoration tasks
INSERT INTO task_templates (id, category, title_de, title_en, description_de, description_en, is_critical, recommended_offset_months, latest_completion_months, planning_duration_months, phase, order_in_phase)
VALUES 
  ('STY_01_9M', 'styling_atmosphere', 'Farbschema festlegen', 'Define color scheme', 'Hauptfarben und Farbpalette für die Hochzeit auswählen', 'Select main colors and color palette for the wedding', true, 6, 5, 9, 1, 1),
  ('STY_02_9M', 'styling_atmosphere', 'Dekorationsstil wählen', 'Choose decoration style', 'Entscheidung für Dekorationsstil (rustikal, modern, romantisch, etc.)', 'Decide on decoration style (rustic, modern, romantic, etc.)', true, 6, 5, 9, 1, 2),
  ('STY_03_9M', 'styling_atmosphere', 'Blumenschmuck planen', 'Plan floral decorations', 'Blumenarrangements für Zeremonie und Empfang planen', 'Plan flower arrangements for ceremony and reception', true, 4, 3, 9, 2, 1),
  ('STY_04_9M', 'styling_atmosphere', 'Tischdekoration konzipieren', 'Design table decorations', 'Detailliertes Konzept für Tischdekoration erstellen', 'Create detailed concept for table decorations', true, 3, 2, 9, 2, 2),
  ('STY_05_9M', 'styling_atmosphere', 'Zeremonie-Dekoration planen', 'Plan ceremony decorations', 'Dekoration für Trauungslocation planen (Altar, Gang, etc.)', 'Plan decorations for ceremony location (altar, aisle, etc.)', false, 2, 1, 9, 2, 3),
  ('STY_06_9M', 'styling_atmosphere', 'Finale Deko-Details', 'Final decoration details', 'Letzte Details für Dekoration klären und organisieren', 'Clarify and organize final decoration details', false, 0.5, 0.2, 9, 3, 1);

-- 12 months planning duration - Dekoration tasks
INSERT INTO task_templates (id, category, title_de, title_en, description_de, description_en, is_critical, recommended_offset_months, latest_completion_months, planning_duration_months, phase, order_in_phase)
VALUES 
  ('STY_01_12M', 'styling_atmosphere', 'Hochzeitsthema entwickeln', 'Develop wedding theme', 'Gesamtthema und Motto für die Hochzeit festlegen', 'Define overall theme and motto for the wedding', true, 9, 8, 12, 1, 1),
  ('STY_02_12M', 'styling_atmosphere', 'Farbschema festlegen', 'Define color scheme', 'Hauptfarben und Farbpalette für die Hochzeit auswählen', 'Select main colors and color palette for the wedding', true, 8, 7, 12, 1, 2),
  ('STY_03_12M', 'styling_atmosphere', 'Dekorationsstil wählen', 'Choose decoration style', 'Entscheidung für Dekorationsstil (rustikal, modern, romantisch, etc.)', 'Decide on decoration style (rustic, modern, romantic, etc.)', true, 8, 7, 12, 1, 3),
  ('STY_04_12M', 'styling_atmosphere', 'Blumendekoration planen', 'Plan floral decorations', 'Umfassendes Blumenkonzept für alle Bereiche entwickeln', 'Develop comprehensive flower concept for all areas', true, 5, 4, 12, 2, 1),
  ('STY_05_12M', 'styling_atmosphere', 'Tischdekoration konzipieren', 'Design table decorations', 'Detailliertes Konzept für Tischdekoration und Centerpieces', 'Detailed concept for table decorations and centerpieces', true, 4, 3, 12, 2, 2),
  ('STY_06_12M', 'styling_atmosphere', 'Zeremonie-Dekoration planen', 'Plan ceremony decorations', 'Dekoration für Trauungslocation planen (Altar, Gang, etc.)', 'Plan decorations for ceremony location (altar, aisle, etc.)', true, 3, 2, 12, 2, 3),
  ('STY_07_12M', 'styling_atmosphere', 'Beleuchtungskonzept erstellen', 'Create lighting concept', 'Lichtkonzept für stimmungsvolle Atmosphäre planen', 'Plan lighting concept for atmospheric ambiance', false, 2, 1, 12, 2, 4),
  ('STY_08_12M', 'styling_atmosphere', 'Finale Deko-Abstimmung', 'Final decoration coordination', 'Letzte Abstimmung aller Dekorationselemente', 'Final coordination of all decoration elements', false, 0.5, 0.2, 12, 3, 1);

-- 15 months planning duration - Dekoration tasks
INSERT INTO task_templates (id, category, title_de, title_en, description_de, description_en, is_critical, recommended_offset_months, latest_completion_months, planning_duration_months, phase, order_in_phase)
VALUES 
  ('STY_01_15M', 'styling_atmosphere', 'Hochzeitsthema entwickeln', 'Develop wedding theme', 'Gesamtthema und Motto für die Hochzeit festlegen', 'Define overall theme and motto for the wedding', true, 11, 10, 15, 1, 1),
  ('STY_02_15M', 'styling_atmosphere', 'Farbschema festlegen', 'Define color scheme', 'Hauptfarben und Farbpalette für die Hochzeit auswählen', 'Select main colors and color palette for the wedding', true, 10, 9, 15, 1, 2),
  ('STY_03_15M', 'styling_atmosphere', 'Dekorationsstil definieren', 'Define decoration style', 'Umfassende Entscheidung für Dekorationsstil und Atmosphäre', 'Comprehensive decision on decoration style and atmosphere', true, 10, 9, 15, 1, 3),
  ('STY_04_15M', 'styling_atmosphere', 'Florist recherchieren', 'Research florists', 'Verschiedene Floristen vergleichen und Angebote einholen', 'Compare different florists and get quotes', true, 8, 7, 15, 2, 1),
  ('STY_05_15M', 'styling_atmosphere', 'Blumendekoration planen', 'Plan floral decorations', 'Detailliertes Blumenkonzept für alle Bereiche', 'Detailed flower concept for all areas', true, 6, 5, 15, 2, 2),
  ('STY_06_15M', 'styling_atmosphere', 'Tischdekoration entwickeln', 'Develop table decorations', 'Kreatives Konzept für Tischdekoration mit Moodboard', 'Creative concept for table decorations with moodboard', true, 5, 4, 15, 2, 3),
  ('STY_07_15M', 'styling_atmosphere', 'Zeremonie-Dekoration planen', 'Plan ceremony decorations', 'Ausführliche Planung der Zeremonie-Dekoration', 'Comprehensive planning of ceremony decorations', true, 4, 3, 15, 2, 4),
  ('STY_08_15M', 'styling_atmosphere', 'Beleuchtungskonzept', 'Lighting concept', 'Professionelles Lichtkonzept für alle Bereiche', 'Professional lighting concept for all areas', false, 3, 2, 15, 2, 5),
  ('STY_09_15M', 'styling_atmosphere', 'Deko-Material bestellen', 'Order decoration materials', 'Alle notwendigen Dekomaterialien bestellen', 'Order all necessary decoration materials', false, 1.5, 1, 15, 3, 1),
  ('STY_10_15M', 'styling_atmosphere', 'Finale Deko-Abstimmung', 'Final decoration coordination', 'Letzte Abstimmung und Feinabstimmung aller Details', 'Final coordination and fine-tuning of all details', false, 0.5, 0.2, 15, 3, 2);

-- 18 months planning duration - Dekoration tasks
INSERT INTO task_templates (id, category, title_de, title_en, description_de, description_en, is_critical, recommended_offset_months, latest_completion_months, planning_duration_months, phase, order_in_phase)
VALUES 
  ('STY_01_18M', 'styling_atmosphere', 'Hochzeitsthema entwickeln', 'Develop wedding theme', 'Gesamtthema und Motto für die Hochzeit festlegen', 'Define overall theme and motto for the wedding', true, 14, 13, 18, 1, 1),
  ('STY_02_18M', 'styling_atmosphere', 'Inspiration sammeln', 'Collect inspiration', 'Pinterest-Boards und Inspirationen für Dekoration sammeln', 'Collect Pinterest boards and decoration inspiration', false, 13, 12, 18, 1, 2),
  ('STY_03_18M', 'styling_atmosphere', 'Farbschema festlegen', 'Define color scheme', 'Hauptfarben und detaillierte Farbpalette auswählen', 'Select main colors and detailed color palette', true, 12, 11, 18, 1, 3),
  ('STY_04_18M', 'styling_atmosphere', 'Dekorationsstil definieren', 'Define decoration style', 'Umfassende Entscheidung für Dekorationsstil', 'Comprehensive decision on decoration style', true, 12, 11, 18, 1, 4),
  ('STY_05_18M', 'styling_atmosphere', 'Florist recherchieren', 'Research florists', 'Verschiedene Floristen vergleichen und bewerten', 'Compare and evaluate different florists', true, 10, 9, 18, 2, 1),
  ('STY_06_18M', 'styling_atmosphere', 'Blumendekoration planen', 'Plan floral decorations', 'Umfassendes Blumenkonzept für alle Bereiche', 'Comprehensive flower concept for all areas', true, 7, 6, 18, 2, 2),
  ('STY_07_18M', 'styling_atmosphere', 'Tischdekoration entwickeln', 'Develop table decorations', 'Kreatives und detailliertes Tischdekorationskonzept', 'Creative and detailed table decoration concept', true, 6, 5, 18, 2, 3),
  ('STY_08_18M', 'styling_atmosphere', 'Zeremonie-Dekoration planen', 'Plan ceremony decorations', 'Ausführliche Planung der Zeremonie-Dekoration', 'Comprehensive planning of ceremony decorations', true, 5, 4, 18, 2, 4),
  ('STY_09_18M', 'styling_atmosphere', 'Beleuchtungskonzept', 'Lighting concept', 'Professionelles Lichtkonzept entwickeln', 'Develop professional lighting concept', false, 4, 3, 18, 2, 5),
  ('STY_10_18M', 'styling_atmosphere', 'DIY-Dekoration planen', 'Plan DIY decorations', 'Selbstgemachte Dekoelemente planen und vorbereiten', 'Plan and prepare handmade decoration elements', false, 3, 2, 18, 2, 6),
  ('STY_11_18M', 'styling_atmosphere', 'Deko-Material bestellen', 'Order decoration materials', 'Alle Dekomaterialien rechtzeitig bestellen', 'Order all decoration materials in time', false, 1.5, 1, 18, 3, 1),
  ('STY_12_18M', 'styling_atmosphere', 'Finale Deko-Abstimmung', 'Final decoration coordination', 'Letzte Abstimmung aller Dekorationselemente', 'Final coordination of all decoration elements', false, 0.5, 0.2, 18, 3, 2);

-- 24 months planning duration - Dekoration tasks
INSERT INTO task_templates (id, category, title_de, title_en, description_de, description_en, is_critical, recommended_offset_months, latest_completion_months, planning_duration_months, phase, order_in_phase)
VALUES 
  ('STY_01_24M', 'styling_atmosphere', 'Vision Board erstellen', 'Create vision board', 'Visuelle Sammlung von Ideen und Inspirationen', 'Visual collection of ideas and inspiration', false, 20, 19, 24, 1, 1),
  ('STY_02_24M', 'styling_atmosphere', 'Hochzeitsthema entwickeln', 'Develop wedding theme', 'Gesamtthema und Konzept ausarbeiten', 'Develop overall theme and concept', true, 18, 17, 24, 1, 2),
  ('STY_03_24M', 'styling_atmosphere', 'Farbschema festlegen', 'Define color scheme', 'Hauptfarben und umfassende Farbpalette', 'Main colors and comprehensive color palette', true, 16, 15, 24, 1, 3),
  ('STY_04_24M', 'styling_atmosphere', 'Dekorationsstil definieren', 'Define decoration style', 'Detaillierte Stilrichtung festlegen', 'Define detailed style direction', true, 15, 14, 24, 1, 4),
  ('STY_05_24M', 'styling_atmosphere', 'Florist recherchieren', 'Research florists', 'Umfassende Florist-Recherche und Vergleich', 'Comprehensive florist research and comparison', true, 12, 11, 24, 2, 1),
  ('STY_06_24M', 'styling_atmosphere', 'Florist beauftragen', 'Book florist', 'Finalen Floristen auswählen und beauftragen', 'Select and book final florist', true, 10, 9, 24, 2, 2),
  ('STY_07_24M', 'styling_atmosphere', 'Blumendekoration planen', 'Plan floral decorations', 'Detailliertes Blumenkonzept entwickeln', 'Develop detailed flower concept', true, 8, 7, 24, 2, 3),
  ('STY_08_24M', 'styling_atmosphere', 'Tischdekoration entwickeln', 'Develop table decorations', 'Umfassendes Tischdekorationskonzept', 'Comprehensive table decoration concept', true, 7, 6, 24, 2, 4),
  ('STY_09_24M', 'styling_atmosphere', 'Zeremonie-Dekoration planen', 'Plan ceremony decorations', 'Detaillierte Zeremonie-Dekorationsplanung', 'Detailed ceremony decoration planning', true, 6, 5, 24, 2, 5),
  ('STY_10_24M', 'styling_atmosphere', 'Beleuchtungskonzept', 'Lighting concept', 'Professionelles und atmosphärisches Lichtkonzept', 'Professional and atmospheric lighting concept', false, 5, 4, 24, 2, 6),
  ('STY_11_24M', 'styling_atmosphere', 'DIY-Dekoration planen', 'Plan DIY decorations', 'Selbstgemachte Dekoelemente im Detail planen', 'Plan handmade decoration elements in detail', false, 4, 3, 24, 2, 7),
  ('STY_12_24M', 'styling_atmosphere', 'Deko-Probeaufbau', 'Decoration trial setup', 'Testaufbau wichtiger Dekorationselemente', 'Trial setup of important decoration elements', false, 2, 1.5, 24, 3, 1),
  ('STY_13_24M', 'styling_atmosphere', 'Deko-Material bestellen', 'Order decoration materials', 'Alle Materialien rechtzeitig bestellen', 'Order all materials in time', false, 1.5, 1, 24, 3, 2),
  ('STY_14_24M', 'styling_atmosphere', 'Finale Deko-Abstimmung', 'Final decoration coordination', 'Umfassende finale Abstimmung', 'Comprehensive final coordination', false, 0.5, 0.2, 24, 3, 3);

-- 30 months planning duration - Dekoration tasks
INSERT INTO task_templates (id, category, title_de, title_en, description_de, description_en, is_critical, recommended_offset_months, latest_completion_months, planning_duration_months, phase, order_in_phase)
VALUES 
  ('STY_01_30M', 'styling_atmosphere', 'Vision Board erstellen', 'Create vision board', 'Umfassende visuelle Inspiration sammeln', 'Collect comprehensive visual inspiration', false, 26, 25, 30, 1, 1),
  ('STY_02_30M', 'styling_atmosphere', 'Hochzeitsthema entwickeln', 'Develop wedding theme', 'Gesamtthema und detailliertes Konzept', 'Overall theme and detailed concept', true, 22, 21, 30, 1, 2),
  ('STY_03_30M', 'styling_atmosphere', 'Farbschema festlegen', 'Define color scheme', 'Hauptfarben und vollständige Farbpalette', 'Main colors and complete color palette', true, 20, 19, 30, 1, 3),
  ('STY_04_30M', 'styling_atmosphere', 'Dekorationsstil definieren', 'Define decoration style', 'Umfassende Stilrichtung mit Details', 'Comprehensive style direction with details', true, 18, 17, 30, 1, 4),
  ('STY_05_30M', 'styling_atmosphere', 'Trend-Recherche', 'Trend research', 'Aktuelle Hochzeitstrends recherchieren', 'Research current wedding trends', false, 16, 15, 30, 1, 5),
  ('STY_06_30M', 'styling_atmosphere', 'Florist recherchieren', 'Research florists', 'Ausführliche Florist-Recherche', 'Extensive florist research', true, 14, 13, 30, 2, 1),
  ('STY_07_30M', 'styling_atmosphere', 'Florist beauftragen', 'Book florist', 'Floristen auswählen und beauftragen', 'Select and book florist', true, 12, 11, 30, 2, 2),
  ('STY_08_30M', 'styling_atmosphere', 'Blumendekoration planen', 'Plan floral decorations', 'Umfassendes Blumenkonzept entwickeln', 'Develop comprehensive flower concept', true, 10, 9, 30, 2, 3),
  ('STY_09_30M', 'styling_atmosphere', 'Tischdekoration entwickeln', 'Develop table decorations', 'Detailliertes Tischdekorationskonzept', 'Detailed table decoration concept', true, 8, 7, 30, 2, 4),
  ('STY_10_30M', 'styling_atmosphere', 'Zeremonie-Dekoration planen', 'Plan ceremony decorations', 'Ausführliche Zeremonie-Dekoration', 'Comprehensive ceremony decoration', true, 7, 6, 30, 2, 5),
  ('STY_11_30M', 'styling_atmosphere', 'Empfangsbereich gestalten', 'Design reception area', 'Konzept für Empfangsbereich-Dekoration', 'Concept for reception area decoration', false, 6, 5, 30, 2, 6),
  ('STY_12_30M', 'styling_atmosphere', 'Beleuchtungskonzept', 'Lighting concept', 'Umfassendes professionelles Lichtkonzept', 'Comprehensive professional lighting concept', false, 5, 4, 30, 2, 7),
  ('STY_13_30M', 'styling_atmosphere', 'DIY-Dekoration planen', 'Plan DIY decorations', 'Detaillierte Planung selbstgemachter Elemente', 'Detailed planning of handmade elements', false, 5, 4, 30, 2, 8),
  ('STY_14_30M', 'styling_atmosphere', 'Sitzplan-Dekoration', 'Seating chart decoration', 'Kreative Gestaltung des Sitzplans', 'Creative design of seating chart', false, 3, 2, 30, 3, 1),
  ('STY_15_30M', 'styling_atmosphere', 'Deko-Probeaufbau', 'Decoration trial setup', 'Ausführlicher Testaufbau', 'Comprehensive trial setup', false, 2, 1.5, 30, 3, 2),
  ('STY_16_30M', 'styling_atmosphere', 'Deko-Material bestellen', 'Order decoration materials', 'Rechtzeitige Materialbestellung', 'Timely material ordering', false, 1.5, 1, 30, 3, 3),
  ('STY_17_30M', 'styling_atmosphere', 'Finale Deko-Abstimmung', 'Final decoration coordination', 'Letzte umfassende Abstimmung', 'Final comprehensive coordination', false, 0.5, 0.2, 30, 3, 4);