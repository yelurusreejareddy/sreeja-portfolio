import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiSend, FiLoader, FiX, FiMic } from 'react-icons/fi'
import { answerQuestion, isEmbedderLoaded, EXAMPLES } from '../lib/chatEngine'
import { useVoice } from '../lib/useVoice'

export default function ChatDrawer({ open, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hi! I'm an AI assistant that knows about Sreeja's background, research, and projects. Ask me anything.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [modelLoading, setModelLoading] = useState(false)
  const scrollRef = useRef(null)
  const { listening, toggleListening, speechSupported, voiceError } = useVoice({
    onResult: (transcript) => handleSend(transcript),
  })

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
        <div onClick={onClose} className="fixed inset-0 z-40" />
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          className="fixed z-50 flex flex-col rounded-2xl shadow-2xl border overflow-hidden
            inset-x-4 bottom-4 h-[70vh]
            sm:inset-x-auto sm:bottom-auto sm:top-24 sm:right-6 sm:w-[360px] sm:h-[500px]"
          style={{ background: 'var(--panel)', borderColor: 'var(--line)' }}
        >
            <div className="flex items-center justify-between px-4 py-3 border-b border-black/8 dark:border-white/10">
              <div>
                <p className="font-display font-medium text-sm">Ask about me</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Grounded in my resume and projects.
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close chat"
                className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors dark:text-neutral-400 dark:hover:text-white shrink-0"
              >
                <FiX size={16} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
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

            {voiceError && (
              <div className="px-4 pb-2">
                <p className="text-xs" style={{ color: 'var(--clayred, #a3291f)' }}>
                  {voiceError}
                </p>
              </div>
            )}

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
                placeholder={listening ? 'Listening...' : 'Ask about my background, research, or projects...'}
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                autoFocus
              />
              {speechSupported && (
                <motion.button
                  type="button"
                  onClick={toggleListening}
                  aria-label={listening ? 'Stop listening' : 'Ask with your voice'}
                  animate={listening ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                  transition={listening ? { duration: 1.1, repeat: Infinity, ease: 'easeInOut' } : {}}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors shrink-0"
                  style={
                    listening
                      ? { background: 'var(--terracotta)', color: 'white' }
                      : undefined
                  }
                >
                  <FiMic
                    size={15}
                    className={listening ? '' : 'text-neutral-500 dark:text-neutral-400'}
                  />
                </motion.button>
              )}
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
