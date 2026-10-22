import { supabase, isSupabaseConfigured } from '../lib/supabase'

// ─── Transformers ─────────────────────────────────────────────────────────────

export function mapProductFromRow(row) {
  if (!row) return null

  let parsedImages = []
  if (Array.isArray(row.images)) {
    parsedImages = row.images
  } else if (typeof row.images === 'string') {
    try {
      const parsed = JSON.parse(row.images)
      parsedImages = Array.isArray(parsed) ? parsed : [row.images]
    } catch {
      parsedImages = row.images ? [row.images] : []
    }
  }

  return {
    id: row.id,
    slug: row.slug || row.id?.toLowerCase(),
    name: row.name,
    category: row.category || 'bangles',
    style: row.style || 'traditional',
    occasion: row.occasion || 'Wedding',
    weightRange: row.weight_range || '',
    description: row.description || '',
    images: parsedImages.length > 0 ? parsedImages : [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
    ],
    price: row.price !== null && row.price !== undefined ? Number(row.price) : null,
    weight: row.weight || '15.0g',
    purity: row.purity || '22 KT',
    availability: row.availability || 'In Stock',
    status: row.status || (row.published === false ? 'Inactive' : 'Active'),
    featured: Boolean(row.featured),
    newArrival: Boolean(row.new_arrival),
    displayOrder: Number(row.display_order ?? 0),
    published: row.published !== false && row.status !== 'Inactive',
    createdAt: row.created_at || new Date().toISOString(),
  }
}

export function mapProductToRow(prod) {
  const images = Array.isArray(prod.images) ? prod.images.filter(Boolean) : []
  const isPublished = prod.published !== false && prod.status !== 'Inactive'

  return {
    id: prod.id,
    slug: prod.slug || prod.id.toLowerCase(),
    name: prod.name,
    category: prod.category || 'bangles',
    style: prod.style || 'traditional',
    occasion: prod.occasion || 'Wedding',
    weight_range: prod.weightRange || prod.weight_range || '',
    description: prod.description || '',
    images: images,
    price: prod.price !== null && prod.price !== undefined && prod.price !== '' ? Number(prod.price) : null,
    weight: prod.weight || '15.0g',
    purity: prod.purity || '22 KT',
    availability: prod.availability || 'In Stock',
    status: prod.status || 'Active',
    featured: Boolean(prod.featured),
    new_arrival: Boolean(prod.newArrival ?? prod.new_arrival),
    display_order: Number(prod.displayOrder ?? prod.display_order ?? 0),
    published: isPublished,
    updated_at: new Date().toISOString(),
  }
}

export function mapCategoryFromRow(row) {
  if (!row) return null
  return {
    id: row.slug || row.id,
    slug: row.slug || row.id,
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
  const slug = cat.slug || cat.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-')
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
      'Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local.'
    )
  }

  // Generate safe, unique filename
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const baseName = file.name
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
    throw error
  }

  const { data: urlData } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(data.path)

  return urlData.publicUrl
}

// ─── Database Operations: Products ───────────────────────────────────────────

export async function fetchProductsFromSupabase() {
  if (!isSupabaseConfigured) {
    return null
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products from Supabase:', error)
    throw error
  }

  return (data || []).map(mapProductFromRow)
}

export async function insertProductToSupabase(product) {
  if (!isSupabaseConfigured) return product

  const row = mapProductToRow(product)
  const { data, error } = await supabase
    .from('products')
    .upsert(row, { onConflict: 'id' })
    .select()
    .single()

  if (error) {
    console.error('Error creating product in Supabase:', error)
    throw error
  }

  return mapProductFromRow(data)
}

export async function updateProductInSupabase(id, fields) {
  if (!isSupabaseConfigured) return fields

  // Create partial update payload
  const updatePayload = {}
  if (fields.name !== undefined) updatePayload.name = fields.name
  if (fields.slug !== undefined) updatePayload.slug = fields.slug
  if (fields.category !== undefined) updatePayload.category = fields.category
  if (fields.style !== undefined) updatePayload.style = fields.style
  if (fields.occasion !== undefined) updatePayload.occasion = fields.occasion
  if (fields.weightRange !== undefined || fields.weight_range !== undefined) {
    updatePayload.weight_range = fields.weightRange ?? fields.weight_range
  }
  if (fields.description !== undefined) updatePayload.description = fields.description
  if (fields.images !== undefined) updatePayload.images = fields.images
  if (fields.price !== undefined) {
    updatePayload.price = fields.price !== null && fields.price !== '' ? Number(fields.price) : null
  }
  if (fields.weight !== undefined) updatePayload.weight = fields.weight
  if (fields.purity !== undefined) updatePayload.purity = fields.purity
  if (fields.availability !== undefined) updatePayload.availability = fields.availability
  if (fields.status !== undefined) {
    updatePayload.status = fields.status
    updatePayload.published = fields.status !== 'Inactive'
  }
  if (fields.featured !== undefined) updatePayload.featured = Boolean(fields.featured)
  if (fields.newArrival !== undefined || fields.new_arrival !== undefined) {
    updatePayload.new_arrival = Boolean(fields.newArrival ?? fields.new_arrival)
  }
  if (fields.displayOrder !== undefined || fields.display_order !== undefined) {
    updatePayload.display_order = Number(fields.displayOrder ?? fields.display_order)
  }
  if (fields.published !== undefined) updatePayload.published = Boolean(fields.published)
  updatePayload.updated_at = new Date().toISOString()

  const { data, error } = await supabase
    .from('products')
    .update(updatePayload)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating product in Supabase:', error)
    throw error
  }

  return mapProductFromRow(data)
}

export async function deleteProductFromSupabase(id) {
  if (!isSupabaseConfigured) return true

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting product from Supabase:', error)
    throw error
  }

  return true
}

// ─── Database Operations: Categories ─────────────────────────────────────────

export async function fetchCategoriesFromSupabase() {
  if (!isSupabaseConfigured) {
    return null
  }

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching categories from Supabase:', error)
    throw error
  }

  return (data || []).map(mapCategoryFromRow)
}

export async function insertCategoryToSupabase(category) {
  if (!isSupabaseConfigured) return category

  const row = mapCategoryToRow(category)
  const { data, error } = await supabase
    .from('categories')
    .upsert(row, { onConflict: 'slug' })
    .select()
    .single()

  if (error) {
    console.error('Error creating category in Supabase:', error)
    throw error
  }

  return mapCategoryFromRow(data)
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
    .single()

  if (error) {
    console.error('Error updating category in Supabase:', error)
    throw error
  }

  return mapCategoryFromRow(data)
}

export async function deleteCategoryFromSupabase(slug) {
  if (!isSupabaseConfigured) return true

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('slug', slug)

  if (error) {
    console.error('Error deleting category from Supabase:', error)
    throw error
  }

  return true
}

// ─── Data Migration / Seeding Helper ─────────────────────────────────────────

/**
 * Seeds existing local products and categories into Supabase Database.
 * Preserves all design codes, imagery, descriptions, and specifications.
 */
export async function seedInitialDataToSupabase(productsList, categoriesList) {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured yet.')
  }

  const categoryRows = (categoriesList || []).map(mapCategoryToRow)
  const productRows = (productsList || []).map(mapProductToRow)

  // 1. Upsert Categories
  if (categoryRows.length > 0) {
    const { error: catError } = await supabase
      .from('categories')
      .upsert(categoryRows, { onConflict: 'slug' })

    if (catError) {
      console.error('Error seeding categories to Supabase:', catError)
      throw catError
    }
  }

  // 2. Upsert Products
  if (productRows.length > 0) {
    const { error: prodError } = await supabase
      .from('products')
      .upsert(productRows, { onConflict: 'id' })

    if (prodError) {
      console.error('Error seeding products to Supabase:', prodError)
      throw prodError
    }
  }

  return {
    categoriesCount: categoryRows.length,
    productsCount: productRows.length,
  }
}
