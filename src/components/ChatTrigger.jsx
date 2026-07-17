import { motion } from 'framer-motion'

const SPIRAL_GRADIENT =
  'conic-gradient(from 0deg, var(--terracotta), var(--violet), var(--sea), var(--emerald), var(--terracotta))'

export default function ChatTrigger({ onClick, className = '' }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex items-center gap-6 bg-transparent text-sm font-medium text-neutral-700 dark:text-neutral-200 ${className}`}
    >
      <span className="relative w-9 h-9 shrink-0">
        <span
          className="absolute -inset-2 rounded-full blur-md opacity-40"
          style={{ background: SPIRAL_GRADIENT }}
        />
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full"
          style={{ background: SPIRAL_GRADIENT }}
        />
        <span
          className="absolute inset-0 rounded-full"
          style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.55), transparent 60%)' }}
        />
      </span>
      Curious? Ask me anything
    </motion.button>
  )
}
