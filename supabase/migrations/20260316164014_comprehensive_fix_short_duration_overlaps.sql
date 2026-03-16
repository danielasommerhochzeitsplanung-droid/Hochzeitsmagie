/*
  # Comprehensive fix for 6 and 9 month planning duration overlaps

  1. Problem
    - Tasks from different phases overlap in recommended_offset_months
    - Phase 2 and Phase 3 tasks conflict with each other
    - Affects catering_drinks, guest_care, and transport_logistics
    
  2. Solution
    - Redistribute offset values to eliminate all overlaps
    - Ensure each task has unique offset within its sub_area and planning_duration
    - Maintain strict chronological order: higher offset = earlier task
*/

-- ============================================================
-- FIX CATERING_DRINKS 9 MONTHS
-- ============================================================

-- Phase 2
UPDATE task_templates SET recommended_offset_months = 3.5
WHERE category = 'vendors_services' AND sub_area = 'catering_drinks'
  AND planning_duration_months = 9 AND phase = 2 AND order_in_phase = 2
  AND title_de = 'Probeessen organisieren';

UPDATE task_templates SET recommended_offset_months = 2.5
WHERE category = 'vendors_services' AND sub_area = 'catering_drinks'
  AND planning_duration_months = 9 AND phase = 2 AND order_in_phase = 3
  AND title_de = 'Catering buchen';

-- Phase 3
UPDATE task_templates SET recommended_offset_months = 1.5
WHERE category = 'vendors_services' AND sub_area = 'catering_drinks'
  AND planning_duration_months = 9 AND phase = 3 AND order_in_phase = 1
  AND title_de = 'Menü und Getränke final abstimmen';

UPDATE task_templates SET recommended_offset_months = 0.5
WHERE category = 'vendors_services' AND sub_area = 'catering_drinks'
  AND planning_duration_months = 9 AND phase = 3 AND order_in_phase = 2
  AND title_de = 'Service und Ablauf koordinieren';

-- ============================================================
-- FIX GUEST_CARE 9 MONTHS
-- ============================================================

-- Phase 2
UPDATE task_templates SET recommended_offset_months = 3.5
WHERE category = 'vendors_services' AND sub_area = 'guest_care'
  AND planning_duration_months = 9 AND phase = 2 AND order_in_phase = 2
  AND title_de = 'Unterstützung organisieren';

UPDATE task_templates SET recommended_offset_months = 2.5
WHERE category = 'vendors_services' AND sub_area = 'guest_care'
  AND planning_duration_months = 9 AND phase = 2 AND order_in_phase = 3
  AND title_de = 'Zeiten und Ablauf planen';

-- Phase 3
UPDATE task_templates SET recommended_offset_months = 1.5
WHERE category = 'vendors_services' AND sub_area = 'guest_care'
  AND planning_duration_months = 9 AND phase = 3 AND order_in_phase = 1
  AND title_de = 'Bereiche für Kinder und Gäste vorbereiten';

UPDATE task_templates SET recommended_offset_months = 0.5
WHERE category = 'vendors_services' AND sub_area = 'guest_care'
  AND planning_duration_months = 9 AND phase = 3 AND order_in_phase = 2
  AND title_de = 'Organisation final abstimmen';

-- ============================================================
-- FIX TRANSPORT_LOGISTICS 9 MONTHS
-- ============================================================

-- Phase 2
UPDATE task_templates SET recommended_offset_months = 3.5
WHERE category = 'vendors_services' AND sub_area = 'transport_logistics'
  AND planning_duration_months = 9 AND phase = 2 AND order_in_phase = 2
  AND title_de = 'Transport buchen';

UPDATE task_templates SET recommended_offset_months = 2.5
WHERE category = 'vendors_services' AND sub_area = 'transport_logistics'
  AND planning_duration_months = 9 AND phase = 2 AND order_in_phase = 3
  AND title_de = 'Transportplan erstellen';

-- Phase 3
UPDATE task_templates SET recommended_offset_months = 1.5
WHERE category = 'vendors_services' AND sub_area = 'transport_logistics'
  AND planning_duration_months = 9 AND phase = 3 AND order_in_phase = 1
  AND title_de = 'Fahrzeiten und Treffpunkte finalisieren';

UPDATE task_templates SET recommended_offset_months = 0.5
WHERE category = 'vendors_services' AND sub_area = 'transport_logistics'
  AND planning_duration_months = 9 AND phase = 3 AND order_in_phase = 2
  AND title_de = 'Transportdetails bestätigen';

-- ============================================================
-- FIX CATERING_DRINKS 6 MONTHS
-- ============================================================

-- Phase 1
UPDATE task_templates SET recommended_offset_months = 4.5
WHERE category = 'vendors_services' AND sub_area = 'catering_drinks'
  AND planning_duration_months = 6 AND phase = 1 AND order_in_phase = 2
  AND title_de = 'Getränkekonzept festlegen';

-- Phase 2
UPDATE task_templates SET recommended_offset_months = 3.5
WHERE category = 'vendors_services' AND sub_area = 'catering_drinks'
  AND planning_duration_months = 6 AND phase = 2 AND order_in_phase = 1
  AND title_de = 'Caterer recherchieren';

UPDATE task_templates SET recommended_offset_months = 2.5
WHERE category = 'vendors_services' AND sub_area = 'catering_drinks'
  AND planning_duration_months = 6 AND phase = 2 AND order_in_phase = 2
  AND title_de = 'Probeessen organisieren';

UPDATE task_templates SET recommended_offset_months = 1.75
WHERE category = 'vendors_services' AND sub_area = 'catering_drinks'
  AND planning_duration_months = 6 AND phase = 2 AND order_in_phase = 3
  AND title_de = 'Catering buchen';

-- Phase 3
UPDATE task_templates SET recommended_offset_months = 1.25
WHERE category = 'vendors_services' AND sub_area = 'catering_drinks'
  AND planning_duration_months = 6 AND phase = 3 AND order_in_phase = 1
  AND title_de = 'Menü und Getränke final abstimmen';

UPDATE task_templates SET recommended_offset_months = 0.5
WHERE category = 'vendors_services' AND sub_area = 'catering_drinks'
  AND planning_duration_months = 6 AND phase = 3 AND order_in_phase = 2
  AND title_de = 'Service und Ablauf koordinieren';

-- ============================================================
-- FIX GUEST_CARE 6 MONTHS
-- ============================================================

-- Phase 1
UPDATE task_templates SET recommended_offset_months = 4.5
WHERE category = 'vendors_services' AND sub_area = 'guest_care'
  AND planning_duration_months = 6 AND phase = 1 AND order_in_phase = 2
  AND title_de = 'Unterstützungsangebot planen';

-- Phase 2
UPDATE task_templates SET recommended_offset_months = 3.5
WHERE category = 'vendors_services' AND sub_area = 'guest_care'
  AND planning_duration_months = 6 AND phase = 2 AND order_in_phase = 1
  AND title_de = 'Passende Anbieter recherchieren';

UPDATE task_templates SET recommended_offset_months = 2.5
WHERE category = 'vendors_services' AND sub_area = 'guest_care'
  AND planning_duration_months = 6 AND phase = 2 AND order_in_phase = 2
  AND title_de = 'Unterstützung organisieren';

UPDATE task_templates SET recommended_offset_months = 1.75
WHERE category = 'vendors_services' AND sub_area = 'guest_care'
  AND planning_duration_months = 6 AND phase = 2 AND order_in_phase = 3
  AND title_de = 'Zeiten und Ablauf planen';

-- Phase 3
UPDATE task_templates SET recommended_offset_months = 1.25
WHERE category = 'vendors_services' AND sub_area = 'guest_care'
  AND planning_duration_months = 6 AND phase = 3 AND order_in_phase = 1
  AND title_de = 'Bereiche für Kinder und Gäste vorbereiten';

UPDATE task_templates SET recommended_offset_months = 0.5
WHERE category = 'vendors_services' AND sub_area = 'guest_care'
  AND planning_duration_months = 6 AND phase = 3 AND order_in_phase = 2
  AND title_de = 'Organisation final abstimmen';

-- ============================================================
-- FIX TRANSPORT_LOGISTICS 6 MONTHS
-- ============================================================

-- Phase 1
UPDATE task_templates SET recommended_offset_months = 4.5
WHERE category = 'vendors_services' AND sub_area = 'transport_logistics'
  AND planning_duration_months = 6 AND phase = 1 AND order_in_phase = 2
  AND title_de = 'Transportarten festlegen';

-- Phase 2
UPDATE task_templates SET recommended_offset_months = 3.5
WHERE category = 'vendors_services' AND sub_area = 'transport_logistics'
  AND planning_duration_months = 6 AND phase = 2 AND order_in_phase = 1
  AND title_de = 'Transportanbieter recherchieren';

UPDATE task_templates SET recommended_offset_months = 2.5
WHERE category = 'vendors_services' AND sub_area = 'transport_logistics'
  AND planning_duration_months = 6 AND phase = 2 AND order_in_phase = 2
  AND title_de = 'Transport buchen';

UPDATE task_templates SET recommended_offset_months = 1.75
WHERE category = 'vendors_services' AND sub_area = 'transport_logistics'
  AND planning_duration_months = 6 AND phase = 2 AND order_in_phase = 3
  AND title_de = 'Transportplan erstellen';

-- Phase 3
UPDATE task_templates SET recommended_offset_months = 1.25
WHERE category = 'vendors_services' AND sub_area = 'transport_logistics'
  AND planning_duration_months = 6 AND phase = 3 AND order_in_phase = 1
  AND title_de = 'Fahrzeiten und Treffpunkte finalisieren';

UPDATE task_templates SET recommended_offset_months = 0.5
WHERE category = 'vendors_services' AND sub_area = 'transport_logistics'
  AND planning_duration_months = 6 AND phase = 3 AND order_in_phase = 2
  AND title_de = 'Transportdetails bestätigen';
