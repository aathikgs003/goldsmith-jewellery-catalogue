import { useState } from 'react'
import {
  UploadCloud,
  Check,
  Save,
  Layout,
  Info,
  Phone,
  Palette,
  Sparkles,
  Eye,
  Store,
  Layers,
} from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

export default function AdminContent() {
  const { websiteContent, updateContent, storeDetails, updateStoreDetails } = useAdmin()

  const [activeTab, setActiveTab] = useState('home')
  const [successToast, setSuccessToast] = useState('')

  // ─── 1. Home Forms ───
  const [heroForm, setHeroForm] = useState({
    eyebrow: websiteContent.hero?.eyebrow || 'TRADITION × CRAFTSMANSHIP × TIMELESS BEAUTY',
    title: websiteContent.hero?.title || 'Jewellery That Tells Your Story',
    subtitle:
      websiteContent.hero?.subtitle ||
      'Explore our exclusive collection of traditional and contemporary gold jewellery designs for every occasion.',
    primaryButton: websiteContent.hero?.primaryButton || 'Explore Collections',
    secondaryButton: websiteContent.hero?.secondaryButton || 'Contact Us',
    image:
      websiteContent.hero?.image ||
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&q=85',
  })

  const [homeNewArrivalsForm, setHomeNewArrivalsForm] = useState({
    eyebrow: websiteContent.homeNewArrivals?.eyebrow || 'NEW ARRIVALS',
    title: websiteContent.homeNewArrivals?.title || 'Latest Designs for Every Occasion',
    subtitle:
      websiteContent.homeNewArrivals?.subtitle ||
      'From daily wear to grand celebrations, find the perfect jewellery to match your style.',
    buttonText: websiteContent.homeNewArrivals?.buttonText || 'Explore New Arrivals',
    image:
      websiteContent.homeNewArrivals?.image ||
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1000&q=80',
  })

  const [homeCustomForm, setHomeCustomForm] = useState({
    eyebrow: websiteContent.homeCustom?.eyebrow || 'Bring Your Ideas to Life',
    title: websiteContent.homeCustom?.title || 'Custom Jewellery Designs',
    subtitle:
      websiteContent.homeCustom?.subtitle ||
      'Have a design in mind? Let us create it for you with expert craftsmanship and attention to detail.',
    buttonText: websiteContent.homeCustom?.buttonText || 'Request a Custom Design',
    image:
      websiteContent.homeCustom?.image ||
      'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1000&q=80',
  })

  const [homeCraftForm, setHomeCraftForm] = useState({
    eyebrow: websiteContent.homeCraft?.eyebrow || 'OUR CRAFTSMANSHIP',
    title: websiteContent.homeCraft?.title || 'Tradition in Every Detail',
    subtitle:
      websiteContent.homeCraft?.subtitle ||
      'Each piece is crafted with care, skill and a deep respect for our heritage. We focus on quality, detail and timeless designs.',
    buttonText: websiteContent.homeCraft?.buttonText || 'Know More About Us',
    image:
      websiteContent.homeCraft?.image ||
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1000&q=80',
  })

  // ─── 2. About Form ───
  const [aboutForm, setAboutForm] = useState({
    eyebrow: websiteContent.about?.eyebrow || 'TRADITION · CRAFTSMANSHIP · PURITY',
    title: websiteContent.about?.title || 'The Story Behind Lakshmanan Gold Works',
    subtitle:
      websiteContent.about?.subtitle ||
      'Crafting timeless gold jewellery with passion, precision, and heritage since decades.',
    storyTitle: websiteContent.about?.storyTitle || 'Crafted with Tradition, Inspired by You',
    storyText1:
      websiteContent.about?.storyText1 ||
      'At Lakshmanan Gold Works, jewellery is not merely an ornament—it is an heirloom of sacred heritage, intimate devotion, and personal celebration.',
    storyText2:
      websiteContent.about?.storyText2 ||
      'From our atelier in Avudayanoor, Tenkasi, our master goldsmiths shape pure 22KT gold into intricate temple masterpieces, bridal harams, everyday chains, and bespoke heirlooms.',
    storyImage:
      websiteContent.about?.storyImage ||
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1000&q=80',
    artisansTitle: websiteContent.about?.artisansTitle || 'The Art Behind Every Design',
    artisansText:
      websiteContent.about?.artisansText ||
      'Our master goldsmiths dedicate hours of patient handcrafting to each curve, gemstone setting, and filigree detail.',
    showroomTitle: websiteContent.about?.showroomTitle || 'Experience Our Collections in Person',
    showroomText:
      websiteContent.about?.showroomText ||
      'We welcome you to visit our Avudayanoor showroom to experience our gold jewellery collections first-hand, consult directly with our master goldsmiths, and enjoy a warm, personalized shopping experience.',
    showroomImage:
      websiteContent.about?.showroomImage ||
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80',
  })

  // ─── 3. Contact Form ───
  const [contactForm, setContactForm] = useState({
    eyebrow: websiteContent.contact?.eyebrow || 'GET IN TOUCH',
    title: websiteContent.contact?.title || 'We Are Here to Help',
    subtitle:
      websiteContent.contact?.subtitle ||
      'Have questions about a design, custom jewellery, or visiting our showroom? Reach out to our master goldsmiths.',
    address: websiteContent.contact?.address || storeDetails?.address || 'Kadayam - Pavoorchatram Road, Avudayanoor, Tenkasi, Tamil Nadu 627415',
    phone: websiteContent.contact?.phone || storeDetails?.phone || '+91 94863 37947',
    whatsapp: websiteContent.contact?.whatsapp || storeDetails?.phone2 || storeDetails?.whatsapp || '+91 99945 41091',
    email: websiteContent.contact?.email || storeDetails?.email || 'surinathan770@gmail.com',
    hours:
      websiteContent.contact?.hours ||
      storeDetails?.hours ||
      'Mon – Sat: 9:30 AM – 9:00 PM\nSunday: 10:00 AM – 1:00 PM',
    consultationTitle:
      websiteContent.contact?.consultationTitle || 'Bridal & Custom Design Consultations',
    consultationSubtitle:
      websiteContent.contact?.consultationSubtitle ||
      'Planning a wedding or bespoke heirloom? Book an exclusive in-person consultation with our master goldsmith for weight estimates, hallmark certification, and custom design drawings.',
    consultationButton:
      websiteContent.contact?.consultationButton || 'Book In-Store Consultation',
  })

  // ─── 4. Custom Design Form ───
  const [customForm, setCustomForm] = useState({
    eyebrow: websiteContent.customDesign?.eyebrow || 'BESPOKE GOLDSMITHING',
    title: websiteContent.customDesign?.title || 'Bring Your Dream Jewellery to Life',
    subtitle:
      websiteContent.customDesign?.subtitle ||
      'Have a reference sketch, family photograph, or unique vision? Our master goldsmith will craft your one-of-a-kind gold piece with 916 BIS hallmarked purity.',
    buttonText: websiteContent.customDesign?.buttonText || 'Request Custom Design',
    image:
      websiteContent.customDesign?.image ||
      'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1200&q=80',
    step1Title: websiteContent.customDesign?.step1Title || 'Share Your Idea',
    step1Desc:
      websiteContent.customDesign?.step1Desc ||
      'Send a sketch, photo, or explain your idea directly to our goldsmith or in-person.',
    step2Title: websiteContent.customDesign?.step2Title || 'Goldsmith Consultation',
    step2Desc:
      websiteContent.customDesign?.step2Desc ||
      'We assess purity, recommend gold weight, and finalize design details.',
    step3Title: websiteContent.customDesign?.step3Title || 'Handcrafted Artistry',
    step3Desc:
      websiteContent.customDesign?.step3Desc ||
      'Our master goldsmith meticulously shapes, solders, and polishes your piece.',
    step4Title: websiteContent.customDesign?.step4Title || 'Hallmarked Delivery',
    step4Desc:
      websiteContent.customDesign?.step4Desc ||
      'Certified 916 hallmarked gold, perfectly packaged and ready for your occasion.',
  })

  const showToast = (msg) => {
    setSuccessToast(msg)
    setTimeout(() => setSuccessToast(''), 3500)
  }

  // Save Home Page Content
  const handleSaveHome = (e) => {
    e.preventDefault()
    updateContent('hero', heroForm)
    updateContent('homeNewArrivals', homeNewArrivalsForm)
    updateContent('homeCustom', homeCustomForm)
    updateContent('homeCraft', homeCraftForm)
    showToast('Home page content saved successfully!')
  }

  // Save About Us Content
  const handleSaveAbout = (e) => {
    e.preventDefault()
    updateContent('about', aboutForm)
    showToast('About Us content saved successfully!')
  }

  // Save Contact Us Content
  const handleSaveContact = (e) => {
    e.preventDefault()
    updateContent('contact', contactForm)
    if (updateStoreDetails) {
      updateStoreDetails({
        address: contactForm.address,
        phone: contactForm.phone,
        whatsapp: contactForm.whatsapp,
        email: contactForm.email,
        hours: contactForm.hours,
      })
    }
    showToast('Contact Us content & store details saved successfully!')
  }

  // Save Custom Design Content
  const handleSaveCustom = (e) => {
    e.preventDefault()
    updateContent('customDesign', customForm)
    showToast('Custom Design content saved successfully!')
  }

  const handleHeroFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setHeroForm((prev) => ({ ...prev, image: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleNewArrivalsFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setHomeNewArrivalsForm((prev) => ({ ...prev, image: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCustomFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setHomeCustomForm((prev) => ({ ...prev, image: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCraftFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setHomeCraftForm((prev) => ({ ...prev, image: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAboutStoryFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAboutForm((prev) => ({ ...prev, storyImage: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAboutShowroomFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAboutForm((prev) => ({ ...prev, showroomImage: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCustomDesignBannerFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCustomForm((prev) => ({ ...prev, image: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#351016] text-[#D8B36A] px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-[#C4933D]/60 animate-fade-in">
          <Check size={18} className="text-[#C4933D]" />
          <span className="text-sm font-semibold">{successToast}</span>
        </div>
      )}

      {/* Screen Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold text-[#30231F]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Manage Website Content
          </h1>
          <p className="text-xs sm:text-sm text-[#786D63] mt-1">
            Customize headlines, promotional banners, stories, and text across website pages
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#30231F] bg-white border border-[#D8B36A]/40 rounded-lg hover:border-[#C4933D] hover:bg-[#FFFCF7] transition-all shadow-xs"
          >
            <Eye size={14} className="text-[#C4933D]" />
            <span>View Live Site</span>
          </a>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-[#D8B36A]/40 flex items-center gap-2 overflow-x-auto pb-px no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab('home')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'home'
              ? 'border-[#351016] text-[#351016] bg-white rounded-t-lg shadow-xs'
              : 'border-transparent text-[#786D63] hover:text-[#30231F]'
          }`}
        >
          <Layout size={16} className={activeTab === 'home' ? 'text-[#C4933D]' : ''} />
          <span>Home Page</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('about')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'about'
              ? 'border-[#351016] text-[#351016] bg-white rounded-t-lg shadow-xs'
              : 'border-transparent text-[#786D63] hover:text-[#30231F]'
          }`}
        >
          <Info size={16} className={activeTab === 'about' ? 'text-[#C4933D]' : ''} />
          <span>About Us</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('contact')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'contact'
              ? 'border-[#351016] text-[#351016] bg-white rounded-t-lg shadow-xs'
              : 'border-transparent text-[#786D63] hover:text-[#30231F]'
          }`}
        >
          <Phone size={16} className={activeTab === 'contact' ? 'text-[#C4933D]' : ''} />
          <span>Contact Us</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('custom')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'custom'
              ? 'border-[#351016] text-[#351016] bg-white rounded-t-lg shadow-xs'
              : 'border-transparent text-[#786D63] hover:text-[#30231F]'
          }`}
        >
          <Palette size={16} className={activeTab === 'custom' ? 'text-[#C4933D]' : ''} />
          <span>Custom Design</span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* TAB 1: HOME PAGE CONTENT                                            */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {activeTab === 'home' && (
        <form onSubmit={handleSaveHome} className="space-y-6">
          {/* Top Save Bar */}
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-[#D8B36A]/40 shadow-xs">
            <div>
              <h2 className="text-base font-bold text-[#30231F]">Home Page Sections</h2>
              <p className="text-xs text-[#786D63]">
                Edit Hero Banner, New Arrivals Promo, Custom Jewellery Banner, and Craftsmanship Story
              </p>
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#351016] hover:bg-[#45151D] text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-all shadow-md border border-[#C4933D]/40 cursor-pointer"
            >
              <Save size={15} />
              <span>Save Home Changes</span>
            </button>
          </div>

          {/* 1. Hero Section */}
          <div className="bg-white rounded-xl border border-[#D8B36A]/40 shadow-xs overflow-hidden">
            <div className="px-6 py-4 bg-[#FFFCF7] border-b border-[#D8B36A]/30 flex items-center justify-between">
              <h3 className="text-base font-bold text-[#30231F] flex items-center gap-2">
                <Sparkles size={16} className="text-[#C4933D]" />
                <span>1. Hero Section (Top Banner)</span>
              </h3>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                      Eyebrow Tagline
                    </label>
                    <input
                      type="text"
                      value={heroForm.eyebrow}
                      onChange={(e) => setHeroForm({ ...heroForm, eyebrow: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
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

                  <div>
                    <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                      Subtitle / Supporting Description
                    </label>
                    <textarea
                      rows={3}
                      value={heroForm.subtitle}
                      onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7] resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                        Primary CTA Button
                      </label>
                      <input
                        type="text"
                        value={heroForm.primaryButton}
                        onChange={(e) => setHeroForm({ ...heroForm, primaryButton: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#D8B36A]/50 text-xs focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                        Secondary CTA Button Text
                      </label>
                      <input
                        type="text"
                        value={heroForm.secondaryButton}
                        onChange={(e) => setHeroForm({ ...heroForm, secondaryButton: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#D8B36A]/50 text-xs focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider">
                    Hero Banner Image Preview
                  </label>
                  <div className="w-full aspect-16/9 rounded-xl overflow-hidden bg-[#F5EBDD] border border-[#D8B36A]/40 relative group">
                    <img src={heroForm.image} alt="Hero Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#30231F]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <label className="inline-flex items-center gap-2 bg-white text-[#30231F] px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer shadow-lg hover:bg-[#F5EBDD] transition-colors">
                        <UploadCloud size={16} className="text-[#C4933D]" />
                        <span>Upload New Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleHeroFileUpload}
                        />
                      </label>
                    </div>
                  </div>
                  <div>
                    <input
                      type="url"
                      placeholder="Paste image URL (https://...)"
                      value={heroForm.image}
                      onChange={(e) => setHeroForm({ ...heroForm, image: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[#D8B36A]/50 text-xs focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. New Arrivals Banner */}
          <div className="bg-white rounded-xl border border-[#D8B36A]/40 shadow-xs overflow-hidden">
            <div className="px-6 py-4 bg-[#FFFCF7] border-b border-[#D8B36A]/30 flex items-center justify-between">
              <h3 className="text-base font-bold text-[#30231F] flex items-center gap-2">
                <Layers size={16} className="text-[#C4933D]" />
                <span>2. New Arrivals Promotional Banner</span>
              </h3>
            </div>
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                    Eyebrow Text
                  </label>
                  <input
                    type="text"
                    value={homeNewArrivalsForm.eyebrow}
                    onChange={(e) => setHomeNewArrivalsForm({ ...homeNewArrivalsForm, eyebrow: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={homeNewArrivalsForm.title}
                    onChange={(e) => setHomeNewArrivalsForm({ ...homeNewArrivalsForm, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                    Subtitle Description
                  </label>
                  <textarea
                    rows={2}
                    value={homeNewArrivalsForm.subtitle}
                    onChange={(e) => setHomeNewArrivalsForm({ ...homeNewArrivalsForm, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7] resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={homeNewArrivalsForm.buttonText}
                    onChange={(e) => setHomeNewArrivalsForm({ ...homeNewArrivalsForm, buttonText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider">
                  Banner Image
                </label>
                <div className="w-full aspect-16/10 rounded-xl overflow-hidden bg-[#240B12] border border-[#D8B36A]/40 relative group">
                  <img src={homeNewArrivalsForm.image} alt="New Arrivals Banner" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[#30231F]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <label className="inline-flex items-center gap-2 bg-white text-[#30231F] px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer shadow-lg hover:bg-[#F5EBDD] transition-colors">
                      <UploadCloud size={16} className="text-[#C4933D]" />
                      <span>Upload New Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleNewArrivalsFileUpload}
                      />
                    </label>
                  </div>
                </div>
                <input
                  type="url"
                  placeholder="Image URL"
                  value={homeNewArrivalsForm.image}
                  onChange={(e) => setHomeNewArrivalsForm({ ...homeNewArrivalsForm, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#D8B36A]/50 text-xs focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                />
              </div>
            </div>
          </div>

          {/* 3. Custom Jewellery Banner */}
          <div className="bg-white rounded-xl border border-[#D8B36A]/40 shadow-xs overflow-hidden">
            <div className="px-6 py-4 bg-[#FFFCF7] border-b border-[#D8B36A]/30 flex items-center justify-between">
              <h3 className="text-base font-bold text-[#30231F] flex items-center gap-2">
                <Palette size={16} className="text-[#C4933D]" />
                <span>3. Custom Jewellery Banner (Bespoke Warm Champagne)</span>
              </h3>
            </div>
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                    Eyebrow
                  </label>
                  <input
                    type="text"
                    value={homeCustomForm.eyebrow}
                    onChange={(e) => setHomeCustomForm({ ...homeCustomForm, eyebrow: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={homeCustomForm.title}
                    onChange={(e) => setHomeCustomForm({ ...homeCustomForm, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={homeCustomForm.subtitle}
                    onChange={(e) => setHomeCustomForm({ ...homeCustomForm, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7] resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                    CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={homeCustomForm.buttonText}
                    onChange={(e) => setHomeCustomForm({ ...homeCustomForm, buttonText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider">
                  Goldsmith Sketch Image
                </label>
                <div className="w-full aspect-16/10 rounded-xl overflow-hidden bg-white border border-[#D8B36A]/40 relative group">
                  <img src={homeCustomForm.image} alt="Custom Banner" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[#30231F]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <label className="inline-flex items-center gap-2 bg-white text-[#30231F] px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer shadow-lg hover:bg-[#F5EBDD] transition-colors">
                      <UploadCloud size={16} className="text-[#C4933D]" />
                      <span>Upload New Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleCustomFileUpload}
                      />
                    </label>
                  </div>
                </div>
                <input
                  type="url"
                  placeholder="Image URL"
                  value={homeCustomForm.image}
                  onChange={(e) => setHomeCustomForm({ ...homeCustomForm, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#D8B36A]/50 text-xs focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                />
              </div>
            </div>
          </div>

          {/* 4. Craftsmanship Section */}
          <div className="bg-white rounded-xl border border-[#D8B36A]/40 shadow-xs overflow-hidden">
            <div className="px-6 py-4 bg-[#FFFCF7] border-b border-[#D8B36A]/30 flex items-center justify-between">
              <h3 className="text-base font-bold text-[#30231F] flex items-center gap-2">
                <Store size={16} className="text-[#C4933D]" />
                <span>4. Craftsmanship Story Section</span>
              </h3>
            </div>
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                    Eyebrow
                  </label>
                  <input
                    type="text"
                    value={homeCraftForm.eyebrow}
                    onChange={(e) => setHomeCraftForm({ ...homeCraftForm, eyebrow: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={homeCraftForm.title}
                    onChange={(e) => setHomeCraftForm({ ...homeCraftForm, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={homeCraftForm.subtitle}
                    onChange={(e) => setHomeCraftForm({ ...homeCraftForm, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7] resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={homeCraftForm.buttonText}
                    onChange={(e) => setHomeCraftForm({ ...homeCraftForm, buttonText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider">
                  Goldsmith At Work Photograph
                </label>
                <div className="w-full aspect-16/10 rounded-xl overflow-hidden bg-[#1A110D] border border-[#D8B36A]/40 relative group">
                  <img src={homeCraftForm.image} alt="Craftsmanship" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[#30231F]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <label className="inline-flex items-center gap-2 bg-white text-[#30231F] px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer shadow-lg hover:bg-[#F5EBDD] transition-colors">
                      <UploadCloud size={16} className="text-[#C4933D]" />
                      <span>Upload New Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleCraftFileUpload}
                      />
                    </label>
                  </div>
                </div>
                <input
                  type="url"
                  placeholder="Image URL"
                  value={homeCraftForm.image}
                  onChange={(e) => setHomeCraftForm({ ...homeCraftForm, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#D8B36A]/50 text-xs focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                />
              </div>
            </div>
          </div>
        </form>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* TAB 2: ABOUT US PAGE CONTENT                                        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {activeTab === 'about' && (
        <form onSubmit={handleSaveAbout} className="space-y-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-[#D8B36A]/40 shadow-xs">
            <div>
              <h2 className="text-base font-bold text-[#30231F]">About Us Page Sections</h2>
              <p className="text-xs text-[#786D63]">
                Manage brand story, artisan craftsmanship philosophy, and showroom visit details
              </p>
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#351016] hover:bg-[#45151D] text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-all shadow-md border border-[#C4933D]/40 cursor-pointer"
            >
              <Save size={15} />
              <span>Save About Us</span>
            </button>
          </div>

          {/* Hero Banner */}
          <div className="bg-white rounded-xl border border-[#D8B36A]/40 p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-[#30231F] border-b border-[#D8B36A]/30 pb-2">
              1. Hero Header
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                  Eyebrow
                </label>
                <input
                  type="text"
                  value={aboutForm.eyebrow}
                  onChange={(e) => setAboutForm({ ...aboutForm, eyebrow: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                  Main Title
                </label>
                <input
                  type="text"
                  value={aboutForm.title}
                  onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                Subtitle Description
              </label>
              <textarea
                rows={2}
                value={aboutForm.subtitle}
                onChange={(e) => setAboutForm({ ...aboutForm, subtitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7] resize-none"
              />
            </div>
          </div>

          {/* Our Story */}
          <div className="bg-white rounded-xl border border-[#D8B36A]/40 p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-[#30231F] border-b border-[#D8B36A]/30 pb-2">
              2. Our Story (Atelier Narrative)
            </h3>
            <div>
              <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                Story Section Title
              </label>
              <input
                type="text"
                value={aboutForm.storyTitle}
                onChange={(e) => setAboutForm({ ...aboutForm, storyTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                  Story Paragraph 1
                </label>
                <textarea
                  rows={4}
                  value={aboutForm.storyText1}
                  onChange={(e) => setAboutForm({ ...aboutForm, storyText1: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7] resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                  Story Paragraph 2
                </label>
                <textarea
                  rows={4}
                  value={aboutForm.storyText2}
                  onChange={(e) => setAboutForm({ ...aboutForm, storyText2: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7] resize-none"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                Story Image
              </label>
              <div className="w-full max-w-sm aspect-4/3 rounded-xl overflow-hidden bg-[#25211D] border border-[#D8B36A]/40 relative group">
                <img src={aboutForm.storyImage} alt="Story Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#30231F]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <label className="inline-flex items-center gap-2 bg-white text-[#30231F] px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer shadow-lg hover:bg-[#F5EBDD] transition-colors">
                    <UploadCloud size={16} className="text-[#C4933D]" />
                    <span>Upload New Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAboutStoryFileUpload}
                    />
                  </label>
                </div>
              </div>
              <input
                type="url"
                placeholder="Story Image URL"
                value={aboutForm.storyImage}
                onChange={(e) => setAboutForm({ ...aboutForm, storyImage: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-[#D8B36A]/50 text-xs focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
              />
            </div>
          </div>

          {/* Showroom Visit */}
          <div className="bg-white rounded-xl border border-[#D8B36A]/40 p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-[#30231F] border-b border-[#D8B36A]/30 pb-2">
              3. Visit Showroom Section
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                  Showroom Section Heading
                </label>
                <input
                  type="text"
                  value={aboutForm.showroomTitle}
                  onChange={(e) => setAboutForm({ ...aboutForm, showroomTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                  Showroom Image
                </label>
                <div className="w-full aspect-16/10 rounded-xl overflow-hidden bg-[#F5EBDD] border border-[#D8B36A]/40 relative group">
                  <img src={aboutForm.showroomImage} alt="Showroom Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[#30231F]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <label className="inline-flex items-center gap-2 bg-white text-[#30231F] px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer shadow-lg hover:bg-[#F5EBDD] transition-colors">
                      <UploadCloud size={16} className="text-[#C4933D]" />
                      <span>Upload New Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAboutShowroomFileUpload}
                      />
                    </label>
                  </div>
                </div>
                <input
                  type="url"
                  placeholder="Showroom Image URL"
                  value={aboutForm.showroomImage}
                  onChange={(e) => setAboutForm({ ...aboutForm, showroomImage: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-[#D8B36A]/50 text-xs focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                Showroom Invitation Description
              </label>
              <textarea
                rows={2}
                value={aboutForm.showroomText}
                onChange={(e) => setAboutForm({ ...aboutForm, showroomText: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7] resize-none"
              />
            </div>
          </div>
        </form>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* TAB 3: CONTACT US PAGE CONTENT                                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {activeTab === 'contact' && (
        <form onSubmit={handleSaveContact} className="space-y-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-[#D8B36A]/40 shadow-xs">
            <div>
              <h2 className="text-base font-bold text-[#30231F]">Contact Us & Store Settings</h2>
              <p className="text-xs text-[#786D63]">
                Manage contact page headlines, store hours, address, phone numbers, and bridal consultation cards
              </p>
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#351016] hover:bg-[#45151D] text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-all shadow-md border border-[#C4933D]/40 cursor-pointer"
            >
              <Save size={15} />
              <span>Save Contact Info</span>
            </button>
          </div>

          {/* Contact Header */}
          <div className="bg-white rounded-xl border border-[#D8B36A]/40 p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-[#30231F] border-b border-[#D8B36A]/30 pb-2">
              1. Header & Introduction
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                  Eyebrow
                </label>
                <input
                  type="text"
                  value={contactForm.eyebrow}
                  onChange={(e) => setContactForm({ ...contactForm, eyebrow: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                  Page Title
                </label>
                <input
                  type="text"
                  value={contactForm.title}
                  onChange={(e) => setContactForm({ ...contactForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                Subtitle Description
              </label>
              <textarea
                rows={2}
                value={contactForm.subtitle}
                onChange={(e) => setContactForm({ ...contactForm, subtitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7] resize-none"
              />
            </div>
          </div>

          {/* Store Coordinates */}
          <div className="bg-white rounded-xl border border-[#D8B36A]/40 p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-[#30231F] border-b border-[#D8B36A]/30 pb-2">
              2. Store Location & Communication Channels
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                  Store Address
                </label>
                <input
                  type="text"
                  value={contactForm.address}
                  onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                  Owner Mobile 1
                </label>
                <input
                  type="text"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  placeholder="+91 94863 37947"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                  Owner Mobile 2
                </label>
                <input
                  type="text"
                  value={contactForm.whatsapp}
                  onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                  placeholder="+91 99945 41091"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                Business & Showroom Hours
              </label>
              <textarea
                rows={2}
                value={contactForm.hours}
                onChange={(e) => setContactForm({ ...contactForm, hours: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7] font-mono text-xs"
              />
            </div>
          </div>

          {/* Bridal & Custom Consultation Card */}
          <div className="bg-white rounded-xl border border-[#D8B36A]/40 p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-[#30231F] border-b border-[#D8B36A]/30 pb-2">
              3. Consultation Booking Card (Sidebar on Contact Page)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                  Consultation Title
                </label>
                <input
                  type="text"
                  value={contactForm.consultationTitle}
                  onChange={(e) => setContactForm({ ...contactForm, consultationTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                  Consultation Button Text
                </label>
                <input
                  type="text"
                  value={contactForm.consultationButton}
                  onChange={(e) => setContactForm({ ...contactForm, consultationButton: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                Consultation Subtitle & Instructions
              </label>
              <textarea
                rows={2}
                value={contactForm.consultationSubtitle}
                onChange={(e) => setContactForm({ ...contactForm, consultationSubtitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7] resize-none"
              />
            </div>
          </div>
        </form>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* TAB 4: CUSTOM DESIGN CONTENT                                        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {activeTab === 'custom' && (
        <form onSubmit={handleSaveCustom} className="space-y-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-[#D8B36A]/40 shadow-xs">
            <div>
              <h2 className="text-base font-bold text-[#30231F]">Custom Design & Bespoke Jewellery</h2>
              <p className="text-xs text-[#786D63]">
                Manage bespoke orders headline and 4 craftsmanship process steps
              </p>
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#351016] hover:bg-[#45151D] text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-all shadow-md border border-[#C4933D]/40 cursor-pointer"
            >
              <Save size={15} />
              <span>Save Custom Design</span>
            </button>
          </div>

          {/* Main Custom Banner */}
          <div className="bg-white rounded-xl border border-[#D8B36A]/40 p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-[#30231F] border-b border-[#D8B36A]/30 pb-2">
              1. Bespoke Section Headline & Banner
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                  Eyebrow
                </label>
                <input
                  type="text"
                  value={customForm.eyebrow}
                  onChange={(e) => setCustomForm({ ...customForm, eyebrow: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                  Heading
                </label>
                <input
                  type="text"
                  value={customForm.title}
                  onChange={(e) => setCustomForm({ ...customForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={customForm.subtitle}
                onChange={(e) => setCustomForm({ ...customForm, subtitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7] resize-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                  CTA Button Label
                </label>
                <input
                  type="text"
                  value={customForm.buttonText}
                  onChange={(e) => setCustomForm({ ...customForm, buttonText: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                  Workshop Image
                </label>
                <div className="w-full aspect-16/10 rounded-xl overflow-hidden bg-white border border-[#D8B36A]/40 relative group">
                  <img src={customForm.image} alt="Custom Workshop Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[#30231F]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <label className="inline-flex items-center gap-2 bg-white text-[#30231F] px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer shadow-lg hover:bg-[#F5EBDD] transition-colors">
                      <UploadCloud size={16} className="text-[#C4933D]" />
                      <span>Upload New Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleCustomDesignBannerFileUpload}
                      />
                    </label>
                  </div>
                </div>
                <input
                  type="url"
                  placeholder="Workshop Image URL"
                  value={customForm.image}
                  onChange={(e) => setCustomForm({ ...customForm, image: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-[#D8B36A]/50 text-xs focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                />
              </div>
            </div>
          </div>

          {/* 4 Custom Process Steps */}
          <div className="bg-white rounded-xl border border-[#D8B36A]/40 p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-[#30231F] border-b border-[#D8B36A]/30 pb-2">
              2. The 4-Step Custom Goldsmithing Workflow
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Step 1 */}
              <div className="p-3.5 rounded-xl border border-[#D8B36A]/30 bg-[#FFFCF7] space-y-2">
                <span className="text-[10px] font-bold text-[#C4933D] uppercase tracking-wider block">
                  Step 1
                </span>
                <input
                  type="text"
                  placeholder="Step 1 Title"
                  value={customForm.step1Title}
                  onChange={(e) => setCustomForm({ ...customForm, step1Title: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-md border border-[#D8B36A]/40 text-xs font-semibold bg-white"
                />
                <textarea
                  rows={2}
                  placeholder="Step 1 Description"
                  value={customForm.step1Desc}
                  onChange={(e) => setCustomForm({ ...customForm, step1Desc: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-md border border-[#D8B36A]/40 text-xs bg-white resize-none"
                />
              </div>

              {/* Step 2 */}
              <div className="p-3.5 rounded-xl border border-[#D8B36A]/30 bg-[#FFFCF7] space-y-2">
                <span className="text-[10px] font-bold text-[#C4933D] uppercase tracking-wider block">
                  Step 2
                </span>
                <input
                  type="text"
                  placeholder="Step 2 Title"
                  value={customForm.step2Title}
                  onChange={(e) => setCustomForm({ ...customForm, step2Title: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-md border border-[#D8B36A]/40 text-xs font-semibold bg-white"
                />
                <textarea
                  rows={2}
                  placeholder="Step 2 Description"
                  value={customForm.step2Desc}
                  onChange={(e) => setCustomForm({ ...customForm, step2Desc: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-md border border-[#D8B36A]/40 text-xs bg-white resize-none"
                />
              </div>

              {/* Step 3 */}
              <div className="p-3.5 rounded-xl border border-[#D8B36A]/30 bg-[#FFFCF7] space-y-2">
                <span className="text-[10px] font-bold text-[#C4933D] uppercase tracking-wider block">
                  Step 3
                </span>
                <input
                  type="text"
                  placeholder="Step 3 Title"
                  value={customForm.step3Title}
                  onChange={(e) => setCustomForm({ ...customForm, step3Title: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-md border border-[#D8B36A]/40 text-xs font-semibold bg-white"
                />
                <textarea
                  rows={2}
                  placeholder="Step 3 Description"
                  value={customForm.step3Desc}
                  onChange={(e) => setCustomForm({ ...customForm, step3Desc: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-md border border-[#D8B36A]/40 text-xs bg-white resize-none"
                />
              </div>

              {/* Step 4 */}
              <div className="p-3.5 rounded-xl border border-[#D8B36A]/30 bg-[#FFFCF7] space-y-2">
                <span className="text-[10px] font-bold text-[#C4933D] uppercase tracking-wider block">
                  Step 4
                </span>
                <input
                  type="text"
                  placeholder="Step 4 Title"
                  value={customForm.step4Title}
                  onChange={(e) => setCustomForm({ ...customForm, step4Title: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-md border border-[#D8B36A]/40 text-xs font-semibold bg-white"
                />
                <textarea
                  rows={2}
                  placeholder="Step 4 Description"
                  value={customForm.step4Desc}
                  onChange={(e) => setCustomForm({ ...customForm, step4Desc: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-md border border-[#D8B36A]/40 text-xs bg-white resize-none"
                />
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
