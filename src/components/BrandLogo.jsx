import { Link } from 'react-router-dom'
import { siteConfig } from '../config/siteConfig'

export default function BrandLogo({ variant = 'dark', className = '' }) {
  const isLight = variant === 'light'

  return (
    <Link
      to="/"
      className={`inline-flex items-center group leading-tight ${className}`}
      aria-label={`${siteConfig.name} — Home`}
    >
      <img
        src="/brand-logo.png"
        alt={siteConfig.name}
        className="h-10 sm:h-12 lg:h-14 w-auto max-w-[200px] sm:max-w-[260px] object-contain transition-transform duration-200 group-hover:scale-[1.02]"
        style={{
          mixBlendMode: isLight ? 'normal' : 'multiply',
        }}
      />
    </Link>
  )
}
