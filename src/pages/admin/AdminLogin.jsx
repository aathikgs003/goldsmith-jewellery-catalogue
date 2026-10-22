import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail, ArrowLeft, Loader2 } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import BrandLogo from '../../components/BrandLogo'

export default function AdminLogin() {
  const [email, setEmail] = useState('surinathan770@gmail.com')
  const [password, setPassword] = useState('admin123')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login, isSupabaseConfigured } = useAdmin()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      const res = await login(email, password)
      if (res.success) {
        navigate('/admin')
      } else {
        setError(res.error || 'Invalid email or password')
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred during login')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDemoFill = () => {
    setEmail('surinathan770@gmail.com')
    setPassword('admin123')
    setError('')
  }

  return (
    <div className="min-h-screen bg-[#F5EBDD] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background Ornamental Mandala Watermark */}
      <div className="absolute -right-20 -bottom-20 w-96 h-96 opacity-15 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full stroke-[#C4933D]">
          <circle cx="100" cy="100" r="85" strokeWidth="1" />
          <circle cx="100" cy="100" r="60" strokeWidth="0.8" strokeDasharray="3 3" />
          <path
            d="M100 15 C125 70 185 100 185 100 C185 100 125 130 100 185 C75 130 15 100 15 100 C15 100 75 70 100 15 Z"
            strokeWidth="1"
          />
        </svg>
      </div>
      <div className="absolute -left-20 -top-20 w-80 h-80 opacity-15 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full stroke-[#C4933D]">
          <circle cx="100" cy="100" r="80" strokeWidth="1" />
          <circle cx="100" cy="100" r="45" strokeWidth="0.8" strokeDasharray="2 2" />
        </svg>
      </div>

      {/* Back to website button */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-xs text-[#786D63] hover:text-[#C4933D] flex items-center gap-1.5 transition-colors font-medium bg-white/70 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-[#D8B36A]/40"
      >
        <ArrowLeft size={13} />
        <span>Back to Store</span>
      </Link>

      {/* Main Login Card matching Screenshot 1 */}
      <div className="w-full max-w-[420px] bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#D8B36A]/40 relative z-10">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <BrandLogo variant="dark" />
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C4933D] mt-2">
            Admin Panel
          </span>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email field */}
          <div>
            <label className="block text-xs font-semibold text-[#30231F] mb-1.5">
              Email
            </label>
            <div className="relative flex items-center">
              <Mail size={16} className="absolute left-3.5 text-[#786D63] pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="surinathan770@gmail.com"
                className="w-full text-xs bg-[#FFFCF7] border border-[#D8B36A]/50 focus:border-[#C4933D] rounded-xl pl-10 pr-3.5 py-3 outline-none text-[#30231F] transition-colors"
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <label className="block text-xs font-semibold text-[#30231F] mb-1.5">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock size={16} className="absolute left-3.5 text-[#786D63] pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs bg-[#FFFCF7] border border-[#D8B36A]/50 focus:border-[#C4933D] rounded-xl pl-10 pr-10 py-3 outline-none text-[#30231F] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 text-[#786D63] hover:text-[#30231F] transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-[#786D63] cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-[#D8B36A] text-[#C4933D] focus:ring-[#C4933D] accent-[#C4933D]"
              />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              onClick={handleDemoFill}
              className="text-[#C4933D] hover:underline font-medium text-[11px]"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-[#45151D] hover:bg-[#351016] text-white rounded-xl font-semibold text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-lg mt-2 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isSubmitting && <Loader2 size={16} className="animate-spin text-[#C4933D]" />}
            <span>{isSubmitting ? 'Signing In...' : 'Login'}</span>
          </button>
        </form>

        {/* Demo Credentials Helper Pill */}
        <div className="mt-6 pt-5 border-t border-[#F5EBDD] text-center">
          <p className="text-[11px] text-[#786D63]">
            {isSupabaseConfigured
              ? 'Supabase Auth Mode (or fallback demo account):'
              : 'Default Demo Credentials:'}
          </p>
          <div className="inline-block mt-1 bg-[#F5EBDD]/70 px-3 py-1 rounded-lg text-xs font-mono text-[#30231F]">
            surinathan770@gmail.com / admin123
          </div>
        </div>
      </div>
    </div>
  )
}
