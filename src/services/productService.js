/**
 * productService.js
 *
 * Central data-access layer for products.
 * Uses reactive admin data from localStorage if available,
 * falling back to initial data from products.js.
 */

import { products as initialProducts } from '../data/products'

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getSourceProducts() {
  try {
    const saved = localStorage.getItem('slgw_admin_products')
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {}
  return initialProducts
}

function getPublishedProducts() {
  return getSourceProducts().filter((p) => p.published !== false && p.status !== 'Inactive')
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** Return all published products */
export function getAllProducts() {
  return getPublishedProducts()
}

/** Return a single product by its design ID (e.g. "BGL-001") */
export function getProductById(id) {
  return getPublishedProducts().find((p) => p.id === id) || null
}

/** Return a single product by its slug */
export function getProductBySlug(slug) {
  return (
    getPublishedProducts().find(
      (p) => p.slug === slug || p.id?.toLowerCase() === slug?.toLowerCase()
    ) || null
  )
}

/** Return published products for a given category slug */
export function getProductsByCategory(categorySlug) {
  return getPublishedProducts().filter(
    (p) => p.category?.toLowerCase() === categorySlug?.toLowerCase()
  )
}

/** Return featured products (up to `limit`) */
export function getFeaturedProducts(limit = 8) {
  return getPublishedProducts().filter((p) => p.featured).slice(0, limit)
}

/** Return new arrivals (up to `limit`), sorted newest first */
export function getNewArrivals(limit = 8) {
  return getPublishedProducts()
    .filter((p) => p.newArrival)
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, limit)
}

/**
 * Search products by name or design ID (case-insensitive).
 * Optionally filter by category.
 */
export function searchProducts(query, categorySlug = null) {
  const q = query.toLowerCase().trim()
  const pool = categorySlug ? getProductsByCategory(categorySlug) : getPublishedProducts()
  if (!q) return pool
  return pool.filter(
    (p) =>
      p.name?.toLowerCase().includes(q) ||
      p.id?.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q))
  )
}

/**
 * Sort an array of products.
 * @param {Array}  products
 * @param {'featured'|'newest'|'name'} sort
 */
export function sortProducts(products, sort = 'featured') {
  const arr = [...products]
  switch (sort) {
    case 'newest':
      return arr.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    case 'name':
      return arr.sort((a, b) => a.name.localeCompare(b.name))
    case 'featured':
    default:
      return arr.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
  }
}

/** Return related products from the same category, excluding the given product */
export function getRelatedProducts(productId, limit = 4) {
  const product = getProductById(productId)
  if (!product) return []
  return getPublishedProducts()
    .filter((p) => p.category === product.category && p.id !== productId)
    .slice(0, limit)
}

/** Return availability display label and colour class */
export function getAvailabilityInfo(availability) {
  switch (availability) {
    case 'In Stock':
      return { label: 'In Stock', className: 'text-green-700 bg-green-50' }
    case 'Limited':
      return { label: 'Limited Stock', className: 'text-amber-700 bg-amber-50' }
    case 'Made to Order':
      return { label: 'Made to Order', className: 'text-blue-700 bg-blue-50' }
    default:
      return null
  }
}
