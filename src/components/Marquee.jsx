import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

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

function Word({ item, index, total, scrollYProgress }) {
  const center = index / (total - 1)
  const scale = useTransform(
    scrollYProgress,
    [Math.max(0, center - 0.18), center, Math.min(1, center + 0.18)],
    [1, 1.3, 1]
  )

  return (
    <motion.span
      style={{ scale }}
      whileHover={{ scale: 1.22 }}
      transition={{ type: 'spring', stiffness: 350, damping: 12 }}
      className="text-xs px-3 py-1.5 rounded-full bg-black/[0.03] text-neutral-500 border border-black/8 whitespace-nowrap cursor-default dark:bg-white/[0.04] dark:text-neutral-400 dark:border-white/10 hover:text-neutral-900 dark:hover:text-white"
    >
      {item}
    </motion.span>
  )
}

export default function Marquee() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.1'] })

  return (
    <div ref={ref} className="relative py-10 px-6 select-none">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 opacity-[0.08]"
        style={{ background: 'linear-gradient(180deg, transparent, var(--sea))' }}
      />
      <div className="relative max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
        {ITEMS.map((item, i) => (
          <Word key={item} item={item} index={i} total={ITEMS.length} scrollYProgress={scrollYProgress} />
        ))}
      </div>
    </div>
  )
}
