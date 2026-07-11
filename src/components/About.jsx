import { motion } from 'framer-motion'

const stats = [
  { value: '4+', label: 'Years of work experience' },
  { value: '4.0', label: 'GPA, M.S. in AI' },
  { value: '10', label: 'Projects deployed as demos' },
  { value: '1', label: 'Published paper' },
]

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-sm uppercase tracking-[0.3em] text-white/40 mb-3"
        >
          <span className="text-purple-400/70 font-mono mr-2">01</span> About
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-medium leading-tight mb-6">
              From enterprise software to
              <span className="gradient-text"> AI research</span>
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
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
                During the program I became a Graduate Research Assistant in
                computational topology, which I still do today. I also like my
                work to be something people can actually use, so I put my
                course projects online as small interactive demos instead of
                leaving them in notebooks.
              </p>
              <p>
                Now I'm looking for an AI or ML engineering role where I can
                bring both sides together: the engineering habits from my
                Accenture years and the ML depth from my Master's.
              </p>
            </div>
          </motion.div>

          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass rounded-2xl p-5"
              >
                <p className="font-display text-3xl font-medium gradient-text mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-white/50">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
