/**
 * supabaseService.js — Database & Storage helpers for Supabase integration.
 * Lakshmanan Gold Works Jewellery Catalogue.
 */

import { supabase, isSupabaseConfigured } from '../lib/supabase'

// ─── Data Transformers ────────────────────────────────────────────────────────

export function mapProductFromRow(row) {
  if (!row) return null
  return {
    id: row.id,
    slug: row.slug || row.id,
    name: row.name,
    category: row.category || 'bangles',
    style: row.style || 'traditional',
    occasion: row.occasion || 'Wedding',
    weightRange: row.weight_range || '',
    description: row.description || '',
    images: Array.isArray(row.images) && row.images.length > 0
      ? row.images
      : ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'],
    price: row.price !== null && row.price !== undefined ? Number(row.price) : null,
    weight: row.weight || '15.0g',
    purity: row.purity || '22 KT',
    availability: row.availability || 'In Stock',
    status: row.status || 'Active',
    featured: Boolean(row.featured ?? true),
    newArrival: Boolean(row.new_arrival ?? false),
    displayOrder: Number(row.display_order ?? 0),
    published: Boolean(row.published ?? true),
    createdAt: row.created_at || new Date().toISOString(),
  }
}

export function mapProductToRow(prod) {
  const rawId = prod.id || prod.slug || `DSG-${Date.now()}`
  return {
    id: String(rawId).trim(),
    slug: String(prod.slug || rawId).toLowerCase().trim(),
    name: prod.name,
    category: prod.category || 'bangles',
    style: prod.style || 'traditional',
    occasion: prod.occasion || 'Wedding',
    weight_range: prod.weightRange || prod.weight_range || '',
    description: prod.description || '',
    images: Array.isArray(prod.images) ? prod.images : [],
    price: prod.price !== null && prod.price !== undefined ? Number(prod.price) : null,
    weight: prod.weight || '15.0g',
    purity: prod.purity || '22 KT',
    availability: prod.availability || 'In Stock',
    status: prod.status || 'Active',
    featured: Boolean(prod.featured ?? true),
    new_arrival: Boolean(prod.newArrival ?? prod.new_arrival ?? false),
    display_order: Number(prod.displayOrder ?? prod.display_order ?? 0),
    published: prod.status !== 'Inactive' && (prod.published !== false),
    updated_at: new Date().toISOString(),
  }
}

export function mapCategoryFromRow(row) {
  if (!row) return null
  return {
    id: row.slug || String(row.id),
    slug: row.slug || String(row.id),
    name: row.name,
    description: row.description || '',
    image: row.image || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
    status: row.status || 'Active',
    featured: Boolean(row.featured ?? true),
    displayOrder: Number(row.display_order ?? 0),
    createdAt: row.created_at || new Date().toISOString(),
  }
}

export function mapCategoryToRow(cat) {
  const slug = (cat.slug || cat.name || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
  return {
    id: slug,
    slug: slug,
    name: cat.name,
    description: cat.description || '',
    image: cat.image || '',
    status: cat.status || 'Active',
    featured: Boolean(cat.featured ?? true),
    display_order: Number(cat.displayOrder ?? cat.display_order ?? 0),
    updated_at: new Date().toISOString(),
  }
}

// ─── Storage Image Upload ─────────────────────────────────────────────────────

const STORAGE_BUCKET = 'jewellery-images'

/**
 * Upload an image file to Supabase Storage bucket 'jewellery-images'.
 * Returns public URL of the uploaded image.
 */
export async function uploadJewelleryImage(file, folder = 'products') {
  if (!isSupabaseConfigured) {
    throw new Error(
      'Supabase is not configured on this deployment. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your Vercel Environment Variables.'
    )
  }

  // Ensure active Supabase auth session if available
  try {
    const { data: sessionData } = await supabase.auth.getSession()
    if (!sessionData?.session) {
      const adminEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'surinathan770@gmail.com').toLowerCase().trim()
      const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'Suri@003*'
      await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: adminPassword,
      })
    }
  } catch (_) {
    // Proceed even if auto-auth fails
  }

  // Generate safe, unique filename
  const ext = file.name?.split('.').pop()?.toLowerCase() || 'jpg'
  const baseName = (file.name || 'image')
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .slice(0, 30)
  const uniquePath = `${folder}/${Date.now()}-${baseName}.${ext}`

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(uniquePath, file, {
      cacheControl: '3600',
      upsert: true,
    })

  if (error) {
    console.error('Supabase Storage upload error:', error)
    if (error.message?.includes('row-level security') || error.statusCode === '403' || error.statusCode === 403 || error.status === 400) {
      throw new Error('Storage RLS Policy Error: Please run the updated SQL schema in your Supabase SQL Editor to grant upload permissions for the jewellery-images bucket.')
    }
    throw new Error(error.message || 'Image upload failed in Supabase Storage')
  }

  const filePath = data?.path || uniquePath
  const { data: urlData } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(filePath)

  return urlData.publicUrl
}

// ─── Database Operations: Products ───────────────────────────────────────────

export async function fetchProductsFromSupabase() {
  if (!isSupabaseConfigured) {
    return null
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')

    if (error) {
      console.error('Error fetching products from Supabase:', error)
      throw new Error(error.message || 'Failed to fetch products')
    }

    const list = (data || []).map(mapProductFromRow).filter(Boolean)
    list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    return list
  } catch (err) {
    console.error('fetchProductsFromSupabase failed:', err)
    throw err
  }
}

export async function insertProductToSupabase(product) {
  if (!isSupabaseConfigured) return product

  const row = mapProductToRow(product)

  // 1. Try upsert on id
  let result = await supabase
    .from('products')
    .upsert(row, { onConflict: 'id' })
    .select()

  // 2. If failed, fallback to plain insert
  if (result.error) {
    console.warn('Upsert on id failed, trying insert:', result.error.message)
    result = await supabase.from('products').insert([row]).select()
  }

  if (result.error) {
    console.error('Product insert failed in Supabase:', result.error)
    throw new Error(result.error.message || 'Database error creating product')
  }

  const savedRow = Array.isArray(result.data) ? result.data[0] : result.data
  return savedRow ? mapProductFromRow(savedRow) : product
}

export async function updateProductInSupabase(id, fields) {
  if (!isSupabaseConfigured) return fields

  const row = {}
  if (fields.name !== undefined) row.name = fields.name
  if (fields.slug !== undefined) row.slug = fields.slug
  if (fields.category !== undefined) row.category = fields.category
  if (fields.style !== undefined) row.style = fields.style
  if (fields.occasion !== undefined) row.occasion = fields.occasion
  if (fields.weightRange !== undefined || fields.weight_range !== undefined) {
    row.weight_range = fields.weightRange ?? fields.weight_range
  }
  if (fields.description !== undefined) row.description = fields.description
  if (fields.images !== undefined) row.images = fields.images
  if (fields.price !== undefined) row.price = fields.price ? Number(fields.price) : null
  if (fields.weight !== undefined) row.weight = fields.weight
  if (fields.purity !== undefined) row.purity = fields.purity
  if (fields.availability !== undefined) row.availability = fields.availability
  if (fields.status !== undefined) {
    row.status = fields.status
    row.published = fields.status !== 'Inactive'
  }
  if (fields.featured !== undefined) row.featured = Boolean(fields.featured)
  if (fields.newArrival !== undefined || fields.new_arrival !== undefined) {
    row.new_arrival = Boolean(fields.newArrival ?? fields.new_arrival)
  }
  if (fields.displayOrder !== undefined || fields.display_order !== undefined) {
    row.display_order = Number(fields.displayOrder ?? fields.display_order)
  }
  if (fields.published !== undefined) row.published = Boolean(fields.published)
  row.updated_at = new Date().toISOString()

  const { data, error } = await supabase
    .from('products')
    .update(row)
    .eq('id', id)
    .select()

  if (error) {
    console.error('Error updating product in Supabase:', error)
    throw new Error(error.message || 'Database error updating product')
  }

  const updatedRow = Array.isArray(data) ? data[0] : data
  return updatedRow ? mapProductFromRow(updatedRow) : fields
}

export async function deleteProductFromSupabase(id) {
  if (!isSupabaseConfigured) return true

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting product from Supabase:', error)
    throw new Error(error.message || 'Database error deleting product')
  }

  return true
}

// ─── Database Operations: Categories ─────────────────────────────────────────

export async function fetchCategoriesFromSupabase() {
  if (!isSupabaseConfigured) {
    return null
  }

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')

    if (error) {
      console.error('Error fetching categories from Supabase:', error)
      throw new Error(error.message || 'Failed to fetch categories')
    }

    const list = (data || []).map(mapCategoryFromRow).filter(Boolean)
    list.sort((a, b) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0))
    return list
  } catch (err) {
    console.error('fetchCategoriesFromSupabase failed:', err)
    throw err
  }
}

export async function insertCategoryToSupabase(category) {
  if (!isSupabaseConfigured) return category

  const row = mapCategoryToRow(category)

  // 1. Try upsert on slug
  let result = await supabase
    .from('categories')
    .upsert(row, { onConflict: 'slug' })
    .select()

  // 2. If onConflict slug failed, fallback to onConflict id
  if (result.error) {
    console.warn('Upsert on slug failed, trying upsert on id:', result.error.message)
    result = await supabase
      .from('categories')
      .upsert(row, { onConflict: 'id' })
      .select()
  }

  // 3. Fallback to plain insert
  if (result.error) {
    console.warn('Upsert failed, trying plain insert:', result.error.message)
    result = await supabase
      .from('categories')
      .insert([row])
      .select()
  }

  if (result.error) {
    console.error('Category insert failed in Supabase:', result.error)
    throw new Error(result.error.message || 'Database error creating category')
  }

  const savedRow = Array.isArray(result.data) ? result.data[0] : result.data
  return savedRow ? mapCategoryFromRow(savedRow) : { ...category, slug: row.slug, id: row.id }
}

export async function updateCategoryInSupabase(slug, fields) {
  if (!isSupabaseConfigured) return fields

  const updatePayload = {}
  if (fields.name !== undefined) updatePayload.name = fields.name
  if (fields.description !== undefined) updatePayload.description = fields.description
  if (fields.image !== undefined) updatePayload.image = fields.image
  if (fields.status !== undefined) updatePayload.status = fields.status
  if (fields.featured !== undefined) updatePayload.featured = Boolean(fields.featured)
  if (fields.displayOrder !== undefined || fields.display_order !== undefined) {
    updatePayload.display_order = Number(fields.displayOrder ?? fields.display_order)
  }
  updatePayload.updated_at = new Date().toISOString()

  const { data, error } = await supabase
    .from('categories')
    .update(updatePayload)
    .eq('slug', slug)
    .select()

  if (error) {
    console.error('Error updating category in Supabase:', error)
    throw new Error(error.message || 'Database error updating category')
  }

  const updatedRow = Array.isArray(data) ? data[0] : data
  return updatedRow ? mapCategoryFromRow(updatedRow) : fields
}

export async function deleteCategoryFromSupabase(slug) {
  if (!isSupabaseConfigured) return true

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('slug', slug)

  if (error) {
    console.error('Error deleting category from Supabase:', error)
    throw new Error(error.message || 'Database error deleting category')
  }

  return true
}

// ─── Initial Seeder & Migration Helper ────────────────────────────────────────

export async function seedInitialDataToSupabase(productsList = [], categoriesList = []) {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured yet.')
  }

  const categoryRows = (categoriesList || []).map(mapCategoryToRow)
  const productRows = (productsList || []).map(mapProductToRow)

  // 1. Upsert Categories
  if (categoryRows.length > 0) {
    let { error: catError } = await supabase
      .from('categories')
      .upsert(categoryRows, { onConflict: 'slug' })

    if (catError) {
      console.warn('Upsert categories on slug failed, trying on id:', catError.message)
      const res = await supabase.from('categories').upsert(categoryRows, { onConflict: 'id' })
      catError = res.error
    }

    if (catError) {
      console.error('Error seeding categories to Supabase:', catError)
      throw new Error(catError.message || 'Failed to seed categories')
    }
  }

  // 2. Upsert Products
  if (productRows.length > 0) {
    let { error: prodError } = await supabase
      .from('products')
      .upsert(productRows, { onConflict: 'id' })

    if (prodError) {
      console.error('Error seeding products to Supabase:', prodError)
      throw new Error(prodError.message || 'Failed to seed products')
    }
  }

  return {
    categoriesCount: categoryRows.length,
    productsCount: productRows.length,
  }
}
