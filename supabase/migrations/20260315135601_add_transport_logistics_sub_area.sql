/*
  # Add Transport & Logistics Sub-Area to Vendors & Services

  1. New Task Templates
    - Creates 49 task templates for the new sub-area `transport_logistics`
    - Category: `vendors_services`
    - Sub-Area: `transport_logistics`
    - Planning durations: 30, 24, 18, 15, 12, 9, 6 months
    
  2. Phase Structure
    - Phase 1: Needs & Concept (Bedarf & Konzept)
    - Phase 2: Research & Booking (Recherche & Buchung)
    - Phase 3: Finalization (Finalisierung)
    
  3. Tasks per Duration
    Each planning duration includes 7 tasks:
    - Define transport needs (Transportbedarf klären)
    - Define transport types (Transportarten festlegen)
    - Research transport providers (Transportanbieter recherchieren)
    - Book transportation (Transport buchen)
    - Create transport plan (Transportplan erstellen)
    - Finalize pickup times and locations (Fahrzeiten und Treffpunkte finalisieren)
    - Confirm transport logistics (Transportdetails bestätigen)
    
  4. Security
    - Uses existing RLS policies on task_templates table
*/

-- 30 Months Planning Duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  ('vendors_services_transport_logistics_30_1_1', 'vendors_services', 'transport_logistics', 30, 1, 1, 'Transportbedarf klären', 'Define transport needs', 12, 10, false),
  ('vendors_services_transport_logistics_30_1_2', 'vendors_services', 'transport_logistics', 30, 1, 2, 'Transportarten festlegen', 'Define transport types', 11, 9, false),
  ('vendors_services_transport_logistics_30_2_1', 'vendors_services', 'transport_logistics', 30, 2, 1, 'Transportanbieter recherchieren', 'Research transport providers', 9, 7, false),
  ('vendors_services_transport_logistics_30_2_2', 'vendors_services', 'transport_logistics', 30, 2, 2, 'Transport buchen', 'Book transportation', 7, 6, false),
  ('vendors_services_transport_logistics_30_2_3', 'vendors_services', 'transport_logistics', 30, 2, 3, 'Transportplan erstellen', 'Create transport plan', 6, 5, false),
  ('vendors_services_transport_logistics_30_3_1', 'vendors_services', 'transport_logistics', 30, 3, 1, 'Fahrzeiten und Treffpunkte finalisieren', 'Finalize pickup times and locations', 2, 1, false),
  ('vendors_services_transport_logistics_30_3_2', 'vendors_services', 'transport_logistics', 30, 3, 2, 'Transportdetails bestätigen', 'Confirm transport logistics', 1, 0.5, false)
ON CONFLICT (id) DO NOTHING;

-- 24 Months Planning Duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  ('vendors_services_transport_logistics_24_1_1', 'vendors_services', 'transport_logistics', 24, 1, 1, 'Transportbedarf klären', 'Define transport needs', 10, 8, false),
  ('vendors_services_transport_logistics_24_1_2', 'vendors_services', 'transport_logistics', 24, 1, 2, 'Transportarten festlegen', 'Define transport types', 9, 7, false),
  ('vendors_services_transport_logistics_24_2_1', 'vendors_services', 'transport_logistics', 24, 2, 1, 'Transportanbieter recherchieren', 'Research transport providers', 7, 5, false),
  ('vendors_services_transport_logistics_24_2_2', 'vendors_services', 'transport_logistics', 24, 2, 2, 'Transport buchen', 'Book transportation', 5, 4, false),
  ('vendors_services_transport_logistics_24_2_3', 'vendors_services', 'transport_logistics', 24, 2, 3, 'Transportplan erstellen', 'Create transport plan', 4, 3, false),
  ('vendors_services_transport_logistics_24_3_1', 'vendors_services', 'transport_logistics', 24, 3, 1, 'Fahrzeiten und Treffpunkte finalisieren', 'Finalize pickup times and locations', 2, 1, false),
  ('vendors_services_transport_logistics_24_3_2', 'vendors_services', 'transport_logistics', 24, 3, 2, 'Transportdetails bestätigen', 'Confirm transport logistics', 1, 0.5, false)
ON CONFLICT (id) DO NOTHING;

-- 18 Months Planning Duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  ('vendors_services_transport_logistics_18_1_1', 'vendors_services', 'transport_logistics', 18, 1, 1, 'Transportbedarf klären', 'Define transport needs', 8, 6, false),
  ('vendors_services_transport_logistics_18_1_2', 'vendors_services', 'transport_logistics', 18, 1, 2, 'Transportarten festlegen', 'Define transport types', 7, 5, false),
  ('vendors_services_transport_logistics_18_2_1', 'vendors_services', 'transport_logistics', 18, 2, 1, 'Transportanbieter recherchieren', 'Research transport providers', 5, 4, false),
  ('vendors_services_transport_logistics_18_2_2', 'vendors_services', 'transport_logistics', 18, 2, 2, 'Transport buchen', 'Book transportation', 4, 3, false),
  ('vendors_services_transport_logistics_18_2_3', 'vendors_services', 'transport_logistics', 18, 2, 3, 'Transportplan erstellen', 'Create transport plan', 3, 2, false),
  ('vendors_services_transport_logistics_18_3_1', 'vendors_services', 'transport_logistics', 18, 3, 1, 'Fahrzeiten und Treffpunkte finalisieren', 'Finalize pickup times and locations', 2, 1, false),
  ('vendors_services_transport_logistics_18_3_2', 'vendors_services', 'transport_logistics', 18, 3, 2, 'Transportdetails bestätigen', 'Confirm transport logistics', 1, 0.5, false)
ON CONFLICT (id) DO NOTHING;

-- 15 Months Planning Duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  ('vendors_services_transport_logistics_15_1_1', 'vendors_services', 'transport_logistics', 15, 1, 1, 'Transportbedarf klären', 'Define transport needs', 6, 5, false),
  ('vendors_services_transport_logistics_15_1_2', 'vendors_services', 'transport_logistics', 15, 1, 2, 'Transportarten festlegen', 'Define transport types', 5, 4, false),
  ('vendors_services_transport_logistics_15_2_1', 'vendors_services', 'transport_logistics', 15, 2, 1, 'Transportanbieter recherchieren', 'Research transport providers', 4, 3, false),
  ('vendors_services_transport_logistics_15_2_2', 'vendors_services', 'transport_logistics', 15, 2, 2, 'Transport buchen', 'Book transportation', 3, 2, false),
  ('vendors_services_transport_logistics_15_2_3', 'vendors_services', 'transport_logistics', 15, 2, 3, 'Transportplan erstellen', 'Create transport plan', 2, 1.5, false),
  ('vendors_services_transport_logistics_15_3_1', 'vendors_services', 'transport_logistics', 15, 3, 1, 'Fahrzeiten und Treffpunkte finalisieren', 'Finalize pickup times and locations', 1, 0.5, false),
  ('vendors_services_transport_logistics_15_3_2', 'vendors_services', 'transport_logistics', 15, 3, 2, 'Transportdetails bestätigen', 'Confirm transport logistics', 0.5, 0.5, false)
ON CONFLICT (id) DO NOTHING;

-- 12 Months Planning Duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  ('vendors_services_transport_logistics_12_1_1', 'vendors_services', 'transport_logistics', 12, 1, 1, 'Transportbedarf klären', 'Define transport needs', 5, 4, false),
  ('vendors_services_transport_logistics_12_1_2', 'vendors_services', 'transport_logistics', 12, 1, 2, 'Transportarten festlegen', 'Define transport types', 4, 3, false),
  ('vendors_services_transport_logistics_12_2_1', 'vendors_services', 'transport_logistics', 12, 2, 1, 'Transportanbieter recherchieren', 'Research transport providers', 3, 2, false),
  ('vendors_services_transport_logistics_12_2_2', 'vendors_services', 'transport_logistics', 12, 2, 2, 'Transport buchen', 'Book transportation', 2, 1.5, false),
  ('vendors_services_transport_logistics_12_2_3', 'vendors_services', 'transport_logistics', 12, 2, 3, 'Transportplan erstellen', 'Create transport plan', 1.5, 1, false),
  ('vendors_services_transport_logistics_12_3_1', 'vendors_services', 'transport_logistics', 12, 3, 1, 'Fahrzeiten und Treffpunkte finalisieren', 'Finalize pickup times and locations', 1, 0.5, false),
  ('vendors_services_transport_logistics_12_3_2', 'vendors_services', 'transport_logistics', 12, 3, 2, 'Transportdetails bestätigen', 'Confirm transport logistics', 0.5, 0.5, false)
ON CONFLICT (id) DO NOTHING;

-- 9 Months Planning Duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  ('vendors_services_transport_logistics_9_1_1', 'vendors_services', 'transport_logistics', 9, 1, 1, 'Transportbedarf klären', 'Define transport needs', 4, 3, false),
  ('vendors_services_transport_logistics_9_1_2', 'vendors_services', 'transport_logistics', 9, 1, 2, 'Transportarten festlegen', 'Define transport types', 3, 2, false),
  ('vendors_services_transport_logistics_9_2_1', 'vendors_services', 'transport_logistics', 9, 2, 1, 'Transportanbieter recherchieren', 'Research transport providers', 2, 1.5, false),
  ('vendors_services_transport_logistics_9_2_2', 'vendors_services', 'transport_logistics', 9, 2, 2, 'Transport buchen', 'Book transportation', 1.5, 1, false),
  ('vendors_services_transport_logistics_9_2_3', 'vendors_services', 'transport_logistics', 9, 2, 3, 'Transportplan erstellen', 'Create transport plan', 1, 0.5, false),
  ('vendors_services_transport_logistics_9_3_1', 'vendors_services', 'transport_logistics', 9, 3, 1, 'Fahrzeiten und Treffpunkte finalisieren', 'Finalize pickup times and locations', 0.5, 0.5, false),
  ('vendors_services_transport_logistics_9_3_2', 'vendors_services', 'transport_logistics', 9, 3, 2, 'Transportdetails bestätigen', 'Confirm transport logistics', 0.5, 0.5, false)
ON CONFLICT (id) DO NOTHING;

-- 6 Months Planning Duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  ('vendors_services_transport_logistics_6_1_1', 'vendors_services', 'transport_logistics', 6, 1, 1, 'Transportbedarf klären', 'Define transport needs', 3, 2, false),
  ('vendors_services_transport_logistics_6_1_2', 'vendors_services', 'transport_logistics', 6, 1, 2, 'Transportarten festlegen', 'Define transport types', 2, 1.5, false),
  ('vendors_services_transport_logistics_6_2_1', 'vendors_services', 'transport_logistics', 6, 2, 1, 'Transportanbieter recherchieren', 'Research transport providers', 1.5, 1, false),
  ('vendors_services_transport_logistics_6_2_2', 'vendors_services', 'transport_logistics', 6, 2, 2, 'Transport buchen', 'Book transportation', 1, 0.5, false),
  ('vendors_services_transport_logistics_6_2_3', 'vendors_services', 'transport_logistics', 6, 2, 3, 'Transportplan erstellen', 'Create transport plan', 0.5, 0.5, false),
  ('vendors_services_transport_logistics_6_3_1', 'vendors_services', 'transport_logistics', 6, 3, 1, 'Fahrzeiten und Treffpunkte finalisieren', 'Finalize pickup times and locations', 0.5, 0.5, false),
  ('vendors_services_transport_logistics_6_3_2', 'vendors_services', 'transport_logistics', 6, 3, 2, 'Transportdetails bestätigen', 'Confirm transport logistics', 0.5, 0.5, false)
ON CONFLICT (id) DO NOTHING;
