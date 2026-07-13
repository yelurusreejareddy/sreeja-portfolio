import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const SKILLS = [
  'pytorch',
  'langchain + rag',
  'gradio',
  'reinforcement learning',
  'computer vision',
  'scikit-learn',
  'transformers',
]

function TerminalLine({ skill, delay }) {
  const [shown, setShown] = useState(0)
  const text = skill

  useEffect(() => {
    const start = setTimeout(() => {
      const id = setInterval(() => {
        setShown((s) => {
          if (s >= text.length) {
            clearInterval(id)
            return s
          }
          return s + 1
        })
      }, 22)
      return () => clearInterval(id)
    }, delay)
    return () => clearTimeout(start)
  }, [delay, text])

  const done = shown >= text.length

  return (
    <div className="flex items-center gap-3 font-mono text-sm sm:text-base">
      <span className={done ? 'text-emerald-400' : 'text-white/20'}>
        {done ? '[✓]' : '[ ]'}
      </span>
      <span className="text-white/85">{text.slice(0, shown)}</span>
      {!done && <span className="w-2 h-4 bg-white/60 animate-pulse" />}
    </div>
  )
}

export default function TerminalSkills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-2xl mx-auto" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="hud-label mb-6 text-center"
        >
          05 / Stack
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass rounded-2xl overflow-hidden"
        >
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/8">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
            <span className="ml-3 text-xs text-white/40 font-mono">skills.sh</span>
          </div>
          <div className="p-6 space-y-2.5">
            <p className="font-mono text-sm text-white/40 mb-3">$ loading_stack --check</p>
            {inView &&
              SKILLS.map((skill, i) => (
                <TerminalLine key={skill} skill={skill} delay={i * 260} />
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
