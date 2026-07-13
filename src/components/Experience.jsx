import { PAGE_VISIBLE } from '../lib/motionSafe'
import { motion } from 'framer-motion'

const roles = [
  {
    title: 'Graduate Research Assistant',
    org: 'DePaul University',
    period: 'Sep 2025 to Present',
    location: 'Chicago, IL',
    points: [
      'Implementing matrix-based harmonic persistence barcode algorithms in Python for topological data analysis research.',
      'Translating mathematical specifications into clean, tested, documented code and running comparison experiments.',
    ],
  },
  {
    title: 'Application Development Analyst',
    org: 'Accenture',
    period: 'Oct 2021 to Aug 2024',
    location: 'Bangalore, India',
    points: [
      'Built and maintained backend batch systems and optimized SQL, improving API response times by 60%.',
      'Reduced recurring support tickets by 20% through root-cause fixes and process improvements.',
    ],
  },
  {
    title: 'Web Developer Intern',
    org: 'ClearExam',
    period: 'Nov 2020 to Jan 2021',
    location: 'Remote',
    points: [
      'Built responsive websites for an ed-tech platform, reducing bounce rate by 30%.',
    ],
  },
  {
    title: 'Data Science Intern',
    org: 'Verzeo',
    period: 'Aug to Nov 2020',
    location: 'Remote',
    points: [
      'Trained a Random Forest classifier reaching 85% accuracy and built exploratory analysis and BI dashboards.',
    ],
  },
]

const education = [
  {
    degree: 'M.S. Artificial Intelligence',
    school: 'DePaul University',
    detail: '4.0 GPA | Presidential Scholarship | June 2026',
  },
  {
    degree: 'B.E. Computer Science',
    school: 'MVJ College of Engineering',
    detail: 'CGPA 8.71',
  },
]

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={PAGE_VISIBLE ? { opacity: 0, y: 16 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hud-label mb-3"
        >
          04 / Experience
        </motion.p>
        <motion.h2
          initial={PAGE_VISIBLE ? { opacity: 0, y: 16 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-3xl sm:text-4xl font-medium mb-14"
        >
          Where I've worked
        </motion.h2>

        <div className="relative border-l border-white/10 ml-2 space-y-12">
          {roles.map((role, i) => (
            <motion.div
              key={role.title + role.org}
              initial={PAGE_VISIBLE ? { opacity: 0, x: -16 } : false}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative pl-8"
            >
              <span className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                <h3 className="font-display text-xl font-medium">{role.title}</h3>
                <span className="text-amber-300/80 text-sm">{role.org}</span>
              </div>
              <p className="text-sm text-white/40 mb-3">
                {role.period} | {role.location}
              </p>
              <ul className="space-y-2">
                {role.points.map((point) => (
                  <li key={point} className="text-white/60 text-sm leading-relaxed flex gap-2">
                    <span className="text-amber-400/70 shrink-0 mt-0.5">-</span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={PAGE_VISIBLE ? { opacity: 0, y: 24 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-16"
        >
          {education.map((edu) => (
            <div key={edu.degree} className="glass  p-6">
              <h3 className="font-display font-medium mb-1">{edu.degree}</h3>
              <p className="text-sm text-white/60">{edu.school}</p>
              <p className="text-sm text-white/40 mt-2">{edu.detail}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={PAGE_VISIBLE ? { opacity: 0, y: 24 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass  p-6 mt-4 border-amber-400/30"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-amber-300/80 mb-2">
            Publication
          </p>
          <h3 className="font-display font-medium mb-1">
            House Price Prediction Using Machine Learning
          </h3>
          <p className="text-sm text-white/50">
            International Journal for Research in Applied Science and
            Engineering Technology (IJRASET), Aug 2021
          </p>
          <p className="text-sm text-white/40 mt-2">
            My first published work, from before graduate school. Random
            Forest and linear regression applied to housing data.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
