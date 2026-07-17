import { motion } from 'framer-motion'

const SPIRAL_GRADIENT =
  'conic-gradient(from 0deg, var(--terracotta), var(--violet), var(--sea), var(--emerald), var(--terracotta))'

export default function ChatTrigger({ onClick, className = '' }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex items-center gap-6 bg-transparent text-base font-medium text-neutral-700 dark:text-neutral-200 ${className}`}
    >
      <span className="relative w-9 h-9 shrink-0">
        <motion.span
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{
            rotate: { duration: 5, repeat: Infinity, ease: 'linear' },
            scale: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute inset-0 rounded-full"
          style={{ background: SPIRAL_GRADIENT, opacity: 0.8, filter: 'blur(1.5px)' }}
        />
        <span
          className="absolute inset-0 rounded-full"
          style={{ background: 'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.6), transparent 55%)' }}
        />
      </span>
      <span className="bg-transparent">Curious? Ask me anything</span>
    </motion.button>
  )
}
