import { useEffect, useState } from 'react'
import { PAGE_VISIBLE } from '../lib/motionSafe'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// Grouped by area so a long list stays readable, and so a recruiter scanning
// for one kind of skill (say, cloud) can find the line for it.
const GROUPS = [
  ['languages', ['python', 'javascript', 'java', 'sql', 'bash']],
  ['ml / deep learning', ['pytorch', 'tensorflow', 'keras', 'scikit-learn', 'neural-networks', 'cnns', 'lstms', 'model-training', 'hyperparameter-tuning', 'cross-validation']],
  ['llm / generative ai', ['llms', 'rag', 'langchain', 'langgraph', 'agents', 'multi-agent', 'prompt-engineering', 'fine-tuning', 'embeddings', 'vector-databases', 'chroma', 'hugging-face', 'openai-api']],
  ['nlp', ['nlp', 'transformers', 'tokenization', 'tf-idf', 'word-embeddings', 'summarization']],
  ['reinforcement learning', ['reinforcement-learning', 'q-learning', 'dqn', 'ppo', 'a2c', 'rlhf', 'stable-baselines3', 'gymnasium']],
  ['computer vision', ['computer-vision', 'opencv', 'image-classification', 'pywavelets']],
  ['data / analytics', ['numpy', 'pandas', 'matplotlib', 'eda', 'feature-engineering', 'pca', 'smote']],
  ['mlops / deployment', ['docker', 'ci/cd', 'github-actions', 'rest-apis', 'fastapi', 'model-deployment']],
  ['cloud (aws)', ['ecs-fargate', 'ecr', 'amplify', 'api-gateway', 'iam', 'secrets-manager', 'cloudwatch']],
  ['web / demos / full-stack', ['next.js', 'react', 'gradio', 'pwa', 'html/css']],
  ['databases', ['postgresql', 'supabase', 'row-level-security']],
  ['tools / testing', ['git', 'jupyter', 'unix', 'pytest', 'vitest', 'oidc']],
]

// Types the group name as a comment, then lists its skills at once. Typing
// every skill one by one would take the better part of a minute.
function TerminalGroup({ name, skills, delay, active }) {
  const [shown, setShown] = useState(0)
  const text = `# ${name}`

  useEffect(() => {
    if (!active) return
    let id
    const start = setTimeout(() => {
      id = setInterval(() => {
        setShown((s) => {
          if (s >= text.length) {
            clearInterval(id)
            return s
          }
          return s + 1
        })
      }, 18)
    }, delay)
    return () => {
      clearTimeout(start)
      clearInterval(id)
    }
  }, [active, delay, text])

  const done = shown >= text.length

  return (
    <div className="font-mono text-sm">
      <p className="text-[#d3915f] mb-2 min-h-5">
        {text.slice(0, shown)}
        {shown > 0 && !done && <span className="inline-block w-2 h-4 bg-white/60 animate-pulse align-middle ml-0.5" />}
      </p>
      <div className={`flex flex-wrap gap-x-6 gap-y-1.5 transition-opacity duration-300 ${done ? 'opacity-100' : 'opacity-0'}`}>
        {skills.map((skill) => (
          <span key={skill} className="whitespace-nowrap">
            <span className="text-emerald-400">[✓]</span>{' '}
            <span className="text-white/85">{skill}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function TerminalSkills() {
  const ref = useRef(null)
  // once: true, so the lines type out the first time and then stay put.
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.p
          initial={PAGE_VISIBLE ? { opacity: 0, y: 16 } : false}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="hud-label mb-6 text-center"
        >
          Stack
        </motion.p>

        <motion.div
          initial={PAGE_VISIBLE ? { opacity: 0, y: 20 } : false}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="terminal rounded-2xl overflow-hidden"
        >
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
            <span className="ml-3 text-xs text-white/40 font-mono">skills.sh</span>
          </div>
          <div className="p-6 sm:p-8 space-y-5">
            <p className="font-mono text-sm text-white/40 mb-3">$ loading_stack --check</p>
            {/* Every line is laid out from the start, hidden until typed, so the
                section never changes height. Adding them only on arrival made it
                grow while the page scrolled past it to Contact, which pushed
                Contact down and left the page stopped on this section. */}
            {GROUPS.map(([name, skills], i) => (
              <TerminalGroup key={name} name={name} skills={skills} delay={i * 280} active={inView} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
