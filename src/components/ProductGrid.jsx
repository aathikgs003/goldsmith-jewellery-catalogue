import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import { useFavourites } from '../hooks/useProducts'
import { Sparkles } from 'lucide-react'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

export default function ProductGrid({
  products,
  onOpenLightbox,
  emptyMessage = 'No jewellery designs found matching your criteria.',
}) {
  const { isFav, toggle } = useFavourites()

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center px-4 bg-white/50 rounded-3xl border border-[#D4AF6A]/20">
        <div className="w-14 h-14 rounded-full bg-[#F0E4D0] flex items-center justify-center text-[#B68A3A] mb-4 shadow-inner">
          <Sparkles size={24} />
        </div>
        <h3
          className="text-xl font-bold text-[#25211D] mb-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {emptyMessage}
        </h3>
        <p className="text-[#6B6560] text-xs max-w-md mt-1">
          Try clearing your search term, resetting filters, or explore our full range of gold bangles, chains, and necklaces.
        </p>
      </div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants}>
          <ProductCard
            product={product}
            onOpenLightbox={onOpenLightbox}
            isFav={isFav(product.id)}
            onToggleFav={toggle}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
