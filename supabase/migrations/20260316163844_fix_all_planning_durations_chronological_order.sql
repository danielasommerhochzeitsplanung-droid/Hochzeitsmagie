/*
  # Fix chronological order for ALL planning durations (6-30 months)

  1. Problem
    - Multiple tasks have identical recommended_offset_months values
    - This causes incorrect chronological display in UI
    - Tasks appear out of logical order (e.g., "book vendor" before "research vendors")
    
  2. Solution
    - Ensure recommended_offset_months strictly decreases with order_in_phase
    - Maintain logical workflow: Concept → Budget → Research → Book → Coordinate → Finalize
    
  3. Fixed sub-areas
    - music_entertainment (all durations)
    - memories (all durations)
*/

-- ============================================================
-- MUSIC_ENTERTAINMENT FIXES
-- ============================================================

-- 9 months: Fix "Hauptanbieter beauftragen" vs "Ablauf abstimmen" conflict
UPDATE task_templates SET recommended_offset_months = 3.5
WHERE category = 'vendors_services' 
  AND sub_area = 'music_entertainment'
  AND planning_duration_months = 9
  AND title_de = 'Hauptanbieter für Musik beauftragen'
  AND phase = 2;

-- 6 months: Fix complete order
-- Phase 1 tasks
UPDATE task_templates SET recommended_offset_months = 4.5
WHERE category = 'vendors_services' 
  AND sub_area = 'music_entertainment'
  AND planning_duration_months = 6
  AND title_de = 'Einsatzbereiche für Musik festlegen'
  AND phase = 1;

UPDATE task_templates SET recommended_offset_months = 4
WHERE category = 'vendors_services' 
  AND sub_area = 'music_entertainment'
  AND planning_duration_months = 6
  AND title_de = 'Musikform definieren'
  AND phase = 1;

UPDATE task_templates SET recommended_offset_months = 3.5
WHERE category = 'vendors_services' 
  AND sub_area = 'music_entertainment'
  AND planning_duration_months = 6
  AND title_de = 'Budget für Musik planen'
  AND phase = 1;

UPDATE task_templates SET recommended_offset_months = 3
WHERE category = 'vendors_services' 
  AND sub_area = 'music_entertainment'
  AND planning_duration_months = 6
  AND title_de = 'Musikanbieter recherchieren und vergleichen'
  AND phase = 1;

-- Phase 2 tasks
UPDATE task_templates SET recommended_offset_months = 2.5
WHERE category = 'vendors_services' 
  AND sub_area = 'music_entertainment'
  AND planning_duration_months = 6
  AND title_de = 'Hauptanbieter für Musik beauftragen'
  AND phase = 2;

UPDATE task_templates SET recommended_offset_months = 2
WHERE category = 'vendors_services' 
  AND sub_area = 'music_entertainment'
  AND planning_duration_months = 6
  AND title_de = 'Ablauf und Musikwünsche abstimmen'
  AND phase = 2;

UPDATE task_templates SET recommended_offset_months = 1.5
WHERE category = 'vendors_services' 
  AND sub_area = 'music_entertainment'
  AND planning_duration_months = 6
  AND title_de = 'Technik- und Aufbauanforderungen klären'
  AND phase = 2;

-- ============================================================
-- MEMORIES (PHOTO/VIDEO) FIXES
-- ============================================================

-- 24 months: Budget should be BEFORE research
UPDATE task_templates SET recommended_offset_months = 22.5
WHERE category = 'vendors_services' 
  AND sub_area = 'memories'
  AND planning_duration_months = 24
  AND title_de = 'Budget für Erinnerungen planen';

UPDATE task_templates SET recommended_offset_months = 22
WHERE category = 'vendors_services' 
  AND sub_area = 'memories'
  AND planning_duration_months = 24
  AND title_de = 'Anbieter für Foto und Video recherchieren und vergleichen';

-- 15 months: Budget should be BEFORE research
UPDATE task_templates SET recommended_offset_months = 13.5
WHERE category = 'vendors_services' 
  AND sub_area = 'memories'
  AND planning_duration_months = 15
  AND title_de = 'Budget für Erinnerungen planen';

UPDATE task_templates SET recommended_offset_months = 13
WHERE category = 'vendors_services' 
  AND sub_area = 'memories'
  AND planning_duration_months = 15
  AND title_de = 'Anbieter für Foto und Video recherchieren und vergleichen';

-- 12 months: Budget should be BEFORE research
UPDATE task_templates SET recommended_offset_months = 10.5
WHERE category = 'vendors_services' 
  AND sub_area = 'memories'
  AND planning_duration_months = 12
  AND title_de = 'Budget für Erinnerungen planen';

UPDATE task_templates SET recommended_offset_months = 10
WHERE category = 'vendors_services' 
  AND sub_area = 'memories'
  AND planning_duration_months = 12
  AND title_de = 'Anbieter für Foto und Video recherchieren und vergleichen';

-- 9 months: Budget should be BEFORE research
UPDATE task_templates SET recommended_offset_months = 7.5
WHERE category = 'vendors_services' 
  AND sub_area = 'memories'
  AND planning_duration_months = 9
  AND title_de = 'Budget für Erinnerungen planen';

UPDATE task_templates SET recommended_offset_months = 7
WHERE category = 'vendors_services' 
  AND sub_area = 'memories'
  AND planning_duration_months = 9
  AND title_de = 'Anbieter für Foto und Video recherchieren und vergleichen';
