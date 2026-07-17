import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiSend, FiLoader, FiX } from 'react-icons/fi'
import { answerQuestion, isEmbedderLoaded, EXAMPLES } from '../lib/chatEngine'

export default function ChatDrawer({ open, onClose }) {
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
    if (!isEmbedderLoaded()) setModelLoading(true)

    try {
      const answerText = await answerQuestion(q)
      setMessages((m) => [...m, { role: 'assistant', text: answerText }])
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: 'assistant', text: 'Something went wrong loading the assistant. Please try again in a moment.' },
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
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] z-50 flex flex-col border-l"
            style={{ background: 'var(--panel)', borderColor: 'var(--line)' }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/8 dark:border-white/10">
              <div>
                <p className="font-display font-medium">Ask about me</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Runs in your browser, grounded in my resume and projects.
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close chat"
                className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors dark:text-neutral-400 dark:hover:text-white"
              >
                <FiX size={18} />
              </button>
            </div>

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
                autoFocus
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-opacity disabled:opacity-40 shrink-0"
                style={{ background: 'var(--terracotta)' }}
              >
                <FiSend size={14} />
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
