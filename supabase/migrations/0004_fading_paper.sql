-- Enable RLS
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Enable insert for all users" ON public.waitlist;
DROP POLICY IF EXISTS "Enable read for all users" ON public.waitlist;

-- Create new policies
CREATE POLICY "Enable insert for all users"
ON public.waitlist FOR INSERT
WITH CHECK (true);

CREATE POLICY "Enable read for all users"
ON public.waitlist FOR SELECT
USING (true);
