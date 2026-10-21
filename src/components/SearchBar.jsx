import { Search, X } from 'lucide-react'

export default function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'Search by name or design ID (e.g. BGL-001)…',
}) {
  return (
    <div className="relative w-full">
      <Search
        size={17}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B68A3A] pointer-events-none"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search jewellery designs"
        className="w-full pl-11 pr-10 py-3 text-sm bg-white border border-[#D4AF6A]/40 rounded-2xl text-[#25211D] placeholder-[#6B6560] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#B68A3A]/30 focus:border-[#B68A3A] transition-all"
      />
      {value && (
        <button
          onClick={onClear}
          aria-label="Clear search"
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B6560] hover:text-[#25211D] p-1 rounded-full hover:bg-[#F0E4D0] transition-colors"
        >
          <X size={15} />
        </button>
      )}
    </div>
  )
}
