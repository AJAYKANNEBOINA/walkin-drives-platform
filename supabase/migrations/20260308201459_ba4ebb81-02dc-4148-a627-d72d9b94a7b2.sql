
-- Fix restrictive UPDATE/DELETE policies for admins
DROP POLICY IF EXISTS "Admins can update drives" ON public.drives;
DROP POLICY IF EXISTS "Admins can delete drives" ON public.drives;

CREATE POLICY "Admins can update drives"
ON public.drives FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete drives"
ON public.drives FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'));
