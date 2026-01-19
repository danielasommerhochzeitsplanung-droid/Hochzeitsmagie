/*
  # Add Child Seating Preferences to Guests

  ## Overview
  This migration adds functionality to manage seating preferences for children in the guests table.
  Children can now be assigned to sit at their parent's table, a designated kids table, or a custom table.

  ## New Columns Added to `guests` Table

  ### Seating Preference Fields:
  - `seating_preference` (text, default 'parent_table') - Seating preference for children:
    - 'parent_table': Child sits at their parent's table (default)
    - 'kids_table': Child sits at a designated kids table
    - 'custom_table': Child sits at a specific custom table
  - `custom_table_id` (uuid, nullable) - References a specific table when seating_preference is 'custom_table'

  ## Features Enabled

  1. **Flexible Seating Options:**
     - Children can be assigned to sit with parents by default
     - Option to group children at a dedicated kids table
     - Flexibility to assign children to any custom table (e.g., grandparents' table)

  2. **Automatic Integration:**
     - Works seamlessly with existing seating assignment system
     - Children are counted in table occupancy statistics
     - Preferences can be changed at any time

  ## Security
  - RLS policies remain unchanged - children follow same access rules as adult guests
  - Foreign key ensures data integrity for table references
*/

-- Add seating preference fields to guests table
DO $$
BEGIN
  -- Add seating_preference field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'seating_preference'
  ) THEN
    ALTER TABLE guests ADD COLUMN seating_preference text DEFAULT 'parent_table' CHECK (seating_preference IN ('parent_table', 'kids_table', 'custom_table'));
  END IF;

  -- Add custom_table_id field with foreign key to tables
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'custom_table_id'
  ) THEN
    ALTER TABLE guests ADD COLUMN custom_table_id uuid REFERENCES tables(id) ON DELETE SET NULL;
    CREATE INDEX IF NOT EXISTS idx_guests_custom_table_id ON guests(custom_table_id);
  END IF;
END $$;

-- Add comments explaining the seating preference structure
COMMENT ON COLUMN guests.seating_preference IS 'Seating preference for children: parent_table, kids_table, or custom_table';
COMMENT ON COLUMN guests.custom_table_id IS 'References the specific table when seating_preference is custom_table';