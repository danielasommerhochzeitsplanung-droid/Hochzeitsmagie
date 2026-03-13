/*
  # Add Organization & Closure Task Templates

  1. Purpose
    - Add task templates for the "organization_closure" category
    - Cover helper coordination, final confirmations, emergency kit preparation, wedding day logistics, returns, invoices, and thank you notes
    - Support all 7 planning durations (30, 24, 18, 15, 12, 9, 6 months)
    - Organize tasks into 3 phases: preparation, final logistics, post-wedding

  2. Task Overview (7 unique tasks per planning duration)
    
    **Phase 1: Preparation & Coordination**
    - Coordinate helpers and responsibilities (Helfer und Zuständigkeiten abstimmen)
    - Confirm final details with vendors (Finale Bestätigungen einholen)
    
    **Phase 2: Final Logistics**
    - Prepare emergency and organization kit (Notfall und Organisationsunterlagen vorbereiten)
    - Secure wedding day logistics (Hochzeitstag organisatorisch absichern)
    
    **Phase 3: Post-Wedding**
    - Handle returns and open items (Rückgaben und offene Punkte klären)
    - Review and pay final invoices (Rechnungen prüfen und bezahlen)
    - Create memories and thank you notes (Erinnerungen und Dankeskarten gestalten)

  3. Data Structure
    - All tasks are marked as non-critical (is_critical = false)
    - Offset values are precisely calibrated per planning duration
    - Tasks include bilingual support (German/English)
    - Sub-area is set to NULL for this category
    - IDs follow pattern: organization_closure_{duration}_{phase}_{order}

  4. Security
    - No RLS changes needed (task_templates table already configured)
*/

-- Insert organization_closure tasks for 30-month planning duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  ('organization_closure_30_1_1', 'organization_closure', NULL, 30, 1, 1, 'Helfer und Zuständigkeiten abstimmen', 'Coordinate helpers and responsibilities', 'Aufgaben und Verantwortlichkeiten für Helfer und Trauzeugen festlegen', 'Define roles and responsibilities for helpers and witnesses', 6, 4, false),
  ('organization_closure_30_1_2', 'organization_closure', NULL, 30, 1, 2, 'Finale Bestätigungen einholen', 'Confirm final details with vendors', 'Letzte Bestätigungen bei allen Dienstleistern einholen', 'Confirm final details with all vendors', 4, 3, false),
  ('organization_closure_30_2_1', 'organization_closure', NULL, 30, 2, 1, 'Notfall und Organisationsunterlagen vorbereiten', 'Prepare emergency and organization kit', 'Wichtige Dokumente Kontakte und Materialien für den Hochzeitstag zusammenstellen', 'Prepare important documents contacts and materials for the wedding day', 3, 2, false),
  ('organization_closure_30_2_2', 'organization_closure', NULL, 30, 2, 2, 'Hochzeitstag organisatorisch absichern', 'Secure wedding day logistics', 'Abläufe Zuständigkeiten und organisatorische Punkte final klären', 'Finalize logistics responsibilities and organization', 2, 1, false),
  ('organization_closure_30_3_1', 'organization_closure', NULL, 30, 3, 1, 'Rückgaben und offene Punkte klären', 'Handle returns and open items', 'Geliehene Gegenstände Rückgaben und offene organisatorische Punkte erledigen', 'Return borrowed items and resolve remaining organizational items', 0.5, -0.5, false),
  ('organization_closure_30_3_2', 'organization_closure', NULL, 30, 3, 2, 'Rechnungen prüfen und bezahlen', 'Review and pay final invoices', 'Alle finalen Rechnungen prüfen und begleichen', 'Review and settle final invoices', 0.5, -1, false),
  ('organization_closure_30_3_3', 'organization_closure', NULL, 30, 3, 3, 'Erinnerungen und Dankeskarten gestalten', 'Create memories and thank you notes', 'Fotobuch Erinnerungen oder Dankeskarten vorbereiten und versenden', 'Create photo books memories or thank you cards', 0.5, -2, false);

-- Insert organization_closure tasks for 24-month planning duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  ('organization_closure_24_1_1', 'organization_closure', NULL, 24, 1, 1, 'Helfer und Zuständigkeiten abstimmen', 'Coordinate helpers and responsibilities', 'Aufgaben und Verantwortlichkeiten für Helfer und Trauzeugen festlegen', 'Define roles and responsibilities for helpers and witnesses', 6, 4, false),
  ('organization_closure_24_1_2', 'organization_closure', NULL, 24, 1, 2, 'Finale Bestätigungen einholen', 'Confirm final details with vendors', 'Letzte Bestätigungen bei allen Dienstleistern einholen', 'Confirm final details with all vendors', 4, 3, false),
  ('organization_closure_24_2_1', 'organization_closure', NULL, 24, 2, 1, 'Notfall und Organisationsunterlagen vorbereiten', 'Prepare emergency and organization kit', 'Wichtige Dokumente Kontakte und Materialien für den Hochzeitstag zusammenstellen', 'Prepare important documents contacts and materials for the wedding day', 3, 2, false),
  ('organization_closure_24_2_2', 'organization_closure', NULL, 24, 2, 2, 'Hochzeitstag organisatorisch absichern', 'Secure wedding day logistics', 'Abläufe Zuständigkeiten und organisatorische Punkte final klären', 'Finalize logistics responsibilities and organization', 2, 1, false),
  ('organization_closure_24_3_1', 'organization_closure', NULL, 24, 3, 1, 'Rückgaben und offene Punkte klären', 'Handle returns and open items', 'Geliehene Gegenstände Rückgaben und offene organisatorische Punkte erledigen', 'Return borrowed items and resolve remaining organizational items', 0.5, -0.5, false),
  ('organization_closure_24_3_2', 'organization_closure', NULL, 24, 3, 2, 'Rechnungen prüfen und bezahlen', 'Review and pay final invoices', 'Alle finalen Rechnungen prüfen und begleichen', 'Review and settle final invoices', 0.5, -1, false),
  ('organization_closure_24_3_3', 'organization_closure', NULL, 24, 3, 3, 'Erinnerungen und Dankeskarten gestalten', 'Create memories and thank you notes', 'Fotobuch Erinnerungen oder Dankeskarten vorbereiten und versenden', 'Create photo books memories or thank you cards', 0.5, -2, false);

-- Insert organization_closure tasks for 18-month planning duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  ('organization_closure_18_1_1', 'organization_closure', NULL, 18, 1, 1, 'Helfer und Zuständigkeiten abstimmen', 'Coordinate helpers and responsibilities', 'Aufgaben und Verantwortlichkeiten für Helfer und Trauzeugen festlegen', 'Define roles and responsibilities for helpers and witnesses', 5, 4, false),
  ('organization_closure_18_1_2', 'organization_closure', NULL, 18, 1, 2, 'Finale Bestätigungen einholen', 'Confirm final details with vendors', 'Letzte Bestätigungen bei allen Dienstleistern einholen', 'Confirm final details with all vendors', 4, 3, false),
  ('organization_closure_18_2_1', 'organization_closure', NULL, 18, 2, 1, 'Notfall und Organisationsunterlagen vorbereiten', 'Prepare emergency and organization kit', 'Wichtige Dokumente Kontakte und Materialien für den Hochzeitstag zusammenstellen', 'Prepare important documents contacts and materials for the wedding day', 3, 2, false),
  ('organization_closure_18_2_2', 'organization_closure', NULL, 18, 2, 2, 'Hochzeitstag organisatorisch absichern', 'Secure wedding day logistics', 'Abläufe Zuständigkeiten und organisatorische Punkte final klären', 'Finalize logistics responsibilities and organization', 2, 1, false),
  ('organization_closure_18_3_1', 'organization_closure', NULL, 18, 3, 1, 'Rückgaben und offene Punkte klären', 'Handle returns and open items', 'Geliehene Gegenstände Rückgaben und offene organisatorische Punkte erledigen', 'Return borrowed items and resolve remaining organizational items', 0.5, -0.5, false),
  ('organization_closure_18_3_2', 'organization_closure', NULL, 18, 3, 2, 'Rechnungen prüfen und bezahlen', 'Review and pay final invoices', 'Alle finalen Rechnungen prüfen und begleichen', 'Review and settle final invoices', 0.5, -1, false),
  ('organization_closure_18_3_3', 'organization_closure', NULL, 18, 3, 3, 'Erinnerungen und Dankeskarten gestalten', 'Create memories and thank you notes', 'Fotobuch Erinnerungen oder Dankeskarten vorbereiten und versenden', 'Create photo books memories or thank you cards', 0.5, -2, false);

-- Insert organization_closure tasks for 15-month planning duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  ('organization_closure_15_1_1', 'organization_closure', NULL, 15, 1, 1, 'Helfer und Zuständigkeiten abstimmen', 'Coordinate helpers and responsibilities', 'Aufgaben und Verantwortlichkeiten für Helfer und Trauzeugen festlegen', 'Define roles and responsibilities for helpers and witnesses', 4, 3, false),
  ('organization_closure_15_1_2', 'organization_closure', NULL, 15, 1, 2, 'Finale Bestätigungen einholen', 'Confirm final details with vendors', 'Letzte Bestätigungen bei allen Dienstleistern einholen', 'Confirm final details with all vendors', 3, 2, false),
  ('organization_closure_15_2_1', 'organization_closure', NULL, 15, 2, 1, 'Notfall und Organisationsunterlagen vorbereiten', 'Prepare emergency and organization kit', 'Wichtige Dokumente Kontakte und Materialien für den Hochzeitstag zusammenstellen', 'Prepare important documents contacts and materials for the wedding day', 2, 1, false),
  ('organization_closure_15_2_2', 'organization_closure', NULL, 15, 2, 2, 'Hochzeitstag organisatorisch absichern', 'Secure wedding day logistics', 'Abläufe Zuständigkeiten und organisatorische Punkte final klären', 'Finalize logistics responsibilities and organization', 1, 0.5, false),
  ('organization_closure_15_3_1', 'organization_closure', NULL, 15, 3, 1, 'Rückgaben und offene Punkte klären', 'Handle returns and open items', 'Geliehene Gegenstände Rückgaben und offene organisatorische Punkte erledigen', 'Return borrowed items and resolve remaining organizational items', 0.5, -0.5, false),
  ('organization_closure_15_3_2', 'organization_closure', NULL, 15, 3, 2, 'Rechnungen prüfen und bezahlen', 'Review and pay final invoices', 'Alle finalen Rechnungen prüfen und begleichen', 'Review and settle final invoices', 0.5, -1, false),
  ('organization_closure_15_3_3', 'organization_closure', NULL, 15, 3, 3, 'Erinnerungen und Dankeskarten gestalten', 'Create memories and thank you notes', 'Fotobuch Erinnerungen oder Dankeskarten vorbereiten und versenden', 'Create photo books memories or thank you cards', 0.5, -2, false);

-- Insert organization_closure tasks for 12-month planning duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  ('organization_closure_12_1_1', 'organization_closure', NULL, 12, 1, 1, 'Helfer und Zuständigkeiten abstimmen', 'Coordinate helpers and responsibilities', 'Aufgaben und Verantwortlichkeiten für Helfer und Trauzeugen festlegen', 'Define roles and responsibilities for helpers and witnesses', 3, 2, false),
  ('organization_closure_12_1_2', 'organization_closure', NULL, 12, 1, 2, 'Finale Bestätigungen einholen', 'Confirm final details with vendors', 'Letzte Bestätigungen bei allen Dienstleistern einholen', 'Confirm final details with all vendors', 2, 1, false),
  ('organization_closure_12_2_1', 'organization_closure', NULL, 12, 2, 1, 'Notfall und Organisationsunterlagen vorbereiten', 'Prepare emergency and organization kit', 'Wichtige Dokumente Kontakte und Materialien für den Hochzeitstag zusammenstellen', 'Prepare important documents contacts and materials for the wedding day', 1, 0.5, false),
  ('organization_closure_12_2_2', 'organization_closure', NULL, 12, 2, 2, 'Hochzeitstag organisatorisch absichern', 'Secure wedding day logistics', 'Abläufe Zuständigkeiten und organisatorische Punkte final klären', 'Finalize logistics responsibilities and organization', 0.5, 0.5, false),
  ('organization_closure_12_3_1', 'organization_closure', NULL, 12, 3, 1, 'Rückgaben und offene Punkte klären', 'Handle returns and open items', 'Geliehene Gegenstände Rückgaben und offene organisatorische Punkte erledigen', 'Return borrowed items and resolve remaining organizational items', 0.5, -0.5, false),
  ('organization_closure_12_3_2', 'organization_closure', NULL, 12, 3, 2, 'Rechnungen prüfen und bezahlen', 'Review and pay final invoices', 'Alle finalen Rechnungen prüfen und begleichen', 'Review and settle final invoices', 0.5, -1, false),
  ('organization_closure_12_3_3', 'organization_closure', NULL, 12, 3, 3, 'Erinnerungen und Dankeskarten gestalten', 'Create memories and thank you notes', 'Fotobuch Erinnerungen oder Dankeskarten vorbereiten und versenden', 'Create photo books memories or thank you cards', 0.5, -2, false);

-- Insert organization_closure tasks for 9-month planning duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  ('organization_closure_9_1_1', 'organization_closure', NULL, 9, 1, 1, 'Helfer und Zuständigkeiten abstimmen', 'Coordinate helpers and responsibilities', 'Aufgaben und Verantwortlichkeiten für Helfer und Trauzeugen festlegen', 'Define roles and responsibilities for helpers and witnesses', 2.5, 2, false),
  ('organization_closure_9_1_2', 'organization_closure', NULL, 9, 1, 2, 'Finale Bestätigungen einholen', 'Confirm final details with vendors', 'Letzte Bestätigungen bei allen Dienstleistern einholen', 'Confirm final details with all vendors', 2, 1.5, false),
  ('organization_closure_9_2_1', 'organization_closure', NULL, 9, 2, 1, 'Notfall und Organisationsunterlagen vorbereiten', 'Prepare emergency and organization kit', 'Wichtige Dokumente Kontakte und Materialien für den Hochzeitstag zusammenstellen', 'Prepare important documents contacts and materials for the wedding day', 1.5, 1, false),
  ('organization_closure_9_2_2', 'organization_closure', NULL, 9, 2, 2, 'Hochzeitstag organisatorisch absichern', 'Secure wedding day logistics', 'Abläufe Zuständigkeiten und organisatorische Punkte final klären', 'Finalize logistics responsibilities and organization', 1, 0.5, false),
  ('organization_closure_9_3_1', 'organization_closure', NULL, 9, 3, 1, 'Rückgaben und offene Punkte klären', 'Handle returns and open items', 'Geliehene Gegenstände Rückgaben und offene organisatorische Punkte erledigen', 'Return borrowed items and resolve remaining organizational items', 0.5, -0.5, false),
  ('organization_closure_9_3_2', 'organization_closure', NULL, 9, 3, 2, 'Rechnungen prüfen und bezahlen', 'Review and pay final invoices', 'Alle finalen Rechnungen prüfen und begleichen', 'Review and settle final invoices', 0.5, -1, false),
  ('organization_closure_9_3_3', 'organization_closure', NULL, 9, 3, 3, 'Erinnerungen und Dankeskarten gestalten', 'Create memories and thank you notes', 'Fotobuch Erinnerungen oder Dankeskarten vorbereiten und versenden', 'Create photo books memories or thank you cards', 0.5, -2, false);

-- Insert organization_closure tasks for 6-month planning duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  ('organization_closure_6_1_1', 'organization_closure', NULL, 6, 1, 1, 'Helfer und Zuständigkeiten abstimmen', 'Coordinate helpers and responsibilities', 'Aufgaben und Verantwortlichkeiten für Helfer und Trauzeugen festlegen', 'Define roles and responsibilities for helpers and witnesses', 2, 1.5, false),
  ('organization_closure_6_1_2', 'organization_closure', NULL, 6, 1, 2, 'Finale Bestätigungen einholen', 'Confirm final details with vendors', 'Letzte Bestätigungen bei allen Dienstleistern einholen', 'Confirm final details with all vendors', 1.5, 1, false),
  ('organization_closure_6_2_1', 'organization_closure', NULL, 6, 2, 1, 'Notfall und Organisationsunterlagen vorbereiten', 'Prepare emergency and organization kit', 'Wichtige Dokumente Kontakte und Materialien für den Hochzeitstag zusammenstellen', 'Prepare important documents contacts and materials for the wedding day', 1, 0.5, false),
  ('organization_closure_6_2_2', 'organization_closure', NULL, 6, 2, 2, 'Hochzeitstag organisatorisch absichern', 'Secure wedding day logistics', 'Abläufe Zuständigkeiten und organisatorische Punkte final klären', 'Finalize logistics responsibilities and organization', 0.5, 0.5, false),
  ('organization_closure_6_3_1', 'organization_closure', NULL, 6, 3, 1, 'Rückgaben und offene Punkte klären', 'Handle returns and open items', 'Geliehene Gegenstände Rückgaben und offene organisatorische Punkte erledigen', 'Return borrowed items and resolve remaining organizational items', 0.5, -0.5, false),
  ('organization_closure_6_3_2', 'organization_closure', NULL, 6, 3, 2, 'Rechnungen prüfen und bezahlen', 'Review and pay final invoices', 'Alle finalen Rechnungen prüfen und begleichen', 'Review and settle final invoices', 0.5, -1, false),
  ('organization_closure_6_3_3', 'organization_closure', NULL, 6, 3, 3, 'Erinnerungen und Dankeskarten gestalten', 'Create memories and thank you notes', 'Fotobuch Erinnerungen oder Dankeskarten vorbereiten und versenden', 'Create photo books memories or thank you cards', 0.5, -2, false);
