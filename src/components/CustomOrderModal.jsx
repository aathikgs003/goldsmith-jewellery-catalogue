import { useState, useMemo, useEffect } from 'react'
import {
  X,
  Sparkles,
  Scale,
  Check,
  AlertCircle,
  Phone,
  User,
  Mail,
  MapPin,
  MessageCircle,
  Calendar,
  ShieldCheck,
  ChevronRight,
  Plus,
  Minus,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdmin } from '../context/AdminContext'
import { siteConfig } from '../config/siteConfig'

// Helper to extract numeric baseline weight from string like "28.5g", "2g", "15 grams"
export function parseBaselineWeight(weightStr) {
  if (!weightStr) return 0
  const match = String(weightStr).match(/([0-9]+(?:\.[0-9]+)?)/)
  return match ? parseFloat(match[1]) : 0
}

export default function CustomOrderModal({ isOpen, onClose, product }) {
  const { addOrder } = useAdmin()

  // Base minimum weight from product
  const baseWeightNum = useMemo(() => {
    return parseBaselineWeight(product?.weight) || 2.0 // default minimum 2g
  }, [product?.weight])

  // Form states
  const [requestedWeight, setRequestedWeight] = useState(() => baseWeightNum)
  const [customerName, setCustomerName] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [email, setEmail] = useState('')
  const [consultationType, setConsultationType] = useState('In-Store Showroom Consultation')
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedOrder, setSubmittedOrder] = useState(null)
  const [weightError, setWeightError] = useState('')

  useEffect(() => {
    if (isOpen && product) {
      setRequestedWeight(baseWeightNum)
      setSubmittedOrder(null)
      setWeightError('')
    }
  }, [isOpen, product, baseWeightNum])

  if (!isOpen || !product) return null

  // Validate weight whenever changed
  const handleWeightChange = (val) => {
    setRequestedWeight(val)
    const num = parseFloat(val)
    if (isNaN(num) || num < baseWeightNum) {
      setWeightError(
        `Weight must be ${baseWeightNum}g or higher. Craftsmanship does not allow below ${baseWeightNum}g for this design.`
      )
    } else {
      setWeightError('')
    }
  }

  const handleStepWeight = (delta) => {
    const current = parseFloat(requestedWeight) || baseWeightNum
    const next = Math.max(baseWeightNum, parseFloat((current + delta).toFixed(2)))
    setRequestedWeight(next)
    setWeightError('')
  }

  const isWeightValid = !isNaN(parseFloat(requestedWeight)) && parseFloat(requestedWeight) >= baseWeightNum

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!customerName.trim() || !contactNumber.trim()) return

    const weightVal = parseFloat(requestedWeight)
    if (isNaN(weightVal) || weightVal < baseWeightNum) {
      setWeightError(`Weight cannot be below ${baseWeightNum}g for this piece.`)
      return
    }

    setIsSubmitting(true)
    try {
      const orderPayload = {
        name: customerName.trim(),
        contact: contactNumber.trim(),
        email: email.trim(),
        designName: product.name,
        designId: product.id,
        category: product.category,
        requestedWeight: `${weightVal}g`,
        baseWeight: `${baseWeightNum}g`,
        consultationType,
        notes: notes.trim(),
        image: product.images?.[0] || '',
      }

      const created = await addOrder(orderPayload)
      setSubmittedOrder(created || { ...orderPayload, id: `ORD-${Date.now().toString().slice(-6)}` })
    } catch (err) {
      console.error('Order submission error:', err)
      alert('Could not submit order: ' + err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsAppShare = () => {
    if (!submittedOrder) return
    const whatsappNum = siteConfig.social.whatsappNumber || '919994541091'
    const msg = encodeURIComponent(
      `Vanakkam Lakshmanan Gold Works!\n\nI have placed a Custom Order via your website:\n• Order ID: ${submittedOrder.id}\n• Design: ${product.name} (${product.id})\n• Requested Weight: ${submittedOrder.requestedWeight || requestedWeight + 'g'} (Base: ${baseWeightNum}g)\n• Customer: ${customerName}\n• Contact: ${contactNumber}\n• Preference: ${consultationType}\n• Notes: ${notes || 'None'}\n\nPlease confirm order receipt and next steps. Nandri!`
    )
    window.open(`https://wa.me/${whatsappNum}?text=${msg}`, '_blank')
  }

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#D8B36A]/50 overflow-hidden my-6 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip */}
        <div className="bg-[#351016] text-[#F5EBDD] p-5 sm:p-6 flex items-start justify-between relative border-b border-[#45151D]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C4933D]/20 text-[#D8B36A] text-[10px] font-bold uppercase tracking-widest mb-1.5 border border-[#C4933D]/30">
              <Sparkles size={11} />
              <span>Bespoke Goldsmithing Order</span>
            </div>
            <h2
              className="text-xl sm:text-2xl font-bold text-white tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Custom Order &amp; Consultation
            </h2>
            <p className="text-xs text-white/70 mt-0.5">
              Certified 916 BIS Hallmarked 22KT Gold handcrafted to your exact weight specifications
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors flex-shrink-0 ml-2"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto">
          {submittedOrder ? (
            /* ─── Success Confirmation View ─── */
            <div className="text-center py-6 sm:py-8 space-y-5 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <Check size={32} className="stroke-[2.5]" />
              </div>

              <div>
                <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-amber-300">
                  Status: Order Received
                </span>
                <h3
                  className="text-2xl font-bold text-[#30231F]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Order Submitted Successfully!
                </h3>
                <p className="text-xs text-[#786D63] mt-1">
                  Order Reference:{' '}
                  <span className="font-mono font-bold text-[#351016] text-sm">
                    {submittedOrder.id}
                  </span>
                </p>
              </div>

              {/* Order Summary Card */}
              <div className="bg-[#FFFCF7] p-4 rounded-2xl border border-[#D8B36A]/40 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex items-center justify-between pb-2 border-b border-[#D8B36A]/20">
                  <span className="text-[#786D63]">Selected Design:</span>
                  <span className="font-bold text-[#30231F]">{product.name} ({product.id})</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#D8B36A]/20">
                  <span className="text-[#786D63]">Requested Weight:</span>
                  <span className="font-bold text-[#C4933D] font-mono text-sm">
                    {submittedOrder.requestedWeight} (Baseline: {baseWeightNum}g)
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#D8B36A]/20">
                  <span className="text-[#786D63]">Customer Name:</span>
                  <span className="font-semibold text-[#30231F]">{customerName}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#D8B36A]/20">
                  <span className="text-[#786D63]">Contact:</span>
                  <span className="font-semibold text-[#30231F]">{contactNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#786D63]">Preference:</span>
                  <span className="font-semibold text-[#30231F]">{consultationType}</span>
                </div>
              </div>

              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-left text-xs text-amber-900 space-y-1">
                <p className="font-semibold flex items-center gap-1.5 text-amber-800">
                  <ShieldCheck size={14} />
                  <span>Next Step: Admin &amp; Goldsmith Review</span>
                </p>
                <p className="text-[11px] text-amber-800/80 leading-relaxed">
                  Our master goldsmith will review your requested weight specifications and update status from <strong>Order Received</strong> &rarr; <strong>Order Confirmed</strong> &rarr; <strong>Order Processing</strong>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold px-6 py-3 rounded-full text-xs transition-all shadow-md"
                >
                  <MessageCircle size={16} />
                  <span>Send Order to Goldsmith via WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold text-[#30231F] bg-white border border-[#D8B36A]/50 hover:bg-[#F5EBDD] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* ─── Order Form ─── */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Product Preview Card */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#FFFCF7] border border-[#D8B36A]/40 shadow-2xs">
                <img
                  src={product.images?.[0] || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80'}
                  alt={product.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-[#D8B36A]/30 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono font-bold text-[#C4933D] uppercase">
                    {product.id} • {product.category}
                  </span>
                  <h4
                    className="text-sm sm:text-base font-bold text-[#30231F] truncate"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-3 mt-1 text-xs text-[#786D63]">
                    <span>Purity: <strong className="text-[#30231F]">{product.purity || '22 KT'}</strong></span>
                    <span>•</span>
                    <span>Baseline Weight: <strong className="text-[#C4933D] font-mono">{baseWeightNum}g</strong></span>
                  </div>
                </div>
              </div>

              {/* ─── 1. GOLD WEIGHT SELECTION WITH STRICT MINIMUM BASELINE ENFORCEMENT ─── */}
              <div className="p-4 rounded-2xl bg-[#F5EBDD]/50 border border-[#D8B36A]/50 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#30231F] flex items-center gap-1.5 uppercase tracking-wider">
                    <Scale size={14} className="text-[#C4933D]" />
                    <span>Requested Gold Weight (Grams) *</span>
                  </label>
                  <span className="text-[11px] font-semibold text-[#C4933D] bg-white px-2 py-0.5 rounded-md border border-[#D8B36A]/40 font-mono">
                    Min: {baseWeightNum}g
                  </span>
                </div>

                <p className="text-[11px] text-[#786D63] leading-relaxed">
                  Crafting Rule: To preserve this design’s intricate structural integrity and hallmark standards, the piece must be <strong>{baseWeightNum}g or higher</strong>. You can order exact {baseWeightNum}g or scale to a heavier weight.
                </p>

                {/* Stepper Input */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleStepWeight(-0.5)}
                    disabled={parseFloat(requestedWeight) <= baseWeightNum}
                    aria-label="Decrease weight"
                    className="w-10 h-10 rounded-xl bg-white border border-[#D8B36A]/50 hover:bg-[#F5EBDD] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-[#30231F] font-bold transition-colors shadow-xs"
                  >
                    <Minus size={16} />
                  </button>

                  <div className="relative flex-1">
                    <input
                      type="number"
                      step="0.1"
                      min={baseWeightNum}
                      value={requestedWeight}
                      onChange={(e) => handleWeightChange(e.target.value)}
                      required
                      className={`w-full py-2.5 px-4 text-center font-mono font-bold text-base sm:text-lg bg-white rounded-xl border outline-none transition-colors ${
                        weightError
                          ? 'border-rose-500 text-rose-600 focus:ring-1 focus:ring-rose-500'
                          : 'border-[#D8B36A] text-[#30231F] focus:border-[#C4933D]'
                      }`}
                      placeholder={`e.g. ${baseWeightNum}`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#786D63] pointer-events-none font-mono">
                      grams
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleStepWeight(0.5)}
                    aria-label="Increase weight"
                    className="w-10 h-10 rounded-xl bg-white border border-[#D8B36A]/50 hover:bg-[#F5EBDD] flex items-center justify-center text-[#30231F] font-bold transition-colors shadow-xs"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Quick Increment Pills */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <span className="text-[10px] text-[#786D63] mr-1">Quick Add:</span>
                  <button
                    type="button"
                    onClick={() => handleWeightChange(baseWeightNum)}
                    className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-white border border-[#D8B36A]/40 hover:border-[#C4933D] text-[#30231F]"
                  >
                    Exact ({baseWeightNum}g)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStepWeight(1)}
                    className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-white border border-[#D8B36A]/40 hover:border-[#C4933D] text-[#30231F]"
                  >
                    +1.0g
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStepWeight(2)}
                    className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-white border border-[#D8B36A]/40 hover:border-[#C4933D] text-[#30231F]"
                  >
                    +2.0g
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStepWeight(5)}
                    className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-white border border-[#D8B36A]/40 hover:border-[#C4933D] text-[#30231F]"
                  >
                    +5.0g
                  </button>
                </div>

                {/* Weight Error Alert */}
                {weightError && (
                  <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-200 text-rose-700 text-xs flex items-center gap-2 animate-fade-in">
                    <AlertCircle size={15} className="flex-shrink-0" />
                    <span>{weightError}</span>
                  </div>
                )}
              </div>

              {/* ─── 2. CUSTOMER CONTACT DETAILS ─── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#30231F] mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#786D63]" />
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Priya Sundaram"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#FFFCF7] border border-[#D8B36A]/40 rounded-xl focus:border-[#C4933D] outline-none text-[#30231F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#30231F] mb-1">
                    Contact / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#786D63]" />
                    <input
                      type="tel"
                      required
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#FFFCF7] border border-[#D8B36A]/40 rounded-xl focus:border-[#C4933D] outline-none text-[#30231F]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#30231F] mb-1">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#786D63]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. priya@example.com"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#FFFCF7] border border-[#D8B36A]/40 rounded-xl focus:border-[#C4933D] outline-none text-[#30231F]"
                  />
                </div>
              </div>

              {/* ─── 3. CONSULTATION / DELIVERY PREFERENCE ─── */}
              <div>
                <label className="block text-xs font-semibold text-[#30231F] mb-1.5">
                  Order &amp; Consultation Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    {
                      id: 'In-Store Showroom Consultation',
                      title: 'Showroom Visit',
                      desc: 'Avudayanoor atelier',
                    },
                    {
                      id: 'Direct Goldsmith Video Call',
                      title: 'Phone / WhatsApp',
                      desc: 'Direct goldsmith call',
                    },
                    {
                      id: 'Home Delivery with Hallmark',
                      title: 'Home Delivery',
                      desc: '916 Hallmark certified',
                    },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setConsultationType(opt.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all text-xs cursor-pointer ${
                        consultationType === opt.id
                          ? 'bg-[#351016] text-white border-[#351016] shadow-xs'
                          : 'bg-[#FFFCF7] text-[#30231F] border-[#D8B36A]/40 hover:border-[#C4933D]'
                      }`}
                    >
                      <div className="font-bold">{opt.title}</div>
                      <div className={`text-[10px] ${consultationType === opt.id ? 'text-white/70' : 'text-[#786D63]'}`}>
                        {opt.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* ─── 4. CUSTOM NOTES ─── */}
              <div>
                <label className="block text-xs font-semibold text-[#30231F] mb-1">
                  Customization Details &amp; Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Size 2.6 for bangles, preferred delivery date for wedding occasion, or custom engraving details."
                  className="w-full p-3 text-xs bg-[#FFFCF7] border border-[#D8B36A]/40 rounded-xl focus:border-[#C4933D] outline-none text-[#30231F]"
                />
              </div>

              {/* Footer CTA */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl text-xs font-semibold text-[#30231F] bg-white border border-[#D8B36A]/40 hover:bg-[#F5EBDD] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !isWeightValid}
                  className="flex-2 py-3 px-6 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#351016] hover:bg-[#45151D] disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Submitting Order...</span>
                  ) : (
                    <>
                      <span>Submit Custom Order ({requestedWeight}g)</span>
                      <ChevronRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
