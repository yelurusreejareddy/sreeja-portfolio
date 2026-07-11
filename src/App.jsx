import { useRef } from 'react'
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
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass rounded-full px-6 py-3 flex items-center gap-6"
    >
      <a href="#" className="font-display font-medium text-sm tracking-wide">SRY</a>
      <div className="hidden md:flex items-center gap-5 text-sm text-white/70">
        <a href="#about" className="hover:text-white transition-colors">About</a>
        <a href="#research" className="hover:text-white transition-colors">Research</a>
        <a href="#projects" className="hover:text-white transition-colors">Projects</a>
        <a href="#experience" className="hover:text-white transition-colors">Experience</a>
        <a href="#contact" className="hover:text-white transition-colors">Contact</a>
      </div>
      <a
        href="/resume.pdf"
        className="text-sm px-4 py-1.5 rounded-full bg-white text-black font-medium hover:bg-white/85 transition-colors"
      >
        Resume
      </a>
    </motion.nav>
  )
}

function Hero() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 grid-bg" />
      <div className="blob blob-1 w-[420px] h-[420px] bg-purple-500 top-[-10%] left-[-5%]" />
      <div className="blob blob-2 w-[380px] h-[380px] bg-pink-500 bottom-[-10%] right-[-5%]" />
      <div className="blob blob-3 w-[320px] h-[320px] bg-blue-500 top-[30%] right-[15%]" />

      <motion.div style={{ scale, opacity }} className="relative z-10 max-w-3xl text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-white/70">Open to AI / ML engineering roles</span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.1}
          className="font-display text-5xl sm:text-7xl font-medium leading-[1.05] mb-6"
        >
          Hi, I'm <span className="gradient-text">Sreeja</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.15}
          className="font-display text-2xl sm:text-3xl text-white/85 h-10 mb-8"
        >
          <Typewriter
            phrases={[
              'I make LLMs answer with receipts.',
              'I taught an agent Pong from raw pixels.',
              'I catch jailbreak prompts before they land.',
              'I turn whiteboard math into working code.',
            ]}
          />
        </motion.p>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.2}
          className="text-lg text-white/60 max-w-xl mx-auto mb-10"
        >
          I build ML systems and do research in computational topology.
          Looking for my next role right now, and happy to relocate for the
          right one.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.3}
          className="flex items-center justify-center gap-4 mb-14"
        >
          <Magnetic>
            <a
              href="#projects"
              className="inline-block px-6 py-3 rounded-full bg-white text-black font-medium"
            >
              See my work
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="inline-block px-6 py-3 rounded-full glass font-medium"
            >
              Say hi
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.4}
          className="flex items-center justify-center gap-5 text-white/50"
        >
          <a href="https://github.com/yelurusreejareddy" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="GitHub">
            <FiGithub size={20} />
          </a>
          <a href="https://www.linkedin.com/in/sreeja-reddy-yeluru" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
            <FiLinkedin size={20} />
          </a>
          <a href="mailto:yeluru.sreeja@gmail.com" className="hover:text-white transition-colors" aria-label="Email">
            <FiMail size={20} />
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 text-white/30"
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      className="glass rounded-3xl p-8 flex flex-col gap-4 hover:border-purple-400/40 transition-colors group relative overflow-hidden"
    >
      <div className="blob w-[200px] h-[200px] bg-purple-600 top-[-40%] right-[-20%] opacity-20 group-hover:opacity-35 transition-opacity" />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <span className="text-3xl">{project.emoji}</span>
          <span className="flex items-center gap-1.5 text-xs text-emerald-300/90 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Live demo
          </span>
        </div>
        <h3 className="font-display text-xl font-medium mb-2 group-hover:gradient-text transition-all">
          {project.title}
        </h3>
        <p className="text-sm text-white/55 leading-relaxed mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/50 border border-white/8">
              {tag}
            </span>
          ))}
        </div>
        <p className="flex items-center gap-1.5 text-sm text-purple-300/80 mt-5 group-hover:text-purple-200 transition-colors">
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
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-sm uppercase tracking-[0.3em] text-white/40 mb-3 text-center"
        >
          <span className="text-purple-400/70 font-mono mr-2">03</span> Projects
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-3xl sm:text-4xl font-medium text-center mb-4"
        >
          Projects you can <span className="gradient-text">actually try</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/50 text-center max-w-xl mx-auto mb-14"
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
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-5xl mx-auto text-center text-sm text-white/35">
        <p>Sreeja Reddy Yeluru, {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="bg-[#06060a] text-white min-h-screen relative">
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
