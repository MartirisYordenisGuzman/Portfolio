-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enums
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');

-- 1. Profiles Table (Linked to Auth)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  updated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Projects Table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,  
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  content TEXT, -- MDX or Markdown body
  cover_image TEXT,
  github_url TEXT,
  demo_url TEXT,
  featured BOOLEAN DEFAULT false,
  status content_status DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Blog Posts Table
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT,
  cover_image TEXT,
  reading_time_minutes INT,
  status content_status DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Tags Table
CREATE TABLE public.tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon_path TEXT
);

-- 5. Pivot Tables
CREATE TABLE public.project_tags (
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, tag_id)
);

CREATE TABLE public.post_tags (
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- 6. Contact Messages
CREATE TABLE public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin (You can hardcode your UUID here or use a whitelist table)
-- For simplicity, we assume the first user or specific EMAIL is admin, or we just allow Authenticated users to write (assuming only YOU have an account).
-- Best practice: Allow 'authenticated' role to write (since you disable signups in Supabase dashboard).

-- Policies

-- Projects: Public read published only
CREATE POLICY "Public projects are viewable by everyone" ON public.projects
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can do everything on projects" ON public.projects
  FOR ALL TO authenticated USING (true);

-- Posts: Public read published only
CREATE POLICY "Public posts are viewable by everyone" ON public.posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can do everything on posts" ON public.posts
  FOR ALL TO authenticated USING (true);

-- Tags: Public read all
CREATE POLICY "Tags are viewable by everyone" ON public.tags
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert tags" ON public.tags
  FOR ALL TO authenticated USING (true);

-- Contacts: Public insert only (Anon)
CREATE POLICY "Public can insert contact messages" ON public.contacts
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Admins can view messages" ON public.contacts
  FOR SELECT TO authenticated USING (true);

-- Storage (Buckets) - Optional setup via SQL
-- INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true);
