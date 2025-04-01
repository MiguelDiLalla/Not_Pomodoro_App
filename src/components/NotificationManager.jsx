import { useEffect } from 'react'

export default function NotificationManager() {
  // Ask for permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission()
    }
  }, [])

  return null
}

// Optional: export a utility you can use elsewhere
export function triggerNotification(message) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('⏰ Time’s up!', {
      body: message,
      icon: '/not-pomodoro-app/icons/icon-192.png' // updated path for GitHub Pages
    })
  }
}
