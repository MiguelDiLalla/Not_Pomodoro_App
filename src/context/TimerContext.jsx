import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { generateRandomTime } from '../utils/timer';

// Create a context for timer functionality
const TimerContext = createContext();

// Custom hook to use the timer context
export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};

// Timer provider component to wrap the app
export const TimerProvider = ({ children }) => {
  // Timer state
  const [mode, setMode] = useState('paused'); // 'paused', 'running', 'complete'
  const [buttonValues, setButtonValues] = useState([]);
  const [activeTimerValue, setActiveTimerValue] = useState(null);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  
  // Refs for managing timers
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const elapsedBeforePauseRef = useRef(0);
  const remainingTimeRef = useRef(0);
  
  // Generate 8 random times (2-21 min in ms)
  const generateTimerValues = useCallback(() => {
    const values = Array.from({ length: 8 }, () => generateRandomTime());
    return values;
  }, []);
  
  // Initialize button values and hidden timer
  const startSession = useCallback(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Generate new times and set one as the active timer
    const newTimes = generateTimerValues();
    const randomIndex = Math.floor(Math.random() * newTimes.length);
    const activeTime = newTimes[randomIndex];
    
    // Remove the active time from button values (it's the hidden timer)
    const buttonsArray = [...newTimes];
    buttonsArray.splice(randomIndex, 1);
    
    // Set state
    setButtonValues(buttonsArray);
    setActiveTimerValue(activeTime);
    setMode('running');
    setSessionStartTime(new Date());
    
    // Start the timer
    startTimeRef.current = Date.now();
    remainingTimeRef.current = activeTime;
    elapsedBeforePauseRef.current = 0;
    
    // Set timeout for the active timer
    timerRef.current = setTimeout(() => timerComplete(), activeTime);
    
    return { activeTime, buttonValues: buttonsArray };
  }, [generateTimerValues]);
  
  // Pause the running timer
  const pauseSession = useCallback(() => {
    if (mode !== 'running') return;
    
    // Clear the current timer
    clearTimeout(timerRef.current);
    
    // Calculate time elapsed in current timer
    const now = Date.now();
    const elapsedSinceStart = now - startTimeRef.current;
    
    // Save remaining time
    remainingTimeRef.current = remainingTimeRef.current - elapsedSinceStart;
    elapsedBeforePauseRef.current += elapsedSinceStart;
    
    // Update state
    setMode('paused');
  }, [mode]);
  
  // Resume the paused timer
  const resumeSession = useCallback(() => {
    if (mode !== 'paused' || !remainingTimeRef.current) return;
    
    // Set new start time and start the timer
    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => timerComplete(), remainingTimeRef.current);
    
    // Update state
    setMode('running');
  }, [mode]);
  
  // Toggle between pause/resume
  const toggleSession = useCallback(() => {
    if (mode === 'paused') {
      if (sessionStartTime) {
        resumeSession();
      } else {
        startSession();
      }
    } else if (mode === 'running') {
      pauseSession();
    } else {
      // If complete, start new session
      startSession();
    }
  }, [mode, pauseSession, resumeSession, startSession, sessionStartTime]);
  
  // Handle the timer completion
  const timerComplete = useCallback(() => {
    // Mark timer as complete
    setMode('complete');
    
    // Calculate total time for this timer
    const totalElapsed = elapsedBeforePauseRef.current + (Date.now() - startTimeRef.current);
    
    // Auto-trigger one of the button values
    const randomButtonIndex = Math.floor(Math.random() * buttonValues.length);
    const newTimerValue = buttonValues[randomButtonIndex];
    
    // Reset the timer with the new value
    setTimeout(() => {
      resetTimer(newTimerValue, randomButtonIndex);
    }, 1000); // Brief delay for notification to be seen
    
    return { elapsedTime: totalElapsed, newTimerValue };
  }, [buttonValues]);
  
  // Reset timer with a new value (when a button is clicked)
  const resetTimer = useCallback((newValue, buttonIndex) => {
    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Generate a replacement random time for the clicked button
    const replacementTime = generateRandomTime();
    
    // Update button values
    setButtonValues(prev => {
      const updated = [...prev];
      updated[buttonIndex] = replacementTime;
      return updated;
    });
    
    // Set the new timer
    setActiveTimerValue(newValue);
    
    // Reset timer tracking
    startTimeRef.current = Date.now();
    remainingTimeRef.current = newValue;
    elapsedBeforePauseRef.current = 0;
    
    // Start the new timer
    timerRef.current = setTimeout(() => timerComplete(), newValue);
    
    // Ensure we're in running mode
    setMode('running');
    
    return { newValue, replacementTime };
  }, [timerComplete]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
  
  // Context value
  const value = {
    mode,
    buttonValues,
    activeTimerValue,
    sessionStartTime,
    startSession,
    pauseSession,
    resumeSession,
    toggleSession,
    resetTimer,
  };
  
  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContext;