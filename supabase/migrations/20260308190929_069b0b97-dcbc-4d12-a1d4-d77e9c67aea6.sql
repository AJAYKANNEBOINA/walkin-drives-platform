
-- Fix RLS policies - they were created as RESTRICTIVE instead of PERMISSIVE
-- Drop all existing drive policies
DROP POLICY "Anyone can view approved drives" ON public.drives;
DROP POLICY "Admins can view all drives" ON public.drives;
DROP POLICY "Admins can insert drives" ON public.drives;
DROP POLICY "Admins can update drives" ON public.drives;
DROP POLICY "Admins can delete drives" ON public.drives;

-- Drop email subscriber policies
DROP POLICY "Admins can view subscribers" ON public.email_subscribers;
DROP POLICY "Anyone can subscribe with email" ON public.email_subscribers;

-- Drop profile policies
DROP POLICY "Users can view their own profile" ON public.profiles;
DROP POLICY "Users can insert their own profile" ON public.profiles;
DROP POLICY "Users can update their own profile" ON public.profiles;

-- Drop user_roles policies
DROP POLICY "Users can view their own roles" ON public.user_roles;
DROP POLICY "Admins can manage roles" ON public.user_roles;

-- Recreate all as PERMISSIVE (default)
-- Drives
CREATE POLICY "Anyone can view approved drives" ON public.drives FOR SELECT USING (approval_status = 'approved');
CREATE POLICY "Admins can view all drives" ON public.drives FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert drives" ON public.drives FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update drives" ON public.drives FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete drives" ON public.drives FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Email subscribers
CREATE POLICY "Anyone can subscribe" ON public.email_subscribers FOR INSERT WITH CHECK (email IS NOT NULL AND email <> '');
CREATE POLICY "Admins can view subscribers" ON public.email_subscribers FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- User roles
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
