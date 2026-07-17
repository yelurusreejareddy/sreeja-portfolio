import { motion } from 'framer-motion'
import { FiMessageCircle } from 'react-icons/fi'

export default function ChatTrigger({ onClick, className = '' }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`relative inline-flex items-center gap-3 w-full max-w-[280px] pl-3 pr-5 py-2.5 rounded-full glass text-sm font-medium text-neutral-700 dark:text-neutral-200 ${className}`}
    >
      <span className="relative flex items-center justify-center w-7 h-7 shrink-0">
        <motion.span
          animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          className="absolute inset-0 rounded-full"
          style={{ background: 'var(--terracotta)' }}
        />
        <motion.span
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative flex items-center justify-center w-7 h-7 rounded-full text-white"
          style={{ background: 'var(--terracotta)' }}
        >
          <FiMessageCircle size={14} />
        </motion.span>
      </span>
      Curious? Ask me anything
    </motion.button>
  )
}
