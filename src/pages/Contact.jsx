import { useState } from 'react'
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Sparkles,
  Navigation,
  Send,
  Check,
  ShieldCheck,
  Gem,
  Award,
  ExternalLink,
} from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import { siteConfig } from '../config/siteConfig'
import WhatsAppButton from '../components/WhatsAppButton'

export default function Contact() {
  const { storeDetails, addEnquiry } = useAdmin()
  const store = storeDetails || siteConfig

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    category: 'Bangles',
    design: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [enquiryId, setEnquiryId] = useState('')

  const waUrl = `https://wa.me/${(store.whatsapp || siteConfig.whatsapp).replace(/[^0-9]/g, '')}`

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.contact.trim()) return

    const newEnq = addEnquiry({
      name: formData.name.trim(),
      contact: formData.contact.trim(),
      category: formData.category,
      design: formData.design.trim() || formData.category,
      message: formData.message.trim() || `Consultation enquiry for ${formData.category}`,
    })

    setEnquiryId(newEnq?.id || 'ENQ-NEW')
    setSubmitted(true)
  }

  const handleReset = () => {
    setFormData({
      name: '',
      contact: '',
      category: 'Bangles',
      design: '',
      message: '',
    })
    setSubmitted(false)
  }

  return (
    <div className="min-h-screen bg-[#FFFCF7] text-[#30231F]">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. EDITORIAL HERO BANNER                                            */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#F5EBDD]/60 border-b border-[#D8B36A]/30 overflow-hidden py-14 sm:py-20">
        {/* Subtle Watermark Mandala */}
        <div className="absolute right-0 top-0 w-96 h-96 opacity-10 pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full stroke-[#C4933D]">
            <circle cx="100" cy="100" r="85" strokeWidth="1" />
            <circle cx="100" cy="100" r="60" strokeWidth="0.8" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="45" strokeWidth="1" />
          </svg>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="max-w-2xl space-y-4">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-[10.5px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#C4933D]">
              <span>VISIT OUR ATELIER</span>
              <span className="text-[#C4933D] font-normal">✧</span>
              <span>BESPOKE CONSULTATIONS</span>
              <span className="text-[#C4933D] font-normal">✧</span>
              <span>MASTER GOLDSMITH</span>
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#30231F] leading-[1.08]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Contact Our Atelier
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#786D63] font-light leading-relaxed max-w-xl">
              Experience the warmth of traditional South Indian gold craftsmanship. Visit our physical showroom in Ullal, consult directly with our master goldsmith, or connect with us online.
            </p>

            {/* Key Assurance Highlights */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-[#30231F]">
              <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full border border-[#D8B36A]/35 shadow-2xs">
                <ShieldCheck size={14} className="text-[#C4933D]" />
                <span>916 BIS Hallmarked Gold</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full border border-[#D8B36A]/35 shadow-2xs">
                <Gem size={14} className="text-[#C4933D]" />
                <span>Custom Bridal Specialists</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full border border-[#D8B36A]/35 shadow-2xs">
                <Award size={14} className="text-[#C4933D]" />
                <span>Three Decades of Trust</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. FOUR LUXURY CONTACT CARDS GRID                                   */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="py-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 -mt-6 sm:-mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: Showroom Location */}
          <div className="bg-white rounded-2xl border border-[#D8B36A]/40 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#F5EBDD] flex items-center justify-center text-[#C4933D] group-hover:bg-[#351016] group-hover:text-[#D8B36A] transition-colors">
                <MapPin size={22} />
              </div>
              <h3
                className="font-bold text-base text-[#30231F]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Atelier &amp; Showroom
              </h3>
              <p className="text-xs text-[#786D63] leading-relaxed line-clamp-3">
                {store.address}
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-[#D8B36A]/20">
              <a
                href={store.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#C4933D] hover:underline inline-flex items-center gap-1"
              >
                <span>Get Directions</span>
                <Navigation size={12} />
              </a>
            </div>
          </div>

          {/* Card 2: WhatsApp Desk */}
          <div className="bg-white rounded-2xl border border-[#D8B36A]/40 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                <MessageCircle size={22} />
              </div>
              <h3
                className="font-bold text-base text-[#30231F]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                WhatsApp Consultation
              </h3>
              <p className="text-xs text-[#786D63] leading-relaxed">
                Connect instantly for live photo previews, bullion rates, weight breakdowns, and bespoke orders.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-[#D8B36A]/20">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors"
              >
                <MessageCircle size={13} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Card 3: Telephone */}
          <div className="bg-white rounded-2xl border border-[#D8B36A]/40 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#F5EBDD] flex items-center justify-center text-[#C4933D] group-hover:bg-[#351016] group-hover:text-[#D8B36A] transition-colors">
                <Phone size={20} />
              </div>
              <h3
                className="font-bold text-base text-[#30231F]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Direct Telephone
              </h3>
              <p className="text-xs text-[#786D63] leading-relaxed">
                Speak directly with our goldsmith desk regarding existing orders or hallmark certifications.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-[#D8B36A]/20">
              <a
                href={`tel:${store.phone}`}
                className="text-xs font-semibold text-[#30231F] hover:text-[#C4933D] transition-colors font-mono"
              >
                {store.phone}
              </a>
            </div>
          </div>

          {/* Card 4: Operating Hours */}
          <div className="bg-white rounded-2xl border border-[#D8B36A]/40 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#F5EBDD] flex items-center justify-center text-[#C4933D] group-hover:bg-[#351016] group-hover:text-[#D8B36A] transition-colors">
                <Clock size={20} />
              </div>
              <h3
                className="font-bold text-base text-[#30231F]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Business Hours
              </h3>
              <div className="text-xs text-[#786D63] leading-relaxed whitespace-pre-line">
                {store.hours || 'Mon - Sat: 9:30 AM - 9:00 PM\nSunday: 10:00 AM - 1:00 PM'}
              </div>
            </div>
            <div className="pt-4 mt-2 border-t border-[#D8B36A]/20">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Open Today</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. ENQUIRY FORM & MAP ATELIER PREVIEW SECTION                       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="py-8 sm:py-12 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Interactive Enquiry Form (Span 7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#D8B36A]/40 p-6 sm:p-8 shadow-xs">
            <div className="pb-5 mb-6 border-b border-[#D8B36A]/30">
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#C4933D] block mb-1">
                Direct Inquiry
              </span>
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#30231F]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Send an Enquiry to Our Master Goldsmith
              </h2>
              <p className="text-xs sm:text-sm text-[#786D63] mt-1 font-light">
                Fill out the form below. Your request will be directly received by our workshop desk for an estimate and consultation.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-[#FFFCF7] rounded-2xl border border-emerald-200 space-y-4 animate-scale-up">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                  <Check size={28} />
                </div>
                <h3
                  className="text-xl font-bold text-[#30231F]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Enquiry Received Successfully!
                </h3>
                <p className="text-xs text-[#786D63] max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Your enquiry ID is{' '}
                  <span className="font-mono font-bold text-[#30231F]">{enquiryId}</span>. Our workshop team will review your request and get back to you shortly.
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/${(store.whatsapp || siteConfig.whatsapp).replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Namaste Sri Lakshmi Gold Works, I submitted an enquiry (ID: ${enquiryId}) for ${formData.category}. Looking forward to connecting!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb858] text-white px-5 py-2.5 rounded-full text-xs font-semibold transition-all shadow-sm"
                  >
                    <MessageCircle size={15} />
                    <span>Also Send on WhatsApp</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 rounded-full bg-[#F5EBDD] hover:bg-[#D8B36A]/30 text-[#30231F] text-xs font-semibold transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1.5">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8B36A]/45 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                    />
                  </div>

                  {/* Contact / Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1.5">
                      WhatsApp / Phone <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98451 23456"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8B36A]/45 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category of Interest */}
                  <div>
                    <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1.5">
                      Category of Interest
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8B36A]/45 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                    >
                      <option value="Bangles">Bangles</option>
                      <option value="Rings">Rings</option>
                      <option value="Chains">Chains</option>
                      <option value="Necklaces">Necklaces</option>
                      <option value="Earrings">Earrings</option>
                      <option value="Bridal Jewellery">Bridal Jewellery</option>
                      <option value="Children's Jewellery">Children's Jewellery</option>
                      <option value="Custom Design">Custom Bespoke Design</option>
                    </select>
                  </div>

                  {/* Design ID (Optional) */}
                  <div>
                    <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1.5">
                      Design ID / Reference (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. BGL-001 or Temple Choker"
                      value={formData.design}
                      onChange={(e) => setFormData({ ...formData, design: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8B36A]/45 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1.5">
                    Your Requirements / Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your desired weight (grams), purity (22KT/18KT), occasion date, or custom design specifications..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8B36A]/45 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7] resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex items-center justify-between gap-4">
                  <p className="text-[11px] text-[#786D63] font-light">
                    🔒 We protect your privacy and respond within 2-4 business hours.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#351016] hover:bg-[#45151D] text-white px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-md hover:shadow-lg border border-[#C4933D]/40 cursor-pointer"
                  >
                    <span>Send Enquiry</span>
                    <Send size={13} />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Map Preview & Custom Wedding Card (Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Visual Location Preview Card */}
            <div className="bg-white rounded-3xl border border-[#D8B36A]/40 overflow-hidden shadow-xs">
              <div className="px-5 py-4 bg-[#FFFCF7] border-b border-[#D8B36A]/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Navigation size={16} className="text-[#C4933D]" />
                  <span className="text-xs font-bold text-[#30231F] uppercase tracking-wider">
                    Our Location in Ullal
                  </span>
                </div>
                <a
                  href={store.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#C4933D] hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Open Maps</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* Stylized Map View with Pin */}
              <div className="relative h-60 bg-[#EAE3D2] flex items-center justify-center overflow-hidden border-b border-[#D8B36A]/30">
                {/* Map grid pattern */}
                <div
                  className="absolute inset-0 opacity-25"
                  style={{
                    backgroundImage: `radial-gradient(#30231F 1px, transparent 1px)`,
                    backgroundSize: '18px 18px',
                  }}
                />

                {/* Decorative road lines */}
                <svg className="absolute inset-0 w-full h-full opacity-40">
                  <path
                    d="M0,120 Q140,80 260,130 T520,110"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="8"
                  />
                  <path
                    d="M200,0 L230,260"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="6"
                  />
                  <path
                    d="M20,190 Q220,170 420,230"
                    fill="none"
                    stroke="#D8B36A"
                    strokeWidth="3"
                  />
                </svg>

                {/* Red Location Pin */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="bg-rose-600 text-white p-2.5 rounded-full shadow-xl border-2 border-white">
                    <MapPin size={22} className="fill-white text-rose-600" />
                  </div>
                  <div className="bg-[#30231F] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg mt-1 border border-[#D8B36A] flex items-center gap-1">
                    <span>📍</span>
                    <span>Ullal Main Road</span>
                  </div>
                  <div className="w-3 h-1.5 bg-[#30231F]/30 rounded-full blur-xs mt-1" />
                </div>
              </div>

              {/* Atelier Store Card Summary */}
              <div className="p-5 space-y-3 bg-[#FFFCF7]">
                <h4
                  className="font-bold text-base text-[#30231F]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Sri Lakshmi Gold Works
                </h4>
                <p className="text-xs text-[#786D63] leading-relaxed">
                  {store.address}
                </p>
                <div className="pt-1">
                  <a
                    href={store.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#FFFCF7] hover:bg-[#F5EBDD] text-[#30231F] py-2 rounded-xl text-xs font-semibold border border-[#D8B36A]/50 transition-colors"
                  >
                    <Navigation size={13} className="text-[#C4933D]" />
                    <span>Get Navigation Directions</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bespoke Bridal & Custom Orders Box (Deep Burgundy Card) */}
            <div className="bg-[#351016] text-[#F5EBDD] rounded-3xl p-6 sm:p-7 border border-[#C4933D]/40 shadow-xl space-y-4 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 w-44 h-44 opacity-10 pointer-events-none">
                <svg viewBox="0 0 200 200" fill="none" className="w-full h-full stroke-[#C4933D]">
                  <circle cx="100" cy="100" r="80" strokeWidth="1" />
                  <circle cx="100" cy="100" r="50" strokeWidth="1" />
                </svg>
              </div>

              <div className="relative z-10 space-y-2.5">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D8B36A]">
                  <Sparkles size={12} />
                  <span>Private Consultation</span>
                </div>
                <h3
                  className="text-xl sm:text-2xl font-bold text-white leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Planning a Bridal or Bespoke Gold Order?
                </h3>
                <p className="text-xs text-white/80 leading-relaxed font-light">
                  Bring your family or send reference sketches beforehand. Our master goldsmith will arrange a dedicated private sitting to discuss purity, grams breakdown, and traditional temple motifs.
                </p>

                <div className="pt-2">
                  <WhatsAppButton label="Book WhatsApp Consultation" size="md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
