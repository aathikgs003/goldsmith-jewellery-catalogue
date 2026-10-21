import { useState, useMemo } from 'react'
import {
  MessageSquare,
  Phone,
  Trash2,
  CheckCircle2,
  Clock,
  Check,
  Search,
} from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

export default function AdminEnquiries() {
  const { enquiries, updateEnquiryStatus, deleteEnquiry } = useAdmin()
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [successToast, setSuccessToast] = useState('')

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((enq) => {
      const matchStatus =
        filterStatus === 'ALL' || enq.status?.toLowerCase() === filterStatus.toLowerCase()

      const matchSearch =
        !searchQuery.trim() ||
        enq.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enq.contact?.includes(searchQuery) ||
        enq.design?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enq.message?.toLowerCase().includes(searchQuery.toLowerCase())

      return matchStatus && matchSearch
    })
  }, [enquiries, filterStatus, searchQuery])

  const pendingCount = enquiries.filter((e) => e.status === 'Pending').length
  const repliedCount = enquiries.filter((e) => e.status === 'Replied').length

  const toggleStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === 'Pending' ? 'Replied' : 'Pending'
    updateEnquiryStatus(id, nextStatus)
    showToast(`Enquiry marked as ${nextStatus}`)
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete enquiry from ${name}?`)) {
      deleteEnquiry(id)
      showToast(`Enquiry from ${name} deleted`)
    }
  }

  const showToast = (msg) => {
    setSuccessToast(msg)
    setTimeout(() => setSuccessToast(''), 3500)
  }

  return (
    <div className="space-y-6">
      {/* Toast */}
      {successToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#351016] text-[#D8B36A] px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-[#C4933D]/40 animate-fade-in">
          <Check size={18} className="text-[#C4933D]" />
          <span className="text-sm font-medium">{successToast}</span>
        </div>
      )}

      {/* Screen 9: Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold text-[#30231F]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Customer Enquiries
          </h1>
          <p className="text-xs sm:text-sm text-[#786D63] mt-1">
            Browse and respond to customer jewellery and product design requests
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-[#D8B36A]/40 shadow-xs self-start sm:self-auto">
          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterStatus === 'ALL'
                ? 'bg-[#351016] text-[#D8B36A]'
                : 'text-[#786D63] hover:text-[#30231F]'
            }`}
          >
            All ({enquiries.length})
          </button>
          <button
            onClick={() => setFilterStatus('Pending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
              filterStatus === 'Pending'
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'text-[#786D63] hover:text-amber-800'
            }`}
          >
            <Clock size={12} className="text-amber-600" />
            <span>Pending ({pendingCount})</span>
          </button>
          <button
            onClick={() => setFilterStatus('Replied')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
              filterStatus === 'Replied'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'text-[#786D63] hover:text-emerald-800'
            }`}
          >
            <CheckCircle2 size={12} className="text-emerald-600" />
            <span>Replied ({repliedCount})</span>
          </button>
        </div>
      </div>

      {/* Screen 9: Search */}
      <div className="bg-white p-3.5 rounded-xl border border-[#D8B36A]/40 shadow-xs">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#786D63]"
          />
          <input
            type="text"
            placeholder="Search by customer name, phone number, design ID, or message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#D8B36A]/40 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
          />
        </div>
      </div>

      {/* Screen 9: Enquiries Table */}
      <div className="bg-white rounded-xl border border-[#D8B36A]/40 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FFFCF7] border-b border-[#D8B36A]/30 text-[11px] font-bold text-[#786D63] uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Customer</th>
                <th className="py-3.5 px-4 sm:px-6">Contact</th>
                <th className="py-3.5 px-4 sm:px-6">Design / Category</th>
                <th className="py-3.5 px-4 sm:px-6">Message</th>
                <th className="py-3.5 px-4 sm:px-6">Date</th>
                <th className="py-3.5 px-4 sm:px-6">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8B36A]/20 text-sm">
              {filteredEnquiries.map((enq) => {
                const isPending = enq.status === 'Pending'
                const cleanPhone = enq.contact?.replace(/[^0-9]/g, '')

                return (
                  <tr
                    key={enq.id}
                    className="hover:bg-[#FFFCF7]/80 transition-colors group"
                  >
                    {/* Name */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="font-semibold text-[#30231F] text-base">
                        {enq.name}
                      </div>
                      <div className="text-[11px] font-mono text-[#786D63]">{enq.id}</div>
                    </td>

                    {/* Contact */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <a
                        href={`tel:${cleanPhone}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#30231F] hover:text-[#C4933D] bg-[#F5EBDD] hover:bg-[#D8B36A]/30 px-2.5 py-1 rounded-md border border-[#D8B36A]/40 transition-colors"
                        title="Call Customer"
                      >
                        <Phone size={12} className="text-[#C4933D]" />
                        <span>{enq.contact}</span>
                      </a>
                    </td>

                    {/* Design / Category */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="font-medium text-xs text-[#30231F]">
                        {enq.design || 'General Enquiry'}
                      </div>
                      <div className="text-[11px] text-[#786D63]">{enq.category || 'Jewellery'}</div>
                    </td>

                    {/* Message */}
                    <td className="py-3.5 px-4 sm:px-6 max-w-xs">
                      <div className="text-xs text-[#30231F] line-clamp-2 bg-[#F5EBDD]/40 p-2 rounded-lg border border-[#D8B36A]/20">
                        "{enq.message}"
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 sm:px-6 text-xs text-[#786D63] whitespace-nowrap">
                      {enq.date}
                    </td>

                    {/* Status Pill Badge (Clickable to toggle) */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <button
                        onClick={() => toggleStatus(enq.id, enq.status)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                          isPending
                            ? 'bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                        }`}
                        title="Click to toggle status"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isPending ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                        />
                        <span>{enq.status}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        <a
                          href={`tel:${cleanPhone}`}
                          className="inline-flex items-center gap-1 bg-[#351016] hover:bg-[#45151D] text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                          title="Call Customer"
                        >
                          <Phone size={13} />
                          <span className="hidden sm:inline">Call</span>
                        </a>
                        <button
                          onClick={() => handleDelete(enq.id, enq.name)}
                          className="p-1.5 rounded-lg text-[#786D63] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete Enquiry"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}

              {filteredEnquiries.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#786D63]">
                    <MessageSquare size={28} className="mx-auto mb-2 text-[#C4933D]" />
                    <p>No enquiries found matching this filter.</p>
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
