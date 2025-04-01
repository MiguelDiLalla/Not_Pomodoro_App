import React, { useEffect, useState } from 'react';
import { formatDuration } from '../utils/timer';

const NotificationManager = ({ 
  mode = 'paused',
  activeTimerValue,
  sessionStartTime,
  onNotificationClick
}) => {
  const [permissionState, setPermissionState] = useState('default');
  
  // Check notification permission on component mount
  useEffect(() => {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return;
    }

    setPermissionState(Notification.permission);
  }, []);
  
  // Request notification permission if not granted
  const requestPermission = async () => {
    if (!('Notification' in window)) {
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setPermissionState(permission);
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };
  
  // Listen for changes in mode to trigger notifications
  useEffect(() => {
    if (mode === 'complete' && permissionState === 'granted') {
      sendTimerCompletionNotification();
    }
  }, [mode, permissionState]);
  
  // Send notification when timer completes
  const sendTimerCompletionNotification = () => {
    if (!('Notification' in window) || permissionState !== 'granted') {
      return;
    }
    
    // Get elapsed time for this timer
    const timerDuration = activeTimerValue ? formatDuration(activeTimerValue) : 'unknown duration';
    
    // Calculate total session time if session start time is available
    let totalSessionTime = '';
    if (sessionStartTime) {
      const diffMs = new Date() - sessionStartTime;
      totalSessionTime = formatDuration(diffMs);
    }
    
    // Create and show the notification
    const notification = new Notification('FlowLoops Timer Complete', {
      body: `Timer of ${timerDuration} completed.\nTotal session time: ${totalSessionTime}`,
      icon: '/icons/icon-192.png',
      silent: false
    });
    
    // Handle notification click
    notification.onclick = () => {
      window.focus();
      notification.close();
      if (onNotificationClick) {
        onNotificationClick();
      }
    };
  };
  
  // Render a permission request button if needed
  return permissionState !== 'granted' ? (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={requestPermission}
        className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm shadow-lg"
      >
        Enable Notifications
      </button>
    </div>
  ) : null;
};

export default NotificationManager;