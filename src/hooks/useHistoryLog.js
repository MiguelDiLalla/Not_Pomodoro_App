import { useState, useCallback } from 'react';

// Custom hook for tracking session history
const useHistoryLog = () => {
  // State to store history entries
  const [history, setHistory] = useState([]);
  // State to track total elapsed time
  const [totalTimeMs, setTotalTimeMs] = useState(0);

  // Add a new event to the history log
  const addEntry = useCallback((entry) => {
    const timestamp = new Date();
    
    // Create a formatted entry with timestamp
    const formattedEntry = {
      id: Date.now(),
      timestamp,
      formattedTime: timestamp.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      ...entry
    };
    
    setHistory(prevHistory => [formattedEntry, ...prevHistory]);
  }, []);

  // Log specific event types
  const logTimerStart = useCallback((initialTime) => {
    addEntry({
      type: 'start',
      message: `Session started with ${formatTime(initialTime)} timer`,
      timeValue: initialTime
    });
  }, [addEntry]);

  const logTimerReset = useCallback((newTime) => {
    addEntry({
      type: 'reset',
      message: `Timer reset to ${formatTime(newTime)}`,
      timeValue: newTime
    });
  }, [addEntry]);

  const logTimerComplete = useCallback((elapsedTimeMs) => {
    addEntry({
      type: 'complete',
      message: `Timer completed after ${formatTime(elapsedTimeMs)}`,
      timeValue: elapsedTimeMs
    });
    
    // Update total elapsed time
    setTotalTimeMs(prev => prev + elapsedTimeMs);
  }, [addEntry]);

  const logTimerPause = useCallback(() => {
    addEntry({
      type: 'pause',
      message: 'Session paused'
    });
  }, [addEntry]);

  // Helper to format time in minutes and seconds
  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
  };
  
  // Format total time for display
  const formattedTotalTime = useCallback(() => {
    const hours = Math.floor(totalTimeMs / 3600000);
    const minutes = Math.floor((totalTimeMs % 3600000) / 60000);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }, [totalTimeMs]);

  // Clear history
  const clearHistory = useCallback(() => {
    setHistory([]);
    setTotalTimeMs(0);
  }, []);

  return {
    history,
    totalTimeMs,
    formattedTotalTime,
    logTimerStart,
    logTimerReset,
    logTimerComplete,
    logTimerPause,
    clearHistory
  };
};

export default useHistoryLog;