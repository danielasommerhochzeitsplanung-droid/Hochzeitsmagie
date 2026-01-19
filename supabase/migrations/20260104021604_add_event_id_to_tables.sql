/*
  # Add Event Association to Tables

  1. Changes
    - Add `event_id` column to `tables` table (nullable, allows general tables)
    - Add foreign key constraint to `events` table
    - Add index for better query performance
  
  2. Security
    - No RLS policy changes needed (inherits existing policies)
  
  3. Notes
    - Existing tables will have NULL event_id (general tables for all events)
    - New tables can be assigned to specific events
*/

-- Add event_id column to tables
ALTER TABLE tables 
ADD COLUMN IF NOT EXISTS event_id uuid REFERENCES events(id) ON DELETE SET NULL;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_tables_event_id ON tables(event_id);
