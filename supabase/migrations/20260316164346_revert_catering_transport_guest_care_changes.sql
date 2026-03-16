/*
  # Revert unnecessary changes to catering, transport, and guest_care

  1. Problem
    - These operational areas naturally have tasks close together
    - My previous "fixes" actually broke the correct chronological order
    - Only music_entertainment and memories had actual ordering problems
    
  2. Solution
    - Restore original values for these three sub-areas
    - Keep the fixes for music_entertainment and memories only
*/

-- ============================================================
-- REVERT CATERING_DRINKS TO ORIGINAL VALUES
-- ============================================================

-- 9 months
UPDATE task_templates SET recommended_offset_months = 6
WHERE category = 'vendors_services' AND sub_area = 'catering_drinks'
  AND planning_duration_months = 9 AND phase = 1 AND order_in_phase = 1;

UPDATE task_templates SET recommended_offset_months = 5
WHERE category = 'vendors_services' AND sub_area = 'catering_drinks'
  AND planning_duration_months = 9 AND phase = 1 AND order_in_phase = 2;

UPDATE task_templates SET recommended_offset_months = 4
WHERE category = 'vendors_services' AND sub_area = 'catering_drinks'
  AND planning_duration_months = 9 AND phase = 2 AND order_in_phase = 1;

UPDATE task_templates SET recommended_offset_months = 2
WHERE category = 'vendors_services' AND sub_area = 'catering_drinks'
  AND planning_duration_months = 9 AND phase = 2 AND order_in_phase = 2;

UPDATE task_templates SET recommended_offset_months = 1
WHERE category = 'vendors_services' AND sub_area = 'catering_drinks'
  AND planning_duration_months = 9 AND phase = 2 AND order_in_phase = 3;

UPDATE task_templates SET recommended_offset_months = 0.5
WHERE category = 'vendors_services' AND sub_area = 'catering_drinks'
  AND planning_duration_months = 9 AND phase = 3 AND order_in_phase = 1;

UPDATE task_templates SET recommended_offset_months = 0.5
WHERE category = 'vendors_services' AND sub_area = 'catering_drinks'
  AND planning_duration_months = 9 AND phase = 3 AND order_in_phase = 2;

-- 6 months
UPDATE task_templates SET recommended_offset_months = 4
WHERE category = 'vendors_services' AND sub_area = 'catering_drinks'
  AND planning_duration_months = 6 AND phase = 1 AND order_in_phase = 1;

UPDATE task_templates SET recommended_offset_months = 3
WHERE category = 'vendors_services' AND sub_area = 'catering_drinks'
  AND planning_duration_months = 6 AND phase = 1 AND order_in_phase = 2;

UPDATE task_templates SET recommended_offset_months = 2
WHERE category = 'vendors_services' AND sub_area = 'catering_drinks'
  AND planning_duration_months = 6 AND phase = 2 AND order_in_phase = 1;

UPDATE task_templates SET recommended_offset_months = 1
WHERE category = 'vendors_services' AND sub_area = 'catering_drinks'
  AND planning_duration_months = 6 AND phase = 2 AND order_in_phase = 2;

UPDATE task_templates SET recommended_offset_months = 0.5
WHERE category = 'vendors_services' AND sub_area = 'catering_drinks'
  AND planning_duration_months = 6 AND phase = 2 AND order_in_phase = 3;

UPDATE task_templates SET recommended_offset_months = 0.5
WHERE category = 'vendors_services' AND sub_area = 'catering_drinks'
  AND planning_duration_months = 6 AND phase = 3 AND order_in_phase = 1;

UPDATE task_templates SET recommended_offset_months = 0.5
WHERE category = 'vendors_services' AND sub_area = 'catering_drinks'
  AND planning_duration_months = 6 AND phase = 3 AND order_in_phase = 2;

-- ============================================================
-- REVERT GUEST_CARE TO ORIGINAL VALUES
-- ============================================================

-- 9 months
UPDATE task_templates SET recommended_offset_months = 6
WHERE category = 'vendors_services' AND sub_area = 'guest_care'
  AND planning_duration_months = 9 AND phase = 1 AND order_in_phase = 1;

UPDATE task_templates SET recommended_offset_months = 5
WHERE category = 'vendors_services' AND sub_area = 'guest_care'
  AND planning_duration_months = 9 AND phase = 1 AND order_in_phase = 2;

UPDATE task_templates SET recommended_offset_months = 4
WHERE category = 'vendors_services' AND sub_area = 'guest_care'
  AND planning_duration_months = 9 AND phase = 2 AND order_in_phase = 1;

UPDATE task_templates SET recommended_offset_months = 2
WHERE category = 'vendors_services' AND sub_area = 'guest_care'
  AND planning_duration_months = 9 AND phase = 2 AND order_in_phase = 2;

UPDATE task_templates SET recommended_offset_months = 1
WHERE category = 'vendors_services' AND sub_area = 'guest_care'
  AND planning_duration_months = 9 AND phase = 2 AND order_in_phase = 3;

UPDATE task_templates SET recommended_offset_months = 0.5
WHERE category = 'vendors_services' AND sub_area = 'guest_care'
  AND planning_duration_months = 9 AND phase = 3 AND order_in_phase = 1;

UPDATE task_templates SET recommended_offset_months = 0.5
WHERE category = 'vendors_services' AND sub_area = 'guest_care'
  AND planning_duration_months = 9 AND phase = 3 AND order_in_phase = 2;

-- 6 months
UPDATE task_templates SET recommended_offset_months = 4
WHERE category = 'vendors_services' AND sub_area = 'guest_care'
  AND planning_duration_months = 6 AND phase = 1 AND order_in_phase = 1;

UPDATE task_templates SET recommended_offset_months = 3
WHERE category = 'vendors_services' AND sub_area = 'guest_care'
  AND planning_duration_months = 6 AND phase = 1 AND order_in_phase = 2;

UPDATE task_templates SET recommended_offset_months = 2
WHERE category = 'vendors_services' AND sub_area = 'guest_care'
  AND planning_duration_months = 6 AND phase = 2 AND order_in_phase = 1;

UPDATE task_templates SET recommended_offset_months = 1
WHERE category = 'vendors_services' AND sub_area = 'guest_care'
  AND planning_duration_months = 6 AND phase = 2 AND order_in_phase = 2;

UPDATE task_templates SET recommended_offset_months = 0.5
WHERE category = 'vendors_services' AND sub_area = 'guest_care'
  AND planning_duration_months = 6 AND phase = 2 AND order_in_phase = 3;

UPDATE task_templates SET recommended_offset_months = 0.5
WHERE category = 'vendors_services' AND sub_area = 'guest_care'
  AND planning_duration_months = 6 AND phase = 3 AND order_in_phase = 1;

UPDATE task_templates SET recommended_offset_months = 0.5
WHERE category = 'vendors_services' AND sub_area = 'guest_care'
  AND planning_duration_months = 6 AND phase = 3 AND order_in_phase = 2;

-- ============================================================
-- REVERT TRANSPORT_LOGISTICS TO ORIGINAL VALUES
-- ============================================================

-- 9 months
UPDATE task_templates SET recommended_offset_months = 6
WHERE category = 'vendors_services' AND sub_area = 'transport_logistics'
  AND planning_duration_months = 9 AND phase = 1 AND order_in_phase = 1;

UPDATE task_templates SET recommended_offset_months = 5
WHERE category = 'vendors_services' AND sub_area = 'transport_logistics'
  AND planning_duration_months = 9 AND phase = 1 AND order_in_phase = 2;

UPDATE task_templates SET recommended_offset_months = 4
WHERE category = 'vendors_services' AND sub_area = 'transport_logistics'
  AND planning_duration_months = 9 AND phase = 2 AND order_in_phase = 1;

UPDATE task_templates SET recommended_offset_months = 2
WHERE category = 'vendors_services' AND sub_area = 'transport_logistics'
  AND planning_duration_months = 9 AND phase = 2 AND order_in_phase = 2;

UPDATE task_templates SET recommended_offset_months = 1
WHERE category = 'vendors_services' AND sub_area = 'transport_logistics'
  AND planning_duration_months = 9 AND phase = 2 AND order_in_phase = 3;

UPDATE task_templates SET recommended_offset_months = 0.5
WHERE category = 'vendors_services' AND sub_area = 'transport_logistics'
  AND planning_duration_months = 9 AND phase = 3 AND order_in_phase = 1;

UPDATE task_templates SET recommended_offset_months = 0.5
WHERE category = 'vendors_services' AND sub_area = 'transport_logistics'
  AND planning_duration_months = 9 AND phase = 3 AND order_in_phase = 2;

-- 6 months
UPDATE task_templates SET recommended_offset_months = 4
WHERE category = 'vendors_services' AND sub_area = 'transport_logistics'
  AND planning_duration_months = 6 AND phase = 1 AND order_in_phase = 1;

UPDATE task_templates SET recommended_offset_months = 3
WHERE category = 'vendors_services' AND sub_area = 'transport_logistics'
  AND planning_duration_months = 6 AND phase = 1 AND order_in_phase = 2;

UPDATE task_templates SET recommended_offset_months = 2
WHERE category = 'vendors_services' AND sub_area = 'transport_logistics'
  AND planning_duration_months = 6 AND phase = 2 AND order_in_phase = 1;

UPDATE task_templates SET recommended_offset_months = 1
WHERE category = 'vendors_services' AND sub_area = 'transport_logistics'
  AND planning_duration_months = 6 AND phase = 2 AND order_in_phase = 2;

UPDATE task_templates SET recommended_offset_months = 0.5
WHERE category = 'vendors_services' AND sub_area = 'transport_logistics'
  AND planning_duration_months = 6 AND phase = 2 AND order_in_phase = 3;

UPDATE task_templates SET recommended_offset_months = 0.5
WHERE category = 'vendors_services' AND sub_area = 'transport_logistics'
  AND planning_duration_months = 6 AND phase = 3 AND order_in_phase = 1;

UPDATE task_templates SET recommended_offset_months = 0.5
WHERE category = 'vendors_services' AND sub_area = 'transport_logistics'
  AND planning_duration_months = 6 AND phase = 3 AND order_in_phase = 2;
