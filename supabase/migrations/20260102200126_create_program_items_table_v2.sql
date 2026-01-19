/*
  # Create Program Items Table

  1. New Tables
    - `program_items`
      - `id` (uuid, primary key)
      - `event_id` (uuid, foreign key to events) - Which event this program item belongs to
      - `title` (text) - Name of the program item
      - `type` (text) - Type like "Ceremony", "Reception", "Transport", "Photos", etc.
      - `start_time` (time) - Start time of the program item
      - `end_time` (time) - End time of the program item
      - `duration_minutes` (integer) - Duration in minutes
      - `location` (text) - Where this program item takes place
      - `description` (text) - Additional details
      - `order_index` (integer) - For sorting program items
      - `notes` (text) - Internal notes
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `program_items` table
    - Add policies for anonymous users to perform all operations
    
  3. Purpose
    - Allows detailed agenda/program planning within each event
    - Couples can add multiple program items to structure their event day
    - Templates available for common program items
*/

CREATE TABLE IF NOT EXISTS program_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL DEFAULT '',
  type text DEFAULT '',
  start_time time,
  end_time time,
  duration_minutes integer DEFAULT 0,
  location text DEFAULT '',
  description text DEFAULT '',
  order_index integer DEFAULT 0,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE program_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous users to view program items" ON program_items;
DROP POLICY IF EXISTS "Allow anonymous users to insert program items" ON program_items;
DROP POLICY IF EXISTS "Allow anonymous users to update program items" ON program_items;
DROP POLICY IF EXISTS "Allow anonymous users to delete program items" ON program_items;

CREATE POLICY "Allow anonymous users to view program items"
  ON program_items
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anonymous users to insert program items"
  ON program_items
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous users to update program items"
  ON program_items
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow anonymous users to delete program items"
  ON program_items
  FOR DELETE
  TO anon
  USING (true);

CREATE INDEX IF NOT EXISTS idx_program_items_event_id ON program_items(event_id);
CREATE INDEX IF NOT EXISTS idx_program_items_order ON program_items(event_id, order_index);