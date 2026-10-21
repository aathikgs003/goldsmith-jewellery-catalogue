import { useState } from 'react'
import {
  Store,
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Save,
  Check,
  ExternalLink,
  Navigation,
} from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

export default function AdminSettings() {
  const { storeDetails, updateStoreDetails } = useAdmin()

  const [formData, setFormData] = useState({
    name: storeDetails.name || 'Lakshmanan Gold Works',
    address:
      storeDetails.address ||
      'Shop No. 12, Main Bazaar Road, Near Old Bus Stand, Ullal Main Road, Mangalore, Karnataka 575020',
    phone: storeDetails.phone || '+91 98451 23456',
    whatsapp: storeDetails.whatsapp || '+91 98451 23456',
    email: storeDetails.email || 'contact@lakshmanangoldworks.com',
    hours:
      storeDetails.hours ||
      'Mon - Sat: 9:30 AM - 9:00 PM\nSunday: 10:00 AM - 1:00 PM',
    mapUrl:
      storeDetails.mapUrl ||
      'https://maps.google.com/?q=Ullal+Main+Road+Mangalore',
  })

  const [successToast, setSuccessToast] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    updateStoreDetails(formData)
    showToast('Store details and settings saved successfully')
  }

  const showToast = (msg) => {
    setSuccessToast(msg)
    setTimeout(() => setSuccessToast(''), 3500)
  }

  return (
    <div className="space-y-6">
      {/* Toast */}
      {successToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#351016] text-[#D8B36A] px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-[#C4933D]/40 animate-fade-in">
          <Check size={18} className="text-[#C4933D]" />
          <span className="text-sm font-medium">{successToast}</span>
        </div>
      )}

      {/* Screen 11: Header */}
      <div>
        <h1
          className="text-2xl sm:text-3xl font-bold text-[#30231F]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Manage Store Details
        </h1>
        <p className="text-xs sm:text-sm text-[#786D63] mt-1">
          Configure official store name, phone numbers, store address, and Google Maps location
        </p>
      </div>

      {/* Screen 11: Two-column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form (7 cols) */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-7 bg-white rounded-xl border border-[#D8B36A]/40 p-6 space-y-5 shadow-xs"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#D8B36A]/30">
            <h2
              className="text-lg font-bold text-[#30231F]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Store Information
            </h2>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#351016] hover:bg-[#45151D] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all shadow-md border border-[#C4933D]/40 cursor-pointer"
            >
              <Save size={14} />
              <span>Save Details</span>
            </button>
          </div>

          {/* Store Name */}
          <div>
            <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1.5">
              Store Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Store
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#786D63]"
              />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1.5">
              Physical Store Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <textarea
                rows={3}
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full p-3.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7] resize-none"
              />
            </div>
          </div>

          {/* Phone & WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1.5">
                Primary Phone
              </label>
              <div className="relative">
                <Phone
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#786D63]"
                />
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1.5">
                WhatsApp Number
              </label>
              <div className="relative">
                <MessageCircle
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600"
                />
                <input
                  type="text"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1.5">
              Official Email Address
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#786D63]"
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
              />
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1.5">
              Business Hours
            </label>
            <div className="relative">
              <textarea
                rows={2}
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                className="w-full p-3.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7] resize-none"
              />
            </div>
          </div>

          {/* Google Maps Link */}
          <div>
            <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1.5">
              Google Maps URL
            </label>
            <div className="relative">
              <MapPin
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-600"
              />
              <input
                type="url"
                value={formData.mapUrl}
                onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
              />
            </div>
          </div>
        </form>

        {/* Right Column: Live Map & Store Card Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Map Preview Card */}
          <div className="bg-white rounded-xl border border-[#D8B36A]/40 shadow-xs overflow-hidden">
            <div className="px-5 py-3.5 bg-[#FFFCF7] border-b border-[#D8B36A]/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation size={16} className="text-[#C4933D]" />
                <span className="text-xs font-bold text-[#30231F] uppercase tracking-wider">
                  Store Location Preview
                </span>
              </div>
              <a
                href={formData.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#C4933D] hover:underline flex items-center gap-1"
              >
                <span>Open Maps</span>
                <ExternalLink size={12} />
              </a>
            </div>

            {/* Stylized Map View with Pin */}
            <div className="relative h-64 bg-[#EAE3D2] flex items-center justify-center overflow-hidden border-b border-[#D8B36A]/30">
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
                  d="M0,130 Q120,90 240,140 T480,120"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="8"
                />
                <path
                  d="M180,0 L210,260"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="6"
                />
                <path
                  d="M20,200 Q200,180 380,240"
                  fill="none"
                  stroke="#D8B36A"
                  strokeWidth="3"
                />
              </svg>

              {/* Red Map Pin Indicator (Screen 11 marker) */}
              <div className="relative z-10 flex flex-col items-center animate-bounce-gentle">
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

            {/* Store Information Card Preview */}
            <div className="p-5 space-y-3.5 bg-[#FFFCF7]">
              <div>
                <h3
                  className="font-bold text-base text-[#30231F]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {formData.name}
                </h3>
                <p className="text-xs text-[#C4933D] font-medium tracking-wide">
                  TRADITIONAL GOLDSMITH & PURE GOLD JEWELLERY
                </p>
              </div>

              <div className="text-xs text-[#786D63] flex items-start gap-2.5">
                <MapPin size={15} className="text-[#C4933D] flex-shrink-0 mt-0.5" />
                <span>{formData.address}</span>
              </div>

              <div className="text-xs text-[#786D63] flex items-center gap-2.5">
                <Phone size={15} className="text-[#C4933D] flex-shrink-0" />
                <span>{formData.phone}</span>
              </div>

              <div className="text-xs text-[#786D63] flex items-start gap-2.5">
                <Clock size={15} className="text-[#C4933D] flex-shrink-0 mt-0.5" />
                <span className="whitespace-pre-line">{formData.hours}</span>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${formData.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1eb858] text-white py-2 rounded-lg text-xs font-semibold transition-colors"
                >
                  <MessageCircle size={15} />
                  <span>Enquire via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
