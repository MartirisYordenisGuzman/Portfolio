-- Storage Policies for 'portfolio' bucket

-- 1. Allow public read access to the bucket (if not already set via Public Bucket option)
-- Note: 'Public' bucket setting usually handles this, but here is the explicit policy just in case.
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'portfolio' );

-- 2. Allow Authenticated users to Upload (INSERT) files
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'portfolio' );

-- 3. Allow Authenticated users to Update their own uploads (optional, usually not needed for simple covers)
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'portfolio' );

-- 4. Allow Authenticated users to Delete files
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'portfolio' );
