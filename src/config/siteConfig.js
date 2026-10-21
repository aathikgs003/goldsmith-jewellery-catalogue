/**
 * Site-wide configuration.
 * Configured with details matching the reference design.
 */

export const siteConfig = {
  // ----- Branding -----
  name: 'Sri Lakshmi Gold Works',
  tagline: 'Timeless Gold. Beautifully Crafted.',
  description:
    'Discover exquisite handcrafted gold jewellery for every occasion. Traditional artistry meets modern elegance.',

  // ----- Contact details -----
  phone: '+91 9344894659',
  whatsapp: '919344894659', // E.164 format without spaces for wa.me links
  email: 'somsekhar779@gmail.com',
  address: 'Ullal Main Road, (Your Location), India',
  mapUrl: 'https://maps.google.com/?q=Ullal+Main+Road',

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
  siteUrl: 'https://srilakshmigoldworks.com',

  // ----- WhatsApp message template -----
  whatsappMessageTemplate:
    'Hello, I am interested in {name} (Design ID: {id}). Please share the price and availability.',
}

/**
 * Build a pre-filled WhatsApp URL for a product enquiry.
 * @param {string} productName
 * @param {string} productId
 */
export function buildWhatsAppUrl(productName, productId) {
  const message = siteConfig.whatsappMessageTemplate
    .replace('{name}', productName)
    .replace('{id}', productId)
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`
}

/**
 * Build a product share URL.
 * @param {string} productId
 */
export function buildProductUrl(productId) {
  return `${window.location.origin}/product/${productId}`
}
