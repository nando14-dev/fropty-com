-- Avatar URL on profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Storage bucket for avatars
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('avatars', 'avatars', true, 2097152, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO NOTHING;

-- RLS: users can only upload / update their own avatar
CREATE POLICY "avatars: self insert"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "avatars: self update"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "avatars: self delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "avatars: public read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');
