-- ============================================================================
-- LAKSHMANAN GOLD WORKS — SUPABASE DATABASE & STORAGE SCHEMA
-- ============================================================================
-- Instructions:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard
-- 2. Select your Project -> SQL Editor -> New query
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

-- Index for fast category lookups
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories (slug);
CREATE INDEX IF NOT EXISTS idx_categories_status ON public.categories (status);

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT REFERENCES public.categories(slug) ON UPDATE CASCADE ON DELETE SET NULL,
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

-- Indexes for products
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products (slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products (category);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products (status);
CREATE INDEX IF NOT EXISTS idx_products_published ON public.products (published);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products (featured);
CREATE INDEX IF NOT EXISTS idx_products_new_arrival ON public.products (new_arrival);

-- 3. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 4. RLS POLICIES FOR CATEGORIES
DROP POLICY IF EXISTS "Allow public read access on categories" ON public.categories;
DROP POLICY IF EXISTS "Allow authenticated admin full access on categories" ON public.categories;

-- Anyone (visitors and customers) can view active/published categories
CREATE POLICY "Allow public read access on categories"
  ON public.categories
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated admins can insert, update, or delete categories
CREATE POLICY "Allow authenticated admin full access on categories"
  ON public.categories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 5. RLS POLICIES FOR PRODUCTS
DROP POLICY IF EXISTS "Allow public read published products" ON public.products;
DROP POLICY IF EXISTS "Allow authenticated admin full access on products" ON public.products;

-- Visitors can only read published products; authenticated admins can read all
CREATE POLICY "Allow public read published products"
  ON public.products
  FOR SELECT
  TO anon, authenticated
  USING (published = true OR auth.role() = 'authenticated');

-- Only authenticated admins can insert, update, or delete products
CREATE POLICY "Allow authenticated admin full access on products"
  ON public.products
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 6. STORAGE BUCKET CONFIGURATION ('jewellery-images')
-- Ensure bucket exists and is public
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'jewellery-images',
  'jewellery-images',
  true,
  10485760, -- 10MB limit per image
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop existing storage policies on jewellery-images if any
DROP POLICY IF EXISTS "Public can view jewellery images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated admins can upload jewellery images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated admins can update jewellery images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated admins can delete jewellery images" ON storage.objects;

-- Allow public read access to jewellery-images bucket
CREATE POLICY "Public can view jewellery images"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'jewellery-images');

-- Allow authenticated admin to upload images
CREATE POLICY "Authenticated admins can upload jewellery images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'jewellery-images');

-- Allow authenticated admin to update images
CREATE POLICY "Authenticated admins can update jewellery images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'jewellery-images');

-- Allow authenticated admin to delete images
CREATE POLICY "Authenticated admins can delete jewellery images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'jewellery-images');
