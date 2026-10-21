import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import BrandLogo from '../../components/BrandLogo'

export default function AdminLogout() {
  return (
    <div className="min-h-screen bg-[#F5EBDD] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute -right-20 -bottom-20 w-96 h-96 opacity-15 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full stroke-[#C4933D]">
          <circle cx="100" cy="100" r="85" strokeWidth="1" />
          <path
            d="M100 15 C125 70 185 100 185 100 C185 100 125 130 100 185 C75 130 15 100 15 100 C15 100 75 70 100 15 Z"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="w-full max-w-[400px] bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#D8B36A]/40 text-center relative z-10 space-y-6">
        <div className="flex justify-center mb-2">
          <BrandLogo variant="dark" />
        </div>

        {/* Green Checkmark Badge */}
        <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <Check size={32} className="stroke-[2.5]" />
        </div>

        <div>
          <h2
            className="text-xl sm:text-2xl font-bold text-[#30231F]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            You have been logged out
          </h2>
          <p className="text-xs text-[#786D63] mt-1.5">
            Your session has safely ended. Thank you for managing Lakshmanan Gold Works.
          </p>
        </div>

        <div className="pt-2 space-y-3">
          <Link
            to="/admin/login"
            className="block w-full py-3.5 bg-[#45151D] hover:bg-[#351016] text-white rounded-xl font-semibold text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-lg"
          >
            Login Again
          </Link>

          <Link
            to="/"
            className="block text-xs text-[#786D63] hover:text-[#C4933D] font-medium transition-colors"
          >
            Return to Customer Website &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
