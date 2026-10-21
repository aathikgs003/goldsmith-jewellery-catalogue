import { useState } from 'react'
import {
  UploadCloud,
  Check,
  Save,
  Layout,
  Info,
  Phone,
  Palette,
} from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

export default function AdminContent() {
  const { websiteContent, updateHeroContent } = useAdmin()

  const [activeTab, setActiveTab] = useState('home')
  const [heroForm, setHeroForm] = useState({
    title: websiteContent.hero?.title || 'Jewellery That Tells Your Story',
    subtitle:
      websiteContent.hero?.subtitle ||
      'Explore our exclusive collection of traditional and contemporary gold jewellery designs for every occasion.',
    primaryButton: websiteContent.hero?.primaryButton || 'Explore Collections',
    secondaryButton: websiteContent.hero?.secondaryButton || 'Enquire on WhatsApp',
    image:
      websiteContent.hero?.image ||
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&q=85',
  })

  // Other tabs state
  const [aboutForm, setAboutForm] = useState({
    heading: 'Three Decades of Master Goldsmith Craftsmanship',
    story:
      'Founded with a dedication to purity, artistry, and timeless design, Sri Lakshmi Gold Works has been crafting heirloom gold jewellery for generations in Ullal and Mangalore.',
    heritageTitle: 'Traditional Handcrafting Meets Modern Elegance',
  })

  const [contactForm, setContactForm] = useState({
    title: 'Visit Our Goldsmith Studio',
    subtitle: 'We invite you to experience our collection in person or consult directly with our master goldsmith.',
    visitingNotice: 'Walk-ins always welcome. For bridal sets or custom orders, prior appointment recommended.',
  })

  const [customForm, setCustomForm] = useState({
    title: 'Bespoke Goldsmithing & Custom Gold Jewellery',
    subtitle: 'Bring your vision, reference sketch, or heirloom gold. Our master goldsmith will craft your unique piece with 916 BIS hallmarked purity.',
  })

  const [successToast, setSuccessToast] = useState('')

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setHeroForm((prev) => ({ ...prev, image: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveHero = (e) => {
    e.preventDefault()
    updateHeroContent(heroForm)
    showToast('Hero section content updated successfully')
  }

  const handleSaveGeneral = (e) => {
    e.preventDefault()
    showToast('Page content updated successfully')
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

      {/* Screen 10: Header */}
      <div>
        <h1
          className="text-2xl sm:text-3xl font-bold text-[#30231F]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Manage Website Content
        </h1>
        <p className="text-xs sm:text-sm text-[#786D63] mt-1">
          Customize headlines, promotional banners, and text across website pages
        </p>
      </div>

      {/* Screen 10: Tabs */}
      <div className="border-b border-[#D8B36A]/40 flex items-center gap-2 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'home'
              ? 'border-[#351016] text-[#351016] bg-white rounded-t-lg'
              : 'border-transparent text-[#786D63] hover:text-[#30231F]'
          }`}
        >
          <Layout size={16} className={activeTab === 'home' ? 'text-[#C4933D]' : ''} />
          <span>Home Page</span>
        </button>

        <button
          onClick={() => setActiveTab('about')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'about'
              ? 'border-[#351016] text-[#351016] bg-white rounded-t-lg'
              : 'border-transparent text-[#786D63] hover:text-[#30231F]'
          }`}
        >
          <Info size={16} className={activeTab === 'about' ? 'text-[#C4933D]' : ''} />
          <span>About Us</span>
        </button>

        <button
          onClick={() => setActiveTab('contact')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'contact'
              ? 'border-[#351016] text-[#351016] bg-white rounded-t-lg'
              : 'border-transparent text-[#786D63] hover:text-[#30231F]'
          }`}
        >
          <Phone size={16} className={activeTab === 'contact' ? 'text-[#C4933D]' : ''} />
          <span>Contact Us</span>
        </button>

        <button
          onClick={() => setActiveTab('custom')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'custom'
              ? 'border-[#351016] text-[#351016] bg-white rounded-t-lg'
              : 'border-transparent text-[#786D63] hover:text-[#30231F]'
          }`}
        >
          <Palette size={16} className={activeTab === 'custom' ? 'text-[#C4933D]' : ''} />
          <span>Custom Design</span>
        </button>
      </div>

      {/* Screen 10: Tab Content - Home Page Editor */}
      {activeTab === 'home' && (
        <div className="space-y-6">
          <form onSubmit={handleSaveHero} className="bg-white rounded-xl border border-[#D8B36A]/40 shadow-xs overflow-hidden">
            <div className="px-6 py-4 bg-[#FFFCF7] border-b border-[#D8B36A]/30 flex items-center justify-between">
              <div>
                <h2
                  className="text-lg font-bold text-[#30231F]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Hero Section
                </h2>
                <p className="text-xs text-[#786D63]">
                  Main editorial banner and headline displayed on the homepage
                </p>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#351016] hover:bg-[#45151D] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all shadow-md border border-[#C4933D]/40 cursor-pointer"
              >
                <Save size={14} />
                <span>Save Changes</span>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Inputs */}
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1.5">
                      Main Headline (Title)
                    </label>
                    <input
                      type="text"
                      required
                      value={heroForm.title}
                      onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                    />
                  </div>

                  {/* Subtitle */}
                  <div>
                    <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1.5">
                      Subtitle / Supporting Text
                    </label>
                    <textarea
                      rows={3}
                      value={heroForm.subtitle}
                      onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7] resize-none"
                    />
                  </div>

                  {/* Button Labels */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1.5">
                        Primary Button Label
                      </label>
                      <input
                        type="text"
                        value={heroForm.primaryButton}
                        onChange={(e) => setHeroForm({ ...heroForm, primaryButton: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1.5">
                        Secondary Button Label
                      </label>
                      <input
                        type="text"
                        value={heroForm.secondaryButton}
                        onChange={(e) => setHeroForm({ ...heroForm, secondaryButton: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                      />
                    </div>
                  </div>
                </div>

                {/* Right: Hero Image Preview & Change */}
                <div className="space-y-4">
                  <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1.5">
                    Hero Background Image
                  </label>

                  <div className="w-full aspect-16/9 rounded-xl overflow-hidden bg-[#F5EBDD] border border-[#D8B36A]/40 relative group">
                    <img
                      src={heroForm.image}
                      alt="Hero Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#30231F]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <label className="inline-flex items-center gap-2 bg-white text-[#30231F] px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer shadow-lg hover:bg-[#F5EBDD] transition-colors">
                        <UploadCloud size={16} className="text-[#C4933D]" />
                        <span>Change Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="Paste image URL (https://...)"
                      value={heroForm.image}
                      onChange={(e) => setHeroForm({ ...heroForm, image: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-lg border border-[#D8B36A]/50 text-xs focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Screen 10: Tab Content - About Us */}
      {activeTab === 'about' && (
        <form onSubmit={handleSaveGeneral} className="bg-white rounded-xl border border-[#D8B36A]/40 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#D8B36A]/30">
            <h2 className="text-lg font-bold text-[#30231F]" style={{ fontFamily: "'Playfair Display', serif" }}>
              About Us Content
            </h2>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#351016] hover:bg-[#45151D] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all shadow-md border border-[#C4933D]/40 cursor-pointer"
            >
              <Save size={14} />
              <span>Save Changes</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1.5">
              Main Section Heading
            </label>
            <input
              type="text"
              value={aboutForm.heading}
              onChange={(e) => setAboutForm({ ...aboutForm, heading: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1.5">
              Brand Story & Heritage
            </label>
            <textarea
              rows={4}
              value={aboutForm.story}
              onChange={(e) => setAboutForm({ ...aboutForm, story: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7] resize-none"
            />
          </div>
        </form>
      )}

      {/* Screen 10: Tab Content - Contact Us */}
      {activeTab === 'contact' && (
        <form onSubmit={handleSaveGeneral} className="bg-white rounded-xl border border-[#D8B36A]/40 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#D8B36A]/30">
            <h2 className="text-lg font-bold text-[#30231F]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Contact Page Text
            </h2>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#351016] hover:bg-[#45151D] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all shadow-md border border-[#C4933D]/40 cursor-pointer"
            >
              <Save size={14} />
              <span>Save Changes</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1.5">
              Page Title
            </label>
            <input
              type="text"
              value={contactForm.title}
              onChange={(e) => setContactForm({ ...contactForm, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1.5">
              Visiting Store Notice
            </label>
            <textarea
              rows={3}
              value={contactForm.visitingNotice}
              onChange={(e) => setContactForm({ ...contactForm, visitingNotice: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7] resize-none"
            />
          </div>
        </form>
      )}

      {/* Screen 10: Tab Content - Custom Design */}
      {activeTab === 'custom' && (
        <form onSubmit={handleSaveGeneral} className="bg-white rounded-xl border border-[#D8B36A]/40 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#D8B36A]/30">
            <h2 className="text-lg font-bold text-[#30231F]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Custom Design Information
            </h2>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#351016] hover:bg-[#45151D] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all shadow-md border border-[#C4933D]/40 cursor-pointer"
            >
              <Save size={14} />
              <span>Save Changes</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1.5">
              Custom Order Heading
            </label>
            <input
              type="text"
              value={customForm.title}
              onChange={(e) => setCustomForm({ ...customForm, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1.5">
              Custom Order Instructions
            </label>
            <textarea
              rows={3}
              value={customForm.subtitle}
              onChange={(e) => setCustomForm({ ...customForm, subtitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7] resize-none"
            />
          </div>
        </form>
      )}
    </div>
  )
}
