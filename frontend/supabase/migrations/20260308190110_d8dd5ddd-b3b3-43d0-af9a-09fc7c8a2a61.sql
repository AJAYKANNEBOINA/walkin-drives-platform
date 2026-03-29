
-- Make email subscribers insert policy more restrictive (require valid email format via app logic, but allow anonymous inserts)
DROP POLICY "Anyone can subscribe" ON public.email_subscribers;
CREATE POLICY "Anyone can subscribe with email" ON public.email_subscribers FOR INSERT WITH CHECK (email IS NOT NULL AND email <> '');
