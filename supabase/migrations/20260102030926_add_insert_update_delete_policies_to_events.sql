/*
  # Add INSERT, UPDATE, DELETE policies for events table

  1. Changes
    - Add INSERT policy to allow public users to create events
    - Add UPDATE policy to allow public users to modify events
    - Add DELETE policy to allow public users to delete events
  
  2. Security
    - Policies allow anonymous/public access for full CRUD operations
    - Consistent with existing SELECT policy that allows public read access
*/

-- Allow public users to insert events
CREATE POLICY "Events are publicly insertable"
  ON events
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow public users to update events
CREATE POLICY "Events are publicly updatable"
  ON events
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Allow public users to delete events
CREATE POLICY "Events are publicly deletable"
  ON events
  FOR DELETE
  TO public
  USING (true);
