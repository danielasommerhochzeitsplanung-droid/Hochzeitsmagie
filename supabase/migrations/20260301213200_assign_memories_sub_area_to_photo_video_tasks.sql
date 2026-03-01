/*
  # Assign 'memories' sub_area to Photo & Video Tasks
  
  1. Updates
    - Sets `sub_area = 'memories'` for all tasks related to photo and video
    - Identifies tasks by keywords in title: 'Foto', 'Video', 'Erinnerung', 'photo', 'video', 'memories'
    - Applies only to tasks in 'vendors_services' category
    
  2. Affected Tasks
    - Erinnerungsformate festlegen / Define memory formats
    - Stil und Umfang für Foto und Video festlegen / Define photo and video style and scope
    - Budget für Erinnerungen planen / Plan budget for memories
    - Anbieter für Foto und Video recherchieren / Research and compare photo and video providers
    - Hauptanbieter für Foto und Video beauftragen / Book primary photo and video provider
    - Ablauf und Motivwünsche abstimmen / Align timeline and shot requests
    - Setup für Gästefotos planen / Plan guest photo setup
    - Finale Abstimmung und Bestätigung einholen / Obtain final alignment and confirmation
    
  3. Notes
    - All tasks with these keywords are now organized under "Erinnerungen" sub-area
    - This enables proper accordion grouping in the TodosModule
*/

-- Update all photo/video related tasks to have sub_area = 'memories'
UPDATE task_templates
SET sub_area = 'memories'
WHERE category = 'vendors_services'
  AND (
    title_de ILIKE '%foto%' 
    OR title_de ILIKE '%video%' 
    OR title_de ILIKE '%erinnerung%'
    OR title_en ILIKE '%photo%'
    OR title_en ILIKE '%video%'
    OR title_en ILIKE '%memor%'
  );
