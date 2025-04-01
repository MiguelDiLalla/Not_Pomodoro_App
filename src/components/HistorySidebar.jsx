import React from 'react';

const HistorySidebar = ({ history = [], totalTime = '0m', mode = 'paused' }) => {
  return (
    <div className={`flex flex-col h-full bg-red-400/10 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300`}>
      {/* Header */}
      <div className="bg-red-500/20 p-4">
        <h2 className="text-xl font-semibold text-red-100">Session History</h2>
      </div>
      
      {/* History entries - scrollable, reverse chronological */}
      <div className="flex-grow overflow-y-auto p-4 space-y-3">
        {history.length === 0 ? (
          <p className="text-gray-400 italic text-center">No history yet</p>
        ) : (
          history.map((entry) => (
            <div 
              key={entry.id} 
              className={`p-3 rounded-lg ${getEntryBackgroundColor(entry.type)}`}
            >
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium">{entry.message}</span>
                <span className="text-xs text-gray-400">{entry.formattedTime}</span>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Footer with total time counter */}
      <div className="bg-red-500/20 p-4 border-t border-red-500/20">
        <div className="flex justify-between items-center">
          <span className="text-red-100">Total Time:</span>
          <span className="text-lg font-bold text-red-100">{totalTime}</span>
        </div>
        
        {/* Current status */}
        <div className="mt-2 text-xs">
          <span className={`inline-block w-2 h-2 rounded-full ${mode === 'running' ? 'bg-green-400' : 'bg-red-400'} mr-2`}></span>
          <span className="text-gray-300">
            {mode === 'running' ? 'Session active' : 'Session paused'}
          </span>
        </div>
      </div>
    </div>
  );
  
  // Helper to determine background color based on entry type
  function getEntryBackgroundColor(type) {
    switch (type) {
      case 'start':
        return 'bg-green-500/20 text-green-100';
      case 'complete':
        return 'bg-purple-500/20 text-purple-100';
      case 'reset':
        return 'bg-blue-500/20 text-blue-100';
      case 'pause':
        return 'bg-yellow-500/20 text-yellow-100';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  }
};

export default HistorySidebar;