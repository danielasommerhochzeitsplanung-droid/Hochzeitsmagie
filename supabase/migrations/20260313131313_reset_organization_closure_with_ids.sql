/*
  # Reset and Rebuild organization_closure Tasks

  1. Changes
    - Delete all existing organization_closure tasks
    - Insert 49 new tasks (7 core tasks × 7 planning durations)
    
  2. Task Structure
    - Phase 1: Tasks 1-2 (Danksagungen, Hochzeitsfilm)
    - Phase 2: Tasks 3-4 (Budget-Abrechnung, Vendor-Feedback)
    - Phase 3: Tasks 5-7 (Geschenke, Dokumente, Erinnerungen)
    - Planning durations: 30, 24, 18, 15, 12, 9, 6 months
    - sub_area: NULL for all tasks
    - ID pattern: ORG_[order]_[duration]M
    
  3. Timing Details
    - Task 1: Danksagungen (0.5 months after, latest 1 month after)
    - Task 2: Hochzeitsfilm (2 months after, latest 3 months after)
    - Task 3: Budget-Abrechnung (1 month after, latest 2 months after)
    - Task 4: Vendor-Feedback (0.7 months after, latest 1.5 months after)
    - Task 5: Geschenke (0.25 months after, latest 0.5 months after)
    - Task 6: Dokumente (1.5 months after, latest 3 months after)
    - Task 7: Erinnerungen (3 months after, latest 6 months after)
*/

-- Delete all existing organization_closure tasks
DELETE FROM task_templates WHERE category = 'organization_closure';

-- Insert 7 core tasks for each of 7 planning durations (49 total)

-- Planning duration: 30 months
INSERT INTO task_templates (id, category, sub_area, phase, order_in_phase, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, is_critical, planning_duration_months)
VALUES
  ('ORG_01_30M', 'organization_closure', NULL, 1, 1, 'Danksagungen versenden', 'Send thank you cards', 'Dankeskarten an Gäste und Dienstleister versenden', 'Send thank you cards to guests and vendors', 0.5, 1, false, 30),
  ('ORG_02_30M', 'organization_closure', NULL, 1, 2, 'Hochzeitsfilm ansehen', 'Watch wedding video', 'Gemeinsam den fertigen Hochzeitsfilm ansehen', 'Watch the finished wedding video together', 2, 3, false, 30),
  ('ORG_03_30M', 'organization_closure', NULL, 2, 3, 'Budget-Abrechnung abschließen', 'Finalize budget', 'Endgültige Ausgaben dokumentieren und Rechnungen archivieren', 'Document final expenses and archive invoices', 1, 2, false, 30),
  ('ORG_04_30M', 'organization_closure', NULL, 2, 4, 'Vendor-Feedback geben', 'Provide vendor feedback', 'Bewertungen und Feedback für Dienstleister schreiben', 'Write reviews and feedback for vendors', 0.7, 1.5, false, 30),
  ('ORG_05_30M', 'organization_closure', NULL, 3, 5, 'Geschenke registrieren', 'Register gifts', 'Liste der erhaltenen Geschenke erstellen', 'Create list of received gifts', 0.25, 0.5, false, 30),
  ('ORG_06_30M', 'organization_closure', NULL, 3, 6, 'Dokumente archivieren', 'Archive documents', 'Alle wichtigen Dokumente sicher aufbewahren', 'Store all important documents safely', 1.5, 3, false, 30),
  ('ORG_07_30M', 'organization_closure', NULL, 3, 7, 'Erinnerungen zusammenstellen', 'Compile memories', 'Fotoalbum oder Erinnerungsbox erstellen', 'Create photo album or memory box', 3, 6, false, 30);

-- Planning duration: 24 months
INSERT INTO task_templates (id, category, sub_area, phase, order_in_phase, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, is_critical, planning_duration_months)
VALUES
  ('ORG_01_24M', 'organization_closure', NULL, 1, 1, 'Danksagungen versenden', 'Send thank you cards', 'Dankeskarten an Gäste und Dienstleister versenden', 'Send thank you cards to guests and vendors', 0.5, 1, false, 24),
  ('ORG_02_24M', 'organization_closure', NULL, 1, 2, 'Hochzeitsfilm ansehen', 'Watch wedding video', 'Gemeinsam den fertigen Hochzeitsfilm ansehen', 'Watch the finished wedding video together', 2, 3, false, 24),
  ('ORG_03_24M', 'organization_closure', NULL, 2, 3, 'Budget-Abrechnung abschließen', 'Finalize budget', 'Endgültige Ausgaben dokumentieren und Rechnungen archivieren', 'Document final expenses and archive invoices', 1, 2, false, 24),
  ('ORG_04_24M', 'organization_closure', NULL, 2, 4, 'Vendor-Feedback geben', 'Provide vendor feedback', 'Bewertungen und Feedback für Dienstleister schreiben', 'Write reviews and feedback for vendors', 0.7, 1.5, false, 24),
  ('ORG_05_24M', 'organization_closure', NULL, 3, 5, 'Geschenke registrieren', 'Register gifts', 'Liste der erhaltenen Geschenke erstellen', 'Create list of received gifts', 0.25, 0.5, false, 24),
  ('ORG_06_24M', 'organization_closure', NULL, 3, 6, 'Dokumente archivieren', 'Archive documents', 'Alle wichtigen Dokumente sicher aufbewahren', 'Store all important documents safely', 1.5, 3, false, 24),
  ('ORG_07_24M', 'organization_closure', NULL, 3, 7, 'Erinnerungen zusammenstellen', 'Compile memories', 'Fotoalbum oder Erinnerungsbox erstellen', 'Create photo album or memory box', 3, 6, false, 24);

-- Planning duration: 18 months
INSERT INTO task_templates (id, category, sub_area, phase, order_in_phase, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, is_critical, planning_duration_months)
VALUES
  ('ORG_01_18M', 'organization_closure', NULL, 1, 1, 'Danksagungen versenden', 'Send thank you cards', 'Dankeskarten an Gäste und Dienstleister versenden', 'Send thank you cards to guests and vendors', 0.5, 1, false, 18),
  ('ORG_02_18M', 'organization_closure', NULL, 1, 2, 'Hochzeitsfilm ansehen', 'Watch wedding video', 'Gemeinsam den fertigen Hochzeitsfilm ansehen', 'Watch the finished wedding video together', 2, 3, false, 18),
  ('ORG_03_18M', 'organization_closure', NULL, 2, 3, 'Budget-Abrechnung abschließen', 'Finalize budget', 'Endgültige Ausgaben dokumentieren und Rechnungen archivieren', 'Document final expenses and archive invoices', 1, 2, false, 18),
  ('ORG_04_18M', 'organization_closure', NULL, 2, 4, 'Vendor-Feedback geben', 'Provide vendor feedback', 'Bewertungen und Feedback für Dienstleister schreiben', 'Write reviews and feedback for vendors', 0.7, 1.5, false, 18),
  ('ORG_05_18M', 'organization_closure', NULL, 3, 5, 'Geschenke registrieren', 'Register gifts', 'Liste der erhaltenen Geschenke erstellen', 'Create list of received gifts', 0.25, 0.5, false, 18),
  ('ORG_06_18M', 'organization_closure', NULL, 3, 6, 'Dokumente archivieren', 'Archive documents', 'Alle wichtigen Dokumente sicher aufbewahren', 'Store all important documents safely', 1.5, 3, false, 18),
  ('ORG_07_18M', 'organization_closure', NULL, 3, 7, 'Erinnerungen zusammenstellen', 'Compile memories', 'Fotoalbum oder Erinnerungsbox erstellen', 'Create photo album or memory box', 3, 6, false, 18);

-- Planning duration: 15 months
INSERT INTO task_templates (id, category, sub_area, phase, order_in_phase, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, is_critical, planning_duration_months)
VALUES
  ('ORG_01_15M', 'organization_closure', NULL, 1, 1, 'Danksagungen versenden', 'Send thank you cards', 'Dankeskarten an Gäste und Dienstleister versenden', 'Send thank you cards to guests and vendors', 0.5, 1, false, 15),
  ('ORG_02_15M', 'organization_closure', NULL, 1, 2, 'Hochzeitsfilm ansehen', 'Watch wedding video', 'Gemeinsam den fertigen Hochzeitsfilm ansehen', 'Watch the finished wedding video together', 2, 3, false, 15),
  ('ORG_03_15M', 'organization_closure', NULL, 2, 3, 'Budget-Abrechnung abschließen', 'Finalize budget', 'Endgültige Ausgaben dokumentieren und Rechnungen archivieren', 'Document final expenses and archive invoices', 1, 2, false, 15),
  ('ORG_04_15M', 'organization_closure', NULL, 2, 4, 'Vendor-Feedback geben', 'Provide vendor feedback', 'Bewertungen und Feedback für Dienstleister schreiben', 'Write reviews and feedback for vendors', 0.7, 1.5, false, 15),
  ('ORG_05_15M', 'organization_closure', NULL, 3, 5, 'Geschenke registrieren', 'Register gifts', 'Liste der erhaltenen Geschenke erstellen', 'Create list of received gifts', 0.25, 0.5, false, 15),
  ('ORG_06_15M', 'organization_closure', NULL, 3, 6, 'Dokumente archivieren', 'Archive documents', 'Alle wichtigen Dokumente sicher aufbewahren', 'Store all important documents safely', 1.5, 3, false, 15),
  ('ORG_07_15M', 'organization_closure', NULL, 3, 7, 'Erinnerungen zusammenstellen', 'Compile memories', 'Fotoalbum oder Erinnerungsbox erstellen', 'Create photo album or memory box', 3, 6, false, 15);

-- Planning duration: 12 months
INSERT INTO task_templates (id, category, sub_area, phase, order_in_phase, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, is_critical, planning_duration_months)
VALUES
  ('ORG_01_12M', 'organization_closure', NULL, 1, 1, 'Danksagungen versenden', 'Send thank you cards', 'Dankeskarten an Gäste und Dienstleister versenden', 'Send thank you cards to guests and vendors', 0.5, 1, false, 12),
  ('ORG_02_12M', 'organization_closure', NULL, 1, 2, 'Hochzeitsfilm ansehen', 'Watch wedding video', 'Gemeinsam den fertigen Hochzeitsfilm ansehen', 'Watch the finished wedding video together', 2, 3, false, 12),
  ('ORG_03_12M', 'organization_closure', NULL, 2, 3, 'Budget-Abrechnung abschließen', 'Finalize budget', 'Endgültige Ausgaben dokumentieren und Rechnungen archivieren', 'Document final expenses and archive invoices', 1, 2, false, 12),
  ('ORG_04_12M', 'organization_closure', NULL, 2, 4, 'Vendor-Feedback geben', 'Provide vendor feedback', 'Bewertungen und Feedback für Dienstleister schreiben', 'Write reviews and feedback for vendors', 0.7, 1.5, false, 12),
  ('ORG_05_12M', 'organization_closure', NULL, 3, 5, 'Geschenke registrieren', 'Register gifts', 'Liste der erhaltenen Geschenke erstellen', 'Create list of received gifts', 0.25, 0.5, false, 12),
  ('ORG_06_12M', 'organization_closure', NULL, 3, 6, 'Dokumente archivieren', 'Archive documents', 'Alle wichtigen Dokumente sicher aufbewahren', 'Store all important documents safely', 1.5, 3, false, 12),
  ('ORG_07_12M', 'organization_closure', NULL, 3, 7, 'Erinnerungen zusammenstellen', 'Compile memories', 'Fotoalbum oder Erinnerungsbox erstellen', 'Create photo album or memory box', 3, 6, false, 12);

-- Planning duration: 9 months
INSERT INTO task_templates (id, category, sub_area, phase, order_in_phase, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, is_critical, planning_duration_months)
VALUES
  ('ORG_01_9M', 'organization_closure', NULL, 1, 1, 'Danksagungen versenden', 'Send thank you cards', 'Dankeskarten an Gäste und Dienstleister versenden', 'Send thank you cards to guests and vendors', 0.5, 1, false, 9),
  ('ORG_02_9M', 'organization_closure', NULL, 1, 2, 'Hochzeitsfilm ansehen', 'Watch wedding video', 'Gemeinsam den fertigen Hochzeitsfilm ansehen', 'Watch the finished wedding video together', 2, 3, false, 9),
  ('ORG_03_9M', 'organization_closure', NULL, 2, 3, 'Budget-Abrechnung abschließen', 'Finalize budget', 'Endgültige Ausgaben dokumentieren und Rechnungen archivieren', 'Document final expenses and archive invoices', 1, 2, false, 9),
  ('ORG_04_9M', 'organization_closure', NULL, 2, 4, 'Vendor-Feedback geben', 'Provide vendor feedback', 'Bewertungen und Feedback für Dienstleister schreiben', 'Write reviews and feedback for vendors', 0.7, 1.5, false, 9),
  ('ORG_05_9M', 'organization_closure', NULL, 3, 5, 'Geschenke registrieren', 'Register gifts', 'Liste der erhaltenen Geschenke erstellen', 'Create list of received gifts', 0.25, 0.5, false, 9),
  ('ORG_06_9M', 'organization_closure', NULL, 3, 6, 'Dokumente archivieren', 'Archive documents', 'Alle wichtigen Dokumente sicher aufbewahren', 'Store all important documents safely', 1.5, 3, false, 9),
  ('ORG_07_9M', 'organization_closure', NULL, 3, 7, 'Erinnerungen zusammenstellen', 'Compile memories', 'Fotoalbum oder Erinnerungsbox erstellen', 'Create photo album or memory box', 3, 6, false, 9);

-- Planning duration: 6 months
INSERT INTO task_templates (id, category, sub_area, phase, order_in_phase, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, is_critical, planning_duration_months)
VALUES
  ('ORG_01_6M', 'organization_closure', NULL, 1, 1, 'Danksagungen versenden', 'Send thank you cards', 'Dankeskarten an Gäste und Dienstleister versenden', 'Send thank you cards to guests and vendors', 0.5, 1, false, 6),
  ('ORG_02_6M', 'organization_closure', NULL, 1, 2, 'Hochzeitsfilm ansehen', 'Watch wedding video', 'Gemeinsam den fertigen Hochzeitsfilm ansehen', 'Watch the finished wedding video together', 2, 3, false, 6),
  ('ORG_03_6M', 'organization_closure', NULL, 2, 3, 'Budget-Abrechnung abschließen', 'Finalize budget', 'Endgültige Ausgaben dokumentieren und Rechnungen archivieren', 'Document final expenses and archive invoices', 1, 2, false, 6),
  ('ORG_04_6M', 'organization_closure', NULL, 2, 4, 'Vendor-Feedback geben', 'Provide vendor feedback', 'Bewertungen und Feedback für Dienstleister schreiben', 'Write reviews and feedback for vendors', 0.7, 1.5, false, 6),
  ('ORG_05_6M', 'organization_closure', NULL, 3, 5, 'Geschenke registrieren', 'Register gifts', 'Liste der erhaltenen Geschenke erstellen', 'Create list of received gifts', 0.25, 0.5, false, 6),
  ('ORG_06_6M', 'organization_closure', NULL, 3, 6, 'Dokumente archivieren', 'Archive documents', 'Alle wichtigen Dokumente sicher aufbewahren', 'Store all important documents safely', 1.5, 3, false, 6),
  ('ORG_07_6M', 'organization_closure', NULL, 3, 7, 'Erinnerungen zusammenstellen', 'Compile memories', 'Fotoalbum oder Erinnerungsbox erstellen', 'Create photo album or memory box', 3, 6, false, 6);