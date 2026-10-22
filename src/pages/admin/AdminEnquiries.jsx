import { useState, useMemo } from 'react'
import {
  MessageSquare,
  Phone,
  Trash2,
  CheckCircle2,
  Clock,
  Check,
  Search,
  Sparkles,
  Scale,
  Package,
  ChevronRight,
  MessageCircle,
  ExternalLink,
  Filter,
} from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

const ORDER_STAGES = [
  { id: 'Order Received', label: 'Order Received', color: 'amber', desc: 'New custom order received from customer' },
  { id: 'Order Confirmed', label: 'Order Confirmed', color: 'blue', desc: 'Goldsmith reviewed & confirmed gold weight' },
  { id: 'Order Processing', label: 'Order Processing', color: 'purple', desc: 'In workshop crafting & 916 hallmarking' },
  { id: 'Order Handed Over', label: 'Order Handed Over', color: 'emerald', desc: 'Completed & handed over to customer' },
]

export default function AdminEnquiries() {
  const { enquiries, updateOrderStatus, updateEnquiryStatus, deleteEnquiry } = useAdmin()
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [successToast, setSuccessToast] = useState('')

  const updateStatus = updateOrderStatus || updateEnquiryStatus

  // Normalize order status to match 4 lifecycle stages if older data exists
  const normalizeStatus = (status) => {
    if (!status) return 'Order Received'
    const s = String(status).toLowerCase().trim()
    if (s.includes('received') || s.includes('pending')) return 'Order Received'
    if (s.includes('confirm')) return 'Order Confirmed'
    if (s.includes('process') || s.includes('replied')) return 'Order Processing'
    if (s.includes('hand') || s.includes('complete') || s.includes('deliver') || s.includes('over')) return 'Order Handed Over'
    return status
  }

  const filteredOrders = useMemo(() => {
    return enquiries.filter((enq) => {
      const currentStage = normalizeStatus(enq.status)
      const matchStatus =
        filterStatus === 'ALL' || currentStage.toLowerCase() === filterStatus.toLowerCase()

      const matchSearch =
        !searchQuery.trim() ||
        enq.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enq.contact?.includes(searchQuery) ||
        enq.design?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enq.designId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enq.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enq.message?.toLowerCase().includes(searchQuery.toLowerCase())

      return matchStatus && matchSearch
    })
  }, [enquiries, filterStatus, searchQuery])

  // Status stage counts
  const stageCounts = useMemo(() => {
    const counts = {
      'Order Received': 0,
      'Order Confirmed': 0,
      'Order Processing': 0,
      'Order Handed Over': 0,
    }
    enquiries.forEach((e) => {
      const st = normalizeStatus(e.status)
      if (counts[st] !== undefined) counts[st]++
    })
    return counts
  }, [enquiries])

  // Advance to next stage in the lifecycle
  const handleAdvanceStage = (id, currentStatus) => {
    const norm = normalizeStatus(currentStatus)
    const stages = ['Order Received', 'Order Confirmed', 'Order Processing', 'Order Handed Over']
    const currentIndex = stages.indexOf(norm)
    const nextIndex = Math.min(stages.length - 1, currentIndex + 1)
    const nextStage = stages[nextIndex]

    if (nextStage !== norm) {
      updateStatus(id, nextStage)
      showToast(`Order status updated to "${nextStage}"`)
    }
  }

  const handleSelectStatus = (id, newStatus) => {
    updateStatus(id, newStatus)
    showToast(`Order updated to "${newStatus}"`)
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete order ${id} from ${name}?`)) {
      deleteEnquiry(id)
      showToast(`Order ${id} deleted`)
    }
  }

  const handleSendCustomerWhatsApp = (order) => {
    const cleanPhone = order.contact?.replace(/[^0-9]/g, '')
    const norm = normalizeStatus(order.status)
    const msg = encodeURIComponent(
      `Vanakkam ${order.name}! This is from Lakshmanan Gold Works regarding your Custom Order (${order.id}) for ${order.design || 'Jewellery'}.\n\nYour order status is currently: *${norm}*.\nRequested Gold Weight: ${order.requestedWeight || 'As specified'}.\n\nPlease let us know if you have any questions or when you would like to visit our Avudayanoor showroom. Nandri!`
    )
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank')
  }

  const showToast = (msg) => {
    setSuccessToast(msg)
    setTimeout(() => setSuccessToast(''), 3500)
  }

  const getStatusBadge = (status) => {
    const norm = normalizeStatus(status)
    switch (norm) {
      case 'Order Received':
        return {
          bg: 'bg-amber-100 text-amber-900 border-amber-300',
          dot: 'bg-amber-500',
          label: 'Order Received',
        }
      case 'Order Confirmed':
        return {
          bg: 'bg-blue-100 text-blue-900 border-blue-300',
          dot: 'bg-blue-500',
          label: 'Order Confirmed',
        }
      case 'Order Processing':
        return {
          bg: 'bg-purple-100 text-purple-900 border-purple-300',
          dot: 'bg-purple-500',
          label: 'Order Processing',
        }
      case 'Order Handed Over':
        return {
          bg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          dot: 'bg-emerald-500',
          label: 'Order Handed Over',
        }
      default:
        return {
          bg: 'bg-gray-100 text-gray-800 border-gray-300',
          dot: 'bg-gray-400',
          label: status,
        }
    }
  }

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {successToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#351016] text-[#D8B36A] px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-[#C4933D]/40 animate-fade-in">
          <Check size={18} className="text-[#C4933D]" />
          <span className="text-sm font-medium">{successToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold text-[#30231F]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Customer Orders &amp; Enquiries
          </h1>
          <p className="text-xs sm:text-sm text-[#786D63] mt-1">
            Manage custom jewellery orders, weight requirements, and advance status from Received &rarr; Confirmed &rarr; Processing &rarr; Handed Over.
          </p>
        </div>

        {/* 4-Stage Lifecycle Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-[#D8B36A]/40 shadow-xs flex-wrap">
          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filterStatus === 'ALL'
                ? 'bg-[#351016] text-[#D8B36A] shadow-xs'
                : 'text-[#786D63] hover:text-[#30231F]'
            }`}
          >
            All ({enquiries.length})
          </button>

          <button
            onClick={() => setFilterStatus('Order Received')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              filterStatus === 'Order Received'
                ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-xs'
                : 'text-[#786D63] hover:text-amber-800'
            }`}
          >
            <Clock size={12} className="text-amber-600" />
            <span>Received ({stageCounts['Order Received']})</span>
          </button>

          <button
            onClick={() => setFilterStatus('Order Confirmed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              filterStatus === 'Order Confirmed'
                ? 'bg-blue-100 text-blue-900 border border-blue-300 shadow-xs'
                : 'text-[#786D63] hover:text-blue-800'
            }`}
          >
            <CheckCircle2 size={12} className="text-blue-600" />
            <span>Confirmed ({stageCounts['Order Confirmed']})</span>
          </button>

          <button
            onClick={() => setFilterStatus('Order Processing')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              filterStatus === 'Order Processing'
                ? 'bg-purple-100 text-purple-900 border border-purple-300 shadow-xs'
                : 'text-[#786D63] hover:text-purple-800'
            }`}
          >
            <Sparkles size={12} className="text-purple-600" />
            <span>Processing ({stageCounts['Order Processing']})</span>
          </button>

          <button
            onClick={() => setFilterStatus('Order Handed Over')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              filterStatus === 'Order Handed Over'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-xs'
                : 'text-[#786D63] hover:text-emerald-800'
            }`}
          >
            <Check size={12} className="text-emerald-600" />
            <span>Handed Over ({stageCounts['Order Handed Over']})</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white p-3.5 rounded-2xl border border-[#D8B36A]/40 shadow-xs">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#786D63]"
          />
          <input
            type="text"
            placeholder="Search by customer name, phone, order ID (ORD-...), design name, or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#D8B36A]/40 text-xs sm:text-sm focus:outline-none focus:border-[#C4933D] bg-[#FFFCF7]"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-[#D8B36A]/40 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FFFCF7] border-b border-[#D8B36A]/30 text-[11px] font-bold text-[#786D63] uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Order ID &amp; Customer</th>
                <th className="py-3.5 px-4 sm:px-6">Design &amp; Weight</th>
                <th className="py-3.5 px-4 sm:px-6">Customization / Notes</th>
                <th className="py-3.5 px-4 sm:px-6">Date</th>
                <th className="py-3.5 px-4 sm:px-6">Status Lifecycle</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8B36A]/20 text-sm">
              {filteredOrders.map((order) => {
                const badge = getStatusBadge(order.status)
                const cleanPhone = order.contact?.replace(/[^0-9]/g, '')
                const normStatus = normalizeStatus(order.status)

                return (
                  <tr
                    key={order.id}
                    className="hover:bg-[#FFFCF7]/80 transition-colors group"
                  >
                    {/* Customer & ID */}
                    <td className="py-4 px-4 sm:px-6 align-top">
                      <div className="font-bold text-[#30231F] text-sm">
                        {order.name}
                      </div>
                      <div className="text-[11px] font-mono text-[#C4933D] font-bold mt-0.5">
                        {order.id}
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <a
                          href={`tel:${cleanPhone}`}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#30231F] bg-[#F5EBDD] hover:bg-[#D8B36A]/30 px-2.5 py-1 rounded-md border border-[#D8B36A]/40 transition-colors"
                          title="Call Customer"
                        >
                          <Phone size={11} className="text-[#C4933D]" />
                          <span>{order.contact}</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => handleSendCustomerWhatsApp(order)}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded-md border border-emerald-300 transition-colors cursor-pointer"
                          title="WhatsApp Update to Customer"
                        >
                          <MessageCircle size={11} className="text-emerald-600" />
                          <span>Chat</span>
                        </button>
                      </div>

                      {order.email && (
                        <div className="text-[10px] text-[#786D63] mt-1 truncate max-w-[180px]">
                          {order.email}
                        </div>
                      )}
                    </td>

                    {/* Design & Weight */}
                    <td className="py-4 px-4 sm:px-6 align-top">
                      <div className="flex items-start gap-3">
                        {order.image && (
                          <img
                            src={order.image}
                            alt={order.design}
                            className="w-12 h-12 rounded-lg object-cover border border-[#D8B36A]/30 flex-shrink-0"
                          />
                        )}
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-[#30231F]">
                            {order.design || 'Custom Design'}
                          </div>
                          {order.designId && (
                            <div className="text-[10px] font-mono text-[#786D63]">
                              Design ID: {order.designId}
                            </div>
                          )}

                          {/* Requested Gold Weight Badge */}
                          <div className="mt-1.5 inline-flex items-center gap-1.5 bg-[#FFFCF7] border border-[#D8B36A]/50 px-2 py-0.5 rounded-md text-xs font-mono">
                            <Scale size={11} className="text-[#C4933D]" />
                            <span className="font-bold text-[#C4933D]">
                              {order.requestedWeight || order.weight || 'Custom'}
                            </span>
                            {order.baseWeight && (
                              <span className="text-[10px] text-[#786D63]">
                                (Base: {order.baseWeight})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Customization Details & Notes */}
                    <td className="py-4 px-4 sm:px-6 align-top max-w-xs">
                      {order.consultationType && (
                        <div className="text-[11px] font-semibold text-[#351016] mb-1">
                          {order.consultationType}
                        </div>
                      )}
                      <div className="text-xs text-[#30231F] bg-[#F5EBDD]/40 p-2.5 rounded-xl border border-[#D8B36A]/20 leading-relaxed">
                        {order.message || order.notes || 'No special customization notes provided.'}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 sm:px-6 align-top text-xs text-[#786D63] whitespace-nowrap">
                      {order.date}
                    </td>

                    {/* Status Lifecycle Stepper / Selector */}
                    <td className="py-4 px-4 sm:px-6 align-top">
                      <div className="space-y-2">
                        {/* Interactive Dropdown Selector */}
                        <select
                          value={normStatus}
                          onChange={(e) => handleSelectStatus(order.id, e.target.value)}
                          className={`w-full text-xs font-bold py-1.5 px-2.5 rounded-xl border transition-all cursor-pointer ${badge.bg}`}
                        >
                          <option value="Order Received">Order Received (Stage 1)</option>
                          <option value="Order Confirmed">Order Confirmed (Stage 2)</option>
                          <option value="Order Processing">Order Processing (Stage 3)</option>
                          <option value="Order Handed Over">Order Handed Over (Stage 4)</option>
                        </select>

                        {/* Quick Advance Button */}
                        {normStatus !== 'Order Handed Over' && (
                          <button
                            type="button"
                            onClick={() => handleAdvanceStage(order.id, order.status)}
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-[#351016] hover:text-[#C4933D] transition-colors cursor-pointer"
                          >
                            <span>Advance Stage</span>
                            <ChevronRight size={12} />
                          </button>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 sm:px-6 align-top text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleSendCustomerWhatsApp(order)}
                          className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                          title="WhatsApp Update"
                        >
                          <MessageCircle size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(order.id, order.name)}
                          className="p-1.5 rounded-lg text-[#786D63] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete Order"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-[#786D63]">
                    <Package size={32} className="mx-auto mb-2 text-[#C4933D]" />
                    <p className="font-semibold text-sm">No orders found matching this filter.</p>
                    <p className="text-xs text-[#786D63] mt-1">
                      New customer custom orders submitted on product pages will appear here.
                    </p>
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
