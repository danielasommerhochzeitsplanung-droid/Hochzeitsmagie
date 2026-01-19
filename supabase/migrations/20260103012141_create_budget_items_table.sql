/*
  # Create Budget Items Table

  1. New Tables
    - `budget_items`
      - `id` (uuid, primary key)
      - `category` (text) - Budget category (e.g., Catering, Location, Music)
      - `planned_amount` (numeric) - Planned budget amount
      - `actual_amount` (numeric) - Actual spent amount
      - `payment_status` (text) - Payment status: open, paid, partial
      - `due_date` (date) - Payment due date
      - `notes` (text) - Additional notes
      - `vendor_id` (uuid, nullable) - Optional reference to vendors table
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `budget_items` table
    - Add policies for anonymous users to read, insert, update, and delete their budget items
*/

CREATE TABLE IF NOT EXISTS budget_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  planned_amount numeric(10, 2) DEFAULT 0 NOT NULL,
  actual_amount numeric(10, 2) DEFAULT 0 NOT NULL,
  payment_status text DEFAULT 'open' NOT NULL CHECK (payment_status IN ('open', 'paid', 'partial')),
  due_date date,
  notes text DEFAULT '',
  vendor_id uuid REFERENCES vendors(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE budget_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous users to read budget items"
  ON budget_items
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anonymous users to insert budget items"
  ON budget_items
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous users to update budget items"
  ON budget_items
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow anonymous users to delete budget items"
  ON budget_items
  FOR DELETE
  TO anon
  USING (true);