import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  MessageCircle,
  Gem,
  HeartHandshake,
  Star,
  MapPin,
  Phone,
  Clock,
  Sparkles,
} from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import { siteConfig } from '../config/siteConfig'

export default function About() {
  const { websiteContent, storeDetails } = useAdmin()
  const store = storeDetails || siteConfig
  const about = websiteContent?.about || {}

  const showroomRef = useRef(null)

  const scrollToSection = () => {
    showroomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const waUrl = `https://wa.me/${(store.whatsapp || siteConfig.whatsapp).replace(/[^0-9]/g, '')}`

  return (
    <div className="min-h-screen bg-[#FFFCF7] text-[#30231F]">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. HERO BANNER — Replicating Reference Screenshot Exactly           */}
      {/* ─────────────────────────────────────────────────────────────────── */}
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
                <button
                  onClick={scrollToSection}
                  className="inline-flex items-center gap-2.5 bg-[#C4933D] hover:bg-[#B3832F] text-white font-semibold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  <span>Visit Our Store</span>
                  <ArrowRight size={15} />
                </button>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/80 hover:bg-white text-[#30231F] hover:text-[#C4933D] border border-[#D8B36A]/50 font-semibold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-all shadow-2xs backdrop-blur-xs"
                >
                  <MessageCircle size={15} className="text-[#25D366]" />
                  <span>Enquire on WhatsApp</span>
                </a>
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
              <div className="absolute right-3 sm:right-6 lg:right-6 top-1/2 -translate-y-1/2 w-32 h-32 sm:w-36 sm:h-36 rounded-full border border-[#D8B36A]/60 p-1 flex items-center justify-center bg-black/55 backdrop-blur-xs text-center text-white shadow-2xl">
                <div className="w-full h-full rounded-full border border-dashed border-[#D8B36A]/70 flex flex-col items-center justify-center p-2.5">
                  <span
                    className="text-xs sm:text-sm font-bold leading-tight"
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

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. SECTION: OUR STORY — Crafted with Tradition, Inspired by You     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Master Goldsmith Benchwork Photo (Span 5) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/3 sm:aspect-[4/5] rounded-3xl overflow-hidden bg-[#25211D] border border-[#D8B36A]/40 shadow-xl">
              <img
                src={about.storyImage || 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=900&q=85'}
                alt="Master Goldsmith crafting gold necklace with bench tools"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Story Narrative & Badges (Span 7) */}
          <div className="lg:col-span-7 space-y-6 relative">
            {/* Subtle Lotus Watermark */}
            <div className="absolute right-0 top-0 w-64 h-64 opacity-10 pointer-events-none">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-[#C4933D]">
                <circle cx="50" cy="50" r="45" strokeWidth="1" />
                <path d="M50 15 C55 35 68 45 85 50 C68 55 55 65 50 85 C45 65 32 55 15 50 C32 45 45 35 50 15 Z" />
              </svg>
            </div>

            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C4933D]">
                OUR STORY
              </span>
              <div className="w-12 h-[1.5px] bg-[#C4933D]/60" />
            </div>

            {/* Heading */}
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#30231F] leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {about.storyTitle || 'Crafted with Tradition, Inspired by You'}
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4 text-xs sm:text-sm text-[#786D63] font-light leading-relaxed">
              <p>
                {about.storyText1 ||
                  'Lakshmanan Gold Works is built on a deep appreciation for traditional craftsmanship and a passion for creating beautiful jewellery designs for every occasion.'}
              </p>
              <p>
                {about.storyText2 ||
                  'Our focus is on quality, detailed workmanship and customer satisfaction. Each design is carefully crafted by skilled artisans, combining traditional techniques with contemporary styles.'}
              </p>
            </div>

            {/* 3 Horizontal Badges */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#D8B36A]/25">
              {/* Badge 1: Quality Craftsmanship */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F5EBDD] flex items-center justify-center text-[#C4933D] flex-shrink-0 border border-[#D8B36A]/35">
                  <Gem size={20} />
                </div>
                <div className="leading-tight">
                  <p className="font-bold text-xs text-[#30231F]">Quality</p>
                  <p className="text-[11px] text-[#786D63]">Craftsmanship</p>
                </div>
              </div>

              {/* Badge 2: Traditional & Modern Designs */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F5EBDD] flex items-center justify-center text-[#C4933D] flex-shrink-0 border border-[#D8B36A]/35">
                  <Sparkles size={20} />
                </div>
                <div className="leading-tight">
                  <p className="font-bold text-xs text-[#30231F]">Traditional</p>
                  <p className="text-[11px] text-[#786D63]">&amp; Modern Designs</p>
                </div>
              </div>

              {/* Badge 3: Customer Focused Service */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F5EBDD] flex items-center justify-center text-[#C4933D] flex-shrink-0 border border-[#D8B36A]/35">
                  <HeartHandshake size={20} />
                </div>
                <div className="leading-tight">
                  <p className="font-bold text-xs text-[#30231F]">Customer</p>
                  <p className="text-[11px] text-[#786D63]">Focused Service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. SECTION: OUR VALUES — What We Stand For                          */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-[#F5EBDD]/40 border-y border-[#D8B36A]/25">
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

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. SECTION: SKILLED ARTISANS — The Art Behind Every Design          */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="bg-[#2B150F] text-[#F5EBDD] py-14 sm:py-20 relative overflow-hidden">
        {/* Decorative Lotus Watermark */}
        <div className="absolute left-0 bottom-0 w-72 h-72 opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-[#C4933D]">
            <circle cx="50" cy="50" r="45" strokeWidth="1" />
            <path d="M50 15 C55 35 68 45 85 50 C68 55 55 65 50 85 C45 65 32 55 15 50 C32 45 45 35 50 15 Z" />
          </svg>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column (Span 6) */}
            <div className="lg:col-span-6 space-y-5 relative z-10">
              {/* Eyebrow */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#D8B36A]">
                  SKILLED ARTISANS
                </span>
                <div className="w-12 h-[1.5px] bg-[#D8B36A]/60" />
              </div>

              {/* Heading */}
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {about.artisansTitle || 'The Art Behind Every Design'}
              </h2>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-[#F5EBDD]/80 font-light leading-relaxed max-w-lg">
                {about.artisansText ||
                  'Our jewellery is crafted by experienced artisans who bring traditional techniques and modern designs together. Every piece is made with care, skill and a deep respect for the art of goldsmithing.'}
              </p>

              {/* CTA Button */}
              <div className="pt-2">
                <Link
                  to="/collections"
                  className="inline-flex items-center gap-2.5 bg-[#C4933D] hover:bg-[#B3832F] text-white font-semibold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full transition-all shadow-md hover:shadow-lg"
                >
                  <span>Our Craftsmanship</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Right Column: Close-up of artisan hands engraving gold bangle (Span 6) */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-4/3 sm:aspect-[16/10] rounded-3xl overflow-hidden bg-black/40 border border-[#D8B36A]/40 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=85"
                  alt="Hands engraving gold temple bangle"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 5. SECTION: VISIT OUR SHOWROOM — Experience Our Collections         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section ref={showroomRef} className="py-14 sm:py-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Col 1: Showroom Narrative (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C4933D]">
                VISIT OUR SHOWROOM
              </span>
              <div className="w-10 h-[1.5px] bg-[#C4933D]/60" />
            </div>

            {/* Heading */}
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#30231F] leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {about.showroomTitle || 'Experience Our Collections'}
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-[#786D63] font-light leading-relaxed">
              {about.showroomText ||
                'We welcome you to visit our store and explore our wide range of jewellery designs in person.'}
            </p>

            {/* Button */}
            <div className="pt-2">
              <a
                href={store.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#C4933D] hover:bg-[#B3832F] text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all shadow-md"
              >
                <span>Get Directions</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Col 2: Showroom Interior Photo (Span 5) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-[#F5EBDD] border border-[#D8B36A]/40 shadow-lg">
              <img
                src={about.showroomImage || 'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=900&q=85'}
                alt="Lakshmanan Gold Works Showroom Interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Col 3: Store Information Card (Span 3) */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-[#D8B36A]/40 p-5 shadow-xs space-y-4">
            <h3
              className="font-bold text-base text-[#30231F] pb-2 border-b border-[#D8B36A]/20"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Store Information
            </h3>

            <div className="space-y-3 text-xs text-[#786D63]">
              {/* Address */}
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#C4933D] mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{store.address}</span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#C4933D] flex-shrink-0" />
                <a
                  href={`tel:${store.phone}`}
                  className="font-mono text-[#30231F] hover:text-[#C4933D] transition-colors"
                >
                  {store.phone}
                </a>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-2.5">
                <MessageCircle size={15} className="text-emerald-600 flex-shrink-0" />
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-emerald-700 hover:underline"
                >
                  {store.whatsapp}
                </a>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-2.5">
                <Clock size={15} className="text-[#C4933D] mt-0.5 flex-shrink-0" />
                <span className="whitespace-pre-line leading-relaxed">
                  {store.hours || 'Mon - Sat: 9:30 AM - 9:00 PM\nSunday: 10:00 AM - 1:00 PM'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
