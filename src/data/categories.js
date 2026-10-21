/**
 * Category definitions.
 * All image URLs verified 200 OK and category-appropriate.
 */

export const categories = [
  {
    id: 'bangles',
    slug: 'bangles',
    name: 'Bangles',
    description:
      'Classic and contemporary gold bangles — from delicate everyday singles to ornate kadas crafted for every wrist.',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
    featured: true,
  },
  {
    id: 'rings',
    slug: 'rings',
    name: 'Rings',
    description:
      'Elegant gold rings — from classic polished bands to intricately designed stone and temple statement rings.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
    featured: true,
  },
  {
    id: 'chains',
    slug: 'chains',
    name: 'Chains',
    description:
      'Masterfully linked gold chains — rope, box, curb, and traditional South Indian motifs.',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80',
    featured: true,
  },
  {
    id: 'necklaces',
    slug: 'necklaces',
    name: 'Necklaces',
    description:
      'Stunning handcrafted gold necklaces — from subtle lightweight chains to majestic temple chokers and harams.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
    featured: true,
  },
  {
    id: 'earrings',
    slug: 'earrings',
    name: 'Earrings',
    description:
      'Dazzling gold jhumkas, chandbalis, studs, and drops crafted with timeless precision.',
    image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=800&q=80',
    featured: true,
  },
  {
    id: 'bridal',
    slug: 'bridal',
    name: 'Bridal Jewellery',
    description:
      'Exquisite bridal sets crafted to celebrate your wedding day — necklaces, vanki, maang tikka, and bangles.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
    featured: true,
  },
  {
    id: 'children',
    slug: 'children',
    name: "Children's Jewellery",
    description:
      'Delicate, smooth-edged, lightweight gold jewellery designed especially with gentle care for infants and children.',
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80',
    featured: false,
  },
  {
    id: 'custom',
    slug: 'custom',
    name: 'Custom Designs',
    description:
      'Bring your design ideas to life. Our master goldsmith crafts bespoke gold jewellery to your exact specifications.',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80',
    featured: false,
  },
]

/** Get a single category by slug */
export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug) || null
}
