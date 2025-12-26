-- Create Project Images Table (Gallery)
CREATE TABLE public.project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Policies for Project Images
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public project images are viewable by everyone" ON public.project_images
  FOR SELECT USING (true);

-- Admin write access (authenticated)
CREATE POLICY "Admins can insert project images" ON public.project_images
  FOR ALL TO authenticated USING (true);
