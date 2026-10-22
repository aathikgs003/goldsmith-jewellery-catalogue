import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { products as initialProducts } from '../data/products'
import { categories as initialCategories } from '../data/categories'
import { siteConfig as initialSiteConfig } from '../config/siteConfig'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import {
  fetchProductsFromSupabase,
  insertProductToSupabase,
  updateProductInSupabase,
  deleteProductFromSupabase,
  fetchCategoriesFromSupabase,
  insertCategoryToSupabase,
  updateCategoryInSupabase,
  deleteCategoryFromSupabase,
  uploadJewelleryImage,
  seedInitialDataToSupabase,
} from '../services/supabaseService'

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
    contact: '9876543210',
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
    secondaryButton: 'Contact Us',
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
    title: 'The Story Behind Lakshmanan Gold Works',
    subtitle: 'Crafting timeless gold jewellery with passion, precision, and heritage since decades.',
    storyTitle: 'Crafted with Tradition, Inspired by You',
    storyText1:
      'At Lakshmanan Gold Works, jewellery is not merely an ornament—it is an heirloom of sacred heritage, intimate devotion, and personal celebration. Founded with a vision to preserve the authentic goldsmithing traditions of South India, we have been crafting bespoke gold jewellery for generations.',
    storyText2:
      'From our atelier in Avudayanoor, Tenkasi, our master goldsmiths shape pure 22KT gold into intricate temple masterpieces, bridal harams, everyday chains, and bespoke heirlooms tailored to your family celebrations.',
    storyImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1000&q=80',
    artisansTitle: 'The Art Behind Every Design',
    artisansText:
      'Our master goldsmiths dedicate hours of patient handcrafting to each curve, gemstone setting, and filigree detail, ensuring that every ornament that leaves our workshop carries the legacy of traditional excellence.',
    showroomTitle: 'Experience Our Collections in Person',
    showroomText:
      'We welcome you to visit our Avudayanoor showroom to experience our gold jewellery collections first-hand, consult directly with our master goldsmiths, and enjoy a warm, personalized shopping experience.',
    showroomImage: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80',
  },
  contact: {
    eyebrow: 'GET IN TOUCH',
    title: 'We Are Here to Help',
    subtitle:
      'Have questions about a design, custom jewellery, or visiting our showroom? Reach out to our master goldsmiths.',
    address: 'Kadayam - Pavoorchatram Road, Avudayanoor, Tenkasi, Tamil Nadu 627415',
    phone: '+91 94863 37947',
    phone2: '+91 99945 41091',
    whatsapp: '+91 99945 41091',
    email: 'surinathan770@gmail.com',
    owner: 'T.L.Suriyanathan',
    hours: 'Mon – Sat: 9:30 AM – 9:00 PM\nSunday: 10:00 AM – 1:00 PM',
    consultationTitle: 'Bridal & Custom Design Consultations',
    consultationSubtitle:
      'Planning a wedding or bespoke heirloom? Book an exclusive in-person consultation with our master goldsmith for weight estimates, hallmark certification, and custom design drawings.',
    consultationButton: 'Book In-Store Consultation',
  },
  customDesign: {
    eyebrow: 'BESPOKE GOLDSMITHING',
    title: 'Bring Your Dream Jewellery to Life',
    subtitle:
      'Have a reference sketch, family photograph, or unique vision? Our master goldsmith will craft your one-of-a-kind gold piece with 916 BIS hallmarked purity.',
    buttonText: 'Request Custom Design',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1200&q=80',
    step1Title: 'Share Your Idea',
    step1Desc: 'Send a sketch, photo, or explain your idea directly to our goldsmith or in-person.',
    step2Title: 'Goldsmith Consultation',
    step2Desc: 'We assess purity, recommend gold weight, and finalize design details.',
    step3Title: 'Handcrafted Artistry',
    step3Desc: 'Our master goldsmith meticulously shapes, solders, and polishes your piece.',
    step4Title: 'Hallmarked Delivery',
    step4Desc: 'Certified 916 hallmarked gold, perfectly packaged and ready for your occasion.',
  },
}

export function AdminProvider({ children }) {
  // ─── 1. Authentication State ───
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('slgw_admin_auth') === 'true'
  })

  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('slgw_admin_user')
      if (saved) return JSON.parse(saved)
    } catch {}
    return {
      name: 'T.L.Suriyanathan',
      email: 'surinathan770@gmail.com',
      role: 'Master Goldsmith & Store Owner',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80',
    }
  })

  const [authLoading, setAuthLoading] = useState(false)

  // Listen to Supabase Auth state changes
  useEffect(() => {
    if (!isSupabaseConfigured) return

    // 1. Check existing session on mount
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        setIsAuthenticated(true)
        localStorage.setItem('slgw_admin_auth', 'true')
        setAdminUser((prev) => ({
          ...prev,
          email: session.user.email || prev.email,
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || prev.name,
        }))
      } else if (localStorage.getItem('slgw_admin_auth') === 'true') {
        // Silently restore Supabase session for admin
        const adminEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'surinathan770@gmail.com').toLowerCase().trim()
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'Suri@003*'
        try {
          await supabase.auth.signInWithPassword({
            email: adminEmail,
            password: adminPassword,
          })
        } catch (_) {}
      }
    })

    // 2. Subscribe to auth events (SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setIsAuthenticated(true)
        localStorage.setItem('slgw_admin_auth', 'true')
        setAdminUser((prev) => ({
          ...prev,
          email: session.user.email || prev.email,
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || prev.name,
        }))
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false)
        localStorage.removeItem('slgw_admin_auth')
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const login = async (email, password) => {
    setAuthLoading(true)
    const adminEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'surinathan770@gmail.com').toLowerCase().trim()
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'Suri@003*'
    const isOwnerCredentials = (email.trim().toLowerCase() === adminEmail && password === adminPassword)

    try {
      // 1. Try Supabase Auth first if configured
      if (isSupabaseConfigured) {
        let { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        })

        // If signInWithPassword failed for owner credentials, attempt auto sign-up
        if (error && isOwnerCredentials) {
          try {
            await supabase.auth.signUp({
              email: email.trim(),
              password,
              options: {
                data: { full_name: 'T.L.Suriyanathan' }
              }
            })
            // Retry sign in
            const retry = await supabase.auth.signInWithPassword({
              email: email.trim(),
              password,
            })
            if (retry.data?.session) {
              data = retry.data
              error = null
            }
          } catch (_) {}
        }

        if (!error && data?.session) {
          setIsAuthenticated(true)
          localStorage.setItem('slgw_admin_auth', 'true')
          const userObj = {
            name: data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'Store Admin',
            email: data.user.email,
            role: 'Master Goldsmith & Store Owner',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80',
          }
          setAdminUser(userObj)
          localStorage.setItem('slgw_admin_user', JSON.stringify(userObj))
          setAuthLoading(false)
          return { success: true }
        }

        // If Supabase rejected (e.g. pending email confirmation or password mismatch in dashboard),
        // but owner entered valid owner credentials, allow login with owner credentials
        if (isOwnerCredentials) {
          console.warn('Supabase auth returned: ' + error?.message + '. Granting access with owner credentials.')
          setIsAuthenticated(true)
          localStorage.setItem('slgw_admin_auth', 'true')
          setAuthLoading(false)
          return { success: true }
        }

        setAuthLoading(false)
        return {
          success: false,
          error: error?.message || 'Invalid email or password.',
        }
      }

      // 2. Fallback offline development credentials (when Supabase keys are not configured)
      if (isOwnerCredentials) {
        setIsAuthenticated(true)
        localStorage.setItem('slgw_admin_auth', 'true')
        setAuthLoading(false)
        return { success: true }
      }

      setAuthLoading(false)
      return {
        success: false,
        error: 'Invalid email or password.',
      }
    } catch (err) {
      setAuthLoading(false)
      return { success: false, error: err.message || 'Login failed' }
    }
  }

  const logout = async () => {
    setIsAuthenticated(false)
    localStorage.removeItem('slgw_admin_auth')
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut()
      } catch (err) {
        console.error('Error signing out from Supabase:', err)
      }
    }
  }

  // ─── 2. Categories State & Remote Sync ───
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('slgw_admin_categories')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
      return initialCategories
    } catch {
      return initialCategories
    }
  })
  const [isLoadingCategories, setIsLoadingCategories] = useState(isSupabaseConfigured)
  const [categoriesError, setCategoriesError] = useState(null)

  useEffect(() => {
    localStorage.setItem('slgw_admin_categories', JSON.stringify(categories))
  }, [categories])

  // ─── 3. Products State & Remote Sync ───
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('slgw_admin_products')
      return saved ? JSON.parse(saved) : initialProducts
    } catch {
      return initialProducts
    }
  })
  const [isLoadingProducts, setIsLoadingProducts] = useState(isSupabaseConfigured)
  const [productsError, setProductsError] = useState(null)

  useEffect(() => {
    localStorage.setItem('slgw_admin_products', JSON.stringify(products))
  }, [products])

  const [isSyncing, setIsSyncing] = useState(false)
  const [syncStatus, setSyncStatus] = useState(null)

  // ─── 4. Fetch Products & Categories from Supabase ───
  const refreshData = useCallback(async (autoSeedIfEmpty = false) => {
    if (!isSupabaseConfigured) return

    setIsLoadingProducts(true)
    setIsLoadingCategories(true)
    setProductsError(null)
    setCategoriesError(null)

    try {
      const [remoteCats, remoteProds] = await Promise.all([
        fetchCategoriesFromSupabase(),
        fetchProductsFromSupabase(),
      ])

      // Handle categories
      if (Array.isArray(remoteCats)) {
        if (remoteCats.length > 0) {
          setCategories(remoteCats)
          localStorage.setItem('slgw_admin_categories', JSON.stringify(remoteCats))
        } else if (autoSeedIfEmpty) {
          console.info('Seeding initial categories to Supabase...')
          try {
            await seedInitialDataToSupabase([], initialCategories)
            const seeded = await fetchCategoriesFromSupabase()
            if (seeded?.length) {
              setCategories(seeded)
              localStorage.setItem('slgw_admin_categories', JSON.stringify(seeded))
            }
          } catch (seedErr) {
            console.warn('Auto-seed categories notice:', seedErr.message)
          }
        }
      }

      // Handle products
      if (Array.isArray(remoteProds)) {
        if (remoteProds.length > 0) {
          setProducts(remoteProds)
          localStorage.setItem('slgw_admin_products', JSON.stringify(remoteProds))
        } else if (autoSeedIfEmpty && remoteProds.length === 0) {
          console.info('Seeding initial products to Supabase...')
          try {
            const seedResult = await seedInitialDataToSupabase(initialProducts, [])
            setSyncStatus(`Initial catalogue synced: ${seedResult.productsCount} products.`)
            const seeded = await fetchProductsFromSupabase()
            if (seeded?.length) {
              setProducts(seeded)
              localStorage.setItem('slgw_admin_products', JSON.stringify(seeded))
            }
          } catch (seedErr) {
            console.warn('Auto-seed products notice:', seedErr.message)
          }
        }
      }
    } catch (err) {
      console.warn('Error syncing with Supabase (using cached catalogue):', err.message)
      setProductsError(err.message)
      setCategoriesError(err.message)
    } finally {
      setIsLoadingProducts(false)
      setIsLoadingCategories(false)
    }
  }, [])

  // Auto-fetch from Supabase on mount
  useEffect(() => {
    refreshData(true)
  }, [refreshData])

  // Realtime subscription: live updates across all open tabs, phones, and devices
  useEffect(() => {
    if (!isSupabaseConfigured) return

    const channel = supabase
      .channel('public_catalogue_realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'categories' },
        () => {
          fetchCategoriesFromSupabase()
            .then((cats) => {
              if (Array.isArray(cats) && cats.length > 0) {
                setCategories(cats)
                localStorage.setItem('slgw_admin_categories', JSON.stringify(cats))
              }
            })
            .catch(() => {})
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        () => {
          fetchProductsFromSupabase()
            .then((prods) => {
              if (Array.isArray(prods) && prods.length > 0) {
                setProducts(prods)
                localStorage.setItem('slgw_admin_products', JSON.stringify(prods))
              }
            })
            .catch(() => {})
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // One-click manual migration helper
  const migrateToSupabase = async () => {
    if (!isSupabaseConfigured) {
      return { success: false, error: 'Supabase URL and Key are not configured in Vercel or .env.local' }
    }
    setIsSyncing(true)
    setSyncStatus('Syncing catalogue to Supabase...')
    try {
      const res = await seedInitialDataToSupabase(products, categories)
      await refreshData(false)
      setSyncStatus(`Successfully synced ${res.productsCount} products and ${res.categoriesCount} categories.`)
      setIsSyncing(false)
      return { success: true, ...res }
    } catch (err) {
      console.error('Migration to Supabase failed:', err)
      setIsSyncing(false)
      setSyncStatus(`Sync failed: ${err.message}`)
      return { success: false, error: err.message }
    }
  }

  // ─── Category CRUD with Supabase Sync ───
  const addCategory = async (cat) => {
    const slug = (cat.slug || cat.name).toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const newCat = {
      id: slug,
      slug,
      name: cat.name,
      description: cat.description || `Handcrafted ${cat.name.toLowerCase()} collection.`,
      image: cat.image || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
      status: cat.status || 'Active',
      featured: cat.featured ?? true,
      displayOrder: categories.length + 1,
    }

    if (isSupabaseConfigured) {
      try {
        const saved = await insertCategoryToSupabase(newCat)
        const finalCat = saved || newCat
        setCategories((prev) => {
          const filtered = prev.filter((c) => c.slug !== slug)
          const next = [...filtered, finalCat]
          localStorage.setItem('slgw_admin_categories', JSON.stringify(next))
          return next
        })
        return finalCat
      } catch (err) {
        console.error('Supabase category insert failed:', err)
        throw err
      }
    } else {
      setCategories((prev) => {
        const filtered = prev.filter((c) => c.slug !== slug)
        const next = [...filtered, newCat]
        localStorage.setItem('slgw_admin_categories', JSON.stringify(next))
        return next
      })
      return newCat
    }
  }

  const updateCategory = async (slug, updatedFields) => {
    if (isSupabaseConfigured) {
      try {
        const saved = await updateCategoryInSupabase(slug, updatedFields)
        setCategories((prev) => {
          const next = prev.map((c) => (c.slug === slug ? { ...c, ...updatedFields } : c))
          localStorage.setItem('slgw_admin_categories', JSON.stringify(next))
          return next
        })
        return saved
      } catch (err) {
        console.error('Supabase category update failed:', err)
        throw err
      }
    } else {
      setCategories((prev) => {
        const next = prev.map((c) => (c.slug === slug ? { ...c, ...updatedFields } : c))
        localStorage.setItem('slgw_admin_categories', JSON.stringify(next))
        return next
      })
    }
  }

  const deleteCategory = async (slug) => {
    if (isSupabaseConfigured) {
      try {
        await deleteCategoryFromSupabase(slug)
        setCategories((prev) => {
          const next = prev.filter((c) => c.slug !== slug)
          localStorage.setItem('slgw_admin_categories', JSON.stringify(next))
          return next
        })
      } catch (err) {
        console.error('Supabase category delete failed:', err)
        throw err
      }
    } else {
      setCategories((prev) => {
        const next = prev.filter((c) => c.slug !== slug)
        localStorage.setItem('slgw_admin_categories', JSON.stringify(next))
        return next
      })
    }
  }

  // ─── Product CRUD with Supabase Sync ───
  const addProduct = async (prod) => {
    const rawId = prod.id || `DSG-${String(products.length + 1).padStart(3, '0')}`
    const newProd = {
      id: rawId.trim(),
      slug: (prod.slug || rawId).toLowerCase().trim(),
      name: prod.name,
      category: prod.category || 'bangles',
      style: prod.style || 'traditional',
      occasion: prod.occasion || 'Wedding',
      weightRange: prod.weightRange || '',
      description: prod.description || 'Intricate gold jewellery handcrafted with precision.',
      images: prod.images?.length
        ? prod.images
        : ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'],
      price: prod.price ? Number(prod.price) : null,
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

    if (isSupabaseConfigured) {
      try {
        const saved = await insertProductToSupabase(newProd)
        const finalProd = saved || newProd
        setProducts((prev) => [finalProd, ...prev.filter((p) => p.id !== finalProd.id)])
        return finalProd
      } catch (err) {
        console.error('Supabase product insert failed:', err)
        throw err
      }
    } else {
      setProducts((prev) => [newProd, ...prev.filter((p) => p.id !== newProd.id)])
      return newProd
    }
  }

  const updateProduct = async (id, updatedFields) => {
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

    if (isSupabaseConfigured) {
      try {
        await updateProductInSupabase(id, updatedFields)
      } catch (err) {
        console.error('Supabase product update failed:', err)
        throw err
      }
    }
  }

  const deleteProduct = async (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))

    if (isSupabaseConfigured) {
      try {
        await deleteProductFromSupabase(id)
      } catch (err) {
        console.error('Supabase product delete failed:', err)
        throw err
      }
    }
  }

  // ─── Image Upload to Supabase Storage Helper ───
  const uploadImage = async (file, folder = 'products') => {
    return await uploadJewelleryImage(file, folder)
  }

  // ─── 5. Enquiries State ───
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
      if (saved) {
        let migrated = saved.replaceAll('Sri Lakshmi', 'Lakshmanan')
        migrated = migrated
          .replaceAll('Enquire on WhatsApp', 'Contact Us')
          .replaceAll('Start Custom Design on WhatsApp', 'Request Custom Design')
          .replaceAll('Book WhatsApp Consultation', 'Book In-Store Consultation')
          .replaceAll('directly over WhatsApp or in-person', 'directly to our goldsmith or in-person')
          .replaceAll('somsekhar779@gmail.com', 'surinathan770@gmail.com')
          .replaceAll('somidhari777@gmail.com', 'surinathan770@gmail.com')
          .replaceAll('contact@lakshmanangoldworks.com', 'surinathan770@gmail.com')
          .replaceAll('+91 9344894659', '+91 94863 37947')
          .replaceAll('9344894659', '9486337947')
          .replaceAll('+91 98451 23456', '+91 94863 37947')
          .replaceAll('98451 23456', '9486337947')
          .replaceAll('Ullal, Mangalore', 'Avudayanoor, Tenkasi')
          .replaceAll('Ullal showroom', 'Avudayanoor showroom')
          .replaceAll('showroom in Ullal', 'showroom in Avudayanoor')
          .replaceAll('Ullal Main Road, (Your Location), India', 'Kadayam - Pavoorchatram Road, Avudayanoor, Tenkasi, Tamil Nadu 627415')
          .replaceAll('Ullal Main Road', 'Kadayam - Pavoorchatram Road')
        return JSON.parse(migrated)
      }
      return INITIAL_CONTENT
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
      if (saved) {
        let migrated = saved
          .replaceAll('Sri Lakshmi', 'Lakshmanan')
          .replaceAll('somsekhar779@gmail.com', 'surinathan770@gmail.com')
          .replaceAll('somidhari777@gmail.com', 'surinathan770@gmail.com')
          .replaceAll('contact@lakshmanangoldworks.com', 'surinathan770@gmail.com')
          .replaceAll('+91 9344894659', '+91 94863 37947')
          .replaceAll('9344894659', '9486337947')
          .replaceAll('+91 98451 23456', '+91 94863 37947')
          .replaceAll('98451 23456', '9486337947')
          .replaceAll('Ullal Main Road, (Your Location), India', 'Kadayam - Pavoorchatram Road, Avudayanoor, Tenkasi, Tamil Nadu 627415')
          .replaceAll('Ullal Main Road', 'Kadayam - Pavoorchatram Road')
        const parsed = JSON.parse(migrated)
        parsed.owner = 'T.L.Suriyanathan'
        parsed.phone = '+91 94863 37947'
        parsed.phone2 = '+91 99945 41091'
        parsed.whatsapp = '+91 99945 41091'
        parsed.email = 'surinathan770@gmail.com'
        if (!parsed.address || parsed.address.includes('Ullal') || parsed.address.includes('Your Location')) {
          parsed.address = initialSiteConfig.address
        }
        if (!parsed.mapUrl || parsed.mapUrl.includes('Ullal')) {
          parsed.mapUrl = initialSiteConfig.mapUrl
        }
        return parsed
      }
      return {
        name: initialSiteConfig.name,
        owner: initialSiteConfig.owner || 'T.L.Suriyanathan',
        address: initialSiteConfig.address,
        phone: initialSiteConfig.phone,
        phone2: initialSiteConfig.phone2 || '+91 99945 41091',
        whatsapp: initialSiteConfig.phone2 || '+91 99945 41091',
        email: initialSiteConfig.email,
        hours: 'Mon - Sat: 9:30 AM - 9:00 PM\nSunday: 10:00 AM - 1:00 PM',
        mapUrl: initialSiteConfig.mapUrl,
      }
    } catch {
      return {
        name: initialSiteConfig.name,
        owner: initialSiteConfig.owner || 'T.L.Suriyanathan',
        address: initialSiteConfig.address,
        phone: initialSiteConfig.phone,
        phone2: initialSiteConfig.phone2 || '+91 99945 41091',
        whatsapp: initialSiteConfig.phone2 || '+91 99945 41091',
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
        authLoading,
        login,
        logout,
        categories,
        isLoadingCategories,
        categoriesError,
        addCategory,
        updateCategory,
        deleteCategory,
        products,
        isLoadingProducts,
        productsError,
        addProduct,
        updateProduct,
        deleteProduct,
        uploadImage,
        isSupabaseConfigured,
        isSyncing,
        syncStatus,
        migrateToSupabase,
        refreshData,
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
