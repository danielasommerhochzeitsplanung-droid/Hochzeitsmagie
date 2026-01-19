/*
  # Add catering participation field to vendors table

  ## Overview
  This migration adds a field to track whether a vendor participates in catering
  at the event location. This is common for vendors who are on-site during the
  wedding day and receive meals as part of their service.

  ## Changes to `vendors` table
  
  **New Field:**
  - `participates_in_catering` (boolean, default false) - Indicates if the vendor
    receives meals from the catering service at the event

  ## Notes
  - Defaults to false as most vendors do not participate in catering
  - Particularly relevant for photographers, videographers, DJs, and other on-site vendors
*/

-- Add catering participation field
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendors' AND column_name = 'participates_in_catering'
  ) THEN
    ALTER TABLE vendors ADD COLUMN participates_in_catering boolean DEFAULT false;
  END IF;
END $$;
