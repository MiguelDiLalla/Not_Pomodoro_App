import React from 'react';
import useAudio from '../hooks/useAudio';

const RunPauseButton = ({ mode = 'paused', onClick }) => {
  // Hook for button click sound
  const { play: playClickSound } = useAudio('/sounds/click.mp3', { volume: 0.4, preload: 'auto' });
  
  // Handle button click with sound effect
  const handleClick = () => {
    playClickSound();
    onClick();
  };

  return (
    <button 
      onClick={handleClick}
      className={`w-full p-4 rounded-lg text-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        mode === 'running' 
          ? 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500' 
          : 'bg-teal-500 hover:bg-teal-600 text-white focus:ring-teal-500'
      }`}
      aria-label={mode === 'running' ? 'Pause session' : 'Start session'}
    >
      {mode === 'running' ? 'Pause' : 'Run'}
    </button>
  );
};

export default RunPauseButton;