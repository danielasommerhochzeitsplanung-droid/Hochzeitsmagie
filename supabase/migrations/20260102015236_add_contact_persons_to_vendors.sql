/*
  # Add separate contact persons for planning and event day to vendors table

  ## Overview
  This migration extends the vendors table to support two distinct contact persons:
  one for the planning phase and one for the actual event day.

  ## Changes to `vendors` table
  
  **New Contact Fields for Planning:**
  - `contact_person_planning` (text) - Name of contact person during planning phase
  - `phone_planning` (text) - Phone number for planning contact
  - `email_planning` (text) - Email address for planning contact
  
  **New Contact Fields for Event Day:**
  - `contact_person_event_day` (text) - Name of contact person on the event day
  - `phone_event_day` (text) - Phone number for event day contact
  - `email_event_day` (text) - Email address for event day contact

  ## Notes
  - The original `contact_person` field is kept for backward compatibility
  - All new fields are optional to allow gradual migration
*/

-- Add planning contact person fields
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendors' AND column_name = 'contact_person_planning'
  ) THEN
    ALTER TABLE vendors ADD COLUMN contact_person_planning text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendors' AND column_name = 'phone_planning'
  ) THEN
    ALTER TABLE vendors ADD COLUMN phone_planning text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendors' AND column_name = 'email_planning'
  ) THEN
    ALTER TABLE vendors ADD COLUMN email_planning text;
  END IF;
END $$;

-- Add event day contact person fields
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendors' AND column_name = 'contact_person_event_day'
  ) THEN
    ALTER TABLE vendors ADD COLUMN contact_person_event_day text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendors' AND column_name = 'phone_event_day'
  ) THEN
    ALTER TABLE vendors ADD COLUMN phone_event_day text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendors' AND column_name = 'email_event_day'
  ) THEN
    ALTER TABLE vendors ADD COLUMN email_event_day text;
  END IF;
END $$;
