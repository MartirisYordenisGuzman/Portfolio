-- RLS Policies for Tags and Pivot Tables

-- 1. Tags Table
-- Allow everyone to read tags
CREATE POLICY "Public read tags"
ON public.tags FOR SELECT
USING (true);

-- Allow authenticated users (admins) to insert/update/delete tags
CREATE POLICY "Admins can manage tags"
ON public.tags FOR ALL
TO authenticated
USING (true);

-- 2. Project Tags Pivot Table
-- Allow everyone to read project tags
CREATE POLICY "Public read project_tags"
ON public.project_tags FOR SELECT
USING (true);

-- Allow admins to manage project tags
CREATE POLICY "Admins can manage project_tags"
ON public.project_tags FOR ALL
TO authenticated
USING (true);

-- 3. Post Tags Pivot Table
-- Allow everyone to read post tags
CREATE POLICY "Public read post_tags"
ON public.post_tags FOR SELECT
USING (true);

-- Allow admins to manage post tags
CREATE POLICY "Admins can manage post_tags"
ON public.post_tags FOR ALL
TO authenticated
USING (true);
