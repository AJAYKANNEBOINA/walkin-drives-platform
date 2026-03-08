
-- Drop the restrictive INSERT policies
DROP POLICY IF EXISTS "Admins can insert drives" ON public.drives;
DROP POLICY IF EXISTS "Authenticated users can insert drives" ON public.drives;

-- Recreate as PERMISSIVE policies
-- Any authenticated user can insert drives (they go to pending)
CREATE POLICY "Authenticated users can insert drives"
ON public.drives FOR INSERT
TO authenticated
WITH CHECK (true);

-- Admins can also insert
CREATE POLICY "Admins can insert drives"
ON public.drives FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'));
