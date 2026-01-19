/*
  # Add Event Participation Tracking to Vendor Event Day Contacts

  1. Changes to vendor_event_day_contacts table
    - Add `event_ids` (uuid array) - tracks which events this contact attends
    - Add `catering_event_ids` (uuid array) - tracks at which events this contact participates in catering
  
  2. Notes
    - Both fields are optional arrays that default to empty
    - The event IDs reference the events table
    - This allows granular tracking of which contacts attend which specific events
    - Separate tracking for event attendance vs. catering participation
*/

-- Add event participation tracking columns
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendor_event_day_contacts' AND column_name = 'event_ids'
  ) THEN
    ALTER TABLE vendor_event_day_contacts 
    ADD COLUMN event_ids uuid[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendor_event_day_contacts' AND column_name = 'catering_event_ids'
  ) THEN
    ALTER TABLE vendor_event_day_contacts 
    ADD COLUMN catering_event_ids uuid[] DEFAULT '{}';
  END IF;
END $$;