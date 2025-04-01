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
      
      // Trigger notification with enhanced message
      triggerNotification(
        `That flow session was ${elapsedFormatted}. A new one has already started...`, 
        { sound: '/sounds/click.mp3' }
      )
      
      onTimerEnd(elapsedMs) // pass elapsed time back
    }, duration)

    return () => clearTimeout(timerRef.current)
  }, [duration, isRunning])

  return null
}

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  
  if (minutes === 0) {
    return `${seconds} seconds`
  } else if (minutes === 1) {
    return `${minutes} minute ${seconds > 0 ? `and ${seconds} seconds` : ''}`
  } else {
    return `${minutes} minutes ${seconds > 0 ? `and ${seconds} seconds` : ''}`
  }
}
