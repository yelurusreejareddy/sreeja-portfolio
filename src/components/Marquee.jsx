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
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div className="relative overflow-hidden py-6 border-y border-white/5 select-none">
      <div className="marquee-track flex w-max items-center gap-10">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-10 shrink-0">
            <span className="font-display text-sm uppercase tracking-[0.2em] text-white/35">
              {item}
            </span>
            <span className="text-purple-400/40 text-xs">*</span>
          </span>
        ))}
      </div>
    </div>
  )
}
