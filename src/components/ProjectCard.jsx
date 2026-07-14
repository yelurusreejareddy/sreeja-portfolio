import { useRef, useState } from 'react'
import { PAGE_VISIBLE } from '../lib/motionSafe'
import { motion } from 'framer-motion'
import { FiExternalLink } from 'react-icons/fi'

export default function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setRotate({ x: py * -8, y: px * 10 })
  }

  function handleMouseLeave() {
    setRotate({ x: 0, y: 0 })
  }

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={PAGE_VISIBLE ? { opacity: 0, y: 40 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      className="glass p-6 flex flex-col gap-3 hover:border-black/12 transition-colors cursor-pointer group dark:hover:border-white/15"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-2xl">{project.emoji}</span>
        <FiExternalLink className="text-neutral-400 group-hover:text-neutral-600 transition-colors shrink-0 mt-1 dark:text-neutral-500 dark:group-hover:text-neutral-300" size={16} />
      </div>
      <h3 className="font-display text-lg font-medium text-neutral-900 dark:text-neutral-50">{project.title}</h3>
      <p className="text-sm text-neutral-600 leading-relaxed dark:text-neutral-300">{project.description}</p>
      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-full bg-black/[0.03] text-neutral-500 border border-black/8 dark:bg-white/[0.04] dark:text-neutral-400 dark:border-white/10"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
  )
}
