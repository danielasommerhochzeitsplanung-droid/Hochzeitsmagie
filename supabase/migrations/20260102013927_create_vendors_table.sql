/*
  # Create vendors (Dienstleister) table

  ## Overview
  This migration creates a comprehensive vendors/suppliers management system for wedding planning.
  It allows tracking all service providers (Gewerke) with complete contact information, status tracking,
  pricing, and appointment management.

  ## New Tables
  
  ### `vendors`
  Main table for managing wedding service providers
  
  **Basic Information:**
  - `id` (uuid, primary key) - Unique identifier
  - `created_at` (timestamptz) - Record creation timestamp
  - `category` (text, required) - Service category (Gewerk): Location, Catering, Fotograf, etc.
  - `company_name` (text, required) - Company or business name
  - `contact_person` (text) - Name of contact person
  
  **Contact Details:**
  - `phone` (text) - Mobile/phone number
  - `email` (text) - Email address
  - `website` (text) - Website URL
  - `social_media` (text) - Social media handles/links
  - `address` (text) - Physical address
  
  **Scheduling:**
  - `first_contact_date` (date) - Date of initial contact
  - `next_appointment` (timestamptz) - Next scheduled meeting/appointment
  
  **Status & Progress:**
  - `status` (text, default 'Angefragt') - Current status: Angefragt, Angebot erhalten, Zugesagt, Gebucht, Bezahlt, Abgesagt
  - `contract_status` (text) - Contract status: Vertrag erhalten, Unterschrieben, etc.
  
  **Financial:**
  - `price_estimate` (numeric) - Initial price quote
  - `final_price` (numeric) - Final agreed price
  - `payment_status` (text) - Payment tracking: Anzahlung geleistet, Restbetrag, Vollständig bezahlt
  
  **Additional Info:**
  - `recommendation_source` (text) - Where the recommendation came from
  - `rating` (integer) - Personal rating 1-5
  - `notes` (text) - Free text for details, impressions, special requirements
  
  ## Security
  
  Row Level Security (RLS) is enabled with policies allowing:
  - Anonymous users can view all vendors
  - Anonymous users can insert new vendors
  - Anonymous users can update vendor records
  - Anonymous users can delete vendors
  
  Note: This follows the same pattern as the guests table for consistent access control.
*/

-- Create vendors table
CREATE TABLE IF NOT EXISTS vendors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  
  -- Basic information
  category text NOT NULL,
  company_name text NOT NULL,
  contact_person text,
  
  -- Contact details
  phone text,
  email text,
  website text,
  social_media text,
  address text,
  
  -- Scheduling
  first_contact_date date,
  next_appointment timestamptz,
  
  -- Status tracking
  status text DEFAULT 'Angefragt',
  contract_status text,
  
  -- Financial
  price_estimate numeric(10, 2),
  final_price numeric(10, 2),
  payment_status text,
  
  -- Additional information
  recommendation_source text,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  notes text
);

-- Enable Row Level Security
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to view all vendors
CREATE POLICY "Allow anonymous select on vendors"
  ON vendors
  FOR SELECT
  TO anon
  USING (true);

-- Allow anonymous users to insert vendors
CREATE POLICY "Allow anonymous insert on vendors"
  ON vendors
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous users to update vendors
CREATE POLICY "Allow anonymous update on vendors"
  ON vendors
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Allow anonymous users to delete vendors
CREATE POLICY "Allow anonymous delete on vendors"
  ON vendors
  FOR DELETE
  TO anon
  USING (true);