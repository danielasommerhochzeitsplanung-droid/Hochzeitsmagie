/*
  # Fix RLS Policies for Anonymous Users
  
  1. Changes
    - Drop existing policies that only allow authenticated users
    - Create new policies that allow anonymous (anon) users to access guests table
    - This enables the wedding management app to work without authentication
  
  2. Security Note
    - The app is designed for single-user/private use without authentication
    - All CRUD operations are allowed for anonymous users
    - In production, consider adding authentication if multiple users need access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can read guests" ON guests;
DROP POLICY IF EXISTS "Authenticated users can insert guests" ON guests;
DROP POLICY IF EXISTS "Authenticated users can update guests" ON guests;
DROP POLICY IF EXISTS "Authenticated users can delete guests" ON guests;

-- Create new policies for anonymous users
CREATE POLICY "Anonymous users can read guests"
  ON guests FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anonymous users can insert guests"
  ON guests FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anonymous users can update guests"
  ON guests FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anonymous users can delete guests"
  ON guests FOR DELETE
  TO anon
  USING (true);
