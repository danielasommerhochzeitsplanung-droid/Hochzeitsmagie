/*
  # Fix Category Names: ceremony_formalities → ceremony_legal, location_flow → location_venue

  ## Changes
  1. Update all tasks with category 'ceremony_formalities' to 'ceremony_legal'
  2. Update all tasks with category 'location_flow' to 'location_venue'
  3. Update all i18n_key references to match new category names

  ## Affected Records
  - master_tasks table: category field
  - master_tasks table: i18n_key field (replace ceremony_formalities → ceremony_legal, location_flow → location_venue)

  ## Purpose
  Align database category names with frontend code expectations to fix task loading issues
*/

-- Update category from ceremony_formalities to ceremony_legal
UPDATE master_tasks
SET category = 'ceremony_legal'
WHERE category = 'ceremony_formalities';

-- Update category from location_flow to location_venue
UPDATE master_tasks
SET category = 'location_venue'
WHERE category = 'location_flow';

-- Update i18n_key references for ceremony_formalities → ceremony_legal
UPDATE master_tasks
SET i18n_key = REPLACE(i18n_key, 'master_tasks.ceremony_formalities.', 'master_tasks.ceremony_legal.')
WHERE i18n_key LIKE 'master_tasks.ceremony_formalities.%';

-- Update i18n_key references for location_flow → location_venue
UPDATE master_tasks
SET i18n_key = REPLACE(i18n_key, 'master_tasks.location_flow.', 'master_tasks.location_venue.')
WHERE i18n_key LIKE 'master_tasks.location_flow.%';