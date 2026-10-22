import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Share2, Link2, Eye, Tag, Scale, Sparkles, CheckCircle2, Mail, ArrowLeft, Heart, MessageCircle } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import ProductGrid from '../components/ProductGrid'
import ProductLightbox from '../components/ProductLightbox'
import { useProduct, useRelatedProducts, useFavourites } from '../hooks/useProducts'
import { getAvailabilityInfo } from '../services/productService'
import { getCategoryBySlug } from '../data/categories'
import { buildProductUrl } from '../config/siteConfig'
import { useAdmin } from '../context/AdminContext'

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Crect width='600' height='600' fill='%23F0E4D0'/%3E%3Ccircle cx='300' cy='280' r='90' fill='none' stroke='%23B68A3A' stroke-width='2' stroke-dasharray='5 5' opacity='0.7'/%3E%3Ctext x='300' y='410' text-anchor='middle' font-family='Georgia,serif' font-size='20' fill='%2325211D' font-weight='600'%3ELakshmanan Gold Works%3C/text%3E%3Ctext x='300' y='440' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%236B6560'%3EImage Preview%3C/text%3E%3C/svg%3E"

export default function ProductDetails() {
  const { id } = useParams()
  const product = useProduct(id)
  const related = useRelatedProducts(id, 4)

  const [activeImage, setActiveImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const [relLightboxProduct, setRelLightboxProduct] = useState(null)
  const { isFav, toggle: toggleFav } = useFavourites()

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-[#FBF7F0]">
        <div className="w-16 h-16 rounded-full bg-[#F0E4D0] flex items-center justify-center text-[#B68A3A] mb-4 text-2xl font-serif">
          ✦
        </div>
        <h2
          className="text-2xl sm:text-3xl font-bold text-[#25211D] mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Design Not Found
        </h2>
        <p className="text-[#6B6560] text-sm mb-2">
          Design ID <span className="font-mono font-semibold text-[#25211D]">{id}</span> does not exist in our catalogue.
        </p>
        <p className="text-[#6B6560] text-xs max-w-sm mb-6">
          The piece may have been updated, or the link may have been typed incorrectly.
        </p>
        <Link
          to="/collections"
          className="inline-flex items-center gap-2 bg-[#B68A3A] hover:bg-[#8A6520] text-white font-semibold px-7 py-3.5 rounded-full text-xs uppercase tracking-wider transition-colors shadow-md"
        >
          <ArrowLeft size={14} />
          <span>Browse All Collections</span>
        </Link>
      </div>
    )
  }

  const adminCtx = useAdmin()
  const category =
    adminCtx?.categories?.find(
      (c) => c.slug?.toLowerCase() === product.category?.toLowerCase()
    ) || getCategoryBySlug(product.category)
  const availInfo = getAvailabilityInfo(product.availability)
  const images = product.images && product.images.length > 0 ? product.images : [FALLBACK_IMAGE]

  const openLightbox = (index = activeImage) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const copyLink = async () => {
    const url = buildProductUrl(product.id)
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const el = document.createElement('textarea')
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const share = async () => {
    const url = buildProductUrl(product.id)
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.name} — ${product.id}`,
          text: `Check out this jewellery design from Lakshmanan Gold Works: ${product.name}`,
          url,
        })
      } catch {
        // Fallback silently if user cancelled
      }
    } else {
      copyLink()
    }
  }

  return (
    <div className="min-h-screen bg-[#FBF7F0]">
      {/* ─── Breadcrumb Bar ─── */}
      <div className="bg-[#F0E4D0]/40 border-b border-[#D4AF6A]/20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-3.5">
          <Breadcrumb
            crumbs={[
              { label: 'Collections', to: '/collections' },
              category ? { label: category.name, to: `/collections/${category.slug}` } : null,
              { label: product.name },
            ].filter(Boolean)}
          />
        </div>
      </div>

      {/* ─── Product Overview Section ─── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Image Gallery (Span 7) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Showcase Image */}
            <div
              className="relative aspect-[4/4] sm:aspect-[4/3.5] bg-white rounded-3xl overflow-hidden border border-[#D4AF6A]/30 shadow-md cursor-zoom-in group"
              onClick={() => openLightbox(activeImage)}
            >
              <img
                src={images[activeImage]}
                alt={`${product.name} — view ${activeImage + 1}`}
                onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE }}
                className="w-full h-full object-contain p-4 sm:p-6 transition-transform duration-500 group-hover:scale-103"
                fetchPriority="high"
              />

              {/* Fullscreen Pill Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  openLightbox(activeImage)
                }}
                className="absolute bottom-4 right-4 bg-[#25211D]/80 hover:bg-[#25211D] text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-sm transition-colors shadow-md"
                aria-label="Inspect design in full screen"
              >
                <Eye size={14} className="text-[#D4AF6A]" />
                <span>Full-Screen Zoom</span>
              </button>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image thumbnail ${i + 1}`}
                    className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-white border-2 transition-all p-1.5 ${
                      i === activeImage
                        ? 'border-[#B68A3A] shadow-md ring-2 ring-[#B68A3A]/20'
                        : 'border-[#E8D5A3]/50 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE }}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Sticky Product Details (Span 5) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div>
              {/* Badges */}
              <div className="flex items-center gap-2 mb-3">
                {product.newArrival && (
                  <span className="inline-flex items-center gap-1 bg-[#521F2B] text-[#D4AF6A] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    <Sparkles size={11} />
                    New Design
                  </span>
                )}
                {availInfo && (
                  <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-3 py-1 rounded-full ${availInfo.className}`}>
                    <CheckCircle2 size={12} />
                    {availInfo.label}
                  </span>
                )}
              </div>

              {/* Title & Design ID */}
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#25211D] tracking-tight leading-snug"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs font-mono text-[#6B6560] bg-[#F0E4D0]/60 px-2.5 py-1 rounded-md">
                  Design ID: <strong className="text-[#25211D]">{product.id}</strong>
                </span>
                {category && (
                  <Link
                    to={`/collections/${category.slug}`}
                    className="text-xs text-[#B68A3A] hover:underline font-medium"
                  >
                    in {category.name}
                  </Link>
                )}
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-white rounded-2xl p-5 border border-[#D4AF6A]/30 shadow-xs space-y-1">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#6B6560]">
                Price Valuation
              </span>
              <p
                className="text-2xl font-bold text-[#25211D]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {product.price ? product.price : 'Price on Enquiry'}
              </p>
              <p className="text-xs text-[#6B6560] leading-relaxed">
                Gold jewellery pricing is calculated based on current market bullion rates, net gold weight, making charges, and stone settings.
              </p>
            </div>

            {/* Specifications Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white p-3 rounded-xl border border-[#D4AF6A]/20 text-center">
                <div className="w-7 h-7 rounded-full bg-[#F0E4D0] mx-auto mb-1 flex items-center justify-center text-[#B68A3A]">
                  <Scale size={14} />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#6B6560] block">Gold Weight</span>
                <span className="text-xs font-bold text-[#25211D]">{product.weight || 'Customizable'}</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-[#D4AF6A]/20 text-center">
                <div className="w-7 h-7 rounded-full bg-[#F0E4D0] mx-auto mb-1 flex items-center justify-center text-[#B68A3A]">
                  <Tag size={14} />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#6B6560] block">Purity</span>
                <span className="text-xs font-bold text-[#25211D]">{product.purity || '22 KT Hallmark'}</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-[#D4AF6A]/20 text-center">
                <div className="w-7 h-7 rounded-full bg-[#F0E4D0] mx-auto mb-1 flex items-center justify-center text-[#B68A3A]">
                  <Sparkles size={14} />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#6B6560] block">Artistry</span>
                <span className="text-xs font-bold text-[#25211D]">Handmade</span>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#25211D]">
                  About This Design
                </h4>
                <p className="text-sm text-[#6B6560] font-light leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Actions CTA Section */}
            <div className="space-y-3 pt-2">
              <a
                href={`https://wa.me/919994541091?text=${encodeURIComponent('Vanakkam! I am interested in ' + product.name + ' (Design ID: ' + product.id + '). Please share price and weight details.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold py-3.5 px-6 rounded-2xl text-sm transition-all shadow-md hover:shadow-lg"
              >
                <MessageCircle size={18} />
                <span>Enquire on WhatsApp</span>
              </a>

              <Link
                to={`/contact?design=${encodeURIComponent(product.name)}`}
                className="w-full flex items-center justify-center gap-2.5 bg-[#351016] hover:bg-[#45151D] text-white font-semibold py-3 px-6 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-xs"
              >
                <Mail size={16} />
                <span>Custom Order / Store Consultation</span>
              </Link>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <button
                  onClick={() => toggleFav(product.id)}
                  className="flex items-center justify-center gap-1.5 bg-white hover:bg-rose-50 border border-[#D4AF6A]/40 text-[#25211D] font-semibold py-3 px-2 sm:px-3 rounded-xl text-xs transition-colors shadow-xs"
                  aria-label="Save to favourites"
                >
                  <Heart size={14} className={isFav(product.id) ? "fill-rose-500 text-rose-500" : "text-[#786D63]"} />
                  <span className="truncate">{isFav(product.id) ? 'Saved' : 'Save'}</span>
                </button>

                <button
                  onClick={() => openLightbox(activeImage)}
                  className="flex items-center justify-center gap-2 bg-white hover:bg-[#F0E4D0] border border-[#D4AF6A]/40 text-[#25211D] font-semibold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-xs"
                >
                  <Eye size={14} className="text-[#B68A3A]" />
                  <span>Inspect Zoom</span>
                </button>

                <button
                  onClick={share}
                  className="flex items-center justify-center gap-2 bg-white hover:bg-[#F0E4D0] border border-[#D4AF6A]/40 text-[#25211D] font-semibold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-xs"
                >
                  {copied ? (
                    <>
                      <Link2 size={14} className="text-green-600" />
                      <span className="text-green-600">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 size={14} className="text-[#B68A3A]" />
                      <span>Share Design</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Reassurance Footer */}
            <div className="p-4 bg-[#F0E4D0]/50 rounded-2xl border border-[#D4AF6A]/20 text-[11px] text-[#6B6560] space-y-1">
              <p>✦ Direct family goldsmith consultation available</p>
              <p>✦ All pieces can be customized according to your desired gold budget and weight</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Related Designs Section ─── */}
      {related && related.length > 0 && (
        <section className="py-16 bg-[#F0E4D0]/30 border-t border-[#D4AF6A]/20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="mb-10 text-center">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B68A3A] block mb-1">
                More From {category?.name || 'Collection'}
              </span>
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#25211D]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Complementary Jewellery Designs
              </h2>
            </div>

            <ProductGrid
              products={related}
              onOpenLightbox={(p) => setRelLightboxProduct(p)}
            />
          </div>
        </section>
      )}

      {/* Lightbox Modals */}
      {lightboxOpen && (
        <ProductLightbox
          product={product}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      {relLightboxProduct && (
        <ProductLightbox
          product={relLightboxProduct}
          products={related}
          onClose={() => setRelLightboxProduct(null)}
        />
      )}
    </div>
  )
}
