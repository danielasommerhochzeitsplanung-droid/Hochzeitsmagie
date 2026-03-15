/*
  # Add Catering & Drinks Sub-Area to Vendors & Services

  1. New Task Templates
    - Creates 49 task templates for the new sub-area `catering_drinks`
    - Category: `vendors_services`
    - Sub-Area: `catering_drinks`
    - Planning durations: 30, 24, 18, 15, 12, 9, 6 months
    
  2. Phase Structure
    - Phase 1: Concept & Preparation (Konzept & Vorbereitung)
    - Phase 2: Research & Booking (Recherche & Buchung)
    - Phase 3: Finalization & Logistics (Finalisierung & Ablauf)
    
  3. Tasks per Duration
    Each planning duration includes 7 tasks:
    - Define catering concept (Kulinarisches Konzept festlegen)
    - Define drink concept (Getränkekonzept festlegen)
    - Research caterers (Caterer recherchieren)
    - Organize tasting (Probeessen organisieren)
    - Book catering (Catering buchen)
    - Finalize menu and drinks (Menü und Getränke final abstimmen)
    - Coordinate catering logistics (Service und Ablauf koordinieren)
    
  4. Security
    - Uses existing RLS policies on task_templates table
*/

-- 30 Months Planning Duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  ('vendors_services_catering_drinks_30_1_1', 'vendors_services', 'catering_drinks', 30, 1, 1, 'Kulinarisches Konzept festlegen', 'Define catering concept', 12, 10, false),
  ('vendors_services_catering_drinks_30_1_2', 'vendors_services', 'catering_drinks', 30, 1, 2, 'Getränkekonzept festlegen', 'Define drink concept', 11, 9, false),
  ('vendors_services_catering_drinks_30_2_1', 'vendors_services', 'catering_drinks', 30, 2, 1, 'Caterer recherchieren', 'Research caterers', 9, 7, false),
  ('vendors_services_catering_drinks_30_2_2', 'vendors_services', 'catering_drinks', 30, 2, 2, 'Probeessen organisieren', 'Organize tasting', 7, 6, false),
  ('vendors_services_catering_drinks_30_2_3', 'vendors_services', 'catering_drinks', 30, 2, 3, 'Catering buchen', 'Book catering', 6, 5, false),
  ('vendors_services_catering_drinks_30_3_1', 'vendors_services', 'catering_drinks', 30, 3, 1, 'Menü und Getränke final abstimmen', 'Finalize menu and drinks', 2, 1, false),
  ('vendors_services_catering_drinks_30_3_2', 'vendors_services', 'catering_drinks', 30, 3, 2, 'Service und Ablauf koordinieren', 'Coordinate catering logistics', 1, 0.5, false)
ON CONFLICT (id) DO NOTHING;

-- 24 Months Planning Duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  ('vendors_services_catering_drinks_24_1_1', 'vendors_services', 'catering_drinks', 24, 1, 1, 'Kulinarisches Konzept festlegen', 'Define catering concept', 10, 8, false),
  ('vendors_services_catering_drinks_24_1_2', 'vendors_services', 'catering_drinks', 24, 1, 2, 'Getränkekonzept festlegen', 'Define drink concept', 9, 7, false),
  ('vendors_services_catering_drinks_24_2_1', 'vendors_services', 'catering_drinks', 24, 2, 1, 'Caterer recherchieren', 'Research caterers', 7, 5, false),
  ('vendors_services_catering_drinks_24_2_2', 'vendors_services', 'catering_drinks', 24, 2, 2, 'Probeessen organisieren', 'Organize tasting', 5, 4, false),
  ('vendors_services_catering_drinks_24_2_3', 'vendors_services', 'catering_drinks', 24, 2, 3, 'Catering buchen', 'Book catering', 4, 3, false),
  ('vendors_services_catering_drinks_24_3_1', 'vendors_services', 'catering_drinks', 24, 3, 1, 'Menü und Getränke final abstimmen', 'Finalize menu and drinks', 2, 1, false),
  ('vendors_services_catering_drinks_24_3_2', 'vendors_services', 'catering_drinks', 24, 3, 2, 'Service und Ablauf koordinieren', 'Coordinate catering logistics', 1, 0.5, false)
ON CONFLICT (id) DO NOTHING;

-- 18 Months Planning Duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  ('vendors_services_catering_drinks_18_1_1', 'vendors_services', 'catering_drinks', 18, 1, 1, 'Kulinarisches Konzept festlegen', 'Define catering concept', 8, 6, false),
  ('vendors_services_catering_drinks_18_1_2', 'vendors_services', 'catering_drinks', 18, 1, 2, 'Getränkekonzept festlegen', 'Define drink concept', 7, 5, false),
  ('vendors_services_catering_drinks_18_2_1', 'vendors_services', 'catering_drinks', 18, 2, 1, 'Caterer recherchieren', 'Research caterers', 5, 4, false),
  ('vendors_services_catering_drinks_18_2_2', 'vendors_services', 'catering_drinks', 18, 2, 2, 'Probeessen organisieren', 'Organize tasting', 4, 3, false),
  ('vendors_services_catering_drinks_18_2_3', 'vendors_services', 'catering_drinks', 18, 2, 3, 'Catering buchen', 'Book catering', 3, 2, false),
  ('vendors_services_catering_drinks_18_3_1', 'vendors_services', 'catering_drinks', 18, 3, 1, 'Menü und Getränke final abstimmen', 'Finalize menu and drinks', 2, 1, false),
  ('vendors_services_catering_drinks_18_3_2', 'vendors_services', 'catering_drinks', 18, 3, 2, 'Service und Ablauf koordinieren', 'Coordinate catering logistics', 1, 0.5, false)
ON CONFLICT (id) DO NOTHING;

-- 15 Months Planning Duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  ('vendors_services_catering_drinks_15_1_1', 'vendors_services', 'catering_drinks', 15, 1, 1, 'Kulinarisches Konzept festlegen', 'Define catering concept', 6, 5, false),
  ('vendors_services_catering_drinks_15_1_2', 'vendors_services', 'catering_drinks', 15, 1, 2, 'Getränkekonzept festlegen', 'Define drink concept', 5, 4, false),
  ('vendors_services_catering_drinks_15_2_1', 'vendors_services', 'catering_drinks', 15, 2, 1, 'Caterer recherchieren', 'Research caterers', 4, 3, false),
  ('vendors_services_catering_drinks_15_2_2', 'vendors_services', 'catering_drinks', 15, 2, 2, 'Probeessen organisieren', 'Organize tasting', 3, 2, false),
  ('vendors_services_catering_drinks_15_2_3', 'vendors_services', 'catering_drinks', 15, 2, 3, 'Catering buchen', 'Book catering', 2, 1.5, false),
  ('vendors_services_catering_drinks_15_3_1', 'vendors_services', 'catering_drinks', 15, 3, 1, 'Menü und Getränke final abstimmen', 'Finalize menu and drinks', 1, 0.5, false),
  ('vendors_services_catering_drinks_15_3_2', 'vendors_services', 'catering_drinks', 15, 3, 2, 'Service und Ablauf koordinieren', 'Coordinate catering logistics', 0.5, 0.5, false)
ON CONFLICT (id) DO NOTHING;

-- 12 Months Planning Duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  ('vendors_services_catering_drinks_12_1_1', 'vendors_services', 'catering_drinks', 12, 1, 1, 'Kulinarisches Konzept festlegen', 'Define catering concept', 5, 4, false),
  ('vendors_services_catering_drinks_12_1_2', 'vendors_services', 'catering_drinks', 12, 1, 2, 'Getränkekonzept festlegen', 'Define drink concept', 4, 3, false),
  ('vendors_services_catering_drinks_12_2_1', 'vendors_services', 'catering_drinks', 12, 2, 1, 'Caterer recherchieren', 'Research caterers', 3, 2, false),
  ('vendors_services_catering_drinks_12_2_2', 'vendors_services', 'catering_drinks', 12, 2, 2, 'Probeessen organisieren', 'Organize tasting', 2, 1.5, false),
  ('vendors_services_catering_drinks_12_2_3', 'vendors_services', 'catering_drinks', 12, 2, 3, 'Catering buchen', 'Book catering', 1.5, 1, false),
  ('vendors_services_catering_drinks_12_3_1', 'vendors_services', 'catering_drinks', 12, 3, 1, 'Menü und Getränke final abstimmen', 'Finalize menu and drinks', 1, 0.5, false),
  ('vendors_services_catering_drinks_12_3_2', 'vendors_services', 'catering_drinks', 12, 3, 2, 'Service und Ablauf koordinieren', 'Coordinate catering logistics', 0.5, 0.5, false)
ON CONFLICT (id) DO NOTHING;

-- 9 Months Planning Duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  ('vendors_services_catering_drinks_9_1_1', 'vendors_services', 'catering_drinks', 9, 1, 1, 'Kulinarisches Konzept festlegen', 'Define catering concept', 4, 3, false),
  ('vendors_services_catering_drinks_9_1_2', 'vendors_services', 'catering_drinks', 9, 1, 2, 'Getränkekonzept festlegen', 'Define drink concept', 3, 2, false),
  ('vendors_services_catering_drinks_9_2_1', 'vendors_services', 'catering_drinks', 9, 2, 1, 'Caterer recherchieren', 'Research caterers', 2, 1.5, false),
  ('vendors_services_catering_drinks_9_2_2', 'vendors_services', 'catering_drinks', 9, 2, 2, 'Probeessen organisieren', 'Organize tasting', 1.5, 1, false),
  ('vendors_services_catering_drinks_9_2_3', 'vendors_services', 'catering_drinks', 9, 2, 3, 'Catering buchen', 'Book catering', 1, 0.5, false),
  ('vendors_services_catering_drinks_9_3_1', 'vendors_services', 'catering_drinks', 9, 3, 1, 'Menü und Getränke final abstimmen', 'Finalize menu and drinks', 0.5, 0.5, false),
  ('vendors_services_catering_drinks_9_3_2', 'vendors_services', 'catering_drinks', 9, 3, 2, 'Service und Ablauf koordinieren', 'Coordinate catering logistics', 0.5, 0.5, false)
ON CONFLICT (id) DO NOTHING;

-- 6 Months Planning Duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  ('vendors_services_catering_drinks_6_1_1', 'vendors_services', 'catering_drinks', 6, 1, 1, 'Kulinarisches Konzept festlegen', 'Define catering concept', 3, 2, false),
  ('vendors_services_catering_drinks_6_1_2', 'vendors_services', 'catering_drinks', 6, 1, 2, 'Getränkekonzept festlegen', 'Define drink concept', 2, 1.5, false),
  ('vendors_services_catering_drinks_6_2_1', 'vendors_services', 'catering_drinks', 6, 2, 1, 'Caterer recherchieren', 'Research caterers', 1.5, 1, false),
  ('vendors_services_catering_drinks_6_2_2', 'vendors_services', 'catering_drinks', 6, 2, 2, 'Probeessen organisieren', 'Organize tasting', 1, 0.5, false),
  ('vendors_services_catering_drinks_6_2_3', 'vendors_services', 'catering_drinks', 6, 2, 3, 'Catering buchen', 'Book catering', 0.5, 0.5, false),
  ('vendors_services_catering_drinks_6_3_1', 'vendors_services', 'catering_drinks', 6, 3, 1, 'Menü und Getränke final abstimmen', 'Finalize menu and drinks', 0.5, 0.5, false),
  ('vendors_services_catering_drinks_6_3_2', 'vendors_services', 'catering_drinks', 6, 3, 2, 'Service und Ablauf koordinieren', 'Coordinate catering logistics', 0.5, 0.5, false)
ON CONFLICT (id) DO NOTHING;
