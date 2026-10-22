-- ============================================================================
-- LAKSHMANAN GOLD WORKS — SUPABASE DATABASE & STORAGE SCHEMA
-- ============================================================================
-- Instructions:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard
-- 2. Select your Project (lakshmanan-jewels) -> SQL Editor -> New query
-- 3. Paste this entire SQL file and click "Run" (or Ctrl + Enter).
-- ============================================================================

-- 1. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,
  status TEXT DEFAULT 'Active',
  featured BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Ensure all columns exist even if table was created previously
ALTER TABLE IF EXISTS public.categories ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE IF EXISTS public.categories ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE IF EXISTS public.categories ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE IF EXISTS public.categories ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE IF EXISTS public.categories ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Active';
ALTER TABLE IF EXISTS public.categories ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT true;
ALTER TABLE IF EXISTS public.categories ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
ALTER TABLE IF EXISTS public.categories ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();
ALTER TABLE IF EXISTS public.categories ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- Ensure indexes for categories
CREATE UNIQUE INDEX IF NOT EXISTS idx_categories_slug_unique ON public.categories (slug);
CREATE INDEX IF NOT EXISTS idx_categories_status ON public.categories (status);

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT,
  style TEXT DEFAULT 'traditional',
  occasion TEXT DEFAULT 'Wedding',
  weight_range TEXT,
  description TEXT,
  images TEXT[] DEFAULT '{}',
  price NUMERIC NULL,
  weight TEXT DEFAULT '15.0g',
  purity TEXT DEFAULT '22 KT',
  availability TEXT DEFAULT 'In Stock',
  status TEXT DEFAULT 'Active',
  featured BOOLEAN DEFAULT false,
  new_arrival BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Ensure all product columns exist even if table was created previously
ALTER TABLE IF EXISTS public.products ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE IF EXISTS public.products ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE IF EXISTS public.products ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE IF EXISTS public.products ADD COLUMN IF NOT EXISTS style TEXT DEFAULT 'traditional';
ALTER TABLE IF EXISTS public.products ADD COLUMN IF NOT EXISTS occasion TEXT DEFAULT 'Wedding';
ALTER TABLE IF EXISTS public.products ADD COLUMN IF NOT EXISTS weight_range TEXT;
ALTER TABLE IF EXISTS public.products ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE IF EXISTS public.products ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}';
ALTER TABLE IF EXISTS public.products ADD COLUMN IF NOT EXISTS price NUMERIC;
ALTER TABLE IF EXISTS public.products ADD COLUMN IF NOT EXISTS weight TEXT DEFAULT '15.0g';
ALTER TABLE IF EXISTS public.products ADD COLUMN IF NOT EXISTS purity TEXT DEFAULT '22 KT';
ALTER TABLE IF EXISTS public.products ADD COLUMN IF NOT EXISTS availability TEXT DEFAULT 'In Stock';
ALTER TABLE IF EXISTS public.products ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Active';
ALTER TABLE IF EXISTS public.products ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
ALTER TABLE IF EXISTS public.products ADD COLUMN IF NOT EXISTS new_arrival BOOLEAN DEFAULT false;
ALTER TABLE IF EXISTS public.products ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
ALTER TABLE IF EXISTS public.products ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT true;
ALTER TABLE IF EXISTS public.products ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();
ALTER TABLE IF EXISTS public.products ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- Ensure indexes for products
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products (slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products (category);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products (status);
CREATE INDEX IF NOT EXISTS idx_products_published ON public.products (published);

-- 3. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 4. RLS POLICIES FOR CATEGORIES
DROP POLICY IF EXISTS "Allow public read access on categories" ON public.categories;
DROP POLICY IF EXISTS "Allow authenticated admin full access on categories" ON public.categories;
DROP POLICY IF EXISTS "Allow admin operations on categories" ON public.categories;
DROP POLICY IF EXISTS "Allow all category access" ON public.categories;

-- Allow public read access to categories
CREATE POLICY "Allow public read access on categories"
  ON public.categories
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow authenticated admin full write access on categories
CREATE POLICY "Allow authenticated admin full access on categories"
  ON public.categories
  FOR ALL
  TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- 5. RLS POLICIES FOR PRODUCTS
DROP POLICY IF EXISTS "Allow public read published products" ON public.products;
DROP POLICY IF EXISTS "Allow authenticated admin full access on products" ON public.products;
DROP POLICY IF EXISTS "Allow admin operations on products" ON public.products;
DROP POLICY IF EXISTS "Allow all product access" ON public.products;

-- Allow public read access to published products (and admin can see all)
CREATE POLICY "Allow public read published products"
  ON public.products
  FOR SELECT
  TO anon, authenticated
  USING (published = true OR auth.role() = 'authenticated');

-- Allow authenticated admin full write access on products
CREATE POLICY "Allow authenticated admin full access on products"
  ON public.products
  FOR ALL
  TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- 6. STORAGE BUCKET CONFIGURATION ('jewellery-images')
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'jewellery-images',
  'jewellery-images',
  true,
  20971520, -- 20MB limit per image
  null -- Accept all image types (jpeg, png, webp, heic, gif, svg)
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 20971520,
  allowed_mime_types = null;

-- Clean existing storage policies on jewellery-images
DROP POLICY IF EXISTS "Public can view jewellery images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated admins can upload jewellery images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated admins can update jewellery images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated admins can delete jewellery images" ON storage.objects;
DROP POLICY IF EXISTS "Allow upload jewellery images" ON storage.objects;
DROP POLICY IF EXISTS "Allow update jewellery images" ON storage.objects;
DROP POLICY IF EXISTS "Allow delete jewellery images" ON storage.objects;
DROP POLICY IF EXISTS "Allow all jewellery images read" ON storage.objects;
DROP POLICY IF EXISTS "Allow all jewellery images write" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read jewellery images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated admin manage jewellery images" ON storage.objects;

-- Allow public read access to jewellery-images bucket
CREATE POLICY "Allow public read jewellery images"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'jewellery-images');

-- Allow authenticated admin write operations on jewellery-images bucket
CREATE POLICY "Allow authenticated admin manage jewellery images"
  ON storage.objects
  FOR ALL
  TO authenticated
  USING (bucket_id = 'jewellery-images' AND auth.role() = 'authenticated')
  WITH CHECK (bucket_id = 'jewellery-images' AND auth.role() = 'authenticated');

-- 7. ENABLE REALTIME SYNC ACROSS ALL DEVICES
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'categories'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.categories;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'products'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
  END IF;
END $$;

-- 8. AUTO-CONFIRM OWNER EMAIL FOR IMMEDIATE AUTHENTICATION
UPDATE auth.users 
SET email_confirmed_at = COALESCE(email_confirmed_at, now())
WHERE email = 'surinathan770@gmail.com';
