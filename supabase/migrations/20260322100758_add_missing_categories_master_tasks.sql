/*
  # Fehlende Kategorien zu Master Tasks hinzufügen

  1. Beschreibung
    - Fügt Tasks für 5 fehlende Hauptkategorien hinzu
    - Komplettiert die Master-Tasks-Datenbank

  2. Neue Kategorien
    - location_flow (ohne sub_area) - 7 Tasks
    - ceremony_formalities (ohne sub_area) - 7 Tasks
    - guests_communication (ohne sub_area) - 7 Tasks
    - styling_atmosphere (ohne sub_area) - 7 Tasks
    - organization_closure (ohne sub_area) - 7 Tasks

  3. Felder
    - id: UUID (fest definiert)
    - category: Hauptkategorie
    - sub_area: leer oder 'general'
    - sort_order: Sortierreihenfolge
    - planning_hint: start/middle/final
    - optional: false
    - i18n_key: Übersetzungsschlüssel
    - is_active: true
*/

-- location_flow (7 Tasks)
INSERT INTO master_tasks (id, category, sub_area, sort_order, planning_hint, optional, i18n_key, is_active)
VALUES
  ('50000000-0000-0000-0000-000000000001', 'location_flow', 'general', 1, 'start', false, 'master_tasks.location_flow.define_requirements', true),
  ('50000000-0000-0000-0000-000000000002', 'location_flow', 'general', 2, 'start', false, 'master_tasks.location_flow.research_locations', true),
  ('50000000-0000-0000-0000-000000000003', 'location_flow', 'general', 3, 'middle', false, 'master_tasks.location_flow.visit_locations', true),
  ('50000000-0000-0000-0000-000000000004', 'location_flow', 'general', 4, 'middle', false, 'master_tasks.location_flow.book_location', true),
  ('50000000-0000-0000-0000-000000000005', 'location_flow', 'general', 5, 'middle', false, 'master_tasks.location_flow.plan_flow', true),
  ('50000000-0000-0000-0000-000000000006', 'location_flow', 'general', 6, 'final', false, 'master_tasks.location_flow.coordinate_logistics', true),
  ('50000000-0000-0000-0000-000000000007', 'location_flow', 'general', 7, 'final', false, 'master_tasks.location_flow.final_walkthrough', true)
ON CONFLICT (i18n_key) DO NOTHING;

-- ceremony_formalities (7 Tasks)
INSERT INTO master_tasks (id, category, sub_area, sort_order, planning_hint, optional, i18n_key, is_active)
VALUES
  ('60000000-0000-0000-0000-000000000001', 'ceremony_formalities', 'general', 1, 'start', false, 'master_tasks.ceremony_formalities.clarify_legal_requirements', true),
  ('60000000-0000-0000-0000-000000000002', 'ceremony_formalities', 'general', 2, 'start', false, 'master_tasks.ceremony_formalities.gather_documents', true),
  ('60000000-0000-0000-0000-000000000003', 'ceremony_formalities', 'general', 3, 'middle', false, 'master_tasks.ceremony_formalities.book_appointment', true),
  ('60000000-0000-0000-0000-000000000004', 'ceremony_formalities', 'general', 4, 'middle', false, 'master_tasks.ceremony_formalities.select_officiant', true),
  ('60000000-0000-0000-0000-000000000005', 'ceremony_formalities', 'general', 5, 'middle', false, 'master_tasks.ceremony_formalities.plan_ceremony', true),
  ('60000000-0000-0000-0000-000000000006', 'ceremony_formalities', 'general', 6, 'final', false, 'master_tasks.ceremony_formalities.prepare_vows', true),
  ('60000000-0000-0000-0000-000000000007', 'ceremony_formalities', 'general', 7, 'final', false, 'master_tasks.ceremony_formalities.final_confirmation', true)
ON CONFLICT (i18n_key) DO NOTHING;

-- guests_communication (7 Tasks)
INSERT INTO master_tasks (id, category, sub_area, sort_order, planning_hint, optional, i18n_key, is_active)
VALUES
  ('70000000-0000-0000-0000-000000000001', 'guests_communication', 'general', 1, 'start', false, 'master_tasks.guests_communication.create_guest_list', true),
  ('70000000-0000-0000-0000-000000000002', 'guests_communication', 'general', 2, 'start', false, 'master_tasks.guests_communication.design_invitations', true),
  ('70000000-0000-0000-0000-000000000003', 'guests_communication', 'general', 3, 'middle', false, 'master_tasks.guests_communication.send_save_dates', true),
  ('70000000-0000-0000-0000-000000000004', 'guests_communication', 'general', 4, 'middle', false, 'master_tasks.guests_communication.send_invitations', true),
  ('70000000-0000-0000-0000-000000000005', 'guests_communication', 'general', 5, 'middle', false, 'master_tasks.guests_communication.track_rsvps', true),
  ('70000000-0000-0000-0000-000000000006', 'guests_communication', 'general', 6, 'final', false, 'master_tasks.guests_communication.finalize_guest_count', true),
  ('70000000-0000-0000-0000-000000000007', 'guests_communication', 'general', 7, 'final', false, 'master_tasks.guests_communication.send_final_info', true)
ON CONFLICT (i18n_key) DO NOTHING;

-- styling_atmosphere (7 Tasks)
INSERT INTO master_tasks (id, category, sub_area, sort_order, planning_hint, optional, i18n_key, is_active)
VALUES
  ('80000000-0000-0000-0000-000000000001', 'styling_atmosphere', 'general', 1, 'start', false, 'master_tasks.styling_atmosphere.define_theme_colors', true),
  ('80000000-0000-0000-0000-000000000002', 'styling_atmosphere', 'general', 2, 'start', false, 'master_tasks.styling_atmosphere.create_mood_board', true),
  ('80000000-0000-0000-0000-000000000003', 'styling_atmosphere', 'general', 3, 'middle', false, 'master_tasks.styling_atmosphere.select_decorations', true),
  ('80000000-0000-0000-0000-000000000004', 'styling_atmosphere', 'general', 4, 'middle', false, 'master_tasks.styling_atmosphere.choose_flowers', true),
  ('80000000-0000-0000-0000-000000000005', 'styling_atmosphere', 'general', 5, 'middle', false, 'master_tasks.styling_atmosphere.plan_lighting', true),
  ('80000000-0000-0000-0000-000000000006', 'styling_atmosphere', 'general', 6, 'final', false, 'master_tasks.styling_atmosphere.coordinate_setup', true),
  ('80000000-0000-0000-0000-000000000007', 'styling_atmosphere', 'general', 7, 'final', false, 'master_tasks.styling_atmosphere.final_decoration_check', true)
ON CONFLICT (i18n_key) DO NOTHING;

-- organization_closure (7 Tasks)
INSERT INTO master_tasks (id, category, sub_area, sort_order, planning_hint, optional, i18n_key, is_active)
VALUES
  ('90000000-0000-0000-0000-000000000001', 'organization_closure', 'general', 1, 'start', false, 'master_tasks.organization_closure.create_master_plan', true),
  ('90000000-0000-0000-0000-000000000002', 'organization_closure', 'general', 2, 'start', false, 'master_tasks.organization_closure.assign_responsibilities', true),
  ('90000000-0000-0000-0000-000000000003', 'organization_closure', 'general', 3, 'middle', false, 'master_tasks.organization_closure.create_timeline', true),
  ('90000000-0000-0000-0000-000000000004', 'organization_closure', 'general', 4, 'middle', false, 'master_tasks.organization_closure.coordinate_vendors', true),
  ('90000000-0000-0000-0000-000000000005', 'organization_closure', 'general', 5, 'middle', false, 'master_tasks.organization_closure.prepare_emergency_plan', true),
  ('90000000-0000-0000-0000-000000000006', 'organization_closure', 'general', 6, 'final', false, 'master_tasks.organization_closure.final_checklist', true),
  ('90000000-0000-0000-0000-000000000007', 'organization_closure', 'general', 7, 'final', false, 'master_tasks.organization_closure.day_coordination', true)
ON CONFLICT (i18n_key) DO NOTHING;
