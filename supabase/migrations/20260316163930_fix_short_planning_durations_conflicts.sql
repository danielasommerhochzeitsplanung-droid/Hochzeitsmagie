/*
  # Fix chronological conflicts in short planning durations (6-9 months)

  1. Problem
    - Multiple tasks share identical recommended_offset_months values
    - Affects catering_drinks, guest_care, and transport_logistics
    - Occurs in 6 and 9 month planning durations
    
  2. Solution
    - Separate tasks with unique offset values
    - Maintain chronological order based on phase and order_in_phase
*/

-- ============================================================
-- FIX 9 MONTH PLANNING DURATIONS
-- ============================================================

-- CATERING_DRINKS (9 months) - Phase 3 tasks
UPDATE task_templates SET recommended_offset_months = 1.5
WHERE category = 'vendors_services' 
  AND sub_area = 'catering_drinks'
  AND planning_duration_months = 9
  AND title_de = 'Menü und Getränke final abstimmen'
  AND phase = 3;

UPDATE task_templates SET recommended_offset_months = 1
WHERE category = 'vendors_services' 
  AND sub_area = 'catering_drinks'
  AND planning_duration_months = 9
  AND title_de = 'Service und Ablauf koordinieren'
  AND phase = 3;

-- GUEST_CARE (9 months) - Phase 3 tasks
UPDATE task_templates SET recommended_offset_months = 1.5
WHERE category = 'vendors_services' 
  AND sub_area = 'guest_care'
  AND planning_duration_months = 9
  AND title_de = 'Bereiche für Kinder und Gäste vorbereiten'
  AND phase = 3;

UPDATE task_templates SET recommended_offset_months = 1
WHERE category = 'vendors_services' 
  AND sub_area = 'guest_care'
  AND planning_duration_months = 9
  AND title_de = 'Organisation final abstimmen'
  AND phase = 3;

-- TRANSPORT_LOGISTICS (9 months) - Phase 3 tasks
UPDATE task_templates SET recommended_offset_months = 1.5
WHERE category = 'vendors_services' 
  AND sub_area = 'transport_logistics'
  AND planning_duration_months = 9
  AND title_de = 'Fahrzeiten und Treffpunkte finalisieren'
  AND phase = 3;

UPDATE task_templates SET recommended_offset_months = 1
WHERE category = 'vendors_services' 
  AND sub_area = 'transport_logistics'
  AND planning_duration_months = 9
  AND title_de = 'Transportdetails bestätigen'
  AND phase = 3;

-- ============================================================
-- FIX 6 MONTH PLANNING DURATIONS
-- ============================================================

-- CATERING_DRINKS (6 months) - Phase 2 & 3 tasks
UPDATE task_templates SET recommended_offset_months = 2
WHERE category = 'vendors_services' 
  AND sub_area = 'catering_drinks'
  AND planning_duration_months = 6
  AND title_de = 'Catering buchen'
  AND phase = 2;

UPDATE task_templates SET recommended_offset_months = 1.5
WHERE category = 'vendors_services' 
  AND sub_area = 'catering_drinks'
  AND planning_duration_months = 6
  AND title_de = 'Menü und Getränke final abstimmen'
  AND phase = 3;

UPDATE task_templates SET recommended_offset_months = 1
WHERE category = 'vendors_services' 
  AND sub_area = 'catering_drinks'
  AND planning_duration_months = 6
  AND title_de = 'Service und Ablauf koordinieren'
  AND phase = 3;

-- GUEST_CARE (6 months) - Phase 2 & 3 tasks
UPDATE task_templates SET recommended_offset_months = 2
WHERE category = 'vendors_services' 
  AND sub_area = 'guest_care'
  AND planning_duration_months = 6
  AND title_de = 'Zeiten und Ablauf planen'
  AND phase = 2;

UPDATE task_templates SET recommended_offset_months = 1.5
WHERE category = 'vendors_services' 
  AND sub_area = 'guest_care'
  AND planning_duration_months = 6
  AND title_de = 'Bereiche für Kinder und Gäste vorbereiten'
  AND phase = 3;

UPDATE task_templates SET recommended_offset_months = 1
WHERE category = 'vendors_services' 
  AND sub_area = 'guest_care'
  AND planning_duration_months = 6
  AND title_de = 'Organisation final abstimmen'
  AND phase = 3;

-- TRANSPORT_LOGISTICS (6 months) - Phase 2 & 3 tasks
UPDATE task_templates SET recommended_offset_months = 2
WHERE category = 'vendors_services' 
  AND sub_area = 'transport_logistics'
  AND planning_duration_months = 6
  AND title_de = 'Transportplan erstellen'
  AND phase = 2;

UPDATE task_templates SET recommended_offset_months = 1.5
WHERE category = 'vendors_services' 
  AND sub_area = 'transport_logistics'
  AND planning_duration_months = 6
  AND title_de = 'Fahrzeiten und Treffpunkte finalisieren'
  AND phase = 3;

UPDATE task_templates SET recommended_offset_months = 1
WHERE category = 'vendors_services' 
  AND sub_area = 'transport_logistics'
  AND planning_duration_months = 6
  AND title_de = 'Transportdetails bestätigen'
  AND phase = 3;
