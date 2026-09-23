import { PAGE_VISIBLE } from '../lib/motionSafe'
import { motion } from 'framer-motion'
import { FiAward, FiBookOpen, FiStar, FiZap } from 'react-icons/fi'

const achievements = [
  { icon: FiZap, title: '4+ years of work experience', detail: 'Accenture, DePaul, and internships', color: 'var(--terracotta)' },
  { icon: FiStar, title: '4.0 GPA, M.S. in AI', detail: 'Presidential Scholarship, DePaul University', color: 'var(--sea)' },
  { icon: FiBookOpen, title: 'Published paper', detail: 'IJRASET, 2021', color: 'var(--emerald)' },
  { icon: FiAward, title: '10 projects deployed as demos', detail: 'Live on Hugging Face', color: 'var(--violet)' },
]

export default function About() {
  return (
    // overflow-x-clip: the highlight cards slide in from 32px to the right,
    // which on a phone let the page scroll sideways until they arrived.
    <section id="about" className="relative py-28 px-6 overflow-x-clip">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={PAGE_VISIBLE ? { opacity: 0, y: 16 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hud-label mb-3"
        >
          About
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <motion.div
            initial={PAGE_VISIBLE ? { opacity: 0, y: 24 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-medium leading-tight mb-6">
              From enterprise software to
              <span className="gradient-text"> AI research</span>
            </h2>
            <div className="space-y-4 text-neutral-600 leading-relaxed dark:text-neutral-300">
              <p>
                I started my career at Accenture, where I spent close to three
                years building and optimizing systems that real businesses
                depended on every day. That is where I learned how production
                software actually works: deadlines, reviews, and code other
                people rely on. Along the way I kept getting drawn to machine
                learning, and I wanted to learn it properly, so I moved to the
                US for a Master's in Artificial Intelligence at DePaul
                University. I finished with a 4.0 GPA on a Presidential
                Scholarship.
              </p>
              <p>
                During the program I started research in computational
                topology, which I still do today as a Research Assistant. I
                also like my work to be something people can actually use,
                like WanderWear, a live app I built where you can plan a trip
                and get outfits styled from your own wardrobe. My other
                projects are online as small interactive demos instead of
                sitting in notebooks.
              </p>
              <p>
                Now I'm looking for my next role as an AI/ML Engineer or
                Data Scientist, somewhere I can bring both sides together:
                the engineering habits from my Accenture years and the ML
                depth from my Master's.
              </p>
            </div>
          </motion.div>

          <div className="lg:col-span-2">
            <motion.p
              initial={PAGE_VISIBLE ? { opacity: 0 } : false}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="hud-label mb-4"
              style={{ fontSize: '12px', fontWeight: 400 }}
            >
              Highlights
            </motion.p>
            <div className="space-y-3">
              {achievements.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={PAGE_VISIBLE ? { opacity: 0, x: 32 } : false}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.22 }}
                  className="glass p-4 flex items-start gap-3"
                >
                  <item.icon size={18} className="shrink-0 mt-0.5" style={{ color: item.color }} />
                  <div>
                    <p className="font-medium text-sm text-neutral-900 dark:text-neutral-50">{item.title}</p>
                    <p className="text-xs text-neutral-500 mt-0.5 dark:text-neutral-400">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
