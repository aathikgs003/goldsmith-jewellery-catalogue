import { Link } from 'react-router-dom'
import { siteConfig } from '../config/siteConfig'

export default function BrandLogo({ variant = 'dark', className = '' }) {
  const isLight = variant === 'light'

  return (
    <Link
      to="/"
      className={`flex items-center gap-2 sm:gap-3 group leading-tight ${className}`}
      aria-label={`${siteConfig.name} — Home`}
    >
      {/* Gold Lotus / Floral Emblem */}
      <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Petals */}
          <path
            d="M50 8C52 24 64 36 78 38C64 42 54 54 50 70C46 54 36 42 22 38C36 36 48 24 50 8Z"
            fill="#C4933D"
          />
          {/* Side Floral Radiance */}
          <path
            d="M50 20C55 35 68 44 86 46C70 51 60 62 55 78C50 62 40 51 24 46C42 44 50 35 50 20Z"
            fill="#D8B36A"
            opacity="0.85"
          />
          {/* Center Lotus Flower Petals */}
          <path
            d="M50 35C53 45 60 52 70 55C60 58 53 65 50 75C47 65 40 58 30 55C40 52 47 45 50 35Z"
            fill="#8F6B27"
          />
          {/* Central Gem Core */}
          <circle cx="50" cy="55" r="5" fill="#FFFCF7" />
          <circle cx="50" cy="55" r="2.5" fill="#C4933D" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col min-w-0">
        <span
          className={`text-sm sm:text-base lg:text-xl font-bold tracking-tight leading-tight truncate ${
            isLight ? 'text-white' : 'text-[#30231F] group-hover:text-[#C4933D]'
          } transition-colors`}
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {siteConfig.name}
        </span>
        <span
          className={`text-[8px] sm:text-[9px] tracking-[0.22em] sm:tracking-[0.28em] font-semibold uppercase mt-0.5 ${
            isLight ? 'text-[#D8B36A]' : 'text-[#C4933D]'
          }`}
        >
          Pure Gold Jewellery
        </span>
      </div>
    </Link>
  )
}
