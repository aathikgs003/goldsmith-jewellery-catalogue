import { Link } from 'react-router-dom'
import { siteConfig } from '../config/siteConfig'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[#45151D] bg-[#280C10] text-[#FFFCF7] relative z-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#F5EBDD]/70">
        <p>&copy; {currentYear} {siteConfig.name}. All rights reserved.</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/contact" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <span className="text-[#F5EBDD]/30">|</span>
          <Link to="/contact" className="hover:text-white transition-colors">
            Terms &amp; Conditions
          </Link>
          <span className="text-[#F5EBDD]/30">|</span>
          <Link to="/admin" className="hover:text-[#D8B36A] transition-colors font-medium">
            Admin Portal
          </Link>
          <span className="text-[#F5EBDD]/30">|</span>
          <span>Designed with ❤️</span>
        </div>
      </div>
    </footer>
  )
}
