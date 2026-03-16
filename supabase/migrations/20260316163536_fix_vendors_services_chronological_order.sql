/*
  # Fix chronological order in vendors_services tasks

  1. Changes
    - Fix `music_entertainment` sub-area: ensure "Musikanbieter recherchieren" comes BEFORE "Hauptanbieter beauftragen"
    - Fix `memories` sub-area: ensure "Anbieter recherchieren" comes BEFORE "Hauptanbieter beauftragen"
    - Adjust `recommended_offset_months` to maintain logical chronological order across all planning durations
    
  2. Logical order for all sub-areas:
    - Phase 1: Planning (Konzept → Budget → Research)
    - Phase 2: Execution (Recherche → Buchen → Abstimmen)
    - Phase 3: Finalization (Letzte Abstimmungen)

  3. Important notes
    - The order_in_phase field defines the sequence within each phase
    - recommended_offset_months must decrease as order_in_phase increases
    - This ensures chronologically logical task display in the UI
*/

-- Fix music_entertainment sub-area for all planning durations
-- Ensure recommended_offset_months follows logical progression

-- 30 months planning
UPDATE task_templates SET recommended_offset_months = 21
WHERE category = 'vendors_services' 
  AND sub_area = 'music_entertainment'
  AND planning_duration_months = 30
  AND title_de = 'Musikanbieter recherchieren und vergleichen';

UPDATE task_templates SET recommended_offset_months = 18
WHERE category = 'vendors_services' 
  AND sub_area = 'music_entertainment'
  AND planning_duration_months = 30
  AND title_de = 'Hauptanbieter für Musik beauftragen';

-- 24 months planning
UPDATE task_templates SET recommended_offset_months = 16
WHERE category = 'vendors_services' 
  AND sub_area = 'music_entertainment'
  AND planning_duration_months = 24
  AND title_de = 'Musikanbieter recherchieren und vergleichen';

UPDATE task_templates SET recommended_offset_months = 13
WHERE category = 'vendors_services' 
  AND sub_area = 'music_entertainment'
  AND planning_duration_months = 24
  AND title_de = 'Hauptanbieter für Musik beauftragen';

-- 18 months planning
UPDATE task_templates SET recommended_offset_months = 11
WHERE category = 'vendors_services' 
  AND sub_area = 'music_entertainment'
  AND planning_duration_months = 18
  AND title_de = 'Musikanbieter recherchieren und vergleichen';

UPDATE task_templates SET recommended_offset_months = 8
WHERE category = 'vendors_services' 
  AND sub_area = 'music_entertainment'
  AND planning_duration_months = 18
  AND title_de = 'Hauptanbieter für Musik beauftragen';

-- 15 months planning
UPDATE task_templates SET recommended_offset_months = 9
WHERE category = 'vendors_services' 
  AND sub_area = 'music_entertainment'
  AND planning_duration_months = 15
  AND title_de = 'Musikanbieter recherchieren und vergleichen';

UPDATE task_templates SET recommended_offset_months = 6
WHERE category = 'vendors_services' 
  AND sub_area = 'music_entertainment'
  AND planning_duration_months = 15
  AND title_de = 'Hauptanbieter für Musik beauftragen';

-- 12 months planning
UPDATE task_templates SET recommended_offset_months = 6
WHERE category = 'vendors_services' 
  AND sub_area = 'music_entertainment'
  AND planning_duration_months = 12
  AND title_de = 'Musikanbieter recherchieren und vergleichen';

UPDATE task_templates SET recommended_offset_months = 5
WHERE category = 'vendors_services' 
  AND sub_area = 'music_entertainment'
  AND planning_duration_months = 12
  AND title_de = 'Hauptanbieter für Musik beauftragen'
  AND phase = 2;

-- 9 months planning
UPDATE task_templates SET recommended_offset_months = 4
WHERE category = 'vendors_services' 
  AND sub_area = 'music_entertainment'
  AND planning_duration_months = 9
  AND title_de = 'Musikanbieter recherchieren und vergleichen';

UPDATE task_templates SET recommended_offset_months = 3
WHERE category = 'vendors_services' 
  AND sub_area = 'music_entertainment'
  AND planning_duration_months = 9
  AND title_de = 'Hauptanbieter für Musik beauftragen'
  AND phase = 2;

-- 6 months planning
UPDATE task_templates SET recommended_offset_months = 2.5
WHERE category = 'vendors_services' 
  AND sub_area = 'music_entertainment'
  AND planning_duration_months = 6
  AND title_de = 'Musikanbieter recherchieren und vergleichen';

UPDATE task_templates SET recommended_offset_months = 2.25
WHERE category = 'vendors_services' 
  AND sub_area = 'music_entertainment'
  AND planning_duration_months = 6
  AND title_de = 'Hauptanbieter für Musik beauftragen'
  AND phase = 2;

-- Fix memories (photo/video) sub-area
-- Ensure chronological order: Research BEFORE booking

-- 30 months planning
UPDATE task_templates SET recommended_offset_months = 27
WHERE category = 'vendors_services' 
  AND sub_area = 'memories'
  AND planning_duration_months = 30
  AND title_de = 'Anbieter für Foto und Video recherchieren und vergleichen';

UPDATE task_templates SET recommended_offset_months = 24
WHERE category = 'vendors_services' 
  AND sub_area = 'memories'
  AND planning_duration_months = 30
  AND title_de = 'Hauptanbieter für Foto und Video beauftragen';

-- 24 months planning
UPDATE task_templates SET recommended_offset_months = 22
WHERE category = 'vendors_services' 
  AND sub_area = 'memories'
  AND planning_duration_months = 24
  AND title_de = 'Anbieter für Foto und Video recherchieren und vergleichen';

UPDATE task_templates SET recommended_offset_months = 19
WHERE category = 'vendors_services' 
  AND sub_area = 'memories'
  AND planning_duration_months = 24
  AND title_de = 'Hauptanbieter für Foto und Video beauftragen';

-- 18 months planning
UPDATE task_templates SET recommended_offset_months = 16
WHERE category = 'vendors_services' 
  AND sub_area = 'memories'
  AND planning_duration_months = 18
  AND title_de = 'Anbieter für Foto und Video recherchieren und vergleichen';

UPDATE task_templates SET recommended_offset_months = 13
WHERE category = 'vendors_services' 
  AND sub_area = 'memories'
  AND planning_duration_months = 18
  AND title_de = 'Hauptanbieter für Foto und Video beauftragen';

-- 15 months planning
UPDATE task_templates SET recommended_offset_months = 13
WHERE category = 'vendors_services' 
  AND sub_area = 'memories'
  AND planning_duration_months = 15
  AND title_de = 'Anbieter für Foto und Video recherchieren und vergleichen';

UPDATE task_templates SET recommended_offset_months = 10
WHERE category = 'vendors_services' 
  AND sub_area = 'memories'
  AND planning_duration_months = 15
  AND title_de = 'Hauptanbieter für Foto und Video beauftragen';

-- 12 months planning
UPDATE task_templates SET recommended_offset_months = 10
WHERE category = 'vendors_services' 
  AND sub_area = 'memories'
  AND planning_duration_months = 12
  AND title_de = 'Anbieter für Foto und Video recherchieren und vergleichen';

UPDATE task_templates SET recommended_offset_months = 7
WHERE category = 'vendors_services' 
  AND sub_area = 'memories'
  AND planning_duration_months = 12
  AND title_de = 'Hauptanbieter für Foto und Video beauftragen';

-- 9 months planning
UPDATE task_templates SET recommended_offset_months = 7
WHERE category = 'vendors_services' 
  AND sub_area = 'memories'
  AND planning_duration_months = 9
  AND title_de = 'Anbieter für Foto und Video recherchieren und vergleichen';

UPDATE task_templates SET recommended_offset_months = 4
WHERE category = 'vendors_services' 
  AND sub_area = 'memories'
  AND planning_duration_months = 9
  AND title_de = 'Hauptanbieter für Foto und Video beauftragen';

-- 6 months planning
UPDATE task_templates SET recommended_offset_months = 4.5
WHERE category = 'vendors_services' 
  AND sub_area = 'memories'
  AND planning_duration_months = 6
  AND title_de = 'Anbieter für Foto und Video recherchieren und vergleichen';

UPDATE task_templates SET recommended_offset_months = 3.5
WHERE category = 'vendors_services' 
  AND sub_area = 'memories'
  AND planning_duration_months = 6
  AND title_de = 'Hauptanbieter für Foto und Video beauftragen';
