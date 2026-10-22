import { useState, useMemo, useRef } from 'react'
import {
  Search,
  ArrowRight,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Sparkles,
  Check,
  X,
} from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import { products as fallbackProducts } from '../data/products'
import { categories as fallbackCategories } from '../data/categories'
import { useFavourites } from '../hooks/useProducts'
import ProductLightbox from '../components/ProductLightbox'

const STYLES = [
  { id: 'all', label: 'All Styles' },
  { id: 'traditional', label: 'Traditional' },
  { id: 'antique', label: 'Antique' },
  { id: 'temple', label: 'Temple' },
  { id: 'daily', label: 'Daily Wear' },
  { id: 'bridal', label: 'Bridal' },
  { id: 'trendy', label: 'Trendy' },
]

const WEIGHTS = [
  { id: 'all', label: 'All Weights' },
  { id: 'under-10g', label: 'Under 10g' },
  { id: '10-20g', label: '10g – 20g' },
  { id: '20-30g', label: '20g – 30g' },
  { id: 'above-30g', label: 'Above 30g' },
]

const PAGE_SIZE = 12

export default function NewArrivals() {
  const adminCtx = useAdmin()
  const allProducts = adminCtx?.products || fallbackProducts
  const categoriesList = adminCtx?.categories || fallbackCategories
  const { isFav, toggle: toggleFav } = useFavourites()

  // Dynamic Category Tiles including "All New Arrivals" + dynamic admin categories
  const categoryTiles = useMemo(() => {
    const list = adminCtx?.categories || fallbackCategories
    const activeList = list.filter(
      (c) =>
        (c.status ? c.status === 'Active' : true)
    )
    return [
      {
        slug: 'all',
        name: 'All New Arrivals',
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80',
      },
      ...activeList.map((c) => ({
        slug: c.slug,
        name: c.name,
        image: c.image || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80',
      })),
    ]
  }, [adminCtx?.categories])

  // State
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('all')
  const [selectedPrice, setSelectedPrice] = useState('all')
  const [selectedWeight, setSelectedWeight] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list'
  const [currentPage, setCurrentPage] = useState(1)
  const [lightboxProduct, setLightboxProduct] = useState(null)
  const [toastMessage, setToastMessage] = useState('')

  const gridSectionRef = useRef(null)
  const categoryScrollRef = useRef(null)

  const scrollCategories = (direction) => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const scrollToGrid = () => {
    gridSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Filter products for New Arrivals
  const filteredProducts = useMemo(() => {
    // Only products marked newArrival or published
    let pool = allProducts.filter((p) => p.published !== false && (p.newArrival || true))

    // If "all", show all new arrivals; otherwise match category
    if (selectedCategory !== 'all') {
      pool = pool.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase(),
      )
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      pool = pool.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.id?.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q)),
      )
    }

    // Style filter
    if (selectedStyle !== 'all') {
      pool = pool.filter((p) => p.style?.toLowerCase() === selectedStyle.toLowerCase())
    }

    // Weight filter
    if (selectedWeight !== 'all') {
      pool = pool.filter((p) => p.weightRange === selectedWeight)
    }

    // Sort
    const sorted = [...pool]
    if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'weight-asc') {
      sorted.sort((a, b) => parseFloat(a.weight || 0) - parseFloat(b.weight || 0))
    } else if (sortBy === 'weight-desc') {
      sorted.sort((a, b) => parseFloat(b.weight || 0) - parseFloat(a.weight || 0))
    } else {
      // Default: newest first
      sorted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    }

    return sorted
  }, [allProducts, selectedCategory, searchQuery, selectedStyle, selectedWeight, sortBy])

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE))
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filteredProducts.slice(start, start + PAGE_SIZE)
  }, [filteredProducts, currentPage])

  const handleCategorySelect = (slug) => {
    setSelectedCategory(slug)
    setCurrentPage(1)
  }

  const handleShare = (e, prod) => {
    e.stopPropagation()
    const url = `${window.location.origin}/product/${prod.id}`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url)
      setToastMessage(`Link to ${prod.name} copied!`)
      setTimeout(() => setToastMessage(''), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFCF7] text-[#30231F]">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#351016] text-[#D8B36A] px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-[#C4933D]/40 animate-fade-in">
          <Check size={18} className="text-[#C4933D]" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. HERO BANNER — Replicating Reference Screenshot Exactly           */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#F5EBDD]/60 border-b border-[#D8B36A]/30 overflow-hidden">
        {/* Subtle Watermark Mandala */}
        <div className="absolute right-0 top-0 w-96 h-96 opacity-10 pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full stroke-[#C4933D]">
            <circle cx="100" cy="100" r="85" strokeWidth="1" />
            <circle cx="100" cy="100" r="60" strokeWidth="0.8" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="45" strokeWidth="1" />
          </svg>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[360px] sm:min-h-[420px] lg:min-h-[460px] py-10 lg:py-0 gap-8">
            {/* Left Content (Span 7) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 relative z-10">
              {/* Eyebrow */}
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#C4933D]">
                <span>FRESH DESIGNS</span>
                <span className="text-[#C4933D] font-normal">✧</span>
                <span>NEW ARRIVALS</span>
                <span className="text-[#C4933D] font-normal">✧</span>
                <span>EXCLUSIVE COLLECTIONS</span>
              </div>

              {/* Title */}
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#30231F] leading-[1.08]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                New Arrivals
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-[#786D63] font-light leading-relaxed max-w-lg">
                Discover our latest gold jewellery designs, crafted with tradition and modern elegance.
              </p>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  onClick={scrollToGrid}
                  className="inline-flex items-center gap-2.5 bg-[#C4933D] hover:bg-[#B3832F] text-white font-semibold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  <span>Explore Latest Designs</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Right Editorial Model Imagery with Floating Medallion (Span 5) */}
            <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end h-full">
              <div className="relative w-full max-w-[480px] aspect-4/3 lg:aspect-auto lg:h-[460px] overflow-hidden rounded-3xl lg:rounded-none">
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=85"
                  alt="Traditional Gold Necklace & Jewellery"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F5EBDD]/40 lg:from-transparent to-transparent" />
              </div>

              {/* Floating Circular Seal Medallion */}
              <div className="absolute right-2 sm:right-6 lg:right-6 top-1/2 -translate-y-1/2 w-24 h-24 sm:w-36 sm:h-36 rounded-full border border-[#D8B36A]/60 p-1 flex items-center justify-center bg-black/50 backdrop-blur-xs text-center text-white shadow-2xl">
                <div className="w-full h-full rounded-full border border-dashed border-[#D8B36A]/70 flex flex-col items-center justify-center p-1 sm:p-2">
                  <span className="text-[9px] sm:text-xs tracking-wider uppercase text-[#D8B36A] font-light mb-0.5">
                    New
                  </span>
                  <span
                    className="text-[10.5px] sm:text-sm font-bold leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Designs for Every Occasion
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. CATEGORY TILES STRIP (Horizontal Scrollable Category Bar)        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-[#D8B36A]/30 py-5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="relative group/scroll">
            {/* Left Scroll Button */}
            <button
              type="button"
              onClick={() => scrollCategories('left')}
              aria-label="Scroll categories left"
              className="absolute -left-2 sm:-left-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-[#C4933D] text-[#30231F] hover:text-white border border-[#D8B36A]/50 shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer hidden sm:flex opacity-90 hover:opacity-100 hover:scale-105"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Horizontal Scrollable Category Bar */}
            <div
              ref={categoryScrollRef}
              className="flex items-center gap-3 sm:gap-3.5 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1"
            >
              {categoryTiles.map((cat) => {
                const isSelected = selectedCategory === cat.slug

                return (
                  <button
                    key={cat.slug}
                    onClick={() => handleCategorySelect(cat.slug)}
                    className={`group flex flex-col items-center flex-shrink-0 w-28 sm:w-32 md:w-36 p-2 sm:p-2.5 rounded-2xl border transition-all duration-300 text-center cursor-pointer ${
                      isSelected
                        ? 'bg-[#351016] text-white border-[#C4933D] ring-2 ring-[#C4933D]/50 shadow-md scale-[1.02]'
                        : 'bg-[#FFFCF7] text-[#30231F] border-[#D8B36A]/40 hover:border-[#C4933D] hover:bg-white hover:shadow-sm'
                    }`}
                  >
                    {/* Category Image Thumbnail */}
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-2 bg-[#F5EBDD] border border-[#D8B36A]/30">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Category Title */}
                    <span
                      className={`text-xs font-semibold tracking-wide leading-tight truncate w-full text-center px-1 ${
                        isSelected ? 'text-[#D8B36A]' : 'text-[#30231F] group-hover:text-[#C4933D]'
                      }`}
                    >
                      {cat.name}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Right Scroll Button */}
            <button
              type="button"
              onClick={() => scrollCategories('right')}
              aria-label="Scroll categories right"
              className="absolute -right-2 sm:-right-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-[#C4933D] text-[#30231F] hover:text-white border border-[#D8B36A]/50 shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer hidden sm:flex opacity-90 hover:opacity-100 hover:scale-105"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. SEARCH & FILTER TOOLBAR                                          */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section ref={gridSectionRef} className="py-6 sm:py-8 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#D8B36A]/35 shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#786D63]"
              />
              <input
                type="text"
                placeholder="Search new arrivals by name or design ID..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D8B36A]/40 text-xs sm:text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#786D63] hover:text-[#30231F]"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              {/* Category Dropdown */}
              <select
                value={selectedCategory}
                onChange={(e) => handleCategorySelect(e.target.value)}
                className="px-3 py-2 rounded-xl border border-[#D8B36A]/40 text-xs font-medium text-[#30231F] bg-[#FFFCF7] focus:outline-hidden focus:border-[#C4933D]"
              >
                <option value="all">All Categories</option>
                {categoriesList.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>

              {/* Style Dropdown */}
              <select
                value={selectedStyle}
                onChange={(e) => {
                  setSelectedStyle(e.target.value)
                  setCurrentPage(1)
                }}
                className="px-3 py-2 rounded-xl border border-[#D8B36A]/40 text-xs font-medium text-[#30231F] bg-[#FFFCF7] focus:outline-hidden focus:border-[#C4933D]"
              >
                {STYLES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>

              {/* Price Range Dropdown */}
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="px-3 py-2 rounded-xl border border-[#D8B36A]/40 text-xs font-medium text-[#30231F] bg-[#FFFCF7] focus:outline-hidden focus:border-[#C4933D]"
              >
                <option value="all">Price Range</option>
                <option value="on-enquiry">Price on enquiry</option>
              </select>

              {/* Weight Dropdown */}
              <select
                value={selectedWeight}
                onChange={(e) => {
                  setSelectedWeight(e.target.value)
                  setCurrentPage(1)
                }}
                className="px-3 py-2 rounded-xl border border-[#D8B36A]/40 text-xs font-medium text-[#30231F] bg-[#FFFCF7] focus:outline-hidden focus:border-[#C4933D]"
              >
                {WEIGHTS.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.label}
                  </option>
                ))}
              </select>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-xl border border-[#D8B36A]/40 text-xs font-medium text-[#30231F] bg-[#FFFCF7] focus:outline-hidden focus:border-[#C4933D]"
              >
                <option value="newest">Newest First</option>
                <option value="name">Name (A–Z)</option>
                <option value="weight-asc">Weight: Low to High</option>
                <option value="weight-desc">Weight: High to Low</option>
              </select>

              {/* View Toggle (Grid / List) */}
              <div className="flex items-center gap-1 bg-[#F5EBDD] p-1 rounded-xl border border-[#D8B36A]/40">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-[#351016] text-white'
                      : 'text-[#786D63] hover:text-[#30231F]'
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid size={15} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-[#351016] text-white'
                      : 'text-[#786D63] hover:text-[#30231F]'
                  }`}
                  aria-label="List view"
                >
                  <List size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Result Count Status */}
          <div className="text-xs text-[#786D63] font-medium pt-1 border-t border-[#D8B36A]/20 flex items-center justify-between">
            <span>
              Showing {filteredProducts.length} new designs
            </span>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => handleCategorySelect('all')}
                className="text-[#C4933D] hover:underline font-semibold"
              >
                Clear filter
              </button>
            )}
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 4. PRODUCT GRID (6 Columns Matching Reference Screenshot)         */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <div className="mt-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {currentProducts.map((prod) => {
                const primaryImage =
                  prod.images?.[0] ||
                  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'
                const isFavorite = isFav(prod.id)

                return (
                  <div
                    key={prod.id}
                    onClick={() => setLightboxProduct(prod)}
                    className="bg-white rounded-2xl border border-[#D8B36A]/35 shadow-2xs hover:shadow-md transition-all overflow-hidden group flex flex-col cursor-pointer"
                  >
                    {/* Card Image with NEW Badge and Heart */}
                    <div className="relative aspect-4/3 w-full bg-[#F5EBDD]/60 overflow-hidden">
                      <img
                        src={primaryImage}
                        alt={prod.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* NEW Badge (Gold Pill from Screenshot) */}
                      <span className="absolute top-2.5 left-2.5 bg-[#C4933D] text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider shadow-xs">
                        NEW
                      </span>

                      {/* Wishlist Heart Icon */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFav(prod.id)
                        }}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/25 hover:bg-black/40 backdrop-blur-xs flex items-center justify-center transition-colors"
                        aria-label="Add to wishlist"
                      >
                        <Heart
                          size={13}
                          className={
                            isFavorite
                              ? 'fill-rose-500 text-rose-500'
                              : 'text-white'
                          }
                        />
                      </button>
                    </div>

                    {/* Card Content */}
                    <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between gap-1.5">
                      <div>
                        {/* Title */}
                        <h3 className="font-bold text-xs sm:text-sm text-[#30231F] group-hover:text-[#C4933D] transition-colors line-clamp-1">
                          {prod.name}
                        </h3>

                        {/* Design ID */}
                        <p className="text-[10px] sm:text-[11px] font-mono text-[#786D63] mt-0.5">
                          {prod.id}
                        </p>
                      </div>

                      {/* Bottom Row: Price & Share */}
                      <div className="flex items-center justify-between pt-1 border-t border-[#D8B36A]/15 mt-1">
                        <span className="text-[11px] sm:text-xs font-semibold text-[#C4933D]">
                          Price on enquiry
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleShare(e, prod)}
                          className="p-1 rounded-md text-[#786D63] hover:text-[#30231F] hover:bg-[#F5EBDD] transition-colors"
                          title="Share design link"
                        >
                          <Share2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            /* List View */
            <div className="space-y-3">
              {currentProducts.map((prod) => {
                const primaryImage =
                  prod.images?.[0] ||
                  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'
                const isFavorite = isFav(prod.id)

                return (
                  <div
                    key={prod.id}
                    onClick={() => setLightboxProduct(prod)}
                    className="bg-white rounded-2xl border border-[#D8B36A]/35 p-3 sm:p-4 shadow-2xs hover:shadow-md transition-all flex items-center gap-4 cursor-pointer group"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#F5EBDD] flex-shrink-0 relative">
                      <img
                        src={primaryImage}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute top-1 left-1 bg-[#C4933D] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-sm">
                        NEW
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm sm:text-base text-[#30231F] group-hover:text-[#C4933D] transition-colors truncate">
                          {prod.name}
                        </h3>
                        <span className="text-xs font-mono text-[#786D63] bg-[#F5EBDD] px-2 py-0.5 rounded-md">
                          {prod.id}
                        </span>
                      </div>
                      <p className="text-xs text-[#786D63] line-clamp-1 mt-1">
                        {prod.description}
                      </p>
                      <div className="text-xs text-[#786D63] mt-1 flex items-center gap-3">
                        <span>{prod.weight || '15g'}</span>
                        <span>•</span>
                        <span className="text-[#C4933D] font-medium">{prod.purity || '22 KT'}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <span className="text-xs sm:text-sm font-semibold text-[#C4933D]">
                        Price on enquiry
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFav(prod.id)
                          }}
                          className="p-1.5 rounded-lg text-[#786D63] hover:text-rose-600 transition-colors"
                        >
                          <Heart
                            size={16}
                            className={isFavorite ? 'fill-rose-500 text-rose-500' : ''}
                          />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleShare(e, prod)}
                          className="p-1.5 rounded-lg text-[#786D63] hover:text-[#30231F] transition-colors"
                        >
                          <Share2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#D8B36A]/30">
              <Sparkles size={32} className="mx-auto mb-2 text-[#C4933D]" />
              <h3 className="text-base font-bold text-[#30231F]">No New Designs Found</h3>
              <p className="text-xs text-[#786D63] mt-1">
                Try selecting a different category or clearing your search filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setSearchQuery('')
                  setSelectedStyle('all')
                  setSelectedWeight('all')
                }}
                className="mt-4 px-5 py-2 rounded-full bg-[#351016] text-[#D8B36A] text-xs font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────── */}
          {/* 5. PAGINATION (Centered Matching Screenshot)                    */}
          {/* ─────────────────────────────────────────────────────────────── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12 mb-6">
              {/* Previous Page */}
              <button
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1))
                  scrollToGrid()
                }}
                className="w-8 h-8 rounded-full border border-[#D8B36A]/40 flex items-center justify-center text-[#30231F] hover:bg-[#F5EBDD] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                aria-label="Previous page"
              >
                <ChevronLeft size={15} />
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                const isActive = currentPage === pageNum

                return (
                  <button
                    key={pageNum}
                    onClick={() => {
                      setCurrentPage(pageNum)
                      scrollToGrid()
                    }}
                    className={`w-8 h-8 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#C4933D] text-white shadow-sm font-bold'
                        : 'bg-white hover:bg-[#F5EBDD] text-[#30231F] border border-[#D8B36A]/40'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}

              {/* Next Page */}
              <button
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                  scrollToGrid()
                }}
                className="w-8 h-8 rounded-full border border-[#D8B36A]/40 flex items-center justify-center text-[#30231F] hover:bg-[#F5EBDD] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                aria-label="Next page"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 6. FULL-SCREEN LIGHTBOX MODAL                                       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {lightboxProduct && (
        <ProductLightbox
          product={lightboxProduct}
          products={filteredProducts}
          onClose={() => setLightboxProduct(null)}
        />
      )}
    </div>
  )
}
