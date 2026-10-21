import { Link } from 'react-router-dom'
import {
  Gem,
  FolderTree,
  Sparkles,
  MessageSquare,
  Plus,
  ArrowRight,
} from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

export default function AdminDashboard() {
  const { products, categories, enquiries } = useAdmin()

  const totalDesigns = products.length
  const totalCategories = categories.length
  const totalNewArrivals = products.filter((p) => p.newArrival).length
  const totalEnquiries = enquiries.length

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* ─── Header & Top Actions ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold text-[#30231F]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Dashboard
          </h1>
          <p className="text-xs text-[#786D63] mt-0.5">
            Welcome back, Admin. Overview of products, categories, new arrivals and enquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/categories"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#45151D] hover:bg-[#351016] text-white shadow-xs transition-colors"
          >
            <Plus size={14} />
            <span>Add Category</span>
          </Link>
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#C4933D] hover:bg-[#B3832F] text-white shadow-xs transition-colors"
          >
            <Plus size={14} />
            <span>Add Design</span>
          </Link>
        </div>
      </div>

      {/* ─── 4 Metric Cards (Matching Screen 2) ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Total Designs */}
        <div className="bg-white rounded-2xl p-5 border border-[#D8B36A]/40 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-2xl sm:text-3xl font-bold text-[#30231F] font-mono">
              {totalDesigns}
            </span>
            <p className="text-xs text-[#786D63] font-medium mt-0.5">Total Designs</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-[#F5EBDD] flex items-center justify-center text-[#C4933D]">
            <Gem size={20} />
          </div>
        </div>

        {/* Card 2: Categories */}
        <div className="bg-white rounded-2xl p-5 border border-[#D8B36A]/40 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-2xl sm:text-3xl font-bold text-[#30231F] font-mono">
              {totalCategories}
            </span>
            <p className="text-xs text-[#786D63] font-medium mt-0.5">Categories</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-[#F5EBDD] flex items-center justify-center text-[#C4933D]">
            <FolderTree size={20} />
          </div>
        </div>

        {/* Card 3: New Arrivals */}
        <div className="bg-white rounded-2xl p-5 border border-[#D8B36A]/40 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-2xl sm:text-3xl font-bold text-[#30231F] font-mono">
              {totalNewArrivals}
            </span>
            <p className="text-xs text-[#786D63] font-medium mt-0.5">New Arrivals</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-[#F5EBDD] flex items-center justify-center text-[#C4933D]">
            <Sparkles size={20} />
          </div>
        </div>

        {/* Card 4: Enquiries */}
        <div className="bg-white rounded-2xl p-5 border border-[#D8B36A]/40 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-2xl sm:text-3xl font-bold text-[#30231F] font-mono">
              {totalEnquiries}
            </span>
            <p className="text-xs text-[#786D63] font-medium mt-0.5">Enquiries</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-[#F5EBDD] flex items-center justify-center text-[#C4933D]">
            <MessageSquare size={20} />
          </div>
        </div>
      </div>

      {/* ─── Recent Enquiries Trend Line Chart (Matching Screen 2) ─── */}
      <div className="bg-white rounded-2xl p-6 border border-[#D8B36A]/40 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#30231F]">Recent Enquiries</h3>
            <p className="text-[11px] text-[#786D63]">Customer interest trend over past 7 days</p>
          </div>
          <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold">
            +18% this week
          </span>
        </div>

        {/* SVG Curved Line Chart */}
        <div className="w-full h-52 pt-2">
          <svg viewBox="0 0 700 200" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            <line x1="40" y1="30" x2="680" y2="30" stroke="#F0E4D0" strokeDasharray="3 3" />
            <text x="15" y="34" fontSize="10" fill="#786D63" fontFamily="monospace">15</text>

            <line x1="40" y1="80" x2="680" y2="80" stroke="#F0E4D0" strokeDasharray="3 3" />
            <text x="15" y="84" fontSize="10" fill="#786D63" fontFamily="monospace">10</text>

            <line x1="40" y1="130" x2="680" y2="130" stroke="#F0E4D0" strokeDasharray="3 3" />
            <text x="20" y="134" fontSize="10" fill="#786D63" fontFamily="monospace">5</text>

            <line x1="40" y1="170" x2="680" y2="170" stroke="#F0E4D0" />
            <text x="20" y="174" fontSize="10" fill="#786D63" fontFamily="monospace">0</text>

            {/* Area fill */}
            <path
              d="M 60 140 C 130 110, 190 125, 260 115 C 330 100, 390 70, 460 90 C 530 110, 590 60, 660 50 L 660 170 L 60 170 Z"
              fill="url(#chartGradient)"
            />

            {/* The primary trend line */}
            <path
              d="M 60 140 C 130 110, 190 125, 260 115 C 330 100, 390 70, 460 90 C 530 110, 590 60, 660 50"
              fill="none"
              stroke="#2563EB"
              strokeWidth="2.5"
            />

            {/* Data Point Dots */}
            {[
              { x: 60, y: 140, label: 'Oct 15' },
              { x: 160, y: 118, label: 'Oct 16' },
              { x: 260, y: 115, label: 'Oct 17' },
              { x: 360, y: 82, label: 'Oct 18' },
              { x: 460, y: 90, label: 'Oct 19' },
              { x: 560, y: 95, label: 'Oct 20' },
              { x: 660, y: 50, label: 'Oct 21' },
            ].map((pt, i) => (
              <g key={i}>
                <circle cx={pt.x} cy={pt.y} r="4" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.5" />
                <text
                  x={pt.x}
                  y="190"
                  fontSize="10"
                  textAnchor="middle"
                  fill="#786D63"
                  fontFamily="monospace"
                >
                  {pt.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* ─── Quick Actions Row (Matching Screen 2) ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/admin/products"
          className="flex items-center justify-between p-5 bg-[#C4933D] hover:bg-[#B3832F] text-white rounded-2xl shadow-sm transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Plus size={20} />
            </div>
            <div>
              <p className="font-bold text-sm">Add New Design</p>
              <p className="text-xs text-white/80">Publish a new jewellery photograph and details</p>
            </div>
          </div>
          <ArrowRight size={18} />
        </Link>

        <Link
          to="/admin/categories"
          className="flex items-center justify-between p-5 bg-[#45151D] hover:bg-[#351016] text-white rounded-2xl shadow-sm transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <FolderTree size={20} />
            </div>
            <div>
              <p className="font-bold text-sm">Manage Categories</p>
              <p className="text-xs text-white/80">Configure categories like Bangles, Rings, etc.</p>
            </div>
          </div>
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  )
}
