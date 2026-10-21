import { MessageCircle } from 'lucide-react'
import { buildWhatsAppUrl } from '../config/siteConfig'
import { siteConfig } from '../config/siteConfig'

export default function WhatsAppButton({ productName, productId, size = 'md', label }) {
  const url = productName && productId
    ? buildWhatsAppUrl(productName, productId)
    : `https://wa.me/${siteConfig.whatsapp}`

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2',
  }

  const iconSize = { sm: 14, md: 16, lg: 18 }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        productName ? `Enquire about ${productName} on WhatsApp` : 'Contact on WhatsApp'
      }
      className={`inline-flex items-center font-medium bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full transition-colors shadow-sm ${sizeClasses[size]}`}
    >
      <MessageCircle size={iconSize[size]} />
      {label ?? (productName ? 'Enquire on WhatsApp' : 'Contact on WhatsApp')}
    </a>
  )
}
