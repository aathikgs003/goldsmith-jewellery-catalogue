import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Gem,
  HeartHandshake,
  Star,
  Sparkles,
} from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
export default function About() {
  const { websiteContent } = useAdmin()
  const about = websiteContent?.about || {}
  return (
    <div className="flex-1 flex flex-col bg-[#F5EBDD]/40 text-[#30231F]">
      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {/* 1. HERO BANNER â€” Replicating Reference Screenshot Exactly           */}
      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="relative bg-[#F5EBDD]/60 border-b border-[#D8B36A]/30 overflow-hidden">
        {/* Subtle Watermark Mandala */}
        <div className="absolute right-0 top-0 w-96 h-96 opacity-10 pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full stroke-[#C4933D]">
            <circle cx="100" cy="100" r="85" strokeWidth="1" />
            <circle cx="100" cy="100" r="60" strokeWidth="0.8" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="45" strokeWidth="1" />
          </svg>
        </div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] py-10 lg:py-0 gap-8">
            {/* Left Content (Span 7) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 relative z-10">
              {/* Breadcrumbs */}
              <nav className="flex items-center gap-2 text-xs text-[#786D63]" aria-label="Breadcrumb">
                <Link to="/" className="hover:text-[#C4933D] transition-colors">
                  Home
                </Link>
                <span className="text-[#C4933D] text-[10px]">&gt;</span>
                <span className="text-[#30231F] font-semibold">About Us</span>
              </nav>
              {/* Title */}
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#30231F] leading-[1.08]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {about.title || 'About Lakshmanan Gold Works'}
              </h1>
              {/* Subtitle */}
              <p className="text-sm sm:text-base text-[#786D63] font-light leading-relaxed max-w-lg">
                {about.subtitle ||
                  'A passion for timeless jewellery, crafted with care, tradition and fine craftsmanship.'}
              </p>
              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 bg-[#C4933D] hover:bg-[#B3832F] text-white font-semibold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full transition-all shadow-md hover:shadow-lg"
                >
                  <span>Visit Our Store</span>
                  <ArrowRight size={15} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-white/80 hover:bg-white text-[#30231F] hover:text-[#C4933D] border border-[#D8B36A]/50 font-semibold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-all shadow-2xs backdrop-blur-xs"
                >
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>
            {/* Right Editorial Image with Floating Medallion (Span 5) */}
            <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end h-full">
              <div className="relative w-full max-w-[500px] aspect-4/3 lg:aspect-auto lg:h-[480px] overflow-hidden rounded-3xl lg:rounded-none">
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=85"
                  alt="Gold Jewellery on Ornate Wooden Chest"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F5EBDD]/40 lg:from-transparent to-transparent" />
              </div>
              {/* Floating Circular Seal Medallion ("Tradition in Every Detail") */}
              <div className="absolute right-2 sm:right-6 lg:right-6 top-1/2 -translate-y-1/2 w-24 h-24 sm:w-36 sm:h-36 rounded-full border border-[#D8B36A]/60 p-1 flex items-center justify-center bg-black/55 backdrop-blur-xs text-center text-white shadow-2xl">
                <div className="w-full h-full rounded-full border border-dashed border-[#D8B36A]/70 flex flex-col items-center justify-center p-1 sm:p-2.5">
                  <span
                    className="text-[11px] sm:text-sm font-bold leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Tradition<br />in Every<br />Detail
                  </span>
                  <div className="w-8 h-[1px] bg-[#D8B36A]/70 mt-1.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {/* 3. SECTION: OUR VALUES â€” What We Stand For                          */}
      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="flex-1 py-14 sm:py-20 bg-[#F5EBDD]/40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-14 space-y-3">
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-[1.5px] bg-[#C4933D]/60" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C4933D]">
                OUR VALUES
              </span>
              <div className="w-8 h-[1.5px] bg-[#C4933D]/60" />
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#30231F]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What We Stand For
            </h2>
            <p className="text-xs sm:text-sm text-[#786D63] font-light leading-relaxed">
              We are committed to bringing you jewellery designs that reflect tradition, quality and personal style.
            </p>
          </div>
          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Value 1: Quality First */}
            <div className="bg-white rounded-2xl p-6 border border-[#D8B36A]/35 shadow-2xs hover:shadow-md transition-all text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#F5EBDD] flex items-center justify-center text-[#C4933D] mb-4 border border-[#D8B36A]/40 shadow-xs">
                <Gem size={22} />
              </div>
              <h3
                className="font-bold text-base text-[#30231F] mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Quality First
              </h3>
              <p className="text-xs text-[#786D63] font-light leading-relaxed">
                We focus on fine workmanship and attention to detail in every design.
              </p>
            </div>
            {/* Value 2: Traditional Designs */}
            <div className="bg-white rounded-2xl p-6 border border-[#D8B36A]/35 shadow-2xs hover:shadow-md transition-all text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#F5EBDD] flex items-center justify-center text-[#C4933D] mb-4 border border-[#D8B36A]/40 shadow-xs">
                <Sparkles size={22} />
              </div>
              <h3
                className="font-bold text-base text-[#30231F] mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Traditional Designs
              </h3>
              <p className="text-xs text-[#786D63] font-light leading-relaxed">
                A wide range of traditional and contemporary jewellery collections.
              </p>
            </div>
            {/* Value 3: Customer Satisfaction */}
            <div className="bg-white rounded-2xl p-6 border border-[#D8B36A]/35 shadow-2xs hover:shadow-md transition-all text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#F5EBDD] flex items-center justify-center text-[#C4933D] mb-4 border border-[#D8B36A]/40 shadow-xs">
                <HeartHandshake size={22} />
              </div>
              <h3
                className="font-bold text-base text-[#30231F] mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Customer Satisfaction
              </h3>
              <p className="text-xs text-[#786D63] font-light leading-relaxed">
                We value our customers and aim to provide a pleasant shopping experience.
              </p>
            </div>
            {/* Value 4: Custom Jewellery */}
            <div className="bg-white rounded-2xl p-6 border border-[#D8B36A]/35 shadow-2xs hover:shadow-md transition-all text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#F5EBDD] flex items-center justify-center text-[#C4933D] mb-4 border border-[#D8B36A]/40 shadow-xs">
                <Star size={22} />
              </div>
              <h3
                className="font-bold text-base text-[#30231F] mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Custom Jewellery
              </h3>
              <p className="text-xs text-[#786D63] font-light leading-relaxed">
                Bring your ideas to life with our custom jewellery design service.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
