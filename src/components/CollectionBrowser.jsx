import { useState, useMemo, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Search,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  LayoutGrid,
  List,
  Gem,
  ShieldCheck,
  SlidersHorizontal,
} from 'lucide-react'
import ProductCard from './ProductCard'
import ProductLightbox from './ProductLightbox'
import SectionOrnament from './SectionOrnament'
import { categories as initialCategories } from '../data/categories'
import { products as initialProducts } from '../data/products'
import { useAdmin } from '../context/AdminContext'

const STYLE_OPTIONS = [
  { id: 'all', label: 'All Styles' },
  { id: 'traditional', label: 'Traditional' },
  { id: 'antique', label: 'Antique' },
  { id: 'daily', label: 'Daily Wear' },
  { id: 'bridal', label: 'Bridal' },
  { id: 'temple', label: 'Temple Design' },
  { id: 'trendy', label: 'Trendy' },
]

const OCCASION_OPTIONS = [
  { id: 'all', label: 'All Occasions' },
  { id: 'Festive', label: 'Festive' },
  { id: 'Wedding', label: 'Wedding' },
  { id: 'Daily Wear', label: 'Daily Wear' },
  { id: 'Party', label: 'Party' },
]

const WEIGHT_OPTIONS = [
  { id: 'all', label: 'All Weights' },
  { id: 'under-10g', label: 'Under 10g' },
  { id: '10-20g', label: '10g – 20g' },
  { id: '20-30g', label: '20g – 30g' },
  { id: 'above-30g', label: 'Above 30g' },
]

const AVAILABILITY_OPTIONS = [
  { id: 'all', label: 'All Availability' },
  { id: 'In Stock', label: 'In Stock' },
  { id: 'Made to Order', label: 'Made to Order' },
  { id: 'Limited', label: 'Limited Stock' },
]

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'name', label: 'Design Name (A–Z)' },
]

const PAGE_SIZE = 8

export default function CollectionBrowser({ initialCategorySlug = 'bangles' }) {
  const adminCtx = useAdmin()
  const rawCategories = adminCtx?.categories || initialCategories
  const categories = useMemo(() => {
    return rawCategories.filter(
      (c) =>Boolean(c && (c.slug || c.name))
    )
  }, [rawCategories])
  const products = adminCtx?.products || initialProducts

  const navigate = useNavigate()
  const [selectedCategorySlug, setSelectedCategorySlug] = useState(initialCategorySlug || 'bangles')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('all')
  const [selectedOccasion, setSelectedOccasion] = useState('all')
  const [selectedWeight, setSelectedWeight] = useState('all')
  const [selectedAvailability, setSelectedAvailability] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list'
  const [currentPage, setCurrentPage] = useState(1)
  const [lightboxProduct, setLightboxProduct] = useState(null)

  // Accordion toggle states in sidebar
  const [styleExpanded, setStyleExpanded] = useState(true)
  const [priceExpanded, setPriceExpanded] = useState(false)
  const [weightExpanded, setWeightExpanded] = useState(false)
  const [availabilityExpanded, setAvailabilityExpanded] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Ref & scroll handler for horizontal category bar
  const categoryScrollRef = useRef(null)
  const scrollCategories = (direction) => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  // Current category object
  const currentCategory = useMemo(() => {
    return (
      categories.find((c) => c.slug === selectedCategorySlug) ||
      categories[0] || {
        slug: 'bangles',
        name: 'Bangles',
        description: 'Explore our exclusive range of traditional and contemporary gold bangle designs.',
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=85',
      }
    )
  }, [selectedCategorySlug, categories])

  // Count items per style for currently selected category
  const styleCounts = useMemo(() => {
    const pool = products.filter((p) => p.published && p.category === selectedCategorySlug)
    const counts = { all: pool.length }
    STYLE_OPTIONS.forEach((s) => {
      if (s.id !== 'all') {
        counts[s.id] = pool.filter((p) => p.style === s.id).length
      }
    })
    return counts
  }, [selectedCategorySlug, products])

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    let pool = products.filter((p) => p.published)

    // Category filter
    if (selectedCategorySlug) {
      pool = pool.filter((p) => p.category === selectedCategorySlug)
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      pool = pool.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q)),
      )
    }

    // Style filter
    if (selectedStyle !== 'all') {
      pool = pool.filter((p) => p.style === selectedStyle)
    }

    // Occasion filter
    if (selectedOccasion !== 'all') {
      pool = pool.filter((p) => p.occasion === selectedOccasion)
    }

    // Weight filter
    if (selectedWeight !== 'all') {
      pool = pool.filter((p) => p.weightRange === selectedWeight)
    }

    // Availability filter
    if (selectedAvailability !== 'all') {
      pool = pool.filter((p) => p.availability === selectedAvailability)
    }

    // Sorting
    const sorted = [...pool]
    if (sortBy === 'newest') {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name))
    } else {
      // 'featured'
      sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return sorted
  }, [
    selectedCategorySlug,
    searchQuery,
    selectedStyle,
    selectedOccasion,
    selectedWeight,
    selectedAvailability,
    sortBy,
    products,
  ])

  // Pagination calculation
  const totalPages = Math.ceil(Math.max(filteredProducts.length, 1) / PAGE_SIZE)
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filteredProducts.slice(start, start + PAGE_SIZE)
  }, [filteredProducts, currentPage])

  // Switch category handler
  const handleCategorySwitch = (slug) => {
    setSelectedCategorySlug(slug)
    setCurrentPage(1)
    setSelectedStyle('all')
    setSelectedOccasion('all')
    setSelectedWeight('all')
    setSelectedAvailability('all')
    setSearchQuery('')
    navigate(`/collections/${slug}`, { replace: true })
  }

  // Clear all filters handler
  const handleClearAll = () => {
    setSearchQuery('')
    setSelectedStyle('all')
    setSelectedOccasion('all')
    setSelectedWeight('all')
    setSelectedAvailability('all')
    setCurrentPage(1)
  }

  const activeFilterCount =
    (selectedStyle !== 'all' ? 1 : 0) +
    (selectedWeight !== 'all' ? 1 : 0) +
    (selectedOccasion !== 'all' ? 1 : 0) +
    (selectedAvailability !== 'all' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0)

  // Lightbox handlers
  const openLightbox = (product) => {
    setLightboxProduct(product)
  }

  const closeLightbox = () => {
    setLightboxProduct(null)
  }

  return (
    <div className="bg-[#FFFCF7] text-[#30231F] min-h-screen">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. COLLECTION EDITORIAL HERO BANNER (Matching Screenshot Reference) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#F5EBDD]/70 border-b border-[#D8B36A]/40 overflow-hidden">
        {/* Subtle Background Radial / Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5EBDD] via-[#F5EBDD]/90 to-transparent z-10 pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 lg:py-14 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Breadcrumb, Title, Description, Ornaments, 3 Badges */}
            <div className="lg:col-span-7 space-y-4">
              {/* Breadcrumb Navigation */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#786D63]">
                <Link to="/" className="hover:text-[#C4933D] transition-colors">
                  Home
                </Link>
                <span className="text-[#D8B36A]">&gt;</span>
                <Link to="/collections" className="hover:text-[#C4933D] transition-colors">
                  Collections
                </Link>
                <span className="text-[#D8B36A]">&gt;</span>
                <span className="font-semibold text-[#30231F]">{currentCategory.name}</span>
              </nav>

              {/* Category Main Heading */}
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#30231F]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {currentCategory.name} Collection
              </h1>

              {/* Short Editorial Description */}
              <p className="text-sm sm:text-base text-[#786D63] font-light max-w-xl leading-relaxed">
                {currentCategory.description ||
                  `Explore our exclusive range of traditional and contemporary gold ${currentCategory.name.toLowerCase()} designs crafted with precision and elegance.`}
              </p>

              {/* Small Gold Decorative Divider */}
              <div className="pt-1">
                <SectionOrnament />
              </div>

              {/* 3 Value Reassurance Badges */}
              <div className="pt-3 flex flex-wrap items-center gap-6 sm:gap-8 text-xs text-[#30231F]">
                <div className="flex items-center gap-2">
                  <Gem size={18} className="text-[#C4933D]" />
                  <span className="font-medium">Traditional Designs</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-[#C4933D]" />
                  <span className="font-medium">Fine Craftsmanship</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4.5 h-4.5 text-[#C4933D] stroke-current fill-none stroke-[1.8]"
                  >
                    <path d="M12 3c1.5 3 4 5 7 5-2 3-4 6-7 13-3-7-5-10-7-13 3 0 5.5-2 7-5z" />
                    <path d="M12 9c.8 1.8 2.5 3 4.5 3-1.2 2-2.5 4-4.5 8-2-4-3.3-6-4.5-8 2 0 3.7-1.2 4.5-3z" />
                  </svg>
                  <span className="font-medium">Timeless Elegance</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Jewellery Photography on Satin with Jasmine Flowers */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[16/10] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-xl border border-[#D8B36A]/40 bg-[#FAF5E8]">
                <img
                  src={
                    currentCategory.slug === 'bangles'
                      ? 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=85'
                      : currentCategory.image
                  }
                  alt={`${currentCategory.name} Collection`}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />

                {/* Bottom-right Overlay Text: "Tradition in Every Curve — ♦ —" */}
                <div className="absolute bottom-3 right-4 sm:bottom-4 sm:right-5 bg-black/45 backdrop-blur-xs px-3.5 py-1.5 rounded-xl text-center border border-white/20">
                  <p
                    className="text-xs sm:text-sm font-serif italic text-white tracking-wide"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Tradition in Every Curve
                  </p>
                  <div className="flex items-center justify-center gap-1.5 text-[8px] text-[#D8B36A] mt-0.5">
                    <span className="w-4 h-px bg-[#D8B36A]/60" />
                    <span>♦</span>
                    <span className="w-4 h-px bg-[#D8B36A]/60" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. CATEGORY QUICK SELECTOR ROW (Horizontal Scrollable Category Bar) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-5">
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
            {categories.map((cat) => {
              const isSelected = selectedCategorySlug === cat.slug

              return (
                <button
                  key={cat.slug}
                  onClick={() => handleCategorySwitch(cat.slug)}
                  className={`group flex flex-col items-center flex-shrink-0 w-28 sm:w-32 md:w-36 p-2 sm:p-2.5 rounded-2xl transition-all duration-300 text-center cursor-pointer ${
                    isSelected
                      ? 'bg-[#351016] text-white shadow-md ring-2 ring-[#C4933D] scale-[1.02]'
                      : 'bg-white text-[#30231F] border border-[#D8B36A]/30 hover:border-[#C4933D] hover:shadow-sm'
                  }`}
                >
                  {/* Thumbnail Image */}
                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#F5EBDD] mb-2 border border-black/5">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Category Name */}
                  <span
                    className={`text-xs font-semibold leading-tight truncate w-full px-1 ${
                      isSelected ? 'text-white' : 'text-[#30231F] group-hover:text-[#C4933D]'
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
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. TOOLBAR STRIP (Search, Dropdown Filters, Sort by, View Toggle) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pb-6">
        <div className="bg-white border border-[#D8B36A]/40 rounded-2xl p-3 sm:p-3.5 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* Left Group: Search Bar + Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto flex-1">
            {/* Search Input Pill */}
            <div className="relative flex items-center bg-[#FFFCF7] border border-[#D8B36A]/50 rounded-full px-3.5 py-2 w-full sm:w-64 focus-within:border-[#C4933D] transition-colors">
              <Search size={15} className="text-[#786D63] flex-shrink-0 mr-2" />
              <input
                type="search"
                placeholder={`Search ${currentCategory.name.toLowerCase()} by name or ID…`}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full text-xs bg-transparent outline-none text-[#30231F] placeholder-[#786D63]"
              />
            </div>

            {/* Dropdown 1: All Styles */}
            <div className="relative inline-flex items-center">
              <select
                value={selectedStyle}
                onChange={(e) => {
                  setSelectedStyle(e.target.value)
                  setCurrentPage(1)
                }}
                className="appearance-none bg-[#FFFCF7] border border-[#D8B36A]/40 hover:border-[#C4933D] rounded-full text-xs text-[#30231F] font-medium py-2 pl-3.5 pr-8 outline-none cursor-pointer transition-colors shadow-2xs"
              >
                {STYLE_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={13} className="text-[#786D63] absolute right-2.5 pointer-events-none" />
            </div>

            {/* Dropdown 2: Price Range */}
            <div className="relative inline-flex items-center">
              <select
                onChange={() => {}}
                className="appearance-none bg-[#FFFCF7] border border-[#D8B36A]/40 hover:border-[#C4933D] rounded-full text-xs text-[#30231F] font-medium py-2 pl-3.5 pr-8 outline-none cursor-pointer transition-colors shadow-2xs"
              >
                <option value="all">Price Range</option>
                <option value="enquiry">Price on Enquiry</option>
              </select>
              <ChevronDown size={13} className="text-[#786D63] absolute right-2.5 pointer-events-none" />
            </div>

            {/* Dropdown 3: Weight */}
            <div className="relative inline-flex items-center">
              <select
                value={selectedWeight}
                onChange={(e) => {
                  setSelectedWeight(e.target.value)
                  setCurrentPage(1)
                }}
                className="appearance-none bg-[#FFFCF7] border border-[#D8B36A]/40 hover:border-[#C4933D] rounded-full text-xs text-[#30231F] font-medium py-2 pl-3.5 pr-8 outline-none cursor-pointer transition-colors shadow-2xs"
              >
                {WEIGHT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={13} className="text-[#786D63] absolute right-2.5 pointer-events-none" />
            </div>

            {/* Dropdown 4: Occasion */}
            <div className="relative inline-flex items-center">
              <select
                value={selectedOccasion}
                onChange={(e) => {
                  setSelectedOccasion(e.target.value)
                  setCurrentPage(1)
                }}
                className="appearance-none bg-[#FFFCF7] border border-[#D8B36A]/40 hover:border-[#C4933D] rounded-full text-xs text-[#30231F] font-medium py-2 pl-3.5 pr-8 outline-none cursor-pointer transition-colors shadow-2xs"
              >
                {OCCASION_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={13} className="text-[#786D63] absolute right-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Right Group: Sort by + Grid/List View Toggle */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-1.5 text-xs text-[#786D63]">
              <span className="font-medium whitespace-nowrap">Sort by:</span>
              <div className="relative inline-flex items-center">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-[#FFFCF7] border border-[#D8B36A]/40 hover:border-[#C4933D] rounded-xl text-xs text-[#30231F] font-semibold py-1.5 pl-3 pr-7 outline-none cursor-pointer transition-colors"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={13} className="text-[#786D63] absolute right-2 pointer-events-none" />
              </div>
            </div>

            {/* View Mode Toggle Icons */}
            <div className="flex items-center border border-[#D8B36A]/40 rounded-xl overflow-hidden bg-[#FFFCF7]">
              <button
                onClick={() => setViewMode('grid')}
                aria-label="Grid View"
                className={`p-1.5 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[#C4933D] text-white'
                    : 'text-[#786D63] hover:text-[#30231F]'
                }`}
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                aria-label="List View"
                className={`p-1.5 transition-colors ${
                  viewMode === 'list'
                    ? 'bg-[#C4933D] text-white'
                    : 'text-[#786D63] hover:text-[#30231F]'
                }`}
              >
                <List size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. MAIN CONTENT AREA (Left Filter Sidebar + Right Product Grid) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pb-16">
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-4 flex items-center justify-between bg-white rounded-2xl border border-[#D8B36A]/40 p-3.5 shadow-2xs">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-[#C4933D]" />
            <span className="text-xs font-bold text-[#30231F]">Filters &amp; Refinements</span>
            {activeFilterCount > 0 && (
              <span className="bg-[#C4933D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setMobileFiltersOpen((v) => !v)}
            className="text-xs font-semibold text-[#C4933D] flex items-center gap-1 cursor-pointer bg-[#F5EBDD] px-3 py-1.5 rounded-xl hover:bg-[#D8B36A]/30 transition-colors"
          >
            <span>{mobileFiltersOpen ? 'Hide Filters' : 'Filter Designs'}</span>
            {mobileFiltersOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ─── LEFT SIDEBAR: Collapsible Accordion Filters ─── */}
          <aside className={`lg:col-span-3 space-y-4 ${mobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl border border-[#D8B36A]/40 p-5 shadow-xs space-y-5 lg:sticky lg:top-24">
              {/* Accordion 1: Filter by Style */}
              <div className="border-b border-[#F5EBDD] pb-4">
                <button
                  onClick={() => setStyleExpanded((v) => !v)}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#30231F] py-1"
                >
                  <span>Filter by Style</span>
                  {styleExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </button>

                {styleExpanded && (
                  <div className="mt-3 space-y-2.5">
                    {STYLE_OPTIONS.map((opt) => {
                      const isChecked = selectedStyle === opt.id
                      const count = styleCounts[opt.id] ?? 0

                      return (
                        <label
                          key={opt.id}
                          className="flex items-center justify-between text-xs text-[#30231F] cursor-pointer hover:text-[#C4933D] transition-colors select-none"
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {
                                setSelectedStyle(opt.id)
                                setCurrentPage(1)
                              }}
                              className="w-4 h-4 rounded border-[#D8B36A] text-[#C4933D] focus:ring-[#C4933D] cursor-pointer accent-[#C4933D]"
                            />
                            <span className={isChecked ? 'font-semibold text-[#C4933D]' : 'font-normal'}>
                              {opt.label}
                            </span>
                          </div>
                          {opt.id !== 'all' && (
                            <span className="text-[11px] text-[#786D63] font-mono">({count})</span>
                          )}
                        </label>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Accordion 2: Price Range */}
              <div className="border-b border-[#F5EBDD] pb-4">
                <button
                  onClick={() => setPriceExpanded((v) => !v)}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#30231F] py-1"
                >
                  <span>Price Range</span>
                  {priceExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </button>

                {priceExpanded && (
                  <div className="mt-3 space-y-2 text-xs text-[#786D63]">
                    <p className="leading-relaxed">
                      All jewellery is handcrafted in pure 22 KT gold. Current pricing is provided on enquiry based on the day&apos;s gold rate.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Weight */}
              <div className="border-b border-[#F5EBDD] pb-4">
                <button
                  onClick={() => setWeightExpanded((v) => !v)}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#30231F] py-1"
                >
                  <span>Weight</span>
                  {weightExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </button>

                {weightExpanded && (
                  <div className="mt-3 space-y-2.5">
                    {WEIGHT_OPTIONS.map((opt) => (
                      <label
                        key={opt.id}
                        className="flex items-center gap-2.5 text-xs text-[#30231F] cursor-pointer hover:text-[#C4933D] transition-colors"
                      >
                        <input
                          type="radio"
                          name="weight-filter"
                          checked={selectedWeight === opt.id}
                          onChange={() => {
                            setSelectedWeight(opt.id)
                            setCurrentPage(1)
                          }}
                          className="w-3.5 h-3.5 text-[#C4933D] focus:ring-[#C4933D] accent-[#C4933D]"
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Accordion 4: Availability */}
              <div className="pb-1">
                <button
                  onClick={() => setAvailabilityExpanded((v) => !v)}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#30231F] py-1"
                >
                  <span>Availability</span>
                  {availabilityExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </button>

                {availabilityExpanded && (
                  <div className="mt-3 space-y-2.5">
                    {AVAILABILITY_OPTIONS.map((opt) => (
                      <label
                        key={opt.id}
                        className="flex items-center gap-2.5 text-xs text-[#30231F] cursor-pointer hover:text-[#C4933D] transition-colors"
                      >
                        <input
                          type="radio"
                          name="availability-filter"
                          checked={selectedAvailability === opt.id}
                          onChange={() => {
                            setSelectedAvailability(opt.id)
                            setCurrentPage(1)
                          }}
                          className="w-3.5 h-3.5 text-[#C4933D] focus:ring-[#C4933D] accent-[#C4933D]"
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Clear All Filters Button */}
              <button
                onClick={handleClearAll}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#C4933D] hover:bg-[#B3832F] text-white font-semibold text-xs py-2.5 px-4 rounded-xl transition-all shadow-xs"
              >
                <RotateCcw size={13} />
                <span>Clear All Filters</span>
              </button>
            </div>
          </aside>

          {/* ─── RIGHT MAIN PANEL: Product Count, Grid & Pagination ─── */}
          <main className="lg:col-span-9 space-y-6">
            {/* Results Count Line */}
            <div className="flex items-center justify-between">
              <p className="text-xs sm:text-sm text-[#786D63]">
                Showing{' '}
                <span className="font-bold text-[#30231F]">{filteredProducts.length}</span>{' '}
                {currentCategory.name.toLowerCase()} design
                {filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Product Grid / Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#D8B36A]/40 p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#F5EBDD] flex items-center justify-center text-[#C4933D] mx-auto">
                  <RotateCcw size={20} />
                </div>
                <h3
                  className="text-lg font-bold text-[#30231F]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  No Designs Found
                </h3>
                <p className="text-xs text-[#786D63] max-w-sm mx-auto">
                  No jewellery designs match your selected filters. Try clearing your search or filters.
                </p>
                <button
                  onClick={handleClearAll}
                  className="inline-flex items-center gap-2 bg-[#C4933D] text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-xs hover:bg-[#B3832F] transition-colors"
                >
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5'
                    : 'grid grid-cols-1 sm:grid-cols-2 gap-4'
                }
              >
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpenLightbox={() => openLightbox(product)}
                  />
                ))}
              </div>
            )}

            {/* ─── Pagination Row (Matching Screenshot: < 1 2 3 4 >) ─── */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                {/* Prev Button */}
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="w-8 h-8 rounded-full border border-[#D8B36A]/50 bg-white hover:bg-[#F5EBDD] text-[#30231F] flex items-center justify-center disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-2xs text-xs"
                >
                  <ChevronLeft size={15} />
                </button>

                {/* Numbered Page Buttons */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  const isActive = currentPage === pageNum

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-full text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-[#C4933D] text-white shadow-xs'
                          : 'bg-white border border-[#D8B36A]/50 text-[#30231F] hover:bg-[#F5EBDD]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}

                {/* Next Button */}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="w-8 h-8 rounded-full border border-[#D8B36A]/50 bg-white hover:bg-[#F5EBDD] text-[#30231F] flex items-center justify-center disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-2xs text-xs"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            )}
          </main>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 5. FULL-SCREEN LIGHTBOX MODAL */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {lightboxProduct && (
        <ProductLightbox
          product={lightboxProduct}
          products={filteredProducts}
          onClose={closeLightbox}
        />
      )}
    </div>
  )
}
