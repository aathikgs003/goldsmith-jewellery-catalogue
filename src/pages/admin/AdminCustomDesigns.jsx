import { Link } from 'react-router-dom'
import { Phone, Sparkles, Edit3 } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

export default function AdminCustomDesigns() {
  const { enquiries } = useAdmin()

  // Custom enquiries
  const customEnquiries = enquiries.filter(
    (e) =>
      e.category?.toLowerCase().includes('custom') ||
      e.design?.toLowerCase().includes('custom') ||
      e.message?.toLowerCase().includes('custom')
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold text-[#30231F]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Custom Jewellery Orders
          </h1>
          <p className="text-xs sm:text-sm text-[#786D63] mt-1">
            Review bespoke customer design requests, sketches, and customization enquiries
          </p>
        </div>
        <div>
          <Link
            to="/admin/content"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#30231F] bg-white border border-[#D8B36A]/40 rounded-lg hover:border-[#C4933D] hover:bg-[#FFFCF7] transition-all shadow-xs"
          >
            <Edit3 size={14} className="text-[#C4933D]" />
            <span>Manage Custom Content</span>
          </Link>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-[#351016] text-[#D8B36A] p-5 rounded-xl border border-[#C4933D]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Sparkles size={18} className="text-[#C4933D]" />
            <span>Master Goldsmith Custom Workshop</span>
          </h3>
          <p className="text-xs text-white/80 mt-1 max-w-xl">
            Customers can submit sketches or reference photographs to create bespoke bridal ornaments, temple motifs, or remelt heirloom gold with certified 916 BIS hallmark purity.
          </p>
        </div>
      </div>

      {/* Custom Enquiries Table */}
      <div className="bg-white rounded-xl border border-[#D8B36A]/40 shadow-xs overflow-hidden">
        <div className="px-6 py-4 bg-[#FFFCF7] border-b border-[#D8B36A]/30 flex items-center justify-between">
          <h2
            className="text-lg font-bold text-[#30231F]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Bespoke Custom Requests ({customEnquiries.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FFFCF7] border-b border-[#D8B36A]/30 text-[11px] font-bold text-[#786D63] uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Customer</th>
                <th className="py-3.5 px-4 sm:px-6">Contact</th>
                <th className="py-3.5 px-4 sm:px-6">Request Summary</th>
                <th className="py-3.5 px-4 sm:px-6">Date</th>
                <th className="py-3.5 px-4 sm:px-6">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8B36A]/20 text-sm">
              {customEnquiries.map((enq) => {
                const cleanPhone = enq.contact?.replace(/[^0-9]/g, '')

                return (
                  <tr key={enq.id} className="hover:bg-[#FFFCF7]/80 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#30231F]">
                      {enq.name}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">
                      <a
                        href={`tel:${cleanPhone}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#30231F] bg-[#F5EBDD] px-2.5 py-1 rounded-md border border-[#D8B36A]/40 hover:bg-[#D8B36A]/30 transition-colors"
                      >
                        <Phone size={12} className="text-[#C4933D]" />
                        <span>{enq.contact}</span>
                      </a>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 max-w-xs text-xs text-[#30231F]">
                      {enq.message}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-xs text-[#786D63]">
                      {enq.date}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span>{enq.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <a
                        href={`tel:${cleanPhone}`}
                        className="inline-flex items-center gap-1 bg-[#351016] hover:bg-[#45151D] text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                      >
                        <Phone size={13} />
                        <span>Call Client</span>
                      </a>
                    </td>
                  </tr>
                )
              })}

              {customEnquiries.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#786D63]">
                    No bespoke custom requests at this time.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
