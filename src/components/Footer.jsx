import { Link } from 'react-router-dom'
import { MessageCircle, MapPin, Phone, Mail } from 'lucide-react'
import { InstagramIcon, FacebookIcon, YoutubeIcon } from './SocialIcons'
import { siteConfig } from '../config/siteConfig'
import { categories } from '../data/categories'
import BrandLogo from './BrandLogo'

export default function Footer() {
  const waUrl = `https://wa.me/${siteConfig.whatsapp}`

  return (
    <footer className="bg-[#351016] text-[#FFFCF7] border-t border-[#45151D] relative overflow-hidden">
      {/* Subtle Ornamental Mandala Watermark in Footer Corner */}
      <div className="absolute right-0 bottom-0 w-80 h-80 opacity-5 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full stroke-[#C4933D]">
          <circle cx="100" cy="100" r="85" strokeWidth="1" />
          <circle cx="100" cy="100" r="65" strokeWidth="0.8" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="45" strokeWidth="1" />
          <path
            d="M100 15 C125 70 185 100 185 100 C185 100 125 130 100 185 C75 130 15 100 15 100 C15 100 75 70 100 15 Z"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 text-left relative z-10">
        {/* Col 1: Brand & Bio */}
        <div className="space-y-4">
          <BrandLogo variant="light" />

          <p className="text-xs leading-relaxed text-[#F5EBDD]/80 font-light max-w-sm">
            Traditional designs, timeless elegance and exceptional craftsmanship. Explore our wide range of gold jewellery collections.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-2.5 pt-2">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C4933D] text-white flex items-center justify-center transition-colors text-xs"
            >
              <InstagramIcon size={14} />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C4933D] text-white flex items-center justify-center transition-colors text-xs"
            >
              <FacebookIcon size={14} />
            </a>
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C4933D] text-white flex items-center justify-center transition-colors text-xs"
            >
              <YoutubeIcon size={14} />
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4
            className="text-sm font-bold text-white mb-4 tracking-wider uppercase"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Quick Links
          </h4>
          <ul className="space-y-2 text-xs text-[#F5EBDD]/80">
            {[
              { to: '/', label: 'Home' },
              { to: '/collections', label: 'Collections' },
              { to: '/new-arrivals', label: 'New Arrivals' },
              { to: '/about', label: 'About Us' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="hover:text-[#D8B36A] transition-colors inline-block"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Collections */}
        <div>
          <h4
            className="text-sm font-bold text-white mb-4 tracking-wider uppercase"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Collections
          </h4>
          <ul className="space-y-2 text-xs text-[#F5EBDD]/80">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  to={`/collections/${cat.slug}`}
                  className="hover:text-[#D8B36A] transition-colors inline-block"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contact Us & WhatsApp Us Button */}
        <div className="space-y-4">
          <h4
            className="text-sm font-bold text-white mb-4 tracking-wider uppercase"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Contact Us
          </h4>

          <div className="space-y-3 text-xs text-[#F5EBDD]/80">
            <div className="flex items-start gap-2.5">
              <MapPin size={15} className="text-[#C4933D] mt-0.5 flex-shrink-0" />
              <span>{siteConfig.address}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone size={15} className="text-[#C4933D] flex-shrink-0" />
              <a href={`tel:${siteConfig.phone}`} className="hover:text-white transition-colors">
                {siteConfig.phone}
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail size={15} className="text-[#C4933D] flex-shrink-0" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                {siteConfig.email}
              </a>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-[#C4933D] hover:bg-[#B3832F] text-white font-semibold py-2.5 px-4 rounded-full text-xs transition-colors shadow-sm"
            >
              <MessageCircle size={15} />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Copyright Strip */}
      <div className="border-t border-[#45151D] bg-[#280C10] relative z-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#F5EBDD]/60">
          <p>&copy; 2024 {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <Link to="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link to="/contact" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
            <span>|</span>
            <Link to="/admin" className="hover:text-[#D8B36A] transition-colors">
              Admin Portal
            </Link>
            <span>|</span>
            <span>Designed with ❤️</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
