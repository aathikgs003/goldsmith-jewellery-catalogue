import { siteConfig } from '../config/siteConfig'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[#45151D] bg-[#280C10] text-[#FFFCF7] relative z-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-5 sm:py-6 text-center">
        <p className="text-xs sm:text-sm text-[#F5EBDD]/75 tracking-wide">
          &copy; {currentYear} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
