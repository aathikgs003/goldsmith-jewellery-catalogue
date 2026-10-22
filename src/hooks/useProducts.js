/**
 * useProducts.js — custom hook for product data access.
 * Pulls live reactive products from AdminContext (Supabase Database),
 * gracefully falling back to productService / local data.
 */

import { useMemo, useState } from 'react'
import { useAdmin } from '../context/AdminContext'
import {
  getSourceProducts,
  sortProducts,
} from '../services/productService'

/** Get live product source array */
function useLiveProducts() {
  try {
    const adminCtx = useAdmin()
    if (adminCtx?.products && adminCtx.products.length > 0) {
      return adminCtx.products
    }
  } catch {
    // Outside of AdminProvider, fallback to source
  }
  return getSourceProducts()
}

/** All published products */
export function useAllProducts() {
  const products = useLiveProducts()
  return useMemo(
    () => products.filter((p) => p.published !== false && p.status !== 'Inactive'),
    [products]
  )
}

/** Products filtered and sorted for a category collection page */
export function useCategoryProducts(categorySlug, query = '', sort = 'featured') {
  const allPublished = useAllProducts()

  return useMemo(() => {
    let pool = allPublished
    if (categorySlug && categorySlug !== 'all') {
      pool = pool.filter(
        (p) => p.category?.toLowerCase() === categorySlug.toLowerCase()
      )
    }

    if (query?.trim()) {
      const q = query.toLowerCase().trim()
      pool = pool.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.id?.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      )
    }

    return sortProducts(pool, sort)
  }, [allPublished, categorySlug, query, sort])
}

/** Featured products */
export function useFeaturedProducts(limit = 8) {
  const allPublished = useAllProducts()
  return useMemo(
    () => allPublished.filter((p) => p.featured).slice(0, limit),
    [allPublished, limit]
  )
}

/** New arrivals */
export function useNewArrivals(limit = 8) {
  const allPublished = useAllProducts()
  return useMemo(
    () =>
      allPublished
        .filter((p) => p.newArrival)
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .slice(0, limit),
    [allPublished, limit]
  )
}

/** Single product by slug or design ID */
export function useProduct(slugOrId) {
  const allPublished = useAllProducts()
  return useMemo(() => {
    if (!slugOrId) return null
    const target = slugOrId.toLowerCase().trim()
    return (
      allPublished.find(
        (p) =>
          p.slug?.toLowerCase() === target ||
          p.id?.toLowerCase() === target
      ) || null
    )
  }, [allPublished, slugOrId])
}

/** Related products in the same category */
export function useRelatedProducts(productId, limit = 4) {
  const allPublished = useAllProducts()
  return useMemo(() => {
    const current = allPublished.find((p) => p.id === productId || p.slug === productId)
    if (!current) return []
    return allPublished
      .filter((p) => p.id !== current.id && p.category === current.category)
      .slice(0, limit)
  }, [allPublished, productId, limit])
}

/** Paginated list with load-more */
export function usePaginatedProducts(allProducts, pageSize = 12) {
  const [page, setPage] = useState(1)
  const visible = useMemo(() => allProducts.slice(0, page * pageSize), [allProducts, page, pageSize])
  const hasMore = visible.length < allProducts.length
  const loadMore = () => setPage((p) => p + 1)
  return { visible, hasMore, loadMore }
}

/** Favourites stored in localStorage */
export function useFavourites() {
  const [favs, setFavs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('slgw_favourites') || '[]')
    } catch {
      return []
    }
  })

  const toggle = (productId) => {
    setFavs((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
      localStorage.setItem('slgw_favourites', JSON.stringify(next))
      return next
    })
  }

  const isFav = (productId) => favs.includes(productId)

  return { favs, toggle, isFav }
}
