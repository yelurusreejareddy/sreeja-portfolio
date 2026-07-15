import { PAGE_VISIBLE } from '../lib/motionSafe'
import { motion } from 'framer-motion'
import { FiLock } from 'react-icons/fi'

const topics = ['Topological Data Analysis', 'Persistent Homology', 'GUDHI', 'Linear Algebra', 'Python']

export default function Research() {
  return (
    <section id="research" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={PAGE_VISIBLE ? { opacity: 0, y: 16 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hud-label mb-3"
        >
          Research
        </motion.p>

        <motion.div
          initial={PAGE_VISIBLE ? { opacity: 0, y: 24 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass p-8 sm:p-12 relative overflow-hidden"
        >
          <div className="blob blob-2 w-[300px] h-[300px] top-[-30%] right-[-10%] opacity-25" style={{ background: 'var(--sea)' }} />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="font-display text-2xl sm:text-3xl font-medium">
                Harmonic persistence barcodes for machine learning
              </h2>
            </div>
            <p className="text-neutral-500 text-sm mb-6 dark:text-neutral-400">
              Graduate Research Assistant, DePaul University | Sep 2025 to present
            </p>

            <div className="space-y-4 text-neutral-600 leading-relaxed max-w-3xl dark:text-neutral-300">
              <p>
                My research sits at the intersection of topology and machine
                learning. Topological data analysis studies the shape of data:
                loops, voids, and connected components that survive across
                scales. I work on harmonic persistence barcodes, a way of
                enriching these topological signatures with geometric
                information carried by harmonic chains.
              </p>
              <p>
                Concretely, I implement matrix-based algorithms in Python that
                turn mathematical specifications into clean, tested code,
                and I run experiments comparing these enriched barcodes
                against traditional persistence features on shape
                classification tasks. Early results are promising, and a
                publication is in preparation.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-8">
              {topics.map((topic) => (
                <span
                  key={topic}
                  className="text-xs px-3 py-1.5 rounded-full bg-black/[0.03] text-neutral-500 border border-black/8 dark:bg-white/[0.04] dark:text-neutral-400 dark:border-white/10"
                >
                  {topic}
                </span>
              ))}
            </div>

            <p className="flex items-center gap-2 mt-8 text-sm text-neutral-400 dark:text-neutral-500">
              <FiLock size={14} />
              Code private while the work is under way. Happy to talk about it in detail.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
