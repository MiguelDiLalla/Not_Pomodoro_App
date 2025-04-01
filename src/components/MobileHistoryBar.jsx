import React from 'react';

const MobileHistoryBar = ({ lastEntry = null, totalTime = '0m', mode = 'paused' }) => {
  // Get the most recent history entry message
  const getLastEntryMessage = () => {
    if (!lastEntry) return 'No activity yet';
    return lastEntry.message.length > 40 
      ? lastEntry.message.substring(0, 40) + '...' 
      : lastEntry.message;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-red-500/20 backdrop-blur-sm 
                    border-t border-red-500/30 px-4 py-3 z-20">
      <div className="flex justify-between items-center">
        {/* Left side - Total time counter */}
        <div className="flex items-center space-x-2">
          <span className="text-red-100 font-medium">Total:</span>
          <span className="text-lg font-bold text-red-100">{totalTime}</span>
        </div>
        
        {/* Separator */}
        <div className="h-8 border-l border-red-400/30 mx-2"></div>
        
        {/* Right side - Latest event */}
        <div className="flex-1 truncate">
          <div className="flex items-center">
            <span className={`inline-block w-2 h-2 rounded-full ${mode === 'running' ? 'bg-green-400' : 'bg-red-400'} mr-2`}></span>
            <span className="text-sm text-gray-300 truncate">
              {getLastEntryMessage()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHistoryBar;