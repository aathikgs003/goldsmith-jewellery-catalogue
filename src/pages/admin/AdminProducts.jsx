import { useState, useMemo } from 'react'
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  UploadCloud,
  Check,
  Eye,
} from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import { Link } from 'react-router-dom'

export default function AdminProducts() {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useAdmin()

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [selectedStatus, setSelectedStatus] = useState('ALL')

  // Modal / Form state (Screen 6 & 7)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: 'bangles',
    description: '',
    weight: '15.0g',
    purity: '22 KT',
    availability: 'In Stock',
    status: 'Active',
    newArrival: false,
    featured: true,
    images: [''],
  })
  const [imageInputUrl, setImageInputUrl] = useState('')
  const [successToast, setSuccessToast] = useState('')

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        !searchQuery.trim() ||
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchCategory =
        selectedCategory === 'ALL' ||
        p.category?.toLowerCase() === selectedCategory.toLowerCase()

      const matchStatus =
        selectedStatus === 'ALL' ||
        (selectedStatus === 'Active'
          ? (p.status || 'Active') === 'Active'
          : (p.status || 'Active') === 'Inactive')

      return matchSearch && matchCategory && matchStatus
    })
  }, [products, searchQuery, selectedCategory, selectedStatus])

  const openAddForm = () => {
    const nextNum = products.length + 1
    const prefix = 'DSG'
    setEditingProduct(null)
    setFormData({
      id: `${prefix}-${String(nextNum).padStart(3, '0')}`,
      name: '',
      category: categories[0]?.slug || 'bangles',
      description: 'Intricately handcrafted 22KT gold jewellery by master goldsmiths.',
      weight: '16.5g',
      purity: '22 KT',
      availability: 'In Stock',
      status: 'Active',
      newArrival: false,
      featured: true,
      images: [
        'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
      ],
    })
    setImageInputUrl('')
    setIsFormOpen(true)
  }

  const openEditForm = (prod) => {
    setEditingProduct(prod)
    setFormData({
      id: prod.id,
      name: prod.name,
      category: prod.category || 'bangles',
      description: prod.description || '',
      weight: prod.weight || '15.0g',
      purity: prod.purity || '22 KT',
      availability: prod.availability || 'In Stock',
      status: prod.status || 'Active',
      newArrival: !!prod.newArrival,
      featured: prod.featured !== false,
      images: prod.images?.length
        ? [...prod.images]
        : ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'],
    })
    setImageInputUrl('')
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingProduct(null)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          images: [reader.result, ...prev.images.filter((img) => img !== reader.result)],
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const addImageUrl = () => {
    if (imageInputUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageInputUrl.trim()],
      }))
      setImageInputUrl('')
    }
  }

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.id.trim()) return

    const validImages = formData.images.filter(Boolean)
    const finalImages =
      validImages.length > 0
        ? validImages
        : ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80']

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        weight: formData.weight,
        purity: formData.purity,
        availability: formData.availability,
        status: formData.status,
        newArrival: formData.newArrival,
        featured: formData.featured,
        images: finalImages,
      })
      showToast(`Design "${formData.name}" updated successfully`)
    } else {
      addProduct({
        id: formData.id.trim(),
        name: formData.name,
        category: formData.category,
        description: formData.description,
        weight: formData.weight,
        purity: formData.purity,
        availability: formData.availability,
        status: formData.status,
        newArrival: formData.newArrival,
        featured: formData.featured,
        images: finalImages,
      })
      showToast(`Design "${formData.name}" created successfully`)
    }
    closeForm()
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete design "${name}" (${id})?`)) {
      deleteProduct(id)
      showToast(`Design "${name}" deleted`)
    }
  }

  const showToast = (msg) => {
    setSuccessToast(msg)
    setTimeout(() => setSuccessToast(''), 3500)
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#351016] text-[#D8B36A] px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-[#C4933D]/40 animate-fade-in">
          <Check size={18} className="text-[#C4933D]" />
          <span className="text-sm font-medium">{successToast}</span>
        </div>
      )}

      {/* Screen 5: Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold text-[#30231F]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Manage Products / Designs
          </h1>
          <p className="text-xs sm:text-sm text-[#786D63] mt-1">
            Displaying {filteredProducts.length} of {products.length} jewellery designs
          </p>
        </div>

        <button
          onClick={openAddForm}
          className="inline-flex items-center justify-center gap-2 bg-[#351016] hover:bg-[#45151D] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg border border-[#C4933D]/40 self-start sm:self-auto cursor-pointer"
        >
          <Plus size={18} />
          <span>Add New Design</span>
        </button>
      </div>

      {/* Screen 5: Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#D8B36A]/40 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#786D63]"
          />
          <input
            type="text"
            placeholder="Search by design name or ID (e.g. BGL-001)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#D8B36A]/40 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#786D63] hover:text-[#30231F]"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Category Filter */}
          <div className="relative flex-1 sm:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 pr-8 rounded-lg border border-[#D8B36A]/40 text-xs sm:text-sm font-medium text-[#30231F] bg-[#FFFCF7] focus:outline-hidden focus:border-[#C4933D]"
            >
              <option value="ALL">All Categories</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative flex-1 sm:w-36">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#D8B36A]/40 text-xs sm:text-sm font-medium text-[#30231F] bg-[#FFFCF7] focus:outline-hidden focus:border-[#C4933D]"
            >
              <option value="ALL">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Screen 5: Products Table */}
      <div className="bg-white rounded-xl border border-[#D8B36A]/40 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FFFCF7] border-b border-[#D8B36A]/30 text-[11px] font-bold text-[#786D63] uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Image</th>
                <th className="py-3.5 px-4 sm:px-6">Design Name</th>
                <th className="py-3.5 px-4 sm:px-6">Design ID</th>
                <th className="py-3.5 px-4 sm:px-6">Category</th>
                <th className="py-3.5 px-4 sm:px-6">Weight / Purity</th>
                <th className="py-3.5 px-4 sm:px-6">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8B36A]/20 text-sm">
              {filteredProducts.map((prod) => {
                const isActive = (prod.status || 'Active') === 'Active'
                const primaryImg = prod.images?.[0] || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'
                const categoryObj = categories.find(
                  (c) => c.slug.toLowerCase() === prod.category?.toLowerCase()
                )

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
                      {prod.newArrival && (
                        <span className="inline-block text-[10px] uppercase font-bold text-[#C4933D] bg-[#F5EBDD] px-2 py-0.5 rounded-sm border border-[#D8B36A]/30 mt-0.5">
                          New Arrival
                        </span>
                      )}
                    </td>

                    {/* Design ID */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <span className="font-mono text-xs font-semibold px-2 py-1 bg-[#F5EBDD] text-[#30231F] rounded-md border border-[#D8B36A]/30">
                        {prod.id}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <span className="capitalize text-xs font-medium text-[#786D63]">
                        {categoryObj?.name || prod.category}
                      </span>
                    </td>

                    {/* Weight / Purity */}
                    <td className="py-3.5 px-4 sm:px-6 text-xs text-[#786D63]">
                      <span>{prod.weight || '15g'}</span> • <span className="text-[#C4933D] font-medium">{prod.purity || '22 KT'}</span>
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
                        <Link
                          to={`/product/${prod.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-[#786D63] hover:text-[#C4933D] hover:bg-[#F5EBDD] transition-colors"
                          title="View on Store"
                        >
                          <Eye size={16} />
                        </Link>
                        <button
                          onClick={() => openEditForm(prod)}
                          className="p-1.5 rounded-lg text-[#786D63] hover:text-[#C4933D] hover:bg-[#F5EBDD] transition-colors cursor-pointer"
                          title="Edit Design"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(prod.id, prod.name)}
                          className="p-1.5 rounded-lg text-[#786D63] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete Design"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#786D63]">
                    No designs match your filters. Try clearing the search or category filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Screen 6 & 7: Add / Edit Design Modal Dialog */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-[#30231F]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-hidden">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] sm:max-h-[90vh] shadow-2xl border border-[#D8B36A]/50 flex flex-col overflow-hidden animate-scale-up">
            {/* Locked Modal Header */}
            <div className="px-5 sm:px-6 py-3.5 bg-[#FFFCF7] border-b border-[#D8B36A]/30 flex items-center justify-between flex-shrink-0">
              <div>
                <h2
                  className="text-lg font-bold text-[#30231F]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {editingProduct ? `Edit Design — ${editingProduct.id}` : 'Add New Design'}
                </h2>
                <p className="text-xs text-[#786D63]">
                  Fill in design details, specifications, and jewellery photos
                </p>
              </div>
              <button
                type="button"
                onClick={closeForm}
                className="p-1.5 rounded-lg text-[#786D63] hover:text-[#30231F] hover:bg-[#F5EBDD] transition-colors cursor-pointer"
                aria-label="Close form"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form with Scrollable Body and Locked Footer */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden min-h-0">
              {/* Scrollable Form Body */}
              <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* ─── LEFT COLUMN: Design Details ─── */}
                  <div className="space-y-3.5">
                    <h3 className="text-xs font-bold text-[#C4933D] uppercase tracking-wider pb-1 border-b border-[#D8B36A]/30">
                      Design Specifications
                    </h3>

                    {/* Design Name */}
                    <div>
                      <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                        Design Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Traditional Temple Peacock Bangle"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                      />
                    </div>

                    {/* Design ID & Category */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                          Design ID <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          disabled={!!editingProduct}
                          placeholder="e.g. BGL-005"
                          value={formData.id}
                          onChange={(e) => setFormData({ ...formData, id: e.target.value.toUpperCase() })}
                          className="w-full px-3.5 py-2 rounded-lg border border-[#D8B36A]/50 text-sm font-mono focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7] disabled:bg-zinc-100"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                          Category <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-lg border border-[#D8B36A]/50 text-sm capitalize focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                        >
                          {categories.map((c) => (
                            <option key={c.slug} value={c.slug}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Purity & Weight */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                          Gold Purity
                        </label>
                        <select
                          value={formData.purity}
                          onChange={(e) => setFormData({ ...formData, purity: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                        >
                          <option value="22 KT">22 KT (916 BIS Hallmarked)</option>
                          <option value="24 KT">24 KT (Pure Gold)</option>
                          <option value="18 KT">18 KT (Gold)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                          Approx Weight
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 18.5g"
                          value={formData.weight}
                          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                        />
                      </div>
                    </div>

                    {/* Status & Availability */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                          Status
                        </label>
                        <select
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                        >
                          <option value="Active">Active (Visible)</option>
                          <option value="Inactive">Inactive (Hidden)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                          Availability
                        </label>
                        <select
                          value={formData.availability}
                          onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                        >
                          <option value="In Stock">In Stock</option>
                          <option value="Made to Order">Made to Order</option>
                        </select>
                      </div>
                    </div>

                    {/* Highlights Checkboxes */}
                    <div className="pt-1 flex flex-col gap-2 bg-[#FFFCF7] p-2.5 rounded-xl border border-[#D8B36A]/30">
                      <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#30231F]">
                        <input
                          type="checkbox"
                          checked={formData.newArrival}
                          onChange={(e) => setFormData({ ...formData, newArrival: e.target.checked })}
                          className="rounded text-[#C4933D] focus:ring-[#C4933D] w-4 h-4"
                        />
                        <span>Mark as <strong>New Arrival</strong></span>
                      </label>

                      <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#30231F]">
                        <input
                          type="checkbox"
                          checked={formData.featured}
                          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                          className="rounded text-[#C4933D] focus:ring-[#C4933D] w-4 h-4"
                        />
                        <span>Featured in <strong>Popular Showcase</strong></span>
                      </label>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs font-semibold text-[#30231F] uppercase tracking-wider mb-1">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Details about craftsmanship, motifs, and finish..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg border border-[#D8B36A]/50 text-sm focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7] resize-none"
                      />
                    </div>
                  </div>

                  {/* ─── RIGHT COLUMN: Image Upload & Preview ─── */}
                  <div className="space-y-3.5">
                    <h3 className="text-xs font-bold text-[#C4933D] uppercase tracking-wider pb-1 border-b border-[#D8B36A]/30">
                      Jewellery Photos
                    </h3>

                    {/* Primary Image Preview (Compact fitted height) */}
                    <div className="w-full h-48 sm:h-52 rounded-xl overflow-hidden bg-[#F5EBDD] border border-[#D8B36A]/40 relative group flex items-center justify-center">
                      {formData.images?.[0] ? (
                        <img
                          src={formData.images[0]}
                          alt="Primary Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-4 text-[#786D63]">
                          <UploadCloud size={28} className="mx-auto mb-1 text-[#C4933D]" />
                          <p className="text-xs">No primary image selected</p>
                        </div>
                      )}
                      <span className="absolute bottom-2 left-2 bg-[#30231F]/80 text-[#D8B36A] text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-xs">
                        Primary Display Photo
                      </span>
                    </div>

                    {/* Image Thumbnails Strip */}
                    {formData.images?.length > 0 && (
                      <div className="flex items-center gap-2 overflow-x-auto pb-1">
                        {formData.images.map((img, idx) => (
                          <div
                            key={idx}
                            className="relative w-14 h-14 rounded-lg overflow-hidden border border-[#D8B36A]/50 flex-shrink-0 group"
                          >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="absolute top-1 right-1 p-0.5 rounded-full bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Remove photo"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Upload Controls */}
                    <div className="space-y-2 pt-1">
                      <label className="inline-flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-[#F5EBDD] hover:bg-[#D8B36A]/30 text-xs text-[#30231F] font-semibold cursor-pointer transition-colors border border-[#D8B36A]/40">
                        <UploadCloud size={15} className="text-[#C4933D]" />
                        <span>Upload Photo from Computer</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                      </label>

                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="Or paste image URL (https://...)"
                          value={imageInputUrl}
                          onChange={(e) => setImageInputUrl(e.target.value)}
                          className="flex-1 px-3 py-1.5 rounded-lg border border-[#D8B36A]/50 text-xs focus:outline-hidden focus:border-[#C4933D] bg-[#FFFCF7]"
                        />
                        <button
                          type="button"
                          onClick={addImageUrl}
                          className="px-3 py-1.5 rounded-lg bg-[#30231F] hover:bg-[#45151D] text-white text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Add URL
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Locked Form Actions Footer */}
              <div className="px-5 sm:px-6 py-3.5 bg-[#FFFCF7] border-t border-[#D8B36A]/30 flex items-center justify-end gap-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-[#786D63] hover:text-[#30231F] hover:bg-[#F5EBDD] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg text-sm font-semibold text-white bg-[#351016] hover:bg-[#45151D] border border-[#C4933D]/40 transition-all shadow-md cursor-pointer"
                >
                  {editingProduct ? 'Update Design' : 'Save Design'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
