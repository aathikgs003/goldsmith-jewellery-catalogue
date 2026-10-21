import { useState } from 'react'
import { Plus, Pencil, Trash2, X, UploadCloud, FolderTree, Check } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

export default function AdminCategories() {
  const { categories, addCategory, updateCategory, deleteCategory, products } = useAdmin()

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null) // null if adding
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    status: 'Active',
    description: '',
  })
  const [imagePreview, setImagePreview] = useState('')
  const [successToast, setSuccessToast] = useState('')

  const openAddModal = () => {
    setEditingCategory(null)
    setFormData({
      name: '',
      image: '',
      status: 'Active',
      description: '',
    })
    setImagePreview('')
    setIsModalOpen(true)
  }

  const openEditModal = (cat) => {
    setEditingCategory(cat)
    setFormData({
      name: cat.name,
      image: cat.image,
      status: cat.status || 'Active',
      description: cat.description || '',
    })
    setImagePreview(cat.image)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingCategory(null)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setFormData((prev) => ({ ...prev, image: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    const fallbackImg =
      imagePreview ||
      formData.image ||
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'

    if (editingCategory) {
      updateCategory(editingCategory.slug, {
        name: formData.name,
        image: fallbackImg,
        status: formData.status,
        description: formData.description,
      })
      showToast(`Category "${formData.name}" updated successfully`)
    } else {
      addCategory({
        name: formData.name,
        image: fallbackImg,
        status: formData.status,
        description: formData.description,
      })
      showToast(`Category "${formData.name}" created successfully`)
    }
    closeModal()
  }

  const handleDelete = (slug, name) => {
    if (window.confirm(`Are you sure you want to delete the "${name}" category?`)) {
      deleteCategory(slug)
      showToast(`Category "${name}" deleted`)
    }
  }

  const showToast = (msg) => {
    setSuccessToast(msg)
    setTimeout(() => setSuccessToast(''), 3500)
  }

  // Count products per category
  const getProductCount = (slug) => {
    return products.filter((p) => p.category?.toLowerCase() === slug.toLowerCase()).length
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

      {/* Screen 3: Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold text-[#30231F]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Manage Categories
          </h1>
          <p className="text-xs sm:text-sm text-[#786D63] mt-1">
            Add, edit or organize jewellery collections visible on the store
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 bg-[#351016] hover:bg-[#45151D] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg border border-[#C4933D]/40 self-start sm:self-auto cursor-pointer"
        >
          <Plus size={18} />
          <span>Add Category</span>
        </button>
      </div>

      {/* Screen 3: Categories Table Card */}
      <div className="bg-white rounded-xl border border-[#D8B36A]/40 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FFFCF7] border-b border-[#D8B36A]/30 text-[11px] font-bold text-[#786D63] uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Image</th>
                <th className="py-3.5 px-4 sm:px-6">Category Name</th>
                <th className="py-3.5 px-4 sm:px-6">Design Count</th>
                <th className="py-3.5 px-4 sm:px-6">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8B36A]/20 text-sm">
              {categories.map((cat) => {
                const count = getProductCount(cat.slug)
                const isActive = (cat.status || 'Active') === 'Active'
                return (
                  <tr
                    key={cat.slug}
                    className="hover:bg-[#FFFCF7]/80 transition-colors group"
                  >
                    {/* Image */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#F5EBDD] border border-[#D8B36A]/40 flex-shrink-0">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </td>

                    {/* Name */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="font-semibold text-[#30231F] text-base">
                        {cat.name}
                      </div>
                      <div className="text-xs text-[#786D63] line-clamp-1 max-w-xs">
                        {cat.description || `Pure gold ${cat.name.toLowerCase()} jewellery.`}
                      </div>
                    </td>

                    {/* Designs count */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#F5EBDD] text-[#30231F] border border-[#D8B36A]/30">
                        <FolderTree size={12} className="text-[#C4933D]" />
                        {count} {count === 1 ? 'Design' : 'Designs'}
                      </span>
                    </td>

                    {/* Status badge */}
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
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(cat)}
                          className="p-1.5 rounded-lg text-[#786D63] hover:text-[#C4933D] hover:bg-[#F5EBDD] transition-colors"
                          title="Edit Category"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.slug, cat.name)}
                          className="p-1.5 rounded-lg text-[#786D63] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Category"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}

              {categories.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#786D63]">
                    No categories found. Click "+ Add Category" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Screen 4: Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#30231F]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-hidden">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] sm:max-h-[90vh] shadow-2xl border border-[#D8B36A]/50 flex flex-col overflow-hidden animate-scale-up">
            {/* Locked Modal Header */}
            <div className="px-5 sm:px-6 py-3.5 bg-[#FFFCF7] border-b border-[#D8B36A]/30 flex items-center justify-between flex-shrink-0">
              <h2
                className="text-lg font-bold text-[#30231F]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="p-1.5 rounded-lg text-[#786D63] hover:text-[#30231F] hover:bg-[#F5EBDD] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form with Scrollable Body & Locked Footer */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden min-h-0">
              <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
                {/* Category Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1.5">
                    Category Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Temple Bangles, Gold Rings"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] focus:ring-1 focus:ring-[#C4933D] bg-[#FFFCF7]"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1.5">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] focus:ring-1 focus:ring-[#C4933D] bg-[#FFFCF7]"
                  >
                    <option value="Active">Active (Visible on store)</option>
                    <option value="Inactive">Inactive (Hidden)</option>
                  </select>
                </div>

                {/* Image Preview & Upload */}
                <div>
                  <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1.5">
                    Category Image
                  </label>
                  <div className="space-y-3">
                    {/* Preview Box */}
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F5EBDD] border border-[#D8B36A]/40 flex-shrink-0 flex items-center justify-center">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <UploadCloud size={24} className="text-[#C4933D]" />
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <input
                          type="url"
                          placeholder="Paste image URL (https://...)"
                          value={formData.image}
                          onChange={(e) => {
                            setFormData({ ...formData, image: e.target.value })
                            setImagePreview(e.target.value)
                          }}
                          className="w-full px-3 py-2 rounded-lg border border-[#D8B36A]/50 text-xs focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                        />
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5EBDD] hover:bg-[#D8B36A]/30 text-xs text-[#30231F] font-medium cursor-pointer transition-colors border border-[#D8B36A]/40">
                          <UploadCloud size={14} className="text-[#C4933D]" />
                          <span>Upload from Computer</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileUpload}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1.5">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Short description of this category collection..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] focus:ring-1 focus:ring-[#C4933D] bg-[#FFFCF7] resize-none"
                  />
                </div>
              </div>

              {/* Locked Form Buttons Footer */}
              <div className="px-5 sm:px-6 py-3.5 bg-[#FFFCF7] border-t border-[#D8B36A]/30 flex items-center justify-end gap-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-[#786D63] hover:text-[#30231F] hover:bg-[#F5EBDD] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-[#351016] hover:bg-[#45151D] border border-[#C4933D]/40 transition-all shadow-md cursor-pointer"
                >
                  {editingCategory ? 'Update Category' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
