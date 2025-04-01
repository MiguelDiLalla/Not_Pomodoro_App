import React from 'react';
import useAudio from '../hooks/useAudio';

const ButtonGrid = ({ buttonValues = [], onButtonClick, mode = 'paused' }) => {
  // Hook for button click sound
  const { play: playClickSound } = useAudio('/sounds/click.wav', { volume: 0.5, preload: 'auto' });
  
  // Format minutes and seconds from milliseconds
  const formatTimeValue = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle button click with sound effect
  const handleButtonClick = (value, index) => {
    playClickSound();
    onButtonClick(value, index);
  };

  return (
    <div className="w-full space-y-2">
      {/* Render up to 7 mystery buttons */}
      {buttonValues.map((value, index) => (
        <button
          key={index}
          onClick={() => handleButtonClick(value, index)}
          disabled={mode !== 'running'}
          className={`w-full p-3 rounded-lg transition-all duration-300
            ${mode === 'running' 
              ? 'bg-gray-700 hover:bg-gray-600 text-white' 
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'}
            focus:outline-none focus:ring-1 focus:ring-teal-400`}
          aria-label={`Set timer to ${formatTimeValue(value)}`}
        >
          {/* Only show time values when running */}
          {mode === 'running' ? formatTimeValue(value) : '???'}
        </button>
      ))}
      
      {/* If we have fewer than 7 buttons, show placeholders */}
      {Array.from({ length: Math.max(0, 7 - buttonValues.length) }).map((_, index) => (
        <div
          key={`placeholder-${index}`}
          className="w-full p-3 rounded-lg bg-gray-800 text-gray-600 text-center"
        >
          ???
        </div>
      ))}
    </div>
  );
};

export default ButtonGrid;