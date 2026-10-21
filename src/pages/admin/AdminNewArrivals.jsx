import { useState } from 'react'
import { Plus, Trash2, Sparkles, X, Check, ArrowUp, ArrowDown } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

export default function AdminNewArrivals() {
  const { products, updateProduct } = useAdmin()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [successToast, setSuccessToast] = useState('')

  // New arrivals list
  const newArrivals = products.filter((p) => p.newArrival)

  // Products available to add
  const availableToAdd = products.filter((p) => !p.newArrival)

  const handleRemove = (id, name) => {
    updateProduct(id, { newArrival: false })
    showToast(`"${name}" removed from New Arrivals`)
  }

  const handleAdd = (id, name) => {
    updateProduct(id, { newArrival: true })
    showToast(`"${name}" added to New Arrivals`)
  }

  const handleOrderChange = (id, delta) => {
    // Reorder in array
    const currentIndex = newArrivals.findIndex((p) => p.id === id)
    const targetIndex = currentIndex + delta
    if (targetIndex >= 0 && targetIndex < newArrivals.length) {
      const currentItem = newArrivals[currentIndex]
      const targetItem = newArrivals[targetIndex]
      const currentOrder = currentItem.displayOrder || currentIndex + 1
      const targetOrder = targetItem.displayOrder || targetIndex + 1

      updateProduct(currentItem.id, { displayOrder: targetOrder })
      updateProduct(targetItem.id, { displayOrder: currentOrder })
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

      {/* Screen 8: Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold text-[#30231F]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Manage New Arrivals
          </h1>
          <p className="text-xs sm:text-sm text-[#786D63] mt-1">
            Curate the newest jewellery designs highlighted on the homepage carousel
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 bg-[#351016] hover:bg-[#45151D] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg border border-[#C4933D]/40 self-start sm:self-auto cursor-pointer"
        >
          <Plus size={18} />
          <span>Add to New Arrivals</span>
        </button>
      </div>

      {/* Screen 8: Table */}
      <div className="bg-white rounded-xl border border-[#D8B36A]/40 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FFFCF7] border-b border-[#D8B36A]/30 text-[11px] font-bold text-[#786D63] uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Image</th>
                <th className="py-3.5 px-4 sm:px-6">Design Name</th>
                <th className="py-3.5 px-4 sm:px-6">Design ID</th>
                <th className="py-3.5 px-4 sm:px-6">Display Order</th>
                <th className="py-3.5 px-4 sm:px-6">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8B36A]/20 text-sm">
              {newArrivals.map((prod, index) => {
                const isActive = (prod.status || 'Active') === 'Active'
                const primaryImg =
                  prod.images?.[0] ||
                  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'

                return (
                  <tr
                    key={prod.id}
                    className="hover:bg-[#FFFCF7]/80 transition-colors group"
                  >
                    {/* Image */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#F5EBDD] border border-[#D8B36A]/40 flex-shrink-0">
                        <img
                          src={primaryImg}
                          alt={prod.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </td>

                    {/* Name */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="font-semibold text-[#30231F] text-base">
                        {prod.name}
                      </div>
                      <div className="text-xs text-[#786D63] capitalize">
                        {prod.category} • {prod.weight || '15g'}
                      </div>
                    </td>

                    {/* Design ID */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <span className="font-mono text-xs font-semibold px-2 py-1 bg-[#F5EBDD] text-[#30231F] rounded-md border border-[#D8B36A]/30">
                        {prod.id}
                      </span>
                    </td>

                    {/* Display Order */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="inline-flex items-center gap-2">
                        <span className="w-7 h-7 rounded-md bg-[#F5EBDD] flex items-center justify-center font-bold text-xs text-[#30231F] border border-[#D8B36A]/30">
                          {index + 1}
                        </span>
                        <div className="flex flex-col gap-0.5">
                          <button
                            disabled={index === 0}
                            onClick={() => handleOrderChange(prod.id, -1)}
                            className="p-0.5 text-[#786D63] hover:text-[#C4933D] disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Move Up"
                          >
                            <ArrowUp size={12} />
                          </button>
                          <button
                            disabled={index === newArrivals.length - 1}
                            onClick={() => handleOrderChange(prod.id, 1)}
                            className="p-0.5 text-[#786D63] hover:text-[#C4933D] disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Move Down"
                          >
                            <ArrowDown size={12} />
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-zinc-100 text-zinc-600 border border-zinc-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isActive ? 'bg-emerald-500' : 'bg-zinc-400'
                          }`}
                        />
                        {isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <button
                        onClick={() => handleRemove(prod.id, prod.name)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-700 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
                        title="Remove from New Arrivals"
                      >
                        <Trash2 size={14} />
                        <span>Remove</span>
                      </button>
                    </td>
                  </tr>
                )
              })}

              {newArrivals.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#786D63]">
                    <Sparkles size={28} className="mx-auto mb-2 text-[#C4933D]" />
                    <p>No designs are currently tagged as New Arrivals.</p>
                    <button
                      onClick={() => setIsAddModalOpen(true)}
                      className="mt-3 text-xs text-[#C4933D] hover:underline font-semibold"
                    >
                      Click here to add designs to New Arrivals
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add to New Arrivals */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#30231F]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-hidden">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-[#D8B36A]/50 overflow-hidden animate-scale-up max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="px-5 sm:px-6 py-3.5 bg-[#FFFCF7] border-b border-[#D8B36A]/30 flex items-center justify-between flex-shrink-0">
              <div>
                <h2
                  className="text-lg font-bold text-[#30231F]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Add Designs to New Arrivals
                </h2>
                <p className="text-xs text-[#786D63]">
                  Select products from your catalogue to showcase as New Arrivals
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-[#786D63] hover:text-[#30231F] hover:bg-[#F5EBDD] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Product List */}
            <div className="p-5 sm:p-6 overflow-y-auto divide-y divide-[#D8B36A]/20 flex-1">
              {availableToAdd.map((p) => {
                const img =
                  p.images?.[0] ||
                  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'

                return (
                  <div
                    key={p.id}
                    className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#F5EBDD] border border-[#D8B36A]/40 flex-shrink-0">
                        <img src={img} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-[#30231F]">{p.name}</div>
                        <div className="text-xs text-[#786D63] font-mono">
                          {p.id} • {p.category}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAdd(p.id, p.name)}
                      className="inline-flex items-center gap-1.5 bg-[#351016] hover:bg-[#45151D] text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border border-[#C4933D]/40 cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>Add</span>
                    </button>
                  </div>
                )
              })}

              {availableToAdd.length === 0 && (
                <div className="py-8 text-center text-[#786D63] text-sm">
                  All available designs are already marked as New Arrivals!
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-5 sm:px-6 py-3.5 bg-[#FFFCF7] border-t border-[#D8B36A]/30 flex justify-end flex-shrink-0">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-[#30231F] hover:bg-[#45151D] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
