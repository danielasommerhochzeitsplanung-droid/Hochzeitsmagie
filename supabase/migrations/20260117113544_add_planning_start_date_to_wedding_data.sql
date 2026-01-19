/*
  # Add planning start date to wedding_data

  ## Changes
  1. New Columns
    - `planning_start_date` (date) - The date when wedding planning begins
      - Used to distribute tasks between planning start and wedding date
      - Defaults to NULL (will be set when generating tasks)
  
  ## Notes
  - This field allows couples to specify when they start planning
  - Tasks will be distributed proportionally between this date and the wedding date
  - Useful for couples who start planning later than 1 year before the wedding
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'wedding_data' AND column_name = 'planning_start_date'
  ) THEN
    ALTER TABLE wedding_data ADD COLUMN planning_start_date date;
  END IF;
END $$;
