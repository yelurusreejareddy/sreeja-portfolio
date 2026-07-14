const ITEMS = [
  'PyTorch',
  'LangChain',
  'Transformers',
  'Reinforcement Learning',
  'RAG',
  'Computer Vision',
  'scikit-learn',
  'GUDHI',
  'Gradio',
  'Chroma',
  'NumPy',
  'OpenCV',
  'SQL',
  'Python',
]

export default function Marquee() {
  return (
    <div className="py-10 px-6 border-y border-black/5 select-none dark:border-white/8">
      <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
        {ITEMS.map((item) => (
          <span
            key={item}
            className="text-xs px-3 py-1.5 rounded-full bg-black/[0.03] text-neutral-500 border border-black/8 dark:bg-white/[0.04] dark:text-neutral-400 dark:border-white/10"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
