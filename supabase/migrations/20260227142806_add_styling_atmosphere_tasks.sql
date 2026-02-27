/*
  # Gestaltung & Atmosphäre - Tasks

  Fügt Tasks für die Kategorie "styling_atmosphere" hinzu
  für 7 verschiedene Planungsdauern (6, 9, 12, 15, 18, 24, 30 Monate).

  ## Tasks (12 gesamt):
  
  **Phase 1 - Konzeption:**
  1. Farbkonzept festlegen / Define Color Concept
  2. Dekorationsstil bestimmen / Determine Decoration Style
  3. Tischdeko-Konzept entwickeln / Develop Table Decoration Concept
  
  **Phase 2 - Planung:**
  4. Florist beauftragen / Commission Florist
  5. Brautstrauß designen / Design Bridal Bouquet
  6. Raum-/Kirchendekoration planen / Plan Venue/Church Decoration
  7. Beleuchtungskonzept erstellen / Create Lighting Concept
  8. Gastgeschenke auswählen / Select Guest Favors
  
  **Phase 3 - Umsetzung:**
  9. Deko-Material besorgen/bestellen / Procure/Order Decoration Materials
  10. Probeaufbau Tischdeko / Trial Setup Table Decoration
  11. Deko-Abbauplan erstellen / Create Decoration Dismantling Plan
  12. Finale Abstimmung mit Florist / Final Coordination with Florist

  ## Planungsdauern und Zeiträume:
  
  - 6 Monate: Phase 1 (-6 bis -4), Phase 2 (-4 bis -1.5), Phase 3 (-1.5 bis -0.5)
  - 9 Monate: Phase 1 (-9 bis -6), Phase 2 (-6 bis -2), Phase 3 (-2 bis -0.5)
  - 12 Monate: Phase 1 (-12 bis -8), Phase 2 (-8 bis -2.5), Phase 3 (-2.5 bis -0.5)
  - 15 Monate: Phase 1 (-15 bis -10), Phase 2 (-10 bis -3), Phase 3 (-3 bis -0.5)
  - 18 Monate: Phase 1 (-18 bis -12), Phase 2 (-12 bis -3), Phase 3 (-3 bis -0.5)
  - 24 Monate: Phase 1 (-24 bis -16), Phase 2 (-16 bis -4), Phase 3 (-4 bis -0.5)
  - 30 Monate: Phase 1 (-30 bis -20), Phase 2 (-20 bis -5), Phase 3 (-5 bis -0.5)
*/

-- ============================================
-- 6 MONATE PLANUNGSZEIT
-- ============================================

INSERT INTO task_templates (
  id, category, phase, order_in_phase,
  title_de, title_en,
  description_de, description_en,
  planning_duration_months,
  recommended_offset_months,
  latest_completion_months,
  is_critical
) VALUES
-- Phase 1: Konzeption
(gen_random_uuid(), 'styling_atmosphere', 1, 1,
  'Farbkonzept festlegen', 'Define Color Concept',
  'Hauptfarben und Farbpalette für die Hochzeit bestimmen', 'Determine main colors and color palette for the wedding',
  6, -6, -4, true),

(gen_random_uuid(), 'styling_atmosphere', 1, 2,
  'Dekorationsstil bestimmen', 'Determine Decoration Style',
  'Gesamtstil der Dekoration festlegen (rustikal, elegant, modern, etc.)', 'Define overall decoration style (rustic, elegant, modern, etc.)',
  6, -5.5, -4, true),

(gen_random_uuid(), 'styling_atmosphere', 1, 3,
  'Tischdeko-Konzept entwickeln', 'Develop Table Decoration Concept',
  'Detailliertes Konzept für die Tischdekoration erstellen', 'Create detailed concept for table decoration',
  6, -5, -4, false),

-- Phase 2: Planung
(gen_random_uuid(), 'styling_atmosphere', 2, 1,
  'Florist beauftragen', 'Commission Florist',
  'Floristen auswählen und beauftragen', 'Select and commission florist',
  6, -4, -1.5, true),

(gen_random_uuid(), 'styling_atmosphere', 2, 2,
  'Brautstrauß designen', 'Design Bridal Bouquet',
  'Brautstrauß und Ansteckblumen planen', 'Plan bridal bouquet and boutonnieres',
  6, -3.5, -1.5, true),

(gen_random_uuid(), 'styling_atmosphere', 2, 3,
  'Raum-/Kirchendekoration planen', 'Plan Venue/Church Decoration',
  'Dekoration für Zeremonie- und Feierort detailliert planen', 'Plan decoration for ceremony and reception venue in detail',
  6, -3, -1.5, false),

(gen_random_uuid(), 'styling_atmosphere', 2, 4,
  'Beleuchtungskonzept erstellen', 'Create Lighting Concept',
  'Beleuchtung und Lichtakzente planen', 'Plan lighting and light accents',
  6, -2.5, -1.5, false),

(gen_random_uuid(), 'styling_atmosphere', 2, 5,
  'Gastgeschenke auswählen', 'Select Guest Favors',
  'Gastgeschenke aussuchen und bestellen', 'Choose and order guest favors',
  6, -2, -1.5, false),

-- Phase 3: Umsetzung
(gen_random_uuid(), 'styling_atmosphere', 3, 1,
  'Deko-Material besorgen/bestellen', 'Procure/Order Decoration Materials',
  'Alle benötigten Dekorationsmaterialien kaufen oder bestellen', 'Purchase or order all necessary decoration materials',
  6, -1.5, -0.5, true),

(gen_random_uuid(), 'styling_atmosphere', 3, 2,
  'Probeaufbau Tischdeko', 'Trial Setup Table Decoration',
  'Testaufbau der Tischdekoration durchführen', 'Conduct trial setup of table decoration',
  6, -1, -0.5, false),

(gen_random_uuid(), 'styling_atmosphere', 3, 3,
  'Deko-Abbauplan erstellen', 'Create Decoration Dismantling Plan',
  'Plan für Abbau und Rückgabe/Entsorgung der Dekoration erstellen', 'Create plan for dismantling and return/disposal of decoration',
  6, -1, -0.5, false),

(gen_random_uuid(), 'styling_atmosphere', 3, 4,
  'Finale Abstimmung mit Florist', 'Final Coordination with Florist',
  'Letzte Details mit dem Floristen besprechen', 'Discuss final details with florist',
  6, -0.5, -0.5, true);

-- ============================================
-- 9 MONATE PLANUNGSZEIT
-- ============================================

INSERT INTO task_templates (
  id, category, phase, order_in_phase,
  title_de, title_en,
  description_de, description_en,
  planning_duration_months,
  recommended_offset_months,
  latest_completion_months,
  is_critical
) VALUES
-- Phase 1
(gen_random_uuid(), 'styling_atmosphere', 1, 1,
  'Farbkonzept festlegen', 'Define Color Concept',
  'Hauptfarben und Farbpalette für die Hochzeit bestimmen', 'Determine main colors and color palette for the wedding',
  9, -9, -6, true),

(gen_random_uuid(), 'styling_atmosphere', 1, 2,
  'Dekorationsstil bestimmen', 'Determine Decoration Style',
  'Gesamtstil der Dekoration festlegen (rustikal, elegant, modern, etc.)', 'Define overall decoration style (rustic, elegant, modern, etc.)',
  9, -8, -6, true),

(gen_random_uuid(), 'styling_atmosphere', 1, 3,
  'Tischdeko-Konzept entwickeln', 'Develop Table Decoration Concept',
  'Detailliertes Konzept für die Tischdekoration erstellen', 'Create detailed concept for table decoration',
  9, -7, -6, false),

-- Phase 2
(gen_random_uuid(), 'styling_atmosphere', 2, 1,
  'Florist beauftragen', 'Commission Florist',
  'Floristen auswählen und beauftragen', 'Select and commission florist',
  9, -6, -2, true),

(gen_random_uuid(), 'styling_atmosphere', 2, 2,
  'Brautstrauß designen', 'Design Bridal Bouquet',
  'Brautstrauß und Ansteckblumen planen', 'Plan bridal bouquet and boutonnieres',
  9, -5, -2, true),

(gen_random_uuid(), 'styling_atmosphere', 2, 3,
  'Raum-/Kirchendekoration planen', 'Plan Venue/Church Decoration',
  'Dekoration für Zeremonie- und Feierort detailliert planen', 'Plan decoration for ceremony and reception venue in detail',
  9, -4.5, -2, false),

(gen_random_uuid(), 'styling_atmosphere', 2, 4,
  'Beleuchtungskonzept erstellen', 'Create Lighting Concept',
  'Beleuchtung und Lichtakzente planen', 'Plan lighting and light accents',
  9, -4, -2, false),

(gen_random_uuid(), 'styling_atmosphere', 2, 5,
  'Gastgeschenke auswählen', 'Select Guest Favors',
  'Gastgeschenke aussuchen und bestellen', 'Choose and order guest favors',
  9, -3, -2, false),

-- Phase 3
(gen_random_uuid(), 'styling_atmosphere', 3, 1,
  'Deko-Material besorgen/bestellen', 'Procure/Order Decoration Materials',
  'Alle benötigten Dekorationsmaterialien kaufen oder bestellen', 'Purchase or order all necessary decoration materials',
  9, -2, -0.5, true),

(gen_random_uuid(), 'styling_atmosphere', 3, 2,
  'Probeaufbau Tischdeko', 'Trial Setup Table Decoration',
  'Testaufbau der Tischdekoration durchführen', 'Conduct trial setup of table decoration',
  9, -1.5, -0.5, false),

(gen_random_uuid(), 'styling_atmosphere', 3, 3,
  'Deko-Abbauplan erstellen', 'Create Decoration Dismantling Plan',
  'Plan für Abbau und Rückgabe/Entsorgung der Dekoration erstellen', 'Create plan for dismantling and return/disposal of decoration',
  9, -1, -0.5, false),

(gen_random_uuid(), 'styling_atmosphere', 3, 4,
  'Finale Abstimmung mit Florist', 'Final Coordination with Florist',
  'Letzte Details mit dem Floristen besprechen', 'Discuss final details with florist',
  9, -0.5, -0.5, true);

-- ============================================
-- 12 MONATE PLANUNGSZEIT
-- ============================================

INSERT INTO task_templates (
  id, category, phase, order_in_phase,
  title_de, title_en,
  description_de, description_en,
  planning_duration_months,
  recommended_offset_months,
  latest_completion_months,
  is_critical
) VALUES
-- Phase 1
(gen_random_uuid(), 'styling_atmosphere', 1, 1,
  'Farbkonzept festlegen', 'Define Color Concept',
  'Hauptfarben und Farbpalette für die Hochzeit bestimmen', 'Determine main colors and color palette for the wedding',
  12, -12, -8, true),

(gen_random_uuid(), 'styling_atmosphere', 1, 2,
  'Dekorationsstil bestimmen', 'Determine Decoration Style',
  'Gesamtstil der Dekoration festlegen (rustikal, elegant, modern, etc.)', 'Define overall decoration style (rustic, elegant, modern, etc.)',
  12, -11, -8, true),

(gen_random_uuid(), 'styling_atmosphere', 1, 3,
  'Tischdeko-Konzept entwickeln', 'Develop Table Decoration Concept',
  'Detailliertes Konzept für die Tischdekoration erstellen', 'Create detailed concept for table decoration',
  12, -10, -8, false),

-- Phase 2
(gen_random_uuid(), 'styling_atmosphere', 2, 1,
  'Florist beauftragen', 'Commission Florist',
  'Floristen auswählen und beauftragen', 'Select and commission florist',
  12, -8, -2.5, true),

(gen_random_uuid(), 'styling_atmosphere', 2, 2,
  'Brautstrauß designen', 'Design Bridal Bouquet',
  'Brautstrauß und Ansteckblumen planen', 'Plan bridal bouquet and boutonnieres',
  12, -7, -2.5, true),

(gen_random_uuid(), 'styling_atmosphere', 2, 3,
  'Raum-/Kirchendekoration planen', 'Plan Venue/Church Decoration',
  'Dekoration für Zeremonie- und Feierort detailliert planen', 'Plan decoration for ceremony and reception venue in detail',
  12, -6, -2.5, false),

(gen_random_uuid(), 'styling_atmosphere', 2, 4,
  'Beleuchtungskonzept erstellen', 'Create Lighting Concept',
  'Beleuchtung und Lichtakzente planen', 'Plan lighting and light accents',
  12, -5, -2.5, false),

(gen_random_uuid(), 'styling_atmosphere', 2, 5,
  'Gastgeschenke auswählen', 'Select Guest Favors',
  'Gastgeschenke aussuchen und bestellen', 'Choose and order guest favors',
  12, -4, -2.5, false),

-- Phase 3
(gen_random_uuid(), 'styling_atmosphere', 3, 1,
  'Deko-Material besorgen/bestellen', 'Procure/Order Decoration Materials',
  'Alle benötigten Dekorationsmaterialien kaufen oder bestellen', 'Purchase or order all necessary decoration materials',
  12, -2.5, -0.5, true),

(gen_random_uuid(), 'styling_atmosphere', 3, 2,
  'Probeaufbau Tischdeko', 'Trial Setup Table Decoration',
  'Testaufbau der Tischdekoration durchführen', 'Conduct trial setup of table decoration',
  12, -2, -0.5, false),

(gen_random_uuid(), 'styling_atmosphere', 3, 3,
  'Deko-Abbauplan erstellen', 'Create Decoration Dismantling Plan',
  'Plan für Abbau und Rückgabe/Entsorgung der Dekoration erstellen', 'Create plan for dismantling and return/disposal of decoration',
  12, -1.5, -0.5, false),

(gen_random_uuid(), 'styling_atmosphere', 3, 4,
  'Finale Abstimmung mit Florist', 'Final Coordination with Florist',
  'Letzte Details mit dem Floristen besprechen', 'Discuss final details with florist',
  12, -0.5, -0.5, true);

-- ============================================
-- 15 MONATE PLANUNGSZEIT
-- ============================================

INSERT INTO task_templates (
  id, category, phase, order_in_phase,
  title_de, title_en,
  description_de, description_en,
  planning_duration_months,
  recommended_offset_months,
  latest_completion_months,
  is_critical
) VALUES
-- Phase 1
(gen_random_uuid(), 'styling_atmosphere', 1, 1,
  'Farbkonzept festlegen', 'Define Color Concept',
  'Hauptfarben und Farbpalette für die Hochzeit bestimmen', 'Determine main colors and color palette for the wedding',
  15, -15, -10, true),

(gen_random_uuid(), 'styling_atmosphere', 1, 2,
  'Dekorationsstil bestimmen', 'Determine Decoration Style',
  'Gesamtstil der Dekoration festlegen (rustikal, elegant, modern, etc.)', 'Define overall decoration style (rustic, elegant, modern, etc.)',
  15, -14, -10, true),

(gen_random_uuid(), 'styling_atmosphere', 1, 3,
  'Tischdeko-Konzept entwickeln', 'Develop Table Decoration Concept',
  'Detailliertes Konzept für die Tischdekoration erstellen', 'Create detailed concept for table decoration',
  15, -12, -10, false),

-- Phase 2
(gen_random_uuid(), 'styling_atmosphere', 2, 1,
  'Florist beauftragen', 'Commission Florist',
  'Floristen auswählen und beauftragen', 'Select and commission florist',
  15, -10, -3, true),

(gen_random_uuid(), 'styling_atmosphere', 2, 2,
  'Brautstrauß designen', 'Design Bridal Bouquet',
  'Brautstrauß und Ansteckblumen planen', 'Plan bridal bouquet and boutonnieres',
  15, -9, -3, true),

(gen_random_uuid(), 'styling_atmosphere', 2, 3,
  'Raum-/Kirchendekoration planen', 'Plan Venue/Church Decoration',
  'Dekoration für Zeremonie- und Feierort detailliert planen', 'Plan decoration for ceremony and reception venue in detail',
  15, -8, -3, false),

(gen_random_uuid(), 'styling_atmosphere', 2, 4,
  'Beleuchtungskonzept erstellen', 'Create Lighting Concept',
  'Beleuchtung und Lichtakzente planen', 'Plan lighting and light accents',
  15, -7, -3, false),

(gen_random_uuid(), 'styling_atmosphere', 2, 5,
  'Gastgeschenke auswählen', 'Select Guest Favors',
  'Gastgeschenke aussuchen und bestellen', 'Choose and order guest favors',
  15, -6, -3, false),

-- Phase 3
(gen_random_uuid(), 'styling_atmosphere', 3, 1,
  'Deko-Material besorgen/bestellen', 'Procure/Order Decoration Materials',
  'Alle benötigten Dekorationsmaterialien kaufen oder bestellen', 'Purchase or order all necessary decoration materials',
  15, -3, -0.5, true),

(gen_random_uuid(), 'styling_atmosphere', 3, 2,
  'Probeaufbau Tischdeko', 'Trial Setup Table Decoration',
  'Testaufbau der Tischdekoration durchführen', 'Conduct trial setup of table decoration',
  15, -2.5, -0.5, false),

(gen_random_uuid(), 'styling_atmosphere', 3, 3,
  'Deko-Abbauplan erstellen', 'Create Decoration Dismantling Plan',
  'Plan für Abbau und Rückgabe/Entsorgung der Dekoration erstellen', 'Create plan for dismantling and return/disposal of decoration',
  15, -2, -0.5, false),

(gen_random_uuid(), 'styling_atmosphere', 3, 4,
  'Finale Abstimmung mit Florist', 'Final Coordination with Florist',
  'Letzte Details mit dem Floristen besprechen', 'Discuss final details with florist',
  15, -0.5, -0.5, true);

-- ============================================
-- 18 MONATE PLANUNGSZEIT
-- ============================================

INSERT INTO task_templates (
  id, category, phase, order_in_phase,
  title_de, title_en,
  description_de, description_en,
  planning_duration_months,
  recommended_offset_months,
  latest_completion_months,
  is_critical
) VALUES
-- Phase 1
(gen_random_uuid(), 'styling_atmosphere', 1, 1,
  'Farbkonzept festlegen', 'Define Color Concept',
  'Hauptfarben und Farbpalette für die Hochzeit bestimmen', 'Determine main colors and color palette for the wedding',
  18, -18, -12, true),

(gen_random_uuid(), 'styling_atmosphere', 1, 2,
  'Dekorationsstil bestimmen', 'Determine Decoration Style',
  'Gesamtstil der Dekoration festlegen (rustikal, elegant, modern, etc.)', 'Define overall decoration style (rustic, elegant, modern, etc.)',
  18, -17, -12, true),

(gen_random_uuid(), 'styling_atmosphere', 1, 3,
  'Tischdeko-Konzept entwickeln', 'Develop Table Decoration Concept',
  'Detailliertes Konzept für die Tischdekoration erstellen', 'Create detailed concept for table decoration',
  18, -15, -12, false),

-- Phase 2
(gen_random_uuid(), 'styling_atmosphere', 2, 1,
  'Florist beauftragen', 'Commission Florist',
  'Floristen auswählen und beauftragen', 'Select and commission florist',
  18, -12, -3, true),

(gen_random_uuid(), 'styling_atmosphere', 2, 2,
  'Brautstrauß designen', 'Design Bridal Bouquet',
  'Brautstrauß und Ansteckblumen planen', 'Plan bridal bouquet and boutonnieres',
  18, -11, -3, true),

(gen_random_uuid(), 'styling_atmosphere', 2, 3,
  'Raum-/Kirchendekoration planen', 'Plan Venue/Church Decoration',
  'Dekoration für Zeremonie- und Feierort detailliert planen', 'Plan decoration for ceremony and reception venue in detail',
  18, -10, -3, false),

(gen_random_uuid(), 'styling_atmosphere', 2, 4,
  'Beleuchtungskonzept erstellen', 'Create Lighting Concept',
  'Beleuchtung und Lichtakzente planen', 'Plan lighting and light accents',
  18, -9, -3, false),

(gen_random_uuid(), 'styling_atmosphere', 2, 5,
  'Gastgeschenke auswählen', 'Select Guest Favors',
  'Gastgeschenke aussuchen und bestellen', 'Choose and order guest favors',
  18, -8, -3, false),

-- Phase 3
(gen_random_uuid(), 'styling_atmosphere', 3, 1,
  'Deko-Material besorgen/bestellen', 'Procure/Order Decoration Materials',
  'Alle benötigten Dekorationsmaterialien kaufen oder bestellen', 'Purchase or order all necessary decoration materials',
  18, -3, -0.5, true),

(gen_random_uuid(), 'styling_atmosphere', 3, 2,
  'Probeaufbau Tischdeko', 'Trial Setup Table Decoration',
  'Testaufbau der Tischdekoration durchführen', 'Conduct trial setup of table decoration',
  18, -2.5, -0.5, false),

(gen_random_uuid(), 'styling_atmosphere', 3, 3,
  'Deko-Abbauplan erstellen', 'Create Decoration Dismantling Plan',
  'Plan für Abbau und Rückgabe/Entsorgung der Dekoration erstellen', 'Create plan for dismantling and return/disposal of decoration',
  18, -2, -0.5, false),

(gen_random_uuid(), 'styling_atmosphere', 3, 4,
  'Finale Abstimmung mit Florist', 'Final Coordination with Florist',
  'Letzte Details mit dem Floristen besprechen', 'Discuss final details with florist',
  18, -0.5, -0.5, true);

-- ============================================
-- 24 MONATE PLANUNGSZEIT
-- ============================================

INSERT INTO task_templates (
  id, category, phase, order_in_phase,
  title_de, title_en,
  description_de, description_en,
  planning_duration_months,
  recommended_offset_months,
  latest_completion_months,
  is_critical
) VALUES
-- Phase 1
(gen_random_uuid(), 'styling_atmosphere', 1, 1,
  'Farbkonzept festlegen', 'Define Color Concept',
  'Hauptfarben und Farbpalette für die Hochzeit bestimmen', 'Determine main colors and color palette for the wedding',
  24, -24, -16, true),

(gen_random_uuid(), 'styling_atmosphere', 1, 2,
  'Dekorationsstil bestimmen', 'Determine Decoration Style',
  'Gesamtstil der Dekoration festlegen (rustikal, elegant, modern, etc.)', 'Define overall decoration style (rustic, elegant, modern, etc.)',
  24, -23, -16, true),

(gen_random_uuid(), 'styling_atmosphere', 1, 3,
  'Tischdeko-Konzept entwickeln', 'Develop Table Decoration Concept',
  'Detailliertes Konzept für die Tischdekoration erstellen', 'Create detailed concept for table decoration',
  24, -20, -16, false),

-- Phase 2
(gen_random_uuid(), 'styling_atmosphere', 2, 1,
  'Florist beauftragen', 'Commission Florist',
  'Floristen auswählen und beauftragen', 'Select and commission florist',
  24, -16, -4, true),

(gen_random_uuid(), 'styling_atmosphere', 2, 2,
  'Brautstrauß designen', 'Design Bridal Bouquet',
  'Brautstrauß und Ansteckblumen planen', 'Plan bridal bouquet and boutonnieres',
  24, -15, -4, true),

(gen_random_uuid(), 'styling_atmosphere', 2, 3,
  'Raum-/Kirchendekoration planen', 'Plan Venue/Church Decoration',
  'Dekoration für Zeremonie- und Feierort detailliert planen', 'Plan decoration for ceremony and reception venue in detail',
  24, -14, -4, false),

(gen_random_uuid(), 'styling_atmosphere', 2, 4,
  'Beleuchtungskonzept erstellen', 'Create Lighting Concept',
  'Beleuchtung und Lichtakzente planen', 'Plan lighting and light accents',
  24, -12, -4, false),

(gen_random_uuid(), 'styling_atmosphere', 2, 5,
  'Gastgeschenke auswählen', 'Select Guest Favors',
  'Gastgeschenke aussuchen und bestellen', 'Choose and order guest favors',
  24, -10, -4, false),

-- Phase 3
(gen_random_uuid(), 'styling_atmosphere', 3, 1,
  'Deko-Material besorgen/bestellen', 'Procure/Order Decoration Materials',
  'Alle benötigten Dekorationsmaterialien kaufen oder bestellen', 'Purchase or order all necessary decoration materials',
  24, -4, -0.5, true),

(gen_random_uuid(), 'styling_atmosphere', 3, 2,
  'Probeaufbau Tischdeko', 'Trial Setup Table Decoration',
  'Testaufbau der Tischdekoration durchführen', 'Conduct trial setup of table decoration',
  24, -3, -0.5, false),

(gen_random_uuid(), 'styling_atmosphere', 3, 3,
  'Deko-Abbauplan erstellen', 'Create Decoration Dismantling Plan',
  'Plan für Abbau und Rückgabe/Entsorgung der Dekoration erstellen', 'Create plan for dismantling and return/disposal of decoration',
  24, -2, -0.5, false),

(gen_random_uuid(), 'styling_atmosphere', 3, 4,
  'Finale Abstimmung mit Florist', 'Final Coordination with Florist',
  'Letzte Details mit dem Floristen besprechen', 'Discuss final details with florist',
  24, -0.5, -0.5, true);

-- ============================================
-- 30 MONATE PLANUNGSZEIT
-- ============================================

INSERT INTO task_templates (
  id, category, phase, order_in_phase,
  title_de, title_en,
  description_de, description_en,
  planning_duration_months,
  recommended_offset_months,
  latest_completion_months,
  is_critical
) VALUES
-- Phase 1
(gen_random_uuid(), 'styling_atmosphere', 1, 1,
  'Farbkonzept festlegen', 'Define Color Concept',
  'Hauptfarben und Farbpalette für die Hochzeit bestimmen', 'Determine main colors and color palette for the wedding',
  30, -30, -20, true),

(gen_random_uuid(), 'styling_atmosphere', 1, 2,
  'Dekorationsstil bestimmen', 'Determine Decoration Style',
  'Gesamtstil der Dekoration festlegen (rustikal, elegant, modern, etc.)', 'Define overall decoration style (rustic, elegant, modern, etc.)',
  30, -29, -20, true),

(gen_random_uuid(), 'styling_atmosphere', 1, 3,
  'Tischdeko-Konzept entwickeln', 'Develop Table Decoration Concept',
  'Detailliertes Konzept für die Tischdekoration erstellen', 'Create detailed concept for table decoration',
  30, -25, -20, false),

-- Phase 2
(gen_random_uuid(), 'styling_atmosphere', 2, 1,
  'Florist beauftragen', 'Commission Florist',
  'Floristen auswählen und beauftragen', 'Select and commission florist',
  30, -20, -5, true),

(gen_random_uuid(), 'styling_atmosphere', 2, 2,
  'Brautstrauß designen', 'Design Bridal Bouquet',
  'Brautstrauß und Ansteckblumen planen', 'Plan bridal bouquet and boutonnieres',
  30, -18, -5, true),

(gen_random_uuid(), 'styling_atmosphere', 2, 3,
  'Raum-/Kirchendekoration planen', 'Plan Venue/Church Decoration',
  'Dekoration für Zeremonie- und Feierort detailliert planen', 'Plan decoration for ceremony and reception venue in detail',
  30, -16, -5, false),

(gen_random_uuid(), 'styling_atmosphere', 2, 4,
  'Beleuchtungskonzept erstellen', 'Create Lighting Concept',
  'Beleuchtung und Lichtakzente planen', 'Plan lighting and light accents',
  30, -14, -5, false),

(gen_random_uuid(), 'styling_atmosphere', 2, 5,
  'Gastgeschenke auswählen', 'Select Guest Favors',
  'Gastgeschenke aussuchen und bestellen', 'Choose and order guest favors',
  30, -12, -5, false),

-- Phase 3
(gen_random_uuid(), 'styling_atmosphere', 3, 1,
  'Deko-Material besorgen/bestellen', 'Procure/Order Decoration Materials',
  'Alle benötigten Dekorationsmaterialien kaufen oder bestellen', 'Purchase or order all necessary decoration materials',
  30, -5, -0.5, true),

(gen_random_uuid(), 'styling_atmosphere', 3, 2,
  'Probeaufbau Tischdeko', 'Trial Setup Table Decoration',
  'Testaufbau der Tischdekoration durchführen', 'Conduct trial setup of table decoration',
  30, -4, -0.5, false),

(gen_random_uuid(), 'styling_atmosphere', 3, 3,
  'Deko-Abbauplan erstellen', 'Create Decoration Dismantling Plan',
  'Plan für Abbau und Rückgabe/Entsorgung der Dekoration erstellen', 'Create plan for dismantling and return/disposal of decoration',
  30, -3, -0.5, false),

(gen_random_uuid(), 'styling_atmosphere', 3, 4,
  'Finale Abstimmung mit Florist', 'Final Coordination with Florist',
  'Letzte Details mit dem Floristen besprechen', 'Discuss final details with florist',
  30, -0.5, -0.5, true);
