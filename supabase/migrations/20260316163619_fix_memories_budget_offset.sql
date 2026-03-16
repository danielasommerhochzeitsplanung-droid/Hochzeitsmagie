/*
  # Fix memories sub-area budget ordering

  1. Changes
    - Ensure "Budget für Erinnerungen planen" comes BEFORE "Anbieter recherchieren"
    - Adjust recommended_offset_months to maintain proper sequence
    
  2. Logical order
    - Phase 1, Order 3: Budget planen (should be BEFORE order 4)
    - Phase 1, Order 4: Anbieter recherchieren
*/

-- Fix 18 months planning: Budget should be 16.5, Research should be 16
UPDATE task_templates SET recommended_offset_months = 16.5
WHERE category = 'vendors_services' 
  AND sub_area = 'memories'
  AND planning_duration_months = 18
  AND title_de = 'Budget für Erinnerungen planen';
