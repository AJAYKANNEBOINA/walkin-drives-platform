# WALKINS Platform - Product Requirements Document

## Overview
WALKINS is India's first dedicated Walk-in Drive Platform — a one-stop solution for job seekers to find verified walk-in interviews across India.

## Architecture
- **Frontend**: React + TypeScript + Vite + Tailwind CSS + shadcn/ui + Framer Motion
- **Backend**: FastAPI (Python) acting as API proxy to Supabase
- **Database**: Supabase PostgreSQL (all data stored in Supabase)
- **Auth**: Supabase Auth (email/password with email verification)
- **Email**: Resend API for application confirmation emails
- **Hosting**: Emergent Platform

## Supabase Configuration
- Project ID: `lieymuvftztftprrkzsv`
- URL: `https://lieymuvftztftprrkzsv.supabase.co`
- Tables: drives, email_subscribers, profiles, user_roles, applications
- RLS enabled on all tables

## Key Features
1. **Authentication** - Email/password signup with Supabase email verification
2. **Admin Dashboard** - Full CRUD for drives (add/edit/delete/approve/reject)
3. **Search & Filters** - Search by company/role/skill, filter by city/industry
4. **Location-Based Listing** - City tabs for quick filtering
5. **Apply Functionality** - In-app form or redirect to external URL
6. **Email Notifications** - Application confirmation via Resend
7. **Auto-Expiry** - Admin can cleanup expired drives with one click
8. **Email Subscriptions** - Newsletter signup from landing page

## Admin Credentials
- Email: admin@walkins.in
- Password: WalkinsAdmin@2026

## API Endpoints
- GET /api/drives - Public drives with search/filter
- GET /api/drives/{id} - Drive detail
- GET /api/cities - City list with counts
- POST /api/applications - Submit application
- POST /api/subscribe - Email subscription
- GET /api/check-admin - Admin verification
- GET/POST/PATCH/DELETE /api/admin/* - Admin operations

## Environment Variables
### Frontend (.env)
- VITE_SUPABASE_PROJECT_ID
- VITE_SUPABASE_PUBLISHABLE_KEY
- VITE_SUPABASE_URL
- REACT_APP_BACKEND_URL

### Backend (.env)
- SUPABASE_URL
- SUPABASE_SERVICE_KEY
- SUPABASE_ANON_KEY
- RESEND_API_KEY
