import React from 'react';

const TitlePanel = ({ mode = 'paused', sessionStartTime = null }) => {
  const getMotivationalText = () => {
    // Different text based on app state
    if (mode === 'paused') {
      return 'Time is a game. Play it.';
    } else if (mode === 'running') {
      return 'The flow has begun...';
    } else if (mode === 'complete') {
      return 'Flow disrupted. Ready for more?';
    }
    return 'Time is a game. Play it.';
  };

  return (
    <div className="flex flex-col justify-center h-full p-6 bg-gray-800/70 rounded-2xl">
      {/* App title with stylized font */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-title text-red-400 mb-3">
        FlowLoops
      </h1>
      
      {/* Motivational subtitle */}
      <p className="text-lg md:text-xl text-teal-200 mb-6 font-sans">
        {getMotivationalText()}
      </p>
      
      {/* Instructions or session status */}
      <div className="text-sm text-gray-300 space-y-2">
        {mode === 'paused' ? (
          <>
            <p>Press <span className="text-teal-400">Run</span> to start your flow.</p>
            <p>Click buttons to reset the hidden timer.</p>
            <p>What time is it? You'll never know...</p>
          </>
        ) : mode === 'running' ? (
          <p>
            Session running{sessionStartTime ? ` for ${getFormattedRunningTime()}` : ''}
          </p>
        ) : (
          <p>Session complete. Start a new one?</p>
        )}
      </div>
    </div>
  );

  // Helper function to calculate running time since session started
  function getFormattedRunningTime() {
    if (!sessionStartTime) return '';
    
    const now = new Date();
    const diffMs = now - sessionStartTime;
    const minutes = Math.floor(diffMs / 60000);
    const seconds = Math.floor((diffMs % 60000) / 1000);
    
    return `${minutes}m ${seconds}s`;
  }
};

export default TitlePanel;