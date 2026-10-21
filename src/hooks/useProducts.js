/**
 * useProducts.js — custom hook for product data access.
 * Wraps productService for use inside React components.
 */

import { useMemo, useState } from 'react'
import {
  getAllProducts,
  getFeaturedProducts,
  getNewArrivals,
  getProductBySlug,
  getProductsByCategory,
  getRelatedProducts,
  searchProducts,
  sortProducts,
} from '../services/productService'

/** All published products */
export function useAllProducts() {
  return useMemo(() => getAllProducts(), [])
}

/** Products filtered and sorted for a category collection page */
export function useCategoryProducts(categorySlug, query = '', sort = 'featured') {
  return useMemo(() => {
    const base = query
      ? searchProducts(query, categorySlug)
      : getProductsByCategory(categorySlug)
    return sortProducts(base, sort)
  }, [categorySlug, query, sort])
}

/** Featured products */
export function useFeaturedProducts(limit = 8) {
  return useMemo(() => getFeaturedProducts(limit), [limit])
}

/** New arrivals */
export function useNewArrivals(limit = 8) {
  return useMemo(() => getNewArrivals(limit), [limit])
}

/** Single product by slug */
export function useProduct(slug) {
  return useMemo(() => getProductBySlug(slug), [slug])
}

/** Related products */
export function useRelatedProducts(productId, limit = 4) {
  return useMemo(() => getRelatedProducts(productId, limit), [productId, limit])
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
