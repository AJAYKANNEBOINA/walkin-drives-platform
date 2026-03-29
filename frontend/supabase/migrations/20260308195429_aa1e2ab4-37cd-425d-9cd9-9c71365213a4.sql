
-- Drop the restrictive SELECT policies
DROP POLICY IF EXISTS "Anyone can view approved drives" ON public.drives;
DROP POLICY IF EXISTS "Admins can view all drives" ON public.drives;

-- Recreate as PERMISSIVE policies
CREATE POLICY "Anyone can view approved drives"
ON public.drives FOR SELECT
USING (approval_status = 'approved');

CREATE POLICY "Admins can view all drives"
ON public.drives FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));
