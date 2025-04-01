import React, { useContext } from 'react';
import TitlePanel from './components/TitlePanel';
import ButtonsPanel from './components/ButtonsPanel';
import HistorySidebar from './components/HistorySidebar';
import MobileHistoryBar from './components/MobileHistoryBar';
import AnimatedBackground from './components/AnimatedBackground';
import { TimerProvider, useTimer } from './context/TimerContext';
import NotificationManager from './components/NotificationManager';
import useHistoryLog from './hooks/useHistoryLog';

// Inner component to access context
const AppContent = () => {
  const { 
    mode, 
    buttonValues, 
    sessionStartTime, 
    toggleSession, 
    resetTimer 
  } = useTimer();
  
  // Use history log hook
  const { 
    history, 
    formattedTotalTime, 
    logTimerStart, 
    logTimerReset, 
    logTimerComplete, 
    logTimerPause 
  } = useHistoryLog();
  
  // Get the most recent history entry for mobile view
  const lastHistoryEntry = history.length > 0 ? history[0] : null;
  
  // Handle Run/Pause button click
  const handleRunPauseClick = () => {
    if (mode === 'paused') {
      if (sessionStartTime) {
        // Resuming
      } else {
        // Starting new session
        const result = toggleSession();
        if (result) {
          logTimerStart(result.activeTime);
        }
      }
    } else if (mode === 'running') {
      // Pausing
      toggleSession();
      logTimerPause();
    } else {
      // Complete state - start new session
      const result = toggleSession();
      if (result) {
        logTimerStart(result.activeTime);
      }
    }
  };
  
  // Handle button click (reset timer)
  const handleButtonClick = (newValue, index) => {
    resetTimer(newValue, index);
    logTimerReset(newValue);
  };
  
  // Handle timer completion
  const handleTimerComplete = (data) => {
    if (data && data.elapsedTime) {
      logTimerComplete(data.elapsedTime);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-900 text-white">
      {/* Animated background */}
      <AnimatedBackground mode={mode} />
      
      {/* Main grid layout */}
      <div className="relative z-10 grid h-full w-full grid-cols-1 md:grid-cols-[1fr,auto,1fr] md:gap-4 md:p-4">
        {/* Left panel - Title and description */}
        <div className="flex items-center justify-center p-4 md:justify-end">
          <TitlePanel 
            mode={mode} 
            sessionStartTime={sessionStartTime} 
          />
        </div>
        
        {/* Center panel - Buttons and controls */}
        <div className="flex items-center justify-center p-4">
          <ButtonsPanel 
            mode={mode}
            onRunPauseClick={handleRunPauseClick}
            buttonValues={buttonValues}
            onButtonClick={handleButtonClick}
          />
        </div>
        
        {/* Right panel - History sidebar (desktop only) */}
        <div className="hidden md:flex md:items-center md:justify-start md:p-4">
          <HistorySidebar 
            mode={mode}
            history={history}
            totalTime={formattedTotalTime()}
          />
        </div>
      </div>
      
      {/* Mobile history bar (mobile only) */}
      <MobileHistoryBar 
        mode={mode}
        lastEntry={lastHistoryEntry}
        totalTime={formattedTotalTime()}
      />
      
      {/* Notifications */}
      <NotificationManager 
        mode={mode}
        activeTimerValue={mode === 'complete' ? null : undefined}
        sessionStartTime={sessionStartTime}
        onNotificationClick={handleTimerComplete}
      />
    </div>
  );
};

// Main App component with providers
function App() {
  return (
    <TimerProvider>
      <AppContent />
    </TimerProvider>
  );
}

export default App;