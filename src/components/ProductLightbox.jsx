import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useReducer,
} from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Share2,
  MessageCircle,
  Link2,
} from 'lucide-react'
import { buildWhatsAppUrl, buildProductUrl } from '../config/siteConfig'

// ─── Zoom state machine ─────────────────────────────────────────────────────

const INITIAL_ZOOM = { scale: 1, tx: 0, ty: 0 }
const MIN_SCALE = 1
const MAX_SCALE = 5

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max)
}

function zoomReducer(state, action) {
  switch (action.type) {
    case 'SET':
      return { ...state, ...action.payload }
    case 'RESET':
      return INITIAL_ZOOM
    case 'ZOOM_IN': {
      const scale = clamp(state.scale * 1.4, MIN_SCALE, MAX_SCALE)
      return { ...state, scale }
    }
    case 'ZOOM_OUT': {
      const scale = clamp(state.scale / 1.4, MIN_SCALE, MAX_SCALE)
      const tx = scale <= MIN_SCALE ? 0 : state.tx
      const ty = scale <= MIN_SCALE ? 0 : state.ty
      return { scale, tx, ty }
    }
    default:
      return state
  }
}

// ─── Main component ─────────────────────────────────────────────────────────

export default function ProductLightbox({ product, products, initialIndex = 0, onClose }) {
  const [imageIndex, setImageIndex] = useState(initialIndex)
  const [zoomState, dispatch] = useReducer(zoomReducer, INITIAL_ZOOM)
  const [isDragging, setIsDragging] = useState(false)
  const [copied, setCopied] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)

  const dragStart = useRef(null)
  const lastTap = useRef(0)
  const pinchStart = useRef(null)
  const imgRef = useRef(null)
  const closeButtonRef = useRef(null)
  const triggerRef = useRef(document.activeElement)

  const images = product?.images ?? []
  const currentImage = images[imageIndex]

  // Determine next/prev products in the collection
  const productList = products ?? [product]
  const productIdx = productList.findIndex((p) => p.id === product?.id)

  const prevProduct = productList[productIdx - 1]
  const nextProduct = productList[productIdx + 1]

  const hasPrev = imageIndex > 0 || !!prevProduct
  const hasNext = imageIndex < images.length - 1 || !!nextProduct

  // ─── Navigation ────────────────────────────────────────────────────
  const navigatePrev = useCallback(() => {
    if (imageIndex > 0) {
      setImageIndex((i) => i - 1)
    }
  }, [imageIndex])

  const navigateNext = useCallback(() => {
    if (imageIndex < images.length - 1) {
      setImageIndex((i) => i + 1)
    }
  }, [imageIndex, images.length])

  // ─── Body scroll lock ───────────────────────────────────────────────
  useEffect(() => {
    document.body.classList.add('lightbox-open')
    closeButtonRef.current?.focus()
    const triggerEl = triggerRef.current
    return () => {
      document.body.classList.remove('lightbox-open')
      triggerEl?.focus()
    }
  }, [])

  // ─── Reset zoom on image change ─────────────────────────────────────
  useEffect(() => {
    dispatch({ type: 'RESET' })
  }, [imageIndex, product?.id])

  // ─── Keyboard navigation ────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') navigatePrev()
      if (e.key === 'ArrowRight') navigateNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigatePrev, navigateNext, onClose])

  // ─── Wheel zoom ─────────────────────────────────────────────────────
  const onWheel = useCallback(
    (e) => {
      e.preventDefault()
      const delta = e.deltaY < 0 ? 1.15 : 1 / 1.15
      dispatch({
        type: 'SET',
        payload: {
          scale: clamp(zoomState.scale * delta, MIN_SCALE, MAX_SCALE),
          tx: zoomState.tx,
          ty: zoomState.ty,
        },
      })
    },
    [zoomState],
  )

  useEffect(() => {
    const el = imgRef.current
    if (!el) return
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [onWheel])

  // ─── Mouse drag ─────────────────────────────────────────────────────
  const onMouseDown = (e) => {
    if (zoomState.scale <= 1) return
    dragStart.current = { x: e.clientX - zoomState.tx, y: e.clientY - zoomState.ty }
    setIsDragging(true)
  }

  const onMouseMove = (e) => {
    if (!isDragging || !dragStart.current) return
    dispatch({
      type: 'SET',
      payload: {
        scale: zoomState.scale,
        tx: e.clientX - dragStart.current.x,
        ty: e.clientY - dragStart.current.y,
      },
    })
  }

  const onMouseUp = () => {
    setIsDragging(false)
    dragStart.current = null
  }

  // ─── Touch handlers ─────────────────────────────────────────────────
  const onTouchStart = (e) => {
    if (e.touches.length === 2) {
      // pinch start
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      pinchStart.current = {
        dist: Math.hypot(dx, dy),
        scale: zoomState.scale,
      }
      return
    }
    // double-tap
    const now = Date.now()
    if (now - lastTap.current < 300) {
      if (zoomState.scale > 1) {
        dispatch({ type: 'RESET' })
      } else {
        dispatch({ type: 'SET', payload: { scale: 2.5, tx: 0, ty: 0 } })
      }
      lastTap.current = 0
    } else {
      lastTap.current = now
    }
    // drag start
    if (zoomState.scale > 1) {
      dragStart.current = {
        x: e.touches[0].clientX - zoomState.tx,
        y: e.touches[0].clientY - zoomState.ty,
      }
    }
  }

  const onTouchMove = (e) => {
    e.preventDefault()
    if (e.touches.length === 2 && pinchStart.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.hypot(dx, dy)
      const newScale = clamp(
        (dist / pinchStart.current.dist) * pinchStart.current.scale,
        MIN_SCALE,
        MAX_SCALE,
      )
      dispatch({ type: 'SET', payload: { scale: newScale, tx: zoomState.tx, ty: zoomState.ty } })
      return
    }
    if (dragStart.current && zoomState.scale > 1) {
      dispatch({
        type: 'SET',
        payload: {
          scale: zoomState.scale,
          tx: e.touches[0].clientX - dragStart.current.x,
          ty: e.touches[0].clientY - dragStart.current.y,
        },
      })
    }
  }

  const onTouchEnd = () => {
    pinchStart.current = null
    dragStart.current = null
    if (zoomState.scale < MIN_SCALE + 0.05) dispatch({ type: 'RESET' })
  }

  // ─── Single click (if not zoomed, open = noop; already open) ────────
  const onImageClick = () => {
    if (zoomState.scale <= 1) {
      // toggle zoom in on click when not zoomed
      dispatch({ type: 'SET', payload: { scale: 2, tx: 0, ty: 0 } })
    }
  }

  // ─── Share ───────────────────────────────────────────────────────────
  const productUrl = buildProductUrl(product?.id)
  const whatsappUrl = buildWhatsAppUrl(product?.name, product?.id)

  const handleShare = async () => {
    setShareOpen(false)
    if (navigator.share) {
      try { await navigator.share({ title: product?.name, url: productUrl }) } catch {}
    } else {
      copyLink()
    }
  }

  const copyLink = async () => {
    setShareOpen(false)
    try { await navigator.clipboard.writeText(productUrl) } catch {}
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!product) return null

  const prefersReducedMotion =
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
        className="fixed inset-0 z-[100] flex flex-col"
        aria-modal="true"
        role="dialog"
        aria-label={`Viewing ${product.name}`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#0D0B09]/96 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full max-h-screen">
          {/* Top bar */}
          <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 sm:px-6 border-b border-white/10 bg-[#1A1714]/60">
            <div>
              <p
                className="text-white font-semibold text-sm sm:text-base leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {product.name}
              </p>
              <p className="text-[#D4AF6A] text-xs font-mono mt-0.5">{product.id}</p>
            </div>

            <div className="flex items-center gap-2">
              {/* Share */}
              <div className="relative">
                <button
                  onClick={() => setShareOpen((o) => !o)}
                  aria-label="Share this design"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  {copied ? <span className="text-green-400 text-xs font-bold">✓</span> : <Share2 size={16} />}
                </button>
                <AnimatePresence>
                  {shareOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShareOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute right-0 top-full mt-2 z-20 bg-white rounded-xl shadow-2xl overflow-hidden min-w-[200px]"
                      >
                        <LightboxShareItem icon={<Share2 size={14} />} label="Share Design" onClick={handleShare} />
                        <LightboxShareItem icon={<Link2 size={14} />} label="Copy Link" onClick={copyLink} />
                        <LightboxShareItem
                          icon={<MessageCircle size={14} className="text-[#25D366]" />}
                          label="WhatsApp Enquiry"
                          onClick={() => { setShareOpen(false); window.open(whatsappUrl, '_blank') }}
                        />
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Enquire on WhatsApp"
                className="hidden sm:flex w-9 h-9 rounded-full bg-[#25D366]/20 hover:bg-[#25D366] items-center justify-center text-[#25D366] hover:text-white transition-colors"
              >
                <MessageCircle size={16} />
              </a>

              {/* Close */}
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close viewer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Image area */}
          <div className="flex-1 relative flex items-center justify-center overflow-hidden min-h-0">
            {/* Prev arrow */}
            {hasPrev && (
              <button
                onClick={navigatePrev}
                aria-label="Previous image"
                className="absolute left-2 sm:left-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            {/* Zoomable image */}
            <div
              ref={imgRef}
              className={`relative w-full h-full flex items-center justify-center select-none ${
                zoomState.scale > 1
                  ? isDragging
                    ? 'cursor-grabbing'
                    : 'cursor-grab'
                  : 'cursor-zoom-in'
              }`}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onClick={zoomState.scale <= 1 ? onImageClick : undefined}
            >
              <motion.img
                key={currentImage}
                src={currentImage}
                alt={product.name}
                draggable={false}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  scale: zoomState.scale,
                  x: zoomState.tx,
                  y: zoomState.ty,
                }}
                transition={
                  isDragging
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 300, damping: 30 }
                }
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  userSelect: 'none',
                  WebkitUserDrag: 'none',
                  touchAction: 'none',
                }}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Next arrow */}
            {hasNext && (
              <button
                onClick={navigateNext}
                aria-label="Next image"
                className="absolute right-2 sm:right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight size={22} />
              </button>
            )}
          </div>

          {/* Bottom bar — zoom controls + thumbnails */}
          <div className="flex-shrink-0 px-4 py-3 sm:px-6">
            {/* Zoom controls */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <button
                onClick={() => dispatch({ type: 'ZOOM_OUT' })}
                disabled={zoomState.scale <= MIN_SCALE}
                aria-label="Zoom out"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors disabled:opacity-30"
              >
                <ZoomOut size={15} />
              </button>

              <span className="text-white/60 text-xs w-12 text-center font-mono">
                {Math.round(zoomState.scale * 100)}%
              </span>

              <button
                onClick={() => dispatch({ type: 'ZOOM_IN' })}
                disabled={zoomState.scale >= MAX_SCALE}
                aria-label="Zoom in"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors disabled:opacity-30"
              >
                <ZoomIn size={15} />
              </button>

              <button
                onClick={() => dispatch({ type: 'RESET' })}
                disabled={zoomState.scale === 1 && zoomState.tx === 0 && zoomState.ty === 0}
                aria-label="Reset zoom"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors disabled:opacity-30 ml-1"
              >
                <RotateCcw size={13} />
              </button>
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImageIndex(i)}
                    aria-label={`View image ${i + 1} of ${images.length}`}
                    className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      i === imageIndex
                        ? 'border-[#B68A3A] opacity-100 scale-105 shadow-md shadow-[#B68A3A]/30'
                        : 'border-white/20 opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Mobile WhatsApp button */}
            <div className="flex sm:hidden justify-center mt-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
              >
                <MessageCircle size={16} />
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  )
}

function LightboxShareItem({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#25211D] hover:bg-[#FBF7F0] transition-colors text-left"
    >
      <span className="text-[#B68A3A]">{icon}</span>
      {label}
    </button>
  )
}
