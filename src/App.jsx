import { useRef, useState } from 'react'
import { PAGE_VISIBLE } from './lib/motionSafe'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiExternalLink } from 'react-icons/fi'
import CursorGlow from './components/CursorGlow'
import Marquee from './components/Marquee'
import Typewriter from './components/Typewriter'
import Magnetic from './components/Magnetic'
import About from './components/About'
import Research from './components/Research'
import TerminalSkills from './components/TerminalSkills'
import ProjectCard from './components/ProjectCard'
import Experience from './components/Experience'
import Contact from './components/Contact'
import ThemeToggle from './components/ThemeToggle'
import { projects } from './data/projects'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

function Navbar() {
  return (
    <motion.nav
      initial={PAGE_VISIBLE ? { opacity: 0, y: -16 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass rounded-full px-6 py-3 flex items-center gap-6"
    >
      <a href="#" className="font-mono text-sm font-medium" style={{ color: "var(--gold)" }}>SRY</a>
      <div className="hidden md:flex items-center gap-5 text-sm text-neutral-600 dark:text-neutral-300">
        <a href="#about" className="hover:text-neutral-900 transition-colors dark:hover:text-white">About</a>
        <a href="#research" className="hover:text-neutral-900 transition-colors dark:hover:text-white">Research</a>
        <a href="#projects" className="hover:text-neutral-900 transition-colors dark:hover:text-white">Projects</a>
        <a href="#experience" className="hover:text-neutral-900 transition-colors dark:hover:text-white">Experience</a>
        <a href="#contact" className="hover:text-neutral-900 transition-colors dark:hover:text-white">Contact</a>
      </div>
      <ThemeToggle />
      <a
        href="/resume.pdf"
        className="text-sm px-4 py-1.5 rounded-full bg-amber-400 text-black font-medium hover:bg-amber-300 transition-colors"
      >
        Resume
      </a>
    </motion.nav>
  )
}

function Hero() {
  const heroRef = useRef(null)
  const [photoOk, setPhotoOk] = useState(true)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-28 pb-16">
      <div className="absolute inset-0 grid-bg" />
      <div className="blob blob-1 w-[420px] h-[420px] bg-amber-500 top-[-10%] left-[-5%] opacity-15" />
      <div className="blob blob-2 w-[380px] h-[380px] bg-teal-500 bottom-[-10%] right-[-5%] opacity-15" />

      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 max-w-5xl w-full grid grid-cols-1 lg:grid-cols-5 gap-14 items-center"
      >
        <div className="lg:col-span-3 text-center lg:text-left">
          <motion.div
            variants={fadeUp}
            initial={PAGE_VISIBLE ? "hidden" : false}
            animate="show"
            custom={0}
            className="inline-flex items-center gap-2.5 glass rounded-full px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-neutral-600 dark:text-neutral-300">Open to AI/ML engineering roles</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial={PAGE_VISIBLE ? "hidden" : false}
            animate="show"
            custom={0.1}
            className="font-display text-5xl sm:text-6xl xl:text-7xl font-medium leading-[1.05] mb-6"
          >
            Sreeja
            <br />
            Reddy <span className="gradient-text">Yeluru</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial={PAGE_VISIBLE ? "hidden" : false}
            animate="show"
            custom={0.15}
            className="font-display text-xl sm:text-2xl text-neutral-800 min-h-16 mb-6 dark:text-neutral-100"
          >
            <Typewriter
              phrases={[
                'I taught an agent to play Pong from raw pixels.',
                'I make LLMs cite their sources.',
                'I catch jailbreak prompts before they land.',
                'I turn whiteboard math into working code.',
              ]}
            />
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial={PAGE_VISIBLE ? "hidden" : false}
            animate="show"
            custom={0.2}
            className="text-lg text-neutral-600 max-w-xl mx-auto lg:mx-0 mb-10 dark:text-neutral-300"
          >
            Currently doing research in computational topology at DePaul
            University, and turning what I learn into projects you can try.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial={PAGE_VISIBLE ? "hidden" : false}
            animate="show"
            custom={0.3}
            className="flex items-center justify-center lg:justify-start gap-4 mb-12"
          >
            <Magnetic>
              <a
                href="#projects"
                className="inline-block px-7 py-3 rounded-full bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition-colors dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
              >
                View my work
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-block px-7 py-3 rounded-full glass font-medium text-neutral-800 hover:border-black/20 transition-colors dark:text-neutral-100 dark:hover:border-white/20"
              >
                Get in touch
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial={PAGE_VISIBLE ? "hidden" : false}
            animate="show"
            custom={0.4}
            className="flex items-center justify-center lg:justify-start gap-5 text-neutral-500 dark:text-neutral-400"
          >
            <a href="https://github.com/yelurusreejareddy" target="_blank" rel="noreferrer" className="hover:text-neutral-900 transition-colors dark:hover:text-white" aria-label="GitHub">
              <FiGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/sreeja-reddy-yeluru" target="_blank" rel="noreferrer" className="hover:text-neutral-900 transition-colors dark:hover:text-white" aria-label="LinkedIn">
              <FiLinkedin size={20} />
            </a>
            <a href="mailto:yeluru.sreeja@gmail.com" className="hover:text-neutral-900 transition-colors dark:hover:text-white" aria-label="Email">
              <FiMail size={20} />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={PAGE_VISIBLE ? { opacity: 0, scale: 0.95 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-2 hidden lg:flex justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-amber-400/20 via-transparent to-teal-400/20 blur-xl" />
            {photoOk ? (
              <img
                src="/sreeja.jpg"
                alt="Sreeja Reddy Yeluru"
                onError={() => setPhotoOk(false)}
                className="relative w-80 max-w-full rounded-3xl border border-black/8 object-cover aspect-[4/5] dark:border-white/10"
              />
            ) : (
              <div className="relative w-80 max-w-full rounded-3xl border border-black/8 aspect-[4/5] glass flex items-center justify-center dark:border-white/10">
                <span className="font-display text-6xl font-medium gradient-text">SRY</span>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 text-neutral-400 dark:text-neutral-500"
      >
        <FiArrowDown size={20} />
      </motion.div>
    </section>
  )
}

function FeaturedProject({ project, index }) {
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      initial={PAGE_VISIBLE ? { opacity: 0, y: 40 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      className="glass p-8 flex flex-col gap-4 hover:border-amber-500/60 transition-colors group relative overflow-hidden"
    >
      <div className="blob w-[200px] h-[200px] bg-amber-600 top-[-40%] right-[-20%] opacity-20 group-hover:opacity-35 transition-opacity" />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <span className="text-3xl">{project.emoji}</span>
          <span className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 dark:text-emerald-300 dark:bg-emerald-400/10 dark:border-emerald-400/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Live demo
          </span>
        </div>
        <h3 className="font-display text-xl font-medium mb-2 group-hover:gradient-text transition-all">
          {project.title}
        </h3>
        <p className="text-sm text-neutral-600 leading-relaxed mb-4 dark:text-neutral-300">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-black/[0.03] text-neutral-500 border border-black/8 dark:bg-white/[0.04] dark:text-neutral-400 dark:border-white/10">
              {tag}
            </span>
          ))}
        </div>
        <p className="flex items-center gap-1.5 text-sm text-amber-700 mt-5 group-hover:text-amber-800 transition-colors dark:text-amber-300 dark:group-hover:text-amber-200">
          Try it <FiExternalLink size={14} />
        </p>
      </div>
    </motion.a>
  )
}

function Projects() {
  const featured = projects.slice(0, 3)
  const rest = projects.slice(3)

  return (
    <section id="projects" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={PAGE_VISIBLE ? { opacity: 0, y: 16 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hud-label mb-3 text-center"
        >
          03 / Projects
        </motion.p>
        <motion.h2
          initial={PAGE_VISIBLE ? { opacity: 0, y: 16 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-3xl sm:text-4xl font-medium text-center mb-4"
        >
          Projects you can <span className="gradient-text">actually try</span>
        </motion.h2>
        <motion.p
          initial={PAGE_VISIBLE ? { opacity: 0 } : false}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-neutral-500 text-center max-w-xl mx-auto mb-14 dark:text-neutral-400"
        >
          These come from my Master's coursework and my own experiments. I
          deployed each one as a live demo on Hugging Face, so you can open
          any card and see for yourself how it works.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {featured.map((project, i) => (
            <FeaturedProject key={project.title} project={project} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-black/5 py-10 px-6 dark:border-white/8">
      <div className="max-w-5xl mx-auto text-center text-sm text-neutral-400 dark:text-neutral-500">
        <p>Sreeja Reddy Yeluru, {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen relative">
      <CursorGlow />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Research />
      <Projects />
      <Experience />
      <TerminalSkills />
      <Contact />
      <Footer />
    </div>
  )
}
