import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Share2, MessageCircle, Eye, Link2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { buildWhatsAppUrl, buildProductUrl } from '../config/siteConfig'

const LONG_PRESS_DELAY = 550 // ms

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500' viewBox='0 0 500 500'%3E%3Crect width='500' height='500' fill='%23F5EBDD'/%3E%3Ccircle cx='250' cy='230' r='70' fill='none' stroke='%23C4933D' stroke-width='2' stroke-dasharray='4 4' opacity='0.7'/%3E%3Ctext x='250' y='340' text-anchor='middle' font-family='Georgia,serif' font-size='16' fill='%2330231F' font-weight='500'%3ELakshmanan Gold Works%3C/text%3E%3C/svg%3E"

export default function ProductCard({ product, onOpenLightbox, isFav, onToggleFav }) {
  const [shareMenuOpen, setShareMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [imgSrc, setImgSrc] = useState(product?.images?.[0] || FALLBACK_IMAGE)
  const longPressTimer = useRef(null)
  const isDragging = useRef(false)

  // ─── Long Press for Touch Devices ───
  const startLongPress = useCallback(() => {
    isDragging.current = false
    longPressTimer.current = setTimeout(() => {
      if (!isDragging.current) {
        setShareMenuOpen(true)
      }
    }, LONG_PRESS_DELAY)
  }, [])

  const cancelLongPress = useCallback(() => {
    clearTimeout(longPressTimer.current)
  }, [])

  const onTouchMove = useCallback(() => {
    isDragging.current = true
    cancelLongPress()
  }, [cancelLongPress])

  // ─── Sharing Logic ───
  const productUrl = buildProductUrl(product.id)
  const whatsappUrl = buildWhatsAppUrl(product.name, product.id)

  const share = async (e) => {
    e?.stopPropagation()
    setShareMenuOpen(false)
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.name} — ${product.id}`,
          text: `Check out this handcrafted jewellery design: ${product.name}`,
          url: productUrl,
        })
      } catch {
        // Fallback silently
      }
    } else {
      copyLink()
    }
  }

  const copyLink = async (e) => {
    e?.stopPropagation()
    setShareMenuOpen(false)
    try {
      await navigator.clipboard.writeText(productUrl)
    } catch {
      const el = document.createElement('textarea')
      el.value = productUrl
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-[#D8B36A]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col no-select">
      {/* ─── Image Container ─── */}
      <div
        className="relative aspect-[4/3] overflow-hidden bg-[#FFFCF7] cursor-zoom-in"
        onClick={() => onOpenLightbox?.(product)}
        onTouchStart={startLongPress}
        onTouchEnd={cancelLongPress}
        onTouchMove={onTouchMove}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onOpenLightbox?.(product)
          }
        }}
        aria-label={`View enlarged photo of ${product.name}`}
      >
        <img
          src={imgSrc}
          alt={product.name}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-106"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {product.newArrival ? (
            <span className="bg-[#C4933D] text-white text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs pointer-events-auto">
              NEW
            </span>
          ) : <div />}

          {/* Heart Favourite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleFav?.(product.id)
            }}
            aria-label={isFav ? `Remove from favourites` : `Add to favourites`}
            className="w-7 h-7 rounded-full bg-white/85 hover:bg-white backdrop-blur-xs flex items-center justify-center shadow-xs transition-transform hover:scale-110 pointer-events-auto"
          >
            <Heart
              size={14}
              className={`transition-colors ${
                isFav ? 'fill-[#C4933D] text-[#C4933D]' : 'text-[#786D63]'
              }`}
            />
          </button>
        </div>
      </div>

      {/* ─── Card Body ─── */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between bg-white border-t border-[#F5EBDD]">
        <div>
          <Link to={`/product/${product.slug}`} className="block group/link">
            <h3
              className="text-sm font-semibold text-[#30231F] group-hover/link:text-[#C4933D] transition-colors truncate leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {product.name}
            </h3>
          </Link>

          <p className="text-[11px] text-[#786D63] font-mono mt-0.5">
            {product.id}
          </p>

          <p className="text-xs font-semibold text-[#C4933D] mt-1.5">
            {product.price ? product.price : 'Price on enquiry'}
          </p>
        </div>

        {/* Action Share Icon at bottom right */}
        <div className="flex items-center justify-end mt-2 pt-2 border-t border-[#F5EBDD]/60">
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShareMenuOpen((o) => !o)
              }}
              aria-label={`Share ${product.name}`}
              className="w-7 h-7 rounded-full hover:bg-[#FFFCF7] flex items-center justify-center transition-colors text-[#786D63] hover:text-[#C4933D]"
            >
              {copied ? (
                <span className="text-[10px] text-green-600 font-bold">✓</span>
              ) : (
                <Share2 size={13} />
              )}
            </button>

            {/* Desktop Share Menu */}
            <AnimatePresence>
              {shareMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShareMenuOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full right-0 mb-2 z-20 bg-white border border-[#D8B36A]/50 rounded-xl shadow-xl overflow-hidden min-w-[180px]"
                  >
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setShareMenuOpen(false)
                          onOpenLightbox?.(product)
                        }}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-[#30231F] hover:bg-[#FFFCF7] text-left"
                      >
                        <Eye size={13} className="text-[#C4933D]" />
                        <span>Enlarge Photo</span>
                      </button>
                      <button
                        onClick={share}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-[#30231F] hover:bg-[#FFFCF7] text-left"
                      >
                        <Share2 size={13} className="text-[#C4933D]" />
                        <span>Share Design</span>
                      </button>
                      <button
                        onClick={copyLink}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-[#30231F] hover:bg-[#FFFCF7] text-left"
                      >
                        <Link2 size={13} className="text-[#C4933D]" />
                        <span>Copy Link</span>
                      </button>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-[#30231F] hover:bg-[#FFFCF7] text-left"
                        onClick={() => setShareMenuOpen(false)}
                      >
                        <MessageCircle size={13} className="text-[#25D366]" />
                        <span>WhatsApp Enquiry</span>
                      </a>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ─── Mobile Long Press Action Sheet ─── */}
      <AnimatePresence>
        {shareMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center md:hidden"
            onClick={() => setShareMenuOpen(false)}
          >
            <div className="absolute inset-0 bg-[#30231F]/60 backdrop-blur-xs" />
            <motion.div
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              exit={{ y: 120 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative w-full max-w-sm bg-white rounded-t-3xl overflow-hidden shadow-2xl p-5 mb-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-10 h-1 bg-[#D8B36A] rounded-full mx-auto mb-3" />
              <div className="pb-2.5 mb-2.5 border-b border-[#F5EBDD]">
                <h4
                  className="text-base font-bold text-[#30231F]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {product.name}
                </h4>
                <p className="text-xs text-[#786D63] font-mono mt-0.5">{product.id}</p>
              </div>

              <div className="space-y-1 text-sm">
                <button
                  onClick={() => {
                    setShareMenuOpen(false)
                    onOpenLightbox?.(product)
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-[#30231F] hover:bg-[#FFFCF7] rounded-xl text-left"
                >
                  <Eye size={15} className="text-[#C4933D]" />
                  <span>View Full Photo</span>
                </button>
                <button
                  onClick={share}
                  className="w-full flex items-center gap-3 px-3 py-2 text-[#30231F] hover:bg-[#FFFCF7] rounded-xl text-left"
                >
                  <Share2 size={15} className="text-[#C4933D]" />
                  <span>Share Design</span>
                </button>
                <button
                  onClick={copyLink}
                  className="w-full flex items-center gap-3 px-3 py-2 text-[#30231F] hover:bg-[#FFFCF7] rounded-xl text-left"
                >
                  <Link2 size={15} className="text-[#C4933D]" />
                  <span>Copy Product Link</span>
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3 px-3 py-2 text-[#30231F] hover:bg-[#FFFCF7] rounded-xl text-left"
                  onClick={() => setShareMenuOpen(false)}
                >
                  <MessageCircle size={15} className="text-[#25D366]" />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>

              <button
                onClick={() => setShareMenuOpen(false)}
                className="w-full mt-3 py-2.5 bg-[#F5EBDD]/60 text-[#30231F] font-medium rounded-xl text-xs transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
