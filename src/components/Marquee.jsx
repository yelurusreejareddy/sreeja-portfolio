import { motion } from 'framer-motion'

const ITEMS = [
  'PyTorch',
  'LangChain',
  'Transformers',
  'Reinforcement Learning',
  'RAG',
  'Computer Vision',
  'scikit-learn',
  'GUDHI',
  'Gradio',
  'Chroma',
  'NumPy',
  'OpenCV',
  'SQL',
  'Python',
]

export default function Marquee() {
  return (
    <div className="py-10 px-6 select-none">
      <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
        {ITEMS.map((item) => (
          <motion.span
            key={item}
            whileHover={{ scale: 1.22 }}
            transition={{ type: 'spring', stiffness: 350, damping: 12 }}
            className="text-xs px-3 py-1.5 rounded-full bg-black/[0.03] text-neutral-500 border border-black/8 whitespace-nowrap cursor-default dark:bg-white/[0.04] dark:text-neutral-400 dark:border-white/10 hover:text-neutral-900 dark:hover:text-white"
          >
            {item}
          </motion.span>
        ))}
      </div>
    </div>
  )
}
