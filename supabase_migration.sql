-- =============================================
-- WALKINS Platform - Complete Database Setup
-- Run this in Supabase SQL Editor (one time only)
-- =============================================

-- 1. Create ENUM for roles
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'user');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2. Create drives table
CREATE TABLE IF NOT EXISTS public.drives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  company_initials TEXT,
  company_about TEXT,
  company_address TEXT,
  city TEXT NOT NULL,
  date TEXT NOT NULL,
  start_time TEXT,
  end_time TEXT,
  venue_name TEXT,
  venue_address TEXT,
  roles TEXT[],
  eligibility TEXT,
  salary_min INTEGER,
  salary_max INTEGER,
  experience_min INTEGER,
  experience_max INTEGER,
  documents_required TEXT[],
  registration_count INTEGER DEFAULT 0,
  openings INTEGER,
  is_verified BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'upcoming',
  industry TEXT,
  department TEXT,
  employment_type TEXT,
  education TEXT,
  key_skills TEXT[],
  job_description TEXT,
  specifications TEXT[],
  rating NUMERIC,
  review_count INTEGER,
  approval_status TEXT DEFAULT 'pending',
  posted_by UUID REFERENCES auth.users(id),
  apply_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create email_subscribers table
CREATE TABLE IF NOT EXISTS public.email_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  city TEXT,
  resume_url TEXT,
  skills TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Create user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL DEFAULT 'user',
  UNIQUE(user_id, role)
);

-- 6. Create applications table (for Apply functionality)
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  drive_id UUID NOT NULL REFERENCES public.drives(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  resume_url TEXT,
  cover_note TEXT,
  status TEXT DEFAULT 'submitted',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Enable Row Level Security
ALTER TABLE public.drives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- 8. RLS Policies for drives
CREATE POLICY "Anyone can view approved drives" ON public.drives
  FOR SELECT USING (approval_status = 'approved');

CREATE POLICY "Service role full access drives" ON public.drives
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Admins can manage all drives" ON public.drives
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Users can insert drives" ON public.drives
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- 9. RLS Policies for email_subscribers
CREATE POLICY "Anyone can subscribe" ON public.email_subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role full access subscribers" ON public.email_subscribers
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Admins can view subscribers" ON public.email_subscribers
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- 10. RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role full access profiles" ON public.profiles
  FOR ALL USING (auth.role() = 'service_role');

-- 11. RLS Policies for user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role full access roles" ON public.user_roles
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- 12. RLS Policies for applications
CREATE POLICY "Users can submit applications" ON public.applications
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL OR auth.uid() IS NULL);

CREATE POLICY "Users can view own applications" ON public.applications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role full access applications" ON public.applications
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Admins can view all applications" ON public.applications
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- 13. Create has_role function
CREATE OR REPLACE FUNCTION public.has_role(_role public.app_role, _user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
END;
$$;

-- 14. Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Apply updated_at triggers
CREATE TRIGGER set_drives_updated_at
  BEFORE UPDATE ON public.drives
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 15. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_drives_city ON public.drives(city);
CREATE INDEX IF NOT EXISTS idx_drives_date ON public.drives(date);
CREATE INDEX IF NOT EXISTS idx_drives_status ON public.drives(status);
CREATE INDEX IF NOT EXISTS idx_drives_approval ON public.drives(approval_status);
CREATE INDEX IF NOT EXISTS idx_drives_industry ON public.drives(industry);
CREATE INDEX IF NOT EXISTS idx_user_roles_user ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_drive ON public.applications(drive_id);
CREATE INDEX IF NOT EXISTS idx_applications_user ON public.applications(user_id);

-- Done! Tables created successfully.
SELECT 'All tables created successfully!' as result;
