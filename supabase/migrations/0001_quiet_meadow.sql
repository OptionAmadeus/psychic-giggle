/*
  # Initial Schema Setup

  1. Tables
    - Creates waitlist table for early access signups
    - Includes email, name, confirmation status tracking
  
  2. Security
    - Enables RLS
    - Adds policies for public access
    - Creates indexes for performance
*/

-- Create waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  confirmed boolean DEFAULT false,
  confirmation_token uuid DEFAULT gen_random_uuid(),
  confirmation_sent_at timestamptz,
  position serial
);

-- Enable RLS
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Enable insert for all users" ON public.waitlist;
DROP POLICY IF EXISTS "Enable read for all users" ON public.waitlist;

-- Create new policies
CREATE POLICY "Enable insert for all users" ON public.waitlist
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Enable read for all users" ON public.waitlist
  FOR SELECT TO anon
  USING (true);

-- Drop existing index if any
DROP INDEX IF EXISTS idx_waitlist_email;

-- Create the index
CREATE INDEX idx_waitlist_email ON public.waitlist(email);
