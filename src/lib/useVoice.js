import { useEffect, useRef, useState } from 'react'

export function useVoice({ onResult } = {}) {
  const [listening, setListening] = useState(false)
  const [muted, setMuted] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const recognitionRef = useRef(null)
  const onResultRef = useRef(onResult)
  onResultRef.current = onResult

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return

    setSpeechSupported(true)
    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      onResultRef.current?.(transcript)
    }
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)

    recognitionRef.current = recognition
    return () => recognition.stop()
  }, [])

  function toggleListening() {
    const recognition = recognitionRef.current
    if (!recognition) return
    if (listening) {
      recognition.stop()
      setListening(false)
    } else {
      window.speechSynthesis?.cancel()
      recognition.start()
      setListening(true)
    }
  }

  function speak(text) {
    if (muted || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1
    utterance.pitch = 1
    window.speechSynthesis.speak(utterance)
  }

  function stopSpeaking() {
    window.speechSynthesis?.cancel()
  }

  function toggleMuted() {
    setMuted((m) => {
      if (!m) stopSpeaking()
      return !m
    })
  }

  return { listening, toggleListening, speechSupported, muted, toggleMuted, speak, stopSpeaking }
}
