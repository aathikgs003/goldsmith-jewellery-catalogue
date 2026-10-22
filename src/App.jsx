import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Collections from './pages/Collections'
import CategoryPage from './pages/CategoryPage'
import ProductDetails from './pages/ProductDetails'
import NewArrivals from './pages/NewArrivals'
import About from './pages/About'
import Contact from './pages/Contact'
import Favourites from './pages/Favourites'
import NotFound from './pages/NotFound'

// Admin Provider & Pages
import { AdminProvider } from './context/AdminContext'
import AdminLayout from './pages/admin/AdminLayout'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLogout from './pages/admin/AdminLogout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminCategories from './pages/admin/AdminCategories'
import AdminNewArrivals from './pages/admin/AdminNewArrivals'
import AdminEnquiries from './pages/admin/AdminEnquiries'
import AdminCustomDesigns from './pages/admin/AdminCustomDesigns'
import AdminContent from './pages/admin/AdminContent'
import AdminSettings from './pages/admin/AdminSettings'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function AppShell() {
  const { pathname } = useLocation()
  const isAnyAdmin = pathname.startsWith('/admin')
  const isAdminDashboard =
    isAnyAdmin && pathname !== '/admin/login' && pathname !== '/admin/logout'

  return (
    <div
      className={`flex flex-col ${
        isAdminDashboard ? 'h-screen overflow-hidden' : 'min-h-screen'
      }`}
    >
      {!isAnyAdmin && <Navbar />}
      <main
        className={`flex-1 ${
          isAdminDashboard ? 'h-full overflow-hidden flex flex-col' : ''
        }`}
      >
        <Routes>
          {/* Customer Facing Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:slug" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/favorites" element={<Favourites />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Auth Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/logout" element={<AdminLogout />} />

          {/* Admin Protected Dashboard Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="new-arrivals" element={<AdminNewArrivals />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
            <Route path="custom-designs" element={<AdminCustomDesigns />} />
            <Route path="content" element={<AdminContent />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Fallback 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAnyAdmin && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppShell />
      </BrowserRouter>
    </AdminProvider>
  )
}
