export default function SectionOrnament({ className = '' }) {
  return (
    <div className={`inline-flex items-center gap-2 text-[#C4933D] ${className}`}>
      <span className="w-8 sm:w-12 h-px bg-[#C4933D]/60" />
      <span className="w-1.5 h-1.5 rotate-45 border border-[#C4933D] bg-[#C4933D]" />
      <span className="w-8 sm:w-12 h-px bg-[#C4933D]/60" />
    </div>
  )
}
