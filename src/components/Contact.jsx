import { PAGE_VISIBLE } from '../lib/motionSafe'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { SiHuggingface } from 'react-icons/si'

const links = [
  {
    label: 'Email',
    href: 'mailto:yeluru.sreeja@gmail.com',
    icon: FiMail,
    handle: 'yeluru.sreeja@gmail.com',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/yelurusreejareddy',
    icon: FiGithub,
    handle: 'yelurusreejareddy',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sreeja-reddy-yeluru',
    icon: FiLinkedin,
    handle: 'sreeja-reddy-yeluru',
  },
  {
    label: 'Hugging Face',
    href: 'https://huggingface.co/Sreeja-reddy',
    icon: SiHuggingface,
    handle: 'Sreeja-reddy',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 px-6 overflow-hidden">
      <div className="blob blob-1 w-[400px] h-[400px] bottom-[-20%] left-[10%] opacity-30" style={{ background: 'var(--terracotta)' }} />
      <div className="blob blob-3 w-[350px] h-[350px] bottom-[-10%] right-[10%] opacity-25" style={{ background: 'var(--sea)' }} />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.p
          initial={PAGE_VISIBLE ? { opacity: 0, y: 16 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hud-label mb-4"
        >
          06 / Contact
        </motion.p>

        <motion.h2
          initial={PAGE_VISIBLE ? { opacity: 0, y: 20 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl sm:text-5xl font-medium leading-tight mb-6"
        >
          Let's build something
          <span className="gradient-text"> intelligent</span>
        </motion.h2>

        <motion.p
          initial={PAGE_VISIBLE ? { opacity: 0, y: 20 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-neutral-600 max-w-xl mx-auto mb-12 dark:text-neutral-300"
        >
          I'm actively looking for AI and ML engineering roles. If you're
          hiring, or just want to talk about RAG, reinforcement learning, or
          topology, my inbox is open.
        </motion.p>

        <motion.div
          initial={PAGE_VISIBLE ? { opacity: 0, y: 20 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              className="glass p-5 flex items-center gap-4 hover:border-black/15 hover:scale-[1.02] transition-all group text-left dark:hover:border-white/15"
            >
              <link.icon size={22} className="shrink-0" style={{ color: 'var(--terracotta)' }} />
              <div className="min-w-0">
                <p className="font-medium text-sm">{link.label}</p>
                <p className="text-neutral-500 text-xs truncate dark:text-neutral-400">{link.handle}</p>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
