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

// Export a utility you can use elsewhere with enhanced customization
export function triggerNotification(message, options = {}) {
  if ('Notification' in window && Notification.permission === 'granted') {
    // Vibration pattern for mobile devices if supported
    const vibrationPattern = [100, 50, 100];
    
    // Configure the notification with default and custom options
    const notification = new Notification('⏱️ FlowLoop', {
      body: message,
      icon: './icons/icon-192.png',
      badge: './icons/icon-192.png',
      vibrate: vibrationPattern,
      timestamp: Date.now(),
      requireInteraction: false, // Auto-close after a while
      ...options
    });
    
    // Optional click handler
    notification.onclick = () => {
      window.focus();
      notification.close();
    };
    
    // Play a subtle sound if audio is provided
    if (options.sound) {
      const audio = new Audio(options.sound);
      audio.volume = 0.4;
      audio.play().catch(e => console.log('Audio play error:', e));
    }
    
    return notification;
  }
  
  return null;
}
