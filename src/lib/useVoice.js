import { useEffect, useRef, useState } from 'react'

const ERROR_MESSAGES = {
  'not-allowed': "Microphone access is blocked. Allow it in your browser's site settings and try again.",
  'service-not-allowed': "Microphone access is blocked. Allow it in your browser's site settings and try again.",
  'no-speech': "Didn't catch that — try speaking again.",
  'audio-capture': 'No microphone found.',
  network: 'Network error while listening. Try again.',
  aborted: null,
}

// Prefer higher-quality/more natural-sounding system voices when available.
// macOS/iOS ship "Enhanced" or "Premium" versions of voices like Samantha or Ava
// that use much better on-device synthesis, but they must be downloaded manually
// (System Settings -> Accessibility -> Spoken Content -> System Voice -> Manage
// Voices). If one has been downloaded, prefer it; otherwise fall back to the
// best voice that ships by default.
const PREFERRED_VOICE_NAMES = [
  'Google US English',
  'Microsoft Aria Online (Natural)',
  'Microsoft Jenny Online (Natural)',
  'Samantha',
  'Ava',
  'Karen',
]

function pickVoice() {
  const voices = window.speechSynthesis?.getVoices() || []
  if (!voices.length) return null

  const enhanced = voices.find((v) => /\b(enhanced|premium)\b/i.test(v.name) && v.lang.startsWith('en'))
  if (enhanced) return enhanced

  for (const name of PREFERRED_VOICE_NAMES) {
    const match = voices.find((v) => v.name.includes(name))
    if (match) return match
  }
  const anyNatural = voices.find((v) => /natural/i.test(v.name) && v.lang.startsWith('en'))
  if (anyNatural) return anyNatural
  const anyEnglishFemale = voices.find((v) => v.lang.startsWith('en') && /female/i.test(v.name))
  if (anyEnglishFemale) return anyEnglishFemale
  const anyEnglish = voices.find((v) => v.lang.startsWith('en'))
  return anyEnglish || voices[0]
}

export function useVoice({ onResult } = {}) {
  const [listening, setListening] = useState(false)
  const [muted, setMuted] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const [voiceError, setVoiceError] = useState(null)
  const recognitionRef = useRef(null)
  const onResultRef = useRef(onResult)
  onResultRef.current = onResult

  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices()
      window.speechSynthesis.onvoiceschanged = () => {}
    }

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
      window.speechSynthesis?.cancel()
      recognition.start()
      setListening(true)
    }
  }

  function speak(text) {
    if (muted || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1.02
    utterance.pitch = 1
    const voice = pickVoice()
    if (voice) utterance.voice = voice
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

  return {
    listening,
    toggleListening,
    speechSupported,
    muted,
    toggleMuted,
    speak,
    stopSpeaking,
    voiceError,
  }
}
