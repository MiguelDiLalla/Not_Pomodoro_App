import { useEffect, useRef } from 'react'
import { triggerNotification } from './NotificationManager'

export default function HiddenTimer({ duration, onTimerEnd, isRunning }) {
  const timerRef = useRef(null)
  const startTimeRef = useRef(null)

  useEffect(() => {
    if (!isRunning || !duration) return

    // Clear any previous timer
    if (timerRef.current) clearTimeout(timerRef.current)

    // Start new timer
    startTimeRef.current = Date.now()
    timerRef.current = setTimeout(() => {
      const endTime = Date.now()
      const elapsedMs = endTime - startTimeRef.current
      const elapsedFormatted = formatTime(elapsedMs)
      triggerNotification(`That one was ${elapsedFormatted}`)
      onTimerEnd(elapsedMs) // pass elapsed time back
    }, duration)

    return () => clearTimeout(timerRef.current)
  }, [duration, isRunning])

  return null
}

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return `${minutes}:${seconds.toString().padStart(2, '0')} minutes`
}
