import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, Sparkles, MessageCircle, ArrowLeft, Trash2, Share2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Breadcrumb from '../components/Breadcrumb'
import ProductCard from '../components/ProductCard'
import ProductLightbox from '../components/ProductLightbox'
import { useAllProducts, useFavourites } from '../hooks/useProducts'
import { siteConfig } from '../config/siteConfig'

export default function Favourites() {
  const { favs, toggle } = useFavourites()
  const allProducts = useAllProducts()
  const navigate = useNavigate()

  const [lightboxProduct, setLightboxProduct] = useState(null)

  // Filter products that are in the favourites list
  const favouriteProducts = useMemo(() => {
    if (!favs || favs.length === 0) return []
    return allProducts.filter((p) => favs.includes(p.id) || favs.includes(p.slug))
  }, [allProducts, favs])

  // Clear all favourites
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all your favourite designs?')) {
      localStorage.setItem('slgw_favourites', JSON.stringify([]))
      window.location.reload()
    }
  }

  // Create combined WhatsApp enquiry message with all liked designs
  const handleWhatsAppEnquireAll = () => {
    if (favouriteProducts.length === 0) return

    const designsList = favouriteProducts
      .map((p, idx) => `${idx + 1}. ${p.name} (Design ID: ${p.id})`)
      .join('\n')

    const message = encodeURIComponent(
      `Vanakkam! I am interested in these favourite designs from Lakshmanan Gold Works:\n\n${designsList}\n\nPlease share availability, weight estimates, and current gold rate details. Nandri!`
    )

    const whatsappNumber = siteConfig.social.whatsappNumber || '919994541091'
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-[#FFFCF7]">
      {/* ─── Breadcrumb Bar ─── */}
      <div className="bg-[#F5EBDD]/60 border-b border-[#D8B36A]/30">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-3.5">
          <Breadcrumb
            crumbs={[
              { label: 'Home', to: '/' },
              { label: 'Collections', to: '/collections' },
              { label: 'Favourite Collections' },
            ]}
          />
        </div>
      </div>

      {/* ─── Hero Header ─── */}
      <div className="relative py-10 sm:py-14 px-4 sm:px-6 lg:px-10 border-b border-[#D8B36A]/20 bg-gradient-to-b from-[#F5EBDD]/40 to-[#FFFCF7]">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#351016]/5 border border-[#351016]/10 text-[#351016] text-[11px] font-semibold tracking-wider uppercase mb-3">
              <Heart size={12} className="fill-rose-500 text-rose-500" />
              <span>Your Personal Wishlist</span>
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#30231F] tracking-tight leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Favourite Collections
            </h1>

            <p className="text-xs sm:text-sm text-[#786D63] max-w-xl mt-2 leading-relaxed">
              Explore your saved handcrafted jewellery designs. Tap on any design to inspect its full details, weight, purity, and zoom into master craftsmanship.
            </p>
          </div>

          {/* Action Buttons when favourites exist */}
          {favouriteProducts.length > 0 && (
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={handleWhatsAppEnquireAll}
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold px-5 py-2.5 rounded-full text-xs transition-all shadow-sm hover:shadow-md hover:scale-[1.02]"
              >
                <MessageCircle size={15} />
                <span>Enquire All on WhatsApp ({favouriteProducts.length})</span>
              </button>

              <button
                onClick={handleClearAll}
                className="inline-flex items-center gap-1.5 text-xs text-[#786D63] hover:text-rose-600 px-3 py-2 rounded-full border border-[#D8B36A]/40 hover:border-rose-300 transition-colors bg-white"
                title="Clear all favourites"
              >
                <Trash2 size={13} />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
        {favouriteProducts.length === 0 ? (
          /* Empty Wishlist State */
          <div className="flex flex-col items-center justify-center text-center py-20 sm:py-28 px-4 bg-white rounded-3xl border border-[#D8B36A]/30 shadow-xs max-w-2xl mx-auto">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full bg-[#F5EBDD] flex items-center justify-center text-rose-500 shadow-inner">
                <Heart size={36} className="fill-rose-500/20 text-rose-500 stroke-[1.8]" />
              </div>
              <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#C4933D] text-white flex items-center justify-center shadow-xs">
                <Sparkles size={14} />
              </div>
            </div>

            <h2
              className="text-2xl sm:text-3xl font-bold text-[#30231F] mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              No Favourite Designs Yet
            </h2>

            <p className="text-xs sm:text-sm text-[#786D63] max-w-md mb-8 leading-relaxed">
              You haven't liked any jewellery designs yet. Browse our collections of gold bangles, chains, earrings, and necklaces, and tap the heart icon on any piece you love.
            </p>

            <div className="flex items-center gap-3 flex-wrap justify-center">
              <Link
                to="/collections"
                className="inline-flex items-center gap-2 bg-[#C4933D] hover:bg-[#A8792B] text-white font-semibold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-all shadow-md hover:scale-[1.02]"
              >
                <span>Browse All Collections</span>
              </Link>
              <Link
                to="/new-arrivals"
                className="inline-flex items-center gap-2 bg-white hover:bg-[#F5EBDD] text-[#30231F] font-semibold px-6 py-3 rounded-full text-xs border border-[#D8B36A]/50 transition-colors"
              >
                <span>Explore New Arrivals</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Grid of Liked Products */
          <div>
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#D8B36A]/20">
              <span className="text-xs font-semibold text-[#786D63] uppercase tracking-wider">
                Showing {favouriteProducts.length} Saved {favouriteProducts.length === 1 ? 'Design' : 'Designs'}
              </span>

              <Link
                to="/collections"
                className="text-xs font-semibold text-[#C4933D] hover:text-[#351016] flex items-center gap-1 transition-colors"
              >
                <span>Continue Browsing</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {favouriteProducts.map((product) => (
                <div key={product.id}>
                  <ProductCard
                    product={product}
                    isFav={true}
                    onToggleFav={toggle}
                    onOpenLightbox={(p) => setLightboxProduct(p)}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        )}
      </div>

      {/* Lightbox Modal (Fallback if opened) */}
      {lightboxProduct && (
        <ProductLightbox
          product={lightboxProduct}
          onClose={() => setLightboxProduct(null)}
          pool={favouriteProducts}
        />
      )}
    </div>
  )
}
