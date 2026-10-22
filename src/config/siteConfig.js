/**
 * Site-wide configuration.
 * Configured with details matching the reference design.
 */

export const siteConfig = {
  // ----- Branding -----
  name: 'Lakshmanan Gold Works',
  owner: 'T.L.Suriyanathan',
  tagline: 'Timeless Gold. Beautifully Crafted.',
  description:
    'Discover exquisite handcrafted gold jewellery for every occasion. Traditional artistry meets modern elegance.',

  // ----- Contact details -----
  phone: '+91 94863 37947',
  phone2: '+91 99945 41091',
  whatsapp: '9486337947',
  email: 'surinathan770@gmail.com',
  address: 'Kadayam - Pavoorchatram Road, Avudayanoor, Tenkasi, Tamil Nadu 627415',
  mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=8.883108247201784,77.38855234125623',

  // ----- Business hours -----
  hours: [
    { days: 'Mon - Sat', time: '9:30 AM - 9:00 PM' },
    { days: 'Sunday', time: '10:00 AM - 1:00 PM' },
  ],

  // ----- Social links -----
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
  },

  // ----- SEO / Meta -----
  siteUrl: 'https://lakshmanangoldworks.com',
}

/**
 * Build a WhatsApp chat URL for enquiry.
 */
export function buildWhatsAppUrl() {
  return `https://wa.me/${siteConfig.whatsapp}`
}

/**
 * Build a product share URL.
 * @param {string} productId
 */
export function buildProductUrl(productId) {
  return `${window.location.origin}/product/${productId}`
}
