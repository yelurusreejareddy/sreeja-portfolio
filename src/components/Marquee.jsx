import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Ordered roughly by how central each one is to the work she does now, so
// the first things a visitor reads are the ones the recent projects are
// actually built on. The full list lives in the Stack section; this row is
// the short version a visitor takes in at a glance.
const ITEMS = [
  'Python',
  'PyTorch',
  'LLMs',
  'RAG',
  'AI Agents',
  'LangGraph',
  'Vector Databases',
  'Fine-tuning',
  'Transformers',
  'Reinforcement Learning',
  'Computer Vision',
  'FastAPI',
  'AWS',
  'Docker',
  'Next.js',
  'PostgreSQL',
]

// The generative AI skills get the accent colour, since they are what the
// roles she is applying for ask about first.
const ACCENT = new Set(['LLMs', 'RAG', 'AI Agents', 'LangGraph', 'Vector Databases', 'Fine-tuning'])

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
      className={
        ACCENT.has(item)
          ? 'text-xs px-3 py-1.5 rounded-full whitespace-nowrap cursor-default border bg-[var(--terracotta)]/[0.08] text-[var(--terracotta)] border-[var(--terracotta)]/30'
          : 'text-xs px-3 py-1.5 rounded-full bg-black/[0.03] text-neutral-500 border border-black/8 whitespace-nowrap cursor-default dark:bg-white/[0.04] dark:text-neutral-400 dark:border-white/10 hover:text-neutral-900 dark:hover:text-white'
      }
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
      <div className="relative max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
        {ITEMS.map((item, i) => (
          <Word key={item} item={item} index={i} total={ITEMS.length} scrollYProgress={scrollYProgress} />
        ))}
      </div>
    </div>
  )
}
