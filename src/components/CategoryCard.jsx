import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export default function CategoryCard({ category }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="h-full"
    >
      <Link
        to={`/collections/${category.slug}`}
        className="group block h-full bg-white rounded-2xl overflow-hidden border border-[#D8B36A]/40 shadow-xs hover:shadow-lg transition-all duration-300"
        aria-label={`Browse ${category.name} collection`}
      >
        {/* Category Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#FFFCF7]">
          <img
            src={category.image}
            alt={category.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-106"
          />
        </div>

        {/* Card Footer: Category Name, "View Designs →", Solid Antique Gold Circle Button with '>' */}
        <div className="p-3.5 sm:p-4 flex items-center justify-between bg-white border-t border-[#F5EBDD]">
          <div>
            <h3
              className="text-sm sm:text-base font-bold text-[#30231F] group-hover:text-[#C4933D] transition-colors leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {category.name}
            </h3>
            <span className="text-[11px] sm:text-xs text-[#786D63] group-hover:text-[#C4933D] transition-colors inline-block mt-0.5">
              View Designs &rarr;
            </span>
          </div>

          {/* Solid Antique Gold Circle Arrow Button matching reference */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#C4933D] group-hover:bg-[#B3832F] flex items-center justify-center text-white transition-all duration-300 shadow-xs flex-shrink-0 group-hover:scale-105">
            <ChevronRight size={15} />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
