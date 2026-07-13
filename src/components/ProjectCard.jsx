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
      style={{ transformStyle: 'preserve-3d' }}
      className="glass  p-6 flex flex-col gap-3 hover:border-white/20 transition-colors cursor-pointer group"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-2xl">{project.emoji}</span>
        <FiExternalLink className="text-white/30 group-hover:text-white/70 transition-colors shrink-0 mt-1" size={16} />
      </div>
      <h3 className="font-display text-lg font-medium text-white">{project.title}</h3>
      <p className="text-sm text-white/55 leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/50 border border-white/8"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
  )
}
