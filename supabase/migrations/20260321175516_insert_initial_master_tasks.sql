/*
  # Master Tasks Daten einfügen

  1. Beschreibung
    - Fügt 29 Master-Tasks für 4 Bereiche ein
    - Vereinfachte Struktur ohne Planungsdauer-Logik
    - Nur: category, sub_area, sort_order, planning_hint, optional, i18n_key

  2. Bereiche
    - styling_outfit / outfits_accessories (7 Tasks)
    - vendors_services / catering_drinks (7 Tasks)
    - vendors_services / transport_logistics (7 Tasks)
    - vendors_services / music_entertainment (8 Tasks)

  3. Felder
    - id: UUID (fest definiert für Stabilität)
    - category: Hauptkategorie
    - sub_area: Unterbereich
    - sort_order: Sortierreihenfolge (1-999)
    - planning_hint: Orientierung (start/middle/final/after) - keine Logik!
    - optional: Ob Task optional ist
    - i18n_key: Schlüssel für Übersetzungen
    - is_active: Ob Task aktiv ist

  4. Wichtig
    - KEINE planning_duration_months
    - KEINE recommended_offset_months
    - KEINE latest_completion_months
    - KEINE automatische Due-Date Berechnung
*/

-- styling_outfit / outfits_accessories (7 Tasks)
INSERT INTO master_tasks (id, category, sub_area, sort_order, planning_hint, optional, i18n_key, is_active)
VALUES
  ('10000000-0000-0000-0000-000000000001', 'styling_outfit', 'outfits_accessories', 1, 'start', false, 'master_tasks.outfits_accessories.collect_inspiration', true),
  ('10000000-0000-0000-0000-000000000002', 'styling_outfit', 'outfits_accessories', 2, 'start', false, 'master_tasks.outfits_accessories.define_style', true),
  ('10000000-0000-0000-0000-000000000003', 'styling_outfit', 'outfits_accessories', 3, 'middle', false, 'master_tasks.outfits_accessories.research_outfits', true),
  ('10000000-0000-0000-0000-000000000004', 'styling_outfit', 'outfits_accessories', 4, 'middle', false, 'master_tasks.outfits_accessories.try_on_select', true),
  ('10000000-0000-0000-0000-000000000005', 'styling_outfit', 'outfits_accessories', 5, 'middle', false, 'master_tasks.outfits_accessories.order_outfits', true),
  ('10000000-0000-0000-0000-000000000006', 'styling_outfit', 'outfits_accessories', 6, 'final', false, 'master_tasks.outfits_accessories.select_accessories', true),
  ('10000000-0000-0000-0000-000000000007', 'styling_outfit', 'outfits_accessories', 7, 'final', false, 'master_tasks.outfits_accessories.adjustments', true)
ON CONFLICT (i18n_key) DO NOTHING;

-- vendors_services / catering_drinks (7 Tasks)
INSERT INTO master_tasks (id, category, sub_area, sort_order, planning_hint, optional, i18n_key, is_active)
VALUES
  ('20000000-0000-0000-0000-000000000001', 'vendors_services', 'catering_drinks', 1, 'start', false, 'master_tasks.catering_drinks.culinary_concept', true),
  ('20000000-0000-0000-0000-000000000002', 'vendors_services', 'catering_drinks', 2, 'start', false, 'master_tasks.catering_drinks.drinks_concept', true),
  ('20000000-0000-0000-0000-000000000003', 'vendors_services', 'catering_drinks', 3, 'middle', false, 'master_tasks.catering_drinks.research_caterers', true),
  ('20000000-0000-0000-0000-000000000004', 'vendors_services', 'catering_drinks', 4, 'middle', false, 'master_tasks.catering_drinks.tasting_session', true),
  ('20000000-0000-0000-0000-000000000005', 'vendors_services', 'catering_drinks', 5, 'middle', false, 'master_tasks.catering_drinks.book_catering', true),
  ('20000000-0000-0000-0000-000000000006', 'vendors_services', 'catering_drinks', 6, 'final', false, 'master_tasks.catering_drinks.finalize_menu', true),
  ('20000000-0000-0000-0000-000000000007', 'vendors_services', 'catering_drinks', 7, 'final', false, 'master_tasks.catering_drinks.coordinate_service', true)
ON CONFLICT (i18n_key) DO NOTHING;

-- vendors_services / transport_logistics (7 Tasks)
INSERT INTO master_tasks (id, category, sub_area, sort_order, planning_hint, optional, i18n_key, is_active)
VALUES
  ('30000000-0000-0000-0000-000000000001', 'vendors_services', 'transport_logistics', 1, 'start', false, 'master_tasks.transport_logistics.clarify_needs', true),
  ('30000000-0000-0000-0000-000000000002', 'vendors_services', 'transport_logistics', 2, 'start', false, 'master_tasks.transport_logistics.define_transport_types', true),
  ('30000000-0000-0000-0000-000000000003', 'vendors_services', 'transport_logistics', 3, 'middle', false, 'master_tasks.transport_logistics.research_providers', true),
  ('30000000-0000-0000-0000-000000000004', 'vendors_services', 'transport_logistics', 4, 'middle', false, 'master_tasks.transport_logistics.book_transport', true),
  ('30000000-0000-0000-0000-000000000005', 'vendors_services', 'transport_logistics', 5, 'middle', false, 'master_tasks.transport_logistics.create_plan', true),
  ('30000000-0000-0000-0000-000000000006', 'vendors_services', 'transport_logistics', 6, 'final', false, 'master_tasks.transport_logistics.finalize_schedule', true),
  ('30000000-0000-0000-0000-000000000007', 'vendors_services', 'transport_logistics', 7, 'final', false, 'master_tasks.transport_logistics.confirm_details', true)
ON CONFLICT (i18n_key) DO NOTHING;

-- vendors_services / music_entertainment (8 Tasks)
INSERT INTO master_tasks (id, category, sub_area, sort_order, planning_hint, optional, i18n_key, is_active)
VALUES
  ('40000000-0000-0000-0000-000000000001', 'vendors_services', 'music_entertainment', 1, 'start', false, 'master_tasks.music_entertainment.define_areas', true),
  ('40000000-0000-0000-0000-000000000002', 'vendors_services', 'music_entertainment', 2, 'start', false, 'master_tasks.music_entertainment.define_music_style', true),
  ('40000000-0000-0000-0000-000000000003', 'vendors_services', 'music_entertainment', 3, 'start', false, 'master_tasks.music_entertainment.plan_budget', true),
  ('40000000-0000-0000-0000-000000000004', 'vendors_services', 'music_entertainment', 4, 'middle', false, 'master_tasks.music_entertainment.research_compare_providers', true),
  ('40000000-0000-0000-0000-000000000005', 'vendors_services', 'music_entertainment', 5, 'middle', false, 'master_tasks.music_entertainment.book_main_provider', true),
  ('40000000-0000-0000-0000-000000000006', 'vendors_services', 'music_entertainment', 6, 'final', false, 'master_tasks.music_entertainment.coordinate_schedule_wishes', true),
  ('40000000-0000-0000-0000-000000000007', 'vendors_services', 'music_entertainment', 7, 'final', false, 'master_tasks.music_entertainment.clarify_tech_setup', true),
  ('40000000-0000-0000-0000-000000000008', 'vendors_services', 'music_entertainment', 8, 'final', false, 'master_tasks.music_entertainment.final_confirmation', true)
ON CONFLICT (i18n_key) DO NOTHING;
