import { useEffect, useState } from 'react'

export default function Typewriter({ phrases, typingSpeed = 45, holdTime = 1800 }) {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [shown, setShown] = useState(0)
  const [deleting, setDeleting] = useState(false)

  const phrase = phrases[phraseIndex]

  useEffect(() => {
    let timeout
    if (!deleting && shown < phrase.length) {
      timeout = setTimeout(() => setShown(shown + 1), typingSpeed)
    } else if (!deleting && shown === phrase.length) {
      timeout = setTimeout(() => setDeleting(true), holdTime)
    } else if (deleting && shown > 0) {
      timeout = setTimeout(() => setShown(shown - 1), typingSpeed / 2)
    } else if (deleting && shown === 0) {
      setDeleting(false)
      setPhraseIndex((phraseIndex + 1) % phrases.length)
    }
    return () => clearTimeout(timeout)
  }, [shown, deleting, phrase, phraseIndex, phrases, typingSpeed, holdTime])

  return (
    <span>
      {phrase.slice(0, shown)}
      <span className="inline-block w-[3px] h-[1em] align-middle ml-1 animate-pulse" style={{ background: 'var(--terracotta)' }} />
    </span>
  )
}
