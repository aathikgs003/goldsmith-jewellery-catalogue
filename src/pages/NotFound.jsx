import { Link } from 'react-router-dom'
import { ArrowLeft, Sparkles } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[75vh] bg-[#FBF7F0] flex flex-col items-center justify-center text-center px-4 py-20">
      <div className="w-16 h-16 rounded-full bg-[#F0E4D0] flex items-center justify-center text-[#B68A3A] mb-5 shadow-xs">
        <Sparkles size={28} />
      </div>

      <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B68A3A] mb-2">
        Error 404
      </span>

      <h1
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#25211D] mb-3 max-w-lg leading-tight"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Jewellery Design Not Found
      </h1>

      <p className="text-sm text-[#6B6560] max-w-md mb-8 font-light leading-relaxed">
        The page or jewellery design you are looking for does not exist or may have been relocated.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#B68A3A] hover:bg-[#8A6520] text-white font-semibold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-colors shadow-md"
        >
          <ArrowLeft size={14} />
          <span>Return Home</span>
        </Link>
        <Link
          to="/collections"
          className="inline-flex items-center gap-2 bg-white border border-[#D4AF6A]/40 hover:bg-[#F0E4D0] text-[#25211D] font-semibold px-7 py-3.5 rounded-full text-xs uppercase tracking-wider transition-colors shadow-xs"
        >
          Browse Catalogue
        </Link>
      </div>
    </div>
  )
}
