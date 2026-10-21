import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Mail,
  Gem,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Clock,
  Phone,
  MapPin,
  Maximize2,
  Award,
  HeartHandshake,
  PenTool,
} from 'lucide-react'
import CategoryCard from '../components/CategoryCard'
import ProductCard from '../components/ProductCard'
import ProductLightbox from '../components/ProductLightbox'
import SectionOrnament from '../components/SectionOrnament'
import { categories } from '../data/categories'
import { useFeaturedProducts, useFavourites } from '../hooks/useProducts'
import { siteConfig } from '../config/siteConfig'
import { useAdmin } from '../context/AdminContext'

export default function Home() {
  const { websiteContent } = useAdmin()
  const heroData = websiteContent?.hero || {
    eyebrow: 'TRADITION × CRAFTSMANSHIP × TIMELESS BEAUTY',
    title: 'Jewellery That Tells Your Story',
    subtitle:
      'Explore our exclusive collection of traditional and contemporary gold jewellery designs for every occasion.',
    primaryButton: 'Explore Collections',
    secondaryButton: 'Contact Us',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&q=85',
  }
  const newArrivalsBanner = websiteContent?.homeNewArrivals || {
    eyebrow: 'NEW ARRIVALS',
    title: 'Latest Designs for Every Occasion',
    subtitle: 'From daily wear to grand celebrations, find the perfect jewellery to match your style.',
    buttonText: 'Explore New Arrivals',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1000&q=80',
  }
  const customBanner = websiteContent?.homeCustom || {
    eyebrow: 'Bring Your Ideas to Life',
    title: 'Custom Jewellery Designs',
    subtitle: 'Have a design in mind? Let us create it for you with expert craftsmanship and attention to detail.',
    buttonText: 'Request a Custom Design',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1000&q=80',
  }
  const craftBanner = websiteContent?.homeCraft || {
    eyebrow: 'OUR CRAFTSMANSHIP',
    title: 'Tradition in Every Detail',
    subtitle: 'Each piece is crafted with care, skill and a deep respect for our rich heritage. We focus on quality, detail and timeless designs.',
    buttonText: 'Know More About Us',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1000&q=80',
  }
  const featuredProducts = useFeaturedProducts(8)
  const [lightboxProduct, setLightboxProduct] = useState(null)
  const [lightboxPool, setLightboxPool] = useState([])
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [heroSlide, setHeroSlide] = useState(0)
  const { isFav, toggle } = useFavourites()
  const carouselContainerRef = useRef(null)

  const openLightbox = (product, pool) => {
    setLightboxProduct(product)
    setLightboxPool(pool ?? [product])
  }

  const closeLightbox = () => {
    setLightboxProduct(null)
    setLightboxPool([])
  }

  // Carousel controls for featured products (4 visible at a time)
  const maxIndex = Math.max(0, featuredProducts.length - 4)
  const handlePrev = () => setCarouselIndex((i) => Math.max(0, i - 1))
  const handleNext = () => setCarouselIndex((i) => Math.min(maxIndex, i + 1))

  return (
    <div className="bg-[#FFFCF7] text-[#30231F]">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. HERO SECTION (Editorial Bridal Split Banner) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center bg-[#1A110D] text-white overflow-hidden">
        {/* Background Radial Lighting for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A110D] via-[#1A110D]/90 to-transparent z-10" />

        {/* Right Bridal Imagery */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[62%] h-full z-0">
          <img
            src={heroData.image}
            alt="Lakshmanan Gold Works Hero Banner"
            fetchPriority="high"
            className="w-full h-full object-cover object-center brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A110D] via-[#1A110D]/50 to-transparent lg:via-[#1A110D]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A110D] via-transparent to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24 w-full">
          <div className="max-w-xl space-y-6">
            {/* Sub-eyebrow: TRADITION × CRAFTSMANSHIP × TIMELESS BEAUTY */}
            <div className="flex items-center gap-2.5 text-[10.5px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#D8B36A]">
              <span>TRADITION</span>
              <span className="text-[#C4933D] font-normal">&times;</span>
              <span>CRAFTSMANSHIP</span>
              <span className="text-[#C4933D] font-normal">&times;</span>
              <span>TIMELESS BEAUTY</span>
            </div>

            {/* Big Heading */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {heroData.title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-white/85 font-light leading-relaxed max-w-md">
              {heroData.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                to="/collections"
                className="inline-flex items-center gap-2 bg-[#C4933D] hover:bg-[#B3832F] text-white font-semibold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full transition-all shadow-md hover:shadow-lg"
              >
                <span>{heroData.primaryButton || 'Explore Collections'}</span>
                <ArrowRight size={14} />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-black/25 hover:bg-white/10 border border-white/40 text-white font-semibold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-all backdrop-blur-xs"
              >
                <span>
                  {heroData.secondaryButton && heroData.secondaryButton !== 'Enquire on WhatsApp'
                    ? heroData.secondaryButton
                    : 'Contact Us'}
                </span>
              </Link>
            </div>

            {/* 3 Badges with 2-line layout and dividers matching reference */}
            <div className="pt-6 border-t border-white/15 flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-6 text-xs text-white/90">
              {/* Badge 1 */}
              <div className="flex items-center gap-2 sm:gap-2.5">
                <Gem size={18} className="text-[#D8B36A] flex-shrink-0" />
                <div className="text-left leading-tight">
                  <div className="text-xs sm:text-sm font-semibold text-white">Premium</div>
                  <div className="text-[10px] sm:text-xs text-white/70">Craftsmanship</div>
                </div>
              </div>

              {/* Vertical divider */}
              <div className="h-7 w-[1px] bg-white/20 hidden xs:block" />

              {/* Badge 2 */}
              <div className="flex items-center gap-2 sm:gap-2.5">
                <ShieldCheck size={18} className="text-[#D8B36A] flex-shrink-0" />
                <div className="text-left leading-tight">
                  <div className="text-xs sm:text-sm font-semibold text-white">Trusted</div>
                  <div className="text-[10px] sm:text-xs text-white/70">Quality</div>
                </div>
              </div>

              {/* Vertical divider */}
              <div className="h-7 w-[1px] bg-white/20 hidden xs:block" />

              {/* Badge 3 */}
              <div className="flex items-center gap-2 sm:gap-2.5">
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 sm:w-5 sm:h-5 text-[#D8B36A] stroke-current fill-none stroke-[1.8] flex-shrink-0"
                >
                  <path d="M12 3c1.5 3 4 5 7 5-2 3-4 6-7 13-3-7-5-10-7-13 3 0 5.5-2 7-5z" />
                  <path d="M12 9c.8 1.8 2.5 3 4.5 3-1.2 2-2.5 4-4.5 8-2-4-3.3-6-4.5-8 2 0 3.7-1.2 4.5-3z" />
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-xs sm:text-sm font-semibold text-white">Custom</div>
                  <div className="text-[10px] sm:text-xs text-white/70">Designs</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Carousel Navigation Pill in Bottom Right Corner */}
        <div className="hidden sm:flex absolute bottom-6 right-6 lg:bottom-10 lg:right-12 z-20 items-center gap-2 bg-black/50 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full text-white/80 shadow-lg">
          <button
            onClick={() => setHeroSlide((s) => (s === 0 ? 1 : 0))}
            aria-label="Previous banner"
            className="hover:text-white transition-colors"
          >
            <ChevronLeft size={14} />
          </button>
          <div className="flex items-center gap-1.5 px-1">
            <span
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                heroSlide === 0 ? 'bg-white w-2' : 'bg-white/40'
              }`}
            />
            <span
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                heroSlide === 1 ? 'bg-white w-2' : 'bg-white/40'
              }`}
            />
          </div>
          <button
            onClick={() => setHeroSlide((s) => (s === 0 ? 1 : 0))}
            aria-label="Next banner"
            className="hover:text-white transition-colors"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. SHOP BY CATEGORY SECTION */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:mb-10 gap-3">
          <div className="flex items-center gap-3">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#30231F] tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Shop by Category
            </h2>
            <SectionOrnament />
          </div>

          <Link
            to="/collections"
            className="text-xs sm:text-sm font-medium text-[#786D63] hover:text-[#C4933D] transition-colors"
          >
            Explore Our Wide Range of Collections
          </Link>
        </div>

        {/* 8 Category Cards Grid (4 columns x 2 rows) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. FEATURED DESIGNS SECTION (With Slider Controls) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#F5EBDD]/60 border-y border-[#D8B36A]/30">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-3">
            <div className="flex items-center gap-3">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#30231F] tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Featured Designs
              </h2>
              <SectionOrnament />
            </div>

            <Link
              to="/collections"
              className="text-xs sm:text-sm font-semibold text-[#786D63] hover:text-[#C4933D] flex items-center gap-1 transition-colors"
            >
              <span>View All Designs</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Carousel with Left & Right Arrows */}
          <div className="relative">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              disabled={carouselIndex === 0}
              aria-label="Previous featured designs"
              className="flex absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-md border border-[#D8B36A]/40 items-center justify-center text-[#30231F] hover:text-[#C4933D] disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Cards Grid: 4 items at a time */}
            <div
              ref={carouselContainerRef}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6"
            >
              {featuredProducts.slice(carouselIndex, carouselIndex + 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenLightbox={(p) => openLightbox(p, featuredProducts)}
                  isFav={isFav(product.id)}
                  onToggleFav={toggle}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={carouselIndex >= maxIndex}
              aria-label="Next featured designs"
              className="flex absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-md border border-[#D8B36A]/40 items-center justify-center text-[#30231F] hover:text-[#C4933D] disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {[0, 1, 2, 3].map((dot) => (
              <button
                key={dot}
                onClick={() => setCarouselIndex(Math.min(dot, maxIndex))}
                aria-label={`Go to slide ${dot + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  carouselIndex === dot
                    ? 'w-6 bg-[#C4933D]'
                    : 'w-2 bg-[#D8B36A]/40 hover:bg-[#C4933D]/60'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. LATEST DESIGNS FOR EVERY OCCASION (Deep Burgundy Banner #351016) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="bg-[#351016] text-white relative overflow-hidden py-14 lg:py-18 border-b border-[#45151D]">
        {/* Subtle Ornamental Mandala Watermark in Background */}
        <div className="absolute right-0 bottom-0 w-96 h-96 opacity-10 pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full stroke-[#C4933D]">
            <circle cx="100" cy="100" r="80" strokeWidth="1" />
            <circle cx="100" cy="100" r="60" strokeWidth="0.8" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="40" strokeWidth="1" />
            <path d="M100 20 C120 70 180 100 180 100 C180 100 120 130 100 180 C80 130 20 100 20 100 C20 100 80 70 100 20 Z" strokeWidth="1" />
          </svg>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Image: Heavy Gold Waist Belt / Necklace on Dark Wood */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#C4933D]/30 shadow-2xl bg-[#240B12]">
                <img
                  src={newArrivalsBanner.image}
                  alt={newArrivalsBanner.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Text */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-[#D8B36A]">
                {newArrivalsBanner.eyebrow}
              </span>

              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {newArrivalsBanner.title}
              </h2>

              <p className="text-sm sm:text-base text-[#F5EBDD]/80 font-light max-w-lg leading-relaxed">
                {newArrivalsBanner.subtitle}
              </p>

              <div className="pt-2">
                <Link
                  to="/new-arrivals"
                  className="inline-flex items-center gap-2 bg-[#C4933D] hover:bg-[#B3832F] text-white font-semibold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full transition-all shadow-md"
                >
                  <span>{newArrivalsBanner.buttonText}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 5. CUSTOM JEWELLERY DESIGNS (Bespoke Warm Champagne Section) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="bg-[#F5EBDD] relative overflow-hidden py-14 lg:py-18 border-b border-[#D8B36A]/40">
        {/* Subtle Corner Floral Watermark */}
        <div className="absolute left-0 bottom-0 w-64 h-64 opacity-20 pointer-events-none">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-[#C4933D]">
            <circle cx="20" cy="80" r="50" strokeWidth="0.8" />
            <circle cx="20" cy="80" r="30" strokeWidth="0.5" strokeDasharray="2 2" />
          </svg>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] sm:text-xs font-semibold text-[#C4933D] tracking-wider block">
                {customBanner.eyebrow}
              </span>

              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#30231F] tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {customBanner.title}
              </h2>

              <p className="text-sm sm:text-base text-[#786D63] font-light max-w-lg leading-relaxed">
                {customBanner.subtitle}
              </p>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-[#C4933D] hover:bg-[#B3832F] text-white font-semibold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full transition-all shadow-md"
                >
                  <span>
                    {customBanner.buttonText && customBanner.buttonText !== 'Start Custom Design on WhatsApp'
                      ? customBanner.buttonText
                      : 'Request Custom Design'}
                  </span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right Image: Goldsmith Drafting Real Gold Jewellery on Desk */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#D8B36A]/40 shadow-xl bg-white">
                <img
                  src={customBanner.image}
                  alt={customBanner.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 6. TRADITION IN EVERY DETAIL (Craftsmanship Story Section) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="bg-[#1A110D] text-white py-16 lg:py-20 border-b border-[#351016]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-[#D8B36A] block">
                {craftBanner.eyebrow}
              </span>

              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {craftBanner.title}
              </h2>

              <p className="text-sm sm:text-base text-white/85 font-light max-w-xl leading-relaxed">
                {craftBanner.subtitle}
              </p>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-[#C4933D] hover:bg-[#B3832F] text-white font-semibold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full transition-all shadow-md"
                >
                  <span>{craftBanner.buttonText}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* 3 Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-center sm:text-left">
                <div className="space-y-1.5">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#D8B36A] mx-auto sm:mx-0">
                    <PenTool size={16} />
                  </div>
                  <h4 className="text-xs font-semibold text-white">Skilled Craftsmanship</h4>
                </div>

                <div className="space-y-1.5">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#D8B36A] mx-auto sm:mx-0">
                    <Gem size={16} />
                  </div>
                  <h4 className="text-xs font-semibold text-white">Quality Materials</h4>
                </div>

                <div className="space-y-1.5">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#D8B36A] mx-auto sm:mx-0">
                    <HeartHandshake size={16} />
                  </div>
                  <h4 className="text-xs font-semibold text-white">Personalised Service</h4>
                </div>
              </div>
            </div>

            {/* Right Image: Hands of Master Goldsmith with Fine Tools */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#251A16]">
                <img
                  src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1000&q=80"
                  alt="Goldsmith Shaping Temple Gold Ornament"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 7. WHY CHOOSE LAKSHMANAN GOLD WORKS */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 text-center">
        <div className="inline-flex items-center gap-3 justify-center mb-10 flex-wrap">
          <h2
            className="text-2xl sm:text-3xl font-bold text-[#30231F] tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Why Choose Lakshmanan Gold Works
          </h2>
          <SectionOrnament />
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            {
              icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-[#C4933D] fill-none stroke-[1.8]">
                  <path d="M12 3c1.5 3 4 5 7 5-2 3-4 6-7 13-3-7-5-10-7-13 3 0 5.5-2 7-5z" />
                  <path d="M12 9c.8 1.8 2.5 3 4.5 3-1.2 2-2.5 4-4.5 8-2-4-3.3-6-4.5-8 2 0 3.7-1.2 4.5-3z" />
                </svg>
              ),
              title: 'Unique Designs',
              desc: 'Traditional and modern collections',
            },
            {
              icon: <Award size={22} className="text-[#C4933D]" />,
              title: 'Fine Craftsmanship',
              desc: 'Attention to every detail',
            },
            {
              icon: <ShieldCheck size={22} className="text-[#C4933D]" />,
              title: 'Trusted Quality',
              desc: 'Pure gold jewellery',
            },
            {
              icon: <Gem size={22} className="text-[#C4933D]" />,
              title: 'Custom Designs',
              desc: 'Bring your ideas to life',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#D8B36A]/40 shadow-xs hover:shadow-md transition-shadow flex flex-col items-center"
            >
              <div className="w-13 h-13 rounded-full bg-[#F5EBDD] border border-[#D8B36A]/40 flex items-center justify-center mb-4 shadow-xs">
                {item.icon}
              </div>
              <h3
                className="text-base font-bold text-[#30231F] mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {item.title}
              </h3>
              <p className="text-xs text-[#786D63] font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 8. VISIT OUR STORE SECTION */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#F5EBDD]/60 border-t border-[#D8B36A]/30">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-1">
            <div className="inline-flex items-center gap-3 justify-center">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#30231F] tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Visit Our Store
              </h2>
              <SectionOrnament />
            </div>
            <p className="text-xs sm:text-sm text-[#786D63]">
              We welcome you to visit our shop and explore our exclusive collection.
            </p>
          </div>

          {/* 3 Column Grid: Info, Map, Showroom Photo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Card 1: Contact Details */}
            <div className="bg-white rounded-2xl p-6 border border-[#D8B36A]/40 shadow-xs flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F5EBDD] flex items-center justify-center text-[#C4933D] flex-shrink-0 mt-0.5">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#30231F]">Our Location</h4>
                    <p className="text-xs text-[#786D63] mt-0.5 leading-relaxed">
                      {siteConfig.address}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F5EBDD] flex items-center justify-center text-[#C4933D] flex-shrink-0 mt-0.5">
                    <Phone size={15} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#30231F]">Phone</h4>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="text-xs text-[#786D63] hover:text-[#C4933D] font-mono mt-0.5 block"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F5EBDD] flex items-center justify-center text-[#C4933D] flex-shrink-0 mt-0.5">
                    <Mail size={15} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#30231F]">Email</h4>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-xs text-[#786D63] hover:text-[#C4933D] mt-0.5 block"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F5EBDD] flex items-center justify-center text-[#C4933D] flex-shrink-0 mt-0.5">
                    <Clock size={15} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#30231F]">Business Hours</h4>
                    <div className="text-xs text-[#786D63] mt-0.5 space-y-0.5">
                      <p>Mon - Sat: 9:30 AM - 9:00 PM</p>
                      <p>Sunday: 10:00 AM - 1:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Interactive Stylized Map */}
            <div className="bg-white rounded-2xl overflow-hidden border border-[#D8B36A]/40 shadow-xs relative flex flex-col min-h-[260px]">
              {/* Map Canvas Visual */}
              <div className="relative w-full h-full bg-[#E5E3DF] overflow-hidden flex items-center justify-center">
                {/* SVG Stylized Map roads and city grid */}
                <svg className="w-full h-full object-cover opacity-85" viewBox="0 0 400 300" fill="none">
                  <rect width="400" height="300" fill="#E8E6E1" />
                  {/* Water / Greenery */}
                  <path d="M0 40 Q80 80 120 120 T200 220 L250 300 L0 300 Z" fill="#DCE5DC" opacity="0.6" />
                  {/* Roads */}
                  <path d="M-20 120 L420 160" stroke="#FFFFFF" strokeWidth="12" />
                  <path d="M-20 120 L420 160" stroke="#F1EDE4" strokeWidth="8" />
                  <path d="M190 -20 L210 320" stroke="#FFFFFF" strokeWidth="10" />
                  <path d="M190 -20 L210 320" stroke="#F1EDE4" strokeWidth="6" />
                  <path d="M60 20 L350 280" stroke="#FFFFFF" strokeWidth="6" />
                  <path d="M60 20 L350 280" stroke="#FAF7F2" strokeWidth="4" />
                  <path d="M280 20 L80 280" stroke="#FFFFFF" strokeWidth="6" />
                </svg>

                {/* Map Pin on Ullal Main Road */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
                  <div className="bg-white px-2.5 py-1 rounded-md shadow-md border border-[#C4933D]/40 text-[10px] font-semibold text-[#30231F] whitespace-nowrap mb-1">
                    📍 Ullal Main Road
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#E53935] border-2 border-white flex items-center justify-center text-white shadow-lg animate-bounce">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                </div>

                {/* Expand Map Button */}
                <a
                  href={siteConfig.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white shadow-md flex items-center justify-center text-[#30231F] hover:text-[#C4933D] transition-colors"
                  aria-label="Expand map"
                >
                  <Maximize2 size={14} />
                </a>
              </div>
            </div>

            {/* Card 3: Visit Our Showroom Photo & Directions */}
            <div className="bg-white rounded-2xl overflow-hidden border border-[#D8B36A]/40 shadow-xs flex flex-col justify-between">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#240B12]">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                  alt="Interior of Lakshmanan Gold Works Showroom"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <h3
                    className="text-base font-bold text-[#30231F]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Visit Our Showroom
                  </h3>
                  <p className="text-xs text-[#786D63] mt-0.5">
                    Experience our jewellery collection in person.
                  </p>
                </div>

                <a
                  href={siteConfig.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-[#C4933D] hover:bg-[#B3832F] text-white font-semibold text-xs uppercase tracking-wider py-2.5 px-4 rounded-full transition-colors shadow-xs"
                >
                  <span>Get Directions</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* FULL SCREEN LIGHTBOX MODAL */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {lightboxProduct && (
        <ProductLightbox
          product={lightboxProduct}
          products={lightboxPool}
          onClose={closeLightbox}
        />
      )}
    </div>
  )
}
