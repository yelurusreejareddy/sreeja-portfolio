import { motion } from 'framer-motion'
import { FiMessageCircle } from 'react-icons/fi'

const SPIRAL_GRADIENT =
  'conic-gradient(from 0deg, var(--terracotta), var(--violet), var(--sea), var(--emerald), var(--terracotta))'

const RING_MASK = {
  WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))',
  mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))',
}

export default function ChatTrigger({ onClick, className = '' }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex items-center gap-6 bg-transparent text-sm font-medium text-neutral-700 dark:text-neutral-200 ${className}`}
    >
      <span className="relative w-9 h-9 shrink-0 flex items-center justify-center">
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full"
          style={{ background: SPIRAL_GRADIENT, ...RING_MASK }}
        />
        <FiMessageCircle size={14} className="relative text-neutral-500 dark:text-neutral-300" />
      </span>
      Curious? Ask me anything
    </motion.button>
  )
}
