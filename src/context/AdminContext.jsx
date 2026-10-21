import { createContext, useContext, useState, useEffect } from 'react'
import { products as initialProducts } from '../data/products'
import { categories as initialCategories } from '../data/categories'
import { siteConfig as initialSiteConfig } from '../config/siteConfig'

const AdminContext = createContext(null)

const INITIAL_ENQUIRIES = [
  {
    id: 'ENQ-001',
    name: 'Priya',
    contact: '9876543210',
    design: 'BGL-001',
    category: 'Bangles',
    message: 'Price details please',
    date: '21 Oct',
    status: 'Pending',
  },
  {
    id: 'ENQ-002',
    name: 'Karthik',
    contact: '9123456789',
    design: 'Custom Design',
    category: 'Custom Design',
    message: 'Want custom necklace',
    date: '20 Oct',
    status: 'Pending',
  },
  {
    id: 'ENQ-003',
    name: 'Sneha',
    contact: '9988776655',
    design: 'RNG-001',
    category: 'Rings',
    message: 'Ring size and price',
    date: '19 Oct',
    status: 'Replied',
  },
  {
    id: 'ENQ-004',
    name: 'Ananya',
    contact: '9845123456',
    design: 'EAR-001',
    category: 'Earrings',
    message: 'Are temple jhumkas available in 22KT?',
    date: '18 Oct',
    status: 'Replied',
  },
]

const INITIAL_CONTENT = {
  hero: {
    eyebrow: 'TRADITION × CRAFTSMANSHIP × TIMELESS BEAUTY',
    title: 'Jewellery That Tells Your Story',
    subtitle:
      'Explore our exclusive collection of traditional and contemporary gold jewellery designs for every occasion.',
    primaryButton: 'Explore Collections',
    secondaryButton: 'Enquire on WhatsApp',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&q=85',
  },
  homeNewArrivals: {
    eyebrow: 'NEW ARRIVALS',
    title: 'Latest Designs for Every Occasion',
    subtitle: 'From daily wear to grand celebrations, find the perfect jewellery to match your style.',
    buttonText: 'Explore New Arrivals',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80',
  },
  homeCustom: {
    eyebrow: 'Bring Your Ideas to Life',
    title: 'Custom Jewellery Designs',
    subtitle: 'Have a design in mind? Let us create it for you with expert craftsmanship and attention to detail.',
    buttonText: 'Request a Custom Design',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80',
  },
  homeCraft: {
    eyebrow: 'OUR CRAFTSMANSHIP',
    title: 'Tradition in Every Detail',
    subtitle: 'Each piece is crafted with care, skill and a deep respect for our heritage. We focus on quality, detail and timeless designs.',
    buttonText: 'Know More About Us',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80',
  },
  about: {
    eyebrow: 'TRADITION · CRAFTSMANSHIP · PURITY',
    title: 'The Story Behind Sri Lakshmi Gold Works',
    subtitle: 'Crafting timeless gold jewellery with passion, precision, and heritage since decades.',
    storyTitle: 'Crafted with Tradition, Inspired by You',
    storyText1:
      'At Sri Lakshmi Gold Works, jewellery is not merely an ornament—it is an heirloom of sacred heritage, intimate devotion, and personal celebration. Founded with a vision to preserve the authentic goldsmithing traditions of South India, we have been crafting bespoke gold jewellery for generations.',
    storyText2:
      'From our atelier in Ullal, Mangalore, our master goldsmiths shape pure 22KT gold into intricate temple masterpieces, bridal harams, everyday chains, and bespoke heirlooms tailored to your family celebrations.',
    storyImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1000&q=80',
    artisansTitle: 'The Art Behind Every Design',
    artisansText:
      'Our master goldsmiths dedicate hours of patient handcrafting to each curve, gemstone setting, and filigree detail, ensuring that every ornament that leaves our workshop carries the legacy of traditional excellence.',
    showroomTitle: 'Experience Our Collections in Person',
    showroomText:
      'We welcome you to visit our Ullal showroom to experience our gold jewellery collections first-hand, consult directly with our master goldsmiths, and enjoy a warm, personalized shopping experience.',
    showroomImage: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80',
  },
  contact: {
    eyebrow: 'GET IN TOUCH',
    title: 'We Are Here to Help',
    subtitle:
      'Have questions about a design, custom jewellery, or visiting our showroom? Reach out to our master goldsmiths.',
    address: 'Ullal Main Road, (Your Location), India',
    phone: '+91 9344894659',
    whatsapp: '919344894659',
    email: 'somidhari777@gmail.com',
    hours: 'Mon – Sat: 9:30 AM – 9:00 PM\nSunday: 10:00 AM – 1:00 PM',
    consultationTitle: 'Bridal & Custom Design Consultations',
    consultationSubtitle:
      'Planning a wedding or bespoke heirloom? Book an exclusive in-person consultation with our master goldsmith for weight estimates, hallmark certification, and custom design drawings.',
    consultationButton: 'Book WhatsApp Consultation',
  },
  customDesign: {
    eyebrow: 'BESPOKE GOLDSMITHING',
    title: 'Bring Your Dream Jewellery to Life',
    subtitle:
      'Have a reference sketch, family photograph, or unique vision? Our master goldsmith will craft your one-of-a-kind gold piece with 916 BIS hallmarked purity.',
    buttonText: 'Start Custom Design on WhatsApp',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1200&q=80',
    step1Title: 'Share Your Idea',
    step1Desc: 'Send a sketch, photo, or explain your idea directly over WhatsApp or in-person.',
    step2Title: 'Goldsmith Consultation',
    step2Desc: 'We assess purity, recommend gold weight, and finalize design details.',
    step3Title: 'Handcrafted Artistry',
    step3Desc: 'Our master goldsmith meticulously shapes, solders, and polishes your piece.',
    step4Title: 'Hallmarked Delivery',
    step4Desc: 'Certified 916 hallmarked gold, perfectly packaged and ready for your occasion.',
    whatsappPrompt:
      'Namaste Sri Lakshmi Gold Works, I would like to consult with the master goldsmith for a custom jewellery order.',
  },
}

export function AdminProvider({ children }) {
  // ─── 1. Authentication State ───
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('slgw_admin_auth') === 'true'
  })

  const [adminUser] = useState({
    name: 'Admin',
    email: 'admin@gmail.com',
    role: 'Master Goldsmith & Store Owner',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80',
  })

  const login = (email, password) => {
    // Default demo credentials: admin@gmail.com / admin123
    if (email === 'admin@gmail.com' && (password === 'admin123' || password === 'admin' || password.length >= 4)) {
      setIsAuthenticated(true)
      localStorage.setItem('slgw_admin_auth', 'true')
      return { success: true }
    }
    return { success: false, error: 'Invalid email or password. Use admin@gmail.com / admin123' }
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('slgw_admin_auth')
  }

  // ─── 2. Categories State ───
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('slgw_admin_categories')
      return saved ? JSON.parse(saved) : initialCategories
    } catch {
      return initialCategories
    }
  })

  useEffect(() => {
    localStorage.setItem('slgw_admin_categories', JSON.stringify(categories))
  }, [categories])

  const addCategory = (cat) => {
    const slug = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const newCat = {
      id: slug,
      slug,
      name: cat.name,
      description: cat.description || `Handcrafted ${cat.name.toLowerCase()} collection.`,
      image: cat.image || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
      status: cat.status || 'Active',
      featured: true,
    }
    setCategories((prev) => [...prev, newCat])
    return newCat
  }

  const updateCategory = (slug, updatedFields) => {
    setCategories((prev) =>
      prev.map((c) => (c.slug === slug ? { ...c, ...updatedFields } : c)),
    )
  }

  const deleteCategory = (slug) => {
    setCategories((prev) => prev.filter((c) => c.slug !== slug))
  }

  // ─── 3. Products State ───
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('slgw_admin_products')
      return saved ? JSON.parse(saved) : initialProducts
    } catch {
      return initialProducts
    }
  })

  useEffect(() => {
    localStorage.setItem('slgw_admin_products', JSON.stringify(products))
  }, [products])

  const addProduct = (prod) => {
    const newProd = {
      id: prod.id || `DSG-${String(products.length + 1).padStart(3, '0')}`,
      slug: (prod.id || `DSG-${String(products.length + 1).padStart(3, '0')}`).toLowerCase(),
      name: prod.name,
      category: prod.category || 'bangles',
      description: prod.description || 'Intricate gold jewellery handcrafted with precision.',
      images: prod.images?.length
        ? prod.images
        : ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'],
      price: prod.price || null,
      weight: prod.weight || '15.0g',
      purity: prod.purity || '22 KT',
      availability: prod.availability || 'In Stock',
      status: prod.status || 'Active',
      featured: prod.featured ?? true,
      newArrival: prod.newArrival ?? false,
      displayOrder: prod.displayOrder || products.length + 1,
      published: prod.status !== 'Inactive',
      createdAt: new Date().toISOString(),
    }
    setProducts((prev) => [newProd, ...prev])
    return newProd
  }

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, ...updatedFields }
          if (updatedFields.status !== undefined) {
            updated.published = updatedFields.status !== 'Inactive'
          }
          return updated
        }
        return p
      }),
    )
  }

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  // ─── 4. Enquiries State ───
  const [enquiries, setEnquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('slgw_admin_enquiries')
      return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES
    } catch {
      return INITIAL_ENQUIRIES
    }
  })

  useEffect(() => {
    localStorage.setItem('slgw_admin_enquiries', JSON.stringify(enquiries))
  }, [enquiries])

  const updateEnquiryStatus = (id, status) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e)),
    )
  }

  const addEnquiry = (enq) => {
    const newEnq = {
      id: `ENQ-${String(enquiries.length + 1).padStart(3, '0')}`,
      name: enq.name,
      contact: enq.contact,
      design: enq.design || enq.category || 'General Enquiry',
      category: enq.category || 'Jewellery',
      message: enq.message || 'Consultation enquiry',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      status: 'Pending',
    }
    setEnquiries((prev) => [newEnq, ...prev])
    return newEnq
  }

  const deleteEnquiry = (id) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id))
  }

  // ─── 5. Content & Store Settings State ───
  const [websiteContent, setWebsiteContent] = useState(() => {
    try {
      const saved = localStorage.getItem('slgw_admin_content')
      return saved ? JSON.parse(saved) : INITIAL_CONTENT
    } catch {
      return INITIAL_CONTENT
    }
  })

  useEffect(() => {
    localStorage.setItem('slgw_admin_content', JSON.stringify(websiteContent))
  }, [websiteContent])

  const updateContent = (sectionKey, newContent) => {
    setWebsiteContent((prev) => ({
      ...prev,
      [sectionKey]: {
        ...(prev[sectionKey] || INITIAL_CONTENT[sectionKey] || {}),
        ...newContent,
      },
    }))
  }

  const updateHeroContent = (heroFields) => {
    updateContent('hero', heroFields)
  }

  const [storeDetails, setStoreDetails] = useState(() => {
    try {
      const saved = localStorage.getItem('slgw_admin_store_details')
      return saved
        ? JSON.parse(saved)
        : {
            name: initialSiteConfig.name,
            address: initialSiteConfig.address,
            phone: initialSiteConfig.phone,
            whatsapp: initialSiteConfig.whatsapp,
            email: initialSiteConfig.email,
            hours: 'Mon - Sat: 9:30 AM - 9:00 PM\nSunday: 10:00 AM - 1:00 PM',
            mapUrl: initialSiteConfig.mapUrl,
          }
    } catch {
      return {
        name: initialSiteConfig.name,
        address: initialSiteConfig.address,
        phone: initialSiteConfig.phone,
        whatsapp: initialSiteConfig.whatsapp,
        email: initialSiteConfig.email,
        hours: 'Mon - Sat: 9:30 AM - 9:00 PM\nSunday: 10:00 AM - 1:00 PM',
        mapUrl: initialSiteConfig.mapUrl,
      }
    }
  })

  useEffect(() => {
    localStorage.setItem('slgw_admin_store_details', JSON.stringify(storeDetails))
  }, [storeDetails])

  const updateStoreDetails = (details) => {
    setStoreDetails((prev) => ({ ...prev, ...details }))
  }

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        adminUser,
        login,
        logout,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        enquiries,
        addEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,
        websiteContent,
        updateContent,
        updateHeroContent,
        storeDetails,
        updateStoreDetails,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}
