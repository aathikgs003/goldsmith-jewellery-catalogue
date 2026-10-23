import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Navigation,
  ShieldCheck,
  Gem,
  Award,
} from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import { siteConfig } from '../config/siteConfig'

export default function Contact() {
  const { websiteContent, storeDetails } = useAdmin()
  const store = storeDetails || siteConfig
  const contactData = websiteContent?.contact || {}


  return (
    <div className="min-h-screen bg-[#FFFCF7] text-[#30231F]">
      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {/* 1. EDITORIAL HERO BANNER                                            */}
      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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
              <span className="text-[#C4933D] font-normal">âœ§</span>
              <span>BESPOKE CONSULTATIONS</span>
              <span className="text-[#C4933D] font-normal">âœ§</span>
              <span>MASTER GOLDSMITH</span>
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#30231F] leading-[1.08]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {contactData.title || 'Contact Our Atelier'}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#786D63] font-light leading-relaxed max-w-xl">
              {contactData.subtitle ||
                'Experience the warmth of traditional South Indian gold craftsmanship. Visit our physical showroom in Avudayanoor, Tenkasi, consult directly with our master goldsmith, or connect with us online.'}
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

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {/* 2. FOUR LUXURY CONTACT CARDS GRID                                   */}
      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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
                {contactData.address || store.address}
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

          {/* Card 2: Email Desk */}
          <div className="bg-white rounded-2xl border border-[#D8B36A]/40 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#F5EBDD] flex items-center justify-center text-[#C4933D] group-hover:bg-[#351016] group-hover:text-[#D8B36A] transition-colors">
                <Mail size={20} />
              </div>
              <h3
                className="font-bold text-base text-[#30231F]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Email Consultation
              </h3>
              <p className="text-xs text-[#786D63] leading-relaxed">
                Connect for bullion rates, weight breakdowns, custom design enquiries, and quotations.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-[#D8B36A]/20">
              <a
                href={`mailto:${store.email || siteConfig.email}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#30231F] bg-[#F5EBDD] hover:bg-[#D8B36A]/30 px-3 py-1.5 rounded-lg border border-[#D8B36A]/40 transition-colors"
              >
                <Mail size={13} className="text-[#C4933D]" />
                <span>{store.email || siteConfig.email}</span>
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
            <div className="pt-4 mt-2 border-t border-[#D8B36A]/20 flex flex-col gap-1.5">
              <a
                href={`tel:${(store.phone || siteConfig.phone).replace(/[^0-9+]/g, '')}`}
                className="text-xs font-semibold text-[#30231F] hover:text-[#C4933D] transition-colors font-mono flex items-center gap-1.5"
              >
                <span className="text-[10px] uppercase font-bold text-[#C4933D] tracking-wide">M1:</span>
                <span>{store.phone || siteConfig.phone}</span>
              </a>
              {(store.phone2 || siteConfig.phone2) && (
                <a
                  href={`tel:${(store.phone2 || siteConfig.phone2).replace(/[^0-9+]/g, '')}`}
                  className="text-xs font-semibold text-[#30231F] hover:text-[#C4933D] transition-colors font-mono flex items-center gap-1.5"
                >
                  <span className="text-[10px] uppercase font-bold text-[#C4933D] tracking-wide">M2:</span>
                  <span>{store.phone2 || siteConfig.phone2}</span>
                </a>
              )}
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
                {contactData.hours || store.hours || 'Mon â€“ Sat: 9:30 AM â€“ 9:00 PM\nSunday: 10:00 AM â€“ 1:00 PM'}
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
    </div>
  )
}
