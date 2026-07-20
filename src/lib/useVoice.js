import { useEffect, useRef, useState } from 'react'

const ERROR_MESSAGES = {
  'not-allowed': "Microphone access is blocked. Allow it in your browser's site settings and try again.",
  'service-not-allowed': "Microphone access is blocked. Allow it in your browser's site settings and try again.",
  'no-speech': "Didn't catch that — try speaking again.",
  'audio-capture': 'No microphone found.',
  network: 'Network error while listening. Try again.',
  aborted: null,
}

export function useVoice({ onResult } = {}) {
  const [listening, setListening] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const [voiceError, setVoiceError] = useState(null)
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
      setVoiceError(null)
      const transcript = event.results[0][0].transcript
      onResultRef.current?.(transcript)
    }
    recognition.onend = () => setListening(false)
    recognition.onerror = (event) => {
      setListening(false)
      const message = ERROR_MESSAGES[event.error] ?? `Voice input error: ${event.error}`
      if (message) setVoiceError(message)
    }

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
      setVoiceError(null)
      recognition.start()
      setListening(true)
    }
  }

  return { listening, toggleListening, speechSupported, voiceError }
}
