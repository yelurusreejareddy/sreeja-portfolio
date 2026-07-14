import { useRef, useState } from 'react'

export function useTilt(strength = 10) {
  const ref = useRef(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })

  function onMouseMove(e) {
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setRotate({ x: py * -strength, y: px * strength })
  }

  function onMouseLeave() {
    setRotate({ x: 0, y: 0 })
  }

  return { ref, rotate, onMouseMove, onMouseLeave }
}
