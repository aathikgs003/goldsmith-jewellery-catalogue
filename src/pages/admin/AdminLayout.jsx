import { useState } from 'react'
import { Link, useLocation, useNavigate, Outlet, Navigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Gem,
  FolderTree,
  Sparkles,
  MessageSquare,
  Palette,
  FileText,
  Settings,
  LogOut,
  User,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import BrandLogo from '../../components/BrandLogo'

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/admin/products', label: 'Products', icon: Gem },
  { to: '/admin/categories', label: 'Categories', icon: FolderTree },
  { to: '/admin/new-arrivals', label: 'New Arrivals', icon: Sparkles },
  { to: '/admin/enquiries', label: 'Orders / Enquiries', icon: MessageSquare },
  { to: '/admin/custom-designs', label: 'Custom Designs', icon: Palette },
  { to: '/admin/content', label: 'Website Content', icon: FileText },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout() {
  const { isAuthenticated, adminUser, logout } = useAdmin()
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Protect route
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  const handleLogout = () => {
    logout()
    navigate('/admin/logout')
  }

  return (
    <div className="h-screen w-full bg-[#F5EBDD]/50 flex flex-col overflow-hidden">
      {/* ─── ADMIN TOP BAR ─── */}
      <header className="h-16 flex-shrink-0 bg-white border-b border-[#D8B36A]/40 shadow-xs z-30">
        <div className="px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
          {/* Left: Mobile hamburger & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen((v) => !v)}
              className="lg:hidden p-2 rounded-lg text-[#30231F] hover:bg-[#F5EBDD] transition-colors"
              aria-label="Toggle navigation"
            >
              <Menu size={20} />
            </button>

            <div className="flex items-center gap-2">
              <BrandLogo variant="dark" />
              <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-[0.2em] bg-[#F5EBDD] text-[#C4933D] px-2 py-0.5 rounded-md border border-[#D8B36A]/40">
                Admin Panel
              </span>
            </div>
          </div>

          {/* Right: View Live Store Link & Profile Dropdown */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#786D63] hover:text-[#C4933D] transition-colors bg-[#FFFCF7] border border-[#D8B36A]/40 px-3 py-1.5 rounded-full"
            >
              <span>View Store</span>
              <ExternalLink size={12} />
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen((v) => !v)}
                className="flex items-center gap-2.5 p-1.5 pr-2.5 rounded-full hover:bg-[#F5EBDD] transition-colors border border-transparent hover:border-[#D8B36A]/40"
              >
                <img
                  src={adminUser.avatar}
                  alt={adminUser.name}
                  className="w-8 h-8 rounded-full object-cover border border-[#C4933D]"
                />
                <span className="text-xs font-semibold text-[#30231F] hidden sm:block">
                  {adminUser.name}
                </span>
                <ChevronDown size={14} className="text-[#786D63]" />
              </button>

              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setProfileDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-[#D8B36A]/40 rounded-2xl shadow-xl py-2 z-50 text-xs">
                    <div className="px-4 py-2 border-b border-[#F5EBDD]">
                      <p className="font-bold text-[#30231F]">{adminUser.name}</p>
                      <p className="text-[10px] text-[#786D63] truncate">{adminUser.email}</p>
                    </div>

                    <Link
                      to="/admin/settings"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-[#30231F] hover:bg-[#F5EBDD] transition-colors"
                    >
                      <User size={14} className="text-[#C4933D]" />
                      <span>Profile &amp; Settings</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-red-700 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut size={14} />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ─── MAIN BODY (Sidebar + Page Content) ─── */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile Sidebar Backdrop */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* ─── DARK BURGUNDY SIDEBAR (Matching Reference Screenshot) ─── */}
        <aside
          className={`fixed lg:relative inset-y-0 left-0 z-50 w-64 flex-shrink-0 bg-[#351016] text-[#F5EBDD] flex flex-col h-full overflow-hidden transition-transform duration-300 ${
            mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Mobile Sidebar Close */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-[#45151D] flex-shrink-0">
            <span className="text-xs uppercase tracking-widest font-bold text-[#D8B36A]">
              Navigation
            </span>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="text-white/70 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Links with smooth scroll if screen height is compact */}
          <nav className="flex-1 p-3.5 space-y-1.5 overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const isActive = item.exact
                ? location.pathname === item.to
                : location.pathname.startsWith(item.to)

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#F5EBDD] text-[#351016] shadow-sm'
                      : 'text-[#F5EBDD]/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-[#C4933D]' : 'text-[#D8B36A]'} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Sidebar Footer Info */}
          <div className="p-4 border-t border-[#45151D] text-[11px] text-[#F5EBDD]/60 space-y-1 flex-shrink-0">
            <p className="font-semibold text-[#D8B36A]">{adminUser.name}</p>
            <p className="truncate">{adminUser.role}</p>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-red-300 hover:text-red-100 pt-2 transition-colors cursor-pointer"
            >
              <LogOut size={13} />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* ─── DYNAMIC PAGE CONTENT CONTAINER ─── */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#F5EBDD]/30">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
