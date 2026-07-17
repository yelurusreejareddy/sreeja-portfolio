import { useRef, useState } from 'react'
import { PAGE_VISIBLE } from '../lib/motionSafe'
import { motion } from 'framer-motion'
import { FiSend, FiLoader } from 'react-icons/fi'
import knowledgeData from '../data/knowledge_embeddings.json'

const SIMILARITY_FLOOR = 0.35
const FALLBACK =
  "I don't have detail on that. Feel free to email Sreeja directly at yeluru.sreeja@gmail.com, or check her projects at huggingface.co/Sreeja-reddy."

const EXAMPLES = [
  'What is she researching?',
  'Tell me about the AI Policy RAG project',
  'What was her role at Accenture?',
  "What's her tech stack?",
]

let embedderPromise = null
function getEmbedder() {
  if (!embedderPromise) {
    embedderPromise = import('@huggingface/transformers').then(({ pipeline }) =>
      pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')
    )
  }
  return embedderPromise
}

function cosineSim(a, b) {
  let dot = 0
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i]
  return dot
}

const STOPWORDS = new Set([
  'the', 'and', 'for', 'she', 'her', 'with', 'about', 'is', 'was', 'to', 'of', 'at', 'in', 'a',
  'an', 'what', 'how', 'who', 'me', 'do', 'does', 'did',
])

function keywordBoost(query, topic) {
  const queryLower = query.toLowerCase()
  const topicWords = (topic.toLowerCase().match(/[a-z0-9]+/g) || []).filter(
    (w) => w.length > 2 && !STOPWORDS.has(w)
  )
  let overlap = 0
  for (const w of topicWords) if (queryLower.includes(w)) overlap++
  return overlap > 0 ? 0.28 * overlap : 0
}

function findAnswer(question, queryEmbedding) {
  const scored = knowledgeData
    .map((chunk) => ({
      score: cosineSim(queryEmbedding, chunk.embedding) + keywordBoost(question, chunk.topic),
      text: chunk.text,
    }))
    .sort((a, b) => b.score - a.score)

  if (!scored.length || scored[0].score < SIMILARITY_FLOOR) return FALLBACK

  const topScore = scored[0].score
  const relevant = scored.filter((s) => s.score >= topScore * 0.9).slice(0, 2)
  return relevant.map((s) => s.text).join('\n\n')
}

export default function ChatWidget() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hi, I'm a small assistant trained on Sreeja's resume, research, and projects. Ask me anything about her background.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [modelLoading, setModelLoading] = useState(false)
  const scrollRef = useRef(null)

  async function handleSend(question) {
    const q = question.trim()
    if (!q || loading) return

    setMessages((m) => [...m, { role: 'user', text: q }])
    setInput('')
    setLoading(true)
    if (!embedderPromise) setModelLoading(true)

    try {
      const embedder = await getEmbedder()
      setModelLoading(false)
      const output = await embedder(q, { pooling: 'mean', normalize: true })
      const queryEmbedding = Array.from(output.data)
      const answerText = findAnswer(q, queryEmbedding)
      setMessages((m) => [...m, { role: 'assistant', text: answerText }])
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: 'assistant', text: "Something went wrong loading the assistant. Please try again in a moment." },
      ])
    } finally {
      setLoading(false)
      setModelLoading(false)
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
      })
    }
  }

  return (
    <section id="chat" className="relative py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.p
          initial={PAGE_VISIBLE ? { opacity: 0, y: 16 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hud-label mb-3 text-center"
        >
          Chat
        </motion.p>
        <motion.h2
          initial={PAGE_VISIBLE ? { opacity: 0, y: 16 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-3xl sm:text-4xl font-medium text-center mb-4"
        >
          Ask <span className="gradient-text">about me</span>
        </motion.h2>
        <motion.p
          initial={PAGE_VISIBLE ? { opacity: 0 } : false}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-neutral-500 text-center max-w-xl mx-auto mb-10 dark:text-neutral-400"
        >
          A small assistant that runs entirely in your browser, grounded in my resume, research,
          and projects.
        </motion.p>

        <motion.div
          initial={PAGE_VISIBLE ? { opacity: 0, y: 24 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="glass flex flex-col overflow-hidden h-[520px]"
        >
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'text-white'
                      : 'bg-black/[0.03] text-neutral-700 dark:bg-white/[0.05] dark:text-neutral-200'
                  }`}
                  style={m.role === 'user' ? { background: 'var(--terracotta)' } : undefined}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm bg-black/[0.03] text-neutral-500 dark:bg-white/[0.05] dark:text-neutral-400 flex items-center gap-2">
                  <FiLoader className="animate-spin" size={14} />
                  {modelLoading ? 'Loading assistant (first time only)...' : 'Thinking...'}
                </div>
              </div>
            )}
          </div>

          {messages.length === 1 && (
            <div className="px-5 pb-3 flex flex-wrap gap-2">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  onClick={() => handleSend(ex)}
                  className="text-xs px-3 py-1.5 rounded-full bg-black/[0.03] text-neutral-500 border border-black/8 hover:text-neutral-900 transition-colors dark:bg-white/[0.04] dark:text-neutral-400 dark:border-white/10 dark:hover:text-white"
                >
                  {ex}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend(input)
            }}
            className="flex items-center gap-2 p-4 border-t border-black/8 dark:border-white/10"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about my background, research, or projects..."
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-opacity disabled:opacity-40"
              style={{ background: 'var(--terracotta)' }}
            >
              <FiSend size={14} />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
