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


-- 3. ORDERS & CUSTOM CONSULTATIONS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  contact TEXT NOT NULL,
  email TEXT,
  design_name TEXT NOT NULL,
  design_id TEXT,
  category TEXT,
  requested_weight TEXT,
  base_weight TEXT,
  consultation_type TEXT,
  notes TEXT,
  image TEXT,
  status TEXT DEFAULT 'Order Received',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE IF EXISTS public.orders ADD COLUMN IF NOT EXISTS customer_name TEXT;
ALTER TABLE IF EXISTS public.orders ADD COLUMN IF NOT EXISTS contact TEXT;
ALTER TABLE IF EXISTS public.orders ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE IF EXISTS public.orders ADD COLUMN IF NOT EXISTS design_name TEXT;
ALTER TABLE IF EXISTS public.orders ADD COLUMN IF NOT EXISTS design_id TEXT;
ALTER TABLE IF EXISTS public.orders ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE IF EXISTS public.orders ADD COLUMN IF NOT EXISTS requested_weight TEXT;
ALTER TABLE IF EXISTS public.orders ADD COLUMN IF NOT EXISTS base_weight TEXT;
ALTER TABLE IF EXISTS public.orders ADD COLUMN IF NOT EXISTS consultation_type TEXT;
ALTER TABLE IF EXISTS public.orders ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE IF EXISTS public.orders ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE IF EXISTS public.orders ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Order Received';
ALTER TABLE IF EXISTS public.orders ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();
ALTER TABLE IF EXISTS public.orders ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders (status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders (created_at);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all orders read" ON public.orders;
DROP POLICY IF EXISTS "Allow all orders insert" ON public.orders;
DROP POLICY IF EXISTS "Allow all orders update" ON public.orders;
DROP POLICY IF EXISTS "Allow all orders delete" ON public.orders;

CREATE POLICY "Allow all orders read" ON public.orders FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow all orders insert" ON public.orders FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow all orders update" ON public.orders FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all orders delete" ON public.orders FOR DELETE TO anon, authenticated USING (true);

-- 4. ENABLE ROW LEVEL SECURITY (RLS)
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

-- Allow full write operations on categories
CREATE POLICY "Allow all category access"
  ON public.categories
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- 5. RLS POLICIES FOR PRODUCTS
DROP POLICY IF EXISTS "Allow public read published products" ON public.products;
DROP POLICY IF EXISTS "Allow authenticated admin full access on products" ON public.products;
DROP POLICY IF EXISTS "Allow admin operations on products" ON public.products;
DROP POLICY IF EXISTS "Allow all product access" ON public.products;

-- Allow public read access to published products (and all products to admin)
CREATE POLICY "Allow public read published products"
  ON public.products
  FOR SELECT
  TO anon, authenticated
  USING (published = true OR auth.role() = 'authenticated');

-- Allow full write operations on products
CREATE POLICY "Allow all product access"
  ON public.products
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- 6. STORAGE BUCKET CONFIGURATION ('jewellery-images')
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'jewellery-images',
  'jewellery-images',
  true,
  20971520, -- 20MB limit per image
  null -- Accept all image formats
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

-- Allow image uploads to jewellery-images bucket
CREATE POLICY "Allow upload jewellery images"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'jewellery-images');

-- Allow image updates in jewellery-images bucket
CREATE POLICY "Allow update jewellery images"
  ON storage.objects
  FOR UPDATE
  TO anon, authenticated
  USING (bucket_id = 'jewellery-images')
  WITH CHECK (bucket_id = 'jewellery-images');

-- Allow image deletes in jewellery-images bucket
CREATE POLICY "Allow delete jewellery images"
  ON storage.objects
  FOR DELETE
  TO anon, authenticated
  USING (bucket_id = 'jewellery-images');

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

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'orders'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
  END IF;
END $$;

-- 8. AUTO-PROVISION / AUTO-CONFIRM OWNER ACCOUNT
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

DO $$
DECLARE
  v_user_id UUID;
BEGIN
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'surinathan770@gmail.com';

  IF v_user_id IS NOT NULL THEN
    UPDATE auth.users
    SET 
      encrypted_password = extensions.crypt('Suri@003*', extensions.gen_salt('bf')),
      email_confirmed_at = COALESCE(email_confirmed_at, now()),
      raw_app_meta_data = '{"provider":"email","providers":["email"]}',
      raw_user_meta_data = '{"full_name":"T.L.Suriyanathan"}',
      updated_at = now()
    WHERE id = v_user_id;
  ELSE
    v_user_id := gen_random_uuid();
    
    INSERT INTO auth.users (
      id,
      instance_id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at
    ) VALUES (
      v_user_id,
      '00000000-0000-0000-0000-000000000000',
      'authenticated',
      'authenticated',
      'surinathan770@gmail.com',
      extensions.crypt('Suri@003*', extensions.gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"T.L.Suriyanathan"}',
      now(),
      now()
    );

    INSERT INTO auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      provider_id,
      last_sign_in_at,
      created_at,
      updated_at
    ) VALUES (
      v_user_id,
      v_user_id,
      format('{"sub":"%s","email":"%s"}', v_user_id::text, 'surinathan770@gmail.com')::jsonb,
      'email',
      'surinathan770@gmail.com',
      now(),
      now(),
      now()
    );
  END IF;
END $$;
