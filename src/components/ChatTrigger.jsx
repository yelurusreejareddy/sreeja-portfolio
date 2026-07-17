import { motion } from 'framer-motion'
import { FiMessageCircle } from 'react-icons/fi'

export default function ChatTrigger({ onClick, className = '' }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`relative inline-flex items-center gap-2 pl-3 pr-4 py-2 rounded-full glass text-sm font-medium text-neutral-700 dark:text-neutral-200 ${className}`}
    >
      <span className="relative flex items-center justify-center w-6 h-6">
        <motion.span
          animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          className="absolute inset-0 rounded-full"
          style={{ background: 'var(--terracotta)' }}
        />
        <motion.span
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative flex items-center justify-center w-6 h-6 rounded-full text-white"
          style={{ background: 'var(--terracotta)' }}
        >
          <FiMessageCircle size={13} />
        </motion.span>
      </span>
      Talk to me
    </motion.button>
  )
}
