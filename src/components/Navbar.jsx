import { useState, useEffect } from 'react'
import { NavLink, useNavigate, useLocation, Link } from 'react-router-dom'
import {
  Search,
  X,
  Menu,
  Heart,
  MapPin,
  ChevronRight,
} from 'lucide-react'
import { InstagramIcon, FacebookIcon } from './SocialIcons'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig } from '../config/siteConfig'
import { categories as initialCategories } from '../data/categories'
import { useAdmin } from '../context/AdminContext'
import BrandLogo from './BrandLogo'
import { useFavourites } from '../hooks/useProducts'

const NAV_LINKS = [
  { to: '/', label: 'Home', exact: true },
  { to: '/collections', label: 'Collections' },
  { to: '/new-arrivals', label: 'New Arrivals' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const adminCtx = useAdmin()
  const rawCategories = adminCtx?.categories || initialCategories
  const categories = rawCategories.filter(
    (c) =>
      (c.status ? c.status === 'Active' : true) &&
      String(c.slug || '').toLowerCase() !== 'dummy' &&
      String(c.name || '').toLowerCase() !== 'dummy'
  )

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const { favs } = useFavourites()
  const navigate = useNavigate()
  const location = useLocation()

  // Close mobile sidebar and search on route change
  const [prevPath, setPrevPath] = useState(location.pathname)
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname)
    setSidebarOpen(false)
    setMobileSearchOpen(false)
  }

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when sidebar open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [sidebarOpen])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/collections?q=${encodeURIComponent(searchQuery.trim())}`)
      setSidebarOpen(false)
      setSearchQuery('')
    }
  }

  // Helper to determine active state (Collections active on /collections and /collections/*)
  const isLinkActive = (to, exact) => {
    if (exact) {
      return location.pathname === to
    }
    if (to === '/collections') {
      return location.pathname.startsWith('/collections')
    }
    return location.pathname === to
  }

  return (
    <>
      {/* ─── 1. TOP ANNOUNCEMENT / UTILITY STRIP (Deep Burgundy #351016) ─── */}
      <div className="bg-[#351016] text-[#F5EBDD] text-xs py-2 px-4 sm:px-6 lg:px-10 border-b border-[#45151D]">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs">
          {/* Left features with diamond/sparkle separators */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-center font-medium tracking-wide">
            <span className="text-[#C4933D] text-[11px]">✦</span>
            <span className="hover:text-white transition-colors">Traditional Designs</span>
            <span className="text-[#C4933D] text-[11px]">✦</span>
            <span className="hover:text-white transition-colors">Custom Jewellery</span>
            <span className="text-[#C4933D] text-[11px]">✦</span>
            <span className="hover:text-white transition-colors">Trusted Craftsmanship</span>
            <span className="text-[#C4933D] text-[11px]">✦</span>
          </div>

          {/* Right Links & Location */}
          <div className="hidden sm:flex items-center gap-4 text-[#D8B36A]">
            <div className="flex items-center gap-2">
              <span className="text-white/70">Follow Us</span>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-white transition-colors"
              >
                <InstagramIcon size={13} />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-white transition-colors"
              >
                <FacebookIcon size={13} />
              </a>
            </div>

            <span className="text-white/20">|</span>

            <Link to="/contact" className="hover:text-white transition-colors">
              Visit Our Store
            </Link>

            <span className="text-white/20">|</span>

            <div className="flex items-center gap-1.5 text-white/80">
              <MapPin size={12} className="text-[#C4933D]" />
              <span className="truncate max-w-[240px]">{siteConfig.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 2. MAIN HEADER (Warm Ivory #FFFCF7) ─── */}
      <header
        className={`sticky top-0 z-40 bg-[#FFFCF7]/98 backdrop-blur-md border-b border-[#F5EBDD] transition-shadow duration-300 ${
          scrolled ? 'shadow-md shadow-[#30231F]/5' : ''
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-18 lg:h-20 gap-4">
            {/* Left: Mobile hamburger & Brand Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => setSidebarOpen(true)}
                aria-label="Open navigation sidebar"
                className="lg:hidden p-2 -ml-2 rounded-xl text-[#30231F] hover:bg-[#F5EBDD] transition-colors"
              >
                <Menu size={22} />
              </button>

              <BrandLogo />
            </div>

            {/* Center Navigation Links: Home, Collections (normal link without chevron), New Arrivals, About Us, Contact */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-3" aria-label="Main navigation">
              {NAV_LINKS.map(({ to, label, exact }) => {
                const active = isLinkActive(to, exact)
                return (
                  <NavLink
                    key={to}
                    to={to}
                    end={exact}
                    className={`relative px-3.5 py-2 text-sm font-medium tracking-wide transition-colors ${
                      active
                        ? 'text-[#30231F] font-semibold'
                        : 'text-[#30231F] hover:text-[#C4933D]'
                    }`}
                  >
                    <span>{label}</span>
                    {active && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2.5px] bg-[#C4933D] rounded-full" />
                    )}
                  </NavLink>
                )
              })}
            </nav>

            {/* Right: Search Capsule, Wishlist */}
            <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
              {/* Mobile Search Toggle Icon */}
              <button
                type="button"
                onClick={() => setMobileSearchOpen((v) => !v)}
                aria-label="Toggle mobile search"
                className="md:hidden p-2 text-[#30231F] hover:text-[#C4933D] rounded-full transition-colors"
              >
                <Search size={19} />
              </button>

              {/* Search Capsule Input with dual magnifying glass style */}
              <form
                onSubmit={handleSearchSubmit}
                className="hidden md:flex items-center justify-between gap-2 bg-[#FFFCF7] border border-[#D8B36A]/50 rounded-full px-3.5 py-1.5 focus-within:border-[#C4933D] transition-colors w-48 lg:w-60 shadow-xs"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Search size={14} className="text-[#786D63] flex-shrink-0" />
                  <input
                    type="search"
                    placeholder="Search designs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-xs bg-transparent outline-none text-[#30231F] placeholder-[#786D63]"
                  />
                </div>
                <button
                  type="submit"
                  aria-label="Search"
                  className="text-[#786D63] hover:text-[#C4933D] transition-colors flex-shrink-0"
                >
                  <Search size={13} />
                </button>
              </form>

              {/* Wishlist Heart Button */}
              <Link
                to="/collections"
                aria-label="View favourites"
                className="relative p-2 text-[#30231F] hover:text-[#C4933D] transition-colors"
              >
                <Heart size={20} className="stroke-[1.6]" />
                {favs.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-[#C4933D] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {favs.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Search Dropdown Bar */}
        <AnimatePresence>
          {mobileSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-[#FFFCF7] border-t border-[#D8B36A]/30 px-4 py-2.5 shadow-xs"
            >
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-2 bg-white border border-[#D8B36A]/60 rounded-full px-3.5 py-2 shadow-2xs"
              >
                <Search size={15} className="text-[#786D63] flex-shrink-0" />
                <input
                  type="search"
                  autoFocus
                  placeholder="Search bangles, rings, chains..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs bg-transparent outline-none text-[#30231F] placeholder-[#786D63]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-[#786D63] hover:text-[#30231F]"
                  >
                    <X size={14} />
                  </button>
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── 3. SIDEBAR NAVIGATION DRAWER (Mobile + Tablet) ─── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              key="sidebar-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-50 bg-[#30231F]/70 backdrop-blur-xs"
              aria-hidden="true"
            />

            <motion.aside
              key="sidebar-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.28, ease: 'easeOut' }}
              className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-white text-[#30231F] flex flex-col shadow-2xl overflow-y-auto"
              aria-label="Mobile Navigation"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#F5EBDD] bg-[#F5EBDD]/50">
                <BrandLogo />
                <button
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-lg text-[#30231F] hover:bg-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="p-4 border-b border-[#F5EBDD]">
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center gap-2 bg-[#FFFCF7] border border-[#D8B36A]/50 rounded-full px-3.5 py-2 focus-within:border-[#C4933D]"
                >
                  <Search size={15} className="text-[#786D63]" />
                  <input
                    type="search"
                    placeholder="Search designs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-xs bg-transparent outline-none text-[#30231F] placeholder-[#786D63]"
                  />
                </form>
              </div>

              {/* Mobile Main Navigation Links */}
              <nav className="p-4 space-y-1">
                {NAV_LINKS.map(({ to, label, exact }) => {
                  const active = isLinkActive(to, exact)
                  return (
                    <NavLink
                      key={to}
                      to={to}
                      end={exact}
                      onClick={() => setSidebarOpen(false)}
                      className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        active
                          ? 'bg-[#F5EBDD] text-[#C4933D] font-semibold'
                          : 'text-[#30231F] hover:bg-[#F5EBDD]'
                      }`}
                    >
                      {label}
                    </NavLink>
                  )
                })}
              </nav>

              {/* Mobile Categories Accordion/List */}
              <div className="p-4 border-t border-[#F5EBDD] space-y-2">
                <div className="flex items-center justify-between px-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C4933D]">
                    Browse Categories
                  </span>
                  <span className="text-[10px] text-[#786D63] font-medium">
                    {categories.length} Categories
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {categories.map((cat) => (
                    <NavLink
                      key={cat.slug}
                      to={`/collections/${cat.slug}`}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 p-2 rounded-lg text-xs font-medium transition-colors ${
                          isActive
                            ? 'bg-[#F5EBDD] text-[#C4933D] font-semibold'
                            : 'text-[#30231F] hover:bg-[#F5EBDD]'
                        }`
                      }
                    >
                      <ChevronRight size={12} className="text-[#C4933D] flex-shrink-0" />
                      <span className="truncate">{cat.name}</span>
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="mt-auto p-4 border-t border-[#F5EBDD] bg-[#F5EBDD]/50 space-y-3">
                <Link
                  to="/contact"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-[#C4933D] hover:bg-[#B3832F] text-white text-xs font-semibold py-2.5 px-4 rounded-full transition-colors shadow-sm"
                >
                  <span>Contact Us</span>
                </Link>
                <div className="text-[11px] text-[#786D63] text-center space-y-0.5">
                  <p className="font-semibold text-[#30231F]">Prop. {siteConfig.owner || 'T.L.Suriyanathan'}</p>
                  <p className="font-mono text-[10.5px]">
                    {siteConfig.phone} &bull; {siteConfig.phone2}
                  </p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
