import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

/**
 * Breadcrumb component.
 * @param {Array} crumbs  — [{ label, to? }]  (last item has no `to`)
 */
export default function Breadcrumb({ crumbs }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 flex-wrap text-xs">
        <li>
          <Link
            to="/"
            aria-label="Home"
            className="text-[#6B6560] hover:text-[#B68A3A] transition-colors flex items-center"
          >
            <Home size={14} />
          </Link>
        </li>
        {crumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight size={12} className="text-[#D4AF6A] opacity-60" />
            {crumb.to ? (
              <Link
                to={crumb.to}
                className="text-[#6B6560] hover:text-[#B68A3A] transition-colors"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="text-[#25211D] font-medium" aria-current="page">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
